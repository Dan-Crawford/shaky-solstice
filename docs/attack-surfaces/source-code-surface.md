---
title: "Source Code Surface"
description: "Source Code Surface"
featurebaseId: "0881814"
---

## Your Code Is Under Attack Before It Ships

Software doesn't exist in isolation anymore. The average application depends on 500+ open source libraries, runs through automated CI/CD pipelines, and inherits the security posture of every dependency, build tool, and package registry it touches. When any link in that chain is compromised, the vulnerability ships directly to your customers.

This isn't theoretical. In 2024, Sonatype logged over 700,000 malicious open source packages — a 156% increase year-over-year. The XZ Utils backdoor showed that a two-year social engineering campaign could compromise a critical Linux library. The tj-actions/changed-files attack exposed secrets in 23,000 repositories through a single compromised GitHub Action. And 23.8 million secrets were leaked on public GitHub repositories, with 70% of those secrets still active years later.

Guard treats your source code and software supply chain as a distinct attack surface — discovering your repositories, scanning for vulnerabilities and exposed secrets, analyzing CI/CD pipelines for weaknesses, and validating that your code is safe before it reaches production.

---

## Why Source Code Deserves Its Own Attack Surface

### Your code is mostly someone else's code

96% of commercial codebases contain open source software, and 77% of the code within those codebases is open source. You didn't write most of what you ship — and 74% of codebases contain high-risk open source vulnerabilities, a 54% surge from the prior year. 91% of codebases contain components that are 10 or more versions out of date, and the mean age of open source vulnerabilities in codebases exceeds 2.5 years.

You're not just responsible for the code you write. You're responsible for every dependency you import.

### Secrets leak at industrial scale

23.8 million secrets were exposed on public GitHub in 2024 — a 25% year-over-year increase. But the problem isn't just public repositories: 35% of private repositories contain plaintext secrets. And the remediation picture is bleak — 70% of secrets leaked in 2022 are still active today.

Every leaked API key, database credential, cloud access key, and service token is a direct path into your infrastructure. Attackers don't need to find a vulnerability — they just need to find a credential.

### CI/CD pipelines are the new attack vector

Your build system has more access than most of your engineers. CI/CD pipelines routinely hold deployment credentials, cloud provider keys, package registry tokens, and database passwords. When attackers compromise a pipeline — through a malicious GitHub Action, a poisoned dependency, or a compromised maintainer account — they inherit all of that access.

The March 2025 tj-actions/changed-files compromise demonstrated this perfectly: a single compromised Action dumped CI runner memory across 23,000 repositories, exposing secrets from every project that used it.

### AI-generated code amplifies the problem

Over 70% of organizations estimate that 40% or more of their code is now AI-generated. Multiple studies confirm that 62%+ of AI-generated code snippets contain vulnerabilities — buffer overflows, hardcoded credentials, SQL injection, missing input sanitization. AI-generated code introduced 10,000+ new security findings per month by mid-2025, a 10x increase from six months prior.

Your codebase is growing faster than ever, with code that was never reviewed by a human, from tools that have no concept of security context.

### Regulation now requires it

The EU Cyber Resilience Act mandates SBOMs, secure-by-design principles, and vulnerability reporting for all digital products sold in the EU — with fines up to 2.5% of global turnover. US Executive Order 14028 requires machine-readable SBOMs and self-attestation to NIST's Secure Software Development Framework for all federal software vendors. The era of "we'll get to it later" is over.

---

## What Guard Does About It

Guard addresses the source code and supply chain attack surface through five capabilities: **repository discovery**, **vulnerability detection**, **secret scanning**, **CI/CD pipeline analysis**, and **supply chain risk detection**.

### Repository Discovery

Guard integrates with your source code management platforms to automatically discover and inventory every repository in your organization:

|  |  |
| --- | --- |
| **Platform** | **What Guard Discovers** |
| **GitHub** | Organization repositories, member repositories, contributor repositories across organizations — automatically filters out forks |
| **GitLab** | Group projects including sub-groups, member repositories — with parallel scanning for large organizations |
| **Azure DevOps** | Projects and repositories at organization, project, and individual repository levels |
| **Bitbucket** | Workspace repositories, team member repositories — supports both OAuth and app password authentication |

Guard also monitors your repositories for security-relevant events: newly created public repositories and private repositories that have been made public — two of the most common shadow IT exposure patterns.

### Source Code Vulnerability Detection (Constantine)

Constantine is Guard's autonomous source code vulnerability engine. Unlike traditional SAST tools that rely on pattern matching, Constantine uses a five-stage AI-powered pipeline that doesn't just find vulnerabilities — it proves they're exploitable and generates validated patches.

**The Five Stages:**

**1. Ingest** — Acquires the target repository, analyzes the codebase structure, and groups source files into analysis chunks. Supports full repository scans and delta scans (analyzing only commits since the last scan).

**2. Detect** — Multiple detection modules run in parallel to find vulnerabilities:

* **Fast scanning** uses efficient models for broad coverage across all code
* **Deep scanning** uses advanced models for thorough investigation of suspicious patterns
* **Two-pass detection** — first pass identifies candidates cheaply, second pass validates with higher confidence

