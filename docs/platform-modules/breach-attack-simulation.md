---
title: "Breach & Attack Simulation (BAS)"
description: "Breach & Attack Simulation (BAS)"
featurebaseId: "4220029"
---

## What It Does

Breach & Attack Simulation (BAS) validates whether your defensive tools actually detect attack techniques. It closes the loop between offense and defense by testing your EDR, SIEM, and NDR against real attack patterns and telling you exactly what was detected, what was missed, and what to fix.

Guard executes attack techniques from the MITRE ATT&CK framework against your environment, then checks your security stack for matching alerts. The result is a concrete, per-technique detection scorecard—not a theoretical assessment.

**Feature gate:** BAS is gated behind the `enable_breach_and_attack` feature flag. Contact your account team to enable it.

## Why It Matters

Having an EDR deployed doesn’t mean it’s detecting attacks. Detection rules drift, get disabled, or simply don’t cover new techniques. Security teams often discover these gaps only during a real incident—the worst possible time.

Guard tells you exactly which compromise paths your defenses miss, continuously, not just during a periodic pentest.

> _“You’d never run your EDR for two weeks a year. Why are you still running offensive security that way?”_

BAS transforms offensive security from a point-in-time exercise into a continuous validation loop. Every time you tune a detection rule or deploy a new control, you can re-run the simulation and measure improvement.

## Detection Outcomes

Every simulated attack technique receives one of six detection outcomes, scored on a 0–1 scale:

Outcome

Score

Meaning

**Prevented**

1.0

Attack blocked before execution. The defensive control stopped the technique entirely.

**Responded**

0.9

Automated response triggered. The attack executed but an automated playbook (isolate host, kill process, etc.) fired.

**Detected**

0.8

Security team alerted with high priority. A human analyst would see this promptly.

**Alerted**

0.6

Alert generated but at lower priority. Risk of being lost in noise or triaged too slowly.

**Logged**

0.3

Activity logged but no alert raised. Evidence exists for forensics but no one was notified.

**Undetected**

0.1

Attack succeeded without any detection. No log, no alert, no response.

## EDR/SIEM Integrations

Guard integrates with your existing security stack to pull alerts and match them against simulated attacks:

Platform

Type

What Guard Tests

**Microsoft Defender**

EDR

Alert matching via Azure identity, MITRE technique correlation

**CrowdStrike Falcon**

EDR + VM

Hosts inventory, Spotlight vulnerabilities, Shield SaaS security

**SentinelOne**

EDR

Endpoint threats via Management Console API v2.1

**ExtraHop Reveal(x)**

NDR

Network detection events and alert normalization

**Panther**

SIEM

Alert ingestion and classification

**AttackIQ, SafeBreach, Cymulate**

BAS platforms

Supplementary validation data from existing BAS tools

## How Detection Matching Works

Guard uses a hybrid approach that combines deterministic rules with AI-assisted classification:

### Rule-Based Matching

*   **Hostname filter:** Case-insensitive substring match against the target host in alerts.
    
*   **File hash filter:** Matches MD5, SHA-1, or SHA-256 hashes from alert artifacts against simulation payloads.
    
*   **MITRE technique ID filter:** Matches technique IDs (e.g., T1059.001) with support for parent and sub-technique matching—an alert tagged T1059 will match a simulation of T1059.001.
    

### LLM-Assisted Classification

When an alert doesn’t match any deterministic rule, Guard falls back to AI classification:

*   **Model:** Llama 4 Scout, running at temperature 0.0 for deterministic results.
    
*   **Output:** A confidence score (0–100) plus reasoning text explaining the match rationale.
    
*   **Rate limit:** 100 LLM classification calls per cron run to control cost.
    
*   **Escalation:** Alerts that the model cannot confidently classify are flagged for manual review.
    

## MITRE ATT&CK Coverage

Guard provides comprehensive mapping to the MITRE ATT&CK and D3FEND frameworks:

*   **198 ATT&CK techniques + 400+ sub-techniques** (aligned to v14.1) available for simulation.
    
*   **92 MITRE D3FEND defensive controls** mapped across 334 total technique-to-control relationships.
    
*   **Gap analysis:** Identifies techniques with zero detection coverage in your environment.
    
*   **Remediation recommendations:** For each gap, suggests specific D3FEND controls to deploy (e.g., “Deploy _File Content Rules_ to detect T1027 Obfuscated Files”).
    
*   **Prevalence weighting:** Techniques are weighted by real-world threat frequency using data from the Picus Red Report 2024, so you prioritize the gaps that matter most.
    

## Security Posture Score

Guard computes a composite Security Posture Score that combines offensive and defensive coverage into a single metric:

### Formula

`(Attack Coverage × 0.4) + (Defense Coverage × 0.35) + (Effective Defense × 0.25)`

Component

Weight

What It Measures

**Attack Coverage**

40%

Percentage of ATT&CK techniques tested, weighted by Picus threat prevalence, scored by detection outcome tier.

**Defense Coverage**

35%

Percentage of recommended D3FEND controls that are deployed and validated.

**Effective Defense**

25%

Of deployed controls, the percentage rated “Highly Effective” (Prevented or Responded outcomes).

### Rating Scale

Rating

Score Range

**Critical**

0–24

**Poor**

25–39

**Fair**

40–59

**Good**

60–79

**Excellent**

80–100

## BAS Workflow

A typical BAS monitoring session follows these steps:

1.  **Create a BAS session** — Define scope with filters: target hostnames, file hashes, and/or specific MITRE techniques to simulate.
    
2.  **Execute attack simulation** — Guard schedules and runs the selected attack techniques against your environment.
    
3.  **Poll for alerts** — Guard queries your connected EDR/SIEM/NDR platforms for alerts generated during the simulation window.
    
4.  **Detection matching** — Alerts are matched to simulated techniques using rule-based filters first, then LLM-assisted classification as a fallback.
    
5.  **Score results** — Each technique receives a detection outcome (Prevented through Undetected) with latency metrics showing how long detection took.
    
6.  **Gap analysis dashboard** — Review what was detected, what was missed, and which MITRE techniques have no coverage.
    
7.  **Remediate** — Deploy recommended D3FEND controls, tune detection rules, or adjust alert priorities based on the results.
    
8.  **Re-run to validate** — Execute the same simulation again to confirm that your changes improved detection coverage.
    

## What’s Next

*   **EDR Integration Guides** — Step-by-step setup for connecting Microsoft Defender, CrowdStrike, SentinelOne, and other platforms.
    
*   **MITRE ATT&CK Visualization** — Explore the ATT&CK matrix heatmap showing your detection coverage across all techniques.
    
*   **AI Enablement** — Enable AI-powered features for automated validation, anomaly detection, and continuous posture monitoring.
