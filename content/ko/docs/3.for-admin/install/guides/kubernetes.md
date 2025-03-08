# Kubernetes/TrueNAS를 이용한 Misskey 구축

이 가이드에서는 Kubernetes와 HelmChart를 사용하여 Misskey를 설정하는 방법을 설명합니다.

:::danger

일단 작동하기 시작한 서버의 도메인 및 호스트 이름으로는 데이터베이스를 다시 만들지 마십시오!

:::

## TrueCharts 및 TrueNAS Scale

Misskey의 HelmCharts는 TrueNAS Scale에서 사용할 수 있도록 TrueCharts로 공개되어 있지만, HelmCharts로 설치할 수도 있습니다.

[TrueCharts](https://truecharts.org/charts/description_list) 사이트에는 사용 가능한 모든 Charts와 설치 방법 등의 문서가 있습니다.

또한, 궁금한 점이 있으면 TrueCharts의 [Discord](https://discord.gg/Ax9ZgzKx9t) 서버에서 질문할 수 있습니다.

현재 Misskey는 _incubator_ train을 진행 중입니다.

:::前提条件

- TrueNAS Scale
  또는
- Kubernetes 클러스터와 Helm

:::

## TrueNAS Scale

[TrueCharts Guide](https://truecharts.org/manual/guides/Adding-TrueCharts/)의 절차를 따르십시오.

_incubator_ train을 추가하고 Misskey를 설치합니다.

설정의 URL 란은 반드시 변경해 주십시오.

TrueCharts는 기본적으로 Traefik을 사용하여 HTTPS로 서비스를 외부에 공개하지만, 수동으로 다른 소프트웨어를 사용할 수도 있습니다.

## Helm을 사용하여 수동으로 구축

TrueNAS Scale을 사용하지 않는 경우 Helm을 사용하여 Misskey를 설치할 수 있습니다.

values.yaml의 `misskey:`의 `url:`을 반드시 다시 작성해 주세요.

다른 부분은 필요에 따라 다시 작성해 주세요.

이 Chart는 현재 Misskey 컨테이너 내에서 TLS를 활성화하는 것을 지원하지 않으므로, 서버에 대한 액세스를 보호하고 싶다면 리버스 프록시를 사용하는 것이 좋습니다.

```
helm repo add TrueCharts https://charts.truecharts.org
helm repo update
helm install misskey TrueCharts/misskey
```

## Misskey 업그레이드

Misskey를 업그레이드하려면 TrueNAS Scale에 내장된 업그레이드 기능을 사용하거나, kubernetes를 수동으로 실행하는 경우 [helm repo update](https://helm.sh/docs/helm/helm_repo_update/) 또는 [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/)를 사용할 수 있습니다.

문제가 발생할 가능성도 있으므로, 업그레이드 전에 데이터를 백업하는 것이 좋습니다.
