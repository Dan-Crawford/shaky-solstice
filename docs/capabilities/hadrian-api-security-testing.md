---
title: "Hadrian: API Security Testing"
description: "Hadrian: API Security Testing"
featurebaseId: "2293307"
---

## Overview

Hadrian is a security testing framework for REST, GraphQL, and gRPC APIs that tests for OWASP API vulnerabilities and custom security issues using role-based authorization testing and YAML-driven templates.

## Key Features

*   **OWASP API Top 10 Coverage** — Tests for BOLA, broken authentication, BFLA, BOPLA, and more
    
*   **Role-Based Testing** — Define roles with permissions and test cross-role access violations
    
*   **Mutation Testing** — Three-phase setup/attack/verify pattern for proving write/delete vulnerabilities
    
*   **Template-Driven** — YAML templates for customizable security tests
    
*   **Multiple Protocols** — REST, GraphQL, and gRPC from a single tool
    
*   **LLM Triage** — Optional AI-powered finding analysis via Ollama
    

## OWASP API Security Top 10 Coverage

Category

Name

REST

GraphQL

gRPC

API1:2023

Broken Object Level Authorization

Yes

Yes

Yes

API2:2023

Broken Authentication

Yes

Yes

Yes

API3:2023

Broken Object Property Level Authorization

Yes

Yes

Yes

API5:2023

Broken Function Level Authorization

Yes

Yes

Yes

API8:2023

Security Misconfiguration

Yes

Yes

Yes

API9:2023

Improper Inventory Management

Yes

\-

\-

## Quick Start

```
# REST API testinghadrian test rest --api api.yaml --roles roles.yaml --auth auth.yaml# GraphQL API testinghadrian test graphql --target https://api.example.com --auth auth.yaml --roles roles.yaml# gRPC API testinghadrian test grpc --target localhost:50051 --proto service.proto --auth auth.yaml --roles roles.yaml# Dry runhadrian test rest --api api.yaml --roles roles.yaml --dry-run# With LLM triagehadrian test rest --api api.yaml --roles roles.yaml \  --llm-host http://localhost:11434 --llm-model llama3.2:latest
```

## How It Works

Hadrian reads an API specification (OpenAPI for REST, schema for GraphQL, proto for gRPC), a roles definition, and authentication configuration. It then executes security test templates against the API, testing each endpoint as each role to detect authorization failures.

The **mutation testing** pattern is particularly powerful: it uses a three-phase approach (setup resource as privileged user, attack as unprivileged user, verify the attack succeeded) to prove BFLA and BOPLA vulnerabilities with zero false positives.

## Pipeline

Vespasian discovers the API surface. Hadrian tests it for security issues. Together they form a complete API security assessment pipeline: discover endpoints, generate specs, then test for authorization and authentication vulnerabilities.

## Installation

```
go install github.com/praetorian-inc/hadrian/cmd/hadrian@latest
```

Requires Go 1.24+.

## Learn More

Full documentation, tutorials (crAPI for REST, DVGA for GraphQL), and template reference at [github.com/praetorian-inc/hadrian](https://github.com/praetorian-inc/hadrian).
