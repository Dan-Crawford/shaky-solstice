---
title: "Penetration Testing & Application Security"
description: "Penetration Testing & Application Security"
featurebaseId: "1930768"
---

## What It Does

Guard deploys **87 security capabilities** that execute continuously against your attack surface. These are not generic scanners — they are purpose-built offensive tools maintained by Praetorian's security engineering team.

Every finding is **validated by Praetorian's offensive security engineers** before it reaches your dashboard. This human-in-the-loop validation process delivers **zero false positives** — every reported risk is a confirmed, exploitable vulnerability.

Your Guard subscription includes an **annual compliance penetration test** at no additional cost. This is a full-scope engagement that satisfies regulatory requirements across SOC 2, PCI DSS, and HIPAA frameworks.

## Why It Matters

Automated scanners excel at finding known vulnerabilities — missing patches, default credentials, exposed services. But they cannot reason about your application's business logic, chain low-severity findings into critical attack paths, or discover novel vulnerabilities that require human creativity.

Praetorian combines both approaches:

*   **Automated capabilities** run continuously, covering breadth across your entire attack surface
    
*   **Human operators** provide depth, investigating complex vulnerabilities that require contextual understanding
    
*   **Annual compliance pen tests** are included with every Guard subscription — no separate procurement needed
    

**Attack paths matter more than individual vulnerabilities.** A medium-severity misconfiguration chained with a low-severity information disclosure can produce a critical attack path. Guard models these chains to prioritize what actually matters.

## The Named Attack Ecosystem

Guard's offensive capabilities are powered by open-source agents named for Roman generals. Each agent specializes in a distinct attack domain:

Agent

Specialty

What It Does

**Julius**

LLM Fingerprinting

Detects Ollama, OpenAI, and custom LLM endpoints exposed on your infrastructure

**Nerva**

Service Fingerprinting

TCP/UDP service identification and version detection across all discovered assets

**Hadrian**

API Security Testing

OWASP API Top 10 testing including BOLA, BFLA, and injection vulnerabilities

**Augustus**

LLM Jailbreaking

Tests LLM safety boundaries, prompt injection resistance, and guardrail bypasses

**Trajan**

CI/CD Pipeline Attacks

GitHub Actions, GitLab CI, Jenkins, and JFrog pipeline vulnerability discovery

**Pius**

Attack Surface Mapping

Autonomous domain enumeration and preseed discovery to expand your known attack surface

**Brutus**

Credential Testing

SSH, RDP, and HTTP credential attacks against discovered services (manual authorization only)

**Titus**

Secrets Discovery

Exposed secrets, API keys, and credentials in code repositories and public assets

**Aurelian**

Cloud Security Recon

AWS, Azure, and GCP analysis covering IAM policies, S3 buckets, RBAC, and service accounts

**Aurelius**

AI Orchestrator

Coordinates all specialist agents via AI-driven task planning and result synthesis

## How It Works

Guard's penetration testing pipeline operates in five stages:

1.  **Capability Execution** — Security capabilities execute against your assets inside isolated Lambda containers. Each capability targets a specific vulnerability class or attack technique.
    
2.  **Proof of Exploitation** — Results include machine-readable proof of exploitation. JSON evidence is attached to each finding, documenting the exact request, response, and exploitation path.
    
3.  **Human Validation** — Praetorian operators review every finding to validate material risk. This human-in-the-loop step eliminates false positives and adds contextual analysis that automation cannot provide.
    
4.  **Report Generation** — Reports are generated with an executive summary, detailed finding narratives, and actionable remediation guidance tailored to your technology stack.
    
5.  **Compliance Delivery** — Your annual compliance penetration test report satisfies SOC 2, PCI DSS, and HIPAA requirements. The report is delivered in a format auditors expect, with validated findings and human-written narratives.
    

## Attack Path Visualization

Guard models complete attack paths — not just individual vulnerabilities. The platform's graph engine maps relationships between assets, identities, and vulnerabilities to surface the paths an attacker would actually exploit.

Supported attack path categories include:

*   **Active Directory** — Shortest paths from Domain Users to Domain Admins, identifying the fewest hops an attacker needs for full domain compromise
    
*   **Kerberoasting** — Service accounts with weak encryption that enable offline credential cracking and lateral movement
    
*   **Unconstrained Delegation** — Compromise chains through delegation misconfigurations that allow impersonation of any domain user
    
*   **Cloud IAM Privilege Escalation** — Paths through IAM policies, role assumptions, and service account impersonation that lead to administrative access
    

All attack paths are **visualized in an interactive graph** powered by Cytoscape.js. Security teams can explore relationships, filter by severity, and trace the exact steps from initial access to objective completion.

## Testing Modes

Guard operates in three testing modes that run in continuous waves across your environment:

### Overt (Continuous Pen Testing)

Always-on automated testing that runs transparently. Defenders can see the testing activity in their logs and monitoring tools. This mode provides continuous coverage and is the default operating state for all Guard deployments.

### Collaborative (Purple Team)

Offense and defense teams work together in coordinated exercises. Purple team engagements test detection rules, validate alerting pipelines, and measure mean time to detect and respond. Results feed directly into security operations improvements.

### Covert (Adversary Emulation)

Full red team operations that simulate real-world attackers. Covert testing measures your organization's ability to detect and respond to sophisticated threats without prior notification. This mode requires explicit authorization and is conducted by Praetorian's senior operators only.

## Compliance

Every Guard subscription includes an **annual penetration test** that satisfies compliance requirements across major frameworks:

*   **SOC 2** — Meets the Common Criteria for penetration testing under Trust Services Criteria
    
*   **PCI DSS** — Satisfies Requirement 11.3 for annual penetration testing
    
*   **HIPAA** — Supports the Security Rule's requirement for technical evaluation of security controls
    

The compliance report includes validated findings with proof of exploitation, an executive summary suitable for board-level communication, and human-written narratives that provide context beyond what automated tools can produce.

## What's Next

*   [Breach & Attack Simulation (BAS)](/help/en/articles/breach-and-attack-simulation) — Continuous validation of your detection and response capabilities
    
*   [Capability Documentation](/help/en/articles/capabilities) — Detailed reference for all 87 security capabilities
    
*   [AI Enablement](/help/en/articles/ai-enablement) — How Guard uses AI to accelerate security operations
    
*   [Aurelius AI Orchestrator](/help/en/articles/aurelius) — Deep dive into Guard's AI-driven attack coordination
