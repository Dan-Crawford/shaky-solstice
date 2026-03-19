## Overview

The SailPoint Identity Security Cloud integration connects the Praetorian Guard Platform (PGP) with SailPoint's identity governance and administration (IGA) platform, importing identity data, application inventory, access entitlements, and governance findings into your attack surface view. SailPoint Identity Security Cloud (formerly IdentityNow) provides centralized visibility into who has access to what across your organization, enabling identity lifecycle management, access certifications, and policy enforcement.

By connecting SailPoint to PGP, you bring identity context into your attack surface management workflow. PGP can identify over-privileged accounts, orphaned identities, and applications with excessive entitlements, then correlate those identity risks with your broader vulnerability and exposure data. This enables your security team to prioritize remediation not just by technical severity, but by the access and blast radius an attacker would gain through compromised identities.

This integration operates in a read-only capacity. PGP queries the SailPoint Identity Security Cloud API to retrieve identity and governance data but never modifies identities, access policies, certifications, or any other configuration in your SailPoint environment.

---

## What the Integration Does

When enabled, PGP connects to the SailPoint Identity Security Cloud V3 API and performs the following:

1. **Identity inventory** -- Retrieves the full list of identities (users) managed by SailPoint, including their status, lifecycle state, and identity attributes.
2. **Application discovery** -- Imports the catalog of applications (sources) governed by SailPoint, which become assets in PGP representing your organization's application attack surface.
3. **Entitlement mapping** -- Captures access entitlements and roles assigned to identities, providing visibility into who has privileged access to which applications.
4. **Governance findings** -- Imports access certification results, policy violations, and identity outliers that SailPoint has flagged, which become risks in PGP.

All data flows one direction: from SailPoint into PGP. Applications become PGP assets, identities and their entitlements become PGP attributes, and governance findings become PGP risks.

---

## Prerequisites

Before setting up the integration, ensure you have:

- An active **SailPoint Identity Security Cloud** tenant
- A **Personal Access Token (PAT)** or **OAuth 2.0 client credentials** with read access to identity and governance data
- **API access** enabled for your SailPoint tenant (available on all Identity Security Cloud tiers)

### Creating a Personal Access Token

1. Log in to your **SailPoint Identity Security Cloud** admin console
2. Click your username in the top-right corner and select **Preferences**
3. Navigate to **Personal Access Tokens**
4. Click **New Token**
5. Name the token (e.g., `PGP Integration`) and select the **scope**: `sp:scopes:all` (read) or a more restrictive scope based on your needs
6. Click **Create Token** and copy both the **Client ID** and **Client Secret**
7. Store both values securely -- the Client Secret will not be displayed again

### Creating an OAuth 2.0 Client (Alternative)

1. Log in to your SailPoint admin console
2. Navigate to **Global Settings > API Management > OAuth 2.0 Clients**
3. Click **Create Client**
4. Set the **Grant Type** to **Client Credentials**
5. Assign read-only scopes as needed
6. Copy the **Client ID** and **Client Secret**

---

## Setup

1. In PGP, go to **Integrations** and locate **SailPoint Identity Security Cloud** (under Identity Governance and Administration)
2. Enter the required credentials
3. Click **Connect** -- PGP will validate the credentials by querying the SailPoint API before saving

### Field Reference

| Field | Description | Example |
|-------|-------------|---------|
| **Tenant URL** | Your SailPoint Identity Security Cloud tenant URL | `https://yourorg.api.identitynow.com` |
| **Client ID** | The Client ID from your Personal Access Token or OAuth client | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| **Client Secret** | The Client Secret from your Personal Access Token or OAuth client | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

Once connected, PGP will begin syncing identity and governance data on its regular integration schedule.

---

## What Data Is Synced

### Applications (Sources) as Assets

Applications governed by SailPoint are imported into PGP as assets.

| SailPoint Field | PGP Field | Description |
|-----------------|-----------|-------------|
| `source.name` | Asset name | The application or source name (e.g., "Active Directory", "Salesforce") |
| `source.type` | Asset metadata | The source type (e.g., "Active Directory", "JDBC", "SCIM") |
| `source.connector` | Asset metadata | The connector type used to integrate the application |
| `source.authoritative` | Asset metadata | Whether this is an authoritative source of identity data |

