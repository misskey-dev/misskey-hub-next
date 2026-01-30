# 使用 Kubernetes/TrueNAS 建置 Misskey

本指南說明如何使用 Kubernetes 和 HelmChart 設定 Misskey。

:::danger

一旦開始使用，請勿使用伺服器的域名以及主機名稱重新建立資料庫！

:::

## TrueCharts 與 TrueNAS Scale

Misskey 的 HelmChart 由 TrueCharts 發佈，供 TrueNAS Scale 使用，但也可以作為一般的 HelmChart 進行安裝。

[TrueCharts](https://truecharts.org/charts/description_list) 官方網站提供所有可用 Charts 及其安裝方式的相關文件。

若有任何不清楚的地方，也可以前往 TrueCharts 的 [Discord](https://discord.gg/Ax9ZgzKx9t) 伺服器進行詢問。

目前 Misskey 正在 _incubator_ train 中。

:::tip{label='前提条件'}

- TrueNAS Scale，或
- 已安裝 Helm 的 Kubernetes 叢集

:::

## TrueNAS Scale

請依照 [TrueCharts Guide](https://truecharts.org/manual/guides/Adding-TrueCharts/) 的步驟進行。

新增 _incubator_ train，並安裝 Misskey。

請務必修改設定中的 URL 欄位。

TrueCharts 預設會使用 Traefik 以 HTTPS 將服務對外公開，但也可以透過手動設定來改用其他軟體。

## 使用 Helm 手動建置

若未使用 TrueNAS SCALE，也可以透過 Helm 來安裝 Misskey。

請務必修改 `values.yaml` 中 `misskey:` 底下的 `url:` 設定。

其他項目請依需求自行調整。

此 Chart 目前尚不支援在 Misskey 容器內啟用 TLS，
因此若要保護對伺服器的存取，建議使用反向代理（reverse proxy）。

```
helm repo add TrueCharts https://charts.truecharts.org
helm repo update
helm install misskey TrueCharts/misskey
```

## 升級 Misskey

要升級 Misskey，可以使用 TrueNAS Scale 內建的升級功能；若是手動執行 Kubernetes，則可以使用 [helm repo update](https://helm.sh/docs/helm/helm_repo_update/) 或 [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/)。

考慮到可能會發生問題，強烈建議在升級前先備份資料。
