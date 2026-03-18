---
title: "CICD Pipeline Surface"
description: "Every modern software organization runs code through a CI/CD pipeline — automated systems that build, test, and deploy software on every code change. These pipe"
featurebaseId: "9050941"
---

## Your Build Pipeline Is a Target

Every modern software organization runs code through a CI/CD pipeline — automated systems that build, test, and deploy software on every code change. These pipelines have access to your most sensitive assets: production deployment credentials, code signing keys, cloud provider tokens, and the ability to push code directly to customers.

Attackers have noticed. CI/CD pipelines have become one of the most consequential attack vectors in software supply chain security. A single misconfigured workflow can give an anonymous contributor the ability to exfiltrate every secret in your organization. A compromised GitHub Action used by thousands of repositories can backdoor software at scale. And unlike application vulnerabilities that require exploitation at runtime, CI/CD attacks execute in your own infrastructure, with your own permissions, on your own schedule.

Guard continuously scans your CI/CD pipeline configurations across GitHub Actions, GitLab CI, Azure DevOps, Jenkins, and more — identifying the misconfigurations, injection vectors, and supply chain risks that attackers exploit before they can be used against you.

* * *

## Why This Keeps Happening

### The attacks are real, frequent, and devastating

CI/CD supply chain attacks have moved from theoretical research to front-page incidents:

**tj-actions/changed-files (March 2025)** — A widely-used GitHub Action (23,000+ repositories) was compromised after attackers stole a maintainer's personal access token through a chain of exploits that began with a `pull_request_target` vulnerability in an unrelated project. The attackers modified all version tags to inject code that dumped CI runner memory, exposing secrets in workflow logs. 218 repositories confirmed secret leakage. CISA issued an emergency advisory.

**Shai-Hulud npm Worm (November 2025)** — A self-replicating worm compromised 796 npm packages totaling 20 million weekly downloads — including PostHog, AsyncAPI, and Postman packages. The entry point was a `pull_request_target` workflow misconfiguration that allowed a malicious pull request to exfiltrate CI secrets. Those secrets were used to publish backdoored packages that scanned for credentials using embedded secret scanners. Data from 500+ GitHub users across 150+ organizations was exfiltrated.

**Aqua Trivy (February 2026)** — Aqua Security's Trivy repository (32,000+ stars, 100 million+ annual downloads) was compromised via its own `pull_request_target`\-based workflow. The stolen PAT was used to publish malicious VS Code extension versions that exploited AI coding assistants through prompt injection.

**Codecov (2021)** — Attackers modified Codecov's Bash Uploader script to exfiltrate all environment variables from every CI environment that used it. The compromise went undetected for over two months. Downstream victims included Rapid7, Twitch, and HashiCorp.

**SolarWinds (2020)** — State-sponsored attackers compromised SolarWinds' build pipeline, injecting the SUNBURST backdoor into updates shipped to 18,000+ customers including the US Treasury, Department of Homeland Security, FireEye, and Microsoft.

**CodeQLEAKED (January 2025)** — Praetorian discovered a GitHub token with extensive privileges exposed in debug artifacts of GitHub's own `codeql-action`, potentially enabling code execution in hundreds of thousands of repositories using CodeQL.

These aren't edge cases. Third-party supply chain breaches doubled from 15% to 30% of all breaches between 2024 and 2025. OWASP now ranks supply chain failures as the #3 risk in their 2025 Top 10.

### Pipelines have overprivileged access by default

CI/CD systems are designed for convenience, not security. GitHub Actions grants automatic write tokens to workflows. Self-hosted runners retain state between jobs. Pipeline secrets are available to any step in a workflow unless explicitly restricted. The default configuration of most CI/CD platforms creates exactly the conditions attackers need.

### The attack patterns are well-understood but hard to spot manually

The vulnerability types that enable these attacks are specific to CI/CD:

-   **Workflow injection** — Attacker-controlled input (PR titles, branch names, commit messages) interpolated into shell commands via expression syntax, enabling arbitrary code execution
    
-   **Poisoned pipeline execution (PPE)** — Attacker modifies build configuration or referenced scripts via pull request, causing the pipeline to execute malicious code with elevated privileges
    
-   `pull_request_target` **abuse** — Workflows triggered by `pull_request_target` run with the base repository's secrets but can check out attacker-controlled fork code — the exact pattern behind tj-actions, Shai-Hulud, and Trivy
    
-   **Artifact and cache poisoning** — GitHub does not segregate caches by trust level, allowing a low-privilege job to poison a cache restored by a privileged release job
    
-   **Self-hosted runner persistence** — Non-ephemeral runners retain state between jobs, enabling backdoor installation, credential theft, and internal network access
    
-   **Dependency confusion** — Publishing a malicious public package with the same name as an internal private dependency, exploiting package manager resolution order
    

These patterns exist in YAML configuration files that change with every pull request. No human reviewer can consistently catch them across hundreds of repositories. Guard automates this analysis.

* * *

## What Guard Discovers and Tests

### Multi-Platform Pipeline Scanning

