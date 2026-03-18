---
title: "Google Chat"
description: "Google Chat"
featurebaseId: "32102633422875"
---

PGP integrates with workplace messaging services to send push notifications for specified alerts. This guide will walk you through setting up a Google Chat webhook integration with PGP.

Register the incoming webhook In a browser, open [Chat](https://chat.google.com/). Webhooks aren't configurable from the Chat mobile app. Go to the space where you want to add a webhook.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-ab44-7d49-904b-ec481d1d63a6/b64u-MDE5YjgwMDYtYWIxNS03NWNkLWI4MzUtMDI1MDMyN2U0ZmIx.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=f6c512687032d67b19f9545068172af304007dc1436fe94b21a05ffd1c273750)

Next to the space title, click the the expand more arrow.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-aae4-71fb-8391-6b9bb2f94306/b64u-MDE5YjgwMDYtYWFjOC03NmY3LWE5M2YtNjIzNjE2MjJlNmQ2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=7bf977c07d2a125fc78bc737634f997deca10373a4576d172186dc8c1f712301)

Click Apps & integrations.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-ab12-7d3e-9032-7964dd97c8c4/b64u-MDE5YjgwMDYtYWFmMi03Njc1LWFiODgtNDNjNWYzMzc0OGQ5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=cfeea9997696fff4874be2fc59f16ff91931f4d86a69cfd9661d06464407908f)

Click +Add webhooks.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-aea9-7927-a6d4-88150eec97e0/b64u-MDE5YjgwMDYtYWU2OC03MzUwLTlmOTEtYjM3YzJmM2U2MjBk.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=d8462bce0538b695583f13e8d22f4cc26dde8fd47ee06991cd95f5dbf1b7318f)

Note: If you can't click the button, your Google Workspace organization doesn't let users add or use webhooks. For details, see Allow users to install Chat apps in the Google Workspace Admin Help documentation.

In the Name field, enter an appropriate name for the webhook.

In the Avatar URL field, enter an avatar if desired.

Click Save.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-af02-7b21-9dfd-3eb7853cba4c/b64u-MDE5YjgwMDYtYWVjNi03ZmYzLWI3YTAtOGI2OTAyZjA3Njkx.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=f3bffb5fd1088c673c307e8da149c5484f8d4ddedefcb0465798c0863b61c6fe)

To copy the webhook URL, click More, and then click Copy link.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-aec2-779a-aebe-a35800183b1d/b64u-MDE5YjgwMDYtYWU5Yy03MWUwLWJkYTgtMmRhZmNmYWY5ZWMx.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=250ddb5a503e75ba363df061913818f7b6779892a26ead3786a8a3d7c6c3ef5f)

Warning: Don't share your webhook URL online, such as in a public code repository, as this compromises its security.

## Configuring PGP

Once you have created a Google Chat webhook for PGP, navigate to the **Settings** page in PGP.

Here you will find the Notifications section. Click Add Notification.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-b174-775c-af5e-5441bc1eccee/b64u-MDE5YjgwMDYtYjE1ZS03YTgwLWIxZjgtNzFmNmQyMGU2Y2U4.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=3b8fbad180c39a0eedc77d8eeec110a93ed301e46aeedb1569c4163e19e10aea)

Click "Connect" on the Google Chat card.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-b2ee-7e2a-983f-7f865f8af94a/b64u-MDE5YjgwMDYtYjJiMy03NzhkLWIxYzUtNzI4MzUyNmE4OGNl.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=b88117cedec8d6e85f63c453b19d7a69f61832068075e6c0812d801711a940cf)

Paste the newly created Google Chat webhook URL into the **Webhook URL** field and specify the minimum severity level you would like to receive alerts for. Click **Connect** to complete the integration.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69581219a21178a432e4e9a1/019b8006-b1d9-7bb4-8e4c-ee81ed40f8eb/b64u-MDE5YjgwMDYtYjFiNy03NGE3LTgzYmMtMjlhZTkzMTdmN2U5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=ded1de7e324fe84941dfca3951b47f4f261abbfd7247c6e0bae027dc5665689d)

After successful setup, you should receive a test notification in your selected Google Chat channel confirming the integration is active.

If you run into any issues during the integration process or have questions about maximizing the value of this integration, our support team is ready to help. You can reach us at [support@praetorian.com](mailto:support@praetorian.com), and we'll be happy to guide you through any challenges you encounter.
