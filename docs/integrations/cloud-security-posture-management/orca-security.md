---
title: "Orca Security"
description: "Orca Security"
featurebaseId: "4095117"
---

## Overview

The Orca Security integration connects the Praetorian Guard Platform (PGP) with your Orca Security environment, importing cloud security alerts as risks and mapping the underlying cloud resources as assets. Orca provides agentless cloud security across AWS, Azure, GCP, and Kubernetes — and this integration brings that visibility directly into PGP so your cloud-managed resources and their security findings are tracked alongside the rest of your attack surface.

This is especially valuable for organizations using Orca as their Cloud Security Posture Management (CSPM) platform. Rather than manually reconciling security findings between Orca and PGP, the integration automatically surfaces alerts and their associated cloud assets, closing gaps in your attack surface coverage and consolidating risk visibility in a single pane of glass.

---

## What the Integration Does

The integration is **read-only**: PGP queries the Orca Serving Layer API and imports alerts as risks and their associated cloud resources as assets. It does not modify any configuration, alerts, or policies in Orca.

**How it works:**

1. **Authentication** — PGP authenticates to the Orca Serving Layer API using the API token you provide, passed via the `Authorization: Token {token}` header over HTTPS.
2. **Alert ingestion** — PGP queries the `/api/serving-layer/query` endpoint to retrieve open and in-progress alerts across Critical, High, Medium, and Low risk levels. Vulnerability-type alerts (Vulnerable Software, Service Vulnerability) are excluded as they represent dependency/SBOM findings rather than posture issues.
3. **Asset mapping** — Each alert's underlying cloud resource is mapped to a typed PGP asset based on its cloud provider and resource type. The integration recognizes 60+ resource types across AWS, Azure, GCP, and Kubernetes.
4. **Risk creation** — Each alert is converted to a PGP risk with severity mapped from the Orca score or risk level. A proof file with full alert metadata is attached for evidence.
5. **Affiliation tracking** — On subsequent runs, PGP reconciles the current Orca state, detecting changes in alert status and asset presence.

### Discovered Asset Types

The integration maps cloud resources from four platforms into PGP assets:

**AWS** (30+ types)

|  |  |  |
| --- | --- | --- |
| **Compute** | EC2 Instance, Lambda, ECS Task Definition, EKS Cluster | IP or domain asset |
| **Storage** | S3 Bucket, EBS Volume | Cloud resource asset |
| **Database** | RDS Instance/Cluster/Snapshot, ElastiCache, DynamoDB | Cloud resource asset |
| **Networking** | Security Group, Network ACL, VPC, Subnet, ELB, VPC Endpoint | Cloud resource asset |
| **IAM** | Role, User, Group, Managed Policy | Cloud resource asset |
| **API/Integration** | API Gateway, SNS Topic, SQS Queue, Kinesis Stream | Cloud resource asset |
| **Infrastructure** | CloudFormation Stack, ECR Repository, CloudTrail, CloudFront, Glue Catalog | Cloud resource asset |

**Azure** (6 types)

|  |  |
| --- | --- |
| VM, Subscription, Web App | Cloud resource asset |
| Automation Runbook, Variable, Job | Cloud resource asset |

**GCP** (16 types)

|  |  |
| --- | --- |
| Compute Instance, SQL Instance, Cloud Function, Cloud Run, App Engine | Cloud resource asset |
| Service Account, Role, Project, Folder, Organization | Cloud resource asset |
| Forwarding Rule, DNS Managed Zone, Address, Container Image | Cloud resource asset |

**Kubernetes** (11 types)

|  |  |
| --- | --- |
| Deployment, StatefulSet, DaemonSet, Job, CronJob, Pod | Workload asset |
| Service, Secret, ServiceAccount, ClusterRole, Ingress | Kubernetes resource asset |

For unmapped resource types, the integration creates a generic asset using the Orca vendor ID or a constructed ARN.

### Detected Risks

Risks are created from Orca alerts with the naming convention `{AlertType}-orca` (e.g., `MissingFirewall-orca`, `UnencryptedTraffic-orca`). Common alert categories include:

|  |  |  |
| --- | --- | --- |
| **Misconfiguration** | Critical–Low | Cloud resource misconfigurations (e.g., missing encryption, public access) |
| **Network Exposure** | Critical–Low | Overly permissive security groups, missing firewalls |
| **IAM Issues** | Critical–Low | Excessive permissions, unused credentials |
| **Compliance Gaps** | Critical–Low | Violations of security best practices and compliance frameworks |

