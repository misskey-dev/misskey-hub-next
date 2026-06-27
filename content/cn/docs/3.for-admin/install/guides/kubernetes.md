# 使用 Kubernetes / TrueNAS 构建 Misskey

本指南介绍如何使用 Kubernetes 和 Helm Chart 来设置 Misskey。

:::danger

请勿在已经投入使用的服务器上，于同一域名或主机名下重新创建数据库！

:::

## TrueCharts 与 TrueNAS Scale

Misskey 的 Helm Chart 由 TrueCharts 发布，供 TrueNAS Scale 使用，但也可以作为常规的 Helm Chart 进行安装。

[TrueCharts](https://truecharts.org/charts/description_list) 网站提供所有可用 Charts 以及安装方法等文档。

如果有不清楚的地方，也可以在 TrueCharts 的 [Discord](https://discord.gg/Ax9ZgzKx9t) 服务器上提问。

目前 Misskey 正在 _incubator_ train 中。

:::tip{label='前提条件'}

- TrueNAS Scale，或
- 已安装 Helm 的 Kubernetes 集群

:::

## TrueNAS Scale

请按照 [TrueCharts Guide](https://truecharts.org/manual/guides/Adding-TrueCharts/) 的步骤进行。

添加 _incubator_ train，并安装 Misskey。

请务必修改设置中的 URL 字段。

TrueCharts 默认使用 Traefik 通过 HTTPS 将服务对外公开，但也可以通过手动配置来改用其他软件。

## 使用 Helm 手动构建

如果你未使用 TrueNAS SCALE，也可以通过 Helm 安装 Misskey。

请务必修改 `values.yaml` 中 `misskey:` 下的 `url:` 设置。

其他部分请根据需要自行修改。

该 Chart 目前不支持在 Misskey 容器内启用 TLS，因此如果你希望保护对服务器的访问，建议使用反向代理（reverse proxy）。

```
helm repo add TrueCharts https://charts.truecharts.org
helm repo update
helm install misskey TrueCharts/misskey
```

## Misskey 的升级

要升级 Misskey，可以使用 TrueNAS Scale 内置的升级功能；如果是手动运行 Kubernetes，则可以使用 [helm repo update](https://helm.sh/docs/helm/helm_repo_update/) 或 [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/)。

考虑到可能会出现问题，强烈建议在升级前先备份数据。
