---
title: "GitHub"
description: "GitHub"
featurebaseId: "5777363"
---

PGP provides comprehensive security scanning for GitHub repositories, helping organizations identify potential security risks like exposed secrets and misconfigurations. While PGP can scan any public repository without additional setup, you'll need to configure an integration to scan private repositories within your organization. In this page, we show how to integrate with GitHub using a Personal Access Token (PAT) or by installing a Github Application.

## How the GitHub Integration Works

When you integrate with GitHub, PGP provides comprehensive security scanning capabilities powered by multiple advanced tools. All findings are triaged by expert security engineers who validate true positives, determine real-world impact, and identify when findings can be combined to lead to actual compromise.

PGP monitors repositories for public exposure changes, flagging newly created public repositories and private repositories that were recently made public within the last 24 hours.

For secrets detection, PGP uses Nosey Parker to scan repository history for exposed secrets including API keys, tokens, passwords, AWS credentials, database credentials, and other sensitive information patterns.

For GitHub Actions security, PGP leverages Gato and Gato-X to detect security risks such as self-hosted runner workflows, privilege escalation vulnerabilities (PwnRequest risks), injection vulnerabilities, and workflow misconfigurations. These tools can analyze cross-repository workflows and reusable actions, identifying issues that other scanners may miss. This helps prevent attackers from running malicious code in build pipelines, stealing credentials, or compromising self-hosted build machines.

## Setup Instructions

### GitHub PAT

To integrate GitHub with PGP, you'll need to create a Personal Access Token (PAT) with the appropriate permissions. Start by visiting GitHub's Personal Access Tokens page and generating a new token.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958110fa21178a432e2ecfd/019b8002-9a0f-71bd-a4b4-ee0da09b8aaf/b64u-MDE5YjgwMDItOTlhYy03MWJkLWExZGEtNmFlYmFjNWQzMzQ5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=ac6c91e8ff556405326ce2b261a2bb389b1bca5011f3c2e0aae460f17965d869)

Give the PAT a descriptive name and set an appropriate expiration period. Make sure to authorize the token for your target organization.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958110fa21178a432e2ecfd/019b8002-99c5-7b93-8a7c-5cee891d43eb/b64u-MDE5YjgwMDItOTk2Ny03MmYzLTk3ZWYtNDkzNWIzMzQzYTBl.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c2e7fb5b61af1706c4aef0e6bb12e44109fa9a5a769018fa8cb2e087b41273d2)

Choose the repository access for the token:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958110fa21178a432e2ecfd/019b8002-9900-7744-a65b-6f16540c5662/b64u-MDE5YjgwMDItOThjMy03ZTFiLWE0YzktYzAyYmQ2ZjYwY2Rk.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c371dfd27c02fe1d41689fd6a985db42acf3ca4b3e02681530cc86c3c8f17184)

Under **Repository Permissions**, grant "Contents: Read-only" access to allow PGP to scan repository contents.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958110fa21178a432e2ecfd/019b8002-9d6b-76b8-8c36-54dcc88f74dc/b64u-MDE5YjgwMDItOWQyNS03NWU1LTk3NjctZjQ3MDQ0OGFmZDY2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=98f4c7dc10619517e553568bd192c5a78a7a80a45cccddba12c9d91196673350)

Click **Generate token** at the bottom of the page. Copy the token to your clipboard and navigate back to PGP.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958110fa21178a432e2ecfd/019b8002-9d4f-776a-8ae8-473910163349/b64u-MDE5YjgwMDItOWMzYi03ZDhiLTk5ODYtNTRiZGFmYTVjMDhk.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=95c5e823b531bee399642c18a30e207d9d93f85a01505f0068087ba30702cf47)

### Configuring the Integration in PGP

Navigate to the Integrations page and select **GitHub** from the "Source Code Managers" section.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958110fa21178a432e2ecfd/019b8002-9db3-7ee7-beae-53460dae3b88/b64u-MDE5YjgwMDItOWM3Mi03MGM4LWJhZTItYmFkNmZlNThlYWM3.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=427531e1470a3a41686b7b39341649068d958cb52f4f65c47755a4aa3f841167)

Enter your GitHub organization's URL and paste your PAT in the provided fields, then click **Connect** to establish the integration.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958110fa21178a432e2ecfd/019b8002-a13a-781a-8709-82986fa91955/b64u-MDE5YjgwMDItYTEwNy03MWU5LWFiMGMtYjQ0YTJlZDc2MjI3.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=677d8013c02fa0d55cddf897cde240c7f9d0155508cbe2ebfd6b2c58b888ebd9)

