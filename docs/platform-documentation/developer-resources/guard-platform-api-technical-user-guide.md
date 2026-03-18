---
title: "Guard Platform API Technical User Guide"
description: "Guard Platform API Technical User Guide"
featurebaseId: "5259122"
---

## PGP API Technical User Guide

This guide provides comprehensive documentation for working with the PGP API programmatically. It covers authentication, API endpoints, request/response formats, and practical examples.

## Overview

The PGP API provides programmatic access to Praetorian's offensive security platform. You can use it to:

-   Query and manage assets in your attack surface
    
-   Retrieve security risks and vulnerabilities
    
-   Create and manage seeds for discovery
    
-   Monitor scan jobs and their status
    
-   Configure integrations and webhooks
    

## Base URL

```
https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/PGP/api/v1
```

## Authentication

### Getting Your API Keys

1.  Log in to the [PGP Platform](https://PGP.praetorian.com)
    
2.  Navigate to **User Profile → API Keys**
    
3.  Click **Create API Key**
    
4.  Provide a name and expiration date (max 1 year)
    
5.  **Important**: Copy your API key secret immediately—it is only displayed once!
    

> **Note for SSO Organizations**: Users in SSO-enabled organizations should also use API Keys for programmatic access.

### API Key Format

When you create an API key, you receive:

Field

Description

`api_key_id`

Unique identifier for your key

`api_key_secret`

Secret value for authentication (displayed only once)

`expires`

Expiration date in ISO 8601 format

### Obtaining an Access Token

Exchange your API key for a JWT access token:

```
curl -X GET "https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/chariot/token?id=YOUR_API_KEY_ID&key=YOUR_API_KEY_SECRET"
```

**Response:**

```
{  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6...",  "IdToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6..."}
```

> **Token Lifetime**: Access tokens are valid for 1 hour (3600 seconds). Cache and reuse tokens to avoid unnecessary requests.

### Making Authenticated Requests

Include the token in the Authorization header:

```
curl -X GET "https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/chariot/api/v1/assets" \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json"
```

## API Endpoints

### Assets

Retrieve discovered assets in your attack surface.

**List Assets**

```
curl -X GET "https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/chariot/api/v1/assets" \
-H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**

```
{  
   "assets": [    
      {      
         "key": "#asset#example.com#192.168.1.1",      
         "dns": "example.com",      
         "name": "192.168.1.1",      
         "source": "discovered",      
         "status": "A",      
         "created": "2024-01-15T10:30:00Z",      
         "updated": "2024-01-15T10:30:00Z"    
      }  
    ],  
    "offset": "next_page_token"
}
```

### Risks

Retrieve security risks and vulnerabilities.

**List Risks**

```
curl -X GET "https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/chariot/api/v1/risks" \   
   -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**

```
{  
   "risks": [    
     {      
       "key": "#risk#example.com#CVE-2024-1234",      
       "dns": "example.com",      
       "name": "CVE-2024-1234",      
       "status": "O",      
       "severity": "CRITICAL",      
       "cvss_score": 9.8,      
       "created": "2024-01-15T10:30:00Z"    
     }  
   ],  
   "offset": "next_page_token"
}
```

### Seeds

Manage discovery seeds (starting points for asset enumeration).

**Create Seed**

```
curl -X POST "https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/chariot/api/v1/seeds" \  
   -H "Authorization: Bearer YOUR_TOKEN" \  
   -H "Content-Type: application/json" \  
   -d '{"dns": "example.com"}'
```

**List Seeds**

```
curl -X GET "https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/chariot/api/v1/seeds" \   
   -H "Authorization: Bearer YOUR_TOKEN"
```

### Jobs

Monitor scan jobs and their status.

```
curl -X GET "https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/chariot/api/v1/jobs" \  
   -H "Authorization: Bearer YOUR_TOKEN"
```

### API Keys

**Create API Key**

```
curl -X POST "https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/PGP/api/v1/key" \   
   -H "Authorization: Bearer YOUR_TOKEN" \  
   -H "Content-Type: application/json" \  
   -d '{
     "name": "my-api-key", 
     "expires": "2025-12-31T23:59:59Z"
   }'
```

**Response:**

```
{  
   "key": "#key#12345678-1234-1234-1234-123456789abc",  
   "name": "my-api-key",  
   "secret": "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",  
   "expires": "2025-12-31T23:59:59Z",  
   "creator": "user@example.com",  
   "status": "A",  
   "created": "2024-01-15T10:30:00Z"
}
```

> **Important**: The `secret` field is only returned once during creation. Store it securely.

### Webhooks

**Create Webhook**

```
curl -X POST "https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/chariot/api/v1/webhook" \  
   -H "Authorization: Bearer YOUR_TOKEN" \  
   -H "Content-Type: application/json" \  
   -d '{
     "url": "https://your-endpoint.com/webhook"
   }'
```

## Response Codes

CodeDescription

`200`

Success - Request completed successfully

`400`

Bad Request - Invalid input parameters

`401`

Unauthorized - Invalid or expired token

`403`

Forbidden - Insufficient permissions

`404`

Not Found - Resource does not exist

`429`

Too Many Requests - Rate limit exceeded

`502`

Bad Gateway - Internal server error

## Rate Limiting

-   **Limit**: 5,000 requests per IP address (sliding window)
    
-   **Response**: HTTP 429 when exceeded
    
-   **Recommendation**: Implement exponential backoff for retries
    

## Pagination

List endpoints support pagination via the `offset` parameter:

```
# First page

curl -X GET "https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/chariot/api/v1/assets" \  
   -H "Authorization: Bearer YOUR_TOKEN"


# Subsequent pages (use offset from previous response)

curl -X GET "https://d0qcl2e18h.execute-api.us-east-2.amazonaws.com/chariot/api/v1/assets?offset=OFFSET_VALUE" \  
   -H "Authorization: Bearer YOUR_TOKEN"
```

When `offset` is present in the response, more results are available. When absent, you've reached the last page.

## Python SDK

For Python applications, use the official Praetorian CLI/SDK:

```
pip install praetorian-cli
```

**Example Usage:**

```
from praetorian_cli.sdk.chariot import Chariot
from praetorian_cli.sdk.keychain import Keychain

# Initialize with your account
sdk = Chariot(Keychain())

# List assets
assets, offset = sdk.assets.list(pages=1)

# Get risks
risks, offset = sdk.risks.list(pages=1)

# Add a seed
sdk.seeds.add(dns='example.com')
```

**Environment Variables:**

```
export PRAETORIAN_CLI_API_KEY_ID=your-api-key-idexport PRAETORIAN_CLI_API_KEY_SECRET=your-api-key-secret
```

## Best Practices

1.  **Cache tokens**: Reuse access tokens for their full 1-hour lifetime
    
2.  **Handle pagination**: Always check for `offset` in responses
    
3.  **Implement retries**: Use exponential backoff for 429 and 502 errors
    
4.  **Secure credentials**: Never commit API keys to version control
    
5.  **Monitor rate limits**: Stay well below 5,000 requests per window
    

## Support

-   **Documentation**: [docs.praetorian.com](https://docs.praetorian.com)
    
-   **GitHub Issues**: [praetorian-inc/PGP-ui](https://github.com/praetorian-inc/PGP-ui/issues)
    
-   **Email**: [support@praetorian.com](mailto:support@praetorian.com)
