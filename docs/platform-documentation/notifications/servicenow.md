---
title: "ServiceNow"
description: "ServiceNow"
featurebaseId: "28130580809499"
---

Utilize PGP's continuous monitoring capabilities to identify and address potential security vulnerabilities and feed that critical data into ServiceNow's incident and problem management workflows.

## Overview

This guide will walk you through integrating PGP with ServiceNow, which involves:

1. Setting up a REST API endpoint in ServiceNow
2. Creating a dedicated service account in ServiceNow
3. Base64 encoding the service account credentials
4. Obtaining the full Scripted REST API URL
5. Configuring the integration in PGP

## Setting up a REST API endpoint in ServiceNow

In order to integrate PGP with ServiceNow, you must set up ServiceNow to receive a `POST` request from the PGP Webhook. To process the content in the Webhook `POST` request, we recommend you set up a processor using ServiceNow's **Scripted REST API** feature. In ServiceNow Xanadu, it is accessed via **All > System Web Services > Scripts Web Services > Scripted REST APIs**.

Learn more about [ServiceNow Scripted REST API here](https://developer.servicenow.com/dev.do#!/learn/courses/washingtondc/app_store_learnv2_rest_washingtondc_rest_integrations/app_store_learnv2_rest_washingtondc_scripted_rest_apis/app_store_learnv2_rest_washingtondc_scripted_rest_api_objectives).

In the **Scripted REST APIs** page, click **New** to create a new API endpoint:

![Screenshot 2024-10-21 at 3.27.29 PM.png](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-4ab3-7129-9747-59b6ac3f7783/b64u-MDE5YjgwMDUtNDlhNy03NmQyLTk0OWUtYzM2NjQzOTE4OTg2.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=08f0595d41ec1610e3f49ce87232fb18a7eb90685816ba3e5aa8a62d67167307)

Enter "Praetorian PGP Webhook" in the **Name** field; and enter "praetorian\_PGP\_webhook" in the **API ID** field. Click **Submit** afterwards:

![Screenshot 2024-10-21 at 7.36.47 PM.png](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-4a68-79fe-946a-830e9e6bf406/b64u-MDE5YjgwMDUtNDkzYi03MmRjLWI4MTUtODUzNDRiY2EzZDgw.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=7220b973da8c5e488c8c1672ed8f4608e91e3742d5a435455bb665c1b7f3c37c)

After submitting, a **base API path** will be generated for you. This base path, together with the hostname of your ServiceNow instance, is the **Scripted REST API URL** when configuring the ServiceNow integration in PGP:

![Screenshot 2024-10-21 at 7.38.55 PM.png](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-49ba-7c31-9bab-f07e0a7de401/b64u-MDE5YjgwMDUtNDhmMi03ZDk3LWFhOGMtMzExYTkzMzU1NjBm.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=4faf45aec19789126066fbf4fddd1248e94b1cbe38af0f78d186bdedbe4351a9)

Further, create a **resource:**

![Screenshot 2024-10-21 at 7.32.25 PM.png](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-4dee-754e-877a-8f405c61c43c/b64u-MDE5YjgwMDUtNGQ1Ny03MTFhLWIxMmMtNDJhM2Y4MzUzNjM2.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=26469ef5d49baf21fb1a3ff6d9cc89aa71947b87dda7d30d5e4b1092355f225d)

Enter "Notification" in the **Name** field. And "/notification" in the **Relative path** field. Choose `POST` for **HTTP method**.

![Screenshot 2024-10-21 at 8.35.54 PM.png](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-51dc-7279-93c6-ecb0ad5b6272/b64u-MDE5YjgwMDUtNGZhOS03NzliLWIzMjAtNTlhODNlZmIwYjhk.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=89fb3ece5971656ba21bfec5dd2971edb4ecaf98a7e938081a10dacc682d3848)

Make sure to enable **Requires authentication.** PGP uses the HTTP Basic Authentication method to authenticate to ServiceNow:

![Screenshot 2024-10-21 at 8.38.40 PM.png](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-51df-717e-9b6a-87958ce79273/b64u-MDE5YjgwMDUtNTAwOC03MTA2LThlNDYtNWMzYjFjNGNiNDNk.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=8df034b4297d5191fdf143098c252c40cc4964c4125be7a79ebb5b03a132b457)

At this point, you have everything you need to configure the ServiceNow integration in PGP.

## Setting up the Service Account

Log in to ServiceNow with administrator privileges.

For quick navigation, within ServiceNow, at the top right, go to **All**, type **Users** and then navigate to **User Administration → Users**.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-5463-7323-a909-7207ff836a4e/b64u-MDE5YjgwMDUtNTQzZS03MTgyLWIxMzgtMWU5NjBkOWE0ZThi.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=8e6456957efa4c72cde1de50d033d77a95ece20b2830c2a0efab24136a8a4859)

