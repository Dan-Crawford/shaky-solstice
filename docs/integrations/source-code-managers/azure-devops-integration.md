---
title: "Azure DevOps Integration"
description: "Connect your Azure DevOps organization to PGP for automated repository discovery, secret scanning, and security finding management."
featurebaseId: "0175832"
---

## What is Azure DevOps?

Azure DevOps is Microsoft's cloud platform for source code management, CI/CD pipelines, and project tracking. Integrating it with Praetorian Guard Platform (PGP) gives you automatic repository discovery and secret scanning across your organization, plus the ability to create Work Items directly from PGP risks.

## What PGP Does With This Integration

### Repository Discovery & Secret Scanning

PGP enumerates all projects and Git repositories within your Azure DevOps organization (or a specific project, if scoped). Forked and disabled repositories are automatically filtered out. Each discovered repository is tracked as an asset in your PGP attack surface inventory.

Discovered repositories are cloned and scanned using [Titus](https://github.com/praetorian-inc/titus), Praetorian's high-performance credential detection engine with 459+ detection rules. Titus scans both current source code and Git commit history, so secrets that were committed and later removed are still detected.

You can scope the integration at three levels:

-   **Organization-wide**: `https://dev.azure.com/{org}` — scans all projects
    
-   **Single project**: `https://dev.azure.com/{org}/{project}` — scans only that project
    
-   **Single repo**: `https://dev.azure.com/{org}/{project}/_git/{repo}` — scans one repository
    

### Work Item Tracking (Optional)

PGP can create Azure DevOps Work Items (Bugs, Tasks, Issues, etc.) from discovered risks. Each work item includes the risk name, a rich HTML description with a link back to PGP, impacted assets, evidence, proof, and a severity mapping (Critical to 1 - Critical, High to 2 - High, Medium to 3 - Medium, Low/Info to 4 - Low).

You can configure multiple templates with different projects and work item types, enable auto-creation above a severity threshold, and PGP will sync work item status (Active, Resolved, Closed, Done) back automatically.

## Authentication Methods

### Azure Cloud Integration (Recommended)

Uses your existing Azure cloud integration with Entra ID (formerly Azure AD) for automatic token rotation. PGP performs an OAuth token exchange using the service principal from your Azure integration. This is more secure because credentials are managed through Azure's identity platform.

### Personal Access Token (PAT)

Uses a static PAT for authentication. Simpler to set up, but PATs are long-lived static credentials that must be manually rotated.

## Setting Up Repository Scanning

### Via Azure Cloud Integration

1.  Ensure you have an existing **Azure cloud integration** configured in PGP.
    
2.  Add the service principal to Azure DevOps: go to your Azure DevOps organization, then **Organization Settings > Users**. Add the Application ID (from your Terraform output) and grant **Basic** access.
    
3.  In PGP, go to **Integrations > Source Code Managers > Azure DevOps**. Select your Azure Cloud Integration from the dropdown, enter your organization or project URL, and click **Connect**.
    

### Via PAT

1.  In Azure DevOps, click your **profile icon**, then **Personal access tokens**. Click **\+ New Token** and grant **Code (Read)** and **Project and Team (Read)** scope.
    
2.  In PGP, go to **Integrations > Source Code Managers > Azure DevOps** and click **Use a Personal Access Token instead**. Enter your organization URL and PAT, then click **Connect**.
    

For full details on PAT management, see [Microsoft's PAT documentation](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate).

## Setting Up Work Item Tracking

### Via Azure Cloud Integration

1.  Ensure the service principal has Azure DevOps access (see repository scanning setup above).
    
2.  In PGP, go to **Integrations > IT Service Management > Azure DevOps Work Items**. Select your Azure Cloud Integration, enter your organization URL, and click **Connect**.
    
3.  Configure a template by selecting a project, work item type, and optionally enabling auto-create with a severity threshold.
    

### Via PAT

1.  Create a PAT with **Work Items (Read and Write)** scope in addition to Code and Project scopes.
    
2.  In PGP, go to **Integrations > IT Service Management > Azure DevOps Work Items** and click **Use a Personal Access Token instead**. Enter your organization URL and PAT, then click **Connect**.
    
3.  Configure a template (same as above).
    

## Best Practices

-   **Prefer the Azure Cloud Integration** over PAT for automatic credential rotation and stronger security.
    
-   **Use project-scoped URLs** if you only need to monitor specific projects.
    
-   **Use a service account** for PATs so the integration is not disrupted by personnel changes.
    
-   **Set short PAT expiration** and rotate regularly if using PAT authentication.
    

## Troubleshooting

IssueSolution

Azure DevOps token not available

For Entra ID: verify the service principal has Azure DevOps API permissions. For PAT: the token may have expired, generate a new one.

No projects found in organization

Check user permissions in Organization Settings > Users. The service principal or PAT user needs access to at least one project.

Invalid Azure DevOps URL

URL must use `https://dev.azure.com/`. Legacy `visualstudio.com` URLs are not supported.

Work items not being created

Ensure the PAT has Work Items: Read and Write scope, or the service principal has appropriate permissions.

Rate limiting errors

PGP respects Azure DevOps rate limits with automatic retry and backoff. If persistent, check your organization rate limit policies.
