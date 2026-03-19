---
title: "Slack"
description: "Slack"
featurebaseId: "8440109"
---

PGP integrates with workplace messaging services to send push notifications for specified alerts. This guide will walk you through setting up a Slack webhook integration with PGP.

Note: For detailed information on Slack webhooks, refer to Slack's documentation: [https://api.slack.com/messaging/webhooks](https://api.slack.com/messaging/webhooks).

## Setting up Slack Webhooks

Visit [https://api.slack.com/apps](https://api.slack.com/apps) Click "Create New App" to begin.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-890e-75c6-83c8-1ff56ef23e9e/b64u-MDE5YjgwMDUtODZkNC03MmU0LWIxMTktYzk3MzRhMmU5Njgw.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=8724febaff62e2c50327927679f5034c31af43bd1a21fa6e3c3837fc932bab08)

Enter a name for your app and select the workspace where you want to use the app.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-8913-7534-8792-2256a930616c/b64u-MDE5YjgwMDUtODdkMC03ZTQwLWI2NDItNjRjNzc1NGUxNWE2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=0219ebaefbd836dc759ca8b8490a94d3123afb703111b6d560a1cfaa9aa95cce)

After creation, you'll see a list of available functionalities for your app. From the available functionalities, we'll focus on setting up "Incoming Webhooks".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-86d6-701a-9ec9-864fba39a72b/b64u-MDE5YjgwMDUtODU1NS03ZDU1LWFmN2YtNzMyODMxZDI2YmMw.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=10412c5e30c1c4bd8acd9c6439091e67df9b0206e072c58cf85a180487295053)

Toggle "Activate Incoming Webhooks" to On.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-8c4e-7056-b75c-f938bebbd584/b64u-MDE5YjgwMDUtOGJiZS03OWRkLWE3ODgtOTcyYjgxOTJlZTM2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=97c516be3013c0ea4b38a1311ed8503557be751decb8ba34af697010f163ca5d)

Click "Add New Webhook to Workspace".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-8dc3-78b9-afcc-45bce0056621/b64u-MDE5YjgwMDUtOGQ4OS03MGNjLWJjY2MtY2NjMjMzNGYxMWE4.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=69a2ee7ef69e83aa7bb528147cc95915be8e823b3fda95526b16140fe334f8b4)

Select the channel where you want notifications to appear. Click "Authorize".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-8d02-7d45-b212-33f88ee6dab1/b64u-MDE5YjgwMDUtOGNmNy03OTVhLTljODQtYzAyMTRkY2QzNTNl.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=f380b7e668d7b356040cb38f2c822b23910bea2defa93f6e837aaf78e2d8451d)

After authorization, you'll receive a unique webhook URL. Save this URL - you'll need it for the PGP setup.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-92f1-742b-8ef4-53e2c955cce2/b64u-MDE5YjgwMDUtOTI2YS03ZGJiLTg4NzgtMTk4NGRlMDZhOTM3.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=4bf246c845dcfb636b63d49a6449166c16dedecc23daa69534fdb3a60de9fb3f)

## Configuring PGP

Once you have created a Slack webhook for PGP, navigate to the **Settings** page in PGP.

Here you will find the Notifications section. Click Add Notification.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-92ed-7f53-8f1a-4c5b554b4307/b64u-MDE5YjgwMDUtOTI0NS03M2RkLTk3MGYtMzQyOTg2YzhjOGNk.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=94f63808304befb027ce48c07e8034b6160c79496ec6288100bbbfe98864a6c1)

Click "Connect" on the Slack card.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-92ef-75b9-b936-dbfd093086a4/b64u-MDE5YjgwMDUtOTI3My03MDdhLWIzNzctNWZjOTExMmQzZDM3.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=f35996372d2b0f56caf829f8977f3947687be7d574130ede447cc415d6a2d14b)

Paste the newly created Slack webhook URL into the **Webhook URL** field and specify the minimum severity level you would like to receive alerts for. Click **Connect** to complete the integration.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-9785-7fd2-ab63-5cc4e85557ec/b64u-MDE5YjgwMDUtOTc2Zi03ZDIzLWE4YTItMjJjMzlkZThiYWU4.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=45f247d792cc040728cca16aa1dc14d807c8a50ae5e4ba846a7a617bcc7c7955)

After successful setup, you should receive a test notification in your selected Slack channel confirming the integration is active.

If you run into any issues during the integration process or have questions about maximizing the value of this integration, our support team is ready to help. You can reach us at [support@praetorian.com](mailto:support@praetorian.com), and we'll be happy to guide you through any challenges you encounter.
