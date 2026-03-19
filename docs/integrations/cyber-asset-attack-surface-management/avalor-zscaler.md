---
title: "Avalor (Zscaler)"
description: "Avalor (Zscaler)"
featurebaseId: "4573264"
---

## Overview

The Avalor (Zscaler) integration connects the Praetorian Guard Platform (PGP) with Avalor's security data fabric, now part of Zscaler. Avalor aggregates and normalizes security data across your entire stack — vulnerability scanners, endpoint tools, cloud platforms, and identity systems — and produces unified risk analytics and posture scores. By importing this consolidated data into PGP, you gain a single view of your security posture enriched with Avalor's cross-source risk correlation, without needing to configure each underlying tool individually.

This integration is designed for organizations that use Avalor as their central security data aggregation layer. Rather than duplicating integrations, PGP pulls the already-normalized asset inventory, risk scores, and posture findings from Avalor, combining them with PGP's continuous threat exposure management capabilities. The result is a more complete picture of your attack surface backed by Avalor's data fabric analytics.

## What the Integration Does

When connected, PGP performs a **read-only** import from the Avalor API:

- **Assets**: Avalor's unified asset inventory — servers, endpoints, cloud resources, applications, and identities — is imported into PGP as assets. Each asset includes normalized metadata aggregated from the underlying security tools feeding into Avalor.
- **Risk Scores and Posture Data**: Risk analytics produced by Avalor, including composite risk scores, coverage gaps, and posture assessments, are imported as risk metadata attached to the corresponding PGP assets.
- **Security Findings**: Vulnerability and misconfiguration findings that Avalor has correlated across multiple data sources are imported into PGP, providing deduplicated and enriched risk context.

Data flows **one direction only** — from Avalor into PGP. The integration never writes back to Avalor or modifies any data in the Avalor platform.

## Prerequisites

Before setting up the integration, you need Avalor API credentials:

- Log in to the [Avalor platform](https://app.avalor.io) (or your Zscaler-provisioned Avalor instance)
- Navigate to **Settings > API Access**
- Click **Generate API Key**
- Record the following values:
- **API Key**: The generated key for authenticating API requests
- **Avalor Instance URL**: Your Avalor tenant URL (e.g., `https://your-org.avalor.io`)
- Ensure the API key has **read-only** permissions to asset and risk data

The API key must have sufficient scope to read assets, findings, and risk scores from your Avalor tenant.

## Setup

- Go to **Integrations, then Security Analytics, then Avalor (Zscaler)** in the Guard Platform
- Enter your Avalor API credentials in the setup form
- Click **Connect** — PGP will validate your credentials by attempting to fetch asset data before saving

| Field | Description | Required |
| --- | --- | --- |
| **Instance URL** | Your Avalor tenant URL (e.g., `https://your-org.avalor.io`) | Yes |
| **API Key** | The API key generated from Avalor's API Access settings | Yes |

If validation fails, verify that your API key has the correct read permissions and that the instance URL matches your Avalor tenant.

## What Data Is Synced

### Assets

Avalor's unified asset inventory is imported with:

- **Asset name**: Derived from the asset identifier in Avalor (hostname, IP, cloud resource ID)
- **Asset type**: Mapped from Avalor's asset classification (server, endpoint, cloud resource, application)
- **Metadata**: Source tools, risk score, coverage status, last seen timestamp, and business context tags

### Risk Analytics

Risk posture data from Avalor is attached to corresponding assets:

| Avalor Data | PGP Mapping |
| --- | --- |
| Composite risk score | Risk metadata on asset |
| Coverage gaps (missing agent, missing scanner) | Risk finding |
| Posture assessment results | Risk metadata on asset |
| Correlated vulnerability findings | Risk finding with severity |

### Security Findings

Deduplicated findings from Avalor are imported as risks:

- **Finding name**: Vulnerability or misconfiguration title from Avalor
- **Severity**: Mapped from Avalor's normalized severity (critical, high, medium, low)
- **Source tools**: List of underlying tools that contributed to the finding
- **Affected asset**: Linked to the corresponding PGP asset

## API Endpoints Used

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/v1/assets` | GET | Fetch unified asset inventory |
| `/api/v1/assets/{id}/risks` | GET | Fetch risk scores and posture data for an asset |
| `/api/v1/findings` | GET | Fetch correlated security findings |
| `/api/v1/findings/{id}` | GET | Fetch detailed finding metadata |
| `/api/v1/sources` | GET | Fetch connected data source status |

**Base URL**: Your Avalor instance URL (e.g., `https://your-org.avalor.io`)

All requests are authenticated using the API key passed in the request header over HTTPS.

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| Validation fails on connect | API key is incorrect or expired | Regenerate the API key in Avalor under Settings > API Access |
| No assets appearing | API key lacks read permissions for asset data | Verify the API key scope includes asset and finding read access |
| Missing risk scores | Risk analytics have not been computed for imported assets | Ensure Avalor has completed at least one data aggregation cycle for your connected sources |
| Stale data | Avalor data sources are not syncing | Check the data source status in Avalor to confirm upstream integrations are active |
| Connection timeout | Network or firewall blocking outbound requests to Avalor | Verify that PGP can reach your Avalor instance URL over HTTPS (port 443) |

## Security and Data Handling

- **Read-only access**: The integration only reads data from Avalor. It never creates, modifies, or deletes assets, findings, or configurations in the Avalor platform.
- **Credential handling**: Your API key is stored as an encrypted credential within PGP and is never exposed in logs or the UI after initial entry.
- **Authentication**: The API key is transmitted over HTTPS in request headers for every API call.
- **Data filtering**: Imported assets and findings pass through PGP standard filtering rules, allowing you to control which data is included in your attack surface.
