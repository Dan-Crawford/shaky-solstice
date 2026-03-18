---
title: "Slack"
description: "Slack"
featurebaseId: "25815125222171"
---

PGP integrates with workplace messaging services to send push notifications for specified alerts. This guide will walk you through setting up a Slack webhook integration with PGP.

Note: For detailed information on Slack webhooks, refer to Slack's documentation: [https://api.slack.com/messaging/webhooks](https://api.slack.com/messaging/webhooks).

## Setting up Slack Webhooks

Visit [https://api.slack.com/apps](https://api.slack.com/apps) Click "Create New App" to begin.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-890e-75c6-83c8-1ff56ef23e9e/b64u-MDE5YjgwMDUtODZkNC03MmU0LWIxMTktYzk3MzRhMmU5Njgw.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=abc7375ce7c02bfe1a99493e6f186d9030b37eb42d449411951cb1cf42225d3f)

Enter a name for your app and select the workspace where you want to use the app.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-8913-7534-8792-2256a930616c/b64u-MDE5YjgwMDUtODdkMC03ZTQwLWI2NDItNjRjNzc1NGUxNWE2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=8e66b6033299a6c1bc1982eb20abe6ebefb6e5d2860a6d53fbcaacc016133f56)

After creation, you'll see a list of available functionalities for your app. From the available functionalities, we'll focus on setting up "Incoming Webhooks".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-86d6-701a-9ec9-864fba39a72b/b64u-MDE5YjgwMDUtODU1NS03ZDU1LWFmN2YtNzMyODMxZDI2YmMw.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=25b52cf74bbc4fa2ca433252f9c43915034b5a8e47cd2b8c58b2f1340929caf3)

Toggle "Activate Incoming Webhooks" to On.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-8c4e-7056-b75c-f938bebbd584/b64u-MDE5YjgwMDUtOGJiZS03OWRkLWE3ODgtOTcyYjgxOTJlZTM2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=e240d04f617d6672a8e5382fa72f96e4191f227e22dc4aa5707d0d67faffaf49)

Click "Add New Webhook to Workspace".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-8dc3-78b9-afcc-45bce0056621/b64u-MDE5YjgwMDUtOGQ4OS03MGNjLWJjY2MtY2NjMjMzNGYxMWE4.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=7379e032c9c4ff6f726abba835c533284053543fe74a28c4207b15b61c93a1b6)

Select the channel where you want notifications to appear. Click "Authorize".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-8d02-7d45-b212-33f88ee6dab1/b64u-MDE5YjgwMDUtOGNmNy03OTVhLTljODQtYzAyMTRkY2QzNTNl.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=59b3eb07a6888dc6bc1a6f92332fb60e83b4c057f89cd63c6f32cf65abec6e59)

After authorization, you'll receive a unique webhook URL. Save this URL - you'll need it for the PGP setup.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-92f1-742b-8ef4-53e2c955cce2/b64u-MDE5YjgwMDUtOTI2YS03ZGJiLTg4NzgtMTk4NGRlMDZhOTM3.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=6eb49fb1811f16a09e144e09d9dae568fc3e6da3d92e9069f85ec53ff8cc9a0a)

## Configuring PGP

Once you have created a Slack webhook for PGP, navigate to the **Settings** page in PGP.

Here you will find the Notifications section. Click Add Notification.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-92ed-7f53-8f1a-4c5b554b4307/b64u-MDE5YjgwMDUtOTI0NS03M2RkLTk3MGYtMzQyOTg2YzhjOGNk.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=d2278323e90aae3004da71fc94005fd11c5ced10079088b216553f7354796762)

Click "Connect" on the Slack card.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-92ef-75b9-b936-dbfd093086a4/b64u-MDE5YjgwMDUtOTI3My03MDdhLWIzNzctNWZjOTExMmQzZDM3.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=e075c2c61aa2a553407e550dd24756639f8474b202caeb429f46536a916e1389)

Paste the newly created Slack webhook URL into the **Webhook URL** field and specify the minimum severity level you would like to receive alerts for. Click **Connect** to complete the integration.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-9785-7fd2-ab63-5cc4e85557ec/b64u-MDE5YjgwMDUtOTc2Zi03ZDIzLWE4YTItMjJjMzlkZThiYWU4.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=1a1592bf612cff2223c5f8b6964b4d06bbf15390fd64080e2f098a32ae3c0169)

After successful setup, you should receive a test notification in your selected Slack channel confirming the integration is active.

If you run into any issues during the integration process or have questions about maximizing the value of this integration, our support team is ready to help. You can reach us at [support@praetorian.com](mailto:support@praetorian.com), and we'll be happy to guide you through any challenges you encounter.