### Identities as Attributes

Identities (users) managed by SailPoint are imported as attributes associated with their application assets.

| SailPoint Field | PGP Field | Description |
|-----------------|-----------|-------------|
| `identity.name` | Attribute value | The identity display name |
| `identity.status` | Attribute metadata | Active, inactive, or locked status |
| `identity.lifecycleState` | Attribute metadata | Current lifecycle state (e.g., active, terminated, pre-hire) |
| `identity.isManager` | Attribute metadata | Whether the identity has manager-level access |
| `identity.entitlements` | Attribute metadata | Access entitlements assigned to the identity |

### Governance Findings as Risks

SailPoint governance findings, policy violations, and certification failures are imported as PGP risks.

| SailPoint Field | PGP Field | Description |
|-----------------|-----------|-------------|
| Policy violation type | Risk ID | The type of governance violation (e.g., SoD conflict, excessive access) |
| Violation severity | Risk severity | Severity based on the policy and affected access level |
| Affected identity | Risk metadata | The identity involved in the violation |
| Affected entitlement | Risk metadata | The specific access entitlement that triggered the finding |
| Certification decision | Proof artifact | The access certification result (approved, revoked, flagged) |

---

## API Endpoints Used

PGP uses the SailPoint Identity Security Cloud V3 API. All requests use OAuth 2.0 client credentials for authentication and are read-only (GET).

| Purpose | Endpoint | Method | Notes |
|---------|----------|--------|-------|
| Authenticate | `POST /oauth/token` | POST | OAuth 2.0 client credentials grant to obtain access token |
| List identities | `GET /v3/identities` | GET | Paginated; retrieves all managed identities with attributes |
| List sources | `GET /v3/sources` | GET | Paginated; retrieves all governed applications/sources |
| List entitlements | `GET /v3/entitlements` | GET | Paginated; retrieves access entitlements across sources |
| List access profiles | `GET /v3/access-profiles` | GET | Retrieves access profile definitions |
| List certifications | `GET /v3/certifications` | GET | Retrieves access certification campaigns and their status |
| List policy violations | `GET /v3/policy-violations` | GET | Retrieves separation of duties and other policy violations |

All data retrieval requests include the `Authorization: Bearer {access_token}` header.

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| 401 Unauthorized | Invalid or expired Client ID/Secret | Generate a new Personal Access Token or OAuth client in SailPoint and update PGP |
| 403 Forbidden | Token lacks required scopes | Ensure the token or OAuth client has read access to identities, sources, and governance data |
| Connection timeout | Incorrect tenant URL | Verify the tenant URL matches your SailPoint environment (e.g., `https://yourorg.api.identitynow.com`) |
| No applications appearing | SailPoint has no configured sources | Add at least one source (application connector) in SailPoint before syncing |
| Missing identities | Identity aggregation has not completed | Ensure SailPoint has completed at least one identity aggregation from your authoritative source |
| No governance findings | No active certification campaigns or policies | Configure access certification campaigns or SoD policies in SailPoint to generate governance data |
| Rate limit errors (429) | Too many API requests | PGP will automatically retry with backoff; if persistent, contact your Praetorian team |
| Partial identity data | Some identity attributes are not populated | Verify that identity profiles and attribute mappings are configured correctly in SailPoint |

---

## Security and Data Handling

- **Read-only access** -- PGP only performs GET requests against the SailPoint API (with the exception of the OAuth token request). It never creates, modifies, or deletes identities, entitlements, policies, or certifications in your SailPoint environment.
- **Credential storage** -- Your SailPoint Client ID and Client Secret are encrypted at rest and never exposed in logs or API responses.
- **OAuth 2.0 authentication** -- PGP uses the client credentials grant flow to obtain short-lived access tokens. Tokens are refreshed automatically and are not stored long-term.
- **Data residency** -- Imported identity and governance data is stored within your PGP tenant and subject to your organization's data retention policies.
- **Minimal permissions** -- Only read-level API access is required. We recommend creating a dedicated Personal Access Token or OAuth client with the least privileges necessary for the PGP integration.
- **Sensitive data** -- Identity data may include user names, email addresses, and access entitlements. PGP stores this data with the same security controls applied to all data in your tenant and does not export it outside your PGP environment.
