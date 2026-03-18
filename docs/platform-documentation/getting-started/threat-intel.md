---
title: "Threat Intel"
description: "Threat Intel"
featurebaseId: "34117068401179"
---

## Threat Intelligence

## Overview

PGP's Threat Intelligence feature provides real-time insights into vulnerabilities and threats affecting your organization's attack surface. This capability aggregates data from multiple authoritative sources to deliver actionable intelligence about emerging threats, vulnerabilities, and exploit activities.

## Main Features

### Vulnerability Search and Discovery

-   Search for specific CVEs using the search bar
-   View comprehensive vulnerability details including:
    -   Vulnerability name and description
    -   Published and modified dates
    -   CVE identifiers
    -   Associated threat actors and activities

### Intelligence Categories

The threat intelligence interface is organized into three main sections:

### 1\. Overview Tab

-   **Vulnerability Description**: Detailed explanation of the vulnerability
-   **EPSS (Exploit Prediction Scoring System)**:
    -   Score: Indicates likelihood of exploitation (0-1)
    -   Percentile: Shows relative risk compared to other vulnerabilities
    -   Visual indicators for risk levels from low to critical
-   **CVSS (Common Vulnerability Scoring System)**:
    -   Multiple version support (2.0, 3.0, 3.1, 4.0)
    -   Base, temporal, and threat metrics
    -   Detailed breakdown of scoring components
    -   Visual representation of severity levels

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d8aa21178a432dbd188/019b7ff4-dcb0-70fe-97da-1c9381e9542b/b64u-MDE5YjdmZjQtZGM1Zi03NmQwLWJkODgtMjY1ZjMyOTczN2Q3.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=aa4b1321383e94d6444af354bbaca68e2315e7171b338f5246a663f498025c44)

### 2\. Exploitation Activities Tab

-   **Exploit Timeline**:
    -   Chronological view of key events
    -   Important dates including:
        -   First exploit publication
        -   Addition to KEV (Known Exploited Vulnerabilities)
        -   First ransomware appearance
        -   Most recent exploit activity
    -   Visual timeline with event markers
-   **Exploitation Statistics**:
    -   Number of known exploits
    -   Count of associated threat actors
    -   Botnet activity metrics
    -   Ransomware family tracking

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d8aa21178a432dbd188/019b7ff4-d936-7f16-aef8-7b12918f0eb6/b64u-MDE5YjdmZjQtZDhjMi03ZDVlLTliMjAtY2YzMWJiMTY4MzIw.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=b64dc484ed6dd75e8d6f1dddce5391784c53b97a1b524a2aa7d2b4948278519e)

### 3\. MITRE Tab

-   **ATT&CK Framework Integration**:
    -   Associated MITRE ATT&CK techniques
    -   Technique IDs and descriptions
    -   Links to detailed MITRE documentation
-   **CWE (Common Weakness Enumeration)**:
    -   Associated weakness categories
    -   Detailed weakness descriptions
    -   Source attribution and references

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d8aa21178a432dbd188/019b7ff4-d957-7158-ac67-91bfeee04212/b64u-MDE5YjdmZjQtZDkwNy03NjA2LWIzNjMtMTk1MjM3YjZlMTM2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=0297cd111692db3c4b03a8a2bc4c1b22bcf5f4dce469ee9ac37ca0d4ca071f27)

## Understanding Risk Metrics

### EPSS Score Interpretation

-   Scores range from 0 to 1

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d8aa21178a432dbd188/019b7ff4-de73-743d-b1a8-aad51c577621/b64u-MDE5YjdmZjQtZGU1ZC03ODZlLWE2ODktZmViODQwMjA2MThj.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=612f0480375c5dfe488fc374077955bc80c7822a2e5db48b6ad3aa8421ad904f)

-   Higher scores indicate greater likelihood of exploitation
-   Percentile ranking shows relative risk compared to other vulnerabilities

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d8aa21178a432dbd188/019b7ff4-dfeb-7575-8076-3d00b2bfcdae/b64u-MDE5YjdmZjQtZGZjMi03NmE0LWE0NTUtYTczOWQ2OGJlMzk4.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=b281e02a068d4748af1474c5cdf46af2503d2ee03586243e45a415139d376b04)

-   Color-coded indicators:
    -   Critical (≥ 0.9): Red
    -   High (≥ 0.7): Orange
    -   Medium (≥ 0.4): Yellow
    -   Low (< 0.4): Blue

### CVSS Score Interpretation

-   Scores range from 0 to 10
-   Multiple scoring aspects:
    -   Base Score: Inherent vulnerability characteristics

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d8aa21178a432dbd188/019b7ff4-dea8-71f7-a671-b0f02b482cf8/b64u-MDE5YjdmZjQtZGU5OS03MGMzLWEyMGUtZmZkNjEyMDIwYmJh.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=e854a81b54d723161b54f7dc4832feb773b6a4dbe863b44ced8ae30f0c5195bf)

-   Temporal Score: Current exploit status and fixes

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d8aa21178a432dbd188/019b7ff4-e3b2-7758-a495-4dbb3f8050bb/b64u-MDE5YjdmZjQtZTM3Yy03ZjVhLTg0NDUtNDUzNjM4NzZlNmJh.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=545e6485ae17609d7aabccbc73be37c08eed6955e17b52fad8add448ef221dd0)

-   Detailed vector strings showing:
    -   Attack complexity
    -   Required privileges
    -   User interaction needs
    -   Impact measurements

## Integration with Other PGP Features

-   Direct links to affected assets
-   Automated risk scoring based on threat intelligence
-   Integration with vulnerability management workflows
-   Continuous monitoring and alerts for new threats

## Getting Help

For assistance with PGP's threat intelligence features, contact support at [support@praetorian.com](mailto:support@praetorian.com).
