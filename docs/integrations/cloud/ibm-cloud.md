## Overview

The IBM Cloud integration connects the Praetorian Guard Platform (PGP) with IBM Cloud to discover and import cloud infrastructure resources, compute instances, networking configurations, and security findings from your IBM Cloud account. By continuously syncing your IBM Cloud environment, PGP provides a unified view of your cloud attack surface alongside assets from other platforms and tools.

Organizations running workloads on IBM Cloud often operate across multiple regions and resource groups, making it difficult to maintain a complete inventory of externally exposed services. This integration automatically discovers Virtual Server Instances (VSIs), Kubernetes clusters, Cloud Object Storage buckets, load balancers, and other resources that may be part of your attack surface. Security findings from IBM Cloud Security Advisor are also imported as risks within PGP.

This integration uses IBM Cloud APIs in a read-only capacity. PGP does not create, modify, or delete any resources in your IBM Cloud account.

## What the Integration Does

The IBM Cloud integration queries the IBM Cloud Resource Controller API and related service APIs to enumerate cloud resources across your account. It discovers compute instances, networking resources, storage assets, and container infrastructure, then maps each to an asset in PGP. Public IP addresses, hostnames, and service endpoints are extracted and tracked as part of your external attack surface.

Security findings from IBM Cloud Security Advisor are imported as risks and mapped to their corresponding assets. Each finding includes severity information, description, and remediation guidance when available from the IBM Cloud APIs.

All operations are strictly read-only. PGP does not modify, create, or delete any resources or configurations in your IBM Cloud account.

## Prerequisites

Before setting up the IBM Cloud integration, ensure you have:

- **An IBM Cloud account** with resources you want to monitor
- **An IBM Cloud API key** with read access to your account resources
- **IAM permissions**: The API key must belong to a user or service ID with at least the **Viewer** role on the resources you want to discover
- **Security Advisor access** (optional): To import security findings, the API key needs **Reader** access to the Security Advisor service

### Creating an API Key

1. Sign in to the [IBM Cloud console](https://cloud.ibm.com).
2. Navigate to **Manage** > **Access (IAM)** > **API keys**.
3. Click **Create an IBM Cloud API key**.
4. Provide a name (e.g., "Praetorian Guard Platform") and an optional description.
5. Click **Create** and immediately copy the API key value. You will not be able to view it again.
6. Verify that the user or service ID associated with this API key has the **Viewer** role on the account or the specific resource groups you want monitored.

## Setup

1. In PGP, navigate to the **Integrations** page.
2. Select **IBM Cloud** from the list of available integrations.
3. Enter your IBM Cloud API key in the configuration form.
4. Optionally specify a resource group or region to narrow the scope of discovery.
5. Save the integration. PGP will validate connectivity to the IBM Cloud APIs automatically.

### Field Reference

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your IBM Cloud API key with Viewer access | Yes |
| Account ID | Your IBM Cloud account identifier (auto-detected if not provided) | No |
| Resource Group | Limit discovery to a specific resource group | No |
| Region | Limit discovery to a specific IBM Cloud region | No |

## What Data Is Synced

### Cloud Resources (Assets)

The integration discovers infrastructure resources across your IBM Cloud account and imports them as assets in PGP.

| Data Field | Source | Description |
|------------|--------|-------------|
| IP Addresses | Virtual Server Instances, Load Balancers | Public and floating IP addresses associated with compute and networking resources |
| Hostnames | Cloud services, Kubernetes clusters | DNS names and service endpoints exposed externally |
| Storage Endpoints | Cloud Object Storage | Public endpoints for COS buckets and instances |
| Cluster Endpoints | IBM Kubernetes Service, Red Hat OpenShift | API server endpoints and ingress hostnames for container clusters |
| Resource Metadata | Resource Controller | Resource name, type, region, and resource group for each discovered asset |

### Security Findings (Risks)

Security findings from IBM Cloud Security Advisor are imported as risks in PGP.

| Data Field | Source | Description |
|------------|--------|-------------|
| Finding Name | Security Advisor | The name or title of the security finding |
| Severity | Security Advisor | Mapped to PGP severity levels (Critical, High, Medium, Low, Info) |
| Description | Security Advisor | Detailed description of the finding and its implications |
| Remediation | Security Advisor | Recommended actions to resolve the finding |

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `https://iam.cloud.ibm.com/identity/token` | POST | Exchange API key for IAM access token |
| `https://resource-controller.cloud.ibm.com/v2/resource_instances` | GET | List all resource instances in the account |
| `https://resource-controller.cloud.ibm.com/v2/resource_groups` | GET | List resource groups for filtering |
| `https://<region>.iaas.cloud.ibm.com/v1/instances` | GET | List Virtual Server Instances and their network interfaces |
| `https://<region>.iaas.cloud.ibm.com/v1/floating_ips` | GET | List floating IPs assigned to compute resources |
| `https://<region>.iaas.cloud.ibm.com/v1/load_balancers` | GET | List load balancers and their public endpoints |
| `https://containers.cloud.ibm.com/global/v2/getClusters` | GET | List Kubernetes and OpenShift clusters |
| `https://<region>.secadvisor.cloud.ibm.com/findings/v1/<account_id>/providers` | GET | List security finding providers and their findings |

### Required IAM Permissions

| Permission | Type | Purpose |
|------------|------|---------|
| Viewer | Platform role | Read access to resource instances and their metadata |
| Reader | Service role (Security Advisor) | Read access to security findings (optional) |

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| "Invalid API key" or authentication failure | The IBM Cloud API key is incorrect or has been revoked | Generate a new API key in the IBM Cloud console and update the credential in PGP |
| No assets discovered | The API key lacks Viewer permissions on the target resource group or account | Verify IAM permissions for the user or service ID associated with the API key |
| Missing security findings | The API key does not have Reader access to Security Advisor | Add the Reader role for the Security Advisor service to the API key's access policies |
| Partial resource discovery | Discovery is limited to a specific region or resource group | Check whether a region or resource group filter is configured and broaden it if needed |
| Integration times out | Account contains a very large number of resources across many regions | Contact support to discuss increasing the sync timeout for your account |

## Security and Data Handling

The IBM Cloud integration operates in a strictly read-only mode. It queries IBM Cloud APIs to enumerate resources and read security findings, and does not modify any account configuration, resource settings, or security policies.

Credentials are handled securely within PGP. The IBM Cloud API key is encrypted at rest and used exclusively to obtain a short-lived IAM access token. The access token is used only for the duration of the sync operation and is not persisted.

PGP does not access or store workload data, application content, or secrets stored in IBM Cloud services. Only resource metadata (names, types, endpoints, IP addresses) and security finding summaries are read and processed.
