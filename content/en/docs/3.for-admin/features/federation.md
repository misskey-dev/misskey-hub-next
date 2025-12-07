# Federation Mode

Misskey supports federation via ActivityPub by default as a decentralized platform, but it is also possible to restrict or disable federation depending on the server's operational policies.

:::tip

The federation is enabled by default, so no special configuration is required under normal use cases (when using it as a federated server).

:::

## How to setup

Settings are available under Federation section in [Control Panel > General](x-mi-web://admin/settings).

### All

Federated with all servers (excluding blocked servers, etc.).This is the default.

### Specify a host

Only federates with specific servers (white-listed).Enter the hostnames of servers that allow federation, separated by line breaks, in the “Servers that allow federation” field.

### None

Does not federate with any other server.In this mode, some federation-related settings and user interfaces are omitted.
