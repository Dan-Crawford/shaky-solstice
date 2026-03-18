---
title: "ServiceNow"
description: "ServiceNow"
featurebaseId: "9156978"
---

Utilize PGP's continuous monitoring capabilities to identify and address potential security vulnerabilities and feed that critical data into ServiceNow's incident and problem management workflows.

## Overview

This guide will walk you through integrating PGP with ServiceNow, which involves:

1.  Setting up a REST API endpoint in ServiceNow
2.  Creating a dedicated service account in ServiceNow
3.  Base64 encoding the service account credentials
4.  Obtaining the full Scripted REST API URL
5.  Configuring the integration in PGP

## Setting up a REST API endpoint in ServiceNow

In order to integrate PGP with ServiceNow, you must set up ServiceNow to receive a `POST` request from the PGP Webhook. To process the content in the Webhook `POST` request, we recommend you set up a processor using ServiceNow's **Scripted REST API** feature. In ServiceNow Xanadu, it is accessed via **All > System Web Services > Scripts Web Services > Scripted REST APIs**.

Learn more about [ServiceNow Scripted REST API here](https://developer.servicenow.com/dev.do#!/learn/courses/washingtondc/app_store_learnv2_rest_washingtondc_rest_integrations/app_store_learnv2_rest_washingtondc_scripted_rest_apis/app_store_learnv2_rest_washingtondc_scripted_rest_api_objectives).

In the **Scripted REST APIs** page, click **New** to create a new API endpoint:

![Screenshot 2024-10-21 at 3.27.29 PM.png](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-4ab3-7129-9747-59b6ac3f7783/b64u-MDE5YjgwMDUtNDlhNy03NmQyLTk0OWUtYzM2NjQzOTE4OTg2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=754d6131da9e60184e1bc59e8a28d995b608648fcf1bc30f0801c03540569104)

Enter "Praetorian PGP Webhook" in the **Name** field; and enter "praetorian\_PGP\_webhook" in the **API ID** field. Click **Submit** afterwards:

![Screenshot 2024-10-21 at 7.36.47 PM.png](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-4a68-79fe-946a-830e9e6bf406/b64u-MDE5YjgwMDUtNDkzYi03MmRjLWI4MTUtODUzNDRiY2EzZDgw.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=3fe808acaf90c793969c0001ad7a63a3e79b446dae0c763a48af0838675db82d)

After submitting, a **base API path** will be generated for you. This base path, together with the hostname of your ServiceNow instance, is the **Scripted REST API URL** when configuring the ServiceNow integration in PGP:

![Screenshot 2024-10-21 at 7.38.55 PM.png](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-49ba-7c31-9bab-f07e0a7de401/b64u-MDE5YjgwMDUtNDhmMi03ZDk3LWFhOGMtMzExYTkzMzU1NjBm.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=2fba15580d837402e246812c228880da4f76f28aae0a68130b32bfbd07bdba49)

Further, create a **resource:**

![Screenshot 2024-10-21 at 7.32.25 PM.png](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-4dee-754e-877a-8f405c61c43c/b64u-MDE5YjgwMDUtNGQ1Ny03MTFhLWIxMmMtNDJhM2Y4MzUzNjM2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=f876bb70874122ca96c03a744f3437f309ff81ab731430949a370b981d57f395)

Enter "Notification" in the **Name** field. And "/notification" in the **Relative path** field. Choose `POST` for **HTTP method**.

![Screenshot 2024-10-21 at 8.35.54 PM.png](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-51dc-7279-93c6-ecb0ad5b6272/b64u-MDE5YjgwMDUtNGZhOS03NzliLWIzMjAtNTlhODNlZmIwYjhk.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=385e4f454ba4a54070a0c53cacd2d137c824c7c08f2d0fdb630ff6968c5c3281)

Make sure to enable **Requires authentication.** PGP uses the HTTP Basic Authentication method to authenticate to ServiceNow:

![Screenshot 2024-10-21 at 8.38.40 PM.png](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-51df-717e-9b6a-87958ce79273/b64u-MDE5YjgwMDUtNTAwOC03MTA2LThlNDYtNWMzYjFjNGNiNDNk.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=89dd31b709d6b8f4fcaa5ad3759b7b1851ef614ac23ebb29a3f92ccd4b8b9f7d)

At this point, you have everything you need to configure the ServiceNow integration in PGP.

## Setting up the Service Account

Log in to ServiceNow with administrator privileges.

For quick navigation, within ServiceNow, at the top right, go to **All**, type **Users** and then navigate to **User Administration → Users**.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-5463-7323-a909-7207ff836a4e/b64u-MDE5YjgwMDUtNTQzZS03MTgyLWIxMzgtMWU5NjBkOWE0ZThi.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=4b8f63a41392f607b9010279d5ad3824d423aed7078ae7c0ef29bc288c5458e4)

