---
title: "Jira"
description: "Jira"
featurebaseId: "3124138"
---

Praetorian Guard Platform’s (PGP) Jira integration enables automatic and manual creation of vulnerability alerts as Jira tickets, streamlining your security workflow. This guide will walk you through the setup process, which typically takes 5-10 minutes to complete.

## Prerequisites

Before beginning the integration setup, ensure you have:

-   Access to create API tokens in your Atlassian account
    
-   Designated Jira project (or projects) for security vulnerabilities
    

### PGP Configuration

To begin setting up your Jira integration, first access your organization's settings. Log into your PGP account and locate the **Settings** section at the bottom right of the page:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-bbc4-7767-a5ee-002766aa6ba8/b64u-MDE5YjgwMDQtYmJiMC03OTI5LThhMjctZDgyZGQyMjkxZjRm.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=9805321cccaaa46fa15c7cb4b7e36e4d4cc6d72b86a85ea7a55087d3385b8706)

Once you're on the **Settings** page, you'll find the **Notifications Settings** tab. This is where you'll configure how PGP communicates with external systems like Jira. Look for the "Add Notification" button and click to see the available integration options. Among these options, you'll find the Jira tile - select this to begin configuring your integration.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-be40-7d60-92d5-ddef12c41e79/b64u-MDE5YjgwMDQtYmRlOS03MDU4LTgwYTEtODZmYTJjODJjZGYz.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=42b4d66cdf9ce6606822b611c32ca74c55d5fde45ce8d838decbda3fc57801e8)

## Jira Configuration

Jira configuration is a two-step process. The first step is authentication, and the second step is tailoring the messaging to your needs and Jira setup. Before collecting authentication information from Jira, review the screenshot below, which shows the PGP authentication setup screen where you'll enter these details. Having this view in mind will help you understand exactly what information we need to gather from Jira.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-bb1a-764f-a1ef-a89c51a6ae78/b64u-MDE5YjgwMDQtYmFlZi03MjhhLTg1MzMtZDM0M2MwYmIwZWJl.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c4f8050428fe3579b0bfaa5a2c667befee1cfddf0a4ff6b267b9b9f234fbef67)

Let's walk through each step.

First, you'll need to locate your Jira base URL. Log into your Jira instance and look at the address bar in your browser. Your base URL will be in the format `https://your-domain.atlassian.net`. Make note of this URL. Don't include any additional path information like `/jira` or other extensions. You'll need this URL when we return to PGP.

Next, we'll set up the authentication that allows PGP to communicate securely with Jira. This requires creating an API token through Atlassian. Your API token will need to have the following permissions:

-   **BROWSE\_PROJECTS**
    
-   **CREATE\_ISSUES**
    
-   **EDIT\_ISSUES**
    
-   **ADD\_COMMENTS**
    
-   **RESOLVE\_ISSUES**
    
-   **EDIT\_OWN\_COMMENTS**
    

To create the API token, visit the Atlassian API Tokens page by clicking on your profile picture in Jira, selecting "Manage Account":

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-c39f-7289-8dcb-205d6b48f249/b64u-MDE5YjgwMDQtYzM1Yi03NDMwLTg2YzQtMDAwOTE3YTQxMTUy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=fed1a7e6e274bf3a5374c19dc3d9c9ad4763fb3d54238226507b9b267ddf2fbb)

Navigate to the Security section:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-c3a1-7793-a7d9-a98b0e7f6065/b64u-MDE5YjgwMDQtYzM2Mi03ZTMyLTliZWUtM2Y2Nzc4ZGJmNWJj.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=fdd1eef388ff2ce43567868af239578610cade9584ca6a6c51f129456607cb1b)

Navigate to the API tokens page:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-c48d-7867-a38d-7f4a11b38fd6/b64u-MDE5YjgwMDQtYzQ0OS03ZGVhLTg2MWYtMjc1ZThhYzljMjk2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=33f6a41f560a12aa6adbf38fd73b3493f5f5a4b00328731aa0747b2b8448f25a)

Alternatively, you can go directly to the API tokens page at https://id.atlassian.com/manage/api-tokens. Once there, click the "Create API Token" button.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-c87a-7c42-8385-32017b2a1300/b64u-MDE5YjgwMDQtYzgyNC03ZjU3LTk3M2ItOTRhMTc2OTZhNmI4.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=fa87f1fa1a82a976cae2e82b2be2b3d02f9e8471054670d42c8cf9d27588d704)

