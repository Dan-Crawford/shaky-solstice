---
title: "ArmorCode"
description: "Import consolidated security findings from ArmorCode's application security orchestration platform into the Guard Platform."
featurebaseId: "6955883"
---

## Overview

The ArmorCode integration connects the Praetorian Guard Platform (PGP) with your ArmorCode application security orchestration and correlation (ASOC) platform, importing consolidated security findings and vulnerability data into your attack surface. ArmorCode aggregates findings from dozens of security tools into a single unified view — PGP imports these correlated findings as risks so they can be managed alongside every other vulnerability source in your environment.

This integration is ideal for organizations using ArmorCode as their central security findings aggregator who want to bring that consolidated data into PGP for attack surface correlation and continuous testing. Instead of connecting PGP to each individual scanner separately, you can use ArmorCode as a single source of deduplicated, correlated findings that flow into PGP with full context.

## What the Integration Does

When connected, PGP performs a **read-only** import from the ArmorCode REST API:

- **Security Findings as Risks**: Findings from ArmorCode — including vulnerabilities from SAST, DAST, SCA, container scanning, cloud security, and other integrated tools — are imported as PGP risks. Severity ratings, tool source, and correlation context are preserved, and metadata including the affected asset, remediation guidance, and finding status is stored as proof artifacts.

- **Product and Sub-Product Inventory as Assets**: ArmorCode products and sub-products (representing applications, services, and components) are imported as PGP assets, providing a structured inventory of your application landscape.

- **Affected Targets as Seeds**: URLs, domains, and IP addresses associated with findings are imported as PGP seeds, feeding them into the Guard discovery and scanning pipeline.

Data flows **one direction only** — from ArmorCode into PGP. The integration never writes back to ArmorCode, modifies findings, or changes product configurations.

## Prerequisites

Before setting up the integration, you need an ArmorCode API key:

1. Log in to your ArmorCode platform at your organization's ArmorCode URL

2. Navigate to **Settings**, then **API Keys**

3. Click **Generate API Key**

4. Assign the key **read-only** permissions for findings and products

5. Record the **API Key** — it is only shown once

6. Note your **ArmorCode Tenant URL** (e.g., `https://app.armorcode.com` or your custom tenant URL)

The API key must have permissions to read findings, products, and sub-products.

## Setup

1. Go to **Integrations, then Application Security, then ArmorCode** in the Guard Platform

2. Enter your credentials in the setup form

3. Click **Connect** — PGP will validate your credentials by attempting to fetch your product inventory before saving

| Field | Description | Required |
| --- | --- | --- |
| **Tenant URL** | Your ArmorCode tenant URL (e.g., `https://app.armorcode.com`) | Yes |
| **API Key** | Your ArmorCode API key with read access | Yes |

If validation fails, verify that your API key has the correct permissions and that the tenant URL is reachable.

## What Data Is Synced

### Security Findings

Each ArmorCode finding creates a PGP risk with:

- **Risk name**: Derived from the finding title
- **Severity**: Critical, High, Medium, Low, or Informational — preserved from the ArmorCode severity
- **Proof artifacts**: Tool source (e.g., Checkmarx, Snyk, Prisma Cloud), finding category, affected asset, CWE/CVE identifiers, and remediation guidance
- **Description**: Full vulnerability details and correlation context from ArmorCode

**Status mapping**: ArmorCode finding status maps to PGP status:

| ArmorCode Status | PGP Status |
| --- | --- |
| Open | Triage |
| In Progress | Open |
| Risk Accepted | Open |
| Resolved | Remediated |
| False Positive | Deleted |
| Duplicate | Deleted |

### Products and Sub-Products

ArmorCode products are imported as assets with:

- **Asset name**: Product or sub-product name
- **Asset type**: Application
- **Metadata**: Product ID, environment, team ownership, and associated tool integrations

### Affected Targets

Targets associated with findings are imported as seeds:

| ArmorCode Element | PGP Seed Type |
| --- | --- |
| Affected URL | Web Application Seed |
| Affected domain | Domain Seed |
| Affected IP address | IPv4 Asset |
| Repository URL | Code Repository Seed |

## API Endpoints Used

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/v1/products` | GET | Fetch all products in your ArmorCode tenant |
| `/api/v1/subproducts` | GET | Fetch sub-products within each product |
| `/api/v2/findings` | GET | Fetch security findings (paginated, with filters) |
| `/api/v2/findings/{findingId}` | GET | Fetch detailed information for a specific finding |

**Base URL**: Your ArmorCode tenant URL (e.g., `https://app.armorcode.com`)

All requests use API key authentication over HTTPS. The integration paginates through all findings in a single sync.

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| Validation fails on connect | API key is incorrect, expired, or lacks permissions | Generate a new API key in ArmorCode Settings with read access |
| Tenant URL rejected | URL is malformed or unreachable | Verify the ArmorCode tenant URL is correct and accessible from your network |
| No risks appearing | ArmorCode has no findings or findings are all marked as False Positive/Duplicate | Check your ArmorCode dashboard for active findings in Open or In Progress state |
| Missing product data | API key may be scoped to specific products or teams | Ensure the API key has access to all products you want to import |
| Duplicate risks from multiple tools | ArmorCode may report the same vulnerability from multiple scanners | ArmorCode correlates findings before export — if duplicates persist, review correlation rules in ArmorCode |

## Security and Data Handling

- **Read-only access**: The integration only reads data from ArmorCode. It never creates, modifies, or deletes findings, products, or configurations.

- **Credential handling**: Your API Key is stored as an encrypted credential within PGP and is never exposed in logs or the UI after initial entry.

- **Authentication**: The API key is transmitted in the request header over HTTPS to the ArmorCode API.

- **Data filtering**: Risks pass through PGP standard VM filter rules, allowing you to control which severity levels or finding categories are imported.
