---
title: "Reconnaissance Agents"
description: "Reconnaissance Agents"
featurebaseId: "0471171"
---

## Overview

Reconnaissance agents perform passive information gathering and analysis without creating findings or executing attacks. They help you understand your attack surface in depth by analyzing individual assets and discovering cloud infrastructure.

## Asset Analyzer

The Asset Analyzer is Aurelius's reconnaissance specialist. It performs deep-dive security analysis of individual assets, providing a comprehensive security picture that includes risk assessment, technology fingerprinting, attack path mapping, and capability recommendations.

### What It Does

*   Maps all risks, ports, technologies, and relationships associated with a target asset
*   Identifies attack paths and potential lateral movement opportunities
*   Recommends specific scanning capabilities based on the asset's technology profile
*   Provides prioritized assessment of security exposure

### What It Does Not Do

*   Does not create new findings or risks
*   Does not execute scans or active capabilities
*   Does not modify any data in the platform

### Target

Asset entities (domains, IP addresses, cloud resources)

### When to Use

Use Asset Analyzer when you want a full security picture of a specific target before deciding on next steps. It is the ideal first step in an engagement: understand the target before attacking it.

## Aurelian

Aurelian is Aurelius's cloud reconnaissance specialist, named after the Roman emperor who restored the empire's borders. It inventories cloud infrastructure across AWS, Azure, and GCP to discover resources, map environments, and identify targets for further security assessment.

### What It Does

*   Discovers cloud resources across multiple providers (AWS, Azure, GCP)
*   Maps cloud environments including compute instances, storage, networking, and identity configurations
*   Identifies cloud resources that may be missing from the current asset inventory
*   Provides cloud-specific context for attack surface assessment

### What It Does Not Do

*   Does not create vulnerability findings
*   Does not test cloud configurations for security issues
*   Does not modify cloud resources or configurations

### Target

Cloud resource entities (AWS resources, Azure resources, GCP resources)

### When to Use

Use Aurelian when onboarding a new cloud environment or when you suspect your asset inventory is incomplete. It provides the discovery layer that feeds into more targeted scanning operations.

## Impact Level

Both reconnaissance agents are **read-only**. They query existing data and cloud APIs but do not create findings, modify data, or perform any active testing. They are safe to run at any time without risk of impacting production systems.
