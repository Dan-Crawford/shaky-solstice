---
title: "Vulnerabilities"
description: "Vulnerabilities"
featurebaseId: "31566812305691"
---

## Vulnerabilities in PGP

In PGP, vulnerabilities (or "risks") are security weaknesses or issues that have been identified in an asset (domain, IP, server, etc.) during scanning. The system categorizes these vulnerabilities by severity levels and tracks them through a remediation workflow.

### Severity Levels

Vulnerabilities in PGP are classified into five severity levels (from `risk.go`):

* **Critical**: Highest severity issues requiring immediate attention
* **High**: Serious vulnerabilities that should be addressed quickly
* **Medium**: Moderate severity issues
* **Low**: Minor vulnerabilities with limited impact
* **Info**: Informational findings that may not require remediation

### Complete Vulnerability Workflow

### Primary Remediation Path:

1. **Triage**: Initial discovery and classification with severity level
2. **Open**: Validated vulnerability that needs to be addressed
3. **Closed**: Vulnerability that has been remediated and verified as fixed

### Rejection Path:

1. **Triage**: Initial discovery and classification
2. **Rejected**: A vulnerability that is valid in technical terms, but either:
   * Is out of scope for the current assessment
   * Has been determined by expert security engineers to not be associated with the customer's actual attack surface

### Risk Acceptance Path:

1. **Triage**: Initial discovery and classification
2. **Open**: Validation that the vulnerability is real and associated with the customer's attack surface
3. **Accepted**: A deliberate decision has been made to accept the risk posed by the vulnerability rather than remediating it
   * This might be due to business constraints, limited impact, compensating controls, operational requirements, or other risk management considerations

Each status is combined with severity indicators (Critical, High, Medium, Low, Info) to represent both the state and priority of the vulnerability, providing a complete picture for vulnerability management.

1. **Documentation**: Each vulnerability includes details such as:
   * Description of the issue
   * Proof of exploitation
   * Associated CVEs (when applicable)
   * CVSS scores
2. **Integration with Ticketing**: Vulnerabilities can be linked to external ticketing systems like Jira for tracking remediation efforts

The system maintains a comprehensive history of status changes for each vulnerability, including who made changes and when they occurred, providing a complete audit trail for compliance and reporting purposes.

### Vulnerability Retention

PGP handles vulnerability retention in several ways:

1. **TTL (Time-To-Live)** mechanism:
   * Vulnerabilities in triage status have a default TTL value set to 7 days
   * When a vulnerability changes from triage to another status, the TTL is reset, meaning it no longer expires
   * This suggests triage findings expire after a week if not acted upon, while confirmed vulnerabilities persist indefinitely until explicitly closed
2. **Persistence of confirmed vulnerabilities**:
   * Once vulnerabilities move to `Open`, `Accepted`, or other non-triage states, they remain in the system until explicitly changed
   * Historical data is maintained for audit and compliance purposes
   * The system tracks all status changes, when they occurred, and who made them, creating a complete audit trail

**Regular rescanning of open risks**:

* Open vulnerabilities are rescanned 4 times a day at: 12:30, 15:30, 18:30, and 21:30 UTC
* This ensures that the status of known vulnerabilities is kept up-to-date

## Vulnerabilities Page Overview

Welcome to the vulnerabilities page - your central hub for tracking and managing security risks across your assets. This page provides a comprehensive view of discovered vulnerabilities and their current status.

At the heart of the page is an interactive table displaying all identified vulnerabilities. Each entry provides essential information including severity (ranging from info to critical), current status (pending triage, open, remediated, accepted, or rejected), the specific vulnerability name, affected asset, and the most recent confirmation date. For our managed service customers, you can rest assured that each listed vulnerability has undergone thorough review by our expert engineers.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d6da21178a432db8e79/019b7ff4-6f46-7b73-9004-e3a028e8f063/b64u-MDE5YjdmZjQtNmMwNC03MzMyLTk0YzEtMzUxZDY2MGI1M2Vl.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=a3f550f2349c06664b4b2d3ae25af46143defe98d446fc16396b3ed7d160a9c9)

The table offers flexible filtering options to help you focus on what matters most. You can filter vulnerabilities by severity level, status, or both. When analyzing your security posture, you can select multiple severity levels to get aggregate counts of vulnerabilities matching your criteria.

Diving deeper into individual vulnerabilities is just a click away.

Each entry expands to reveal detailed information across several tabs:

### Overview Tab

This is your starting point for understanding the vulnerability. Here you'll find fundamental information about the risk, its potential impact on your systems, and guidance for remediation.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d6da21178a432db8e79/019b7ff4-6dc2-7e04-aa42-40084d2841b7/b64u-MDE5YjdmZjQtNmJkNC03Y2M0LTg4YWMtNmRhNjhhNGU2MzI2.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=1fb7727bfd844c2752e5d51223934e32a06977ac45dc10c29fcf4bcad827bce5)

### Assets Impacted Tab

Get visibility into the scope of the vulnerability. This tab is particularly useful for domain-level risks where multiple IP addresses might be affected.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d6da21178a432db8e79/019b7ff4-6b76-7d59-ac14-daf2106c0802/b64u-MDE5YjdmZjQtNjkzNy03ZDJkLWJmOGYtYTVhZjI2YTY3Zjg1.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=297737c33c62629a85c411cb9d7ab46e5e1ef24f87900b178464ff9ced05f867)

### Evidence Tab

Access technical data supporting the vulnerability finding. The below fields offer rich information about the vulnerability. Each vulnerability shows only the fields pertinent to its specific type and discovery method, so some sections may appear blank when they don't apply to that particular finding.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d6da21178a432db8e79/019b7ff4-7435-7e8a-80ee-7d25c1ed240b/b64u-MDE5YjdmZjQtNzJlMi03MzRmLTg1MTgtYThkYmE0NzdjOTE2.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c4ef3cee720c16abf2b54d51294989fdcb8608d942c4cc9f9786ad54047250de)

### History Tab

Track the lifecycle of the vulnerability through a chronological log of actions. See status changes, who made them, and when they occurred.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d6da21178a432db8e79/019b7ff4-72ea-7d00-9479-ab60a4cb1ed9/b64u-MDE5YjdmZjQtNzIyYi03NDdkLTkwOWYtZTE2MjFhYzc3ZTFk.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=998ea40af9b9bcb5e6936e216e36720ddf668548a4b831f963b9ae04a50e0855)

### Notes Tab

Collaborate with your team by adding and viewing notes. Each note entry includes the author and timestamp for clear communication history.

Need help or have questions? Our support team is ready to assist at **[support@praetorian.com](mailto:support@praetorian.com)**. We're here to help you make the most of these vulnerability management capabilities.
