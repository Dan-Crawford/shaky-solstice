## Overview

The DNSDB integration connects the Praetorian Guard Platform (PGP) with Farsight DNSDB, the world's largest passive DNS database, importing historical DNS records and domain resolution data into PGP for attack surface enrichment. DNSDB passively observes DNS queries and responses across a global sensor network, building a historical record of every domain-to-IP resolution observed. PGP uses this data to discover assets tied to your organization that may no longer appear in active DNS but still represent potential attack surface.

This integration is designed for organizations that want to go beyond active DNS lookups when mapping their attack surface. Historical DNS data reveals previously used IP addresses, expired subdomains that may be vulnerable to takeover, and infrastructure changes over time. By importing DNSDB data into PGP, you gain visibility into the full lifecycle of your DNS footprint, helping identify dangling DNS records, forgotten infrastructure, and assets that have changed ownership.

## What the Integration Does

When connected, PGP performs a **read-only** query against the DNSDB API:

- **Historical DNS Records as Seeds**: DNS records associated with your domains — including A, AAAA, CNAME, MX, NS, and TXT records — are imported as PGP seeds. These feed the discovery pipeline to find assets that may not be visible through current DNS resolution alone.

- **Subdomain Discovery**: DNSDB's historical observations reveal subdomains that have been associated with your domains at any point in time, including subdomains that have since been removed from active DNS.

- **IP-to-Domain Mappings**: Reverse lookups from DNSDB show which domains have historically resolved to IP addresses in your ranges, uncovering related infrastructure and potential shared-hosting relationships.

- **Temporal Context**: Each DNS observation includes first-seen and last-seen timestamps, allowing PGP to distinguish between currently active records and historical-only records that may indicate abandoned infrastructure.

Data flows **one direction only** — from DNSDB into PGP. The integration never writes back to DNSDB or modifies any data in the Farsight platform.

## Prerequisites

Before setting up the integration, you need a DNSDB API key:

1. Obtain a DNSDB subscription from [Farsight Security](https://www.farsightsecurity.com/solutions/dnsdb/) (now part of DomainTools)

2. Log in to the [DNSDB portal](https://api.dnsdb.info) or your DomainTools account

3. Navigate to your API key management page

4. Record the following value:
   - **API Key**: Your DNSDB API key for authenticating requests

5. Confirm your subscription includes sufficient query quota for your domain count

The API key provides read-only access to DNSDB passive DNS data. No additional permissions configuration is required beyond an active subscription.

## Setup

1. Go to **Integrations, then DNS Intelligence, then DNSDB** in the Guard Platform

2. Enter your DNSDB API key in the setup form

3. Click **Connect** — PGP will validate your credentials by testing API access before saving

| Field | Description | Required |
| --- | --- | --- |
| **API Key** | Your Farsight DNSDB API key | Yes |

If validation fails, verify that your API key is correct and that your DNSDB subscription is active with remaining query quota.

## What Data Is Synced

### DNS Records

Historical DNS records matching your organization's domains are imported:

- **Record name**: The fully qualified domain name (FQDN)
- **Record type**: A, AAAA, CNAME, MX, NS, TXT, or other DNS record types
- **Record value**: The resolved IP address, hostname, or data for the record
- **First seen**: Timestamp of the earliest observation of this record
- **Last seen**: Timestamp of the most recent observation of this record

### Subdomains as Seeds

Discovered subdomains are imported as PGP seeds:

| DNSDB Data | PGP Mapping |
| --- | --- |
| Subdomain with A/AAAA record | Domain seed + IP asset |
| Subdomain with CNAME record | Domain seed |
| MX record hostname | Domain seed |
| NS record nameserver | Domain seed |

### IP-to-Domain Reverse Mappings

Reverse lookups reveal domains that have resolved to your IP ranges:

- **IP address**: The queried IP address from your ranges
- **Associated domains**: All domains that have historically resolved to this IP
- **Observation window**: First-seen and last-seen timestamps for each mapping

### Temporal Analysis

DNSDB timestamps enable PGP to categorize discoveries:

- **Active records**: Records with recent last-seen timestamps, indicating current DNS presence
- **Historical records**: Records with old last-seen timestamps, potentially indicating abandoned or orphaned infrastructure
- **Dangling records**: CNAME or NS records pointing to infrastructure no longer under your control

## API Endpoints Used

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/dnsdb/v2/lookup/rrset/name/{domain}` | GET | Look up DNS records for a domain (forward lookup) |
| `/dnsdb/v2/lookup/rrset/name/{domain}/{rrtype}` | GET | Look up specific record types for a domain |
| `/dnsdb/v2/lookup/rdata/ip/{ip}` | GET | Reverse lookup — find domains that resolved to an IP |
| `/dnsdb/v2/lookup/rdata/name/{name}` | GET | Reverse lookup — find records containing a name in rdata |
| `/dnsdb/v2/rate_limit` | GET | Check remaining API query quota |

**Base URL**: `https://api.dnsdb.info`

All requests are authenticated using the API key passed in the `X-API-Key` header over HTTPS. Results are returned in JSON-lines (SAF) format.

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| Validation fails on connect | API key is incorrect or subscription is inactive | Verify your API key and subscription status on the DNSDB portal |
| No seeds appearing | No domains configured as seeds in PGP to query against | Add your organization's root domains as seeds in PGP before syncing |
| Rate limit errors | Query volume exceeds your DNSDB subscription quota | Check remaining quota via the rate limit endpoint and upgrade your subscription if needed |
| Only historical data, no current records | Domain is no longer in active DNS | This is expected — DNSDB reports all historical observations, including for decommissioned domains |
| Missing record types | Specific record types not observed by DNSDB sensors | DNSDB captures records as observed — some record types may have limited visibility depending on sensor coverage |
| Large result sets causing slow sync | Popular domains generate many historical records | PGP handles pagination automatically — for very large result sets, sync may take longer than usual |

## Security and Data Handling

- **Read-only access**: The integration only reads passive DNS data from DNSDB. It never writes, modifies, or deletes any data in the DNSDB platform.

- **Credential handling**: Your DNSDB API key is stored as an encrypted credential within PGP and is never exposed in logs or the UI after initial entry.

- **Authentication**: The API key is transmitted in the `X-API-Key` header over HTTPS for every API call.

- **Data filtering**: Imported seeds and assets pass through PGP standard filtering rules, allowing you to control which DNS discoveries are included in your attack surface.
