---
title: "Legit Security"
description: "Import software supply chain security findings and CI/CD pipeline risks from Legit Security into the Guard Platform."
---

## Overview

The Legit Security integration connects the Praetorian Guard Platform (PGP) with Legit Security to import code repositories, CI/CD pipeline configurations, and software supply chain security findings from your Legit Security environment. By syncing your Legit Security data, PGP extends attack surface visibility into your software development lifecycle, capturing risks that originate in source code, build pipelines, and deployment processes.

Modern software supply chains span source code repositories, build systems, artifact registries, and deployment pipelines. Legit Security provides deep visibility into these components and identifies security risks such as exposed secrets, misconfigured pipelines, unprotected branches, and vulnerable dependencies. This integration imports those findings into PGP, allowing your security team to manage supply chain risks alongside infrastructure and application vulnerabilities in a single platform.

This integration uses the Legit Security API in a read-only capacity. PGP does not modify, create, or delete any repositories, pipelines, policies, or findings in your Legit Security account.

## What the Integration Does

The Legit Security integration queries the Legit Security API to retrieve inventoried software assets and their associated security findings. It discovers code repositories, CI/CD pipelines, artifact registries, and deployment targets, then imports qualifying items as assets into PGP. Security findings such as secret exposure, pipeline misconfigurations, and dependency vulnerabilities are mapped to risks associated with the corresponding assets.

The integration extracts metadata for each software asset, including repository URLs, pipeline endpoints, and associated SCM platforms. Security findings include severity, category, description, and remediation guidance from Legit Security's analysis engine. This data is correlated with other PGP assets to provide a holistic view of your organization's attack surface.

All operations are strictly read-only. PGP does not modify repositories, pipeline configurations, policies, or finding states in your Legit Security account.

## Prerequisites

Before setting up the Legit Security integration, ensure you have:

- **A Legit Security account** with connected SCM platforms and CI/CD systems
- **An API key** from your Legit Security account with read access
- **API Base URL**: The URL of your Legit Security instance API endpoint
- **Account permissions**: The API key must have at least read access to assets and findings

### Creating API Credentials

1. Sign in to your Legit Security instance.
2. Navigate to **Settings** > **API Keys** (or **Administration** > **API Access**).
3. Click **Generate API Key**.
4. Provide a name (e.g., "Praetorian Guard Platform") and set permissions to read-only.
5. Copy the generated API key immediately. Store it securely.
6. Note your **API Base URL**, which is typically `https://your-instance.legitsecurity.com/api`.

## Setup

1. In PGP, navigate to the **Integrations** page.
2. Select **Legit Security** from the list of available integrations.
3. Enter your Legit Security API key and API Base URL in the configuration form.
4. Save the integration. PGP will validate connectivity to the Legit Security API automatically.

### Field Reference

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Legit Security API key with read access | Yes |
| API Base URL | The base URL of your Legit Security API instance | Yes |

## What Data Is Synced

### Code Repositories (Assets)

The integration discovers source code repositories connected to Legit Security and imports them as assets in PGP.

| Data Field | Source | Description |
|------------|--------|-------------|
| Repository Name | Repository metadata | The name of the code repository |
| Repository URL | Repository metadata | The URL of the repository (e.g., GitHub, GitLab, Bitbucket) |
| SCM Platform | Repository metadata | The source code management platform hosting the repository |
| Visibility | Repository metadata | Whether the repository is public or private |
| Default Branch | Repository metadata | The default branch of the repository |

### CI/CD Pipelines (Assets)

Build and deployment pipelines connected to Legit Security are imported as assets.

| Data Field | Source | Description |
|------------|--------|-------------|
| Pipeline Name | Pipeline metadata | The name of the CI/CD pipeline |
| Pipeline URL | Pipeline metadata | The URL of the pipeline in the CI/CD platform |
| Platform | Pipeline metadata | The CI/CD platform (e.g., GitHub Actions, Jenkins, CircleCI) |
| Last Run Status | Pipeline metadata | The status of the most recent pipeline execution |

### Security Findings (Risks)

Security findings from Legit Security's analysis are imported as risks in PGP.

| Data Field | Source | Description |
|------------|--------|-------------|
| Finding Name | Finding details | The name or title of the security finding |
| Severity | Finding details | Mapped to PGP severity levels (Critical, High, Medium, Low, Info) |
| Category | Finding details | The finding category (e.g., secret exposure, pipeline misconfiguration, dependency vulnerability) |
| Description | Finding details | Detailed description of the finding and its implications |
| Remediation | Finding details | Recommended actions to resolve the finding |
| Asset Reference | Finding details | The repository or pipeline associated with the finding |

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `{baseUrl}/v1/repositories` | GET | List all discovered code repositories |
| `{baseUrl}/v1/pipelines` | GET | List all discovered CI/CD pipelines |
| `{baseUrl}/v1/findings` | GET | Retrieve security findings with severity and categorization |
| `{baseUrl}/v1/assets` | GET | Retrieve all software supply chain assets |

The integration uses pagination to handle large datasets and processes all pages of results.

### Required API Permissions

| Permission | Type | Purpose |
|------------|------|---------|
| Read | API Key | Read access to repositories, pipelines, assets, and findings |

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| "Authentication failed" or 401 error | The API key is incorrect or has been revoked | Generate a new API key in the Legit Security console and update it in PGP |
| "Authorization failed" or 403 error | The API key lacks sufficient permissions | Verify the API key has read access to assets and findings |
| No assets discovered | Legit Security has no connected SCM platforms or CI/CD systems, or syncs have not completed | Verify that Legit Security has active integrations with synced data |
| Missing security findings | No findings have been generated, or all findings have been resolved | Verify findings are present in your Legit Security dashboard |
| Invalid API Base URL | The API Base URL is incorrect or unreachable | Verify the URL matches your Legit Security instance (e.g., `https://your-instance.legitsecurity.com/api`) |

## Security and Data Handling

The Legit Security integration operates in a strictly read-only mode. It queries the Legit Security API to read asset metadata and security findings, and does not modify any repositories, pipelines, policies, or finding states.

Credentials are handled securely within PGP. The Legit Security API key is encrypted at rest and used exclusively for API authentication during sync operations. The API key is not persisted outside of PGP's encrypted credential store.

PGP does not access or store source code, build artifacts, secrets, or credentials discovered by Legit Security. Only asset metadata (repository names, URLs, pipeline configurations) and security finding summaries are read and processed.
