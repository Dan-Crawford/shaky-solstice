---
title: "Entra ID"
description: "Entra ID"
featurebaseId: "9541366"
---

## Overview

The Entra ID integration connects the Praetorian Guard Platform (PGP) with Microsoft Entra ID (formerly Azure AD) to discover SSO-protected web applications across your organization. By ingesting service principals that have single sign-on configured, PGP automatically identifies externally accessible portals and applications that are part of your attack surface.

Many organizations have dozens or even hundreds of SSO-enabled applications registered in Entra ID, and maintaining visibility into these applications is critical for effective security management. This integration provides continuous discovery of these applications, extracting homepage URLs, login URLs, and reply URLs from each service principal and resolving them to their final destinations. The result is an up-to-date inventory of your SSO-protected web assets within PGP.

This integration is included as part of the Azure credential configuration in PGP. It uses the Microsoft Graph API in a read-only capacity to enumerate service principals and their associated URLs.

## What the Integration Does

The Entra ID integration queries the Microsoft Graph API to retrieve all service principals in your tenant that have a preferred single sign-on mode configured. For each qualifying service principal, it extracts URLs (homepage, login URL, and reply URLs), follows redirects to determine the final destination, and imports the resulting web applications as assets into PGP.

The integration filters out Microsoft internal domains (such as login.microsoftonline.com, portal.azure.com, graph.microsoft.com, and others) as well as localhost addresses to focus exclusively on your organization's custom applications. Only service principals with a `preferredSingleSignOnMode` value are processed, ensuring that only SSO-enabled applications are discovered.

All operations are strictly read-only. PGP does not modify, create, or delete any data in your Entra ID tenant.

## Prerequisites

Before setting up the Entra ID integration, ensure you have:

- **An Azure tenant** with Microsoft Entra ID (any tier)
- **An Azure app registration** with the following Microsoft Graph API application permissions:
- `Application.Read.All` -- Required to read service principals and their properties
- **Admin consent** granted for the above permissions in your Azure tenant
- **Azure credential details**: Tenant ID, Client ID, and Client Secret from your app registration

### Creating the App Registration

- Sign in to the [Azure Portal](https://portal.azure.com) and navigate to **Microsoft Entra ID** > **App registrations**.
- Click **New registration**, provide a name (e.g., "Praetorian Guard Platform"), and register it.
- Under **Certificates & secrets**, create a new client secret. Copy the secret value immediately.
- Under **API permissions**, click **Add a permission** > **Microsoft Graph** > **Application permissions**.
- Search for and add `Application.Read.All`.
- Click **Grant admin consent** for your organization.
- Note your **Tenant ID** and **Application (client) ID** from the app registration overview page.

## Setup

- In PGP, navigate to the **Integrations** page.
- Select **Azure** from the list of available integrations.
- Enter your Azure credentials in the configuration form.
- Save the integration. PGP will validate connectivity to the Microsoft Graph API automatically.

### Field Reference

| Field | Description | Required |
| --- | --- | --- |
| Tenant ID | Your Azure AD tenant identifier | Yes |
| Client ID | The Application (client) ID from your app registration | Yes |
| Client Secret | The client secret value from your app registration | Yes |

## What Data Is Synced

### SSO-Protected Web Applications (Assets)

The integration discovers web applications registered as service principals with SSO enabled. For each application, PGP extracts:

| Data Field | Source | Description |
| --- | --- | --- |
| Name | `displayName` | The display name of the service principal |
| URL | `homepage`, `loginUrl`, `replyUrls` | Resolved final destination URLs for the application |
| SSO ID | `id` | The Entra ID object identifier for the service principal |
| Original URL | Various URL fields | The original URL before redirect resolution |

URLs are resolved by following HTTP redirects to their final destination, ensuring PGP maps to the actual application endpoint rather than an intermediate redirect.

### Filtering Logic

The integration excludes:

- Service principals without a `preferredSingleSignOnMode` configured
- URLs pointing to Microsoft internal domains (e.g., microsoft.com, office.com, office365.com, live.com, outlook.com)
- Localhost addresses
- Azure AD management URLs (e.g., URLs containing `/applications/default.aspx` or `metadata=customappsso`)

## API Endpoints Used

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `https://graph.microsoft.com/v1.0/servicePrincipals` | GET | Retrieve all service principals with SSO configuration |

The integration uses OData query parameters (`$select`, `$top`) and supports pagination via `@odata.nextLink` to handle tenants with large numbers of service principals. A maximum of 999 results are requested per page.

### Required API Permissions

| Permission | Type | Purpose |
| --- | --- | --- |
| `Application.Read.All` | Application | Read service principal properties including SSO configuration and URLs |

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| "Missing Microsoft Graph access token" | The Azure credential handler did not provide a valid Graph API token | Verify your Tenant ID, Client ID, and Client Secret are correct and that the app registration has not expired |
| "Microsoft Graph authentication failed: invalid token" (401) | The access token is invalid or expired | Regenerate the client secret in Azure and update the credential in PGP |
| "Microsoft Graph authorization failed: insufficient permissions" (403) | The app registration lacks required permissions or admin consent | Ensure `Application.Read.All` is added and admin consent has been granted |
| No assets discovered | No service principals have SSO enabled, or all URLs resolve to Microsoft internal domains | Verify that your tenant has SSO-enabled enterprise applications by checking in Entra ID > Enterprise applications |
| Integration times out | Very large tenant with thousands of service principals | The integration has a 180-second timeout. Contact support if your tenant requires a longer window |

## Security and Data Handling

The Entra ID integration operates in a strictly read-only mode. It queries the Microsoft Graph API to read service principal metadata and does not modify any tenant configuration, user data, or application settings.

Credentials are handled securely within PGP. The Azure client secret is encrypted at rest and used exclusively to obtain a short-lived Microsoft Graph API access token. The access token is used only for the duration of the sync operation and is not persisted.

PGP does not access or store user credentials, passwords, authentication tokens, or any sensitive identity data from your Entra ID tenant. Only service principal metadata (display names, URLs, and SSO configuration) is read and processed.
