---
title: "Cloud Attack Surface"
description: "92% of enterprises now operate multi-cloud environments. The average organization uses two or more IaaS providers and 85+ SaaS applications. Cloud spending has"
featurebaseId: "6777043"
---

## Your Cloud Is Bigger Than You Think

92% of enterprises now operate multi-cloud environments. The average organization uses two or more IaaS providers and 85+ SaaS applications. Cloud spending has crossed $855 billion annually and shows no signs of slowing.

But here's the problem: **99% of cloud security failures are the customer's fault** — not the cloud provider's. Gartner has been saying this for years, and the data keeps proving it right. Misconfigurations, overprivileged identities, exposed storage, and forgotten resources create an attack surface that grows faster than security teams can track it.

80% of organizations experienced at least one cloud breach in the past year. The average cloud misconfiguration incident costs $3.86 million and takes 186 days to detect. And with cloud-conscious intrusions rising 37% year-over-year — including a 266% spike from nation-state actors — this is no longer a risk you can defer.

Guard connects to your cloud accounts, continuously inventories your resources, identifies what's publicly exposed, and finds the misconfigurations and secrets that attackers exploit.

* * *

## Why Cloud Is a Distinct Attack Surface

### The shared responsibility gap is real

Only 13% of organizations fully understand their cloud security responsibilities under the shared responsibility model. Your cloud provider secures the infrastructure — the hypervisor, the physical hardware, the network backbone. Everything above that line is yours: IAM policies, storage permissions, network security groups, encryption settings, and application configurations.

Most organizations assume their cloud provider is handling more than they actually are. That assumption gap is where breaches happen.

### Misconfigurations are the new vulnerabilities

In traditional environments, attackers exploit software bugs. In the cloud, they exploit configuration mistakes. 23% of all cloud security incidents stem from misconfigurations — open storage buckets, permissive security groups, public database endpoints, and overprivileged IAM roles.

These aren't obscure edge cases. The average cloud account has 43 misconfigurations. And because cloud infrastructure changes constantly — new services spun up, permissions granted, resources created — today's secure configuration can become tomorrow's breach vector without anyone noticing.

### Identity is the new perimeter

In the cloud, there are no firewalls to hide behind. Access is controlled by identity — IAM users, roles, service accounts, and the policies attached to them. And identity management in the cloud is failing at scale:

-   93% of organizations have at least one overprivileged service account
    
-   59% of AWS IAM users have access keys older than one year
    
-   55% of GCP service accounts have keys older than one year
    
-   78% of organizations have IAM roles that haven't been used in 90+ days
    
-   35% of cloud incidents involve valid account abuse
    

Every unused permission is a potential attack path. Every stale credential is an invitation. Every overprivileged service account is a blast radius multiplier.

### Multi-cloud multiplies complexity

Each cloud provider has its own security model, its own naming conventions, its own IAM system, and its own configuration pitfalls. Organizations running workloads across AWS, Azure, and GCP are maintaining three distinct security postures simultaneously — often with different teams, different tools, and different levels of maturity.

Multi-cloud breaches cost $5.05 million on average and take 276 days to detect and contain. The complexity itself is the vulnerability.

### Attackers are cloud-native now

Cloud environments are no longer secondary targets. CrowdStrike's 2026 Global Threat Report shows a 37% increase in cloud-conscious intrusions, with state-sponsored actors increasing their cloud targeting by 266%. Attackers understand cloud architecture — they know how to pivot from a compromised credential to cross-account access, how to exploit IAM trust relationships, and how to exfiltrate data through misconfigured storage.

The average attacker breakout time in cloud environments is now under 30 minutes. If you can't detect and respond faster than that, you're already behind.

* * *

## What Guard Does About It

Guard addresses the cloud attack surface through a three-phase approach: **connect your accounts**, **discover and inventory everything**, and **continuously assess security posture**.

### Phase 1: Cloud Account Connection

Guard integrates directly with your cloud providers through native authentication:

ProviderAuthenticationWhat Gets Connected

**Amazon Web Services**

Cross-account IAM role assumption with external ID, or access key credentials

Individual accounts or entire AWS Organizations (all member accounts discovered automatically)

**Microsoft Azure**

OIDC federated tokens or service principal credentials

Individual subscriptions or all subscriptions across tenants

**Google Cloud Platform**

Service account key files or OIDC credential files

Individual projects or entire organizations (all projects discovered automatically)

The platform walks you through setup with a guided wizard — generating the IAM policies you need, validating credentials before saving, and testing connectivity before your first scan.

### Phase 2: Resource Discovery

Once connected, Guard automatically inventories your cloud resources across every region and account:

