---
title: "GitLab"
description: "GitLab"
featurebaseId: "32044845804315"
---

## The GitLab Integration in PGP

The GitLab Integration in PGP provides continuous monitoring of your organization's GitLab repositories to detect potential security risks and vulnerabilities. The integration scans both public and private projects within specified GitLab groups, helping secure your source code and development assets. PGP connects to GitLab using a Personal Access Token (PAT). This allows PGP to securely access and scan repositories within your GitLab groups. The integration automatically discovers all projects within connected groups and monitors them for security issues. To set up the GitLab integration, you'll need to complete two main steps: creating a Personal Access Token in GitLab and configuring the integration in PGP.

## Creating a Personal Access Token in GitLab

First, access the Personal Access Tokens page in GitLab. You can do this by signing into GitLab and either going directly to the [Personal Access Tokens](https://gitlab.com/-/user_settings/personal_access_tokens) page or navigating there through your profile settings (Profile icon → Edit profile → Access Tokens). On the Personal Access Tokens page, click "Add new token".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-d6e2-71d1-a989-82d33c59195f/b64u-MDE5YjgwMDItZDU1NS03NDc4LWEwZjMtYmI0MjMzYjEyNzU5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=041d36971ed3fedd8028b876aa67b379edfe06e82bf948f04f51b16f4b07b652)

When creating the token, provide a descriptive name and set an appropriate expiration date. Under "Select scopes," enable both read\_api and read\_repository permissions.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-da81-749d-8aa5-7155ae27a65e/b64u-MDE5YjgwMDItZDY1Ny03ZDM5LTg5MDAtY2JmNzE3MjkxNzQ5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=be4a01b5817970ed27764c236ffea57c749afc88a145da240a0f6df797b01ea2)

After clicking "Create personal access token", GitLab will display your token - copy it immediately as it won't be shown again.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-da69-77aa-8edf-b537ab30b8a8/b64u-MDE5YjgwMDItZDZmMS03ZTI4LWI4ZTAtZThlZjdiNmM5Njg5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=6a09c9cb295d58d1abc870ec9c9beb6c07323edf8a4d39dde1332588a12817c7)

## Finding Your GitLab Group URL

To locate your group URL, visit your Group page in GitLab and navigate to "Group settings". Under the Advanced section in Group General settings, you'll find your group's base URL.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-df0e-7f9b-9316-de61690cc097/b64u-MDE5YjgwMDItZGVlNi03MzFmLTk4MjktMzdmNTE3YTM4ZDll.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c3ba8032ca104a4e6c5c03bbc4c302e29195b5de89c7ce934966be9c7653d676)

Under the Advanced section in Group General settings, you'll find your group's base URL.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-dedb-74bf-b48a-e5ef41c0514d/b64u-MDE5YjgwMDItZGViMC03OTBhLWJhM2ItMDM0NWFhMjZjZTM1.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c96cfbc8ca2ae546bc4f451a22ea19094b2aa580f3d3b78ab9982b2eadc211e0)![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-dd3c-7823-9319-8fe64ea4fe89/b64u-MDE5YjgwMDItZGQyNi03NTRhLTljZDEtZTRkYWE1M2ZkYjYw.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=d097c5bdb23ccaf86f60413a973f7a7f1058c8612533135c67f7a4c52b0ad606)

## Configuring the Integration in PGP

In PGP's interface, go to the Integrations page and click "Add Integration". You can find GitLab listed under the Source Code Managers section, or use the search bar to locate it directly.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-e3bd-776e-af7d-95caa0410dc9/b64u-MDE5YjgwMDItZTJkNC03YmRhLWJlNDctZDkzOGY4ZDkwMzJk.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=05460712ebb626673d2d2b3258e14ed7a2d686cf86d53e8d051068061322d93a)

In the integration configuration window, provide two pieces of information:

-   Your GitLab group URL
-   The Personal Access Token you created

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958111fa21178a432e30a22/019b8002-e28e-7f52-8fcb-f209708d94b8/b64u-MDE5YjgwMDItZTI0OC03MmY4LWJlMDUtZGIxYWE0MzllMjVm.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=3c6e253e493f3e785835aa216ff6c5fc5e53bf930473cd2ecbf325189ac1ea08)

Click "Connect" to complete the setup. Once configured, PGP will begin regularly scanning all accessible projects in your group for security concerns, including hard-coded secrets.

This integration leverages PGP's scanning capabilities to continuously monitor your GitLab assets, helping maintain the security of your source code and development environment.

If you run into any issues during the integration process or have questions about maximizing the value of this integration, our support team is ready to help. You can reach us at [support@praetorian.com](mailto:support@praetorian.com), and we'll be happy to guide you through any challenges you encounter.
