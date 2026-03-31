---
title: "Automated Agents"
description: "Automated Agents"
featurebaseId: "9120956"
---

## Overview

Automated agents operate in the background without user interaction, continuously improving data quality across your attack surface. Unlike the specialist agents commanded by Aurelius, automated agents run on data events — when new findings arrive or new assets are discovered, these agents activate to process them automatically.

Automated agents are controlled by the **AI Automation** feature flag and do not require the AI Agents flag or any specific user role to operate.

## Auto-Triage Agent

The Auto-Triage agent automatically reviews new security findings as they enter the triage pipeline. It evaluates evidence quality, assesses severity, and makes preliminary triage decisions to accelerate the review process.

### What It Does

*   Monitors incoming risk entities for new triage findings
*   Evaluates the quality and completeness of finding evidence
*   Applies consistent severity assessment based on historical patterns
*   Flags findings that require human review versus those that can be auto-processed

### Data Types Processed

Risks only — the auto-triage agent operates exclusively on risk entities.

### When It Runs

Automatically triggered when new risk entities enter the triage pipeline. No manual invocation required.

## Asset Affiliation Agent

The Asset Affiliation agent correlates assets across discovery sources to build accurate ownership maps. When an IP address is discovered by one scanner and a domain by another, the affiliation agent determines whether they belong to the same organization.

### What It Does

*   Correlates assets across multiple discovery sources
*   Resolves overlapping asset records (same infrastructure discovered through different paths)
*   Builds ownership relationships between IP addresses, domains, and cloud resources
*   Runs integration affiliation jobs to cross-reference external data sources

### Data Types Processed

Assets and Risks — the affiliation agent processes both asset entities (for correlation) and risk entities (for asset-risk relationship mapping).

### Supported Asset Classes

*   IPv4 addresses
*   IPv6 addresses
*   Domains
*   Top-level domains (TLDs)

### Access Restriction

The Asset Affiliation agent is currently available to **Praetorian operators only**. Non-Praetorian users cannot trigger affiliation operations.

### When It Runs

Manually triggered through the platform UI or API by selecting an asset and requesting affiliation analysis. Unlike auto-triage, affiliation is not fully automated — it requires explicit invocation.

## Risk Definition Agent (Auto-Vulnerability Hydration)

The Risk Definition agent automatically enriches vulnerability findings with structured metadata including CWE classifications, CVSS scores, and remediation guidance from knowledge bases.

### What It Does

*   Hydrates raw vulnerability findings with standardized metadata
*   Maps findings to CWE classifications for consistent categorization
*   Enriches findings with remediation guidance from the knowledge base

## Comparison with Specialist Agents

Aspect

Automated Agents

Specialist Agents (Aurelius Team)

**Trigger**

Data events or manual invocation

User conversation with Aurelius

**User Interaction**

None required

Conversational, confirmation-based

**Feature Flag**

AI Automation

AI Agents

**Role Required**

None (system-level)

Analyst or Admin

**Scope**

Data quality improvement

Offensive security operations

**Examples**

Auto-triage, affiliation, vuln hydration

Brutus, Augustus, Julius, Trajan, etc.

## Prerequisites

*   **AI Inference** must be enabled (master AI switch)
*   **AI Automation** flag should be enabled (enabled by default for new customers)
*   No specific user role required — automated agents run at the system level
