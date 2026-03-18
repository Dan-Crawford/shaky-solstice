---
title: "Titus: Secrets Discovery"
description: "Titus: Secrets Discovery"
featurebaseId: "3633656"
---

![Titus — Automated Secret Scanning Now Built Into Guard (And It's Open Source)](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69b7174c3768ef67737ebab9/019cf33a-4932-7fba-90e1-90fa0c3d3215/b64u-Y3ozaWRzdTFmeS5wbmc_WC1BbXo.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=e7d1b372d606266d7424b213af67ca83129e09c0b24572248996f35b6b2951d9)

Your environments just got a powerful new line of defense. **Titus**, Praetorian's purpose-built secret scanner, is now running natively inside the Praetorian Guard platform — and we've open-sourced the entire thing at [github.com/praetorian-inc/titus](https://github.com/praetorian-inc/titus).

That means you get automated, continuous secret scanning across your assets with full transparency into exactly how it works. No black boxes.

## What Titus Does For You

Titus hunts down hardcoded secrets across your environment with **459 detection rules** covering credentials for AWS, GCP, Azure, GitHub, Slack, MongoDB, PostgreSQL, Jenkins, GitLab, and hundreds more services. Every scan surfaces secrets that would otherwise sit silently in your codebase, configuration files, and repositories — waiting to be exploited.

But finding secrets is only half the battle. The real question is: **are they still live?**

## Validation That Proves What's Real

Titus doesn't just flag potential secrets — it can **validate whether credentials are still active**. This means your team spends zero time chasing expired tokens or revoked keys. When Titus marks a credential as **Confirmed**, you know it's a real, exploitable exposure that needs immediate remediation. When it's marked **Denied**, you can deprioritize with confidence.

This validation dramatically cuts through false positive noise and lets your security team focus on what actually matters.

## Safe By Design

We know what you're thinking: _"You're testing my credentials?"_ Here's why validation is safe:

-   **Read-only checks.** Validation only confirms whether a credential authenticates — it never executes commands, modifies data, or accesses resources beyond the authentication handshake.
    
-   **Off by default.** Validation is an opt-in capability, giving your team full control over when and how it runs.
    
-   **No lateral movement.** Titus makes a single, minimal API call per credential to check validity. It doesn't enumerate permissions, access data, or perform any action beyond confirming the credential is live.
    

This is the same approach used in professional penetration testing engagements — verify the risk without creating new ones.

## Native to Guard — Zero Setup Required

Titus runs natively inside the Praetorian Guard platform, working automatically against every attack vector Guard has access to. The more integrations you connect — source code repositories, cloud environments, CI/CD pipelines — the more ground Titus covers. Exposed secrets surface as findings right alongside your other risks, fully integrated into your existing remediation workflows. No new tools to learn. No separate dashboards. Just actionable intelligence delivered where you already work.

## Open Source — Inspect Every Rule, Contribute Your Own

Titus is fully open source under [github.com/praetorian-inc/titus](https://github.com/praetorian-inc/titus). You can inspect every one of its 459 detection rules, understand exactly what it's scanning for, and even contribute custom rules for your organization's specific secret patterns. It's powered by a high-performance regex engine with optional Hyperscan/Vectorscan acceleration for blazing-fast pattern matching, and it's been battle-tested across Praetorian's offensive security engagements before being deployed into Guard.

Transparency isn't a feature — it's how we build trust.

[Read the full deep-dive on our blog →](https://www.praetorian.com/blog/titus-open-source-secret-scanner/)
