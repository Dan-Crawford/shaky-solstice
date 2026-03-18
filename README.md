# Guard Documentation

Markdown source of truth for the [Praetorian Guard](https://guard.praetorian.com) help center. Changes merged to `main` are automatically synced to Featurebase.

## Structure

```
docs/
├── attack-surfaces/          # Attack surface documentation
├── capabilities/             # Security capability descriptions
├── enterprise-security/      # Compliance, data security, tenancy
├── integrations/             # Third-party integration guides
│   ├── cloud/
│   ├── firewalls/
│   └── ...
└── platform-documentation/   # Getting started, notifications, etc.
    ├── getting-started/
    ├── notifications/
    └── ...
```

## Writing Docs

Each markdown file has YAML frontmatter:

```yaml
---
title: "Article Title"
description: "Short description"
featurebaseId: "12345"  # Added automatically after first sync — don't set manually
draft: true             # Optional — marks article as draft in Featurebase
---

Your markdown content here.
```

### Draft Articles

Articles with `draft: true` in frontmatter are synced to Featurebase but kept unpublished. To publish a draft:

1. Remove the `draft: true` line (or set to `false`)
2. Open a PR
3. After merge, the sync Action publishes the article in Featurebase

### Adding a New Article

1. Create a `.md` file in the appropriate `docs/` subdirectory
2. Add `title` and `description` frontmatter (do **not** add `featurebaseId`)
3. Open a PR
4. After merge, the sync Action creates the article in Featurebase and opens a writeback PR with the new `featurebaseId`

### Editing an Existing Article

1. Edit the `.md` file
2. Open a PR
3. After merge, the sync Action updates the article in Featurebase

### Deleting an Article

1. Delete the `.md` file
2. Open a PR
3. After merge, the sync Action archives the article in Featurebase (does not hard-delete)

## Category Mapping

The **top-level folder** under `docs/` determines the Featurebase help center category:

| Folder | Featurebase Category |
|--------|---------------------|
| `attack-surfaces/` | Attack Surfaces |
| `capabilities/` | Capabilities |
| `enterprise-security/` | Enterprise Security |
| `integrations/` | Integrations |
| `platform-documentation/` | Platform Documentation |

## Images

Images are referenced in markdown and stored in the `images/` directory (mirrors `docs/` structure). The image upload pipeline is coming soon — for now, use Featurebase-hosted URLs.

## Local Commands

```bash
npm install                              # Install dependencies
npm run sync -- --files docs/path/to.md  # Sync specific file
npm run sync:full                        # Sync all docs
```

Requires `FEATUREBASE_API_KEY` environment variable.

## CI/CD

- **On merge to main:** Changed docs are automatically synced to Featurebase
- **Manual full sync:** Trigger via GitHub Actions → "Sync Docs to Featurebase" → Run workflow → check "full-sync"
