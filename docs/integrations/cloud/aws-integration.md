---
title: "AWS Integration"
description: "AWS Integration"
featurebaseId: "1098231"
---

## Overview

The AWS integration enables PGP to perform comprehensive security assessment of AWS environments by discovering assets, analyzing access controls, detecting vulnerabilities, and identifying exposed credentials across your AWS accounts and services.

### What the AWS Integration Provides

The AWS integration delivers multi-layered security assessment capabilities:

*   **Asset Discovery**: Automatically discovers and catalogs all AWS resources across regions (EC2, Lambda, RDS, S3, and 1000+ other resource types)
    
*   **Access Control Analysis**: Maps IAM roles, policies, and trust relationships to identify privilege escalation paths
    
*   **Vulnerability Detection**: Identifies misconfigurations, public exposures, and cloud-specific security issues
    
*   **Credential Scanning**: Searches for hardcoded secrets and credentials in CloudWatch logs, ECR images, and other resources
    
*   **Compliance Monitoring**: Tracks organization policies (SCPs), resource policies, and security best practices
    
*   **Threat Modeling**: Analyzes permission chains and access paths to identify potential attack vectors
    

### Resource Discovery

PGP discovers AWS resources using multiple data sources:

**Cloud Control API**

*   Unified API supporting 2000+ AWS resource types
    
*   Lists resources across all regions automatically
    
*   Handles pagination and rate limiting
    
*   Examples: Lambda functions, RDS instances, EC2 instances, S3 buckets
    

**Service-Specific APIs**

*   IAM: Roles, policies, users, groups, trust relationships
    
*   Organizations: SCPs (Service Control Policies), account structure
    
*   Inspector: Vulnerability assessment findings
    
*   CloudTrail: Audit logs and security events (with optional stealth mode)
    

**Discovery Capabilities:**

*   **NebulaList**: Enumerates resources using Cloud Control API
    
*   **AwsRecon**: Specialized reconnaissance for security-relevant resources
    
*   **Organization Policies**: Discovers SCPs and RCPs across AWS Organizations
    

### Security Analysis

Once resources are discovered, PGP performs deep security analysis:

#### Access Control Analysis (Apollo Module)

*   **IAM Permission Mapping**: Creates graph of all IAM roles, policies, and trust relationships
    
*   **Privilege Escalation Detection**: Identifies permission chains that could lead to elevated access
    
*   **Cross-Account Analysis**: Maps assume-role relationships across accounts
    
*   **Attack Path Modeling**: Uses Neo4j graph queries to find shortest paths to sensitive resources
    

#### Public Resource Detection

*   **S3 Buckets**: Checks bucket policies and ACLs for public access
    
*   **RDS Instances**: Identifies publicly accessible databases
    
*   **Lambda Functions**: Detects functions with public URLs or resource policies
    
*   **EC2 Instances**: Finds instances with public IP addresses and permissive security groups
    

#### Credential & Secret Detection

*   **CloudWatch Logs**: Searches log streams for patterns matching credentials (API keys, passwords, tokens)
    
    *   Scans up to 10,000 events per log stream
        
    *   Processes 10 streams per log group
        
    *   Uses NoseyParker pattern engine
        
*   **ECR Container Images**: Dumps container filesystems and analyzes for embedded secrets
    
*   **Configuration Files**: Examines Lambda environment variables, EC2 user data, and other configuration sources
    

#### Vulnerability Detection

*   **CDK Bucket Takeover**: Identifies missing CDK staging buckets that could be registered by attackers
    
*   **CloudFront S3 Takeover**: Detects distributions pointing to non-existent S3 origins
    
*   **Inspector Findings**: Imports AWS Inspector vulnerability scan results
    
*   **Misconfiguration Detection**: Identifies security best practice violations
    

#### Advanced Analysis

*   **EC2 Screenshot Analysis**: Captures EC2 console screenshots and uses Claude AI to identify sensitive information
    
*   **Resource Policy Analysis**: Examines bucket policies, KMS key policies, and trust relationships for overly permissive access
    
*   **Organization Policy Impact**: Maps SCPs to understand permission boundaries across accounts
    

### Data Storage & Reporting

Security findings are stored in multiple formats for different use cases:

**DynamoDB (model.Asset, model.Risk)**

*   Fast key-value lookups for API queries
    
