---
title: "Aurelian: Multi-Cloud Security Reconnaissance"
description: "Aurelian: Multi-Cloud Security Reconnaissance"
---

## Unified Cloud Security Reconnaissance with Aurelian

Your cloud environments span multiple providers — your security tooling should too. **Aurelian**, now integrated into the **Praetorian Guard Platform**, is an open-source multi-cloud security reconnaissance framework that gives your team a single, unified interface for security assessments across AWS, Azure, and GCP.

No more juggling separate tools per cloud provider. One command structure, consistent results, complete coverage.

### Why This Matters

Cloud penetration testing has historically meant learning different tools, different workflows, and different output formats for every provider. Aurelian eliminates that fragmentation. Built by Praetorian's offensive security team from years of cloud penetration testing and red team engagements, it encapsulates complex, multi-step security workflows behind single commands — so your team spends time analyzing findings, not wrestling with tooling.

### What Aurelian Does For You

**Secrets Discovery Across 30+ Source Types**
Aurelian's `find-secrets` modules enumerate cloud resources, extract content from EC2 user data, Lambda code, CloudFormation templates, CloudWatch logs, ECS task definitions, environment variables, storage blobs, and more — then scan everything with [Titus](https://github.com/praetorian-inc/titus) for hardcoded credentials, API keys, and tokens. Optional validation confirms whether discovered secrets are still active.

**Public Resource Detection**
Unlike simple boolean-flag checks, Aurelian evaluates actual policies using an IAM policy evaluation engine that considers condition keys, SCPs, and resource ARN patterns. This identifies genuinely exposed resources — open S3 buckets, public databases, anonymous-access storage accounts — even when configuration flags suggest otherwise.

**IAM Privilege Escalation Analysis**
Aurelian collects IAM data, evaluates effective permissions, and detects privilege escalation paths across your environment. Results can be exported to a Neo4j graph database for interactive exploration of multi-hop escalation chains — giving your team a visual map of blast radius and lateral movement potential.

**Subdomain Takeover Detection**
Identifies dangling DNS records across Route53, Azure DNS, and Cloud DNS — including CloudFront-S3 misconfigurations, orphaned NS delegations, and unclaimed cloud resources behind CNAME records.

**OPSEC-Aware Reconnaissance**
Aurelian includes covert techniques that minimize CloudTrail logging footprint. The `whoami` module identifies your caller ARN using APIs that leak identity in error messages without generating audit log entries — critical for engagements where detection avoidance matters.

### Cloud Platform Coverage

| Platform | Modules | Key Capabilities |
|----------|---------|-----------------|
| **AWS** | 12 recon + 5 analysis | Secrets, public resources, IAM graph, subdomain takeover, OPSEC whoami, CDK/CloudFront takeover, cost analysis |
| **Azure** | 6 | Secrets, public resources, configuration scan, subdomain takeover, conditional access policies |
| **GCP** | 4 | Secrets, public resources, subdomain takeover, resource enumeration |

### How It Fits Into Guard

Aurelian extends the Guard Platform's attack surface management into your cloud infrastructure. Reconnaissance results flow into your existing Guard dashboard alongside your other security findings — secrets, misconfigurations, privilege escalation paths, and takeover risks all in one place.

Aurelian also integrates with complementary Praetorian tools already in Guard:

* **Titus** — Powers secrets scanning within Aurelian's `find-secrets` modules
* **Trajan** — Complements cloud reconnaissance with CI/CD pipeline security testing

### Open Source — Full Transparency

Aurelian is fully open source under [github.com/praetorian-inc/aurelian](https://github.com/praetorian-inc/aurelian). Inspect the code, understand every module's methodology, and extend it with custom modules using the plugin architecture. Written in Go with a streaming pipeline architecture designed for scale, it's been battle-tested across hundreds of enterprise cloud environments.

### Get Started

Aurelian is available now as part of the Praetorian Guard Platform. Reach out to your Praetorian engagement team to add multi-cloud security reconnaissance to your Guard coverage.

[Read the full deep-dive on our blog →](https://www.praetorian.com/blog/aurelian-cloud-security-tool/)
