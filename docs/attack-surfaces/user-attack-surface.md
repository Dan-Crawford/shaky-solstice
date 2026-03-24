---
title: "User Attack Surface"
description: "User Attack Surface"
featurebaseId: "5118688"
---

## The Most Dangerous Vulnerability Has No CVE

Your users are your largest, most dynamic, and most exploited attack surface. Social engineering — the art of manipulating people into divulging information, clicking links, or taking actions that compromise security — is involved in **60% of all cybersecurity breaches** according to the 2025 Verizon Data Breach Investigations Report. No firewall, EDR solution, or SIEM can patch the human element.

The numbers are staggering: **3.4 billion phishing emails** are sent daily. The FBI's IC3 recorded **193,407 phishing complaints** in 2024 — more than double the next most numerous cybercrime category. Business Email Compromise alone caused **$2.77 billion in losses** in a single year. And the attacks are getting smarter: AI-driven fraud tactics increased **118% year over year**, deepfake-enabled vishing surged **over 1,600%** in Q1 2025, and pretexting has overtaken traditional phishing as the most common social engineering method.

Guard extends attack surface management to the human layer — monitoring for credential exposures, assessing email security posture, and tracking the dark web for employee data so you can quantify and reduce your organization's human risk.

* * *

## Why Customers Add the User Attack Surface

### Because humans are the number one attack vector

Of the **4,009 social engineering incidents** recorded in the 2024 DBIR dataset, **85% resulted in confirmed data disclosure**. Phishing was the top tactic at 57% of incidents, followed by pretexting at 30%. Spear phishing campaigns make up only 0.1% of all email-based phishing but are responsible for **66% of all breaches**. The success rate is extraordinary because these attacks exploit trust, urgency, and routine — things no technical control can eliminate.

### Because traditional security tools have a blind spot

Firewalls, EDR, and SIEM systems detect technical indicators of compromise — not human decision-making errors. Even with perfect DMARC enforcement, attackers register look-alike domains that bypass email authentication. AI-generated content and deepfakes are reshaping attack sophistication, making signature-based detection ineffective. When the attack vector is a convincing email from what appears to be your CEO, your $500K security stack watches it sail right through.

### Because your employees' credentials are already exposed

In 2025, researchers compiled **2 billion unique leaked credentials** from dark web combo lists. The largest single credential compilation — **16 billion login credentials** — was assembled from approximately 30 different datasets gathered primarily by infostealer malware. Stolen credentials drive **22% of all incidents**, with an average of **292 days** to identify and contain breaches using compromised credentials. Every exposed credential is a door waiting to be opened.

### Because the attacks are evolving faster than awareness training

Social engineering is no longer just email phishing. Vishing attacks surged **442%** in the second half of 2024. Smishing scams increased **2,900%** from 2023 to 2024. QR code phishing (quishing) exploits the perception that scanning a code feels safer than clicking a link. And deepfake technology — with attackers paying up to **$20,000 per minute** for high-quality deepfake videos — has already caused catastrophic losses: Arup's Hong Kong office lost **$25.6 million** when deepfake video and voice clones of executives convinced a finance employee to make fraudulent transfers.

* * *

## The Social Engineering Threat Landscape

Guard helps organizations understand and defend against the full spectrum of social engineering techniques targeting their users:

**Attack Type**

**Vector**

**Scale**

**Phishing**

Email with malicious links or attachments

3.4B emails/day; 1M+ attacks per quarter

**Spear Phishing**

Targeted email to specific individuals

0.1% of phishing volume, 66% of breaches

**Whaling**

Executive-targeted impersonation

131% increase; impersonation up 50% in 2024

**Business Email Compromise**

Compromised or spoofed business email accounts

$8.5B cumulative losses (2022–2024)

**Vishing**

Voice calls with social pretexts or deepfakes

442% surge in H2 2024; deepfake vishing up 1,600%

**Smishing**

SMS/text messages with malicious links

2,900% increase from 2023 to 2024

**Quishing**

QR codes redirecting to credential harvesting

Exploits trust bias toward physical media

**Pretexting**

Fabricated scenarios to extract information

Now >50% of all social engineering incidents

**Deepfakes**

AI-generated audio/video impersonation

$200M+ losses in North America in Q1 2025

* * *

## What Guard Discovers and Tests

Guard addresses the user attack surface through continuous monitoring across multiple dimensions — extending the same discover-and-test methodology used for technical attack surfaces to the human layer.

### Credential Exposure Monitoring

Guard continuously monitors for organizational credentials appearing in breach datasets, dark web marketplaces, paste sites, and infostealer logs. When employee credentials surface in a new breach or combo list, Guard creates a finding with the exposure source, affected accounts, and recommended remediation — enabling password resets before attackers can leverage stolen credentials.

This is critical because credential-based attacks have an average **292-day dwell time** — nearly 100 days longer than other breach types. Early detection directly reduces this window.

