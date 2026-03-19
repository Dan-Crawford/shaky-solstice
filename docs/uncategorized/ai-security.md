---
title: "AI Security"
featurebaseId: "6370542"
draft: "true"
---

## AI Security

## Overview

PGP integrates artificial intelligence and machine learning throughout the platform to strengthen threat detection, accelerate vulnerability management, and reduce the manual effort required to secure your attack surface. AI Security in PGP is not a standalone module—it is a set of capabilities woven into the core workflows of discovery, scanning, triage, and remediation that operate under strict human oversight and privacy controls.

## AI-Powered Threat Detection

PGP uses machine learning models to identify threats that traditional rule-based systems may miss. These capabilities analyze patterns across your environment to detect anomalies, emerging attack vectors, and indicators of compromise.

### Behavioral Analysis

-   **Anomaly detection**: ML models establish baselines for your environment and flag deviations that may indicate malicious activity or misconfigurations

-   **Threat correlation**: AI correlates signals across multiple data sources—assets, vulnerabilities, ports, technologies, and attack paths—to surface threats that would be difficult to identify from any single data point

-   **Emerging threat identification**: Models are continuously updated with the latest threat intelligence to detect newly published CVEs and zero-day patterns as they appear in the wild


### CVE Research Automation

When new vulnerabilities are published by MITRE or NVD, PGP's CVE Researcher Agent performs automated background research to accelerate detection coverage. The agent helps create detection signatures that can identify the CVE across your environment. All signatures are reviewed and verified by Managed Services engineers before becoming active.

## Vulnerability Prioritization

Not all vulnerabilities carry the same level of risk. PGP's AI-driven prioritization helps your team focus remediation efforts where they matter most.

### Auto Triage

PGP's Triage Assistant uses models trained on historical vulnerability data and prior triage decisions made by the Managed Services team. It produces a **confidence score** indicating the likelihood that a newly discovered vulnerability requires immediate attention. Two core models support this capability:

-   **Fine-tuned vulnerability triage model**: Focuses on vulnerabilities requiring manual triage, trained on the MSP team's historical open/close decisions

-   **Third-party vulnerability triage agent**: Prioritizes findings from external vulnerability sources (currently in development)


The output helps surface high-priority vulnerabilities faster while human analysts continue to review and decide all vulnerability actions.

### Risk Scoring

AI-driven risk assessment considers multiple factors when scoring vulnerabilities:

-   **Severity and exploitability**: CVSS scores combined with real-world exploit availability

-   **Business impact**: Context about the affected asset's role and exposure within your environment

-   **Attack path analysis**: Whether the vulnerability exists along a viable attack path

-   **Environmental context**: Technologies, ports, and configurations that affect actual exploitability


## Attack Surface Analysis and Asset Discovery

PGP leverages AI to expand and refine your understanding of your external attack surface.

### AI Affiliation Agent

The AI Affiliation Agent determines whether a discovered asset truly belongs to your organization. Using attributes of internet-facing assets, the model performs **out-of-band research**—including WHOIS records, DNS data, and hosting details—to provide a determination and rationale for whether an asset belongs to your environment.

This assists Managed Services engineers in validating that vulnerabilities belong to your actual attack surface before they are escalated, reducing noise from unaffiliated assets.

### Intelligent Reconnaissance

AI-driven reconnaissance capabilities map your attack surface by:

-   **Prioritizing discovery targets**: ML models identify which areas of your environment are most likely to yield new assets

-   **Pattern recognition**: Identifying relationships between assets, domains, and infrastructure that indicate organizational ownership

-   **Automated correlation**: Linking assets discovered through different channels (DNS, TLS certificates, WHOIS, EDGAR filings) into a unified view


## False Positive Reduction

False positives consume analyst time and erode trust in security tools. PGP deploys ML models specifically designed to reduce noise across multiple detection categories.

### ML De-noiser for Secrets Detection

PGP's Nosey Parker capability detects potential secrets (tokens, credentials, keys) across your environments. The **ML De-noiser** refines those detections by learning from previously validated findings to identify patterns that indicate false positives. This filters out results unlikely to represent real secrets, allowing the Managed Services team to focus on findings with the highest likelihood of being legitimate exposures.

### Triage-Based Filtering

Historical triage data trains models to recognize vulnerability patterns that consistently result in closure, allowing PGP to deprioritize similar findings automatically. This feedback loop improves over time as more triage decisions are recorded.

## AI-Assisted Remediation

