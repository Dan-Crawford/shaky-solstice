---
title: "Cloudflare DNS"
description: "Cloudflare DNS"
featurebaseId: "4668770"
---

## Overview

Cloudflare is a leading provider of content delivery network (CDN) and DNS services, helping organizations manage and secure their domain infrastructure at scale. Integrating PGP with Cloudflare provides valuable visibility into your DNS infrastructure, enabling you to maintain a comprehensive inventory of your domains, subdomains, and associated IP addresses.

By connecting PGP to your Cloudflare account, you can automatically discover and catalog all DNS records across your Cloudflare zones. This integration ensures that your DNS-managed assets are continuously tracked and managed, providing a complete view of your external attack surface and improving asset management and security posture.

## How the Integration Works

**The Cloudflare integration automatically discovers all domains and zones in your Cloudflare account and maps DNS records to assets in PGP's inventory.** This happens without any manual configuration once the integration is active.

Once configured, the integration performs the following automated operations:

1.  **Automatic Zone Discovery**: The integration automatically discovers and enumerates **all accessible zones** (domains) in your Cloudflare account using the Cloudflare API
    
2.  **DNS Record Retrieval**: For each discovered zone, the integration automatically retrieves **all DNS records** using the Cloudflare API
    
3.  **Asset Mapping**: The integration processes and maps DNS records to assets in PGP:
    
    -   **A and AAAA records**: Automatically creates asset entries for each IP address, mapping them to their corresponding domains
        
    -   **CNAME records**: Automatically creates asset relationships linking canonical names to their aliases
        

All discovered zones, DNS records, and their relationships are automatically synchronized into PGP's asset inventory system, where they become part of your comprehensive attack surface view. No manual export or import is required—the integration handles everything automatically.

## Integration Process

### Setting Up the Cloudflare API Token

1.  Begin by accessing your Cloudflare dashboard at [https://dash.cloudflare.com/](https://dash.cloudflare.com/)
    
2.  Once logged in, navigate to **My Profile** by clicking on your profile icon in the top right corner
    
3.  In the left sidebar, select **API Tokens**
    
4.  Click the **Create Token** button
    
5.  You can either:
    
    -   Use the **Edit zone DNS** template and modify it, or
        
    -   Click **Create Custom Token** to build a token with specific permissions
        

### Configure API Token Permissions

For security best practices, you'll want to configure the API token with minimal necessary permissions. The integration only requires read-only DNS-related permissions to function properly.

### Required Permissions

When creating a custom token, configure the following permissions:

**Zone Permissions:**

-   **Zone** → **Read** — Required to list all zones in your account
    

**Zone DNS Permissions:**

-   **Zone DNS** → **Read** — Required to read DNS records from zones
    

### Account Resources

1.  In the **Account Resources** section, select **Include** → **All accounts** (or specify the specific account if you have multiple)
    
2.  In the **Zone Resources** section, select **Include** → **All zones** (or specify specific zones if you want to limit access)
    

### Additional Configuration

-   **IP Address Filtering**: Leave empty unless your organization requires specific IP restrictions
    
-   **TTL**: Set an appropriate expiration time for the token based on your security policies
    

After configuring these settings, click **Continue to summary** and then **Create Token**. **Make sure to copy the API token immediately**, as you won't be able to access it again after leaving the page. Store it securely, as you'll need it for the next step.

### Configuring PGP

1.  With your Cloudflare API token ready, return to your PGP dashboard
    
2.  Navigate to the **Integrations** page and click the **Add Integration** button in the top right corner
    
3.  Look for the **Cloudflare** integration option in the list. You can find it by:
    
    -   Using the search bar to search for "Cloudflare", or
        
    -   Navigating to the **Managed DNS Providers** category
        
    -   Note that the Cloudflare WAF integration is a separate integration
        
4.  Click **Connect** on the Cloudflare integration
    
5.  A configuration window will appear with a single input field for the API token
    
6.  Paste your previously copied Cloudflare API token into this field
    
7.  Click **Save** or **Connect** to complete the integration
    

PGP will automatically validate the API token and verify that it has the required permissions. If validation succeeds, the integration will be active and ready to use.

## Value and Benefits

Integrating Cloudflare DNS with PGP provides several key benefits:

-   **Comprehensive DNS Visibility**: Automatically discover and catalog all DNS records across your Cloudflare-managed zones, ensuring no assets are missed
    
-   **Continuous Asset Discovery**: Keep your asset inventory up-to-date as DNS records are added, modified, or removed in Cloudflare
    
-   **Attack Surface Management**: Build a complete picture of your external attack surface by combining DNS data with other asset discovery sources
    
-   **Reduced Manual Effort**: Eliminate the need to manually export and import DNS records, saving time and reducing the risk of human error
    
-   **Centralized Asset Management**: Consolidate DNS-managed assets with assets from other sources in a single, unified inventory
    

## Support

If you find a topic that you would like discussed in detail, or need further assistance, please let us know at [support@praetorian.com](mailto:support@praetorian.com)!
