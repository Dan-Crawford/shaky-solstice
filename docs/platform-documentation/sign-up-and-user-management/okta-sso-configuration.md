---
title: "Okta SSO Configuration"
description: "Okta SSO Configuration"
featurebaseId: "2029962"
---

## Praetorian Guard Platform Single Sign-On (SSO) with Okta

Praetorian Guard Platform (PGP) supports Single Sign-On through Okta integration. This guide will walk you through the setup process, which involves verifying your domain ownership, creating an Okta application, and configuring the integration in PGP. You'll need three key pieces of information to complete the setup: 

-   **Client ID**
    
-   **Client Secret**
    
-   **Issuer URL**
    

## Domain Verification

The first step is to verify ownership of your domain by adding a DNS TXT record. Access your domain's DNS settings or management interface where you'll need to add a TXT record. The record should follow the format `"chariot=<email>"`, where <email> is your primary PGP account email address. The SSO setup pup up will show the correct value that needs to be added for the DNS record:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580e90a21178a432dde2af/019b7ff8-dd7b-711f-b8e9-5c8acac979c2/b64u-MDE5YjdmZjgtZGQ0NC03ZDQzLWJiNzQtYzQxMDUwMDhkY2Fk.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=0f8c311ffed9de0f3ce2fa4dae290ff9b687c57f88cdbe3e6e8e58e53d38145c)

At your DNS  management interface, set the text record for your root domain. For example, if your domain is YourDomain.com and your record is set at the root level (@), you would add a TXT record with the value `"chariot=YourPrimaryEmail@email.com"`. Within the PGP setup pop-up, you can copy and paste this value:

Once Set, your DNS TXT record might look something like this. 

YourDomain.com

Record type:

value:

@

TXT

"chariot=YourPrimaryEmail@email.com"

To verify that your record has been published, you can run the command `dig +short TXT YourDomain.com` if on a Mac or `nslookup -type=TXT YourDomain.com` if using Windows, and look for your record in the output.

## Creating and Configuring the Okta Application

Begin by logging into your Okta admin dashboard at login.okta.com. Navigate to the Applications section and create a new app integration. When configuring the application, select "OIDC - OpenID Connect" as your sign-in method and "Web Application" as your application type.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580e90a21178a432dde2af/019b7ff8-ddf4-7841-9034-192e0c25eea3/b64u-MDE5YjdmZjgtZGRjYS03ZmQ1LWFhYjctMmM1MmJkZjcwMWEx.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=e821b53f2d19530c65cb7da59101ddcc01c158d8da00a7fafef3d07d27eee15f)

Click **Next** at the bottom.

Name your application "PGP" and configure the redirect URIs. The sign-in redirect URI should be set to `https://praetorian-guard.auth.us-east-2.amazoncognito.com/oauth2/idpresponse`, and the sign-out redirect URI should be `https://guard.praetorian.com/login`. Remember to configure access for any users who will need to access PGP via SSO - this can be done under **Assignments**.

## Optional Okta Tile Configuration

You may want to configure the PGP Okta tile for easier access. In your application's General Settings, configure the login settings to allow initiation from either Okta or the app, enable the application icon display for users, and set the login flow to redirect to the app. Set the initiate login URI to `https://guard.praetorian.com/login`.

Here's the step-by-step:

1\. Under **General** > **General Settings** click the **Edit** link.

2\. Under **General** > **Login** update the following settings:

-   Login initiated by - Either Okta or App.
    
-   Application visibility - ensure that “Display application icon to users” is enabled.
    
-   Login flow - choose “Redirect to app to initiate login (OIDC Compliant)”.
    
-   Initiate login URI - set to “https://guard.praetorian.com/login”.
    

7\. Hit “Save” to confirm your configuration changes.

## Integrating with PGP

To complete the integration, log in to PGP using your existing credentials at https://guard.praetorian.com/login. Click **Settings** on the bottom left menu then the **Account Settings** tab. From there, you can begin the SSO setup process.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580e90a21178a432dde2af/019b7ff8-e301-7964-8164-b38fb0687841/b64u-MDE5YjdmZjgtZTFlMi03OWEyLWFlYzItZDlmNWFmYjFmZDkx.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=5f0d92c422bc9ca4c8ebc90a4891d0c8df539f80e2f4d61be07f33cce2fd146a)

You'll need to provide several pieces of information: your email domain (such as "praetorian.com"), the Client ID and Client Secret (found in your Okta application's Client Credentials section), and your Issuer URL (your Okta login base URL, like "https://companyname.okta.com"). You can find the Client ID and Client Secret here:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580e90a21178a432dde2af/019b7ff8-e1e6-7ff3-953d-78c909b488e7/b64u-MDE5YjdmZjgtZTE5OS03ZmNlLTk3ODItOWFlMTc0Yzg0OGRk.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=84f3935200ae718c59df8977d430b6523aed7712866edcb81eeac5695efaf147)

Fill out the pop-up with the appropriate information:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580e90a21178a432dde2af/019b7ff8-e2cd-719b-9ca4-a432bfeb4f8e/b64u-MDE5YjdmZjgtZTIxNS03OWMzLTg2Y2QtZjJmMTc1YjA3Mjcx.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=e5baad95b0d8d1d967f5f7664491ee87b5459366abf1014a946a97e87ca43161)

Once you have filled in all of the fields, hit **Save**. Your users should now be able to log in to PGP using Okta as their identity provider.

## Post-Setup Information

Once the setup is complete, users can access PGP through the Sign in with SSO portal on the login page.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580e90a21178a432dde2af/019b7ff8-e5e6-7426-acc9-f2dfe4d13c75/b64u-MDE5YjdmZjgtZTU0Zi03YTBhLWE2MDAtMDc3M2Q5NDc1YjZl.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=fb5b39b5df3002859886295f0604ee3eb499fed51667a0b68b7ba70980907c6d)

It's worth noting that you can remove the DNS TXT record after completing the SSO setup. However, if you need to make any changes to the SSO configuration, such as rotating secrets, you'll need to temporarily re-add the TXT record during the configuration process.

If you encounter any difficulties during setup or need assistance with SSO, reach out to [support@praetorian.com](mailto:support@praetorian.com) for help.

By following these steps, you'll establish a secure and convenient SSO connection between your Okta instance and PGP, allowing for streamlined access management and improved user experience.
