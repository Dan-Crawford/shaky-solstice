## Overview

The JupiterOne integration connects the Praetorian Guard Platform (PGP) with JupiterOne to import cyber assets, their relationships, and security findings from JupiterOne's asset graph. By syncing your JupiterOne environment, PGP gains visibility into the assets and security posture data already cataloged in your JupiterOne account, enriching your attack surface inventory with data from across your technology stack.

JupiterOne aggregates asset and security data from hundreds of integrations into a unified graph database, making it a rich source of cyber asset intelligence. This integration allows PGP to leverage that aggregated data by importing hosts, devices, applications, network resources, and associated security findings. Assets discovered through JupiterOne are correlated with assets found through other PGP integrations and scanning activities, providing a more complete picture of your attack surface.

This integration uses the JupiterOne API in a read-only capacity. PGP does not create, modify, or delete any entities, relationships, or configurations in your JupiterOne account.

## What the Integration Does

The JupiterOne integration queries the JupiterOne J1QL query API and asset endpoints to retrieve cyber assets and their associated security findings. It discovers hosts, devices, applications, IP addresses, domains, and other network-accessible resources from JupiterOne's asset graph. Each qualifying asset is imported into PGP with its associated metadata, and security findings are mapped to risks.

The integration leverages JupiterOne's graph-based data model to extract relationships between assets, providing PGP with context about how assets are connected. This enables more accurate attack surface mapping and risk prioritization within PGP.

All operations are strictly read-only. PGP does not modify, create, or delete any entities, relationships, or queries in your JupiterOne account.

## Prerequisites

Before setting up the JupiterOne integration, ensure you have:

- **A JupiterOne account** with assets and integrations configured
- **A JupiterOne API Key** with read access to your account
- **Account ID**: Your JupiterOne account identifier
- **Account permissions**: The API key must have at least read access to entities and relationships

### Creating API Credentials

1. Sign in to your [JupiterOne account](https://j1.apps.us.jupiterone.io).
2. Navigate to **Settings** > **API Keys** (or **Administration** > **API Keys**).
3. Click **Create API Key**.
4. Provide a name (e.g., "Praetorian Guard Platform") and set the permissions to read-only.
5. Copy the generated API key immediately. You will not be able to view it again.
6. Note your **Account ID**, which is visible in your account settings or URL.

## Setup

1. In PGP, navigate to the **Integrations** page.
2. Select **JupiterOne** from the list of available integrations.
3. Enter your JupiterOne API key and account ID in the configuration form.
4. Save the integration. PGP will validate connectivity to the JupiterOne API automatically.

### Field Reference

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your JupiterOne API key with read access | Yes |
| Account ID | Your JupiterOne account identifier | Yes |

## What Data Is Synced

### Cyber Assets

The integration discovers assets from JupiterOne's graph and imports them into PGP. The following asset types are imported when they have externally accessible attributes.

| Data Field | Source | Description |
|------------|--------|-------------|
| Hostname | Entity properties | Hostnames and DNS names associated with discovered entities |
| IP Address | Entity properties | Public IP addresses associated with hosts, devices, and network interfaces |
| Domain | Entity properties | Domain names from DNS and domain entities |
| Application URL | Entity properties | Web application URLs from application entities |
| Entity Type | `_type` | The JupiterOne entity classification (e.g., `aws_instance`, `azure_vm`, `Host`) |
| Display Name | `displayName` | The human-readable name of the entity |
| Entity ID | `_key` | The unique JupiterOne entity identifier for correlation |

### Security Findings (Risks)

Security findings from JupiterOne are imported as risks in PGP.

| Data Field | Source | Description |
|------------|--------|-------------|
| Finding Name | `displayName` | The name or title of the security finding |
| Severity | `severity` or `numericSeverity` | Mapped to PGP severity levels (Critical, High, Medium, Low, Info) |
| Description | `description` | Detailed description of the finding |
| Category | `category` | The finding category or classification |
| Status | `status` | The current status of the finding in JupiterOne |

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `https://graphql.us.jupiterone.io` | POST | Execute J1QL queries to retrieve entities and relationships |
| `https://api.us.jupiterone.io/v1/entities` | GET | Retrieve entity details and properties |

The integration uses JupiterOne's GraphQL-based query interface to execute J1QL queries for discovering assets and findings. Pagination is handled through cursor-based result sets.

### Required API Permissions

| Permission | Type | Purpose |
|------------|------|---------|
| Read | API Key | Read access to entities, relationships, and findings |

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| "Authentication failed" or 401 error | The API key is incorrect, expired, or revoked | Generate a new API key in the JupiterOne console and update it in PGP |
| "Forbidden" or 403 error | The API key lacks sufficient read permissions | Verify the API key has read access to entities and relationships |
| No assets discovered | JupiterOne has no entities with externally accessible attributes, or integrations in JupiterOne have not yet synced | Verify that JupiterOne has active integrations with synced data by running a query in the J1QL console |
| Missing security findings | No findings exist in JupiterOne, or they lack severity information | Verify findings are present in JupiterOne by querying `Find Finding` in the J1QL console |
| Incorrect Account ID | The account ID does not match the API key's account | Verify the Account ID in JupiterOne settings and ensure it matches the configuration in PGP |

## Security and Data Handling

The JupiterOne integration operates in a strictly read-only mode. It queries the JupiterOne API to read entity metadata and security findings, and does not create entities, modify relationships, or alter any configurations in your JupiterOne account.

Credentials are handled securely within PGP. The JupiterOne API key is encrypted at rest and used exclusively for API authentication during sync operations. The API key is not persisted outside of PGP's encrypted credential store.

PGP does not access or store raw data from the systems integrated with JupiterOne. Only entity metadata (names, types, IP addresses, hostnames) and security finding summaries from the JupiterOne graph are read and processed.
