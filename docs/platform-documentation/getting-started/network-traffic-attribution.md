---
title: "Network Traffic Attribution"
description: "Network Traffic Attribution"
featurebaseId: "2079012"
---

Praetorian Guard Platform (PGP) performs automated security scanning of your external attack surface. Network traffic originating from PGP is attributed using custom HTTP headers and user-agent strings, allowing your security operations team to identify and allowlist PGP scanning activity.

## Finding Your Scan Header

Your unique scan attribution header is available in the PGP UI at **Settings > Scan Header**. This page displays the exact header values used in all outbound scan traffic for your account.

## Attribution HTTP Headers

Every HTTP request made by PGP includes two attribution markers:

**Header**

**Format**

**Example**

`Chariot`

MD5 hash of your account username

`Chariot: 0a3e0025020d1c6ea5e5833304d573b8`

`User-Agent`

`chariot-` prefix + MD5 hash

`User-Agent: chariot-0a3e0025020d1c6ea5e5833304d573b8`

These headers are included in traffic from these scanning capabilities:

-   **Nuclei** (vulnerability detection) — both `Chariot` and `User-Agent` headers
    
-   **Katana** (web crawling) — `Chariot` header
    
-   **Gowitness** (screenshot capture) — `Chariot` header and custom user-agent
    

The MD5 hash is derived from your PGP account username and is consistent across all scans, making it reliable for allowlisting rules.

## Allowlisting Attribution Headers

To allowlist PGP traffic in your WAF, IDS/IPS, or SIEM, create rules matching either:

-   **HTTP header:** `Chariot` header present (any value from your account)
    
-   **User-Agent pattern:** Requests where `User-Agent` starts with `chariot-`
    

You can find the exact values to use on the **Settings > Scan Header** page in PGP.

**Example WAF rule (generic):**

```
# Match on custom header
if request.header["Chariot"] exists then allow

# Or match on user-agent prefix
if request.header["User-Agent"] starts_with "chariot-" then allow
```

## Out-of-Band (OOB) Interaction Server

PGP uses an out-of-band interaction server for detecting blind vulnerabilities such as SSRF, XXE, blind XSS, and SMTP injection. When Nuclei templates test for these vulnerability classes, they embed callback URLs pointing to:

```
oob.guard.praetorian.com
```

**How OOB detection works:**

1.  A Nuclei template sends a crafted payload containing a unique callback URL under `oob.guard.praetorian.com`
    
2.  If the target application is vulnerable, it makes an outbound request to that callback URL
    
3.  The OOB server records the interaction and correlates it with the originating scan
    
4.  PGP reports the confirmed vulnerability with proof of the OOB interaction
    

**Important:** Your target systems may make **outbound** DNS lookups and HTTP requests to `oob.guard.praetorian.com` as part of this validation process. This is expected behavior during a scan.

## Allowlisting the OOB Server

If your environment restricts outbound traffic (egress filtering, DNS firewalls, or proxy rules), you may need to allowlist the OOB server to ensure accurate vulnerability detection:

**Type**

**Value**

**Direction**

DNS

`*.oob.guard.praetorian.com`

Outbound from target systems

HTTPS

`oob.guard.praetorian.com` (port 443)

Outbound from target systems

HTTP

`oob.guard.praetorian.com` (port 80)

Outbound from target systems

**Note:** Blocking OOB traffic will not cause scans to fail, but it will prevent PGP from confirming blind vulnerabilities. This may result in missed findings or unverified results.

## Summary: What to Allowlist

**Item**

**Purpose**

**Direction**

`Chariot` HTTP header

Identify PGP inbound scan traffic

Inbound to your systems

`User-Agent: chariot-*`

Identify PGP inbound scan traffic

Inbound to your systems

`*.oob.guard.praetorian.com`

OOB vulnerability validation callbacks

Outbound from your systems

Your unique header values are always available at **Settings > Scan Header** in PGP. For questions about scan attribution or help configuring allowlist rules, contact your Praetorian engagement team.