Give your token a meaningful label that will help you identify its purpose later, such as "PGP Integration."

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-c806-7d0f-926c-b32d82a145a6/b64u-MDE5YjgwMDQtYzdkMC03MDZlLTk5YzgtMzNkYzliNzEwMDIy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c2336121e7d297f47448f8cca8aa9162b276fb1596f902a8471d8beaff941ba5)

After clicking Create, you'll see your newly generated token. This is a crucial moment - copy this token immediately and store it somewhere secure, as you won't be able to view it again after closing this dialog. Treat this token with the same care as you would a password, as it provides access to your Jira instance.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-c80d-7c36-9d64-355fb8cc076b/b64u-MDE5YjgwMDQtYzdkNy03YzAxLWI5MWQtNmU2MTE1OTAwMTMx.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=2a463d64ca077442362395a113e83171ad643fae227c237b367b5326fb83c9f0)

More on Atlassian API tokens can be found [here](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).

The User Email field in PGP will take the email of the user that created the API token in Jira. To find this in Jira, click on the account icon at the top right. You can view and copy the email that that will go in the User Email field.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-cb3d-7f7a-adab-dab0f0ffc241/b64u-MDE5YjgwMDQtY2IzMS03ZDY1LTkwOGYtYmM4Y2MwZTI0Mzli.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=1452512929e6756c3636070877ade23a9cd95922ea44a326ac81f8c2a4c55e67)

With your base URL, API token, and User Email secured, return to PGP and add this information to the Jira setup dialog.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-ca12-7647-8b4e-303ee526761c/b64u-MDE5YjgwMDQtYzlmYS03ZmM5LThhNGUtMTE1NDQxZTUxZjAy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=df4b84385acd09cf4e82d5d5123c66c341c997f0ea79bc5633a50bea0ec2aa34)

Once PGP is successfully authenticated to Jira, the second step of the setup will begin: tailoring PGP messaging to your Jira instance. Fill out the **Integration Name** section. Select one of the projects available through the API token provided. Choose a type - PGP will send issues to Jira under the type you specify here (e.g., story, bug, task). You can also decide whether you want Jira to automatically create issues in the Jira project you've chosen. If you choose to enable automatic issue creation, all PGP vulnerabilities at or above the selected severity level will be created as the desired issue type in the selected Jira project.

Click **Connect** to complete the setup.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-cb11-757b-a4c1-dccebd48219d/b64u-MDE5YjgwMDQtY2FmZS03YmQ2LWI4ZGUtOTVjNDc1YWFmNGYz.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=2bb8990a7ac0df0ee34b4c7b25bd8c0d557c77da9a3029b72982475d41fdc1e8)

## Jira Transitions and Guard Status Mapping

When you integrate Jira with Guard, it is important to understand how ticket statuses in Jira correspond to vulnerability statuses in Guard. Mapping these statuses correctly ensures consistency across both platforms — when a ticket moves through your Jira workflow, the corresponding vulnerability in Guard updates automatically to reflect the same progress.

Jira projects typically use statuses like **To Do**, **Triage**, **Backlog**, **In Progress**, and **Complete** (though your specific workflow may vary). Guard tracks vulnerabilities using its own lifecycle statuses: **Detected**, **Demonstrated**, and **Remediated**. The integration maps these together so that movement in one platform is reflected in the other.

#### Default Status Mapping

The table below shows how common Jira statuses map to Guard vulnerability statuses:

Example Jira Status

PGP Status

What It Means

**To Do**

Demonstrated

The vulnerability has been confirmed and a ticket has been created, but remediation work has not yet started.

**Backlog**

Demonstrated

The vulnerability is acknowledged and queued for future remediation.

**Triage**

Detected

The vulnerability has been identified and is being evaluated for severity and prioritization.

**In Progress**

Demonstrated

Active remediation work is underway on this vulnerability.

**Complete** / **Done**

Remediated

The vulnerability has been resolved. Guard marks it as remediated.

For example, if your team moves a Jira ticket from **To Do** to **Complete**, Guard will automatically transition that vulnerability from **Demonstrated** to **Remediated**. This bidirectional sync eliminates the need to manually update vulnerability statuses in both systems and ensures that your security posture is always accurately reflected regardless of which platform your team is working in.

You can customize these mappings during set up or by clicking “Edit” on the Jira integration and navigating to the **Transitions** tab. If your Jira project uses custom statuses, map each one to the appropriate Guard status to maintain consistency.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019c5840-fe2a-7114-8aaf-62f7aa9d75bb/b64u-aW1hZ2UucG5n.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=e3a885b14621c3f3cfae3479b4bed720603674b6d46ce5aa4e9b64921a81dea1)

