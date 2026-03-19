---
title: "Jobs"
description: "Jobs"
featurebaseId: "31686533288091"
---

## Overview

The Jobs Dashboard provides a centralized view to monitor and manage all automated tasks within the system. This interface allows you to track job statuses, search for specific jobs, and control automated job execution.

## Monitoring Jobs

When you access the Jobs Dashboard, you'll see a comprehensive table displaying all jobs in the system. Each job entry shows the source system, job name, and target of the operation. The status of each job is clearly indicated by a color-coded icon, making it easy to quickly assess the health of your jobs.

A job's status will be one of the following:- Completed - The job has successfully finished- Failed - The job encountered an error- Queued - The job is waiting to start- Running - The job is currently executing

## Search and Filtering

At the top of the dashboard, you'll find a search bar that allows you to look for specific jobs. The search functionality works across multiple fields, including job names, DNS entries, and source systems. As you type, the results will automatically update after a brief delay to ensure efficient searching.

To help you focus on specific job states, you can use the **Status** filter on the left side of the screen. This filter shows you the count of jobs in each state, allowing you to quickly identify if there are any issues requiring attention.

When jobs fail, you can use the **Failed Reasons** filter to group similar failures together, making it easier to identify and address systemic issues.

## Attribution

Each job entry in the dashboard includes attribution information to help you identify PGP-generated traffic in your environment:

* Source IP: Shows the IP address of the PGP scanner performing the job
* Job Type: Indicates the specific capability being used (e.g., portscan, nuclei, crawler)
* Target: Displays the destination IP or domain being scanned

This attribution data helps you:

* Identify PGP traffic in your security logs and monitoring systems
* Distinguish legitimate scanning activity from potential threats
* Track which PGP capabilities are accessing specific assets
* Correlate findings with specific scan activities

Additionally, PGP scanners include identifying headers and user agents in their requests to help with traffic attribution. If you need to verify traffic sources, you can cross-reference the job's source IP and timestamp with your logs.

## Job Control

The dashboard provides two levels of job control:

**System-Wide Control:**At the top of the dashboard, you'll find a "Pause Jobs" button (or "Resume Jobs" if the system is already paused). This control affects all automated job scheduling. When you pause jobs:- New automated scans will not be created- Currently running jobs will complete normally- Manual job execution remains available- A confirmation dialog will appear before the change takes effect

**Individual Job Control:**Each job entry includes a refresh icon that allows you to manually re-run that specific job. Note that you cannot re-run a job that is currently running or queued.

## Auto-Refresh and Scheduling

The dashboard automatically refreshes every 15 seconds to ensure you're seeing current information. When jobs are running normally (not paused), you'll see a countdown timer showing when the next scheduled run will occur, displayed in hours and minutes.

## Troubleshooting Failed Jobs

When jobs fail, you can:1. Hover over the job entry to see the full error message in a tooltip2. Use the Failed Reasons filter to find similar failures3. Re-run the job manually using the refresh icon if the issue appears temporary4. Check the job's target and source information to identify configuration issues

## Need Help?

If you encounter any issues with the Jobs Dashboard or need additional assistance, please contact our support team at [support@praetorian.com](https://support@praetorian.com). Our team is available to help you resolve any problems and ensure your jobs are running smoothly.
