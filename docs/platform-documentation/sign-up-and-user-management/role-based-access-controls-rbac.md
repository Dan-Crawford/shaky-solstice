---
title: "Role-Based Access Controls (RBAC)"
description: "Role-Based Access Controls (RBAC)"
featurebaseId: "4537395"
---

The Praetorian Guard Platform uses Role-Based Access Controls (RBAC) to manage what users can see and do within the platform. This article explains the available roles, their permissions, and how to configure role assignments for both direct users and SSO users.

---

## Roles Overview

Guard has three built-in roles, arranged from most to least permissive:

|  |  |
| --- | --- |
| Role | Description |
| **Admin** | Full platform access. Can manage users, settings, integrations, and all data. |
| **Analyst** | Can create and modify assets, seeds, risks, run scans, upload files, and use AI features. Cannot manage users, settings, or integrations. |
| **Read Only** | View-only access to all data. Cannot create, modify, or delete anything. |

---

## Permissions by Role

|  |  |  |  |
| --- | --- | --- | --- |
| Permission | Read Only | Analyst | Admin |
| View assets, risks, seeds, and jobs | Yes | Yes | Yes |
| Export data and download files | Yes | Yes | Yes |
| Create/edit assets, seeds, and risks | -- | Yes | Yes |
| Run scans and schedule capabilities | -- | Yes | Yes |
| Upload and manage files | -- | Yes | Yes |
| Use AI conversation features | -- | Yes | Yes |
| Add or remove users | -- | -- | Yes |
| Change user roles | -- | -- | Yes |
| Manage account settings | -- | -- | Yes |
| Configure integrations (Jira, Azure DevOps, etc.) | -- | -- | Yes |
| Set up SSO and onboarding | -- | -- | Yes |

---

## How Roles Work

* **Home account**: Every user is automatically an **Admin** on their own account.
* **Collaborating accounts**: When a user is invited to collaborate on another account, they are assigned a specific role (Admin, Analyst, or Read Only) by that account's admin.
* **Role ceiling**: API keys and SSO configurations can set a maximum role level. Even if a user would normally have Admin access, a role ceiling limits them to the configured maximum.

---

## Managing User Roles in Guard

To view and change user roles:

1. Log in to Guard at [**https://guard.praetorian.com**](https://guard.praetorian.com)
2. Navigate to **Settings** (gear icon in the left sidebar)
3. Select the **User Management** tab
4. You will see two sections:

* **Authorized Users** — Users who have access to your account, with their assigned roles
* **Collaborating With** — Other accounts you have access to

### To invite a new user

1. Click the **Add User** button
2. Enter the user's email address
3. Select a role from the dropdown: **Admin**, **Analyst**, or **Read Only**
4. Click **Invite**

### To change an existing user's role

1. Find the user in the **Authorized Users** table
2. Click the role dropdown next to their name
3. Select the new role
4. The change takes effect immediately

### To remove a user

1. Find the user in the **Authorized Users** table
2. Click the **Remove** button next to their name

> **Note:** Only users with the **Admin** role can add, remove, or change roles for other users. If you don't see these options, contact your account administrator.

---

## SSO Role Configuration

For organizations using Single Sign-On (SSO), user roles can be managed through your identity provider. Guard supports role mapping from both Azure AD (Entra ID) and Okta via OIDC.

When SSO is configured with RBAC enabled, you configure two things in Guard:

1. **Default Role** — The role assigned to SSO users when no role claim is present (e.g., Read Only)
2. **Role Claim Name** — The name of the claim in your SSO token that contains the user's Guard role (e.g., app\_role)

The role claim value must be one of: **admin**, **analyst**, or **readonly**. The role from the SSO token acts as the user's **role ceiling** — they cannot exceed the role granted by their identity provider.

### To configure SSO with RBAC in Guard

1. Go to **Settings** > **Organization** > **SSO Providers**
2. Click **Add SSO Provider**
3. Fill in your provider details (Domain, Client ID, Client Secret, Issuer URL)
4. Set the **Default Role for SSO Users** (this applies when no role claim is present)
5. Optionally enter the **Role Claim Name** — the token claim that contains the Guard role
6. Click **Save**

---

## Azure AD (Entra ID) Setup

To send Guard roles from Azure AD, you need to add a custom claim to the tokens issued by your Azure AD application. This claim will map to the **Role Claim Name** you configured in Guard.

### Step 1: Define the Role Attribute

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com)
2. Navigate to **Entra ID** > **App registrations**
3. Select the application you registered for Guard SSO

