# Building Misskey with Kubernetes / TrueNAS

This guide explains how to set up Misskey using Kubernetes and Helm charts.

:::danger

Do not recreate the database for a domain/hostname that is already in use on a running server!

:::

## TrueCharts and TrueNAS Scale

Misskey Helm charts are published by TrueCharts for use with TrueNAS Scale, but they can also be installed as regular Helm charts.

The [TrueCharts](https://truecharts.org/charts/description_list) website provides documentation on all available charts and installation methods.

If you have any questions, you can also ask on the TrueCharts [Discord](https://discord.gg/Ax9ZgzKx9t) server.

Currently, Misskey is in the _incubator_ train.

:::tip{label='前提条件'}

- TrueNAS Scale, or
- A Kubernetes cluster with Helm installed

:::

## TrueNAS Scale

Please follow the steps in the [TrueCharts Guide](https://truecharts.org/manual/guides/Adding-TrueCharts/).

Add the _incubator_ train and install Misskey.

Be sure to change the URL field in the settings.

By default, TrueCharts uses Traefik to expose services externally over HTTPS, but you can also configure it manually to use other software instead.

## Manual installation with Helm

If you are not using TrueNAS SCALE, you can install Misskey using Helm.

Make sure to update the `url:` under `misskey:` in `values.yaml`.

Update other settings as needed.

This chart currently does not support enabling TLS inside the Misskey container. If you want to secure access to the server, using a reverse proxy is recommended.

```
helm repo add TrueCharts https://charts.truecharts.org
helm repo update
helm install misskey TrueCharts/misskey
```

## Upgrading Misskey

To upgrade Misskey, you can use the built-in upgrade feature in TrueNAS Scale, or, if you are running Kubernetes manually, use [helm repo update](https://helm.sh/docs/helm/helm_repo_update/) or [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/).

Since issues may occur, we strongly recommend backing up your data before performing an upgrade.
