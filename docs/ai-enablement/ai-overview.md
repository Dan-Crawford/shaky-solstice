---
title: "AI Overview"
description: "AI Overview"
featurebaseId: "1610051"
---

## Overview

The Praetorian Guard Platform (PGP) integrates AI capabilities across a progressive enablement model that scales from simple data queries to fully autonomous offensive security operations. AI is not a single feature — it is an operational layer that augments every aspect of attack surface management, vulnerability triage, and threat validation.

The AI system is built on AWS Bedrock with Claude as the inference backbone, combined with a retrieval-augmented generation (RAG) pipeline that grounds responses in your actual security data. This architecture ensures that AI outputs are factual, tenant-isolated, and directly actionable.

## AI Enablement Tiers

PGP offers three progressive tiers of AI enablement, each building on the previous:

### Tier 1: AI Inference (Query Mode)

The foundation of AI in PGP. When AI Inference is enabled, users gain access to the **AI Assistant** in query mode. This allows natural language questions about your security posture — asset counts, risk summaries, technology inventories, and relationship queries — all answered with factual data retrieved directly from your attack surface graph.

Query mode is read-only. It cannot modify data, execute scans, or trigger any active operations. It is available to all users with no role restrictions beyond the base AI Inference flag.

### Tier 2: AI Automation (Passive Agents)

When AI Automation is enabled, PGP activates background agents that continuously improve data quality without human intervention:

*   **Auto-Triage Agent** — Automatically reviews new findings and triages them based on severity, evidence quality, and historical patterns
*   **Asset Affiliation Agent** — Correlates assets across discovery sources (IP addresses, domains, cloud resources) to build accurate ownership maps

These agents operate passively on your existing data. They do not initiate scans, create new connections to external systems, or perform any active testing.

### Tier 3: AI Agents (Full Agent Mode)

The most powerful tier unlocks **Aurelius**, PGP's AI operator persona, and a team of specialist agents that can execute reconnaissance, scanning, and offensive operations. Agent mode requires the AI Agents flag to be enabled and the user must hold an Analyst or Admin role.

In this tier, users can direct Aurelius to:

*   Delegate reconnaissance to specialist agents (Asset Analyzer, Aurelian for cloud discovery)
*   Execute scanning agents (Julius for LLM fingerprinting, Titus for secret scanning, Trajan for CI/CD security)
*   Launch offensive operations (Brutus for credential testing, Augustus for LLM attacks)
*   Validate findings and remediation (Cato for triage validation, Priscus for retesting, Seneca for CVE research)

## Architecture

The AI system consists of three key components:

1.  **Conversation Engine** — Manages stateful chat sessions between users and the AI, persisting messages in DynamoDB with full audit trails
2.  **Agent Framework** — A tool-calling loop powered by AWS Bedrock that allows agents to query data, execute capabilities, and spawn sub-agents
3.  **RAG Pipeline** — Amazon Titan embeddings with PostgreSQL pgvector for grounding AI responses in your organization's actual findings and knowledge base

## Security and Isolation

All AI operations enforce strict multi-tenant isolation. Every query, agent execution, and conversation is scoped to the authenticated user's organization partition. Praetorian operators can access customer environments through impersonation, but the AI system respects the same role-based access controls as the rest of the platform.
