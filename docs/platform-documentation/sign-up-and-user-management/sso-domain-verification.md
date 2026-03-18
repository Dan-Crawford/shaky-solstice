---
title: "SSO Domain Verification"
description: "SSO Domain Verification"
featurebaseId: "33698362366875"
---

## Domain Verification

The first step is to verify ownership of your domain by adding a DNS TXT record. Access your domain's DNS settings or management interface where you'll need to add a TXT record. The record should follow the format `"chariot=<email>"`, where <email> is your primary PGP account email address. The SSO setup pup up will show the correct value that needs to be added for the DNS record:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580e75a21178a432ddacd0/019b7ff8-79a7-7bc5-81e1-4568b341bb93/b64u-MDE5YjdmZjgtNzk2ZS03ZjU4LTk4ZTMtNTRhN2IyMTkwYWQ3.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=b72e977d6eb0d2ea8e10af33cf2d76fae9a947f4509fddc491fd3130512d08c7)

At your DNS management interface, set the text record for your root domain. For example, if your domain is YourDomain.com and your record is set at the root level (@), you would add a TXT record with the value `"chariot=<email>"`. Within the PGP setup pop-up, you can copy and paste this value:

Once Set, your DNS TXT record might look something like this.

YourDomain.com

Record type:

value:

@

TXT

"chariot=YourPrimaryEmail@email.com"

To verify that your record has been published, you can run the command `dig +short TXT YourDomain.com` if on a Mac or `nslookup -type=TXT YourDomain.com` if using Windows, and look for your record in the output.

## Conclusion

Once you've added and verified the TXT record, you can proceed with configuring SSO for your organization. Note that DNS changes may take up to 48 hours to propagate across all DNS servers, though they typically take effect within a few hours. If you encounter any issues during the verification process, ensure that the TXT record is properly formatted and that you're using your primary PGP email address. For additional assistance, contact our support team.

The following articles discus Okta and Azure SSO in more detail.If you encounter any difficulties during setup or need assistance with SSO, reach out to [support@praetorian.com](mailto:support@praetorian.com) for help.
