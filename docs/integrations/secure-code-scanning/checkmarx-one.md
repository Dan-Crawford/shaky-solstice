---
title: "Checkmarx One"
description: "Checkmarx One"
featurebaseId: "8893913"
---

## Overview

The Checkmarx One integration connects the Praetorian Guard Platform (PGP) with your Checkmarx One environment, importing static analysis findings as risks and mapping your scanned repositories as assets. Checkmarx One consolidates multiple scanning engines — SAST, SCA, Secrets detection, KICS (Infrastructure as Code), and Container scanning — and this integration brings those findings directly into PGP so your application security posture is tracked alongside the rest of your attack surface.

This is especially valuable for organizations running Checkmarx One as their application security testing platform. Rather than monitoring findings in two places, the integration automatically surfaces scan results in PGP, closing the gap between code-level vulnerabilities and your broader security posture.

---

## What the Integration Does

The integration is **read-only**: PGP queries the Checkmarx One API and imports scan results as risks and their associated repositories as assets. It does not modify any projects, scans, or configurations in Checkmarx.

**How it works:**

1. **Authentication** — PGP exchanges your Checkmarx API key (a JWT refresh token) for an access token via the OpenID Connect token endpoint, then uses Bearer token authentication for all API calls.
2. **Project enumeration** — PGP queries the `/api/projects` endpoint to discover all projects in your Checkmarx tenant.
3. **Scan retrieval** — For each project, PGP fetches completed scans from the last 7 days (falling back to the most recent scan if none are found in that window).
4. **Result import** — PGP retrieves vulnerability results from each scan and maps them to PGP risks with appropriate severity, CVSS scores, and remediation details.
5. **Asset creation** — Each Checkmarx project's Git repository is imported as a repository asset in PGP, serving as the container for all associated findings.

### Supported Scan Types

|  |  |  |
| --- | --- | --- |
| **SAST** | Static Application Security Testing | Source code vulnerabilities with data flow paths, CWE classifications, and source/sink analysis |
| **SCA** | Software Composition Analysis | Dependency vulnerabilities with CVE identifiers, CVSS scores, package names, and versions |
| **Secrets** | Secret Detection | Exposed credentials, API keys, and tokens with file locations and validity status |
| **KICS** | Infrastructure as Code Scanning | Terraform, CloudFormation, Kubernetes manifest misconfigurations |
| **Containers** | Container Image Scanning | Container image vulnerabilities |

### Detected Risks

Risks are created from Checkmarx findings with type-specific naming conventions:

|  |  |  |
| --- | --- | --- |
| **SAST** | `{QueryName}-{SimilarityID}` | e.g., `SQL_Injection-12345678` |
| **SCA** | `{CVE ID}` | e.g., `CVE-2024-1234` |
| **Secrets** | `{RuleID}-{SimilarityID}` | e.g., `generic-api-key-a1b2c3d4e5f6` |
| **KICS** | `{QueryName}-{SimilarityID}` | e.g., `S3_Bucket_Public-87654321` |

### Severity Mapping

Risk severity is determined from the Checkmarx finding data:

* **CVSS Score** (preferred for SCA, if > 0) — Numeric score mapped to CVSS-equivalent severity
* **Severity Level** (all other types) — Direct mapping: Critical → Critical, High → High, Medium → Medium, Low → Low

### Filtering

The following results are automatically excluded from import:

* Results marked as **Not Exploitable** or **Proposed Not Exploitable**
* Results with status **Fixed**
* **Informational** severity findings
* SCA results with only **local** attack vectors (non-network exploitable)
* Scorecard results (`sscs-scorecard` type)

---

## Prerequisites

* A **Checkmarx One account** with API access
* An **API key** (JWT refresh token) generated from Checkmarx One
* Your Checkmarx One **instance URL** (e.g., `https://ast.checkmarx.net`)

### Creating an API Key

