---
title: "Microsoft Azure - IaC Deployment (Recommended)"
description: "Microsoft Azure - IaC Deployment (Recommended)"
featurebaseId: "37956598833563"
---

This guide walks you through connecting your Azure environment to Praeotian Guard Platform (PGP) for comprehensive security monitoring and management using Infrastructure as Code (IaC) deployment methods. The integration uses Azure's federated identity credentials and role-based access control to provide PGP with the necessary permissions to assess your Azure resources while maintaining security best practices.

You can choose between tenant-level integration (recommended for full Azure environment coverage) or subscription-level integration (for specific subscription monitoring). The process involves creating an Azure AD app registration, configuring the appropriate permissions, and validating the connection through automated Terraform deployment.

## Prerequisites

Before starting the integration, ensure you have:

-   Azure portal access as a Global Administrator permissions to create app registrations and assign roles
    
-   **Global Administrator** permissions are necessary for creating app registrations and granting admin consent
    
-   **User Access Administrator** permissions are required for tenant-level integration role assignments at tenant root
    
-   **Subscription Owner** or **User Access Administrator** permissions for subscription-level integration
    
-   Terraform is required
    

## Integration Process

### Step 1: Initiate Integration Setup

1.  Navigate to the Integrations section in your PGP dashboard
    
2.  Click "Add Integration" and select "Azure"
    
3.  Choose your integration scope and provide the required information
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580fb4a21178a432e029fb/019b7ffd-553b-75e5-b08d-c77243a480f9/b64u-MDE5YjdmZmQtNTRlMy03NDI3LWJmMWMtMzM1MWY4YWYyYWM0.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=dfb040f14003bc47d3a765b18613864c621c0119d457ac34b5ab58f50a38a3e8)

#### Tenant-Level Integration (Recommended)

For tenant-level integration, you'll need to provide:

-   **Tenant ID**: Your Azure AD tenant ID (GUID format)
    
-   **Deployment Type**: Choose Terraform
    

**TIP**: To get your Tenant ID, navigate to Azure Active Directory (or Microsoft Entra ID) in the Azure Portal. The tenant ID is displayed in the Overview section, or you can find it in the URL when viewing your directory.

#### Subscription-Level Integration

For subscription-level integration, you'll need to provide:

-   **Tenant ID**: Your Azure AD tenant ID (GUID format)
    
-   **Subscription ID**: The specific Azure subscription ID you want to integrate
    
-   **Deployment Type**: Choose Terraform
    

### Step 2: Download Integration Template

After providing your tenant information, PGP will generate the appropriate deployment template. This template is generated dynamically based on the information you provided.

1.  Click "Download IAC Template" to download the deployment files
    
2.  The template contains the app registration configuration, federated credentials, and role assignments pre-configured with your unique subject ID
    
3.  On submission, the next step will ask for an "Application ID", which you will get after completing the infrastructure deployment
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580fb4a21178a432e029fb/019b7ffd-5577-7167-b249-5ccfc538197a/b64u-MDE5YjdmZmQtNTUzNy03NzA5LWE4ZTItMWE3ODFhNTJiODkz.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=5075ae6060527cd6a28de1d330d2f65a3a5f2dc3e487a0fd2553f54fab7bd727)

### Step 3: Deploy the Template

Perform the necessary tasks based on the deployment task you chose above. Please make sure to complete this deployment successfully before completing the integration.

#### Terraform Deployment (Recommended)

Open Azure Cloud Shell or ensure you're authenticated to Azure within your workstation (you will need to ensure Terraform is installed; Azure Cloud Shell comes pre-installed with Terraform).

Ensure that the credentials you signed in with possess the necessary administrator privileges:

-   **Global Administrator**
    
-   **User Access Administrator**
    
-   **Subscription Owner** (for subscription-level integration)
    

If you're integrating at the tenant level, ensure you have access to manage the tenant root management group. To be able to consent to the new application at the tenant root level, you need to grant yourself User Access Administrator, even as a Global Administrator. See the following screenshot to identify where to enable that access:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580fb4a21178a432e029fb/019b7ffd-5625-7d94-b7ed-5c610f99d949/b64u-MDE5YjdmZmQtNTVhNi03OWY4LWI1MjQtZmM2NmJmYzM3MjVl.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=bd0726938c053568d09ecb3832515e543e60845d771e204b5d80aae959043234)

If you're integrating a single subscription, set CLI to use that subscription:

```
az account set --subscription "YOUR_SUBSCRIPTION_ID"
```

Create a new directory, initialize Terraform, and create a plan:

```
mkdir PGP-deployment && cd PGP-deployment
```

Upload the template from previous step to this directory

```
terraform init && terraform plan
```

Review the planned changes and save to a file if necessary. Once satisfied, apply the changes and monitor for deployment errors:

```
terraform apply
```

Ensure there are no errors during deployment, then observe the output at the end of the execution output. The deployment will produce an Application ID, which you need to provide back to PGP.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580fb4a21178a432e029fb/019b7ffd-5963-7ddc-a5b5-a8e5b4410fb5/b64u-MDE5YjdmZmQtNTkyZS03YjFmLTljMmMtYWIyODJkODMxNmE1.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=51d6905fb7a61ec0331087a539e6919b3e4ca4c6fd1d1f7cd9a33ccac7753fda)

