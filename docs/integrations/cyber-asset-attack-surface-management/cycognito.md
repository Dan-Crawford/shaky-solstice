## Overview

The CyCognito integration connects the Praetorian Guard Platform (PGP) with the CyCognito external attack surface management platform, importing discovered external assets and security issues directly into your PGP attack surface inventory. CyCognito autonomously maps your organization's internet-exposed assets using attacker-perspective reconnaissance — PGP imports these discoveries so they can be correlated with your broader security posture and continuously tested.

This integration is ideal for organizations that use CyCognito to discover and monitor their external attack surface. Rather than managing CyCognito findings in isolation, PGP consolidates the discovered assets and issues alongside data from your other security tools, giving you a unified view of your exposure. Assets discovered by CyCognito — including domains, IPs, web applications, certificates, and cloud resources — feed directly into PGP's continuous threat exposure management pipeline.

## What the Integration Does

When connected, PGP performs a **read-only** import from the CyCognito API:

- **External Assets**: Domains, IP addresses, web applications, certificates, and cloud resources discovered by CyCognito are imported as PGP assets. Each asset includes metadata such as hosting provider, technology stack, geographic location, and business unit attribution.

- **Security Issues as Risks**: Security issues identified by CyCognito — such as exposed services, misconfigurations, vulnerable software, and certificate problems — are imported as risks associated with the corresponding PGP assets.

- **Asset Metadata and Context**: CyCognito's asset context, including discoverability score, attractiveness rating, and organization attribution, is captured as metadata to enrich PGP's risk prioritization.

- **Domains and Subdomains as Seeds**: Discovered domains and subdomains are imported as PGP seeds, feeding the broader discovery pipeline.

Data flows **one direction only** — from CyCognito into PGP. The integration never writes back to CyCognito or modifies any data in the CyCognito platform.

## Prerequisites

Before setting up the integration, you need CyCognito API credentials:

1. Log in to the [CyCognito platform](https://app.cycognito.com)

2. Navigate to **Settings > API Management**

3. Click **Generate API Token** (or use an existing token with read permissions)

4. Record the following values:
   - **API Token**: The bearer token for authenticating API requests
   - **Instance URL**: Your CyCognito tenant URL (e.g., `https://your-org.cycognito.com`)

5. Ensure the API token has **read-only** access to assets and issues

The API token must have permissions to read asset inventory and security issue data from your CyCognito tenant.

## Setup

1. Go to **Integrations, then Attack Surface Management, then CyCognito** in the Guard Platform

2. Enter your CyCognito API credentials in the setup form

3. Click **Connect** — PGP will validate your credentials by attempting to fetch asset data before saving

| Field | Description | Required |
| --- | --- | --- |
| **Instance URL** | Your CyCognito tenant URL (e.g., `https://your-org.cycognito.com`) | Yes |
| **API Token** | The API bearer token from CyCognito's API Management settings | Yes |

If validation fails, verify that your API token is active and has the correct read permissions.

## What Data Is Synced

### External Assets

CyCognito-discovered assets are imported with:

- **Asset name**: Derived from the asset identifier (domain, IP, application URL)
- **Asset type**: Mapped from CyCognito's asset classification (domain, IP address, web application, certificate, cloud resource)
- **Metadata**: Hosting provider, technology stack, geographic location, business unit, discoverability score, attractiveness rating, and last observed timestamp

### Security Issues

Issues identified by CyCognito are imported as risks:

| CyCognito Data | PGP Mapping |
| --- | --- |
| Issue title | Risk name |
| Severity (critical, high, medium, low) | Risk severity |
| Issue type (exposed service, misconfiguration, vulnerability) | Risk category |
| Affected asset | Linked PGP asset |
| Remediation guidance | Risk description |
| First detected / last detected | Risk timestamps |

### Discovered Domains and Seeds

Domains and subdomains found through CyCognito reconnaissance are imported as seeds:

- **Domain name**: The discovered domain or subdomain
- **Source**: Tagged as discovered via CyCognito
- **Attribution**: Business unit or subsidiary association from CyCognito

## API Endpoints Used

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/v1/assets` | GET | Fetch discovered external assets |
| `/api/v1/assets/{id}` | GET | Fetch detailed asset metadata |
| `/api/v1/issues` | GET | Fetch security issues across all assets |
| `/api/v1/issues/{id}` | GET | Fetch detailed issue information |
| `/api/v1/assets/{id}/issues` | GET | Fetch issues associated with a specific asset |

**Base URL**: Your CyCognito instance URL (e.g., `https://your-org.cycognito.com`)

All requests are authenticated using the API token passed as a Bearer token in the Authorization header over HTTPS.

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| Validation fails on connect | API token is incorrect or expired | Regenerate the token in CyCognito under Settings > API Management |
| No assets appearing | API token lacks read permissions for asset data | Verify the token scope includes asset and issue read access |
| Missing security issues | Issues filter excludes certain severity levels | Check CyCognito API filter settings and ensure all severity levels are included |
| Stale data | CyCognito has not completed a recent discovery cycle | CyCognito runs discovery on its own schedule — data reflects the most recent cycle |
| Connection timeout | Network or firewall blocking outbound requests | Verify that PGP can reach your CyCognito instance URL over HTTPS (port 443) |
| Duplicate assets | Same asset discovered by multiple sources | PGP deduplicates assets by identifier — duplicates are merged automatically |

## Security and Data Handling

- **Read-only access**: The integration only reads data from CyCognito. It never creates, modifies, or deletes assets, issues, or configurations in the CyCognito platform.

- **Credential handling**: Your API token is stored as an encrypted credential within PGP and is never exposed in logs or the UI after initial entry.

- **Authentication**: The API token is transmitted as a Bearer token in the Authorization header over HTTPS for every API call.

- **Data filtering**: Imported assets and risks pass through PGP standard filtering rules, allowing you to control which CyCognito discoveries are included in your attack surface.
