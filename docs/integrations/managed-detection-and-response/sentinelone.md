---
title: "SentinelOne"
description: "SentinelOne"
featurebaseId: "0923966"
---

## Overview

The SentinelOne integration connects the Praetorian Guard Platform (PGP) with SentinelOne's endpoint detection and response (EDR) platform to import managed endpoints, agent status information, and threat detections. By ingesting data from SentinelOne, PGP gains visibility into your endpoint security posture and can correlate endpoint assets with the broader attack surface.

Endpoints are a critical component of any organization's attack surface. The SentinelOne integration ensures that PGP has an accurate and current inventory of all endpoints managed by SentinelOne, including their agent health status, operating system details, and network information. This enables security teams to identify gaps between known assets and protected endpoints, and to understand which systems have active threat detections.

This integration uses the SentinelOne Management Console API v2.1 in a read-only capacity. PGP queries SentinelOne for agent and threat data and does not modify any configurations, policies, or threat responses in your SentinelOne environment.

## What the Integration Does

The SentinelOne integration connects to your SentinelOne Management Console via the REST API to retrieve agent inventory and threat detection data. For each agent registered in your SentinelOne environment, PGP imports the endpoint as an asset, capturing details such as hostname, IP addresses, operating system, agent version, and agent health status.

When threat import is enabled, the integration also retrieves active and resolved threat detections, allowing PGP to incorporate endpoint threat intelligence into its risk model. The integration validates connectivity by querying the accounts endpoint before proceeding with data import.

All operations are strictly read-only. PGP does not modify agent configurations, initiate scans, trigger responses, or alter any threat status in your SentinelOne console.

## Prerequisites

Before setting up the SentinelOne integration, ensure you have:

* **A SentinelOne Management Console** with API access enabled
* **An API Token** with read permissions for agents and threats
* **The console URL** for your SentinelOne Management Console (e.g., `https://usea1-yourcompany.sentinelone.net`)

### Creating an API Token

* Sign in to your SentinelOne Management Console.
* Navigate to **Settings** > **Users**.
* Select your user account or create a dedicated service account for the integration.
* Click **Actions** > **API Token Operations** > **Generate API Token**.
* Copy the generated token immediately, as it will not be displayed again.
* Ensure the account has at least **Viewer** role permissions to access agent and threat data.

## Setup

* In PGP, navigate to the **Integrations** page.
* Select **SentinelOne** from the list of available integrations.
* Enter your SentinelOne console URL and API token in the configuration form.
* Save the integration. PGP will validate connectivity to the SentinelOne API by querying the accounts endpoint.

### Field Reference

|  |  |  |
| --- | --- | --- |
| Field | Description | Required |
| Console URL | The full URL of your SentinelOne Management Console (e.g., `https://usea1-yourcompany.sentinelone.net`) | Yes |
| API Token | The API token generated from your SentinelOne user account | Yes |

## What Data Is Synced

### Endpoints / Agents (Assets)

The integration imports all managed endpoints from SentinelOne as assets into PGP.

|  |  |  |
| --- | --- | --- |
| Data Field | Source | Description |
| Hostname | Agent data | The computer name of the managed endpoint |
| IP Addresses | Agent data | Internal and external IP addresses reported by the agent |
| OS Type | Agent data | The operating system type (Windows, macOS, Linux) |
| OS Version | Agent data | The full operating system version string |
| Agent Version | Agent data | The installed SentinelOne agent version |
| Agent Status | Agent data | Current agent health status (active, inactive, disconnected) |
| Machine Type | Agent data | Physical, virtual, or cloud instance classification |
| Last Active | Agent data | Timestamp of the agent's most recent communication with the console |
| Site / Group | Agent data | The SentinelOne site and group the endpoint belongs to |

### Threat Detections (Risks)

When threat import is enabled, the integration retrieves threat detections from SentinelOne.

|  |  |  |
| --- | --- | --- |
| Data Field | Source | Description |
| Threat Name | Threat data | The name or classification of the detected threat |
| Threat Status | Threat data | Current status of the threat (active, mitigated, resolved) |
| Classification | Threat data | SentinelOne's threat classification (malware, ransomware, PUP, etc.) |
| Confidence Level | Threat data | The detection confidence level assigned by SentinelOne |
| Affected Endpoint | Threat data | The agent/endpoint where the threat was detected |
| Detection Time | Threat data | When the threat was first detected |

## API Endpoints Used

|  |  |  |
| --- | --- | --- |
| Endpoint | Method | Purpose |
| `/web/api/v2.1/accounts` | GET | Validate API credentials and console connectivity |
| `/web/api/v2.1/agents` | GET | Retrieve the full inventory of managed endpoints and agent details |
| `/web/api/v2.1/threats` | GET | Retrieve threat detections across all managed endpoints |

The integration uses pagination via cursor tokens to handle environments with large numbers of agents or threats. All requests are authenticated using the API token passed in the `Authorization: ApiToken` header.

### Required API Permissions

|  |  |
| --- | --- |
| Permission | Purpose |
| Viewer (minimum) | Read access to agents, threats, and account information |

## Troubleshooting

|  |  |  |
| --- | --- | --- |
| Issue | Cause | Fix |
| "Missing required configuration: API Token" | The API token field was left empty | Enter a valid API token in the integration configuration |
| "Failed to process URL" | The console URL is malformed or missing the protocol | Ensure the URL includes `https://` and matches your SentinelOne console address |
| "Failed to validate credentials" (401) | The API token is invalid or expired | Generate a new API token in the SentinelOne console and update it in PGP |
| "Failed to validate credentials" (403) | The API token lacks required permissions | Ensure the associated user account has at least Viewer role permissions |
| API error with specific error code | SentinelOne returned a specific error message | Review the error detail provided and consult SentinelOne API documentation for the error code |
| No agents discovered | The API token scope is limited to an empty site or group | Verify the token has access to the appropriate sites and groups in your SentinelOne console |
| Integration times out | Very large environment with thousands of agents | The integration has a 60-second timeout. Contact support if your environment requires a longer window |

## Security and Data Handling

The SentinelOne integration operates in a strictly read-only mode. It queries the SentinelOne Management Console API to retrieve agent and threat metadata and does not modify any agent configurations, trigger scans, initiate threat responses, or alter any settings in your SentinelOne environment.

Credentials are handled securely within PGP. The SentinelOne API token is encrypted at rest and used exclusively for authenticating API requests during sync operations. The token is not exposed in logs or transmitted to any third party.

PGP imports only endpoint metadata and threat detection summaries. No endpoint file content, forensic data, quarantined samples, or response actions are accessed or stored by PGP.
