---
title: "Guard Platform Webhook"
description: "Guard Platform Webhook"
featurebaseId: "1689624"
---

The Praetorian Guard Platform (PGP) provides webhook integrations that allow you to send or receive data between your PGP instance and external applications. This enables you to connect tools and systems that don't yet have an official PGP integration.

## Incoming Webhook

### Setup

Each PGP instance supports one active webhook. In Settings, under the Notifications Settings section, find the "Webhook URL" section.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958120ba21178a432e4cbf5/019cb024-2b28-7873-b4d1-2178c7dfe21c/b64u-aW1hZ2UucG5n.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=eb37f66034290589ce194376212169b75422bd2a29d9edafc049b9a48c3219e7)

Click the "Generate URL" button to create your unique PGP Webhook URL.

If you prefer using the command line, you can enable and retrieve your webhook URL using the Praetorian CLI:

```
$ praetorian PGP add webhookhttps://xxxxxxxxxxxx.execute-api.us-east-2.amazonaws.com/PGP/hook/:username/:pin
```

## Add a Vulnerability

To add a vulnerability to be tracked in PGP, send the following request:

```
curl -X PUT "https://<webhook.url>" \
-H "accept: /" \
-H "Content-Type: application/json" \
-d '{ 
   "dns": "public-facing-api.domain.com",
   "name": "192.168.15.30",
   "finding": "Exposed_Admin_Interface" # must match regex /^\\S+$/}'
}' 
```

The risk will now appear in your **Vulnerabilities** page.

Add an asset

To add an asset to PGP, send the following request:

```
curl -X 'PUT' \'https://<webhook.url>' \
   -H 'accept: */*' \
   -H 'Content-Type: application/json' \
   -d '{"dns": "staging.domain.com","name": "10.1.1.5"}'
```

This will add a new asset to your **Assets** page. 

**Important Notes About Webhook-Added Assets:**Assets added through the webhook are **ephemeral**. They are scanned **once** by PGP and then retained only for their configured **time-to-live (TTL)**. If an asset is not rediscovered by another integration or re-submitted via the webhook before its TTL expires, it will automatically fall out of the platform.

If an official integration exists for the asset type you are trying to track—such as AWS, Azure, GCP, or other supported providers—you should use that integration instead. Native integrations continuously enumerate cloud resources and provide full, ongoing coverage, whereas webhook-added assets are intended for one-off or custom use cases.

## Outgoing Webhook

The PGP platform provides an outgoing webhook integration that sends security notifications for identified risks when they are opened in PGP. This enables custom integrations with existing security operations and incident response workflows.

### Setup

In Settings, under the Notifications Settings section, find the Outbound Webhooks setup:

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/6958120ba21178a432e4cbf5/019cb02a-15a7-700c-b421-c057c8562c4c/b64u-aW1hZ2UucG5n.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=7ade2280306b1dd10443a45abb136e5126f3bb773ae554579c03d6c92eb66d1e)

**Required Fields:**\- Webhook Name: A friendly identifier for the integration (e.g., "SecOps SQS Queue")- Webhook URL: The target endpoint that will receive POST requests- Severity Threshold: Minimum risk severity level (Medium, High, Critical by default)

**Optional Authentication:**\- Authentication Header Name: Custom header name (e.g., "Authorization", "X-API-Key")- Authentication Header Value: Corresponding header value for authentication

### Webhook Payload

The webhook sends POST requests with JSON payloads containing complete risk data including severity, description, affected assets.

If you run into any issues or have questions about maximizing the value of the webhook, our support team is ready to help. You can reach us at [support@praetorian.com](mailto:support@praetorian.com), and we'll be happy to guide you through any challenges you encounter.
