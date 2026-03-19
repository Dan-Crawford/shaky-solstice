## Overview

The Snyk Code integration connects the Praetorian Guard Platform (PGP) with your Snyk Code Static Application Security Testing (SAST) scanner, importing code-level vulnerabilities, security issues, and remediation guidance directly into your risk inventory. Snyk Code performs real-time semantic analysis of your source code to detect vulnerabilities such as injection flaws, hardcoded secrets, cross-site scripting, and insecure data handling. PGP imports these findings so they can be correlated with your broader attack surface and prioritized alongside infrastructure and cloud vulnerabilities.

This integration is valuable for organizations that want a unified view of application-layer risk alongside external attack surface data. Rather than treating SAST findings in isolation, PGP connects code vulnerabilities to the assets and services they affect, giving security teams the context needed to prioritize what matters most. When a code vulnerability maps to a public-facing application already tracked in PGP, the combined risk picture drives faster, more informed remediation decisions.

## What the Integration Does

When connected, PGP performs a **read-only** import from the Snyk Code API:

- **Code Vulnerabilities as Risks**: Each Snyk Code finding — including the vulnerability type, severity, affected file, and line number — is imported as a risk in PGP. This includes issues such as SQL injection, path traversal, cross-site scripting, and insecure deserialization.

- **Remediation Guidance**: Snyk Code provides fix examples and remediation advice for each issue. This guidance is imported alongside each risk, giving your team actionable steps directly within PGP.

- **Project and Repository Context**: Snyk Code findings are organized by project (typically a repository). PGP imports project metadata — including repository URL, branch, and target file — to associate vulnerabilities with the correct application assets.

- **Issue Priority Scores**: Snyk priority scores, which factor in exploitability, reachability, and business context, are imported to enrich PGP risk prioritization.

Data flows **one direction only** — from Snyk Code into PGP. The integration never writes back to Snyk, modifies scan configurations, or changes issue statuses.

## Prerequisites

Before setting up the integration, you need a Snyk API token with access to Snyk Code projects:

1. Log in to the [Snyk Web UI](https://app.snyk.io)

2. Click your **account avatar** in the bottom-left corner and select **Account Settings**

3. Under the **General** tab, locate the **Auth Token** section

4. Click **Generate Token** (or copy your existing token)

5. Record the **API Token** — it will be used to authenticate PGP

6. Ensure that **Snyk Code** is enabled for the target organization(s) under **Settings > Snyk Code**

7. Verify that the token owner has access to the organizations and projects containing your Snyk Code scan results

The API token must belong to a user or service account with permissions to read project and issue data for Snyk Code projects.

## Setup

1. Go to **Integrations, then Application Security, then Snyk Code** in the Guard Platform

2. Enter your Snyk API token and organization details in the setup form

3. Click **Connect** — PGP will validate your credentials by attempting to fetch your Snyk Code projects before saving

| Field | Description | Required |
| --- | --- | --- |
| **API Token** | Your Snyk API token or service account token | Yes |
| **Organization ID** | The Snyk organization ID containing Snyk Code projects. Found in your Snyk organization settings. | Yes |
| **API Base URL** | The Snyk API base URL. Defaults to `https://api.snyk.io`. Use `https://api.eu.snyk.io` for EU-hosted tenants. | No |

If validation fails, verify that your API token has access to the specified organization and that Snyk Code is enabled.

## What Data Is Synced

### Code Vulnerabilities

Each Snyk Code finding creates a risk in PGP with:

- **Risk name**: Derived from the vulnerability type (e.g., "SQL Injection", "Cross-site Scripting")
- **Severity**: Critical, High, Medium, or Low — mapped from the Snyk severity rating
- **Metadata**: Affected file path, line number range, CWE identifier, and vulnerability category

### Project and Repository Mapping

Snyk Code projects are associated with PGP assets:

| Snyk Code Element | PGP Mapping |
| --- | --- |
| Project name | Associated asset name |
| Repository URL | Asset metadata (source repository) |
| Target branch | Asset metadata (branch) |
| Target file/manifest | Asset metadata (entry point) |

### Remediation Guidance

For each imported vulnerability:

| Remediation Field | Description |
| --- | --- |
| Fix example | Code example showing how to resolve the vulnerability |
| Explanation | Description of why the code is vulnerable |
| References | Links to external resources (CWE, OWASP) |

### Priority Scores

Snyk priority scores are imported to augment PGP risk prioritization:

- **Priority score** (0-1000): Composite score factoring severity, exploitability, and reachability
- **Exploitability**: Whether public exploits exist for the vulnerability class
- **Reachability**: Whether the vulnerable code path is reachable at runtime

## API Endpoints Used

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/rest/orgs/{org_id}/projects` | GET | Fetch all Snyk Code projects in the organization |
| `/rest/orgs/{org_id}/issues` | GET | Fetch code vulnerabilities and security issues |
| `/v1/org/{org_id}/project/{project_id}/aggregated-issues` | POST | Fetch aggregated issues for a specific project |
| `/v1/org/{org_id}/project/{project_id}` | GET | Fetch project details including repository and branch |

**Base URL**: `https://api.snyk.io` (or `https://api.eu.snyk.io` for EU tenants)

All requests are authenticated using an `Authorization: token {api_token}` header over HTTPS. The integration filters for Snyk Code (SAST) project types and paginates through all results during each sync.

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| Validation fails on connect | API token is invalid or expired | Generate a new API token in Snyk Account Settings |
| No risks appearing | Snyk Code is not enabled for the organization | Enable Snyk Code under Settings > Snyk Code in your Snyk organization |
| No projects found | Organization has no repositories imported for SAST scanning | Import repositories into Snyk and ensure Snyk Code scans have completed |
| Missing remediation data | Snyk Code has not generated fix suggestions for the issue | Not all issues include fix examples — this is expected for some vulnerability types |
| 403 Forbidden errors | Token lacks permissions for the target organization | Ensure the token owner is a member of the organization with project read access |
| EU tenant not connecting | Wrong API base URL | Set the API Base URL to `https://api.eu.snyk.io` for EU-hosted Snyk tenants |

## Security and Data Handling

- **Read-only access**: The integration only reads data from Snyk Code. It never creates, modifies, or deletes projects, scan configurations, or issue statuses in your Snyk environment.

- **Credential handling**: Your Snyk API token is stored as an encrypted credential within PGP and is never exposed in logs or the UI after initial entry.

- **Authentication**: The API token is transmitted via HTTPS in the Authorization header for every request.

- **Data filtering**: Imported risks pass through PGP standard filtering rules, allowing you to control which code vulnerabilities are included in your risk inventory.
