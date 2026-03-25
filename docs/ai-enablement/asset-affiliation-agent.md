---
title: "Asset Affiliation Agent"
description: "Asset Affiliation Agent"
featurebaseId: "1449142"
---

## Overview

The Asset Affiliation Agent is an AI-powered system that automatically determines whether discovered assets, risks, and DNS records belong to your organization. As Guard continuously discovers your external attack surface, new assets surface that need to be verified — the Affiliation Agent handles this at scale so your team can focus on remediation rather than manual triage.

The agent combines data from your cloud integrations, DNS infrastructure, SSL certificates, WHOIS records, and web content analysis to make a confidence-scored determination: **Confirmed**, **Likely Confirmed**, or **Uncertain**. This multi-source approach eliminates guesswork and ensures assets are correctly attributed to your organization before they enter your active attack surface.

A critical capability of the Affiliation Agent is **dangling DNS detection** — identifying DNS records that point to resources your organization no longer controls. Dangling DNS records are a common attack vector for subdomain takeover, and the agent proactively surfaces these before external researchers or attackers discover them.

## What the Affiliation Agent Does

The Affiliation Agent runs automatically when Guard discovers new assets, risks, or pending seed domains. It operates in a read-only capacity against your environment and produces affiliation determinations without modifying any of your assets or configurations.

**Data flow:**

1.  Guard discovers a new asset, risk, or seed domain
    
2.  The Affiliation Agent receives the discovery event containing the asset key, DNS name, and event type
    
3.  The agent retrieves your organization name and any known alternative names (from WHOIS and SEC/EDGAR filings)
    
4.  **Cloud integration check** — For assets with parent resources, the agent cross-references cloud provider integrations (AWS, Azure, GCP) to verify the asset exists within your cloud accounts
    
5.  **Dangling DNS check** — Reverse DNS records and cloud resource identifiers are compared to detect records pointing to resources outside your cloud integration
    
6.  **AI analysis pipeline** — Four specialized AI agents (DNS, SSL, WHOIS, Web Search) independently analyze the domain, then a Verifier Agent synthesizes their findings into a final determination
    
7.  The determination (Confirmed, Likely Confirmed, or Uncertain) along with evidence is written back to the asset record
    

**Supported event types:**

Event Type

What Gets Analyzed

**Asset**

Individual discovered assets (IPs, domains, subdomains)

**Risk**

All assets associated with a discovered vulnerability

**Seed**

Pending seed domains awaiting approval into your attack surface

## Prerequisites

To get the most out of the Affiliation Agent, ensure the following are in place:

*   **Active Guard account** with at least one seed domain configured
    
*   **Cloud integrations connected** — AWS, Azure, and/or GCP integrations enable the agent to cross-check cloud asset ownership. Without cloud integrations, the agent relies solely on AI-based analysis (DNS, SSL, WHOIS, web search)
    
*   **Organization display name set** — Navigate to **Settings > Organization** and ensure your organization name is configured. The agent uses this name (and any registered alternative names) to match against WHOIS registrants, SSL certificate organizations, and web content
    

**No additional credentials or API keys are required** — the Affiliation Agent runs as part of Guard's backend infrastructure and uses your existing cloud integration credentials for cross-referencing.

## Setup

The Affiliation Agent requires two platform flags to be enabled. These are managed by your Praetorian team.

The required flags are AI Inference, which enables features including the Affiliation Agent's multi-agent analysis pipeline (DNS, SSL, WHOIS, Web Search agents), and AI Automation which enables automated AI agent execution, allowing the Affiliation Agent to run proactively on new discoveries.

When **AI Inference** is disabled, the agent cannot perform its LLM-based analysis (the four specialized agents and verifier). When **AI Automation** is disabled, the agent will not run automatically on new asset discoveries.

### Configuration for Accuracy

Once the flags are enabled, verify these settings to maximize detection accuracy:

Setting

Location

Purpose

**Organization Name**

Settings > Organization > Display Name

**Required** — The agent will not run without this. Used to match against WHOIS, SSL, and web content

**Cloud Integrations**

Settings > Integrations

Enables cross-cloud dangling DNS detection by verifying asset ownership in your cloud accounts

**Seed Domains**

Assets > Seeds

Defines your known attack surface perimeter — TLD ownership is the strongest affiliation signal

The agent automatically discovers alternative names for your organization through approved pre-seeds — these include WHOIS-registered company names and SEC/EDGAR filing names that are associated with your account.

## What Gets Analyzed

The Affiliation Agent performs a comprehensive, multi-layered analysis for every discovery event:

### Cloud Integration Cross-Check

When an asset has parent resources in your cloud environment, the agent verifies ownership:

*   **Cloud asset lookup** — Checks if the IP or hostname exists within your connected AWS, Azure, or GCP accounts
    
*   **Account ID verification** — Confirms the cloud resource belongs to one of your registered cloud accounts
    
*   **Cross-cloud validation** — If a DNS record points to a cloud IP (e.g., an AWS EC2 instance), the agent checks whether that IP exists in your corresponding cloud integration
    

### Dangling DNS Detection

The agent identifies DNS records that may be vulnerable to subdomain takeover:

*   **Reverse DNS analysis** — Retrieves reverse DNS (rDNS) records for asset IPs and checks for cloud provider patterns (e.g., `ec2-*.compute.amazonaws.com`)
    
*   **Cloud resource existence check** — When rDNS indicates a cloud resource (like an EC2 instance), the agent verifies that instance exists within your cloud integration via its ARN. If the rDNS points to a cloud instance but no matching ARN exists in your integration, it flags the record as **likely dangling**
    