Detection is language-agnostic — the AI scanner can identify vulnerabilities in any language it can reason about, including memory safety issues, injection flaws, authentication bypasses, cryptographic weaknesses, and logic errors.

**3. Exploit** — For each detected vulnerability, Constantine generates proof-of-vulnerability (PoV) exploit code that demonstrates the issue is real. Exploits are self-contained, runnable, and tested in a sandboxed environment. If the first attempt fails, the pipeline retries with feedback — up to three attempts per vulnerability.

This is the critical differentiator: **every reported vulnerability has been proven exploitable**, not just flagged by a pattern match.

**4. Patch** — For confirmed vulnerabilities, Constantine generates fixes using a tiered strategy:

* **Tier 1: Dependency bump** — If the vulnerability is in a dependency, suggest the version upgrade
* **Tier 2: Simple fix** — Bounds checks, null guards, input validation — minimal code changes
* **Tier 3: Structural refactor** — Deeper architectural changes for complex issues

Every patch is validated: compiled, tested, and re-run against the PoV to verify the fix actually works.

**5. Report** — Produces structured findings with full evidence chains: the vulnerability description, the exploit that proves it, the patch that fixes it, and the validation that confirms the patch works.

**Key Design:**

* **Configurable pipeline** — Stages defined in YAML; you can customize which modules run, set LLM budgets ($100 default, $250 max), and focus on specific vulnerability types
* **Three-tier LLM routing** — Uses efficient models for broad scanning, advanced models for deep analysis, keeping costs predictable
* **Real-time cost tracking** — Per-module and per-stage spending visibility with budget warnings
* **Manual execution only** — Constantine runs when a security operator triggers it, never automatically

Constantine's approach draws from the DARPA AIxCC competition, where PoV-validated patching was the single highest-leverage strategy — the winning team achieved 0.9999 accuracy by proving every finding before reporting it.

### Secret Scanning (Titus)

Titus is Guard's high-performance secret scanning engine, detecting credentials across source code, git history, binary files, and live applications.

**Detection:**

* **487+ detection rules** covering API keys, tokens, passwords, and credentials for hundreds of services (AWS, GCP, Azure, GitHub, Slack, databases, CI/CD systems, and more)
* **Accelerated matching** using Hyperscan/Vectorscan regex engines for high throughput, with pure-Go fallback for portability
* **Full git history scanning** — finds secrets that were committed and later deleted but still exist in history
* **Binary file extraction** — scans inside Office documents, PDFs, archives, APKs, browser extensions, SQLite databases, and Docker image layers

**Validation:**

* **Live secret validation** against source APIs — confirms whether discovered secrets are still active
* **138 validators** (13 native Go validators for complex multi-credential services like AWS STS, plus 125 YAML-based HTTP validators for services like Stripe, Twilio, and Shopify)
* **Three validation states** — Valid (active), Invalid (revoked/expired), Undetermined (cannot verify)

**Output:**

* SARIF format for CI/CD integration with GitHub Advanced Security
* JSON for programmatic processing
* Available as CLI, Go library, Burp Suite extension, and Chrome browser extension

### CI/CD Pipeline Security (Trajan)

Trajan scans your CI/CD pipeline configurations for security vulnerabilities that could enable supply chain attacks:

**Supported Platforms:**

* GitHub Actions
* GitLab CI
* Azure DevOps Pipelines
* Bitbucket Pipelines
* Jenkins
* JFrog

**Vulnerability Categories:**

* **Injection vulnerabilities** — Untrusted input flowing into shell commands, script contexts, or environment variables
* **Supply chain risks** — Artifact poisoning, cache poisoning, AI-assisted supply chain attacks
* **Permission misconfigurations** — Overprivileged workflow permissions, unnecessary write access, missing token restrictions

### GitHub Actions Security (Gato)

Guard includes dedicated GitHub Actions security scanning that goes deeper than configuration analysis:

* **Self-hosted runner detection** — Identifies repositories using self-hosted runners, which can be abused for persistent access
* **PWN request risks** — Detects workflows using `pull_request_target` triggers that can be exploited by external contributors
* **Injection risks** — Finds untrusted data flowing into GitHub Actions expressions
* **Artifact secret scanning** — Discovers hardcoded secrets in GitHub Actions workflow artifacts using pattern-based detection

### Supply Chain Risk Detection

Guard detects supply chain risks through multiple mechanisms:

|  |  |  |
| --- | --- | --- |
| **Capability** | **What It Detects** | **Why It Matters** |
| **Dependency Confusion Scanning** | Identifies packages vulnerable to dependency confusion attacks — where a public package can override a private one | A single dependency confusion vulnerability can inject arbitrary code into your build pipeline |
| **Malicious Package Detection** | Template-based detection for known compromised packages (e.g., Shai-Hulud 2.0 npm worm affecting 25,000+ repositories) | Known-bad packages in your dependency tree are an immediate, actionable risk |
| **Repository Exposure Monitoring** | Detects when private repositories become public and when new public repositories are created | Accidental public exposure of private code is one of the most common — and most preventable — supply chain risks |

---

## The Source Code Assessment Pipeline

