# GitHub Actions를 사용하여 Docker Hub에 Push하는 방법

[/.github/workflows/docker.yml](https://github.com/misskey-dev/misskey/blob/develop/.github/workflows/docker.yml)에\
GitHub Action을 통해 Docker Hub에 푸시하는 워크플로우가 설명되어 있습니다.

원본 저장소에서는 릴리스된 시점에 `latest`, `<릴리즈명>` 각각의 태그와 함께 Docker Hub에 푸시됩니다.\
※ Docker Hub에 `<브랜치명>`과 같은 태그가 있을 수 있지만, 이 태그는 자동 푸시 대상이 아닙니다.\
※ Docker Hub에 `<브랜치명>`과 같은 태그가 있을 수 있지만, 이 태그는 자동 푸시 대상이 아닙니다.\
※ Docker Hub에 `<브랜치명>`과 같은 태그가 있을 수 있지만, 이 태그는 자동 푸시 대상이 아닙니다.

Fork에서 이 워크플로우를 실행하면 실패합니다.

아래에서는 Fork를 통해 자신의 Docker Hub 리포지토리에 푸시하도록 하는 방법을 설명합니다.

## 자신의 Docker Hub 리포지토리에 푸시하도록 설정하는 방법

1. Docker Hub에서 리포지토리를 생성합니다.
2. 워크플로우 파일의 [images](https\://github.com/misskey-dev/misskey/blob/53f3b779bf16abcda4f6e026c51384f3b8fbcc62/.github/workflows/docker.
3. yml#L20)을 생성한 저장소로 대체합니다.\
   GitHub에서 [암호화된 시크릿](https://docs.github.com/ja/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository)을 생성합니다.\
   생성해야 하는 것은 `DOCKER_USERNAME`과 `DOCKER_PASSWORD`로, 각각 Docker Hub의 사용자와 비밀번호가 됩니다.\
   GitHub에서 [암호화된 시크릿](https://docs.github.com/ja/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository)을 생성합니다.\
   생성해야 하는 것은 `DOCKER_USERNAME`과 `DOCKER_PASSWORD`로, 각각 Docker Hub의 사용자와 비밀번호가 됩니다.

## push하는 방법

위 설정을 통해 릴리스 시 자동으로 Docker Hub에 푸시되도록 설정합니다.\
위 설정을 통해 릴리스 시 자동으로 Docker Hub에 푸시되도록 설정합니다.\
위 설정을 통해 릴리스 시 자동으로 Docker Hub에 푸시되도록 설정합니다.\
구체적으로는 GitHub의 릴리즈 기능으로 릴리즈한 시점에 `latest`, `<릴리즈명>` 각각의 태그와 함께 Docker Hub에 푸시됩니다.

또한 GitHub에서 수동으로 푸시할 수도 있습니다.\
또한 GitHub에서 수동으로 푸시할 수도 있습니다.\
또한 GitHub에서 수동으로 푸시할 수도 있습니다.\
이를 위해 Actions => Publish Docker image => Run workflow에서 branch를 선택하여 워크플로우를 실행합니다.\
단, 이 경우 생성되는 태그는 `<브랜치명>`이 됩니다.\
단, 이 경우 생성되는 태그는 `<브랜치명>`이 됩니다.\
단, 이 경우 생성되는 태그는 `<브랜치명>`이 됩니다.
