---
title: "Brutus: Modern Credential Attack Testing"
description: "Brutus: Modern Credential Attack Testing"
featurebaseId: "1647939"
---

![Et Tu, Default Creds? Introducing Brutus for Modern Credential Testing](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69b7174b3768ef67737eb97b/019cf337-2082-75aa-8eb5-602562452bc3/b64u-amtkejJiNDdyMS5wbmc_WC1BbXo.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c4f17ca77b472b270f7701b1d69b6b113d0954a51d0a96459ddb3a17bd7e9da1)

**Brutus v1.0** is here, and it's about to change how you approach credential testing on every engagement.

We've all been there. Thousands of discovered services, and now you need to audit credentials at scale. But first — dependency hell, compilation errors, and parsing scripts for output no machine can process. An hour gone before you've tested a single credential.

**That era is over.**

Brutus is what credential testing should look like in 2026. Written in Go, fully open source, and now available in the **Praetorian Guard Platform**. There's no black box here — every line of code is auditable, extensible, and community-driven. It compiles to a single binary with absolutely zero external dependencies. Download it, run it, done. No development headers, no package managers, no compilation nightmares. It runs everywhere — Linux, macOS, Windows, FreeBSD — and it speaks JSON natively because your pipeline shouldn't need a translator.

Brutus is a **manually initiated** capability within the Praetorian Guard Platform. To ensure this powerful tool is deployed at the right time and against the right systems, **coordinate with your Praetorian Guard team** to scope and authorize credential testing as part of your engagement workflow.

## Seamless Pipeline Integration

Here's where Brutus truly shines. Your reconnaissance output pipes straight into credential testing in a single pipeline:

```
naabu -host 10.0.0.0/16 -silent | fingerprintx --json | brutus --json
```

That's it. Port scan to service identification to credential testing. Structured JSON results flow out the other end, ready for your reporting pipeline, your database, or your next tactical decision — no parsing scripts required.

## 23 Protocols and Counting

Brutus ships with support for SSH (passwords _and_ private keys), MySQL, PostgreSQL, MSSQL, Redis, MongoDB, SMB, LDAP, WinRM, SNMP, FTP, Telnet, VNC, HTTP/HTTPS Basic Auth, and more. Each protocol is implemented as a self-contained plugin, which means the architecture is built to grow with the community.

## Embedded Bad Keys — Because Nobody Should Still Be Using Vagrant Keys in Production

This one's a game-changer. Brutus compiles known-compromised SSH key collections directly into the binary — keys from Rapid7's ssh-badkeys repository, HashiCorp Vagrant, F5 BIG-IP, ExaGrid, Ceragon FibeAir, and others. When Brutus encounters an SSH service, it automatically tests every embedded bad key against the service. No key files to manage, no wrapper scripts to maintain, and each key carries its CVE metadata straight through to the output for your compliance reporting.

## Spray That Compromised Key Across the Network

Found a private key on a compromised vulnerability scanner? Brutus turns what used to be an afternoon of bash scripting into a repeatable one-liner. Point it at a network range with the recovered key, and within minutes you'll have a complete map of everywhere that key grants access — across network segments, across hosts, with clean JSON output that lets you plan your lateral movement with precision.

## Experimental: AI-Powered Credential Discovery

We couldn't resist pushing the envelope. Brutus ships with experimental AI features that tackle one of the most tedious parts of internal assessments — landing on an unknown HTTP admin panel and having no idea what default credentials to try.

The first feature sends HTTP response data to an LLM that identifies the application (Grafana, Jenkins, Tomcat, a Cisco management interface, you name it) and suggests vendor-specific default credentials. The second feature goes even further — using headless Chrome combined with Claude's vision API to navigate JavaScript-rendered login pages, identify the appliance from a screenshot, research default credentials, and fill in the form automatically.

These features are experimental and depend on external API services, but the early results from our own engagements have been genuinely exciting.

## Why "Brutus"?

If you know Praetorian's tooling, you'll notice we tend to name projects after Roman emperors — Trajan, Augustus, and the like. Brutus breaks that tradition because Marcus Junius Brutus was never an emperor. He's remembered for walking into the Roman Senate on the Ides of March and putting a dagger in the back of the most powerful man in the world. That felt more appropriate for a credential testing tool than any emperor's name ever could. Brutus doesn't build empires — it tests whether the ones you've built will let a stranger walk right through the front door.

Besides, _"Et tu, default creds?"_ was too good to pass up.

## Get Started Now

Brutus is open source and ready for your next engagement. The full source is available on [GitHub](https://github.com/praetorian-inc/brutus) — inspect it, extend it, contribute to it. To get Brutus running as part of your Praetorian Guard deployment, reach out to your Praetorian Guard team to coordinate activation and scoping.

```
go install github.com/praetorian-inc/brutus/cmd/brutus@latest
```

The next time you're holding a private key from a compromised scanner and wondering where it works, you won't need a bash for-loop and three hours of patience. You'll need one binary and one pipeline.
