---
title: "HackerOne"
description: "HackerOne"
featurebaseId: "9691112"
---

## Overview

The HackerOne integration connects the Praetorian Guard Platform (PGP) with your HackerOne bug bounty programs, importing vulnerability reports and program scope directly into your attack surface. Bug bounty findings from security researchers flow into PGP as risks — complete with severity ratings, CWE classifications, and remediation context — so you can manage them alongside every other vulnerability in a single pane of glass.

This integration is ideal for organizations running bug bounty programs on HackerOne who want to correlate researcher-reported vulnerabilities with their broader attack surface. Instead of managing bounty findings in isolation, PGP maps them to discovered assets, enriches them with platform context, and applies consistent prioritization across all vulnerability sources.

## What the Integration Does

When connected, PGP performs a **read-only** import from HackerOne API:

-   **Vulnerability Reports as Risks**: Every report in your HackerOne programs is imported as a PGP risk. Report state (new, triaged, resolved, duplicate, etc.) maps to PGP risk status (Triage, Open, Remediated, Deleted). Severity ratings (Critical, High, Medium, Low, None) are preserved, and metadata — including CVSS score, CWE classification, reporter username, and submission date — is stored as proof artifacts.
    
-   **Program Scopes as Seeds**: Eligible-for-submission scope entries (URLs, domains, IP addresses, CIDR blocks) are imported as PGP seeds, feeding them into Guard discovery and scanning pipeline. This means your bug bounty scope automatically becomes part of your continuously monitored attack surface.
    

Data flows **one direction only** — from HackerOne into PGP. The integration never writes back to HackerOne, modifies reports, or changes program configuration.

## Prerequisites

Before setting up the integration, you need a HackerOne API token:

1.  Log in to your HackerOne account at [hackerone.com](https://hackerone.com)
    
2.  Navigate to **Settings then API Tokens** (or **Organization Settings then API Tokens** for organization-level access)
    
3.  Click **Create API Token**
    
4.  Note your **API Identifier** (username) and **API Token** (secret) — you will need both during setup
    
5.  Ensure the token has access to the programs you want to import
    

The API token must have permissions to read programs, reports, and structured scopes for the target programs.

## Setup

1.  Go to **Integrations, then Bug Bounty, then HackerOne** in the Guard Platform
    
2.  Enter your credentials in the setup form
    
3.  Click **Connect** — PGP will validate your credentials by attempting to fetch your programs before saving
    

Field

Description

Required

**API Identifier**

Your HackerOne API identifier (username)

Yes

**API Token**

Your HackerOne API token (secret)

Yes

If validation fails, verify that your API token has the correct permissions and has not expired.

## What Data Is Synced

### Vulnerability Reports

Each HackerOne report creates a risk with:

-   **Risk name**: Derived from the report title
    
-   **Severity**: Critical, High, Medium, Low, or Informational — preserved from the HackerOne severity rating
    
-   **Proof artifacts**: CVSS score, CWE classification (e.g., CWE-79), reporter username, submission date, program handle, and report ID
    
-   **Description and impact**: Full vulnerability information and impact statement from the report
    

**Status mapping**: HackerOne report state maps to PGP status:

HackerOne State

HackerOne StatePGP Status

New

Triage

Pending Program Review

Triage

Needs More Info

Triage

Triaged

Open

Retesting

Open

Resolved

Remediated

Not Applicable

Deleted

Duplicate

Deleted

Spam

Deleted

Informative

Deleted

### Program Scopes

Only scopes marked as **eligible for submission** are imported:

HackerOne Asset Type

PGP Seed Type

URL

Web Application Seed (normalized to HTTPS)

Domain

Domain Asset

IP Address

IPv4 Asset

CIDR

CIDR Asset

Unsupported asset types (e.g., Hardware) are silently skipped.

## API Endpoints Used

Endpoint

Method

Purpose

`/v1/me/programs`

GET

Fetch all bug bounty programs accessible with your credentials

`/v1/reports?filter[program][]={handle}&page[size]=100`

GET

Fetch vulnerability reports for each program (paginated)

`/v1/programs/{programID}/structured_scopes?page[size]=100`

GET

Fetch scope definitions for each program (paginated)

**Base URL**: `https://api.hackerone.com`

All requests use pagination with 100 items per page. The integration processes all accessible programs in a single sync.

## Troubleshooting

Issue

Cause

Fix

Validation fails on connect

API Identifier or Token is incorrect or expired

Regenerate your API token in HackerOne Settings, API Tokens

No risks appearing

Reports may be in states that map to Deleted (duplicate, spam, informative)

Check your HackerOne program for reports in active states (new, triaged, retesting)

No seeds appearing

Scopes may not be marked as eligible for submission

In your HackerOne program, verify scope entries are flagged as eligible

Missing vulnerability details

Report may lack severity or structured scope

HackerOne reports without severity ratings import with Informational severity

Unexpected asset targets

Report lacks structured scope with supported asset type

Reports without a supported scope type (URL, Domain, IP, CIDR) fall back to the integration asset itself

## Security and Data Handling

-   **Read-only access**: The integration only reads data from HackerOne. It never creates, modifies, or deletes reports or program settings.
    
-   **Credential handling**: Your API Identifier and Token are stored as encrypted credentials within PGP and are never exposed in logs or the UI after initial entry.
    
-   **Authentication**: Credentials are transmitted using HTTP Basic Authentication over HTTPS to the HackerOne API.
    
-   **Data filtering**: Risks pass through PGP standard VM filter rules, allowing you to control which severity levels or scan types are imported.
