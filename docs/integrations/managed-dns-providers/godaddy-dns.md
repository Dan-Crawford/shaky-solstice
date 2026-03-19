---
title: "GoDaddy DNS"
description: "GoDaddy DNS"
featurebaseId: "3340642"
---

## Overview

The GoDaddy DNS integration connects the Praetorian Guard Platform (PGP) with GoDaddy's managed DNS service to discover DNS zones and records across your domains. By importing DNS data, PGP identifies all hostnames, subdomains, and related infrastructure that form part of your external attack surface.

DNS records are one of the most fundamental sources of attack surface intelligence. Every A, AAAA, CNAME, and MX record points to infrastructure that may be externally accessible and therefore needs to be monitored for vulnerabilities. This integration automates the discovery of these records from GoDaddy, ensuring that your PGP asset inventory stays current as DNS configurations change.

The integration operates in a read-only capacity, querying the GoDaddy API to retrieve zone and record data. PGP does not modify, create, or delete any DNS zones, records, or domain configurations.

## What the Integration Does

The GoDaddy DNS integration authenticates with the GoDaddy API and enumerates all DNS zones (domains) associated with your account. For each zone, it retrieves the full set of DNS records and imports the resulting hostnames and IP addresses as seeds and assets into PGP.

Discovered records feed into PGP's broader attack surface discovery pipeline. Domain names from CNAME and MX records become seeds that trigger further enumeration, while A and AAAA records provide direct IP address assets. This creates a cascading discovery effect where a single DNS zone can reveal dozens of previously unknown assets.

All operations are strictly read-only. PGP does not create, update, or delete any DNS records or zone configurations in your GoDaddy account.

## Prerequisites

Before setting up the GoDaddy DNS integration, ensure you have:

- **A GoDaddy account** with at least one domain and DNS zone configured
- **A GoDaddy API key and secret** with production access

### Creating API Credentials

- Sign in to the [GoDaddy Developer Portal](https://developer.godaddy.com/).
- Navigate to **API Keys**.
- Click **Create New API Key**.
- Set the environment to **Production** (not OTE/Testing).
- Copy both the **Key** and **Secret**. The secret is only shown once at creation time.
- Note: GoDaddy API keys provide read-only access to DNS data by default. No additional permission scoping is needed for this integration.

## Setup

- In PGP, navigate to the **Integrations** page.
- Select **GoDaddy DNS** from the list of available integrations.
- Enter your GoDaddy API key and secret.
- Save the integration. PGP will validate connectivity by making a test request to the GoDaddy API.

### Field Reference

| Field | Description | Required |
| --- | --- | --- |
| API Key | Your GoDaddy production API key | Yes |
| API Secret | Your GoDaddy production API secret | Yes |

## What Data Is Synced

### DNS Zones (Domains)

The integration discovers all DNS zones managed in your GoDaddy account.

| Data Field | Source | Description |
| --- | --- | --- |
| Domain Name | GoDaddy zone list | The root domain name for each DNS zone |
| Zone Status | GoDaddy zone metadata | Whether the zone is active and serving DNS |

### DNS Records (Seeds and Assets)

For each zone, individual DNS records are retrieved and processed.

| Record Type | Imported As | Description |
| --- | --- | --- |
| A | Asset (IP address) + Seed (hostname) | Maps a hostname to an IPv4 address |
| AAAA | Asset (IP address) + Seed (hostname) | Maps a hostname to an IPv6 address |
| CNAME | Seed (target hostname) | Alias pointing to another hostname, triggers further discovery |
| MX | Seed (mail server hostname) | Mail exchange records revealing mail infrastructure |
| NS | Seed (nameserver hostname) | Nameserver records identifying DNS infrastructure |
| TXT | Metadata | Text records that may contain SPF, DKIM, or other security-relevant data |
| SRV | Seed (target hostname) | Service records identifying service endpoints |

### Discovery Pipeline

Imported DNS data feeds into PGP's attack surface discovery pipeline:

- **Root domains** are added as seeds for subdomain enumeration.
- **A/AAAA records** create direct IP address assets for vulnerability scanning.
- **CNAME targets** become seeds that trigger recursive DNS resolution.
- **MX records** reveal mail infrastructure for further analysis.

## API Endpoints Used

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `https://api.godaddy.com/v1/domains` | GET | List all domains in the account |
| `https://api.godaddy.com/v1/domains/{domain}/records` | GET | Retrieve all DNS records for a specific domain |

Authentication is performed via the `Authorization` header using the format `sso-key {API_KEY}:{API_SECRET}`, included with every API request.

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| Authentication failure (401) | The API key or secret is invalid | Verify your API key and secret in the GoDaddy Developer Portal. Ensure you are using production credentials, not OTE/testing |
| Authentication failure (403) | The API key lacks production access | Generate a new API key with the environment set to **Production** |
| No domains found | The GoDaddy account has no domains, or the API key is associated with a different account | Verify that domains are present in your GoDaddy account and that the API key belongs to the correct account |
| Partial records imported | Some DNS zones returned errors during record retrieval | Check that all domains in your GoDaddy account have active DNS zones. Domains using external nameservers may not return records via the GoDaddy API |
| Rate limiting errors (429) | Too many API requests in a short period | The integration will retry automatically. If persistent, contact support or reduce the number of domains in a single sync cycle |

## Security and Data Handling

The GoDaddy DNS integration operates in a strictly read-only mode. It queries the GoDaddy API to retrieve DNS zone and record data and does not modify, create, or delete any DNS records, zones, or domain configurations.

Credentials are handled securely within PGP. The GoDaddy API key and secret are encrypted at rest and transmitted only over HTTPS to the GoDaddy API. Credentials are used exclusively during sync operations for data retrieval.

PGP imports only DNS metadata: domain names, record types, record values (hostnames and IP addresses), and TTL values. No domain registration details, billing information, or account management data is accessed or stored.
