## Overview

The SharpHound integration connects the Praetorian Guard Platform (PGP) with Active Directory attack path data collected by SharpHound, the official data collector for BloodHound. By uploading SharpHound export files into PGP, security teams can analyze Active Directory relationships, identify attack paths, and discover privilege escalation opportunities within their internal environment.

Active Directory remains the backbone of identity and access management for most enterprises, and misconfigurations in AD often create exploitable attack paths that adversaries use for lateral movement and privilege escalation. SharpHound collects detailed information about AD objects -- users, computers, groups, domains, GPOs, OUs, and their relationships -- and PGP parses this data to build a comprehensive model of your AD security posture.

Unlike API-based integrations, the SharpHound integration is a file-based import. You collect data offline using SharpHound, upload the resulting ZIP archive to PGP, and PGP processes the BloodHound JSON files to extract AD objects and relationships. This approach supports air-gapped environments and does not require direct network connectivity between PGP and your Active Directory.

## What the Integration Does

The SharpHound integration accepts BloodHound-format ZIP archives containing JSON files produced by SharpHound. PGP downloads the uploaded archive, extracts the JSON files, and streams each file through a parser that converts BloodHound data into PGP's internal AD object and relationship models.

The parsing process involves several stages:

1. **JSON Streaming** -- Each BloodHound JSON file is streamed and parsed to extract AD nodes (objects) and their relationships (ACEs, group memberships, GPO links, trust relationships, local group memberships, delegation permissions, and containment hierarchies).
2. **Well-Known Entity Generation** -- PGP generates well-known AD objects and relationships (such as built-in groups and default containers) based on discovered domains and their SIDs.
3. **Relationship Processing** -- Cached relationships are resolved against their source and target objects, producing finalized AD relationship models.
4. **Object Cleaning** -- Object identifiers are normalized, invalid objects are filtered out, and the final set of AD objects and relationships is emitted for storage in PGP.

The integration processes the following BloodHound data types: users, computers, groups, domains, GPOs, OUs, containers, and issuance policies. Each type is identified from the file metadata and processed accordingly.

All imported data maps to PGP's internal attack surface. The uploaded SharpHound file is deleted after processing.

## Prerequisites

Before setting up the SharpHound integration, ensure you have:

- **SharpHound collected data** in BloodHound ZIP format (compatible with BloodHound CE / SharpHound v2)
- **Access to run SharpHound** against your Active Directory environment (typically requires a domain-joined machine with a domain user account)
- **The resulting ZIP archive** uploaded or accessible for import into PGP

### Collecting Data with SharpHound