PGP provides AI-driven remediation guidance to help your team act on findings quickly and effectively.

### Marcus Aurelius

Marcus Aurelius is the AI-powered security analyst embedded in PGP. Through natural language conversation, it helps you:

-   **Understand your attack surface**: Ask questions about your environment and receive answers drawn from real-time asset, vulnerability, and threat intelligence data

-   **Prioritize remediation**: Identify which vulnerabilities pose the greatest risk based on severity, exploitability, and business impact

-   **Get actionable recommendations**: Receive specific remediation steps tailored to your environment and technology stack

-   **Track trends**: Analyze changes in your security posture over time


Marcus Aurelius operates strictly within your authorized platform data and follows hard guardrails—it cannot perform denial-of-service actions, modify production systems, or operate outside your defined scope. All offensive actions require explicit operator approval.

### Automated Security Testing

PGP's Reconnaissance and SQL Injection Testing Agent provides automated web application security testing that combines attack surface discovery with vulnerability detection. The agent:

1.  **Performs intelligent reconnaissance**: Crawls target applications to map endpoints, discover input parameters, and prioritize high-risk entry points

2.  **Systematically tests for vulnerabilities**: Uses specialized techniques including union-based, error-based, boolean-blind, and time-blind injection methods

3.  **Produces structured assessments**: Generates findings ranked by severity with detailed evidence, which are automatically ingested into PGP as triaged risks


This agent runs only against customer-designated targets, requires explicit manual initiation, and executes within isolated, sandboxed environments with defined timeout limits.

## Integration with the PGP Workflow

AI capabilities are embedded throughout the PGP platform lifecycle rather than operating as a separate layer:

1.  **Discovery**: AI Affiliation Agent validates asset ownership; intelligent reconnaissance identifies new attack surface

2.  **Scanning**: CVE Researcher Agent accelerates detection signature development for new vulnerabilities

3.  **Triage**: Auto Triage and ML De-noiser prioritize findings and reduce false positives

4.  **Analysis**: Marcus Aurelius provides on-demand security analysis and contextual answers

5.  **Remediation**: AI-assisted recommendations guide remediation actions with prioritized, actionable steps

6.  **Testing**: Automated security testing agents validate vulnerabilities under human supervision


All AI outputs feed back into the platform's existing views—assets, risks, attack paths—so your team works from a single source of truth.

## Data Privacy and AI Model Training

PGP maintains strict data privacy controls around all AI capabilities.

### Data Access

AI agents access the following platform data to provide environmental context:

-   Assets

-   Attack paths

-   Risks

-   Ports

-   Technologies


The metadata visible in the platform is the data agents leverage for prioritization and targeting. Agents do not access data outside your authorized platform scope.

### Model Training

-   **Customer preference**: PGP can train on your data or exclude your data from training—this is based on your preference

-   **Training infrastructure**: Models are trained using **AWS SageMaker** pipelines

-   **No external sharing**: Customer data used for training is never shared with third parties or used outside the PGP platform


### Guardrails and Safety

-   **Human-in-the-loop (HITL)**: Active defense agents require human supervision. Agents that do not require HITL are limited to housekeeping tasks (such as the AI Affiliation Agent)

-   **Hard boundaries**: Agents cannot touch assets out of scope and can only use the capabilities explicitly granted to them

-   **Validation systems**: Systems are in place to detect and prevent hallucination in agent outputs

-   **No autonomous action**: AI agents do not directly execute actions that impact customer environments. All executable actions are implemented as deterministic, hard-coded capabilities that agents can only recommend or invoke

-   **Rigorous testing**: Every AI capability undergoes extensive validation and monitoring before release

-   **Security validation**: Engineers who develop AI models are distinct from those who test the security of the models


### Opting Out

If you have compliance or data-handling requirements that affect AI feature usage, the PGP team can review configuration options with you. Contact your account team to discuss specific requirements.

## FAQ

**Does AI replace human analysts?**
No. AI capabilities serve as intelligent assistants that augment analyst decision-making. Final decisions are always made by experienced security engineers.

**What data do AI agents access?**
Agents access assets, attack paths, risks, ports, and technologies—the same metadata visible in the platform. They use this data for prioritization and targeting.

**Are agents acting without human intervention?**
A human is in the loop for all active defense work. Agents that operate without direct supervision are limited to non-active tasks such as asset affiliation verification.

**Can I control which AI features are enabled?**
Contact your PGP account team to discuss configuration options based on your compliance and operational requirements.
