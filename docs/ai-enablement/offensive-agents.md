---
title: "Offensive Agents"
description: "Offensive Agents"
featurebaseId: "5111959"
---

## Overview

Offensive agents are the most powerful tier of AI agents in the Praetorian Guard Platform. They actively attempt to compromise targets by testing credentials, exploiting misconfigurations, and demonstrating unauthorized access. These agents produce High-severity findings with direct evidence of exploitability.

Because of their active nature, offensive agents always require operator confirmation before execution. Aurelius will present an attack plan and wait for explicit approval before dispatching these agents.

## Brutus — Credential Security Tester

Brutus discovers authentication services and tests for weak, default, or compromised credentials to demonstrate unauthorized access. It is the platform's credential attack specialist.

### What It Does

*   Discovers authentication services on target ports
*   Tests default and common credential combinations against discovered services
*   Demonstrates unauthorized access when credentials succeed
*   Documents the specific protocol, target, and discovered credential pairs as evidence

### Supported Protocols

*   SSH
*   RDP
*   FTP
*   SMB
*   MySQL
*   PostgreSQL
*   SMTP
*   Telnet
*   VNC

### Target

Port entities (services with authentication interfaces)

### Findings Created

`{protocol}-default-service-credentials` — **High severity**. Each finding includes:

*   Protocol and target endpoint
*   Discovered credential pairs (username and password)
*   Evidence of successful authentication

### Constraints

Brutus operates in manual-only mode — it must be explicitly invoked through Aurelius or direct API call. It does not run automatically as part of scheduled scans.

## Augustus — LLM Security Scanner

Augustus executes jailbreak detection, prompt injection testing, and adversarial attack simulation against AI and LLM services that have been fingerprinted by Julius.

### What It Does

*   Executes predefined probe sets to test for known jailbreak patterns
*   Performs prompt injection testing with various payload strategies
*   Simulates system-prompt confusion and extraction attacks
*   Tests payload splitting and data exfiltration vectors
*   Runs in two phases: a scan phase (predefined probes) and an optional attack phase (adaptive AI-driven attacks, manual-only)

### Prerequisites

Augustus **requires Julius** to have first fingerprinted the target. It operates only on webpage entities with `type=llm` that include generator configurations created by Julius.

### Target

Webpage entities (type=llm only, created by Julius)

### Findings Created

`llm-jailbreak` — Findings include detailed evidence: probe name, attack category, prompt sent, model response, and confidence score.

## Attack Chain: Julius then Augustus

LLM security assessment follows a two-stage workflow:

1.  **Julius** fingerprints HTTP endpoints to detect LLM services and creates `type=llm` webpage entities with generator configurations
2.  **Augustus** receives these entities and executes jailbreak and prompt injection testing against the identified LLM services

This separation ensures that Augustus always has the correct service metadata (model type, API format, authentication) before attempting attacks.

## Impact Level

Offensive agents **actively test security controls** by attempting authentication and sending adversarial inputs. They demonstrate real-world exploitability:

*   **Brutus** proves unauthorized access by successfully authenticating with weak credentials
*   **Augustus** proves AI safety bypasses by successfully jailbreaking or injecting prompts

All offensive operations respect the Rules of Engagement: no denial-of-service, no data modification, and no operations outside the platform's asset scope.
