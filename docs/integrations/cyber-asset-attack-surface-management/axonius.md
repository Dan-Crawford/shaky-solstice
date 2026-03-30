---
title: "Axonius"
description: "Axonius"
featurebaseId: "34151298786459"
---

## Overview

The Axonius integration with PGP provides continuous asset discovery and monitoring capabilities. By connecting PGP to your Axonius instance, you can automatically discover and track assets across your environment, enrich asset metadata, and maintain an up-to-date inventory.

## Prerequisites

*   An active Axonius instance
    
*   Administrator access to Axonius
    
*   A PGP account with integration privileges
    

## Setup Process

### Step 1: Create an Axonius Service Account

1.  Log in to your Axonius dashboard at your instance URL (e.g., [https://your-instance.axonius.com/dashboard](https://your-instance.axonius.com/dashboard))
    
2.  Click the Settings icon in the navigation menu
    
3.  Select "User and Role Management"
    
4.  Navigate to the "Service Accounts" tab
    
5.  Click "Add Service Account"
    
6.  Fill in the service account details:
    
    *   Name: Choose a descriptive name (e.g., "PGP Integration")
        
    *   Description: Add a helpful description (e.g., "PGP Asset Discovery Integration")
        
7.  Configure the necessary permissions:
    
    *   Select appropriate roles (at minimum, read access to device data is required)
8.  Click "Save" to create the service account
    
9.  After saving, the API credentials will automatically be displayed:
    
    *   API Key
        
    *   API Secret
        

Store the API secret securely as it cannot be recovered if lost

### Step 2: Configure PGP Integration

1.  Log in to your PGP account
    
2.  Navigate to **Settings > Integrations**
    
3.  Click "Add Integration"
    
4.  Select "Axonius" from the list of available integrations
    
5.  Enter the following details:
    
    *   Axonius Instance URL
        
    *   API Key
        
    *   API Secret
        
6.  Click "Connect" to complete the integration setup
    

## Features and Capabilities

### Asset Discovery

*   Automatically discovers all devices tracked in Axonius
    
*   Maps Axonius device attributes to PGP's asset model
    
*   Filters out private network devices by default
    
*   Updates asset status based on last-seen timestamps
    

### Asset Information

The integration collects the following information for each asset:

*   Hostname
    
*   IP addresses (public)
    
*   FQDN (Fully Qualified Domain Name)
    
*   Domain information
    
*   Last seen timestamp
    
*   Operating system details
    
*   Device tracking method
    

### Continuous Monitoring

*   Regular synchronization of asset data
    
*   Automatic discovery of new assets
    
*   Updates to existing asset information
    
*   Asset status tracking and updates
    

### Asset Metadata

*   Enriches assets with Axonius-specific identifiers
    
*   Maintains relationship between PGP and Axonius assets
    
*   Preserves asset history and tracking information
    

## Support

For additional assistance:

*   Contact PGP Support at [support@praetorian.com](mailto:support@praetorian.com)
    
*   Review Axonius API documentation
    
*   Check PGP's knowledge base for integration articles