*   Single-table design for performance
    
*   Real-time updates as scans complete
    

**Neo4j Graph Database**

*   Relationship queries (IAM permission chains, asset dependencies)
    
*   Graph algorithms (shortest path to sensitive resources)
    
*   Complex queries via GraphQL API
    

**S3 (Proof Files)**

*   Detailed evidence in JSON format
    
*   Screenshots and log excerpts
    
*   Audit trail for findings
    

## Customer Resources Accessed

The integration has **read-only access** to the following AWS resources:

### Core Services (via ReadOnlyAccess)

*   **Compute**: EC2 instances, Lambda functions, ECS tasks, EKS clusters
    
*   **Storage**: S3 buckets, EBS volumes, EFS filesystems
    
*   **Database**: RDS instances, DynamoDB tables, ElastiCache clusters, Redshift clusters
    
*   **Networking**: VPCs, subnets, security groups, NACLs, load balancers, CloudFront distributions
    
*   **Container**: ECR repositories and images
    
*   **Serverless**: Lambda functions, API Gateway endpoints, Step Functions
    

### Security & Identity (via SecurityAudit)

*   **IAM**: Users, groups, roles, policies, access keys, trust relationships
    
*   **Organizations**: Organizational units, accounts, SCPs, RCPs
    
*   **Inspector**: Vulnerability findings and assessment targets
    
*   **CloudTrail**: Audit logs (with stealth mode option)
    
*   **GuardDuty**: Threat detection findings
    
*   **Security Hub**: Aggregated security findings
    
*   **CloudWatch Logs**: Log groups and streams for credential scanning
    

### Additional Services (via Custom Permissions)

*   **Account Management**: Account details, alternate contacts
    
*   **AWS Support**: Support case details (for enterprise customers)
    
*   **Well-Architected**: Review findings and recommendations
    
*   **Systems Manager**: SSM parameter metadata
    
*   **Code Services**: CodeArtifact repositories, CodeBuild projects
    
*   **Glue**: Data catalog connections
    
*   **Disaster Recovery**: DRS configuration
    

### Data Access Boundaries

**What is NOT accessed:**

*   ❌ Data inside S3 buckets (only bucket metadata and policies)
    
*   ❌ Database records (only instance metadata and configuration)
    
*   ❌ Application secrets (only metadata showing secret exists)
    
*   ❌ File contents on EC2 instances (only instance metadata)
    
*   ❌ Lambda function code (only configuration and environment variables)
    

**What IS accessed:**

*   ✅ Resource metadata and configuration
    
*   ✅ Access control policies and permissions
    
*   ✅ CloudWatch logs (for credential pattern matching)
    
*   ✅ ECR container image filesystems (for secret scanning)
    
*   ✅ EC2 console screenshots (if enabled)
    
*   ✅ Public exposure status
    
*   ✅ Vulnerability findings from Inspector
    

## How You Benefit

### Security Assessment Capabilities

**1\. Continuous Asset Discovery**

*   Automatically discovers all AWS resources across all regions
    
*   Tracks new resources as they're created
    
*   Maintains up-to-date inventory for compliance and security audits
    
*   **Value**: Eliminates blind spots in your attack surface
    

**2\. Access Control Analysis**

*   Maps complex IAM permission chains
    
*   Identifies privilege escalation paths
    
*   Discovers overly permissive trust relationships
    
*   Analyzes cross-account access patterns
    
*   **Value**: Prevents credential compromise from becoming full account takeover
    

**3\. Vulnerability Detection**

*   Identifies public resources (S3 buckets, RDS instances, Lambda URLs)
    
*   Detects cloud-specific vulnerabilities (CDK takeover, CloudFront takeover)
    
*   Imports AWS Inspector findings
    
*   Flags security best practice violations
    
*   **Value**: Reduces risk of data breaches and unauthorized access
    

**4\. Secret Scanning**

*   Finds hardcoded credentials in logs, containers, and configuration
    
*   Uses NoseyParker pattern engine with 100+ credential patterns
    
*   Scans CloudWatch Logs, ECR images, and other sources
    
*   **Value**: Prevents credential leakage and unauthorized access
    

**5\. Compliance Monitoring**

*   Tracks organization policies (SCPs, RCPs)
    
*   Validates resource policies against security requirements
    
