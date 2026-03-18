---
title: "Burp Enterprise"
description: "Burp Enterprise"
featurebaseId: "8122787"
---

Integrating your existing Burp Enterprise installation with PGP allows you to leverage PGP's threat analysis capabilities alongside your web application security scanning. This integration automatically imports Burp Enterprise scan results into PGP, where our Managed Service team can analyze the findings, prioritize real threats, and provide actionable insights about their potential impact on your organization. By combining Burp Enterprise's comprehensive scanning with PGP's expert analysis, you get a clear understanding of which web application vulnerabilities pose the greatest risk to your business.

## Setting Up API Access in Burp Enterprise

Before configuring the integration in PGP, you'll need to create a dedicated API user in Burp Enterprise:

1.  Log into Burp Enterprise as an administrator
2.  Navigate to **Team > Add a new user**
3.  Configure the new user:
    -   Enter a descriptive name (e.g., "PGP Integration")
    -   Set a username that identifies the integration
    -   Provide an administrator email address
    -   Select **API Key** as the login type
4.  Click the save icon in the upper-right corner
5.  **Important**: When prompted, copy both the API key and URL - store these securely as they'll be needed for the PGP configuration. Note that the API key cannot be retrieved later; if lost, you'll need to generate a new one.

## Configuring the Integration in PGP

### Accessing the Integration Setup

1.  Open PGP's web interface
2.  Navigate to the Integrations page:
    -   Look for it in the left navigation menu
    -   It's located under the Administration section
3.  Click "Add Integration"
4.  Find the Burp Enterprise integration:
    -   Use the search function, or
    -   Browse the Vulnerability Management section

### Connection Setup

1.  Click "Connect" on the Burp Enterprise card
2.  In the configuration popup, enter:
    -   The Burp Enterprise URL you saved earlier
    -   The API token generated for your API user
3.  Save the configuration

## How It Works

After setup is complete, the integration works continuously in the background to keep your vulnerability data current. Using the secure API token you've provided, PGP connects to your Burp Enterprise instance and maintains an up-to-date view of all your security scans. For each target in your environment, PGP automatically retrieves the latest scan results, processing multiple findings simultaneously for optimal performance. As new scan data becomes available, it flows directly into PGP where our Managed Service team can analyze the results and identify which findings require your attention.

If you find a topic that you would like discussed in detail, or need further assistance, please let us know at [support@praetorian.com](mailto:support@praetorian.com)!
