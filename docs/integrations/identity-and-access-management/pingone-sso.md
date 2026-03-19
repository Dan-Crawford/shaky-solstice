## Overview

The PingOne SSO integration connects the Praetorian Guard Platform (PGP) with Ping Identity's PingOne cloud identity platform. This integration discovers and inventories all applications configured in your PingOne environment, extracting login portals and SSO-protected URLs to add them as assets to your attack surface. This provides visibility into the web applications your organization exposes through single sign-on.

PingOne is a cloud-based identity-as-a-service (IDaaS) platform that provides single sign-on, multi-factor authentication, and directory services. By integrating PingOne with PGP, organizations gain automated discovery of all SSO-protected applications and their associated login URLs, redirect URIs, and target endpoints. These discovered URLs are tracked as assets, enabling PGP to monitor and assess the security posture of your SSO-protected application portfolio.

The integration operates in a read-only capacity, retrieving application configuration data from PingOne without modifying any applications, users, policies, or identity configurations within your PingOne environment.

## What the Integration Does

The PingOne SSO integration performs the following operations during each sync cycle:

1. **Authenticates via OAuth 2.0** — Uses the client credentials grant flow to obtain an access token from PingOne with the `p1:read:env:applications` scope.
2. **Fetches all applications** — Paginates through the PingOne applications API to retrieve every application configured in the specified environment.
3. **Extracts URLs** — For each enabled application, extracts all relevant URLs including login page URLs, initiate login URIs, default target URLs, and redirect URIs.
4. **Filters URLs** — Excludes localhost URLs, non-HTTP/HTTPS schemes, and PingOne's own domain URLs to focus on externally accessible application endpoints.
5. **Resolves final URLs** — Follows redirects to determine the final destination URL for each discovered endpoint.
6. **Creates asset records** — Generates asset and SSO webpage records in PGP for each discovered URL, including the application name, ID, and original provider URL.

All operations are strictly read-only. PGP does not create, modify, or delete any applications, users, or configurations in PingOne.

## Prerequisites

Before configuring the PingOne SSO integration, ensure you have:

- **PingOne account** with an active environment
- **Worker application** configured in PingOne with OAuth 2.0 client credentials
- **Environment ID** for the PingOne environment to scan
- **Client ID and Client Secret** from the worker application

### Creating a PingOne Worker Application

1. Log in to the PingOne admin console.
2. Navigate to **Applications** > **Applications**.
3. Click **+** to add a new application.
4. Enter a name (e.g., "PGP Integration") and select **Worker** as the application type.
5. Click **Save**.
6. On the application details page, note the **Client ID**.
7. Navigate to the **Configuration** tab and copy the **Client Secret**.
8. Enable the application by toggling the switch to **On**.

### Finding Your Environment ID

1. In the PingOne admin console, navigate to **Settings** > **Environment** > **Properties**.
2. Copy the **Environment ID** displayed on the properties page.

### Selecting Your Regional URL

PingOne operates across multiple regions. Select the regional URL that matches your PingOne deployment:

| Region | Regional URL |
|--------|-------------|
| North America | `https://api.pingone.com` |
| Canada | `https://api.pingone.ca` |
| Europe | `https://api.pingone.eu` |
| Australia | `https://api.pingone.com.au` |
| Singapore | `https://api.pingone.sg` |
| Asia Pacific | `https://api.pingone.asia` |

## Setup

To configure the PingOne SSO integration in PGP:

1. Navigate to the **Integrations** page in PGP.
2. Locate **PingOne SSO** and click **Connect**.
3. Enter the required credentials in the configuration form.
4. Click **Save** to activate the integration.

### Configuration Fields

| Field | Description | Example |
|-------|-------------|---------|
| **Client ID** | The OAuth 2.0 client ID from your PingOne worker application | `abcd1234-5678-efgh-ijkl-mnop9012qrst` |
| **Client Secret** | The OAuth 2.0 client secret paired with the client ID | `secret_value_abcdef123456...` |
| **Environment ID** | The PingOne environment ID to scan for applications | `env-1234-5678-abcd-efgh-ijklmnop` |
| **Regional URL** (optional) | The PingOne regional API URL; defaults to `https://api.pingone.com` if not specified | `https://api.pingone.eu` |