1. Download the latest SharpHound release from the [BloodHound GitHub repository](https://github.com/BloodHoundAD/SharpHound).
2. Run SharpHound on a domain-joined Windows machine with a domain user account:
   ```
   SharpHound.exe --collectionmethods All
   ```
3. SharpHound will produce a timestamped ZIP archive (e.g., `20240115120000_BloodHound.zip`) containing JSON files for each AD object type.
4. Transfer the ZIP archive to a location where you can upload it to PGP.

### Collection Methods

SharpHound supports various collection methods. The `All` method provides the most comprehensive data, but you can use specific methods as needed:

| Collection Method | Description |
|-------------------|-------------|
| All | Collects all available data (recommended for full analysis) |
| Default | Collects group membership, domain trusts, ACLs, and sessions |
| DCOnly | Collects data only from domain controllers (no endpoint enumeration) |
| Session | Collects user session data from computers |
| ACL | Collects ACL/ACE data for AD objects |

## Setup

1. In PGP, navigate to the **Integrations** page.
2. Select **SharpHound** from the list of available integrations.
3. Upload your SharpHound ZIP archive using the file upload interface.
4. PGP will begin processing the file automatically. Processing time depends on the size of your AD environment.

### Field Reference

| Field | Description | Required |
|-------|-------------|----------|
| SharpHound ZIP File | The BloodHound-format ZIP archive produced by SharpHound | Yes |

## What Data Is Synced

### AD Objects (Assets)

The integration imports Active Directory objects as internal assets within PGP.

| Object Type | Source File | Description |
|-------------|-------------|-------------|
| Users | `*_users.json` | Domain user accounts including properties like enabled status, SID, and group memberships |
| Computers | `*_computers.json` | Domain-joined computers with OS information, enabled status, and service principal names |
| Groups | `*_groups.json` | Security and distribution groups with their membership lists |
| Domains | `*_domains.json` | AD domains with trust relationships, domain SID, and functional level |
| GPOs | `*_gpos.json` | Group Policy Objects with their properties and linked containers |
| OUs | `*_ous.json` | Organizational Units with their containment hierarchy |
| Containers | `*_containers.json` | AD containers with their child objects |

### AD Relationships (Risks)

The integration imports relationships between AD objects, which represent potential attack paths.

| Relationship Type | Description |
|-------------------|-------------|
| MemberOf | Group membership relationships |
| AdminTo | Local administrator privileges on computers |
| HasSession | Active user sessions on computers |
| GenericAll | Full control permissions on AD objects |
| GenericWrite | Write permissions on AD objects |
| WriteDacl | Ability to modify access control lists |
| WriteOwner | Ability to change object ownership |
| ForceChangePassword | Ability to reset another user's password |
| AddMember | Ability to add members to a group |
| GPLink | Group Policy links to OUs and domains |
| Contains | Containment hierarchy (OU contains objects) |
| TrustedBy | Domain trust relationships |
| AllowedToDelegate | Kerberos delegation permissions |
| DCSync | Replication rights that enable DCSync attacks |
| CanRDP | Remote Desktop access permissions |
| CanPSRemote | PowerShell remoting access permissions |
| ExecuteDCOM | DCOM execution permissions |

### Well-Known Entities

PGP automatically generates well-known AD objects and relationships for each discovered domain, including built-in groups (Domain Admins, Enterprise Admins, etc.) and their standard relationships. This ensures that the AD model is complete even if SharpHound did not enumerate every built-in object.

## API Endpoints Used

This integration does not use external API endpoints. It is a file-based import that processes BloodHound JSON data uploaded directly to PGP.

| Operation | Method | Description |
|-----------|--------|-------------|
| File Upload | PGP Upload | SharpHound ZIP archive is uploaded to PGP's secure file storage |
| File Processing | Internal | PGP downloads the archive from internal storage, extracts JSON files, and processes them |
| File Cleanup | Internal | The uploaded archive is deleted after successful processing |

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| "Failed to read seed file" | The uploaded file could not be downloaded from PGP's internal storage | Re-upload the SharpHound ZIP archive and retry the import |
| "Failed to parse sharphound files" | The ZIP archive contains invalid or incompatible JSON files | Ensure the archive was produced by a supported version of SharpHound (BloodHound CE compatible). Verify the ZIP contains valid JSON files |
| "Failed to download and extract ZIP files" | The uploaded file is corrupted or not a valid ZIP archive | Verify the file is a valid ZIP by extracting it locally, then re-upload |
| Processing takes several hours | Very large AD environments with hundreds of thousands of objects | This is expected for large environments. The integration supports up to 6 hours of processing time |
| Missing relationships or objects | SharpHound collection was limited to specific methods or encountered access errors | Re-run SharpHound with `--collectionmethods All` and ensure the collecting user has adequate permissions |
| "Missing domain property" or "missing domain SID property" | Some AD objects have incomplete metadata | This typically indicates a partially corrupted collection. Re-run SharpHound to collect fresh data |

## Security and Data Handling

The SharpHound integration processes data from uploaded files rather than connecting to external APIs. The uploaded SharpHound ZIP archive is stored temporarily in PGP's encrypted file storage and is deleted after processing is complete.

Active Directory data imported from SharpHound includes object metadata such as names, SIDs, group memberships, and permission relationships. PGP does not import or store user passwords, password hashes, Kerberos tickets, or any authentication secrets from the SharpHound data.

Because this is a file-based import, no persistent credentials are stored for this integration. Each import is a one-time operation that processes the uploaded file and removes it upon completion. To update the AD data in PGP, collect new data with SharpHound and upload a fresh archive.
