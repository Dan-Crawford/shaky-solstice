---
title: "Microsoft Defender Integration"
description: "Microsoft Defender Integration"
featurebaseId: "40039125090331"
---

## **Overview**

Integrating with Microsoft Defender for Endpoint provides comprehensive endpoint detection and response (EDR) capabilities within your security operations. This integration enables PGP to automatically discover managed endpoints and identify vulnerabilities across your Microsoft Defender-protected infrastructure, providing enhanced visibility into your attack surface and security posture.

Microsoft Defender for Endpoint is a comprehensive endpoint security platform that combines behavioral sensors, cloud security analytics, and threat intelligence to help prevent, detect, investigate, and respond to advanced threats. By integrating with PGP, security teams can:

-   **Centralize Asset Visibility**: Automatically discover and inventory endpoints managed by Microsoft Defender
-   **Streamline Vulnerability Management**: Import vulnerability data directly from Microsoft Defender's security assessments
-   **Enhance Threat Detection**: Leverage Microsoft's threat intelligence and behavioral analytics within PGP's unified platform
-   **Accelerate Response**: Access detailed endpoint information and vulnerability context for faster incident response

## **Setup Process Overview**

You will be registering an application in Azure Active Directory to enable API access to Microsoft Defender for Endpoint. During this process you will obtain the:

-   Application (Client) ID
-   Directory (Tenant) ID
-   Client Secret

You'll then configure the appropriate API permissions and add the credentials to PGP to complete the integration.

## **Step 1: Register Application in Azure**

1.  In your Azure Portal, navigate to the **App registrations** section. On your Azure portal home page, you may see an icon under Azure Services, or you can search "App registrations" and navigate to the appropriate page.
2.  On the Azure **App registrations** page, click **New Registration**.
3.  In the **Register an application** section, provide a name for the integration (e.g., "PGP Microsoft Defender Integration"). Leave all other settings as default. Click **Register**.
4.  Once registered in Azure, you will be able to see the **Application (client) ID** and **Directory (tenant) ID**. Copy these values--they will be needed in PGP during the final steps of the integration process.

## **Step 2: Generate Client Secret**

1.  Still in Azure, navigate to **Certificates & secrets** in the left sidebar.
2.  Click **\+ New client secret**.
3.  Provide a description for the secret (e.g., "PGP Integration Secret") and select an appropriate expiration period.
4.  Click **Add** and immediately copy the generated **Value**. This secret value will be needed in PGP later.

**NOTE**: Ensure you copy the **Value** rather than the **Secret ID**\--you will **not** need the Secret ID.

## **Step 3: Set API Permissions**

1.  In your Azure App Registration, navigate to **API permissions** in the left sidebar.
2.  Click **\+ Add a permission**.
3.  Select **APIs my organization uses** and search for "WindowsDefenderATP" or "Microsoft Defender for Endpoint".
4.  Select **Application permissions** (not Delegated permissions).
5.  Add the following permissions:

-   **Machine.Read.All**: Required to discover and enumerate endpoints
-   **Vulnerability.Read.All**: Required to access vulnerability assessment data

1.  Click **Add permissions**.
2.  **Important**: Click **Grant admin consent** for your organization to activate these permissions. This step requires Azure administrator privileges.

## **Step 4: Complete Integration in PGP**

1.  Navigate to the **Integrations** page in PGP. On the right side of the page, click the **Add Integrations** button.
2.  In the integrations menu, you can use the search bar to find "Microsoft Defender", or select the **Managed Detection and Response (MDR)** category to locate Microsoft Defender.
3.  Click **Connect**.
4.  In the Microsoft Defender setup form, enter the following information:

-   **Client ID**: The Application (client) ID from Step 1
-   **Client Secret**: The secret value from Step 2
-   **Tenant ID**: The Directory (tenant) ID from Step 1
-   **Import Internal Assets**: Check this box to enable endpoint discovery (recommended)
-   **Import Vulnerabilities**: Check this box to enable vulnerability data import (recommended)

1.  Click **Finish** to complete the integration.

PGP will now regularly discover endpoints and import vulnerability data from your Microsoft Defender for Endpoint environment.

## **How It Works**

### **Asset Discovery**

PGP connects to the Microsoft Defender for Endpoint API and discovers managed endpoints through the /api/machines endpoint. The integration:

-   Enumerates all machines managed by Microsoft Defender
-   Filters out mobile and IoT devices (iOS, Android, Fire OS, etc.) to focus on traditional endpoints
-   Creates asset records for endpoints with valid DNS names and IP addresses
-   Updates asset status and metadata based on Microsoft Defender's endpoint information

### **Vulnerability Management**

The integration processes vulnerability data from Microsoft Defender's security assessments:

-   Retrieves vulnerability information from the /api/vulnerabilities endpoint
-   Focuses on network-accessible vulnerabilities
-   Maps vulnerabilities to affected endpoints
-   Imports detailed vulnerability descriptions, impact assessments, and remediation guidance
-   Maintains severity classifications (Critical, High, Medium, Low) consistent with Microsoft Defender's assessments

### **Data Processing**

-   **Frequency**: PGP processes Microsoft Defender data during scheduled integration runs
-   **Scope**: Only processes endpoints and vulnerabilities that meet security relevance criteria
-   **Performance**: Uses streaming and pagination to handle large environments efficiently
-   **Authentication**: Maintains secure API access using Azure AD application credentials

## **Troubleshooting**

### **Authentication Issues**

**Problem**: "Failed to get access token" error

-   **Solution**: Verify that the Client ID, Client Secret, and Tenant ID are correct
-   **Check**: Ensure the client secret has not expired
-   **Verify**: Confirm the Azure application is properly registered

### **Permission Issues**

**Problem**: "Access denied" or "Insufficient privileges" errors

-   **Solution**: Verify that the required API permissions (Machine.Read.All, Vulnerability.Read.All) are granted
-   **Check**: Ensure admin consent has been granted for the permissions
-   **Verify**: Confirm the application has the correct permission type (Application permissions, not Delegated)

### **No Data Imported**

**Problem**: Integration connects successfully but no assets or vulnerabilities appear

-   **Solution**: Check that "Import Assets" and "Import Vulnerabilities" options are enabled
-   **Verify**: Ensure your Microsoft Defender environment has managed endpoints with vulnerability data
-   **Check**: Review that endpoints meet the filtering criteria (valid DNS names, supported OS platforms)
-   **Confirm:** Your PGP account subscription must include internal assessments for internal assets to be imported

### **API Access Issues**

**Problem**: Connection timeouts or API errors

-   **Solution**: Verify network connectivity to https://api.securitycenter.microsoft.com
-   **Check**: Ensure your organization's firewall allows outbound HTTPS connections to Microsoft Defender APIs
-   **Verify**: Confirm your Microsoft Defender for Endpoint subscription includes API access

## **Requirements**

-   **Microsoft Defender for Endpoint**: Active subscription with API access enabled
-   **Azure Active Directory**: Permissions to register applications and grant admin consent
-   **Network Access**: Outbound HTTPS connectivity to Microsoft Defender APIs

## **Support**

We hope this documentation has been helpful. If you find a topic that you would like discussed in detail, or need further assistance, please let us know at [support@praetorian.com](support@praetorian.com)!
