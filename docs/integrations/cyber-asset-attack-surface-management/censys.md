## Overview

The Censys integration connects the Praetorian Guard Platform (PGP) with Censys Search, importing internet-facing assets, host data, and certificate information into your attack surface inventory. Censys continuously scans the global IPv4 address space and popular ports to build a comprehensive map of internet-connected devices and services — PGP leverages this data to discover assets associated with your organization that may not be visible through internal tooling alone.

This integration is designed for organizations that want to enrich their attack surface with external intelligence from Censys. By combining Censys's internet-wide scanning data with PGP's continuous threat exposure management, you gain visibility into exposed hosts, services, and certificates that belong to your organization, including shadow IT and forgotten infrastructure that traditional asset inventories miss.

## What the Integration Does

When connected, PGP performs a **read-only** import from the Censys Search API:

- **Hosts as Assets**: Internet-facing hosts discovered by Censys that match your organization's seeds (domains, IP ranges, ASNs) are imported as PGP assets. Each host includes metadata such as IP address, open ports, running services, operating system, and last observed timestamp.

- **Certificates as Assets**: TLS/SSL certificates associated with your domains are imported, including certificate details such as subject, issuer, validity period, SANs (Subject Alternative Names), and fingerprint. Expired or misconfigured certificates are flagged.

- **Services and Ports**: For each discovered host, the running services (HTTP, HTTPS, SSH, FTP, etc.) and their port numbers are captured as metadata, providing a detailed picture of what is exposed on the internet.

- **Domain Discovery**: Censys data is used to discover subdomains and related domains tied to your organization, which are imported as seeds to feed PGP's discovery pipeline.

Data flows **one direction only** — from Censys into PGP. The integration never writes back to Censys or modifies any data in the Censys platform.

## Prerequisites

Before setting up the integration, you need a Censys Search API credential:

1. Create an account at [censys.io](https://censys.io) if you do not already have one

2. Log in and navigate to **Account > API**

3. Locate your API credentials:
   - **API ID**: Your unique API identifier
   - **API Secret**: Your API secret key

4. Ensure your Censys plan includes API access with sufficient query quota for your asset count

The API credentials provide read-only access to Censys Search data. No additional permissions configuration is required beyond having an active account with API access.

## Setup

1. Go to **Integrations, then Attack Surface Management, then Censys** in the Guard Platform

2. Enter your Censys API credentials in the setup form

3. Click **Connect** — PGP will validate your credentials by testing API access before saving

| Field | Description | Required |
| --- | --- | --- |
| **API ID** | Your Censys API identifier from the Account > API page | Yes |
| **API Secret** | Your Censys API secret key | Yes |

If validation fails, verify that your API credentials are correct and that your Censys account has an active plan with API access.

## What Data Is Synced

### Hosts

Internet-facing hosts matching your organization's seeds are imported with:

- **Asset name**: IP address or hostname of the discovered host
- **Asset type**: Host
- **Metadata**: IP address, autonomous system (ASN), operating system, last observed timestamp, geographic location, and cloud provider (if applicable)

### Services

Services running on discovered hosts are captured as metadata:

| Censys Data | PGP Mapping |
| --- | --- |
| Open port + service name | Service metadata on host asset |
| HTTP response details | Service metadata (status code, headers, title) |
| TLS configuration | Service metadata (protocol version, cipher suite) |
| Banner data | Service metadata on host asset |

### Certificates

TLS/SSL certificates associated with your domains are imported:

- **Certificate subject**: The common name and organization from the certificate
- **SANs**: All Subject Alternative Names listed on the certificate
- **Validity**: Not-before and not-after dates
- **Issuer**: The certificate authority that issued the certificate
- **Fingerprint**: SHA-256 fingerprint for unique identification

### Discovered Domains

Subdomains and related domains found through Censys data are imported as seeds:

- **Domain name**: The discovered subdomain or related domain
- **Source**: Tagged as discovered via Censys
- **Discovery method**: Reverse DNS, certificate SAN, or HTTP response analysis

## API Endpoints Used

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/v2/hosts/search` | GET | Search for hosts matching organization seeds |
| `/api/v2/hosts/{ip}` | GET | Fetch detailed host data including services |
| `/api/v2/certificates/search` | GET | Search for certificates matching organization domains |
| `/api/v2/certificates/{fingerprint}` | GET | Fetch detailed certificate metadata |
| `/api/v1/account` | GET | Validate API credentials and check quota |

**Base URL**: `https://search.censys.io`

All requests are authenticated using HTTP Basic Auth with the API ID and API Secret over HTTPS.

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| Validation fails on connect | API ID or API Secret is incorrect | Verify credentials on the Censys Account > API page |
| No assets appearing | No seeds configured in PGP that match Censys data | Add your organization's domains, IP ranges, or ASNs as seeds in PGP before syncing |
| Rate limit errors | Query volume exceeds your Censys plan quota | Upgrade your Censys plan or reduce the number of seeds being queried |
| Missing certificates | Certificates not yet indexed by Censys | Censys indexes certificates as they are observed — recently deployed certificates may take time to appear |
| Stale host data | Censys scan cycle has not yet refreshed the host | Censys rescans the internet periodically — host data reflects the most recent scan |
| Partial results | API pagination limits reached | PGP handles pagination automatically — if results are consistently partial, contact support |

## Security and Data Handling

- **Read-only access**: The integration only reads data from Censys Search. It never writes, modifies, or deletes any data in Censys.

- **Credential handling**: Your Censys API ID and API Secret are stored as encrypted credentials within PGP and are never exposed in logs or the UI after initial entry.

- **Authentication**: Credentials are transmitted via HTTP Basic Auth over HTTPS for every API call.

- **Data filtering**: Imported assets and seeds pass through PGP standard filtering rules, allowing you to control which discovered hosts and certificates are included in your attack surface.
