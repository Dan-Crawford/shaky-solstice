---
title: "Cortex Xpanse"
description: "Cortex Xpanse"
featurebaseId: "6111016"
---

The Xpanse capability is a specialized security integration within PGP that discovers and monitors external assets using the Palo Alto Networks Xpanse API.

Xpanse integrates seamlessly with PGP's attack surface management platform, providing:

-   Asset discovery results that feed into vulnerability management workflows
-   Continuous monitoring capabilities for external assets
-   Integration with PGP's broader security assessment toolchain

## Key Features

Asset Discovery:

-   Discovers external IP address ranges and individual IPs
-   Identifies cloud-integrated assets across multiple cloud providers
-   Finds active external websites and web services

Integration Features:

-   Supports both standard and advanced API key authentication
-   Handles pagination for large datasets
-   Implements retry logic with exponential backoff

## Prerequisites

-   Active Cortex Xpanse account with administrative access (e.g., Investigation Admin role or equivalent).
-   Access to PGP instance.
-   Cortex Xpanse API credentials (API Key, Key ID, API Key Type, Instance URL).

Note: More information on the Xpanse API credentials can be found [here](https://docs-cortex.paloaltonetworks.com/r/Cortex-XPANSE/2/Cortex-Xpanse-Expander-User-Guide/Generate-an-API-Key).

## Setup Instructions

1.  **Generate API Key in Cortex Xpanse**
    -   Log in to your Cortex Xpanse portal.
    -   Navigate to **Settings > Configurations**.
    -   Expand the configuration panel and go to **Integrations > API Keys**.
    -   Click **\+ New Key**.
    -   Configure the key:
        -   Select an appropriate role (e.g., Investigation Admin for read access).
        -   Add a comment describing the key's purpose (e.g., "PGP Asset Attribution Integration").
    -   Click **Save**.
    -   Copy and securely save the API Key.
    -   In the API Keys table, note the Key ID for the new key.
    -   In the top-right corner, click **Copy URL** to get the instance URL.
2.  **Configure PGP Integration**
    -   Log in to PGP and navigate to **Integrations**.
    -   Click **Add Integration**.
    -   Find **Cortex Xpanse** (under Cyber Asset Attack Surface Management category) and click **Connect**.
    -   Enter the API Key, Key ID, API Key Type, and Instance URL.
    -   PGP validates the credentials and permissions.
    -   Once connected, asset available in Xpanse will be added to your PGP attack surface and scanned for vulnerabilities.
    -   For support, contact [support@praetorian.com](mailto:support@praetorian.com).

## Notes

-   The API key is used for read-only operations related to asset discovery and attribution, stored securely in PGP.
-   Ensure the key has sufficient scopes for asset querying; refer to [Cortex Xpanse API documentation](https://docs-cortex.paloaltonetworks.com/r/Cortex-Xpanse-REST-API/Cortex-Xpanse-REST-API) for details.
