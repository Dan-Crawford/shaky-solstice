---
title: "Google Cloud Platform - Manual Deployment"
description: "Google Cloud Platform - Manual Deployment"
featurebaseId: "37956553886107"
---

This section covers the manual deployment process for integrating Google Cloud Platform with the Praetorian Guard Platform (PGP). While this method provides complete control over each step, we recommend using the Terraform/IaC approach for better consistency and maintainability. Manual deployment requires creating several GCP resources through the Google Cloud Console, with separate processes for organization-level and project-level integrations.

**Important:** Manual deployment is more complex and error-prone than the automated Terraform method. Consider using the IaC approach unless you have specific requirements that necessitate manual configuration.

The initial process is the same as the IaC deployment. When you select **Manual** as the deployment type, the PGP UI will provide you with a **Subject** value unique to your environment. Make a note of this value before proceeding with the resource creation steps below.

## **Organization-Level Integration**

### **Step 1: Create Integration Project**

1.  Go to the [GCP Console](https://console.cloud.google.com/)
    
2.  Click the project dropdown and select "New Project"
    
3.  Set project name: Praetorian PGP Integration
    
4.  Set project ID: praetorian-PGP-integration
    
5.  Link a billing account to the project as needed (note: the required resources do not incur any cost, but a billing account is necessary to enable required APIs within GCP)
    

### **Step 2: Enable Required APIs**

1.  Navigate to "APIs & Services" > "Library"
    
2.  Ensure the following APIs are enabled:
    
    *   Identity and Access Management (IAM) API
        
    *   Security Token Service API
        
    *   Cloud Resource Manager API
        

### **Step 3: Create Service Account**

1.  Navigate to "IAM & Admin" > "Service Accounts"
    
2.  Click "Create Service Account"
    
3.  Set service account details:
    
    *   **Service account name**: praetorian-chariot
        
    *   **Service account ID**: praetorian-chariot
        
    *   **Description**: Service account for Praetorian Guard Integration
        
4.  Click "Create and Continue"
    
5.  Follow the prompts to deploy the service account without adding permissions
    

_Note: the specific values that reference “chariot”, the previous application name, are required for the service account name and ID._

### **Step 4: Grant Organization-Level Permissions**

1.  Navigate to "IAM & Admin" > "IAM"
    
2.  Change scope to your organization (click project dropdown > select organization)
    
3.  Click "Grant Access"
    
4.  Add the service account email: [praetorian-PGP@praetorian-PGP-integration.iam.gserviceaccount.com](mailto:praetorian-PGP@praetorian-PGP-integration.iam.gserviceaccount.com)
    
5.  Assign the following roles:
    
    *   **Viewer**
        
    *   **Organization Policy Viewer**
        
    *   **Role Viewer**
        
    *   **Security Reviewer**
        
    *   **Compute Viewer**
        
    *   **App Engine Viewer**
        
    *   **Cloud Asset Viewer**
        
6.  The "Assign Roles" pane should look like shown below:
    
    ![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f79a21178a432dfa8d9/019b7ffc-6d1c-714e-9caf-dd75fd112665/b64u-MDE5YjdmZmMtNmNhNi03ODMxLWIwNWYtYzJiN2ZjZjU4YThl.png?X-Amz-Expires=3600&X-Amz-Date=20260401T080000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260401%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=061c5c371eee2354bc054a9cebf6370b300309d9196976ac6be84db964707195)

### **Step 5: Create Workload Identity Pool**

1.  Navigate to "IAM & Admin" > "Workload Identity Federation"
    
2.  Click "Create Pool"
    
3.  Set pool details:
    
    *   **Pool name**: praetorian-chariot-pool
        
    *   **Pool ID**: praetorian-chariot-pool
        
    *   **Description**: Workload identity pool for Praetorian PGP Integration
        
4.  Click "Continue"
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f79a21178a432dfa8d9/019b7ffc-6c35-7cc5-9b92-8185caf5bde5/b64u-MDE5YjdmZmMtNmJhYi03MmZhLTg1OGYtMzU5ODUxZmY0MGI4.png?X-Amz-Expires=3600&X-Amz-Date=20260401T080000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260401%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=7b31922a00412456abca484ce45e65a87580a99161cd9ebc5d920c9db496bbdf)

### **Step 6: Create Workload Identity Provider**

1.  In the pool creation flow, click "Add Provider"
    
2.  Select provider type: "OpenID Connect (OIDC)"
    