### Severity Mapping

Risk severity is determined from the Orca alert data using two methods:

* **Orca Score** (preferred, if > 0) — Numeric score mapped to CVSS-equivalent severity
* **Risk Level** (fallback) — Direct mapping: Critical → Critical, High → High, Medium → Medium, Low → Low

Informational-level alerts are excluded from import.

---

## Prerequisites

* An **Orca Security account** with access to the Serving Layer API
* An **API token** with read access to alerts and assets
* Your Orca **regional URL** (e.g., `https://app.eu.orcasecurity.io`)

### Creating an API Token

1. Log in to the Orca Security dashboard
2. Navigate to **Settings > Users & Permissions > API**
3. Click **Create API Token**
4. Assign a descriptive name (e.g., "PGP Integration")
5. Copy the token — it is displayed only once

### Finding Your Regional URL

Your regional URL is the base URL you use to access the Orca dashboard. Common examples:

|  |  |
| --- | --- |
| **US** | `https://app.us.orcasecurity.io` |
| **EU** | `https://app.eu.orcasecurity.io` |

PGP automatically normalizes regional URL variants (e.g., `eu.app.orcasecurity.io` is converted to `app.eu.orcasecurity.io`).

---

## Setup

1. In PGP, navigate to **Integrations** and locate **Orca Security** under the **CSPM** category.
2. Click **Integrate**.
3. Enter the following fields and click **Connect**.

|  |  |  |
| --- | --- | --- |
| **Field** | **Required** | **Description** |
| **Regional URL** | Yes | The base URL of your Orca Security instance (e.g., `https://app.eu.orcasecurity.io`) |
| **API Token** | Yes | The API token generated from your Orca Security account |

PGP validates your credentials by making a lightweight test call to `GET /api/serving-layer/schema`.

---

## What Data Is Synced

**Alerts to PGP Risks**

* Open and in-progress alerts at Critical, High, Medium, and Low risk levels are imported as risks
* Each risk includes the alert type, category, description, recommendation, and associated cloud account
* A proof file with full alert metadata is attached for evidence and traceability
* Vulnerability-type alerts (Vulnerable Software, Service Vulnerability) are excluded to avoid SBOM/dependency noise

**Cloud Resources to PGP Assets**

* Each alert's underlying cloud resource is mapped to a typed PGP asset (60+ types across AWS, Azure, GCP, Kubernetes)
* Assets are tagged with the `orca` cloud service identifier
* For AWS resources, full ARNs are constructed where possible for precise identification
* Unmapped resource types fall back to generic assets using the Orca vendor ID

---

## Orca API Endpoints Used

|  |  |  |
| --- | --- | --- |
| **Endpoint** | **Method** | **Purpose** |
| `/api/serving-layer/schema` | GET | Validate API token and connectivity |
| `/api/serving-layer/query` | POST | Fetch alerts (paginated, 1000 per page) |

---

## Troubleshooting

|  |  |  |
| --- | --- | --- |
| **Issue** | **Cause** | **Fix** |
| Validation fails with 401 | API token is invalid or expired | Regenerate the API token in Orca Security settings |
| Validation fails with 403 | Token lacks required permissions | Ensure the token has read access to alerts and the Serving Layer API |
| Validation fails with connection error | Regional URL is incorrect | Verify the URL matches your Orca region (e.g., `app.eu.orcasecurity.io` vs `app.us.orcasecurity.io`) |
| No assets or risks appear | No open alerts in Orca, or alerts are all Informational | Verify alerts exist in the Orca dashboard at Critical, High, Medium, or Low risk levels |
| Missing expected cloud resources | Resource type not yet mapped | Unmapped types are imported as generic assets — contact support if specific type mapping is needed |
| Large number of alerts slow to import | Orca environments with many alerts paginate in batches of 1000 | This is expected behavior — the integration processes all pages automatically with concurrency limits |

---

## Security and Data Handling

* Token-based authentication (`Authorization: Token`) over HTTPS, never logged
* API token encrypted at rest and in transit within your PGP deployment
* Entirely read-only — PGP never modifies alerts, assets, policies, or any configuration in Orca
* Only alert metadata is imported (type, severity, description, recommendation) — no raw scan data, logs, or credentials are accessed
* Alert processing runs with concurrency limits (10 goroutines) to avoid overloading the Orca API

---

*Integration category: CSPM. Data direction: Read-only (Orca to PGP). Authentication: API token via Authorization header.*
