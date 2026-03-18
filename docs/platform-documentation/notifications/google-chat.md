---
title: "Google Chat"
description: "Google Chat"
featurebaseId: "5957459"
---

PGP integrates with workplace messaging services to send push notifications for specified alerts. This guide will walk you through setting up a Google Chat webhook integration with PGP.

Register the incoming webhook In a browser, open [Chat](https://chat.google.com/). Webhooks aren't configurable from the Chat mobile app. Go to the space where you want to add a webhook.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-ab44-7d49-904b-ec481d1d63a6/b64u-MDE5YjgwMDYtYWIxNS03NWNkLWI4MzUtMDI1MDMyN2U0ZmIx.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=511496122f5c7eadfd5a9a4774f06de5775f3631bde0f93e591c72f996f325fc)

Next to the space title, click the the expand more arrow.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-aae4-71fb-8391-6b9bb2f94306/b64u-MDE5YjgwMDYtYWFjOC03NmY3LWE5M2YtNjIzNjE2MjJlNmQ2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=37b45082c535dbc232fd1e912b7af68b7a6b65af95eeb076b3f8699b2e8414b6)

Click Apps & integrations.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-ab12-7d3e-9032-7964dd97c8c4/b64u-MDE5YjgwMDYtYWFmMi03Njc1LWFiODgtNDNjNWYzMzc0OGQ5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=01450a71e56aaf5faace02474c56384a120396fd4368ca56ea957adbfb5954b9)

Click +Add webhooks.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-aea9-7927-a6d4-88150eec97e0/b64u-MDE5YjgwMDYtYWU2OC03MzUwLTlmOTEtYjM3YzJmM2U2MjBk.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=d65fa63db4c376488aa5602d1be08f6b5d5fb4dc53fb9fcbae47f3de8945a2be)

Note: If you can't click the button, your Google Workspace organization doesn't let users add or use webhooks. For details, see Allow users to install Chat apps in the Google Workspace Admin Help documentation.

In the Name field, enter an appropriate name for the webhook.

In the Avatar URL field, enter an avatar if desired.

Click Save.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-af02-7b21-9dfd-3eb7853cba4c/b64u-MDE5YjgwMDYtYWVjNi03ZmYzLWI3YTAtOGI2OTAyZjA3Njkx.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=9b5a443bf77a1a1b786717d5ce6c988a0eff44c8e6c422369d2f95d685c00bfb)

To copy the webhook URL, click More, and then click Copy link.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-aec2-779a-aebe-a35800183b1d/b64u-MDE5YjgwMDYtYWU5Yy03MWUwLWJkYTgtMmRhZmNmYWY5ZWMx.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=ef6d7c60d7857bc0a6726a3063d9590aa6c03ab1bf47ff407b8abc329dfbd689)

Warning: Don't share your webhook URL online, such as in a public code repository, as this compromises its security.

## Configuring PGP

Once you have created a Google Chat webhook for PGP, navigate to the **Settings** page in PGP.

Here you will find the Notifications section. Click Add Notification.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-b174-775c-af5e-5441bc1eccee/b64u-MDE5YjgwMDYtYjE1ZS03YTgwLWIxZjgtNzFmNmQyMGU2Y2U4.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=e2bc2fd1cd633ce2bb5b95c7030ad4cf8cb7990390ca365f8e7045b3f2503d57)

Click "Connect" on the Google Chat card.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-b2ee-7e2a-983f-7f865f8af94a/b64u-MDE5YjgwMDYtYjJiMy03NzhkLWIxYzUtNzI4MzUyNmE4OGNl.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=bdaee8e43b040516668a59ce337ae9fba694a17cf6ed38db610004c7a730ced2)

Paste the newly created Google Chat webhook URL into the **Webhook URL** field and specify the minimum severity level you would like to receive alerts for. Click **Connect** to complete the integration.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-b1d9-7bb4-8e4c-ee81ed40f8eb/b64u-MDE5YjgwMDYtYjFiNy03NGE3LTgzYmMtMjlhZTkzMTdmN2U5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=de0db9f79fb5b7f8c98b298e693c393ab54b43d116b8e44b7c36ad4d6cecd386)

After successful setup, you should receive a test notification in your selected Google Chat channel confirming the integration is active.

If you run into any issues during the integration process or have questions about maximizing the value of this integration, our support team is ready to help. You can reach us at [support@praetorian.com](mailto:support@praetorian.com), and we'll be happy to guide you through any challenges you encounter.
