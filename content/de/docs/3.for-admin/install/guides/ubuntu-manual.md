# Detaillierte Anleitung zur Installation von Misskey auf Ubuntu

## Weitere Methoden zur Installation von Misskey

- [Grundlegender Leitfaden zum Einrichten von Misskey (manuell)](./manual/)
- [Liste weiterer Installationsmethoden](/docs/for-admin/install/guides/#installationsmethoden)

## Ankündigung für Shell-Skripte

Wenn es nur ums Copy-Paste geht, dann kann man das doch genauso gut mit einem Shell-Skript erledigen. Also habe ich ein Shell-Skript entwickelt, **das fast alles für dich macht!**\
[**Details und Anweisungen zur Verwendung des Shell-Skripts findest du hier!**](./bash/)

:::tip

Die Installation in einer Entwicklungsumgebung mithilfe des Shell-Skripts ist nicht vorgesehen.

:::

:::tip

Bitte kümmer dich selbst um den Kauf der Domain, die Einrichtung von Cloudflare und die Beschaffung des Servers.

:::

Bitte melde eventuelle Probleme, indem du Erwähnung an [@aqz@p1.a9z.dev ](https://p1.a9z.dev/@aqz) sendest.

## Über diesen Artikel

In diesem Artikel erkläre ich, dass ich Misskey gemäß dem [Misskey-Einrichtungsleitfaden (Handbuch)](./manual/) mit systemd betreibe. Außerdem möchte ich darauf hinweisen, dass es mit [docker-compose](./docker/) manuell etwas einfacher sein sollte, Misskey auszuführen.

Mit [docker-compose](./docker/) sollte es manuell etwas einfacher sein, Misskey auszuführen.

:::danger

Ändere nicht die Datenbank für einen Domain- oder Hostnamen eines Servers, den du bereits verwendest!

:::

## Einführung

Dieser Artikel erklärt Schritt für Schritt, wie Misskey auf einem allgemeinen Ubuntu-Server installiert und öffentlich zugänglich gemacht wird, basierend auf dem [Misskey-Einrichtungsleitfaden (Handbuch)](./manual/).

Die Einrichtung ist so konzipiert, dass sie nur Eingaben von Bash-Befehlen, das Bearbeiten einiger Konfigurationsdateien und die Bedienung des Browsers erfordert, um abgeschlossen zu werden.Es wird eine kurze Erklärung zur zu installierenden Software gegeben, aber dies ist nicht weiter von Bedeutung.

In diesem Artikel wird besonderer Wert auf Konkretheit gelegt und spezifische Umgebungen detailliert beschrieben.

Es könnten Unterschiede im Betriebssystem, in Misskey selbst oder in den Versionen der abhängigen Software auftreten, weshalb einige Teile sich verändert haben könnten. Wir bitten um Verständnis.

Bei unklaren Begriffen wird empfohlen, im [IT-Wörterbuch](https://wa3.i-3-i.info/) nachzuschlagen, um sich ein besseres Verständnis zu verschaffen.

## Umgebung und Bedingungen

- Als Betriebssystem wird **Ubuntu 22.04 LTS** verwendet.
- Bezüglich der Hardwareanforderungen reicht eine aktuelle CPU für den minimalen Betrieb aus.Die Architektur ist auf amd64 und arm64 ausgelegt.
- Ein Arbeitsspeicher von etwa 4 GB ist empfehlenswert.
  - Zuvor wurde erklärt, dass durch die Einführung von Vite der Build mit etwa 1,5 GB möglich war. (aber in letzter Zeit sind die Anforderungen für den Frontend-Build wieder gestiegen.)
- Eine eigene Domain wird erworben und Cloudflare wird verwendet.
- Die Domain sollte im Voraus bei [Cloudflare Registrar](https://www.cloudflare.com/ja-jp/products/registrar/) oder einem ähnlichen Dienst registriert werden.
- Hier wird die Domain example.tld verwendet, daher sollte diese entsprechend durch die gekaufte Domain ersetzt werden.Im Falle einer Entwicklungsumgebung ist localhost zu verwenden (weitere Erläuterungen im Abschnitt zu den Konfigurationsdateien).

:::danger

Ändere niemals die Domain oder den Hostnamen eines Servers, sobald er in Gebrauch genommen wurde!

:::

## Verwendung von Nano

Dieses Mal werden wir den Texteditor nano verwenden.Starten wie folgt:

```sh
nano /path/to/file
```

Sie können die Pfeiltasten sowie die Home/End-Tasten verwenden, um den Cursor zu bewegen.

Beenden Sie das Programm mit `Ctrl+X`. Wenn Sie gefragt werden, ob Sie Änderungen speichern möchten, geben Sie `Y` (Yes) ein und drücken Sie `Enter`, um die Änderungen zu speichern.

Eine Liste der Befehle wird unten angezeigt. Ersetzen Sie `^` durch `Ctrl` und `M-` durch `Alt`, um sie zu verwenden.

## Erstellung eines Benutzers

Da Misskey nicht als root ausgeführt werden sollte, wird ein dedizierter Benutzer erstellt.

```sh
sudo adduser --disabled-password --disabled-login misskey
```

:::tip

Im Entwicklungsumfeld ist es nicht notwendig, Benutzer zu trennen.

:::

## Installation und Konfiguration grundlegender Software

Grundlegende Software installieren.

### Node.js

Node.js ist eine serverseitige JavaScript-Laufzeitumgebung und die grundlegende Ausführungsumgebung für Misskey.

```sh
sudo rm /usr/share/keyrings/nodesource.gpg;
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/nodesource.gpg;
NODE_MAJOR=20; echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list;
sudo apt update;
sudo apt install -y nodejs;

# Node.jsがインストールされたので、バージョンを確認する。
node -v

# corepack enable
sudo corepack enable
```

Wenn `v20.x.x` oder ähnlich angezeigt wird, ist alles in Ordnung.Wenn eine niedrigere Version wie `v8.x.x` angezeigt wird, ist die Installation nicht korrekt durchgeführt worden. Starten den Server neu und versuche, die Installation erneut durchzuführen.

### pnpm

pnpmは、Misskeyで使用しているパッケージ管理ツールであり、外部ライブラリを参照したり、その依存関係を管理したりするのに使用されている。

ここでは、Node.jsに付属しているパッケージ管理ツール「npm」を使用してpnpmをインストールする方法を紹介しているが、[pnpmのウェブサイト](https://pnpm.io/installation)では他にも様々な方法でのインストール方法が紹介されているので、一度目を通したうえで、お使いの環境に最適な方法でインストールすることをお勧めする。

```sh
npm i -g pnpm
```

### PostgreSQL

PostgreSQL ist ein objektrelationales Datenbankmanagementsystem und eine unverzichtbare Software zur Speicherung der verschiedenen Daten von Misskey.

#### Installieren

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
\q
```

### Redis

Redisは、NoSQLのインメモリデータベースソフトであり、データベースや連合との通信を管理するなどのために必要だ。\
redis.ioのドキュメントに従い、snapでインストールする。

https://redis.io/docs/getting-started/installation/install-redis-on-linux/

```sh
sudo snap install redis
```

systemctlでデーモンの状態を確認。

```sh
systemctl status redis-server
```

activeならOK。

### nginx

nginxは、主としてリバースプロキシに用いられるWebサーバーソフトである。Misskeyには必須ではないが、キャッシュ等をするとパフォーマンスが向上したり、httpからhttpsへの転送などをするために、インストールしておこう。

:::tip

開発環境の場合はnginxのセットアップは不要です

:::

nginx.orgのドキュメント http://nginx.org/en/linux_packages.html#Ubuntu に従ってインストールする。

```sh
sudo apt install -y curl ca-certificates gnupg2 lsb-release ubuntu-keyring

curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null

gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
```

このとき出力に 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62 とあるか確認する。

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

<http://localhost> にアクセスし、\*Welcome to nginx!\*と表示されればOK。\
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

ufwのステータスを確認しておく。

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
