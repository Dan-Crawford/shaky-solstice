---
title: "Getting Started with the Praetorian CLI"
description: "Getting Started with the Praetorian CLI"
featurebaseId: "5280351"
---

The Praetorian CLI provides command-line access to the Guard platform. The public GitHub repo can be found at [here](https://github.com/praetorian-inc/praetorian-cli). Pre-built packages are officially hosted at [PyPI](https://pypi.org/project/praetorian-cli/). The most up to date information can always be found on the [README](https://github.com/praetorian-inc/praetorian-cli?tab=readme-ov-file#readme) page.

Before you can use the Praetorian CLI with your Guard account, you will need to sign up through the UI. Once you have access, you can generate API credentials to connect via the CLI. Follow along for more instructions.

## Installation

Before you install the CLI, ensure you have **Python 3.9** or higher and **pip 23.0** or higher. Once you have the pre-requisites, head to your command-line interface and type:

```
pip install praetorian-cli
```

If you have previously installed the CLI, use the following to upgrade to the latest version:

```
pip install --upgrade praetorian-cli
```

To confirm that the installation was successful, you can type `guard --version` into the command line. If the installation was successful you will see the current version displayed.

## Authentication to Guard

Depending on your use cases and security requirements, you can use one of the following two methods to provide the login credentials to the CLI:

### Step 1: Generate an API Key

1.  Log in to the [Guard UI](https://guard.praetorian.com)
    
2.  Click the Praetorian icon in the top right corner
    
3.  Select **User Profile → API Keys**
    
4.  Click **Add New Token**
    
5.  Provide a descriptive name for your key
    
6.  Copy both the **API Key ID** and **API Key Secret** (the secret is only shown once)
    

### Step 2: Configure the CLI

Depending on your use cases and security requirements, you can use one of the following two methods to provide credentials to the CLI:

#### Using the keychain file

This method stores credentials in a keychain file. To create the keychain file, run this command:

```
guard configure
```

When you run the command, you will be prompted with the following:

```
Enter your API Key ID: your-api-key-id-here
Enter your API Key secret: [hidden]
Enter the profile name to configure [United States]:
Enter the URL of backend API [https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/chariot]:
Enter the client ID [795dnnr45so7m17cppta0b295o]:
Enter the assume-role account, if any []:
```

1.  The **API Key ID** and **API Key Secret** are the credentials you generated in the Guard UI.
    
2.  The **profile name** can be customized, but most users should press `Enter` and proceed with the default.
    
3.  The **URL of the backend API** and the **client ID** should remain as the defaults. Users should press `Enter` at these steps.
    
4.  The **assume-role account**: if someone else has invited you to their organization within the Guard UI, you will add their account email address here.
    

After entering all the appropriate values, the Praetorian CLI will read your keychain file from `~/.praetorian/keychain.ini`. The keychain.ini file should read something like this when you are done:

```
[United States]
name = chariot
client_id = 795dnnr45so7m17cppta0b295o
api = https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/chariot
api_key_id = your-api-key-id-here
api_key_secret = your-api-key-secret-here
```

You can add multiple profiles to your **keychain** file, which takes a similar form to AWS CLI configuration files. For example:

```
[United States]
name = chariot
client_id = 795dnnr45so7m17cppta0b295o
api = https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/chariot
api_key_id = your-api-key-id-here
api_key_secret = your-api-key-secret-here

[profile2]
...

[profile3]
...
```

### Using environment variables

This method uses in-memory environment variables to pass credentials to the CLI. There is no need for a keychain file on disk. This enables the users to choose a credential storage method suitable to their use cases. To use this method, set the following environment variables:

```
export PRAETORIAN_CLI_API_KEY_ID=your-api-key-id-here
export PRAETORIAN_CLI_API_KEY_SECRET=your-api-key-secret-here
```

## Authentication in organizations that use SSO

SSO-enabled organizations should provision CLI access through API Keys. Create API keys for users or service accounts that need CLI access, and configure them using the methods described above.

To assume into an organization's main account, use the `--account` option in the CLI or provide the username of the account when running `guard configure`:

```
[United States]
name = chariot
client_id = 795dnnr45so7m17cppta0b295o
api = https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/chariot
api_key_id = your-api-key-id-here
api_key_secret = your-api-key-secret-here
account = security.team@acme.com
```

We hope that this information has been helpful. The most up-to-date information will always be on the [GitHub README](https://github.com/praetorian-inc/praetorian-cli).

If you find a topic that you would like discussed in detail, or need further assistance, please let us know at [support@praetorian.com](mailto:support@praetorian.com)!
