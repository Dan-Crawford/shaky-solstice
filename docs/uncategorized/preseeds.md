---
title: "Preseeds"
featurebaseId: "5726722"
draft: "true"
---

## Preseeds

## Overview

Preseeds are potential discovery targets that Chariot automatically identifies during asset reconnaissance. They represent patterns, attributes, or entities discovered from your existing assets that could lead to finding additional assets. Unlike seeds, which are manually added or explicitly approved assets, preseeds are automatically discovered and require manual review and approval before they can be used for further scanning.

Preseeds serve as an intermediate discovery mechanism, allowing Chariot to identify potential assets through various reconnaissance techniques while giving you control over which discoveries should be pursued.

## What Are Preseeds?

Preseeds are discovery patterns extracted from your existing assets. They contain information such as:

-   **WHOIS data**: Company names, email addresses, and other registration information from domain lookups
    
-   **EDGAR filings**: Company names used to search SEC EDGAR filings for subsidiary information
    
-   **TLS certificates**: Common names and DNS names from SSL/TLS certificates
    
-   **Favicons**: Website favicons that can identify related domains
    
-   **DNS subdomains**: Subdomain patterns discovered during DNS enumeration
    
-   **CIDR handles**: Network organization identifiers from Regional Internet Registries (RIRs)
    
-   **Content Security Policy (CSP) headers**: CSP values that can indicate related domains
    

Each preseed has:

-   **Type**: The category of discovery pattern (e.g., `whois+company`, `edgar+company`, `tlscert`, `favicon`)
    
-   **Title**: The specific field or attribute name (e.g., `company`, `email`, `subdomain`)
    
-   **Value**: The actual discovered value (e.g., "Example Corporation", "admin@example.com")
    
-   **Status**: Current state in the approval workflow (Pending, Active, Frozen, Rejected, or Deleted)
    

## How Preseeds Are Discovered

Preseeds are automatically discovered by Chariot capabilities during asset scanning. The discovery process happens in the background as your assets are analyzed.

### Discovery Sources

#### WHOIS Lookups

When Chariot performs WHOIS lookups on your domains, it extracts registration information and creates preseeds for:

-   **Company names**: Organization names from domain registrations
    
-   **Email addresses**: Registrant and administrative contact emails
    
-   **Names**: Individual registrant names
    
-   **Other WHOIS fields**: Various registration details
    

**Example**: When scanning `example.com`, if the WHOIS record shows the registrant organization as "Example Corporation", Chariot creates two preseeds:

-   Type: `whois+company`
    
-   Value: "Example Corporation"
    

And:

-   Type: `edgar+company`
    
-   Value: "Example Corporation"
    

The `edgar+company` preseed enables searching SEC EDGAR filings for additional company information and subsidiaries.

#### EDGAR Filing Discovery

When Chariot discovers company names from WHOIS lookups, it automatically creates EDGAR preseeds (`edgar+company`) in addition to WHOIS preseeds. These preseeds enable searching the SEC EDGAR database for:

-   **Company filings**: SEC filings submitted by the company
    
-   **Subsidiary information**: Related companies and subsidiaries listed in SEC filings
    
-   **CIK (Central Index Key)**: Unique identifiers for companies in the SEC database
    

**Example**: When a WHOIS lookup reveals "Example Corporation" as the registrant, Chariot creates an `edgar+company` preseed. Once approved, this preseed triggers a search of SEC EDGAR filings to find:

-   All SEC filings for "Example Corporation"
    
-   Subsidiary companies listed in 10-K filings
    
-   Related entities that may have their own domains
    

#### TLS Certificate Analysis

When Chariot analyzes SSL/TLS certificates, it extracts:

-   **Subject Common Names**: Domain names from certificate subjects
    
-   **DNS Names**: Alternative names (SANs) from certificates
    

**Example**: If a certificate for `api.example.com` contains `*.example.com` in its SANs, Chariot creates preseeds for potential subdomains.

#### DNS Enumeration

During DNS resolution and subdomain enumeration, Chariot may discover:

-   **Subdomain patterns**: Common subdomain naming conventions
    