You can use an existing user attribute (such as a directory extension) or create a custom attribute to hold the Guard role value. The attribute value must be one of: **admin**, **analyst**, or **readonly**.

### Step 2: Add the Attribute as a Token Claim

1. In your app registration's **Overview** page, under **Managed application in local directory**, click the link to your enterprise application
2. Under **Manage**, select **Single Sign-on**
3. In the **Attributes & Claims** section, click the **Edit** icon
4. Click **Add new claim**
5. Enter the **Name** — this must match the **Role Claim Name** you configured in Guard (e.g., app\_role)
6. Set **Source** to **Attribute** (for built-in attributes) or **Directory schema extension** (for custom attributes)
7. Select the attribute that contains the Guard role value
8. Click **Save**

### Step 3: Update the Application Manifest

1. Return to **App registrations** and select your application
2. Under **Manage**, select **Manifest**
3. Set **acceptMappedClaims** to **true**
4. Click **Save**

### Step 4: Assign Role Values to Users

Assign the appropriate Guard role value (**admin**, **analyst**, or **readonly**) to each user's attribute in Azure AD. You can do this through:

* **Azure AD user profiles** — Set the attribute value directly on each user
* **Azure AD groups + dynamic attributes** — Use group membership to dynamically assign role values
* **Automation** — Use Microsoft Graph API or PowerShell to set values in bulk

---

## Okta Setup

To send Guard roles from Okta, you need to add a custom claim to the tokens issued by your Okta authorization server. This claim will map to the **Role Claim Name** you configured in Guard.

### Option A: Using a Custom Claim with User Profile Attribute

1. In the Okta Admin Console, go to **Security** > **API**
2. Select the **Authorization Servers** tab
3. Choose your authorization server (e.g., default)
4. Go to the **Claims** tab and click **Add Claim**
5. Configure the claim:

* **Name**: Must match the **Role Claim Name** you configured in Guard (e.g., app\_role)
* **Include in token type**: Select **ID Token**
* **Value type**: Select **Expression**
* **Value**: Enter an Okta Expression Language expression that resolves to the user's Guard role, such as user.guardRole (a custom profile attribute you define)
* **Include in**: Leave as **Any scope** or specify openid

1. Click **Create**

Then set the custom profile attribute value (**admin**, **analyst**, or **readonly**) on each user in Okta.

### Option B: Using Group Membership to Determine Roles

If you prefer to manage roles via Okta groups:

1. Create groups in Okta for each Guard role (e.g., guard-admin, guard-analyst, guard-readonly)
2. Assign users to the appropriate group
3. In the Okta Admin Console, go to **Security** > **API** > **Authorization Servers**
4. Select your authorization server and go to the **Claims** tab
5. Click **Add Claim**:

* **Name**: Must match the **Role Claim Name** in Guard (e.g., app\_role)
* **Include in token type**: Select **ID Token**
* **Value type**: Select **Expression**
* **Value**: Use an expression that maps group membership to a role string, for example: isMemberOfGroupName(guard-admin) ? admin : (isMemberOfGroupName(guard-analyst) ? analyst : readonly)
* **Include in**: **Any scope**

1. Click **Create**

### Verification

After configuring either option, test the setup by:

1. Logging in to Guard via SSO
2. Confirming the assigned role matches the expected value from your identity provider

---

## Frequently Asked Questions

**Q: What role does a new user get by default?**  
A: When invited directly, the admin selects the role. For SSO users, the **Default Role** configured on the SSO provider is used when no role claim is present.

**Q: Can I create custom roles?**  
A: Not at this time. Guard uses three predefined roles (Admin, Analyst, Read Only). Custom roles may be supported in the future.

**Q: Why can't I change settings or add integrations?**  
A: These actions require the **Admin** role. Contact your account administrator to request an upgrade.

**Q: I'm an SSO user — how do I change my role?**  
A: SSO user roles are managed through your identity provider (Azure AD or Okta). Contact your IT administrator to change your role assignment.

**Q: Can I have different roles on different accounts?**  
A: Yes. You are always an Admin on your home account, but you may have different roles on accounts you collaborate with.

**Q: What happens if the role claim value doesn't match admin, analyst, or readonly?**  
A: The user will be assigned the **Default Role** configured on the SSO provider.
