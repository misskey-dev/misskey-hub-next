# Ubuntu 버전 Misskey 설치 방법 자세히 알아보기

## 기타 Misskey 설치 방법

- [기본 버전 Misskey 구축 가이드 (manual)](. /manual/)
- [기타 설치 방법 목록](/docs/for-admin/install/guides/#설치 방법 목록)

## 쉘 스크립트 안내

복사, 붙여넣기만 하면 쉘 스크립트로 하면 되지 않겠느냐는 생각으로 **쉘 스크립트로 거의 모든 것을 해주는 방법을 만들어 보았습니다!**\
[**쉘 스크립트에 대한 자세한 내용과 사용법은 여기에서 확인하세요!**](./bash/)

:::tip

シェルスクリプトでの開発環境へのインストールは想定されていません。

:::

:::tip

이 글에서는 [Misskey 구축 가이드 (manual)](./manual/)에 소개된 대로 systemd에서 Misskey를 동작시키고 있습니다.

:::

不具合があれば[ @aqz@p1.a9z.dev へのメンション](https://p1.a9z.dev/@aqz)にてお知らせいただければと思います。

## 소개

이 글에서는 [Misskey 구축 가이드 (manual)](./manual/)을 바탕으로 일반적인 우분투 서버에 Misskey를 설치하고 공개하는 방법을 하나하나 설명합니다.

[docker-compose](./docker/)なら、手作業でももうちょっと簡単に実行できるはずです。

:::danger

OS의 차이, Misskey 본체나 의존하는 소프트웨어의 버전업으로 변경된 부분 등이 있을 수 있지만, 양해 부탁드립니다.

:::

## 환경 및 조건

この記事では、[Misskey構築の手引き (manual)](./manual/)を基に、一般的なUbuntuサーバーへMisskeyをインストールし公開する方法の一挙手一投足を解説する。

Bashのコマンド入力、いくつかの設定ファイルの編集、そしてブラウザの操作だけで設定が完了するようにしている。インストールするソフトウェアについて簡単に説明しているが、気にする必要はない。

この記事では、具体性を重視し、特定の環境に特化した記述をしている。

OSの違い、Misskey本体や依存するソフトウェアのバージョンアップで変わってしまった部分等があるかもしれないが、ご容赦いただきたく思う。

わからない単語については、[『「分かりそう」で「分からない」でも「分かった」気になれるIT用語辞典』](https://wa3.i-3-i.info/) で調べて分かった気になってほしい。

## 環境と条件

- OSは**Ubuntu 22.04.1 LTS**を利用する。
- ハードウェア要件としては、CPUは最近のものなら最小限で動く。アーキテクチャはamd64及びarm64を想定している。
- メモリは1.5GB程度あればよい。（Viteの導入等により、1.5GB程度でもビルド可能になった）
- 独自のドメインを購入し、CloudFlareを使用する。
- ドメインは[Google Domains](https://domains.google/intl/ja_jp/)などで予め用意しておくこと。
- ここではドメインをexample.tldとして解説を進めるので、自分が買ったドメインに適宜置き換えて読むこと。開発環境の場合はlocalhostと読み替えます（設定ファイルの項で別途説明）

:::danger

一度使用を始めたサーバーのドメイン・ホスト名は、決して変更しないでください！

:::

## nanoの使い方

今回はテキストエディターにnanoを使う。次のように起動する。

```sh
nano /path/to/file
```

기본적인 소프트웨어를 설치합니다.

終了はCtrl+Xで、変更を保存するか聞かれた場合Y(Yes)を入力しEnterすると保存できる。

Node.js는 서버사이드 자바스크립트 환경으로 Misskey의 기본 실행 환경입니다.

## ユーザーの作成

Misskeyはrootで実行しない方がよいため、専用のユーザーを作成する。

```sh
sudo adduser --disabled-password --disabled-login misskey
```

:::tip

開発環境の場合はユーザーを分ける必要はありません

:::

## 基本的なソフトウェアのインストールと設定

active라면 OK.

### 사용자 및 데이터베이스 생성

psql을 실행합니다.

```sh
sudo -u postgres psql
```

Misskey에서 사용할 사용자를 생성합니다.\
사용자 이름을 misskey, 비밀번호를 hoge로 설정하면 다음과 같습니다.

### PostgreSQL

PostgreSQLは、オブジェクト関係データベース管理システムであり、Misskeyの種々のデータを保存するために必要不可欠なソフトだ。

#### インストール

シェルスクリプトを実行し、最新バージョン（v15）をインストールしよう。

```sh
sudo apt install -y postgresql-common

sudo sh /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -i -v 15;

# systemctlでデーモンの状態を確認。
systemctl status postgresql
```

activeならOK。

#### ユーザーとデータベースの作成

psqlを起動。

```sh
sudo -u postgres psql
```

Misskeyで使うユーザーを作成する。\
ユーザー名をmisskey、パスワードをhogeとする場合は次のようになる。\
（LinuxのユーザーとPostgreSQLのユーザーは別物なので、混同しないよう注意すること。）

```sql
CREATE ROLE misskey LOGIN PASSWORD 'hoge';
```

データベースを作成。データベース名をmk1としている。

```sql
CREATE DATABASE mk1 OWNER misskey;
¥q
```

### Redis

Redisは、NoSQLのインメモリデータベースソフトであり、データベースや連合との通信を管理するなどのために必要だ。
redis.ioのドキュメントに従いインストールする。 https\://redis.io/docs/getting-started/installation/install-redis-on-linux/

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

activeならOK。

### nginx

http\://localhost에 접속하여 \*Welcome to nginx!\*라고 표시되면 OK.\
curl에서 확인하는 것도 좋은 방법입니다.

:::tip

開発環境の場合はnginxのセットアップは不要です

:::

nginx.orgのドキュメント http\://nginx.org/en/linux_packages.html#Ubuntu に従ってインストールする。

```sh
sudo apt install ubuntu-keyring

curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null

gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
```

서버를 인터넷에 공개할 준비를 합니다.

```sh
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list

echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" | sudo tee /etc/apt/preferences.d/99nginx

sudo apt update

sudo apt install -y nginx
```

systemctlでデーモンの状態を確認。

```sh
systemctl status nginx
```

activeならOK。そうでなければ、次のコマンドを実行。

```sh
sudo ufw enable

sudo ufw default deny

sudo ufw limit 22

sudo ufw allow 80

sudo ufw allow 443
```

http\://localhost にアクセスし、\*Welcome to nginx!\*と表示されればOK。\
curlで確認するのもよいだろう。

```sh
sudo ufw status
```

### その他

Git（バージョン管理ソフト）およびbuild-essential（Misskeyのビルド時に必要）をインストールする。

```sh
sudo apt update

sudo apt install -y git build-essential
```

## CloudFlare

サーバーをインターネットに公開する準備をする。

:::tip

DNS 등록 화면에서 서버의 IP 주소를 입력하면 됩니다.

:::

### Certbot (Let's Encrypt) 설정

HTTPS･WSS 통신에 사용할 인증서를 CloudFlare를 사용하는 방식으로 Let's Encrypt에서 발급받습니다.

certbot과 CloudFlare 플러그인 설치하기

```sh
sudo apt install -y certbot python3-certbot-dns-cloudflare
```

ufwのステータスを確認しておく。

```sh
sudo ufw status
```

CloudFlare의 정보를 담은 설정 파일 /etc/cloudflare/cloudflare.ini를 생성합니다.

```sh
mkdir /etc/cloudflare
nano /etc/cloudflare/cloudflare.ini
```

:::tip

ufwは、netfilter(iptables)を人間が操作しやすいようにするアプリだ。インストールスクリプトは、OCI環境ではnetfilterを直接操作する。

:::

### CloudFlare

준비가 되었으니 명령을 실행합니다.**중간에 있는 2곳의 example.tld는 자신의 것으로 교체**.

[CloudFlareにサインアップ](https://dash.cloudflare.com/sign-up) し、購入したドメインを案内に従って登録する。

DNSの登録画面でサーバーのIPアドレスを入力しておくとよい。

자동 업데이트 설정은 설치와 동시에 이루어지기 때문에 불필요합니다.

### Misskey 설치하기

이제 사전 준비는 어느 정도 끝났으니 미스키를 준비할 차례입니다.

misskey 사용자로 변경.

```sh
sudo su - misskey
```

CloudflareのAPIキーを取得する。以下の手順で取得されたい。

1. https\://dash.cloudflare.com/profile/api-tokens にアクセス
2. Global API KeyのViewを選択
3. パスワードを入力しhCaptchaを解除、Viewを選択

필요한 npm 패키지를 설치합니다.

```sh
NODE_ENV=production pnpm install --frozen-lockfile
```

dns_cloudflare_email（下の例ではbar\@fuga.foo）にはCloudFlareで登録しているメールアドレスを設定する。

```sh
dns_cloudflare_email = bar@fuga.foo
dns_cloudflare_api_key = xxxxxxxxxxxxxxxxxxxxxxxxxx
```

설정 파일 .config/default.yml을 생성합니다.

```sh
nano .config/default.yml
```

다음 내용을 붙여넣고 적절하게 바꿉니다.설정값의 변경이 필요한 부분은 ●, 지금까지의 흐름에서 설정된 값을 사용하는 부분은 ○으로 표시하였습니다.

```sh
sudo certbot certonly --dns-cloudflare --dns-cloudflare-credentials /etc/cloudflare/cloudflare.ini --dns-cloudflare-propagation-seconds 60 --server https://acme-v02.api.letsencrypt.org/directory -d example.tld -d *.example.tld
```

\*Congratulations!\*と表示されたらOK。生成された.pemファイルのパスは今後使うので記録しておくこと。

自動更新の設定はインストールと同時に行われているため不要。

## Misskeyのインストール

지정이 완료되면 저장합니다.

misskeyユーザーに変更。

```sh
sudo su - misskey
```

루트 권한으로 변경합니다.

```sh
exit
```

/etc/nginx/conf.d/misskey.conf를 작성합니다.

```sh
sudo nano /etc/nginx/conf.d/misskey.conf
```

## Misskeyを設定する

### default.yml

변경 사항을 저장합니다.

```sh
nano .config/default.yml
```

次の内容を貼り付け、適宜置き換える。設定値の変更が必要な箇所は●で、これまでの流れの中で設定した値を用いる箇所は〇で示した。

OK라면 nginx 데몬을 재시작합니다.

設定できる値と記述方法は[.config/example.yml](https://github.com/syuilo/misskey/blob/develop/.config/example.yml)に書かれている。

:::tip

開発環境の場合、urlは`url: http://localhost:3000`と指定します。

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
id: 'aid'

# 　 syslog
syslog:
  host: localhost
  port: 514
```

misskey 사용자로 다시 로그인합니다.

### nginxの設定

nginxの設定を行う。

ルート権限で行う。

```sh
exit
```

/etc/nginx/conf.d/misskey.confを作成する。

```sh
sudo nano /etc/nginx/conf.d/misskey.conf
```

[Misskey Hub](https://misskey-hub.net/docs/admin/nginx/)の設定例をnanoへコピー＆ペーストし、次の部分を自分のものに書き換える。

- 서버에 스왑 추가하기
- 로컬에서 빌드한 것(built 디렉토리)을 sftp로 전송하기
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

Misskey의 웰컴 페이지가 표시되어야 합니다.

```sh
sudo systemctl status nginx
```

activeであればOK。

## CloudFlare의 DNS 확인하기

CloudFlare의 DNS 설정이 올바른 IP 주소로 설정되어 있는지 다시 한 번 확인해봅니다.

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

## Misskeyを起動する

```sh
sudo systemctl daemon-reload

sudo systemctl enable misskey

sudo systemctl start misskey
```

**Now listening on port 3000 on** [**http://example.tld**](http://example.tld) と表示されたら、設定したURLにアクセスする。

Misskeyのウェルカムページが表示されるはずだ。

active라면 OK.

### アクセスできない場合

#### CloudFlareのDNSを確認する

CloudFlareのDNS設定が正しいIPアドレスになっているかもう一度確認しよう。

#### ルーターの設定を確認する

自宅サーバーの場合、ルーターがサーバーと外部との80ポート・443ポートの通信を許可する設定になっているかどうか確認しよう。

[Misskey 업데이트 방법](. /manual/#misskey 업데이트 방법)

## Misskeyのデーモンを作成

:::tip

開発環境の場合、デーモンの作成は不要です。

:::

재부팅 후 Misskey는 자동으로 시작됩니다.

ルート権限で行う。

```sh
sudo systemctl start misskey
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
