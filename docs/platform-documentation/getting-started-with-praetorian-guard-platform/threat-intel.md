---
title: "Threat Intelligence"
description: "Threat Intelligence"
featurebaseId: "34117068401179"
---

## Overview

PGP's Threat Intelligence feature provides real-time insights into vulnerabilities and threats affecting your organization's attack surface. This capability aggregates data from multiple authoritative sources to deliver actionable intelligence about emerging threats, vulnerabilities, and exploit activities.

## Main Features

### Vulnerability Search and Discovery

*   Search for specific CVEs using the search bar
    
*   View comprehensive vulnerability details including:
    
    *   Vulnerability name and description
        
    *   Published and modified dates
        
    *   CVE identifiers
        
    *   Associated threat actors and activities
        

### Intelligence Categories

The threat intelligence interface is organized into three main sections:

### 1\. Overview Tab

*   **Vulnerability Description**: Detailed explanation of the vulnerability
    
*   **EPSS (Exploit Prediction Scoring System)**:
    
    *   Score: Indicates likelihood of exploitation (0-1)
        
    *   Percentile: Shows relative risk compared to other vulnerabilities
        
    *   Visual indicators for risk levels from low to critical
        
*   **CVSS (Common Vulnerability Scoring System)**:
    
    *   Multiple version support (2.0, 3.0, 3.1, 4.0)
        
    *   Base, temporal, and threat metrics
        
    *   Detailed breakdown of scoring components
        
    *   Visual representation of severity levels
        

### 2\. Exploitation Activities Tab

*   **Exploit Timeline**:
    
    *   Chronological view of key events
        
    *   Important dates including:
        
        *   First exploit publication
            
        *   Addition to KEV (Known Exploited Vulnerabilities)
            
        *   First ransomware appearance
            
        *   Most recent exploit activity
            
    *   Visual timeline with event markers
        
*   **Exploitation Statistics**:
    
    *   Number of known exploits
        
    *   Count of associated threat actors
        
    *   Botnet activity metrics
        
    *   Ransomware family tracking
        

### 3\. MITRE Tab

*   **ATT&CK Framework Integration**:
    
    *   Associated MITRE ATT&CK techniques
        
    *   Technique IDs and descriptions
        
    *   Links to detailed MITRE documentation
        
*   **CWE (Common Weakness Enumeration)**:
    
    *   Associated weakness categories
        
    *   Detailed weakness descriptions
        
    *   Source attribution and references
        

## Understanding Risk Metrics

### EPSS Score Interpretation

*   Scores range from 0 to 1
    

*   Higher scores indicate greater likelihood of exploitation
    
*   Percentile ranking shows relative risk compared to other vulnerabilities
    

*   Color-coded indicators:
    
    *   Critical (≥ 0.9): Red
        
    *   High (≥ 0.7): Orange
        
    *   Medium (≥ 0.4): Yellow
        
    *   Low (< 0.4): Blue
        

### CVSS Score Interpretation

*   Scores range from 0 to 10
    
*   Multiple scoring aspects:
    
    *   Base Score: Inherent vulnerability characteristics
        

*   Temporal Score: Current exploit status and fixes
    

*   Detailed vector strings showing:
    
    *   Attack complexity
        
    *   Required privileges
        
    *   User interaction needs
        
    *   Impact measurements
        

## Integration with Other PGP Features

*   Direct links to affected assets
    
*   Automated risk scoring based on threat intelligence
    
*   Integration with vulnerability management workflows
    
*   Continuous monitoring and alerts for new threats
    

## Getting Help

For assistance with PGP's threat intelligence features, contact support at [support@praetorian.com](mailto:support@praetorian.com).
