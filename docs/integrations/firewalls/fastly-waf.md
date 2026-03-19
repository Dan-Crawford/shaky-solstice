---
title: "Fastly WAF"
description: "Fastly WAF"
featurebaseId: "8775510"
---

## Overview

The Fastly WAF integration connects the Praetorian Guard Platform (PGP) with Fastly's Next-Gen WAF (powered by Signal Sciences) to import WAF configurations and manage scanner allowlisting. In addition to performing the same CDN domain and service discovery as the Fastly CDN integration, the WAF integration enables PGP to allowlist Chariot scanner traffic so that security scans are not blocked by your WAF rules.

Web application firewalls are a critical layer of defense, but they can interfere with legitimate security scanning. Without proper allowlisting, a WAF may block or rate-limit PGP's Chariot scanner, leading to incomplete vulnerability assessments. This integration solves that problem by automatically configuring the appropriate allowlist rules in your Fastly Next-Gen WAF, ensuring comprehensive scan coverage while keeping your WAF protections intact for all other traffic.

This integration requires a `global` (read-write) scoped API token because it needs to create allowlist entries in your WAF configuration. Domain and service discovery operations remain read-only.

## What the Integration Does

The Fastly WAF integration performs two primary functions:

1. **CDN Asset Discovery**: Enumerates your Fastly CDN services to discover domain names and backend configurations, identical to the Fastly CDN integration. All discovered domains are imported as assets into PGP.
2. **WAF Scanner Allowlisting**: Configures allowlist rules in your Fastly Next-Gen WAF to permit Chariot scanner traffic. This ensures that PGP's automated security scanning can reach your applications without being blocked by WAF rules.

The integration validates that the provided API token has the `global` scope (full read-write access) before proceeding. This is necessary because creating WAF allowlist rules requires write permissions.

## Prerequisites

Before setting up the Fastly WAF integration, ensure you have:

* **A Fastly account** with the Next-Gen WAF (Signal Sciences) enabled
* **A Fastly API token** with `global` scope (read-write access)
* **At least one WAF-protected service** configured in your Fastly account

### Creating a Fastly API Token

1. Sign in to the [Fastly Management Console](https://manage.fastly.com).
2. Navigate to **Account** > **Personal API tokens** (or **Automation tokens** for service accounts).
3. Click **Create Token**.
4. Set the **Scope** to `global` (full read-write access). The `global:read` scope is not sufficient for WAF management.
5. Optionally set an expiration date for the token.
6. Click **Create Token** and copy the generated token immediately. It will not be shown again.

## Setup

1. In PGP, navigate to the **Integrations** page.
2. Select **Fastly WAF** from the list of available integrations.
3. Enter your Fastly API token with `global` scope.
4. Ensure the scope is set to `global` for WAF allowlisting capabilities.
5. Save the integration. PGP will validate that the token scope matches the selected configuration.

### Field Reference

|  |  |  |
| --- | --- | --- |
| Field | Description | Required |
| API Token | Your Fastly API token with `global` scope | Yes |
| Scope | The token scope -- select `global` for WAF allowlisting | Yes |

## What Data Is Synced

### CDN Services and Domains (Assets)

The integration discovers domains associated with your Fastly CDN services, identical to the Fastly CDN integration.

|  |  |  |
| --- | --- | --- |
| Data Field | Source | Description |
| Domain Name | Fastly service domain configuration | Domain names served through Fastly CDN |
| Service Name | Fastly service metadata | The name of the CDN service the domain belongs to |
| Backend Hosts | Fastly backend configuration | Origin server hostnames configured as backends |

### WAF Allowlist Rules (Write Operation)

The integration creates allowlist entries in your Next-Gen WAF to permit Chariot scanner IPs.

|  |  |
| --- | --- |
| Data Field | Description |
| Scanner IP Allowlist | PGP Chariot scanner IP addresses added to the WAF allowlist |
| Rule Scope | Applied to WAF-protected services to prevent scan blocking |

## API Endpoints Used

|  |  |  |
| --- | --- | --- |
| Endpoint | Method | Purpose |
| `https://api.fastly.com/tokens/self` | GET | Validate the API token and verify `global` scope |
| `https://api.fastly.com/services` | GET | List all CDN services in the account |
| `https://api.fastly.com/service/{id}/details` | GET | Retrieve domain and backend configuration for each service |
| `https://api.fastly.com/wafs` | GET | List WAF configurations |
| `https://api.fastly.com/wafs/{id}/rules` | POST | Create allowlist rules for Chariot scanner traffic |

Authentication is performed via the `Fastly-Key` header included with every API request.

## Troubleshooting

|  |  |  |
| --- | --- | --- |
| Issue | Cause | Fix |
| "Missing Fastly API token" | The API token field is empty | Enter a valid Fastly API token in the integration configuration |
| "Token scope is X, but 'global' scope was selected for WAF rule management" | The token has `global:read` scope instead of `global` | Generate a new token with `global` scope. If you only need CDN discovery, use the Fastly CDN integration instead |
| Scans still being blocked by WAF | Allowlist rules have not yet propagated, or they were overridden by other WAF rules | Wait a few minutes for rule propagation. If the issue persists, verify the allowlist rules exist in your WAF console |
| Authentication failure (401) | The API token is invalid or has been revoked | Generate a new API token in the Fastly Management Console and update the integration |
| No WAF configuration found | The Next-Gen WAF is not enabled on your Fastly account | Enable the Next-Gen WAF in your Fastly account, or use the Fastly CDN integration for read-only domain discovery |

## Security and Data Handling

The Fastly WAF integration uses a `global` scoped API token, which provides read-write access to the Fastly API. Write operations are limited exclusively to creating allowlist rules for PGP Chariot scanner IP addresses in your Next-Gen WAF. PGP does not modify CDN configurations, caching rules, domain settings, or any other WAF rules.

Credentials are handled securely within PGP. The Fastly API token is encrypted at rest and transmitted only over HTTPS to the Fastly API. The token is used exclusively during sync operations.

PGP imports service metadata, domain names, and backend hostnames for asset discovery. For WAF management, PGP only writes scanner IP allowlist entries. No customer traffic data, WAF event logs, or cached content is accessed or stored.
