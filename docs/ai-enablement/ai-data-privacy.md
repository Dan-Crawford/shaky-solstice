---
title: "AI Data Privacy"
description: "AI Data Privacy"
featurebaseId: "7619219"
---

## Overview

Guard's AI capabilities — the AI Assistant, Aurelius agent system, and automated agents — are powered by large language models running on AWS infrastructure. This document describes what data the AI models use, what they have access to, how customer data is protected, and what controls are available to manage AI features.

This article is intended for security teams, data privacy officers, and compliance stakeholders who need to evaluate Guard's AI features against their organization's data governance policies.

## LLM Provider and Infrastructure

### Provider

All AI inference runs through **Amazon Bedrock**, AWS's managed foundation model service. Guard does not operate its own models or send data to third-party AI providers outside of AWS.

### Models Used

**Function**

**Model**

**Provider**

AI Assistant & Agent operations (Aurelius)

Claude Opus

Anthropic (via Bedrock)

OSINT lookups

Claude Haiku 4.5

Anthropic (via Bedrock)

Audit log summarization

Ministral 8B Instruct

Mistral AI (via Bedrock)

All models are accessed through the Bedrock Converse API. Guard does not fine-tune or host custom model weights.

### Network Path

All Bedrock API requests traverse a **private VPC endpoint** — traffic between Guard's compute infrastructure and Bedrock never leaves the AWS network and never crosses the public internet. This is enforced at the infrastructure level via a private interface VPC endpoint configured in the platform's CloudFormation templates.

## What Data the AI Models Receive

### Data Included in AI Prompts

When a user interacts with the AI Assistant or an agent executes an operation, the following data may be sent to the model:

*   **System prompts** — Pre-built instruction templates that define agent behavior, rules of engagement, and operational constraints. These are static and do not contain customer data.
    
*   **Conversation messages** — The user's questions and previous AI responses within the current conversation thread.
    
*   **Tool results** — When the AI queries your security database, the results (asset names, domain names, IP addresses, finding descriptions, severity ratings, port information, and technology identifiers) are returned to the model as context for generating responses.
    

### Data NOT Sent to the Model

*   **Raw credentials or secrets** — Scanning agents (e.g., Titus) store secret findings in the platform database but do not pass raw credential values through AI prompts.
    
*   **Other customers' data** — Tenant isolation (described below) prevents any cross-account data from entering AI prompts.
    
*   **Customer identity metadata** — The only metadata sent to Bedrock is an attribution field identifying which agent made the request (e.g., `agent/aurelius`). No customer ID, tenant ID, account name, or user identity is included in the Bedrock request metadata.
    

### RAG Anonymization

Guard's Retrieval Augmented Generation (RAG) system — used to enrich AI responses with knowledge base content — applies **automated anonymization** before storing any finding data in the vector database. The following data types are replaced with generic placeholders before storage:

*   Email addresses, phone numbers, names, and physical addresses
    
*   Credentials, tokens, API keys, API secrets, and passwords
    
*   URLs, IP addresses, domain names, and GitHub repository references
    
*   AWS ARNs and cloud resource identifiers
    
*   Role names and organizational identifiers
    

Only the anonymized text is stored in the vector database and used for semantic search. Original text is processed transiently for anonymization and is not persisted in the RAG system.

## Tenant Isolation

All AI conversations and data access are strictly isolated to the authenticated user's account:

*   **Conversation storage** — Every conversation and message is stored in DynamoDB with a partition key scoped to the individual user and tenant. There is no shared conversation space between accounts.
    
*   **Database queries** — When the AI queries the security graph database, queries are scoped to the authenticated user's account. An agent operating on behalf of Customer A cannot access Customer B's assets, risks, or findings.
    
*   **Agent execution** — Agent operations (scanning, reconnaissance, offensive testing) are bound to the assets present in the requesting user's account. The Rules of Engagement enforce strict scope: agents cannot operate against assets outside the platform's inventory for that account.
    

## AI Feature Controls

Guard provides three account-level feature flags that control AI capabilities. These can be configured per customer account by Praetorian operators via the Settings page:

**Control**

**What It Does**

**Default for Customers**

**AI Inference**

Master switch for all AI features. When disabled, the AI Assistant returns a 403 response and no data is sent to any model.

Enabled

**AI Training**

Controls whether account data can be used for model training. When disabled, the platform sets a NoTrain flag that excludes the account's data from any training pipeline.

**Disabled (opted out)**

**AI Agents**

Controls whether customers can use Agent mode (Aurelius and specialist agents). When disabled, customers can only use the query-based AI Assistant.

Disabled

### Role-Based Access

AI features require the `conversation_ai` entitlement, which is granted based on user role. Agent mode additionally requires the **Analyst** or **Admin** role. Users without sufficient permissions cannot access AI features regardless of account-level flag settings.

## Model Training and Customer Data

### Guard's Training Policy

**Customer data is not used for model training by default.** The platform's training pipeline automatically excludes all non-Praetorian accounts. This means:

*   Customer conversation data is excluded from any model training or fine-tuning
    
*   Customer security findings, assets, and risk data are not used to improve models
    
*   The **AI Training** flag provides an additional explicit control that customers can verify is disabled
    

### AWS Bedrock's Training Policy

AWS Bedrock does not use customer inputs or model outputs to train or improve foundation models. This is a core AWS Bedrock service commitment. From the [AWS Bedrock FAQ](https://aws.amazon.com/bedrock/faqs/):

> _"Amazon Bedrock doesn't use any inputs or outputs to train Amazon Bedrock base models or distribute them to other parties. Your data used with Amazon Bedrock, including your prompts and responses, remains in your AWS account."_

This means customer data benefits from two layers of training protection: Guard's own NoTrain flag and AWS Bedrock's service-level commitment.

## Conversation Data Management

AI conversations (user messages, AI responses, tool execution logs) are stored in DynamoDB within the customer's tenant partition. Users can delete individual conversations at any time through the AI Assistant interface — deletion is cascading and removes the conversation record and all associated messages.

## Summary

**Question**

**Answer**

Where does AI inference run?

AWS Bedrock, via private VPC endpoint (no internet transit)

Which models are used?

Anthropic Claude (Opus, Haiku) and Mistral (Ministral 8B) via Bedrock

Is customer data used for training?

No — opted out by default at both the Guard and AWS Bedrock levels

What data does the model see?

Conversation text, system prompts, and tool results (assets, risks, findings from your account only)

Is data shared between customers?

No — strict tenant isolation via partitioned storage and scoped database queries

Can AI features be disabled?

Yes — the AI Inference flag disables all AI features at the account level

Is sensitive data anonymized?

Yes — the RAG system anonymizes PII, credentials, and infrastructure identifiers before vector storage

Can customers delete AI data?

Yes — conversations can be deleted at any time through the AI Assistant
