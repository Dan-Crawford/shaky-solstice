# Guard Documentation

Markdown source of truth for the [Praetorian Guard](https://guard.praetorian.com) help center. Changes merged to `main` are automatically synced to Featurebase.

## Repository Structure

```
docs/                           # All help center articles
├── attack-surfaces/            # Attack Surfaces category
├── capabilities/               # Capabilities category
├── enterprise-security/        # Enterprise Security category
├── integrations/               # Integrations category
│   ├── cloud/
│   ├── firewalls/
│   └── ...
├── platform-documentation/     # Platform Documentation category
│   ├── getting-started/
│   ├── notifications/
│   └── ...
└── uncategorized/
scripts/                        # Sync and validation scripts
├── push-to-featurebase.mjs     # Push changed docs (UPDATE ONLY, needs featurebaseId)
├── sync-to-featurebase.mjs     # Full sync (create + update + archive)
├── validate-frontmatter.mjs    # Validate local docs match Featurebase
├── pull-from-featurebase.mjs   # Pull articles from Featurebase
├── check-featurebase-drift.mjs # Detect drift between local and remote
└── poll-chariot-prs.mjs        # Poll Chariot repo PRs for doc generation
```

## Writing Help Center Articles

### Frontmatter Format

Every markdown file requires YAML frontmatter:

```yaml
---
title: "Article Title"
description: "Short description for search/preview"
featurebaseId: "12345"   # Added automatically after first sync — do NOT set manually
draft: true              # Optional — keeps article unpublished in Featurebase
---

Your markdown content here.
```

**Required fields:**
- `title` — Article title (displayed in help center)
- `description` — Brief description for search results

**Auto-managed fields (do NOT set manually on new articles):**
- `featurebaseId` — Written back by sync script after article is created in Featurebase

**Optional fields:**
- `draft` — Set to `true` to sync but keep unpublished

### Category Mapping

The **top-level folder** under `docs/` determines the Featurebase help center category:

| Folder | Featurebase Category |
|--------|---------------------|
| `attack-surfaces/` | Attack Surfaces |
| `capabilities/` | Capabilities |
| `enterprise-security/` | Enterprise Security |
| `integrations/` | Integrations |
| `platform-documentation/` | Platform Documentation |
| `uncategorized/` | Uncategorized |

Subcategories are determined by subfolder names (e.g., `integrations/cloud/` maps to the "Cloud" collection under Integrations).

### Adding a New Article

1. Create a `.md` file in the appropriate `docs/` subdirectory
2. Add `title` and `description` frontmatter — do **not** add `featurebaseId`
3. Open a PR
4. After merge, the push workflow creates the article in Featurebase and a writeback PR adds the `featurebaseId`

### Editing an Existing Article

1. Edit the `.md` file (keep `featurebaseId` unchanged)
2. Open a PR
3. After merge, the push workflow updates the article in Featurebase

### Deleting an Article

1. Delete the `.md` file
2. Open a PR
3. After merge, the sync workflow archives the article in Featurebase (does not hard-delete)

### Draft Articles

Articles with `draft: true` are synced to Featurebase but kept unpublished. To publish:
1. Remove `draft: true` (or set to `false`)
2. Open a PR
3. After merge, the article is published

## Featurebase API Reference

### Base URL and Authentication

```
Base URL: https://do.featurebase.app/v2/help_center
Auth: X-API-Key header (for reads/lists) or Authorization: Bearer (for writes)
```

API key stored in GitHub secret `FEATUREBASE_API_KEY` and 1Password vault "Claude Code Tools".

### Articles API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/articles` | List articles (paginated) |
| `GET` | `/articles/{id}` | Get single article |
| `POST` | `/articles` | Create article |
| `PATCH` | `/articles/{id}` | Update article (partial) |
| `PUT` | `/articles/{id}` | Update article (full replace) |
| `DELETE` | `/articles/{id}` | Delete article |
| `GET` | `/collections?limit=100` | List all collections (categories) |

### Article Fields

```typescript
interface Article {
  id: string;           // Featurebase article ID
  title: string;        // Article title (max 255 chars)
  body: string;         // HTML content
  description?: string; // Short description
  slug?: string;        // URL slug
  state?: string;       // "live" or "draft"
  isPublished?: boolean;
  parentId?: string;    // Collection/category ID
  createdAt?: string;   // ISO 8601
  updatedAt?: string;   // ISO 8601
}
```

### Pagination

```typescript
// List response format
{
  object: "list",
  data: Article[],
  nextCursor?: string  // Pass as ?cursor= for next page
}
```

### Create Article

```typescript
POST /v2/help_center/articles
{
  title: string,        // Required
  body: string,         // HTML content
  description?: string,
  parentId?: string     // Collection ID for categorization
}
```

### Update Article

```typescript
PATCH /v2/help_center/articles/{id}
{
  title?: string,
  body?: string,
  description?: string,
  state?: "live" | "draft"
}
```

After PATCH, a second PATCH with `{ state: "live" }` publishes the changes.

### Error Codes

| Code | Meaning |
|------|---------|
| 200/201 | Success |
| 400 | Bad request / validation error |
| 401 | Invalid or missing API key |
| 404 | Article not found |
| 429 | Rate limited — retry with backoff |
| 500+ | Server error — retry with backoff |

### Rate Limiting

- ~100 requests/minute
- Scripts implement exponential backoff (3 retries, 1s/2s/4s delays)

## Changelog API (for product updates)

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v2/changelogs` | List changelog entries |
| `POST` | `/v2/changelogs` | Create entry |
| `POST` | `/v2/changelogs/{id}` | Update entry |
| `DELETE` | `/v2/changelogs/{id}` | Delete entry |

### Changelog Fields

```typescript
interface ChangelogEntry {
  id: string;
  title: string;          // Max 255 chars
  content: string;        // Markdown supported
  publishedAt: string;    // ISO 8601
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}
```

### Create Changelog

```typescript
POST /v2/changelogs
{
  title: string,          // Required
  content: string,        // Required, markdown
  publishedAt: string,    // Required, ISO 8601
  tags?: string[]
}
```

## CI/CD Workflows

### Push Docs to Featurebase (`push-to-featurebase.yml`)
- **Trigger:** Push to `main` with changes in `docs/**/*.md`, or manual dispatch
- **Script:** `scripts/push-to-featurebase.mjs` — UPDATE ONLY (requires `featurebaseId`)
- **Skips:** Commits with `[skip-sync]` in message

### Validate Frontmatter (`validate-frontmatter.yml`)
- Validates that local frontmatter matches Featurebase articles

### Check Drift (`check-featurebase-drift.yml`)
- Detects drift between local docs and Featurebase

### Poll Chariot PRs (`poll-chariot-prs.yml`)
- Polls the Chariot repo for PRs that need documentation

## Required Secrets

| Secret | Purpose |
|--------|---------|
| `FEATUREBASE_API_KEY` | Sync docs to Featurebase |
| `ANTHROPIC_API_KEY` | Claude Code for proactive doc generation |
| `GITHUB_TOKEN` | Auto-provided; needs Chariot read access |

## Local Development

```bash
npm install                                  # Install dependencies
node scripts/push-to-featurebase.mjs --files "docs/path/to.md"  # Push specific file
node scripts/sync-to-featurebase.mjs --full-sync                 # Full sync all docs
node scripts/validate-frontmatter.mjs                            # Validate frontmatter
FEATUREBASE_API_KEY=sk_... node scripts/pull-from-featurebase.mjs  # Pull from Featurebase
```

## Content Guidelines

- Write in clear, concise language appropriate for a technical audience
- Use markdown formatting: headers, code blocks, tables, lists
- Include images via Featurebase-hosted URLs (not local paths)
- Keep titles descriptive and specific
- Always include a `description` in frontmatter for search
