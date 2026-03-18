---
title: "Microsoft Azure - Manual Deployment"
description: "Microsoft Azure - Manual Deployment"
featurebaseId: "1040240"
---

This section covers the manual deployment process for integrating Azure with Praetorian Guard Platform (PGP). While this method provides complete control over each step, we recommend using the Terraform/IaC approach for better consistency and maintainability. Manual deployment requires creating several Azure resources through the Azure Portal, with the process being similar for both tenant-level and subscription-level integrations.

**Important:** Manual deployment is more complex and error-prone than the automated Terraform method. Consider using the IaC approach unless you have specific requirements that necessitate manual configuration.

Manual deployment requires creating several Azure resources through the Azure portal. The process is similar for both scopes, with role assignment being the key difference.

## **Prerequisites**

Before starting the integration, ensure you have:

-   Azure portal access with **Global Administrator** permissions to create app registrations and assign roles
    
-   **User Access Administrator** permissions are required for tenant-level integration role assignments at tenant root
    
-   **Subscription Owner** or **User Access Administrator** permissions for subscription-level integration
    

## **Integration Process**

### Step 1: Initiate Integration Setup

1.  Navigate to the Integrations section in your PGP dashboard
    
2.  Click "Add Integration" and select "Azure"
    
3.  Choose your integration scope and provide the required information
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580fdea21178a432e0841f/019b7ffd-f583-7dc1-8d3e-ae3cb4547092/b64u-MDE5YjdmZmQtZjU0Yi03NGIzLWIwYmQtMzI3Yjk1ZmZiOGVj.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=ee1df67438e4ec8785872dd0a27b17cda44e586d81af5eca04fc2729126c5a16)

#### Tenant-Level Integration (Recommended)

For tenant-level integration, you'll need to provide:

-   **Tenant ID**: Your Azure AD tenant ID (GUID format)
    
-   **Deployment Type**: Choose Manual
    

**TIP**: To get your Tenant ID, navigate to Azure Active Directory (or Microsoft Entra ID) in the Azure Portal. The tenant ID is displayed in the Overview section, or you can find it in the URL when viewing your directory.

#### Subscription-Level Integration

For subscription-level integration, you'll need to provide:

-   **Tenant ID**: Your Azure AD tenant ID (GUID format)
    
-   **Subscription ID**: The specific Azure subscription ID you want to integrate
    
-   **Deployment Type**: Choose Manual
    

### Step 2: Record Your Unique Subject

PGP will provide you with a unique Subject value. This will be used in a future step to assign the subject match condition for the OIDC integration.

**NOTE:** This value is unique per integration attempt. This means an unlikely failure invalidates that value and any new attempt requires the use of the new subject value (which PGP will generate and provide as shown below).

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580fdea21178a432e0841f/019b7ffd-f452-7cef-8e9d-c243137f1c3e/b64u-MDE5YjdmZmQtZjQzNi03OTJmLThjOWMtZDVmNWZmYTNlZWNj.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=fa3d836f6590dfbff4429498ff648b613d71cb584881f7db658eb148891b167c)

## **Manual Deployment Instructions**

##### **Step 1: Create App Registration**

1.  Sign in to the [Azure Portal](https://portal.azure.com/)
    
2.  Navigate to "Azure Active Directory" (or "Microsoft Entra ID")
    
3.  Go to "App registrations" > "New registration"
    
4.  Set application details:
    
    -   **Name**: Praetorian PGP Integration
        
    -   **Supported account types**: "Accounts in this organizational directory only"
        
    -   **Redirect URI**: Leave blank
        
5.  Click "Register"
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580fdea21178a432e0841f/019b7ffd-f56c-76e9-a385-9bd3d33c3240/b64u-MDE5YjdmZmQtZjUxMC03ZmM2LTgwMDItOWM1MGM5ZmVlYzU2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c041bc1c6ed90df8444f9e0919dbfe3691df93dfa1d126f37ca9017cfbb77c3c)

##### **Step 2: Configure API Permissions**

1.  In your app registration, go to "API permissions"
    
2.  Click "Add a permission" > "Microsoft Graph" > "Application permissions"
    
3.  Add the following permissions:
    
    -   Directory.Read.All
        
    -   Policy.Read.All
        
    -   RoleManagement.Read.All
        
    -   RoleManagement.Read.Directory
        
    -   RoleEligibilitySchedule.Read.Directory
        
    -   RoleManagementPolicy.Read.AzureADGroup
        
    -   RoleManagementPolicy.Read.Directory
        
4.  Assign the Global Reader Entra role ([more information here](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-reader)) to the App Registration
    

##### **Step 3: Grant Admin Consent**

1.  In the "API permissions" section, click "Grant admin consent for \[Your Organization\]"
    
2.  Confirm the consent by clicking "Yes"
    
3.  Verify all permissions show "Granted for \[Your Organization\]" status
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580fdea21178a432e0841f/019b7ffd-fb99-7fb0-b757-88b431ce64e0/b64u-MDE5YjdmZmQtZmFlNi03M2NlLTgzYzUtMDZiNjM3OGZkZjIy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=5e1c7882bf0fdec3946e33c33edd672baded4ebf99bf601ae535f6e9ea380e13)

