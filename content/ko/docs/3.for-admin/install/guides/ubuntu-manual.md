# Ubuntu 버전 Misskey 설치 방법 자세히 알아보기

## 기타 Misskey 설치 방법

- [기본 버전 Misskey 구축 가이드 (manual)](. /manual/)
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

이 글에서는 [Misskey 구축 가이드 (manual)](. /manual/)에 소개된 대로 systemd에서 Misskey를 동작시키고 있습니다.

[docker-compose](. /docker/)를 사용하면 수작업으로 조금 더 쉽게 실행할 수 있을 것입니다.

:::danger
일단 작동하기 시작한 서버의 도메인 및 호스트 이름으로는 데이터베이스를 다시 만들지 마십시오!
:::

## 소개

이 글에서는 [Misskey 구축 가이드 (manual)](. /manual/)을 바탕으로 일반적인 우분투 서버에 Misskey를 설치하고 공개하는 방법을 하나하나 설명합니다.

Bash 명령어 입력과 몇 가지 설정 파일 편집, 그리고 브라우저 조작만으로 설정이 완료될 수 있도록 했습니다.설치해야 할 소프트웨어에 대해 간략하게 설명하고 있지만, 크게 신경 쓸 필요는 없습니다.

이 글에서는 구체성을 중시하여 특정 환경에 특화된 설명을 하고 있습니다.

OS의 차이, Misskey 본체나 의존하는 소프트웨어의 버전업으로 변경된 부분 등이 있을 수 있지만, 양해 부탁드립니다.

