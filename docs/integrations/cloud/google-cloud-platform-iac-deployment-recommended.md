---
title: "Google Cloud Platform - IaC Deployment (Recommended)"
description: "Google Cloud Platform - IaC Deployment (Recommended)"
featurebaseId: "37956600868635"
---

This guide walks you through connecting your GCP environment to Praetorian Guard Platform (PGP) for comprehensive security monitoring and management using Infrastructure as Code (IaC) deployment methods. The integration leverages GCP's Workload Identity Federation and IAM roles to provide PGP with the necessary permissions to assess your GCP resources while maintaining security best practices.

You can choose between Organization-level integration (recommended for full GCP environment coverage) or Project-level integration (for specific Project monitoring). The process involves creating service accounts, configuring Workload Identity Pools, and setting up the appropriate IAM bindings through automated Terraform deployment.

## **Prerequisites**

Before starting the integration, ensure you have:

-   GCP Console access with sufficient permissions to create Projects, service accounts, and Workload Identity Pools
    
-   Organization administrator permissions (for Organization-level integration)
    
-   Project editor/owner permissions (for Project-level integration)
    
-   Billing account access (for creating new Projects in Organization-level integration)
    
-   Terraform
    

## **Integration Process**

### **Step 1: Initiate Integration Setup**

1.  Navigate to the Integrations section in your PGP dashboard
    
2.  Click "Add Integration" and select "GCP"
    
3.  Choose your integration scope and provide the required information
    

### **Organization-Level Integration (Recommended)**

For Organization-level integration, you'll need to provide:

-   **Organization ID**: Your GCP Organization ID (numeric value)
    
-   **Deployment Type**: Choose from Terraform or Manual
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f57a21178a432df613a/019b7ffb-e424-74fe-b852-d5c4e1902b6d/b64u-MDE5YjdmZmItZTNkNy03MTY4LWE4NDEtMjgyZDkxNGYzYTZi.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=955b1e620ad46225b8343234162a699a7a67d86452e14be5a19cb1cd40ec39f5)

_TIP: To get your Organization ID, view the Project switcher in the Google Cloud Console. You can also search for your Organization name._

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f57a21178a432df613a/019b7ffb-e633-7e74-b1f9-e1ade6897496/b64u-MDE5YjdmZmItZTU4OC03NTQ2LTlkN2UtMDg5MDJmNjdkZDU5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=1b5d482575bb09cc39323211c293c746ee0fae0f18382325ee9763be97c7c139)

### **Project-Level Integration**

For Project-level integration, you'll need to provide:

-   **Organization ID**: Your GCP Organization ID (numeric value)
    
-   **Project ID**: The specific GCP Project ID you want to integrate
    
-   **Deployment Type**: Choose from Terraform or Manual
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f57a21178a432df613a/019b7ffb-e335-7675-85f4-2a3c9ae27846/b64u-MDE5YjdmZmItZTJmMS03ZDk4LTliNTktZjljMmUyZmNiNTY0.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=0202bcdb545d31e23bad93558dce29c498285e2e7056a7c299f5915fc6be7ef4)

### **Step 2: Download Integration Template**

After providing your Project information, PGP will generate the appropriate deployment template. This template is generated dynamically based on the information you provided.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f57a21178a432df613a/019b7ffb-e9e3-7d2e-8ffb-47cd4287b3a9/b64u-MDE5YjdmZmItZTk0OC03Y2E4LWEwYTUtYTdhZGNkN2VlMzhm.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=037fd2e3c0ca9c17fdbaeb2f710feeeec6f4682afe3cfdfa6337e115d113920a)

1.  Click "Download IAC Template" to download the deployment files
    
2.  The template contains all necessary service accounts, Workload Identity Pool, and IAM bindings pre-configured with your unique subject ID
    
