# Misskey install shell script v3.0.0

Misskey를 간단하게 설치하기 위한 쉘 스크립트가 만들어졌습니다!

몇 가지의 질문에 답변하는 것으로, Ubuntu 서버에 Misskey (v12)를 간단하게 설치할 수 있습니다!

또한, 업데이트 스크립트도 있습니다.

[v12은 여기로 (일본어)](https://github.com/joinmisskey/bash-install/blob/a096e874f93d493aa68975a31be9ce12d644e767/README.md)\
[**English version**](./README.en.md)

## 라이선스

[MIT 라이선스](./LICENSE)

## 준비할 것

1. 도메인
2. Ubuntu가 설치된 서버
3. Cloudflare 계정 (권장)

:::danger

한 번 사용한 서버의 도메인, 호스트 이름 안에선, 데이터 베이스를 다시 만들지 말아주세요!

:::

Let's Encrypt 인증을 할 수 있는 횟수가 적으므로, 서버의 네트워크가 DNS 설정을 확실히 확인한 후에 설치하시길 바랍니다.

## Cloudflare 설정

Cloudflare를 사용하는 경우, Cloudflare에서 도메인 설정을 끝낸 뒤에 설치를 하시길 바랍니다.\
\
네임 서버 설정이 각 DNS에 전파될 때까지 최대 3일 정도 걸리는 경우가 있습니다.\
\
네임 서버 설정이 각 DNS에 전파될 때까지 최대 3일 정도 걸리는 경우가 있습니다.

또한, nginx와 Cloudflare를 설정하는 경우, Cloudflare의 설정 화면에서,

- DNS 설정을 하시길 바랍니다.
- SSL/TLS 설정에서 암호화 설정을 "전체"로 해주세요.

## 조작

### 1. 최신 환경으로 하기

서버에 SSH로 연결합니다.\
\
(서버 화면을 직접 보고 계신 분은 터미널을 열어주세요.)\
\
(서버 화면을 직접 보고 계신 분은 터미널을 열어주세요.）

### 2. 최신 환경으로 하기

모든 패키지를 업데이트하고, 다시 시작합니다.

```
sudo apt update; sudo apt full-upgrade -y; sudo reboot
```

### 3. 설치 시작하기

SSH를 다시 연결하고, Misskey를 설치 해봅시다.

다만, 설치 전에 [Tips](#tips)를 읽고 시작하는 것을 매우 권장합니다.

```
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/ubuntu.sh -O ubuntu.sh; sudo bash ubuntu.sh
```

example.com은 자신의 도메인으로 바꿔주세요.

### 4. 업데이트 하기

업데이트를 위한 스크립트도 있습니다.

업데이트 스크립트는, 서버 환경의 업데이트와는 관계가 없습니다.CHANGELOG(일본어) 및 [GitHub 릴리즈 목록 (영어)](https://github.com/joinmisskey/bash-install/releases)를 참고하여, 필요에 따라 마이그레이션을 해주세요.위의 환경에서 정상적으로 움직이지 않는 경우, 버그인 경우가 있습니다.설치 했을 때 사용했던 조건들을 적고, GitHub의 Issue에서 알려주시길 바랍니다.

모든 다운로드부터 시작합니다.

```
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/update.ubuntu.sh -O update.sh
```

업데이트를 하고 싶을 땐, 아래의 스크립트를 실행해주세요.

```
sudo bash update.sh
```

- systemd 환경에서는 `-r` 옵션을 추가하여 시스템 업데이트와 다시 시작을 같이 할 수 있습니다.
- docker 환경에서는, 명령어에 업데이트 이후의 리포지터리 명:태그명을 지정할 수 있습니다.

## 정상 작동을 확인한 환경

### Oracle Cloud Infrastructure

이 스크립트는, Oracle Cloud Infrastructure의 Always Free 서비스로 제공되어지는 2 종류의 구성 중 어느 곳에서도 동작합니다.

- VM.Standard.E2.1.Micro (AMD)
- VM.Standard.A1.Flex (ARM) [1OCPU RAM6GB or greater]

iptables를 쓸 수 있게 설정하세요.

## Issues & PRs Welcome

위의 환경에서 정상적으로 움직이지 않는 경우, 버그인 경우가 있습니다.설치 했을 때 사용했던 조건들을 적고, GitHub의 Issue에서 알려주시길 바랍니다.

위에 적은 환경이 아닌 경우 서포트는 어려우나, 상황을 자세하게 알려주신다면 문제가 해결될 수도 있습니다.

기능 제안에 대해서도 환영하고 있습니다.

# Systemd or Docker?

선택지를 고르는 방법이나 사양에 대해서 등.

## Systemd or Docker?

v1부터 설치 메소드에 systemd와 Docker 등을 고를 수 있게 되었습니다.

Docker라고 했지만, **Misskey만 Docker에서 실행**하고, Redis나 Postgres 등은 호스트에서 직접 실행합니다.\
\
[docker-compose에서 모든 기능을 움직이는 방법에 대해선, mamemononga님이 작성하긴 이 포스트를 추천합니다.](https://gist.github.com/mamemomonga/5549bb69cad8e5618e5527593d4890e0)\
Docker인 경우에 만들어집니다.\
\
실행되고 있는 컨테이너와 이미지 번호를 저장하고 있습니다.\
\
컨테이너 번호는 업데이트 할 때 바뀌어집니다.오래된 이미지는 삭제됩니다.](https\://gist.github.com/mamemomonga/5549bb69cad8e5618e5527593d4890e0)

Docker Hub 이미지를 사용하는 설정이라면, Misskey를 빌드할 필요가 없으므로, **제일 추천하고 있습니다**.\
\
하지만, 마이그레이션 작업이 필요하므로, 업데이트 할 때 Misskey를 쓰지 못하는 시간이 사라지는 것은 아닙니다.\
\
또한 Misskey의 빌드 환경을 준비하지 않으므로(git pull을 안함), 포크해서 움직이게 하고 싶을 땐 설정이 많이 어려워집니다.\
\
하지만, 마이그레이션 작업이 필요하므로, 업데이트 할 때 Misskey를 쓰지 못하는 시간이 사라지는 것은 아닙니다.\
\
또한 Misskey의 빌드 환경을 준비하지 않으므로(git pull을 안함), 포크해서 움직이게 하고 싶을 땐 설정이 많이 어려워집니다.

로컬에서 Docker를 빌드하는 방식은, 퍼포먼스적으로는 권장하지 않고 있습니다.

systemd는, Docker Hub에 이미지를 올리지는 않지만, 포크를 사용하고 싶을 땐 추천합니다.

추천하는 순위는 아래와 같습니다.

1. Docker Hub
2. systemd
3. Docker 빌드

## nginx의 사용 여부

서버 1대 위에 Misskey를 구축하는 경우, nginxfmf 사용하는 것을 추천합니다.

로드 밸런서를 설치한 경우엔 nginx를 설치하지 말고, [Misskey의 nginx 설정](../resources/nginx/)을 참고하여 로드 밸런서를 설정하는 편이 나을거라고 생각합니다.

## 한 번 실패한 뒤에 다시 스크립트를 실행하는 경우

스왑을 설정하고 있는 경우, 메모리가 합쳐서 3GB 이상이지 않으면 스크립트가 움직이지 않게 되어져 있습니다.

## 한 번 실패한 뒤에 다시 스크립트를 실행하는 경우

혹시라도 한 번 실패한 상태로 다시 한 번 스크립트를 실행한 경우, 다음 내용에 주의하시길 바랍니다.

- Redis나 Postgres의 설치가 끝난 경우, "install locally"는 No로 해야합니다.\
  \
  host・port 설정은 그대로 Enter를 누릅니다.\
  \
  host・port 설정은 그대로 Enter를 누릅니다.
  유저명이나 비밀번호는 전에 실행했을 때 정했던 것을 입력합니다.

## .env 파일에 대해서

인스톨 스크립트는, 2개의 .env 파일을 만듭니다.\
\
업데이트 할 때 사용합니다.\
\
업데이트 할 때 사용합니다.

### /home/(misskey 유저)/.misskey.env

misskey를 실행할 유저를 기억하기 위해 필요합니다.

### /home/(misskey 유저)/.misskey.env

Docker인 경우에 만들어집니다.\
systemd인 경우에 만들어집니다.\
\
주로 디렉토리를 기억하는데 사용합니다.

### /home/(misskey 유저)/.misskey-docker.env

Docker인 경우에 만들어집니다.\
\
실행되고 있는 컨테이너와 이미지 번호를 저장하고 있습니다.\
\
컨테이너 번호는 업데이트 할 때 바뀌어집니다.오래된 이미지는 삭제됩니다.

## 자신이 직접 관리하기

설치 후, 구성을 변경할 때 도움이 될 수도 있는 메모입니다.

"example.com"을 본인 도메인으로 바꿔서 읽으시길 바랍니다.

### Misskey 디렉토리

Misskey 소스는 `/home/유저명/디렉토리`로 clone 되어집니다.\
\
(유저, 디렉토리의 초기 값은 둘 다 misskey 입니다.)\
유저명이나 비밀번호는 전에 실행했을 때 정했던 것을 입력합니다.）

Misskey 디렉토리는, 아래와 같이 이동하는 것을 추천합니다.

```
sudo -iu 유저명
cd 디렉토리
```

앞에서 사용 중이던 유저에 돌아가기 위해선 exit를 실행합니다.

```
exit
```

### systemd

systemd의 프로세스명은 example.com 입니다.\
\
예를 들어서 다시 시작하려면 다음과 같이하면 됩니다.\
한 줄로 하고 싶을 땐 아래와 같이 하시면 됩니다.

```
journalctl -t example.com
```

journalctl에서 로그를 확인할 수 있습니다.

```
journalctl -t example.com
```

설정 파일은 `/etc/systemd/system/example.com.service`에 저장되어져 있습니다.

### Docker

Docker는 Misskey 유저에서 rootless로 실행되어져 있습니다.

sudo에서 Misskey 유저에 로그인 할 때, `XDG_RUNTIME_DIR`과 `DOCKER_HOST`를 변경할 필요가 있습니다.

```
sudo -iu 유저명
export XDG_RUNTIME_DIR=/run/user/$UID
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock

# 프로세스 리스트를 표시
docker ps

# 빌드 (리포지터리: local/misskey:latest)
docker build -t local/misskey:latest ./misskey

# docker run
docker run -d -p 3000:3000 --add-host=docker_host:10.0.0.1 -v /home/misskey/misskey/files:/misskey/files -v "/home/misskey/misskey/.config/default.yml":/misskey/.config/default.yml:ro --restart unless-stopped -t "local/misskey:latest"

# 로그 표시하기
docker logs --tail 50 -f 컨테이너ID
```

한 줄로 하고 싶을 땐 아래와 같이 하시면 됩니다.

```
sudo -u 유저명 XDG_RUNTIME_DIR=/run/user/$(id -u 유저명) DOCKER_HOST=unix:///run/user/$(id -u 유저명)/docker.sock docker ps
```

### Redis

nginx 설정은 `/etc/nginx/conf.d/example.com.conf`에 저장되어져 있습니다.

### Redis

requirepass와 bind를 `/etc/redis/misskey.conf`로 설정하고 있습니다.

## Q. 업데이트 한 뒤에 502 표시로 접속이 안돼요.

Docker에서는, 부팅 후 마이그레이션 작업을 하기 위해 바로 접속할 수 없습니다.\
\
마이그레이션이 끝나있는지 확인해보시길 바랍니다.\
\
마이그레이션이 끝나있는지 확인해보시길 바랍니다.

systemd인 경우, pnpm install에서 실패되어져 있는 경우가 있습니다.

Misskey 디렉토리에서 다음의 내용을 실행해서, 한 번 더 업데이트를 해보시길 바랍니다.

```
pnpm run clean-all
```

journalctl으로 로그를 확인해보면, 대부분 re2...

## Q. 같은 서버에 Misskey 인스턴스를 하나 더 열고 싶어요.

스크립트가 같은 서버에 추가로 Misskey를 설치하는 것을 상정하고 만들어져 있진 않습니다.\
\
여러가지 설정이 덮어 씌여지거나, 도중에 에러가 날 수도 있습니다.\
\
여러가지 설정이 덮어 씌여지거나, 도중에 에러가 날 수도 있습니다.
