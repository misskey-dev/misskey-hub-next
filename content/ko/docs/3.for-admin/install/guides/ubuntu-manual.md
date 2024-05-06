# Ubuntu 버전 Misskey 설치 방법 자세히 알아보기

## 기타 Misskey 설치 방법

- [기본 버전 Misskey 구축 가이드 (manual)](.
- [기타 설치 방법 목록](/docs/for-admin/install/guides/#설치 방법 목록)

## 쉘 스크립트 안내

복사, 붙여넣기만 하면 쉘 스크립트로 하면 되지 않겠느냐는 생각으로 **쉘 스크립트로 거의 모든 것을 해주는 방법을 만들어 보았습니다!**\
[**쉘 스크립트에 대한 자세한 내용과 사용법은 여기에서 확인하세요!**](./bash/)

:::tip

쉘 스크립트를 통한 개발 환경에서의 설치는 예상하지 않았습니다.

:::

:::tip

도메인 구매 및 Cloudflare 설정, 서버 확보는 여러분이 직접 준비해 주시기 바랍니다.

:::

문제가 있으면 [@aqz@p1.a9z.dev 에 멘션](https://p1.a9z.dev/@aqz)으로 알려주시면 감사하겠습니다.

## 이 글에 대하여

이 글에서는 [Misskey 구축 가이드 (manual)](./manual/)에 소개된 대로 systemd에서 Misskey를 동작시키고 있습니다.

[docker-compose](./docker/)를 사용하면 수작업으로 조금 더 쉽게 실행할 수 있을 것입니다.

:::danger

일단 작동하기 시작한 서버의 도메인 및 호스트 이름으로는 데이터베이스를 다시 만들지 마십시오!

:::

## 환경 및 조건

이 글에서는 [Misskey 구축 가이드 (manual)](./manual/)을 바탕으로 일반적인 우분투 서버에 Misskey를 설치하고 공개하는 방법을 하나하나 설명합니다.

Bash 명령어 입력과 몇 가지 설정 파일 편집, 그리고 브라우저 조작만으로 설정이 완료될 수 있도록 했습니다.설치해야 할 소프트웨어에 대해 간략하게 설명하고 있지만, 크게 신경 쓸 필요는 없습니다.설치해야 할 소프트웨어에 대해 간략하게 설명하고 있지만, 크게 신경 쓸 필요는 없습니다.

이 글에서는 구체성을 중시하여 특정 환경에 특화된 설명을 하고 있습니다.

OS의 차이, Misskey 본체나 의존하는 소프트웨어의 버전업으로 변경된 부분 등이 있을 수 있지만, 양해 부탁드립니다.

모르는 단어에 대해서는 ["알 것 같지만""모르지만""알았다""알 것 같지만""알았다""알 것 같지 않은 IT 용어사전](https://wa3.i-3-i.info/)에서 찾아보고 확인하시면 좋겠습니다.

## 환경 및 조건

- OS는 **Ubuntu 22.04.1 LTS**를 사용합니다.
- 클라우드의 경우에도 네트워크 설정에서 포트 개방이 필요한 경우가 많습니다.하드웨어 요구 사항으로 CPU는 최신 제품이라면 최소사양으로도 작동합니다.아키텍처는 amd64 및 arm64를 가정합니다.
- 램은 4GB 정도만 있어도 충분합니다.
  - (기존에 Vite의 도입으로 1.5GB만 있어도 빌드가 가능하다고 설명했지만, 최근 들어 프론트엔드 빌드로 필요한 용량이 늘어났습니다.）
- 자체 도메인을 구입하고 CloudFlare를 사용하세요.
- 도메인은 [Google Domains](https://domains.google/intl/ja_jp/) 등에서 미리 준비해야 합니다.
- 여기서는 도메인을 example.tld로 설명할 것이므로, 자신이 구입한 도메인으로 적절히 대체하여 읽도록 합니다.개발 환경의 경우 localhost로 대체합니다(설정 파일 항목에서 별도 설명).개발 환경의 경우 localhost로 대체합니다(설정 파일 항목에서 별도 설명).

:::danger

일단 사용하기 시작한 서버의 도메인 및 호스트 이름은 절대로 변경하지 마십시오!

:::

## nano 사용법

이번에는 텍스트 편집기로 nano를 사용합니다.다음과 같이 실행합니다.다음과 같이 실행합니다.

```sh
nano /path/to/file
```

일반적인 화살표 버튼이나 Home/End 등을 이용해 커서를 이동할 수 있습니다.

종료는 Ctrl+X, 변경사항을 저장할 것인지 묻는다면 Y(Yes)를 입력하고 Enter를 누르면 저장할 수 있습니다.

하단에 명령어 목록이 표시되므로 ^를 Ctrl, M-를 Alt로 바꿔서 참고합니다.

## 사용자 생성

Misskey는 루트에서 실행하지 않는 것이 좋기 때문에 전용 사용자를 생성합니다.

```sh
sudo adduser --disabled-password --disabled-login misskey
```

:::tip

개발 환경의 경우 사용자를 구분할 필요가 없습니다.

:::

## 기본적인 소프트웨어 설치 및 설정

기본적인 소프트웨어를 설치합니다.

### 사용자 및 데이터베이스 생성

Node.js는 서버사이드 자바스크립트 환경으로 Misskey의 기본 실행 환경입니다.

```sh
sudo apt install -y curl

curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -

sudo apt install -y nodejs

# Node.js가 설치되었으므로 버전을 확인합니다.
node -v

# corepack enable
sudo corepack enable
```

v20.x.x 등으로 표시되면 OK.v8.x.x와 같이 낮은 버전이 표시되면 제대로 설치가 되지 않은 것이므로 서버를 재부팅하고 다시 설치하는 등 다시 한 번 시도해 봅니다.

### PostgreSQL

PostgreSQL은 객체 관계형 데이터베이스 관리 시스템이며, 미스키의 다양한 데이터를 저장하는 데 필수적인 소프트웨어입니다.

#### 설치

쉘 스크립트를 실행하고 최신 버전(v15)을 설치합니다.

```sh
sudo apt install -y postgresql-common

sudo sh /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -i -v 15;

# systemctl로 데몬의 상태 확인.
systemctl status postgresql
```

active라면 OK.

#### 사용자 및 데이터베이스 생성

psql을 실행합니다.

```sh
sudo -u postgres psql
```

Misskey에서 사용할 사용자를 생성합니다.\
사용자 이름을 misskey, 비밀번호를 hoge로 설정하면 다음과 같습니다.\
(리눅스 사용자와 PostgreSQL 사용자는 별개이므로 혼동하지 않도록 주의.）\
사용자 이름을 misskey, 비밀번호를 hoge로 설정하면 다음과 같습니다.\
(리눅스 사용자와 PostgreSQL 사용자는 별개이므로 혼동하지 않도록 주의.）

```sql
CREATE ROLE misskey LOGIN PASSWORD 'hoge';
```

데이터베이스를 생성합니다.데이터베이스를 생성합니다.데이터베이스 이름을 mk1이라고 합니다.

```sql
CREATE DATABASE mk1 OWNER misskey;
¥q
```

### Redis

Redis는 NoSQL의 인메모리 데이터베이스 소프트웨어로, 데이터베이스 및 연합과의 통신 관리 등을 위해 필요합니다.\
redis.io의 문서에 따라, snap을 이용해 설치합니다.

https://redis.io/docs/getting-started/installation/install-redis-on-linux/

```sh
sudo snap install redis
```

systemctl로 데몬 상태 확인.

```sh
systemctl status nginx
```

active이면 OK.

### nginx

nginx는 주로 리버스 프록시에 사용되는 웹 서버 소프트웨어입니다.Misskey에 필수적인 것은 아니지만, 캐시 등을 하면 성능이 향상되고 http에서 https로 전송하는 등의 작업을 위해 설치해 둡니다.

:::tip

개발 환경의 경우 nginx 설정이 필요하지 않습니다.

:::

nginx.org의 문서 http\://nginx.org/en/linux_packages.html#Ubuntu 에 따라 설치합니다.

```sh
sudo apt install -y curl ca-certificates gnupg2 lsb-release ubuntu-keyring

curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null

gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
```

이때 출력에 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62가 있는지 확인합니다.

```sh
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list

echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" | sudo tee /etc/apt/preferences.d/99nginx

sudo apt update

sudo apt install -y nginx
```

systemctl로 데몬 상태를 확인합니다.실행에 시간이 조금 걸리므로 15초 정도 기다렸다가 시작하는 것이 좋습니다.

```sh
systemctl status nginx
```

active라면 OK.그렇지 않은 경우 다음 명령을 실행합니다.

```sh
sudo ufw enable

sudo ufw default deny

sudo ufw limit 22

sudo ufw allow 80

sudo ufw allow 443
```

http://localhost에 접속하여 \*Welcome to nginx!\*라고 표시되면 OK.\
curl에서 확인하는 것도 좋은 방법입니다.

```sh
sudo ufw status
```

### 기타

Git(버전 관리 소프트웨어) 및 build-essential(Misskey 빌드 시 필요)을 설치합니다.

```sh
sudo apt update

sudo apt install -y git build-essential
```

## 추가 설정 및 설치

서버를 인터넷에 공개할 준비를 합니다.

:::tip

개발 환경의 경우 방화벽, CloudFlare, Certbot 설정이 필요하지 않습니다.

:::

### 방화벽

HTTPS･WSS 통신에 사용할 인증서를 CloudFlare를 사용하는 방식으로 Let's Encrypt에서 발급받습니다.

다음은 접속 허용을 화이트리스트 형식으로 하여 22번 SSH 포트를 접속 횟수 제한을 두어 개방하고, 80번 HTTP 포트와 443번 HTTPS 포트를 개방했습니다.

```sh
sudo apt install -y certbot python3-certbot-dns-cloudflare
```

ufw의 상태를 확인합니다.

```sh
sudo ufw status
```

systemctl로 영구화합니다.

```sh
mkdir /etc/cloudflare
nano /etc/cloudflare/cloudflare.ini
```

:::tip

이번에는 방화벽으로 ufw를 사용합니다.ufw는 넷필터(iptables)를 사람이 쉽게 조작할 수 있도록 하는 앱입니다.설치 스크립트는 OCI 환경에서는 netfilter를 직접 조작합니다.

:::

### CloudFlare

CloudFlare는 자신의 도메인에 대해 DNS 서버, 리버스 프록시, CDN을 한 번에 제공해 주는 매우 편리한 서비스입니다.\
CloudFlare를 경유하지 않고 서버를 공개하는 것도 가능하지만, 매우 편리하기 때문에 도입하는 것이 좋습니다.
[**→ CDN 설정**](../resources/cdn/)

[CloudFlare에 가입(https://dash.cloudflare.com/sign-up)하고, 구매한 도메인을 안내에 따라 등록합니다.

DNS 등록 화면에서 서버의 IP 주소를 입력하면 됩니다.

도메인 구입처에 따라 적용에 3일 정도 소요될 수 있습니다.

### Certbot (Let's Encrypt) 설정

HTTPS･WSS 통신에 사용할 인증서를 CloudFlare를 사용하는 방식으로 Let's Encrypt에서 발급받습니다.

certbot과 CloudFlare 플러그인 설치하기

```sh
sudo su - misskey
```

Cloudflare의 API 키를 얻습니다.아래 절차에 따라 취득합니다.

1. https\://dash.cloudflare.com/profile/api-tokens에 접속
2. Global API Key의 View 선택
3. 비밀번호 입력 및 hCaptcha 해제, View 선택

CloudFlare의 정보를 담은 설정 파일 /etc/cloudflare/cloudflare.ini를 생성합니다.

```sh
NODE_ENV=production pnpm install --frozen-lockfile
```

dns_cloudflare_email(아래 예에서는 bar\@fuga.foo)에는 CloudFlare에 등록한 이메일 주소를 설정합니다.

```sh
dns_cloudflare_email = bar@fuga.foo
dns_cloudflare_api_key = xxxxxxxxxxxxxxxxxxxxxxxxxx
```

이를 저장하고 권한을 600으로 설정합니다.

```sh
nano .config/default.yml
```

다음 내용을 붙여넣고 적절하게 바꿉니다.**중간에 있는 2곳의 example.tld는 자신의 것으로 교체합니다**.

```sh
sudo certbot certonly --dns-cloudflare --dns-cloudflare-credentials /etc/cloudflare/cloudflare.ini --dns-cloudflare-propagation-seconds 60 --server https://acme-v02.api.letsencrypt.org/directory -d example.tld -d *.example.tld
```

\*Congratulations!\*라고 표시되면 OK.생성된 .pem 파일의 경로는 나중에 사용할 것이므로 기록해 두어야 합니다.

자동 업데이트 설정은 설치와 동시에 이루어지기 때문에 불필요합니다.

## Misskey 설치하기

지정이 완료되면 저장합니다.

misskey 사용자로 변경.

```sh
sudo su - misskey
```

Git으로 파일들을 전개.

```sh
exit
```

필요한 npm 패키지를 설치합니다.

```sh
sudo nano /etc/nginx/conf.d/misskey.conf
```

## Misskey 구성하기

### default.yml

설정 파일 .config/default.yml을 생성합니다.

```sh
nano .config/default.yml
```

다음 내용을 붙여넣고 적절하게 바꿉니다.설정값의 변경이 필요한 부분은 ●, 지금까지의 흐름에서 설정된 값을 사용하는 부분은 ○으로 표시하였습니다.

이 설정 파일은 YAML 형식으로 작성되어 있으며, 줄의 시작 부분의 띄어쓰기 등을 잘못하면 Misskey가 동작하지 않으므로 특히 주의해야 합니다.

설정할 수 있는 값과 작성 방법은 [.config/example.yml](https://github.com/syuilo/misskey/blob/develop/.config/example.yml)에 나와 있습니다.

:::tip

개발 환경의 경우 url은 `url: http://localhost:3000`로 지정합니다.

:::

```yml
# ● Misskeyを公開するURL
url: https://example.tld/
# ポートを3000とする。
port: 3000

# ● PostgreSQLの設定。
db:
  host: localhost
  port: 5432
  db  : mk1 # 〇 PostgreSQLのデータベース名
  user: misskey # 〇 PostgreSQLのユーザー名
  pass: hoge # ● PostgreSQLのパスワード

# 　 Redisの設定。
redis:
  host: localhost
  port: 6379

# 　 IDタイプの設定。
id: 'aidx'

# 　 syslog
syslog:
  host: localhost
  port: 514
```

지정이 완료되면 저장합니다.

### nginx 설정하기

nginx를 설정합니다.

루트 권한으로 변경합니다.

```sh
exit
```

/etc/nginx/conf.d/misskey.conf를 작성합니다.

```sh
sudo nano /etc/nginx/conf.d/misskey.conf
```

[Misskey Hub](https://misskey-hub.net/docs/admin/nginx/)의 설정 예시를 nano에 복사하여 붙여넣고, 다음 부분을 자신의 것으로 바꿔서 작성합니다.

- 18행과 30행의 도메인 이름
- 34-35번째 행의 인증서 경로를 Certbot으로 취득한 인증서로 바꾸면 됩니다(기본적으로 example.tld를 대체하면 됩니다).
- 56행 (다른 리버스 프록시 또는 CDN 뒤에 있는 경우 다음을 제거합니다.) 에서 4행 삭제

변경 사항을 저장합니다.

설정 파일이 제대로 작동하는지 확인합니다.

```sh
sudo nginx -t
```

OK라면 nginx 데몬을 재시작합니다.

```sh
sudo systemctl restart nginx
```

상태를 확인합니다.

```sh
sudo systemctl status nginx
```

active라면 OK.

## Misskey 빌드

misskey 사용자로 다시 로그인합니다.

```sh
sudo su - misskey
```

빌드합니다.네, 할 수 있습니다...네, 할 수 있습니다...

```sh
cd misskey
NODE_ENV=production pnpm run build
```

:::tip

개발 환경의 경우 `NODE_ENV=production`은 필요하지 않습니다.이후 명령어에서도 마찬가지로 삭제해 주세요.

:::

### 서버에서 빌드할 수 없는 경우

RAM 부족이 원인일 수 있습니다.

미스키의 빌드 및 데이터베이스 마이그레이션(초기화 포함)을 위해서는 2GB 이상의 RAM이 필요합니다.\
RAM이 부족한 경우 다음과 같은 해결책을 생각해 볼 수 있습니다.

- 서버에 스왑 추가하기
- 로컬에서 빌드한 것(built 디렉토리)을 sftp로 전송하기

## 데이터베이스 초기화

```sh
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

## Misskey 실행하기

```sh
sudo systemctl daemon-reload

sudo systemctl enable misskey

sudo systemctl start misskey
```

**Now listening on port 3000 on** [**http://example.tld**](http://example.tld) 라고 표시되면 설정한 URL에 접속합니다.

Misskey의 웰컴 페이지가 표시되어야 합니다.

계정 생성, 노트 작성, 파일 업로드 등 일련의 작업이 제대로 이루어지고 있는지 확인해 봅니다.

### 액세스 할 수 없는 경우

#### CloudFlare의 DNS 확인하기

CloudFlare의 DNS 설정이 올바른 IP 주소로 설정되어 있는지 다시 한 번 확인해봅니다.

#### 라우터 설정 확인하기

홈 서버의 경우, 라우터가 서버와 외부와의 80포트, 443포트 통신을 허용하도록 설정되어 있는지 확인합니다.

[Misskey 업데이트 방법](./manual/#misskey 업데이트 방법)

## Misskey의 데몬 생성

:::tip

개발 환경의 경우, 데몬을 만들 필요가 없습니다.

:::

일단 Ctrl+C로 프로세스를 종료하고, Misskey를 데몬으로 실행하도록 설정해 봅시다.

루트 권한으로 변경합니다.

```sh
sudo systemctl start misskey
```

/etc/systemd/system/misskey.service를 만듭니다.

```sh
sudo nano /etc/systemd/system/misskey.service
```

다음 내용을 붙여넣고 저장합니다.

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

systemd를 설정하고 misskey 데몬을 실행합니다.

```sh
sudo systemctl daemon-reload

sudo systemctl enable misskey

sudo systemctl start misskey
```

systemctl로 데몬의 상태를 확인합니다.실행에 시간이 조금 걸리므로 15초 정도 기다렸다가 시작하는 것이 좋습니다.

```sh
sudo systemctl status misskey
```

active라면 OK.

**이것으로 Misskey 설치가 거의 완료되었습니다.**\*\*

Misskey 서버에 자신의 계정을 등록하고 로그인하여 설정을 진행합니다.

## Misskey 설정 계속하기

- [Misskey 서버에서 가장 먼저 설정해야 할 서버 설정 및 기타 설정에 대한 설명\*\*](https://hide.ac/articles/Y504SIabp)
- [**Squid 프록시를 설정하여 Misskey를 보호하세요**](https://hide.ac/articles/MC7WsPDqw)
- [**Misskey의 데이터베이스를 백업하자【OCI 오브젝트 스토리지 편】**](https://hide.ac/articles/E2Ea3cauk)

## Misskey 업데이트

/manual/#misskey 업데이트 방법)

작업 중에는 Misskey를 사용할 수 없습니다.

```sh
sudo systemctl stop misskey

su - misskey

git pull;
NODE_ENV=production pnpm install --frozen-lockfile
pnpm run clean;
NODE_ENV=production pnpm run build;
pnpm run migrate;

exit
```

### Case 1: apt upgrade를 하는 경우

```sh
sudo apt update -y
sudo apt full-upgrade -y
sudo reboot
```

재부팅 후 Misskey는 자동으로 시작됩니다.

### Case 2: 그대로 실행

```sh
sudo systemctl start misskey
```
