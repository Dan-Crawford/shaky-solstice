---
title: "Standard Operating Procedure (SOP) for Continuous Internal Security Testing"
description: "Standard Operating Procedure (SOP) for Continuous Internal Security Testing"
featurebaseId: "2250032"
---

## **Purpose and Scope**

This Standard Operating Procedure (SOP) document outlines Praetorian's methodology for conducting continuous internal security testing. This ongoing service proactively identifies, evaluates, and demonstrates viable attack paths within an organization's environment, with a specific focus on those that could compromise critical assets ("crown jewels").

## **Testing Procedures**

The testing procedures consist of three primary components that form the core of our continuous security testing methodology:

### 1\. Continuous Monitoring Approach

The Praetorian engineering teams maintain persistent access within the client environment through deployed agents, enabling continued monitoring of environment activities and changes. This approach allows for the timely identification of new attack paths or security control modifications that could impact the organization's security posture. The monitoring is conducted with minimal impact on environmental performance and operational activities.

### 2\. Attack Path Analysis

Praetorian employs systematic enumeration and evaluation of potential attack paths within the client's environment. This covers attack surfaces across people, processes, and technology that adversaries could leverage. Each identified path undergoes thorough technical validation to confirm its viability and potential impact on critical assets.

### 3\. Attack Path Demonstration

Following the identification and analysis of attack paths, Praetorian teams conduct controlled demonstrations of critical paths to provide concrete evidence of risk. These demonstrations are executed within strict safety parameters and with appropriate approvals to prevent any adverse impact on the client environment. Each demonstration is thoroughly documented to support remediation efforts and improve defensive capabilities.

### 4\. Material Risk Signal

The continuous internal security testing process identifies vulnerabilities that, if exploited, could significantly impact the client's operations. To reduce noise and increase actionability, the PGP platform surfaces only critical and high-risk vulnerabilities that represent material risk to the business. This filtering approach helps security teams prioritize remediation efforts on the most consequential security gaps.

However, Praetorian may also surface additional vulnerabilities that do not meet the high/critical threshold if they are part of an identified attack path or if remediation is deemed important for overall security posture.

**Roles and Responsibilities**

### 1\. Praetorian Engineering Team

The engineering team consists of experienced security professionals responsible for executing continuous internal security testing activities. Team members communicate regularly with client stakeholders and ensure all activities align with agreed-upon parameters and safety measures.

### 2\. Client Security Team

The client security team is the primary point of contact for operational matters and receives continued updates on identified risks. They coordinate internal remediation efforts, approve and authorize engagement actions, and provide necessary access or information to support testing activities. Additionally, Praetorian will make best-efforts attempts to remove testing artifacts but the client security team is the final responsible party.

Communication channels and points of contact are established during the initial engagement setup and maintained throughout the subscription period to ensure efficient information flow and rapid response to high-impact findings that pose a material risk to the client.

## **Operational Framework**

### 1\. Initial Setup and Prerequisites

This phase includes defining specific testing boundaries and confirming technical prerequisites are met.

-   Praetorian, in coordination with the client security team will provision a secure file store for collaboration.
-   Praetorian will establish a real-time communication medium (e.g., Slack or MS Teams).

The client must deploy the Praetorian PGP Aegis Agent (for detailed information about deploying the agent, please refer to the [Agent Deployment Guide)](https://docs.praetorian.com/hc/en-us/articles/33312229744155) and also provide Praetorian with a low-privileged domain user account for authenticated testing.

These credentials should be uploaded to the secure file store project space that Praetorian provisions for the project.

### 2\. Testing Methodology

The methodology follows a structured approach that prioritizes the safety of client environments while ensuring thorough coverage of potential attack vectors. This includes careful testing of identified paths and validation of security controls.

### 3\. Risk Identification and Notification Protocols

Material risk findings are timely communicated to designated client contacts through established channels, with Slack being the primary medium. This includes detailed technical information and potential impact assessments to support rapid response efforts.

### 4\. Deconfliction Procedures

Clear procedures are established to prevent testing activities from interfering with legitimate business operations or triggering unnecessary security responses. Throughout the engagement, Praetorian maintains a comprehensive list of Indicators of Compromise (IoCs) and attribution artifacts used during testing activities. The maintained list, available within the PGP platform portal, enables client security teams to properly attribute testing activities and avoid unnecessary investigation of authorized testing.

## **Communication Protocols**

The PGP platform serves as the primary mechanism for tracking and documenting identified vulnerabilities, providing timely visibility into testing progress, findings and deconfliction data.

## **Safety and Control Measures**

Environmental protection measures include specific controls to prevent adverse impacts on client systems and networks. Testing limitations are clearly defined and documented within an accompanying Rules of Engagement document, with explicit approval requirements for high-risk activities.

Activities that fall outside the agreed-upon scope are strictly prohibited, and any potential expansion of scope requires formal approval through designated channels.

**Deliverables and Reporting**

All findings are documented through continued updates in the PGP platform, providing detailed technical information, impact assessments, and recommended remediation steps.

Validation procedures are conducted following client remediation efforts to confirm the effectiveness of implemented controls and update risk assessments accordingly.

## **Escalation Procedures**

Should you need to escalate concerns, questions, or issues regarding the service, follow this escalation path:

1.  **Primary Contact**: Praetorian engineering team
    1.  Response time: Within 4 business hours
    2.  Contact method: Dedicated Slack channel or agreed Instant Messenger platform
2.  **Secondary Contact**: Account Manager
    1.  For business or account related issues
    2.  Contact method: Direct email or scheduled call (contact details in contractual documents, Slack and Box)
3.  **Leadership Escalation**: VP of Managed Security Services
    1.  For critical issues requiring executive attention
    2.  Contact method: Dedicated Slack channel, email or scheduled call (contact details in contractual documents, Slack and Box)

All escalation paths will acknowledge receipt within 4 business hours and provide an estimated resolution timeline.

## **Appendices**

### Contact Information

Key contacts for both Praetorian and client teams, including emergency escalation procedures and after-hours contact details are provided within the contractual agreement documents, Box and Slack channel.

## **Reference Documents**

Additional documentation and resources that support the testing process, including technical guidelines and best practices.

-   [Agent Deployment Guide](https://docs.praetorian.com/hc/en-us/articles/33312229744155)
    
-   [Rules of Engagement](https://docs.praetorian.com/hc/en-us/articles/34369482800795)
