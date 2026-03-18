---
title: "Freshservice"
description: "Freshservice"
featurebaseId: "4449209"
---

The Freshservice integration in PGP enables organizations to connect their Freshservice instance for enhanced security visibility and asset management. By integrating Freshservice with PGP, you can synchronize asset data and maintain a comprehensive view of your security posture across your IT service management platform.

## Prerequisites

-   An active Freshservice account with administrative access
-   Your Freshservice account URL
-   An API key from your Freshservice account
-   Access to your PGP instance

## Obtaining Your Freshservice API Key

To integrate Freshservice with PGP, you'll need to obtain an API key from your Freshservice account. Follow these steps:

1.  **Log in to your Freshservice account**
    -   Navigate to your Freshservice instance and sign in with your credentials
2.  **Access Profile Settings**
    -   Click on your profile picture in the top-right corner of the screen
    -   From the dropdown menu, select "Profile settings"
3.  **Locate Your API Key**
    -   On the Profile Settings page, locate the "Your API Key" section
    -   You may need to complete a CAPTCHA verification to view the key
4.  **Copy the API Key**
    -   Copy the displayed API key to your clipboard
    -   Store it securely, as you'll need it for the PGP integration

**Important Notes:**

-   API key access might be controlled at the account level by an administrator. If you cannot find or enable the API key, your administrator might have disabled it globally or your plan might not support it.
-   The API key is unique to your user account and acts as a credential for integrating Freshservice with other applications.
-   Resetting your API key will revoke access for all applications using the old key, requiring you to update them with the new key.

## Configuring the Integration in PGP

1.  **Navigate to the Integrations Page**
    -   Log in to your PGP account
    -   Navigate to the **Integrations** page
2.  **Select Freshservice**
    -   Click **Add Integration** if needed
    -   Find **Freshservice** in the integrations list
    -   Click **Connect** to begin the setup process
3.  **Enter Your Credentials**
    -   Enter your Freshservice account URL in the provided field
    -   Paste your API key in the API key field
    -   Click **Connect** to establish the integration

Once configured, PGP will validate your credentials and establish the connection with your Freshservice instance. The integration will support scheduled syncs and display health status on the Integrations page.

## Notes

-   The API key is used for authentication and is stored securely in PGP
-   Ensure your Freshservice account has the necessary permissions for API access
    -   PGP needs Tickets and the Publish permissions to interact with ticketing
    -   PGP needs Inventory permissions for IT asset management data ingest
-   If you reset your API key in Freshservice, you'll need to update the integration in PGP with the new key
-   For support with the integration, contact PGP support at [support@praetorian.com](mailto:support@praetorian.com)