-   **Zone transfers**: Information from DNS zone data
    

#### IP Address Analysis

When analyzing IP addresses and CIDR ranges, Chariot extracts:

-   **Organization names**: From WHOIS records for IP ranges
    
-   **CIDR handles**: Network organization identifiers from RIR databases
    

#### Content Security Policy (CSP)

CSP headers from websites may contain domain patterns that indicate related assets.

#### Favicon Analysis

Website favicons can be used to identify related domains that share the same visual branding.

### Automatic Discovery Process

1.  **Asset Scanning**: Chariot scans your approved seeds and assets using various capabilities
    
2.  **Pattern Extraction**: Capabilities extract relevant patterns and attributes from scan results
    
3.  **Preseed Creation**: New preseeds are automatically created with `PENDING` status
    
4.  **Deduplication**: Chariot checks for existing preseeds to avoid duplicates
    
5.  **Queue for Review**: New preseeds appear in your preseed management interface for review
    

## Preseed Status Workflow

Preseeds move through a defined workflow from discovery to final state:

```
DISCOVERY → PENDING → [Manual Review] → ACTIVE or REJECTED                                     ↓                                  FROZEN (temporary hold)                                     ↓                                  DELETED (removed)
```

### Status Definitions

#### PENDING

-   **Initial state**: All newly discovered preseeds start with PENDING status
    
-   **Action required**: Preseeds in PENDING status require manual review
    
-   **No processing**: Pending preseeds are not used for further discovery until approved
    

#### ACTIVE

-   **Approved state**: Preseeds that have been reviewed and approved
    
-   **Processing enabled**: Active preseeds trigger discovery tasks to find related assets
    
-   **Automatic scanning**: Chariot automatically processes active preseeds to discover new assets
    

#### FROZEN

-   **Temporary hold**: Preseeds that are temporarily disabled
    
-   **No processing**: Frozen preseeds do not trigger discovery tasks
    
-   **Can be reactivated**: Frozen preseeds can be changed back to ACTIVE status
    

#### FROZEN\_REJECTED

-   **Rejected state**: Preseeds that have been reviewed and rejected
    
-   **Permanent hold**: Indicates the preseed was determined to be invalid or not relevant
    
-   **No processing**: These preseeds will not be used for discovery
    

#### DELETED

-   **Removed state**: Preseeds that have been permanently removed
    
-   **Cleanup**: Deleted preseeds are removed from the system
    

## Manual Review Process

All preseeds discovered by Chariot require manual review to ensure they are valid and relevant to your organization before they are used for further asset discovery.

### Why Manual Review Is Important

Manual review ensures:

-   **Ownership verification**: Confirms that discovered patterns are actually related to your organization
    
-   **Noise reduction**: Filters out common patterns that don't lead to relevant assets
    
-   **Quality control**: Prevents false positives from triggering unnecessary scanning
    
-   **Cost management**: Avoids scanning resources on irrelevant discoveries
    

### Reviewing Preseeds

#### Accessing the Preseed Interface

1.  Navigate to the **Seeds** section in Chariot
    
2.  Select the **Preseeds** tab or view
    
3.  You'll see a table of all preseeds requiring review
    

#### Preseed Table Information

The preseed table displays:

-   **Value**: The discovered pattern or value
    
-   **Type**: The category of discovery (e.g., `whois+company`, `tlscert`)
    
-   **Title**: The specific field name (e.g., `company`, `email`)
    
-   **Status**: Current approval status
    
-   **Discovered By**: The capability that discovered the preseed
    
-   **Created Date**: When the preseed was first discovered
    
-   **Last Visited**: When the preseed was last processed
    

#### Reviewing Individual Preseeds

When you select a preseed from the table, Chariot displays detailed information:

**Overview Panel**

-   The preseed value and type
    
-   Display format (text, image, certificate details, etc.)
    
-   Discovery metadata
    
-   Related information based on preseed type
    

**Discovery Context**

-   **Context Map**: A visual timeline showing how the preseed was discovered
    
    -   Shows the seed asset that led to discovery
        
    -   Displays intermediate assets found during scanning
        
    -   Illustrates the path from seed to preseed
        
