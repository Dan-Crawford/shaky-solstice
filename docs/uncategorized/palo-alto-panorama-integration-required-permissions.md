---
title: "Palo Alto Panorama Integration - Required Permissions"
featurebaseId: "3818010"
draft: "true"
---

## Required Permissions

Chariot requires **read-only** access to the Panorama Objects API. The integration uses the following API endpoints:

API EndpointMethodPurpose

`/restapi/v11.1/Objects/Addresses`

GET

Enumerate address objects (IPs, FQDNs, ranges)

`/restapi/v11.1/Objects/AddressGroups`

GET

Enumerate address groups (static and dynamic)

**No write, modify, or delete operations are performed.** Chariot only reads existing address configurations.

## Setup Steps

### 1\. Enable API Access

Ensure REST API access is enabled on your Panorama appliance. See: [PAN-OS API Authentication](https://docs.paloaltonetworks.com/ngfw/api/api-authentication-and-security/pan-os-api-authentication)

### 2\. Create a Least-Privilege Admin Role

1.  In the Panorama web UI, navigate to **Panorama** > **Admin Roles**
    
2.  Click **Add** to create a new admin role profile
    
3.  Configure the role:
    

-   **Name**: `chariot-readonly` (or a name of your choosing)
    
-   **Role**: Custom
    
-   **Web UI Access**: Disable all
    
-   **REST API Access**: Enable **only** the following:
    
    -   `Objects > Addresses` — **Read** (enabled) / Write (disabled)
        
    -   `Objects > Address Groups` — **Read** (enabled) / Write (disabled)
        
-   All other API sections: **Disabled**
    

See: [Configure an Admin Role Profile](https://docs.paloaltonetworks.com/ngfw/administration/firewall-administration/manage-firewall-administrators/configure-an-admin-role-profile)

### 3\. Create a Dedicated Admin User

1.  Navigate to **Panorama** > **Administrators**
    
2.  Click **Add** to create a new administrator
    
3.  Configure the user:
    

-   **Name**: `chariot-integration` (or a name of your choosing)
    
-   **Administrator Type**: Custom
    
-   **Admin Role Profile**: Select the `chariot-readonly` role from Step 2
    
-   **Virtual System**: `vsysreader` (read-only access)
    

### 4\. Generate an API Key

Request an API key for the dedicated Chariot admin user:

```
https://<panorama-host>/api/?type=keygen&user=chariot-integration&password=<password>
```

Copy the API key from the response. See: [Get Your API Key](https://docs.paloaltonetworks.com/pan-os/11-0/pan-os-panorama-api/get-started-with-the-pan-os-xml-api/get-your-api-key)

## Security Summary

AspectDetail

**Access Level**

Read-only

**Scope**

Objects API only (Addresses + Address Groups)

**Admin Role**

Custom role with `vsysreader` privilege

**Authentication**

API key (no interactive login)

**Network**

HTTPS only (TLS encrypted)

**Data Flow**

One-way: Panorama to Chariot
