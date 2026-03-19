---
title: "Application Attack Surface"
description: "Application Attack Surface"
featurebaseId: "1456718"
---

## Your Applications Are Your Biggest Exposure

Web applications and APIs are the front door to your business — and the most targeted entry point for attackers. The 2025 Verizon DBIR confirms it: 88% of basic web application attacks involve stolen credentials, and vulnerability exploitation as an initial access vector rose 20% year-over-year, now rivaling credential theft.

But it's not just the applications you know about. The average enterprise runs over 2,000 applications, with more than half unsanctioned. Each one — whether it's a customer-facing portal, an internal admin panel, a third-party integration, or a forgotten API endpoint — represents attack surface that needs to be discovered, tested, and monitored.

Guard treats your applications as a distinct attack surface, with purpose-built capabilities for discovering web applications, mapping their endpoints, testing for vulnerabilities, and validating that authentication actually works.

---

## Why Applications Deserve Their Own Attack Surface

### The testing gap is enormous

Only 43% of organizations test for vulnerabilities before release. Only 20% are confident they can detect a vulnerability pre-deployment. And 50% never test applications again after they go live. Meanwhile, the average time-to-exploit for a new vulnerability has dropped to just 5 days — while critical web vulnerabilities take 35-65 days to remediate. That's a 30-60 day window where attackers are faster than defenders.

### APIs are the new perimeter

87% of organizations experienced an API-related security incident in the past year. API attacks have risen 113% year-over-year in daily volume. Yet only 13% of organizations can prevent the majority of API attacks. As applications shift to API-first architectures — microservices, SPAs, mobile backends — the attack surface shifts with them. Traditional web scanners that crawl HTML don't test API authorization logic, and that's where the most dangerous vulnerabilities live.

### Application sprawl creates blind spots

The average enterprise has 975 unknown cloud services running alongside 108 they actually track. 97% of cloud applications in the typical enterprise are shadow IT. Each untracked application is an untested application — and untested applications are where breaches happen.

### Supply chain risk is now OWASP Top 3

The 2025 OWASP Top 10 elevated Software Supply Chain Failures to the #3 position, validated by incidents like the September 2025 npm mass compromise that affected packages with 2.6 billion weekly downloads. Your applications inherit the vulnerabilities of every library and dependency they include.

---

## What Guard Does About It

Guard addresses the application attack surface through a layered pipeline: **discover applications**, **map their endpoints and content**, **test for vulnerabilities**, and **validate authentication and authorization**.

### Application Discovery

Before you can test an application, you need to find it. Guard automatically identifies web applications running on discovered HTTP/HTTPS services:

|  |  |  |
| --- | --- | --- |
|  |  | CapabilityWhat It DoesWhy It Matters |
| **Web Application Discovery** | Detects web applications from HTTP/HTTPS port attributes, validates availability, follows redirects, and filters false positives | Identifies every web application on your attack surface — including the ones nobody told you about |
| **API Surface Enumeration (Vespasian)** | Discovers API endpoints from multiple sources: OpenAPI/Swagger specifications, GraphQL introspection, gRPC reflection, WebSocket detection, WSDL/SOAP services, and JavaScript source code analysis | Maps your complete API attack surface across every protocol — REST, GraphQL, gRPC, WebSocket, and SOAP — including endpoints that aren't documented |

Vespasian uses seven discovery methods running concurrently: specification parsing (OpenAPI, WSDL), protocol introspection (GraphQL, gRPC), WebSocket detection, HTML crawling, and JavaScript analysis that extracts API calls from `fetch()`, `axios`, and `XMLHttpRequest` patterns in client-side code.

### Content Discovery and Crawling

Once applications are identified, Guard maps their complete content:

|  |  |  |
| --- | --- | --- |
|  |  | CapabilityWhat It DoesWhy It Matters |
| **Web Crawling** | Crawls web applications to discover endpoints, directories, and hidden paths using forced browsing and automatic crawl modes | Maps the application's actual surface — every page, every endpoint, every form — including paths that aren't linked from the homepage |
| **Login Detection** | Identifies authentication mechanisms including SSO providers (Okta, PingOne, Entra ID), basic authentication, and username-only login forms | Highlights where credentials are accepted — every login page is a potential credential stuffing target |
| **Screenshot Capture** | Takes full-page screenshots with network activity recording | Provides visual verification and captures JavaScript-rendered content that isn't visible in raw HTML |

Web crawling supports multiple modes: standard crawling, directory brute-forcing for hidden paths, login page discovery, and automatic combined crawling. Crawl sessions run for up to 9 hours to ensure comprehensive coverage of large applications.

