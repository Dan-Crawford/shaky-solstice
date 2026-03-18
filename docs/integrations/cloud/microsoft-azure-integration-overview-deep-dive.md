---
title: "Microsoft Azure Integration - Overview (Deep Dive)"
description: "Microsoft Azure Integration - Overview (Deep Dive)"
featurebaseId: "39513267985051"
---

## Overview

PGP integrates with Microsoft Azure using OpenID Connect (OIDC) federation with Azure Entra ID (formerly Azure Active Directory) to provide secure, temporary access to your Azure resources. This means no client secrets or long-term credentials are needed, significantly improving security. The integration is supported at both tenant-level and subscription-level access.

## How the Security Architecture Works

PGP uses a secure OIDC-based authentication pattern that works in four steps:

1.  **Cognito Authentication**: PGP creates a unique user in its Amazon Web Services (AWS) Cognito pool (a user management service) for your integration. Each user gets a unique subject identifier using UUIDv4 (Universally Unique Identifier version 4).
2.  **OIDC Token Exchange**: PGP authenticates with Cognito to obtain an Identity (ID) token with your unique subject claim. A "subject claim" is a standard field in authentication tokens that identifies who the token belongs to - in this case, it's your unique identifier that distinguishes your integration from all other PGP customers. OpenID Connect (OIDC) is a secure authentication protocol built on top of OAuth 2.0.
3.  **Azure Entra ID Federation**: The ID token is exchanged for Azure access tokens (both ARM and Microsoft Graph) through your configured federated identity credential. Azure Resource Manager (ARM) provides access to resources within subscriptions while Microsoft Graph provides access to the identity layer.
4.  **Temporary Credentials**: As a result, only short-lived Azure access tokens (1-hour expiration) are used for secure access to your resources.

This architecture ensures proper isolation through unique subject claims and eliminates the security risks associated with client secrets (long-term passwords for applications).

## Integration Options

PGP provides integrations at two different levels:

