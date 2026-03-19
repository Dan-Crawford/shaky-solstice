---
title: "Invicti"
description: "Invicti"
featurebaseId: "9978635"
---

## Overview

The Invicti integration connects the Praetorian Guard Platform (PGP) with Invicti (formerly Netsparker) to import web application scan results, discovered vulnerabilities, and target assets from your Invicti environment. By syncing vulnerability findings from Invicti, PGP consolidates your DAST results alongside other security data sources for unified risk management.

Organizations using Invicti for dynamic application security testing generate detailed vulnerability reports across their web application portfolio. This integration automatically imports scan results, extracts target URLs and hostnames as assets, and maps discovered vulnerabilities to risks within PGP. Each vulnerability includes severity, CVSS score, CWE classification, OWASP category, and remediation guidance, providing your security team with actionable context for prioritization.

This integration uses the Invicti REST API in a read-only capacity. PGP does not initiate scans, modify scan configurations, or alter any vulnerability states in your Invicti account.

## What the Integration Does

The Invicti integration queries the Invicti REST API to retrieve scan results and their associated vulnerabilities. For each scan, it fetches the detailed results and processes vulnerabilities that are in a "new" or "confirmed" state. Target URLs from scans are resolved to hostnames, which are imported as assets into PGP. Each vulnerability is mapped to a risk associated with the corresponding asset.

The integration extracts vulnerability details including name, severity, description, impact, remedial actions, external references, CVSS score, CWE identifier, and OWASP classification. Severity levels from Invicti (Critical, High, Medium, Low) are mapped directly to PGP severity levels. Vulnerabilities with states other than "new" or "confirmed" (such as "fixed" or "ignored") are excluded from import.

All operations are strictly read-only. PGP does not create scans, modify vulnerability states, or alter any configurations in your Invicti account.

## Prerequisites

Before setting up the Invicti integration, ensure you have:

- **An Invicti account** (Standard, Enterprise, or On-Premises) with completed scans
- **A User ID and API Token** from your Invicti account
- **API Base URL**: The URL of your Invicti instance API endpoint (e.g., `https://your-instance.invicti.com/api/1.0`)
- **Account permissions**: The API credentials must have at least read access to scans and scan results

### Creating API Credentials

1. Sign in to your Invicti instance.
2. Navigate to **Settings** > **API** (or your user profile's API settings).
3. Locate or generate your **User ID** and **API Token**.
4. Copy both values and store them securely.
5. Note your **API Base URL**, which follows the format `https://your-instance.invicti.com/api/1.0` for cloud-hosted instances, or your custom domain for on-premises deployments.

## Setup

1. In PGP, navigate to the **Integrations** page.
2. Select **Invicti** from the list of available integrations.
3. Enter your Invicti credentials and API Base URL in the configuration form.
4. Save the integration. PGP will validate connectivity to the Invicti API automatically.

### Field Reference

| Field | Description | Required |
|-------|-------------|----------|
| API Base URL | The base URL of your Invicti API (e.g., `https://your-instance.invicti.com/api/1.0`) | Yes |
| User ID | Your Invicti user identifier for API authentication | Yes |
| API Token | Your Invicti API token | Yes |

## What Data Is Synced

### Web Application Assets

The integration discovers target web applications from your Invicti scans and imports the hostnames as assets in PGP.

| Data Field | Source | Description |
|------------|--------|-------------|
| Hostname | Scan target URL, vulnerability URL | The hostname extracted from the scan target or vulnerability URL |
| Webpage URL | Scan target URL | The full URL of the scanned web application including path |
| Port | URL scheme | Derived from the URL (443 for HTTPS, 80 for HTTP, or explicit port) |

### Vulnerabilities (Risks)

Vulnerabilities from completed scans are imported as risks in PGP. Only vulnerabilities with a state of "new" or "confirmed" are imported.

| Data Field | Source | Description |
|------------|--------|-------------|
| Name | `name` | The vulnerability name, normalized for PGP risk naming conventions |
| Severity | `severity` | Mapped to PGP levels: Critical, High, Medium, Low, Info |
| Description | `description` | Detailed description of the vulnerability |
| Impact | `impact` | The potential impact of the vulnerability if exploited |
| Remediation | `remedialActions` | Recommended actions to remediate the vulnerability |
| CVSS Score | `cvssScore` | The CVSS score when available |
| CWE | `cwe` | The CWE identifier for the vulnerability class |
| OWASP | `owasp` | The OWASP category classification |
| External References | `externalReferences` | Links to external resources and advisories |
| First Seen | `firstSeen` | When the vulnerability was first detected by Invicti |
| Last Seen | `lastSeen` | When the vulnerability was most recently confirmed |
| State | `state` | The vulnerability state in Invicti (new, confirmed) |
| Invicti ID | `id` | The unique Invicti identifier for the vulnerability |

### Severity Mapping

| Invicti Severity | PGP Severity |
|------------------|--------------|
| Critical | Critical |
| High | High |
| Medium | Medium |
| Low | Low |
| (other) | Info |

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `{baseUrl}/scans/list?page=1&pageSize=100` | GET | List completed scans with pagination |
| `{baseUrl}/scans/{scanId}/result` | GET | Retrieve detailed scan results including vulnerabilities |

Authentication is performed using HTTP Basic authentication with the User ID and API Token encoded as a Base64 credential pair.

### Required API Permissions

| Permission | Type | Purpose |
|------------|------|---------|
| Read | API Token | Read access to scan list and scan results |

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| "No user id provided" | The User ID field is empty in the integration configuration | Enter your Invicti User ID in the integration settings |
| "No api token provided" | The API Token field is empty in the integration configuration | Enter your Invicti API Token in the integration settings |
| "No API base URL provided" | The API Base URL field is empty | Enter your Invicti API Base URL (e.g., `https://your-instance.invicti.com/api/1.0`) |
| "Invalid api url" | The API Base URL does not match the expected format | Ensure the URL follows the pattern `https://your-instance.invicti.com/api/1.0` |
| Credential validation failed (non-200 status) | The User ID, API Token, or API Base URL is incorrect | Verify all three credential fields are correct in both PGP and your Invicti account |
| No risks discovered | All vulnerabilities are in a "fixed" or "ignored" state, or no scans have been completed | Verify that your Invicti account has completed scans with active vulnerabilities in "new" or "confirmed" states |
| Integration times out | The account has a very large number of scans or vulnerabilities | The integration has a 240-second timeout. Contact support if your account requires a longer window |

## Security and Data Handling

The Invicti integration operates in a strictly read-only mode. It queries the Invicti REST API to read scan results and vulnerability data, and does not initiate scans, modify vulnerability states, or change any configurations in your Invicti account.

Credentials are handled securely within PGP. The Invicti User ID and API Token are encrypted at rest and used exclusively for API authentication via HTTP Basic auth during sync operations. The credentials are not persisted outside of PGP's encrypted credential store.

PGP does not access or store raw HTTP request/response data from Invicti scans. Only vulnerability metadata (names, severities, descriptions, and classifications) and target URL information are read and processed.

