---
title: "Cyber Threat Intelligence (CTI)"
description: "Cyber Threat Intelligence (CTI)"
featurebaseId: "5008623"
---

## What It Does

The Cyber Threat Intelligence (CTI) module continuously enriches every vulnerability finding with context from six authoritative threat intelligence sources. A daily automated pipeline downloads, correlates, and applies intelligence data so that every CVE in your environment is augmented with exploit likelihood, active exploitation status, adversary technique mappings, and severity scoring across all CVSS versions.

The result: raw scanner output like _"CVE-2024-1234 found on 192.168.1.5"_ becomes an actionable, prioritized finding with the context security teams need to make remediation decisions.

## Intelligence Sources

Source

What It Provides

Update Frequency

**NVD 2.0 (NIST)**

CVSS scores (v2, v3.0, v3.1, v4.0), vulnerability descriptions, and reference links

Daily

**CISA KEV**

Known Exploited Vulnerabilities catalog, active exploit timeline, ransomware indicators

Daily

**EPSS**

Exploit Prediction Scoring System — probability of exploitation within 30 days (0–1 scale)

Daily

**CVE2CAPEC**

Maps CVEs to attack patterns (CAPEC IDs) and MITRE ATT&CK techniques

Historical + daily

**MITRE ATT&CK**

1,000+ adversary techniques, tactics, and procedures (STIX format)

Embedded at compile time

**CWE**

Common Weakness Enumeration — maps vulnerabilities to weakness categories

Bundled

## How Enrichment Works

The enrichment pipeline runs daily and follows a parallel-download, concurrent-enrichment architecture:

1.  **Daily cron trigger** — A scheduled cron job kicks off the enrichment pipeline.
    
2.  **Parallel source download** — All 6 intelligence sources are downloaded concurrently using an errgroup with 6 workers, one per source.
    
3.  **Concurrent CVE enrichment** — 25 concurrent goroutines process each CVE, correlating it against all downloaded intelligence data.
    
4.  **Dual storage** — Enriched data is persisted to both S3 (`enrichments/cve/{CVE-ID}.json`) and the Neo4j graph database for querying and relationship traversal.
    
5.  **Complete enrichment record** — Each CVE enrichment includes: CVSS scores across all versions, EPSS score and percentile, KEV status and timeline, ATT&CK techniques and tactics, and CWE classifications.
    

## What Enrichment Adds to Every Finding

Here is what a finding looks like before and after CTI enrichment:

Before (Raw Scanner Output)

After (CTI-Enriched)

CVE-2024-1234 found on 192.168.1.5

**CVSS 9.8 Critical** — Actively exploited (CISA KEV since Jan 2024) — **94th percentile EPSS** — Maps to **T1190** (Exploit Public-Facing Application) — **CWE-89** (SQL Injection) — Remediation due by Feb 2024

Every enriched finding carries the full intelligence context needed for prioritization and remediation planning without requiring analysts to manually cross-reference multiple databases.

## AI-Powered CVE Research

For high-severity and actively exploited vulnerabilities, an AI CVE Researcher agent automatically engages to accelerate response:

*   **Auto-triggers** on high-severity findings and any CVE appearing in the CISA KEV catalog.
    
*   **Deep analysis** — Performs contextual analysis of the vulnerability, including affected software, exploitation vectors, and detection opportunities.
    
*   **Detection capability PRs** — Automatically creates GitHub pull requests with new or updated detection capabilities targeting the vulnerability.
    
*   **Linear ticket creation** — Files tracking tickets in Linear for team visibility and workflow integration.
    
*   **Tiered response** — KEV CVEs receive the full treatment (PR + Linear ticket). NVD-only high-severity CVEs receive a research branch for review.
    

## Prioritization Impact

CTI data directly drives how Guard prioritizes vulnerabilities and filters noise from signal. Three intelligence signals combine with CVSS severity to produce actionable prioritization:

Signal

Question It Answers

Impact on Priority

**CISA KEV Status**

Is this vulnerability being actively exploited in the wild?

Highest urgency — confirmed real-world exploitation demands immediate attention

**EPSS Score**

What is the statistical probability this will be exploited in the next 30 days?

Data-driven prioritization — high EPSS scores surface emerging threats before they hit KEV

**MITRE ATT&CK Mapping**

What adversary technique does this vulnerability enable?

Threat context — links vulnerabilities to known attacker playbooks and kill chain stages

These three signals, combined with CVSS severity scoring, power Guard's noise-to-signal filtering engine. Instead of treating all "Critical" CVEs equally, Guard distinguishes between a CVSS 9.8 with no known exploit and a CVSS 7.5 that is actively exploited, in CISA KEV, and in the 95th EPSS percentile.

## What's Next

*   **Vulnerability Management (VM)** — Learn how CTI intelligence feeds into prioritization and remediation workflows.
    
*   **Breach and Attack Simulation (BAS)** — See how validated threats from CTI feed detection testing and security control validation.
