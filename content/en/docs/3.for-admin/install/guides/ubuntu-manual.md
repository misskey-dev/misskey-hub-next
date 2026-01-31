# Detailed guide to installing Misskey on Ubuntu

## Other ways to install Misskey

- [Basic guide to building Misskey (manual)](./manual/)
- [List of alternative installation methods](/docs/for-admin/install/guides/#list-of-installation-methods)

## Shell Script Notice

“It's basically all copy-and-paste—just use a shell script,” right?
**So I went ahead and made one that does almost everything for you!**\
[**You can find details and usage instructions for the shell script here.**](./bash/)

:::tip

The shell script is not intended for setting up a development environment.

:::

:::tip

Please note that you need to purchase a domain, set up Cloudflare, and provision a server on your own.

:::

If you encounter any issues, please [mention @aqz@p1.a9z.dev](https://p1.a9z.dev/@aqz).

## About this article

As described in the [Misskey Setup Guide (manual)](./manual/), this article explains how to run Misskey using systemd.

If you [use docker-compose](./docker/), it should be possible to run Misskey a bit more easily, even with a manual setup.

:::danger

Do not recreate the database for a domain/hostname that is already in use on a running server!

:::

## Introduction

In this article, based on the [Misskey setup guide (manual)](./manual/), I’ll walk you through every step of installing and hosting Misskey publicly on a typical Ubuntu server.

The setup is designed to be completed using only Bash commands, a few configuration file edits, and basic browser steps.I provide brief explanations of the software you’ll install, but you don’t need to focus on the details.

To keep things concrete, this article is written for a specific environment.

Some details may differ depending on your operating system, or may have changed due to updates to Misskey itself or its dependencies. Please keep that in mind.

For unfamiliar terms, I suggest looking them up in [“An IT Terminology Dictionary That Lets You Feel Like You Understand What You ‘Almost’ Understand but Don’t,”](https://wa3.i-3-i.info/) and enjoy the feeling of “getting it.”

## Environment and Requirements

- **Ubuntu 22.04 LTS** is used as the operating system.
- Regarding hardware requirements, a recent CPU is sufficient to run the system with minimal resources.The supported architectures are amd64 and arm64.
- It is recommended to have around 4 GB of memory.
  - (Previously, it was explained that the build could be completed with approximately 1.5 GB of memory due to the introduction of Vite. However, the frontend build requirements have recently become more demanding again.)
- Purchase your own domain and use Cloudflare.
- Prepare the domain in advance using [Cloudflare Registrar](https://www.cloudflare.com/ja-jp/products/registrar/) or a similar service.
- In this guide, the domain example.tld is used for explanation. Replace it with your own domain as appropriate.For development environments, use localhost instead (explained separately in the configuration section).

:::danger

Never change the domain name or hostname of a server once it has been put into use!

:::

## How to use nano

In this guide, we will use nano as the text editor.Start it as follows:

```sh
nano /path/to/file
```

You can move the cursor using the arrow keys as well as Home/End.

To exit, press Ctrl+X. If you are asked whether to save changes, type Y (Yes) and press Enter to save.

A list of commands is shown at the bottom of the screen. Here, ^ means Ctrl and M- means Alt.

## Creating a user

Since Misskey should not be run as root, create a dedicated user.

```sh
sudo adduser --disabled-password --disabled-login misskey
```

:::tip

In a development environment, you do not need to create a separate user.

:::

## 基本的なソフトウェアのインストールと設定

基本的なソフトウェアのインストールを行う。

### Node.js

Node.jsは、サーバーサイドJavaScript環境であり、Misskeyの基本的な実行環境である。

```sh
sudo rm /usr/share/keyrings/nodesource.gpg;
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/nodesource.gpg;
NODE_MAJOR=20; echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list;
sudo apt update;
sudo apt install -y nodejs;

# Now that node.js is installed, check the version
node -v

# corepack enable
sudo corepack enable
```

v22.x.xなどと表示されればOK。v8.x.xのように低いバージョンが表示された場合は、正しくインストールが行えていないため、サーバーを再起動してもう一度インストールし直すなどしてみよう。

### pnpm

pnpmは、Misskeyで使用しているパッケージ管理ツールであり、外部ライブラリを参照したり、その依存関係を管理したりするのに使用されている。

ここでは、Node.jsに付属しているパッケージ管理ツール「npm」を使用してpnpmをインストールする方法を紹介しているが、[pnpmのウェブサイト](https://pnpm.io/installation)では他にも様々な方法でのインストール方法が紹介されているので、一度目を通したうえで、お使いの環境に最適な方法でインストールすることをお勧めする。

```sh
npm i -g pnpm
```

### PostgreSQL

PostgreSQLは、オブジェクト関係データベース管理システムであり、Misskeyの種々のデータを保存するために必要不可欠なソフトだ。

#### インストール

シェルスクリプトを実行し、最新バージョン（v15）をインストールしよう。

```sh
sudo apt install -y postgresql-common

sudo sh /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -i -v 15;

# check the status of the service with systemctl.
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
\q
```

### Redis

Redisは、NoSQLのインメモリデータベースソフトであり、データベースや連合との通信を管理するなどのために必要だ。  
redis.ioのドキュメントに従いインストールする。

https\://redis.io/docs/getting-started/installation/install-redis-on-linux/

```sh
sudo snap install redis
```

起動する

```sh
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

systemctlでデーモンの状態を確認。

```sh
systemctl status redis-server
```

activeならOK。

### FFmpeg

FFmpegは、動画や音声に関する処理を担う。以下でインストールしておく。

```sh
sudo apt install ffmpeg
```

### nginx

http\://localhost にアクセスし、\*Welcome to nginx!\*と表示されればOK。Misskeyには必須ではないが、キャッシュ等をするとパフォーマンスが向上したり、httpからhttpsへの転送などをするために、インストールしておこう。

:::tip

開発環境の場合はnginxのセットアップは不要です

:::

nginx.orgのドキュメント http\://nginx.org/en/linux_packages.html#Ubuntu に従ってインストールする。

```sh
sudo apt install -y curl ca-certificates gnupg2 lsb-release ubuntu-keyring

curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null

gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
```

Check that the output is `573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62`.

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
sudo systemctl start nginx

sudo systemctl enable nginx
```

http\://localhost にアクセスし、\*Welcome to nginx!\*と表示されればOK。\
curlで確認するのもよいだろう。

```sh
curl http://localhost
```

### その他

Git（バージョン管理ソフト）およびbuild-essential（Misskeyのビルド時に必要）をインストールする。

```sh
sudo apt update

sudo apt install -y git build-essential
```

## 追加の設定とインストール

サーバーをインターネットに公開する準備をする。

:::tip

開発環境の場合はファイヤーウォールやCloudflare、Certbotの設定は不要です

:::

### ファイヤーウォール

今回は、ファイヤーウォールとしてufwを使用する。

次では、接続許可をホワイトリスト形式とし、22番SSHポートを接続回数制限を設けながら開放、80番HTTPポート及び443番HTTPSポートを開放とした。

```sh
sudo ufw enable

sudo ufw default deny

sudo ufw limit 22

sudo ufw allow 80

sudo ufw allow 443
```

Check the status of ufw.

```sh
sudo ufw status
```

systemctlで永続化する。

```sh
sudo systemctl enable ufw
```

:::tip

ufwは、netfilter(iptables)を人間が操作しやすいようにするアプリだ。インストールスクリプトは、OCI環境ではnetfilterを直接操作する。

:::

### Cloudflare

Cloudflareは、自分のドメインに対してDNSサーバー・リバースプロキシ・CDNをいっぺんに提供してくれるたいへん便利なサービスである。\
Cloudflareを経由せずにサーバーを公開することも可能だが、たいへん便利なので導入することをお勧めする。
[**→ CDNの設定**](../resources/cdn/)

[Cloudflareにサインアップ](https://dash.cloudflare.com/sign-up) し、購入したドメインを案内に従って登録する。

DNSの登録画面でサーバーのIPアドレスを入力しておくとよい。

ドメインを購入した所によっては適用に3日程度かかる場合がある。

### Certbot (Let’s Encrypt) の設定

HTTPS･WSS通信に使用する証明書をCloudflareを使う方式でLet’s Encryptから取得する。

certbotとCloudflareプラグインをインストール

```sh
sudo apt install -y certbot python3-certbot-dns-cloudflare
```

CloudflareのAPIキーを取得する。以下の手順で取得されたい。

1. <https://dash.cloudflare.com/profile/api-tokens> にアクセス
2. Global API KeyのViewを選択
3. パスワードを入力しhCaptchaを解除、Viewを選択

Cloudflareの情報を記載した設定ファイル/etc/cloudflare/cloudflare.iniを作成する。

```sh
mkdir /etc/cloudflare
nano /etc/cloudflare/cloudflare.ini
```

dns_cloudflare_email（下の例ではbar@fuga.foo）にはCloudflareで登録しているメールアドレスを設定する。

```sh
dns_cloudflare_email = bar@fuga.foo
dns_cloudflare_api_key = xxxxxxxxxxxxxxxxxxxxxxxxxx
```

これを保存し、パーミッションを600に設定。

```sh
sudo chmod 600 /etc/cloudflare/cloudflare.ini
```

準備ができたのでコマンドを実行する。**途中の2箇所のexample.tldは自分のものに置き換えること**。

```sh
sudo certbot certonly --dns-cloudflare --dns-cloudflare-credentials /etc/cloudflare/cloudflare.ini --dns-cloudflare-propagation-seconds 60 --server https://acme-v02.api.letsencrypt.org/directory -d example.tld -d *.example.tld
```

\*Congratulations!\*と表示されたらOK。生成された.pemファイルのパスは今後使うので記録しておくこと。

自動更新の設定はインストールと同時に行われているため不要。

## Misskeyのインストール

これで前準備はあらかた終わったので、Misskeyを準備していく。

misskeyユーザーに変更。

```sh
sudo su - misskey
```

Gitでファイル類を展開。

```sh
git clone -b master https://github.com/misskey-dev/misskey.git --recurse-submodules

cd misskey

git checkout master
```

必要なnpmパッケージをインストール。

```sh
NODE_ENV=production pnpm install --frozen-lockfile
```

## Misskeyを設定する

### default.yml

設定ファイル.config/default.ymlを作成。

```sh
nano .config/default.yml
```

次の内容を貼り付け、適宜置き換える。設定値の変更が必要な箇所は●で、これまでの流れの中で設定した値を用いる箇所は〇で示した。

この設定ファイルはYAML形式で書かれており、行頭のスペースの数などを間違えるとMisskeyが動かないので、特に注意すること。

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
id: 'aidx'

# 　 syslog
syslog:
  host: localhost
  port: 514
```

指定できたら保存する。

### nginx configuration

nginxの設定を行う。

ルート権限で行う。

```sh
exit
```

Create `/etc/nginx/conf.d/misskey.conf`.

```sh
sudo nano /etc/nginx/conf.d/misskey.conf
```

[Misskey Hub](/docs/for-admin/install/resources/nginx/)の設定例をnanoへコピー＆ペーストし、次の部分を自分のものに書き換える。

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

#### CloudflareのDNSを確認する

CloudflareのDNS設定が正しいIPアドレスになっているかもう一度確認しよう。

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
