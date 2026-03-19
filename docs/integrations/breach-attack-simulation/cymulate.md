---
title: "Cymulate"
description: "Cymulate"
featurebaseId: "4430124"
---

## Overview

The Cymulate integration connects the Praetorian Guard Platform (PGP) with the Cymulate Breach and Attack Simulation (BAS) platform, importing assessment results, security control gap analysis, and exposure scores into PGP. Cymulate tests your security controls by simulating real-world attack techniques across the kill chain — email, web gateway, endpoint, lateral movement, and data exfiltration. By importing these results into PGP, you can correlate simulated attack outcomes with your actual attack surface, identifying where your defenses are weakest.

This integration is designed for organizations that run Cymulate BAS assessments and want to incorporate the results into their continuous threat exposure management workflow. Instead of viewing BAS results in isolation, PGP surfaces control gaps and failed simulations alongside your real-world vulnerability data, enabling security teams to prioritize remediation based on both theoretical and actual exposure.

## What the Integration Does

When connected, PGP performs a **read-only** import from the Cymulate API:

* **Assessment Results as Risks**: Results from Cymulate attack simulations — including which attack vectors succeeded, which controls blocked them, and the overall success rate — are imported as risk findings in PGP. Each finding includes the attack technique, the targeted control, and the outcome.
* **Security Control Gaps**: When a simulated attack bypasses a security control, PGP records the gap as a risk finding associated with the relevant asset or control category. This highlights where your defenses need strengthening.
* **Exposure Scores**: Cymulate's overall exposure scores and per-module scores (email security, web gateway, endpoint, etc.) are imported as posture metrics, giving you a quantitative measure of your security control effectiveness.
* **Attack Simulation Metadata**: Details about each simulation, including the MITRE ATT&CK technique mapped, the simulation date, and the targeted environment, are captured for audit and trend analysis.

Data flows **one direction only** — from Cymulate into PGP. The integration never writes back to Cymulate, triggers simulations, or modifies any configuration.

## Prerequisites

Before setting up the integration, you need Cymulate API credentials:

* Log in to the [Cymulate platform](https://app.cymulate.com)
* Navigate to **Settings > API Keys**
* Click **Generate API Key**
* Record the following value:
* **API Key**: The secret key for authenticating API requests
* Ensure the API key has **read-only** permissions to assessment results and reports

The API key must have sufficient scope to read assessment data, simulation results, and exposure scores from your Cymulate tenant.

## Setup

* Go to **Integrations, then Breach and Attack Simulation, then Cymulate** in the Guard Platform
* Enter your Cymulate API key in the setup form
* Click **Connect** — PGP will validate your credentials by attempting to fetch assessment data before saving

|  |  |  |
| --- | --- | --- |
| Field | Description | Required |
| **API Key** | The API key generated from Cymulate's Settings > API Keys page | Yes |

If validation fails, verify that your API key is active and has read permissions for assessment and report data.

## What Data Is Synced

### Assessment Results

Cymulate assessment outcomes are imported as risk findings:

* **Finding name**: Attack technique or scenario name from the simulation
* **Severity**: Mapped from Cymulate's assessment outcome (failed control = high/critical, partially blocked = medium)
* **MITRE ATT&CK mapping**: The technique ID and tactic associated with the simulation
* **Control tested**: The security control category that was evaluated
* **Outcome**: Blocked, partially blocked, or bypassed

### Exposure Scores

Per-module and overall exposure scores are imported as posture metrics:

|  |  |
| --- | --- |
| Cymulate Module | PGP Mapping |
| Email Security | Exposure score metric |
| Web Gateway | Exposure score metric |
| Web Application Firewall | Exposure score metric |
| Endpoint Security | Exposure score metric |
| Lateral Movement | Exposure score metric |
| Data Exfiltration | Exposure score metric |
| Overall Exposure Score | Aggregate posture metric |

### Security Control Gaps

Gaps identified when simulated attacks bypass controls:

* **Gap description**: What the control failed to detect or block
* **Attack vector**: The simulated attack technique that succeeded
* **Affected module**: The security control category where the gap exists
* **Recommendation**: Cymulate's remediation guidance for closing the gap

## API Endpoints Used

|  |  |  |
| --- | --- | --- |
| Endpoint | Method | Purpose |
| `/api/v1/assessments` | GET | Fetch list of completed assessments |
| `/api/v1/assessments/{id}/results` | GET | Fetch detailed results for a specific assessment |
| `/api/v1/exposure-score` | GET | Fetch overall and per-module exposure scores |
| `/api/v1/assessments/{id}/attacks` | GET | Fetch individual attack simulation outcomes |
| `/api/v1/reports/executive` | GET | Fetch executive summary with control gap analysis |

**Base URL**: `https://api.cymulate.com`

All requests are authenticated using the API key passed in the request header over HTTPS.

## Troubleshooting

|  |  |  |
| --- | --- | --- |
| Issue | Cause | Fix |
| Validation fails on connect | API key is incorrect or expired | Regenerate the API key in Cymulate under Settings > API Keys |
| No findings appearing | No assessments have been completed in Cymulate | Run at least one assessment in Cymulate before syncing |
| Missing exposure scores | Assessment modules have not been configured | Configure and run the relevant Cymulate modules (email, web gateway, endpoint, etc.) |
| Stale results | No recent assessments have been executed | Run new assessments in Cymulate to generate fresh results |
| Partial results | API key lacks access to all assessment modules | Verify the API key scope covers all Cymulate modules in your license |
| Connection timeout | Network or firewall blocking outbound requests | Verify that PGP can reach `api.cymulate.com` over HTTPS (port 443) |

## Security and Data Handling

* **Read-only access**: The integration only reads assessment results and exposure data from Cymulate. It never triggers simulations, modifies configurations, or deletes any data in the Cymulate platform.
* **Credential handling**: Your API key is stored as an encrypted credential within PGP and is never exposed in logs or the UI after initial entry.
* **Authentication**: The API key is transmitted over HTTPS in request headers for every API call.
* **Data filtering**: Imported findings and metrics pass through PGP standard filtering rules, allowing you to control which assessment results are included in your risk view.