-   **Related Assets**: Assets that were discovered using this preseed pattern
    

**Details**

-   Full preseed key and identifier
    
-   Capability that created the preseed
    
-   Creation and last visit timestamps
    
-   Any associated metadata
    

### Approval Process

#### Approving Preseeds

1.  **Review the preseed details**: Examine the value, type, and discovery context
    
2.  **Verify relevance**: Confirm the preseed is related to your organization
    
3.  **Check discovery path**: Review the context map to understand how it was found
    
4.  **Approve**: Click the **Approve** button or use bulk approval for multiple preseeds
    

**What happens when you approve:**

-   Status changes from `PENDING` to `ACTIVE`
    
-   Chariot immediately queues discovery tasks for the preseed
    
-   Related capabilities process the preseed to find new assets
    
-   New assets discovered from the preseed appear in your asset inventory
    

#### Rejecting Preseeds

1.  **Review the preseed**: Examine why it might not be relevant
    
2.  **Reject**: Click the **Reject** button or use bulk rejection
    

**What happens when you reject:**

-   Status changes to `FROZEN_REJECTED`
    
-   No discovery tasks are triggered
    
-   The preseed is marked as invalid for future reference
    

#### Bulk Operations

You can approve or reject multiple preseeds at once:

1.  Select multiple preseeds using checkboxes
    
2.  Choose **Approve Selected** or **Reject Selected** from the action menu
    
3.  Confirm the bulk operation
    

### Review Best Practices

-   **Regular reviews**: Check for new preseeds regularly to keep discovery active
    
-   **Verify ownership**: Only approve preseeds that are clearly related to your organization
    
-   **Check context**: Use the discovery context map to understand how preseeds were found
    
-   **Filter noise**: Reject common patterns that don't lead to relevant assets (e.g., generic email providers, common registrars)
    
-   **Monitor results**: Review assets discovered from approved preseeds to validate the approval decision
    

## How Assets Are Created from Preseeds

Once a preseed is approved (status becomes `ACTIVE`), Chariot automatically processes it to discover and create new assets.

### Processing Active Preseeds

When a preseed transitions to `ACTIVE` status:

1.  **Task Registration**: Chariot identifies which capabilities can process the preseed type
    
2.  **Job Creation**: Discovery jobs are created for each applicable capability
    
3.  **Priority Queue**: Jobs are added to the priority queue for immediate processing
    
4.  **Capability Execution**: Capabilities execute their discovery logic using the preseed value
    
5.  **Asset Creation**: New assets are created from the discovery results
    

### Preseed Type to Asset Mapping

Different preseed types trigger different discovery capabilities:

#### WHOIS Preseeds (`whois+company`, `whois+email`, etc.)

-   **Capability**: Reverse WHOIS lookup
    
-   **Process**: Searches for domains registered with the same WHOIS information
    
-   **Result**: New domain assets are created as seeds with `PENDING` status
    
-   **Example**: A `whois+company` preseed for "Example Corporation" triggers reverse WHOIS to find all domains registered to that company
    

#### EDGAR Preseeds (`edgar+company`)

-   **Capabilities**: EDGAR Filing Lookup (`collect-edgar`) and EDGAR Filings Extractor (`edgar`)
    
-   **Process**:
    
    1.  **Collect EDGAR**: Searches SEC EDGAR database for companies matching the preseed value, finds CIKs (Central Index Keys) for matching companies
        
    2.  **EDGAR Extractor**: Processes SEC filings (10-K forms) for discovered CIKs to extract subsidiary company names
        
    3.  **Subsidiary Discovery**: Creates new `edgar+company` preseeds for discovered subsidiaries
        
    4.  **Reverse WHOIS**: EDGAR preseeds can also trigger reverse WHOIS lookups to find domains for the company
        
-   **Result**:
    
    -   CIK preseeds are created for companies found in SEC database
        
    -   New `edgar+company` preseeds are created for subsidiaries discovered in SEC filings
        
    -   Domain assets may be created through reverse WHOIS lookups
        
