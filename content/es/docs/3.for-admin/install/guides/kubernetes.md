# Creación de un servidor Misskey con Kubernetes/TrueNAS

Esta guía describe cómo configurar Misskey utilizando Kubernetes y HelmChart.

:::danger

¡No vuelvas a crear la base de datos con el dominio/nombre de host del servidor una vez que hayas empezado a utilizarla!

:::

## Escala TrueCharts y TrueNAS

Los HelmCharts de Misskey se publican en TrueCharts para su uso con TrueNAS Scale, pero también se pueden instalar como HelmCharts.

El sitio [TrueCharts](https://truecharts.org/charts/description_list) contiene documentación sobre todos los gráficos disponibles e instrucciones de instalación.

También puedes hacer preguntas en el servidor [Discord](https://discord.gg/Ax9ZgzKx9t) de TrueCharts si no estás seguro.

Misskey está actualmente en período de _incubación_.

:::tip{label='前提条件'}

- TrueNAS Scale
  または
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

## Misskey のアップグレード

Misskey をアップグレードするには、TrueNAS Scale に内蔵されているアップグレード機能を使用するか、kubernetes を手動で実行している場合は [helm repo update](https://helm.sh/docs/helm/helm_repo_update/) または [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) を使用することができます。

問題が発生する可能性も考え、アップグレード前にデータをバックアップすることを強くお勧めします。
