---
title: "Cloudflare WAF"
description: "Cloudflare WAF"
featurebaseId: "7654107"
---

## Overview

The Cloudflare WAF integration enables Praetorian Guard Platform (PGP) to perform comprehensive security scanning of your web applications without being blocked by your Cloudflare Web Application Firewall. When PGP conducts vulnerability assessments, its scanner traffic can resemble the kind of activity that WAFs are designed to block — port probes, rapid requests, and unusual request patterns. Without a whitelist in place, Cloudflare would block or rate-limit PGP scans, producing incomplete results and potentially masking real vulnerabilities in your environment.

By connecting PGP to your Cloudflare account, the integration automatically creates a targeted bypass rule in your WAF configuration so that PGP scanning traffic passes through uninhibited. This ensures your security assessments are thorough and accurate, while your WAF continues to protect against actual malicious traffic.

## How the Integration Works

Once configured, PGP connects to the Cloudflare API and retrieves the zones (domains) associated with your account. For each zone, PGP creates a single custom WAF rule that identifies and whitelists traffic originating from PGP security scanners. The rule is clearly labeled **"Whitelist Chariot security scanner traffic (Managed By Chariot)"** so it is easy to identify and audit in your Cloudflare dashboard.

PGP identifies its scanner traffic using a combination of source IP address, a custom HTTP header unique to your account, and a dedicated user-agent string. This multi-layered identification ensures that only legitimate PGP scan traffic is whitelisted — not arbitrary requests from the same IP range.

The integration runs daily to keep the whitelist rule synchronized. If you add new zones to your Cloudflare account, PGP will detect them and apply the appropriate rule automatically. If a rule already exists and is up to date, PGP skips it to avoid unnecessary changes.

## What PGP Changes in Your Cloudflare Configuration

PGP creates or updates **one custom WAF rule per zone**. This rule instructs Cloudflare to skip its security checks for traffic that matches PGP scanner signatures. Specifically, the rule bypasses the following Cloudflare protections for matching traffic only:

-   **WAF Managed Rules** — Pre-built rulesets that detect common attack patterns
    
-   **Rate Limiting** — Request throttling based on volume thresholds
    
-   **Zone Lockdown** — IP-based access restrictions for specific URLs
    
-   **User-Agent Blocking** — Rules that block traffic based on user-agent strings
    
-   **Browser Integrity Check** — Challenges for requests with unusual browser characteristics
    
-   **Security Level** — Cloudflare challenge-based bot detection
    
-   **Super Bot Fight Mode** — Automated bot detection and mitigation
    
-   **Hotlink Protection** — Prevents unauthorized linking to your resources
    

PGP does **not** modify any other Cloudflare settings. It does not change your SSL configuration, DNS records, page rules, firewall policies, or any other zone settings. The integration is strictly limited to managing the single scanner whitelist rule.

## Why PGP Makes These Changes

Security scanners deliberately probe for weaknesses — testing for misconfigurations, exposed services, and other vulnerabilities. This behavior is indistinguishable from an actual attack from the perspective of a WAF. Without the whitelist rule, Cloudflare would block PGP assessment traffic, and your scan results would show a clean bill of health not because no vulnerabilities exist, but because the scanner was never allowed to find them.

The bypass rule ensures PGP can deliver complete, accurate assessment results. Every rule PGP creates is tagged with "(Managed By Chariot)" so your team always knows which rules were created by the integration and can review or remove them at any time.

## Setup

Setting up the Cloudflare WAF integration requires a Cloudflare API token with the appropriate permissions. The process takes just a few minutes.

### Step 1: Create a Cloudflare API Token

Log into your Cloudflare dashboard and navigate to **My Profile > API Tokens > Create Token**. Your token needs the following permissions:

-   **Account Rulesets** — Read
    
-   **Zone WAF** — Edit
    
-   **Zone Settings** — Read
    

For detailed instructions on creating API tokens, refer to [Cloudflare documentation](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

### Step 2: Configure the Integration in PGP

Navigate to the **Integrations** page in PGP and locate the **Cloudflare WAF** integration under the Firewall category. Enter the following:

-   **API Token** — Paste the token you created in Step 1.
    
-   **Zones** _(optional)_ — If you want to limit the integration to specific domains, enter a comma-separated list of zone names (e.g., `example.com, app.example.com`). If left blank, PGP will apply the whitelist rule to all zones in your Cloudflare account.
    

Click **Save** to complete the setup. PGP will validate your credentials and begin configuring the whitelist rules across your zones immediately.

## Controlling Scan Impact

Even with the WAF whitelist in place, some hosts may not be able to handle the higher volume of traffic that security scanning generates. If you have services that are sensitive to load — legacy applications, lightweight endpoints, or systems with limited capacity — you can reduce scan intensity through PGP rate limit settings.

Navigate to **Scan Settings > Rate Limits** in PGP to configure the maximum request rate for scans. Lowering this value reduces the traffic volume PGP sends to your hosts, which can help avoid performance degradation on sensitive systems. Note that rate limit settings are applied globally across all scans, not per-integration, so adjusting them will affect overall scan completion times.

If you use both rate limits and scan windows, PGP will pick up scanning where it left off when the next scan window opens. However, because the reduced rate means less work is completed per window, scans may span across multiple scan windows before finishing. This is expected behavior — PGP tracks its progress and resumes automatically.

## Managing the Integration

The whitelist rules PGP creates are fully visible in your Cloudflare dashboard under **Security > WAF > Custom Rules** for each zone. You can identify them by the description containing "(Managed By Chariot)." While you can view these rules at any time, we recommend not modifying them manually — PGP synchronizes daily and will overwrite manual changes to keep the rules consistent.

To remove the integration entirely, disconnect it from the PGP Integrations page. Note that disconnecting the integration does not automatically remove the WAF rules from Cloudflare. You can delete the "(Managed By Chariot)" rules from your Cloudflare dashboard after disconnecting if you wish to clean them up.
