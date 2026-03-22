---
title: "AI Settings and Configuration"
description: "AI Settings and Configuration"
featurebaseId: "2643059"
---

## Overview

The Praetorian Guard Platform (PGP) provides granular control over AI capabilities through feature flags managed in the Organization Settings page. Each flag independently controls a layer of AI functionality, allowing administrators to progressively enable AI features based on their organization's comfort level and security requirements.

## Feature Flags

AI capabilities are controlled by four feature flags, accessible under **Settings → Organization** for Praetorian administrators:

### AI Training

**Flag**

disable\_aiml\_training

**Default**

Disabled

**Controls**

Whether PGP can use account data for AI model training and improvement

When enabled, your organization's anonymized security data may be used to improve PGP's AI models. This is opt-in and does not affect the functionality of AI Inference or AI Agents.

### AI Inference

**Flag**

disable\_ai\_inference

**Default**

Enabled (flag absent)

**Controls**

All AI features including the AI Assistant, agent capabilities, and conversation endpoint

This is the master switch for AI. When AI Inference is disabled, the conversation API endpoint returns HTTP 403 and the AI Assistant UI is locked with a message: "AI inference has been disabled for this account." No AI operations of any kind can execute while this flag is active.

### AI Agents

**Flag**

enable\_ai\_agents

**Default**

Disabled (must be explicitly enabled)

**Controls**

Customer access to Agent mode in the AI Assistant (Aurelius and all specialist agents)

This flag unlocks Agent mode for non-Praetorian users. Even with this flag enabled, users must hold an **Analyst** or **Admin** role to access agent functionality. Praetorian operators always have agent access regardless of this flag.

### AI Automation

**Flag**

enable\_ai\_automation

**Default**

Enabled for new customers

**Controls**

Automated background agents (auto-triage, asset affiliation)

Controls whether passive background agents can automatically process data. These agents run without user interaction and handle tasks like finding triage and asset correlation.

## Flag Interaction Matrix

AI Inference

AI Automation

AI Agents

Result

Off

Any

Any

All AI disabled. No AI Assistant, no agents, no automation.

On

Off

Off

AI Assistant in Query mode only. No agents, no automation.

On

On

Off

AI Assistant in Query mode + passive background agents (auto-triage, affiliation).

On

On

On

Full AI: Query mode, automation, and Aurelius agent mode with all specialist agents.

## Role Requirements

Feature

Minimum Role

Additional Requirements

AI Assistant (Query Mode)

Any authenticated user

AI Inference enabled

AI Assistant (Agent Mode)

Analyst

AI Inference + AI Agents enabled

Auto-Triage Agent

System (automatic)

AI Automation enabled

Asset Affiliation Agent

Praetorian only

Manually triggered

## Customer Type Restrictions

**Freemium customers** cannot enable AI Training or AI Inference. These flags are locked for freemium accounts. To access AI capabilities, organizations must be on a Managed, SaaS, Pilot, or Engagement plan.

## Configuring AI Settings

1.  Navigate to **Settings → Organization**
2.  Scroll to the **Praetorian Features** section (visible to Praetorian administrators only)
3.  Toggle the desired AI feature flags using the switches
4.  Changes take effect immediately — no restart or deployment required

Each toggle provides instant UI feedback. If an error occurs during the flag update, the toggle automatically reverts to its previous state.
