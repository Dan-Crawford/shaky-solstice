---
title: "Jira"
description: "Jira"
featurebaseId: "3987266"
---

Praetorian Guard Platform’s (PGP) Jira integration enables automatic and manual creation of vulnerability alerts as Jira tickets, streamlining your security workflow. This guide will walk you through the setup process, which typically takes 5-10 minutes to complete.

## Prerequisites

Before beginning the integration setup, ensure you have:

-   Access to create API tokens in your Atlassian account
    
-   Designated Jira project (or projects) for security vulnerabilities
    

### PGP Configuration

To begin setting up your Jira integration, first access your organization's settings. Log into your PGP account and locate the **Settings** section at the bottom right of the page:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-bbc4-7767-a5ee-002766aa6ba8/b64u-MDE5YjgwMDQtYmJiMC03OTI5LThhMjctZDgyZGQyMjkxZjRm.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=eb6bce3852357f1ad4fe673e8e031c8ecccad3edfbb622b33cae265e025e2332)

Once you're on the **Settings** page, you'll find the **Notifications Settings** tab. This is where you'll configure how PGP communicates with external systems like Jira. Look for the "Add Notification" button and click to see the available integration options. Among these options, you'll find the Jira tile - select this to begin configuring your integration.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-be40-7d60-92d5-ddef12c41e79/b64u-MDE5YjgwMDQtYmRlOS03MDU4LTgwYTEtODZmYTJjODJjZGYz.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=b3ddcab11707e9aa1951a026d4c7adb057dc5d11ca216917e6ed6c5450139384)

## Jira Configuration

Jira configuration is a two-step process. The first step is authentication, and the second step is tailoring the messaging to your needs and Jira setup. Before collecting authentication information from Jira, review the screenshot below, which shows the PGP authentication setup screen where you'll enter these details. Having this view in mind will help you understand exactly what information we need to gather from Jira.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-bb1a-764f-a1ef-a89c51a6ae78/b64u-MDE5YjgwMDQtYmFlZi03MjhhLTg1MzMtZDM0M2MwYmIwZWJl.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=06045ce3f0f91e9109eeeaee722d7ae5c60f05c8663ae2cb8cd93b40e52f24a9)

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

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-c39f-7289-8dcb-205d6b48f249/b64u-MDE5YjgwMDQtYzM1Yi03NDMwLTg2YzQtMDAwOTE3YTQxMTUy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=9f6facb5469db5306485612bf1af51b21dc994f07069b555dd79ca0f66ac4ada)

Navigate to the Security section:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-c3a1-7793-a7d9-a98b0e7f6065/b64u-MDE5YjgwMDQtYzM2Mi03ZTMyLTliZWUtM2Y2Nzc4ZGJmNWJj.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=ba4ba85071af7f6a281d34e41652c16cd2ff75290a90b76b8908f8365b928884)

Navigate to the API tokens page:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-c48d-7867-a38d-7f4a11b38fd6/b64u-MDE5YjgwMDQtYzQ0OS03ZGVhLTg2MWYtMjc1ZThhYzljMjk2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=a9274941952f7354e449aae09d8585561ef1269946e2084b99bb7c0c0baec719)

Alternatively, you can go directly to the API tokens page at https://id.atlassian.com/manage/api-tokens. Once there, click the "Create API Token" button.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-c87a-7c42-8385-32017b2a1300/b64u-MDE5YjgwMDQtYzgyNC03ZjU3LTk3M2ItOTRhMTc2OTZhNmI4.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=ae769818727b88f391f411e46b1731b5ca89be7d7d8c3bebd8530ff264ea8c25)

Give your token a meaningful label that will help you identify its purpose later, such as "PGP Integration."

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-c806-7d0f-926c-b32d82a145a6/b64u-MDE5YjgwMDQtYzdkMC03MDZlLTk5YzgtMzNkYzliNzEwMDIy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=bdc7ad6a9ce179f4e767d4cbe8fe67450a7991c3779f698662da1b58792e80b0)

