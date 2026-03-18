---
title: "Pius: Attack Surface Mapping"
description: "Pius: Attack Surface Mapping"
featurebaseId: "8800496"
---

![Introducing Pius: Open-Source Attack Surface Mapping](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69b7174f052a093db795d398/019cf33b-8708-7deb-bc71-beac7ecc192e/b64u-MDBsNmlocWc0OC53ZWJwP1gtQW0.webp?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=90071048f87ff9d9c5f73043c7d471e90bfc126ddadbd4046af4035c639f08c0)

## Map Your Complete External Attack Surface with Pius

You can't secure what you can't see. **Pius** — now open source and integrated into the **Praetorian Guard Platform** — discovers your organization's entire external attack surface from a single command: domains, subdomains, and IP ranges across 23 discovery plugins.

### Why This Matters

Most reconnaissance tools focus on subdomain enumeration and stop there. But your attack surface includes IP ranges registered across global registries, domains buried in certificate transparency logs, subsidiaries hidden in SEC filings, and infrastructure tied to corporate registries you've never checked. Pius queries **all of it** — automatically, concurrently, and with confidence scoring so you know exactly what's real and what needs review.

### What You Get

**23 Discovery Plugins, One Binary**Certificate transparency, passive DNS, reverse WHOIS, all five Regional Internet Registries (ARIN, RIPE, APNIC, AFRINIC, LACNIC), BGP routing tables, SEC EDGAR filings, GLEIF corporate registries, GitHub organization search, and more. One tool. No runtime dependencies.

**Three-Phase Discovery Pipeline**Pius doesn't just blast queries — it chains results intelligently. Phase 0 runs independent discovery concurrently. Phase 1 discovers organizational handles across registries. Phase 2 resolves those handles into CIDR blocks. Late-stage plugins enrich results using assets discovered in earlier phases.

**Confidence Scoring**When an organization name matches ambiguously across sources, Pius doesn't silently drop it or blindly include it. Every result gets a confidence score — high-confidence matches flow through automatically, ambiguous ones are flagged for your review.

**Passive-First by Default**Only OSINT sources are queried by default. Active plugins like DNS brute-force and zone transfers are opt-in — giving you control over your reconnaissance footprint.

**Multi-Tier Caching**API responses are cached for 24 hours. RPSL databases are stored locally. Repeat runs are fast and don't burn through rate limits.

### How It Fits Into Guard

Pius powers the asset discovery engine inside the Praetorian Guard Platform. When Guard maps your attack surface, Pius is doing the heavy lifting behind the scenes — querying registries, resolving handles, scoring confidence, and feeding discovered assets directly into your Guard dashboard alongside your cloud, network, and application security findings.

If you're a Guard Platform customer, **you're already benefiting from Pius**. This release makes the underlying engine available as a standalone open-source tool for your own workflows.

### Open Source

Pius is available now on GitHub at [github.com/praetorian-inc/pius](https://github.com/praetorian-inc/pius) under an open-source license. Prebuilt binaries for Linux, macOS, and Windows. Install with a single command:

```
go install github.com/praetorian-inc/pius/cmd/pius@latest
```

Or just run it:

```
pius run --org "Your Company" --domain yourcompany.com
```

### Get Started

Guard Platform customers already have Pius working for them. To run it standalone, grab it from GitHub or reach out to your Praetorian engagement team to discuss how Pius-powered discovery fits into your security program.