### Email Security Posture Assessment

Guard assesses and monitors DMARC, SPF, and DKIM configurations across all organizational domains — including subsidiary and acquired domains that often lack proper authentication. With Google and Yahoo requiring DMARC for organizations sending 5,000+ daily emails since early 2024, proper email authentication is both a security and a deliverability requirement.

Guard identifies domains vulnerable to spoofing, detects look-alike domain registrations, and flags misconfigurations that allow attackers to impersonate your organization.

### Dark Web Monitoring for Employee Data

Guard continuously scans underground marketplaces, forums, and breach repositories to identify exposure of employee PII, authentication data, and corporate credentials. Alerts fire when newly discovered exposures are tied to organizational email domains or known employee identities — providing early warning before compromised data is weaponized in targeted attacks.

### Phishing Simulation Integration

Guard integrates with phishing simulation platforms to correlate real-world attack surface exposure with internal susceptibility testing. If an employee's credentials appear in a dark web breach _and_ they clicked a phishing simulation link last month, that's a compounding risk that demands immediate attention. This correlation between external exposure and internal behavior creates a true human risk score.

### Security Awareness Training Metrics

Guard tracks human risk metrics alongside technical attack surface metrics — click rates, reporting rates, time-to-report from phishing simulations, and training completion rates. These metrics feed into the same dashboards and risk scoring that security teams use for technical vulnerabilities, giving leadership a unified view of organizational risk across both technical and human dimensions.

* * *

## How It All Connects: The Human Risk Chain

Guard's user attack surface monitoring follows the same continuous discovery model as external and internal attack surfaces:

1.  **Seed your organization** — Add your corporate email domains, subsidiary domains, and key personnel identifiers
    
2.  **Continuous credential monitoring** — Guard monitors breach datasets, dark web marketplaces, and infostealer logs for exposed employee credentials
    
3.  **Email posture assessment** — Guard continuously validates DMARC, SPF, and DKIM configurations across all domains, flagging misconfigurations and look-alike domain registrations
    
4.  **Behavioral correlation** — Phishing simulation results and training metrics are correlated with exposure data to identify compounding risks
    
5.  **Risk scoring and remediation** — Findings enter the same triage pipeline as technical vulnerabilities, with severity scores that account for both exposure level and behavioral indicators
    

This creates a closed loop: exposure is discovered, correlated with human behavior, scored for risk, and tracked through remediation — continuously.

* * *

## What Users See in the Platform

### Credential Exposure Findings

When compromised credentials are discovered, Guard creates findings with the breach source, affected email addresses, exposure date, and whether the credentials include plaintext passwords, hashed passwords, or associated PII. Findings link directly to the affected user accounts for rapid remediation.

### Email Security Posture Dashboard

A dedicated view shows DMARC, SPF, and DKIM status across all organizational domains. Domains without proper authentication are flagged as risks, and configuration changes are tracked over time to ensure remediation sticks.

### Human Risk Metrics

The metrics dashboard includes human risk indicators alongside technical metrics — credential exposure counts, phishing simulation performance, training completion rates, and trend lines showing whether your human attack surface is growing or shrinking over time.

### Risk Management

Social engineering findings integrate into Guard's standard risk management workflow. Credential exposures, email posture gaps, and human risk indicators appear in the same triage queue as vulnerability findings from external and internal scanning — enabling unified prioritization across all attack surfaces.

* * *

## Regulatory and Compliance Drivers

The user attack surface has direct regulatory implications across multiple frameworks:

**Framework**

**Requirement**

**How Guard Helps**

**SEC Cybersecurity Rules**

Material incidents must be disclosed within 4 business days; annual cybersecurity risk reporting required

Continuous monitoring reduces incident likelihood; human risk metrics support annual disclosures

**NIST CSF 2.0**

PR.AT category requires cybersecurity awareness training; phishing-resistant authentication recommended

Training metrics, simulation results, and credential hygiene tracking map directly to PR.AT controls

**GDPR**

Breach notification within 72 hours; fines up to 4% of global turnover

Early detection of employee data exposure enables proactive response before breach notification triggers

**SOC 2**

Security awareness training and access controls required

Dashboards provide auditable evidence of training completion and credential monitoring

Total reported cybercrime losses reached **$16 billion in 2024** — a 33% increase from 2023 — with social engineering as the dominant driver. Regulatory scrutiny of human-layer security controls is intensifying across all major frameworks.

* * *

## Summary

The user attack surface is the most exploited, highest-impact, and fastest-evolving attack surface facing organizations today. It is also the one most traditional security tools are blind to. Guard brings the same continuous discovery, testing, and risk management methodology to the human layer that security teams already rely on for external, internal, cloud, and application attack surfaces — creating a unified view of organizational risk that accounts for both technical vulnerabilities and human behavior.

Social engineering will always target people. Guard ensures you see the exposure before attackers exploit it.
