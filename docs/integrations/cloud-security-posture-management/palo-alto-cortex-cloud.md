## Overview

The Palo Alto Cortex Cloud integration connects the Praetorian Guard Platform (PGP) with Palo Alto Networks' Cortex XSIAM/XDR platform. This integration enables security teams to import security incidents, alerts, and endpoint data from Cortex into PGP, providing a unified view of extended detection and response findings alongside other attack surface data.

Palo Alto Cortex Cloud combines security information and event management (SIEM), security orchestration (SOAR), attack surface management (ASM), and extended detection and response (XDR) into a single platform. By integrating Cortex with PGP, organizations can correlate threat detection and incident response data with vulnerability findings and asset inventories from other security tools.

The integration operates in a read-only capacity, retrieving incident and alert data from Cortex without modifying any configurations, incidents, or response actions within your Cortex deployment.

## What the Integration Does

The Palo Alto Cortex Cloud integration performs the following operations during each sync cycle:

1. **Validates credentials** — Authenticates with the Cortex XDR API using the provided API Key ID and API Key, and verifies connectivity by issuing a test request to the incidents endpoint.
2. **Imports incidents** — Retrieves security incidents detected by Cortex, including incident metadata, severity, status, and associated endpoints.
3. **Imports alerts** — Retrieves alert details associated with incidents, including detection rules, affected hosts, and alert classifications.
4. **Imports endpoint data** — Retrieves information about endpoints involved in security incidents and creates corresponding asset records in PGP.

All operations are strictly read-only. PGP does not create, modify, close, or delete any incidents, alerts, or endpoint configurations in Cortex.

## Prerequisites

Before configuring the Palo Alto Cortex Cloud integration, ensure you have:

- **Palo Alto Cortex XSIAM or XDR** instance with an active subscription
- **API Key** with appropriate read permissions
- **API Key ID** associated with the API key
- **Cortex FQDN** — The fully qualified domain name of your Cortex tenant

### Generating Cortex API Credentials

1. Log in to your Palo Alto Cortex console.
2. Navigate to **Settings** > **Configurations** > **Integrations** > **API Keys**.
3. Click **+ New Key**.
4. Select the key type:
   - **Standard** — For basic API access (recommended)
   - **Advanced** — For enhanced access with additional permissions
5. Set the security level to **Read-Only** or assign a role with read-only permissions.
6. Click **Generate** and copy both the **API Key** and **API Key ID**.

### Finding Your Cortex FQDN

Your Cortex FQDN is the hostname of your tenant, typically in the format: `your-tenant.xdr.us.paloaltonetworks.com`. You can find this in your browser's address bar when logged into the Cortex console.

## Setup

To configure the Palo Alto Cortex Cloud integration in PGP:

1. Navigate to the **Integrations** page in PGP.
2. Locate **Palo Alto Cortex Cloud** and click **Connect**.
3. Enter the required credentials in the configuration form.
4. Click **Save** to activate the integration.

### Configuration Fields

| Field | Description | Example |
|-------|-------------|---------|
| **FQDN** | The fully qualified domain name of your Cortex tenant | `your-tenant.xdr.us.paloaltonetworks.com` |
| **API Key ID** | The numeric identifier associated with your API key | `12` |
| **API Key** | The API key generated from the Cortex console | `xdr_api_key_abcdef123456...` |

## What Data Is Synced

### Assets

PGP creates asset records for endpoints and hosts referenced in Cortex incidents and alerts.

| Cortex Field | PGP Representation | Description |
|-------------|-------------------|-------------|
| Endpoint hostname | Asset | Hostnames of endpoints involved in security incidents |
| Endpoint IP address | Asset | IP addresses of endpoints detected in alert data |
| Endpoint OS | Asset metadata | Operating system information for discovered endpoints |

### Risks

PGP creates risk records for incidents and alerts detected by Cortex.

| Cortex Finding Type | PGP Representation | Description |
|--------------------|-------------------|-------------|
| Incidents | Risk | Security incidents with correlated alerts and response actions |
| Alerts | Risk | Individual security alerts triggered by detection rules |
| Endpoint threats | Risk | Threats detected on specific endpoints (malware, exploits, etc.) |

## API Endpoints Used

The integration uses the Cortex XDR REST API. All requests are authenticated using the `x-xdr-auth-id` and `Authorization` headers. The base URL is constructed as `https://api-{fqdn}/public_api/v1`.

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/incidents/get_incidents` | Retrieves security incidents with filtering and pagination |
| POST | `/alerts/get_alerts` | Retrieves alerts associated with incidents |
| POST | `/endpoints/get_endpoint` | Retrieves endpoint details |

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| 401 Unauthorized | Invalid API Key or API Key ID | Verify the API Key and API Key ID are correct and have not been revoked in the Cortex console |
| 403 Forbidden | API key lacks required permissions | Ensure the API key has read permissions for incidents, alerts, and endpoints |
| Connection timeout | Incorrect FQDN or network restrictions | Verify the FQDN matches your Cortex tenant and that outbound HTTPS traffic to `api-{fqdn}` is allowed |
| Missing FQDN error | FQDN field is empty | Enter your Cortex tenant's fully qualified domain name (e.g., `your-tenant.xdr.us.paloaltonetworks.com`) |
| Missing API Key ID error | API Key ID field is empty | Enter the numeric API Key ID associated with your API key from the Cortex console |
| No data imported | No incidents exist in the selected time range | Verify that your Cortex instance has incidents and alerts available. Check that the API key scope includes the relevant data |
| Request timeout (180s) | Large volume of incidents or slow API response | The integration has a 180-second timeout. If syncs consistently time out, contact support for assistance |

## Security and Data Handling

- **Read-only access** — The integration only reads incident, alert, and endpoint data from Cortex. It does not create, modify, close, or delete any incidents, response actions, or configurations.
- **Credential storage** — The API Key and API Key ID are stored encrypted within PGP and are never exposed in logs or the user interface after initial configuration.
- **Data transfer** — All communication between PGP and Cortex occurs over HTTPS using TLS encryption.
- **API authentication** — The integration uses Cortex's standard API key authentication mechanism with the `x-xdr-auth-id` and `Authorization` headers, following Palo Alto's recommended authentication method.
