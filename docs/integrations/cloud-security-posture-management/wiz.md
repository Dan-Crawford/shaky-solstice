---
title: "Wiz"
description: "Wiz"
featurebaseId: "33776864407707"
---

## Overview

The Wiz integration in PGP enables continuous monitoring of your cloud environment for internet-facing vulnerabilities. By connecting PGP to your Wiz instance, you can track open security findings, monitor asset status, and manage vulnerabilities detected across your infrastructure.

## Features

-   Real-time vulnerability monitoring for internet-exposed virtual machines
-   Detailed vulnerability information including CVSS scores, vendor severity, and remediation guidance
-   Asset tracking with cloud provider and subscription mapping
-   Continuous monitoring for new security findings
-   Automatic mapping of vulnerabilities to affected assets
-   Operating system and IP address tracking for virtual machines

## Prerequisites

Before configuring the Wiz integration, you will need:

-   A Wiz account with administrative access
-   Wiz Active Scanner license, which is a part of the Wiz Advanced License
-   Client ID and Client Secret for API access 
-   Your Wiz API endpoint URL

## Creating a Service Account in Wiz

### 1\. Access Service Account Settings

1.  Sign in to Wiz
2.  Navigate to Settings > Access Management > Service Accounts 

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695810b4a21178a432e234a7/019b8001-3b7a-751f-a1c1-f6a5f766feaf/b64u-MDE5YjgwMDEtM2I1Mi03YmZjLTk5YjQtYWJhZjYzYWRlYjk0.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=9feee79ec1b23ef9636b0aa0a8f7a2a0ef32a390e916867e7c752406fdd9170c)

### 2\. Create New Service Account

Click "Add Service Account" 

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695810b4a21178a432e234a7/019b8001-3b2d-744e-a948-3a72685548b5/b64u-MDE5YjgwMDEtM2IwNC03ZWQ0LThmYmQtMWY2ODVkNDI0MGEw.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=dfb4903aa347ad97677b9b0ca21a7cd4d2721d760fcdfadec7a4386502b38217)

### 3\. Configure Service Account

On the New Service Account page, configure the following:

-   Name
-   Select "Custom Integration (GraphQL)" 
-   Description (optional)
-   Projects (optional)
-   Expiration date (optional)
-   API Scopes
    -   Select "All - Read all entities \[read:all\]"
-   Click "Add Service Account"

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695810b4a21178a432e234a7/019b8001-3c1d-77ae-a3be-6182efe3b34c/b64u-MDE5YjgwMDEtM2JjYS03MjcyLTg2N2ItZTNjMzliMjUyOGNi.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=7ef889f12a1f31b119ee56319a22a0cad91246a827af0b6f7b7fef455ec5ce01)

### 4\. Save Credentials

After creation, you'll see your credentials with the message: "The following keys are your OAuth credentials. They will only be shown once, so copy them now and keep them safe!"

Make sure to copy and securely store both the Client ID and Client Secret.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695810b4a21178a432e234a7/019b8001-3ea7-75b0-8e0b-e14905181a8b/b64u-MDE5YjgwMDEtM2U1OS03MWY1LWE3ZTYtYWIwYWMwNzgzYzMy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=9473950bcd74b14aee312658bf665ae1e691c452ac865538837aa12b3a7d34e0)

## Configure PGP Integration

### 1\. Access Integrations

1.  Log in to PGP
2.  Navigate to Integrations

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695810b4a21178a432e234a7/019b8001-3e69-7e3b-9a40-8f2de1971623/b64u-MDE5YjgwMDEtM2U0MS03MTkwLTk2MGQtNGFlZWYzMDNkZTg1.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=8dbeeccbb6d78ede72f4830e30a5bf25d6891087f42caf1a6e86f912656e405d)

### 2\. Add Integration

1.  Click "Add Integration" 
2.  Under "Cloud Security Posture Management" find the Wiz integration
3.  Click Connect

### 3\. Configure Integration

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695810b4a21178a432e234a7/019b8001-3f27-7360-8ea4-abcf35891fd3/b64u-MDE5YjgwMDEtM2YwNS03MTFlLTlmYWMtM2NjMWY3NTNhOWZm.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=68cf00cdd18ca955edf42a6d0fe07cceedc438a67387841c2a7d119c6888a5ec)

#### To obtain the Wiz API URL

1.  Click your initials at the upper right corner of http://Wiz.io
2.  Select **Tenant Info**
3.  Under **Tenant Info** you can find your API Endpoint URL

Then configure the integration with:

1.  Add API endpoint URL from Tenant Info
2.  Add Client ID from Service Account
3.  Add Client Secret from Service Account

This completes the integration setup.

## Data Collection

Once configured, the Wiz integration will collect:

### Assets

-   Virtual machine details
-   Operating system information
-   IP addresses
-   Cloud provider metadata
-   Subscription information

### Vulnerabilities

-   CVE details
-   CVSS scores
-   Vendor severity ratings
-   Vulnerability descriptions
-   Remediation guidance
-   Affected versions
-   Fix versions
-   Related documentation links

Once configured, PGP will import data daily based on your selected import settings.

For assistance with integration setup or optimization, contact our support team at [support@praetorian.com](mailto:support@praetorian.com).