-   **Example**: An `edgar+company` preseed for "Example Corporation" triggers:
    
    1.  Search of SEC EDGAR database for "Example Corporation"
        
    2.  Discovery of CIK for the company
        
    3.  Analysis of 10-K filings to find subsidiaries like "Example Technologies Inc." and "Example Services LLC"
        
    4.  Creation of new `edgar+company` preseeds for each subsidiary
        
    5.  Potential reverse WHOIS lookups to find domains for the company and subsidiaries
        

#### TLS Certificate Preseeds (`tlscert`)

-   **Capability**: TLS certificate collection and analysis
    
-   **Process**: Extracts domain names from certificate common names and SANs
    
-   **Result**: New domain assets are created
    
-   **Example**: A certificate preseed containing `*.example.com` may lead to discovery of specific subdomains
    

#### CIDR Handle Preseeds (`cidr-handle`)

-   **Capability**: CIDR range collection
    
-   **Process**: Queries Regional Internet Registries (RIRs) for IP ranges associated with the organization handle
    
-   **Result**: CIDR range assets are created
    
-   **Example**: An ARIN handle preseed leads to discovery of IP ranges registered to that organization
    

#### DNS Preseeds (`dns+subdomain`, etc.)

-   **Capability**: DNS enumeration and resolution
    
-   **Process**: Performs DNS lookups and subdomain enumeration
    
-   **Result**: New domain and subdomain assets are created
    

#### CSP Preseeds (`csp`)

-   **Capability**: Reverse CSP lookup
    
-   **Process**: Searches for domains that share the same CSP patterns
    
-   **Result**: Related domain assets are discovered
    

#### Favicon Preseeds (`favicon`)

-   **Capability**: Favicon-based domain discovery
    
-   **Process**: Identifies domains that share the same favicon
    
-   **Result**: Related domain assets are discovered
    

### Asset Creation Workflow

1.  **Discovery Task Execution**: The capability processes the preseed value
    
2.  **Result Collection**: Discovery results are collected (domains, IPs, etc.)
    
3.  **Asset Creation**: New assets are created with:
    
    -   Source: `seed` (indicating they came from a preseed)
        
    -   Status: `PENDING` (requiring approval like other discovered assets)
        
    -   Discovery relationship: Linked back to the originating preseed
        
4.  **Relationship Tracking**: A `DISCOVERED` relationship is created between the preseed and new assets
    
5.  **Notification**: You are notified of newly discovered assets
    

### Example: Complete Preseed to Asset Flow

**Step 1: Initial Discovery**

-   You have a seed domain: `example.com`
    
-   Chariot performs a WHOIS lookup
    
-   Discovers registrant organization: "Example Corporation"
    

**Step 2: Preseed Creation**

Chariot creates two preseeds:

-   Type: `whois+company`
    
-   Value: "Example Corporation"
    
-   Status: `PENDING`
    

And:

-   Type: `edgar+company`
    
-   Value: "Example Corporation"
    
-   Status: `PENDING`
    

**Step 3: Manual Review**

-   You review both preseeds in the Chariot interface
    
-   You verify "Example Corporation" is your organization
    
-   You approve both the `whois+company` and `edgar+company` preseeds
    

**Step 4: Preseed Activation**

-   Status changes to `ACTIVE` for both preseeds
    
-   Chariot queues multiple discovery jobs:
    
    -   Reverse WHOIS job for the `whois+company` preseed
        
    -   EDGAR Filing Lookup job for the `edgar+company` preseed
        

**Step 5: Asset Discovery**

-   **Reverse WHOIS capability** executes:
    
    -   Searches for all domains registered to "Example Corporation"
        
    -   Discovers: `example2.com`, `example3.com`, `api.example.com`
        
-   **EDGAR Filing Lookup capability** executes:
    
    -   Searches SEC EDGAR database for "Example Corporation"
        
    -   Finds CIK (Central Index Key) for the company
        
    -   Analyzes 10-K filings to discover subsidiaries: "Example Technologies Inc.", "Example Services LLC"
        
    -   Creates new `edgar+company` preseeds for each subsidiary
        

**Step 6: Asset Creation**

