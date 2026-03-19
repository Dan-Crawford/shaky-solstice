---
title: "Akamai CDN"
description: "Akamai CDN"
featurebaseId: "4181760"
---

## Overview

The Akamai CDN integration connects the Praetorian Guard Platform (PGP) with your Akamai Content Delivery Network, importing delivery properties, domain mappings, and CDN configuration details directly into your attack surface inventory. CDN configurations often expose origin servers, edge hostnames, and domain mappings that represent critical parts of your external attack surface — PGP imports these as assets so they can be continuously monitored and tested alongside everything else in your environment.

This integration is ideal for organizations using Akamai CDN who want full visibility into the domains and origins served through their CDN infrastructure. Instead of manually tracking which properties are configured in Akamai, PGP automatically discovers delivery configurations and maps them to your broader attack surface, ensuring that CDN-fronted assets are not overlooked during security assessments.

## What the Integration Does

When connected, PGP performs a **read-only** import from the Akamai Property Manager API:

* **Delivery Properties as Assets**: Each Akamai property (delivery configuration) is imported as a PGP asset. Property details — including property name, contract ID, group ID, and activation status — are captured as metadata. This gives you a complete inventory of what your CDN is serving.
* **Edge Hostnames and Domain Mappings as Seeds**: Hostnames associated with your properties, including edge hostnames and origin server addresses, are imported as PGP seeds. These feed into the Guard discovery and scanning pipeline, ensuring that every domain fronted by Akamai CDN is part of your continuously monitored attack surface.
* **Origin Server Discovery**: Origin server hostnames and IP addresses configured within your delivery properties are extracted and imported, revealing the true backend infrastructure behind your CDN layer.

Data flows **one direction only** — from Akamai into PGP. The integration never writes back to Akamai, modifies properties, or changes CDN configuration.

## Prerequisites

Before setting up the integration, you need Akamai EdgeGrid API credentials:

* Log in to [Akamai Control Center](https://control.akamai.com)
* Navigate to **Identity & Access Management** under the account menu
* Select the **API Users** tab
* Click **Create API Client** (or select an existing user)
* Under **API Client Details**, click **Create Credential**
* Record the following values — they are only shown once:
* **Client Token**
* **Client Secret**
* **Access Token**
* **API Host** (e.g., `akab-xxxxx.luna.akamaiapis.net`)
* Ensure the API client has **READ** access to the **Property Manager (PAPI)** API

The API credentials must have read-only permissions to the Property Manager API for the contracts and groups containing your CDN properties.

## Setup

* Go to **Integrations, then Content Delivery Network, then Akamai CDN** in the Guard Platform
* Enter your EdgeGrid credentials in the setup form
* Click **Connect** — PGP will validate your credentials by attempting to fetch your properties before saving

|  |  |  |
| --- | --- | --- |
| Field | Description | Required |
| **API Host** | Your Akamai EdgeGrid API hostname (e.g., `akab-xxxxx.luna.akamaiapis.net`). Do not include the `https://` protocol prefix. | Yes |
| **Client Token** | The client token from your EdgeGrid API credentials | Yes |
| **Client Secret** | The client secret from your EdgeGrid API credentials | Yes |
| **Access Token** | The access token from your EdgeGrid API credentials | Yes |

If validation fails, verify that your API credentials have the correct permissions and that the API host does not include a protocol prefix.

## What Data Is Synced

### Delivery Properties

Each Akamai property creates an asset with:

* **Asset name**: Derived from the property name
* **Asset type**: CDN configuration
* **Metadata**: Contract ID, group ID, property ID, latest version, activation status (staging/production), and associated edge hostnames

### Hostnames and Origins

Hostnames associated with properties are imported as seeds:

|  |  |
| --- | --- |
| Akamai Element | PGP Seed/Asset Type |
| Property edge hostname | Domain Seed |
| Customer-facing hostname (CNAME from) | Domain Seed |
| Origin server hostname | Domain Seed |
| Origin server IP address | IPv4 Asset |

### Activation Status

Property activation status is tracked to distinguish between staging and production configurations, giving you visibility into what is actively serving traffic versus what is in testing.

## API Endpoints Used

|  |  |  |
| --- | --- | --- |
| Endpoint | Method | Purpose |
| `/papi/v1/contracts` | GET | Fetch all contracts accessible with your credentials |
| `/papi/v1/groups` | GET | Fetch all groups within accessible contracts |
| `/papi/v1/properties` | GET | Fetch delivery properties for each contract/group |
| `/papi/v1/properties/{propertyId}/versions/{version}/hostnames` | GET | Fetch hostnames associated with a property version |
| `/papi/v1/properties/{propertyId}/versions/{version}/rules` | GET | Fetch property rules including origin server configuration |

**Base URL**: `https://{your-api-host}` (e.g., `https://akab-xxxxx.luna.akamaiapis.net`)

All requests are authenticated using Akamai EdgeGrid signing. The integration processes all accessible contracts and groups in a single sync.

## Troubleshooting

|  |  |  |
| --- | --- | --- |
| Issue | Cause | Fix |
| Validation fails on connect | API credentials are incorrect or expired | Regenerate credentials in Akamai Control Center under Identity & Access Management |
| API host rejected | Host includes `https://` prefix | Remove the protocol prefix — enter only the hostname (e.g., `akab-xxxxx.luna.akamaiapis.net`) |
| No assets appearing | API client lacks Property Manager (PAPI) read access | Edit the API client in Akamai Control Center and grant READ access to the Property Manager API |
| Missing origin servers | Property rules may not include origin configuration | Verify that your Akamai properties have origin server behavior configured |
| Partial property list | API client is scoped to specific contracts/groups | Ensure the API client has access to all contracts and groups you want to import |

## Security and Data Handling

* **Read-only access**: The integration only reads data from Akamai. It never creates, modifies, or deletes properties, hostnames, or CDN configuration.
* **Credential handling**: Your EdgeGrid credentials (Client Token, Client Secret, Access Token) are stored as encrypted credentials within PGP and are never exposed in logs or the UI after initial entry.
* **Authentication**: Credentials are used to sign requests via the Akamai EdgeGrid authentication protocol over HTTPS.
* **Data filtering**: Imported assets pass through PGP standard filtering rules, allowing you to control which properties and hostnames are included in your attack surface.
