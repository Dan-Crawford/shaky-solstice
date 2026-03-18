---
title: "Vercel WAF"
description: "Vercel WAF"
featurebaseId: "0488421"
---

## Overview

The Vercel WAF integration connects the Praetorian Guard Platform (PGP) with your Vercel projects, providing three security capabilities: scanner IP whitelisting through firewall bypass rules, automated discovery of projects, domains, DNS records, and deployment URLs, and auditing of firewall configurations for common misconfigurations.

This integration is valuable for organizations deploying frontend applications on Vercel who need comprehensive attack surface visibility.

* * *

## What the Integration Does

1.  **Scanner IP Whitelisting** -- PGP creates firewall bypass rules so Chariot scanners are not blocked by the Vercel WAF. Rules are idempotent.
    
2.  **Asset Discovery** -- Enumerates projects, domains, DNS records (A, AAAA, CNAME, ALIAS), and deployment URLs.
    
3.  **Firewall Auditing** -- Checks four protection layers: custom WAF rules, IP-based controls (deny/challenge), Core Rule Set (CRS) categories, and managed rulesets (OWASP, bot protection). Flags projects with no active protection.
    

### Discovered Asset Types

**Project Domain**

`app.example.com`

Domain asset

**DNS A/AAAA**

`93.184.216.34`

IP asset

**DNS CNAME/ALIAS**

`cname.vercel-dns.com`

Domain asset

**Deployment URL**

`my-app-abc123.vercel.app`

Domain asset (latest 5)

### Detected Risks

**Firewall Disabled**

High

WAF completely disabled for the project

**No Active WAF Protection**

High

WAF enabled but no active protection across all four layers (custom rules, IP controls, CRS, managed rules)

* * *

## Prerequisites

-   Vercel account (Pro/Enterprise for WAF)
    
-   Vercel API token with read access
    
-   Team ID (optional for personal accounts)
    

### Creating an API Token

1.  Log in to Vercel dashboard
    
2.  Navigate to **Settings > Tokens**
    
3.  Click **Create Token** with Full Account scope
    
4.  Copy the token (shown only once)
    

### Finding Your Team ID

Found at **Settings > General** or in the dashboard URL. Starts with `team_`.

* * *

## Setup

1.  In PGP, navigate to **Integrations** > **Firewall** > **Vercel WAF**
    
2.  Click **Integrate**
    
3.  Enter fields and click **Connect**
    

**API Token**

Yes

Vercel API token

**Team ID**

No

Leave blank for personal accounts

PGP validates via `GET /v10/projects?limit=1`.

* * *

## What Data Is Synced

**Per-Project:** Domains, DNS records (A, AAAA, CNAME, ALIAS), deployment URLs. **Bypass Rules:** IP bypass for `66.45.78.0/24` tagged "(Managed by PGP)". **Audit:** Firewall config inspected across four protection layers for misconfigurations.

* * *

## Vercel API Endpoints Used

`GET /v10/projects`

Enumerate projects

`GET /v9/projects/{id}`

Verify affiliation

`GET /v9/projects/{id}/domains`

List domains

`GET /v4/domains/{d}/records`

DNS records

`GET /v6/deployments`

Recent deployments

`GET /v1/security/firewall/config/active`

Firewall config

`POST /v1/security/firewall/bypass`

Create bypass rule

* * *

## Troubleshooting

401 on validation

Token invalid/expired

Regenerate in Vercel Settings

403 on validation

No team access

Check token scope and Team ID

No assets

Wrong Team ID or no projects

Leave Team ID blank for personal

No domains

No custom domains

.vercel.app appears as deployments

No bypass rule

Free plan

Requires Pro/Enterprise for WAF

* * *

## Security and Data Handling

-   Bearer token auth over HTTPS, never logged
    
-   Token encrypted at rest and in transit
    
-   Only write: bypass rules. All else read-only
    
-   No code, env vars, or logs accessed
    
-   Query params redacted from logs
    

* * *

## Coming Soon

-   Custom Rule Analysis
    
-   Edge Function Discovery
    
-   Environment Variable Auditing
    
-   Deployment Protection Analysis
    

* * *

_Integration category: Firewall. Data direction: Primarily read-only. Authentication: Bearer token._
