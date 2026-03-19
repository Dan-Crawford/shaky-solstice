---
title: "Cryptographic & Algorithmic Standards"
description: "Cryptographic & Algorithmic Standards"
featurebaseId: "9582801"
---

At Praetorian, we prioritize implementing cutting-edge security practices and adhering to algorithmic standards that ensure robust encryption, secure communication, and strong data protection. Below is a comprehensive guide to our cryptographic standards, encryption practices, and secure implementations designed to safeguard customer data.

### **Transport Layer Security (TLS)**

-   **TLS Versions**: We require TLS 1.2 or 1.3 for secure communications. Older versions such as TLS 1.0 and 1.1 are not permitted, even if FIPS 140-2 compliant, as they are explicitly disallowed by FIPS 140-3, NIST SP 800-53, and FedRAMP guidelines.
-   **Preferred Algorithms for TLS**:
    1.  **ECDHE-ECDSA-AES256-GCM-SHA384**
    2.  **ECDHE-RSA-AES256-GCM-SHA384**
    3.  **ECDHE-ECDSA-AES128-GCM-SHA256**
    4.  **ECDHE-RSA-AES128-GCM-SHA256**
    5.  **TLS\_AES\_256\_GCM\_SHA384**
    6.  **TLS\_AES\_128\_GCM\_SHA256**

### **Quantum-Safe Cryptography**

-   **Key Encapsulation Mechanism (KEM)**: We recommend **ML-KEM-768**, a NIST-approved quantum-safe algorithm. For FIPS environments, ML-KEM must use a FIPS-certified cryptographic module.
-   **Digital Signatures**: **ML-DSA-65** with a 256-bit random seed is our preferred quantum-safe signature algorithm. In certain contexts, **SLH-DSA** is an alternative, particularly for embedded applications or systems requiring a longer security horizon.

### **Encryption Standards**

#### **Block Ciphers**

-   **AES (Advanced Encryption Standard)**: AES-128 is the minimum, but AES-256 is preferred for "future-proofing" against emerging threats. All implementations must use **Galois Counter Mode (GCM)** for authenticated encryption.
-   **Quantum Resistance**: AES-256 is considered quantum-resistant, making it a cornerstone of our encryption strategy.

#### **Full-Disk Encryption**

-   **Algorithms**: For laptop full-disk encryption, **XTS-AES-128** (256-bit key) or **XTS-AES-256** (512-bit key) are acceptable. These are pre-configured for Praetorian-approved devices running macOS or Ubuntu.

### **Digital Signature Algorithms**

-   **Approved Algorithms**:
    -   **RSA**: Minimum key size of 2048 bits.
    -   **ECDSA**: Minimum key size of 224 bits.
    -   **EdDSA**: **Ed25519** and **Ed448** are approved when certified in the cryptographic module.
-   **Quantum-Safe Signatures**: **ML-DSA-65** is recommended for most use cases, while **SLH-DSA** is suitable for specific applications.

### **Hash Functions**

-   **SHA-2 Family**: SHA-256 is the minimum requirement, with SHA-384 or higher preferred where supported.
-   **Quantum Resistance**: SHA-2-256+ and SHA-3-256+ are considered quantum-resistant.
-   **Disallowed Algorithms**:
    -   **SHA-1**: Permitted only for specific non-cryptographic uses where collision resistance is not required.
    -   **MD5**: Prohibited entirely.

### **Message Authentication Codes (MAC)**

-   **Approved Algorithms**:
    -   **HMAC**: Key length must be 112 bits or greater.
    -   **KMAC**: Used for specific authenticated encryption requirements.
    -   **CMAC and GMAC**: Only used with AES. **HMAC** is preferred for most applications, while GMAC is not recommended for general purposes.

### **Random Number Generation**

-   **/dev/random**: Our standard for secure pseudo-random number generation. It ensures high entropy and aligns with FIPS guidelines.
-   **/dev/urandom**: Used where appropriate. In modern systems (Linux kernel 5.18+), it operates equivalently to /dev/random in FIPS mode.

### **Password Hashing**

-   **Default Algorithm**: **Bcrypt** is used by default with a factor of 10. However, Bcrypt is not FIPS-compliant.
-   **FIPS-Mode Alternative**: **PBKDF2+SHA512** with a key stretching factor of 20,000 is available and preferred in FIPS environments.
-   **Salting**: All passwords are salted with a unique value before hashing to strengthen resistance against brute force and dictionary attacks.

### **Deprecated and Disallowed Algorithms**

-   **DSA**: No longer approved under FIPS 186-5.
-   **SHA-1**: Not allowed for digital signatures or cryptographic functions requiring collision resistance.
-   **MD5**: Prohibited for all uses.

### **Implementation Guidance**

#### **Secure Coding Practices**

-   Our developers follow strict **secure coding guidelines** tailored to the languages and frameworks used in our products.
-   Regular code reviews and security audits ensure adherence to these guidelines.

#### **FIPS-Certified Modules**

-   All cryptographic implementations in FIPS environments use certified modules to ensure compliance with FIPS 140-3.

### **Future-Proofing and Ongoing Commitment**

At Praetorian, we stay ahead of emerging threats by continuously evaluating and updating our cryptographic standards. By integrating quantum-resistant algorithms and adhering to rigorous guidelines, we ensure your data is secure today and prepared for the challenges of tomorrow.

For questions or additional details, please contact us at **security@praetorian.com**. Your security is our mission.
