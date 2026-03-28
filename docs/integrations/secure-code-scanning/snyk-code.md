---
title: "Snyk Code"
description: "Snyk Code"
featurebaseId: "6482917"
---

## Overview

The Snyk Code integration connects the Praetorian Guard Platform (PGP) with your Snyk environment, importing SAST (Static Application Security Testing) findings to track application security vulnerabilities. PGP queries the Snyk REST API to discover organizations and projects within a Snyk Group, retrieves code analysis issues, and maps them as risks against their associated repository assets.

This integration is read-only — PGP never modifies projects, issues, or configurations in Snyk.

## What the Integration Does

1.  **Organization discovery** — PGP enumerates all organizations within your Snyk Group using the `/rest/groups/{groupID}/orgs` endpoint.
    
2.  **Project enumeration** — For each organization, PGP fetches SAST projects (type `sast`) via `/rest/orgs/{orgID}/projects`.
    
3.  **Issue import** — Code analysis issues are retrieved per project from `/rest/orgs/{orgID}/issues` and mapped to PGP risks with severity, CWE classifications, file paths, and line numbers.
    
4.  **Asset creation** — Each project's source repository is imported as a repository asset in PGP, serving as the container for all associated findings.
    

### Severity Mapping

Snyk Severity

PGP Severity

High

High

Medium

Medium

Low

Low

Other

Info

### Filtering

The following issues are automatically excluded from import:

*   Issues marked as **ignored** in Snyk
    
*   Issues with status **resolved**
    

## Prerequisites

*   A **Snyk account** with Snyk Code enabled
    
*   A **Snyk API token** (service account or personal)
    
*   Your Snyk **Group ID**
    

### Required Permissions

The integration requires the following Snyk permissions:

*   **Service account**: Must be added as an **Org Collaborator** in each organization you want to scan
    
*   **Normal user account**: Must have **Group Viewer** permissions at the Group level
    

### Creating an API Token

1.  Log in to the [Snyk Web UI](https://app.snyk.io)
    
2.  Click your **account avatar** in the bottom-left corner and select **Account Settings**
    
3.  Under the **General** tab, locate the **Auth Token** section
    
4.  Click **Generate Token** (or copy your existing token)
    
5.  Copy the token — it is displayed only once
    

For service accounts, create the token via **Settings → Service Accounts** in your Snyk organization.

### Finding Your Group ID

1.  In the Snyk Web UI, navigate to your **Group Settings**
    
2.  The Group ID is displayed in the **General** section, or visible in the URL: `https://app.snyk.io/group/{groupID}/...`
    

## Setup

1.  In PGP, navigate to **Integrations** and locate **Snyk Code** under the **Secure Code Scanning** category.
    
2.  Click **Integrate**.
    
3.  Enter the following fields and click **Connect**.
    

Field

Required

Description

**Group ID**

Yes

Your Snyk Group ID. PGP discovers all organizations and SAST projects within this group.

**API Token**

Yes

A Snyk API token or service account token with access to the target organizations.

PGP validates credentials by making a test call to `GET /rest/groups/{groupID}/issues?type=code&limit=1`.

## What Data Is Synced

**Issues to PGP Risks**

*   SAST findings are imported as risks with CWE classifications, severity, file path, and line number
    
*   Each risk includes a definition with vulnerability description, remediation guidance, and CWE references
    
*   A proof file with source location details is attached for evidence and traceability
    
*   Issues marked as ignored or resolved are automatically excluded
    

**Projects to PGP Assets**

*   Each Snyk project's Git repository URL is imported as a repository asset
    
*   Repository URLs are resolved from the project origin (GitHub, GitLab, Bitbucket, Azure Repos)
    

## Snyk API Endpoints Used

Endpoint

Method

Purpose

`/rest/groups/{groupID}/issues`

GET

Validate credentials (test call)

`/rest/groups/{groupID}/orgs`

GET

Enumerate organizations in the group

`/rest/orgs/{orgID}/projects`

GET

Fetch SAST projects (filtered by type `sast`)

`/rest/orgs/{orgID}/issues`

GET

Retrieve code analysis issues per project

**Base URL**: `https://api.snyk.io/rest`

All requests are authenticated using an `Authorization: token {api_token}` header over HTTPS.

## Troubleshooting

Issue

Cause

Fix

Validation fails on connect

API token is invalid, expired, or lacks Group-level access

Generate a new token and ensure the account has Group Viewer permissions

No organizations found

Token does not have access to the specified Group

Verify the Group ID and ensure the service account is added to organizations within the group

No projects appearing

No SAST projects exist, or Snyk Code is not enabled

Enable Snyk Code in your organization settings and ensure repositories are imported

Missing issues

All issues are ignored or resolved

Check Snyk for active, non-ignored code issues

401/403 errors

Insufficient permissions

For service accounts: add as Org Collaborator. For user accounts: ensure Group Viewer role

## Security and Data Handling

*   **Read-only access** — PGP never creates, modifies, or deletes projects, issues, or configurations in Snyk
    
*   **Credential handling** — Your Snyk API token is stored as an encrypted credential within PGP and is never exposed in logs or the UI after initial entry
    
*   **Authentication** — Token-based authentication over HTTPS for every request
    
*   **No source code access** — Only issue metadata and project information are imported; no source code is accessed or stored
    

* * *

_Integration category: Secure Code Scanning. Data direction: Read-only (Snyk to PGP). Authentication: Token-based._

Need help? Contact our [support team](mailto:support@praetorian.com) for assistance.
