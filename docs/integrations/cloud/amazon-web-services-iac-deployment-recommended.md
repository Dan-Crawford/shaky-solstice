---
title: "Amazon Web Services - IaC Deployment (Recommended)"
description: "Amazon Web Services - IaC Deployment (Recommended)"
featurebaseId: "4450089"
---

The Praetorian Guard Platform (PGP) provides AWS integrations at both the Organization level and individual account level. Praetorian recommends integrating at the Organization level for the most comprehensive coverage and experience. This guide walks you through deploying the necessary infrastructure as code (IaC) using either Terraform or CloudFormation to establish secure connectivity between your AWS environment and PGP.

Note: AWS environments with Control Tower should follow the IaC setup guide.

## **Prerequisites**

Before starting the integration, ensure you have:

-   AWS CLI or console access with sufficient permissions to create IAM roles, policies, and Cloudformation stacks
    
-   Organization management administrator permissions (for Organization-level integration)
    
-   Account administrator permissions (for individual account integration)
    
-   If you chose to deploy the IaC using Terraform, ensure access to AWS Cloudshell or an authenticated workstation with Terraform pre-installed
    

## **Integration Process**

### **Step 1 - Initiate Integration Setup**

1.  Navigate to the Integrations section in your PGP dashboard
    
2.  Click "Add Integration" and select "AWS"
    
3.  Choose your integration scope and provide the required information
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f02a21178a432dec5f5/019b7ffa-9c16-733c-b9e1-6f9ab27d90f7/b64u-MDE5YjdmZmEtOWIzMy03MTNhLThjMzktMDEwYjkyZWY0MjY5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=0804663f5a26c865b1e7e60e95d32934b2fc8bf02fe9f45aaa2cb6b892897fde)

#### **Organization-Level Integration (Recommended)**

We recommend you integrate at the Organization level for more comprehensive and accurate coverage of security weaknesses across your environment. For Organization-level integration, you'll need to provide:

-   **Account ID**: Your AWS management account ID (12-digit number)
    
-   **Deployment Type**: Choose from CloudFormation (recommended) or Terraform
    

#### **Individual Account Integration**

Ideally, individual account integrations are meant for accounts not part of an Organization. For individual account integration, you'll need to provide:

-   **Account ID**: The specific AWS account ID you want to integrate
    
-   **Deployment Type**: Choose from CloudFormation (recommended) or Terraform
    

Once provided, click Submit to move to the next step.

### **Step 2 - Download Integration Template**

After providing your account information, PGP will generate the appropriate deployment template.

-   Click "Download IAC Template" to download the deployment files
    
-   The template contains all necessary IAM roles and policies pre-configured with your unique external ID
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f02a21178a432dec5f5/019b7ffa-9c0f-7fab-920d-7cafa804c803/b64u-MDE5YjdmZmEtOWIzMi03MTUwLTlhNDMtZjUwZmVmYzg3MTEz.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=7e7f740eb9af04bb78b74b9f8226cd739f6c9f234193903be72e8f0afb2b673d)

You can only proceed to the next step once you've downloaded the template. Make sure to deploy your template successfully before proceeding to the next step.

### **Step 3 - Deploy the Template**

Please see details based on your selected option (deployment type of Cloudformation or Terraform).

#### **CloudFormation Deployment (Recommended)**

1.  Sign in to your AWS Management Console (please confirm it’s your Organization management account; you can do so by visiting the AWS Organizations console and ensuring the management account ID matches the ID shown on the top right of the UI. See the screenshot below)
    
    ![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f02a21178a432dec5f5/019b7ffa-9d9d-7784-965f-1a33bb45c791/b64u-MDE5YjdmZmEtOWIyYy03NjMyLWE2YTMtYmM3ODY2YzI1NWI4.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=edd5d35c1c4bed71d508f5c1577ea8aaaf446d557e0f6ff02c6edc578ff900c2)