1. Log in to Checkmarx One
2. Navigate to **Settings > Identity and Access Management**
3. Generate a new API key
4. Copy the key — it is displayed only once

For detailed instructions, see [Checkmarx documentation on generating API keys](https://docs.checkmarx.com/en/34965-68618-generating-an-api-key.html).

### Finding Your Instance URL

Your instance URL is the base URL you use to access Checkmarx One. Common examples:

|  |  |
| --- | --- |
| **US** | `https://ast.checkmarx.net` |
| **EU** | `https://eu.ast.checkmarx.net` |
| **EU-2** | `https://eu-2.ast.checkmarx.net` |

---

## Setup

1. In PGP, navigate to **Integrations** and locate **Checkmarx** under the **Secure Code Scanning** category.
2. Click **Integrate**.
3. Enter the following fields and click **Connect**.

|  |  |  |
| --- | --- | --- |
| **Field** | **Required** | **Description** |
| **Instance URL** | Yes | The base URL of your Checkmarx One instance (e.g., `https://ast.checkmarx.net`) |
| **API Key** | Yes | The API key (JWT refresh token) generated from Checkmarx One |

PGP validates your credentials by exchanging the refresh token for an access token and making a lightweight test call to `GET /api/projects?offset=0&limit=1`.

---

## What Data Is Synced

**Scan Results to PGP Risks**

* Vulnerability findings from SAST, SCA, Secrets, KICS, and Container scans are imported as risks
* Each risk includes the finding type, severity, description, and remediation guidance
* A proof file with full finding metadata is attached for evidence and traceability
* SCA findings include CVE identifiers and CVSS scores for accurate severity mapping
* Findings marked as Not Exploitable, Fixed, or Informational are automatically excluded

**Projects to PGP Assets**

* Each Checkmarx project's Git repository URL is imported as a repository asset
* Repository assets serve as containers for all findings from that project
* Assets are linked to the scan's Git branch and repository metadata

---

## Checkmarx API Endpoints Used

|  |  |  |
| --- | --- | --- |
| **Endpoint** | **Method** | **Purpose** |
| `{issuer}/protocol/openid-connect/token` | POST | Exchange refresh token for access token |
| `/api/projects` | GET | Enumerate all projects (paginated, 100 per page) |
| `/api/scans` | GET | Fetch completed scans per project (last 7 days or latest) |
| `/api/results` | GET | Retrieve vulnerability results per scan (paginated) |

---

## Troubleshooting

|  |  |  |
| --- | --- | --- |
| **Issue** | **Cause** | **Fix** |
| Authentication failed | API key (refresh token) is invalid, expired, or malformed | Generate a new API key in Checkmarx One under Settings > Identity and Access Management |
| API access probe returned error status | Token lacks required permissions or instance URL is wrong | Verify the instance URL matches your region and the API key has project read access |
| No assets or risks appear | No completed scans in the last 7 days, or all results are filtered out | Trigger a scan in Checkmarx, or check that projects have scans with non-informational findings |
| Missing SCA vulnerabilities | SCA results with local-only attack vectors are filtered | Only network-exploitable SCA findings (NETWORK or ADJACENT\_NETWORK attack vectors) are imported |
| Connection error | Instance URL is incorrect or PGP cannot reach Checkmarx | Confirm the URL includes `https://` and matches your Checkmarx region |

---

## Security and Data Handling

* OAuth 2.0 refresh token exchange over HTTPS — the refresh token is never sent to Checkmarx APIs directly, only to the IAM token endpoint
* API key encrypted at rest and in transit within your PGP deployment
* Entirely read-only — PGP never modifies projects, scans, results, or any configuration in Checkmarx
* Only scan metadata and vulnerability details are imported — no source code is accessed or stored
* Access tokens are short-lived and obtained per integration run

---

*Integration category: Secure Code Scanning. Data direction: Read-only (Checkmarx to PGP). Authentication: OAuth 2.0 refresh token exchange.*