-   **From Reverse WHOIS**: New domain assets are created:
    
    -   `example2.com` (status: PENDING)
        
    -   `example3.com` (status: PENDING)
        
    -   `api.example.com` (status: PENDING)
        
    -   Each asset is linked to the original `whois+company` preseed via `DISCOVERED` relationship
        
-   **From EDGAR Lookup**: New preseeds are created:
    
    -   `edgar+company` preseed for "Example Technologies Inc." (status: PENDING)
        
    -   `edgar+company` preseed for "Example Services LLC" (status: PENDING)
        
    -   CIK preseeds are created for the main company and subsidiaries
        
    -   These new preseeds can trigger additional reverse WHOIS lookups
        

**Step 7: Asset Approval**

-   You review the newly discovered domains
    
-   Approve domains that belong to your organization
    
-   Review and approve the subsidiary preseeds discovered through EDGAR
    
-   Approved domains become active seeds for further discovery
    
-   Approved subsidiary preseeds trigger additional discovery workflows
    

## Preseed Management

### Filtering and Search

You can filter preseeds by:

-   **Status**: Pending, Active, Frozen, Rejected, Deleted
    
-   **Type**: Filter by preseed category (whois, tls, dns, etc.)
    
-   **Title**: Filter by specific field names
    
-   **Value**: Search for specific values
    
-   **Discovered By**: Filter by the capability that discovered the preseed
    

### Preseed Lifecycle Management

#### Freezing Preseeds

-   Temporarily disable a preseed without rejecting it
    
-   Useful when you need to pause discovery from a specific pattern
    
-   Can be reactivated later by changing status back to ACTIVE
    

#### Deleting Preseeds

-   Permanently remove preseeds that are no longer relevant
    
-   Use when you want to clean up old or invalid discoveries
    
-   Deleted preseeds cannot be recovered
    

#### Status Transitions

-   **PENDING → ACTIVE**: Approval enables discovery
    
-   **PENDING → FROZEN\_REJECTED**: Rejection marks as invalid
    
-   **ACTIVE → FROZEN**: Temporarily pause discovery
    
-   **FROZEN → ACTIVE**: Resume discovery
    
-   **Any → DELETED**: Remove from system
    

## Best Practices

### Preseed Review

-   **Review regularly**: Check for new preseeds at least weekly to keep discovery active
    
-   **Verify before approving**: Always verify preseeds are related to your organization
    
-   **Use context maps**: Review the discovery path to understand how preseeds were found
    
-   **Reject noise**: Filter out common patterns that don't lead to relevant assets
    
-   **Scope validation:** Ensure that preseeds are within the agreed-upon scope
    

### Approval Strategy

-   **Start conservative**: Initially reject uncertain preseeds; you can always approve similar ones later
    
-   **Monitor results**: Review assets discovered from approved preseeds to validate decisions
    
-   **Bulk operations**: Use bulk approval for clearly valid preseeds to save time
    
-   **Document decisions**: Use notes to record why preseeds were approved or rejected
    

### Discovery Optimization

-   **Quality over quantity**: Approve fewer, high-quality preseeds rather than many low-quality ones
    
-   **Monitor costs**: Be aware that each approved preseed triggers discovery tasks
    
-   **Review discovered assets**: Regularly review assets created from preseeds to ensure quality
    

## Troubleshooting

### Preseeds Not Being Discovered

-   **Check seed status**: Ensure your seeds are approved and active
    
-   **Verify capabilities**: Confirm that discovery capabilities are running
    
-   **Review scan schedules**: Check that asset scans are scheduled and executing
    

### Preseeds Not Creating Assets

-   **Verify approval**: Ensure preseeds are in ACTIVE status, not PENDING
    
-   **Check capability availability**: Verify that the required capabilities are enabled
    
-   **Review job queue**: Check if discovery jobs are queued and processing
    
-   **Examine errors**: Look for error messages in capability execution logs
    

### Too Many Preseeds

-   **Use filters**: Filter preseeds by type to focus on relevant categories
    
-   **Bulk reject**: Use bulk operations to reject clearly invalid preseeds
    
-   **Review discovery sources**: Consider adjusting discovery settings if certain sources produce too much noise
