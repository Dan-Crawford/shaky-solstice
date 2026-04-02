---
title: "Vespasian: API Discovery and Specification Generation"
description: "Vespasian: API Discovery and Specification Generation"
featurebaseId: "2168486"
---

## Overview

Vespasian is an API discovery tool that maps attack surfaces from captured traffic and generates specifications for REST, GraphQL, SOAP, and WebSocket APIs. It captures traffic through headless browser crawling or imports it from proxy tools like Burp Suite, HAR archives, and mitmproxy, then classifies the requests, probes discovered endpoints, and outputs specifications in the native format for each API type.

Built for penetration testers and security engineers who need to map the API attack surface of applications when clients don't provide API documentation.

## How It Works

Vespasian uses a two-stage pipeline that separates traffic capture from specification generation:

1.  **Capture** — Drive a headless browser through the target application or import traffic from Burp Suite XML, HAR archives, or mitmproxy captures
    
2.  **Generate** — Classify captured requests as API calls, probe endpoints for enrichment, and produce structured API specifications (OpenAPI 3.0 for REST)
    

This separation means you **capture once, generate many** — run different generators against the same capture without re-scanning. The capture file is inspectable JSON for debugging.

## Key Capabilities

### Traffic Capture

Drives a headless browser with JavaScript execution and authentication injection. Captures every HTTP request the frontend makes during real usage.

### Traffic Import

Converts traffic from Burp Suite XML, HAR archives, and mitmproxy into the Vespasian capture format. Reuse work from manual testing sessions.

### REST API Classification

Classifies observed requests as API calls based on content-type, static asset exclusion, path heuristics (`/api/`, `/v1/`), HTTP method analysis, and response structure. Configurable confidence threshold.

### OpenAPI Specification Generation

Generates OpenAPI 3.0 specs with path normalization (`/users/42` becomes `/users/{id}`), schema inference from response bodies, and parameter extraction from query strings.

## Quick Start

```
# Scan a web application end-to-endvespasian scan https://app.example.com -o api.yaml# With authenticationvespasian scan https://app.example.com -H "Authorization: Bearer <token>" -o api.yaml# Two-stage: capture then generatevespasian crawl https://app.example.com -o capture.jsonvespasian generate rest capture.json -o api.yaml# Import from Burp Suitevespasian import burp traffic.xml -o capture.jsonvespasian generate rest capture.json -o api.yaml
```

## Use Cases

*   **Penetration testing without API documentation** — Crawl the target, capture API calls, produce an OpenAPI spec
    
*   **Generating specs from proxy captures** — Import existing Burp Suite or mitmproxy traffic from manual testing
    
*   **Mapping API attack surface** — Identify which endpoints a web application exposes by executing its JavaScript
    

## Installation

```
go install github.com/praetorian-inc/vespasian/cmd/vespasian@latest
```

Requires Go 1.24+.

## Learn More

Full documentation at [github.com/praetorian-inc/vespasian](https://github.com/praetorian-inc/vespasian).
