---
title: "Assets"
description: "Assets"
featurebaseId: "5961134"
---

## Overview

The Assets page provides a comprehensive view of your organization's attack surface by displaying all discovered digital assets. Assets are automatically discovered through seed domains, third-party service integrations, and PGP asset discovery capabilities. 

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d4da21178a432db53e4/019b7ff3-f6a7-7355-ab25-ebd25935173d/b64u-MDE5YjdmZjMtZjVjYS03YTE3LWI5YjYtOGJhYTE2OTFhN2E1.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=33007bb52534e37771f6f3d297e4c3853a69170f49333b027a0f9e0ea058c255)

## Asset Discovery

When PGP discovers assets, it employs a wide range of sophisticated discovery methods. Starting with your seed domains, PGP analyzes your attack surface using various techniques. It examines Content Security Policies to find related domains and assets, performs WHOIS and reverse WHOIS lookups to identify connected properties, and even searches SEC EDGAR filings for mentions of digital assets. The system also integrates with major cloud providers like GCP, Azure, and AWS, as well as services like NS1, Cloudflare, Akamai, etc. to discover assets across your cloud infrastructure. Through IP and network range analysis, DNS examination, and technology fingerprinting, PGP continues to expand its understanding of your digital footprint. These capabilities represent just a sample of how PGP discovers assets - the system employs many additional discovery methods to ensure comprehensive coverage of your attack surface.

## Filtering Assets

PGP provides powerful filtering capabilities to help you organize and analyze your attack surface effectively. Since your asset inventory can grow rapidly through automated discovery, these filters are essential for focusing on specific segments of your infrastructure or investigating particular types of assets.

Filter your assets using various criteria:

-   **Recent:** View assets seen in the last 24 hours
-   **Attack Surface**: Filter assets by Internal, External, Cloud
-   **Cloud:** Filter by cloud asset type (Object Storage, DNS Management, Serverless Functions, etc.)
-   **Port Number**: View assets with specific open ports
-   **Protocol**: Filter by detected protocols (FTP, HTTP, HTTPS, SSH, etc.)
-   **AS Name:** Filter on the available AS names
-   **AS Number:** Filter on the available AS numbers
-   **Class:** Filter asset captured from integrations and IPv4 and IPv6
-   **Status**: Filter by asset state (Active, Inactive, Expiring, Frozen, Deleted)
    -   **Active** assets have been seen in the last 48 hours
    -   **Inactive** assets have been seen in the last 48 hours, but not longer than 7 days
    -   **Expiring** assets are assets that PGP has not seen in 7 days or more
    -   **Frozen** assets are assets that have specifically been excluded from scanning
    -   **Deleted** assets have been manually deleted and will not be scanned, nor enumerated in the future.

## Asset Details

When you click on an asset, a detailed information drawer opens, providing comprehensive insights through multiple specialized tabs. The Overview tab, which appears by default, gives you immediate access to critical asset information.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d4da21178a432db53e4/019b7ff3-f5b0-78cc-8d61-d81d5525b8a7/b64u-MDE5YjdmZjMtZjU1MC03YmUyLWE1OGUtNWE3YTE4MzQ4Yjkw.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=4a87cf8298c3b42c2190cce229b842e8faacd99c66711db1a2cb3f4f252b86ff)

### Overview Tab

The Overview tab serves as your command center for the asset, presenting key security metrics and historical context:

**Security Status**

-   At-a-glance view of open vulnerabilities, categorized by severity level
-   Direct insights into the asset's current security posture

**Discovery Timeline**

-   First seen timestamp: Track when PGP initially discovered the asset
-   Last seen timestamp: Monitor when the asset was last active or scanned
-   When an asset has not been seen in 7 days, it will age out of PGP

**Asset Origin**

-   Providence information showing how PGP discovered the asset (e.g., through seed domain analysis, CSP headers, cloud integrations, etc.)
-   Visual parent-child relationship graph that maps how this asset connects to others in your attack surface
-   Clear illustration of the discovery path that led PGP to find this asset

**Asset Identification**

-   IP addresses associated with the asset
-   Domain information
-   Reverse DNS lookup results
-   Core networking details

### Vulnerabilities Tab

The Vulnerabilities tab provides a comprehensive view of all identified security issues affecting this asset. Here you can monitor current vulnerabilities, track their severity levels, and follow their remediation status.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d4da21178a432db53e4/019b7ff3-f3d0-72b8-9b91-b0b851302202/b64u-MDE5YjdmZjMtZjNiMC03NTBjLWEyNzQtYjhkZDQzOTk5MTli.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=7d1a25b8d5aa2cc5583003e1076f844fd2524ee5049fd40730fefff785118aab)

-   List of identified vulnerabilities
-   Severity ratings
-   Current status

### Domain Tab

The Domain tab provides detailed insights into the asset's domain history and WHOIS information. Here you can trace the domain's history within PGP, including historical scan results and changes in domain registration details over time.

### Technologies Tab

The Technologies tab offers a detailed view of the technical fingerprint of your asset, showing what services and technologies are actively running. Here you can see a non-exhaustive example of open ports discovered during scans, along with the specific technologies and services detected on those ports. Each technology entry includes a timestamp of when it was last observed, helping you track changes in the asset's configuration over time. This information is crucial for understanding your asset's exposure and maintaining an accurate inventory of running services. Whether it's web servers, databases, or other network services, this tab provides visibility into the technical stack powering your asset.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d4da21178a432db53e4/019b7ff3-f859-7d8d-9088-f38f39a6d32f/b64u-MDE5YjdmZjMtZjgzYy03MzRkLTk5M2ItZmE5YmNhNmQ4M2Rh.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=a8e017f4624050b48fcaf3195b09b116e0f3ff5f2977576bf9dafb220ad99130)

### Cloud Tab

The Cloud tab reveals infrastructure details about assets hosted in cloud environments, providing essential information about the asset's network placement and ownership. Here you can find the following information:

-   AS Name
-   Identifier
-   AS Number
-   Grouping
-   Owner
-   Last seen timestamp

### Notes Tab

The Notes tab serves as a collaborative space for your team to document important information about the asset. Here, team members can add, edit, and review crucial details that may not fit into other structured categories. Whether it's recording maintenance history, documenting configuration decisions, tracking incidents, or sharing operational insights, this tab maintains a chronological record of all user-generated documentation. This collaborative approach ensures that institutional knowledge about the asset is preserved and easily accessible to all team members, helping maintain consistency in how the asset is managed and secured over time.

It's important to establish consistent practices for asset monitoring and management. PGP provides this monitoring and management automatically.

We're here to help you make the most of PGP's capabilities. If you have questions about using the Assets page or need assistance with any aspect of PGP, please reach out to our support team at [support@praetorian.com](mailto:support@praetorian.com). Our team is committed to helping you effectively secure and manage your attack surface.
