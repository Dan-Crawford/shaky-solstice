---
title: "Microsoft Intune"
description: "Microsoft Intune"
featurebaseId: "1357935"
---

## Overview

The Microsoft Intune integration connects the Praetorian Guard Platform (PGP) with Microsoft Intune to import managed devices, compliance status, and device configurations from your Intune environment. By syncing your Intune device inventory, PGP provides visibility into the endpoints that are part of your organization's attack surface, including their compliance posture and management status.

Organizations managing thousands of endpoints through Microsoft Intune need to understand which devices are compliant with security policies and which may represent risk. This integration automatically discovers all managed devices in your Intune tenant, extracts device details such as operating system, compliance state, and last check-in time, and imports them as assets into PGP. This enables your security team to correlate endpoint data with vulnerability findings and other attack surface data.

This integration is included as part of the Azure credential configuration in PGP. It uses the Microsoft Graph API in a read-only capacity to enumerate managed devices and their properties.

## What the Integration Does

The Microsoft Intune integration queries the Microsoft Graph API's device management endpoints to retrieve all managed devices in your Intune tenant. For each device, it extracts identifying information such as device name, operating system, serial number, and network addresses, and imports them as assets into PGP. Compliance status and device configuration details are captured as metadata on each asset.

The integration leverages the same Azure credentials used for other Microsoft integrations (such as Entra ID). It authenticates via a Microsoft Graph API access token and queries the `deviceManagement/managedDevices` endpoint to enumerate your device fleet.

All operations are strictly read-only. PGP does not modify device configurations, compliance policies, or any other settings in your Intune environment.

## Prerequisites

Before setting up the Microsoft Intune integration, ensure you have:

* **A Microsoft 365 tenant** with Microsoft Intune licenses assigned
* **An Azure app registration** with the following Microsoft Graph API application permissions:
* `DeviceManagementManagedDevices.Read.All` -- Required to read managed device properties and compliance status
* **Admin consent** granted for the above permissions in your Azure tenant
* **Azure credential details**: Tenant ID, Client ID, and Client Secret from your app registration

### Creating the App Registration

* Sign in to the [Azure Portal](https://portal.azure.com) and navigate to **Microsoft Entra ID** > **App registrations**.
* Click **New registration**, provide a name (e.g., "Praetorian Guard Platform"), and register it.
* Under **Certificates & secrets**, create a new client secret. Copy the secret value immediately.
* Under **API permissions**, click **Add a permission** > **Microsoft Graph** > **Application permissions**.
* Search for and add `DeviceManagementManagedDevices.Read.All`.
* Click **Grant admin consent** for your organization.
* Note your **Tenant ID** and **Application (client) ID** from the app registration overview page.

## Setup

* In PGP, navigate to the **Integrations** page.
* Select **Azure** from the list of available integrations (Intune is included as part of the Azure integration).
* Enter your Azure credentials in the configuration form.
* Save the integration. PGP will validate connectivity to the Microsoft Graph API automatically, including access to the Intune device management endpoints.

### Field Reference

|  |  |  |
| --- | --- | --- |
| Field | Description | Required |
| Tenant ID | Your Azure AD tenant identifier | Yes |
| Client ID | The Application (client) ID from your app registration | Yes |
| Client Secret | The client secret value from your app registration | Yes |

## What Data Is Synced

### Managed Devices (Assets)

The integration discovers all devices managed by Microsoft Intune and imports them as assets in PGP.

|  |  |  |
| --- | --- | --- |
| Data Field | Source | Description |
| Device Name | `deviceName` | The name of the managed device |
| Operating System | `operatingSystem` | The OS running on the device (Windows, macOS, iOS, Android) |
| OS Version | `osVersion` | The specific OS version installed |
| Serial Number | `serialNumber` | The hardware serial number of the device |
| Compliance State | `complianceState` | Whether the device is compliant, noncompliant, or unknown |
| Last Sync | `lastSyncDateTime` | When the device last checked in with Intune |
| Enrollment Date | `enrolledDateTime` | When the device was enrolled in Intune |
| Management Agent | `managementAgent` | The management agent type (e.g., MDM, EAS) |
| Device Category | `deviceCategoryDisplayName` | The administrator-assigned device category |
| User Principal Name | `userPrincipalName` | The primary user associated with the device |

### Device Configuration (Metadata)

Additional device details are captured as metadata on each asset.

|  |  |  |
| --- | --- | --- |
| Data Field | Source | Description |
| Encryption Status | `isEncrypted` | Whether device storage is encrypted |
| Supervised | `isSupervised` | Whether the device is in supervised mode |
| Jail Broken | `jailBroken` | Whether the device has been jailbroken or rooted |
| WiFi MAC Address | `wiFiMacAddress` | The WiFi MAC address of the device |
| Total Storage | `totalStorageSpaceInBytes` | Total device storage capacity |
| Free Storage | `freeStorageSpaceInBytes` | Available storage on the device |

## API Endpoints Used

|  |  |  |
| --- | --- | --- |
| Endpoint | Method | Purpose |
| `https://graph.microsoft.com/v1.0/deviceManagement/managedDevices` | GET | List all managed devices and their properties |

The integration supports pagination via `@odata.nextLink` and uses `$top` query parameters to handle tenants with large device fleets. The integration has a 180-second timeout for the sync operation.

### Required API Permissions

|  |  |  |
| --- | --- | --- |
| Permission | Type | Purpose |
| `DeviceManagementManagedDevices.Read.All` | Application | Read managed device properties, compliance status, and configuration details |

## Troubleshooting

|  |  |  |
| --- | --- | --- |
| Issue | Cause | Fix |
| "Missing Microsoft Graph access token" | The Azure credential handler did not provide a valid Graph API token | Verify your Tenant ID, Client ID, and Client Secret are correct and that the app registration has not expired |
| "Microsoft Graph authentication failed: invalid token" (401) | The access token is invalid or expired | Regenerate the client secret in Azure and update the credential in PGP |
| "Microsoft Graph authorization failed: insufficient permissions" (403) | The app registration lacks Intune permissions or admin consent | Ensure `DeviceManagementManagedDevices.Read.All` is added and admin consent has been granted |
| No devices discovered | No devices are enrolled in Intune, or the tenant does not have Intune licenses | Verify that your tenant has active Intune licenses and that devices are enrolled |
| Integration times out | Very large tenant with thousands of managed devices | The integration has a 180-second timeout. Contact support if your tenant requires a longer window |
| Legacy Azure integration detected | The integration configuration uses an older format starting with `#account` | Reconfigure the Azure integration using the current setup process in PGP |

## Security and Data Handling

The Microsoft Intune integration operates in a strictly read-only mode. It queries the Microsoft Graph API to read managed device metadata and does not modify any device configurations, compliance policies, or enrollment settings.

Credentials are handled securely within PGP. The Azure client secret is encrypted at rest and used exclusively to obtain a short-lived Microsoft Graph API access token. The access token is used only for the duration of the sync operation and is not persisted.

PGP does not access or store application data, user files, or sensitive content on managed devices. Only device metadata (names, OS versions, compliance states, and hardware identifiers) is read and processed.
