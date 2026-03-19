## Overview

The Akamai WAF integration connects the Praetorian Guard Platform (PGP) with your Akamai Application Security (Kona Site Defender / App & API Protector) configuration, importing WAF security policies, rules, and configuration details into your attack surface. Understanding your WAF posture — which policies are active, what rules are enforced, and which applications are protected — is essential for identifying gaps in your defensive coverage.

This integration is ideal for organizations using Akamai's web application firewall who want centralized visibility into their WAF configuration alongside the rest of their security posture. PGP imports your security configurations as assets, allowing you to track WAF coverage across your attack surface and identify applications that may be unprotected or running outdated rule sets.

## What the Integration Does

When connected, PGP performs a **read-only** import from the Akamai Application Security API:

- **Security Configurations as Assets**: Each Akamai Application Security configuration is imported as a PGP asset. Configuration details — including the configuration name, ID, and associated hostnames — are captured, giving you a complete inventory of your WAF deployments.

- **Security Policies**: Policies within each configuration are tracked, including their protection settings and operational modes (alert vs. deny). This lets you verify that enforcement is active where it should be.

- **Protected Hostnames as Seeds**: Hostnames covered by your WAF configurations are imported as PGP seeds, ensuring that WAF-protected applications are included in your continuously monitored attack surface.

Data flows **one direction only** — from Akamai into PGP. The integration never writes back to Akamai, modifies security configurations, or changes WAF rules.

## Prerequisites

Before setting up the integration, you need Akamai EdgeGrid API credentials with Application Security API access:

1. Log in to [Akamai Control Center](https://control.akamai.com)

2. Navigate to **Identity & Access Management** under the account menu

3. Select the **API Users** tab

4. Click **Create API Client** (or select an existing user)

5. Under **API Client Details**, click **Create Credential**

6. Record the following values — they are only shown once:
   - **Client Token**
   - **Client Secret**
   - **Access Token**
   - **API Host** (e.g., `akab-xxxxx.luna.akamaiapis.net`)

7. Ensure the API client has **READ** access to the **Application Security** API (sometimes listed as **Kona Site Defender** or **App & API Protector**)

The API credentials must have read-only permissions to the Application Security API.

## Setup

1. Go to **Integrations, then Firewalls, then Akamai WAF** in the Guard Platform

2. Enter your EdgeGrid credentials in the setup form

3. Click **Connect** — PGP will validate your credentials by fetching your security configurations before saving

| Field | Description | Required |
| --- | --- | --- |
| **API Host** | Your Akamai EdgeGrid API hostname (e.g., `akab-xxxxx.luna.akamaiapis.net`). Do not include the `https://` protocol prefix. | Yes |
| **Client Token** | The client token from your EdgeGrid API credentials | Yes |
| **Client Secret** | The client secret from your EdgeGrid API credentials | Yes |
| **Access Token** | The access token from your EdgeGrid API credentials | Yes |

If validation fails, PGP will report the specific error. Common issues include an incorrect API host, expired credentials, or missing Application Security API permissions.

## What Data Is Synced

### Security Configurations

Each Akamai Application Security configuration creates an asset with:

- **Asset name**: Derived from the security configuration name
- **Asset type**: WAF configuration
- **Metadata**: Configuration ID, description, and associated contract/group information

### Security Policies

Policies within each configuration are tracked with:

- **Policy name and ID**: Identifying the specific security policy
- **Operational mode**: Whether the policy is in alert-only or deny (blocking) mode
- **Rule sets**: Which WAF rule sets and versions are active

### Protected Hostnames

Hostnames associated with each security configuration are imported as seeds:

| Akamai Element | PGP Seed/Asset Type |
| --- | --- |
| Protected hostname | Domain Seed |
| Vanity hostname | Domain Seed |

## API Endpoints Used

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/appsec/v1/configs` | GET | Fetch all Application Security configurations accessible with your credentials (also used for credential validation) |
| `/appsec/v1/configs/{configId}/versions/{version}/security-policies` | GET | Fetch security policies within a configuration |
| `/appsec/v1/configs/{configId}/versions/{version}/selected-hostnames` | GET | Fetch hostnames protected by a configuration |

**Base URL**: `https://{your-api-host}` (e.g., `https://akab-xxxxx.luna.akamaiapis.net`)

All requests are authenticated using Akamai EdgeGrid signing. The integration has a timeout of 180 seconds per sync operation.

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| Validation fails on connect | API credentials are incorrect or expired | Regenerate credentials in Akamai Control Center under Identity & Access Management |
| "missing Akamai API host" error | API Host field was left empty | Enter your Akamai EdgeGrid API hostname |
| "should not include protocol" error | API Host includes `https://` prefix | Remove the protocol prefix — enter only the hostname (e.g., `akab-xxxxx.luna.akamaiapis.net`) |
| "missing EdgeGrid client_token" error | Client Token field was left empty | Ensure all four credential fields are populated |
| Unexpected API response (non-200 status) | API client lacks Application Security read access | Edit the API client in Akamai Control Center and grant READ access to the Application Security API |
| No configurations appearing | No Application Security configurations exist for the account | Verify that Kona Site Defender or App & API Protector is provisioned on your Akamai contract |

## Security and Data Handling

- **Read-only access**: The integration only reads data from Akamai Application Security. It never creates, modifies, or deletes security configurations, policies, or rules.

- **Credential handling**: Your EdgeGrid credentials (Client Token, Client Secret, Access Token) are stored as encrypted credentials within PGP and are never exposed in logs or the UI after initial entry.

- **Authentication**: Credentials are used to sign requests via the Akamai EdgeGrid authentication protocol over HTTPS. Request body size is limited to 128KB per the EdgeGrid configuration.

- **Data filtering**: Imported assets and seeds pass through PGP standard filtering rules, allowing you to control which configurations and hostnames are included in your attack surface.
