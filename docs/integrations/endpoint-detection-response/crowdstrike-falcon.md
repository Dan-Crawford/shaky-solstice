---
title: "CrowdStrike Falcon"
description: "CrowdStrike Falcon"
featurebaseId: "5158358"
---

### Overview

The CrowdStrike Falcon integration brings your endpoint inventory and vulnerability data into the Praetorian Guard Platform (PGP), giving you continuous visibility into what's exposed across your attack surface. Hosts managed by Falcon sync as assets, open CVEs from Spotlight flow in as risks — filtered to network-reachable attack vectors — and everything correlates against your external exposure. The result: you can trace attack paths from the internet to vulnerable internal endpoints and prioritize remediation based on what's actually reachable.

For managed security providers (MSSPs), the Flight Control integration lets you connect once at the master CID level and automatically fan out to all child tenants.

* * *

### Integration Options

PGP offers two CrowdStrike integrations depending on your environment:

Integration

Use Case

**CrowdStrike**

Single-tenant environments or individual child CIDs

**CrowdStrike Flight Control**

MSSP / multi-tenant environments with a parent CID managing multiple child CIDs

Both appear under **Managed Detection & Response** in the Integrations page.

* * *

### Modules

Each integration supports three toggleable modules. Enable or disable them via checkboxes during setup:

Module

Default

What It Does

Required CrowdStrike API Scope

**Hosts**

Enabled

Syncs your Falcon-managed endpoint inventory into PGP as assets (hostname + IP). Filters to non-Workstation devices seen in the last 7 days.

`Hosts: Read`

**Spotlight**

Enabled

Ingests open, network-reachable CVEs (attack vector Network or Adjacent) into PGP as risks with CVSS scores, descriptions, remediation guidance, and proof artifacts. Filters to non-Workstation hosts, updated in last 7 days.

`Spotlight Vulnerabilities: Read`

**Shield**

Disabled

SaaS security posture management. Currently validates API scope only — full data sync coming in a future release.

`SaaS Security: Read`

At least one module must be enabled.

* * *

### Prerequisites

Before setting up the integration, create an API client in the CrowdStrike Falcon console:

1.  Navigate to **Support & Resources → API Clients & Keys** in your Falcon console
2.  Click **Create API Client**
3.  Grant the following scopes based on which modules you plan to enable:

Scope

Required For

`Hosts: Read`

Hosts module

`Spotlight Vulnerabilities: Read`

Spotlight module

`SaaS Security: Read`

Shield module

`Flight Control: Read`

Flight Control (MSSP) integration

4.  Note your **Client ID** and **Client Secret** — you'll need both during setup
5.  Identify your **cloud region** (visible in your Falcon console URL):

-   `us-1` — `api.crowdstrike.com` (most common)
-   `us-2` — `api.us-2.crowdstrike.com`
-   `eu-1` — `api.eu-1.crowdstrike.com`
-   `us-gov-1` — `api.laggar.gcw.crowdstrike.com`

* * *

### Setup: Single-Tenant (CrowdStrike)

1.  Go to **Integrations → Managed Detection & Response → CrowdStrike**
2.  Select your **Cloud Region** from the dropdown
3.  Enter your **Client ID** and **Client Secret**
4.  Toggle the modules you want enabled (Hosts and Spotlight are on by default)
5.  Click **Connect** — PGP will validate your credentials by probing each enabled module's API scope before saving

If validation fails, you'll see which scopes are missing or not licensed. Correct the API client permissions in Falcon and retry.

* * *

### Setup: Multi-Tenant / MSSP (CrowdStrike Flight Control)

Use this integration if you manage multiple child CIDs under a parent/master CID:

1.  Go to **Integrations → Managed Detection & Response → CrowdStrike Flight Control**
2.  Select your **Cloud Region**
3.  Enter the **parent CID's** Client ID and Client Secret (must have `Flight Control: Read` scope)
4.  Toggle the modules you want enabled for all child tenants
5.  Click **Connect**

Once connected, PGP automatically:

-   Discovers all child CIDs via the Flight Control API (`/mssp/queries/children/v1`)
-   Creates a scoped CrowdStrike integration for each child tenant
-   Each child integration authenticates using the parent credentials with `member_cid` scoping, so no per-child API clients are needed

Child integrations inherit the module settings you selected during Flight Control setup.

* * *

### What Data Is Synced

**Hosts → PGP Assets**

-   Device hostname and local IP address
-   Workstations are excluded; only devices seen in the last 7 days are included
-   Devices missing a hostname or IP are skipped

**Spotlight → PGP Risks**

-   Open CVEs with network-reachable attack vectors (`AV:N` or `AV:A` in the CVSS vector)
-   Local-only vulnerabilities (`AV:L`) are filtered out
-   Each risk includes: CVSS score, severity, description, remediation steps, references, and the raw vulnerability data as a proof artifact
-   Vulnerabilities are correlated to their host asset via CrowdStrike's Agent ID

* * *

### CrowdStrike API Endpoints Used

Module

Endpoints

**Authentication**

`POST /oauth2/token` (OAuth2 client credentials; adds `member_cid` for Flight Control children)

**Hosts**

`GET /devices/queries/devices-scroll/v1` (scroll device IDs, limit 5000) → `GET /devices/entities/devices/v2` (hydrate in batches of 100)

**Spotlight**

`GET /spotlight/queries/vulnerabilities/v1` (paginate vuln IDs, limit 400) → `GET /spotlight/entities/vulnerabilities/v2` (hydrate in batches of 100)

**Shield**

`GET /saas-security/queries/saas-resources/v1` (scope validation only)

**Flight Control**

`GET /mssp/queries/children/v1` (paginate child CIDs, limit 100)

Each module also probes its query endpoint with `limit=1` during credential validation to verify API scope access before running.

* * *

### Concurrency & Rate Limits

PGP caps concurrent API requests at **10 parallel calls** during device hydration and vulnerability fetching to stay within responsible usage of the CrowdStrike API. If you're running into rate limiting issues with large environments, reach out to your Praetorian team and we'll work with you to tune throughput.

* * *

### Troubleshooting

Issue

Cause

Fix

"missing API scope or product not licensed (403)"

API client doesn't have the required scope for an enabled module

Add the missing scope in **Falcon → API Clients & Keys**

"missing Flight Control (MSSP) API scope"

Flight Control integration missing `Flight Control: Read` scope

Add the scope to the parent CID's API client

"no modules enabled"

All three module checkboxes are unchecked

Enable at least one module (Hosts, Spotlight, or Shield)

No assets appearing

Devices may all be Workstations or inactive >7 days

Check that Falcon has non-Workstation devices with recent activity

Missing vulnerabilities

CVEs may have local-only attack vectors

Only network-reachable vulns (`AV:N` / `AV:A`) are ingested
