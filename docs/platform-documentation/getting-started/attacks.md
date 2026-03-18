---
title: "Attacks"
description: "Attacks"
featurebaseId: "34120518311835"
---

## Attack Page Documentation

The Attack page provides a comprehensive view of potential attack paths and MITRE ATT&CK® techniques that could affect your organization. This feature helps you understand, visualize, and assess various attack vectors and defense levels.

## Overview

The Attack page consists of two main sections accessible via tabs:

-   Attack Paths: Visual representations of potential attack sequences
-   MITRE Attacks: Detailed mapping of MITRE ATT&CK® techniques and their implementation status

## Attack Paths View

The Attack Paths view displays interactive diagrams showing how attackers might move through your systems. Each path consists of assets (represented as circles) and techniques (represented as rounded rectangles) connected by lines.

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d9ea21178a432dbfa73/019b7ff5-2eeb-7048-b55b-cc3d016274ac/b64u-MDE5YjdmZjUtMmVjNy03ZDU0LTg5ZjAtZmIzNGY5OTFhYmM5.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=e90c4822e1faed793da015dff742d7c6a2618214a3fc82e1a9f787471a77682e)

### Key Components

-   Assets: Represented by circular nodes with an icon
-   Techniques: Shown as rounded rectangles with technique IDs/names
-   Connections: Lines showing relationships between assets and techniques

### Defense Levels

Each technique in the attack path is color-coded to indicate its defense status:

-   Tested (Gray)
-   Undetected (Red)
-   Logged (Orange)
-   Alerted (Yellow)
-   Detected (Blue)
-   Responded (Purple)
-   Prevented (Green)

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d9ea21178a432dbfa73/019b7ff5-2fd2-728c-9d8a-81523e336c09/b64u-MDE5YjdmZjUtMmZjOS03Zjk0LTg2MGEtNGE1OGQwMjhlZTc0.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=bd74b364b3fc66486bb6b3ac99b6ae4e2b773ba6b0292767ebd41f8d56921d72)

### Working with Attack Paths

### Viewing Attack Paths

1.  Select an attack path from the dropdown at the top of the view
2.  Use the mouse to pan and zoom around the diagram
3.  Click on nodes to see more details
4.  Use the controls in the bottom right to:
    -   Reset the view
    -   Zoom in/out
    -   Fit the view to screen

### Managing Attack Paths

Attack paths are created and maintained by the Praetorian team to document how Praetorian security engineers proved compromise during assessments. These paths demonstrate real-world attack scenarios and techniques that were successfully executed against your environment.

### Additional Features

-   Download as PNG: Export the current attack path as an image
-   Resizable View: Drag the bottom edge to adjust the view height
-   Node Details: Hover over nodes to see additional information

## MITRE Attacks View

The MITRE Attacks view provides a comprehensive overview of all MITRE ATT&CK® techniques organized by tactics.

### Components

-   Tactics Column: Lists all MITRE tactics
-   Techniques Grid: Shows techniques for the selected tactic
-   Defense Levels: Color-coded indicators showing implementation status

![](https://69448200be4d4ffad9065e4d.featurebase-attachments.com/c/article/69580d9ea21178a432dbfa73/019b7ff5-333e-796a-ba37-f233a595049b/b64u-MDE5YjdmZjUtMzBmYS03Yjg2LTllM2QtZjYxNGM3MDJjODcz.png?X-Amz-Expires=3600&X-Amz-Date=20260318T050000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO801TYC4FCVNNEKURKM%2F20260318%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=b7b02a3d8045fed3475704e8029a8add869d5342634b35422aaafdbd52964bf1)

### Using the MITRE View

1.  Select a tactic from the left column to view associated techniques
2.  Click on any technique to:
    -   View detailed information
    -   See its current defense level
    -   Access the official MITRE documentation (opens in new tab)

### Defense Level Indicators

The same color coding used in Attack Paths applies here:

-   Column shows current defense level
-   Last run timestamp indicates when the defense was last tested
-   Techniques link to detailed MITRE documentation

## Tips and Best Practices

-   Regularly review attack paths for accuracy and completeness
-   Update defense levels as new controls are implemented
-   Use the MITRE view to ensure comprehensive coverage of attack techniques
-   Document assumptions and decisions in technique configurations
-   Export attack paths for documentation and review purposes

## Notes

-   Some features may require administrative privileges
-   Attack paths are automatically saved after modifications
-   All changes are logged for audit purposes
-   Defense levels should be validated through testing where possible
