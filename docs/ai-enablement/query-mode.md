---
title: "Query Mode"
description: "Query Mode"
featurebaseId: "4530230"
---

## Overview

The AI Assistant in Query Mode is the default AI experience in the Praetorian Guard Platform. It provides a natural language interface for querying your attack surface data — asking questions about assets, risks, technologies, and relationships without needing to construct graph queries manually.

Query Mode is designed for information retrieval only. It cannot modify data, execute scans, or perform any active operations. This makes it safe for all users and a natural starting point before enabling more powerful agent capabilities.

## What You Can Ask

The AI Assistant can answer questions about any data in your PGP environment:

*   **Asset inventory** — "How many assets do I have?" / "Show me all domain assets" / "List assets with open port 443"
    
*   **Risk assessment** — "What are my critical risks?" / "Show me the highest priority findings" / "How many open vulnerabilities do I have?"
    
*   **Technology landscape** — "What technologies are running across my assets?" / "Which assets run Apache?"
    
*   **Relationship mapping** — "What ports are open on example.com?" / "Show me risks associated with this IP address"
    
*   **Cloud resources** — "List my AWS resources" / "Show Azure resources with public access"
    
*   **Job status** — "What scans are running?" / "Show me recent scan results"
    

## How It Works

When you send a message in Query Mode, the AI Assistant:

1.  **Activates relevant skills** — Loads domain-specific knowledge for the entity types in your question (risks, assets, ports, technologies, etc.)
    
2.  **Constructs a graph query** — Translates your natural language into a structured query against the Neo4j graph database
    
3.  **Executes the query** — Runs the query with automatic type coercion and validation, limited to 100 results per query
    
4.  **Presents factual results** — Returns exactly what the data shows: counts, values, entity details, and relationships
    

### RAG Enrichment

The AI Assistant also has access to a Retrieval-Augmented Generation (RAG) system that can search two knowledge collections:

*   **Findings** — Historical vulnerability data and remediation guidance from across PGP engagements
    
*   **Knowledge** — Internal knowledge base articles and security best practices
    

RAG results are grounded in actual data using Amazon Titan embeddings and PostgreSQL vector similarity search, ensuring responses are factually anchored rather than hallucinated.

## Strict Output Guidelines

Query Mode enforces strict output constraints to maintain data integrity:

*   Reports **only factual information** directly from query results
    
*   Does **not infer** trends, patterns, or correlations unless explicitly present in the data
    
*   Does **not speculate** about causes, implications, or future outcomes
    
*   Does **not provide** recommendations, action items, or prioritization advice
    

This constraint ensures that Query Mode is a reliable data retrieval tool, not an opinion generator. For analysis, recommendations, and actionable operations, enable Agent Mode.

## Available Tools

Tool

Purpose

Query

Execute graph queries against the Neo4j database for any entity type

Schema

Inspect database schema to understand available fields and relationships

Capabilities

List available security scanning capabilities

RAG

Search similar findings or internal knowledge base

Activate Skill

Load domain-specific knowledge for accurate query construction

Report

Generate formatted security reports from query results

Executive Summary

Generate tenant-level executive summary with risk posture overview

## Accessing the AI Assistant

1.  Click the **AI Assistant** icon in the navigation sidebar
    
2.  The assistant opens in **Query Mode** by default (indicated by a blue badge)
    
3.  Type your question in natural language and press Enter
    
4.  Previous conversations are listed in the sidebar for easy reference
    

## Prerequisites

*   **AI Inference** must be enabled (see AI Settings and Configuration)
    
*   User must be authenticated with any role
    
*   Organization must not be on a Freemium plan
