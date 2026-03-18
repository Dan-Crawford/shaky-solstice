---
title: "Microsoft Azure Integration - Overview (Deep Dive)"
description: "Microsoft Azure Integration - Overview (Deep Dive)"
featurebaseId: "39513267985051"
---

## Overview

PGP integrates with Microsoft Azure using OpenID Connect (OIDC) federation with Azure Entra ID (formerly Azure Active Directory) to provide secure, temporary access to your Azure resources. This means no client secrets or long-term credentials are needed, significantly improving security. The integration is supported at both tenant-level and subscription-level access.

## How the Security Architecture Works

PGP uses a secure OIDC-based authentication pattern that wo
