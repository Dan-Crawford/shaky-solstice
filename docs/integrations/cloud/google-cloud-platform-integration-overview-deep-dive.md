---
title: "Google Cloud Platform Integration - Overview (Deep Dive)"
description: "Google Cloud Platform Integration - Overview (Deep Dive)"
featurebaseId: "39513219549851"
---

## Overview

PGP integrates with Google Cloud Platform (GCP) using Workload Identity Federation with OpenID Connect (OIDC) tokens to provide secure, temporary access to your GCP resources. This means no service account keys or long-term credentials are needed, significantly improving security. The integration is supported at both Organization-level and Project-level access.

## How the Security Architecture Works

PGP uses a secure OIDC-based authentication pattern that works in four steps:

1.  **Cognito Authentication**: PGP creates a unique user in its Amazon Web Services (AWS) Cognito pool (a user management service) for your integration. Each user gets a unique subject identifier using UUIDv4 (Universally Unique Identifier version 4).
2.  **OIDC Token Exchange**: PGP authenticates with Cognito to obtain an Identity (ID) token with your unique subject claim. A "subject claim" is a standard field in authentication tokens that identifies who the token belongs to - in this case, it's your unique identifier (the UUIDv4 mentioned in step 1) that distinguishes your integration from all other PGP customers. OpenID Connect (OIDC) is a secure authentication protocol built on top of OAuth 2.0.
3.  **Workload Identity Federation**: The ID token is exchanged for GCP access tokens through your configured Workload Identity Pool and Provider. Workload Identity Federation is Google's recommended way to access GCP resources from external systems without using service account keys.
4.  **Temporary Credentials**: As a result, only short-lived GCP access tokens (1-hour expiration) are used for secure access to your resources.

This architecture ensures proper isolation through unique subject claims and eliminates the security risks associated with long-term service account keys.

## Integration Options

PGP provides integrations at both the Organization level and the Project level:

-   **Organization-level integration**: Provides access to all projects and resources within your entire GCP organization
-   **Project-level integration**: Provides access to a specific GCP project only

Praetorian (the company behind PGP) recommends integrating at the Organization-level for the most comprehensive coverage and experience.

### Deployment Methods

For either integration level, the necessary setup can be performed using two methods:

1.  **Infrastructure as Code (IaC)**: Deploy using Terraform (an infrastructure automation tool) - **Recommended**
2.  **Manual Deployment**: Step-by-step setup through the GCP Console (Google's web interface)

Praetorian recommends deploying via Terraform for repeatability and version control.

**Reference Documentation:**

-   **Infrastructure as Code** - Covers Terraform deployments for both integration scopes
-   **Manual Deployment** - Step-by-step console-based setup instructions

## Required Permissions

For GCP integrations, PGP requires specific permissions according to the integration scope. When integrating at the Organization level, Project-level permissions are inherited automatically.

### Organization-Level Integration Permissions

Each of the following permissions are requested at the Organization scope:

-   **Viewer** - Provides read access across all Projects and resources within the Organization
-   **Organization Policy Viewer** - Enables review of Organization-wide policies and constraints
-   **Organization Role Viewer** - Allows examination of custom roles and permissions at the Organization level
-   **Security Reviewer** - Provides access to security-related configurations and audit information
-   **Compute Viewer** - Enables review of compute resources (virtual machines, networks, etc.) across all Projects
-   **App Engine Viewer** - Provides read access to App Engine applications and configurations (App Engine is Google's platform-as-a-service offering)
-   **Cloud Asset Viewer** - Allows comprehensive asset inventory and configuration review

### Project-Level Integration Permissions

#### Project Scope Permissions

Each of the following permissions are requested at the scope of the specific Project you are integrating:

-   **Viewer** - Provides read access to all resources within the specific Project
-   **Security Reviewer** - Provides access to security-related configurations within the Project
-   **Compute Viewer** - Enables review of compute resources within the Project
-   **App Engine Viewer** - Provides read access to App Engine applications within the Project
-   **Cloud Asset Viewer** - Allows asset inventory and configuration review within the Project

#### Organization Scope Permissions (Required for Project-Level Integration)

In addition to the Project-level permissions, PGP needs the following permissions at the Organization scope. These permissions allow PGP to perform comprehensive analysis for privilege escalation and permission inheritance:

-   **Organization Policy Viewer** - Enables review of Organization policies that may affect the Project
-   **Organization Role Viewer** - Allows examination of Organization-level custom roles
-   **Custom Role with Folder Permissions** - Includes the following specific permissions for folder-level visibility:
    -   `resourcemanager.folders.get` - Allows reading folder information
    -   `resourcemanager.folders.getIamPolicy` - Allows reading folder-level access policies (IAM = Identity and Access Management)
    -   `resourcemanager.folders.list` - Allows listing folders in the organization

## Understanding the Architecture Diagrams

The provided diagrams illustrate two integration scenarios.

### Organization-Level Integration

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f35a21178a432df1fa2/019b7ffb-67f1-7b17-b0fe-26ce3358c4ba/b64u-MDE5YjdmZmItNjMzNC03MmY1LTkzNTEtNTNhN2UzOTA1M2E1.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=105affe4caad59a0d03efdb344ca1738f30fe012f7ebf5f9951a9a66684e31c7)

1.  **PGP AWS Environment** (left side): Shows PGP's internal components including Cognito Identity Provider (IdP) and Access Broker
2.  **Customer GCP Organization Integration** (right side): Shows how PGP connects to your entire GCP organization
3.  **Flow**: PGP obtains temporary credentials from AWS Cognito, exchanges them with Google OAuth Server for OIDC tokens, which are then used to access your GCP resources through the Workload Identity Provider

### Project-Level Integration

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580f35a21178a432df1fa2/019b7ffb-65b3-76d6-bfbd-2167dd98fbd9/b64u-MDE5YjdmZmItNjA0ZS03MzE0LWJhNzMtYjZjZWQ5MzRhOGIy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=40c9d5ee979fd026927811a6132a330d3e924cd126c0d761fbac1dfe44e51007)

1.  Similar AWS environment setup on the left
2.  **Customer GCP Project Integration** (right side): Shows integration limited to a specific project within your organization
3.  **Key difference**: The Workload Identity Provider is created within the specific project being integrated, rather than at the organization level

Both models follow the same access pattern via the **PGP Access Broker**, an isolated intermediary system that securely mediates between PGP’s core platform, Google's OAuth server and the customer GCP environments. This broker handles temporary OIDC credential exchange, provides a single audit point, and ensures a clear trust boundary between PGP and customer operations.

## Key Benefits

The PGP-GCP integration leverages modern security best practices through Workload Identity Federation and OIDC authentication to provide:

-   **Secure, temporary access** to your Google Cloud resources
-   **Elimination of long-term credentials** and service account keys, significantly reducing your security attack surface
-   **Comprehensive visibility** across your cloud infrastructure
-   **Proper resource isolation** through unique subject identifiers

Whether you choose Organization-level integration for maximum coverage or Project-level integration for targeted analysis, PGP's robust permission model ensures thorough security assessment capabilities while adhering to the principle of least privilege access.

## Conclusion

The Infrastructure as Code deployment option using Terraform provides a repeatable, auditable setup process that aligns with modern DevOps practices. With short-lived access tokens (1-hour expiration), unique subject identifiers, and proper resource isolation, this integration establishes a secure foundation for continuous cloud security monitoring and assessment.

The carefully scoped permissions enable PGP to deliver comprehensive security insights while maintaining security best practices and minimizing access to only what's necessary for effective security assessment.
