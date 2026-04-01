---
title: "Attack Surface Management (ASM)"
description: "Attack Surface Management (ASM)"
featurebaseId: "9266232"
---

## What It Does

Guard continuously discovers, inventories, and monitors every asset across your organization's digital footprint — domains, IPs, cloud resources, web applications, repositories, certificates, and more. With **64 integrations** spanning cloud providers, DNS services, security tools, and asset management platforms, Guard builds a comprehensive, always-current map of everything you expose to the internet.

This isn't a one-time scan. Guard runs continuously, detecting new assets as they appear and tracking changes to existing ones — so your inventory is never stale.

## Why It Matters

Most organizations underestimate their attack surface by **30–40%**. The assets you don't know about are often the ones attackers find first:

*   **Shadow IT** — Cloud resources spun up by teams outside central IT
    
*   **Acquired domains** — Infrastructure inherited through mergers and acquisitions that never got inventoried
    
*   **Forgotten dev servers** — Staging environments, test instances, and proof-of-concept deployments left running
    
*   **Expired certificates** — Services with lapsed TLS that quietly become vulnerable
    
*   **Orphaned subdomains** — DNS records pointing to decommissioned services, ripe for subdomain takeover
    

The fundamental principle: **you cannot protect what you don't know about**. ASM closes the visibility gap between what you think you own and what you actually expose.

## How Guard Discovers Assets

Guard uses three complementary discovery paths to build your attack surface map:

### 1\. Seed-Based Expansion

Start with a **seed** — a domain, IP address, CIDR range, or cloud account — and Guard automatically expands outward to find related infrastructure:

*   **Subdomain enumeration** — Active and passive discovery using subfinder, DNS brute-forcing, and certificate transparency logs
    
*   **DNS resolution and reverse lookups** — Maps domains to IPs and IPs back to domains
    
*   **WHOIS and reverse WHOIS** — Identifies related domains registered by the same organization
    
*   **TLS certificate mining** — Extracts Subject Alternative Names (SANs) from certificates to find additional domains
    
*   **SEC EDGAR filing analysis** — Discovers subsidiary companies and their associated infrastructure
    
*   **CSP header mining** — Parses Content-Security-Policy headers to identify connected services and CDNs
    
*   **Favicon analysis** — Matches favicon hashes to identify related web properties across different domains
    

### 2\. Cloud Discovery

Connect your cloud accounts and Guard automatically discovers all deployed resources:

Provider

Resources Discovered

**AWS**

EC2, RDS, S3, Lambda, ECS/EKS, CloudFront, Route53

**Azure**

VMs, App Services, SQL, AKS, Azure AD, Azure DevOps

**GCP**

Compute Engine, Cloud Run, Cloud Functions, Cloud SQL, GKE

### 3\. Third-Party Integrations

Guard ingests asset data from tools you already use, ensuring nothing falls through the cracks:

Category

Integrations

**Asset Management**

Axonius, RunZero, Sevco

**Attack Surface**

CyCognito, Censys, Shodan, SecurityTrails, SecurityScorecard

**Cloud & Hosting**

DigitalOcean, Akamai DNS, NS1, GoDaddy DNS

**Security Platforms**

HackerOne, Orca Security

## The Pius Agent

**Pius** is Guard's dedicated autonomous asset discovery agent. Named after the Roman emperor known for expanding and securing Rome's borders, Pius continuously identifies new domains and potential seed targets — without manual intervention.

Pius works by:

*   Analyzing your existing asset inventory for expansion opportunities
    
*   Identifying new domains and infrastructure related to your organization
    
*   Generating **preseeds** — suggested new assets for your review
    
*   Running autonomously in the background on a continuous cycle
    

You stay in control: Pius suggests, you approve. No assets are added to your active inventory without your explicit confirmation.

## Asset Types

Type

Examples

How Discovered

**Domain**

`example.com`, `api.example.com`

Seed, subdomain enumeration, DNS, TLS

**IPv4 / IPv6**

`192.168.1.1`, `2001:db8::1`

DNS resolution, cloud discovery

**Port**

`443/tcp`, `22/tcp`

Port scanning (portscan capability)

**Web Application**

`https://app.example.com`

URL parsing, web crawling

**Cloud Resource**

EC2 instance, S3 bucket, Azure VM

Cloud integration

**Repository**

`github.com/org/repo`

Source code integration

**Certificate**

`*.example.com`

TLS certificate mining

## Asset Lifecycle

Every asset in Guard follows a defined lifecycle:

Status

Meaning

**Pending**

Newly discovered, awaiting your review

**Active**

Approved and continuously scanned and monitored

**Frozen**

Temporarily paused from scanning (e.g., during maintenance)

**Deleted**

Permanently removed from your inventory

**The typical flow:**

1.  **Discovery** — Guard finds a new asset through any discovery method
    
2.  **Pending** — The asset appears in your queue for review
    
3.  **Active** — You promote the asset, and Guard begins continuous scanning for vulnerabilities, open ports, and misconfigurations
    
4.  **Frozen** (optional) — Pause scanning temporarily without losing the asset's history
    
5.  **Deleted** (optional) — Permanently remove assets that are out of scope
    

## Attack Surface Types

Guard categorizes your assets across multiple attack surface types, each with dedicated scanning and monitoring capabilities:

Surface Type

Description

**External**

Internet-facing infrastructure — domains, IPs, ports, and web applications

**Internal**

Internal network assets accessible behind the perimeter

**Cloud**

Resources deployed across AWS, Azure, and GCP environments

**Application**

Web applications, APIs, and microservices

**CI/CD Pipeline**

Build systems, deployment pipelines, and artifact repositories

**LLM**

AI/ML model endpoints, training pipelines, and inference APIs

**User**

Employee accounts, SSO configurations, and identity providers

**Source Code**

Code repositories, secrets in code, and dependency supply chains

## Preseeds

Preseeds are Guard's automatic discovery mechanism for expanding your attack surface beyond what you've explicitly defined. Guard identifies potential new assets from multiple data sources:

*   **WHOIS data** — Domains registered by your organization or related entities
    
*   **EDGAR filings** — Subsidiaries and acquisitions disclosed in SEC filings
    
*   **TLS certificates** — Additional domains found in certificate SANs
    
*   **Favicons** — Web properties sharing the same favicon hash
    
*   **DNS patterns** — Related domains discovered through DNS record analysis
    
*   **CIDR handles** — IP ranges registered to your organization
    
*   **CSP headers** — Third-party services referenced in security policies
    

Preseeds appear in a dedicated review queue. You evaluate each suggestion and either **approve** it (promoting it to a full seed that triggers discovery) or **dismiss** it. This keeps you in control while ensuring no potential asset goes unnoticed.

## What's Next

*   [Vulnerability Management (VM)](#) — How Guard scans and prioritizes risks across your assets
    
*   [External Attack Surface](#) — Deep dive into internet-facing asset monitoring
    
*   [Integration Guides](#) — Connect your cloud accounts, DNS providers, and security tools
    
*   [Preseeds Deep-Dive](#) — Advanced strategies for expanding your attack surface coverage