2.  Navigate to AWS Organizations and _take note_ of your Organization's root OU ID (this is different from your Organization ID. See the screenshot below)
    
    ![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f02a21178a432dec5f5/019b7ffa-a0e1-7601-8b58-9b6f3302488a/b64u-MDE5YjdmZmEtYTA1NC03MWM0LTkxYjktNzJiMTc0YzY3ODMy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=7f7482ddd3d3255997409b366a70be19eacc34f6fe51ef55b51360b749caf338)
3.  Navigate to the CloudFormation service
    
4.  Click "Create stack" → "With new resources (standard)"
    
5.  Upload the CloudFormation template downloaded in the previous step
    
6.  Provide stack parameters:
    
    -   **Targets**: For Organization-level deployment, specify Organization ID (format: r-xxxx).
        
    -   You can also specify a specific Organizational Unit ID (format: ou-xxxx-xxxxxxxx); however, we strongly recommend an Organization-wide deployment to account for comprehensive coverage of global controls such as service control policies (SCPs) and resource control policies (RCPs)
        
    -   Leave the target empty if you’re performing a single AWS account integration
        
        ![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f02a21178a432dec5f5/019b7ffa-a1c8-733f-ac62-7f069ff6b764/b64u-MDE5YjdmZmEtYTBmMS03ZTEyLWJhY2UtY2U5YjA1YWUxZjIz.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=df3ff15ebc21921a0bd4f0b44c33f9772829ecfa2ac9a3974e4a07be6b5023ad)![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f02a21178a432dec5f5/019b7ffa-a08d-7925-97b8-e1e982f5f14d/b64u-MDE5YjdmZmEtYTAzYi03YzJiLWFlZDMtNTJlNDA1NWE4MzQ0.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=f1542ecf5db6348831b5f93448abffb08e972e072e9ad7b662560c491c7f32d6)
7.  Follow the instructions, review, and create the stack
    
8.  Wait for stack creation to complete (status: CREATE\_COMPLETE), and proceed to the next step only with a successful deployment
    

**For Organization-Level Deployment**: The template creates a StackSet that automatically deploys the PGP role across all accounts in your specified Organization (or OU IDs). New accounts added under the targets will automatically receive the role.

**For Individual Account Deployment**: The template creates a single IAM role in the specified account.

#### **Terraform Deployment**

The preferred integration method is through the Cloudformation. If you have already completed the integration by following the directions for Cloudformation integration above, you do not need to continue with the Terraform instructions.

You can deploy Terraform via CLI on a workstation or through AWS Cloudshell. Please ensure you’re logged into the session for the Organization management account for Organization-level integrations.

1.  Populate your working directory (or upload to Cloudshell) with the Terraform file downloaded in the previous step
    
2.  Initialize Terraform and review the planned changes:
    

```
terraform init terraform plan
```

3.  For Organization-level deployment, set the targets variable with the appropriate Organization Root ID:
    

```
terraform plan -var='targets=["r-xxxx"]'
```

4.  Apply the configuration:
    

```
terraform apply
```

**NOTE**: It is a good idea to maintain the Terraform state resulting from the deployment. However, keep in mind that the Terraform module deploys a StackSet similar to the Cloudformation method. This is the most efficient way to deploy roles across an AWS Organization.

### **Step 4 - Complete Integration**

1.  After deploying the template, return to the PGP integration modal
    
2.  Click "Finish" to complete the integration
    

When you do this, PGP will automatically:

-   Validate the integration by attempting to assume the deployed role
    
-   Verify validity of access to your AWS environment
    
-   Add the integration to your integrations list upon successful validation
    

## **Get Support**

Congratulations! Your AWS environment is now integrated with PGP and ready for security monitoring. If you encounter any issues during the integration process or need assistance with configuration, our support team is here to help. Please don't hesitate to reach out to **support@praetorian.com** for personalized assistance with your PGP deployment.
