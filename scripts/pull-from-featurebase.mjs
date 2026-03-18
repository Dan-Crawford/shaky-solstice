#!/usr/bin/env node

/**
 * Pull full article content from Featurebase into local markdown files.
 * Matches by title, writes featurebaseId + full content.
 *
 * Usage:
 *   FEATUREBASE_API_KEY=sk_... node scripts/pull-from-featurebase.mjs
 *
 * This fetches all articles from Featurebase, converts HTML body to markdown,
 * and matches them to local files by title. Unmatched articles are reported.
 */

import fs from 'fs/promises';
import path from 'path';
import TurndownService from 'turndown';

const API_BASE = 'https://do.featurebase.app/v2/help_center';
const DOCS_DIR = 'docs';

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

// --- Frontmatter ---

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
  const lines = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}: "${v}"`);
  return `---\n${lines.join('\n')}\n---\n${body}`;
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
    headers: { 'Authorization': `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API ${method} ${endpoint}: ${response.status} ${text}`);
  }

  return response.json();
}

async function fetchAllArticles() {
  const articles = [];
  const limit = 100;
  const MAX_PAGES = 20; // Safety cap — we have ~100 articles, not thousands
  let seenIds = new Set();

  // Try cursor-based pagination first, fall back to page-based
  let cursor = undefined;
  for (let page = 1; page <= MAX_PAGES; page++) {
    const params = { limit };
    if (cursor) {
      params.cursor = cursor;
    } else if (page > 1) {
      params.page = page;
    }

    console.log(`  Fetching page ${page}...`);
    const result = await apiRequest('GET', 'articles', params);
    const batch = result.data || result.results || [];

    // Deduplicate — if API ignores page param, we'll see same articles
    let newCount = 0;
    for (const article of batch) {
      if (!seenIds.has(article.id)) {
        seenIds.add(article.id);
        articles.push(article);
        newCount++;
      }
    }

    console.log(`  Got ${batch.length} articles (${newCount} new, ${articles.length} total)`);

    // Stop conditions
    if (batch.length === 0) break;
    if (newCount === 0) break; // All duplicates — API is looping
    if (batch.length < limit) break;

    // Use cursor if available
    cursor = result.nextCursor || result.cursor || undefined;
    if (!cursor && batch.length === limit) {
      // No cursor returned, try page-based
      continue;
    }
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
    else if (entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

// --- Main ---

async function main() {
  console.log('Fetching articles from Featurebase...');
  const articleList = await fetchAllArticles();
  console.log(`Found ${articleList.length} articles in Featurebase\n`);

  // Build local file index by title
  const localFiles = await walkDocs(DOCS_DIR);
  const titleToFile = new Map();
  for (const file of localFiles) {
    const content = await fs.readFile(file, 'utf-8');
    const { data } = parseFrontmatter(content);
    if (data.title) {
      titleToFile.set(data.title.toLowerCase().trim(), { file, data, content });
    }
  }

  let matched = 0;
  let unmatched = 0;
  let updated = 0;
  const unmatchedArticles = [];

  for (const articleSummary of articleList) {
    const title = (articleSummary.title || '').toLowerCase().trim();
    const local = titleToFile.get(title);

    if (!local) {
      unmatched++;
      unmatchedArticles.push({ id: articleSummary.id, title: articleSummary.title });
      continue;
    }

    matched++;

    // Use body from list response (API returns full body in list endpoint)
    // If body is missing/truncated, fetch individually as fallback
    let htmlBody = articleSummary.body || '';
    if (!htmlBody || htmlBody.length < 20) {
      try {
        const full = await apiRequest('GET', `articles/${articleSummary.id}`);
        htmlBody = full.body || '';
      } catch (err) {
        console.warn(`  Warning: could not fetch article ${articleSummary.id}: ${err.message}`);
      }
    }
    if (!htmlBody.trim()) {
      console.log(`  Skipping ${local.file}: empty body in Featurebase`);
      continue;
    }

    // Convert HTML to markdown
    const mdBody = turndown.turndown(htmlBody);

    // Update local file
    const newData = { ...local.data, featurebaseId: articleSummary.id };
    const newContent = serializeFrontmatter(newData, '\n' + mdBody + '\n');
    await fs.writeFile(local.file, newContent, 'utf-8');
    updated++;
    console.log(`  Updated: ${local.file} (${articleSummary.id})`);
  }

  console.log('\n--- Pull Summary ---');
  console.log(`Featurebase articles: ${articleList.length}`);
  console.log(`Matched to local files: ${matched}`);
  console.log(`Updated with content: ${updated}`);
  console.log(`Unmatched (no local file): ${unmatched}`);

  if (unmatchedArticles.length > 0) {
    console.log('\nUnmatched Featurebase articles (no local file):');
    for (const a of unmatchedArticles) {
      console.log(`  [${a.id}] ${a.title}`);
    }
  }
}

main().catch(err => {
  console.error('Pull failed:', err);
  process.exit(1);
});
