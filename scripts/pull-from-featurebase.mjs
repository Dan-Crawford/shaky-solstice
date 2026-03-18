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
    .map(([k, v]) => {
      // Boolean values don't need quotes
      if (v === 'true' || v === 'false' || v === true || v === false) {
        return `${k}: ${v}`;
      }
      return `${k}: "${v}"`;
    });
  return `---\n${lines.join('\n')}\n---\n${body}`;
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

function resolveCategory(article) {
  // Use Featurebase category or parentId hierarchy to determine folder
  // Fall back to 'uncategorized' for drafts with no clear category
  const category = article.category || article.categoryName || '';
  if (category) return slugify(category);
  return 'uncategorized';
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
  const MAX_PAGES = 20;
  let seenIds = new Set();

  // Use state=all to fetch both live and draft articles (default is "live" only)
  let cursor = undefined;
  for (let page = 1; page <= MAX_PAGES; page++) {
    const params = { limit, state: 'all' };
    if (cursor) params.cursor = cursor;

    console.log(`  Fetching page ${page}...`);
    const result = await apiRequest('GET', 'articles', params);
    const batch = result.data || [];

    let newCount = 0;
    for (const article of batch) {
      if (!seenIds.has(article.id)) {
        seenIds.add(article.id);
        articles.push(article);
        newCount++;
      }
    }

    console.log(`  Got ${batch.length} articles (${newCount} new, ${articles.length} total)`);

    if (batch.length === 0 || newCount === 0) break;

    // Use cursor-based pagination only — nextCursor is null when no more results
    cursor = result.nextCursor || undefined;
    if (!cursor) break;
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
  const publishedCount = articleList.filter(a => a.isPublished === true).length;
  const draftCount = articleList.filter(a => a.isPublished !== true).length;
  console.log(`Found ${articleList.length} articles in Featurebase (${publishedCount} published, ${draftCount} draft-only)\n`);

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
    await processArticle(articleSummary, local.file, local.data);
    updated++;
  }

  // Create new local files for unmatched Featurebase articles (including drafts)
  let created = 0;
  for (const articleSummary of unmatchedArticles) {
    const category = resolveCategory(articleSummary);
    const slug = slugify(articleSummary.title);
    const dirPath = path.join(DOCS_DIR, category);
    const filePath = path.join(dirPath, `${slug}.md`);

    await fs.mkdir(dirPath, { recursive: true });
    await processArticle(articleSummary, filePath, {});
    created++;
  }

  console.log('\n--- Pull Summary ---');
  console.log(`Featurebase articles: ${articleList.length}`);
  console.log(`Matched to local files: ${matched}`);
  console.log(`Updated with content: ${updated}`);
  console.log(`New files created: ${created}`);
  console.log(`Unmatched (created as new): ${unmatchedArticles.length}`);

  async function processArticle(articleSummary, filePath, existingData) {
    // Determine draft state — isPublished is the authoritative field.
    // An article can have state="draft" but isPublished=true (live article with pending edits).
    // We only mark as draft if it has NEVER been published.
    const isDraft = articleSummary.isPublished !== true;

    // Use body from list response, fetch individually as fallback
    let htmlBody = articleSummary.body || '';
    if (!htmlBody || htmlBody.length < 20) {
      // Try fetching full article — draft-only articles need state=draft
      // For published articles, try live first, then draft if 404
      const statesToTry = isDraft ? ['draft'] : ['live', 'draft'];
      for (const state of statesToTry) {
        try {
          const full = await apiRequest('GET', `articles/${articleSummary.id}`, { state });
          htmlBody = full.body || '';
          if (htmlBody) break;
        } catch (err) {
          if (state === statesToTry[statesToTry.length - 1]) {
            console.warn(`  Warning: could not fetch article ${articleSummary.id}: ${err.message}`);
          }
        }
      }
    }

    // Convert HTML to markdown (or empty body for stubs)
    const mdBody = htmlBody.trim() ? turndown.turndown(htmlBody) : '';

    // Build frontmatter
    const newData = {
      ...existingData,
      title: articleSummary.title || existingData.title,
      description: articleSummary.description || existingData.description || '',
      featurebaseId: articleSummary.id,
    };
    if (isDraft) {
      newData.draft = true;
    } else {
      delete newData.draft;
    }

    const newContent = serializeFrontmatter(newData, '\n' + mdBody + '\n');
    await fs.writeFile(filePath, newContent, 'utf-8');

    const draftLabel = isDraft ? ' [DRAFT]' : '';
    console.log(`  ${existingData.title ? 'Updated' : 'Created'}: ${filePath} (${articleSummary.id})${draftLabel}`);
  }
}

main().catch(err => {
  console.error('Pull failed:', err);
  process.exit(1);
});
