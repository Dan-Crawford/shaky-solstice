---
title: "Azure SSO Configuration"
description: "Azure SSO Configuration"
featurebaseId: "27451961594139"
---

## PGP Single Sign-On (SSO) with Azure

The Praetorian Guard Platform (PGP) offers Single Sign-On integration with Azure to streamline user access management. This guide will walk you through the complete setup process, which requires configuring both your Azure environment and PGP. Before beginning the integration, you'll need to gather three essential pieces of information

-   **Client ID**
    
-   **Client Secret**
    
-   **Issuer URL**
    

## Domain Verification

The first step is to verify ownership of your domain by adding a DNS TXT record. Access your domain's DNS settings or management interface where you'll need to add a TXT record. The record should follow the format `"chariot=<email>"`, where <email> is your primary PGP account email address. The SSO setup pup up will show the correct value that needs to be added for the DNS record:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580eaba21178a432de11b3/019b7ff9-3a1b-7531-89bb-ef3467eb3c41/b64u-MDE5YjdmZjktMzljNy03NjcxLTgzM2QtZjg3ZGU0NDQwNjdm.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=b7d3b62079a7383326727d1437db073b0734ba3ad7477a05f6db45309784a660)

At your DNS management interface, set the text record for your root domain. For example, if your domain is YourDomain.com and your record is set at the root level (@), you would add a TXT record with the value `"chariot=YourPrimaryEmail@email.com"`. Within the PGP setup pop-up, you can copy and paste this value:

Once Set, your DNS TXT record might look something like this.

YourDomain.com

Record type:

value:

@

TXT

"chariot=YourPrimaryEmail@email.com"

To verify that your record has been published, you can run the command `dig +short TXT YourDomain.com` if on a Mac or `nslookup -type=TXT YourDomain.com` if using Windows, and look for your record in the output.

## Creating the Azure Application Registration

Start by visiting the [Azure Portal](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) and creating a new Single Tenant App Registration.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580eaba21178a432de11b3/019b7ff9-38a4-7a1f-a470-506cb51de23f/b64u-MDE5YjdmZjktMzgzZC03ODVjLTllM2YtNjJiNTY3ODMzNmM5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=1354676fe06161bb921d8308dbb784de2c578d77206e3c0094956ba0ec99a73d)

On the **App registrations** page, follow these steps:

1.  Supply the name of the application to Azure, such as "PGP SSO".
    
2.  Make and implement decisions on who will be able to access PGP SSO through Azure.
    
3.  Configure a "Web" Redirect URI with this URI:
    

```
https://praetorian-guard.auth.us-east-2.amazoncognito.com/oauth2/idpresponse
```

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580eaba21178a432de11b3/019b7ff9-4089-75c8-b14a-59d98e8960fd/b64u-MDE5YjdmZjktM2U0ZS03ZWE5LWE2MTctNTBhZGU1Y2QxMmVl.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=6a97b4660a961e1b5946025f51317cbf210a06145bb024e1cc3958b6b911841f)

Generate the Client Secret and Application ID

Navigate to the newly created application Overview. Note the **Application (client) ID** and **Directory (tenant) ID** on the overview page. Copy these. The **Application (client) ID** will be used as the **Client ID** and the **Directory (tenant) ID** will be used in the **Issuer URL** in the PGP application.

Click on **Certificates and Secrets** on the menu to the left.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580eaba21178a432de11b3/019b7ff9-412f-74d4-a35d-cf3c82814913/b64u-MDE5YjdmZjktM2U5ZS03MDFhLTg1ZWQtZDU5Y2VmOTZkYTIy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=332b4d59579c637676d6611da5ec23891b388c20039d6172cc9918117df7d966)

On the **Certificates and secrets** page, click to add a **New client secret**. Generate a new client secret, and copy the value. Once you create the **New client secret** this value will not be visible again.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580eaba21178a432de11b3/019b7ff9-4103-72b6-b7e1-f623838e05d5/b64u-MDE5YjdmZjktM2YzYi03NDFlLWI4MzAtODBmOWU4Y2IwYWFh.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=74852e9bf617feb02a2afdb75cf8c2757435c11cffeaa690f80f31a20c5f3209)

The newly generated **secret value** will show up in the table below **Description**. Again, remember to copy the **secret value** as you will need for PGP SSO Setup as the **Secret**. The Secret ID (separate from the Application (client) ID, above) should not be needed for the PGP - Azure integration.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580eaba21178a432de11b3/019b7ff9-46b0-7ea3-a633-a01fa91de307/b64u-MDE5YjdmZjktNDU4My03ZDQyLWIwOTAtNzI4NTFiZjJjMDdj.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=aa6cf6e9ee566de0f41f4bbf07b9049e90cbde71528088d3031c0eeaf8bac0e7)

Get the issuer URL

Your issuer URL will be:

```
https://login.microsoftonline.com/<tenant-id>/v2.0
```

...where <tenant-id> is the **Directory (tenant) ID** listed on the application overview page.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580eaba21178a432de11b3/019b7ff9-461a-70e6-b111-2254f4e18259/b64u-MDE5YjdmZjktNDU2NC03ZTAzLTkzNGItNDI3NGY4ZDU3Yzhj.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=2247ea7bc9a82cce7532e35f383c1a6b837471db7dd52d311782ea44847a6841)

## PGP Integration Configuration

To complete the integration, log into PGP with your existing credentials. Click **Settings** on the bottom left menu then the **Account Settings** tab. Look for the "Setup Single Sign-On" button.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580eaba21178a432de11b3/019b7ff9-4712-7709-8b24-1180e4f4369c/b64u-MDE5YjdmZjktNDU4MS03NmRiLThjOTAtZjg0MThiMjg4NTU5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=d04173ee526bed17cf42337296255963906ebda3f6c1c119d016d90ac3edec05)

Provide the following information:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580eaba21178a432de11b3/019b7ff9-4c0e-7a4f-82c3-d13fb701e8e7/b64u-MDE5YjdmZjktNGJhOC03OWQ1LThmYmYtMTEwYWFiMjMzMWYz.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=2e148c32b2f58f1d6f7ee99c4986307e51e195ad2735442f0bc0522b3a27312e)

The domain field should be your email domain (for example, "praetorian.com" if your email is "[john.doe@praetorian.com](mailto:john.doe@praetorian.com)"). The Client ID is your Azure Application (client) ID, and the Client Secret is the value you generated in the Certificates and Secrets section. For the Issuer URL, use the formatted URL containing your tenant ID as described above.

## Managing Access Permissions

Access to your PGP account will be granted to users based on the account group specified in your Azure tenant. For detailed information about configuring these access permissions, consult the [Azure Documentation](https://learn.microsoft.com/en-us/entra/identity-platform/howto-restrict-your-app-to-a-set-of-users).

Once the setup is complete, users can access PGP through the Sign in with SSO portal on the login page.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580eaba21178a432de11b3/019b7ff9-4cb4-73b6-b33d-91140b5646d8/b64u-MDE5YjdmZjktNGJmNC03MzcxLTk5MTEtMzdmOTM1MWY2MWRh.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c14577eb32461aeb2e1d9a1282862d06852e73b48e6991fd887dcaa929fdcbd8)

It's worth noting that while you can remove the DNS TXT record after completing the SSO setup, you'll need to temporarily reinstate it if you make any changes to the SSO configuration, such as rotating secrets.

Should you encounter any difficulties during this process or need assistance, don't hesitate to reach out to [support@praetorian.com](mailto:support@praetorian.com) for help. Our support team is ready to assist you in ensuring a smooth integration between Azure and PGP.
