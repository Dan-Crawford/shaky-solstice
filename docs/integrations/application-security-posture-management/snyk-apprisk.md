---
title: "Snyk AppRisk"
description: "Import application assets, risk scores, and coverage gaps from Snyk AppRisk into the Guard Platform."
featurebaseId: "7197554"
---

## Overview

The Snyk AppRisk integration connects the Praetorian Guard Platform (PGP) with your Snyk AppRisk environment, importing application assets, risk scores, and coverage gaps directly into your attack surface inventory. Snyk AppRisk provides Application Security Posture Management (ASPM) by discovering developer assets across your software development lifecycle and evaluating which repositories, packages, and applications have adequate security coverage. PGP imports this data so you can correlate application security posture with your broader external attack surface.

This integration is ideal for organizations using Snyk AppRisk to manage application security at scale. Rather than switching between PGP and the Snyk console to understand where coverage gaps exist, this integration brings application asset inventories and risk classifications into a single view alongside your infrastructure assets, vulnerabilities, and threat intelligence. Security teams gain unified visibility into which applications are covered by security tooling and which represent unmanaged risk.

## What the Integration Does

When connected, PGP performs a **read-only** import from the Snyk AppRisk API:

- **Application Assets**: Each application asset discovered by Snyk AppRisk — including repositories, container images, and packages — is imported as a PGP asset. Asset metadata such as repository URL, programming language, and business criticality are captured alongside each asset record.

- **Risk Scores and Classifications**: Snyk AppRisk risk scores and risk factor breakdowns are imported as risk metadata on each asset, allowing you to prioritize remediation based on application-level risk context within PGP.

- **Coverage Gaps**: Assets identified by Snyk AppRisk as lacking security tool coverage (e.g., no SAST scanner, no SCA scanner) are flagged, giving you visibility into where your application security program has blind spots.

- **Policy Violations**: Policy evaluation results from Snyk AppRisk are imported, surfacing applications that violate your organization's security policies.

Data flows **one direction only** — from Snyk AppRisk into PGP. The integration never writes back to Snyk, modifies asset classifications, or changes policies.

## Prerequisites

Before setting up the integration, you need a Snyk API token with access to AppRisk data:

1. Log in to the [Snyk Web UI](https://app.snyk.io)

2. Click your **account avatar** in the bottom-left corner and select **Account Settings**

3. Under the **General** tab, locate the **Auth Token** section

4. Click **Generate Token** (or copy your existing token)

5. Record the **API Token** — it will be used to authenticate PGP

6. Ensure your Snyk organization has **Snyk AppRisk** enabled and that the token has access to the organization(s) you want to import

The API token must belong to a user or service account with sufficient permissions to read AppRisk asset and issue data across your target organizations.

## Setup

1. Go to **Integrations, then Application Security, then Snyk AppRisk** in the Guard Platform

2. Enter your Snyk API token and organization details in the setup form

3. Click **Connect** — PGP will validate your credentials by attempting to fetch your application assets before saving

| Field | Description | Required |
| --- | --- | --- |
| **API Token** | Your Snyk API token or service account token | Yes |
| **Organization ID** | The Snyk organization ID to import assets from. Found in your Snyk organization settings. | Yes |
| **Group ID** | The Snyk group ID, if importing across multiple organizations within a group | No |
| **API Base URL** | The Snyk API base URL. Defaults to `https://api.snyk.io`. Use `https://api.eu.snyk.io` for EU-hosted tenants. | No |

If validation fails, verify that your API token has access to the specified organization and that Snyk AppRisk is enabled for that organization.

## What Data Is Synced

### Application Assets

Each application asset discovered by Snyk AppRisk creates a PGP asset with:

- **Asset name**: Derived from the repository name, package name, or container image identifier
- **Asset type**: Application asset
- **Metadata**: Repository URL, source control manager, programming language, business criticality, asset class, and discovery source

### Risk Scores

Risk score data is attached to each application asset:

| Snyk AppRisk Field | PGP Mapping |
| --- | --- |
| Overall risk score | Risk score metadata on asset |
| Risk factors (e.g., deployed, public-facing) | Risk factor tags |
| Business criticality | Asset criticality level |
| Coverage status (covered/uncovered) | Coverage gap indicator |

### Coverage Gaps

Assets missing security tool coverage are imported with gap indicators:

| Coverage Type | Description |
| --- | --- |
| SAST coverage | Whether the asset is scanned by a static analysis tool |
| SCA coverage | Whether the asset is scanned for open-source dependency vulnerabilities |
| Container coverage | Whether container images are scanned for vulnerabilities |
| IaC coverage | Whether infrastructure-as-code files are scanned |

### Policy Violations

Policy results from Snyk AppRisk are imported as risks associated with the relevant application asset, including the policy name, severity, and violation details.

## API Endpoints Used

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/rest/orgs/{org_id}/assets` | GET | Fetch all application assets discovered by AppRisk |
| `/rest/orgs/{org_id}/assets/{asset_id}` | GET | Fetch detailed metadata for a specific asset |
| `/rest/orgs/{org_id}/issues` | GET | Fetch issues and policy violations associated with assets |
| `/rest/groups/{group_id}/orgs` | GET | List organizations within a group (when group ID is provided) |

**Base URL**: `https://api.snyk.io` (or `https://api.eu.snyk.io` for EU tenants)

All requests are authenticated using an `Authorization: token {api_token}` header over HTTPS. The integration uses the Snyk REST API (versioned) and paginates through all results during each sync.

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| Validation fails on connect | API token is invalid or expired | Generate a new API token in Snyk Account Settings |
| No assets appearing | Snyk AppRisk is not enabled for the organization | Enable Snyk AppRisk in your Snyk organization settings or contact your Snyk account team |
| Missing coverage data | Assets exist but coverage analysis has not completed | Wait for Snyk AppRisk to complete its initial asset discovery and coverage analysis |
| Only partial assets imported | Token is scoped to a single organization | Provide the Group ID to import assets across all organizations in the group |
| 403 Forbidden errors | Token lacks permissions for AppRisk data | Ensure the token belongs to a user or service account with access to AppRisk features |
| EU tenant not connecting | Wrong API base URL | Set the API Base URL to `https://api.eu.snyk.io` for EU-hosted Snyk tenants |

## Security and Data Handling

- **Read-only access**: The integration only reads data from Snyk AppRisk. It never creates, modifies, or deletes assets, policies, or configurations in your Snyk environment.

- **Credential handling**: Your Snyk API token is stored as an encrypted credential within PGP and is never exposed in logs or the UI after initial entry.

- **Authentication**: The API token is transmitted via HTTPS in the Authorization header for every request.

- **Data filtering**: Imported assets pass through PGP standard filtering rules, allowing you to control which application assets and risk data are included in your attack surface.
