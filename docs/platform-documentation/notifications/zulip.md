---
title: "Zulip"
description: "Zulip"
featurebaseId: "32082929141275"
---

PGP can send vulnerability information directly to your Zulip workspace through a [Slack-compatible webhook](https://yourorganization.zulipchat.com/integrations/doc/slack_incoming#zulip-slack-incoming-webhook-integration) integration. This guide will walk you through setting up the integration in both Zulip and PGP.

## Setting up the Zulip Webhook

Sign into your Zulip account and navigate to Personal Settings.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-1e98-7b60-8526-affe4e81c038/b64u-MDE5YjgwMDYtMWU1ZS03NTg2LWJiNmQtNGYwZDg1Y2Y2MGZl.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=3857210548711cb4ff504532a6e1e364a5f7d340c9a8f8fddbb0ef330f810a78)

Select the "Bots" tab on the left, then click "Add a new bot".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-1d7a-7b54-a439-166bdd67fc6a/b64u-MDE5YjgwMDYtMWQ1OS03MzIyLWFkOTUtZWZjNjM3YWIzYmIx.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=eb8d09ec3ce719d96435f1119e1f7f6cb2ee2246721db841089c09e8fe7d5ea3)

In the "Add a new bot" popup:

* Select "Incoming webhook" as the bot type
* Choose an appropriate name for the bot
* Provide an email address for the bot
* Click "Add"

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-1e95-7dbf-b4a0-8bf76d5cef40/b64u-MDE5YjgwMDYtMWUzOS03NjY3LTkxOTAtYmI1MjdlNDAxOGUy.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=565ed045399ec94b6d2aead78e0d2fb9e718115177686c432e64e19cbc85ec63)

Once the bot is created, click the edit (pencil) icon for your new bot.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-21a4-7af8-805b-16da9ecd17f1/b64u-MDE5YjgwMDYtMjE1Ni03NjU1LTgzYTItYThkN2YxNzU3Mzll.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=d9a718ddc9a258335374b89a2bbd71a1995a81b1537f65c4a4c67df85afdeee8)

Click "Generate URL for an integration".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-21a6-7fd9-a0ee-c0dccb29d5cc/b64u-MDE5YjgwMDYtMjEzZS03YWIwLTkxOTItNmEzZTVhNzAyZDYw.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=2050a5ff253e640ae5d73882c27ea40b70bed404a60966f9927b553dc71182e4)

In the integration setup:

* Select "Slack-compatible webhook" as the integration type
* Choose the channel where you want to receive notifications
* Copy the generated webhook URL - you'll need this for PGP configuration

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-2248-7b62-b4a7-40b05869215a/b64u-MDE5YjgwMDYtMjIzMi03NGQyLTk3MGItYzlhMDA0MTUzMjE2.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=ebb1e8ae6cf5d877cb83f1173feba0fa6e559535eb78aef802ed39c6a9a6ef6b)

## Configuring PGP

Log into your PGP account and navigate to **Settings** (located at the bottom left of the page)

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-2494-7216-b06a-e3bbdf431747/b64u-MDE5YjgwMDYtMjQ4Ni03NGI0LWEyMDktYWIwYzk5MWZhMTZm.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=3ceec60a1feb93ee2fdff340e3ab760602c9cbb2c729a569c9249300658547ec)

In the Settings page:

* + Find the Notifications section
  + Click "Add Notification"
  + Locate and click "Connect" on the Zulip tile

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-255d-7e52-9a80-8caff8c6d497/b64u-MDE5YjgwMDYtMjU0Ni03OTNkLThhYWEtMzVmNmQzM2QyNDk3.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=323bc8b798cf3c0dd92f2f88536815a20d64b66610cab52d497838128b8adac2)

In the Zulip configuration form:

* Paste the webhook URL you copied from Zulip
* Select your desired minimum severity threshold for notifications
* Click "Connect"

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-254b-7182-a35e-54198a5958da/b64u-MDE5YjgwMDYtMjUzNC03M2M3LThiZjYtODhiMzcyMWY0YTQz.png?X-Amz-Expires=3600&X-Amz-Date=20260319T200000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260319%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=d9a8cc85edcf300d7b8baa7c3c7bf696c15872bbe8f38982c78d30013e7570ca)

After completing the setup, PGP will automatically send notifications to your specified Zulip channel for all vulnerabilities that meet or exceed your chosen severity threshold.

The integration will begin working immediately - no additional configuration is required.

We hope these instructions were helpful! If you find a topic that you would like discussed in detail, or need further assistance, please let us know at [support@praetorian.com](https://support@praetorian.com)!
