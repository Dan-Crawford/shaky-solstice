---
title: "Secrets Management"
description: "Secrets Management"
featurebaseId: "2769454"
---

# At Praetorian, we prioritize the security of your sensitive information.

We leverage **Amazon Secrets Manager** to securely store and manage application secrets, such as API keys, database credentials, and other confidential data. Below is an overview of how we ensure robust security practices when using Amazon Secrets Manager.

## **1\. Secure Storage**

-   **Encryption at Rest**: All secrets stored in Amazon Secrets Manager are encrypted using AWS Key Management Service (KMS) with customer-managed keys (CMKs). This ensures that secrets remain protected even when not in use.
-   **Versioning**: Secrets Manager maintains version control for secrets, allowing rollback to previous versions if necessary while maintaining security controls.

## **2\. Access Control**

-   **Fine-Grained Permissions**: We use AWS Identity and Access Management (IAM) policies to enforce strict access controls. Only authorized applications and users can access specific secrets.
-   **Least Privilege Principle**: Access to secrets is granted based on the principle of least privilege, minimizing the risk of unauthorized access.
-   **Automatic Key Rotation**: We utilize Secrets Manager's built-in functionality to rotate secrets automatically at configurable intervals, reducing the risk of stale or compromised secrets.

## **3\. Secure Retrieval**

-   **AWS SDK Integration**: Applications securely retrieve secrets using the AWS SDKs, which leverage secure communication channels (TLS) to prevent interception during transit.
-   **Audit Logging**: All access to secrets is logged in AWS CloudTrail, providing detailed logs of who accessed secrets and when, enabling monitoring and incident investigation.

## **4\. Secrets Lifecycle Management**

-   **Dynamic Secrets**: For certain use cases, we employ dynamic secrets that are generated on demand, ensuring short-lived credentials that automatically expire after use.
-   **Automated Rotation Policies**: Secrets Manager can automatically rotate secrets for supported AWS services, ensuring continuous security without manual intervention.

## **5\. Monitoring and Alerts**

-   **Activity Monitoring**: Unauthorized access attempts or unusual activity patterns are flagged through AWS CloudTrail and integrated with our monitoring systems for immediate action.
-   **Alerting**: Alerts are configured to notify the security team of any suspicious activities related to secrets access or modifications.

## **6\. Incident Response**

-   **Revocation of Secrets**: In the event of a potential breach, compromised secrets can be immediately revoked and replaced using Secrets Manager's APIs.
-   **Audit and Investigation**: Comprehensive logs and version history enable thorough post-incident analysis to identify root causes and enhance future security measures.
