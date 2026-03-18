---
title: "Seeds"
description: "Seeds"
featurebaseId: "31502511811611"
---

## Overview

In PGP, a seed is a persistent digital asset owned by your organization. Seeds serve as the foundation for asset discovery and management within the platform. This section will help you understand what seeds are, why they matter, and how they work within PGP.

## Valid Seed Types

When selecting seeds, focus on stable resources. For example, avoid ephemeral IP addresses managed by cloud services. Instead, use the associated domain name as a seed.

You can add the following types of seeds:

-   Top-level domains
-   Fully qualified domain names (FQDNs)
-   CIDR ranges
-   IP addresses

**Note:** Seeds must be added individually and in full. PGP does not support IP ranges (e.g., `0.0.0.0 - 8.8.8.8`), wildcards (e.g., `*.example.com`), or regular expressions (e.g., `^(?:[a-zA-Z0-9-]+\.)+example\.com$`).

## Seeds Management Interface

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d29a21178a432db0497/019b7ff3-660d-75a8-9e08-95e641d46b82/b64u-MDE5YjdmZjMtNjU0MS03MzgxLTk4MGEtNTA1MWRiZDFhYTJh.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=8ee47182526b91a7499df14f9e5c39b44d8427a12adfef5218de82fafd134fc6)

### Main Table Columns

-   Domain/FQDN: The domain name or fully qualified domain name of the seed
-   Status: Current state of the seed (Pending, Approved, Rejected, Frozen, or Deleted)
-   Registrant Organization: Organization that registered the domain
-   Registrant Email: Email address of the domain registrant
-   Registrar: The company that manages the domain name registration
-   Added By: User or PGP capability that added the seed

## Adding Seeds

You can add seeds to PGP either individually or in bulk.

### Adding Seeds

1.  Click the "Add Seed" button in the top right corner
2.  From the dropdown menu, select either "Add Single Seed" or "Import Seed File"
3.  For single seeds: Enter your seed information in the input field
4.  For bulk import: Upload a file containing a newline-separated list of seeds

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d29a21178a432db0497/019b7ff3-647a-7d8b-82cc-5723a09c9044/b64u-MDE5YjdmZjMtNjQ0ZS03MWI2LWJlNDktMTQ2ODc1YmNhODll.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c242086f0c17281a973c1ca7bcb7523b6d6dafb5906620651333f96796d6a42c)

_Note: Seeds you manually add are automatically approved. However, seeds discovered by PGP require approval to verify organizational ownership._

### Filtering and Search

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d29a21178a432db0497/019b7ff3-64b0-73bd-b5fe-b8af418bc07a/b64u-MDE5YjdmZjMtNjQ4My03MDJmLTg4OTgtMzhmZmM0ZmZhNTk2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=085675f858167752a20c9e505b6ebc1b2e4bcc0963ce7882e55e2cf80589cf07)

### Available Filters

-   Status: Filter by seed status (Pending, Approved, Rejected, Frozen, Deleted)
-   Registrant Organization: Filter by the organization that registered the domain
-   Registrant Email: Filter by the registrant's email address
-   Registrar: Filter by the company that manages the domain name registration
-   Added By: Filter by the user or capability that added the seed

A search bar is available for quick lookups across all fields.

## Individual Seed Information

When you select a seed from the main table, PGP displays detailed information about that specific asset. This view helps you understand the seed's history, current status, and relationship to your organization.

### Overview Panel

At the top of the individual seed view, you'll find key information about the selected seed:

-   The seed's name and type
-   Additional PGP capabilities used to discover or confirm this seed
-   First detection
-   Most recent detection

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d29a21178a432db0497/019b7ff3-6870-7b10-9006-e6b944e779ab/b64u-MDE5YjdmZjMtNjg1Mi03YTRmLTk0MzYtMjMxZjUyOTUzODk0.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=640049ec3c5195212ea13984f3742d88c0f291b9dc7d0adce69691bae456344c)

## Detailed Information Tabs

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d29a21178a432db0497/019b7ff3-6898-772e-894a-a73677aa4a51/b64u-MDE5YjdmZjMtNjg1Ny03MDdmLWJlZTUtMzU4MTBjYjQ0OGU1.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=81db9e4f896dcc904edd1bc4c2c71fe07bb9a1121ac16799ce311abb6fcdad44)

### Domain Details

The Domain Details tab presents comprehensive WHOIS information about the domain, including registrar details, registration dates, and current domain status flags. This information helps verify ownership and maintain accurate records of your digital assets.

### Domain History

In the Domain History tab, you can track how the domain's information has changed over time. This includes changes to registrant information, nameservers, and status flags. The historical data helps identify ownership transfers, configuration changes, and potential security concerns.

### History

The History tab maintains a chronological record of all interactions with the seed within PGP:

-   Initial addition date and source
-   Status changes (e.g., from Pending to Approved)
-   User actions and modifications
-   Time and user identification for each change

This audit trail provides accountability and helps track the seed's lifecycle in your organization.

### Notes

The Notes tab allows team members to add and view annotations about the seed. You can use this feature to:

-   Document ownership verification steps
-   Record relevant security findings
-   Share important context with team members
-   Track investigation results
-   Document reasons for status changes

All notes include time and user attribution to maintain a clear record of communications about the seed.

This detailed view ensures you have comprehensive information about each seed in your inventory, helping maintain accurate records and facilitate collaboration across your security team.

## Best Practices

Maintaining your seeds requires regular attention to detail. Review pending seeds discovered by PGP regularly, and whenever possible, use domains rather than IP addresses. Always verify ownership before approving discovered seeds, and consistently maintain currency of your approved seeds.

You can now review [the remaining documentation](https://docs.praetorian.com/hc/en-us/categories/25771779299483) to take full advantage of the PGP platform.