Once integrated, PGP will scan your repositories for security risks, monitor for public exposure changes, and provide expert triage of all findings.

### Setting Up GitHub App Authentication in PGP

GitHub App authentication provides a more secure and granular way to integrate PGP with your GitHub organization compared to using Personal Access Tokens (PATs). This integration allows PGP to scan your repositories for security risks while maintaining proper access controls.

### Prerequisites

-   A GitHub organization account
-   Admin access to your GitHub organization
-   A PGP account

#### Setup Steps

Access PGP Integrations

-   Log into your PGP account
-   Navigate to the Integrations page
-   Select "GitHub" from the "Source Code Managers" section

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958110fa21178a432e2ecfd/019b8002-9fcc-7ded-9ea9-b72b8b000c9d/b64u-MDE5YjgwMDItOWViYi03YzMzLTkzZTItODI1NDk2ZWQ4NTg4.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=b12d20a5648d9c79d3f7730901ab2e42366cd3d9a96ad81ee9c58e7ee7d4e58d)

Initiate GitHub App Installation

-   Click the "Connect" button
-   In the popup dialog, select the "Install GitHub App" option
-   You'll be redirected to GitHub's App installation page

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958110fa21178a432e2ecfd/019b8002-9ff5-7e95-bcef-70c850f52f38/b64u-MDE5YjgwMDItOWZjNS03NzIxLTk3ZmItMjBiNTBhMzQzZDQ2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c95e334f225ae51f04e92c13654c979386cb599ce0decc97f372dfea909afd2f)

Configure GitHub App Access

-   Select your target organization from the list

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958110fa21178a432e2ecfd/019b8002-a450-721e-9d80-1fc42650777b/b64u-MDE5YjgwMDItYTQyYi03YzIxLWJlZjAtMjlhZjMxOTU4NzIy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=941070be81db8250ce8d1ff5af4b9b0e7f3cf0ed467c5e3ab48f1fe914ebce84)

Choose repository access level

-   All repositories
-   Only select repositories
-   Click "Authorize & Request"

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958110fa21178a432e2ecfd/019b8002-a4f3-7d38-bc29-7b6a187e082c/b64u-MDE5YjgwMDItYTRiNi03YjViLTk5MzQtYTVkNDIyNjI4YThi.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=1c67af644278b857a37596a4b78fa1052ab6f81558ba96802333fd3efa966e64)

Verify Integration

-   Verify the installation in your organization's GitHub Apps settings:
    -   Go to Settings → Applications
-   Return to PGP
    -   The integration status should show as successful in the integrations table
    -   You can manage the app's access permissions anytime through your organization's GitHub settings

#### Required Permissions

The GitHub App requires the following permissions:

1.  Administration (Read)
    -   Allows PGP to read repository settings and configuration
    -   Used for security scanning and misconfiguration detection
2.  Code (Read)
    -   Enables scanning of repository contents
    -   Required for secret detection and code analysis
3.  Commit Statuses (Read)
    -   Allows monitoring of commit statuses
    -   Used for tracking security scan results
4.  Deployments (Read)
    -   Enables monitoring of deployment activities
    -   Used for CI/CD misconfiguration scanning
5.  Metadata (Read)
    -   Provides access to repository metadata
    -   Used for repository information and configuration analysis
6.  Pull Requests (Read)
    -   Allows monitoring of pull request activities
    -   Used for security review integration
7.  Repository Projects (Read)
    -   Enables access to repository project boards
    -   Used for security issue tracking and management

#### Managing Access

-   You can modify repository access at any time through GitHub's App settings
-   To remove access, you can uninstall the app from your organization's GitHub Apps settings
-   Access can be configured at the organization or repository level

#### Troubleshooting

If you encounter any issues during the integration process:

-   Verify you have the necessary permissions in your GitHub organization
-   Check that the GitHub App installation was completed successfully
-   Ensure all required permissions were granted during installation
-   Contact PGP support at support@praetorian.com for assistance

#### Security Considerations

-   The GitHub App uses OAuth for authentication
-   Access tokens are managed securely by PGP
-   Permissions are scoped to only what's necessary for security scanning
-   You can revoke access at any time through GitHub's settings

This setup provides a secure and maintainable way to integrate PGP with your GitHub organization while maintaining proper access controls and security practices.
