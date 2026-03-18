---
title: "Email Notifications"
featurebaseId: "0735871"
draft: true
---

## Overview

Email notifications in Chariot deliver security alerts and vulnerability findings directly to your inbox. When Chariot discovers new risks that meet your configured severity threshold, you'll receive an HTML-formatted email notification with key details and a direct link to view the full finding in the Chariot platform.

Email notifications are ideal for:

-   Teams that prefer email-based workflows
    
-   Stakeholders who need periodic updates on security findings
    
-   Organizations requiring audit trails of security notifications
    
-   Users who want notifications delivered to multiple email addresses
    

## Setting Up Email Notifications

### Creating Your First Email Notification

1.  Navigate to **Settings** → **Notifications** in the Chariot platform
    
2.  Locate the **Email Notifications** section
    
3.  Click the **Add Email** button
    
4.  Enter the email address where you want to receive notifications
    
5.  Select a **Severity Threshold** (see [Configuration Options](#configuration-options) below)
    
6.  Click **Save** to create the notification
    

The email address you provide will be validated to ensure it's a valid email format. Once created, Chariot will begin sending notifications to this address when new risks are discovered that meet your severity threshold.

### Setting Up Multiple Email Notifications

You can configure multiple email notifications to send alerts to different recipients or teams. Each email notification is configured independently with its own:

-   Email address
    
-   Severity threshold
    

**Important Limitation**: While you can set up multiple email notifications, each notification is still based solely on the severity threshold. You cannot configure different notification rules (such as filtering by asset type, source, or other criteria) - all notifications are triggered by the same severity-based logic.

To add additional email notifications:

1.  Follow the same steps as creating your first notification
    
2.  Each additional notification will appear in the Email Notifications table
    
3.  You can configure different severity thresholds for each email address if needed
    

**Example Use Cases for Multiple Email Notifications**:

-   Send Critical-only alerts to a security team email
    
-   Send Medium+ alerts to a broader engineering distribution list
    
-   Route different severity levels to different teams or stakeholders
    

## Configuration Options

### Email Address

The email address field accepts any valid email format. This is where Chariot will send notification emails when new risks are discovered.

**Requirements**:

-   Must be a valid email format (e.g., `user@companydomain.com`)
    
-   Email addresses are not masked in the UI (unlike webhook URLs) as they are not considered secrets
    
-   The email address can be copied from the notification view for convenience
    

### Severity Threshold

The severity threshold determines which risk severity levels will trigger email notifications. This is a cumulative setting - selecting a threshold includes that level and all higher severity levels.

**Available Options**:  
Critical - Only notify for Critical severity risks  
High - Notify for High and Critical severity risks  
Medium - Notify for Medium, High, and Critical severity risks (default)  
Low - Notify for Low, Medium, High, and Critical severity risks  
Info - Notify for all severity levels (Info, Low, Medium, High, Critical)

**Default**: Medium - This means by default, you'll receive notifications for Medium, High, and Critical severity risks.

**How It Works**:

-   When Chariot discovers a new risk, it checks the risk's severity level
    
-   If the risk severity matches or exceeds your configured threshold, an email notification is sent
    
-   The threshold is checked independently for each configured email notification
    
-   Each email notification can have a different threshold if needed
    

## Email Notification Content

### Email Subject Line

The email subject line follows this format:

```
[Severity] New Vulnerability: [Vulnerability Name]
```

**Example Subject Lines**:

-   `[Critical] New Vulnerability: SQL Injection in Login Endpoint`
    
-   `[High] New Vulnerability: Exposed AWS S3 Bucket`
    
-   `[Medium] New Vulnerability: Outdated SSL/TLS Configuration`
    

If the risk name exceeds 50 characters, it will be truncated with an ellipsis (`...`) in the subject line.

### Email Body Content

Email notifications are sent as HTML-formatted emails with the following information:

1.  **Severity Badge**: A color-coded badge indicating the risk severity level
    
2.  **Risk Name**: The full name/title of the discovered vulnerability or risk
    
3.  **Source**: The discovery source that identified the risk
    
4.  **Discovery Timestamp**: When the risk was discovered, formatted as a human-readable date and time (e.g., "January 15, 2024 at 2:30 PM MST")
    
5.  **View in Chariot Button**: A prominent call-to-action button that links directly to the risk details page in Chariot
    
6.  **Support Information**: Contact information for Praetorian support (`support@praetorian.com`)
    

The email is designed to be mobile-responsive and will display correctly on both desktop and mobile email clients.

### Email Delivery

-   **Sender**: Emails are sent from `chariot-noreply@praetorian.com`
    
-   **Format**: HTML email with plain text fallback
    
-   **Timing**: Notifications are sent as soon as a new risk is discovered that meets your severity threshold
    

## Managing Email Notifications

### Viewing Email Notification Details

To view the configuration of an existing email notification:

1.  Navigate to **Settings** → **Notifications**
    
2.  In the **Email Notifications** section, locate the notification in the table
    
3.  Click the **View** or **Edit** action for the notification
    
4.  A modal will display:
    

-   The configured email address (copyable)
    
-   The current severity threshold
    
-   Option to edit the severity threshold
    

### Editing Email Notifications

You can update the severity threshold for an existing email notification:

1.  Open the email notification view (see above)
    
2.  Use the **Severity Threshold** dropdown to select a new threshold
    
3.  Click **Save** to update the configuration
    

**Note**: The email address itself cannot be edited through the UI. If you need to change the email address, you must delete the existing notification and create a new one with the updated email address.

### Deleting Email Notifications

To remove an email notification:

1.  Navigate to **Settings** → **Notifications**
    
2.  In the **Email Notifications** section, locate the notification in the table
    
3.  Click the **Delete** action for the notification
    
4.  Confirm the deletion in the confirmation dialog
    

Once deleted, Chariot will no longer send email notifications to that address.

## Notification Behavior

### When Notifications Are Sent

Email notifications are triggered when:

-   A new risk is discovered by Chariot
    
-   The risk severity level matches or exceeds your configured severity threshold
    
-   The notification has not been sent for this specific risk before (deduplication)
    

### Notification Deduplication

Chariot uses caching to prevent duplicate notifications for the same risk. If a risk is discovered multiple times or reprocessed, you will only receive one email notification per risk per configured email address.

### Multiple Email Notifications

When you have multiple email notifications configured:

-   Each notification is evaluated independently
    
-   If a risk meets the threshold for multiple notifications, all matching notifications will be sent
    
-   Each email notification can have a different severity threshold
    
-   Notifications are sent in parallel (not sequentially)
    

**Example Scenario**:

-   Email Notification 1: `security-team@company.com` with threshold `C` (Critical only)
    
-   Email Notification 2: `engineering@company.com` with threshold `MHC` (Medium+)
    

When a **High** severity risk is discovered:

-   Email Notification 1: **Not sent** (High does not meet Critical threshold)
    
-   Email Notification 2: **Sent** (High meets Medium+ threshold)
    

When a **Critical** severity risk is discovered:

-   Email Notification 1: **Sent** (Critical meets Critical threshold)
    
-   Email Notification 2: **Sent** (Critical meets Medium+ threshold)
    

## Troubleshooting

### Not Receiving Email Notifications

If you're not receiving email notifications, check:

1.  **Severity Threshold**: Verify that your configured threshold includes the severity level of the risks you expect to see
    
2.  **Email Address**: Confirm the email address is correct and check your spam/junk folder
    
3.  **Email Validation**: Ensure the email address passed validation when created
    
4.  **Notification Status**: Check that the notification is still active (not deleted) in Settings → Notifications
    

### Email Delivery Issues

If emails are not being delivered:

-   Check your organization's email security settings (firewall, spam filters)
    
-   Verify that emails from `chariot-noreply@praetorian.com` are not being blocked
    
-   Check with your email administrator if emails are being filtered at the organizational level
    
-   Contact Praetorian support at `support@praetorian.com` if delivery issues persist
    

## Best Practices

1.  **Start with Medium Threshold**: The default Medium (MHC) threshold is a good starting point for most teams, providing visibility into significant risks without overwhelming your inbox
    
2.  **Use Multiple Notifications Strategically**:
    

-   Set up Critical-only notifications for on-call security teams
    
-   Use Medium+ thresholds for broader team awareness
    
-   Consider separate notifications for different teams or stakeholders
    

1.  **Regular Review**: Periodically review your email notification configurations to ensure they're still meeting your team's needs
    
2.  **Combine with Other Integrations**: Email notifications work well alongside other Chariot integrations (Slack, Teams, Jira) to ensure comprehensive coverage
    
3.  **Monitor Your Inbox**: While email notifications are reliable, also check the Chariot platform regularly for the most up-to-date risk information
    

## Support

If you have questions or need assistance with email notifications, please contact Praetorian support at `support@praetorian.com`.
