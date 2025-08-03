# 使用 Kubernetes/TrueNAS 建置 Misskey

本指南說明如何使用 Kubernetes 和 HelmChart 設定 Misskey。

:::danger

一度使用を始めたサーバーのドメイン・ホスト名では、データベースを作り直さないでください！

:::

## TrueCharts 與 TrueNAS Scale

MisskeyのHelmChartsはTrueNAS Scaleで使用するためのTrueChartsで公開されていますが、HelmChartsとしてインストールすることもできます。

現在、Misskeyは_incubator_ trainで進行中です。

また、不明な点があればTrueChartsの[Discord](https://discord.gg/Ax9ZgzKx9t)サーバーで質問をすることもできます。

現在、Misskeyは_incubator_ trainで進行中です。

:::tip{label='前提条件'}

- TrueNAS Scale
  以及
- KubernetesクラスターとHelm

:::

## TrueNAS Scale

[TrueCharts Guide](https://truecharts.org/manual/guides/Adding-TrueCharts/)の手順に従ってください。

_incubator_ trainを追加し、Misskeyをインストールします。

設定の URL の欄は必ず変更してください。

TrueChartsはデフォルトでTraefikを使用してサービスをHTTPSで外部に公開しますが、手動ですることにより他のソフトウェアを使用することもできます。

## Helmを使用して手動で構築

TrueNAS Scaleを使用していない場合はHelmを使用して、Misskeyをインストールすることができます。

values.yamlの `misskey:` の `url:` を必ず書き換えてください。

他の個所は、必要に応じて書き換えてください。

このChartでは現在Misskeyコンテナ内でTLSを有効にすることに対応していないので、サーバーへのアクセスを保護したい場合はリバースプロキシを使用することが推奨されています。

```
helm repo add TrueCharts https://charts.truecharts.org
helm repo update
helm install misskey TrueCharts/misskey
```

## 升級 Misskey

Misskey をアップグレードするには、TrueNAS Scale に内蔵されているアップグレード機能を使用するか、kubernetes を手動で実行している場合は [helm repo update](https://helm.sh/docs/helm/helm_repo_update/) または [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) を使用することができます。

問題が発生する可能性も考え、アップグレード前にデータをバックアップすることを強くお勧めします。