## Manual Ticket Creation

Whether or not you enable automatic Jira Issue creation, you can manually create issues for vulnerabilities.

On every vulnerability, under the **More Actions** dropdown, you will see "Create New Ticket". Clicking this will prompt PGP to send this vulnerability and its details to the Jira Project of your choosing. You can also add multiple Jira Projects in PGP so different Jira groups receive different information.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-ce5a-772c-b9a4-188a450cf69a/b64u-MDE5YjgwMDQtY2UxZi03NzZmLWE3ZjMtMjFmZWFhMTkxNzVh.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=e56ade1f0aad032b06c3cc3b82c329768664504070f44edb828a4aad9b0085d0)

Once the ticket has been created, PGP will display relevant information in the vulnerability drawer.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-cee3-766a-81c2-7dddeba8bae1/b64u-MDE5YjgwMDQtY2U5My03NzhlLWIyZGUtMzRkMzhjNzM3MDEy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=efd8f308a48601ba42338286dfbd36e2061b3bae6cc9f7570dee8cf1287ba631)

If a ticket has already been manually created in Jira, that ticket can be associated with a vulnerability in PGP by going to the **More Actions** dropdown and choosing Associate Existing Ticket.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-ce8f-7d31-99c6-50fd0a35cee6/b64u-MDE5YjgwMDQtY2U2Ny03YmFkLWFkOGEtYTA3NjQ2MDYzNjA3.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=64ae035e5496a498bd30cf37ea0fc1f7b52035f44f0ad8a2c017d1f787b3c6cb)

Once the vulnerability has been associated, you'll see that ticket and relevant information in the vulnerability drawer.

## What Information Goes Into Jira Tickets

When PGP creates a Jira ticket, it includes comprehensive vulnerability information to help your team understand and remediate the security issue. Here's what you'll find in each ticket:

#### Ticket Title (Summary)

The ticket title displays the vulnerability name. This appears at the top of the Jira issue and in issue lists.

#### Ticket Description

The description field contains detailed information about the vulnerability, formatted in Jira markup. It includes:

-   **PGP Link:** A direct link to view the vulnerability in your PGP instance. This allows team members to access the full vulnerability details, history, and context within PGP.
    
-   **Severity:** The severity level of the vulnerability (Critical, High, Medium, Low, Info, or Exposure). This helps prioritize remediation efforts.
    
-   **Assets Impacted:** A table listing all assets affected by this vulnerability. The table includes two columns:
    
    -   DNS: The domain name or IP address of the affected asset
        
    -   Name: The name or identifier of the affected asset (such as port targets or webpage URLs)
        
    
    This table helps identify which systems, services, or endpoints are vulnerable.
    
-   **Vulnerability Definition:** The complete vulnerability definition content, including technical details, impact assessment, remediation recommendations, and any references. This content is automatically converted from markdown to Jira markup format, preserving formatting, code blocks, lists, and other structured elements.
    
-   **Additional Evidence:** If evidence has been collected for the vulnerability, it appears in a dedicated "Additional Evidence" section. Text-based evidence is included directly in the description, while binary evidence files are attached separately (see Attachments below).
    

#### Project and Issue Type

The ticket is created in the Jira project you specified during integration setup. The issue type (such as Bug, Task, or Story) is also determined by your template configuration. These fields appear in the Jira issue's metadata and determine where the ticket appears in your Jira workflows.

#### Labels

If the vulnerability has tags associated with it in PGP, those tags are automatically added as labels to the Jira ticket. Labels are sanitized to meet Jira's requirements (alphanumeric characters, hyphens, and underscores only) and appear in the Labels field of the issue. This helps with filtering, searching, and organizing tickets.

#### Attachments

PGP automatically attaches relevant files to the Jira ticket:

-   **Screenshots:** Any screenshots referenced in the vulnerability definition or evidence are extracted and uploaded as image attachments. These appear in the Attachments section of the Jira issue.
    
-   **Evidence Files:** Binary evidence files that cannot be displayed as text are attached to the ticket. These files are named with the format "evidence-\[vulnerability-name\]" and appear in the Attachments section.
    
-   **Proof Files:** If proof data exists for the vulnerability, it is attached as a file named "proof-\[vulnerability-name\]". This provides additional technical details that may be needed for remediation.
    

All attachments are accessible directly from the Jira issue, allowing team members to review visual evidence and technical details without leaving Jira.

We hope these instructions are helpful! If you would like any topic discussed in more detail or need further assistance, please contact us at [support@praetorian.com](mailto:support@praetorian.com).
