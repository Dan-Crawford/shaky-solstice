---
title: "AWS WAF"
description: "AWS WAF"
featurebaseId: "4068564"
---

## Overview

The AWS WAF integration connects the Praetorian Guard Platform (PGP) with your AWS Web Application Firewall (WAFv2), providing three security capabilities: scanner IP whitelisting through firewall bypass rules, automated discovery of WAF resources across both Regional and CloudFront scopes, and auditing of WebACL configurations for common misconfigurations.

This integration is valuable for organizations deploying AWS WAF in front of CloudFront distributions, Application Load Balancers, or API Gateway endpoints who need comprehensive WAF posture visibility and continuous misconfiguration detection.

* * *

## What the Integration Does

1.  **Scanner IP Whitelisting** — PGP creates a `guard-scanner-bypass` IP set containing Guard scanner IPs (`66.45.78.0/24`) and wires a bypass rule into every WebACL. The bypass rule uses a 3-leg OR condition: IP set match, a per-customer `chariot` header, and a per-customer `User-Agent` header. Rules are idempotent and handle concurrent execution gracefully.
    
2.  **Asset Discovery** — Enumerates all WAFv2 resources across both REGIONAL and CLOUDFRONT scopes: Web ACLs, IP Sets, Rule Groups, and Regex Pattern Sets. Optionally discovers AWS Firewall Manager (FMS) policies when enabled.
    
3.  **Security Auditing** — Inspects each WebACL for five misconfiguration patterns, flagging gaps in WAF protection that could leave applications exposed.
    

### Discovered Asset Types

**Web ACL**

`aws-waf:{accountId}:{region}:{scope}:{webAclId}`

WAF configuration asset

**IP Set**

`aws-waf:{accountId}:{region}:{scope}:ipset:{id}`

IP allow/block list

**Rule Group**

`aws-waf:{accountId}:{region}:{scope}:rulegroup:{id}`

Custom rule group

**Regex Pattern Set**

`aws-waf:{accountId}:{region}:{scope}:regex:{id}`

Regex match pattern

**FMS Policy** (optional)

`aws-waf:{accountId}:{region}:fms:{policyId}`

Firewall Manager policy

### Detected Risks

**No WebACLs Deployed**

High

No WebACLs found across both Regional and CloudFront scopes

**Default Action Allow**

High

WebACL allows all unmatched requests through by default

**No Rules Configured**

High

WebACL has zero rules — no traffic inspection occurs

**No Rate Limiting**

Medium

No rule contains a rate-based statement (vulnerable to brute force/DDoS)

**Overly Permissive Rules**

Medium

All rules use COUNT action only — traffic is logged but never blocked

**FMS Non-Compliant** (optional)

Medium

Firewall Manager policy has non-compliant member accounts

* * *

## Prerequisites

*   AWS account with WAFv2 resources deployed
    
*   A cross-account IAM role that PGP can assume via STS
    
*   An External ID for confused-deputy protection
    

### Creating the IAM Role

1.  Log in to the AWS Management Console
    
2.  Navigate to **IAM > Roles** and create a new role with a trust policy that allows PGP to assume it
    
3.  Attach a policy with the following permissions:
    

**Read permissions (discovery + audit):**

*   `wafv2:ListWebACLs`
    
*   `wafv2:GetWebACL`
    
*   `wafv2:ListIPSets`
    
*   `wafv2:GetIPSet`
    
*   `wafv2:ListRuleGroups`
    
*   `wafv2:ListRegexPatternSets`
    

**Write permissions (scanner bypass):**

*   `wafv2:CreateIPSet`
    
*   `wafv2:UpdateIPSet`
    
*   `wafv2:UpdateWebACL`
    

**Optional (Firewall Manager):**

*   `fms:ListPolicies`
    
*   `fms:ListComplianceStatus`
    

### Finding Your External ID

The External ID is provided by PGP during setup. Use it in the IAM role trust policy `Condition` block to prevent confused-deputy attacks.

* * *

## Setup

1.  In PGP, navigate to **Integrations** > **Firewall** > **AWS WAF**
    