### Vulnerability Testing

With the application surface mapped, Guard tests for real security issues across multiple dimensions:

#### Dynamic Application Security Testing (DAST)

|  |  |  |
| --- | --- | --- |
|  |  | CapabilityWhat It DoesWhy It Matters |
| **Enterprise DAST Scanning** | Runs deep crawl-and-audit dynamic security testing against web applications through an enterprise-grade scanning engine | Finds complex vulnerabilities that static analysis misses — injection flaws, authentication bypasses, business logic errors, and server-side issues that only manifest at runtime |
| **Template-Based Vulnerability Scanning** | Scans across HTTP, TCP, DNS, SSL, and custom protocols using continuously updated detection templates | Covers thousands of known CVEs, misconfigurations, default credentials, and exposed admin panels with templates updated as new vulnerabilities emerge |

Enterprise DAST scanning provides deep application testing with automated crawling, session management, and vulnerability verification — the kind of testing that traditionally required a dedicated security engineer.

#### API Security Testing

|  |  |  |
| --- | --- | --- |
|  |  | CapabilityWhat It DoesWhy It Matters |
| **API Authorization Testing (Hadrian)** | Tests REST, GraphQL, and gRPC APIs for OWASP API Security Top 10 vulnerabilities using role-based authorization testing with three-phase mutation patterns | Finds the authorization vulnerabilities that DAST scanners miss — broken object-level authorization, privilege escalation, and cross-role access bypasses that require understanding of application roles and permissions |

API authorization testing covers 7 of the OWASP API Security Top 10 categories:

* **Broken Object Level Authorization (BOLA)** — Can User A access User B's resources? Tested across read, write, and delete operations
* **Broken Authentication** — Are endpoints properly enforcing authentication?
* **Broken Object Property Level Authorization** — Can users modify properties they shouldn't have access to?
* **Broken Function Level Authorization** — Can lower-privilege users access admin functions?
* **Unrestricted Resource Consumption** — Can APIs be abused for denial of service? (GraphQL)
* **Security Misconfiguration** — Are APIs exposing debug endpoints, verbose errors, or unnecessary methods?
* **Improper Inventory Management** — Are deprecated or undocumented API versions still accessible?

Testing uses a three-phase mutation pattern for stateful vulnerabilities: **setup** (create a resource as the victim), **attack** (attempt to access or modify it as the attacker), **verify** (confirm whether the attack succeeded). This proves vulnerabilities rather than just detecting potential issues.

Hadrian supports REST APIs (via OpenAPI/Swagger specs), GraphQL APIs (via introspection or SDL schemas), and gRPC APIs (via Protocol Buffer definitions), with 30+ built-in security test templates and support for custom templates.

#### SQL Injection Testing

|  |  |  |
| --- | --- | --- |
|  |  | CapabilityWhat It DoesWhy It Matters |
| **SQL Injection Reconnaissance** | Comprehensive web application security testing with parameter analysis, technology stack identification, and SQL injection vulnerability assessment | SQL injection remains one of the most impactful vulnerability classes — a single exploitable parameter can expose your entire database |

#### Autonomous Source Code Analysis

|  |  |  |
| --- | --- | --- |
|  |  | CapabilityWhat It DoesWhy It Matters |
| **Source Code Vulnerability Discovery (Constantine)** | Autonomous five-stage pipeline that ingests code, detects vulnerabilities, confirms them with proof-of-vulnerability exploits, generates patches, and produces findings | Goes beyond scanning by actually proving vulnerabilities are exploitable and providing validated patches — eliminating false positives and giving developers actionable fixes |

### Secret and Credential Detection

|  |  |  |
| --- | --- | --- |
|  |  | CapabilityWhat It DoesWhy It Matters |
| **Webpage Secret Extraction** | Scans HTTP responses for exposed API keys, credentials, tokens, and secrets embedded in HTML, JavaScript, and comments | Client-side code frequently contains hardcoded secrets that grant access to backend services, databases, and third-party APIs |
| **Repository Secret Scanning (Titus)** | Scans source code repositories across full git history with 487+ detection rules covering AWS, GCP, Azure, GitHub, Slack, databases, and CI/CD systems, with live secret validation | Exposed credentials in code are the #1 initial access vector — and they persist in git history even after deletion |

### Credential Testing

Guard validates whether your application's authentication is actually stopping unauthorized access:

**24 supported protocols** for authentication testing, including HTTP/HTTPS Basic Auth alongside SSH, RDP, SMB, database protocols, and more.

