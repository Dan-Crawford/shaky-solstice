---
title: "PingID SSO Configuration"
description: "PingID SSO Configuration"
featurebaseId: "1063525"
---

## PGP Single Sign-On (SSO) with PingID

Praetorian Guard Platform (PGP) supports Single Sign-On through PingID integration. This guide will walk you through the setup process, which involves verifying your domain ownership, creating a PingOne OIDC application, and configuring the integration in PGP. You'll need three key pieces of information to complete the setup:

-   **Client ID**
    
-   **Client Secret**
    
-   **Issuer URL**
    

## Domain Verification

The first step is to verify ownership of your domain by adding a DNS TXT record. Access your domain's DNS settings or management interface where you'll need to add a TXT record. The record should follow the format `"chariot=<email>"`, where <email> is your primary PGP account email address. You can find your primary email on **Users** page.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580ec1a21178a432de4194/019b7ff9-9869-7a69-900e-f6334b074710/b64u-MDE5YjdmZjktOTgzZi03NjBjLWE1ZjItZmUwM2M5NjM1NmM4.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=4b02cc0ea047630007e0cfffef6fe8bc1c82f220debe88c138fe1331e1116371)

At your DNS management interface, set the text record for your root domain. For example, if your domain is YourDomain.com and your record is set at the root level (@), you would add a TXT record with the value `"chariot=YourPrimaryEmail@email.com"`. Within the PGP setup pop-up, you can copy and paste this value:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580ec1a21178a432de4194/019b7ff9-9948-7078-a3a5-1e0f5bb5df4f/b64u-MDE5YjdmZjktOTkxNy03ZWMzLWE3ODMtMzBhM2ZjNGExODNh.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=3bc108ac8b6d5d1d775b363af5040990516942759b72336f6a6cd95388e73b8d)

Once Set, your DNS TXT record might look something like this.

YourDomain.com

Record type:

value:

@

TXT

"chariot=YourPrimaryEmail@email.com"

To verify that your record has been published, you can run the command `dig +short TXT YourDomain.com` if on a Mac or `nslookup -type=TXT YourDomain.com` if using Windows, and look for your record in the output.

## Creating and Configuring the PingOne OIDC Application

### Steps

1.  Sign on to your PingOne for Enterprise tenant.
    
2.  Go to **Applications**.
    
3.  Click the blue icon next to Applications.
    
    ![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580ec1a21178a432de4194/019b7ff9-9a1e-7f3d-aefb-b014cba8167d/b64u-MDE5YjdmZjktOTljYy03MTExLWE5OWQtYjNhMzgzYWMxMDFm.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=ec8c89b47e1e6e8c58bf86bb4dcbaf1038b6e29f215652f248f6304f0866bc64)
4.  Type the **Application Name** and **Description**.
    
5.  Choose **OIDC Web App**.
    
6.  Click **Save**.
    
7.  Click the toggle at the top right to save and enable the Application.
    
8.  Copy the **Client ID,** **Client Secret**, and the **Issuer ID** URL for later use in PGP.
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580ec1a21178a432de4194/019b7ff9-9eb4-7de6-91f8-f51305b33a47/b64u-MDE5YjdmZjktOWU1YS03NmMyLWE1Y2ItMTI1ZTU0MzIxNmFi.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=8070a1df5e6674781db8248e81c0d72756503c56556ca81ecef4a5a011d32ab7)

## PGP Integration Configuration

To complete the integration, log into PGP with your existing credentials. Click **Settings** on the bottom left menu then the **Account Settings** tab. Look for the "Setup Single Sign-On" button.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580ec1a21178a432de4194/019b7ff9-9fc8-7b65-a1a5-792c67546ae4/b64u-MDE5YjdmZjktOWViOC03NTdhLWFlOGUtYmE3NDUzZjdkNjM3.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=d6366e4a3f512cfcf68c7d424ed47b71d329e5bb7c8a21361e7522b1ef171e57)

Provide the following information:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580ec1a21178a432de4194/019b7ff9-9cf9-7df1-a826-392e2e25f3fd/b64u-MDE5YjdmZjktOWNjNC03MTk1LTgyYjQtNTE3ZGE5NDZiN2My.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=efdc1dafabc8227abaf1933f48f851caa31934871235c504175bc5282eebf69a)

The domain field is your email domain (for example, "praetorian.com," if your email is "john.doe@praetorian.com"). The Client ID and the Client Secret are the values copied during the PingOne Application setup process. For the Issuer URL, use the formatted URL containing your tenant ID as described above.

## Managing Access Permissions

Access to your PGP account will be granted to users based on the access group specified in your PingID tenant.

Once the setup is complete, users can access PGP through the Sign in with SSO portal on the login page.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580ec1a21178a432de4194/019b7ff9-a3a1-7a06-88c9-0fca7095770a/b64u-MDE5YjdmZjktYTJmNC03MWUwLWIyOTYtNTU5ODA3ZGNkYjUz.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=ab7849d9a2136a44601cf507175f5e105d1eeb138901f99c8ef7986077e3dec5)

It's worth noting that while you can remove the DNS TXT record after completing the SSO setup, you'll need to temporarily reinstate it if you make any changes to the SSO configuration, such as rotating secrets.

Should you encounter any difficulties during this process or need assistance, don't hesitate to reach out to [support@praetorian.com](mailto:support@praetorian.com) for help. Our support team is ready to assist you in ensuring a smooth integration between PingID and PGP.
