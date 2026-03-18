---
title: "Zulip"
description: "Zulip"
featurebaseId: "5072065"
---

PGP can send vulnerability information directly to your Zulip workspace through a [Slack-compatible webhook](https://yourorganization.zulipchat.com/integrations/doc/slack_incoming#zulip-slack-incoming-webhook-integration) integration. This guide will walk you through setting up the integration in both Zulip and PGP.

## Setting up the Zulip Webhook

Sign into your Zulip account and navigate to Personal Settings.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-1e98-7b60-8526-affe4e81c038/b64u-MDE5YjgwMDYtMWU1ZS03NTg2LWJiNmQtNGYwZDg1Y2Y2MGZl.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=be11078aede05457367aa79b17a3fcc9d91090484865b62ab4b1ce43459aef24)

Select the "Bots" tab on the left, then click "Add a new bot".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-1d7a-7b54-a439-166bdd67fc6a/b64u-MDE5YjgwMDYtMWQ1OS03MzIyLWFkOTUtZWZjNjM3YWIzYmIx.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=f554392990af02165fde62d613fdf9706a82557e847928641e52cb35ef78bd1f)

In the "Add a new bot" popup:

-   Select "Incoming webhook" as the bot type
-   Choose an appropriate name for the bot
-   Provide an email address for the bot
-   Click "Add"

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-1e95-7dbf-b4a0-8bf76d5cef40/b64u-MDE5YjgwMDYtMWUzOS03NjY3LTkxOTAtYmI1MjdlNDAxOGUy.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=f85d3df365a98415e2f853d833745cc122f3d50a98bbd931bee72d95d6d73463)

Once the bot is created, click the edit (pencil) icon for your new bot.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-21a4-7af8-805b-16da9ecd17f1/b64u-MDE5YjgwMDYtMjE1Ni03NjU1LTgzYTItYThkN2YxNzU3Mzll.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=bd53a610c0c707603fe639e0f6ebc631217a0e08895c86bd34b5a87642995aae)

Click "Generate URL for an integration".

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-21a6-7fd9-a0ee-c0dccb29d5cc/b64u-MDE5YjgwMDYtMjEzZS03YWIwLTkxOTItNmEzZTVhNzAyZDYw.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=67b7ec8e6930988a9a7d5057cfa97e09f58672b886b78960e09404a3d41339e1)

In the integration setup:

-   Select "Slack-compatible webhook" as the integration type
-   Choose the channel where you want to receive notifications
-   Copy the generated webhook URL - you'll need this for PGP configuration

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-2248-7b62-b4a7-40b05869215a/b64u-MDE5YjgwMDYtMjIzMi03NGQyLTk3MGItYzlhMDA0MTUzMjE2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c7a48ce04fcbea1df12f8de9b324422f211b1216f9bdf7ae41f7f16ab3a2999e)

## Configuring PGP

Log into your PGP account and navigate to **Settings** (located at the bottom left of the page)

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-2494-7216-b06a-e3bbdf431747/b64u-MDE5YjgwMDYtMjQ4Ni03NGI0LWEyMDktYWIwYzk5MWZhMTZm.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=771d7eba80ecbb4570f3420ada7cf4b83aaf98b0c0fdc84288cb5d4ff79982ef)

In the Settings page:

-   -   Find the Notifications section
    -   Click "Add Notification"
    -   Locate and click "Connect" on the Zulip tile

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-255d-7e52-9a80-8caff8c6d497/b64u-MDE5YjgwMDYtMjU0Ni03OTNkLThhYWEtMzVmNmQzM2QyNDk3.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=68e6b66da73a2c335d1b04412d6234502f7a7872c4c829ca11127d7b84913a17)

In the Zulip configuration form:

-   Paste the webhook URL you copied from Zulip
-   Select your desired minimum severity threshold for notifications
-   Click "Connect"

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811f5a21178a432e49e7c/019b8006-254b-7182-a35e-54198a5958da/b64u-MDE5YjgwMDYtMjUzNC03M2M3LThiZjYtODhiMzcyMWY0YTQz.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c677b0c184d83953df87d27031897d901a56d15aa577b3ee9d9f140b20177121)

After completing the setup, PGP will automatically send notifications to your specified Zulip channel for all vulnerabilities that meet or exceed your chosen severity threshold.

The integration will begin working immediately - no additional configuration is required.

We hope these instructions were helpful! If you find a topic that you would like discussed in detail, or need further assistance, please let us know at [support@praetorian.com](https://support@praetorian.com)!
