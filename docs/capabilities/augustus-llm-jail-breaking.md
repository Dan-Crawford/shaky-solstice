---
title: "Augustus: LLM Jail Breaking"
description: "Augustus: LLM Jail Breaking"
featurebaseId: "9907838"
---

![Augustus: Comprehensive AI Security Testing Now Available](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69b7174b3768ef67737eb92c/019cf339-eff8-7f3c-b66d-a6d4c744e8db/b64u-em9ucWNvZ2tnZi5wbmc_WC1BbXo.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=32d69c84a5dec859133f88e42e883a345216682ee283156743671548ff6e32f0)

**Introducing Augustus**

Praetorian Guard Platform now includes Augustus, a powerful LLM vulnerability scanner designed to help security teams understand and secure their AI attack surface. This new capability brings enterprise-grade security testing to artificial intelligence systems, enabling penetration testers and security professionals to discover vulnerabilities before attackers do.

Augustus works seamlessly with Julius, our LLM fingerprinting tool, to provide complete AI security coverage. Once Julius identifies which AI services are running across your environment, Augustus steps in to test those systems for security weaknesses. This integrated approach means you can discover, assess, and remediate AI vulnerabilities in a single unified workflow.

**Comprehensive Attack Coverage**

The scanner includes comprehensive coverage of modern LLM attack techniques, with over 46 specialized security probes covering everything from classic jailbreak attempts to sophisticated adversarial attacks. Augustus understands the full spectrum of AI security risks, including prompt injection vulnerabilities that could allow attackers to manipulate AI behavior, training data extraction attempts that could expose sensitive information, and encoding evasion techniques that try to slip malicious content past security filters.

Augustus employs 28 distinct detection strategies to identify successful attacks, including advanced techniques like LLM-as-judge evaluation where one AI system helps evaluate the security of another. The scanner also includes five buff transformations for payload obfuscation, allowing security testers to see if their defenses can catch attacks that have been encoded or disguised. This depth of testing capability ensures that vulnerabilities won't slip through the cracks.

**Broad Platform Compatibility**

What makes Augustus particularly powerful is its broad compatibility. The tool works with 19 different LLM providers right out of the box, including major platforms like OpenAI, Anthropic Claude, Azure OpenAI, AWS Bedrock, Google Vertex AI, Cohere, Mistral, and Ollama. Whether your organization runs AI services in the cloud or on-premises, Augustus can test them. This provider-agnostic approach means security teams can standardize their AI testing methodology across their entire technology stack, rather than learning different tools for different platforms.

**Enterprise-Ready Reporting**

For enterprise security workflows, Augustus generates detailed evidence in multiple formats including JSON, HTML, and tabular reports. These reports make it easy to share findings with development teams, track remediation progress, and demonstrate compliance with emerging AI governance frameworks. The automated nature of the scanning means security teams can continuously monitor their AI systems without manual intervention, catching new vulnerabilities as code changes or new attack techniques emerge.

**Security and Control**

Augustus is designed with security and control as foundational principles. The scanner operates in a read-only, observation-based mode, sending carefully crafted test prompts to your AI systems and analyzing the responses to determine if vulnerabilities exist. Augustus does not modify your AI models, change configurations, or take any autonomous actions against your systems. It simply asks questions and listens to the answers, much like a security researcher would during a manual assessment.

When Augustus runs, it only interacts with the specific AI endpoints you have authorized for testing within Praetorian Guard Platform. The tool cannot reach beyond your defined scope, and all testing activity is logged and auditable within the platform. Your security team maintains complete visibility into what Augustus is testing, when tests occur, and what results are generated. This transparency ensures that AI security testing fits seamlessly into your existing governance and change management processes.

It is worth noting that Augustus itself does not use AI to make decisions about your environment or take remediation actions. While the scanner does employ LLM-as-judge techniques to help evaluate whether certain attack attempts succeeded, this evaluation happens in an isolated context purely for classification purposes. The judgment calls about what to fix and how to prioritize remain entirely with your security team. Augustus provides the evidence and insights; humans make the decisions about what happens next.

**Unified AI Security View**

Augustus represents a significant step forward in AI security for the Praetorian Guard Platform, bringing our total security scanning capabilities to 87 distinct tools. Security teams can now confidently deploy AI systems knowing they have the same rigorous testing available for artificial intelligence that they have always had for traditional web applications and infrastructure.

You will find Augustus results integrated directly into the Praetorian Guard Platform UI alongside Julius fingerprinting data, making it easy to see which AI services are exposed and which ones have security concerns requiring attention. This unified view helps security teams prioritize their remediation efforts and maintain a comprehensive picture of their AI attack surface.
