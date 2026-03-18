---
title: "Amazon Web Services - Manual Deployment"
description: "Amazon Web Services - Manual Deployment"
featurebaseId: "9576880"
---

This guide walks you through manually integrating your AWS environment with Praetorian Guard Platform (PGP) to enable comprehensive security monitoring and vulnerability assessment across your cloud infrastructure. While we recommend using our Infrastructure as Code (IaC) integration for automated deployment and easier maintenance, the manual deployment process gives you full control over the integration setup while ensuring secure, read-only access to your AWS resources.

## **Prerequisites**

Before starting the integration, ensure you have:

-   AWS CLI or console access with sufficient permissions to create IAM roles, policies, and Cloudformation stacks
    
-   Organization management administrator permissions (for Organization-level integration)
    
-   Account administrator permissions (for individual account integration)
    

## **Integration Process**

### **Step 1 - Initiate Integration Setup**

1.  Navigate to the Integrations section in your PGP dashboard
    
2.  Click "Add Integration" and select "AWS"
    
3.  Choose your integration scope and follow the prompts
    

We recommend you integrate at the Organization level for more comprehensive and accurate coverage of security weaknesses across your environment. For Organization-level integration, you'll need to provide:

-   **Account ID**: Your AWS management account ID (12-digit number)
    
-   **Deployment Type**: Manual
    

For individual account integration, you'll need to provide:

-   **Account ID**: The specific AWS account ID you want to integrate
    
-   **Deployment Type**: Manual
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f15a21178a432deedad/019b7ffa-ed2d-7190-bc0a-2fea3bbca00f/b64u-MDE5YjdmZmEtZWNiZC03OWViLTk0ZjAtNDc3OWNhN2FlZDhm.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=913a35f07cf4ec375f8e24ea3b12d534d023955731e62bb06e226a8907330487)

### **Step 2 - Create Cloud Resources**

The system generates a unique external ID for this integration when you submit the form with the required account information.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f15a21178a432deedad/019b7ffa-ec72-7d45-addf-7ccb9dd2faea/b64u-MDE5YjdmZmEtZWM0ZS03YzljLThmNWQtMTVhYjNiZjAxZGI2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=3c8393743de5c4054f40e63fafc3141af20f50d384e33ebb19bd934daa62ec1e)

Copy this external ID as you will user it in AWS later.

1.  Create an IAM role with the following configuration:
    
    -   **Role Name**: PGP-integration-role
        
    -   **Trust Policy**: Allow PGP's AWS account to assume the role with your unique external ID (this is shown in the PGP integration set-up modal)
        
    -   **Permissions**: Attach the following AWS managed policies:
        
        -   ReadOnlyAccess
            
        -   SecurityAudit
            
        -   AmazonInspector2ReadOnlyAccess
            
    -   **Additional Permissions**: Create an inline policy with the following permissions:
        

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "a4b:Get*",
        "account:Get*",
        "codeartifact:List*",
        "drs:Describe*",
        "glue:GetConnections",
        "lambda:GetFunctionUrlConfig",
        "securityhub:BatchImportFindings",
        "ssm-incidents:List*",
        "support:Describe*",
        "wellarchitected:List*"
      ],
      "Resource": "*"
    }
  ]
}
```

2.  **Trust Policy**: Set the trust policy as follows after adding your unique external ID from above
    

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::992382785633:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "YOUR-UNIQUE-EXTERNAL-ID"
        }
      }
    }
  ]
}
```

**NOTE:** If you prefer manual setup (as opposed to infrastructure as code), you must ensure the appropriate role is created in **ALL** accounts (including the Organization management account) for the Organization-level integration.

**NOTE**: When integrating at the Organization level, if you do not create the role in the Organization management account for a full integration, our workloads will not be able to retrieve information about other accounts and the integration will not yield results.

### **Step 3 - Complete the Integration**

1.  After creating the necessary resources, return to the PGP integration modal
    
2.  Click "Finish" to complete the integration
    

When you do this, PGP will automatically:

-   Validate the integration by attempting to assume the deployed role
    
-   Verify validity of access to your AWS environment
    
-   Add the integration to your integrations list upon successful validation
    

## **Next Steps**

Once your AWS integration is successfully configured, PGP will begin discovering and analyzing your cloud infrastructure. PGP is now able to inventory your resources and identify potential security vulnerabilities.

Monitor your integration status in PGP, where you'll be able to view discovered assets, security findings, and compliance assessments across your AWS environment.

## **Support**

If you encounter any issues during the integration process or need assistance with troubleshooting, please don't hesitate to reach out to our support team at [**support@praetorian.com**](mailto:support@praetorian.com). Our team is ready to help ensure your AWS integration is configured correctly and operating smoothly.
