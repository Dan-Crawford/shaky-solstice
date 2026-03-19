## Overview

The Freshdesk integration connects the Praetorian Guard Platform (PGP) with Freshdesk's customer support and IT service management platform to discover IT assets and security-related service data. By importing asset and ticket information from Freshdesk, PGP gains visibility into devices and infrastructure tracked through your IT service management workflows.

Organizations often manage significant portions of their IT asset inventory through service management platforms like Freshdesk. Hardware, software, and network devices tracked as configuration items in Freshdesk represent real components of your attack surface. This integration ensures that those assets are visible within PGP, closing gaps between IT operations and security teams.

The integration operates in a read-only capacity, querying the Freshdesk REST API to retrieve asset and service data. PGP does not modify, create, or delete any tickets, assets, or configurations within your Freshdesk instance.

## What the Integration Does

The Freshdesk integration authenticates with the Freshdesk REST API using an API key and enumerates IT assets and related service data from your Freshdesk instance. Discovered assets are imported into PGP for attack surface monitoring and correlation with vulnerability data from other integrations.

The integration uses Basic Authentication with your Freshdesk API key as the username and a placeholder value as the password, following Freshdesk's standard API authentication pattern. It validates credentials by making a test request to the assets endpoint before proceeding with full data collection.

All operations are strictly read-only. PGP does not create, update, or delete any records in your Freshdesk environment.

## Prerequisites

Before setting up the Freshdesk integration, ensure you have:

- **A Freshdesk account** with API access enabled
- **A Freshdesk API key** with read access to assets and tickets
- **Your Freshdesk subdomain URL** (e.g., `https://yourcompany.freshdesk.com`)

### Obtaining Your API Key

1. Sign in to your Freshdesk account.
2. Click your profile icon in the top-right corner and select **Profile Settings**.
3. Your API key is displayed on the right side of the profile page under **Your API Key**.
4. Copy the API key. If you do not see one, contact your Freshdesk administrator to ensure API access is enabled for your account.

## Setup

1. In PGP, navigate to the **Integrations** page.
2. Select **Freshdesk** from the list of available integrations.
3. Enter your Freshdesk subdomain URL and API key.
4. Save the integration. PGP will validate connectivity by making a test request to the Freshdesk API.

### Field Reference

| Field | Description | Required |
|-------|-------------|----------|
| Freshdesk URL | Your Freshdesk instance URL (e.g., `https://yourcompany.freshdesk.com`) | Yes |
| API Key | Your Freshdesk API key for authentication | Yes |

## What Data Is Synced

### IT Assets

The integration discovers IT assets (configuration items) tracked in Freshdesk and imports them into PGP.

| Data Field | Source | Description |
|------------|--------|-------------|
| Asset Name | Freshdesk asset record | The name or identifier of the IT asset |
| Asset Type | Freshdesk asset type | The category of the asset (e.g., workstation, server, network device) |
| IP Address | Freshdesk asset properties | The IP address associated with the asset, if available |
| Status | Freshdesk asset status | The current operational status of the asset |

### Ticket Data

Security-related tickets may be imported to provide context on incident history and service requests associated with discovered assets.

| Data Field | Source | Description |
|------------|--------|-------------|
| Ticket ID | Freshdesk ticket record | The unique identifier for the ticket |
| Subject | Freshdesk ticket subject | The ticket summary or title |
| Priority | Freshdesk ticket priority | The assigned priority level |
| Status | Freshdesk ticket status | The current ticket status (open, pending, resolved, etc.) |

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `{base_url}/api/v2/assets` | GET | Retrieve IT assets from Freshdesk (paginated) |
| `{base_url}/api/v2/tickets` | GET | Retrieve ticket data for security context |

Authentication is performed via HTTP Basic Authentication, with the API key as the username and `X` as the password, included in every API request.

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| "Missing API key" | The API key field is empty | Enter your Freshdesk API key in the integration configuration |
| "Invalid API key" (401) | The API key is incorrect or has been revoked | Verify your API key in Freshdesk Profile Settings and update it in PGP |
| "API key does not have sufficient permissions" (403) | The API key lacks the required read permissions | Contact your Freshdesk administrator to grant the necessary API permissions |
| "Failed to process URL" | The Freshdesk URL is malformed or missing | Ensure the URL is in the format `https://yourcompany.freshdesk.com` |
| No assets discovered | The Freshdesk instance has no assets configured, or the API key lacks asset access | Verify that assets exist in your Freshdesk instance and that the API key has read access |
| Integration times out | Very large Freshdesk instance with many assets | The integration has a 240-second timeout. Contact support if your instance requires a longer window |

## Security and Data Handling

The Freshdesk integration operates in a strictly read-only mode. It queries the Freshdesk REST API to retrieve asset metadata and ticket summaries and does not modify any records, configurations, or workflows within your Freshdesk instance.

Credentials are handled securely within PGP. The Freshdesk API key is encrypted at rest and transmitted only over HTTPS using Basic Authentication. The API key is used exclusively during sync operations for data retrieval.

PGP imports only IT asset metadata (names, types, IP addresses) and ticket summaries (IDs, subjects, statuses). No attachments, customer data, private notes, or conversation content is accessed or stored.
