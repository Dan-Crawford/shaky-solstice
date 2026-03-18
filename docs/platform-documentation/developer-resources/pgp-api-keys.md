---
title: "PGP API Keys"
description: "PGP API Keys"
featurebaseId: "0721949"
---

## Creating API Keys in PGP

API keys provide secure, token-based access to PGP without exposing your password. This guide covers how to create API keys in the PGP UI, configure them with the Praetorian CLI, and set them up as environment variables for automated workflows.

## Generating API Keys in the PGP UI

To create API keys for use with the Praetorian CLI and SDK, follow these steps:

1.  Log into your PGP account through the web interface at https://PGP.praetorian.com
2.  Navigate to **Settings** in the left sidebar menu
3.  Click on **User Settings** to access your personal account settings
4.  Select the **API Keys** section from the user settings menu
5.  Click the **"Add New Token"** button to create a new API key
6.  Provide a descriptive name for your API key (e.g., "CLI Access", "Automation Scripts", "Development")
7.  Click **"Generate"** to create the API key pair
8.  **Important:** Copy both the **API Key ID** and **API Key Secret** immediately. The secret is only displayed once and cannot be retrieved later.

Store your API credentials securely. If you lose the API Key Secret, you will need to delete the existing key and create a new one.

## Configuring API Keys with Praetorian CLI Keychain

The Praetorian CLI provides a secure keychain system for storing your API credentials. This method stores your API keys in a local configuration file for convenient access.

### Running the Configure Command

To set up your API keys with the CLI keychain, run the following command:

praetorian configure

The configure command will prompt you for the following information:

Enter your API Key ID: your-api-key-id-here Enter your API Key secret: \[hidden\] Enter the profile name to configure \[United States\]: Enter the URL of backend API \[https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/PGP\]: Enter the client ID \[795dnnr45so7m17cppta0b295o\]: Enter the assume-role account, if any \[\]:

### Understanding the Configuration Prompts

1.  **API Key ID:** Enter the API Key ID you copied from the PGP UI
2.  **API Key Secret:** Enter the API Key Secret you copied from the PGP UI (input will be hidden)
3.  **Profile name:** Press `Enter` to use the default "United States" profile, or provide a custom name if managing multiple configurations
4.  **Backend API URL:** Press `Enter` to use the default URL
5.  **Client ID:** Press `Enter` to use the default client ID
6.  **Assume-role account:** This is where you need to enter your organization's PGP email address

### Important: Organization PGP Email Format

**Special Note:** When prompted for the "assume-role account," you must enter your organization's PGP email address in the following format:

**PGP+<customer>@praetorian.com**

For example, if your organization is "acme", the email would be:

PGP+acme@praetorian.com

This email format is essential for proper account access and role assumption within your organization's PGP environment. Without the correct email format, you may not be able to access your organization's assets and data through the CLI.

### Keychain File Location and Format

After successful configuration, the CLI creates a keychain file at `~/.praetorian/keychain.ini`. The file will contain your configuration in the following format:

\[United States\] name = PGP client\_id = 795dnnr45so7m17cppta0b295o api = https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/PGP api\_key\_id = your-api-key-id-here api\_key\_secret = your-api-key-secret-here account = PGP+customer@praetorian.com

### Managing Multiple Profiles

You can configure multiple profiles in your keychain file for different environments or organizations. Each profile is defined in its own section:

\[United States\] name = PGP client\_id = 795dnnr45so7m17cppta0b295o api = https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/PGP api\_key\_id = your-api-key-id-here api\_key\_secret = your-api-key-secret-here account = PGP+customer1@praetorian.com \[Development\] name = PGP client\_id = 795dnnr45so7m17cppta0b295o api = https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/PGP api\_key\_id = your-dev-api-key-id api\_key\_secret = your-dev-api-key-secret account = PGP+customer1-dev@praetorian.com

## Using Environment Variables for API Keys

For automated workflows, CI/CD pipelines, or containerized environments, you can configure API keys using environment variables instead of the keychain file. This method provides greater flexibility for credential management in different deployment scenarios.

### Setting Environment Variables

Set the following environment variables with your API key credentials:

export PRAETORIAN\_CLI\_API\_KEY\_ID=your-api-key-id-here export PRAETORIAN\_CLI\_API\_KEY\_SECRET=your-api-key-secret-here

### Environment Variable Precedence

**Important:** Environment variables take precedence over keychain file settings. If both are configured, the CLI will use the environment variables and ignore the keychain file credentials.

### Making Environment Variables Persistent

To make environment variables persistent across terminal sessions, add them to your shell profile file:

#### For Bash users:

echo 'export PRAETORIAN\_CLI\_API\_KEY\_ID=your-api-key-id-here' ~/.bashrc echo 'export PRAETORIAN\_CLI\_API\_KEY\_SECRET=your-api-key-secret-here' ~/.bashrc source ~/.bashrc

#### For Zsh users:

echo 'export PRAETORIAN\_CLI\_API\_KEY\_ID=your-api-key-id-here' ~/.zshrc echo 'export PRAETORIAN\_CLI\_API\_KEY\_SECRET=your-api-key-secret-here' ~/.zshrc source ~/.zshrc

### Using Environment Variables with Docker

When running the Praetorian CLI in Docker containers, pass the environment variables using the `-e` flag:

docker run -e PRAETORIAN\_CLI\_API\_KEY\_ID=your-api-key-id-here \\ -e PRAETORIAN\_CLI\_API\_KEY\_SECRET=your-api-key-secret-here \\ your-container-image praetorian PGP list assets

## Verifying Your Configuration

After configuring your API keys using either method, verify that the setup is working correctly by running a simple CLI command:

praetorian PGP list assets

If your configuration is correct, this command will return a list of assets in your PGP account. If you encounter authentication errors, double-check your API key credentials and organization email format.

## Security Best Practices

When working with API keys, follow these security best practices:

-   **Store API keys securely:** Never commit API keys to version control or share them in plain text communications
-   **Use descriptive names:** Give your API keys meaningful names to track their usage and purpose
-   **Rotate keys regularly:** Periodically generate new API keys and delete old ones to maintain security
-   **Limit key scope:** Create separate API keys for different use cases (development, production, automation)
-   **Monitor key usage:** Regularly review API key activity in your PGP account settings
-   **Revoke compromised keys:** Immediately delete any API keys that may have been compromised

## Troubleshooting Common Issues

### Authentication Errors

If you receive authentication errors when using the CLI:

1.  Verify that your API Key ID and Secret are correct
2.  Check that your organization's PGP email is in the correct format: `PGP+<customer>@praetorian.com`
3.  Ensure your API key hasn't been deleted or expired in the PGP UI
4.  Confirm that environment variables aren't overriding your keychain configuration

### Permission Errors

If you can authenticate but receive permission errors:

1.  Verify that your user account has the necessary permissions in PGP
2.  Check that the assume-role account email is correct for your organization
3.  Contact your PGP administrator to verify your account permissions

### Keychain File Issues

If the CLI cannot read your keychain file:

1.  Verify the file exists at `~/.praetorian/keychain.ini`
2.  Check file permissions to ensure it's readable by your user account
3.  Validate the file format matches the expected INI structure
4.  Re-run `praetorian configure` to recreate the keychain file

## Additional Resources

For more information about using the Praetorian CLI and API keys:

-   Praetorian CLI GitHub Repository
-   Praetorian Documentation

If you encounter any issues or need additional assistance, please contact our support team at support@praetorian.com.
