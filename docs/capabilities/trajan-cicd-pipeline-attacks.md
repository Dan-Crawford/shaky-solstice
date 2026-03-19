---
title: "Trajan: CI/CD Pipeline Attacks"
description: "Trajan: CI/CD Pipeline Attacks"
featurebaseId: "5782126"
---

![Introducing Trajan: CI/CD Pipeline Security for the Guard Platform](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69b7174d9429121a9ad6dfad/019cf33a-f922-7295-a66b-5046126f899f/b64u-Y3ljM3d6eDZ6ei53ZWJwP1gtQW0.webp?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=ddd7d8d380b2604dd7e950a7b73310a971d930ba50e310eedcf557bcdc799967)

## Secure Your Software Supply Chain with Trajan

Your CI/CD pipelines are part of your attack surface. **Trajan**, now available as part of the **Praetorian Guard Platform**, gives your security team complete visibility into pipeline vulnerabilities across GitHub Actions, GitLab CI, Azure DevOps, and Jenkins — from a single unified engine.

### Why This Matters

Modern software delivery pipelines are increasingly targeted by attackers. Poisoned pipeline execution, secrets exposure, dependency hijacking, and self-hosted runner abuse are real threats that traditional security tools miss. Trajan closes this gap by bringing the same rigorous, offensive-minded approach Praetorian applies to your cloud and application security — directly to your CI/CD infrastructure.

### What You Get

**Cross-Platform Coverage**A unified analysis engine across GitHub Actions, GitLab CI, Azure DevOps, and Jenkins. No more stitching together separate tools per platform — one engine, consistent results.

**Comprehensive Detection**32 detection plugins covering expression injection, unsafe checkouts, unpinned dependencies, secrets leakage, self-hosted runner risks, artifact and cache poisoning, TOCTOU race conditions, and access control misconfigurations.

**Validated Exploitability**24 attack plugins that validate whether identified vulnerabilities are actually exploitable. You get signal, not noise — every finding is backed by proof.

**AI/LLM Pipeline Security**As AI services increasingly appear in CI/CD pipelines, Trajan integrates with Julius and Augustus to identify AI service fingerprints and test for adversarial prompt injection across 210+ attack payloads.

### How It Fits Into Guard

Trajan extends the Guard Platform's attack surface management to your software delivery infrastructure. Pipeline scan results flow into your existing Guard dashboard alongside your cloud, network, and application security findings — giving you a unified view of organizational risk.

**Three Core Workflows:**

* **Enumerate** — Map your CI/CD access and attack surface with credential and permission validation
* **Scan** — Run detection plugins against pipeline configurations to identify vulnerabilities
* **Attack** — Validate exploitability through built-in attack modules with explicit opt-in and full session tracking

### Get Started

Trajan is available now. Reach out to your Praetorian engagement team to add CI/CD pipeline security to your Guard Platform coverage.
