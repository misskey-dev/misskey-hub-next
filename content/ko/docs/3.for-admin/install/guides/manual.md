---
description: 이 가이드에서는 Misskey의 설치 및 설정 방법에 대해 설명합니다.
---

# Misskey를 수동으로 구축하기

이 가이드에서는 Misskey의 설치 및 설정 방법에 대해 설명합니다.

:::danger

일단 사용하기 시작한 서버의 도메인 및 호스트 이름은 절대로 변경하지 마십시오!

:::

:::tip{label='前提条件'}

#### 다음 소프트웨어가 설치 및 설정되어 있어야 합니다.

- **[Node.js](https://nodejs.org/en/)** (20.4.x이상)
- **[PostgreSQL](https://www.postgresql.org/)** (15이상)
- **[PostgreSQL](https://www.postgresql.org/)** (v15以上)
- **[Redis](https://redis.io/)**
- **[FFmpeg](https://www.ffmpeg.org/)**

데비안/우분투를 사용 중이라면 `build-essential` 패키지를 설치하면 좋습니다.

:::

## 사용자 생성

Misskey는 루트 사용자로 실행하지 않는 것이 좋으므로, 대신 사용자를 생성합니다.

```sh
adduser --disabled-password --disabled-login misskey
```

## misskey 서비스 시작

```sh
sudo -iu misskey
git clone --recursive https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
```

## 설정

파일 내 지침에 따라 `default.yml`을 편집합니다.

```sh
cp .config/example.yml .config/default.yml
```

파일 내 지침에 따라 `default.yml`을 편집합니다.

## 빌드 및 초기화

다음 명령어로 Misskey를 빌드하고 데이터베이스를 초기화합니다.
이 작업은 시간이 좀 걸립니다.

```sh
NODE_ENV=production pnpm run build
pnpm run init
```

## 실행

수고하셨습니다.아래 명령어로 Misskey를 실행할 수 있습니다.

```sh
NODE_ENV=production pnpm run start
```

systemd 서비스 파일 생성하기

::::g-details{summary="systemd를 이용한 관리"}

systemd 서비스 파일 생성하기

`/etc/systemd/system/misskey.service`

편집기에서 열어, 다음 코드를 붙여넣고 저장합니다.

```ini
[Unit]
Description=Misskey daemon

[Service]
Type=simple
User=misskey
ExecStart=/usr/bin/npm start
WorkingDirectory=/home/misskey/misskey
Environment="NODE_ENV=production"
TimeoutSec=60
StandardOutput=journal
StandardError=journal
SyslogIdentifier=misskey
Restart=always

[Install]
WantedBy=multi-user.target
```

:::warning

CentOS에서 1024 이하의 포트를 사용하여 Misskey를 사용하려면 `ExecStart=/usr/bin/sudo /usr/bin/npm start`로 변경해야 합니다.

:::

systemd 리로드 및 misskey 서비스 활성화

```sh
sudo systemctl daemon-reload
sudo systemctl enable misskey
```

misskey 서비스 시작

```sh
sudo systemctl start misskey
```

:::tip

`systemctl status misskey`를 입력하면 서비스 상태를 확인할 수 있습니다.

:::

업데이트가 끝나면 Misskey 프로세스를 다시 시작하십시오.

## Misskey 업데이트 방법

:::warning

업데이트 시 반드시 [릴리스 노트](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md)를 확인하여 변경 사항 및 추가 작업 여부(대부분 없음)를 미리 파악하시기 바랍니다.

:::

master를 다시 풀링하고, 설치, 빌드, 데이터베이스 마이그레이션을 수행합니다.

```sh
git checkout master
git pull
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
NODE_ENV=production pnpm run build
pnpm run migrate
```

업데이트 내용 및 데이터베이스 규모에 따라 시간이 걸릴 수 있습니다.

업데이트가 끝나면 Misskey 프로세스를 다시 시작하십시오.

```sh
sudo systemctl restart misskey
```

:::tip

빌드 또는 시작 시 오류가 발생하면 다음 명령을 시도해 보세요.

- `pnpm run clean` 또는 `pnpm run clean-all`을 실행합니다.
- `pnpm rebuild`

:::
