---
title: "Palo Alto Networks Panorama"
description: "Palo Alto Networks Panorama"
featurebaseId: "2883622"
---

## Overview

The Palo Alto Networks Panorama integration brings your firewall-managed network inventory into the Praetorian Guard Platform (PGP), giving you visibility into assets that your firewall infrastructure already knows about but that may be missing from your attack surface. Panorama centrally manages address objects — the IPs, CIDR blocks, FQDNs, and IP ranges that define your protected environment — and this integration imports them directly into PGP as assets without any manual data entry.

This is especially valuable for organizations managing large-scale firewall deployments across multiple device groups. Rather than reconciling Panorama and PGP separately, the integration automatically surfaces firewall-managed assets so they can be assessed, scanned, and tracked as part of your broader security posture. If Panorama knows about an address that PGP hasn't discovered through external scanning, you'll see it — closing gaps in your attack surface coverage.

* * *

## What the Integration Does

The integration is **read-only**: PGP queries your Panorama instance's REST API and imports address objects as assets. It does not modify any configuration, policies, or objects in Panorama.

**How it works:**

1.  **Authentication** — PGP authenticates to your Panorama REST API using the API key you provide, passed via the `X-PAN-KEY` header over HTTPS.
    
2.  **Address object enumeration** — PGP queries the `Objects/Addresses` and `Objects/AddressGroups` endpoints to retrieve all address objects from your configured scope (a specific device group or the shared address space).
    
3.  **Asset creation** — Each address object is mapped to a PGP asset and tagged with the `paloalto` cloud service identifier, linked back to its originating device group.
    
4.  **Affiliation tracking** — On subsequent runs, PGP checks whether previously imported assets still exist in Panorama. If an address object is removed from Panorama, PGP detects the change.
    

### Imported Address Types

TypeExampleHow PGP Handles It

**IP-Netmask**

`10.0.0.1/32`, `192.168.1.0/24`

Extracted as an IP or CIDR asset

**FQDN**

`mail.example.com`

Extracted as a domain asset

**IP Range**

`10.0.0.1-10.0.0.255`

First IP in the range is extracted as a seed

**IP Wildcard**

`10.0.0.0/255.255.0.0`

Base IP extracted as an asset

Address groups (both static and dynamic) are also discovered for metadata enrichment, providing additional context about how your firewall policies organize these assets.

### Scoping

If you specify a device group during setup, only address objects within that group are imported. If you leave the device group field blank, PGP queries the **shared** location, pulling in address objects available across all device groups.

* * *

## Prerequisites

Before setting up the integration, you need:

-   A **Panorama instance** accessible over HTTPS from PGP
    
-   An **API key** generated from a Panorama administrator account with read access to address objects
    
-   **Network connectivity** between PGP and your Panorama instance — if Panorama is behind a corporate firewall, ensure appropriate access is configured
    

### Creating an API Key

1.  Log in to the Panorama web interface
    
2.  Navigate to **Device > Administrators** (or use the XML API `keygen` endpoint: `type=keygen&user=<USER>&password=<PASS>`)
    
3.  Generate a new API key for a user account with at least **read-only access to Objects**
    
4.  Copy the key — it is displayed only once
    

### Recommended Permissions

For least-privilege access, create a custom admin role in Panorama:

Permission AreaSetting

**Web UI**

Disabled

**CLI**

Disabled

**XML API — Configuration**

Enabled

**XML API — Operational Requests**

Enabled

**XML API — Commit**

Disabled

**REST API — Objects**

Read-Only

**REST API — Policies**

Read-Only

Alternatively, the predefined **Superuser (Read Only)** role works but grants broader access than necessary.

**PAN-OS version note:** PAN-OS 10.2 and later provide separate permission tabs for REST API and XML API, allowing more granular control. The integration defaults to REST API version v11.1. If your Panorama instance runs an older PAN-OS version, you can specify a different API version during setup.

* * *

## Setup

1.  In PGP, navigate to **Integrations** and locate **Palo Alto Networks Panorama** under the **Firewall** category.
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69b32ade13126e4dc0bfcc55/019cf1d0-f0a3-7dc8-85b6-6d1561ed7ae4/b64u-U2NyZWVuc2hvdCAyMDI2LTAzLTE1IGF0IDkuMDUuMTbigK9BTS5wbmc.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=be39b50f5e34103ef035ebc5906fce272e87d50d5cd906ca4afc2df835b16919)

