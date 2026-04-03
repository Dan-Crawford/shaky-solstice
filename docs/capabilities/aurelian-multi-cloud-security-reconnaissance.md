---
title: "Aurelian: Multi-Cloud Security Reconnaissance"
description: "Aurelian: Multi-Cloud Security Reconnaissance"
featurebaseId: "7809325"
---

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69c08a760896fa170f0feb7b/019d1902-e83c-78f8-85fa-b6f840fc7a05/b64u-YXVyZWxpYW4ud2VicA.webp?X-Amz-Expires=3600&X-Amz-Date=20260403T080000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260403%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=64fe71b57dae2a958e72ce296c2a9effe9ce0146167cbd086888dd9dc49a7944)

## Overview

Aurelian is an open-source, multi-cloud security reconnaissance framework built in Go. It provides a unified command-line interface for cloud security assessments across Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP).

Where other tools require separate workflows per cloud provider, Aurelian gives you **one command structure that works everywhere**: `aurelian [platform] recon [module]`. Each module encapsulates a complex, multi-step security workflow — resource enumeration, content extraction, secrets scanning, policy analysis, access evaluation — behind a single command.

## Key Capabilities

### Secrets Discovery

Enumerates cloud resources, extracts content from 30+ source types (EC2 user data, Lambda code, CloudFormation templates, CloudWatch logs, ECS task definitions, environment variables, storage blobs, application configurations), and scans with Titus for hardcoded credentials, API keys, and tokens. Optional validation confirms whether discovered secrets are active.

### Public Resource Detection

Combines resource listing, property enrichment, policy fetching, and access evaluation to identify publicly accessible resources — open S3 buckets, exposed databases, public IPs, anonymous-access storage accounts, and more.

### IAM Privilege Escalation Analysis

Collects IAM data, evaluates effective permissions, and detects privilege escalation paths. Outputs JSON or populates a Neo4j graph database for interactive exploration.

### Subdomain Takeover Detection

Checks DNS records in Route53, Azure DNS, and Cloud DNS against known cloud-specific takeover patterns — dangling CNAMEs pointing to unclaimed cloud resources.

### OPSEC-Aware Reconnaissance

Covert techniques that avoid CloudTrail logging. The `whoami` module identifies the caller ARN using APIs that leak identity in error messages without generating audit log entries.

## Quick Start

```
# Verify identity (OPSEC-safe, no CloudTrail logging)aurelian aws recon whoami# Find hardcoded secrets across all AWS regionsaurelian aws recon find-secrets# Detect publicly accessible resourcesaurelian aws recon public-resources# Build IAM privilege escalation graphaurelian aws recon graph --neo4j-uri bolt://localhost:7687# Detect subdomain takeoversaurelian aws recon subdomain-takeover
```

## Installation

```
git clone https://github.com/praetorian-inc/aurelian.gitcd aureliango build -o aurelian main.go
```

Requires Go 1.24+. Docker support is also available.

## Learn More

Full documentation and module reference at [github.com/praetorian-inc/aurelian](https://github.com/praetorian-inc/aurelian).
