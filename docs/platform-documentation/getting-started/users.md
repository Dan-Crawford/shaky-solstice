---
title: "Users"
description: "Users"
featurebaseId: "4011216"
---

The Users page serves as a central hub for managing user access and collaboration within your account. This page is a comprehensive representation of all users who have access to your account, and all of the accounts to which you have access.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580daba21178a432dc1ab6/019b7ff5-645a-73cb-bf89-1b6c88cd271d/b64u-MDE5YjdmZjUtNjJlNy03NmViLWEwYzEtMTkzNTU1ZDE4ODBm.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=e9acfb26987082807d0422b5e551edc113de8c3eaf409eff5a9a1afffb4bab9d)

## Authorized Users

In the top table, you'll find your own account listed with your email address or username. As the primary account holder, your role is designated as "Account" and cannot be modified. This ensures you always maintain control over your account.

Below your account information, you'll see any collaborators you've added to your account. For each collaborator, the table shows their display name or email address, their role (marked as "Collaborator"), and the date they were added to your account. You have the ability to revoke access for any collaborator by clicking the revoke button in the rightmost column of their row.

To add new users to your account, you'll find an "Add User" button at the top right of the table. Clicking this button opens a pop-up where you can enter the details of the person you'd like to invite to collaborate on your account. This feature allows you to easily expand your team and manage access to your account's resources.

If you haven't added any collaborators yet, the table will indicate that no authorized users were found, displaying only your account information. This clean interface makes it simple to track who has access to your account and manage permissions as your collaboration needs change.

## Collaborating With

The Collaborating With section appears when other organizations have shared their security data with you through collaboration. This section will only be visible if you've been invited as a collaborator by at least one organization and you're using a direct (non-SSO) login.

When visible, the table provides a comprehensive overview of open risks across all organizations you're collaborating with. For each organization, you can see their name and a detailed breakdown of their security risks by severity level: Info, Low, Medium, High, and Critical. A total count of all open risks is also displayed. You can click on any organization's name to switch to viewing their account details.

If you need to export risk data for reporting or analysis, each organization has an export option (indicated by a download icon). Clicking this opens an export menu with two options: you can either download the risk data directly through the interface, or for more advanced needs, use the recommended command-line tool (praetorian-cli).

To gain access to an organization's data, they must add your exact email address as a collaborator from their account settings. Email addresses are case-sensitive, so make sure the organization uses your precise email address when adding you as a collaborator. The section focuses specifically on open risks to help you track current security concerns.

If you don't see this section in your account settings, it means you haven't been added as a collaborator to any organizations yet.

For more information on how to manage collaborators, see the [Managing Users](https://docs.praetorian.com/hc/en-us/articles/31468186209179-Managing-Users) documentation.

If you're having trouble with collaboration access or have any questions, please reach out to our support team at [support@praetorian.com](mailto:support@praetorian.com).