Key features:

* **Default credential detection** per protocol
* **Rate-limited execution** to avoid account lockouts
* **Manual-only execution** — triggered only by security operators

---

## The Application Assessment Pipeline

```
Port Scanning ─→ HTTP/HTTPS services found
  │
  ├─→ Web Application Discovery ─→ Valid applications identified
  │     │
  │     ├─→ Vespasian API Enumeration ─→ Endpoints mapped
  │     │     ├─→ OpenAPI/Swagger specs parsed
  │     │     ├─→ GraphQL schemas introspected
  │     │     ├─→ WebSocket endpoints detected
  │     │     └─→ JavaScript API calls extracted
  │     │
  │     ├─→ Web Crawling ─→ Pages and directories discovered
  │     │     ├─→ Login Detection ─→ Auth mechanisms identified
  │     │     ├─→ Screenshot Capture ─→ Visual evidence collected
  │     │     └─→ Webpage Secrets ─→ Exposed credentials found
  │     │
  │     ├─→ Enterprise DAST Scanning ─→ Runtime vulnerabilities detected
  │     │
  │     ├─→ Template-Based Scanning ─→ Known CVEs and misconfigs found
  │     │
  │     ├─→ Hadrian API Testing ─→ BOLA, BFLA, auth bypasses found
  │     │
  │     └─→ SQL Injection Testing ─→ Injection vulnerabilities confirmed
  │
  └─→ Constantine Source Code Analysis ─→ Vulnerabilities proven with exploits + patches
```

Each phase feeds the next. Discovered applications are crawled. Crawled pages are scanned for secrets and login forms. Login forms inform authentication testing. Endpoints feed into DAST and API security testing. The result is comprehensive coverage that goes from "what's running?" to "is it secure?" automatically.

---

## What Users See in the Platform

### Web Application Inventory

Every discovered web application appears as an asset with:

* Primary URL and associated URLs
* Technology stack detection
* Authentication mechanism identification (SSO provider, basic auth, etc.)
* Screenshot for visual verification
* Associated API specification (if discovered)

### Vulnerability Findings

Application security findings include:

* **OWASP category** — Which Top 10 category the vulnerability falls under
* **Severity and confidence** — How critical it is and how certain the detection is
* **Full evidence** — Complete HTTP request/response pairs proving the vulnerability
* **Endpoint context** — Which specific URL, method, and parameters are affected
* **Remediation guidance** — What to fix and how

### Scan Management

Application scans provide:

* Real-time status tracking for long-running DAST scans
* On-demand scan triggers for specific applications
* Historical scan results with trend tracking
* Configurable scan intensity (discovery-only vs. full vulnerability testing)

---

## Capability Summary

Guard's application attack surface coverage spans the full assessment lifecycle:

|  |  |
| --- | --- |
|  | PhaseCapabilities |
| **Discovery** | Web application detection from HTTP/HTTPS ports, Vespasian API surface enumeration across 7 discovery methods (OpenAPI, GraphQL, gRPC, WebSocket, WSDL, crawling, JavaScript analysis) |
| **Content Mapping** | Web crawling with directory brute-forcing, login detection (Okta, PingOne, Entra ID, basic auth), screenshot capture |
| **Vulnerability Testing** | Enterprise DAST scanning, template-based multi-protocol vulnerability scanning (HTTP, TCP, DNS, SSL), Hadrian API authorization testing (OWASP API Top 10 across REST/GraphQL/gRPC), SQL injection assessment |
| **Code Analysis** | Constantine autonomous source code vulnerability discovery with proof-of-vulnerability confirmation and patch generation |
| **Secret Detection** | Webpage secret extraction from HTTP responses, Titus repository scanning with 487+ rules and live validation |
| **Authentication Testing** | Multi-protocol credential testing across 24 protocols with default credential detection |

All findings flow into Guard's unified risk management system — prioritized by severity, tracked through remediation, and correlated with your external, internal, and cloud attack surface findings for a complete security picture.

---

## Why This Matters Now

Applications are where your business logic lives, where your customers interact, and where your data flows. They're also where attackers focus their efforts — because application vulnerabilities provide direct access to the things that matter.

The organizations that discover their applications, map their APIs, and test their authorization logic continuously are the ones that find vulnerabilities before attackers do. The ones that rely on annual penetration tests and hope for the best are the ones that end up in breach reports.

Guard gives you continuous application security assessment across your entire portfolio — from discovery through testing through remediation — so your applications are as secure as your business depends on them being.
