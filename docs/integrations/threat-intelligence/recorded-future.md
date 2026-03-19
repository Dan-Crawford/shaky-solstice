---
title: "Recorded Future"
description: "Recorded Future"
featurebaseId: "9668813"
---

## Overview

The Recorded Future integration connects the Praetorian Guard Platform (PGP) with Recorded Future's threat intelligence platform, importing vulnerability risk scores, threat context, and exposure indicators into your attack surface view. Recorded Future collects and analyzes data from open, dark, and technical sources to deliver real-time intelligence on vulnerabilities, threat actors, and indicators of compromise.

By connecting Recorded Future to PGP, you enrich your existing asset and vulnerability data with external threat intelligence. PGP uses Recorded Future's risk scores and threat context to help prioritize which vulnerabilities represent the highest real-world risk, factoring in active exploitation, threat actor interest, and exposure on the dark web alongside your own attack surface data.

This integration operates in a read-only capacity. PGP queries the Recorded Future API to retrieve threat intelligence data but never modifies any data, configurations, or alert rules in your Recorded Future account.

---

## What the Integration Does

When enabled, PGP connects to the Recorded Future Connect API and performs the following:

* **Vulnerability intelligence** -- Retrieves risk scores and threat context for CVEs that are relevant to your attack surface, including exploitation evidence and trending threat data.
* **Risk enrichment** -- Augments existing PGP risks with Recorded Future risk scores, risk rules triggered, and evidence summaries to provide deeper prioritization context.
* **Exposure indicators** -- Imports indicators of exposure such as mentions of your organization's assets in paste sites, dark web forums, and underground marketplaces.
* **Threat context** -- Associates threat actor and malware intelligence with vulnerabilities found in your environment, helping you understand who is exploiting what.

All data flows one direction: from Recorded Future into PGP. Threat intelligence enriches your existing PGP assets and risks with additional context for prioritization.

---

## Prerequisites

Before setting up the integration, ensure you have:

* An active **Recorded Future** subscription with API access enabled
* A **Recorded Future API token** with read permissions
* Access to the relevant Recorded Future modules (Vulnerability Intelligence, Threat Intelligence) based on your subscription tier

### Generating an API Token

* Log in to the **Recorded Future Portal** at `https://app.recordedfuture.com`
* Navigate to **User Settings > API Access**
* Click **Generate New API Token**
* Name the token (e.g., `PGP Integration`) and copy the generated token
* Store the token securely -- it will not be displayed again

---

## Setup

* In PGP, go to **Integrations** and locate **Recorded Future** (under Threat Intelligence)
* Enter the required credentials
* Click **Connect** -- PGP will validate the API token before saving

### Field Reference

|  |  |  |
| --- | --- | --- |
| Field | Description | Example |
| **API Token** | Your Recorded Future API token with read access | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

Once connected, PGP will begin syncing threat intelligence data on its regular integration schedule.

---

## What Data Is Synced

### Vulnerability Risk Scores

Risk scores for CVEs found in your PGP environment are imported from Recorded Future.

|  |  |  |
| --- | --- | --- |
| Recorded Future Field | PGP Field | Description |
| CVE ID | Risk ID | The CVE identifier (e.g., `CVE-2024-1234`) |
| Risk score (0--99) | Risk metadata | Recorded Future's composite risk score based on multiple threat evidence sources |
| Risk rules triggered | Risk context | Specific risk rules that fired (e.g., "Linked to Malware," "Exploited in the Wild") |
| Evidence summary | Proof artifact | Summary of evidence supporting the risk score |

### Threat Context

Threat actor and malware associations linked to vulnerabilities in your environment.

|  |  |  |
| --- | --- | --- |
| Recorded Future Field | PGP Field | Description |
| Threat actor name | Risk metadata | Named threat actors known to exploit the vulnerability |
| Malware family | Risk metadata | Malware families associated with the vulnerability |
| Exploit availability | Risk metadata | Whether public exploit code exists |

### Exposure Indicators

External exposure signals related to your organization's assets.

|  |  |  |
| --- | --- | --- |
| Recorded Future Field | PGP Field | Description |
| Domain/IP mentions | Asset metadata | References to your assets in threat intelligence sources |
| Dark web mentions | Risk context | Mentions of your domains or IPs on dark web forums and marketplaces |
| Paste site mentions | Risk context | Your asset identifiers appearing in public paste sites |

---

## API Endpoints Used

PGP uses the Recorded Future Connect API v2. All requests use token-based authentication and are read-only (GET).

|  |  |  |  |
| --- | --- | --- | --- |
| Purpose | Endpoint | Method | Notes |
| Vulnerability lookup | `GET /v2/vulnerability/{id}` | GET | Retrieves risk score and context for a specific CVE |
| Vulnerability search | `GET /v2/vulnerability/search` | GET | Searches for vulnerabilities matching specified criteria |
| IP intelligence | `GET /v2/ip/{ip}` | GET | Retrieves risk data and threat context for an IP address |
| Domain intelligence | `GET /v2/domain/{domain}` | GET | Retrieves risk data and threat context for a domain |
| Threat actor lookup | `GET /v2/threatActor/{id}` | GET | Retrieves details on a specific threat actor |

All API requests include the `X-RFToken` header for authentication.

---

## Troubleshooting

|  |  |  |
| --- | --- | --- |
| Issue | Cause | Fix |
| 401 Unauthorized | Invalid or expired API token | Generate a new API token in the Recorded Future portal and update PGP |
| 403 Forbidden | API token lacks required permissions or module access | Verify your Recorded Future subscription includes the required modules and that the token has read access |
| No risk enrichment appearing | CVEs in your environment may not have Recorded Future intelligence | Recorded Future coverage depends on publicly known vulnerabilities; proprietary or internal findings may not have data |
| Rate limit errors (429) | Too many API requests in a short period | PGP will automatically retry with backoff; if persistent, contact your Praetorian team to adjust sync frequency |
| Missing threat context | Subscription tier does not include Threat Intelligence module | Confirm your Recorded Future license includes the modules needed for the data types you expect |
| Stale risk scores | Sync has not run recently | Check the integration status in PGP; trigger a manual resync if needed |

---

## Security and Data Handling

* **Read-only access** -- PGP only performs GET requests against the Recorded Future API. It never creates, modifies, or deletes any data in your Recorded Future account.
* **Credential storage** -- Your Recorded Future API token is encrypted at rest and never exposed in logs or API responses.
* **Token-based authentication** -- The API token is sent via the `X-RFToken` header over HTTPS for all requests.
* **Data residency** -- Imported threat intelligence data is stored within your PGP tenant and subject to your organization's data retention policies.
* **Minimal permissions** -- Only read-level API access is required. We recommend creating a dedicated API token for the PGP integration.
