---
title: "Digital Ocean Integration"
description: "Digital Ocean Integration"
featurebaseId: "4326874"
---

### DigitalOcean Integration

DigitalOcean integration allows PGP to continuously monitor your DigitalOcean infrastructure for potential vulnerabilities and security risks. To enable this integration, you'll need to create a Personal Access Token (PAT) in DigitalOcean.

### Creating a DigitalOcean Personal Access Token

1.  Log in to the [DigitalOcean Control Panel](https://cloud.digitalocean.com/)
2.  Navigate to **API** in the left menu to access the Applications & API page
3.  In the **Personal access tokens** section, click **Generate New Token**
4.  Configure your token:
    -   Enter a descriptive **Token name** (e.g., "PGP Integration")
    -   Select an appropriate **Expiration** period
    -   Under **Scopes**, select "Read Only" access as PGP only requires read permissions
5.  Click **Generate Token**
6.  **Important**: Copy and securely store the token immediately, as it will only be shown once

### Adding DigitalOcean Integration to PGP

1.  In PGP, go to **Integrations > Add Integration**
2.  Find the DigitalOcean card and click "Configure"
3.  Enter your DigitalOcean Personal Access Token
4.  Click "Connect" to complete the integration

### What Gets Scanned

Once configured, PGP will automatically discover and monitor:

-   Droplets
-   Load Balancers
-   Databases
-   Kubernetes Clusters
-   Apps
-   DNS Records
-   Floating IPs

### Integration Maintenance

-   Monitor your token's expiration date and renew before it expires
-   If you need to rotate the token, generate a new one in DigitalOcean and update it in PGP
-   You can delete the integration at any time through the PGP settings