After clicking Create, you'll see your newly generated token. This is a crucial moment - copy this token immediately and store it somewhere secure, as you won't be able to view it again after closing this dialog. Treat this token with the same care as you would a password, as it provides access to your Jira instance.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-c80d-7c36-9d64-355fb8cc076b/b64u-MDE5YjgwMDQtYzdkNy03YzAxLWI5MWQtNmU2MTE1OTAwMTMx.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=4cbcb954bd4d8ff05b2eac25b9f42bb1ce1cdbc2715441868c1260d042ade940)

More on Atlassian API tokens can be found [here](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).

The User Email field in PGP will take the email of the user that created the API token in Jira. To find this in Jira, click on the account icon at the top right. You can view and copy the email that that will go in the User Email field.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-cb3d-7f7a-adab-dab0f0ffc241/b64u-MDE5YjgwMDQtY2IzMS03ZDY1LTkwOGYtYmM4Y2MwZTI0Mzli.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=f4a8ea213f793317fca12b9d9c336bbd5c3e7ec8cc562b8fd645fcc4c9936d9b)

With your base URL, API token, and User Email secured, return to PGP and add this information to the Jira setup dialog.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-ca12-7647-8b4e-303ee526761c/b64u-MDE5YjgwMDQtYzlmYS03ZmM5LThhNGUtMTE1NDQxZTUxZjAy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=52caf5d44cefd7ad3600fc8ae9e2a8e4c6ad7fbfc87d705fae8cb78e65eb85a8)

Once PGP is successfully authenticated to Jira, the second step of the setup will begin: tailoring PGP messaging to your Jira instance. Fill out the **Integration Name** section. Select one of the projects available through the API token provided. Choose a type - PGP will send issues to Jira under the type you specify here (e.g., story, bug, task). You can also decide whether you want Jira to automatically create issues in the Jira project you've chosen. If you choose to enable automatic issue creation, all PGP vulnerabilities at or above the selected severity level will be created as the desired issue type in the selected Jira project.

Click **Connect** to complete the setup.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-cb11-757b-a4c1-dccebd48219d/b64u-MDE5YjgwMDQtY2FmZS03YmQ2LWI4ZGUtOTVjNDc1YWFmNGYz.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=7e5505ac5b99d2536ffe179ffa3c81c24fc9a9d0332e94db4a036796a1005c8c)

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

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019c5840-fe2a-7114-8aaf-62f7aa9d75bb/b64u-aW1hZ2UucG5n.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=f2751da821c998c9ab39413304782dc18c80dc2be1dce28398183606487b5811)

## Manual Ticket Creation

Whether or not you enable automatic Jira Issue creation, you can manually create issues for vulnerabilities.

On every vulnerability, under the **More Actions** dropdown, you will see "Create New Ticket". Clicking this will prompt PGP to send this vulnerability and its details to the Jira Project of your choosing. You can also add multiple Jira Projects in PGP so different Jira groups receive different information.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-ce5a-772c-b9a4-188a450cf69a/b64u-MDE5YjgwMDQtY2UxZi03NzZmLWE3ZjMtMjFmZWFhMTkxNzVh.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=54b029ec514c44f498e4fdc45b8b856ab76af7631a49a31911f851fcb4018828)

Once the ticket has been created, PGP will display relevant information in the vulnerability drawer.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-cee3-766a-81c2-7dddeba8bae1/b64u-MDE5YjgwMDQtY2U5My03NzhlLWIyZGUtMzRkMzhjNzM3MDEy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=bb37f5b1a7409044919f83c85855a139acb7de7b38b80656a31d199d995df0c4)

If a ticket has already been manually created in Jira, that ticket can be associated with a vulnerability in PGP by going to the **More Actions** dropdown and choosing Associate Existing Ticket.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958119da21178a432e3f770/019b8004-ce8f-7d31-99c6-50fd0a35cee6/b64u-MDE5YjgwMDQtY2U2Ny03YmFkLWFkOGEtYTA3NjQ2MDYzNjA3.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=f946a85fb080efe325f5c2c08442ab684638e63b7fd431c4bab4724460d19b50)

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
