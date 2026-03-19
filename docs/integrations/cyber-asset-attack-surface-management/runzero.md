## Overview

The RunZero integration connects the Praetorian Guard Platform (PGP) with RunZero (formerly Rumble), importing discovered network assets, open services, and device fingerprints into your unified attack surface view. RunZero is a cyber asset attack surface management (CAASM) platform that uses agentless scanning and passive discovery to build a comprehensive inventory of every device on your network, including IT, OT, IoT, and cloud assets.

By connecting RunZero to PGP, you gain visibility into the full breadth of assets that RunZero discovers across your network segments. PGP correlates this internal asset inventory with your external attack surface data, enabling you to identify unmanaged devices, shadow IT, and assets that may be reachable from the internet but were previously unknown to your security team.

This integration operates in a read-only capacity. PGP queries the RunZero Export API to retrieve asset and service data but never modifies scan configurations, tasks, or asset states in your RunZero environment.

---

## What the Integration Does

When enabled, PGP connects to the RunZero API and performs the following:

1. **Asset discovery** -- Retrieves all discovered assets from your RunZero inventory, including IP addresses, hostnames, MAC addresses, and device types.
2. **Service enumeration** -- Imports open services and listening ports detected on each asset, including protocol and service name information.
3. **Device fingerprinting** -- Imports RunZero's device fingerprint data, including OS identification, hardware type, manufacturer, and device classification (IT, OT, IoT).
4. **Asset metadata** -- Captures additional context such as first-seen/last-seen timestamps, network site membership, and asset criticality tags.

All data flows one direction: from RunZero into PGP. Discovered devices become PGP assets, open services become PGP attributes, and device fingerprints provide enrichment context for prioritization.

---

## Prerequisites

Before setting up the integration, ensure you have:

- An active **RunZero** account (cloud-hosted or self-hosted console)
- An **Organization API Key** or **Export API Token** with read permissions
- At least one completed scan with discovered assets in your RunZero inventory

### Creating an API Key

1. Log in to your **RunZero Console** at `https://console.runzero.com`
2. Navigate to **Account > Organization API Keys**
3. Click **Create API Key**
4. Name the key (e.g., `PGP Integration`) and set the **Role** to **Read Only**
5. Copy the generated API key and store it securely

For self-hosted deployments, navigate to **Administration > API Keys** in your RunZero console.

---

## Setup

1. In PGP, go to **Integrations** and locate **RunZero** (under Cyber Asset Attack Surface Management)
2. Enter the required credentials
3. Click **Connect** -- PGP will validate the API key before saving

### Field Reference

| Field | Description | Example |
|-------|-------------|---------|
| **Console URL** | The base URL of your RunZero console (cloud or self-hosted) | `https://console.runzero.com` |
| **API Key** | Your RunZero Organization API key with read-only access | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

Once connected, PGP will begin syncing asset and service data on its regular integration schedule.

---

## What Data Is Synced

### Assets

Each discovered device in RunZero is imported into PGP as an asset.

| RunZero Field | PGP Field | Description |
|---------------|-----------|-------------|
| `addresses` | Asset IP | IP addresses associated with the device |
| `hostnames` | Asset name | Hostnames or DNS names resolved for the device |
| `hw` | Asset metadata | Hardware manufacturer and model |
| `os` | Asset metadata | Operating system identification |
| `type` | Asset metadata | Device classification (e.g., Server, Switch, Printer, IoT) |
| `first_seen` / `last_seen` | Asset metadata | Discovery and last-observed timestamps |

### Attributes (Services)

Open services detected on each asset are imported as PGP attributes.

| RunZero Field | PGP Field | Description |
|---------------|-----------|-------------|
| `service.port` | Attribute value | The listening port number |
| `service.protocol` | Attribute type | The transport protocol (e.g., `tcp`, `udp`) |
| `service.name` | Attribute metadata | The identified service name (e.g., `http`, `ssh`, `rdp`) |

### Device Fingerprints

RunZero's fingerprinting data is imported to enrich asset context.

| RunZero Field | PGP Field | Description |
|---------------|-----------|-------------|
| `os_vendor` | Asset metadata | Operating system vendor |
| `os_version` | Asset metadata | Operating system version |
| `hw_vendor` | Asset metadata | Hardware manufacturer |
| `hw_product` | Asset metadata | Hardware product model |
| `device_type` | Asset metadata | Classification: IT, OT, IoT, or unknown |

---

## API Endpoints Used

PGP uses the RunZero REST API v1.0. All requests use token-based authentication and are read-only (GET).

| Purpose | Endpoint | Method | Notes |
|---------|----------|--------|-------|
| Export assets | `GET /api/v1.0/export/org/assets.json` | GET | Retrieves all assets in the organization with full metadata |
| Export services | `GET /api/v1.0/export/org/services.json` | GET | Retrieves all discovered services across all assets |
| List sites | `GET /api/v1.0/org/sites` | GET | Retrieves site/network segment information |
| Validate credentials | `GET /api/v1.0/org/key` | GET | Validates the API key and returns organization metadata |

All API requests include the `Authorization: Bearer {api_key}` header for authentication.

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| 401 Unauthorized | Invalid or revoked API key | Generate a new API key in the RunZero console and update PGP |
| 403 Forbidden | API key lacks read-only organization access | Ensure the API key has at least Read Only role at the organization level |
| Connection timeout | PGP cannot reach the RunZero console | For self-hosted deployments, verify network connectivity and firewall rules; for cloud, verify the console URL is correct |
| No assets appearing | No completed scans in RunZero | Run at least one scan in RunZero so that assets are available for export |
| Missing hostnames | Devices discovered by IP only without DNS resolution | RunZero may not have resolved hostnames for all devices; assets will still import by IP address |
| Stale asset data | RunZero scans have not run recently | Verify that RunZero scan tasks are active and running on a regular schedule |
| Large sync times | Organization has a very large asset inventory | PGP handles large inventories with pagination; if sync times are excessive, contact your Praetorian team |

---

## Security and Data Handling

- **Read-only access** -- PGP only performs GET requests against the RunZero API. It never creates, modifies, or deletes any data in your RunZero environment, including scan tasks, sites, or asset annotations.
- **Credential storage** -- Your RunZero API key is encrypted at rest and never exposed in logs or API responses.
- **Token-based authentication** -- The API key is sent via the `Authorization: Bearer` header over HTTPS for all requests.
- **Data residency** -- Imported asset and service data is stored within your PGP tenant and subject to your organization's data retention policies.
- **Minimal permissions** -- Only read-level API access is required. We recommend creating a dedicated API key with the Read Only role for the PGP integration.
