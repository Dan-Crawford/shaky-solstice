---
title: "Export Functionality User Guide"
description: "Export Functionality User Guide"
featurebaseId: "0363776"
---

## Overview

The export functionality allows users to export data for vulnerabilities, assets, seeds, and technologies in either CSV or JSON format. The export process captures table filters and selected rows, providing a flexible way to export specific data sets.

### Export Button and Modal

Each section (Vulnerabilities, Assets, Seeds, Technologies) has an "Export" button that opens an export modal. The modal provides options to:

-   Select specific columns to include in the export
-   Apply filters to the data being exported
-   Choose the export format (CSV or JSON)
-   Export either all data or selected rows

### Table Filters and Export

When exporting data, the current table filters are automatically captured and applied to the export. This includes:

-   Search filters
-   Status filters
-   Severity filters (for vulnerabilities)
-   Type filters (for seeds)
-   Source filters (for assets)
-   Advanced filters (varies by section)

## Export Options by Section

### Vulnerability Export

**Filter Options:**

1.  Status
    -   Triage
    -   Opened
    -   Remediated
    -   Accepted
2.  Severity
    -   Critical
    -   High
    -   Medium
    -   Low
    -   Info
    -   Exposure

**Vulnerability Export Column Details** When you select any of these columns from the export pop-up, here's what data you'll get in your export (CSV or JSON):

1.  Title
    -   The name/identifier of the vulnerability
    -   Example: "CVE-2023-1234: Remote Code Execution in Apache Server"
2.  Severity
    -   The vulnerability's severity level
    -   Values: Critical, High, Medium, Low, Info, Exposure
3.  Status
    -   Current state of the vulnerability
    -   Values: Triaged, Opened, Remediated, Accepted
4.  Description
    -   Detailed explanation of the vulnerability
    -   Includes technical details about the vulnerability Example: "A buffer overflow vulnerability in the authentication module..."
5.  Impact
    -   The potential consequences if the vulnerability is exploited
    -   Example: "Could allow remote code execution with system privileges"
6.  Recommendation
    -   Steps to remediate or mitigate the vulnerability
    -   Example: "Update to version 2.4.1 or apply patch XYZ"
7.  References
    -   External links and documentation about the vulnerability
    -   Example: "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-1234"
8.  Evidence
    -   Proof or indicators of the vulnerability's existence
9.  First Seen
    -   Timestamp when the vulnerability was first detected
    -   Format: ISO 8601 date/time
    -   Example: "2023-01-15T14:30:00Z"
10.  Last Seen
     -   Most recent timestamp when the vulnerability was observed
     -   Format: ISO 8601 date/time
     -   Example: "2023-03-20T09:45:00Z"
11.  Asset Name
     -   The DNS name or identifier of the affected asset
     -   Example: "web-server.example.com"
12.  Asset Identifier
     -   Unique identifier for the affected asset
     -   Example: "ASSET-12345"
13.  Assets Impacted
     -   List of all assets affected by this vulnerability
     -   May include multiple asset lines if the vulnerability affects multiple systems
14.  CVE
     -   Common Vulnerabilities and Exposures identifier
     -   Example: "CVE-2023-1234"
15.  CISA KEV
     -   Whether the vulnerability is listed in CISA's Known Exploited Vulnerabilities catalog
     -   Values: true/false
16.  CVSS Score
     -   Common Vulnerability Scoring System score
     -   Range: 0.0 to 10.0
17.  EPSS Score
     -   Exploit Prediction Scoring System score
     -   Range: 0.0 to 1.0
18.  Exploits
     -   Whether known exploits exist for this vulnerability
     -   Values: true/false
19.  MITRE ATT&CK
     -   Associated MITRE ATT&CK techniques
     -   Example: "T1190: Exploit Public-Facing Application"
20.  MITRE CWE
     -   Common Weakness Enumeration identifier
     -   Example: "CWE-79: Cross-site Scripting"
21.  Public Exploit
     -   Whether a public exploit is available
     -   Values: true/false
22.  Threat Actors
     -   Known threat actors associated with this vulnerability
     -   Example: "APT29, FIN7"
23.  Notes
     -   User generated comments on the vulnerability
     -   Example: "Patch available but requires system restart"
24.  History
     -   Timeline of changes to the vulnerability's status or details
     -   Example: "2023-01-15: Initial detection, 2023-01-16: Triaged, 2023-01-17: Remediated"

### Assets Export

**Filter Options:**

1.  Status
    -   Active
    -   Inactive
    -   Expiring
    -   Frozen
    -   Frozen Rejected
    -   Deleted
