#!/usr/bin/env node

/**
 * Detect drift between Featurebase and local docs.
 *
 * Checks for:
 *   - New articles in Featurebase not present locally
 *   - Content updates in Featurebase that differ from local
 *   - Collection/path changes in Featurebase
 *
 * When drift is found, writes updated/new files to the working directory
 * so the calling workflow can create a PR.
 *
 * Usage:
 *   FEATUREBASE_API_KEY=sk_... node scripts/check-featurebase-drift.mjs
 *
 * Environment:
 *   FEATUREBASE_API_KEY - Required
 */

import fs from 'fs/promises';
import path from 'path';
import TurndownService from 'turndown';

const API_BASE = 'https://do.featurebase.app/v2/help_center';
const DOCS_DIR = 'docs';

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '*',
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

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .trim();
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

async function fetchAllCollections() {
  const result = await apiRequest('GET', 'collections', { limit: 100 });
  const collections = result.data || [];

  // Fetch full details for each collection (list doesn't include name)
  const detailed = [];
  for (const col of collections) {
    try {
      const full = await apiRequest('GET', `collections/${col.id}`);
      detailed.push(full);
    } catch {
      detailed.push(col);
    }
  }

  return detailed;
}

// --- Path resolution ---

function buildCollectionPathMap(collections) {
  const colMap = new Map();
  for (const c of collections) colMap.set(c.id, c);

  function getPath(colId) {
    const col = colMap.get(colId);
    if (!col) return null;
    const name = slugify(col.name);
    const parentId = col.parentId;
    if (parentId && colMap.has(parentId)) {
      const parentPath = getPath(parentId);
      return parentPath ? `${parentPath}/${name}` : name;
    }
    return name;
  }

  const pathMap = new Map();
  for (const c of collections) {
    pathMap.set(c.id, getPath(c.id));
  }
  return pathMap;
}

function resolveArticlePath(article, collectionPaths) {
  const parentId = article.parentId;
  const filename = slugify(article.title) + '.md';

  let dir;
  if (parentId && collectionPaths.has(parentId)) {
    dir = collectionPaths.get(parentId);
  } else {
    dir = 'uncategorized';
  }

  return `${dir}/${filename}`;
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
  console.log('Fetching articles and collections from Featurebase...');
  const [fbArticles, fbCollections] = await Promise.all([
    fetchAllArticles(),
    fetchAllCollections(),
  ]);

  const publishedArticles = fbArticles.filter(a => a.isPublished === true || a.state === 'live');
  console.log(`Found ${publishedArticles.length} published articles, ${fbCollections.length} collections\n`);

  const collectionPaths = buildCollectionPathMap(fbCollections);

  // Build local file index by featurebaseId
  const localFiles = await walkDocs(DOCS_DIR);
  const localById = new Map();
  const localByPath = new Map();

  for (const file of localFiles) {
    const content = await fs.readFile(file, 'utf-8');
    const { data, body } = parseFrontmatter(content);
    const relPath = path.relative(DOCS_DIR, file);

    if (data.featurebaseId) {
      localById.set(data.featurebaseId, { file, data, body, relPath });
    }
    localByPath.set(relPath, { file, data, body });
  }

  const changes = [];

  for (const article of publishedArticles) {
    const expectedPath = resolveArticlePath(article, collectionPaths);
    const local = localById.get(article.id);

    if (!local) {
      // New article in Featurebase, not in local
      const htmlBody = article.body || '';
      const mdBody = htmlBody.trim() ? turndown.turndown(htmlBody) : '';

      changes.push({
        type: 'new_article',
        path: expectedPath,
        title: article.title,
        id: article.id,
        content: serializeFrontmatter(
          { title: article.title, description: article.title, featurebaseId: article.id },
          '\n' + mdBody + '\n'
        ),
      });
      continue;
    }

    // Check for content updates
    const htmlBody = article.body || '';
    const mdBody = htmlBody.trim() ? turndown.turndown(htmlBody) : '';

    // Normalize for comparison: trim whitespace, normalize line endings
    const localBodyNorm = local.body.trim().replace(/\r\n/g, '\n');
    const fbBodyNorm = mdBody.trim().replace(/\r\n/g, '\n');

    // Check title change
    const titleChanged = local.data.title !== article.title;

    // Check content change (use a rough comparison — HTML→MD conversion isn't perfectly stable)
    // Compare by length difference > 5% or title mismatch
    const lengthDiff = Math.abs(localBodyNorm.length - fbBodyNorm.length);
    const lengthRatio = localBodyNorm.length > 0 ? lengthDiff / localBodyNorm.length : 1;
    const contentChanged = lengthRatio > 0.05;

    if (titleChanged || contentChanged) {
      changes.push({
        type: 'updated_article',
        path: local.relPath,
        title: article.title,
        id: article.id,
        content: serializeFrontmatter(
          { title: article.title, description: article.title, featurebaseId: article.id },
          '\n' + mdBody + '\n'
        ),
        reason: titleChanged ? 'title changed' : 'content changed',
      });
    }
  }

  // Report
  if (changes.length === 0) {
    console.log('No drift detected — local docs match Featurebase.');
    return;
  }

  console.log(`Found ${changes.length} change(s):\n`);

  const newArticles = changes.filter(c => c.type === 'new_article');
  const updatedArticles = changes.filter(c => c.type === 'updated_article');

  if (newArticles.length > 0) {
    console.log(`New articles (${newArticles.length}):`);
    for (const c of newArticles) console.log(`  + ${c.path} — "${c.title}" (${c.id})`);
  }

  if (updatedArticles.length > 0) {
    console.log(`\nUpdated articles (${updatedArticles.length}):`);
    for (const c of updatedArticles) console.log(`  ~ ${c.path} — "${c.title}" (${c.reason})`);
  }

  // Write changed files
  for (const change of changes) {
    const fullPath = path.join(DOCS_DIR, change.path);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, change.content, 'utf-8');
    console.log(`  Wrote: ${fullPath}`);
  }

  // Output for GitHub Actions
  if (process.env.GITHUB_OUTPUT) {
    const summary = changes.map(c => {
      const prefix = c.type === 'new_article' ? 'New' : 'Updated';
      return `- ${prefix}: ${c.title} (\`${c.path}\`)`;
    }).join('\n');
    await fs.appendFile(process.env.GITHUB_OUTPUT, `changes<<EOF\n${summary}\nEOF\n`);
    await fs.appendFile(process.env.GITHUB_OUTPUT, `change_count=${changes.length}\n`);
  }

  // Exit 1 to signal drift was found (workflow uses this to create PR)
  process.exit(1);
}

main().catch(err => {
  console.error('Drift check failed:', err);
  process.exit(1);
});