**AWS Resource Discovery:**

-   S3 buckets and their access configurations
    
-   EC2 instances with public IP addresses
    
-   Lambda functions with public URLs
    
-   API Gateway endpoints
    
-   Elastic Load Balancers
    
-   Route 53 DNS zones and records
    
-   AWS Organizations structure (accounts, OUs)
    
-   Network interfaces and elastic IPs
    

**Azure Resource Discovery:**

-   Virtual machines and public IP addresses
    
-   DNS zones and records (A, AAAA, CNAME)
    
-   App Services and Web Sites
    
-   Subscriptions across tenants
    
-   Storage accounts
    
-   SQL databases
    
-   Container registries
    
-   Key Vaults
    

**GCP Resource Discovery:**

-   Projects across your organization
    
-   Compute Engine instances
    
-   Cloud Functions
    
-   Cloud Run services
    
-   App Engine applications
    
-   Cloud Storage buckets
    
-   Cloud SQL instances
    
-   Public networking resources (forwarding rules, external addresses)
    

Every discovered resource is classified by type, region, and account — creating a complete inventory that's always current.

### Phase 3: Security Assessment

With your cloud inventory mapped, Guard runs continuous security assessment across three dimensions:

#### Public Resource Detection

Guard identifies resources that are publicly accessible — the misconfigurations that turn private infrastructure into public attack surface:

-   **Storage exposure** — S3 buckets, Azure Blob containers, and GCS buckets with public access enabled
    
-   **Database exposure** — SQL servers, Cosmos DB, Redis caches, and other data stores accessible from the internet
    
-   **Compute exposure** — VMs, container instances, and serverless functions with public endpoints
    
-   **Network exposure** — Unrestricted security groups, public load balancers, and permissive firewall rules
    
-   **Application exposure** — App services with disabled authentication, anonymous function triggers, and public API endpoints
    
-   **Management exposure** — Key vaults with public access, automation accounts, and management interfaces
    

For Azure environments, Guard runs 80+ security assessment templates covering every major service category — from AKS cluster configuration to Event Hub access policies.

#### Secret and Credential Discovery

Guard scans inside your cloud resources for exposed secrets — the credentials that enable lateral movement and privilege escalation:

-   **Compute instances** — Environment variables, startup scripts, and metadata containing API keys, passwords, and tokens
    
-   **Serverless functions** — Lambda/Cloud Functions/Cloud Run environment variables and configuration
    
-   **Storage objects** — Files in S3/GCS/Blob storage containing credentials, certificates, and configuration secrets
    
-   **Container images** — Docker registry scanning for embedded secrets in image layers
    
-   **DevOps pipelines** — Azure DevOps repositories, variable groups, service endpoints, and pipeline configurations
    
-   **Automation accounts** — Runbooks and scripts containing hardcoded credentials
    

Secret scanning uses pattern-based detection to find API keys, database connection strings, private keys, OAuth tokens, and other credential types — then validates whether they're still active.

#### IAM and Access Analysis

Guard analyzes your cloud identity configuration to find overprivileged access and dangerous trust relationships:

-   **Resource policy analysis** — Identifies overly permissive resource policies across S3, KMS, Lambda, and other services
    
-   **Organization policy review** — Evaluates Service Control Policies (SCPs) and Resource Control Policies (RCPs) for gaps
    
-   **IAM graph analysis** — Maps the relationships between identities, roles, and permissions to identify privilege escalation paths
    
-   **Conditional access review** — Evaluates Azure AD Conditional Access policies for bypasses and gaps
    
-   **Service account audit** — Identifies overprivileged and unused service accounts across all providers
    
-   **Cross-account trust analysis** — Maps trust relationships between accounts that could enable lateral movement
    

#### Infrastructure Vulnerability Detection

Guard identifies cloud-specific vulnerabilities that create risk:

-   **CDK bucket takeover** — Missing S3 staging buckets from AWS CDK deployments that can be hijacked
    
-   **CloudFront-to-S3 domain takeover** — CloudFront distributions pointing to non-existent S3 buckets
    
-   **Cognito misconfigurations** — Identity pool and user pool settings enabling unauthorized access or privilege escalation
    
-   **IMDSv1 exposure** — EC2 instances without IMDSv2 enforcement, vulnerable to SSRF-based credential theft
    
-   **Container escape risks** — ECS credential theft vulnerabilities in EC2 launch type configurations
    
-   **Subdomain takeover** — Dangling DNS records in Cloud DNS/Route 53 that can be claimed by attackers
    
-   **Default service account abuse** — GCP instances running with default service accounts that have excessive permissions
    

