---
title: "Imperva"
description: "Imperva"
featurebaseId: "0856306"
---

## Overview

The Imperva integration connects the Praetorian Guard Platform (PGP) with Imperva Cloud WAF (formerly Incapsula) to import WAF-protected sites, security configurations, and domain data from your Imperva account. By syncing your Imperva environment, PGP provides visibility into which web applications are protected by your WAF, what domains are routed through Imperva, and what security policies are in place.

Organizations using Imperva Cloud WAF to protect their web applications often manage dozens or hundreds of sites across multiple sub-accounts. Maintaining an accurate inventory of all WAF-protected assets and their configurations is essential for understanding your attack surface. This integration automatically discovers all sites configured in Imperva, extracts their origin server addresses, domain names, and associated security settings, and imports them as assets into PGP.

This integration uses the Imperva Cloud WAF API in a read-only capacity. PGP does not modify, create, or delete any sites, rules, or configurations in your Imperva account.

## What the Integration Does

The Imperva integration queries the Imperva Cloud WAF API to enumerate all sites configured under your account. For each site, it extracts the domain name, origin server IP addresses, SSL configuration, and WAF policy settings. Domains and origin server IPs are imported as assets into PGP, giving your security team a complete view of your WAF-protected attack surface.

The integration maps Imperva site data to PGP asset types. Domain names become seed assets, origin server IP addresses are tracked as infrastructure assets, and security configuration details are stored as metadata. This allows PGP to correlate WAF-protected sites with assets discovered through other integrations and scanning activities.

All operations are strictly read-only. PGP does not modify, create, or delete any sites, security rules, or account configurations in Imperva.

## Prerequisites

Before setting up the Imperva integration, ensure you have:

* **An Imperva Cloud WAF account** with sites configured
* **An API ID and API Key** from your Imperva account with read permissions
* **Account permissions**: The API credentials must have at least **Reader** access to the sites you want to discover

### Creating API Credentials

1. Sign in to the [Imperva Cloud Security Console](https://my.imperva.com).
2. Navigate to **Account** > **Account Settings** > **API Keys** (or **Account Management** > **API Keys** depending on your console version).
3. Click **Add API Key** (or use an existing key with appropriate permissions).
4. Set the API key permissions to **Read** access.
5. Copy the **API ID** and **API Key** values. Store them securely.
6. Note your **Account ID**, which is visible in the account settings or in the URL when logged in.

## Setup

1. In PGP, navigate to the **Integrations** page.
2. Select **Imperva** from the list of available integrations.
3. Enter your Imperva API credentials in the configuration form.
4. Save the integration. PGP will validate connectivity to the Imperva API automatically.

### Field Reference

|  |  |  |
| --- | --- | --- |
| Field | Description | Required |
| API ID | Your Imperva API identifier | Yes |
| API Key | Your Imperva API key with read access | Yes |
| Account ID | Your Imperva account identifier | Yes |

## What Data Is Synced

### WAF-Protected Sites (Assets)

The integration discovers all sites configured in your Imperva Cloud WAF account and imports them as assets in PGP.

|  |  |  |
| --- | --- | --- |
| Data Field | Source | Description |
| Domain | Site configuration | The fully qualified domain name of the WAF-protected site |
| Origin Server IPs | Site configuration | The IP addresses of the origin servers behind the WAF |
| Site ID | Site metadata | The Imperva site identifier for correlation |
| SSL Configuration | Site settings | Whether SSL is enabled and the certificate status |
| WAF Status | Site settings | Whether the WAF is actively protecting the site |
| Account ID | Account metadata | The Imperva account that owns the site |

### Security Configurations (Metadata)

Configuration details for each site are captured as metadata on the corresponding asset.

|  |  |  |
| --- | --- | --- |
| Data Field | Source | Description |
| Security Rules | WAF policies | Active WAF rules and their enforcement mode (block, alert, disabled) |
| DDoS Protection | Site settings | DDoS mitigation status and configuration |
| Bot Protection | Site settings | Bot management and mitigation settings |
| IP Access Control | ACL rules | IP-based allow and block list configurations |

## API Endpoints Used

|  |  |  |
| --- | --- | --- |
| Endpoint | Method | Purpose |
| `https://my.imperva.com/api/prov/v1/sites/list` | POST | List all sites under the account |
| `https://my.imperva.com/api/prov/v1/sites/status` | POST | Get the current status and configuration of a specific site |
| `https://my.imperva.com/api/prov/v1/sites/dataCenters/list` | POST | List origin data centers and server IPs for a site |
| `https://my.imperva.com/api/prov/v2/sites/{site_id}/settings` | GET | Retrieve detailed security settings for a site |

### Required API Permissions

|  |  |  |
| --- | --- | --- |
| Permission | Type | Purpose |
| Read | API Key | Read access to site configurations, data centers, and security settings |

## Troubleshooting

|  |  |  |
| --- | --- | --- |
| Issue | Cause | Fix |
| "Authentication failed" or 401 error | The API ID or API Key is incorrect or has been revoked | Verify your API credentials in the Imperva console and update them in PGP |
| "Authorization failed" or 403 error | The API key lacks sufficient permissions | Ensure the API key has at least Reader access to the account and its sites |
| No assets discovered | The account has no sites configured, or the API key cannot access the target sub-account | Verify that sites exist under the account and that the API key has access to the correct account ID |
| Partial site discovery | The API key only has access to a subset of sub-accounts | Use an API key from the parent account or ensure the account ID covers all desired sub-accounts |
| Integration times out | The account contains a very large number of sites | Contact support to discuss increasing the sync timeout |

## Security and Data Handling

The Imperva integration operates in a strictly read-only mode. It queries the Imperva Cloud WAF API to read site configurations and security settings, and does not modify any WAF rules, site configurations, or account settings.

Credentials are handled securely within PGP. The Imperva API ID and API Key are encrypted at rest and used exclusively for API authentication during sync operations. The credentials are not persisted outside of PGP's encrypted credential store.

PGP does not access or store web traffic data, request logs, or application content passing through the Imperva WAF. Only site configuration metadata (domain names, origin server addresses, and security policy settings) is read and processed.
