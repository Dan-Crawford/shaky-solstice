## Overview

The Fastly CDN integration connects the Praetorian Guard Platform (PGP) with Fastly's content delivery network to discover domain names and service configurations that are part of your external attack surface. By importing CDN service data, PGP ensures that all domains routed through Fastly are accounted for in your asset inventory.

Content delivery networks often serve as the front door for web applications, and domains configured in a CDN may not appear in other asset discovery sources. This integration closes that visibility gap by pulling domain and backend configuration data directly from the Fastly API, giving your security team a complete picture of externally accessible services.

The integration operates in a read-only capacity using a `global:read` scoped API token. PGP does not modify any Fastly services, domains, or configurations.

## What the Integration Does

The Fastly CDN integration authenticates with the Fastly API using a read-only scoped token and enumerates your CDN services to discover associated domain names and backend configurations. Each discovered domain is imported as an asset into PGP for ongoing attack surface monitoring.

The integration validates that the provided API token has the correct `global:read` scope before proceeding with data collection. This ensures the token has sufficient permissions to read service configurations while confirming it does not have write access.

All operations are strictly read-only. PGP does not create, modify, or delete any Fastly services, domains, or configurations.

## Prerequisites

Before setting up the Fastly CDN integration, ensure you have:

- **A Fastly account** with at least one configured CDN service
- **A Fastly API token** with `global:read` scope

### Creating a Fastly API Token

1. Sign in to the [Fastly Management Console](https://manage.fastly.com).
2. Navigate to **Account** > **Personal API tokens** (or **Automation tokens** for service accounts).
3. Click **Create Token**.
4. Set the **Scope** to `global:read` (read-only access to all resources). Do not use `global` scope for the CDN-only integration.
5. Optionally set an expiration date for the token.
6. Click **Create Token** and copy the generated token immediately. It will not be shown again.

## Setup

1. In PGP, navigate to the **Integrations** page.
2. Select **Fastly CDN** from the list of available integrations.
3. Enter your Fastly API token.
4. Ensure the scope is set to `global:read` for read-only CDN discovery.
5. Save the integration. PGP will validate that the token scope matches the selected configuration.

### Field Reference

| Field | Description | Required |
|-------|-------------|----------|
| API Token | Your Fastly API token with `global:read` scope | Yes |
| Scope | The token scope -- select `global:read` for CDN-only discovery | Yes |

## What Data Is Synced

### CDN Services and Domains (Assets)

The integration discovers domains associated with your Fastly CDN services and imports them as assets.

| Data Field | Source | Description |
|------------|--------|-------------|
| Domain Name | Fastly service domain configuration | Domain names served through Fastly CDN |
| Service Name | Fastly service metadata | The name of the CDN service the domain belongs to |
| Backend Hosts | Fastly backend configuration | Origin server hostnames configured as backends |

### Seeds

Discovered domain names are added as seeds in PGP, enabling further automated discovery and scanning of related infrastructure.

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `https://api.fastly.com/tokens/self` | GET | Validate the API token and verify its scope |
| `https://api.fastly.com/services` | GET | List all CDN services in the account |
| `https://api.fastly.com/service/{id}/details` | GET | Retrieve domain and backend configuration for each service |

Authentication is performed via the `Fastly-Key` header included with every API request.

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| "Missing Fastly API token" | The API token field is empty | Enter a valid Fastly API token in the integration configuration |
| "Token scope is X, but 'global:read' scope was selected" | The token scope does not match the CDN-only configuration | Generate a new token with `global:read` scope, or select the WAF integration if you need `global` scope |
| No assets discovered | No CDN services are configured, or services have no associated domains | Verify your Fastly account has active services with domain configurations |
| Authentication failure (401) | The API token is invalid or has been revoked | Generate a new API token in the Fastly Management Console and update the integration |
| Partial data sync | The token lacks permissions for some services | Ensure the token was created by an account with visibility into all required services |

## Security and Data Handling

The Fastly CDN integration operates in a strictly read-only mode. It uses a `global:read` scoped API token that only permits reading configuration data from the Fastly API. PGP does not modify any CDN services, domain configurations, caching rules, or backend settings.

Credentials are handled securely within PGP. The Fastly API token is encrypted at rest and transmitted only over HTTPS to the Fastly API. The token is used exclusively for data retrieval during sync operations.

PGP imports only service metadata, domain names, and backend hostnames. No customer traffic data, access logs, or cached content is accessed or stored.
