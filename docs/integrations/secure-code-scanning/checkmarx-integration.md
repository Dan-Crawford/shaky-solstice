---
title: "Checkmarx Integration"
description: "Checkmarx Integration"
featurebaseId: "8921885"
---

### Overview

The Checkmarx integration brings your application security findings into the Praetorian Guard Platform (PGP), giving you a unified view of code-level vulnerabilities alongside your broader attack surface. SAST, SCA, secrets detection, infrastructure-as-code (KICS), and container findings from Checkmarx flow into PGP as risks — linked to the repositories they belong to — so you can prioritize remediation across your entire security posture from one place.

If you already rely on Checkmarx for code scanning, this integration lets you keep using it while PGP becomes the central system of record for all findings, assets, and risk workflow.

* * *

### Why Connect Checkmarx to Guard

Application security findings often live in a silo, separate from your network, cloud, and external attack surface data. That split creates blind spots:

-   **Fragmented prioritization** — A critical SAST finding in a public-facing service may deserve more urgency than one in an internal tool, but you can’t tell without correlating against your attack surface.
    
-   **Inconsistent workflows** — Teams triage code vulnerabilities in Checkmarx and infrastructure risks in another tool, duplicating effort and losing context.
    
-   **Incomplete reporting** — Stakeholders want one view of organizational risk, not separate exports from five tools.
    

Connecting Checkmarx to Guard solves this by automatically importing your scan results and mapping them to repositories in your asset inventory. You get a single prioritized risk list, one triage workflow, and unified reporting — while Checkmarx continues to handle the scanning.

* * *

### What the Integration Does

The integration is **read-only**: PGP pulls data from Checkmarx and does not modify your projects, scans, or results in Checkmarx.

**How it works:**

1.  **Authentication** — PGP uses your Checkmarx One URL and API key to obtain a short-lived access token via OpenID Connect. No credentials are stored in Checkmarx by PGP.
    
2.  **Project discovery** — PGP lists all projects in your Checkmarx One tenant.
    
3.  **Scan collection** — For each project, PGP fetches recent completed scans (from the last 7 days, with at least one per project when available).
    
4.  **Repository creation** — Each project with a Git repository URL in its scan metadata is represented as a **repository asset** in PGP.
    
5.  **Results import** — Scan findings are converted to **risks** in PGP, linked to the corresponding repository.
    

#### Supported Finding Types

Type

Description

What PGP Captures

**SAST**

Code-level vulnerabilities (e.g., injection, XSS)

File, line, method, data flow, CWE reference

**SCA**

Vulnerable open-source dependencies

Package version, recommended upgrade, CVSS score

**Secrets**

Hardcoded credentials (API keys, passwords)

File, line, rule, code snippet, validity status

**KICS**

Infrastructure-as-code issues (Terraform, CloudFormation, etc.)

Description, severity

**Containers**

Container image vulnerabilities

Description, severity

#### Intelligent Filtering

Not every Checkmarx finding needs to land in PGP. The integration automatically filters out noise so you focus on what is actionable:

-   **Included:** Findings in _To Verify_ or _Confirmed_ states
    
-   **Excluded:** Findings marked _Not Exploitable_, _Proposed Not Exploitable_, or _Fixed_
    
-   **Excluded:** Informational severity findings
    
-   **Excluded:** SCA results with local-only attack vectors (non-network CVSS) or SSCS Scorecard results
    

Severity levels (Critical, High, Medium, Low) from Checkmarx map directly to PGP triage levels. For SCA findings, the CVSS score takes precedence over the stated severity when available.

* * *

### Prerequisites

Before setting up the integration, ensure you have:

-   A **Checkmarx One** (AST) tenant — for example, `https://ast.checkmarx.net` or a region-specific URL like `https://eu-2.ast.checkmarx.net`
    
-   An **API key** (refresh token) from Checkmarx with access to projects and scan results
    
-   Permission to add integrations in your PGP deployment
    

* * *

### Setup Steps

#### Step 1: Identify Your Checkmarx One URL

1.  Log in to your Checkmarx One (AST) tenant
    
2.  Copy the base URL from your browser — for example, `https://ast.checkmarx.net` or `https://eu-2.ast.checkmarx.net`
    
3.  No trailing slash is needed
    

#### Step 2: Generate an API Key in Checkmarx

1.  In Checkmarx One, navigate to **Settings** (gear icon) → **Identity and Access Management**
    
2.  Create or select an API key with access to **Projects** and **Scans/Results**
    
3.  Generate the key and copy the **refresh token** — this is the value you will enter as “API Key” in PGP
    
4.  Store it securely; it may not be displayed again
    

For detailed instructions, see [Checkmarx: Generating an API Key](https://docs.checkmarx.com/en/34965-68618-generating-an-api-key.html).

#### Step 3: Add the Integration in PGP

1.  In PGP, open **Integrations** from the main navigation
    
2.  Find **Checkmarx SAST** under the **Secure Code Scanning** category
    
3.  Click **Connect**
    
4.  In the setup form, enter:
    
    -   **Checkmarx One URL** — the base URL from Step 1
        
    -   **API Key** — the refresh token from Step 2
        
5.  Click **Save**
    

PGP will validate your credentials by testing the token exchange and confirming API access to your projects. Once saved, the integration runs on a regular schedule, automatically importing new scan results.

#### Step 4: Verify

1.  After the next integration run, check **Assets** for repository entries that correspond to your Checkmarx projects
    
2.  Check **Risks** and filter by source to see findings imported from Checkmarx
    
3.  If expected data is missing, see the Troubleshooting section below
    

* * *

### Troubleshooting

Issue

Cause

Fix

Authentication failed

Checkmarx One URL does not match your tenant (including region), or the API key has been revoked

Verify the URL matches your browser exactly. Re-generate the API key in Checkmarx if needed and update it in PGP.

API returns 4xx error

URL is incorrect, or the API key lacks permission to list projects

Confirm the key scopes in Checkmarx under Settings → Identity and Access Management

No repositories or risks appear

Projects may not have completed scans in the last 7 days, or scans lack a Git repository URL in their metadata

Ensure projects have recent scans with Git repo URLs configured

Some findings are missing

Findings may be filtered out by design (Not Exploitable, Fixed, Info severity, local-only SCA, or SSCS Scorecard)

This is expected behavior — only actionable findings are imported

Data seems outdated

The integration uses recent scans (last 7 days). New scans appear on the next run.

Verify the latest scan has completed in Checkmarx and has a Git repository URL

* * *

### Security and Data Handling

-   PGP uses your API key only to obtain an access token and call the Checkmarx REST API — it does not modify any data in Checkmarx
    
-   Credentials are encrypted at rest and in transit within your PGP deployment
    
-   Only finding metadata is imported (descriptions, severity, file locations, package info) — full source code is never pulled into PGP
