#!/usr/bin/env node

/**
 * Validate that local docs frontmatter matches Featurebase articles.
 *
 * Checks:
 *   - Every local file with featurebaseId has a matching article in Featurebase
 *   - Title in frontmatter matches Featurebase title
 *   - Every published Featurebase article has a corresponding local file
 *
 * Exit 0 if all good, exit 1 if mismatches found.
 *
 * Usage:
 *   FEATUREBASE_API_KEY=sk_... node scripts/validate-frontmatter.mjs
 *
 * Environment:
 *   FEATUREBASE_API_KEY - Required
 */

import fs from 'fs/promises';
import path from 'path';

const API_BASE = 'https://do.featurebase.app/v2/help_center';
const DOCS_DIR = 'docs';

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

// --- API ---

async function apiRequest(method, endpoint, params = {}) {
  const apiKey = process.env.FEATUREBASE_API_KEY;
  if (!apiKey) throw new Error('FEATUREBASE_API_KEY required');

  const url = new URL(`${API_BASE}/${endpoint}`);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, String(v));
  }

  const response = await fetch(url, {
    method,
    headers: { 'X-API-Key': apiKey },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API ${method} ${endpoint}: ${response.status} ${text}`);
  }

  return response.json();
}

async function fetchAllArticles() {
  const articles = [];
  let cursor = undefined;

  for (let page = 1; page <= 20; page++) {
    const params = { limit: 100 };
    if (cursor) params.cursor = cursor;

    const result = await apiRequest('GET', 'articles', params);
    const batch = result.data || [];
    articles.push(...batch);

    cursor = result.nextCursor || undefined;
    if (!cursor || batch.length === 0) break;
  }

  return articles;
}

// --- Local files ---

async function walkDocs(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walkDocs(full));
    else if (entry.name.endsWith('.md') && entry.name !== 'index.md') files.push(full);
  }
  return files;
}

// --- Main ---

async function main() {
  console.log('Fetching articles from Featurebase...');
  const fbArticles = await fetchAllArticles();
  console.log(`Found ${fbArticles.length} articles in Featurebase\n`);

  // Build Featurebase lookup by ID
  const fbById = new Map();
  for (const a of fbArticles) {
    fbById.set(a.id, a);
  }

  // Scan local files
  const localFiles = await walkDocs(DOCS_DIR);
  console.log(`Found ${localFiles.length} local doc files\n`);

  const issues = [];
  const localIds = new Set();

  for (const file of localFiles) {
    const content = await fs.readFile(file, 'utf-8');
    const { data } = parseFrontmatter(content);

    if (!data.featurebaseId) {
      issues.push({ type: 'missing_id', file, message: 'No featurebaseId in frontmatter' });
      continue;
    }

    localIds.add(data.featurebaseId);

    const fbArticle = fbById.get(data.featurebaseId);
    if (!fbArticle) {
      issues.push({
        type: 'stale_id',
        file,
        message: `featurebaseId ${data.featurebaseId} not found in Featurebase`,
      });
      continue;
    }

    // Check title match
    if (data.title && fbArticle.title && data.title.trim() !== fbArticle.title.trim()) {
      issues.push({
        type: 'title_mismatch',
        file,
        message: `Title mismatch — local: "${data.title}" vs Featurebase: "${fbArticle.title}"`,
      });
    }
  }

  // Check for Featurebase articles with no local file
  const publishedFb = fbArticles.filter(a => a.isPublished === true || a.state === 'live');
  for (const a of publishedFb) {
    if (!localIds.has(a.id)) {
      issues.push({
        type: 'missing_local',
        file: null,
        message: `Featurebase article "${a.title}" (${a.id}) has no local file`,
      });
    }
  }

  // Report
  if (issues.length === 0) {
    console.log('All frontmatter validated successfully — no mismatches found.');
    return;
  }

  console.log(`Found ${issues.length} issue(s):\n`);

  const grouped = {};
  for (const issue of issues) {
    if (!grouped[issue.type]) grouped[issue.type] = [];
    grouped[issue.type].push(issue);
  }

  for (const [type, items] of Object.entries(grouped)) {
    console.log(`\n--- ${type} (${items.length}) ---`);
    for (const item of items) {
      if (item.file) {
        console.log(`  ${item.file}: ${item.message}`);
      } else {
        console.log(`  ${item.message}`);
      }
    }
  }

  // Output for GitHub Actions
  if (process.env.GITHUB_OUTPUT) {
    const summary = issues.map(i => `- ${i.message}${i.file ? ` (${i.file})` : ''}`).join('\n');
    await fs.appendFile(process.env.GITHUB_OUTPUT, `issues<<EOF\n${summary}\nEOF\n`);
    await fs.appendFile(process.env.GITHUB_OUTPUT, `issue_count=${issues.length}\n`);
  }

  process.exit(1);
}

main().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
