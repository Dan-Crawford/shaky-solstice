---
title: "Snyk DAST"
description: "Snyk DAST"
featurebaseId: "7979868"
---

## Overview

The Snyk DAST integration connects the Praetorian Guard Platform (PGP) with Snyk API & Web (powered by Probely), importing DAST (Dynamic Application Security Testing) findings to track web application and API security vulnerabilities. PGP queries the Probely API to discover verified domains, web and API targets, and their associated vulnerability findings, mapping them as risks and assets in your attack surface inventory.

This integration is read-only — PGP never modifies targets, findings, or configurations in Snyk API & Web.

## What the Integration Does

1.  **Domain discovery** — PGP fetches verified domains from the `/domains/` endpoint and imports them as domain-level assets.
    
2.  **Asset discovery** — Discovered web applications and APIs from the `/discovery/assets/` endpoint are imported as assets, providing visibility into your web attack surface.
    
3.  **Target enumeration** — PGP retrieves all scanning targets from `/targets/` and imports their hostnames as assets. Web targets are additionally imported as web application assets.
    
4.  **Finding import** — For each target, PGP fetches vulnerability findings from `/targets/{id}/findings/` and maps them to PGP risks with severity, CWE classifications, CVSS scores, and request/response evidence.
    

### Severity Mapping

Probely Severity

PGP Severity

≥ 40

Critical

≥ 30

High

≥ 20

Medium

≥ 10

Low

< 10

Info

### Filtering

The following findings are automatically excluded from import:

*   Findings with state **fixed**
    
*   Findings with state **accepted** (risk accepted)
    
*   Findings marked as **false positive**
    

## Prerequisites

*   A **Snyk API & Web** account (powered by Probely)
    
*   A **JWT API token** with sufficient permissions
    
*   Access to your PGP account
    

### Required Permissions

The Snyk API & Web platform uses a role-based permission model. The API token must belong to an account with permissions to read targets, findings, domains, and discovered assets.

The following roles and permissions are required for the integration to work correctly:

Resource

Required Permission

Purpose

**Targets**

Read

Enumerate scanning targets and their metadata

**Findings**

Read

Retrieve vulnerability findings for each target

**Domains**

Read

Discover verified domains

**Discovery Assets**

Read

Retrieve discovered web applications and APIs

**Profile**

Read

Validate credentials during setup

For detailed information about Snyk API & Web roles and how permissions map to API endpoints, refer to the [Snyk API & Web Permissions Documentation](https://help.probely.com/en/articles/12841594-understanding-permissions-at-snyk-api-web).

### Creating an API Token

1.  Log in to your Snyk API & Web (Probely) account
    
2.  Navigate to your **profile settings**
    
3.  Generate a new API token
    
4.  Copy the token — store it securely as it will be needed for the PGP configuration
    

## Setup

1.  In PGP, navigate to **Integrations** and locate **Snyk DAST** under the **Application Security Testing** category.
    
2.  Click **Integrate**.
    
3.  Enter the following fields and click **Connect**.
    

Field

Required

Description

**Target**

Yes

An identifier for this integration instance (e.g., your organization name or account identifier)

**API Token**

Yes

Your Snyk API & Web (Probely) JWT API token

PGP validates credentials by calling `GET /profile/` to confirm the token is valid and has access to the account.

## What Data Is Synced

**Domains to PGP Assets**

*   Verified domains are imported as domain-level assets
    
*   Unverified domains are skipped
    

**Discovered Assets to PGP Assets**

*   Web applications are imported as web application assets with their full URL
    
*   API targets are imported as domain-level assets
    
*   Assets with state `ARCHIVED` or `HIDDEN` are excluded
    

**Targets and Findings to PGP Assets and Risks**

*   Each target's hostname is imported as a domain asset; web targets are additionally imported as web application assets
    
*   Vulnerability findings are imported as risks with:
    
    *   CWE classifications and references
        
    *   CVSS scores and vectors
        
    *   Affected URL, method, parameter, and insertion point
        
    *   Request/response evidence for proof of exploitation
        
    *   First-found and last-found timestamps
        

## Probely API Endpoints Used

Endpoint

Method

Purpose

`/profile/`

GET

Validate credentials

`/domains/`

GET

Fetch verified domains (paginated)

`/discovery/assets/`

GET

Fetch discovered web and API assets (paginated)

`/targets/`

GET

Enumerate scanning targets (paginated)

`/targets/{id}/findings/`

GET

Retrieve findings per target (paginated)

**Base URL**: `https://api.probely.com`

All requests are authenticated using an `Authorization: JWT {token}` header over HTTPS. The integration includes automatic retry with exponential backoff for rate limiting (HTTP 429) and transient server errors (5xx).

## Troubleshooting

Issue

Cause

Fix

Validation fails on connect

API token is invalid or expired

Generate a new API token in your Snyk API & Web profile settings

401/403 errors

Token lacks required permissions

Ensure the account has read access to targets, findings, domains, and discovery assets. Refer to the [permissions documentation](https://help.probely.com/en/articles/12841594-understanding-permissions-at-snyk-api-web)

No targets or findings appearing

No targets configured in Snyk API & Web

Add targets in your Snyk API & Web account and run at least one scan

Rate limiting (429 errors)

Too many API requests

The integration handles this automatically with exponential backoff; no action needed

Missing findings

Findings are in fixed, accepted, or false positive state

Only open findings are imported; review finding states in Snyk API & Web

## Security and Data Handling

*   **Read-only access** — PGP never creates, modifies, or deletes targets, findings, domains, or configurations in Snyk API & Web
    
*   **Credential handling** — Your API token is stored as an encrypted credential within PGP and is never exposed in logs or the UI after initial entry
    
*   **Authentication** — JWT-based authentication over HTTPS for every request
    
*   **Retry safety** — Only GET requests are made; retries on transient failures are safe and idempotent
    
*   **Rate limiting** — Built-in exponential backoff with jitter prevents API overload
    

* * *

_Integration category: Application Security Testing. Data direction: Read-only (Snyk API & Web to PGP). Authentication: JWT token._

Need help? Contact our [support team](mailto:support@praetorian.com) for assistance.
