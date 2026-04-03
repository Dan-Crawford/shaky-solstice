---
title: "Understanding Your Dashboard"
description: "Understanding Your Dashboard"
featurebaseId: "0123569"
---

## Dashboard Overview

\[SCREENSHOT: Full dashboard with numbered callouts\]

The dashboard gives you a real-time view of your security posture. At a glance, you can see how many assets are in your attack surface, where your highest risks are, and what scans are currently running.

Key metrics at a glance:

*   **Asset count** — Total assets broken down by type and status
    
*   **Risk breakdown** — Vulnerabilities organized by severity
    
*   **Scan activity** — Active jobs, completed scans, and discovery timeline
    

## Key Metrics

### Asset Count

Your asset count is broken down by type (domains, IPs, cloud resources, certificates, and more) and by status (Pending, Active, Frozen, Deleted). This tells you exactly what is in scope and being monitored.

### Risk Breakdown

Risks are categorized by severity using CVSS scores:

Severity

CVSS Range

Meaning

**Critical**

9.0+

Actively exploitable, severe impact

**High**

7.0–8.9

Significant risk, prioritize remediation

**Medium**

4.0–6.9

Moderate risk, schedule for remediation

**Low**

0.1–3.9

Minor risk, address as resources allow

**Info**

0.0

Informational finding, no direct risk

### Scan Activity

The scan activity section shows active jobs currently running, recently completed scans, and a discovery timeline that tracks how your attack surface has changed over time.

## Navigation

The left sidebar is your primary navigation. Each section serves a specific purpose:

Section

Description

**Assets**

Your complete attack surface inventory. Browse, filter, and manage all discovered assets.

**Risks**

Vulnerabilities discovered across your assets. Filter by severity, status, or asset.

**Insights**

Query builder for advanced analysis and attack path visualization.

**Integrations**

Connect your security tools, cloud accounts, and ticketing systems.

**Settings**

Account settings, scan configuration, and user management.

**AI Chat**

Natural language interface to query and explore your security data.

\[SCREENSHOT: Sidebar with callouts\]

## Asset States

Every asset in the platform has a status that controls whether it is scanned and monitored:

StatusI con

Meaning

**Pending**

Newly discovered, awaiting activation

**Active**

Actively scanned and monitored

**Frozen**

Temporarily paused from scanning

**Deleted**

Permanently removed from inventory

New assets from discovery start as **Pending**. You promote them to **Active** to begin scanning. If you need to temporarily stop scanning an asset without removing it, set it to **Frozen**. Deleted assets are permanently removed from your inventory.

## Risk States

Risks follow a lifecycle that tracks them from discovery through resolution:

Status

Meaning

**Open**

Confirmed vulnerability, needs attention

**Triaged**

Reviewed and prioritized by your team

**Remediated**

Fixed and verified as resolved

**Deleted**

False positive or accepted risk (won't fix)

The standard lifecycle is **Open → Triaged → Remediated**. When your team reviews an open risk and makes a decision on priority, move it to Triaged. Once the underlying issue is fixed, mark it as Remediated. If a previously remediated risk is re-detected in a subsequent scan, it will automatically reopen as Open.

## What's Next

*   [Navigating the Platform](#) — Learn how to use each section in depth
    
*   [Risk Lifecycle Deep Dive](#) — Understand the full risk management workflow
    
*   [AI Features](#) — Get the most out of the AI Chat interface
