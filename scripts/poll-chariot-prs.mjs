#!/usr/bin/env node

/**
 * Poll chariot repo for merged PRs and open docs suggestion PRs.
 *
 * Usage (called by GitHub Action):
 *   GITHUB_TOKEN=... CHARIOT_REPO=praetorian-inc/chariot node scripts/poll-chariot-prs.mjs
 *
 * Environment:
 *   GITHUB_TOKEN  - GitHub token with read access to chariot and write to shaky-solstice
 *   CHARIOT_REPO  - owner/repo of the chariot repository (default: praetorian-inc/chariot)
 *   DRY_RUN       - If "true", log what would happen but don't create PRs or commit state
 */

import fs from 'fs/promises';
import { execSync, spawnSync } from 'child_process';

const CHARIOT_REPO = process.env.CHARIOT_REPO || 'praetorian-inc/chariot';
const STATE_FILE = 'processed-prs.json';
const DRY_RUN = process.env.DRY_RUN === 'true';

// --- State ---

async function readState() {
  const raw = await fs.readFile(STATE_FILE, 'utf-8');
  return JSON.parse(raw);
}

async function writeState(state) {
  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2) + '\n', 'utf-8');
}

// --- GitHub API ---

async function githubGet(path) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN environment variable is required');

  const url = `https://api.github.com/${path}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API GET ${path}: ${response.status} ${text}`);
  }

  return response.json();
}

async function fetchMergedPRsSince(repo, since) {
  // Search for merged PRs merged after `since` date
  // GitHub search: is:pr is:merged merged:>DATE repo:OWNER/REPO
  const sinceDate = new Date(since).toISOString().split('T')[0]; // YYYY-MM-DD
  const query = `repo:${repo}+is:pr+is:merged+merged:>${sinceDate}`;
  const data = await githubGet(`search/issues?q=${query}&sort=updated&order=desc&per_page=100`);
  return data.items || [];
}

async function fetchPRDiff(repo, prNumber) {
  const token = process.env.GITHUB_TOKEN;
  const url = `https://api.github.com/repos/${repo}/pulls/${prNumber}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.diff',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API diff ${prNumber}: ${response.status} ${text}`);
  }
  return response.text(); // raw diff
}

async function fetchPRDetails(repo, prNumber) {
  return githubGet(`repos/${repo}/pulls/${prNumber}`);
}

// --- Main ---

async function main() {
  console.log(`Polling ${CHARIOT_REPO} for merged PRs...${DRY_RUN ? ' [DRY RUN]' : ''}`);

  const state = await readState();
  console.log(`Last checked: ${state.lastCheckedAt}`);
  console.log(`Previously processed: ${state.processedPrNumbers.length} PRs`);

  const mergedPRs = await fetchMergedPRsSince(CHARIOT_REPO, state.lastCheckedAt);
  const newPRs = mergedPRs.filter(pr => !state.processedPrNumbers.includes(pr.number));

  console.log(`Found ${mergedPRs.length} merged PRs, ${newPRs.length} not yet processed`);

  for (const pr of newPRs) {
    console.log(`\nProcessing PR #${pr.number}: ${pr.title}`);
    try {
      await processPR(pr, state);
      state.processedPrNumbers.push(pr.number);
    } catch (err) {
      console.error(`  Error processing PR #${pr.number}: ${err.message}`);
      // Continue to next PR — don't mark as processed so it retries tomorrow
    }
  }

  // Update lastCheckedAt to now
  state.lastCheckedAt = new Date().toISOString();

  if (!DRY_RUN) {
    await writeState(state);
    console.log(`\nState updated. lastCheckedAt=${state.lastCheckedAt}`);
  } else {
    console.log('\n[DRY RUN] State not written.');
  }
}

async function processPR(pr, state) {
  // 1. Fetch PR details and diff
  const details = await fetchPRDetails(CHARIOT_REPO, pr.number);
  const diff = await fetchPRDiff(CHARIOT_REPO, pr.number);

  const prContext = {
    number: pr.number,
    title: pr.title,
    body: details.body || '',
    url: details.html_url,
    mergedAt: details.merged_at,
    changedFiles: details.changed_files,
    additions: details.additions,
    deletions: details.deletions,
    diff: diff.substring(0, 50000), // cap at 50KB to avoid context overflow
  };

  console.log(`  Fetched diff (${diff.length} bytes, capped at ${prContext.diff.length})`);

  // 2. Clone chariot at merge commit for code context
  const chariotDir = `/tmp/chariot-${pr.number}`;
  await cloneChariotAtMerge(CHARIOT_REPO, details.merge_commit_sha, chariotDir);

  try {
    await generateDocSuggestion(prContext, chariotDir);
  } finally {
    // Clean up chariot clone
    execSync(`rm -rf ${chariotDir}`);
    console.log(`  Cleaned up ${chariotDir}`);
  }
}