-   **Tenant-level integration**: Provides access to all subscriptions and resources within your entire Azure tenant (your organization's Azure environment)
-   **Subscription-level integration**: Provides access to a specific Azure subscription only

Praetorian (the company behind PGP) recommends integrating at the tenant-level for the most comprehensive coverage and experience.

### Deployment Methods

For either integration level, the necessary setup can be performed using two methods:

1.  **Infrastructure as Code (IaC)**: Deploy using Terraform (an infrastructure automation tool) - **Recommended**
2.  **Manual Deployment**: Step-by-step setup through the Azure Portal (Microsoft's web interface for managing Azure)

Praetorian recommends deploying via Terraform for repeatability and version control.

**Reference Documentation:**

-   **[Infrastructure as Code](https://docs.praetorian.com/hc/en-us/articles/37956598833563-Microsoft-Azure-IaC-Deployment-Recommended)** - Covers Terraform deployments for both tenant and subscription-level integrations
-   **[Manual Deployment](https://docs.praetorian.com/hc/en-us/articles/37956568460187-Microsoft-Azure-Manual-Deployment)** - Step-by-step portal-based setup instructions

## Understanding the Architecture Diagrams

The provided diagrams illustrate two integration scenarios.

### Tenant-Level Integration

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f9aa21178a432dfe4b8/019b7ffc-f22b-774e-adc1-5ff1ef2f1926/b64u-MDE5YjdmZmMtZWMyNi03MjU3LThmNzEtY2RjMDY4NTA2MzQz.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=738ab558d8f659bb2bde4e8378071dd4c95d5bd88fe5f607f839d2cec9d71290)

1.  **PGP AWS Environment** (left side): Shows PGP's internal components including Cognito Identity Provider (IdP) and Access Broker
2.  **Customer Azure Tenant Integration** (right side): Shows how PGP connects to your entire Azure tenant
3.  **Key Components**:
    -   **Entra ID (Azure AD) Tenant**: Your organization's identity and access management system
    -   **App Registration**: A registered application in Azure that represents PGP
    -   **Tenant Root Management Group**: The top-level container that governs all subscriptions in your organization
4.  **Flow**: PGP obtains temporary credentials from AWS Cognito, exchanges them with Microsoft OAuth Server for OIDC tokens, which are then used to access your Azure resources through the App Registration

### Subscription-Level Integration

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f9aa21178a432dfe4b8/019b7ffc-f220-71ef-ba86-21ce1d816385/b64u-MDE5YjdmZmMtZWJmMi03YjBkLTljMzktMjQ1Y2ZkODJmZjM0.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=02bc671c265c317505f4c4b25e109fda0f60d1ac76675e83b35599d178ff88e4)

1.  Similar AWS environment setup on the left
2.  **Customer Azure Subscription Integration** (right side): Shows integration limited to a specific subscription within your tenant
3.  **Key difference**: The App Registration is granted permissions only to the specific Azure subscription being integrated, rather than the entire tenant

Both models follow the same access pattern via the **PGP Access Broker**, an isolated intermediary system that securely mediates between PGP’s core platform, Google's OAuth server and the customer GCP environments. This broker handles temporary OIDC credential exchange, provides a single audit point, and ensures a clear trust boundary between PGP and customer operations.

## Required Permissions

For Azure integrations, PGP requires specific permissions to assess your security posture effectively.

### Azure Role Assignments

-   **Reader**: This role is assigned at different scopes depending on your integration level:
    
    -   **Tenant-level integration**: Applied at the Tenant Root Management Group scope (covers all subscriptions)
    -   **Subscription-level integration**: Applied at the subscription scope (covers only that specific subscription)
    
    This role provides read access to security-related configurations and resources across Azure services, including security recommendations, alerts, and compliance information.
    

### Microsoft Graph API Permissions

These are Application Permissions that require Admin Consent (meaning an administrator must approve them). Microsoft Graph is the unified API endpoint for accessing Microsoft 365 and Azure services:

-   **Directory.Read.All**: Read directory data including users, groups, and organizational information from Azure Active Directory
-   **Policy.Read.All**: Read your organization's policies including:
    -   Conditional access policies (rules that control when and how users can access resources)
    -   Compliance policies (rules that define security requirements for devices and users)
-   **RoleManagement.Read.All**: Read role management data across Azure AD (Active Directory) and Azure resources, including:
    -   Role definitions and assignments
    -   Administrative unit assignments
    -   Directory role permissions
-   **RoleManagement.Read.Directory**: Read directory role management data and assignments, focusing specifically on Azure AD administrative roles
-   **RoleEligibilitySchedule.Read.Directory**: Read Privileged Identity Management (PIM) role eligibility schedules. PIM is Azure's service for managing, controlling, and monitoring access to privileged roles - this permission allows PGP to see who is eligible for elevated privileges and when.
-   **RoleManagementPolicy.Read.AzureADGroup**: Read role management policies for Azure AD groups, including policies that govern how group-based role assignments work
-   **RoleManagementPolicy.Read.Directory**: Read directory role management policies and configurations, including approval workflows and access review requirements for privileged roles

## Why These Permissions Are Necessary

The combination of Security Reader role and Microsoft Graph permissions allows PGP to:

-   **Assess security configurations** across your Azure environment
-   **Identify privilege escalation paths** by understanding role assignments and eligibility
-   **Review compliance with security policies** including conditional access rules
-   **Analyze identity and access management** configurations for potential vulnerabilities
-   **Monitor privileged access patterns** through PIM data

All permissions are read-only, meaning PGP cannot make changes to your environment - it can only observe and analyze your current security posture.

## Key Benefits

The PGP-Azure integration leverages modern security best practices through OIDC federation and Azure Entra ID to provide:

-   **Secure, temporary access** to your Azure resources without long-term credentials
-   **Elimination of client secrets**, significantly reducing your security attack surface
-   **Comprehensive visibility** across your Azure environment's security posture
-   **Proper resource isolation** through unique subject identifiers
-   **Privileged access monitoring** through integration with Azure's Privileged Identity Management

Whether you choose tenant-level integration for maximum coverage or subscription-level integration for targeted analysis, PGP's robust permission model ensures thorough security assessment capabilities while adhering to the principle of least privilege access.

## Next Steps

Once you've chosen your preferred integration method and deployment approach, you're ready to begin connecting your Azure environment to PGP. The integration process will establish secure, temporary access to your Azure resources while maintaining the highest security standards through OIDC federation.

After successful integration, PGP will begin monitoring your Azure environment and providing comprehensive security insights across your tenant or subscription, depending on your chosen scope. You can monitor the status of your integration and view security findings through the PGP dashboard.

### Getting Started

For detailed step-by-step instructions, proceed to the appropriate deployment guide based on your preferred method:

-   Follow the **[Infrastructure as Code](https://docs.praetorian.com/hc/en-us/articles/37956598833563-Microsoft-Azure-IaC-Deployment-Recommended)** guide for automated Terraform deployment
-   Use the **[Manual Deployment](https://docs.praetorian.com/hc/en-us/articles/37956568460187-Microsoft-Azure-Manual-Deployment)** guide for portal-based configuration

Your Azure resources will be continuously monitored with the security permissions outlined above, ensuring comprehensive visibility into your cloud security posture while maintaining strict read-only access that cannot impact your production environment.
