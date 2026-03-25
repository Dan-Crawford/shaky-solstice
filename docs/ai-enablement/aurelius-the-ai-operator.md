---
title: "Aurelius: The AI Operator"
description: "Aurelius: The AI Operator"
featurebaseId: "8682301"
---

## Overview

Aurelius is the AI operator persona for the Praetorian Guard Platform, named after the Stoic philosopher-emperor Marcus Aurelius. When Agent Mode is enabled, Aurelius serves as the top-level orchestrator that commands a team of specialized offensive security agents to conduct reconnaissance, scanning, and attack operations across your attack surface.

Aurelius is not a single tool — it is a strategic operator that assesses your security posture, plans attack paths, delegates to specialist agents, and coordinates multi-step offensive campaigns. It operates within the same rules of engagement as human Praetorian operators: all targets must exist in the platform, all operations require confirmation, and no denial-of-service or availability attacks are permitted.

## How Aurelius Works

When you switch the AI Assistant to Agent Mode (indicated by a red badge), Aurelius follows a structured operational workflow:

1.  **Assess** — Query the attack surface to understand scope and current security posture
    
2.  **Analyze** — Identify highest-value targets, weakest links, and viable attack paths
    
3.  **Plan** — Propose an attack plan with specific capabilities, targets, and expected outcomes
    
4.  **Confirm** — Present the plan to the operator for approval before executing
    
5.  **Execute** — Run approved operations and report findings with evidence of impact
    
6.  **Report** — Deliver results focused on material risk demonstrated and remediation guidance
    

## Specialist Agent Team

Aurelius delegates specialized tasks to purpose-built agents using the `spawn_agent` mechanism. Each agent is an autonomous operator with its own tools, skills, and operational constraints:

Agent

Specialty

Category

**Asset Analyzer**

Deep-dive security analysis of individual assets

Reconnaissance

**Aurelian**

Cloud infrastructure discovery (AWS, Azure, GCP)

Reconnaissance

**Julius**

LLM service fingerprinting on HTTP endpoints

Scanning

**Titus**

Repository secret scanning across git history

Scanning

**Trajan**

CI/CD pipeline security scanning

Scanning

**Brutus**

Credential testing against authentication services

Offensive

**Augustus**

LLM jailbreak and prompt injection testing

Offensive

**Cato**

Finding validation and severity calibration

Validation

**Priscus**

Remediation retest verification

Validation

**Seneca**

CVE research and exploit intelligence enrichment

Validation

## Agent Dispatch Mechanism

Aurelius uses two dispatch paths depending on the execution context:

*   **Synchronous dispatch** — For compute-context operations, sub-agents execute in-process and return results directly to Aurelius. This enables real-time multi-step workflows where one agent's output feeds the next.
    
*   **Asynchronous dispatch** — For gateway-context operations, sub-agents are queued via SQS for background processing. Results are persisted to the conversation and available on the next polling cycle.
    

Agent nesting is limited to 5 levels deep to prevent runaway recursion. Each agent has a configurable maximum of 25 tool calls per execution to bound operational scope.

## Direct Tools

In addition to delegating to specialist agents, Aurelius can directly use:

Tool

Purpose

**Query**

Search the security database for entities and relationships

**Schema**

Inspect database schema for query construction

**Capabilities**

List available security scanning capabilities

**Job**

Execute non-agent scans (Nuclei, portscan, subdomain enumeration, etc.)

**Attack Graph**

Build and validate attack path visualizations with MITRE ATT&CK mappings

**List TTPs**

Look up MITRE ATT&CK tactics and techniques

## Rules of Engagement

*   **No denial-of-service** — Cannot degrade or disrupt client systems
    
*   **Strict scope enforcement** — Only operates against assets present in the platform
    
*   **No production modification** — Cannot alter configurations, delete data, or change system state
    
*   **Operator confirmation required** — Always confirms before executing active scans or offensive capabilities
    
*   **Tool execution limits** — Maximum 3 retries per tool, 10 tools before progress summary
    

## Prerequisites

*   **AI Inference** must be enabled
    
*   **AI Agents** must be enabled (for non-Praetorian users)
    
*   User must hold **Analyst** or **Admin** role
    

## Accessing Agent Mode

1.  Open the **AI Assistant**
    
2.  Click the **mode toggle** to switch from Query (blue) to Agent (red)
    
3.  Begin your conversation with an operational objective
    
4.  Aurelius will assess, plan, and request confirmation before executing any active operations
