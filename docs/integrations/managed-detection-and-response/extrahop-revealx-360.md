## Overview

The ExtraHop RevealX 360 integration connects the Praetorian Guard Platform (PGP) with ExtraHop's cloud-native network detection and response platform. By importing network devices and security detections, PGP gains comprehensive visibility into your network infrastructure, including devices that may not appear in traditional asset inventories.

Network-based discovery is a powerful complement to other asset discovery methods. Devices that communicate on your network are automatically detected by ExtraHop, and this integration brings that device intelligence into PGP along with security hardening detections. This allows your security team to correlate network-level findings with vulnerabilities and risks discovered through other PGP integrations.

The integration operates in a read-only capacity, querying the ExtraHop REST API to retrieve device information and security detections. It does not modify any configurations or data within your ExtraHop environment.

## What the Integration Does

The ExtraHop RevealX 360 integration performs two primary data collection tasks:

1. **Device Discovery**: Queries the ExtraHop device search API to discover all devices that have been active within the last 7 days. Each device with a valid IP address (IPv4 or IPv6) is imported as an asset into PGP.

2. **Detection Import**: Queries the ExtraHop detection search API for security hardening detections (category `sec.hardening`). Each detection is mapped to a previously discovered device and imported as a risk in PGP, complete with severity scoring, descriptions, and proof data.

Detections are correlated with devices through participant data. The integration maps ExtraHop risk scores to PGP triage levels: Critical (90+), High (70-89), Medium (50-69), Low (30-49), and Info (below 30).

All operations are strictly read-only. PGP does not modify, create, or delete any data in your ExtraHop environment.

## Prerequisites

Before setting up the ExtraHop RevealX 360 integration, ensure you have:

- **An ExtraHop RevealX 360 account** with API access enabled
- **REST API credentials**: A Client ID and Client Secret with read access to devices and detections
- **Your ExtraHop API base URL**: The cloud console URL for your ExtraHop instance (e.g., `https://your-instance.extrahop.com`)

### Creating API Credentials

1. Sign in to your ExtraHop RevealX 360 console.
2. Navigate to **Administration** > **API Access**.
3. Click **Create Credentials** to generate a new Client ID and Client Secret pair.
4. Ensure the credentials have read permissions for devices and detections.
5. Copy the Client ID and Client Secret. The secret is only shown once at creation time.

## Setup

1. In PGP, navigate to the **Integrations** page.
2. Select **ExtraHop RevealX 360** from the list of available integrations.
3. Enter the required credentials and your ExtraHop base URL.
4. Save the integration. PGP will validate connectivity by requesting an OAuth2 access token.

### Field Reference

| Field | Description | Required |
|-------|-------------|----------|
| Base URL | Your ExtraHop RevealX 360 API base URL (e.g., `https://your-instance.extrahop.com`) | Yes |
| Client ID | The REST API client identifier | Yes |
| Client Secret | The REST API client secret | Yes |

## What Data Is Synced

### Network Devices (Assets)

Devices active within the last 7 days are imported as assets. The integration resolves the best available name for each device using the following priority: DNS name, DHCP name, display name, then IP address.

| Data Field | Source | Description |
|------------|--------|-------------|
| Name | `dns_name`, `dhcp_name`, `display_name`, or IP | The resolved device name, using the first available identifier |
| IP Address | `ipaddr4` or `ipaddr6` | The device's IPv4 address (preferred) or IPv6 address |
| Status | Derived | Set to Active for all discovered devices |

Devices without any IP address (neither IPv4 nor IPv6) are skipped.

### Security Detections (Risks)

Security hardening detections are imported as risks and linked to their associated device assets.

| Data Field | Source | Description |
|------------|--------|-------------|
| Risk Name | `type` | The detection type, with underscores converted to dashes |
| Severity | `risk_score` | Mapped to PGP triage levels (Critical/High/Medium/Low/Info) |
| Description | `description` | The detection description, annotated as sourced from ExtraHop |
| Proof | `properties` | JSON-formatted detection properties providing evidence details |

### Severity Mapping

| ExtraHop Risk Score | PGP Triage Level |
|---------------------|------------------|
| 90 -- 100 | Critical |
| 70 -- 89 | High |
| 50 -- 69 | Medium |
| 30 -- 49 | Low |
| 0 -- 29 | Info |

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/oauth2/token` | POST | Obtain an access token using client credentials |
| `/api/v1/devices/search` | POST | Search for active network devices (paginated, 5000 per page) |
| `/api/v1/detections/search` | POST | Search for security hardening detections (paginated, 1000 per page) |

The integration uses OAuth2 client credentials flow for authentication. Tokens are automatically refreshed at 90% of their expiry time to ensure uninterrupted access during data collection.

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| "Missing client_id or client_secret" | One or both credential fields are empty | Verify that both the Client ID and Client Secret are provided in the integration configuration |
| "Missing base_url" | The ExtraHop base URL was not provided | Enter your ExtraHop RevealX 360 console URL in the Base URL field |
| "Token request failed: 401" | Invalid client credentials | Regenerate your API credentials in the ExtraHop console and update them in PGP |
| "Rate limited: HTTP 429" | Too many API requests in a short period | The integration will need to be retried. Contact support if this persists |
| No devices discovered | No devices have been active in the last 7 days, or all devices lack IP addresses | Verify device activity in your ExtraHop console and ensure devices have assigned IP addresses |
| Detections skipped | Detections reference devices that were not imported | This occurs when a detection's participant device was filtered out or lacks an IP address. This is expected behavior |

## Security and Data Handling

The ExtraHop RevealX 360 integration operates in a strictly read-only mode. It queries the ExtraHop REST API to retrieve device metadata and security detections and does not modify any configurations, rules, or data within your ExtraHop environment.

Credentials are handled securely within PGP. The Client ID and Client Secret are encrypted at rest and used exclusively to obtain short-lived OAuth2 access tokens via the client credentials grant. Access tokens are held in memory only for the duration of the sync operation and are not persisted to disk.

PGP imports only device metadata (IP addresses, hostnames, display names) and detection summaries (type, severity, description). No packet captures, network traffic data, or raw telemetry is accessed or stored.
