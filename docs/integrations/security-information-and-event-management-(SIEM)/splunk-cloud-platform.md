---
title: "Splunk Cloud Platform"
description: "Import Splunk Cloud security events and notable alerts into the Praetorian Guard Platform."
featurebaseId: "5988320"
---

# Overview

The Splunk Cloud Platform integration connects the Praetorian Guard Platform (PGP) with your Splunk Cloud environment, importing security events, notable events (alerts), and correlation search results into your risk and threat visibility workflow. Splunk Cloud Platform serves as a centralized Security Information and Event Management (SIEM) system, aggregating and analyzing machine data from across your infrastructure. PGP imports key security signals from Splunk so they can be correlated with your attack surface data, vulnerabilities, and external threat intelligence.

This integration is valuable for organizations that want to bridge the gap between attack surface management and security monitoring. By importing Splunk security events and alerts into PGP, security teams can see which assets in their attack surface are generating security signals, correlate SIEM detections with known vulnerabilities, and prioritize response based on a more complete risk picture. Instead of investigating alerts in Splunk in isolation, you gain the context of how those signals relate to your external exposure.

## What the Integration Does

When connected, PGP performs a **read-only** import from the Splunk Cloud REST API:

- **Notable Events as Risks**: Splunk Enterprise Security notable events (alerts triggered by correlation searches) are imported as risks in PGP. Each notable event includes the rule name, severity, status, and associated asset details, giving you visibility into active SIEM detections.

- **Correlation Search Results**: Results from Splunk correlation searches and saved searches are imported to provide context about the detection logic that generated each alert.

- **Asset Correlation**: Splunk events referencing IP addresses, hostnames, and domains are mapped to existing PGP assets when possible, linking SIEM detections to your attack surface inventory.

- **Event Metadata**: Key event fields — including source type, source, event time, and severity — are imported as metadata on each risk, preserving the investigative context from Splunk.

Data flows **one direction only** — from Splunk Cloud into PGP. The integration never writes back to Splunk, modifies searches, or changes alert statuses.

## Prerequisites

Before setting up the integration, you need Splunk Cloud API credentials:

1. Log in to your **Splunk Cloud Platform** instance

2. Navigate to **Settings > Users and Roles > Roles**

3. Create a role (or use an existing one) with the following capabilities:
   - `search` — to execute saved searches
   - `list_settings` — to read configuration
   - `rest_properties_get` — to access the REST API

4. Navigate to **Settings > Users and Roles > Users**

5. Create a service account user (or use an existing one) assigned to the role created above

6. Generate a **Splunk authentication token** for the service account:
   - Go to **Settings > Tokens**
   - Click **New Token**
   - Select the service account user and set an appropriate expiration
   - Record the **token value** — it is only shown once

7. Note your **Splunk Cloud instance URL** (e.g., `https://your-instance.splunkcloud.com`)

The service account must have read-only search capabilities. Do not grant write or admin permissions.

## Setup

1. Go to **Integrations, then SIEM, then Splunk Cloud Platform** in the Guard Platform

2. Enter your Splunk Cloud credentials in the setup form

3. Click **Connect** — PGP will validate your credentials by attempting to query your Splunk instance before saving

| Field | Description | Required |
| --- | --- | --- |
| **Instance URL** | Your Splunk Cloud instance URL (e.g., `https://your-instance.splunkcloud.com`). Include the `https://` prefix. | Yes |
| **Authentication Token** | A Splunk authentication token for the service account user | Yes |
| **Search Index** | The Splunk index to query for security events. Defaults to `notable` for Enterprise Security notable events. | No |
| **Saved Search Name** | A specific saved search to import results from. If not specified, PGP imports all notable events. | No |

If validation fails, verify that your authentication token is valid and that the service account has the required search capabilities.

## What Data Is Synced

### Notable Events (Alerts)

Each Splunk Enterprise Security notable event creates a risk in PGP with:

- **Risk name**: Derived from the correlation search or rule name that triggered the notable event
- **Severity**: Critical, High, Medium, Low, or Informational — mapped from the Splunk urgency/severity field
- **Metadata**: Rule name, source, event time, status (new/in progress/resolved), owner, and associated assets

### Event-to-Asset Mapping

Splunk events are correlated with PGP assets where possible:

| Splunk Event Field | PGP Asset Mapping |
| --- | --- |
| `dest_ip` / `src_ip` | Matched to IPv4 Asset |
| `dest_host` / `src_host` | Matched to Domain Seed or Asset |
| `dest_dns` / `src_dns` | Matched to Domain Seed |
| `dvc` (device) | Matched to Asset by hostname or IP |

### Correlation Search Context

For each notable event, associated correlation search details are imported:

| Correlation Field | Description |
| --- | --- |
| Search name | The name of the correlation search that generated the event |
| Search description | Description of the detection logic |
| MITRE ATT&CK mapping | Associated ATT&CK technique IDs, when available |
| Kill chain phase | Associated kill chain phase, when tagged |

### Event Metadata

Raw event fields are preserved as risk metadata for investigative context:

- **Source type**: The Splunk sourcetype of the originating event
- **Source**: The data input source
- **Event time**: Original event timestamp from Splunk
- **Index**: The Splunk index where the event resides

## API Endpoints Used

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/services/search/jobs` | POST | Create a search job to query notable events or saved searches |
| `/services/search/jobs/{search_id}/results` | GET | Fetch results from a completed search job |
| `/services/saved/searches` | GET | List available saved searches and correlation searches |
| `/servicesNS/-/-/saved/searches/{name}/dispatch` | POST | Dispatch a specific saved search |
| `/services/authentication/current-context` | GET | Validate credentials and retrieve current user context |

**Base URL**: `https://{your-instance}.splunkcloud.com:8089`

All requests are authenticated using a `Bearer` token in the Authorization header over HTTPS. The integration uses the Splunk REST API on port 8089 (management port).

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| Validation fails on connect | Authentication token is invalid or expired | Generate a new token in Splunk under Settings > Tokens |
| Connection refused | Instance URL is incorrect or missing port | Verify the instance URL matches your Splunk Cloud deployment. PGP connects on port 8089. |
| No risks appearing | No notable events exist in the specified index | Verify that Splunk Enterprise Security is generating notable events, or specify a different search index |
| Permission denied on search | Service account lacks search capabilities | Add `search` and `rest_properties_get` capabilities to the service account role |
| Only partial events imported | Search results are limited by role-based access controls | Ensure the service account role has access to the indexes containing your security events |
| Timeout during sync | Search query returns too many results | Specify a Saved Search Name to narrow the scope, or work with your Splunk admin to optimize the search |

## Security and Data Handling

- **Read-only access**: The integration only reads data from Splunk Cloud. It never creates, modifies, or deletes searches, alerts, indexes, or any Splunk configuration.

- **Credential handling**: Your Splunk authentication token is stored as an encrypted credential within PGP and is never exposed in logs or the UI after initial entry.

- **Authentication**: The token is transmitted via HTTPS in the Authorization header for every request to the Splunk REST API.

- **Data filtering**: Imported risks pass through PGP standard filtering rules, allowing you to control which Splunk events are included in your risk inventory. You can further scope the integration using saved searches to import only the most relevant security signals.
