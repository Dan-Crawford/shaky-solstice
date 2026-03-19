---
title: "AttackIQ"
description: "AttackIQ"
featurebaseId: "9417343"
---

## Overview

The AttackIQ integration connects the Praetorian Guard Platform (PGP) with your AttackIQ breach and attack simulation (BAS) platform, importing assessment results and security control validation data into your attack surface. AttackIQ tests whether your security controls actually detect and prevent real-world attack techniques — PGP imports these results as risks so you can see where your defenses have gaps alongside every other vulnerability in your environment.

This integration is ideal for organizations running AttackIQ assessments who want to correlate control validation failures with their broader attack surface. When AttackIQ identifies that a security control failed to detect a specific MITRE ATT&CK technique, PGP surfaces that gap as a risk tied to the affected assets, giving you a unified view of both theoretical vulnerabilities and proven defensive failures.

## What the Integration Does

When connected, PGP performs a **read-only** import from the AttackIQ REST API:

- **Assessment Results as Risks**: Failed and partially failed assessment scenarios from AttackIQ are imported as PGP risks. Each risk captures the MITRE ATT&CK technique tested, the control that failed, the detection outcome, and the affected asset — giving you actionable proof that a specific defense is not working as expected.
- **Assessment Targets as Assets**: Systems and endpoints targeted during AttackIQ assessments are imported as PGP assets, providing an inventory of tested infrastructure and its validation status.
- **Tested Endpoints as Seeds**: IP addresses and hostnames of assessment targets are imported as PGP seeds, feeding them into the Guard discovery and scanning pipeline.

Data flows **one direction only** — from AttackIQ into PGP. The integration never writes back to AttackIQ, modifies assessments, or triggers simulations.

## Prerequisites

Before setting up the integration, you need an AttackIQ API token:

- Log in to your AttackIQ platform at your organization's AttackIQ URL
- Navigate to **Settings**, then **API Tokens** (or **Administration**, then **API**)
- Click **Create Token**
- Assign the token **read-only** permissions for assessments and results
- Record the **API Token** — it may only be shown once
- Note your **AttackIQ Instance URL** (e.g., `https://your-org.attackiq.com`)

The API token must have permissions to read assessments, scenarios, and their results.

## Setup

- Go to **Integrations, then Breach and Attack Simulation, then AttackIQ** in the Guard Platform
- Enter your credentials in the setup form
- Click **Connect** — PGP will validate your credentials by attempting to fetch your assessments before saving

| Field | Description | Required |
| --- | --- | --- |
| **Instance URL** | Your AttackIQ instance URL (e.g., `https://your-org.attackiq.com`) | Yes |
| **API Token** | Your AttackIQ API token with read access | Yes |

If validation fails, verify that your API token has the correct permissions and that the instance URL is reachable.

## What Data Is Synced

### Assessment Results

Failed and partially failed AttackIQ scenarios create PGP risks with:

- **Risk name**: Derived from the scenario name and MITRE ATT&CK technique (e.g., "Failed: T1059.001 — PowerShell Execution")
- **Severity**: Mapped from the assessment's impact rating and the criticality of the MITRE ATT&CK technique tested
- **Proof artifacts**: MITRE ATT&CK technique ID, tactic, assessment name, scenario details, detection outcome (detected/not detected/partially detected), control tested, and timestamp
- **Description**: Full assessment context including what was simulated and what the expected vs. actual outcome was

**Detection outcome mapping**: AttackIQ scenario outcomes map to PGP status:

| AttackIQ Outcome | PGP Status |
| --- | --- |
| Not Detected | Triage |
| Partially Detected | Open |
| Detected (previously failed) | Remediated |
| Error | Triage |
| Detected (always passed) | Not imported |

Only scenarios with failed or partially failed outcomes are imported as risks. Scenarios where controls consistently pass are not imported, since they represent working defenses rather than vulnerabilities.

### Assessment Targets

Systems targeted during assessments are imported as assets with:

- **Asset name**: Hostname or IP address of the target system
- **Asset type**: Endpoint or server
- **Metadata**: Operating system, agent ID, last assessment date, and overall pass/fail ratio

### Tested Endpoints

Endpoints involved in assessments are imported as seeds:

| AttackIQ Element | PGP Seed Type |
| --- | --- |
| Target IP address | IPv4 Asset |
| Target hostname | Domain Seed |
| Target FQDN | Domain Seed |

## API Endpoints Used

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/v1/assessments` | GET | Fetch all assessments in your AttackIQ instance |
| `/api/v1/assessments/{assessmentId}/results` | GET | Fetch scenario results for each assessment (paginated) |
| `/api/v1/assets` | GET | Fetch the inventory of assessment target systems |

**Base URL**: Your AttackIQ instance URL (e.g., `https://your-org.attackiq.com`)

All requests use Bearer token authentication over HTTPS. The integration paginates through all assessments and results in a single sync.

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| Validation fails on connect | API token is incorrect, expired, or lacks permissions | Generate a new API token in AttackIQ Settings with read access to assessments |
| Instance URL rejected | URL is malformed or unreachable | Verify the AttackIQ instance URL is correct and accessible from your network |
| No risks appearing | All scenarios passed (controls are working) | Only failed or partially failed scenarios are imported — if all controls pass, no risks are created |
| Missing assessment data | Assessments have not been run or completed | Ensure assessments have been executed in AttackIQ and results are available |
| Stale results | Sync interval has not elapsed since last assessment run | PGP syncs periodically — new results will appear after the next sync cycle |
| Unexpected severity ratings | Severity is derived from ATT&CK technique criticality | Review the MITRE ATT&CK technique mapping in your assessment configuration |

## Security and Data Handling

- **Read-only access**: The integration only reads data from AttackIQ. It never creates, modifies, or deletes assessments, scenarios, or triggers any simulations.
- **Credential handling**: Your API Token is stored as an encrypted credential within PGP and is never exposed in logs or the UI after initial entry.
- **Authentication**: The API token is transmitted as a Bearer token in the Authorization header over HTTPS to the AttackIQ API.
- **Data filtering**: Risks pass through PGP standard VM filter rules, allowing you to control which severity levels or ATT&CK techniques are imported.
