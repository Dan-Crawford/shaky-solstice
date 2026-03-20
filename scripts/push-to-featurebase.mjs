#!/usr/bin/env node

/**
 * Push changed markdown docs to Featurebase (UPDATE ONLY).
 *
 * Safety constraints:
 *   - NEVER creates new articles (requires featurebaseId in frontmatter)
 *   - NEVER deletes or archives articles
 *   - Only updates title, description, and body of existing articles
 *
 * Usage:
 *   node scripts/push-to-featurebase.mjs --files "docs/integrations/cloud/aws.md,docs/capabilities/brutus.md"
 *
 * Environment:
 *   FEATUREBASE_API_KEY - Required
 */

import fs from 'fs/promises';
import { marked } from 'marked';

const API_BASE = 'https://do.featurebase.app/v2/help_center';
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

// --- Featurebase API ---

async function apiRequest(method, endpoint, body, retries = MAX_RETRIES) {
  const apiKey = process.env.FEATUREBASE_API_KEY;
  if (!apiKey) throw new Error('FEATUREBASE_API_KEY environment variable is required');

  const url = `${API_BASE}/${endpoint}`;
  const options = {
    method,
    headers: {
      'X-API-Key': apiKey,
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

// --- File processing ---

async function processFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const { data, body } = parseFrontmatter(content);

  if (!data.title) {
    console.warn(`  SKIP: ${filePath} — missing title in frontmatter`);
    return { action: 'skipped', reason: 'missing title' };
  }

  if (!data.featurebaseId) {
    console.error(`  SKIP: ${filePath} — no featurebaseId in frontmatter (will not create new articles)`);
    return { action: 'skipped', reason: 'no featurebaseId' };
  }

  const htmlBody = await marked(body);
  const description = data.description || '';

  try {
    const payload = {
      title: data.title,
      body: htmlBody,
    };
    if (description) payload.description = description;

    await apiRequest('PUT', `articles/${data.featurebaseId}`, payload);
    console.log(`  Updated: ${filePath} (${data.featurebaseId})`);
    return { action: 'updated' };
  } catch (err) {
    if (err.message.includes('404')) {
      console.error(`  ERROR: ${filePath} — featurebaseId ${data.featurebaseId} not found in Featurebase`);
      return { action: 'error', reason: `article ${data.featurebaseId} not found` };
    }
    throw err;
  }
}

// --- Main ---

async function main() {
  const args = process.argv.slice(2);
  const results = { updated: 0, skipped: 0, errors: [] };

  let changedFiles = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--files' && args[i + 1]) {
      changedFiles = args[i + 1].split(',').filter(Boolean);
      i++;
    }
  }

  if (changedFiles.length === 0) {
    console.log('No files to process');
    return;
  }

  console.log(`Processing ${changedFiles.length} file(s)...\n`);

  for (const file of changedFiles) {
    try {
      const result = await processFile(file);
      if (result.action === 'updated') results.updated++;
      else if (result.action === 'skipped') results.skipped++;
      else if (result.action === 'error') results.errors.push({ file, error: result.reason });
    } catch (err) {
      console.error(`  ERROR: ${file} — ${err.message}`);
      results.errors.push({ file, error: err.message });
    }
  }

  console.log('\n--- Push Summary ---');
  console.log(`Updated: ${results.updated}`);
  console.log(`Skipped: ${results.skipped}`);
  console.log(`Errors:  ${results.errors.length}`);

  if (results.errors.length > 0) {
    console.error('\nErrors:');
    for (const e of results.errors) console.error(`  ${e.file}: ${e.error}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Push failed:', err);
  process.exit(1);
});