##### **Step 4: Create Federated Identity Credential**

1.  In your app registration, go to "Certificates & secrets"
    
2.  Click the "Federated credentials" tab
    
3.  Click "Add credential"
    
4.  Select "Other issuer" as the federated credential scenario
    
5.  Set credential details:
    
    -   **Issuer**: https://cognito-idp.us-east-2.amazonaws.com/us-east-2\_zwCio82YL
        
    -   **Subject identifier**: YOUR-UNIQUE-USERNAME (the subject value from Step 2 of "Integration Process")
        
    -   **Audience**: 5nbjkqbdhuf5rnn9m9ko5v3ir1
        
    -   **Name**: FederationChariot (“Chariot” is required, rather than PGP)
        
    -   **Description**: Federated credential for PGP
        
6.  Click "Add"
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580fdea21178a432e0841f/019b7ffd-fac1-7894-aeca-b880d7cf72d5/b64u-MDE5YjdmZmQtZjlkMS03YzQyLWE4YWItZTQ5Y2Y4OGMzZjQ2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=579c044476b76117137238793a937089d1f824dbc015a1f31e84a452639c875e)

##### **Step 5: Assign the Reader Role**

The role assignment process differs based on your integration scope:

**For Tenant-Level Integration:**

1.  Navigate to "Management groups" in the Azure Portal
    
2.  Select your tenant root management group (named with your tenant ID)
    
3.  Go to "Access control (IAM)"
    
4.  Click "Add" > "Add role assignment"
    
5.  Select "Reader" role
    
6.  Click "Next"
    
7.  Choose "User, group, or service principal"
    
8.  Click "Select members"
    
9.  Search for and select "Praetorian PGP Integration"
    
10.  Click "Select" > "Review + assign" > "Assign"
     

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580fdea21178a432e0841f/019b7ffd-fadd-73bf-834e-6b25fe65b475/b64u-MDE5YjdmZmQtZmEwYy03NTM1LTlhMWUtODc4NmM5OGFjMzc0.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=863dbbb115a1e61f0da823eb0cb0667f3fa55c92a98780ede5bd93f7ec612193)

**For Subscription-Level Integration:**

1.  Navigate to "Subscriptions" in the Azure Portal
    
2.  Select your target subscription
    
3.  Go to "Access control (IAM)"
    
4.  Click "Add" > "Add role assignment"
    
5.  Select "Reader" role
    
6.  Follow the same member selection process as above
    

##### **Step 6: Record Application Details**

1.  Go back to your app registration "Overview" page
    
2.  Copy the "Application (client) ID" - this will be needed for verification
    
3.  Note the "Directory (tenant) ID" for reference
    
4.  Provide the information back to PGP
    

## **Completing Your Manual Integration**

After completing all manual deployment steps, return to the PGP integration modal and enter the Application (client) ID you recorded in Step 6. Click "Finish" to complete the integration process.

PGP will validate the integration by performing authentication tests and verifying the configured permissions. Once validated, your Azure integration will appear in your integrations list and begin monitoring your Azure environment.

## **Extending Your Azure Integration with Azure DevOps**

Once you have completed the Azure cloud integration above, you can extend it to include Azure DevOps for repository scanning and work item management. This approach uses Azure Entra ID authentication through the same Guard Application you created, which is more secure than standalone PAT-based authentication.

### Adding the Guard Application to Azure DevOps

To enable Azure DevOps integration through your existing Azure cloud connection, you will need to manually add the Guard Application ID (the App Registration you created during the integration steps above) to Azure DevOps and configure the appropriate access.

1.  **Set Access Level**: Add the Guard Application as a user in your Azure DevOps organization and assign it access level “Basic” .
    
2.  **Grant Access to Projects**: Provide the Guard Application with access to the desired Azure DevOps projects that you want PGP to scan.
    
3.  **Configure Group Permissions**: Add the Guard Application to the correct security group within those projects. At a minimum, the application needs **Read** access for repository discovery and secret scanning. If you also want PGP to create and manage **Azure DevOps Work Items** for security findings, **Read & Write** access is required.
    

**Permissions Are Environment-Specific** — The exact steps to configure these permissions depend heavily on your organization's Azure DevOps permissions setup. You may need to create a separate security group or a dedicated Area within the Board for Guard to be able to create and read issues. Consult your Azure DevOps administrator if you are unsure about the correct group or area configuration.

### What This Enables

-   **Repository Discovery & Secret Scanning** (Read access): PGP will discover your Azure DevOps Git repositories and scan them for hardcoded secrets and credentials using Titus.
    
-   **Work Item Ticketing** (Read & Write access): PGP can automatically create Azure DevOps Work Items for discovered security findings and sync their status bidirectionally.
    

## **Need Help?**

If you encounter any issues during the manual deployment process or have questions about the integration setup, please contact our support team at [**support@praetorian.com**](mailto:support@praetorian.com). Include your Application ID and any error messages you've encountered to help us assist you more effectively.
