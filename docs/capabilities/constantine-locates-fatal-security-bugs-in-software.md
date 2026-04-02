---
title: "Constantine: Locates Fatal Security Bugs in Software"
description: "Constantine: Locates Fatal Security Bugs in Software"
featurebaseId: "1856234"
---

**Find Real Vulnerabilities in Source Code Automatically**

Constantine is an autonomous vulnerability discovery and patching engine that connects to a source code repository, analyzes the code, and produces **confirmed vulnerabilities with patches**. It doesn't just flag suspicious patterns it detects, verifies, exploits, and fixes bugs end-to-end, with no human intervention required between stages.

Inspired by the **DARPA AIxCC** competition where autonomous systems competed to find and fix vulnerabilities in real open-source software Constantine applies the winning strategies from that competition at production scale inside the Praetorian Guard Platform.

**Five-Stage Pipeline, One Command**

Constantine runs a linear pipeline that mirrors how an expert security researcher works:

*   **Ingest** Clone the repository, inventory every file, and intelligently prioritize security-relevant code using LLM-based file scoring. Large repositories are automatically chunked for analysis.
    
*   **Detect** A two-pass LLM scanner performs fast triage across all code, then deep investigation on flagged areas. Multiple detection modules run in parallel â€” including an actor/skeptic debate pattern where one model proposes vulnerabilities and another challenges them, promoting only findings that survive scrutiny.
    
*   **Review** An agentic verifier with code exploration tools reads files, searches code, and traces data flows to confirm whether findings are true positives. Taint-aware verification uses pre-computed call graphs to reduce false positives further.
    
*   **Exploit** For every confirmed finding, Constantine generates a proof-of-vulnerability â€” actual input that triggers the bug. An internal loop writes the exploit, runs it in a sandbox, checks the result, and iterates until the bug is demonstrably triggered. A finding without a working exploit stays a hypothesis.
    
*   **Patch** Confirmed, exploitable vulnerabilities get automated patches using a tiered strategy: dependency bumps first, then targeted fixes, then structural refactors. Every patch is validated by re-running the exploit to prove the fix works. This PoV-validated patching strategy achieved a **0.9999 accuracy multiplier** in AIxCC never submit a patch you haven't verified.
    

**Benchmarked Against Real-World CVEs**

Constantine is validated against **28 of the most consequential vulnerabilities in modern software**, including:

*   **Log4Shell** (CVE-2021-44228) Remote code execution in Apache Log4j
    
*   **Heartbleed** (CVE-2014-0160) Information disclosure in OpenSSL
    
*   **Dirty Pipe** (CVE-2022-0847) Privilege escalation in Linux kernel
    
*   **Baron Samedit** (CVE-2021-3156) Heap buffer overflow in sudo
    
*   **regreSSHion** (CVE-2024-6387) Signal handler race condition in OpenSSH
    
*   **Psychic Signatures** (CVE-2022-21449) ECDSA signature bypass in Java
    

**Two Operating Modes**

Constantine runs as a Guard capability in two modes:

*   **Customer repos** Connect to a private repository. Constantine analyzes your code and reports findings as Risks in Guard, fully integrated into your existing triage and remediation workflows.
    
*   **Zero-day hunting** Point at any public repository such as OpenSSL, nginx, Node.js, etc. and watch Constantine find exploitable vulnerabilities. A human reviews and submits to bug bounty platforms or coordinates responsible disclosure.
    

**Plug-and-Play Module System**

Constantine's framework contains zero security knowledge. All intelligence vulnerability detection, exploit generation, patching strategy lives in interchangeable modules. Want a different detection approach? Write a detect module. Want to add fuzzing alongside LLM scanning? Drop it in. Modules run in parallel, compete rather than replace, and can be written in any language â€” Python, Go, Rust, or shell scripts.

An LLM translation layer between stages means modules don't need to agree on a schema. A fuzzer that dumps crash files coexists with an LLM scanner that writes structured JSON, and the transition layer merges both into one coherent picture.

**How It Fits Into Guard**

Constantine runs natively inside the Praetorian Guard Platform as a security capability. Findings flow directly into your Guard dashboard as Risks complete with severity ratings, evidence chains from detection through exploitation, and validated patches. No separate tools to manage. No context switching. Just confirmed vulnerabilities with proof and fixes, delivered where you already work.
