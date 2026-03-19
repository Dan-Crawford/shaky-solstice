---
title: "Rules of Engagement (RoE) for Continuous Internal Security Testing"
description: "Rules of Engagement (RoE) for Continuous Internal Security Testing"
featurebaseId: "34369482800795"
---

This document outlines the authorized activities and restrictions for PGP Continuous Internal Security Testing provided by Praetorian. All activities will be conducted with the primary consideration being the safety and stability of the client environment.

## **Authorized Activities**

* Conduct password spraying at a maximum rate of one attempt per account per hour for domain accounts
* Execute password-guessing activities using common and vendor-supplied default credentials
* Perform low-volume port scanning and service enumeration
* Exploitation of vulnerabilities that leverage legitimate application functionality and/or misconfigurations
* Enumeration and fuzzing of web applications
* Validation testing of identified credentials and authentication secrets

## **Activities Requiring Explicit Client Approval**

Praetorian will request client approval via the established communication method before taking any of the following actions:

* Exploitation of vulnerabilities with potential adverse impacts such as memory corruption or race conditions
* Network manipulation activities such as name resolution and DHCP poisoning
* Password guessing beyond stated thresholds
* Creation of new accounts
* Changing account passwords
* Editing Active Directory objects
* Spoofing of existing customer or partner identities
* Removal of endpoint security control software such as EPP/EDR

The approval request will include additional context to inform the client on the associated risks and expected outcomes.

Approval must come from an authorized individual with decision-making authority for the specified action. The client should respond to the request within the same communication method within two (2) business days.

**Prohibited Activities**

* No brute force password attacks
* No Denial-of-Service (DoS) attacks
* No introduction of untested/unvetted tools
* No high-risk process activities without Client collaboration

## **Scope Definition**

The service takes an opt-out approach to scope definition. By default, all assets are in scope. Client must provide an explicit list of assets that are out of scope.

## **Out-of-Scope Assets**

Clients must upload a text document “scope-exclusions.txt” to their secure file store (referenced in the [Standard Operating Procedures](https://docs.praetorian.com/hc/en-us/articles/34369103737755-Standard-Operating-Procedure-SOP-for-Continuous-Internal-Security-Testing) documentation). This document should list assets that are out of scope, using IP notation and/or hostnames.

Clients should notify Praetorian of any changes to this document through the established communication method.

**Deviations from the above Standard Practices**

Clients must upload a text document “sop-exceptions.txt” to their Box project folder. This document should state the activity type and the explicit practices.

Clients should notify Praetorian of any changes to this document through the designated Slack channel, email, or other established communication method.