2.  Click **Integrate**
    
3.  Enter fields and click **Connect**
    

**AWS Account ID**

Yes

Your 12-digit AWS account ID (e.g., `123456789012`)

**IAM Role ARN**

Yes

The ARN of the IAM role for PGP to assume (e.g., `arn:aws:iam::123456789012:role/ChariotWAFReader`)

**External ID**

Yes

External ID for STS AssumeRole (confused-deputy protection)

**Region**

No

AWS region (defaults to `us-east-1`). CloudFront-scoped resources are always queried via `us-east-1`.

**Enable Firewall Manager**

No

Toggle on for org-wide FMS policy visibility (requires FMS admin permissions)

PGP validates credentials by attempting to assume the provided IAM role via STS before saving.

* * *

## What Data Is Synced

**Discovery:** Web ACLs, IP Sets, Rule Groups, and Regex Pattern Sets across both REGIONAL and CLOUDFRONT scopes. Optionally FMS policies and compliance status. **Bypass Rules:** A `guard-scanner-bypass` IP set and bypass rule are created/updated in each WebACL to ensure Guard scanner traffic (`66.45.78.0/24`) is not blocked. **Audit:** Each WebACL is inspected for five misconfiguration patterns including default-allow, missing rules, no rate limiting, and overly permissive COUNT-only actions.

* * *

## AWS API Endpoints Used

`wafv2:ListWebACLs`

Enumerate Web ACLs per scope

`wafv2:GetWebACL`

Fetch full WebACL detail for audit

`wafv2:UpdateWebACL`

Wire scanner bypass rule into WebACL

`wafv2:ListIPSets`

Discover IP sets

`wafv2:GetIPSet`

Fetch IP set details

`wafv2:CreateIPSet`

Create scanner bypass IP set

`wafv2:UpdateIPSet`

Update scanner bypass IP set

`wafv2:ListRuleGroups`

Discover rule groups

`wafv2:ListRegexPatternSets`

Discover regex pattern sets

`sts:AssumeRole`

Cross-account role assumption with External ID

`fms:ListPolicies`

List FMS policies (optional)

`fms:ListComplianceStatus`

Check FMS compliance (optional)

* * *

## Troubleshooting

Validation fails on connect

Role ARN invalid or trust policy incorrect

Verify the Role ARN starts with `arn:aws:iam:` and the trust policy allows PGP to assume it

No WAF assets appearing

IAM policy missing WAF permissions

Add `wafv2:List*` and `wafv2:Get*` permissions to the attached IAM policy

Missing CloudFront WAF resources

CloudFront WAF requires `us-east-1`

CloudFront-scoped WAF resources are always queried via `us-east-1` — ensure permissions cover that region

Bypass rule not created

Missing write permissions

Add `wafv2:CreateIPSet`, `wafv2:UpdateIPSet`, and `wafv2:UpdateWebACL` to the policy

FMS policies not showing

FMS toggle not enabled or missing permissions

Enable the Firewall Manager toggle in setup and add `fms:List*` permissions

Optimistic lock errors in logs

Concurrent WebACL modifications

PGP retries automatically (up to 3 attempts with backoff) — no action needed

* * *

## Security and Data Handling

*   Cross-account role assumption via STS with External ID (confused-deputy protection)
    
*   Credentials encrypted at rest and in transit, never logged
    
*   Only writes: scanner bypass IP set and bypass rule in WebACLs. All other operations are read-only.
    
*   Bypass rules are idempotent — re-running the integration does not create duplicate rules
    
*   No application data, logs, or request content is accessed
    
*   Discovered assets pass through PGP standard filtering rules
    

* * *

## Coming Soon

*   Managed Rule Group Analysis (AWS, marketplace, and custom)
    
*   WebACL-to-Resource Association Mapping (ALB, CloudFront, API Gateway)
    
*   Logging Configuration Auditing
    
*   Bot Control and Account Takeover Prevention Assessment
    

* * *

_Integration category: Firewall. Data direction: Read with scanner bypass writes. Authentication: Cross-account IAM role via STS._
