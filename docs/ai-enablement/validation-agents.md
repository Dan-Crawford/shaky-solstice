---
title: "Validation Agents"
description: "Validation Agents"
featurebaseId: "3719157"
---

## Overview

Validation agents review, verify, and enrich existing security findings. They do not discover new vulnerabilities — instead, they improve the quality and accuracy of findings that already exist in the triage pipeline. These agents are critical for reducing false positives, confirming remediation, and enriching CVE-based findings with exploit intelligence.

## Cato — Finding Validator

Cato reviews triage security findings by analyzing proof evidence, calibrating severity, and making promote or reject decisions. Named after the Roman statesman known for his rigorous judgment, Cato serves as the quality gate between triage and confirmed findings.

### What It Does

*   **Promotes findings** — If proof conclusively demonstrates an exploitable vulnerability, Cato changes the status from Triage to Open with documented justification
*   **Rejects false positives** — If evidence shows the finding is not a real vulnerability, Cato rejects it with documented reasoning
*   **Identifies duplicates** — Detects when multiple findings describe the same underlying issue
*   **Calibrates severity** — Adjusts severity ratings based on actual evidence quality and exploitability

### Target

Risk entities in Triage status

### When to Use

Use Cato when you have a backlog of triage findings that need evidence-based review. Cato is especially valuable after large scanning campaigns that produce many findings requiring human-quality validation.

## Priscus — Retest Validator

Priscus validates remediation by retesting previously identified vulnerabilities through targeted re-scans. It confirms whether fixes actually resolve the underlying security issue.

### What It Does

*   Reviews the risk history to identify the original capability that discovered the finding
*   Re-runs the original capability or Nuclei template against the parent asset
*   Confirms if the vulnerability still exists or has been successfully remediated
*   Documents retest results for audit trail compliance

### Target

Risk entities (previously identified vulnerabilities marked for retest)

### When to Use

Use Priscus when customers report that they have remediated a finding and you need to verify the fix. Priscus provides the evidence chain needed for audit-ready remediation confirmation.

## Seneca — CVE Research Orchestrator

Seneca orchestrates CVE research capabilities to validate and enrich CVE-based triage findings with exploit intelligence, detection templates, and severity assessment. Named after the Stoic philosopher, Seneca brings wisdom and depth to vulnerability analysis.

### What It Does

*   Researches CVE identifiers using specialized CVE research tools
*   Enriches findings with exploit availability, proof-of-concept code, and EPSS scores
*   Generates detection templates (Nuclei) for ongoing monitoring
*   Validates whether the CVE applies to the specific technology version in scope

### Severity Gating

Seneca only runs CVE research on **Critical and High severity** findings. Medium, Low, and Info severity findings are skipped to prevent resource waste on low-value research. This ensures that research effort is concentrated where it has the most impact.

### Target

Risk entities with CVE identifiers

### When to Use

Use Seneca when triage findings reference CVE identifiers that need deeper analysis — especially when you need to determine exploit availability, assess real-world risk, or generate detection templates for continuous monitoring.

## Impact Level

Validation agents **update existing findings** (status changes, severity adjustments, enrichment data) but do not create new findings or discover new vulnerabilities. Priscus is the exception — it re-runs scans against specific targets, which may detect that a vulnerability has been remediated (closing a finding) or confirm it still exists.
