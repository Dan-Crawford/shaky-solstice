---
title: "Slack"
description: "Slack"
featurebaseId: "25815125222171"
---

PGP integrates with workplace messaging services to send push notifications for specified alerts. This guide will walk you through setting up a Slack webhook integration with PGP.

Note: For detailed information on Slack webhooks, refer to Slack's documentation: <https://api.slack.com/messaging/webhooks>.

## Setting up Slack Webhooks

Visit <https://api.slack.com/apps> Click "Create New App" to begin.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-890e-75c6-83c8-1ff56ef23e9e/b64u-MDE5YjgwMDUtODZkNC03MmU0LWIxMTktYzk3MzRhMmU5Njgw.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=904082de7fc503baf9a72871298f2394f0b2345ed72b163f2330d8c83273e26a)

Enter a name for your app and select the workspace where you want to use the app.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-8913-7534-8792-2256a930616c/b64u-MDE5YjgwMDUtODdkMC03ZTQwLWI2NDItNjRjNzc1NGUxNWE2.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=ca8647aeaf6bd0e51d578d01985ea1cfca39febaabb33b9dd503cba8f2099b61)

After creation, you'll see a list of available functionalities for your app. From the available functionalities, we'll focus on setting up "Incoming Webhooks".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-86d6-701a-9ec9-864fba39a72b/b64u-MDE5YjgwMDUtODU1NS03ZDU1LWFmN2YtNzMyODMxZDI2YmMw.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=2d5dc4f15cfc857c854db55eaef2ff08d18108fda959122c0fd4a57875226d0e)

Toggle "Activate Incoming Webhooks" to On.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-8c4e-7056-b75c-f938bebbd584/b64u-MDE5YjgwMDUtOGJiZS03OWRkLWE3ODgtOTcyYjgxOTJlZTM2.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=17125920afbf4c717d5e2dc0ed5c854db9aff96cfeb84c134fd7f7016e025088)

Click "Add New Webhook to Workspace".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-8dc3-78b9-afcc-45bce0056621/b64u-MDE5YjgwMDUtOGQ4OS03MGNjLWJjY2MtY2NjMjMzNGYxMWE4.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=46005e9540af6791cdc407fdc57f47c0668d8c722d9535b6f5f86de55a736326)

Select the channel where you want notifications to appear. Click "Authorize".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-8d02-7d45-b212-33f88ee6dab1/b64u-MDE5YjgwMDUtOGNmNy03OTVhLTljODQtYzAyMTRkY2QzNTNl.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=2c5bd853788f87d72a3b9dd1ebd0487c5823e681a9e9a13e91a3018cdcd87592)

After authorization, you'll receive a unique webhook URL. Save this URL - you'll need it for the PGP setup.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-92f1-742b-8ef4-53e2c955cce2/b64u-MDE5YjgwMDUtOTI2YS03ZGJiLTg4NzgtMTk4NGRlMDZhOTM3.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=2b6f967a38eae41fd4061869e9cabf41b95d22fd5e49ec9aa646cc012b6aae96)

## Configuring PGP

Once you have created a Slack webhook for PGP, navigate to the **Settings** page in PGP.

Here you will find the Notifications section. Click Add Notification.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-92ed-7f53-8f1a-4c5b554b4307/b64u-MDE5YjgwMDUtOTI0NS03M2RkLTk3MGYtMzQyOTg2YzhjOGNk.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=4d50a2e9ba052ffbdc3de14fcefb01be6165716e89808a23f7f73766454fad89)

Click "Connect" on the Slack card.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-92ef-75b9-b936-dbfd093086a4/b64u-MDE5YjgwMDUtOTI3My03MDdhLWIzNzctNWZjOTExMmQzZDM3.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=e81ef61aa15b799c4e1143b70c4b067ea5b9da15c39cdbefa971ce7ea27c469a)

Paste the newly created Slack webhook URL into the **Webhook URL** field and specify the minimum severity level you would like to receive alerts for. Click **Connect** to complete the integration.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811d0a21178a432e45854/019b8005-9785-7fd2-ab63-5cc4e85557ec/b64u-MDE5YjgwMDUtOTc2Zi03ZDIzLWE4YTItMjJjMzlkZThiYWU4.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=381ddf249d10aedd9f072a663c93cf3ea94572d0505e81cafcba30a07bfd06ff)

After successful setup, you should receive a test notification in your selected Slack channel confirming the integration is active.

If you run into any issues during the integration process or have questions about maximizing the value of this integration, our support team is ready to help. You can reach us at [support@praetorian.com](mailto:support@praetorian.com), and we'll be happy to guide you through any challenges you encounter.
