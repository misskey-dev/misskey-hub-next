# Kubernetes/TrueNAS를 이용한 Misskey 구축

이 가이드에서는 Kubernetes와 HelmChart를 사용하여 Misskey를 설정하는 방법을 설명합니다.

:::danger

一度使用を始めたサーバーのドメイン・ホスト名では、データベースを作り直さないでください！

:::

## TrueCharts と TrueNAS Scale

또한, 궁금한 점이 있으면 TrueCharts의 [Discord](https://discord.gg/Ax9ZgzKx9t) 서버에서 질문할 수 있습니다.

현재 Misskey는 _incubator_ train을 진행 중입니다.

また、不明な点があればTrueChartsの[Discord](https://discord.gg/Ax9ZgzKx9t)サーバーで質問をすることもできます。

現在、Misskeyは_incubator_ trainで進行中です。

:::前提条件

- TrueNAS Scale
  または
- KubernetesクラスターとHelm

:::

## TrueNAS Scale

설정의 URL 란은 반드시 변경해 주십시오.

TrueCharts는 기본적으로 Traefik을 사용하여 HTTPS로 서비스를 외부에 공개하지만, 수동으로 다른 소프트웨어를 사용할 수도 있습니다.

設定の URL の欄は必ず変更してください。

TrueNAS Scale을 사용하지 않는 경우 Helm을 사용하여 Misskey를 설치할 수 있습니다.

## Helmを使用して手動で構築

다른 부분은 필요에 따라 다시 작성해 주세요.

이 Chart는 현재 Misskey 컨테이너 내에서 TLS를 활성화하는 것을 지원하지 않으므로, 서버에 대한 액세스를 보호하고 싶다면 리버스 프록시를 사용하는 것이 좋습니다.

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
