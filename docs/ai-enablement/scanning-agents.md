---
title: "Scanning Agents"
description: "Scanning Agents"
featurebaseId: "0712472"
---

## Overview

Scanning agents actively probe targets and create security findings based on their discoveries. Unlike reconnaissance agents (which only read data), scanning agents produce actionable findings that enter the triage pipeline. They do not attempt exploitation — they identify and document security issues.

## Julius — LLM Service Fingerprinter

Julius fingerprints HTTP endpoints to detect AI and machine learning services, including Ollama, OpenAI-compatible APIs, LocalAI, and vLLM instances. It is the required prerequisite for Augustus (LLM attack agent).

### What It Does

*   Probes public HTTP/HTTPS endpoints for LLM service signatures
*   Creates webpage entities with `type=llm` for discovered services
*   Collects generator configurations needed for Augustus attack operations
*   Produces risks named `llm-chatbot` categorized as open exposures

### Target

Port entities (HTTP/HTTPS only, public endpoints)

### Findings Created

`llm-chatbot` — Open exposure indicating an LLM service was detected on the endpoint

## Titus — Repository Secret Scanner

Titus scans code repositories for leaked secrets, API keys, and credentials throughout their full git history. It validates discovered secrets against their source APIs to determine if they are still active.

### What It Does

*   Scans the complete git history of repositories for leaked secrets
*   Validates secrets against source APIs to determine if they are active
*   Generates findings with full git provenance (commit hash, author, timestamp)
*   Distinguishes between validated (High severity) and unvalidated (Info severity) secrets

### Target

Repository entities

### Findings Created

`git-secret-{type}` — Secret leak findings with severity based on validation status:

*   **High** — Secret validated as active against the source API
*   **Info** — Secret detected but could not be validated (may be rotated or expired)

## Trajan — CI/CD Security Scanner

Trajan scans CI/CD pipelines for security vulnerabilities across multiple platforms. It detects injection vulnerabilities, supply chain risks, permission misconfigurations, and AI code review agent weaknesses.

### What It Does

*   Scans pipeline configurations for injection vulnerabilities (command injection, script injection)
*   Identifies supply chain risks (unpinned actions, unpinned dependencies)
*   Detects permission misconfigurations (excessive workflow permissions, write access)
*   Tests for AI code review agent vulnerabilities (can delegate to Augustus for deeper testing)

### Supported Platforms

*   GitHub Actions
*   GitLab CI
*   Azure DevOps
*   Jenkins
*   JFrog
*   Bitbucket Pipelines

### Target

Repository entities

### Findings Created

Multiple risk categories with varying severities based on vulnerability type, including injection risks, supply chain exposures, and permission issues. Each finding includes the specific workflow file path, evidence, and trigger context.

## Vespasian — API Endpoint Discovery

Vespasian discovers API endpoints through headless browser crawling and generates OpenAPI specifications. While Vespasian runs as a capability rather than a conversational agent, it is a key scanning tool in the platform's arsenal.

### What It Does

*   Crawls web applications using a headless browser to discover API endpoints
*   Generates OpenAPI specifications from discovered endpoints
*   Supports configurable crawl depth (default: 3 levels) and authentication headers
*   Filters results by confidence score

### Target

Web application URLs

## Impact Level

Scanning agents **create findings** in your triage pipeline but do not attempt to exploit vulnerabilities. They send probe traffic to targets (HTTP requests, API calls, git clone operations) but do not attempt unauthorized access or data extraction. All findings enter the standard triage workflow for review.
