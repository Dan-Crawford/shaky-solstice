## Overview

The Shodan integration connects the Praetorian Guard Platform (PGP) with Shodan's internet intelligence platform to import internet-facing assets, open ports, service banners, and vulnerability data. Shodan continuously scans the entire IPv4 address space, and this integration brings that external perspective into PGP to enhance your attack surface visibility.

Understanding what your organization exposes to the internet is fundamental to effective security. Shodan identifies services, protocols, and software running on internet-facing IP addresses and domains, including systems that may not be known to your internal asset inventory. By integrating Shodan with PGP, security teams can discover shadow IT, forgotten infrastructure, misconfigured services, and known vulnerabilities on their public-facing assets.

This integration uses the Shodan API in a read-only capacity. PGP queries Shodan for host and vulnerability data and does not modify any data in your Shodan account or initiate any active scanning.

## What the Integration Does

The Shodan integration queries the Shodan API to retrieve information about internet-facing hosts associated with your attack surface. For each seed domain or IP range configured in PGP, the integration searches Shodan's database to discover associated hosts, their open ports, running services, and known vulnerabilities (CVEs).

The integration imports host records that include detailed banner information for each discovered service. Banners contain protocol-specific metadata such as HTTP headers, SSL certificate details, SSH version strings, and other service fingerprints. This data allows PGP to identify specific software versions and configurations that may be vulnerable.

All operations are strictly read-only. PGP does not modify any data in your Shodan account, and the integration does not perform active scanning. All data comes from Shodan's existing passive scan database.

## Prerequisites

Before setting up the Shodan integration, ensure you have:

- **A Shodan account** with API access (a paid membership plan is recommended for sufficient query credits)
- **A Shodan API key** from your account settings
- **Seed domains or IP ranges** already configured in PGP that you want to enrich with Shodan data

### Obtaining an API Key

1. Sign in to [Shodan](https://account.shodan.io/).
2. Navigate to your **Account** page.
3. Your API key is displayed on the account overview. Copy it for use in PGP.
4. Verify your membership plan includes sufficient query credits for the number of assets you plan to monitor. The free tier has limited query credits; a paid plan (e.g., Membership or Small Business) is recommended.

## Setup

1. In PGP, navigate to the **Integrations** page.
2. Select **Shodan** from the list of available integrations.
3. Enter your Shodan API key in the configuration form.
4. Save the integration. PGP will validate connectivity to the Shodan API automatically.

### Field Reference

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Shodan API key | Yes |

## What Data Is Synced

### Internet-Facing Hosts (Assets)

The integration imports hosts discovered by Shodan as assets into PGP.

| Data Field | Source | Description |
|------------|--------|-------------|
| IP Address | Host data | The public IPv4 or IPv6 address of the host |
| Hostnames | Host data | DNS hostnames that resolve to the IP address |
| Organization | Host data | The organization associated with the IP (from WHOIS/BGP data) |
| ISP | Host data | The internet service provider hosting the IP |
| ASN | Host data | The Autonomous System Number for network identification |
| Country / City | Host data | Geographic location of the IP address |
| Last Updated | Host data | When Shodan last scanned and updated the host record |

### Open Ports and Services (Assets)

For each host, the integration imports detailed service information for every open port.

| Data Field | Source | Description |
|------------|--------|-------------|
| Port | Banner data | The open TCP/UDP port number |
| Protocol | Banner data | The transport protocol (TCP or UDP) |
| Service | Banner data | The identified service (HTTP, SSH, FTP, SMTP, etc.) |
| Product | Banner data | The software product name (e.g., Apache, nginx, OpenSSH) |
| Version | Banner data | The software version string |
| Banner | Banner data | The raw service banner or response header |
| SSL/TLS | Banner data | SSL certificate details including issuer, subject, and expiration |
| HTTP Headers | Banner data | HTTP response headers for web services |

### Vulnerabilities (Risks)

Shodan maps known vulnerabilities to discovered services based on software version and configuration.

| Data Field | Source | Description |
|------------|--------|-------------|
| CVE ID | Vulnerability data | The CVE identifier for the known vulnerability |
| CVSS Score | Vulnerability data | The Common Vulnerability Scoring System score |
| Summary | Vulnerability data | A brief description of the vulnerability |
| Affected Service | Vulnerability data | The host, port, and software version the vulnerability applies to |
| References | Vulnerability data | Links to vulnerability advisories and patches |

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/shodan/host/{ip}` | GET | Retrieve all available information for a specific IP address |
| `/shodan/host/search` | GET | Search for hosts matching a query (e.g., by domain, organization, or network range) |
| `/dns/domain/{domain}` | GET | Retrieve DNS entries and subdomains for a given domain |
| `/dns/resolve` | GET | Resolve hostnames to IP addresses |
| `/api-info` | GET | Validate API key and check remaining query credits |

The integration uses pagination for search queries and respects Shodan API rate limits (typically 1 request per second for most plans). All requests are authenticated using the API key as a query parameter.

### Required API Permissions

| Permission | Purpose |
|------------|---------|
| API Access | Read access to host search, DNS, and vulnerability data. Paid membership required for search filters and vulnerability data |

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| "Invalid API key" or 401 error | The API key is incorrect or has been revoked | Verify your API key on the Shodan account page and update it in PGP |
| "Insufficient credits" or 402 error | Your Shodan plan has exhausted its query credits | Upgrade your Shodan plan or wait for credits to refresh |
| "Rate limit exceeded" or 429 error | Too many API requests per second | The integration respects rate limits automatically. If this persists, reduce the number of concurrent seed domains |
| No hosts discovered | The seed domains or IPs have no results in Shodan's database | Verify the domains resolve to public IP addresses. Shodan does not index internal/private IP ranges |
| Missing vulnerability data | Vulnerability data requires a paid Shodan plan | Upgrade to a Shodan membership plan that includes vulnerability (CVE) data |
| Stale or outdated data | Shodan scans hosts periodically, not in real time | This is expected. Shodan's scan frequency varies by IP and service. Data may be days or weeks old |
| Integration times out | Large number of seed domains generating many API queries | Reduce the number of seeds or contact support for timeout adjustments |

## Security and Data Handling

The Shodan integration operates in a strictly read-only mode. It queries Shodan's existing scan database and does not initiate active scans, modify account settings, or alter any data within Shodan.

Credentials are handled securely within PGP. The Shodan API key is encrypted at rest and used exclusively for authenticating API requests during sync operations. The key is not exposed in logs or transmitted to any third party.

PGP imports only host metadata, service banners, and vulnerability references from Shodan. No exploit code, payload data, or offensive tooling is accessed or stored. All imported data originates from Shodan's passive internet scanning and publicly available information.
