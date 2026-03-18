---
title: "Transport Security"
description: "Transport Security"
featurebaseId: "8308705"
---

At Praetorian, the confidentiality and integrity of data in transit are of paramount importance. To safeguard sensitive information during communication, we implement the latest advancements in transport security, with a focus on Transport Layer Security (TLS) 1.3. Here's how we ensure secure and reliable communication across our platforms and services:

### 1\. **Protocol Upgrades**

-   **Adopting TLS 1.3:** We exclusively use TLS 1.3 for transport security, the latest and most secure version of the TLS protocol. It eliminates outdated features like RSA key exchange and weak ciphers, ensuring a streamlined and robust security posture.

### 2\. **Encryption in Transit**

-   **Perfect Forward Secrecy (PFS):** TLS 1.3 mandates ephemeral key exchanges, ensuring that even if a private key is compromised, past sessions remain secure.
-   **Secure Ciphers:** Only the strongest cipher suites, such as AES-GCM and ChaCha20-Poly1305, are enabled to protect against cryptographic vulnerabilities.

### 3\. **Authentication and Trust**

-   **Strict Certificate Validation:** We leverage Certificate Authority Authorization (CAA) DNS records and strict validation practices to ensure certificates are issued only by trusted providers.
-   **Mutual TLS (mTLS):** For critical internal services, we implement mTLS to ensure both parties in a connection are authenticated, adding an extra layer of security.

### 4\. **Performance and Efficiency**

-   **Reduced Handshake Latency:** TLS 1.3’s simplified handshake process decreases connection setup time, enhancing the user experience without compromising security.
-   **Zero Round-Trip Time (0-RTT):** Where applicable, we utilize 0-RTT for faster reconnections, ensuring efficient performance while mitigating replay attacks with additional safeguards.

### 5\. **Compliance and Governance**

-   **Strong Compliance Standards:** Our TLS 1.3 implementation adheres to stringent industry compliance standards, including PCI DSS, GDPR, and SOC 2.
-   **Continuous Monitoring:** We actively monitor compliance with evolving regulatory requirements to ensure our security posture remains ahead of the curve.

### 6\. **Monitoring and Incident Response**

-   **Real-Time Threat Detection:** Integrated monitoring systems detect anomalies in TLS traffic, such as downgrade attempts or suspicious activities.
-   **Comprehensive Logging:** Detailed logs of TLS handshake and session activities are maintained for auditing and rapid response to potential threats.
