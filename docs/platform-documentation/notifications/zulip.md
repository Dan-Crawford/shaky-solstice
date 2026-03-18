---
title: "Zulip"
description: "Zulip"
featurebaseId: "2903046"
---

PGP can send vulnerability information directly to your Zulip workspace through a [Slack-compatible webhook](https://yourorganization.zulipchat.com/integrations/doc/slack_incoming#zulip-slack-incoming-webhook-integration) integration. This guide will walk you through setting up the integration in both Zulip and PGP.

## Setting up the Zulip Webhook

Sign into your Zulip account and navigate to Personal Settings.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-1e98-7b60-8526-affe4e81c038/b64u-MDE5YjgwMDYtMWU1ZS03NTg2LWJiNmQtNGYwZDg1Y2Y2MGZl.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=60ab8e5bc3154be5f3213ae471609eceb07727e9d3c3f42cc079289af7f67020)

Select the "Bots" tab on the left, then click "Add a new bot".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-1d7a-7b54-a439-166bdd67fc6a/b64u-MDE5YjgwMDYtMWQ1OS03MzIyLWFkOTUtZWZjNjM3YWIzYmIx.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=b04d3f69fa2aa90cf1653ce7fd35e39c9cbe0fdf19ab95abded569389923d360)

In the "Add a new bot" popup:

-   Select "Incoming webhook" as the bot type
-   Choose an appropriate name for the bot
-   Provide an email address for the bot
-   Click "Add"

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-1e95-7dbf-b4a0-8bf76d5cef40/b64u-MDE5YjgwMDYtMWUzOS03NjY3LTkxOTAtYmI1MjdlNDAxOGUy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=6c03532530a43cd68a9bf26d57f5af26868f1ac4592b2423ba771d0ec6d3390b)

Once the bot is created, click the edit (pencil) icon for your new bot.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-21a4-7af8-805b-16da9ecd17f1/b64u-MDE5YjgwMDYtMjE1Ni03NjU1LTgzYTItYThkN2YxNzU3Mzll.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=ddbe83fdbf5e5408676cedbce204140a1976c46cf101c3591efc5691bf6c3fda)

Click "Generate URL for an integration".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-21a6-7fd9-a0ee-c0dccb29d5cc/b64u-MDE5YjgwMDYtMjEzZS03YWIwLTkxOTItNmEzZTVhNzAyZDYw.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=8cd0eac31bee2c0ef166c7db77e6730dd08acbddf0d649797824ee97e4ed8dd7)

In the integration setup:

-   Select "Slack-compatible webhook" as the integration type
-   Choose the channel where you want to receive notifications
-   Copy the generated webhook URL - you'll need this for PGP configuration

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-2248-7b62-b4a7-40b05869215a/b64u-MDE5YjgwMDYtMjIzMi03NGQyLTk3MGItYzlhMDA0MTUzMjE2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=e708be1bf34817ef97945cb1e04fae153f8526a0c9cfaeae70e4b4a4619175c5)

## Configuring PGP

Log into your PGP account and navigate to **Settings** (located at the bottom left of the page)

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-2494-7216-b06a-e3bbdf431747/b64u-MDE5YjgwMDYtMjQ4Ni03NGI0LWEyMDktYWIwYzk5MWZhMTZm.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=71e1649ff53d342892c132ce025145b0e033ec85866685116842276d74b1dab5)

In the Settings page:

-   -   Find the Notifications section
    -   Click "Add Notification"
    -   Locate and click "Connect" on the Zulip tile

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-255d-7e52-9a80-8caff8c6d497/b64u-MDE5YjgwMDYtMjU0Ni03OTNkLThhYWEtMzVmNmQzM2QyNDk3.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=467818df0610a9283c01626f118649cbf1b503c0d4b1fe728f68c8c24bc91362)

In the Zulip configuration form:

-   Paste the webhook URL you copied from Zulip
-   Select your desired minimum severity threshold for notifications
-   Click "Connect"

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-254b-7182-a35e-54198a5958da/b64u-MDE5YjgwMDYtMjUzNC03M2M3LThiZjYtODhiMzcyMWY0YTQz.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=a777f5ea5867028203e300bddec59c0a6428d3d4990d135189f0b74c49e6ad6e)

After completing the setup, PGP will automatically send notifications to your specified Zulip channel for all vulnerabilities that meet or exceed your chosen severity threshold.

The integration will begin working immediately - no additional configuration is required.

We hope these instructions were helpful! If you find a topic that you would like discussed in detail, or need further assistance, please let us know at [support@praetorian.com](https://support@praetorian.com)!