*   **Ownership change detection** — Assets where DNS records previously pointed to your infrastructure but now resolve to IPs outside your cloud perimeter are flagged for review. This catches scenarios where resources were decommissioned or transferred but DNS records were never updated
    
*   **Integration gap identification** — When reverse DNS points to a cloud resource but you have no cloud integration configured for that provider, the agent notes this as an area that cannot be verified, prompting you to connect the integration
    

**Dangling DNS verdicts:**

Verdict

Meaning

**Likely**

Reverse DNS points to a cloud instance not present in your cloud integration — probable dangling record

**Unlikely**

Reverse DNS points to a cloud instance that exists within your cloud integration

**NA**

No reverse DNS found, or reverse DNS does not point to a cloud resource

### AI-Powered Domain Analysis

Four specialized AI agents independently analyze the domain:

**DNS Agent** — Examines DNS record types (A, AAAA, MX, CNAME, TXT) for evidence linking the domain to your organization. Looks for mail server patterns, CNAME chains, and SPF/DKIM records that reference your known infrastructure.

**SSL Agent** — Analyzes SSL/TLS certificates across all HTTPS ports (443, 8443, and any other detected HTTPS ports). Checks the certificate Common Name, Organization field, and Subject Alternative Names for matches against your organization name and known aliases. Certificate mismatches — where the certificate organization differs from the expected owner — are a key dangling DNS indicator.

**WHOIS Agent** — Examines domain registration records including registrant organization, administrative contacts, and registrant email domains. For seed domains, raw WHOIS data is retrieved and analyzed. Matches against your organization name, subsidiaries, and known alternative names.

**Web Search Agent** — Performs web searches correlating the domain with your organization name, SSL certificate details, and known aliases. Identifies public references, documentation, or corporate pages that establish a connection between the domain and your organization.

### Verifier Agent (Final Synthesis)

A Verifier Agent synthesizes all four agent outputs with weighted priority:

1.  **TLD ownership** (highest priority) — If the top-level domain is a confirmed seed in your account, affiliation is confirmed regardless of other findings
    
2.  **Web Search** (high priority) — A "Connected" finding strongly indicates affiliation
    
3.  **WHOIS** (45% weight) — Registration data matching your organization
    
4.  **SSL** (45% weight) — Certificate data matching your organization
    
5.  **DNS** (10% weight) — DNS record patterns indicating ownership
    

**Final determination:**

Outcome

Criteria

**Confirmed**

TLD is a registered seed; or web search confirms connection; or both WHOIS and SSL match; or 3+ agents report positive

**Likely Confirmed**

At least one of WHOIS or SSL matches; or two agents report positive with no contradictions

**Uncertain**

Insufficient evidence, contradictory findings, or all agents report unclear

## API Endpoints Used

The Affiliation Agent operates as an internal Guard backend service and does not expose external API endpoints. It leverages the following internal and external data sources:

Source

Data Retrieved

Purpose

**Neo4j Graph Database**

Asset relationships, seed domains, parent assets, cloud attributes, risk associations

Core platform data for asset lineage and cloud cross-referencing

**DynamoDB**

Organization display name, account settings

Organization identity for matching

**AWS Cloud Integration**

EC2 ARNs, Route 53 hosted zones, cloud account IDs

Cross-cloud dangling DNS verification

**SSL/TLS (port 443, 8443+)**

Certificate Common Name, Organization, SANs, issuer

Certificate-based ownership analysis

**DNS Resolution**

A, AAAA, MX, CNAME, TXT, reverse DNS records

DNS-based ownership and dangling detection

**WHOIS**

Registrant organization, admin contacts, registrar info

Registration-based ownership analysis

**Google Custom Search**

Web content referencing domain + organization

Web presence correlation

**S3 (Guard bucket)**

Cached WHOIS data for seed domains

Efficient seed affiliation processing

## Troubleshooting

Issue

Cause

Fix

Agent returns "Uncertain" for assets you own

Organization display name not set or doesn't match WHOIS/SSL records

Set your organization name in **Settings > Organization** and add any subsidiary or brand names as pre-seeds

Dangling DNS not detected for a known dangling record

Cloud integration not connected for the relevant provider

Connect your AWS, Azure, or GCP integration in **Settings > Integrations**

Agent skips affiliation for your account

No organization name configured

Set the org name in **Settings > Organization > Display Name**

"Likely dangling" flagged for a valid resource

Cloud integration exists but resource was recently provisioned

Allow time for the cloud integration to sync the new resource, then re-run

Seed domain shows "Unknown" TLD status

Seed was recently added and hasn't been fully processed

Wait for the seed processing pipeline to complete

Agent doesn't detect alternative company names

Pre-seeds not approved

Review and approve pending pre-seeds in the Seeds section — these include WHOIS and EDGAR-discovered company names

## Security and Data Handling

The Affiliation Agent operates with the following security properties:

*   **Read-only operations** — The agent queries your cloud integrations, DNS infrastructure, and certificate data without making any modifications
    
*   **No credential exposure** — Cloud integration credentials are accessed via IAM role assumption (STS) with scoped, time-limited sessions
    
*   **AI processing isolation** — Domain analysis is performed via the Anthropic Claude API with structured output schemas. No customer data is used for model training
    
*   **Evidence-based determinations** — Every affiliation verdict includes detailed evidence trails showing exactly what data led to the conclusion, enabling human review of any determination
    
*   **Scoped data access** — The agent only accesses assets, risks, and seeds associated with your specific account. Cross-tenant data isolation is enforced at the database query level
