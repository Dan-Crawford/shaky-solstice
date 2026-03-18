---
title: "Using the Guard SDK in your Script"
description: "Using the Guard SDK in your Script"
featurebaseId: "4369436"
---

The Guard SDK provides a robust interface for interacting with the Guard API. In this section, we will explore some simple use-cases that deal with inserting data into the Guard system. These examples assume the context of a script function, similar to the one defined in [this nmap-example script](https://github.com/praetorian-inc/praetorian-cli/blob/main/praetorian_cli/scripts/commands/nmap-example.py). For these examples, the `sdk` variable is used for accessing the Guard API.

The Guard SDK provides more functionality than just what is described here. Curious users are recommended to learn more by seeing how the CLI handlers implement functionality such as searching for specific items or listing all assets.

## Prerequisites

Before using the SDK, you need to install the Praetorian CLI package and configure authentication. See [Getting Started with the Praetorian CLI](https://docs.praetorian.com/en/help/articles/25815154096667-getting-started-with-the-praetorian-cli) for installation and setup instructions.

**Use the SDK in Python:**

```
from praetorian_cli.sdk.guard import Guard
from praetorian_cli.sdk.keychain import Keychain

guard = Guard(Keychain(account='guard+example@praetorian.com'))
guard.assets.add(group='example.com', identifier='example.com')
```

Within your Python script, you can experiment with the following actions using the Guard SDK.

## Add an Asset

```python
# Add an Asset
hostname = 'hostname.value.here'
ipaddress = '8.8.8.8'

sdk.assets.add(group=hostname, identifier=ipaddress)
```

## Add a Risk to an Asset

Use the `asset_key` helper function to build the key for linking a risk to an asset.

```python
from praetorian_cli.sdk.model.utils import asset_key

# Add a risk tied to an asset
hostname = 'hostname.value.here'
ipaddress = '8.8.8.8'

status = 'TC'

# Status codes for Triage (detected):
# TI - Triage Info
# TL - Triage Low
# TM - Triage Medium
# TH - Triage High
# TC - Triage Critical

# Status codes for Open (demonstrated):
# OI - Open Info
# OL - Open Low
# OM - Open Medium
# OH - Open High
# OC - Open Critical

# Risk identifier
vuln = "vuln-risk-id"

# Proof of exploitation (can be None)
proof_of_exploit = "Proof of Exploit"

# Optional comment
comment = 'Any additional comments (or empty string)'

# Add the risk
sdk.risks.add(
    asset_key=asset_key(hostname, ipaddress),
    name=vuln,
    status=status,
    comment=comment,
    capability='scriptname'
)
```

## Upload Proof of Exploitation

You can upload proof files to associate with risks:

```python
# Upload a proof file from disk
sdk.files.add(
    local_filepath=local_path,
    chariot_filepath=f'proofs/{hostname}/{vuln}/proof.json'
)
```

## Helper Functions

The SDK provides several helper functions for building entity keys:

```python
from praetorian_cli.sdk.model.utils import (
    asset_key,        # asset_key(dns, name) -> #asset#{dns}#{name}
    risk_key,         # risk_key(dns, name) -> #risk#{dns}#{name}
    attribute_key,    # attribute_key(name, value, source_key) -> #attribute#{name}#{value}{source_key}
    seed_asset_key,   # seed_asset_key(dns) -> #asset#{dns}#{dns}
)
```

## Additional Status Codes

The Guard SDK supports additional status codes for risk lifecycle management:

**Accepted:**

-   `II` - Accepted Info
    
-   `IL` - Accepted Low
    
-   `IM` - Accepted Medium
    
-   `IH` - Accepted High
    
-   `IC` - Accepted Critical
    

**Remediated:**

-   `RI` - Remediated Info
    
-   `RL` - Remediated Low
    
-   `RM` - Remediated Medium
    
-   `RH` - Remediated High
    
-   `RC` - Remediated Critical
    

## Legacy Support

For backwards compatibility, the SDK also supports the legacy `Chariot` class name:

```python
from praetorian_cli.sdk.chariot import Chariot
from praetorian_cli.sdk.keychain import Keychain

chariot = Chariot(Keychain(account='guard+example@praetorian.com'))
chariot.assets.add(group='example.com', identifier='example.com')
```

The Guard SDK has much more functionality. Experiment with these actions and discover more with [our example script](https://github.com/praetorian-inc/praetorian-cli/blob/main/praetorian_cli/scripts/commands/nmap-example.py).

If you find a topic that you would like discussed in detail, or need further assistance, please let us know at [support@praetorian.com](mailto:support@praetorian.com)!
