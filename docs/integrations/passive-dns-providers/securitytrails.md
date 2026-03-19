---
title: "SecurityTrails"
description: "SecurityTrails"
featurebaseId: "4133909"
---

## Overview

The SecurityTrails integration connects the Praetorian Guard Platform (PGP) with SecurityTrails to enrich your attack surface with historical DNS data, WHOIS records, and comprehensive subdomain information. SecurityTrails maintains one of the largest databases of historical internet records, and this integration brings that intelligence directly into PGP for continuous asset discovery and attack surface mapping.

Organizations often have forgotten subdomains, legacy DNS records, and historical infrastructure that remains exposed to attackers. By importing SecurityTrails data, PGP can identify these hidden assets and incorporate them into your attack surface model. This includes subdomains that may not be discoverable through active scanning, historical IP resolutions that reveal infrastructure relationships, and WHOIS data that helps attribute assets to your organization.

This integration uses the SecurityTrails API in a read-only capacity. PGP queries SecurityTrails for domain and IP intelligence and does not modify any data in your SecurityTrails account.

## What the Integration Does

The SecurityTrails integration queries the SecurityTrails API to retrieve subdomain enumerations, historical DNS records, and WHOIS information for domains in your attack surface. For each seed domain configured in PGP, the integration discovers associated subdomains, resolves their current and historical DNS records, and imports the results as assets and seeds into PGP.

The integration processes DNS record types including A, AAAA, MX, NS, SOA, TXT, and CNAME records. Historical data is used to identify infrastructure that was previously associated with your domains, which may still be active or exploitable. WHOIS records provide ownership and registration details that help PGP attribute discovered assets to your organization.

All operations are strictly read-only. PGP does not modify, create, or delete any data in your SecurityTrails account.

## Prerequisites

Before setting up the SecurityTrails integration, ensure you have:

* **A SecurityTrails account** with API access enabled
* **A SecurityTrails API key** with sufficient query quota for your domain count
* **Seed domains** already configured in PGP that you want to enrich with SecurityTrails data

### Creating an API Key

* Sign in to the [SecurityTrails Portal](https://securitytrails.com/).
* Navigate to your account settings or the **API** section.
* Copy your existing API key or generate a new one.
* Ensure your plan includes sufficient monthly API query credits for the number of domains you plan to monitor.

## Setup

* In PGP, navigate to the **Integrations** page.
* Select **SecurityTrails** from the list of available integrations.
* Enter your SecurityTrails API key in the configuration form.
* Save the integration. PGP will validate connectivity to the SecurityTrails API automatically.

### Field Reference

|  |  |  |
| --- | --- | --- |
| Field | Description | Required |
| API Key | Your SecurityTrails API key | Yes |

## What Data Is Synced

### Subdomains (Seeds)

The integration discovers subdomains associated with your seed domains and imports them as new seeds into PGP for further scanning and analysis.

|  |  |  |
| --- | --- | --- |
| Data Field | Source | Description |
| Subdomain | Subdomain listing API | Fully qualified subdomain names discovered under your seed domains |
| First Seen | Historical records | Timestamp when the subdomain was first observed by SecurityTrails |

### DNS Records (Assets)

Historical and current DNS records are imported to map your domain infrastructure.

|  |  |  |
| --- | --- | --- |
| Data Field | Source | Description |
| Record Type | DNS history API | The DNS record type (A, AAAA, MX, NS, CNAME, TXT, SOA) |
| Record Value | DNS history API | The resolved value (IP address, mail server, nameserver, etc.) |
| IP Address | A/AAAA records | IP addresses that the domain currently or previously resolved to |
| First Seen | Historical records | When the DNS record was first observed |
| Last Seen | Historical records | When the DNS record was most recently observed |

### WHOIS Data

Domain registration information is imported to help attribute assets to your organization.

|  |  |  |
| --- | --- | --- |
| Data Field | Source | Description |
| Registrant | WHOIS API | The registered owner of the domain |
| Registrar | WHOIS API | The domain registrar |
| Registration Date | WHOIS API | When the domain was originally registered |
| Expiration Date | WHOIS API | When the domain registration expires |
| Nameservers | WHOIS API | Authoritative nameservers for the domain |

## API Endpoints Used

|  |  |  |
| --- | --- | --- |
| Endpoint | Method | Purpose |
| `/v1/domain/{domain}/subdomains` | GET | Enumerate subdomains for a given domain |
| `/v1/history/{domain}/dns/{type}` | GET | Retrieve historical DNS records by record type |
| `/v1/domain/{domain}/whois` | GET | Retrieve current WHOIS registration data |
| `/v1/domain/{domain}` | GET | Retrieve current DNS records and domain metadata |

The integration uses pagination where supported and respects SecurityTrails API rate limits. All requests are authenticated using the API key passed in the `apikey` header.

### Required API Permissions

|  |  |
| --- | --- |
| Permission | Purpose |
| API Access | Read access to subdomain, DNS history, and WHOIS endpoints |

## Troubleshooting

|  |  |  |
| --- | --- | --- |
| Issue | Cause | Fix |
| "Invalid API key" or 401 error | The API key is incorrect or has been revoked | Verify your API key in the SecurityTrails portal and update it in PGP |
| "Rate limit exceeded" or 429 error | Too many API requests in a short period | Reduce the number of seed domains or upgrade your SecurityTrails plan for higher rate limits |
| No subdomains discovered | The domain has no subdomains in SecurityTrails database, or the domain is not in your seed list | Verify the domain exists in SecurityTrails by searching manually, and confirm it is added as a seed in PGP |
| Incomplete DNS history | SecurityTrails may not have historical records for newer or less popular domains | This is expected for recently registered or low-traffic domains |
| Integration times out | Large number of seed domains requiring many API calls | Reduce the number of seed domains or contact support for timeout adjustments |

## Security and Data Handling

The SecurityTrails integration operates in a strictly read-only mode. It queries the SecurityTrails API to retrieve domain intelligence data and does not modify any account settings or data within SecurityTrails.

Credentials are handled securely within PGP. The SecurityTrails API key is encrypted at rest and used exclusively for authenticating API requests during sync operations. The key is not exposed in logs or transmitted to any third party.

PGP imports only domain metadata, DNS records, and WHOIS registration information. No authentication credentials, private zone data, or account-level information from SecurityTrails is accessed or stored.
