---
title: "Google Chat"
description: "Google Chat"
featurebaseId: "32102633422875"
---

PGP integrates with workplace messaging services to send push notifications for specified alerts. This guide will walk you through setting up a Google Chat webhook integration with PGP.

Register the incoming webhook In a browser, open [Chat](https://chat.google.com/). Webhooks aren't configurable from the Chat mobile app. Go to the space where you want to add a webhook.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-ab44-7d49-904b-ec481d1d63a6/b64u-MDE5YjgwMDYtYWIxNS03NWNkLWI4MzUtMDI1MDMyN2U0ZmIx.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=63528a3d8a65252b7775c5bf27efaf5b606e29249269987f5f992a657e267ae1)

Next to the space title, click the the expand more arrow.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-aae4-71fb-8391-6b9bb2f94306/b64u-MDE5YjgwMDYtYWFjOC03NmY3LWE5M2YtNjIzNjE2MjJlNmQ2.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=71b23c3e186aec253756d529af090f8dcdd73c0c84c54219f09bef778b7dc35a)

Click Apps & integrations.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-ab12-7d3e-9032-7964dd97c8c4/b64u-MDE5YjgwMDYtYWFmMi03Njc1LWFiODgtNDNjNWYzMzc0OGQ5.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=2db6c3ca3edf485db464d80e9da75638e63fb01a78b75f8aaeebd14033ec72b4)

Click +Add webhooks.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-aea9-7927-a6d4-88150eec97e0/b64u-MDE5YjgwMDYtYWU2OC03MzUwLTlmOTEtYjM3YzJmM2U2MjBk.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=eaa6b5616f186cdd1e1b5f329f24d25dc7796e476f820669cc4f2d7e5fa9e59d)

Note: If you can't click the button, your Google Workspace organization doesn't let users add or use webhooks. For details, see Allow users to install Chat apps in the Google Workspace Admin Help documentation.

In the Name field, enter an appropriate name for the webhook.

In the Avatar URL field, enter an avatar if desired.

Click Save.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-af02-7b21-9dfd-3eb7853cba4c/b64u-MDE5YjgwMDYtYWVjNi03ZmYzLWI3YTAtOGI2OTAyZjA3Njkx.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=252797d8345676b6f40bc161d0d7d4170189689ee19ea60634e3a505a1efd03b)

To copy the webhook URL, click More, and then click Copy link.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-aec2-779a-aebe-a35800183b1d/b64u-MDE5YjgwMDYtYWU5Yy03MWUwLWJkYTgtMmRhZmNmYWY5ZWMx.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=b8aed693b1bea78e63ab50bc44e678ec3385e99cad4e01726f2eea677fd8bcb0)

Warning: Don't share your webhook URL online, such as in a public code repository, as this compromises its security.

## Configuring PGP

Once you have created a Google Chat webhook for PGP, navigate to the **Settings** page in PGP.

Here you will find the Notifications section. Click Add Notification.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-b174-775c-af5e-5441bc1eccee/b64u-MDE5YjgwMDYtYjE1ZS03YTgwLWIxZjgtNzFmNmQyMGU2Y2U4.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=a02753f6c107071358964c46b004ca98b0c94c77fd759be64358dd1a9a0ff5f6)

Click "Connect" on the Google Chat card.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-b2ee-7e2a-983f-7f865f8af94a/b64u-MDE5YjgwMDYtYjJiMy03NzhkLWIxYzUtNzI4MzUyNmE4OGNl.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=12f0553523855db909ff29c33d765b2bef4b432db986358d464eaa9444b91a95)

Paste the newly created Google Chat webhook URL into the **Webhook URL** field and specify the minimum severity level you would like to receive alerts for. Click **Connect** to complete the integration.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-b1d9-7bb4-8e4c-ee81ed40f8eb/b64u-MDE5YjgwMDYtYjFiNy03NGE3LTgzYmMtMjlhZTkzMTdmN2U5.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=6a6ef6f37534cc4be4d65ee0b90d4d2c9791c98ef6a6bbc15ff27fe5a7583aff)

After successful setup, you should receive a test notification in your selected Google Chat channel confirming the integration is active.

If you run into any issues during the integration process or have questions about maximizing the value of this integration, our support team is ready to help. You can reach us at [support@praetorian.com](mailto:support@praetorian.com), and we'll be happy to guide you through any challenges you encounter.
