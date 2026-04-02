---
title: "Navigating the Platform"
description: "Navigating the Platform"
featurebaseId: "8152834"
---

Guard is built around four core workflows that take you from discovery to remediation. This guide maps out where everything lives and how the pieces connect.

## Core Workflows

### 1\. Discovery Workflow

The discovery workflow is how Guard maps your attack surface. It follows a linear progression:

**Seeds** (your starting points) → **Preseeds** (review and approve discovered candidates) → **Assets** (confirmed inventory) → **Scanning** (automated assessment) → **Risks** (findings) → **Remediation** (resolution)

You provide seeds — domains, IPs, CIDR ranges — and Guard expands outward, discovering everything connected to your organization. Preseeds let you review what Guard found before promoting items to full assets. Once promoted, assets are scanned automatically.

### 2\. Scanning Workflow

Control how Guard scans your environment:

1.  **Configure rate limits** — Go to **Settings > Scan Settings** to set simultaneous hosts and request rates
    
2.  **Enable capabilities** — Choose which scanning modules run against your assets
    
3.  **Monitor jobs** — Track scan progress and completion
    
4.  **Review findings** — Examine risks as they come in, prioritized by severity
    

### 3\. AI Workflow

Guard includes three tiers of AI assistance, each building on the last:

1.  **AI Inference (Query Mode)** — Ask natural language questions about your data. "Show me all critical risks on public-facing assets."
    
2.  **AI Automation (Background Agents)** — Enable agents that continuously analyze your environment and surface insights.
    
3.  **Agent Mode (Aurelius + Specialist Agents)** — Full autonomous operation where Aurelius coordinates specialist agents to investigate, correlate, and recommend actions.
    

### 4\. Integration Workflow

Connect your existing security tools and let Guard normalize the data:

1.  **Connect external tools** — Link scanners, cloud providers, EDR, and SIEM platforms
    
2.  **Guard normalizes data** — All findings are mapped to a unified schema
    
3.  **Unified view** — See results from every scanner in a single, consistent interface
    

## Quick Reference — "Where Do I Find...?"

I want to…

Go to...

What I'll find

See all my assets

**Assets**

Full inventory with status, type, and origin

Review vulnerabilities

**Risks**

Findings with severity, proof, and remediation guidance

Run advanced queries

**Insights > Query Builder**

Custom filters across assets, risks, and relationships

Visualize attack paths

**Insights > Attack Paths**

AD attack paths, privilege escalation routes

Connect a scanner

**Integrations**

64+ connectors for scanners, cloud, EDR, and SIEM

Ask the AI a question

**AI Chat** (bottom right)

Natural language queries about your data

Configure scanning

**Settings > Scan Settings**

Rate limits, simultaneous hosts, request rates

Manage team access

**Settings > User Management**

Add users, assign roles (Admin / Analyst / Read Only)

Set up SSO

**Settings > SSO**

OIDC configuration for Azure AD or Okta

View scan attribution

**Settings > Scan Header**

HTTP headers and user-agent strings for allowlisting

See API documentation

**Developer Resources**

API guide and SDK usage

## Understanding Asset Types

Guard discovers and categorizes assets across your entire attack surface:

Asset

Type Examples

How Discovered

**Domain**

example.com, api.example.com

Seed, subdomain enumeration, DNS

**IPv4 / IPv6**

192.168.1.1

DNS resolution, cloud discovery

**Port**

443/tcp, 22/tcp

Port scanning

**Web Application**

https://app.example.com

URL parsing, crawling

**Cloud Resource**

EC2 instance, S3 bucket

Cloud integration (AWS / Azure / GCP)

**Repository**

github.com/org/repo

Source code integration

**Certificate**

\*.example.com

TLS certificate mining

## Understanding Risk Severity

Guard assigns severity to every risk using multiple intelligence sources:

*   **CVSS-based scoring** — Industry-standard base scores enriched with exploit intelligence. Guard adjusts severity when real-world exploit data changes the risk profile.
    
*   **CISA KEV status** — Risks flagged in the CISA Known Exploited Vulnerabilities catalog are elevated because they are confirmed to be actively exploited in the wild.
    
*   **EPSS score** — The Exploit Prediction Scoring System estimates the probability a vulnerability will be exploited in the next 30 days, helping you prioritize what to fix first.
    

These three signals combine to give you a severity rating that reflects actual risk to your organization, not just theoretical impact.

## Getting Help

*   **AI Chat** — Click the chat icon in the bottom right to ask natural language questions about your environment, findings, or platform features.
    
*   **Your Praetorian team** — Contact your assigned Praetorian team for expert guidance on findings, remediation strategies, or platform configuration.
    
*   **Help center** — Browse documentation at [docs.praetorian.com](https://docs.praetorian.com).
    

## Onboarding Journey Complete!

> You've completed the onboarding journey! From here, explore **Platform Modules** to understand what Guard does at each layer, or dive into the **Features Reference** for detailed documentation on every capability.

*   [Platform Modules](#)
    
*   [Features Reference](#)
    
*   [AI Overview](#)
