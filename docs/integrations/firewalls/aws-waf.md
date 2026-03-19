---
title: "AWS WAF"
description: "AWS WAF"
featurebaseId: "4610583"
---

## Overview

The AWS WAF integration connects the Praetorian Guard Platform (PGP) with your AWS Web Application Firewall, importing WAF rules, web ACLs, IP sets, and rule groups into PGP as assets. AWS WAF configurations define how your web applications are protected at the edge — PGP imports these configurations so you can continuously monitor your WAF posture and ensure that protection rules align with your broader security policy.

This integration is part of PGP's broader AWS integration and uses the same AWS credential mechanism. It is designed for organizations that deploy AWS WAF in front of CloudFront distributions, Application Load Balancers, or API Gateway endpoints and want visibility into their WAF configuration as part of their attack surface inventory. PGP treats WAF configurations as security-relevant assets, ensuring that rule changes, gaps in coverage, and misconfigured ACLs are surfaced alongside your other cloud assets.

## What the Integration Does

When connected, PGP performs a **read-only** import from the AWS WAF APIs:

- **Web ACLs as Assets**: Each web ACL is imported as a PGP asset, capturing the ACL name, ARN, default action (allow/block), associated rules, and the resources the ACL is attached to (CloudFront, ALB, API Gateway).

- **WAF Rules and Rule Groups**: Individual WAF rules and rule groups are imported with their match conditions, actions (allow, block, count), and priority settings. This gives you visibility into what traffic patterns your WAF is inspecting.

- **IP Sets**: IP sets configured for allow-listing or block-listing are imported, revealing which IP ranges your WAF is explicitly permitting or denying.

- **Regional Coverage**: PGP scans across all configured AWS regions to discover WAF resources, ensuring global WAF deployments are fully inventoried.

Data flows **one direction only** — from AWS WAF into PGP. The integration never writes back to AWS, modifies WAF rules, or changes any configuration.

## Prerequisites

Before setting up the integration, you need AWS credentials with permissions to read WAF resources. The AWS WAF integration uses the same AWS credential setup as other AWS integrations in PGP.

1. Log in to the [AWS Management Console](https://console.aws.amazon.com)

2. Navigate to **IAM > Policies** and create a new policy with the following permissions:
   - `wafv2:ListWebACLs`
   - `wafv2:GetWebACL`
   - `wafv2:ListIPSets`
   - `wafv2:GetIPSet`
   - `wafv2:ListRuleGroups`
   - `wafv2:GetRuleGroup`
   - `wafv2:ListResourcesForWebACL`

3. Create an IAM user or role and attach the policy. You can use either:
   - **Access keys**: An IAM user with an Access Key ID and Secret Access Key
   - **Cross-account role**: An IAM role that PGP assumes via STS (recommended for production)

4. If using access keys, record:
   - **Access Key ID**
   - **Secret Access Key**
   - **Session Token** (if using temporary credentials)

5. If using a cross-account role, record:
   - **Role ARN**
   - **External ID** (if configured)

## Setup

1. Go to **Integrations, then Cloud, then AWS** in the Guard Platform

2. Enter your AWS credentials in the setup form. The WAF integration runs as part of the broader AWS integration.

3. Click **Connect** — PGP will validate your credentials by attempting to authenticate with AWS before saving

| Field | Description | Required |
| --- | --- | --- |
| **Access Key ID** | The AWS IAM access key ID | Yes (if using access keys) |
| **Secret Access Key** | The AWS IAM secret access key | Yes (if using access keys) |
| **Session Token** | Temporary session token for STS credentials | No |
| **Role ARN** | The ARN of the IAM role for PGP to assume | Yes (if using cross-account role) |
| **Account ID** | Your AWS account ID | Yes |

If validation fails, verify that your IAM credentials are active and that the attached policy includes the required WAF permissions.

## What Data Is Synced

### Web ACLs

Each AWS WAF web ACL creates an asset with:

- **Asset name**: Derived from the web ACL name
- **Asset type**: WAF configuration
- **Metadata**: ARN, default action, rule count, associated resource ARNs, capacity units used, and scope (REGIONAL or CLOUDFRONT)

### WAF Rules and Rule Groups

Rules within web ACLs are imported with:

| AWS WAF Element | PGP Asset/Metadata |
| --- | --- |
| Managed rule group | Asset with rule group ARN and vendor name |
| Custom rule | Asset with match conditions and action |
| Rate-based rule | Asset with rate limit threshold and action |
| Rule group | Asset with contained rules and capacity |

### IP Sets

IP sets used in WAF rules are imported as assets:

- **IP set name**: The name of the IP set
- **IP version**: IPv4 or IPv6
- **Addresses**: The list of CIDR ranges in the set
- **Scope**: REGIONAL or CLOUDFRONT

## API Endpoints Used

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `wafv2:ListWebACLs` | AWS CLI/SDK | List all web ACLs in a region |
| `wafv2:GetWebACL` | AWS CLI/SDK | Get detailed web ACL configuration including rules |
| `wafv2:ListIPSets` | AWS CLI/SDK | List all IP sets in a region |
| `wafv2:GetIPSet` | AWS CLI/SDK | Get IP set details including addresses |
| `wafv2:ListRuleGroups` | AWS CLI/SDK | List all custom rule groups |
| `wafv2:GetRuleGroup` | AWS CLI/SDK | Get rule group details including contained rules |
| `wafv2:ListResourcesForWebACL` | AWS CLI/SDK | List resources associated with a web ACL |

**Authentication**: AWS credentials are used via the AWS CLI/SDK with SigV4 signing. PGP iterates across all configured regions (`us-east-1`, `us-east-2`, `us-west-1`, `us-west-2`, `ap-south-1`, `eu-north-1`, `eu-west-3`, `eu-west-2`, `eu-west-1`, `ap-northeast-3`, `ap-northeast-2`, `ap-northeast-1`, `ca-central-1`, `sa-east-1`, `ap-southeast-1`, `ap-southeast-2`, `eu-central-1`) to discover WAF resources. CloudFront-scoped WAF resources are queried via `us-east-1`.

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| Validation fails on connect | AWS credentials are incorrect or expired | Verify your Access Key ID and Secret Access Key are active in the IAM console |
| No WAF assets appearing | IAM policy missing WAF permissions | Add `wafv2:List*` and `wafv2:Get*` permissions to the IAM policy |
| Only some regions showing | IAM policy is region-restricted | Ensure the policy allows WAF access across all regions, or expand the resource scope |
| Missing CloudFront WAF rules | CloudFront WAF requires `us-east-1` scope | Ensure credentials have access to WAF resources scoped to `CLOUDFRONT` in `us-east-1` |
| Authentication error with role | Role trust policy does not allow PGP to assume it | Update the IAM role trust policy to allow the PGP AWS account as a trusted principal |
| Timeout during sync | Large number of WAF resources across many regions | This is expected for large deployments — the sync will complete within the 45-minute timeout |

## Security and Data Handling

- **Read-only access**: The integration only reads WAF configuration data from AWS. It never creates, modifies, or deletes web ACLs, rules, IP sets, or any other AWS resources.

- **Credential handling**: Your AWS credentials (Access Key ID, Secret Access Key, Session Token, or Role ARN) are stored as encrypted credentials within PGP and are never exposed in logs or the UI after initial entry.

- **Authentication**: Credentials are used to sign requests via AWS SigV4 authentication over HTTPS. When using cross-account roles, PGP uses STS AssumeRole to obtain temporary credentials.

- **Data filtering**: Imported WAF assets pass through PGP standard filtering rules, allowing you to control which resources are included in your attack surface inventory.
