---
title: "Responsible AI Principles"
description: "Responsible AI Principles"
featurebaseId: "5328855"
---

## Overview

Praetorian is committed to responsible AI use in security operations. Our AI capabilities are designed to augment human expertise while maintaining the highest standards of safety, transparency, and accountability.

## Human Oversight

AI augments your security team's capabilities — it does not replace human judgment. Critical security decisions require explicit human authorization:

-   Initiating active security scans against your infrastructure
-   Executing offensive security capabilities
-   Modifying risk status or asset classifications
-   Any action that could affect your production environment

The AI assistant is designed to inform, analyze, and recommend — while humans retain authority over consequential decisions.

## Transparency

-   **Clear Identity**: The AI assistant identifies itself and its capabilities. It does not impersonate human analysts or obscure that responses are AI-generated.
-   **Capability Boundaries**: The assistant communicates what it can and cannot do, including when questions fall outside its knowledge or capabilities.
-   **Source Visibility**: AI-generated insights reference the platform data they are derived from, allowing you to verify conclusions against source information.

## Minimal Privilege

AI operations follow the principle of least privilege:

-   Each AI agent only has access to the specific tools required for its designated task
-   Sub-agents inherit restricted permission sets from their parent — they cannot escalate their own privileges
-   Data access is scoped to your tenant partition with no ability to access other organizations' data
-   Security scanning capabilities are gated behind explicit authorization checks

## Continuous Improvement

We regularly evaluate AI behavior against safety benchmarks and update guardrails as the threat landscape evolves. Our approach includes:

-   Regular review of AI operational patterns and edge cases
-   Updates to content safety controls as new risk categories emerge
-   Refinement of grounding and accuracy techniques based on real-world performance
-   Alignment with evolving industry standards including NIST AI Risk Management Framework and OWASP LLM Top 10

## Frequently Asked Questions

### Is my data used to train AI models?

No. Your data is never used for model training, fine-tuning, or improvement. All AI inference uses pre-trained foundation models through AWS Bedrock with explicit data non-retention agreements.

### Can the AI assistant access data from other customers?

No. All AI operations are scoped to your tenant partition. The same multi-tenant isolation controls that protect your assets, risks, and configurations apply equally to AI interactions.

### Can the AI assistant perform actions I have not authorized?

No. The AI assistant operates within a strictly defined set of authorized tools. Each tool invocation is validated against your entitlements and the declared permissions before execution. Actions outside its authorized scope are rejected at the platform level — not just at the prompt level.

### How does Praetorian prevent AI hallucination from affecting my security posture?

The AI assistant is grounded in your actual platform data — it queries your assets, vulnerabilities, and configurations directly rather than relying on memory or assumptions. All data-dependent responses are backed by real-time queries with confidence scoring, structured outputs are schema-validated, and query fields are checked against an authorized whitelist.

### How is sensitive data protected during AI processing?

Security findings are automatically anonymized before being processed by the AI knowledge system — sensitive identifiers like usernames, credentials, and API keys are replaced with typed placeholders. Your data is encrypted with tenant-specific AES-256 keys, and all AI inference runs through AWS Bedrock with no data retention by the model provider.