## What Data Is Synced

### Assets

PGP creates asset records for URLs discovered in PingOne application configurations. Only enabled applications are processed, and only externally accessible URLs are imported.

| PingOne Application Field | PGP Representation | Description |
|--------------------------|-------------------|-------------|
| `loginPageUrl` | Asset (URL) | The login page URL configured for the application |
| `initiateLoginUri` | Asset (URL) | The URL used to initiate the login flow |
| `defaultTargetUrl` | Asset (URL) | The default target URL after successful authentication |
| `redirectUris` | Asset (URL) | OAuth 2.0 redirect URIs configured for the application |

### SSO Metadata

Each discovered asset includes additional SSO context:

| Field | Description |
|-------|-------------|
| Application ID | The PingOne application identifier |
| Application Name | The display name of the application in PingOne |
| Original Provider URL | The raw URL as configured in PingOne before redirect resolution |
| Last Seen | Timestamp of the most recent discovery |

### URL Filtering Rules

The integration applies the following filters to avoid importing irrelevant URLs:

| Filter | Behavior |
|--------|----------|
| Localhost URLs | Excluded (e.g., `http://localhost:3000/callback`) |
| Non-HTTP schemes | Excluded (e.g., `myapp://callback`) |
| PingOne domain URLs | Excluded (URLs pointing to `pingone.com` itself) |
| Empty hostnames | Excluded |
| Disabled applications | Excluded entirely |

## API Endpoints Used

The integration uses the PingOne Management API. Authentication uses OAuth 2.0 client credentials flow with the `p1:read:env:applications` scope.

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `https://auth.pingone.{tld}/{environmentId}/as/token` | Obtains an OAuth 2.0 access token via client credentials grant |
| GET | `/v1/environments/{environmentId}/applications?limit=100` | Retrieves paginated list of all applications in the environment |

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Authentication failed: invalid credentials | Incorrect Client ID or Client Secret | Verify the Client ID and Client Secret match the worker application in PingOne |
| Authorization failed: insufficient permissions | Worker application lacks the `p1:read:env:applications` scope | Ensure the worker application has the required scope assigned in PingOne |
| Invalid regional URL | Regional URL does not match a valid PingOne region | Use one of the supported regional URLs (see table above). The URL must start with `api.pingone.` |
| Missing environment_id error | Environment ID field is empty | Enter the Environment ID from your PingOne environment properties |
| No assets imported | All applications are disabled or have no externally accessible URLs | Verify that enabled applications in PingOne have login page URLs, redirect URIs, or target URLs configured |
| Rate limited (429) | Too many API requests in a short period | The integration handles rate limiting automatically by respecting the `Retry-After` header. Re-run if needed |
| Request timeout (120s) | Large number of applications or slow API response | The integration has a 120-second timeout. For environments with many applications, contact support if timeouts persist |
| Missing URLs for an application | Application URLs point to localhost or PingOne domains | The integration filters out localhost and PingOne-internal URLs. Only externally accessible URLs are imported |

## Security and Data Handling

- **Read-only access** — The integration only reads application configuration data from PingOne. It does not create, modify, or delete any applications, users, groups, policies, or identity configurations.
- **Minimal scope** — The integration requests only the `p1:read:env:applications` OAuth scope, which is the minimum permission required to list applications.
- **Credential storage** — The Client ID, Client Secret, and Environment ID are stored encrypted within PGP and are never exposed in logs or the user interface after initial configuration.
- **Token management** — OAuth 2.0 access tokens are obtained on demand and automatically refreshed before expiration. Tokens are held in memory only and are not persisted.
- **Data transfer** — All communication between PGP and PingOne occurs over HTTPS using TLS encryption.
- **URL resolution** — The integration follows HTTP redirects to determine final destination URLs. Only the final resolved URL and the original provider URL are stored; intermediate redirect URLs are not retained.