*   Provides audit trail for compliance reporting
    
*   **Value**: Simplifies compliance audits (SOC 2, ISO 27001, PCI DSS)
    

**6\. Threat Modeling**

*   Uses graph analysis to identify attack paths
    
*   Models attacker movement through your environment
    
*   Prioritizes findings based on exploitability and impact
    
*   **Value**: Focuses remediation efforts on highest-risk issues
    

### Technical Advantages

**Least Privilege Access**

*   Read-only permissions minimize risk
    
*   External ID provides additional security layer
    
*   No access to actual data, only metadata
    

**Comprehensive Coverage**

*   Cloud Control API supports 2000+ AWS resource types
    
*   Single integration discovers all resource categories
    
*   Future AWS services automatically supported
    

**Flexible Deployment**

*   Single account or multi-account/organization
    
*   CloudFormation or Terraform templates
    
*   Delegated administrator model for security isolation
    

**Advanced Detection**

*   AI-powered analysis (EC2 screenshot analysis)
    
*   Graph algorithms for attack path discovery
    
*   Pattern matching for credential detection
    

**Extensible Framework**

*   Janus Framework enables adding new AWS capabilities
    
*   Custom detection rules via Nebula modules
    
*   Integration with NoseyParker for evolving threat patterns
    

### Scan Execution

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/696ee0a9f0623ebed68fe956/019bd938-3255-76cd-83b1-f16db734641c/b64u-aW1hZ2UucG5n.png?X-Amz-Expires=3600&X-Amz-Date=20260329T080000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260329%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=57f43e5b2d1678c37bd067701dafc801bd2e7d9e87a7c8fcaf278d4a50442f32)

### Continuous Monitoring

*   **Scheduled Scans**: Automatic daily/weekly/monthly scans
    
*   **Event-Driven**: Optional EventBridge integration for real-time updates
    
*   **On-Demand**: Manual scans via UI or API
    

## Security Considerations

### Access Control

*   **Read-Only**: Integration has no write permissions to customer environment
    
*   **External ID**: Additional security layer beyond account ID
    
*   **Least Privilege**: Only permissions necessary for security assessment
    
*   **Time-Limited**: Temporary STS credentials expire automatically
    

### Data Protection

*   **Metadata Only**: No access to actual data in S3, databases, or files
    
*   **Encrypted Storage**: All findings encrypted at rest in DynamoDB and S3
    
*   **Encrypted Transit**: All API communication uses TLS 1.3
    
*   **Data Isolation**: Multi-tenant architecture ensures customer data separation
    

### Audit & Compliance

*   **CloudTrail Logging**: All PGP API calls logged in customer's CloudTrail (unless stealth mode)
    
*   **Audit Trail**: PGP maintains log of all scans and findings
    
*   **Compliance Frameworks**: Supports SOC 2, ISO 27001, PCI DSS, NIST requirements
    
*   **Data Retention**: Configurable retention policies
    

### Operational Security

*   **No Agents**: No software running in customer environment
    
*   **No Network Changes**: No VPCs, security groups, or network configuration changes
    
*   **No Persistence**: No permanent infrastructure in customer account
    
*   **Revocable Access**: Customer can revoke access instantly by deleting IAM role
    

## Monitoring & Logging

### What to Monitor

**Integration Health**

*   Role assumption success rate
    
*   API call latency and error rates
    
*   Scan completion time
    
*   Resource discovery coverage
    

**Security Findings**

*   New high/critical findings
    
*   Public resource exposure
    
*   Credential leakage detections
    
*   Permission escalation paths
    

**Compliance Status**

*   Policy violation counts
    
*   Resource compliance percentage
    
*   Remediation status
    

### Logging

**PGP Logs**

*   Scan execution logs in PGP platform
    
*   API access logs for audit trail
    
*   Finding generation and risk scoring logs
    

**AWS CloudTrail (Customer Account)**

*   All STS AssumeRole calls from PGP
    
*   All API calls made by assumed role
    
*   Complete audit trail of PGP activity
    

### When to Contact Support

*   Persistent role assumption failures after verifying configuration
    
*   Missing critical resources that should be discovered
    
*   Performance issues with large-scale scans
    
*   Questions about specific findings or recommendations
    
*   Request for custom detection rules or capabilities
    
*   Assistance with multi-account deployment
