---
title: "CLI Script Development"
description: "CLI Script Development"
featurebaseId: "7904477"
---

The Praetorian CLI has a scripting engine for you to easily extend the CLI in just a few steps. The walkthrough below is based on the documentation [here](https://github.com/praetorian-inc/praetorian-cli/blob/main/docs/script-development.md).

First step, set the `PRAETORIAN_SCRIPTS_PATH` environment variable to point to the directory where you will store your scripting code.

To set the environmental variable for your session, you can enter the following:

export PRAETORIAN\_SCRIPTS\_PATH=~/your/cli-scripts/path

If you want to permanently set that PRAETORIAN\_SCRIPTS\_PATH environment variable, you can add the above line to your shell configuration file.

The CLI attempts to load every .py file from that directory with the `register()` function defined. All compatible scripts will be added to the `script` group in the CLI. You can check whether your script was loaded with:

praetorian PGP script --help

The code snippet below is a concrete example that runs an nmap scan on a host and adds the open ports found in the scan to PGP using the SDK.

The main logic is in `nmap_command`. This function uses [Click](https://click.palletsprojects.com/en/8.1.x/) decorators to register itself to the CLI and define command line arguments.

Equally important is the `register()` function. It must take one argument `script_group` and use the `add_command` function to register the `nmap_command` function with the CLI.

@click.command('nmap')\\n@click.argument('host', required=True)\\n@cli\_handler\\ndef nmap\_command(sdk, host):\\n \\"\\"\\" An nmap script for scanning a host.\\n\\n HOST is the host you want to scan. It can be a hostname or an IP address.\\n \\"\\"\\"\\n\\n print(f'Running nmap on {host}...')\\n result = subprocess.run(\['nmap', '-p22,80,443', host\], capture\_output=True, text=True)\\n\\n if 'Nmap scan report' in result.stdout:\\n lines = result.stdout.split('\\\\n')\\n asset\_key = f'#asset#{host}#{host}.'\\n sdk.add('asset', dict(name=host, dns=host))\\n print(f'Added asset {asset\_key}')\\n for l in lines\[5:\]:\\n match = re.match('^(\\\\d+)/\[a-z\]+\\\\s+open\\\\s+(\[a-z\]+)$', l)\\n if match:\\n (port, protocol) = match.groups()\\n sdk.add('attribute', dict(key=asset\_key, name=protocol, value=port))\\n print(f'Added attribute for open port {port} running {protocol}.')\\n else:\\n print(\\"No live host found.\\")\\n\\n\\n\\ndef register(script\_group: click.MultiCommand):\\n script\_group.add\_command(nmap\_command)

The full example script with comments and notes is available here: [nmap-example.py](https://github.com/praetorian-inc/praetorian-cli/blob/main/praetorian_cli/scripts/commands/nmap-example.py).

## Debugging

The CLI skips loading scripts that have compilation errors. If you script does not appear in `praetorian PGP script --help`, run the CLI with the `--debug` flag to see the compilation errors.

Good luck creating your own script and extending the value of Praetorian-CLI and PGP!

_Note: Scripts are only supported in Linux and macOS systems._

If you find a topic that you would like discussed in detail, or need further assistance, please let us know at [support@praetorian.com](https://support@praetorian.com)!
