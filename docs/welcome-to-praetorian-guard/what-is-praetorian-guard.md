---
title: "What is Praetorian Guard?"
description: "What is Praetorian Guard?"
featurebaseId: "6739497"
---

## The Problem

The security landscape has fundamentally shifted. **Artificial intelligence** has created an asymmetric advantage for attackers — they can now generate exploits, craft phishing campaigns, and probe infrastructure at machine speed, while most defenders are still stuck with manual workflows and quarterly review cycles.

Consider three realities facing every security team today:

*   **Point-in-time pentests leave you exposed.** A traditional penetration test covers roughly two weeks per year. That leaves 50 weeks where new vulnerabilities, misconfigurations, and exposures go undetected.
    
*   **Too many tools, too much noise.** The average enterprise runs dozens of security scanners, each producing thousands of findings. Without intelligent triage, your team drowns in alerts — most of which are false positives or low-priority issues that will never be exploited.
    
*   **Not enough people.** Offensive security talent is scarce and expensive. You cannot hire your way out of a problem that scales exponentially.
    

Attackers operate continuously. Your defense should too.

## What Guard Does

**Praetorian Guard** is an AI-powered continuous offensive security platform. It combines autonomous attack agents, curated threat intelligence, and human expertise to find the vulnerabilities that actually matter — before an adversary does.

Think of Guard as a risk funnel. The platform starts broad and narrows relentlessly:

> **80,000+** vulnerabilities triaged across your environment**8,000** assets discovered and catalogued**99** critical and high-severity vulnerabilities identified**4** exploitable, material risks confirmed**2** undetected compromise paths reported to your team

At each stage, Guard applies context — asset criticality, exploitability, threat intelligence, and defensive coverage — to separate signal from noise. The result is a short list of findings that demand action, not a spreadsheet of scan output.

## Five Platform Modules

Guard is organized into five modules, each addressing a distinct phase of the offensive security lifecycle. Together, they form a continuous loop: discover, assess, attack, enrich, and validate.

### Attack Surface Management (ASM)

**Attack Surface Management** discovers and inventories every asset tied to your organization — domains, subdomains, IP addresses, cloud services, APIs, certificates, and more. ASM operates continuously, so new assets are identified as soon as they appear, not months later during an audit.

ASM gives your team a living, always-current map of what you expose to the internet. You cannot protect what you cannot see.

### Vulnerability Management (VM)

**Vulnerability Management** triages and prioritizes the vulnerabilities found across your attack surface. Rather than dumping every CVE into a queue, VM applies risk-based scoring that factors in exploitability, asset criticality, and threat intelligence to surface the findings that matter most.

The goal is noise reduction. Guard's VM module eliminates false positives and low-value findings so your team focuses remediation effort where it has the greatest impact.

### Penetration Testing & Application Security

**Penetration Testing & AppSec** goes beyond scanning. Guard deploys **87 offensive capabilities** through a fleet of named attack agents — autonomous AI agents modeled after Roman generals, each specialized in a specific attack domain.

These agents chain together techniques to simulate real-world attack paths: fingerprinting a service, identifying a weakness, exploiting it, and validating impact. Every material finding is then reviewed and confirmed by Praetorian's human offensive security engineers before it reaches your team.

### Cyber Threat Intelligence (CTI)

**Cyber Threat Intelligence** enriches every finding with real-world context. Guard integrates **six intelligence sources** that are queried daily to correlate your attack surface against active threats, known exploits, leaked credentials, and emerging vulnerabilities.

CTI ensures that Guard's prioritization reflects the current threat landscape, not just theoretical severity scores.

### Breach & Attack Simulation (BAS)

**Breach & Attack Simulation** validates whether your defensive tools actually detect attacks. Guard executes controlled attack techniques against your environment and checks whether your EDR, SIEM, WAF, and other controls fire the expected alerts.

BAS closes the loop: it is not enough to find a vulnerability — you need to know whether your defenses would catch an attacker exploiting it.

## The Attack Ecosystem

Guard's autonomous attack agents are named after Roman generals and emperors, each specializing in a distinct offensive discipline. Together they form a coordinated attack ecosystem orchestrated by AI.

Agent

Specialization

**Aurelius**

AI Orchestrator — coordinates all agents, plans attack chains, and synthesizes findings

**Julius**

LLM Fingerprinting — detects and identifies AI/LLM services exposed in your environment

**Nerva**

Service Fingerprinting — identifies technologies, versions, and configurations across your attack surface

**Hadrian**

API Attacks — discovers and tests API endpoints for authentication flaws, injection, and business logic vulnerabilities

**Augustus**

LLM Jailbreaking — tests AI services for prompt injection, jailbreak, and alignment bypass vulnerabilities

**Trajan**

CI/CD Attacks — probes build pipelines, source control, and deployment infrastructure for supply chain risks

**Pius**

Asset Discovery — enumerates domains, subdomains, cloud resources, and shadow IT across your organization

**Brutus**

Credential Testing — validates exposed credentials against authentication services to confirm compromise risk

**Titus**

Secrets Discovery — scans code repositories, configurations, and public sources for leaked secrets and API keys

**Aurelian**

Cloud Security — assesses cloud infrastructure for misconfigurations, excessive permissions, and insecure defaults

## Built by Offensive Security Engineers

Praetorian Guard is not built by scan-tool vendors. It is built by **offensive security engineers** who have spent years breaking into the world's most complex environments. That background shows up in every capability the platform ships.

*   **MITRE ATT&CK contributions** — Praetorian engineers have contributed techniques and sub-techniques to the ATT&CK framework, the industry standard for adversary behavior modeling.
    
*   **CWE taxonomy contributions** — contributions to the Common Weakness Enumeration help define how the industry classifies software vulnerabilities.
    
*   **0-day disclosure program** — Praetorian maintains a responsible disclosure program, regularly identifying and reporting zero-day vulnerabilities to affected vendors.
    
*   **Microsoft Bug Bounty Hall of Fame** — Praetorian researchers have been recognized by Microsoft for critical vulnerability discoveries.
    
*   **National Counterintelligence Award** — team members have received recognition at the national level for contributions to security and intelligence.
    

When Guard flags a finding, it is backed by the same expertise that governments and Fortune 500 companies rely on for their most sensitive assessments.

## What's Next

Ready to get started? Head to the [Quick Start Guide](/help/quick-start-guide) to set up your first scan and see Guard in action.