At the top right, click **New**.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-54b1-7d66-ae25-6b245c90098e/b64u-MDE5YjgwMDUtNTQ5YS03MGQyLWFlMjUtZGMxY2ZjYWY1NDE0.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=f0a63b96ffcb96921c8748ab71925c03def471245240f9337e2f6cbc25bb8c69)

After configuring the service account to your needs, click submit. To set the service account password, you first need to save the record and then click Set Password.

Once the username and password are set for the service account, copy both values for base64 encoding.

## Base64 Encoding Credentials

The ServiceNow integration requires Base64 encoded credentials in the format `username:password`. Here's how to generate them:

### Windows PowerShell

```
$credentials = "username:password"$encodedCredentials = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($credentials))Write-Output $encodedCredentials
```

### macOS/Linux Terminal

```
echo -n "username:password" | base64
```

Replace "username:password" with your actual ServiceNow service account credentials. Save the encoded output - you'll need it when configuring the integration in PGP.

## Obtaining the full Scripted REST API URL

From your ServiceNow instance, copy the URL in the browser. The hostname look like this: `<yourinstanceidentifier>.service-now.com`

The base API path can be found on your Scripted REST API page. It will look like this:

`/api/x_1234567_name/PGP_rest_api`

The relative path is the `/notification` path that was added during the api creation.

All together this might look something like this:

```
<yourinstanceidentifier>.service-now.com/api/x_1234567_name/PGP_rest_api/notification
```

## Configuring in PGP

Setting up ServiceNow notifications in PGP is straightforward. Begin by navigating to Settings and locating the Notifications section. Here you'll find an "Add Notifications" button that opens a selection of available notification workflows, including ServiceNow alongside other options like Slack, Jira, and Microsoft Teams.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-5548-70fc-9c65-62598f6ddbcb/b64u-MDE5YjgwMDUtNTRmMC03ZmIwLTg2YTAtN2U1MGQzNjk0ODFi.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=902bb47446b6f38043d7b3ab6e7105f29ddea104a17e07de967e3cdcec283fd6)

Click "Connect" on the ServiceNow card to open the configuration dialog. You'll need to provide three key pieces of information: your Scripted REST API URL, Basic Auth Token, and your preferred minimum vulnerability severity threshold (ranging from info to critical). This severity setting lets you control which alerts flow through to your ServiceNow instance based on your organization's needs.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-5759-7765-9347-9a39f06d7435/b64u-MDE5YjgwMDUtNTczMi03MzQxLWE4MTgtYTQ3OTZiODkwMGZk.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=9337d4f4b80caea17d0b4a190bc58042558e6bc20673dd7494f993dfaf4d4418)

**Scripted REST API URL:** This is hostname + Base API path + Relative path. It usually reads like this: *https://your-company.service-now.com/api/snc/praetorian\_PGP\_webhook/notification*.

**Basic Auth Token**: This is the basic authentication header. It usually reads like this: *Basic am9obkBleGFtcGxlLmNvbTphYmMxMjM=*

**Severity:** Select the minimum severity level to by notified.

Once you set up PGP with ServiceNow, add a handler for the Webhook `POST` request in your ServiceNow instance. ServiceNow supports Javascript in their Scripted REST APIs.

![Screenshot 2024-10-21 at 8.39.59 PM.png](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-594c-7bb0-ac0c-13917c3dfa80/b64u-MDE5YjgwMDUtNTg4Ni03Yzk5LTk1OTctN2U4ZWJmM2IwNjU3.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=32323dbcb18e208ccf8c2898f241e9be2e3ac1e1990f9f3f4634e5999d1d39bd)

Your handler should expect to receive a vulnerability payload that reads like the following JSON:

```
{ "dns": "public-facing-api.domain.com", "name": "192.168.15.30", "finding": "exposed-administration-interface", "source": "webhook"}
```

You can use this information to create an incident or trigger other workflows using the Javascript handler.

Now, vulnerabilities found by PGP automatically show up in your ServiceNow workflow for streamlined remediation.

We hope this documentation has been helpful. If you find a topic that you would like discussed in detail, or need further assistance, please let us know at [support@praetorian.com](mailto:support@praetorian.com)!