Under the hood, the Terraform template performs a number of actions. More specifically, for the tenant-level integration, the template will:

-   Create an Azure AD app registration for PGP and its service principal
    
-   Automatically grant admin consent for all API permissions
    
-   Set up federated identity credential with PGP's Cognito pool and your unique subject identifier
    
-   Configure required Microsoft Graph API permissions
    
-   Assign Security Reader role at tenant root management group scope
    
-   Elevate access to manage all Azure subscriptions and management groups
    

For a subscription-level integration, the template will perform similar actions:

-   Similar steps as the tenant-level permissions
    
-   Assign Security Reader role at the specific subscription scope selected for integration
    

### Step 4: Complete Integration

1.  After deploying the template or completing manual setup, return to the PGP integration modal
    
2.  Enter the **Application ID** value provided as an output of your deployment
    
3.  Click "Finish" to complete the integration
    

PGP will automatically:

-   Validate the integration by authenticating with Cognito
    
-   Perform OIDC token exchange with Azure Entra ID for both ARM and Microsoft Graph tokens
    
-   Verify validity of access using simple Azure API calls
    
-   Add the integration to your integrations list upon successful validation
    

## Extending Your Azure Integration with Azure DevOps

Once you have completed the Azure cloud integration above, you can extend it to include Azure DevOps for repository scanning and work item management. This approach uses Azure Entra ID authentication through the same Guard Application created by the Terraform template, which is more secure than standalone PAT-based authentication.

### Adding the Guard Application to Azure DevOps

To enable Azure DevOps integration through your existing Azure cloud connection, you will need to manually add the Guard Application ID (output from the Terraform deployment) to Azure DevOps and configure the appropriate access.

1.  **Set Access Level**: Add the Guard Application as a user in your Azure DevOps organization and assign it access level “Basic”.
    
2.  **Grant Access to Projects**: Provide the Guard Application with access to the desired Azure DevOps projects that you want PGP to scan.
    
3.  **Configure Group Permissions**: Add the Guard Application to the correct security group within those projects. At a minimum, the application needs **Read** access for repository discovery and secret scanning. If you also want PGP to create and manage **Azure DevOps Work Items** for security findings, **Read & Write** access is required.
    

**Permissions Are Environment-Specific** — The exact steps to configure these permissions depend heavily on your organization's Azure DevOps permissions setup. You may need to create a separate security group or a dedicated Area within the Board for Guard to be able to create and read issues. Consult your Azure DevOps administrator if you are unsure about the correct group or area configuration.

### What This Enables

-   **Repository Discovery & Secret Scanning** (Read access): PGP will discover your Azure DevOps Git repositories and scan them for hardcoded secrets and credentials using Titus.
    
-   **Work Item Ticketing** (Read & Write access): PGP can automatically create Azure DevOps Work Items for discovered security findings and sync their status bidirectionally.
    

## Support and Troubleshooting

If you encounter any issues during the Azure integration process or need additional assistance, our support team is here to help. Please don't hesitate to reach out to **support@praetorian.com** with:

-   Details about your integration setup (tenant-level or subscription-level)
    
-   Any error messages encountered during deployment
    
-   Screenshots of relevant Azure portal configurations
    
-   Your Application ID and Tenant ID for reference
    

Our team will work with you to resolve any integration challenges and ensure your Azure environment is properly connected to PGP for comprehensive security monitoring.

## Extending Your Azure Integration with Azure DevOps

Once you have completed the Azure cloud integration above, you can extend it to include Azure DevOps for repository scanning and work item management. This approach uses Azure Entra ID authentication through the same Guard Application created by the Terraform template, which is more secure than standalone PAT-based authentication.

### Adding the Guard Application to Azure DevOps

To enable Azure DevOps integration through your existing Azure cloud connection, you will need to manually add the Guard Application ID (output from the Terraform deployment) to Azure DevOps and configure the appropriate access.

1.  **Set Access Level**: Add the Guard Application as a user in your Azure DevOps organization and assign it an appropriate access level (e.g., Basic or Stakeholder, depending on required capabilities).
    
2.  **Grant Access to Projects**: Provide the Guard Application with access to the desired Azure DevOps projects that you want PGP to scan.
    
3.  **Configure Group Permissions**: Add the Guard Application to the correct security group within those projects. At a minimum, the application needs **Read** access for repository discovery and secret scanning. If you also want PGP to create and manage **Azure DevOps Work Items** for security findings, **Read & Write** access is required.
    

**Permissions Are Environment-Specific** — The exact steps to configure these permissions depend heavily on your organization's Azure DevOps permissions setup. You may need to create a separate security group or a dedicated Area within the Board for Guard to be able to create and read issues. Consult your Azure DevOps administrator if you are unsure about the correct group or area configuration.

### What This Enables

-   **Repository Discovery & Secret Scanning** (Read access): PGP will discover your Azure DevOps Git repositories and scan them for hardcoded secrets and credentials using Titus.
    
-   **Work Item Ticketing** (Read & Write access): PGP can automatically create Azure DevOps Work Items for discovered security findings and sync their status bidirectionally.
