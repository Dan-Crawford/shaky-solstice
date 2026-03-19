---
title: "Scan Limits"
featurebaseId: "3309499"
draft: "true"
---

## Scan Limits

## Overview

PGP enforces scan limits to ensure platform stability, fair resource allocation, and consistent performance across all customers. Scan limits define the boundaries for how many assets can be scanned, how frequently scans run, and how many concurrent operations can execute at any given time. Understanding these limits helps you plan your security operations and maximize coverage within your allocated budget.

## Types of Scan Limits

PGP applies several categories of scan limits that work together to govern platform usage.

### Rate Limits

Rate limits control how frequently scanning operations can be initiated against your assets.

-   **Scan frequency**: The minimum interval between successive scans of the same asset. This prevents redundant scanning and ensures resources are distributed across your full attack surface

-   **API rate limits**: Limits on the number of API calls that can be made within a given time window for programmatic scan initiation

-   **Discovery rate limits**: Controls on how quickly new asset discovery operations are executed, particularly for seed-based enumeration


### Concurrent Scan Limits

Concurrent scan limits define how many scanning operations can run simultaneously.

-   **Parallel scan slots**: The maximum number of scans that can execute at the same time across your environment

-   **Per-asset concurrency**: Limits on how many simultaneous scans can target a single asset, preventing unintended load on your infrastructure

-   **Capability concurrency**: Limits on how many instances of a specific scanning capability can run in parallel


### Asset Limits

Asset limits define the total number of assets that can be managed and scanned within your PGP account.

-   **Total asset count**: The maximum number of assets (domains, IPs, CIDR ranges, etc.) that can exist in your inventory

-   **Seed limits**: The maximum number of seeds that can be active at any given time

-   **Discovery scope**: Limits on the breadth of automated asset discovery from preseeds and reconnaissance


## Default Limits by Plan

PGP offers different scan limit allocations depending on your subscription tier. The following are general guidelines—exact limits are defined in your service agreement.

### Standard Plan

-   **Assets**: Up to a defined threshold of managed assets

-   **Concurrent scans**: Base allocation of parallel scan slots

-   **Scan frequency**: Standard scan intervals for vulnerability and discovery scanning

-   **Discovery**: Standard preseed and reconnaissance limits


### Enterprise Plan

-   **Assets**: Increased asset capacity for larger environments

-   **Concurrent scans**: Expanded parallel scan slots

-   **Scan frequency**: More frequent scan intervals available

-   **Discovery**: Expanded discovery scope and preseed processing capacity

-   **Priority queuing**: Enterprise scans receive priority in the processing queue


### Custom Plans

For organizations with unique requirements, PGP supports custom limit configurations. Contact your account team to discuss custom allocations based on your environment size and security objectives.

## How Scan Limits Affect Discovery and Vulnerability Scanning

### Discovery Scanning

Scan limits directly impact how PGP discovers and enumerates your attack surface.

-   **Seed processing rate**: The speed at which new seeds are processed for asset discovery is governed by rate limits. Large seed lists are queued and processed incrementally

-   **Preseed activation**: When preseeds are approved and transition to ACTIVE status, the resulting discovery jobs are subject to concurrent scan limits. Approving many preseeds at once may result in queued processing

-   **Recursive discovery**: Discovery operations that find new assets which trigger further discovery (e.g., a domain leading to subdomains leading to IPs) consume scan budget at each level of recursion


### Vulnerability Scanning

-   **Scan scheduling**: PGP schedules vulnerability scans within your rate limit windows, prioritizing assets with the highest risk or longest time since last scan

-   **Capability execution**: Each scanning capability (port scanning, web application testing, secret detection, etc.) operates within its own concurrency limits

-   **Scan depth**: More thorough scan configurations consume more of your scan budget per asset. Balancing depth and breadth is key to optimizing coverage


## Monitoring Scan Usage

PGP provides visibility into your scan consumption so you can track usage against your limits.

### Platform Dashboard

-   **Scan activity overview**: View the number of active, queued, and completed scans across your environment

-   **Asset count tracking**: Monitor your total asset inventory against your asset limit

-   **Usage trends**: Track scan consumption over time to identify patterns and plan capacity


### Notifications

-   **Threshold alerts**: PGP notifies you when scan usage approaches your allocated limits (e.g., at 80% and 95% of capacity)

-   **Limit reached alerts**: Immediate notification when a scan limit has been reached and operations are being queued or throttled

-   **Usage reports**: Periodic summaries of scan activity and resource consumption


## What Happens When Limits Are Reached

When your scan operations reach an allocated limit, PGP handles the situation gracefully rather than dropping requests.

### Rate Limit Exceeded

-   **Queuing**: New scan requests are placed in a priority queue and executed as capacity becomes available

-   **Prioritization**: Queued scans are prioritized based on asset risk level, time since last scan, and scan type

-   **No data loss**: Scan requests are preserved in the queue—they are delayed, not discarded


### Concurrent Scan Limit Reached

-   **Queue and wait**: New scans wait in the queue until an active scan slot becomes available

-   **Automatic execution**: Queued scans automatically start when capacity opens up, with no manual intervention required

