#!/usr/bin/env node

/**
 * Clear featurebaseId from all docs so they get created fresh on first sync.
 * The numeric prefixes from Featurebase filenames aren't valid article IDs.
 */

import fs from 'fs/promises';
import path from 'path';

const DOCS_DIR = 'docs';

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

async function main() {
  const files = await walk(DOCS_DIR);
  let cleared = 0;

  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8');
    if (!content.includes('featurebaseId:')) continue;

    const updated = content.replace(/^featurebaseId:.*\n/m, '');
    await fs.writeFile(file, updated, 'utf-8');
    cleared++;
    console.log(`  Cleared: ${file}`);
  }

  console.log(`\nCleared featurebaseId from ${cleared} files`);
}

main().catch(err => { console.error(err); process.exit(1); });
