---
title: "Google Cloud Platform Integration - Overview (Deep Dive)"
description: "Google Cloud Platform Integration - Overview (Deep Dive)"
featurebaseId: "39513219549851"
---

## Overview

PGP integrates with Google Cloud Platform (GCP) using Workload Identity Federation with OpenID Connect (OIDC) tokens to provide secure, temporary access to your GCP resources. This means no service account keys or long-term credentials are needed, significantly improving security. The integration is supported at both Organization-level and Project-level access.

## How the Security Architecture Works

PGP uses a secure OIDC-based authentication pattern that works in
