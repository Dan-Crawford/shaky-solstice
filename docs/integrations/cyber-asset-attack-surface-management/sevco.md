## Overview

The Sevco integration connects the Praetorian Guard Platform (PGP) with Sevco Security's cyber asset attack surface management (CAASM) platform to import consolidated asset inventory, device telemetry, and coverage gap data. Sevco aggregates asset information from multiple sources across your environment, and this integration brings that unified view into PGP for attack surface analysis.

Organizations typically have asset data fragmented across dozens of tools -- endpoint agents, vulnerability scanners, cloud providers, and IT asset management systems. Sevco correlates and deduplicates asset records from these sources to produce a single source of truth. By integrating Sevco with PGP, security teams gain access to this correlated asset intelligence alongside PGP's offensive security perspective, enabling identification of unmanaged devices, coverage gaps, and assets that may be missing from other security tools.

This integration uses the Sevco API in a read-only capacity. PGP queries Sevco for asset and telemetry data and does not modify any configurations, asset records, or policies in your Sevco environment.

## What the Integration Does

The Sevco integration queries the Sevco API to retrieve your organization's consolidated asset inventory. For each asset in Sevco, PGP imports device metadata including hostnames, IP addresses, operating system details, and source tool coverage information. The integration also imports coverage gap data, identifying assets that are missing from expected security tools.

Sevco's asset correlation means that a single device may have been observed by multiple tools (e.g., an endpoint agent, a vulnerability scanner, and a cloud provider). The integration imports the correlated asset record, preserving the multi-source context that helps PGP understand which assets are well-managed and which may be blind spots.

All operations are strictly read-only. PGP does not modify, create, or delete any asset records, configurations, or policies in your Sevco environment.

## Prerequisites

Before setting up the Sevco integration, ensure you have:

- **A Sevco Security account** with API access enabled
- **An API key** with read permissions for asset inventory and device data
- **The Sevco API base URL** for your organization's Sevco instance

### Creating an API Key

1. Sign in to the [Sevco Platform](https://app.sevco.io/).
2. Navigate to **Settings** > **API Keys**.
3. Click **Create API Key** and provide a descriptive name (e.g., "Praetorian Guard Platform").
4. Assign read-only permissions to the key.
5. Copy the generated API key immediately, as it may not be displayed again.

## Setup

1. In PGP, navigate to the **Integrations** page.
2. Select **Sevco** from the list of available integrations.
3. Enter your Sevco API key and base URL in the configuration form.
4. Save the integration. PGP will validate connectivity to the Sevco API automatically.

### Field Reference

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Sevco API key with read permissions | Yes |
| Base URL | The Sevco API base URL for your organization | Yes |

## What Data Is Synced

### Consolidated Assets (Assets)

The integration imports Sevco's correlated asset inventory into PGP.

| Data Field | Source | Description |
|------------|--------|-------------|
| Hostname | Asset inventory | The primary hostname of the device |
| IP Addresses | Asset inventory | All known IP addresses associated with the device |
| MAC Addresses | Asset inventory | Hardware MAC addresses for network identification |
| OS Type | Asset inventory | The operating system type (Windows, macOS, Linux, etc.) |
| OS Version | Asset inventory | The full operating system version |
| Device Type | Asset inventory | Classification of the device (workstation, server, virtual machine, etc.) |
| Last Seen | Asset inventory | Timestamp of the most recent observation across all source tools |
| Source Tools | Asset inventory | List of security tools that have observed this device |

### Device Telemetry

Telemetry data provides operational context about the state and health of assets.

| Data Field | Source | Description |
|------------|--------|-------------|
| Agent Status | Telemetry data | Status of endpoint agents installed on the device |
| Network Activity | Telemetry data | Recent network activity indicators for the device |
| Cloud Instance Metadata | Telemetry data | Cloud provider, instance type, and region for cloud-hosted assets |

### Coverage Gaps (Risks)

The integration identifies assets that are missing from expected security tool coverage.

| Data Field | Source | Description |
|------------|--------|-------------|
| Missing Tool | Coverage analysis | The security tool that should be present but is not installed or reporting |
| Affected Asset | Coverage analysis | The device that is missing the expected tool coverage |
| Gap Type | Coverage analysis | The category of coverage gap (e.g., missing EDR, missing vulnerability scanner) |

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/assets` | GET | Retrieve the consolidated asset inventory |
| `/v1/assets/{id}` | GET | Retrieve detailed information for a specific asset |
| `/v1/devices` | GET | Retrieve device telemetry and source tool data |
| `/v1/coverage` | GET | Retrieve coverage gap analysis data |

The integration uses pagination to handle large asset inventories and respects Sevco API rate limits. All requests are authenticated using the API key.

### Required API Permissions

| Permission | Purpose |
|------------|---------|
| Read Assets | Access to the consolidated asset inventory |
| Read Devices | Access to device telemetry data |
| Read Coverage | Access to coverage gap analysis |

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| "Invalid API key" or 401 error | The API key is incorrect or has been revoked | Verify your API key in the Sevco platform and update it in PGP |
| "Forbidden" or 403 error | The API key lacks required read permissions | Ensure the API key has read access to assets, devices, and coverage data |
| No assets discovered | The Sevco instance has no correlated asset data, or the API key scope is restricted | Verify that your Sevco instance has active data sources and that the API key has access to the relevant organization |
| Incomplete asset data | Some source tools in Sevco may not provide all fields | This is expected when certain data sources do not report specific attributes like MAC addresses or OS versions |
| Integration times out | Very large asset inventory with tens of thousands of devices | Contact support for timeout adjustments if your environment exceeds default limits |

## Security and Data Handling

The Sevco integration operates in a strictly read-only mode. It queries the Sevco API to retrieve asset inventory and telemetry data and does not modify any asset records, configurations, source integrations, or policies in your Sevco environment.

Credentials are handled securely within PGP. The Sevco API key is encrypted at rest and used exclusively for authenticating API requests during sync operations. The key is not exposed in logs or transmitted to any third party.

PGP imports only device metadata, telemetry summaries, and coverage gap information. No raw logs, event data, or sensitive device content from Sevco is accessed or stored by PGP.