2.  Click Integrate on Palo Alto Network Panorama Card
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69b32ade13126e4dc0bfcc55/019cf1cd-c814-7868-8568-9abd2f8f761d/b64u-U2NyZWVuc2hvdCAyMDI2LTAzLTE1IGF0IDkuMDEuNTTigK9BTS5wbmc.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=878c9de17019dd11c43e0132ecc2f0780e067549b6c0858570e433b8bf288e60)

2.  Enter values for the following fields and click connect.
    

FieldRequiredDescription

**Panorama Host**

Yes

The full URL of your Panorama instance, including the protocol (e.g., `https://panorama.example.com`)

**API Key**

Yes

The API key generated from your Panorama administrator account

**Device Group**

No

A specific device group name to scope the import. Leave blank to import from the shared address space.

**API Version**

No

Defaults to `v11.1`. Only change this if your Panorama instance runs a PAN-OS version that requires a different REST API version.

3.  Click **Connect**. PGP validates your credentials by making a lightweight test call to the Panorama API (`Objects/Addresses?limit=1`). If validation succeeds, the integration begins importing address objects on its next scheduled run.
    

* * *

## What Data Is Synced

**Address Objects to PGP Assets**

-   Every address object in your configured scope (device group or shared) is imported as a PGP asset
    
-   Assets are tagged with the `paloalto` cloud service identifier
    
-   Each asset retains a reference to its Panorama device group and object name for traceability
    
-   On subsequent runs, PGP reconciles the current Panorama state — new objects are added, removed objects are detected via affiliation checks
    

**Address Groups (Metadata Only)**

-   Static and dynamic address groups are enumerated for context
    
-   Group membership data enriches the understanding of how your firewall policies organize assets
    
-   Groups themselves are not created as standalone assets
    

* * *

## Panorama API Endpoints Used

EndpointPurpose

`GET /restapi/{version}/Objects/Addresses`

Enumerate address objects (paginated, up to 500 per page)

`GET /restapi/{version}/Objects/AddressGroups`

Enumerate address groups (paginated)

Both endpoints accept `location=shared` or `location=device-group&device-group={name}` to control scope.

* * *

## Troubleshooting

IssueCauseFix

Validation fails with 401 or 403

API key is invalid, expired, or lacks required permissions

Regenerate the API key in Panorama and verify the account has read access to Objects

Validation fails with connection error

Panorama host URL is incorrect or PGP cannot reach the instance

Confirm the URL includes `https://`, check network connectivity and firewall rules between PGP and Panorama

No assets appear after connection

Device group may be empty, or all objects may be in a different scope

Try leaving the device group blank to query the shared location, or verify the device group name matches exactly

Assets appear but seem incomplete

Only one device group or the shared location is queried per integration

To import from multiple device groups, either leave device group blank (imports shared objects) or create separate integrations per device group

API version mismatch errors

Panorama runs an older PAN-OS version

Set the API Version field to match your PAN-OS version (e.g., `v10.2` for PAN-OS 10.2)

* * *

## Security and Data Handling

-   PGP uses your API key exclusively for read-only REST API calls — it **never modifies** any configuration, policies, address objects, or other settings in Panorama
    
-   The API key is encrypted at rest and in transit within your PGP deployment
    
-   Only address object metadata is imported (names, IPs, FQDNs, tags, descriptions) — no firewall logs, traffic data, or credentials are accessed
    
-   PGP authenticates via the `X-PAN-KEY` HTTP header over HTTPS; the API key is never logged or exposed in error messages
    

* * *

## Coming Soon

We are actively expanding the Panorama integration to provide deeper visibility into your firewall-managed environment:

-   **NAT Rule Extraction** — Discover externally-exposed services by analyzing destination NAT rules. DNAT rules that route internet traffic to internal servers reveal assets that may not appear as standalone address objects.
    
-   **Security Policy Analysis** — Extract firewall security rules to understand which assets are intentionally exposed and what applications and services are allowed through your perimeter.
    
-   **Firewall Rule Auditing** — Identify common misconfigurations such as overly permissive rules (any-any), allow rules missing security profiles (antivirus, anti-spyware, vulnerability protection), and unused or shadowed rules. These findings will surface as risks in PGP alongside your vulnerability data.
    
-   **Network Topology Discovery** — Import interface configurations, zone definitions, and GlobalProtect VPN gateway addresses to build a more complete picture of your network perimeter and its security boundaries.
    

* * *

_Integration category: Firewall. Data direction: Read-only (Panorama to PGP). Authentication: API key via X-PAN-KEY header._
