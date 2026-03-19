---
title: "Data Isolation and Security Controls"
description: "Data Isolation and Security Controls"
featurebaseId: "32729718962715"
---

### **Logical Isolation**

* We leverage **row-level security** and tenant-specific identifiers to ensure data separation in shared environments.
* Access to data is restricted to authorized users within your organization, enforced by stringent application and database-level permissions.

### **Encryption**

* **Data at Rest**: All customer data is encrypted using AES-256 encryption. Each tenant’s data is further protected by unique encryption keys.
* **Data in Transit**: Communications between customers and our platform are secured with TLS to prevent eavesdropping or tampering.
