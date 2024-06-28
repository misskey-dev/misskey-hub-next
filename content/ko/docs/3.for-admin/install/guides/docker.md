---
description: 이 가이드는 Docker를 사용하여 Misskey를 설정하는 방법을 설명합니다.
---

# Docker Compose로 Misskey 구축하기

이 가이드는 Docker Compose를 사용하여 Misskey를 설정하는 방법을 설명합니다.

:::danger

일단 작동하기 시작한 서버의 도메인 및 호스트 이름으로는 데이터베이스를 다시 만들지 마십시오!

:::

:::tip{label='前提条件'}

- Docker 및 Docker Compose가 설치되어 있어야 합니다.

:::

## 리포지토리 가져오기

```sh
git clone -b master https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
```

## 설정

아래 명령어로 각종 설정 파일 샘플을 복사합니다.

```sh
cp .config/docker_example.yml .config/default.yml
cp .config/docker_example.env .config/docker.env
cp ./compose_example.yml ./compose.yml
```

`default.yml`과 `docker.env`를 파일 내 설명에 따라 편집합니다.\
또한, 필요에 의해서 `compose.yml`을 편집합니다.(포트를 변경하고 싶은 경우 등)

## 빌드 및 초기화

다음 명령어로 Misskey를 빌드하고 데이터베이스를 초기화합니다.
이 작업은 시간이 좀 걸립니다.

```shell
sudo docker compose build
sudo docker compose run --rm web pnpm run init
```

## 실행

수고하셨습니다.아래 명령어로 Misskey를 실행할 수 있습니다.

```sh
sudo docker compose up -d
```

GLHF✨

## Misskey 업데이트 방법

:::warning

업데이트 시 반드시 [릴리스 노트](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md)를 확인하여 변경 사항 및 추가 작업 여부(대부분 없음)를 미리 파악하시기 바랍니다.

:::

```sh
git stash
git checkout master
git pull
git submodule update --init
git stash pop
sudo docker compose build
sudo docker compose stop && sudo docker compose up -d
```

업데이트 내용 및 데이터베이스 규모에 따라 시간이 걸릴 수 있습니다.

## cli 명령을 실행하는 방법

```sh
sudo docker compose run --rm web node packages/backend/built/tools/foo bar
```
