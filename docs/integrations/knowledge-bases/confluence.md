---
title: "Confluence"
description: "Confluence"
featurebaseId: "0685851"
---

## The Confluence Integration in PGP

The Confluence integration in PGP provides continuous scanning of your organization's Confluence spaces and pages to detect exposed secrets such as API keys, tokens, passwords, and other sensitive information. PGP connects to your Confluence Cloud instance using an API token and automatically discovers all spaces, scanning their content for security risks. On subsequent scans, PGP performs incremental checks — only re-scanning spaces with recently modified content.

## Prerequisites

Before you begin, ensure you have:

*   A Confluence Cloud instance
*   An Atlassian account with access to the target Confluence spaces
*   Access to your PGP account

## Creating an API Token in Atlassian

1.  Sign in to your Atlassian account and go to the [API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens) page
2.  Click **Create API token**
3.  Give the token a descriptive name (e.g., "PGP Integration") and click **Create**
4.  Copy the token immediately — it will not be shown again

> **Note:** The Confluence integration does **not** support fine-grained API tokens at this time. You must use a classic API token generated from the Atlassian account security page.

## Configuring the Integration in PGP

1.  In PGP, navigate to the **Integrations** page
2.  Find and click on **Confluence** under the "Knowledge Bases" section
3.  Provide the following details:
    *   **Confluence URL** — Your Confluence Cloud tenant URL (e.g., `https://your-org.atlassian.net`)
    *   **User Email** — The email address of the Atlassian account that owns the API token
    *   **Access Token** — The API token you created
4.  Click **Connect** to establish the integration

Once configured, PGP will discover all accessible Confluence spaces and scan their pages for exposed secrets. Subsequent scans automatically detect modified content and only re-scan spaces with changes.

## Verifying the Connection

To verify that your connection is working:

1.  Navigate to **Assets** in PGP
2.  Look for assets prefixed with `confluence:space:` corresponding to your Confluence spaces
3.  Check the **Integrations** page to confirm the Confluence connection status

## Troubleshooting

Common issues and solutions:

*   **Unable to Connect** — Verify that your Confluence URL is correct and includes the full tenant URL (e.g., `https://your-org.atlassian.net`)
*   **Authentication Errors** — Ensure the API token is valid and the user email matches the account that generated the token
*   **No Spaces Discovered** — Confirm the Atlassian account has read access to the target Confluence spaces
*   **Fine-Grained Token Errors** — The integration does not support fine-grained tokens. Use a classic API token instead

If you continue to experience issues, contact [PGP Support](mailto:support@praetorian.com).

## Managing Your Connection

To manage your Confluence connection:

1.  Go to **Settings** → **Integrations**
2.  Find your Confluence connection
3.  Use the options menu (⋮) to:
    *   View connection details
    *   Update settings
    *   Remove the connection

## Additional Resources

*   [Atlassian API Token Documentation](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/)
*   [Confluence Cloud REST API](https://developer.atlassian.com/cloud/confluence/rest/)

Need help? Contact our [support team](mailto:support@praetorian.com) for assistance.
