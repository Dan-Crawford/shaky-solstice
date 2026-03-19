---
title: "AI Audit Trail and Observability"
description: "AI Audit Trail and Observability"
featurebaseId: "6733798"
---

## Overview

Every AI interaction within Praetorian Guard Platform (PGP) is comprehensively logged, traced, and attributed to the requesting user. This provides full observability into AI behavior and supports compliance, incident investigation, and security monitoring requirements.

## Conversation Logging

* **Full Interaction History**: Every AI interaction — questions, tool invocations, and responses — is logged and associated with the requesting user. Conversations are stored with unique identifiers for easy retrieval and audit.
* **Role Attribution**: Each message in a conversation is tagged with its source role (user input, AI response, tool invocation, tool result), providing clear visibility into the flow of each interaction.
* **Parent-Child Tracking**: When the AI delegates tasks to specialized sub-agents, the parent-child relationship between conversations is preserved, enabling end-to-end tracing of complex multi-step analyses.

## Distributed Tracing

* **Trace IDs**: AI operations are instrumented with unique trace identifiers that flow through every stage of processing — from initial request through tool execution to final response.
* **Span Tracking**: Each operation within a trace receives its own span identifier with parent-span linkage, enabling precise reconstruction of execution flows.
* **User Attribution**: Every trace event includes the requesting user's identity, ensuring all AI activity can be attributed to the user who initiated it.

## Tool Invocation Records

* **Action Logging**: Each action the AI takes on your behalf is recorded with the operation name, parameters, and result. This provides a complete audit trail of what the AI did, why, and what it found.
* **Timeout and Error Logging**: Tool execution timeouts, failures, and response truncations are explicitly logged with structured metadata, enabling rapid diagnosis of any issues.
* **Event Emission**: Agent start and end events are emitted with rich attributes, providing observability hooks for monitoring and alerting systems.

## Input Sanitization

All inputs to AI-adjacent systems are validated through comprehensive sanitization layers — including shell escape protection, path traversal prevention, null byte detection, and type-specific parameter validation. These controls ensure the integrity of data flowing through the platform and are logged when violations are detected.
