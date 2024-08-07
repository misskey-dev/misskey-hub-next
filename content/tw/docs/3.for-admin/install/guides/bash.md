# Misskey install shell script v3.0.0

現在可以透過 shell script 簡單安裝 Misskey！

您可以只回答幾個問題，然後在 Ubuntu Server 上面簡單的安裝 Misskey (v12) ！

另外，有可能有更新後的 Script.

[v12 版在此處 (日語文件)](https://github.com/joinmisskey/bash-install/blob/a096e874f93d493aa68975a31be9ce12d644e767/README.md)\
[**English version**](./README.en.md)

## 需要事前準備的東西

1. 域名
2. 安裝好 Ubuntu 的 Server
3. Cloudflare 帳號 （推薦）

:::danger

一旦開始使用，請勿使用伺服器的域名以及主機名稱重新建立資料庫！

:::

由於 Let's Enctypt 的認證嘗試次數是有限的，因此請在開始安裝之前先仔細檢查伺服器的網路或 DNS 是否設定正確。

## 設定 Cloudflare

Cloudflareを使う場合、Cloudflareのドメインの設定を完了してからインストールを開始するようにしてください。\
\
ネームサーバーの適用には最大で3日程度かかる場合があります。

また、nginxとCloudflareを設定する場合、Cloudflareの設定画面にて、

- DNSを設定してください。
- SSL/TLS設定にて、暗号化モードを「フル」に設定してください。

## 操作

### 1. SSH

サーバーにSSH接続します。\
\
（サーバーのデスクトップを開いている方はシェルを開きましょう。）

### 2. 環境を最新にする

將所有套件更新到最新，然後重新開機。

```sh
sudo apt update; sudo apt full-upgrade -y; sudo reboot
```

### 3. 開始安裝

SSHを接続しなおして、Misskeyのインストールを始めましょう。

ただ、インストール前に[Tips](#tips)を読むことを強くお勧めします。

```sh
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/ubuntu.sh -O ubuntu.sh; sudo bash ubuntu.sh
```

請將其中的 example.com 換成自己的域名。

### 4. 進行更新

這邊也有用於更新用的 script.

アップデートスクリプトは、環境のアップデートは行いません。CHANGELOG（日本語）および[GitHubのリリース一覧（英語）](https://github.com/joinmisskey/bash-install/releases)を参考に、適宜マイグレーション操作を行なってください。

まずはダウンロードします。

```sh
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/update.ubuntu.sh -O update.sh
```

アップデートしたいときにスクリプトを実行してください。

```sh
sudo bash update.sh
```

- systemd環境では、`-r`オプションでシステムのアップデートと再起動を行うことができます。
- docker環境では、引数に更新後のリポジトリ名:タグ名を指定することができます。

## 已確認可以正常運作的環境

### Oracle Cloud Infrastructure

このスクリプトは、Oracle Cloud InfrastructureのAlways Freeサービスで提供されている2種類のシェイプのいずれにおいても動作します。

- VM.Standard.E2.1.Micro (AMD)
- VM.Standard.A1.Flex (ARM) [1OCPU RAM6GB or greater]

請使用 iptables.

## Issues & PRs Welcome

上記の環境で動作しない場合、バグの可能性があります。インストールの際に指定された条件を記載の上、GitHubのIssue機能にてご報告いただければ幸いです。

上記以外の環境についてのサポートは難しいですが、状況を詳しくお教えいただければ解決できる可能性があります。

機能の提案についても歓迎いたします。

# Tips

選択肢の選び方や仕様についてなど。

## Systemd or Docker?

v1から、インストールメソッドにsystemdとDockerとを選べるようにしました。

Dockerと言っても、**MisskeyだけをDockerで実行**し、RedisやPostgresなどはホストで直接実行します。\
\
[docker-composeですべての機能を動かす方法については、mamemonongaさんが作成したこちらの記事がおすすめです。](https://gist.github.com/mamemomonga/5549bb69cad8e5618e5527593d4890e0)

Docker Hubイメージを使う設定であれば、Misskeyのビルドが不要になるため、**一番お勧めです**。\
\
ただし、マイグレーションは必要なので、アップデート時にMisskeyを使えない時間がゼロになるわけではありません。\
\
また、Misskeyのビルド環境を準備しない(git pullしない)ので、フォークを動かしたくなった時に設定が面倒になります。

ローカルでDockerをビルドする方式は、パフォーマンス面で非推奨です。

systemdは、Docker Hubにイメージを上げるまでもないものの、フォークを使いたい場合にお勧めです。

推薦順序如下：

1. Docker Hub
2. systemd
3. Docker Build

## nginxを使うかどうか

以下のケースに該当する場合を除き、インターネットとMisskeyの仲立ちをするリバースプロキシとしてnginxの採用をおすすめしています。

- ユーザは自分のみ（いわゆるお一人様サーバー）or ごく少数
- ロードバランサー等nginxのリバースプロキシ・キャッシュ機能を他の手段で賄う用意がある（上級者向け）

nginxをリバースプロキシとして採用することにより、画像ファイルなどの静的コンテンツをキャッシュしサーバーリソースの浪費を抑えることが出来ます。
また、nginxにはキャッシュが無い状態での大量アクセスを上手くコントロールする機能が搭載されていますので、Misskeyの負荷増大を抑える効果を期待できます。

設定例は[nginxの設定](../resources/nginx/)ページにて記載しています。

## Add more swaps!

スワップを設定している場合、メモリが合計で3GB以上でなければスクリプトが動作しないようになっています。

## 途中で失敗してまたスクリプトを実行する場合

万が一途中で失敗してもう一度スクリプトを動作させる場合、次のことに注意してください。

- RedisやPostgresのインストールが終わっている場合、「install locally」はNoにしてください。\
  \
  host・port設定はそのままEnterを押します。
  ユーザー名やパスワードは、前回実行した際に指定したものを入力します。

## .envファイルについて

インストールスクリプトは、2つの.envファイルを作成します。\
\
在更新時會使用到。

### /root/.misskey.env

misskeyを実行するユーザーを覚えておくために必要です。

### /home/(misskey user)/.misskey.env

systemdの場合に生成されます。\
\
実行されているコンテナとイメージの番号を保存しています。

### /home/(misskey user)/.misskey-docker.env

Dockerの場合に生成されます。\
\
実行されているコンテナとイメージの番号を保存しています。\
\
コンテナの番号はアップデートの際に更新されます。古いイメージは削除されます。

## 自分で管理する

インストール後、構成を変更する際に役立つかもしれないメモです。

"example.com"を自分のドメインに置き換えて読んでください。

### Misskey 目錄

Misskey 的原始碼會被 clone 到 `/home/{{user}}/{{directory}}` 底下。\
\
（{{user}}、{{directory}} 的預設值都是 misskey。）

如果要移動到 Misskey 目錄，請透過以下指令移動。

```sh
sudo -iu {{user}}
cd {{directory}}
```

要返回本來的 user 請輸入 exit.

```sh
exit
```

### systemd

systemd 的 process name 是 example.com.\
\
たとえば再起動するには次のようにします。

```sh
sudo systemctl restart example.com
```

可以透過 journalctl 來檢查紀錄檔。

```sh
journalctl -t example.com
```

設定檔被放在 `/etc/systemd/system/example.com.service`

### Docker

DockerはMisskeyユーザーでrootless実行されています。

sudo でMisskeyユーザーに入るときは、`XDG_RUNTIME_DIR`と`DOCKER_HOST`を変更する必要があります。

```sh
sudo -iu ユーザー
export XDG_RUNTIME_DIR=/run/user/$UID
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock

# プロセス一覧を表示
docker ps

# ビルド (リポジトリ: local/misskey:latest)
docker build -t local/misskey:latest ./misskey

# docker run
docker run -d -p 3000:3000 --add-host=docker_host:10.0.0.1 -v /home/misskey/misskey/files:/misskey/files -v "/home/misskey/misskey/.config/default.yml":/misskey/.config/default.yml:ro --restart unless-stopped -t "local/misskey:latest"

# ログを表示
docker logs --tail 50 -f コンテナID
```

ワンライナーなら次のようにします。

```sh
sudo -u ユーザー XDG_RUNTIME_DIR=/run/user/$(id -u ユーザー) DOCKER_HOST=unix:///run/user/$(id -u ユーザー)/docker.sock docker ps
```

### nginx

nginx 的設定被放在 `/etc/nginx/conf.d/example.com.conf`

### Redis

requirepassとbindを`/etc/redis/misskey.conf`で設定しています。

## Q. 更新後出現 502 無法存取

Dockerでは、起動後にマイグレーションをするため、すぐにアクセスできません。\
\
マイグレーションが終わっているかどうか確認してみてください。

systemdの場合では、pnpm installに失敗している可能性があります。

Misskeyディレクトリで次の内容を実行し、もう一度アップデートを実行してみてください。

```sh
pnpm run clean-all
```

journalctlでログを確認すると、たいていre2が云々という記述が見当たります。

## Q. 想要在同個伺服器裡面再建一個 Misskey

スクリプトは同じサーバーに追加でMisskeyをインストールすることは想定していません。\
\
幾つかの設定が上書きされるか、途中でエラーになってしまうでしょう。
