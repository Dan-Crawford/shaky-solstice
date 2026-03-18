---
title: "BitBucket"
description: "BitBucket"
featurebaseId: "5056100"
---

## Connecting Bitbucket to PGP

This guide explains how to connect your Bitbucket organization to PGP, allowing you to monitor your repositories for security vulnerabilities and sensitive data exposure.

## Prerequisites

Before you begin, ensure you have:

-   Admin access to your Bitbucket organization
-   Permission to create OAuth consumers in Bitbucket
-   Access to your PGP account

## Manual Configuration with OAuth

To set up the integration, you can use OAuth:

_Note: Access Tokens require a BitBucket Premium account_

1.  Create an OAuth Consumer in Bitbucket:
    -   Go to Bitbucket **Settings** → **Workspace settings**
    -   Under **Security**, click **Access tokens**
    -   Click **Create access token**
    -   Fill in the following details:
        -   Name: PGP
        -   Permissions:
            -   Repository: Read
            -   Pull requests: Read
            -   Webhooks: Read and write
2.  After creating the access token, copy it to a safe place as you will not be able to access it again
3.  In PGP:
    -   Navigate to **Integrations**
    -   Find and click on "Bitbucket"
    -   Enter your access token
    -   Provide your Bitbucket organization URL (e.g., `https://bitbucket.org/your-organization`)
    -   Click "Connect"

## Verifying the Connection

To verify that your connection is working:

1.  Navigate to Assets in PGP
2.  Look for repositories from your Bitbucket organization
3.  Check the Integrations page to see your connected Bitbucket account

## Troubleshooting

Common issues and solutions:

-   **Unable to Connect**: Verify your OAuth token has the correct permissions
-   **No Repositories Showing**: Check that your organization URL is correct
-   **Authentication Errors**: Ensure your OAuth token is valid and hasn't expired

If you continue to experience issues, contact [PGP Support](mailto:support@praetorian.com).

## Multiple Organizations

You can connect multiple Bitbucket organizations to PGP. Simply repeat the connection process for each organization you want to monitor.

## Managing Your Connection

To manage your Bitbucket connection:

1.  Go to **Settings** → **Integrations**
2.  Find your Bitbucket connection
3.  Use the options menu (⋮) to:
    -   View connection details
    -   Update settings
    -   Remove the connection

## Additional Resources

-   [Bitbucket OAuth Documentation](https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/)
-   [About Bitbucket Workspace Management](https://support.atlassian.com/bitbucket-cloud/docs/create-and-manage-workspaces-in-bitbucket-cloud/)

Need help? Contact our [support team](mailto:support@praetorian.com) for assistance.