async function cloneChariotAtMerge(repo, sha, targetDir) {
  const token = process.env.GITHUB_TOKEN;
  const cloneUrl = `https://x-access-token:${token}@github.com/${repo}.git`;

  console.log(`  Cloning ${repo} at ${sha} → ${targetDir}`);
  // Shallow clone with specific commit
  execSync(`git clone --depth=1 --no-single-branch ${cloneUrl} ${targetDir}`, { stdio: 'pipe' });
  execSync(`git -C ${targetDir} fetch --depth=1 origin ${sha}`, { stdio: 'pipe' });
  execSync(`git -C ${targetDir} checkout ${sha}`, { stdio: 'pipe' });
  console.log(`  Chariot checked out at ${sha}`);
}

async function generateDocSuggestion(prContext, chariotDir) {
  // Write prompt to temp file to avoid shell escaping issues
  const promptFile = `/tmp/claude-prompt-${prContext.number}.txt`;

  const docsTree = execSync('find docs -name "*.md" | sort', { encoding: 'utf-8', cwd: process.cwd() });

  const prompt = `You are updating the Guard documentation in response to a code change in the Chariot codebase.

## Chariot PR #${prContext.number}: ${prContext.title}
URL: ${prContext.url}
Merged: ${prContext.mergedAt}
Changed files: ${prContext.changedFiles} (+${prContext.additions}/-${prContext.deletions})

## PR Description
${prContext.body || '(no description)'}

## Code Diff (first 50KB)
\`\`\`diff
${prContext.diff}
\`\`\`

## Chariot codebase is checked out at: ${chariotDir}
You can Read files in ${chariotDir} to get more context on any changed code.

## Existing Guard docs structure
${docsTree}

## Your Task
1. Determine if this PR requires any documentation changes. Most PRs (internal refactors, tests, CI changes) do NOT need doc updates — be conservative.
2. If docs are needed: identify which existing doc files to update OR what new file to create.
3. Make the changes by editing files in the docs/ directory of your current working directory (${process.cwd()}).
4. Only change docs/ files. Do not modify scripts, workflows, or package.json.
5. If no doc changes are needed, output the single line: NO_DOC_CHANGES_NEEDED

Be concise. Write docs from a user perspective — what changed for them, not how the code changed.`;

  await fs.writeFile(promptFile, prompt, 'utf-8');

  console.log(`  Running Claude Code CLI for PR #${prContext.number}...`);

  const result = spawnSync(
    'claude',
    ['--print', '--dangerously-skip-permissions', '-p', `@${promptFile}`],
    {
      cwd: process.cwd(),
      encoding: 'utf-8',
      env: { ...process.env },
      timeout: 300000, // 5 min max per PR
    }
  );

  await fs.rm(promptFile, { force: true });

  if (result.error) throw new Error(`Claude CLI failed: ${result.error.message}`);
  if (result.status !== 0) throw new Error(`Claude CLI exited ${result.status}: ${result.stderr}`);

  const output = result.stdout || '';
  if (output.trim() === 'NO_DOC_CHANGES_NEEDED') {
    console.log(`  PR #${prContext.number}: no doc changes needed`);
    return;
  }

  console.log(`  Claude made changes — checking for modified docs/...`);
  await createDocsPR(prContext);
}

async function createDocsPR(prContext) {
  // Check if Claude actually modified any docs/ files
  const diffOutput = execSync('git diff --name-only docs/', { encoding: 'utf-8' }).trim();
  const untrackedOutput = execSync('git ls-files --others --exclude-standard docs/', { encoding: 'utf-8' }).trim();

  const changedDocs = [
    ...diffOutput.split('\n').filter(Boolean),
    ...untrackedOutput.split('\n').filter(Boolean),
  ];

  if (changedDocs.length === 0) {
    console.log(`  No docs/ files changed — skipping PR creation`);
    return;
  }

  console.log(`  Changed docs: ${changedDocs.join(', ')}`);

  if (DRY_RUN) {
    console.log(`  [DRY RUN] Would create PR for: ${changedDocs.join(', ')}`);
    // Reset changes so dry run doesn't pollute working tree
    execSync('git checkout -- docs/ && git clean -fd docs/', { stdio: 'pipe' });
    return;
  }

  const branch = `docs/chariot-pr-${prContext.number}`;
  execSync('git config user.name "github-actions[bot]"');
  execSync('git config user.email "github-actions[bot]@users.noreply.github.com"');
  execSync(`git checkout -b ${branch}`);

  for (const f of changedDocs) {
    execSync(`git add ${f}`);
  }

  execSync(`git commit -m "docs: update docs for chariot PR #${prContext.number} [skip-sync]"`);
  execSync(`git push origin ${branch}`);

  const prBody = [
    `Automated doc suggestion for chariot PR #${prContext.number}.`,
    '',
    `**Chariot PR:** ${prContext.url}`,
    `**Title:** ${prContext.title}`,
    '',
    'Generated by Claude Code CLI. Please review and edit before merging.',
    '',
    '**Changed files:**',
    ...changedDocs.map(f => `- ${f}`),
  ].join('\n');

  execSync(
    `gh pr create --title "docs: ${prContext.title}" --body "${prBody.replace(/"/g, '\\"')}" --base main --head ${branch}`,
    { stdio: 'inherit' }
  );

  // Return to main for next PR
  execSync('git checkout main');

  console.log(`  Created docs PR for chariot #${prContext.number}`);
}

main().catch(err => {
  console.error('Poll failed:', err);
  process.exit(1);
});