3.  On submission, the next step will ask for an "**Infrastructure ID**", which you will get after completing the infrastructure deployment
    

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f57a21178a432df613a/019b7ffb-ea30-74b4-984b-0ecdcf9a2e79/b64u-MDE5YjdmZmItZTk5NS03ZmY4LTgwY2MtOWY5NmQyNzdlY2I1.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=29e125e056daf55cc048ba40baa53062b0c711e3b29463036361b6bd3ac38d92)

### **Step 3: Deploy the Template**

Perform the necessary tasks based on the deployment task you chose above. Please make sure to complete this deployment successfully before completing the integration.

### **Terraform Deployment (Recommended)**

1.  Open Google Cloud Shell or ensure authenticate to GCP within your workstation (you will need to ensure Terraform is installed; Google Cloud Shell comes pre-installed with Terraform):
    
    ```
    gcloud auth application-default login
    ```
    
2.  Ensure that the credentials you signed up with possess global administrator privileges (i.e., at the Organization scope)
    
3.  If you're integrating your GCP Organization, it's beneficial to unset your local Project:
    
    ```
    gcloud config unset project
    ```
    
4.  If you're integrating a single Project, set CLI to use that Project:
    
    ```
    gcloud config set project YOUR_PROJECT_ID
    ```
    
5.  Create a new directory, initialize Terraform, and create a plan:
    
    ```
    mkdir chariot-deployment && cd chariot-deployment
    ```
    
    **(Chariot is the old name of PGP and still exists in some automated workflows)**  
    
    Upload the template from previous step to this directory
    
    ```
    terraform init && terraform plan
    ```
    
6.  Review the planned changes and save to a file if necessary. Once satisfied, apply the changes and monitor for deployment errors:
    
    ```
    terraform apply
    ```
    
7.  Ensure there are no errors during deployment, then observe the output at the end of the execution output. The deployment will produce an infrastructure ID, which you need to provide back to PGP.
    
    ![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f57a21178a432df613a/019b7ffb-ec66-7a0a-a548-923b3502d87e/b64u-MDE5YjdmZmItZWFlMy03NjhlLWJlYzItODQ5MzJhM2FjMWFl.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=0969f266f7e5eff4dffe775e0871c71aedbc4ece2c7547b6b8d805379a0f220b)

Under the hood, the terraform template performs a number of actions. More specifically, for the Organization-level integration, the template will:

-   Create a new Project named **praetorian-chariot-integration**
    
-   Create a service account for Chariot integration
    
-   Grant Organization-level permissions to the service account
    
-   Set up a Workload Identity Pool and Provider
    
-   Configure federated identity credentials to trust PGP's identity pool with a strict subject match for your associated user in PGP
    

For a Project integration, the template will perform similar actions:

-   Create a service account for PGP integration
    
-   Grant Project-level and required but limited Organization-level permissions via a custom role
    
-   Set up Workload Identity Pool and Provider in your \[same\] Project
    
-   Configure federated identity credentials to trust PGP's identity pool with a strict subject match for your associated user in PGP
    

### **Step 4: Complete Integration**

1.  After deploying the template or completing manual setup, return to the PGP integration modal
    
2.  Enter the Infrastructure ID value provided as an output of your deployment
    
3.  Click "Finish" to complete the integration
    

PGP will automatically:

-   Validate the integration by authenticating with Cognito
    
-   Perform OIDC token exchange with your Workload Identity Provider
    
-   verify validity of access using a simple GCP API call
    
-   Add the integration to your integrations list upon successful validation
    

## **Next Steps**

Once your GCP integration is successfully validated and appears in your integrations list, PGP will begin monitoring your GCP environment. The system will automatically discover and assess your GCP resources, providing security insights and recommendations through your PGP dashboard.

## **Need Help?**

If you encounter any issues during the integration process or have questions about configuring your GCP integration, please contact our support team at [**support@praetorian.com**](mailto:support@praetorian.com). Include your Infrastructure ID and any error messages you've encountered to help us assist you more effectively.
