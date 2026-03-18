---
title: "Nerva: Service Fingerprinting"
description: "Nerva: Service Fingerprinting"
featurebaseId: "3640715"
---

![Nerva: Next-Generation Service Fingerprinting for Praetorian Guard](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69b7174c052a093db795d30d/019cf33a-abd1-796d-9b8c-e56ee1a36fd4/b64u-bXl3Ynd5enAzbC53ZWJwP1gtQW0.webp?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=163f0f98e02da8065531821051e61d93b5639f7871a5377576b78117edc9bc50)

Every open port tells a story — and now Praetorian Guard reads it better than ever.

We've upgraded the service fingerprinting engine inside the Praetorian Guard Platform with Nerva, a ground-up rebuild of how Guard identifies what's running on every port across your attack surface. The same automatic fingerprinting you rely on today is now dramatically faster, more accurate, and covers far more of the modern network landscape.

This matters because knowing a port is open is only half the picture. The real question is: what service is behind it, what version is it running, and is it vulnerable? Nerva answers all three. It launches with over 120 protocol detections — from the usual suspects like SSH, HTTP, and PostgreSQL to industrial control systems, telecom infrastructure, and modern cloud services like Kubernetes and Kafka — and extracts rich metadata including version numbers and configuration details. That information flows directly into Guard's risk engine, enabling automatic CVE correlation and vulnerable service detection across your entire attack surface.

The performance leap is remarkable. Nerva identifies services 4x faster than traditional tools with 99% accuracy, using intelligent port-aware prioritization to test the most likely protocols first. This means your attack surface inventory stays current without introducing scanning bottlenecks, even at scale.

But 120 protocols is just the starting line. Nerva's detection system is fully modular — each protocol is an independent plugin, making it straightforward to add new detections as the landscape evolves. And because Nerva is open-source, the security community can contribute new detections directly, with every submission going through a rigorous audit process before inclusion. This isn't a static capability that ships and stagnates. It's an evergreen detection engine that grows continuously, driven by both our team and the broader community.

For security teams, the impact is immediate: assets that previously showed up as "port 8443 open" now resolve to "Jenkins 2.387.3" or "Kubernetes API v1.28" — with associated CVEs and risk scores already attached. Vulnerable services surface faster, blind spots shrink, and your team spends less time investigating and more time remediating.

Nerva is open-source under Apache 2.0 and available on [GitHub](https://github.com/praetorian-inc/nerva). Read the full technical deep-dive on the [Praetorian blog](https://www.praetorian.com/blog/whats-running-on-that-port-introducing-nerva-for-service-fingerprinting/).