At the top right, click **New**.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-54b1-7d66-ae25-6b245c90098e/b64u-MDE5YjgwMDUtNTQ5YS03MGQyLWFlMjUtZGMxY2ZjYWY1NDE0.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=d039e355ab1793b35fc00d93c8c48b19838870a0a2795aa511a06e6ef7efa4ef)

After configuring the service account to your needs, click submit. To set the service account password, you first need to save the record and then click Set Password.

Once the username and password are set for the service account, copy both values for base64 encoding.

## Base64 Encoding Credentials

The ServiceNow integration requires Base64 encoded credentials in the format `username:password`. Here's how to generate them:

### Windows PowerShell

$credentials = "username:password"$encodedCredentials = \[Convert\]::ToBase64String(\[Text.Encoding\]::UTF8.GetBytes($credentials))Write-Output $encodedCredentials

### macOS/Linux Terminal

echo -n "username:password" | base64

Replace "username:password" with your actual ServiceNow service account credentials. Save the encoded output - you'll need it when configuring the integration in PGP.

## Obtaining the full Scripted REST API URL

From your ServiceNow instance, copy the URL in the browser. The hostname look like this: `<yourinstanceidentifier>.service-now.com`

The base API path can be found on your Scripted REST API page. It will look like this:

`/api/x_1234567_name/PGP_rest_api`

The relative path is the `/notification` path that was added during the api creation.

All together this might look something like this:

<yourinstanceidentifier>.service-now.com/api/x\_1234567\_name/PGP\_rest\_api/notification

## Configuring in PGP

Setting up ServiceNow notifications in PGP is straightforward. Begin by navigating to Settings and locating the Notifications section. Here you'll find an "Add Notifications" button that opens a selection of available notification workflows, including ServiceNow alongside other options like Slack, Jira, and Microsoft Teams.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-5548-70fc-9c65-62598f6ddbcb/b64u-MDE5YjgwMDUtNTRmMC03ZmIwLTg2YTAtN2U1MGQzNjk0ODFi.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=e60a097513db4411c4cf5970d9bfdea8361464c032c5d2c13b943f7e04c4fc0c)

Click "Connect" on the ServiceNow card to open the configuration dialog. You'll need to provide three key pieces of information: your Scripted REST API URL, Basic Auth Token, and your preferred minimum vulnerability severity threshold (ranging from info to critical). This severity setting lets you control which alerts flow through to your ServiceNow instance based on your organization's needs.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-5759-7765-9347-9a39f06d7435/b64u-MDE5YjgwMDUtNTczMi03MzQxLWE4MTgtYTQ3OTZiODkwMGZk.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=6608356e9d87734308177367223ebe2374a97036925bcbb6f4f7f8546a2d8b3c)

**Scripted REST API URL:** This is hostname + Base API path + Relative path. It usually reads like this: _https://your-company.service-now.com/api/snc/praetorian\_PGP\_webhook/notification_.

**Basic Auth Token**: This is the basic authentication header. It usually reads like this: _Basic am9obkBleGFtcGxlLmNvbTphYmMxMjM=_

**Severity:** Select the minimum severity level to by notified.

Once you set up PGP with ServiceNow, add a handler for the Webhook `POST` request in your ServiceNow instance. ServiceNow supports Javascript in their Scripted REST APIs.

![Screenshot 2024-10-21 at 8.39.59 PM.png](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811c0a21178a432e437d6/019b8005-594c-7bb0-ac0c-13917c3dfa80/b64u-MDE5YjgwMDUtNTg4Ni03Yzk5LTk1OTctN2U4ZWJmM2IwNjU3.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=62685ca72c08cfe9dfbafb02f077676553265214ac84261d69f1d64013b16dae)

Your handler should expect to receive a vulnerability payload that reads like the following JSON:

{ "dns": "public-facing-api.domain.com", "name": "192.168.15.30", "finding": "exposed-administration-interface", "source": "webhook"}

You can use this information to create an incident or trigger other workflows using the Javascript handler.

Now, vulnerabilities found by PGP automatically show up in your ServiceNow workflow for streamlined remediation.

We hope this documentation has been helpful. If you find a topic that you would like discussed in detail, or need further assistance, please let us know at [support@praetorian.com](mailto:support@praetorian.com)!