Guard scans CI/CD configurations across six major platforms:

PlatformDetection PluginsAttack ValidationEnumeration

**GitHub Actions**

11

9

Tokens, repositories, secrets

**GitLab CI**

8

3

Tokens, projects, groups, secrets, runners, branch protections

**Azure DevOps**

6

9

Tokens, projects, repos, pipelines, connections, agent pools, users, groups

**Jenkins**

7

3

Access, jobs, nodes, plugins

**Bitbucket Pipelines**

Supported

—

Repositories

**JFrog**

Scan-only

—

—

**32 detection plugins** identify vulnerabilities. **24 attack plugins** validate exploitability. This isn't just static analysis — Guard can confirm whether a detected vulnerability is actually reachable and exploitable.

### Vulnerability Categories Detected

Guard's CI/CD scanner uses graph-based analysis with taint tracking to detect vulnerabilities that static linting tools miss. It builds a dependency graph of your workflows, tracks how untrusted input flows through jobs and steps, identifies security gates that block exploitation, and determines actual exploitability.

**Pipeline Injection Attacks:**

DetectionWhat It FindsWhy It Matters

**Workflow Injection**

Attacker-controlled values (PR titles, branch names, issue bodies) interpolated into shell commands via `${{ }}` expressions

The most common CI/CD attack vector — enables arbitrary code execution in your pipeline with a single pull request

**Pwn Request**

`pull_request_target` workflows that check out fork code and execute it with the base repository's secrets

The exact pattern behind tj-actions, Shai-Hulud, and Trivy compromises

**Review Injection**

Code review triggers combined with unsafe operations that allow reviewers to execute arbitrary code

Bypasses the assumption that code review is a security control

**Include Injection**

Remote file inclusion in GitLab CI configurations that can be controlled by attackers

Enables pipeline hijacking through external dependency manipulation

**Supply Chain Risks:**

DetectionWhat It FindsWhy It Matters

**Unpinned Actions**

Actions referenced by mutable version tags instead of commit SHA pins

A tag can be silently updated to point to malicious code — exactly how tj-actions was weaponized

**Known Vulnerable Actions**

Actions with published CVEs or known compromise history

Identifies immediate risk from actions your pipelines already depend on

**Artifact Poisoning**

Workflows where untrusted artifacts from PRs are consumed by privileged jobs

Cache and artifact boundaries don't enforce trust separation by default

**Cache Poisoning**

Low-privilege jobs that can poison caches restored by privileged release workflows

Enables persistent backdoors that survive across workflow runs

**Dependency Confusion**

Internal package names shadowed by malicious public packages

Exploits package manager resolution order to substitute attacker-controlled code

**Permission and Configuration Issues:**

DetectionWhat It FindsWhy It Matters

**Excessive Permissions**

Workflows with `write-all` or unnecessary permission grants

Violates principle of least privilege — amplifies blast radius of any compromise

**Self-Hosted Runner Risks**

Public repositories using non-ephemeral self-hosted runners

Any contributor can execute code on your internal infrastructure

**Secrets Exposure**

Secrets available in contexts where they shouldn't be (PR workflows, inherited secrets in reusable workflows)

Leaked secrets enable lateral movement across your entire CI/CD estate

**Token Exposure**

CI tokens accessible in untrusted workflow contexts

The `GITHUB_TOKEN` alone can modify code, create releases, and access private repositories

**TOCTOU Race Conditions**

Time-of-check/time-of-use gaps between approval and execution

Allows approved PRs to be modified between review and merge

**AI-Specific CI/CD Risks:**

DetectionWhat It FindsWhy It Matters

**AI Token Exfiltration**

Workflows exposing LLM API keys to untrusted contexts

AI tokens can be expensive and grant access to sensitive model interactions

**AI Code Injection**

AI coding assistants executing untrusted code suggestions in CI

Emerging attack vector where prompt injection in PRs triggers malicious code execution

**AI MCP Abuse**

Model Context Protocol tools with excessive CI/CD permissions

New attack surface where AI agents can be manipulated to abuse CI/CD access

### Graph-Based Analysis

Guard doesn't just pattern-match YAML files. It builds a **full dependency graph** of your CI/CD pipeline:

1.  **Parse** — Normalize workflow YAML across all supported platforms into a unified graph representation
    
2.  **Build** — Create workflow → job → step graphs with dependency relationships, trigger conditions, and data flow edges
    
3.  **Taint** — Track how untrusted input (attacker-controlled PR fields, fork code, external artifacts) flows through the graph
    
4.  **Gate** — Identify security controls (required reviews, branch protection, environment approvals) that block exploitation paths
    
5.  **Detect** — Execute detection plugins against the tainted graph, filtering for actually-reachable vulnerabilities
    
6.  **Validate** — Optionally run attack plugins to confirm exploitability with real API calls
    

This approach eliminates the false positives that plague simpler tools. A workflow injection that's gated behind a required review from a CODEOWNERS team is a different finding than one that's exploitable by any anonymous contributor — and Guard distinguishes between them.

