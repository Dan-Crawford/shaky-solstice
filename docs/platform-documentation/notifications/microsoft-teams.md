---
title: "Microsoft Teams"
description: "Microsoft Teams"
featurebaseId: "6550844"
---

PGP integrates seamlessly with workplace messaging service Microsoft Teams to send push notifications for specified alerts. Here's a step-by-step guide to set up notifications in Microsoft Teams.

First, you'll need to decide where in Teams you want to see your PGP alerts. Pick the channel where you want notifications to be sent:

1.  Open Microsoft Teams.
2.  Select the channel where you want to receive notifications.
3.  Click on the ellipsis (three dots) next to the channel name.
4.  Choose "Workflows" from the dropdown menu.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811e4a21178a432e47e29/019b8005-de4b-7b41-8732-20f8d86e7b3c/b64u-MDE5YjgwMDUtZGUyNC03YTRmLWI2NmYtOTQwZmJhM2MwM2E2.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=bb0c139c49ca74ab05180097aa7066150ff8c6193ec7db20013bde7f53f11542)

Now, you'll want to find the right Workflow.

1.  In the Workflows menu, search for "Post to a channel when a webhook request is received."
2.  Click on the Workflow to select it.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811e4a21178a432e47e29/019b8005-dfdb-78fa-b008-0aa67989f39f/b64u-MDE5YjgwMDUtZGZhYy03OWU5LTkxMjctMmFiZDZkNGJjN2I3.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=ca8043411c4e375ce68c6e7e440c628e71d7782881e49f4b81952300a84ba182)

Once you've identified the right workflow, you can give it a name.

1.  Enter a name for the workflow. This name is only used to distinguish it from other workflows in your settings.
2.  Wait for Teams to confirm the connection is valid.
3.  Click the "Next" button.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811e4a21178a432e47e29/019b8005-df47-79a1-b196-9db6aeaa6598/b64u-MDE5YjgwMDUtZGVmZC03M2Q3LWExNWEtOWIxODcwNzczNGU0.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=50fb947612221e098dacf5033173f1ef1171164028d718e49a72a41ca67ea969)

Next, you can check your work and make sure what you have entered is correct.

1.  Ensure the correct channel is selected.
2.  Click the "Add Workflow" button.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811e4a21178a432e47e29/019b8005-e362-776e-8450-0b5766f4029e/b64u-MDE5YjgwMDUtZTMwNC03YmRlLWExYjUtZDM4ZDBjYjAwYjRk.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=08bdb43a821aac5c7607ab11cfb8f4c703e982823cf899d1da1a18246f62f07a)

With your Workflow created, you'll be presented with a URL that PGP will use to send alerts. 

1.  Copy the webhook URL provided by Teams.
2.  Click the "Done" button to close the window.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811e4a21178a432e47e29/019b8005-e391-7090-91e5-237cf32814a7/b64u-MDE5YjgwMDUtZTMzMS03ZTFhLTgzZWYtNmFiMDNkMWIzYjU4.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=accc25f357f8f9af3ace0ee646c8b7dc08b81c20dc02cd89c7a426803a8aa11e)

## Configuring Notifications in PGP

With Teams is set up to receive alerts, you can set up PGP to send them where they need to go.

1.  Open PGP.
2.  On the settings page, find the Notifications section.
3.  Click "Add Notification".
4.  Click "Connect" on the Microsoft Teams card.
5.  Paste the webhook URL you copied from Teams into the "Webhook URL" field.
6.  Select the minimum severity of vulnerabilities you want to be alerted about.
7.  Click the "Connect" button to complete the integration.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/695811e4a21178a432e47e29/019b8005-e2ce-75db-a6e1-40fc4d28c3de/b64u-MDE5YjgwMDUtZTJhZi03OWY3LWFmNjYtYzY2NTc4ODQwZTJm.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=df262b65df6dce46d14f6fc234ea9156defcc416d48da2bc3cfd17ccdcb91b4e)

By following these steps, you can ensure that critical alerts from PGP are seamlessly delivered to your chosen Microsoft Teams channel, keeping your team informed and ready to act.

Praetorian is continuously adding to PGP. If you find a topic that you would like discussed in detail, or need further assistance, please let us know at [support@praetorian.com](mailto:support@praetorian.com)!
