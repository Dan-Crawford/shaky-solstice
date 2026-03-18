#!/usr/bin/env node

/**
 * Sync markdown docs to Featurebase help center.
 *
 * Usage:
 *   node scripts/sync-to-featurebase.mjs --files "docs/integrations/cloud/aws.md,docs/capabilities/brutus.md"
 *   node scripts/sync-to-featurebase.mjs --deleted "docs/old-article.md"
 *   node scripts/sync-to-featurebase.mjs --full-sync
 *
 * Environment:
 *   FEATUREBASE_API_KEY - Required
 */

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import { marked } from 'marked';

const API_BASE = 'https://do.featurebase.app/v2/help_center';
const DOCS_DIR = 'docs';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

// --- Frontmatter parsing ---

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };

  const data = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*"?([^"]*)"?$/);
    if (kv) data[kv[1]] = kv[2];
  }
  return { data, body: match[2] };
}

function serializeFrontmatter(data, body) {
  const lines = Object.entries(data).map(([k, v]) => `${k}: "${v}"`);
  return `---\n${lines.join('\n')}\n---\n${body}`;
}

// --- Category resolution ---

function resolveCategory(filePath) {
  // docs/integrations/cloud/aws.md → "Integrations"
  const rel = path.relative(DOCS_DIR, filePath);
  const topLevel = rel.split(path.sep)[0];
  // Title-case and replace hyphens
  return topLevel
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// --- Featurebase API ---

async function apiRequest(method, endpoint, body, retries = MAX_RETRIES) {
  const apiKey = process.env.FEATUREBASE_API_KEY;
  if (!apiKey) throw new Error('FEATUREBASE_API_KEY environment variable is required');

  const url = `${API_BASE}/${endpoint}`;
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  };
  if (body) options.body = JSON.stringify(body);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.status === 429 || response.status >= 500) {
        if (attempt < retries) {
          const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
          console.warn(`  Retry ${attempt}/${retries} after ${delay}ms (status ${response.status})`);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
      }

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API ${method} ${endpoint}: ${response.status} ${text}`);
      }

      return response.status === 204 ? null : await response.json();
    } catch (err) {
      if (attempt < retries && err.code === 'ECONNRESET') {
        await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
        continue;
      }
      throw err;
    }
  }
}

async function createArticle(title, htmlBody, description, isDraft) {
  const payload = { title, body: htmlBody };
  if (description) payload.description = description;
  // Articles are created as drafts by default — no need to set state
  return apiRequest('POST', 'articles', payload);
}

async function updateArticle(articleId, title, htmlBody, description, isDraft) {
  const payload = { title, body: htmlBody };
  if (description) payload.description = description;
  // Try setting publish state — if API rejects, the update still applies for content
  if (isDraft === false) {
    payload.isPublished = true;
  }
  return apiRequest('PUT', `articles/${articleId}`, payload);
}

async function archiveArticle(articleId) {
  // Featurebase may not have a direct archive endpoint — unpublish by updating state
  try {
    return apiRequest('PUT', `articles/${articleId}`, { state: 'draft' });
  } catch (err) {
    console.warn(`  Warning: could not archive article ${articleId}: ${err.message}`);
  }
}

// --- File processing ---

async function processFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const { data, body } = parseFrontmatter(content);

  if (!data.title) {
    console.warn(`  Skipping ${filePath}: missing title in frontmatter`);
    return { action: 'skipped', reason: 'missing title' };
  }

  const htmlBody = await marked(body);
  const description = data.description || '';
  const isDraft = data.draft === 'true' || data.draft === true;

  if (data.featurebaseId) {
    // Update existing article — fall back to create if 404 (stale ID)
    try {
      await updateArticle(data.featurebaseId, data.title, htmlBody, description, isDraft);
      const draftLabel = isDraft ? ' [DRAFT]' : '';
      console.log(`  Updated: ${filePath} (${data.featurebaseId})${draftLabel}`);
      return { action: 'updated' };
    } catch (err) {
      if (err.message.includes('404')) {
        console.log(`  Stale ID ${data.featurebaseId} for ${filePath} — creating new article`);
        // Fall through to create
      } else {
        throw err;
      }
    }
  }

  // Create new article (or re-create after stale ID)
  const result = await createArticle(data.title, htmlBody, description, isDraft);
  const newId = result.id;
  console.log(`  Created: ${filePath} → ${newId}`);

  // Write ID back to frontmatter
  data.featurebaseId = newId;
  const newContent = serializeFrontmatter(data, body);
  await fs.writeFile(filePath, newContent, 'utf-8');

  return { action: 'created', id: newId, filePath };
}

async function processDeletedFile(filePath) {
  // Retrieve featurebaseId from git history
  try {
    const oldContent = execSync(`git show HEAD~1:${filePath}`, { encoding: 'utf-8' });
    const { data } = parseFrontmatter(oldContent);

    if (data.featurebaseId) {
      await archiveArticle(data.featurebaseId);
      console.log(`  Archived: ${filePath} (${data.featurebaseId})`);
      return { action: 'archived' };
    }
  } catch (err) {
    console.warn(`  Could not retrieve deleted file from git: ${filePath}`);
  }
  return { action: 'skipped', reason: 'no featurebaseId found' };
}

// --- File discovery ---

async function walkDocs(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkDocs(full));
    } else if (entry.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

// --- Main ---

async function main() {
  const args = process.argv.slice(2);
  const results = { created: 0, updated: 0, archived: 0, skipped: 0, errors: [] };
  const newArticles = []; // Track files that need ID writeback

  let changedFiles = [];
  let deletedFiles = [];
  let isFullSync = false;

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--files' && args[i + 1]) {
      changedFiles = args[i + 1].split(',').filter(Boolean);
      i++;
    } else if (args[i] === '--deleted' && args[i + 1]) {
      deletedFiles = args[i + 1].split(',').filter(Boolean);
      i++;
    } else if (args[i] === '--full-sync') {
      isFullSync = true;
    }
  }

  if (isFullSync) {
    changedFiles = await walkDocs(DOCS_DIR);
    console.log(`Full sync: ${changedFiles.length} files`);
  }

  // Process changed/added files
  for (const file of changedFiles) {
    try {
      const result = await processFile(file);
      results[result.action]++;
      if (result.action === 'created') {
        newArticles.push(result.filePath);
      }
    } catch (err) {
      console.error(`  Error processing ${file}: ${err.message}`);
      results.errors.push({ file, error: err.message });
    }
  }

  // Process deleted files
  for (const file of deletedFiles) {
    try {
      const result = await processDeletedFile(file);
      results[result.action]++;
    } catch (err) {
      console.error(`  Error archiving ${file}: ${err.message}`);
      results.errors.push({ file, error: err.message });
    }
  }

  // Output summary
  console.log('\n--- Sync Summary ---');
  console.log(`Created: ${results.created}`);
  console.log(`Updated: ${results.updated}`);
  console.log(`Archived: ${results.archived}`);
  console.log(`Skipped: ${results.skipped}`);
  console.log(`Errors: ${results.errors.length}`);

  // Output new article files for writeback step
  if (newArticles.length > 0) {
    console.log(`\nNew articles requiring ID writeback:`);
    for (const f of newArticles) console.log(`  ${f}`);
    // Write list to a temp file for the workflow to pick up
    await fs.writeFile('.writeback-files', newArticles.join('\n'), 'utf-8');
  }

  if (results.errors.length > 0) {
    console.error('\nErrors:');
    for (const e of results.errors) console.error(`  ${e.file}: ${e.error}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
