---
title: "AI Data Privacy and Tenant Isolation"
description: "AI Data Privacy and Tenant Isolation"
featurebaseId: "0360425"
---

## Overview

Praetorian Guard Platform (PGP) enforces strict data privacy controls around all AI operations. Your data is never shared across tenants, used for model training, or exposed to unauthorized parties — and AI interactions are no exception to these guarantees.

## Tenant Isolation

-   **Strict Tenant Boundaries**: AI operations are scoped to your data partition. The assistant cannot query, access, or reference data belonging to other tenants. Every database operation is filtered by your organization's partition key at the infrastructure level.
-   **No Cross-Tenant Training**: Your data is never used to train, fine-tune, or improve AI models. Conversations and analysis results remain exclusively within your tenant.
-   **Conversation Isolation**: All AI conversations are stored in your encrypted data store, subject to the same encryption-at-rest (AES-256) and encryption-in-transit (TLS 1.3) protections as all other platform data.
-   **Access Control**: AI assistant access is governed by role-based entitlements. Only users with the appropriate permissions can interact with AI features.

## PII Anonymization

Security findings are automatically anonymized before being processed by the AI knowledge system. Sensitive identifiers are replaced with typed placeholders, ensuring the AI reasons about security patterns without exposure to raw sensitive data. Anonymized categories include:

-   Usernames, email addresses, and personal names
-   IP addresses, domain names, and URLs
-   Credentials, passwords, API keys, and tokens
-   Cloud resource identifiers (ARNs) and repository paths
-   Phone numbers, physical addresses, and other PII

Original findings are stored separately from anonymized versions, and anonymization timestamps are recorded for audit purposes.

## Per-User Encryption

-   **Dedicated Encryption Keys**: Each tenant has dedicated AES-256 encryption keys managed through AWS Systems Manager Parameter Store. Sensitive file storage is encrypted with customer-specific keys, not shared infrastructure keys.
-   **Key Isolation**: Encryption keys are generated uniquely per user and stored securely with integrity verification. Keys cannot be accessed by other tenants or by platform administrators without explicit authorization.

## Data Lifecycle

-   **Retention Policies**: AI conversation messages include configurable retention policies, ensuring data is not held beyond operational requirements.
-   **Comprehensive Account Cleanup**: Account deletion workflows remove data across all storage layers — database records, graph relationships, file storage, encryption keys, and identity credentials — ensuring complete data removal upon request.

## Infrastructure Security

-   **AWS Bedrock**: All AI model inference runs through Amazon Bedrock, which provides enterprise security controls including VPC isolation, IAM-based access, and AWS CloudTrail audit logging.
-   **No Data Retention by Model Providers**: Under our AWS Bedrock agreement, prompts and completions are not stored, logged, or used for model training by the model provider. Your data flows through the model and is discarded immediately after generating a response.
-   **Encrypted In Transit**: All communication between PGP and the AI inference layer is encrypted using TLS 1.3.
-   **Regional Data Residency**: AI inference occurs within the same AWS region as your PGP deployment, ensuring your data does not cross geographic boundaries during AI processing.