```
SCM Integration Connected (GitHub / GitLab / Azure DevOps / Bitbucket)
  │
  ├─→ Repository Discovery ─→ All repos inventoried
  │     ├─→ Organization repos discovered
  │     ├─→ Member/contributor repos discovered
  │     └─→ Public exposure monitored
  │
  ├─→ Titus Secret Scanning ─→ Credentials found
  │     ├─→ Source code scanning (487+ rules)
  │     ├─→ Git history scanning (finds deleted secrets)
  │     ├─→ Binary file extraction (docs, archives, images)
  │     └─→ Live validation (confirms secrets still active)
  │
  ├─→ Constantine Vulnerability Detection ─→ Vulns proven
  │     ├─→ Detect (multi-pass AI scanning)
  │     ├─→ Exploit (proof-of-vulnerability generation)
  │     ├─→ Patch (tiered fix generation + validation)
  │     └─→ Report (findings with full evidence chains)
  │
  ├─→ Trajan CI/CD Analysis ─→ Pipeline risks found
  │     ├─→ Injection vulnerabilities
  │     ├─→ Supply chain risks (artifact/cache poisoning)
  │     └─→ Permission misconfigurations
  │
  ├─→ Gato GitHub Actions Scanning ─→ Actions risks found
  │     ├─→ Self-hosted runner risks
  │     ├─→ PWN request vulnerabilities
  │     └─→ Artifact secret exposure
  │
  └─→ Supply Chain Detection ─→ Dependency risks found
        ├─→ Dependency confusion vulnerabilities
        └─→ Known malicious package detection
```

Each capability produces findings that flow into Guard's unified risk management system — prioritized by severity, tracked through remediation, and correlated with your external, internal, cloud, and application attack surface findings.

---

## What Users See in the Platform

### Repository Inventory

Every discovered repository appears as an asset with:

* Repository URL, organization, and name
* Public/private classification
* Platform (GitHub, GitLab, Azure DevOps, Bitbucket)
* Associated secrets, vulnerabilities, and CI/CD findings

### Vulnerability Findings

Source code findings include:

* **CWE classification** — Which weakness category the vulnerability falls under
* **Severity and verification status** — Whether the vulnerability has been proven exploitable
* **Full evidence chain** — The vulnerable code, the exploit that proves it, and the patch that fixes it
* **File and line number** — Exact location in the codebase
* **Remediation guidance** — Validated patches ready for developer review

### Secret Findings

Secret findings include:

* **Secret type** — API key, token, password, certificate, etc.
* **Service** — Which service the credential belongs to (AWS, Stripe, GitHub, etc.)
* **Validation status** — Whether the secret is still active
* **Location** — File, line number, and commit hash (including deleted commits)
* **Remediation priority** — Active secrets in public repositories are critical

### CI/CD Findings

Pipeline findings include:

* **Vulnerability type** — Injection, supply chain, permission misconfiguration
* **Affected pipeline** — Which workflow, job, or step is vulnerable
* **Attack scenario** — How the vulnerability could be exploited
* **Remediation guidance** — Specific configuration changes to fix the issue

---

## Capability Summary

Guard's source code and supply chain attack surface coverage:

|  |  |
| --- | --- |
| **Phase** | **Capabilities** |
| **Repository Discovery** | GitHub, GitLab, Azure DevOps, and Bitbucket integration with automatic organization-wide discovery, fork filtering, and public exposure monitoring |
| **Vulnerability Detection** | Constantine autonomous five-stage pipeline: detect → exploit → patch → report, with PoV-validated findings and tiered patching |
| **Secret Scanning** | Titus with 487+ rules, Hyperscan-accelerated matching, full git history scanning, binary file extraction, and live secret validation against 138 service APIs |
| **CI/CD Security** | Trajan pipeline analysis across GitHub Actions, GitLab CI, Azure DevOps, Bitbucket, Jenkins, and JFrog — detecting injection, supply chain, and permission vulnerabilities |
| **GitHub Actions** | Gato scanning for self-hosted runner risks, PWN request vulnerabilities, injection risks, and artifact secret exposure |
| **Supply Chain Detection** | Dependency confusion scanning, known malicious package detection, and repository exposure monitoring |

All findings flow into Guard's unified risk management system — so your source code security posture is visible alongside your external, internal, cloud, and application attack surfaces.

---

## Why This Matters Now

The software supply chain is under sustained, industrialized attack. 704,000 malicious packages in a single year. 23.8 million leaked secrets. Build systems compromised through single dependencies. And AI-generated code introducing vulnerabilities at a pace that manual review can't match.

At the same time, regulation is catching up. SBOMs are no longer optional. Vulnerability disclosure timelines are tightening. The EU Cyber Resilience Act imposes real penalties for shipping insecure software.

The organizations that treat their source code as an attack surface — with continuous scanning, validated findings, and automated remediation — are the ones that will ship secure software. The ones that rely on periodic audits and manual code review are building on a foundation they can't see cracks in.

Guard gives you continuous visibility into your source code security posture — from repository discovery through vulnerability detection through secret scanning through CI/CD analysis — so you know what's in your code before it's in your customers' hands.
