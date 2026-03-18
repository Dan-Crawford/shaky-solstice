---
title: "Azure DevOps Work Items"
description: "Azure DevOps Work Items"
featurebaseId: "2383044"
---

## What Are Azure DevOps Work Items?

Azure DevOps Work Items are trackable units of work (Bugs, Tasks, Issues, Features, etc.) within Azure DevOps Boards. The Guard Platform (PGP) integration allows you to automatically or manually create Work Items from discovered security risks, keeping your development and security teams aligned in a single workflow.

## What This Integration Does

### Work Item Creation

PGP creates Azure DevOps Work Items from security risks discovered during scanning. Each work item includes:

-   **Title**: The risk name
    
-   **Description**: A rich HTML body containing a link back to the risk in PGP, the severity rating, a table of impacted assets (group and identifier), the risk definition, supporting evidence, and proof
    
-   **Severity**: Mapped from PGP severity to Azure DevOps severity (see mapping below)
    

### Automatic Work Item Creation

You can configure templates that automatically create Work Items when new risks are discovered above a severity threshold. For example, you can set a template to auto-create Bug work items for all High and Critical findings in a specific project.

### Bidirectional Status Sync

PGP syncs work item status back from Azure DevOps. When a work item is moved to **Closed**, **Resolved**, or **Done** in Azure DevOps, PGP reflects that resolution status on the corresponding risk.

### Severity Change Notifications

If a risk's severity changes after a work item has been created, PGP posts a comment on the work item notifying the assignee of the severity update.

## Severity Mapping

PGP maps risk severities to Azure DevOps severity values as follows:

PGP Severity

Azure DevOps Severity

Critical

1 - Critical

High

2 - High

Medium

3 - Medium

Low

4 - Low

Info

4 - Low

## Permission Requirements

### Azure Cloud Integration (Entra ID)

-   An existing **Azure cloud integration** must be configured in PGP (the service principal from your Terraform deployment)
    
-   The service principal must be added to your Azure DevOps organization under **Organization Settings > Users** with at least **Basic** access level
    
-   The Entra ID (Azure AD) app registration must have the **Azure DevOps API** permission configured
    
-   Or…
    

### Personal Access Token (PAT)

-   A PAT with **Work Items (Read & Write)** scope is required
    
-   The PAT user must have access to the target Azure DevOps projects
    

## Setup: Azure Cloud Integration (Recommended)

This method uses your existing Azure cloud integration with Entra ID for automatic token rotation. Credentials are managed through Azure's identity platform, eliminating the need for manual PAT rotation.

1.  **Ensure you have an Azure cloud integration** already configured in PGP. If not, set one up first under **Integrations > Cloud**.
    
2.  **Add the service principal to Azure DevOps**: In your Azure DevOps organization, go to **Organization Settings > Users**. Add the Application ID (from your Terraform output or Azure portal) and grant **Basic** access.
    
3.  **In PGP**, navigate to **Integrations > IT Service Management > Azure DevOps Work Items**.
    
4.  Select your **Azure Cloud Integration** from the dropdown.
    
5.  Enter your **Organization URL** (e.g., `https://dev.azure.com/your-organization`).
    
6.  Click **Connect**. PGP will validate the connection and retrieve your available projects and work item types.
    
7.  **Configure a template**:
    
    -   Give the integration a **name**
        
    -   Select a **Project** where work items will be created
        
    -   Select the **Work Item Type** (e.g., Bug, Task, Issue)
        
    -   Optionally enable **Automatic Work Item Creation** and set a **Severity Threshold** (e.g., High and Critical only)
        

## Setup: Personal Access Token (PAT)

Use this method if you do not have an Azure cloud integration configured. Note that PATs are long-lived static credentials that must be manually rotated.

1.  **Create a PAT in Azure DevOps**: Click your **profile icon**, then **Personal access tokens**. Click **\+ New Token**.
    
2.  Grant the token **Work Items (Read & Write)** scope.
    
3.  **In PGP**, navigate to **Integrations > IT Service Management > Azure DevOps Work Items**.
    
4.  Click **Use a Personal Access Token instead** (link at the bottom of the setup dialog).
    
5.  Enter your **Organization URL** (e.g., `https://dev.azure.com/your-organization`) and paste your **PAT**.
    
6.  Click **Connect**. PGP will validate the connection and retrieve your available projects.
    
7.  **Configure a template** (same as above: name, project, work item type, optional auto-create settings).
    

For full details on PAT management, see [Microsoft's PAT documentation](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate).

## Multiple Templates

You can configure multiple templates to route different types of risks to different projects or work item types. For example:

-   Critical and High vulnerabilities → Bug work items in your Security project
    
-   Medium findings → Task work items in your Backlog project
    

Each template independently controls its project, work item type, auto-creation setting, and severity threshold.

## Best Practices

-   **Prefer Azure Cloud Integration** over PAT for automatic credential rotation and stronger security
    
-   **Use a service account** for PATs so the integration is not disrupted by personnel changes
    
-   **Set short PAT expiration** and rotate regularly if using PAT authentication
    
-   **Start with auto-create for Critical/High only** to avoid flooding your board, then expand the threshold as your team builds a remediation workflow
    

## Troubleshooting

Issue

Solution

Azure DevOps token not available

For Entra ID: verify the service principal has Azure DevOps API permissions and is added to the organization. For PAT: the token may have expired — generate a new one.

No projects found

Check user permissions in Azure DevOps under Organization Settings > Users. The service principal or PAT user needs access to at least one project.

Invalid Azure DevOps URL

URL must use `https://dev.azure.com/` format. Legacy `visualstudio.com` URLs are not supported.

Work items not being created

Ensure the PAT has Work Items: Read & Write scope, or the service principal has appropriate permissions. Also verify your template has auto-create enabled with matching severity threshold.

Rate limiting errors

PGP respects Azure DevOps rate limits with automatic retry and backoff. If persistent, check your organization's rate limit policies.
