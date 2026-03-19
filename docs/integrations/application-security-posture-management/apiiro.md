---
title: "Apiiro"
description: "Import application risks, code repository inventory, and security findings from Apiiro into the Guard Platform."
featurebaseId: "4149418"
---

## Overview

The Apiiro integration connects the Praetorian Guard Platform (PGP) with your Apiiro Application Security Posture Management (ASPM) platform, importing application risks, code repository inventory, and security findings directly into your attack surface. Apiiro provides deep visibility into application risk from design through production — PGP imports these findings as risks and assets so they can be prioritized alongside vulnerabilities from every other source in your environment.

This integration is ideal for organizations using Apiiro who want to correlate application-layer risks with their broader attack surface. Instead of managing code-level security findings in isolation, PGP maps them to discovered assets, enriches them with platform context, and applies consistent prioritization across all vulnerability sources — from infrastructure to application code.

## What the Integration Does

When connected, PGP performs a **read-only** import from the Apiiro REST API:

- **Security Findings as Risks**: Security risks identified by Apiiro — including code vulnerabilities, secrets in code, open-source dependency risks, and API security issues — are imported as PGP risks. Severity ratings and risk categories are preserved, and metadata including the repository, file path, and remediation guidance is stored as proof artifacts.

- **Code Repositories as Assets**: Repositories monitored by Apiiro are imported as PGP assets, giving you a complete inventory of your application codebase and its security posture.

- **Application Inventory as Seeds**: Application endpoints and API URLs discovered by Apiiro are imported as PGP seeds, feeding them into the Guard discovery and scanning pipeline for continuous monitoring.

Data flows **one direction only** — from Apiiro into PGP. The integration never writes back to Apiiro, modifies risk statuses, or changes repository configurations.

## Prerequisites

Before setting up the integration, you need an Apiiro API token:

1. Log in to your Apiiro platform at your organization's Apiiro URL

2. Navigate to **Settings**, then **Integrations** or **API Access**

3. Generate a new **API Token** with read-only permissions

4. Record the **API Token** and your **Apiiro Instance URL** (e.g., `https://app.apiiro.com` or your custom domain)

The API token must have permissions to read applications, repositories, and risk findings.

## Setup

1. Go to **Integrations, then Application Security, then Apiiro** in the Guard Platform

2. Enter your credentials in the setup form

3. Click **Connect** — PGP will validate your credentials by attempting to fetch your application inventory before saving

| Field | Description | Required |
| --- | --- | --- |
| **Instance URL** | Your Apiiro instance URL (e.g., `https://app.apiiro.com`) | Yes |
| **API Token** | Your Apiiro API token with read access | Yes |

If validation fails, verify that your API token has the correct permissions and that the instance URL is reachable.

## What Data Is Synced

### Security Findings

Each Apiiro risk finding creates a PGP risk with:

- **Risk name**: Derived from the finding title and category
- **Severity**: Critical, High, Medium, or Low — preserved from the Apiiro risk score
- **Proof artifacts**: Repository name, file path, branch, risk category, remediation guidance, and finding ID
- **Description**: Full vulnerability details and context from Apiiro

**Risk category mapping**: Apiiro risk categories map to PGP risk types:

| Apiiro Risk Category | PGP Risk Type |
| --- | --- |
| Code Vulnerability | Application Vulnerability |
| Secret in Code | Exposed Secret |
| Open Source Risk | Dependency Vulnerability |
| API Security | API Risk |
| IaC Misconfiguration | Configuration Risk |

### Code Repositories

Repositories monitored by Apiiro are imported as assets with:

- **Asset name**: Repository name (e.g., `org/repo-name`)
- **Asset type**: Code repository
- **Metadata**: Repository URL, primary language, last scan date, and risk summary

### Application Endpoints

API and application endpoints discovered by Apiiro are imported as seeds:

| Apiiro Element | PGP Seed Type |
| --- | --- |
| API endpoint URL | Web Application Seed |
| Application domain | Domain Seed |

## API Endpoints Used

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/v1/applications` | GET | Fetch all applications and repositories in your Apiiro inventory |
| `/api/v1/risks` | GET | Fetch security risk findings (paginated) |
| `/api/v1/risks/{riskId}` | GET | Fetch detailed information for a specific risk finding |

**Base URL**: Your Apiiro instance URL (e.g., `https://app.apiiro.com`)

All requests use Bearer token authentication over HTTPS. The integration paginates through all findings in a single sync.

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| Validation fails on connect | API token is incorrect, expired, or lacks permissions | Generate a new API token in Apiiro Settings with read access |
| Instance URL rejected | URL is malformed or unreachable | Verify the Apiiro instance URL is correct and accessible from your network |
| No risks appearing | Apiiro has not completed scanning your repositories | Allow time for Apiiro to complete its initial analysis, then re-sync |
| Missing repositories | API token may be scoped to specific teams or applications | Ensure the API token has access to all applications you want to import |
| Stale risk data | Sync interval has not elapsed since last Apiiro scan | PGP syncs periodically — new findings will appear after the next sync cycle |

## Security and Data Handling

- **Read-only access**: The integration only reads data from Apiiro. It never creates, modifies, or deletes risk findings, repositories, or application configurations.

- **Credential handling**: Your API Token is stored as an encrypted credential within PGP and is never exposed in logs or the UI after initial entry.

- **Authentication**: The API token is transmitted as a Bearer token in the Authorization header over HTTPS to the Apiiro API.

- **Data filtering**: Risks pass through PGP standard VM filter rules, allowing you to control which severity levels or risk categories are imported.
