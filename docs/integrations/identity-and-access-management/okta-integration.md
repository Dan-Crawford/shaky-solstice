---
title: "Okta Integration"
description: "Okta Integration"
featurebaseId: "40227495850779"
---

The Okta integration in Praetorian Guard Platform (PGP) connects with Okta to provide comprehensive visibility and risk management for Single Sign-On (SSO) applications, enabling automated detection of SSO coverage gaps and potential MFA exposures.

Note: This document describes the integration with Okta that allows PGP to discover and confirm logins that are protected by Okta. This is not documentation on setting up SSO with Okta.

## Key Features

*   Automated Asset Discovery: Fetches and inventories all Okta-managed applications, adding unknown assets to the attack surface.
    
*   Correlation and Flagging: Correlates PGP-discovered login portals with Okta apps, flags unmanaged or MFA-lacking portals as risks.
    
*   MFA Assurance: Analyzes Okta policies to identify applications lacking enforced MFA and surfaces status in the UI.
    
*   Real-time Updates: Performs scheduled and manual syncs to keep inventory up to date.
    
*   Filtering and Visibility: Allows filtering of Okta-derived assets and displays SSO coverage in the asset drawer.
    

## Prerequisites

*   Active Okta account with administrative access.
    
*   Okta API credentials (Client ID, Private Key, Okta URL).
    
*   Access to PGP instance.
    

## Setup Instructions

1.  **Create App Integration in Okta**
    
    *   Navigate to Okta Admin Console.
        
    *   Click **CREATE APP INTEGRATION**.
        
    *   Select **API Services** option and click **Next**.
        
    *   Provide application name (e.g., "PGP Security Integration") and click **Save**.
        
2.  **Configure Client Credentials**
    
    *   Click **Client Credentials** → **Edit**.
        
    *   Select **Public key / Private key**.
        
    *   Click **ADD KEY** in the **PUBLIC KEYS** section.
        
    *   Click **GENERATE NEW KEY** in the popup modal.
        
    *   After key generation: Select **PEM format**, click **Copy to clipboard**.
        
    *   Important: Save the PEM key securely (this will be needed for authentication).
        
    *   Click **Done**.
        
    *   Click **Save** in the Public Key section.
        
    *   Click **Save** again in the confirmation popup.
        
3.  **General Settings Configuration**
    
    *   Click **Edit** in **General Settings**.
        
    *   Uncheck "Require Demonstrating Proof of Possession (DPoP) header in token requests".
        
    *   Click **Save** in the section.
        
4.  **Grant API Scopes**
    
    *   Navigate to **Okta API Scopes** tab.
        
    *   Find **okta.apps.read** entry.
        
    *   Click **Grant** for this scope.
        
    *   Click **Grant Access** in the confirmation popup.
        
5.  **Assign Admin Role**
    
    *   Navigate to **Admin Roles** tab.
        
    *   Click **Edit Assignment**.
        
    *   Click the role dropdown.
        
    *   Search for and select **Read-only Administrator**.
        
    *   Click **Save Changes**.
        
6.  **Configure PGP Integration**
    
    *   Log in to PGP, navigate to **Integrations**, click **Add Integration**.
        
    *   Find **Okta** under **Single Sign-On**, click **Connect**.
        

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695810f3a21178a432e2b3d6/019b8002-353a-7aa2-964e-4a3bfe652171/b64u-MDE5YjgwMDItMzQwNy03MzdkLTlhZjAtOTJmODkxNWFmOGEx.png?X-Amz-Expires=3600&X-Amz-Date=20260330T080000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260330%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=3b0f8e0c78e855fc57c3ca4c8d17c6d774e68d75bcbe13aa2bb845850ae17e52)

*   Enter: Okta URL, Client ID, Private Key and click connect

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695810f3a21178a432e2b3d6/019b8002-35f7-7d99-a719-c95e3f018a10/b64u-MDE5YjgwMDItMzU5ZC03ZGI0LWI5M2MtOTRlODUwNzQzYjg1.png?X-Amz-Expires=3600&X-Amz-Date=20260330T080000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260330%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=474f019dbff2e0c12e08b6b623a8b48c14600cef781514c45a6f015112b6be69)

*   PGP validates credentials and permissions, then fetches and inventories Okta applications.
    
*   Integration supports scheduled syncs and displays health on the Integrations page.
    
*   For support, contact [support@praetorian.com](mailto:support@praetorian.com).
    

## Notes

*   The API token is used for read-only operations and stored securely.
    
*   Ensure the Okta app has the required scopes and roles for fetching application inventory and policies.
    

## References

[https://developer.okta.com/docs/guides/implement-oauth-for-okta-serviceapp/main/](https://developer.okta.com/docs/guides/implement-oauth-for-okta-serviceapp/main/)

[https://developer.okta.com/docs/guides/implement-oauth-for-okta/main/](https://developer.okta.com/docs/guides/implement-oauth-for-okta/main/)