3.  Set provider details:
    
    *   **Provider name**: praetorian-chariot-provider
        
    *   **Provider ID**: praetorian-chariot-provider
        
    *   **Issuer URL**: [https://cognito-idp.us-east-2.amazonaws.com/](https://cognito-idp.us-east-2.amazonaws.com/)us-east-2\_zwCio82YL
        
    *   **Allowed audiences**: 5p3de4lul8h97k3fmk72spesch
        
4.  At this stage, your provider should look like the following screenshot
    
    ![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f79a21178a432dfa8d9/019b7ffc-6d61-7ff3-9f9c-adb5d99041da/b64u-MDE5YjdmZmMtNmNjZS03NmZhLTk1OWEtMDRmZTk0MTExZjIz.png?X-Amz-Expires=3600&X-Amz-Date=20260401T080000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260401%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=4a181777b3740c35527e1fc5289533540b446777414e02d52cecc84b6241eccb)
5.  For the next step, configure attribute mapping:
    
    *   **google.subject**: assertion.sub
6.  Set attribute condition: google.subject=="YOUR-UNIQUE-USERNAME" (this is the Subject value PGP provided you in Step 1)
    
    ![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f79a21178a432dfa8d9/019b7ffc-7259-70cb-b3e8-827cc33e66c3/b64u-MDE5YjdmZmMtNzFlZC03MTQ5LTk3YjMtMDUxNTAwYzAyZTIx.png?X-Amz-Expires=3600&X-Amz-Date=20260401T080000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260401%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=288c55850fb955ec8b86299a764fa51aa796e7eb047cdfb33cebda551e52fa9d)
7.  Make sure that the condition is set appropriately, as this is a requirement to prevent confused deputy attacks
    
8.  Click "Save"
    

### **Step 7: Configure Service Account Impersonation**

1.  Visit your newly created pool and make note of your pool's IAM Principal
    
2.  Go to "IAM & Admin" > "Service Accounts"
    
3.  Click on the praetorian-PGP service account
    
4.  Go to the "Permissions" tab
    
5.  Click "Grant Access"
    
6.  Add the principal noted earlier: principal://iam.googleapis.com/projects/PROJECT-NUMBER/locations/global/workloadIdentityPools/praetorian-PGP-pool/subject/SUBJECT\_ATTRIBUTE\_VALUE (ensure the project-number and subject attribute value are correct per your deployment)
    
7.  Make a note of the PROJECT\_NUMBER in the principal string, this is the value for the **Infrastructure ID** that you will provide back to PGP to verify the deployment
    
8.  Assign role: "Workload Identity User"
    
    ![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f79a21178a432dfa8d9/019b7ffc-720e-72ab-9806-e379658af9ef/b64u-MDE5YjdmZmMtNzFkNC03YTg1LWJkY2YtOGM1ODM2ZmFhNmJh.png?X-Amz-Expires=3600&X-Amz-Date=20260401T080000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260401%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=15420d3364e62f7bce0ad8db994c1705e54a1211d6c1588d27409195f3cb5245)
9.  Click "Save"
    

### **Step 8: Complete Integration**

Retrieve the Project Number value for the project where the workload identity pool is deployed. Most simply, this value is present within the Principal Name for the workload identity pool.

## **Project-Level Integration**

If you selected an organization-level integration, all your projects should automatically be integrated. Follow these steps only if you wish to integrate individual projects.

### **Step 1: Create Service Account**

1.  Navigate to your target project in the GCP Console
    
2.  Go to "IAM & Admin" > "Service Accounts"
    
3.  Click "Create Service Account"
    
4.  Set service account details:
    
    *   **Service account name**: praetorian-PGP
        
    *   **Service account ID**: praetorian-PGP
        
    *   **Description**: Service account for Praetorian PGP Integration
        
5.  Click "Create and Continue"
    

### **Step 2: Grant Project-Level Permissions**

1.  Navigate to "IAM & Admin" > "IAM"
    
2.  Set the scope to your project
    
3.  In the service account creation flow, assign project roles:
    
    *   **Viewer**
        
    *   **Security Reviewer**
        
    *   **Compute Viewer**
        
    *   **App Engine Viewer**
        
    *   **Cloud Asset Viewer**
        
4.  Click "Continue" and then "Done"
    

### **Step 3: Grant Organization-Level Permissions**

1.  Navigate to "IAM & Admin" > "IAM"
    
2.  Change scope to your organization
    
3.  Click "Grant Access"
    
4.  Add the service account email
    
5.  Assign the following roles:
    
    *   **Organization Policy Viewer**
        
    *   **Organization Role Viewer**
        
6.  Create and assign a custom role with permissions:
    
    *   resourcemanager.folders.get
        
    *   resourcemanager.folders.getIamPolicy
        
    *   resourcemanager.folders.list
        

### **Step 4: Create Workload Identity Pool**

Follow the same steps as organization-level integration (Steps 5-7), but create the pool within your target project instead of the dedicated integration project.

## **Completing Your Manual Integration**

After completing all manual deployment steps, return to the PGP integration modal and enter the Project Number (Infrastructure ID) you noted during the service account impersonation configuration. Click "Finish" to complete the integration process.

PGP will validate the integration by performing OIDC token exchange with your Workload Identity Provider and testing the configured permissions. Once validated, your GCP integration will appear in your integrations list and begin monitoring your GCP environment.

## **Need Help?**

If you encounter any issues during the manual deployment process or have questions about the integration setup, please contact our support team at [**support@praetorian.com**](mailto:support@praetorian.com). Include your Project Number (Infrastructure ID) and any error messages you've encountered to help us assist you more effectively.
