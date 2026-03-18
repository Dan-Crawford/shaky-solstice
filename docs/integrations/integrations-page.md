---
title: "Integrations Page"
description: "Integrations Page"
featurebaseId: "8334630"
---

The integrations page serves as your central hub for connecting external services and tools with The Praetorian Guard Platform (PGP). This documentation will guide you through understanding, navigating, and configuring the various integration options available to you.

## Overview

When you first access the integrations page, the **Add Integrations** will present a collection of integration cards organized by their primary functions. These integrations span across attack surface discovery, risk notifications, vulnerability scanning, and more. Each integration card displays the service's logo and name, making it easy to locate your desired integration.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580dbfa21178a432dc4349/019cf1d6-838f-7949-97c5-f43bd67bb4de/b64u-U2NyZWVuc2hvdCAyMDI2LTAzLTE1IGF0IDkuMTEuMjXigK9BTS5wbmc.png?X-Amz-Expires=3600&X-Amz-Date=20260318T040000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=2552e06e17f5fc3696c845e101472b942c7321a2f1fbd619afcdce740666a524)

## Understanding Integration Types

The platform supports several core types of integrations that serve different purposes in your security workflow. Attack surface integrations help you discover and monitor your infrastructure, including cloud services like AWS, Azure, and GCP, as well as code repositories through GitHub and GitLab. These integrations provide continuous visibility into your expanding digital footprint.

For structured workflow management, ticketing system integrations with platforms like Jira and ServiceNow help track and resolve identified risks systematically.

Vulnerability scanning integrations enhance your security assessment capabilities. The platform supports major scanning tools including Nessus, Burp Enterprise, and Qualys. You can either connect these scanners directly or import scan results through dedicated import interfaces.

## Configuring Integrations

The configuration process follows a consistent pattern across all integrations while accommodating their unique requirements. To begin setting up an integration, click on its card to open the configuration interface. The interface will present you with specific fields needed for that service.

For detailed instructions on how to set up each integration, look for documentation in the [Integrations](https://docs.praetorian.com/hc/en-us/sections/25805002536731-Integrations) section of the documentation.

For cloud provider integrations, the setup typically involves authentication and access configuration. AWS integration uses a CloudFormation stack deployment process – you'll find a "Launch CloudFormation Stack" button that streamlines the setup. For Azure, you'll need to provide your Application ID, Secret Value, and Tenant ID. GCP configuration requires a Project ID and Service Account JSON keyfile.

Source code management integrations offer flexible setup options. With GitHub, you can choose between installing the GitHub App directly or providing a Personal Access Token (PAT) along with your organization URL. GitLab setup focuses on PAT authentication and requires your GitLab Group URL.

Notification service configurations emphasize ease of use while ensuring secure communication. Slack integration requires a webhook URL and severity level selection. The severity options range from Info to Critical, allowing you to filter notifications based on risk importance. Similar configuration patterns apply to other messaging platforms like Microsoft Teams and Google Chat.

### Working with File Imports

The platform provides dedicated import functionality for various vulnerability scanning tools. When working with Nessus, Rapid7 InsightVM, or Qualys results, you'll find specific import interfaces designed for each format. These interfaces feature dropzones where you can upload your scan result files directly. The system processes these files and integrates the findings into your risk management workflow.

### Webhook Integration

For custom integration needs, the platform provides a webhook interface that supports bi-directional data flow. Upon setup, you receive a unique secret PIN for authentication. This webhook functionality enables you to push asset and risk data to external systems or receive updates from custom tools and services.

### Security Considerations

When configuring integrations, the platform encourages secure authentication practices. Wherever possible, use API tokens or service accounts with appropriately scoped permissions. For services that require direct credential input, the platform securely handles sensitive information through encrypted fields.

Most integrations include severity level configuration, which helps manage notification volume and focus attention on significant risks. Consider your organization's needs when selecting these thresholds – setting them too low might lead to alert fatigue, while setting them too high could cause you to miss important notifications.

### Getting Help

Throughout the integration interface, you'll find contextual help through "Learn more" links. These resources provide detailed, service-specific setup instructions and troubleshooting guidance. When configuring complex integrations like cloud providers or enterprise security tools, these resources can help ensure proper setup and optimal use of the integration features.

For technical issues during setup, verify that all required fields are properly filled and that provided credentials have necessary permissions. Many integration issues stem from incorrect URLs or network access restrictions, so consider these factors when troubleshooting connection problems.

## Conclusion

PGP's integration capabilities provide a robust foundation for comprehensive security monitoring and risk management. By properly configuring these integrations, you can create an automated, efficient security workflow that spans across your entire technology stack. As your organization's needs evolve, you can easily add or modify integrations to maintain effective security coverage.

### Support

If you encounter any difficulties or have questions about setting up integrations, our support team is here to help. Contact us at support@praetorian.com for assistance with configuration, troubleshooting, or best practices guidance. Our team is committed to helping you maximize the value of your integrations.
