---
title: "CLI Basics"
description: "CLI Basics"
featurebaseId: "7635675"
---

## Take the First Steps in the Praetorian CLI

The **Praetorian Guard Platform**, formerly known as **Chariot**, can be accessed programmatically using the **Praetorian CLI**.  
Because the CLI was originally built around the Chariot platform, some commands, objects, and responses may still reference **Chariot** terminology. These naming differences are expected and will not affect how the CLI functions with Guard.

Once you have installed the Praetorian-CLI and run the `praetorian configure` command per the [documentation](https://docs.praetorian.com/hc/en-us/articles/25815154096667-Getting-Started-with-the-Praetorian-CLI) and [Readme page](https://github.com/praetorian-inc/praetorian-cli?tab=readme-ov-file#readme), you can start testing how `praetorian chariot` works.

When you open a command line and type `praetorian chariot --help`, you'll see the usage, options, and commands:

## List Command

To get a good idea about how Guard data is presented, try the `praetorian chariot list` command. As with all Praetorian CLI commands, the `--help` option can help provide guidance.Go ahead and try the following commands in succession:

```
praetorian chariot list assets
```

```
praetorian chariot list risks
```

```
praetorian chariot list attributes
```

Each of these commands prints a list of structured strings that represent each data category (Assets, Risks, and Attributes). 

Assets begin with the #asset prefix and are followed by additional fields delimited with the '#'.

Risks begin with the #risk prefix and are usually followed by the Asset DNS name on which that Risk was found, and the name of the Risk (eg. CVE-2024-9999). Again, the data is delimited with the '#'.

Attributes begin with #attribute as the prefix and are followed by a data separated by the '#'. For Asset Attributes, you will usually see descriptor and a value associated with that descriptor, also delimited by a '#'. In the UI you'll see the descriptor and value represented as **Name** and **Value:**

A special characteristic about Attributes is that they can be tied to a Risk or Asset. So, following the #attribute#descriptor#value portion of the string, you might see a nested Asset or Risk, depending on what that attribute is attached to. For example, you might see: #attribute#descriptor#value#asset#assetDNS#assetIP or #attribute#descriptor#value#risk#assetDNS#riskName.

To extend the case with Attributes and their links with Assets and Risks, you can use `--risk` or `-r` to list the attributes associated with a particular Risk. For example, you could use the following:

```
praetorian chariot list attributes -r #risk##
```

At this point, it might be important to acknowledge that each Risk has an Asset DNS name, but not an Asset IP contained in the string. Since a Risk can be on one or many IPs associated with a DNS name, the higher order DNS (rather than the lower order IP address) is represented in order to encourage further exploration of the Risk and it's association with the Asset on which it was found.

You can also list all of the Attributes of a particular Asset by using `--asset` or `-a`, like so:

```
praetorian chariot list attributes -a #asset#
```

## Get Command

Now that you have seen how PGP presents some of it's data, lets take a piece of that data and discover a bit more. Copy a line from the Asset list that you'd like to learn more about. Use that line to build the following command:

```
praetorian chariot get asset #asset#yourAssetName
```

Your result should present the following information:

```
{    
    "username": "yourSignUpEmail@email.com",
    "key": "#asset#yourAssetName#000.000.000.000",
    "source": "discovered",    "dns": "yourAssetName",
    "name": "000.000.000.000",
    "status": "A",
    "config": null,
    "created": "2024-01-01T02:58:50Z",
    "updated": "2024-01-01T02:01:30Z",
    "ttl": 1722909555,
    "history": null
}
```

Note that much more information is presented with the `get` command. (Hint: If you want to see more information with the list command, use the `-d` option) 

You can use [scripts](https://github.com/praetorian-inc/praetorian-cli/blob/main/docs/script-development.md) to get even more utility out of these commands.

Another point of note, is that all searches are a "prefix search," which means they must match, character for character, starting at the beginning.

## Search Command

Knowing what we know about how data lives in PGP, we can use the `search` command to be a little more targeted with our commands. Like the `list` command, `search` can be used to pull back bulk results given a specific search term. For instance the following will produce a list of Attributes:

```
praetorian chariot search --term '#attribute'
```

This will produce a list of Attributes that indicate a `source`:

```
praetorian chariot search --term '#attribute#source'
```

Getting to know how the data is structured and how to create searches for that data is where the CLI can become very powerful. 

Praetorian is continuously adding to the CLI. You can check the [praetorian-cli GitHub](https://github.com/praetorian-inc/praetorian-cli) page for the most recent updates. If you find a topic that you would like discussed in detail, or need further assistance, please let us know at [support@praetorian.com](mailto:support@praetorian.com)!
