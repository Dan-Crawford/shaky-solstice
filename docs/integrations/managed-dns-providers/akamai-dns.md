---
title: "Akamai DNS"
description: "Akamai DNS"
featurebaseId: "8390187"
---

## Overview

The Akamai DNS integration connects the Praetorian Guard Platform (PGP) with your Akamai Edge DNS service, importing DNS zones and records directly into your attack surface. DNS records are foundational to attack surface discovery — every A, AAAA, CNAME, and MX record points to infrastructure that needs to be inventoried, monitored, and tested. PGP imports these records as seeds and assets, feeding them into the Guard discovery and scanning pipeline automatically.

This integration is ideal for organizations using Akamai Edge DNS who want to ensure that every DNS record is accounted for in their security program. It enables detection of dangling DNS records, subdomain takeover risks, and forgotten infrastructure — common attack vectors that arise when DNS records outlive the resources they point to.

## What the Integration Does

When connected, PGP performs a **read-only** import from the Akamai Edge DNS API:

* **DNS Zones as Assets**: Each DNS zone managed in Akamai Edge DNS is imported as a PGP asset, giving you an inventory of all authoritative zones under your control.
* **DNS Records as Seeds**: Individual DNS records within each zone are imported as PGP seeds based on their type. A and AAAA records produce IP address seeds, CNAME records produce domain seeds, and MX records produce mail server seeds — all of which feed into continuous discovery and scanning.
* **Dangling Record Detection**: By importing all DNS records, PGP can identify records that point to resources that no longer exist (e.g., decommissioned cloud instances, expired third-party services), which are prime candidates for subdomain takeover attacks.

Data flows **one direction only** — from Akamai Edge DNS into PGP. The integration never writes back to Akamai, modifies zones, or changes DNS records.

## Prerequisites

Before setting up the integration, you need Akamai EdgeGrid API credentials:

* Log in to [Akamai Control Center](https://control.akamai.com)
* Navigate to **Identity & Access Management** under the account menu
* Select the **API Users** tab
* Click **Create API Client** (or select an existing user)
* Under **API Client Details**, click **Create Credential**
* Record the following values — they are only shown once:
* **Client Token**
* **Client Secret**
* **Access Token**
* **API Host** (e.g., `akab-xxxxx.luna.akamaiapis.net`)
* Ensure the API client has **READ** access to the **DNS — Zone Record Management** API

The API credentials must have read-only permissions to the Edge DNS API for the zones you want to import.

## Setup

* Go to **Integrations, then Managed DNS, then Akamai DNS** in the Guard Platform
* Enter your EdgeGrid credentials in the setup form
* Click **Connect** — PGP will validate your credentials by attempting to fetch your DNS zones before saving

|  |  |  |
| --- | --- | --- |
| Field | Description | Required |
| **API Host** | Your Akamai EdgeGrid API hostname (e.g., `akab-xxxxx.luna.akamaiapis.net`). Do not include the `https://` protocol prefix. | Yes |
| **Client Token** | The client token from your EdgeGrid API credentials | Yes |
| **Client Secret** | The client secret from your EdgeGrid API credentials | Yes |
| **Access Token** | The access token from your EdgeGrid API credentials | Yes |

If validation fails, verify that your API credentials have the correct permissions and that the API host does not include a protocol prefix.

## What Data Is Synced

### DNS Zones

Each Akamai Edge DNS zone creates an asset with:

* **Asset name**: The zone name (e.g., `example.com`)
* **Asset type**: DNS zone
* **Metadata**: Zone type (primary, secondary, alias), contract ID, and activation status

### DNS Records

Records within each zone are imported as seeds based on record type:

|  |  |  |
| --- | --- | --- |
| DNS Record Type | PGP Seed/Asset Type | Example |
| A | IPv4 Asset | `192.0.2.1` |
| AAAA | IPv6 Asset | `2001:db8::1` |
| CNAME | Domain Seed | `cdn.example.com` |
| MX | Domain Seed | `mail.example.com` |
| NS | Domain Seed | `ns1.example.com` |
| TXT | Skipped (informational only) | — |
| SOA | Skipped (zone metadata only) | — |

Wildcard records (e.g., `*.example.com`) are imported as domain seeds to ensure wildcard-hosted subdomains are discoverable.

## API Endpoints Used

|  |  |  |
| --- | --- | --- |
| Endpoint | Method | Purpose |
| `/config-dns/v2/zones` | GET | Fetch all DNS zones accessible with your credentials |
| `/config-dns/v2/zones/{zone}/recordsets` | GET | Fetch all DNS record sets within a zone (paginated) |

**Base URL**: `https://{your-api-host}` (e.g., `https://akab-xxxxx.luna.akamaiapis.net`)

All requests are authenticated using Akamai EdgeGrid signing. The integration paginates through all zones and record sets in a single sync.

## Troubleshooting

|  |  |  |
| --- | --- | --- |
| Issue | Cause | Fix |
| Validation fails on connect | API credentials are incorrect or expired | Regenerate credentials in Akamai Control Center under Identity & Access Management |
| API host rejected | Host includes `https://` prefix | Remove the protocol prefix — enter only the hostname (e.g., `akab-xxxxx.luna.akamaiapis.net`) |
| No zones appearing | API client lacks DNS Zone Record Management read access | Edit the API client in Akamai Control Center and grant READ access to the DNS — Zone Record Management API |
| Missing records for a zone | Zone may be a secondary or alias zone with no editable records | Secondary zones replicate records from a primary — verify the zone type in Akamai Control Center |
| Partial zone list | API client is scoped to specific contracts | Ensure the API client has access to all contracts containing your DNS zones |

## Security and Data Handling

* **Read-only access**: The integration only reads data from Akamai Edge DNS. It never creates, modifies, or deletes zones or DNS records.
* **Credential handling**: Your EdgeGrid credentials (Client Token, Client Secret, Access Token) are stored as encrypted credentials within PGP and are never exposed in logs or the UI after initial entry.
* **Authentication**: Credentials are used to sign requests via the Akamai EdgeGrid authentication protocol over HTTPS.
* **Data filtering**: Imported seeds and assets pass through PGP standard filtering rules, allowing you to control which zones and record types are included in your attack surface.
