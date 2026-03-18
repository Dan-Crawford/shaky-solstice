---
title: "NS1 Connect"
description: "NS1 Connect"
featurebaseId: "0672656"
---

NS1 is a leading provider of managed DNS services, helping organizations manage and optimize their domain infrastructure at scale. Integrating PGP with NS1 provides valuable visibility into your DNS infrastructure, enabling you to maintain a comprehensive inventory of your domains, subdomains, and associated IP addresses.

## Integration Process

### Setting Up the NS1 API Key

Begin by accessing your NS1 dashboard at [https://my.nsone.net/](https://my.nsone.net/). Once logged in, navigate to the "Users & Teams" section in the top navigation bar.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695810dda21178a432e28450/019b8001-db55-7b1e-99dd-1c1bf740c718/b64u-MDE5YjgwMDEtZGIzYy03YThjLWJkN2QtZDBiMjI5ZGNiYjJk.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=20b55d67115cd7a6a9717e7845c54e343adb88b086d6f56be09cbc93b978de18)

Look for the "API Keys" option on the top banner.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695810dda21178a432e28450/019b8001-da06-709c-8b4d-3f5fd70a949f/b64u-MDE5YjgwMDEtZDlmZC03MGZhLThmZDgtOTZjZmUzM2MzYmQ2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=ae1f71e13fa17621a973bb8089851d3b95316785e7a22716abae742a6674ee98)

Click "Add Key" to create a new API key.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695810dda21178a432e28450/019b8001-db7f-7195-b59f-315fed4c6ad0/b64u-MDE5YjgwMDEtZGI0Mi03ZTBjLTljYzAtM2E5OGZlODU0Yjhi.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=67df2fc2618cbbb7744d6018179511e5488672d8ce7e30641c4c411d492d17fe)

In the configuration screen, enter "PGP" as the application name. This helps identify the integration's purpose within your NS1 account.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695810dda21178a432e28450/019b8001-dd79-775a-8e9a-a1fb4071150e/b64u-MDE5YjgwMDEtZGQzNi03YjNhLTk5NDYtNzQ5MTY0ZDU4YTNj.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=4429a3b4dcb4984f6cad116066b6c30b33c1fecb3c42c71d36afa3f83139b2b7)

For security best practices, you'll want to configure the API key with minimal necessary permissions. The integration only requires DNS-related permissions to function properly. Here's how to set up the permissions:

1.  **Under the Access to DNS resources** section, locate and enable:
    -   View zones
    -   Allow by default
2.  Disable all other permissions, including:
    -   Account admin permissions
    -   Monitoring permissions
    -   Data permissions
    -   Security permissions
    -   Redirect permissions

In the "Access to DNS Resources" section, you'll see options for managing zone access. The "Allow by default" setting grants access to all zones and records except those explicitly denied. You can optionally configure denied zones if you wish to restrict access to specific zones.

The IP allow list can remain empty unless your organization requires specific IP restrictions.

After configuring these settings, click "Save" to generate the API key. Make sure to copy the API key immediately, as you won't be able to access it again after leaving the page.

### Configuring PGP

With your NS1 API key ready, return to your PGP dashboard. Navigate to the Integrations page and click the "Add Integration" button in the top right corner.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695810dda21178a432e28450/019b8001-df19-73ae-b210-c4ab7eec5709/b64u-MDE5YjgwMDEtZGVlNS03YWZhLTg3OTgtOGUyMjg1NTNlMDZl.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=5d59a93ecf2c2fbaf15e21f6116a5309faabeec129c0f491a45f97cc4209075d)

Look for the NS1 integration option in the list and click "Connect."

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695810dda21178a432e28450/019b8001-df82-782c-b765-5ebd1c94e6f3/b64u-MDE5YjgwMDEtZGY1MC03YWQ1LTkxMTYtOTBkODIwYjE2OGVj.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=a83b38b5620621b98bd123fd1bd3e0e8b057950718c63969cad98c25a21bc5ec)

A window will appear with a single input field for the API key. Paste your previously copied NS1 API key into this field and submit the form.

## How the Integration Works

Once configured, the integration will automatically begin pulling DNS information from your NS1 account. The integration specifically looks for:

-   A and AAAA records, collecting IP addresses
-   CNAME records, normalizing the domain names

The integration uses NS1's API to list all accessible zones and their associated records. This information is then processed and streamed into PGP's asset inventory system.

If you find a topic that you would like discussed in detail, or need further assistance, please let us know at [support@praetorian.com](mailto:support@praetorian.com!)!
