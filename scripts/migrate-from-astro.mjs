#!/usr/bin/env node

/**
 * Migration script: Move files from Astro Starlight structure to pure markdown.
 * - Moves src/content/docs/ → docs/
 * - Strips numeric prefix from filenames, moves ID to frontmatter
 * - Preserves directory hierarchy
 */

import fs from 'fs/promises';
import path from 'path';

const SRC_DIR = 'src/content/docs';
const DEST_DIR = 'docs';

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractIdFromFilename(filename) {
  // Match patterns like "1098231-aws-integration.md" or "32729881917979-soc-ii-type-2.md"
  const match = filename.match(/^(\d+)-(.+)$/);
  if (match) {
    return { id: match[1], newFilename: match[2] };
  }
  return { id: null, newFilename: filename };
}

function updateFrontmatter(content, featurebaseId) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    // No frontmatter, add it
    return content;
  }

  let frontmatter = frontmatterMatch[1];
  const body = frontmatterMatch[2];

  // Add featurebaseId if we extracted one and it's not already there
  if (featurebaseId && !frontmatter.includes('featurebaseId')) {
    frontmatter = frontmatter.trimEnd() + `\nfeaturebaseId: "${featurebaseId}"`;
  }

  return `---\n${frontmatter}\n---\n${body}`;
}

async function migrate() {
  // Ensure dest directory exists
  await fs.mkdir(DEST_DIR, { recursive: true });

  const files = await walk(SRC_DIR);
  let moved = 0;
  let skipped = 0;

  for (const srcPath of files) {
    // Get relative path from src/content/docs/
    const relPath = path.relative(SRC_DIR, srcPath);
    const dir = path.dirname(relPath);
    const filename = path.basename(relPath);

    // Skip .DS_Store and index files
    if (filename === '.DS_Store') continue;

    // Extract ID from filename
    const { id, newFilename } = extractIdFromFilename(filename);

    // Convert .mdx to .md
    const finalFilename = newFilename.replace(/\.mdx$/, '.md');

    // Build destination path
    const destDir = path.join(DEST_DIR, dir);
    const destPath = path.join(destDir, finalFilename);

    // Create directory
    await fs.mkdir(destDir, { recursive: true });

    // Read content and update frontmatter
    const content = await fs.readFile(srcPath, 'utf-8');
    const updated = updateFrontmatter(content, id);

    // Write to destination
    await fs.writeFile(destPath, updated, 'utf-8');
    moved++;

    const idNote = id ? ` (featurebaseId: ${id})` : '';
    console.log(`  ${relPath} → ${path.join(dir, finalFilename)}${idNote}`);
  }

  console.log(`\nMigrated ${moved} files, skipped ${skipped}`);
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
