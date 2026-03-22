---
title: "Julius: LLM Service Fingerprinting"
description: "Julius: LLM Service Fingerprinting"
featurebaseId: "1575720"
---

![Introducing Julius: Open Source LLM Service Fingerprinting](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69b7174a9429121a9ad6de83/019cf336-5373-73dc-b093-9167e8218cf2/b64u-MzduYzhnNWczaS5wbmc_WC1BbXo.png?X-Amz-Expires=3600&X-Amz-Date=20260322T080000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260322%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=8385b4f2f60d92977a41427ca46af5be5f8a8caaee3ee1036874a90d500ca80b)

## **The Growing Shadow AI Problem**

**Over 14,000 Ollama server instances are publicly accessible on the internet right now. A recent** [**Cisco analysis**](https://blogs.cisco.com/security/detecting-exposed-llm-servers-shodan-case-study-on-ollama) **found that 20% of these actively host models susceptible to unauthorized access. Separately,** [**BankInfoSecurity**](https://www.bankinfosecurity.com/exposed-llm-servers-expose-ollama-risks-a-29354) **reported discovering more than 10,000 Ollama servers with no authentication layer—the result of hurried AI deployments by developers under pressure.**

**This is the new shadow IT: developers spinning up local LLM servers for productivity, unaware they’ve exposed sensitive infrastructure to the internet. And Ollama is just one of dozens of AI serving platforms proliferating across enterprise networks.**

**The security question is no longer “are we running AI?” but “where is AI running that we don’t know about?”**

## **What is LLM Service Fingerprinting?**

**LLM service fingerprinting identifies what server software is running on a network endpoint—not which AI model generated text, but which infrastructure is serving it.**

**Julius answers the question: _"Is this HTTP service an LLM?"_ During a penetration test or attack surface assessment, you’ve found an open port. Is it Ollama? vLLM? A Hugging Face deployment? Some enterprise AI gateway? Julius tells you in seconds.**

**Julius follows the Unix philosophy: do one thing and do it well. It doesn’t port scan. It doesn’t vulnerability scan. It identifies LLM services—nothing more, nothing less.**

**This design enables Julius to slot into existing security toolchains rather than replace them.**

## **Introducing Julius**

**Julius is an open-source LLM service fingerprinting tool that detects 17+ AI platforms through active HTTP probing. Built in Go, it compiles to a single binary with no external dependencies.**

## Probes Included in Initial Release:

### Self-Hosted LLM Servers

Service

Port

Detection Method

Ollama

11434

`api/tags` JSON response + **"Ollama is running"** banner

vLLM

8000

`/v1/models` with `Server: uvicorn` header + `/version` endpoint

LocalAI

8080

`/metrics` endpoint containing **"LocalAI"** markers

llama.cpp

8080

`/v1/models` with `owned_by: llamacpp` OR `Server: llama.cpp` header

Hugging Face

3000

`/info` endpoint with `model_id` field

LM Studio

1234

`/api/v0/models` endpoint (LM Studio-specific)

NVIDIA NIM

8000

`/v1/metadata` with `modelInfo` + `/v1/health/ready`

* * *

### Proxy & Gateway Services

Service

Port

Detection Method

LiteLLM

4000

`/health` with `healthy_endpoints` or `litellm_metadata` JSON

Kong

8000

`Server: kong` header + `/status` endpoint

* * *

### Enterprise Cloud Platforms

Service

Port

Detection Method

Salesforce Einstein

443

Messaging API auth endpoint error response

* * *

### ML Demo Platforms

Service

Port

Detection Method

Gradio

7860

`/config` endpoint with `mode` and `components`

* * *

### RAG Platforms

Service

Port

Detection Method

AnythingLLM

3001

HTML containing **"AnythingLLM"**

* * *

### Chat Frontends

Service

Port

Detection Method

Open WebUI

3000

`/api/config` containing `"name":"Open WebUI"`

LibreChat

3080

HTML containing **"LibreChat"**

SillyTavern

8000

HTML containing **"SillyTavern"**

Better ChatGPT

3000

HTML containing **"Better ChatGPT"**

* * *

### Generic Detection

Service

Port

Detection Method

OpenAI-compatible APIs

Varied

`/v1/models` with standard OpenAI-style response structure

## **What's Next**

**Julius is the first tool release of our “The 12 Caesars” open source tool campaign where we will be releasing one open source tool per week for the next 12 weeks. Julius focuses on HTTP-based fingerprinting of known LLM services. We’re already working on expanding its capabilities while maintaining the lightweight, fast execution that makes it practical for large-scale reconnaissance.**

**On our roadmap: additional probes for cloud-hosted LLM services, smarter detection of custom integrations, and the ability to analyze HTTP traffic patterns to identify LLM usage that doesn’t follow standard API conventions. We’re also exploring how Julius can work alongside AI agents to autonomously discover LLM infrastructure across complex environments.**

## **Contributing & Community**

**Julius is available now under the Apache 2.0 license at** [**https://github.com/praetorian-inc/julius**](https://github.com/praetorian-inc/julius)

**We welcome contributions from the community. Whether you’re adding probes for services we haven’t covered, reporting bugs, or suggesting new features, check the repository’s CONTRIBUTING.md for guidance on probe definitions and development workflow.**

**Ready to start? Clone the repository, experiment with Julius in your environment, and join the discussion on GitHub. We’re excited to see how the security community uses this tool in real-world reconnaissance workflows. Star the project if you find it useful, and let us know what LLM services you’d like to see supported next.**

**For more information on Julius, check out the** [**Praetorian Blog**](https://www.praetorian.com/blog/introducing-julius-open-source-llm-service-fingerprinting/)**!**
