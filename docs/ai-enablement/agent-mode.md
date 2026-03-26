---
title: "Agent Mode"
description: "Agent Mode"
featurebaseId: "9368368"
---

## Overview

Agent Mode is the operational tier of Guard's AI Assistant. While the default query mode retrieves and presents data from your security database, Agent Mode enables Aurelius — Guard's AI security operator — to execute scans, delegate tasks to specialist agents, build attack graphs, and manage assets on your behalf.

Agent Mode is disabled by default for customer accounts and must be explicitly enabled by a Praetorian operator. When enabled, users with the Analyst or Admin role can switch into Agent Mode from any AI Assistant conversation.

## Query Mode vs Agent Mode

**Capability**

**Query Mode**

**Agent Mode**

Search assets, risks, and findings

✓

✓

Explore database schema

✓

✓

List available capabilities

✓

✓

Generate reports and executive summaries

✓

✓

Execute security scans

✗

✓

Add and link webpages

✗

✓

Build attack graphs

✗

✓

Look up MITRE ATT&CK techniques

✗

✓

Delegate to specialist agents

✗

✓

Query Mode is strictly factual — it reports what exists in the system without analysis, recommendations, or inferences. Agent Mode adds operational judgment: Aurelius can plan multi-step security operations, recommend which scans to run, and execute them with your confirmation.

## Enabling Agent Mode

### Account-Level Flag

A Praetorian operator must enable the **AI Agents** feature flag on the customer's account via the Settings page. This flag is disabled by default.

### Role Requirements

Even when the account flag is enabled, only users with the **Analyst** or **Admin** role can access Agent Mode. Users with read-only roles will see the mode toggle but cannot switch to it.

### Switching Modes

The AI Assistant displays a mode toggle button in the conversation header. Query mode is indicated in blue; Agent Mode is indicated in red. The selected mode is saved per conversation — switching modes in one conversation does not affect others.

## Aurelius — The AI Operator

When you enter Agent Mode, you are working with **Aurelius**, Guard's AI security operator. Aurelius acts as a coordinator: it assesses your request, identifies the appropriate course of action, and either acts directly or delegates to a specialist agent.

### Direct Actions

Aurelius handles the following directly:

*   Data queries across all entity types (assets, risks, ports, technologies, seeds, cloud resources)
    
*   Executing non-agent security scans (Nuclei templates, port scans, subdomain enumeration)
    
*   Adding and linking webpages to the asset inventory
    
*   Building and validating attack graphs
    
*   Looking up MITRE ATT&CK tactics and techniques
    

### Agent Delegation

For specialized security workflows, Aurelius delegates to purpose-built agents. Each specialist agent has a defined scope, impact level, and set of capabilities. Aurelius selects the right agent based on your request and provides it with a specific task description.

The specialist agents are organized into four operational tiers:

### Reconnaissance Agents

Read-only agents that gather information without creating findings or sending probe traffic.

*   **Asset Analyzer** — Deep-dive analysis of individual assets including risk assessment, technology fingerprinting, and capability recommendations
    
*   **Aurelian** — Cloud infrastructure discovery across AWS, Azure, and GCP
    

### Scanning Agents

Probing agents that send targeted traffic and create findings in the triage pipeline, but do not exploit vulnerabilities.

*   **Julius** — LLM service fingerprinting across HTTP endpoints (Ollama, OpenAI, LocalAI, vLLM)
    
*   **Titus** — Secrets and credential scanning across repositories and code
    
*   **Trajan** — CI/CD pipeline security scanning across GitHub Actions, GitLab CI, Azure DevOps, Jenkins, and JFrog
    

### Offensive Agents

Active exploitation agents that demonstrate real impact. These agents **require operator confirmation** before execution — Aurelius will present the planned attack and wait for your approval.

*   **Brutus** — Credential testing against authentication services (SSH, RDP, FTP, SMB)
    
*   **Augustus** — LLM jailbreak detection and prompt injection testing (requires Julius fingerprinting first)
    

### Validation Agents

Finding review agents that enrich, validate, or retest existing findings without discovering new vulnerabilities.

*   **Cato** — Evidence-based finding validation with promote/reject decisions and severity calibration
    
*   **Priscus** — Remediation retesting to verify that fixes actually resolved the vulnerability
    
*   **Seneca** — CVE research enrichment with exploit intelligence and detection templates
    

## Operator Confirmation

Agent Mode follows a confirmation-first workflow for actions that modify your environment:

*   **Scans** — Aurelius describes the scan target and capability before execution and waits for confirmation
    
*   **Offensive operations** — Aurelius presents a full attack plan including target, technique, and expected impact before proceeding
    
*   **Data queries** — No confirmation required (read-only)
    

This ensures that no scanning or exploitation occurs without explicit operator approval.

## Scope and Isolation

All Agent Mode operations are bound to the same tenant isolation and scope rules as the rest of Guard:

*   Agents can only operate against assets present in your account's inventory
    
*   Scan results and findings are stored within your tenant partition
    
*   No cross-tenant data access is possible, regardless of mode
    
*   The Rules of Engagement enforce strict scope — agents cannot operate outside your platform inventory
    

## Summary

**Question**

**Answer**

What is Agent Mode?

The operational tier of the AI Assistant that enables security scans, agent delegation, and attack graph building

How is it enabled?

A Praetorian operator enables the AI Agents flag, then Analyst/Admin users can toggle it per conversation

Who can use it?

Users with the Analyst or Admin role on accounts with the AI Agents flag enabled

What does Aurelius do?

Coordinates operations — acts directly for queries and scans, delegates to specialist agents for complex workflows

How many specialist agents exist?

10 — spanning reconnaissance, scanning, offensive, and validation tiers

Are offensive actions automatic?

No — Aurelius presents the plan and waits for operator confirmation before any exploitation

Is data isolated?

Yes — all operations are scoped to your account's assets with full tenant isolation
