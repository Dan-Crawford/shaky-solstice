---
title: "Praetorian AI"
featurebaseId: "7698427"
description: "Learn about how Praetorian is keeping you safe with AI."
draft: "true"
---

Praetorian’s AI-driven features are designed to enhance the speed, accuracy, and scalability of our Managed Services team—never to replace human oversight. Every AI capability in the Preatorian Guard Platform (PGP) operates **under strict security and privacy controls**.

## Marcus Aurelius

**Purpose:** Marcus Aurelius is the AI-powered security analyst embedded in the Praetorian Guard platform. It helps you understand your attack surface, prioritize vulnerabilities, and take action on security findings—all through natural language conversation.

**How It Works:** Ask Marcus Aurelius questions about your environment and it queries your real-time attack surface data to deliver actionable insights. It can identify exploitable vulnerabilities, track trends and changes, analyze exposure posture, and recommend remediation steps by drawing from discovery, vulnerability management, and threat intelligence data already in your platform.

**Outcome:** You get immediate, contextualized answers about your security posture without needing to build queries or navigate dashboards. Marcus Aurelius surfaces the risks that matter most based on severity, exploitability, and business impact—helping your team focus remediation where it counts.

**Safety:** Marcus Aurelius operates strictly within your authorized platform data and follows hard guardrails: it cannot perform denial-of-service actions, modify production systems, or operate outside your defined scope. All offensive actions require explicit operator approval before execution.

## **Auto Triage**

**Purpose:**The Triage Assistant helps prioritize _already discovered_ vulnerabilities in PGP by predicting which findings are most likely to require immediate attention from our Managed Services (MSP) team.

**How it works:**This model is trained on historical vulnerability data and the MSP team’s prior triage decisions (for example, whether a vulnerability was opened or closed in PGP). It produces a **confidence score** indicating the likelihood that a newly discovered vulnerability would be opened by the team.There are two core models supporting this capability–a fine-tuned version of an open-source model and a fine-tuned closed-source variant, both of which focus exclusively on vulnerabilities requiring triage. The second is the Third-Party Vulnerability Triage Agent, which prioritizes findings originating from external vulnerability sources. This model is currently in development.

**Outcome:**The output helps the MSP team surface high-priority vulnerabilities faster. Human analysts continue to manually review and decide all vulnerability actions.

## **AI Affiliation Agent**

**Purpose:**The AI Affiliation model assists in determining whether an asset in PGP is truly part of your organization’s attack surface.

**How it works:**Using attributes of the internet-facing asset, the model performs **out-of-band research** (such as WHOIS records, DNS data, and hosting details) to provide a determination and rationale for whether the asset belongs to your environment.

**Outcome:**The model produces a summary of findings, reasoning behind its determination, and a final **affiliation assessment**. This assists Managed Services engineers in validating that vulnerabilities belong to your actual attack surface before they are escalated.

## **CVE Researcher Agent**

**Purpose:**The CVE Researcher automates early analysis of new vulnerabilities published by MITRE or NVD to accelerate Praetorian’s detection coverage.

**How it works:** When a new CVE is published, the agent performs background research to help create **detection signatures** that can identify the CVE “in the wild.” These insights are reviewed and verified by Managed Service engineers before any signature becomes active in PGP.

**Outcome:**No customer data is used for training or model input. All outputs support faster vulnerability intelligence and signature development, under full human supervision.

## **ML De-noiser for Nosey Parker**

**Purpose:** Praetorian Guard’s _Nosey Parker_ capability detects potential secrets (tokens, credentials, keys) across your environments. The **ML De-noiser** refines those detections to reduce false positives.

**How it works:** The model learns from previously validated detections to identify patterns that indicate false positives, filtering out results that are unlikely to represent real secrets.

**Outcome:** This enables the Managed Services team to focus on findings with the highest likelihood of being legitimate exposures, improving both speed and accuracy.

## **Reconnaissance & SQL Injection Testing Agent**

**Purpose:** This agent provides automated web application security testing that combines attack surface discovery with SQL injection vulnerability detection. It identifies exploitable SQL injection.

**How It Works:** When pointed at a target web application, the agent operates in two phases. First, it performs intelligent reconnaissance—crawling the application to map endpoints, discover input parameters, and prioritize high-risk entry points. It then systematically tests discovered parameters for SQL injection vulnerabilities using six specialized techniques, including union-based, error-based, boolean-blind, and time-blind injection methods. An AI orchestrator coordinates these phases, making real-time decisions about which areas warrant deeper testing based on initial findings.

**Outcome:** The agent produces a structured security assessment containing confirmed vulnerabilities ranked by severity (critical, high, medium, low), along with detailed evidence such as affected endpoints, injection techniques, and technology stack context. These findings are automatically ingested into the PGP platform as triaged risks, giving your team immediate visibility and actionable remediation guidance.

**Safety:** The agent runs only against customer-designated targets and requires explicit manual initiation—it never triggers automatically. All testing executes within isolated, sandboxed compute environments with defined timeout limits. The agent uses industry-standard tooling (sqlmap) configured for detection rather than exploitation, validating the presence of vulnerabilities without extracting sensitive data or modifying database contents.

## **What Praetorian AI Is Not**

Praetorian AI is **not autonomous** and does not interact directly with customer environments. AI agents in the platform do not directly execute actions that impact customer environments. Instead, all executable actions are implemented as deterministic, hard-coded capabilities. Agents can only recommend or invoke these predefined actions, and may assist in generating parameters or payloads for them.

-   It does **not** take actions against your resources
    
-   It does **not** attempt to exploit or validate vulnerabilities.
    
-   It does **not** use, guess, or manipulate credentials.
    

Actions that could affect your systems are conducted **manually and deliberately** by our Managed Services engineers.

## **Security and Privacy Commitment**

-   **Rigorous Testing:** Every AI capability undergoes extensive validation and monitoring before release.
    
-   **Human Oversight:** AI outputs are advisory—final decisions are always made by experienced security engineers.
    
-   **Security Validation:** The engineers who develop and test AI models are distinct from those who stringently test the security of the models.
    

### **FAQ**

**Does AI replace human analysts?** No. AI capabilities serve as intelligent assistants that _augment_ analyst decision-making—never to replace human judgment.

**Can I opt out of AI features?** If you have compliance or data-handling questions, the PGP team can review configuration options with you.

### What data do AI agents access?

Assets, Attack Paths, Risks, Ports, and Technologies. The metadata visible in the platform is the data agents leverage for environmental context. They use this for prioritization and targeting.

### Are agents acting on behalf of humans without human intervention?

A human is in the loop (HITL). We do not let agents perform active penetration work unsupervised. There are some agents that we use that do not require HITL, but they are not performing active defense. An example is an agent that verifies whether an asset we discovered is affiliated with your organization or not\\u2014we call this our **AI Affiliation Agent**. Agents that do not require supervision are only allowed to conduct housekeeping tasks.

### How are you training them?

We leverage **AWS SageMaker** for our training pipelines.

### Will our data be used for training?

We can train on your data or not train on your data\\u2014this is based on **customer preference**.

### What guardrails are in place?

-   Active defense agents are only activated by humans.
    
-   Humans monitor their activity and agents are required to check in to obtain human confirmation at critical steps before proceeding with active tests.
    
-   We have validation systems in place to ensure the agents are not hallucinating.
    
-   We have hard boundaries to ensure they cannot touch assets out of scope.
    
-   We have hard boundaries in place to ensure they can only use the \\u201cskills\\u201d and \\u201ccapabilities\\u201d we give them access to.
