---
title: "GitLab"
description: "GitLab"
featurebaseId: "8470901"
---

## The GitLab Integration in PGP

The GitLab Integration in PGP provides continuous monitoring of your organization's GitLab repositories to detect potential security risks and vulnerabilities. The integration scans both public and private projects within specified GitLab groups, helping secure your source code and development assets. PGP connects to GitLab using a Personal Access Token (PAT). This allows PGP to securely access and scan repositories within your GitLab groups. The integration automatically discovers all projects within connected groups and monitors them for security issues. To set up the GitLab integration, you'll need to complete two main steps: creating a Personal Access Token in GitLab and configuring the integration in PGP.

## Creating a Personal Access Token in GitLab

First, access the Personal Access Tokens page in GitLab. You can do this by signing into GitLab and either going directly to the [Personal Access Tokens](https://gitlab.com/-/user_settings/personal_access_tokens) page or navigating there through your profile settings (Profile icon → Edit profile → Access Tokens). On the Personal Access Tokens page, click "Add new token".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-d6e2-71d1-a989-82d33c59195f/b64u-MDE5YjgwMDItZDU1NS03NDc4LWEwZjMtYmI0MjMzYjEyNzU5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=b053110bd6f5d6bd9d5c5b07eb3290991de67c1d52351f5b611b8db5133753f1)

When creating the token, provide a descriptive name and set an appropriate expiration date. Under "Select scopes," enable both read\_api and read\_repository permissions.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-da81-749d-8aa5-7155ae27a65e/b64u-MDE5YjgwMDItZDY1Ny03ZDM5LTg5MDAtY2JmNzE3MjkxNzQ5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=cf26cc33cf6179110cde5be2e3232fc57506de0d47951e991b4f40ffd34c1c16)

After clicking "Create personal access token", GitLab will display your token - copy it immediately as it won't be shown again.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-da69-77aa-8edf-b537ab30b8a8/b64u-MDE5YjgwMDItZDZmMS03ZTI4LWI4ZTAtZThlZjdiNmM5Njg5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=d9e3896bdd6f459e7262ea3abf83a2b79b50168c0483d3d61368ad2faa0f824e)

## Finding Your GitLab Group URL

To locate your group URL, visit your Group page in GitLab and navigate to "Group settings". Under the Advanced section in Group General settings, you'll find your group's base URL.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-df0e-7f9b-9316-de61690cc097/b64u-MDE5YjgwMDItZGVlNi03MzFmLTk4MjktMzdmNTE3YTM4ZDll.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=0f74dc16af00615b2c8fd0bfce20f7248eb02996beffcb53cedb2e16604298e1)

Under the Advanced section in Group General settings, you'll find your group's base URL.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-dedb-74bf-b48a-e5ef41c0514d/b64u-MDE5YjgwMDItZGViMC03OTBhLWJhM2ItMDM0NWFhMjZjZTM1.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=09c73eaf4f4b00786354e3ed6df2e8411a798ae47b6c1b1d519f8f3a9887d8c7)![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-dd3c-7823-9319-8fe64ea4fe89/b64u-MDE5YjgwMDItZGQyNi03NTRhLTljZDEtZTRkYWE1M2ZkYjYw.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=4f04de6db40d49327e8c97208e9858a308795191c44df0468eeace959428e14e)

## Configuring the Integration in PGP

In PGP's interface, go to the Integrations page and click "Add Integration". You can find GitLab listed under the Source Code Managers section, or use the search bar to locate it directly.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-e3bd-776e-af7d-95caa0410dc9/b64u-MDE5YjgwMDItZTJkNC03YmRhLWJlNDctZDkzOGY4ZDkwMzJk.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=572233eb1967a66c971fdd70273883db31356df6047db9bb018e8966aa246001)

In the integration configuration window, provide two pieces of information:

-   Your GitLab group URL
-   The Personal Access Token you created

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-e28e-7f52-8fcb-f209708d94b8/b64u-MDE5YjgwMDItZTI0OC03MmY4LWJlMDUtZGIxYWE0MzllMjVm.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=d35846a3d1297c6f55e68ca7cc46e831efd228444f74acfe9e07e3d231cc2315)

Click "Connect" to complete the setup. Once configured, PGP will begin regularly scanning all accessible projects in your group for security concerns, including hard-coded secrets.

This integration leverages PGP's scanning capabilities to continuously monitor your GitLab assets, helping maintain the security of your source code and development environment.

If you run into any issues during the integration process or have questions about maximizing the value of this integration, our support team is ready to help. You can reach us at [support@praetorian.com](mailto:support@praetorian.com), and we'll be happy to guide you through any challenges you encounter.