-   **Priority ordering**: Higher-priority scans (e.g., scans triggered by critical CVE detection) are promoted in the queue


### Asset Limit Reached

-   **Discovery paused**: New asset discovery is paused until existing assets are removed or your limit is increased

-   **Existing scans continue**: Vulnerability scanning of your current asset inventory continues normally

-   **Notification**: You are notified that the asset limit has been reached and new discoveries are being held

-   **Pending queue**: Newly discovered assets are held in a pending state and can be activated once capacity is available


## Requesting Limit Increases

If your scan limits do not meet your operational needs, you can request an increase.

### How to Request

1.  **Contact your account team**: Reach out to your PGP account representative or Managed Services team

2.  **Provide context**: Describe your use case, the specific limits you need increased, and the business justification

3.  **Review and approval**: The PGP team reviews your request against available capacity and your subscription tier

4.  **Implementation**: Approved increases are applied to your account, typically within one business day


### Common Reasons for Increases

-   **Environment growth**: Your organization has acquired new assets or expanded infrastructure

-   **Merger or acquisition**: A corporate event has significantly expanded your attack surface

-   **Compliance requirements**: Regulatory obligations require more frequent or comprehensive scanning

-   **Incident response**: A security event requires accelerated scanning across your environment


## Best Practices for Optimizing Scan Coverage

### Prioritize Your Attack Surface

-   **Focus on high-risk assets first**: Ensure your most critical and exposed assets are scanned within your limits before lower-priority targets

-   **Use risk-based scheduling**: Let PGP's prioritization algorithms allocate scan resources to the assets that need them most

-   **Review and prune assets**: Regularly review your asset inventory and remove decommissioned or out-of-scope assets to free capacity


### Manage Seeds Effectively

-   **Start with core seeds**: Begin with your primary domains and IP ranges, then expand as your scan budget allows

-   **Review preseeds carefully**: Approving too many preseeds at once can consume discovery capacity rapidly. Prioritize preseeds most likely to yield relevant assets

-   **Freeze unused seeds**: If a seed is no longer relevant but you do not want to delete it, freeze it to free up scan capacity


### Optimize Scan Configurations

-   **Balance depth and breadth**: Adjust scan configurations to cover more assets at a lighter depth, or fewer assets with deeper analysis, depending on your priorities

-   **Schedule strategically**: Distribute scan activity across time windows to avoid hitting concurrent limits during peak periods

-   **Leverage scan results**: Use findings from initial scans to focus deeper scanning on assets where vulnerabilities were detected


### Monitor and Adjust

-   **Review usage regularly**: Check your scan usage dashboard weekly to identify trends and adjust your strategy

-   **Respond to alerts**: When you receive threshold notifications, evaluate whether to adjust scan schedules, prune assets, or request a limit increase

-   **Plan for growth**: If your environment is expanding, proactively request limit increases before you hit capacity


## Relationship Between Seeds, Assets, and Scan Budget

Understanding how seeds, assets, and scan limits interact helps you plan effectively.

### Seeds Drive Discovery

Each active seed triggers discovery operations that consume scan budget. A single seed (such as a top-level domain) can result in the discovery of hundreds or thousands of assets through DNS enumeration, subdomain discovery, TLS certificate analysis, and related techniques.

### Assets Consume Scan Capacity

Every asset in your inventory is a candidate for vulnerability scanning. More assets means more scan operations are needed to maintain coverage. Your scan budget must account for:

-   **Initial discovery scans**: First-time scanning of newly discovered assets

-   **Recurring scans**: Periodic rescanning of existing assets to detect new vulnerabilities

-   **Deep scans**: Targeted, in-depth scanning of high-risk assets


### Budget Planning

-   **Estimate asset growth**: When adding new seeds, estimate how many assets they are likely to generate and whether your limits can accommodate the growth

-   **Account for recursion**: Discovery is recursive—a single seed can generate preseeds that, when approved, generate further discovery. Plan your preseed approvals to control the rate of expansion

-   **Balance discovery and scanning**: Allocating too much budget to discovery may leave insufficient capacity for vulnerability scanning of existing assets, and vice versa. Aim for a balance that keeps your known assets scanned while gradually expanding your attack surface coverage


## Troubleshooting

### Scans Are Not Running

-   **Check scan limits**: Verify you have not reached your concurrent scan or rate limit

-   **Review the queue**: Check whether scans are queued and waiting for capacity

-   **Verify asset status**: Ensure the target assets are in ACTIVE status and not frozen or deleted

-   **Check seed status**: Confirm that seeds associated with the assets are active


### Slow Discovery

-   **Review preseed volume**: A large number of recently approved preseeds may be consuming discovery capacity

-   **Check concurrent limits**: Discovery jobs compete with vulnerability scans for concurrent slots

-   **Prioritize**: Consider freezing lower-priority seeds or preseeds to free capacity for more important discovery tasks


### Unexpected Asset Count Growth

-   **Review preseed approvals**: Approved preseeds can trigger cascading discovery that rapidly increases your asset count

-   **Check recursive discovery**: A single preseed approval can lead to multiple levels of new asset discovery

-   **Audit seeds**: Review your active seeds to identify which ones are generating the most assets and whether that growth is expected
