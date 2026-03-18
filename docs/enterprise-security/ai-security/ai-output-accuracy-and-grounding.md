---
title: "AI Output Accuracy and Grounding"
description: "AI Output Accuracy and Grounding"
featurebaseId: "9319341"
---

## Overview

Praetorian Guard Platform (PGP) employs multiple techniques to ensure AI-generated insights are grounded in your actual platform data rather than assumptions or fabricated information. These controls work together to maximize the accuracy and reliability of AI outputs.

## Knowledge Retrieval and Grounding

-   **Data-Driven Responses**: The AI assistant queries your assets, vulnerabilities, and configurations directly rather than relying on memory or assumptions. All data-dependent responses are backed by real-time queries to your tenant's data store.
-   **Confidence-Scored Retrieval**: The platform's knowledge retrieval system assigns similarity scores to every piece of information surfaced by the AI. Results below configurable confidence thresholds are filtered out, reducing the likelihood of low-quality or irrelevant information reaching your analysis.
-   **Source Attribution**: Each retrieval result includes provenance metadata linking it back to the original source data — including unique identifiers, timestamps, and categorization information. This creates an auditable chain from AI output back to verified platform data.

## Structured Output Validation

-   **Schema Enforcement**: When the AI produces structured data (risk assessments, asset classifications, query results), outputs are validated against strict JSON schemas. Invalid outputs trigger automatic correction with retry logic, ensuring you always receive well-formed, schema-compliant data.
-   **Field Whitelisting**: AI-initiated queries are validated against a comprehensive whitelist of over 200 authorized database fields. This prevents the AI from referencing fields that do not exist, eliminating an entire class of data integrity errors.

## Operational Grounding

-   **Asset Verification**: The AI is required to verify that target assets exist in the platform and are properly formatted before performing any operations. This prevents actions against non-existent or out-of-scope targets.
-   **Capability Validation**: Before initiating security scans, the AI validates that the requested capability exists and is appropriate for the target asset type. This prevents mismatched or invalid scanning operations.

## Bedrock Safety Integration

-   **Content Safety Monitoring**: PGP monitors AWS Bedrock's built-in content safety signals in real time. When safety filters are triggered, the platform automatically provides appropriate fallback responses rather than passing potentially problematic content to users.
-   **Graceful Degradation**: If the AI model flags content for safety review, the platform responds with clear, informative fallback messages instead of errors or blank responses.
