---
title: "Quick Start Guide"
description: "Quick Start Guide"
featurebaseId: "2783881"
---

## Step 1: Log In and Orient Yourself

1.  Open your browser and navigate to [**guard.praetorian.com**](https://guard.praetorian.com).
    
2.  Enter the credentials provided by your Praetorian team and sign in.
    
3.  You will land on the **Dashboard**, your central command center.
    

\[SCREENSHOT: Dashboard overview with callouts for sidebar nav\]

Take a moment to orient yourself with the key areas of the platform:

*   **Assets** — Your complete external attack surface: domains, IPs, cloud resources, and more.
    
*   **Risks** — Vulnerabilities and security findings discovered across your assets.
    
*   **Integrations** — Connect your existing security tools and cloud accounts.
    
*   **Settings** — Manage your organization, users, and platform configuration.
    
*   **AI Chat** — Ask questions about your attack surface in natural language.
    

## Step 2: Add Your First Seed

1.  Navigate to **Assets** in the sidebar.
    
2.  Click the **"Add Seed"** button.
    
3.  Enter a root domain (e.g., `yourcompany.com`), an IP range (e.g., `203.0.113.0/24`), or a cloud account identifier.
    
4.  Click **Save** to begin discovery.
    

\[SCREENSHOT: Add seed dialog\]

> **What is a seed?** A seed is a starting point for automated discovery. When you provide a root domain, IP range, or cloud account, Guard uses it as the anchor to recursively discover all related assets across your external attack surface. Think of it as planting a seed that grows into a full map of your organization's internet-facing footprint.

Once saved, Guard immediately begins discovering subdomains, IP addresses, and related assets automatically. No further action is required on your part.

## Step 3: Watch Discovery Unfold

After adding a seed, Guard's **Pius** discovery agent goes to work mapping your external attack surface. Discovery runs continuously and uses multiple techniques:

*   **Subdomain enumeration** — Identifies subdomains under your root domains.
    
*   **DNS resolution** — Resolves discovered hostnames to IP addresses.
    
*   **WHOIS lookups** — Identifies ownership and registration details.
    
*   **TLS certificate mining** — Extracts additional domains from SSL/TLS certificates.
    
*   **Reverse WHOIS** — Discovers other domains registered by the same organization.
    
*   **SEC EDGAR mining** — Identifies subsidiaries and related entities from public filings.
    

\[SCREENSHOT: Assets page showing discovered assets populating\]

1.  Navigate to **Assets** to watch discovered assets populate in real time.
    
2.  Initial discovery typically takes **15–60 minutes** depending on the size of your attack surface.
    
3.  Review **Preseeds** as they appear — these are potential new assets that Guard has identified but wants your confirmation before adding to your monitored surface.
    

Discovery is ongoing. Guard continuously monitors for new assets, so your inventory stays current as your infrastructure evolves.

## Step 4: Review Your First Risks

1.  Navigate to **Risks** in the sidebar.
    
2.  Guard automatically scans every discovered asset using **87+ security capabilities**, including vulnerability scanners, misconfig detectors, and exposure checks.
    

\[SCREENSHOT: Risks page with severity breakdown — Critical, High, Medium, Low, Info\]

Each risk includes:

*   **Severity** — Rated as Critical, High, Medium, Low, or Informational.
    
*   **Proof of exploitation** — Evidence demonstrating the vulnerability is real, not theoretical.
    
*   **Remediation guidance** — Actionable steps to resolve the finding.
    

Risks follow a simple lifecycle:

1.  **Open** — Newly discovered, awaiting triage.
    
2.  **Triaged** — Acknowledged and prioritized by your team.
    
3.  **Remediated** — Fixed and verified by Guard.
    

## Step 5: Connect Your Security Stack (Optional)

1.  Navigate to **Integrations** in the sidebar.
    
2.  Browse the available integrations and connect your existing tools:
    
    *   **Vulnerability scanners:** Tenable, Qualys, Rapid7, Snyk
        
    *   **EDR/XDR:** CrowdStrike, SentinelOne
        
    *   **Cloud security:** Wiz, Orca, Prisma Cloud
        
    *   **Cloud accounts:** AWS, Azure, GCP for automated asset discovery
        
3.  Follow the on-screen prompts to authorize each integration.
    

Guard **normalizes and deduplicates** findings across all connected sources, giving you a single unified view of your security posture regardless of how many tools you use.

## What's Next

Now that you are up and running, explore these topics to get the most out of Guard:

*   [Configure scan rate limits](#) — Control how aggressively Guard scans your assets.
    
*   [Set up team access (RBAC)](#) — Invite team members and assign roles.
    
*   [Enable AI features](#) — Use natural language to query your attack surface.
    
*   [Understand your attack surfaces](#) — Learn how Guard organizes and categorizes assets.
    
*   [Explore platform modules](#) — Dive deeper into Risks, Jobs, and Capabilities.
