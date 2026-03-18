---
title: "Exposure Notifications"
description: "Exposure Notifications"
featurebaseId: "4957951"
---

## Overview

The Exposures and Notifications section allows you to configure which assets trigger vulnerability notifications in PGP. By toggling specific criteria to "on," you can customize which asset conditions generate alerts when detected.

## Configuration Categories

### Port Exposures

Monitor for assets with specific open ports (e.g., 21, 22, 80, 443, 3389).

**How it works:**

-   Toggle a specific port to "on" (e.g., Port 22 - SSH)
-   When PGP discovers an asset with that port open, it:
    -   Creates an "exposure" type vulnerability
    -   Sends a notification to configured channels

**Use case:** Enable notifications for potentially risky open ports such as remote management (3389) or unencrypted services (21).

### Protocol Exposures

Monitor for assets using specific protocols (e.g., FTP, HTTP, HTTPS, IMAPS, SSH).

**How it works:**

-   Toggle a specific protocol to "on" (e.g., FTP)
-   When PGP discovers an asset using that protocol, it:
    -   Creates an "exposure" type vulnerability
    -   Sends a notification to configured channels

**Use case:** Keep track of legacy or potentially insecure protocols like FTP or plain HTTP.

### Cloud Provider Exposures

Monitor for assets deployed on specific cloud platforms (e.g., AWS, GCP, Azure, DigitalOcean).

**How it works:**

-   Toggle a specific cloud provider to "on" (e.g., AWS)
-   When PGP discovers a new asset hosted on that cloud provider:
    -   The asset is tagged with the cloud provider attribute
    -   Creates an "exposure" type vulnerability
    -   If this is the first time this cloud attribute is associated with the asset, PGP sends a notification

**Note:** Assets may already exist in PGP's inventory before being tagged with a cloud provider attribute. Notifications are only sent when the cloud attribute is first associated with an asset.

### Surface Exposures

Monitor for assets discovered through specific surface types (e.g., GitHub, Crowdstrike, TenableVM, user provided).

**How it works:**

-   Toggle a specific surface to "on" (e.g., GitHub)
-   When PGP discovers a new asset through that surface:
    -   The asset is tagged with the surface attribute
    -   Creates an "exposure" type vulnerability
    -   If this is the first time this surface attribute is associated with the asset, PGP sends a notification

**Note:** Assets may already exist in PGP's inventory before being tagged with a surface attribute. Notifications are only sent when the surface attribute is first associated with an asset.

## Best Practices

1.  **Start Focused:** Begin by enabling only the most critical exposure types to avoid alert fatigue
2.  **Review Regularly:** Periodically review which exposure types provide the most valuable insights
3.  **Integration:** Connect notifications to your existing workflows (Slack, email, ticketing systems)

## Common Questions

**Q: Will I receive multiple notifications for the same asset?**A: Yes, if an asset meets multiple exposure criteria. For example, an AWS EC2 instance with port 22 open would trigger both a Port 22 and an AWS cloud provider notification if both are enabled.

**Q: What happens to existing assets when I enable a new exposure type?**A: Notifications are only generated for new discoveries or when an asset is newly tagged with a cloud/surface attribute. Enabling a new exposure type will not generate notifications for your existing asset inventory.

**Q: Can I customize notification frequency?**A: Notifications are sent per instance, when that instance is discovered.