2.  Source
    -   Account (assets discovered through third party integrations)
    -   Seed (assets discovered through seed scanning)
    -   PGP (assets discovered through PGP's scanning)

**Asset Export Column Details**

When you select any of these columns from the export pop-up, here's what data you'll get in your export (CSV or JSON):

1.  AS Name
    -   The name of the Autonomous System
    -   Example: "Amazon.com, Inc."
2.  AS Number
    -   The Autonomous System Number
    -   Example: "AS16509"
3.  Asset Name
    -   The DNS name or identifier of the asset
    -   Example: "web-server.example.com"
4.  Asset Identifier
    -   Unique identifier for the asset
5.  Class
    -   Classification of the asset
    -   Values: Domain, Subdomain, IP, etc.
6.  First Seen
    -   Timestamp when the asset was first discovered
    -   Example: "2023-01-15T14:30:00Z"
7.  History
    -   Timeline of changes to the asset's status or details
    -   Example: "2023-01-15: Initial discovery, 2023-01-16: Status changed to Active"
8.  Last Seen
    -   Most recent timestamp when the asset was observed
    -   Example: "2023-03-20T09:45:00Z"
9.  Notes
    -   User generated comments on the asset
10.  Origination
     -   The source or origin of the asset
11.  Parent
     -   The parent asset if this is a subdomain or related asset
12.  Source
     -   How the asset was discovered
     -   Values: Account, Seed, PGP
13.  Status
     -   Current state of the asset
     -   Values: Active, Inactive, Expiring, etc.

### Seeds Export

**Filter options:**

1.  Status
    -   Approved
    -   Rejected
    -   Frozen
    -   Pending
    -   Deleted
2.  Type
    -   Domain
    -   IP

**Seeds Export Column Details**

When you select any of these columns from the export pop-up, here's what data you'll get in your export (CSV or JSON):

1.  DNS
    -   The domain name or IP address
    -   Example: "example.com" or "192.168.1.1"
2.  Status
    -   Current state of the seed
    -   Values: Active, Pending, Rejected, etc.
3.  Source
    -   How the seed was added
    -   Example: "Manual Entry"
4.  Registrar
    -   Domain registrar information
    -   Example: "GoDaddy.com, LLC"
5.  Created
    -   Timestamp when the seed was created
    -   Example: "2023-01-15T14:30:00Z"
6.  Visited
    -   Most recent timestamp when the seed was checked
    -   Example: "2023-03-20T09:45:00Z"
7.  Name
    -   The name of the seed
8.  Location
    -   Geographic location of the seed
9.  Email
    -   Contact email associated with the seed
    -   Example: "admin@example.com"
10.  Class
     -   Classification of the seed
     -   Values: Domain, IP, etc.
11.  Notes
     -   User generated comments on the asset
12.  Type
     -   Type of seed
     -   Values: Domain, IP
13.  History
     -   Timeline of changes to the seed's status or details
     -   Example: "2023-01-15: Initial creation, 2023-01-16: Status changed to Active"

### Technologies Export

**Technologies Export Column Details**

When you select any of these columns from the export pop-up, here's what data you'll get in your export (CSV or JSON):

1.  Assets Impacted
    -   List of assets affected by this technology
    -   Example: \["web-server.example.com", "api-server.example.com"\]
2.  Vendor
    -   The technology vendor
    -   Example: "Microsoft"
3.  Product
    -   The product name
    -   Example: "Windows Server"
4.  Version
    -   The version of the technology
    -   Example: "2019"
5.  History
    -   Timeline of changes to the technology's details
    -   Example: "2023-01-15: Initial detection, 2023-01-16: Version updated"
6.  CPE
    -   Common Platform Enumeration identifier
    -   Example: "cpe:2.3:o:microsoft:windows\_server:2019:::::::"
7.  Comment
    -   Additional notes about the technology
8.  Created
    -   Timestamp when the technology was first detected
    -   Format: ISO 8601 date/time
    -   Example: "2023-01-15T14:30:00Z"
9.  Visited
    -   Most recent timestamp when the technology was observed
    -   Format: ISO 8601 date/time
    -   Example: "2023-03-20T09:45:00Z"

### Export Output Format

The export functionality supports two formats:

1.  CSV Format:
    -   Comma-separated values
    -   Assets, Seeds, Technologies, and Vulnerabilities with multiple associations may appear as duplicate rows.
    -   Headers match the selected column names
    -   Suitable for spreadsheet applications
2.  JSON Format:
    -   Structured data format
    -   Preserves relationships between entities
    -   Includes all selected fields and their values
    -   Suitable for programmatic use

### Important Notes About Export Output

1.  Duplicate Rows:
    -   Asset, seed, technology, and vulnerability rows may appear as duplicates in the export
        -   This is intentional to present underlying attributes and relationships
        -   If a single DNS asset resolves to multiple IPs, the ,`asset_name` column in the export will have duplicate entries, as expected. The corresponding `asset_identifier` will include all IPs that the DNS name in `asset_name` resolves to. This is intentional to reflect the underlying DNS relationships and aligns with how the Assets and Vulnerabilities pages behave in PGP.
2.  Relationship Data:
    -   The export includes relationship data between entities
        -   For example, risks will include associated assets
        -   Technologies will include impacted assets
        -   Seeds will include their relationships to assets
3.  Filtered Data:
    -   The export only includes data that matches the selected filters
        -   If no filters are selected, all data is exported according to the choices made on the export pop-up
        -   Selected rows take precedence over filters
4.  Filter selections on the export pop-up are saved between sessions for each export type

### Best Practices

1.  Before Exporting:
    -   Review and adjust filters to get the desired data set
        -   Only the filters you select in the export modal are used to build the export query.
    -   Select specific columns to include only relevant information
    -   Consider the export format based on your needs (CSV for spreadsheets, JSON for programmatic use)
2.  For Large Data Sets:
    -   Use filters to reduce the export size
    -   Select only necessary columns
    -   Consider exporting in smaller batches if needed
3.  For Relationship Analysis:
    -   Use JSON format to preserve relationship data
    -   Include all relevant columns to capture relationship information
    -   Review duplicate rows to understand entity relationships
    -   This documentation should help users understand and effectively use the export functionality across different sections of the application.

## Conclusion

This documentation provides a comprehensive guide to the export functionality in PGP, designed to give you flexibility in how you extract and analyze your data. Whether you need to generate reports for stakeholders, perform detailed analysis in external tools, or share findings with team members, the export feature offers multiple options to meet your needs. If you need additional assistance with understanding specific export options, troubleshooting export issues, or have any other questions about the export functionality, please contact our support team at support@praetorian.com.
