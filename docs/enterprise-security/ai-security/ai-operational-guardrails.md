---
title: "AI Operational Guardrails"
description: "AI Operational Guardrails"
featurebaseId: "7263042"
---

## Overview

Praetorian Guard Platform (PGP) implements defense-in-depth guardrails to ensure AI operates safely, predictably, and within defined boundaries. These controls are enforced at the code level — not just in prompts — making them resistant to circumvention.

## Scope Enforcement

-   **Tool Authorization**: The AI assistant can only invoke a pre-defined set of platform operations. Each agent declares its allowed tools, and only whitelisted tools are made available during execution. The AI cannot discover or invoke tools outside its declared set.
-   **Agent Boundaries**: When the AI delegates specialized analysis tasks, each sub-task inherits strict authorization policies. A parent agent can only spawn sub-agents from its declared allowed list — validated at runtime before any delegation occurs.
-   **Recursion Limits**: Nested AI operations are bounded by hard depth limits, preventing runaway execution chains. This is enforced as a constant in the execution engine, not a configurable parameter that could be overridden.
-   **Iteration Controls**: Each AI agent has a configurable maximum number of operations it can perform in a single session, preventing unbounded execution. The default limit ensures the assistant completes focused tasks without open-ended looping.

## Structured Output Enforcement

-   **Schema Validation**: AI responses that produce structured data — such as risk assessments, asset classifications, and query results — are validated against strict JSON schemas before delivery. Invalid or malformed outputs are automatically corrected through a retry mechanism, ensuring you always receive well-formed data.
-   **Query Field Validation**: AI-initiated database queries are validated against a comprehensive field whitelist containing over 200 authorized fields. The AI cannot reference unauthorized or non-existent data fields, preventing both errors and unintended data access.

## Rate Controls and Resource Protection

-   **Execution Timeouts**: Every AI operation is subject to strict time limits, ensuring the system remains responsive and cannot be tied up by a single request.
-   **Response Size Limits**: AI-generated outputs are bounded to prevent excessive data exposure in a single response. Oversized responses are automatically truncated with clear indicators.
-   **Capability Rate Limiting**: AI-initiated security scanning operations are subject to configurable rate limits, protecting your infrastructure from excessive scan activity.
-   **Graceful Cancellation**: Long-running AI operations support clean cancellation, ensuring the platform remains responsive and resources are released promptly.
-   **Automatic Recovery**: AI operations include automatic recovery from unexpected failures, ensuring platform stability even under abnormal conditions.

## Domain Deny Lists

PGP maintains curated deny lists that prevent AI-initiated scanning or analysis against protected domains. These safeguards ensure that automated security operations — whether initiated by a human operator or the AI assistant — respect organizational and contractual boundaries.

## Human-in-the-Loop Controls

Critical security decisions require human authorization. The AI assistant must confirm with the operator before executing active scans or offensive security capabilities. This ensures that consequential actions always have explicit human approval.