모르는 단어에 대해서는 [『"알 것 같지만""모르지만""알았다""알 것 같지만""알았다""알 것 같지 않은 IT 용어사전』(https\://wa3.i-3-i.info/)에서 찾아보고 확인하시면 좋겠습니다.

## 환경 및 조건

- OS는 **Ubuntu 22.04.1 LTS**를 사용합니다.
- 하드웨어 요구 사항으로 CPU는 최신 제품이라면 최소사양으로도 작동합니다.아키텍처는 amd64 및 arm64를 가정합니다.
- 메모리는 1.5GB 정도면 충분합니다.(Vite 도입 등으로 1.5GB 정도도 빌드 가능해짐)
- 자체 도메인을 구입하고 CloudFlare를 사용하세요.
- 도메인은 [Google Domains](https://domains.google/intl/ja_jp/) 등에서 미리 준비해야 합니다.
- 여기서는 도메인을 example.tld로 설명할 것이므로, 자신이 구입한 도메인으로 적절히 대체하여 읽도록 합니다.개발 환경의 경우 localhost로 대체합니다(설정 파일 항목에서 별도 설명).

:::danger
일단 사용하기 시작한 서버의 도메인 및 호스트 이름은 절대로 변경하지 마십시오!
:::

## nano 사용법

이번에는 텍스트 편집기로 nano를 사용합니다.다음과 같이 실행합니다.

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

### Node.js

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
(리눅스 사용자와 PostgreSQL 사용자는 별개이므로 혼동하지 않도록 주의.）

```sql
CREATE ROLE misskey LOGIN PASSWORD 'hoge';
```

데이터베이스를 생성합니다.데이터베이스 이름을 mk1이라고 합니다.

```sql
CREATE DATABASE mk1 OWNER misskey;
¥q
```

### Redis

Redis는 NoSQL의 인메모리 데이터베이스 소프트웨어로, 데이터베이스 및 연합과의 통신 관리 등을 위해 필요합니다.
redis.io의 문서에 따라 설치합니다. https\://redis.io/docs/getting-started/installation/install-redis-on-linux/

```sh
sudo apt install -y curl ca-certificates gnupg2 lsb-release

curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt update

sudo apt install -y redis
```

systemctl로 데몬의 상태를 확인합니다.

```sh
systemctl status redis-server
```

active라면 OK.

### nginx

nginx는 주로 리버스 프록시에 사용되는 웹 서버 소프트웨어입니다.Misskey에 필수적인 것은 아니지만, 캐시 등을 하면 성능이 향상되고 http에서 https로 전송하는 등의 작업을 위해 설치해 둡니다.

:::tip
개발 환경의 경우 nginx 설정이 필요하지 않습니다.
:::

nginx.org의 문서 http\://nginx.org/en/linux_packages.html#Ubuntu 에 따라 설치합니다.

```sh
sudo apt install ubuntu-keyring

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

systemctl로 데몬 상태 확인.

```sh
systemctl status nginx
```

active라면 OK.그렇지 않은 경우 다음 명령을 실행합니다.

```sh
sudo systemctl start nginx

sudo systemctl enable nginx
```

http\://localhost에 접속하여 \*Welcome to nginx!\*라고 표시되면 OK.\
curl에서 확인하는 것도 좋은 방법입니다.

```sh
curl http://localhost
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

이번에는 방화벽으로 ufw를 사용합니다.

다음은 접속 허용을 화이트리스트 형식으로 하여 22번 SSH 포트를 접속 횟수 제한을 두어 개방하고, 80번 HTTP 포트와 443번 HTTPS 포트를 개방했습니다.

```sh
sudo ufw enable

sudo ufw default deny

sudo ufw limit 22

sudo ufw allow 80

sudo ufw allow 443
```

ufw의 상태를 확인합니다.

```sh
sudo ufw status
```

systemctl로 영구화합니다.

```sh
sudo systemctl enable ufw
```

:::tip
ufw는 넷필터(iptables)를 사람이 쉽게 조작할 수 있도록 하는 앱입니다.설치 스크립트는 OCI 환경에서는 netfilter를 직접 조작합니다.
:::

### CloudFlare

CloudFlare는 자신의 도메인에 대해 DNS 서버, 리버스 프록시, CDN을 한 번에 제공해 주는 매우 편리한 서비스입니다.\
CloudFlare를 경유하지 않고 서버를 공개하는 것도 가능하지만, 매우 편리하기 때문에 도입하는 것이 좋습니다.
[**→ CDN 설정**](../resources/cdn/)

[CloudFlare에 가입(https\://dash.cloudflare.com/sign-up)하고, 구매한 도메인을 안내에 따라 등록합니다.

DNS 등록 화면에서 서버의 IP 주소를 입력하면 됩니다.

도메인 구입처에 따라 적용에 3일 정도 소요될 수 있습니다.

### Certbot (Let's Encrypt) 설정

HTTPS･WSS 통신에 사용할 인증서를 CloudFlare를 사용하는 방식으로 Let's Encrypt에서 발급받습니다.

certbot과 CloudFlare 플러그인 설치하기

```sh
sudo apt install -y certbot python3-certbot-dns-cloudflare
```

Cloudflare의 API 키를 얻습니다.아래 절차에 따라 취득합니다.

1. https\://dash.cloudflare.com/profile/api-tokens에 접속
2. Global API Key의 View 선택
3. 비밀번호 입력 및 hCaptcha 해제, View 선택

CloudFlare의 정보를 담은 설정 파일 /etc/cloudflare/cloudflare.ini를 생성합니다.

```sh
mkdir /etc/cloudflare
nano /etc/cloudflare/cloudflare.ini
```

dns_cloudflare_email(아래 예에서는 bar\@fuga.foo)에는 CloudFlare에 등록한 이메일 주소를 설정합니다.

```sh
dns_cloudflare_email = bar@fuga.foo
dns_cloudflare_api_key = xxxxxxxxxxxxxxxxxxxxxxxxxx
```

이를 저장하고 권한을 600으로 설정합니다.

```sh
sudo chmod 600 /etc/cloudflare/cloudflare.ini
```

준비가 되었으니 명령을 실행합니다.**중간에 있는 2곳의 example.tld는 자신의 것으로 교체**.

```sh
sudo certbot certonly --dns-cloudflare --dns-cloudflare-credentials /etc/cloudflare/cloudflare.ini --dns-cloudflare-propagation-seconds 60 --server https://acme-v02.api.letsencrypt.org/directory -d example.tld -d *.example.tld
```

\*Congratulations!\*라고 표시되면 OK.생성된 .pem 파일의 경로는 나중에 사용할 것이므로 기록해 두어야 합니다.

자동 업데이트 설정은 설치와 동시에 이루어지기 때문에 불필요합니다.

## Misskey 설치하기

이제 사전 준비는 어느 정도 끝났으니 미스키를 준비할 차례입니다.

misskey 사용자로 변경.

```sh
sudo su - misskey
```

Git으로 파일들을 전개.

```sh
git clone -b master https://github.com/misskey-dev/misskey.git --recurse-submodules

cd misskey

git checkout master
```

필요한 npm 패키지를 설치합니다.

```sh
NODE_ENV=production pnpm install --frozen-lockfile
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
# ● Misskey를 공개할 URL
url: https://example.tld/
# 포트를 3000으로 설정한다.
port: 3000

# ● PostgreSQL 설정。
db:
  host: localhost
  port: 5432
  db  : mk1 # 〇 PostgreSQL의 데이터베이스 이름
  user: misskey # 〇 PostgreSQL 사용자 이름
  pass: hoge # ● PostgreSQL 패스워드

# 　 Redis 설정.
redis:
  host: localhost
  port: 6379

# 　 ID 유형 설정.
id: 'aid'

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

- 18行目と30行目のドメイン名
- 34-35行目の証明書へのパスをCertbotで取得したものに (基本的にexample.tldを置き換えるだけでOK)
- 56行目 (If it's behind another reverse proxy or CDN, remove the following.) から4行を削除

変更を保存する。

設定ファイルがきちんと機能するか確認。

```sh
sudo nginx -t
```

OKならば、nginxデーモンを再起動。

```sh
sudo systemctl restart nginx
```

ステータスを確認。

```sh
sudo systemctl status nginx
```

activeであればOK。

## Misskeyのビルド

misskeyユーザーにログインし直す。

```sh
sudo su - misskey
```

ビルドをする。yes we can…

```sh
cd misskey
NODE_ENV=production pnpm run build
```

:::tip
開発環境の場合、`NODE_ENV=production`は不要です。以降のコマンドでも同様に削除してください。
:::

### サーバーでビルドできない場合

RAMの不足が考えられる。

Misskeyのビルドやデータベースのマイグレーション（初期化を含む）には、RAMが2GB以上必要になっている。\
RAMが足りない場合、以下のような解決策が考えられる。

- サーバーにスワップを追加する
- ローカルでビルドしたもの（builtディレクトリ）をsftpで転送する

## データベースの初期化

```sh
pnpm run init
```

## Misskeyを起動する

```sh
NODE_ENV=production pnpm run start
```

**Now listening on port 3000 on** [**http://example.tld**](http://example.tld) と表示されたら、設定したURLにアクセスする。

Misskeyのウェルカムページが表示されるはずだ。

アカウントの作成、ノートの作成やファイルのアップロードといった一通りの操作が正しく行えるか確認しよう。

### アクセスできない場合

#### CloudFlareのDNSを確認する

CloudFlareのDNS設定が正しいIPアドレスになっているかもう一度確認しよう。

#### ルーターの設定を確認する

自宅サーバーの場合、ルーターがサーバーと外部との80ポート・443ポートの通信を許可する設定になっているかどうか確認しよう。

クラウドの場合でも、ネットワーク設定でポート開放が必要な場合が多い。

## Misskeyのデーモンを作成

:::tip
開発環境の場合、デーモンの作成は不要です。
:::

いったんCtrl+Cでプロセスをキルし、Misskeyをデーモンで起動する設定をしよう。

ルート権限で行う。

```sh
exit
```

/etc/systemd/system/misskey.serviceを作成する。

```sh
sudo nano /etc/systemd/system/misskey.service
```

次の内容を貼り付け、保存する。

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

systemdを設定し、misskeyデーモンを開始。

```sh
sudo systemctl daemon-reload

sudo systemctl enable misskey

sudo systemctl start misskey
```

systemctlでデーモンの状態を確認。起動に少し時間がかかるため、15秒程度待ってからのほうが良い。

```sh
sudo systemctl status misskey
```

activeならOK。

**これでMisskeyのインストールはほぼ完了だ。**

Misskeyサーバーに自分のアカウントを登録・ログインし、設定を続けよう。

## Misskeyの設定を続ける

- [**Misskeyサーバーで最初に設定するべきサーバー設定とその他設定の説明**](https://hide.ac/articles/Y504SIabp)
- [**Squidプロキシを設定してMisskeyを守る**](https://hide.ac/articles/MC7WsPDqw)
- [**Misskeyのデータベースをバックアップしよう【OCIオブジェクトストレージ編】**](https://hide.ac/articles/E2Ea3cauk)

## Misskeyのアップデート

[Misskeyのアップデート方法](./manual/#misskeyのアップデート方法)

作業中はMisskeyを使うことができません。

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

### Case 1: apt upgradeをする場合

```sh
sudo apt update -y
sudo apt full-upgrade -y
sudo reboot
```

再起動後はMisskeyは自動で起動します。

### Case 2: そのまま起動

```sh
sudo systemctl start misskey
```
