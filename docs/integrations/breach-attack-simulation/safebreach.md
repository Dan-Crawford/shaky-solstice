## Overview

The SafeBreach integration connects the Praetorian Guard Platform (PGP) with SafeBreach's breach and attack simulation (BAS) platform, importing simulation results, attack scenarios, and security gap analysis into your attack surface view. SafeBreach continuously tests your security controls by executing real attack methods across the kill chain, identifying where defenses succeed and where gaps exist.

By connecting SafeBreach to PGP, you can correlate simulated attack results with your real attack surface data. When SafeBreach identifies a security control gap -- such as a failed block of lateral movement or data exfiltration -- PGP maps that gap to the affected assets and risks in your environment, giving you a prioritized view of which vulnerabilities are most likely to be exploitable given your current defensive posture.

This integration operates in a read-only capacity. PGP queries the SafeBreach API to retrieve simulation results and security posture data but never executes simulations, modifies playbooks, or changes any configuration in your SafeBreach environment.

---

## What the Integration Does

When enabled, PGP connects to the SafeBreach Management API and performs the following:

1. **Simulation results** -- Retrieves the outcomes of attack simulations, including which scenarios were blocked, detected, or missed by your security controls.
2. **Security gaps** -- Imports identified control gaps where attacks were not blocked or detected, mapped to MITRE ATT&CK techniques and tactics.
3. **Attack scenarios** -- Captures details of the simulated attack methods, including the attack type, kill chain phase, and targeted security control.
4. **Risk correlation** -- Maps SafeBreach findings to PGP assets based on the simulators (network endpoints) involved in each test, enabling you to see which assets have validated defensive gaps.

All data flows one direction: from SafeBreach into PGP. Simulation failures and security gaps become PGP risks, and simulator endpoints are correlated to PGP assets for a combined view of theoretical vulnerabilities and validated control gaps.

---

## Prerequisites

Before setting up the integration, ensure you have:

- An active **SafeBreach** deployment (cloud or on-premises management console)
- A **SafeBreach API key** with read access to simulation data
- At least one completed simulation plan with results in your SafeBreach console
- Deployed **simulators** (attack and target nodes) that have executed tests

### Generating an API Key

1. Log in to the **SafeBreach Management Console**
2. Navigate to **Settings > API Keys**
3. Click **Generate API Key**
4. Name the key (e.g., `PGP Integration`) and set permissions to **Read Only**
5. Copy the generated API key and the **Account ID** displayed on the settings page
6. Store both values securely

---

## Setup

1. In PGP, go to **Integrations** and locate **SafeBreach** (under Breach and Attack Simulation)
2. Enter the required credentials
3. Click **Connect** -- PGP will validate the API key and account ID before saving

### Field Reference

| Field | Description | Example |
|-------|-------------|---------|
| **Management URL** | The base URL of your SafeBreach management console | `https://yourcompany.safebreach.com` |
| **Account ID** | Your SafeBreach account identifier | `12345` |
| **API Key** | Your SafeBreach API key with read access | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

Once connected, PGP will begin syncing simulation results on its regular integration schedule.

---

## What Data Is Synced

### Simulation Results

Results from completed attack simulations are imported into PGP.

| SafeBreach Field | PGP Field | Description |
|------------------|-----------|-------------|
| Simulation name | Risk ID | The name and identifier of the attack simulation |
| Result status | Risk severity | Whether the attack was Blocked, Detected, or Missed |
| MITRE ATT&CK technique | Risk metadata | The ATT&CK technique ID and name (e.g., T1059 - Command and Scripting Interpreter) |
| Kill chain phase | Risk metadata | The phase of the attack: infiltration, lateral movement, exfiltration, etc. |
| Simulation details | Proof artifact | Full simulation result data including attack parameters and control responses |

### Security Gaps

Control failures identified by SafeBreach are imported as risks.

| SafeBreach Field | PGP Field | Description |
|------------------|-----------|-------------|
| Gap category | Risk type | The type of control gap (e.g., network, endpoint, email) |
| Affected control | Risk metadata | The security control that failed to block or detect the attack |
| Severity | Risk severity | SafeBreach-assigned severity based on the attack type and gap impact |
| Remediation guidance | Risk metadata | SafeBreach's recommended actions to close the gap |

### Simulator Endpoints (Assets)

SafeBreach simulators are mapped to PGP assets where possible.

| SafeBreach Field | PGP Field | Description |
|------------------|-----------|-------------|
| Simulator hostname | Asset name | The hostname of the simulator node |
| Simulator IP | Asset IP | The IP address of the simulator node |
| Simulator type | Asset metadata | Whether the simulator is an attacker or target node |
| Network segment | Asset metadata | The network zone where the simulator is deployed |

---

## API Endpoints Used

PGP uses the SafeBreach Management REST API. All requests use API key authentication and are read-only (GET).

| Purpose | Endpoint | Method | Notes |
|---------|----------|--------|-------|
| List simulations | `GET /api/orch/v2/accounts/{accountId}/simulations` | GET | Retrieves completed simulation runs |
| Simulation results | `GET /api/orch/v2/accounts/{accountId}/simulations/{id}/results` | GET | Retrieves detailed results for a specific simulation |
| List simulators | `GET /api/orch/v2/accounts/{accountId}/simulators` | GET | Retrieves simulator node inventory |
| Security posture | `GET /api/orch/v2/accounts/{accountId}/posture/gaps` | GET | Retrieves identified security control gaps |
| Validate credentials | `GET /api/orch/v2/accounts/{accountId}/status` | GET | Validates the API key and account access |

All API requests include the `Authorization: Bearer {api_key}` header for authentication.

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| 401 Unauthorized | Invalid or expired API key | Generate a new API key in the SafeBreach console and update PGP |
| 403 Forbidden | API key lacks read permissions or incorrect Account ID | Verify the Account ID matches your SafeBreach tenant and the API key has read access |
| Connection timeout | PGP cannot reach the SafeBreach management console | Verify network connectivity; for on-premises deployments, ensure firewall rules allow inbound HTTPS from PGP |
| No simulation results appearing | No simulations have been executed | Run at least one simulation plan in SafeBreach and wait for it to complete |
| Missing security gaps | Simulations did not identify any control failures | All simulations may have been blocked; review SafeBreach's posture dashboard to confirm |
| Stale data | Simulation plans have not run recently | Verify that SafeBreach simulation schedules are active and simulators are online |
| Simulator assets not mapping | Simulator hostnames/IPs do not match existing PGP assets | Ensure simulator nodes are deployed on hosts that are also tracked in your PGP asset inventory |

---

## Security and Data Handling

- **Read-only access** -- PGP only performs GET requests against the SafeBreach API. It never executes simulations, modifies playbooks, or changes any configuration in your SafeBreach environment.
- **Credential storage** -- Your SafeBreach API key and Account ID are encrypted at rest and never exposed in logs or API responses.
- **Token-based authentication** -- The API key is sent via the `Authorization: Bearer` header over HTTPS for all requests.
- **Data residency** -- Imported simulation results and gap analysis data is stored within your PGP tenant and subject to your organization's data retention policies.
- **Minimal permissions** -- Only read-level API access is required. We recommend creating a dedicated API key with read-only permissions for the PGP integration.
- **Sensitive data** -- SafeBreach simulation results may contain details about attack techniques and control weaknesses. PGP stores this data with the same security controls applied to all risk data in your tenant.