* * *

## The Cloud Discovery-to-Assessment Pipeline

```
Cloud Account Connected (AWS / Azure / GCP)
  │
  ├─→ Organization Discovery ─→ All accounts/subscriptions/projects found
  │     │
  │     └─→ Resource Enumeration ─→ Every resource inventoried by region
  │           ├─→ Compute (VMs, Lambda, Cloud Run, Functions)
  │           ├─→ Storage (S3, Blob, GCS, databases)
  │           ├─→ Network (IPs, DNS, load balancers, firewalls)
  │           └─→ Identity (IAM users, roles, service accounts)
  │
  ├─→ Public Exposure Detection ─→ Misconfigured access identified
  │     ├─→ Open storage ─→ Public buckets/containers flagged
  │     ├─→ Public compute ─→ Exposed instances/functions flagged
  │     └─→ Network gaps ─→ Permissive security groups flagged
  │
  ├─→ Secret Scanning ─→ Credentials found in resources
  │     ├─→ Compute secrets ─→ Keys in env vars and metadata
  │     ├─→ Storage secrets ─→ Credentials in files and objects
  │     └─→ DevOps secrets ─→ Tokens in pipelines and repos
  │
  └─→ IAM Analysis ─→ Access risks mapped
        ├─→ Overprivileged roles ─→ Excessive permissions flagged
        ├─→ Stale credentials ─→ Unused keys and accounts flagged
        └─→ Trust relationships ─→ Cross-account risks identified
```

This pipeline runs continuously. When new resources appear, permissions change, or configurations drift, Guard detects and assesses the changes automatically.

* * *

## What Users See in the Platform

### Cloud Integration Setup

A guided wizard for each cloud provider:

-   Step-by-step credential configuration with validation
    
-   IAM policy templates you can copy directly into your cloud console
    
-   Connection testing before first scan
    
-   Support for organization-wide or individual account/project connections
    

### Cloud Asset Inventory

All cloud resources appear in the unified asset inventory with:

-   Provider, resource type, region, and account identifiers
    
-   Public/private classification
    
-   Associated IP addresses and URLs
    
-   Rich metadata from cloud provider APIs
    

### Security Findings

Cloud-specific findings with full context:

-   What's misconfigured and why it matters
    
-   Which resource, in which account, in which region
    
-   Severity scoring aligned with industry frameworks
    
-   Remediation guidance specific to each cloud provider
    

### Multi-Cloud Visibility

A single view across all connected accounts and providers — so you can answer questions like:

-   "How many publicly accessible storage resources do we have across all providers?"
    
-   "Which accounts have the most misconfigurations?"
    
-   "Where are credentials exposed in our cloud infrastructure?"
    

* * *

## Capability Summary

Guard's cloud attack surface scanning covers **three major cloud providers** with **50+ security modules**:

CategoryAWSAzureGCP

**Resource Discovery**

Accounts, EC2, Lambda, S3, API Gateway, ELB, Route 53, Organizations

Subscriptions, VMs, DNS, App Services, Public IPs

Projects, Compute, Functions, Cloud Run, App Engine, Storage, SQL, Networking

**Public Exposure Detection**

Public resources across all service types

80+ security assessment templates covering storage, compute, network, database, identity, and application services

Public networking, firewall rules, external addresses

**Secret Scanning**

Secrets across compute, storage, and container images

Secrets in VMs, web apps, automation accounts, key vaults, storage, and DevOps pipelines

Secrets in compute instances, storage buckets, Cloud Run, and Cloud Functions

**IAM Analysis**

Resource policies, organization policies, IAM graph analysis, KMS grants

Role assignments, Conditional Access policies, Entra ID analysis

Default service accounts, primitive role detection, IAM policy analysis

**Infrastructure Vulnerabilities**

CDK takeover, CloudFront-S3 takeover, Cognito misconfig, IMDSv1, ECS escape

Public access misconfigurations across 25+ service types

Subdomain takeover, default service account abuse

All findings flow into Guard's unified risk management system — prioritized by severity, tracked through remediation, and correlated with your external and internal attack surface findings for a complete security picture.

* * *

## Why This Matters Now

The cloud is no longer new. It's the default. And the security challenges it creates aren't going away — they're compounding.

Every new account, every new service, every new permission grant expands your cloud attack surface. The organizations that treat cloud security as a configuration problem to solve once will keep getting breached. The ones that treat it as a continuous assessment discipline — with real-time visibility, automated detection, and prioritized remediation — won't.

Guard gives you that discipline across every cloud account, every provider, and every region — so your cloud security posture stays ahead of the threats targeting it.
