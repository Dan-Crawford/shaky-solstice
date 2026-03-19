---
title: "SOCRadar"
description: "SOCRadar"
featurebaseId: "4551156"
---

## Overview

The SOCRadar integration connects the Praetorian Guard Platform (PGP) with your SOCRadar External Attack Surface Management and Threat Intelligence platform, importing digital risk findings, exposed assets, and threat intelligence directly into your attack surface inventory. SOCRadar continuously monitors the surface, deep, and dark web for threats targeting your organization — including exposed credentials, brand impersonation, and vulnerable internet-facing assets. PGP imports these findings so they can be correlated with your existing attack surface data and acted upon within a single security workflow.

This integration is ideal for organizations using SOCRadar to monitor their external digital footprint. Rather than managing SOCRadar alerts and PGP attack surface data in separate workflows, this integration unifies external threat intelligence with your asset inventory and vulnerability data. Security teams can see SOCRadar findings alongside infrastructure vulnerabilities and application risks, enabling faster triage and more complete situational awareness.

## What the Integration Does

When connected, PGP performs a **read-only** import from the SOCRadar API:

* **Digital Risk Findings as Risks**: SOCRadar findings — including exposed credentials, phishing domains, data leaks, and dark web mentions — are imported as risks in PGP. Each finding includes severity, category, and contextual details about the exposure.
* **Exposed Assets**: Internet-facing assets discovered by SOCRadar, such as IP addresses, domains, and subdomains, are imported as PGP seeds and assets. These feed into the Guard discovery and scanning pipeline to ensure externally discovered assets are continuously monitored.
* **Threat Intelligence Context**: SOCRadar threat intelligence data, including indicators of compromise (IoCs) and vulnerability intelligence relevant to your organization, is imported to enrich PGP risk context.
* **Attack Surface Findings**: SOCRadar attack surface monitoring results — including SSL certificate issues, DNS misconfigurations, and exposed services — are imported as risks associated with the relevant assets.

Data flows **one direction only** — from SOCRadar into PGP. The integration never writes back to SOCRadar, modifies alerts, or changes monitoring configurations.

## Prerequisites

Before setting up the integration, you need a SOCRadar API key:

* Log in to the [SOCRadar Platform](https://platform.socradar.com)
* Navigate to **Settings** by clicking the gear icon in the left sidebar
* Select the **API** section
* Click **Generate API Key** (or copy your existing key)
* Record the **API Key** — it will be used to authenticate PGP
* Note your **Company ID**, which is required to scope the integration to your organization. This can be found in the SOCRadar platform URL or in your account settings.

The API key must have read permissions for your company's attack surface, digital risk, and threat intelligence modules.

## Setup

* Go to **Integrations, then Threat Intelligence, then SOCRadar** in the Guard Platform
* Enter your SOCRadar API key and company details in the setup form
* Click **Connect** — PGP will validate your credentials by attempting to fetch your company data before saving

|  |  |  |
| --- | --- | --- |
| Field | Description | Required |
| **API Key** | Your SOCRadar API key | Yes |
| **Company ID** | Your SOCRadar company identifier. Found in your account settings or platform URL. | Yes |
| **API Base URL** | The SOCRadar API base URL. Defaults to `https://platform.socradar.com/api`. | No |

If validation fails, verify that your API key is active and has access to the specified company.

## What Data Is Synced

### Digital Risk Findings

Each SOCRadar digital risk finding creates a risk in PGP with:

* **Risk name**: Derived from the finding type (e.g., "Exposed Credentials", "Phishing Domain Detected")
* **Severity**: Critical, High, Medium, or Low — mapped from the SOCRadar severity level
* **Metadata**: Finding category, source (surface/deep/dark web), detection date, and affected asset details

### Exposed Assets

Internet-facing assets discovered by SOCRadar are imported as seeds and assets:

|  |  |
| --- | --- |
| SOCRadar Element | PGP Seed/Asset Type |
| Discovered domain | Domain Seed |
| Discovered subdomain | Domain Seed |
| Discovered IP address | IPv4 Asset |
| Exposed service (host:port) | Asset metadata |
| SSL certificate hostname | Domain Seed |

### Threat Intelligence

Threat intelligence relevant to your organization is imported:

|  |  |
| --- | --- |
| Intelligence Type | PGP Mapping |
| Indicators of compromise (IoCs) | Risk metadata and context |
| Vulnerability intelligence (CVEs affecting your stack) | Associated risks on relevant assets |
| Dark web mentions | Risk findings with source context |
| Brand impersonation alerts | Risk findings linked to domain assets |

### Attack Surface Monitoring

SOCRadar attack surface findings are imported as risks:

* **SSL/TLS issues**: Expired certificates, weak ciphers, and misconfigured SSL
* **DNS issues**: Dangling DNS records, zone transfer vulnerabilities, and misconfigured MX/SPF records
* **Exposed services**: Open ports and services detected on your internet-facing infrastructure
* **Technology detection**: Identified technologies and frameworks running on your assets

## API Endpoints Used

|  |  |  |
| --- | --- | --- |
| Endpoint | Method | Purpose |
| `/company/{company_id}/attack-surface/assets` | GET | Fetch discovered internet-facing assets |
| `/company/{company_id}/digital-risk/findings` | GET | Fetch digital risk findings (credentials, phishing, leaks) |
| `/company/{company_id}/threat-intelligence/iocs` | GET | Fetch indicators of compromise relevant to your organization |
| `/company/{company_id}/attack-surface/findings` | GET | Fetch attack surface monitoring findings (SSL, DNS, services) |
| `/company/{company_id}/summary` | GET | Fetch company summary and validate credentials |

**Base URL**: `https://platform.socradar.com/api`

All requests are authenticated using an API key parameter over HTTPS. The integration paginates through all results during each sync.

## Troubleshooting

|  |  |  |
| --- | --- | --- |
| Issue | Cause | Fix |
| Validation fails on connect | API key is invalid or revoked | Generate a new API key in SOCRadar Settings > API |
| No assets appearing | Company ID is incorrect or does not match the API key | Verify the Company ID in your SOCRadar account settings |
| Missing digital risk findings | Digital risk monitoring module is not enabled | Contact SOCRadar support to enable the digital risk module for your account |
| Stale data | SOCRadar has not completed a recent scan cycle | SOCRadar scans run on a schedule — allow time for new data to appear |
| 401 Unauthorized errors | API key has expired or been rotated | Generate a new API key and update the integration in PGP |
| Only partial assets imported | API key permissions are limited to specific modules | Ensure the API key has read access to attack surface, digital risk, and threat intelligence modules |

## Security and Data Handling

* **Read-only access**: The integration only reads data from SOCRadar. It never creates, modifies, or deletes findings, alerts, or monitoring configurations in your SOCRadar environment.
* **Credential handling**: Your SOCRadar API key is stored as an encrypted credential within PGP and is never exposed in logs or the UI after initial entry.
* **Authentication**: The API key is transmitted via HTTPS for every request to the SOCRadar API.
* **Data filtering**: Imported assets and risks pass through PGP standard filtering rules, allowing you to control which SOCRadar findings are included in your attack surface and risk inventory.