### Repository Security Monitoring

Beyond pipeline configuration, Guard monitors your source code management posture:

CapabilityWhat It DoesWhy It Matters

**Repository Enumeration**

Discovers all repositories across GitHub, GitLab, Azure DevOps, and Bitbucket organizations

Maps the full scope of code assets — including repositories created outside normal processes

**Public Exposure Detection**

Identifies newly-created public repositories and private repositories that were recently made public

Catches accidental code exposure before sensitive data leaks

**Secret Scanning**

Scans full git commit history for API keys, passwords, tokens, and certificates with live validation

Exposed credentials are the entry point for the attacks described above — live validation confirms whether they're still active

**GitHub Actions Artifact Scanning**

Searches workflow artifacts for hardcoded secrets in cached build outputs

Finds secrets that survive in CI artifacts long after the workflow that created them has finished

**Dependency Confusion Detection**

Identifies internal packages that could be shadowed by public registry packages

The attack that breached Apple, Microsoft, PayPal, and 35+ other companies in 2021

### Internal CI/CD Assessment

For organizations running internal GitLab instances, Guard's agent-based scanning provides:

-   **GitLab Personal Access Token discovery** — Searches internal GitLab projects for leaked PATs, validates them against the API, and extracts metadata including scope, owner, admin status, and organizational access
    
-   **Internal pipeline scanning** — The same CI/CD scanning engine runs against self-hosted GitLab, Jenkins, and Azure DevOps instances accessible from inside your network
    

* * *

## How It All Connects

```
Source Code Management Integration
  │
  ├─→ Repository Enumeration ─→ All repos discovered across platforms
  │     │
  │     ├─→ CI/CD Pipeline Scanning ─→ Workflow configs analyzed
  │     │     ├─→ Graph construction ─→ Dependency and data flow mapped
  │     │     ├─→ Taint tracking ─→ Untrusted input flows identified
  │     │     ├─→ Gate detection ─→ Security controls evaluated
  │     │     └─→ Vulnerability detection ─→ Exploitable misconfigs found
  │     │           ├─→ Injection vectors (workflow, include, review)
  │     │           ├─→ Supply chain risks (unpinned, vulnerable, poisoned)
  │     │           ├─→ Permission issues (excessive, exposed secrets)
  │     │           └─→ AI-specific risks (token exfil, code injection)
  │     │
  │     ├─→ Secret Scanning ─→ Full commit history analyzed
  │     │     └─→ Live validation ─→ Active credentials confirmed
  │     │
  │     └─→ Public Exposure Detection ─→ Newly-public repos flagged
  │
  └─→ Dependency Confusion Scanning ─→ Shadowed packages identified
```

Every finding feeds into Guard's unified risk model alongside external and internal findings — giving security teams a complete picture of their exposure across all attack surfaces.

* * *

## What Users See in the Platform

### Pipeline Vulnerability Findings

Each CI/CD finding includes:

-   **Vulnerability type** — Injection, pwn request, artifact poisoning, etc.
    
-   **Severity and confidence** — Based on exploitability analysis and gate detection
    
-   **Attack complexity** — Zero-click (no user interaction) through high complexity
    
-   **Affected workflow** — Exact file path, job name, and step with line numbers
    
-   **Trigger type** — Which event triggers the vulnerable workflow
    
-   **Gate analysis** — Whether security controls (required reviews, branch protection) reduce exploitability
    
-   **Evidence** — The specific expression, action reference, or configuration that creates the vulnerability
    

### Repository Inventory

All discovered repositories appear as assets with:

-   Platform (GitHub, GitLab, Azure DevOps, Bitbucket)
    
-   Visibility (public, private, internal)
    
-   Pipeline status (which CI/CD platform is configured)
    
-   Secret scanning results
    
-   Pipeline vulnerability count by severity
    

* * *

## Capability Summary

Guard's CI/CD attack surface scanning provides:

CategoryCapabilitiesPlatforms

**Pipeline Scanning**

32 detection plugins with graph-based analysis, taint tracking, and gate detection

GitHub Actions, GitLab CI, Azure DevOps, Jenkins, Bitbucket, JFrog

**Attack Validation**

24 attack plugins that confirm exploitability

GitHub Actions, GitLab CI, Azure DevOps, Jenkins

**Secret Scanning**

Full git history scanning with live credential validation

All Git platforms

**Repository Monitoring**

Enumeration, public exposure detection, dependency confusion scanning

GitHub, GitLab, Azure DevOps, Bitbucket

**AI CI/CD Risks**

Token exfiltration, code injection, MCP abuse, supply chain poisoning detection

GitHub Actions

**Internal CI/CD**

Agent-based scanning for self-hosted GitLab, Jenkins, Azure DevOps

Via Guard agents

The CI/CD attack surface is where software supply chain risk lives. Every workflow that runs on a pull request, every action that's referenced by tag, every secret that's available to a pipeline step — these are the decisions that determine whether an attacker who submits a pull request gets a build log or gets your production credentials.

Guard finds those decisions and tells you which ones to change.
