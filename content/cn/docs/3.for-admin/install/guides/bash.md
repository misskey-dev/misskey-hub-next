# Misskey 安装 shell 脚本 v3.0.0

我们现在有一个 shell 脚本来轻松安装 Misskey！

只需几个步骤，您就可以轻松地在您的 Ubuntu 服务器上安装 Misskey （v12）！

还有一个更新脚本

[单击此处查看 v12](https://github.com/joinmisskey/bash-install/blob/a096e874f93d493aa68975a31be9ce12d644e767/README.md)\
[**英文版**](./README.en.md)

## 准备工作

1. 域名
2. Ubuntu系统服务器
3. Cloudflare 帐户（推荐）

:::danger

请勿使用已启动的服务器的域主机名重新创建数据库！

:::

您可以尝试使用Let's Encrypt进行身份验证的次数很少，因此在开始安装之前，请仔细检查服务器的网络和DNS设置

## Cloudflare 配置

如果您使用的是 Cloudflare，请确保在开始安装之前设置您的 Cloudflare 域名\
\
应用名称服务器最多可能需要72个小时

另外，在配置 nginx 和 Cloudflare 时，在 Cloudflare 设置页面上

- 设置 DNS
- 在 SSL/TLS 设置中，将加密模式设置为“完全”

## 操作

### 1. 链接SSH服务器终端

通过 SSH 连接到服务器\
\
（如果您是通过桌面端服务器，请打开 shell进行链接）

### 2. 构建所需环境

将所有软件包更新并重新启动

```sh
sudo apt update; sudo apt full-upgrade -y; sudo reboot
```

### 3. 开始安装

重新连接您的 SSH 并开始安装 Misskey

在安装之前强烈建议阅读[Tips](#tips)

```sh
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/ubuntu.sh -O ubuntu.sh; sudo bash ubuntu.sh
```

将 example.com 替换为您自己的域名

### 4. 更新服务

官方提供了一个用于更新的脚本

アップデートスクリプトは、環境のアップデートは行いません。\
CHANGELOG（日语）以及[GitHub 上的发布列表（英语）](https://github.com/joinmisskey/bash-install/releases)请参阅以执行适当的迁移操作

首先，下载更新脚本

```sh
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/update.ubuntu.sh -O update.sh
```

当您需要进行更新更新时，请执行该脚本

```sh
sudo bash update.sh
```

- 在 systemd 环境内，您可以选择性地更新和重新启动系统`-r`
- 在 Docker 环境中，您可以在参数中指定更新的仓库名称：标签名称

## 動作を確認した環境

### Oracle Cloud Infrastructure

このスクリプトは、Oracle Cloud InfrastructureのAlways Freeサービスで提供されている2種類のシェイプのいずれにおいても動作します。

- VM.Standard.E2.1.Micro (AMD)
- VM.Standard.A1.Flex (ARM) [1OCPU RAM6GB or greater]

iptablesを使うようにしてください。

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

お勧めする順番は次の通りです。

1. Docker Hub
2. systemd
3. Dockerビルド

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
アップデートの際に使用します。

### /root/.misskey.env

misskeyを実行するユーザーを覚えておくために必要です。

### /home/(misskeyユーザー)/.misskey.env

systemdの場合に生成されます。\
\
主にディレクトリを覚えておくのに使用します。

### /home/(misskeyユーザー)/.misskey-docker.env

Dockerの場合に生成されます。\
\
実行されているコンテナとイメージの番号を保存しています。\
\
コンテナの番号はアップデートの際に更新されます。古いイメージは削除されます。

## 自分で管理する

インストール後、構成を変更する際に役立つかもしれないメモです。

"example.com"を自分のドメインに置き換えて読んでください。

### Misskeyディレクトリ

Misskeyのソースは`/home/ユーザー/ディレクトリ`としてcloneされます。\
\
（ユーザー、ディレクトリの初期値はともにmisskeyです。）

Misskeyディレクトリへは、以下のように移動するとよいでしょう。

```sh
sudo -iu ユーザー
cd ディレクトリ
```

もとのユーザーに戻るにはexitを実行します。

```sh
exit
```

### systemd

systemdのプロセス名はexample.comです。\
\
たとえば再起動するには次のようにします。

```sh
sudo systemctl restart example.com
```

journalctlでログを確認できます。

```sh
journalctl -t example.com
```

設定ファイルは`/etc/systemd/system/example.com.service`として保存されています。

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

nginxの設定は`/etc/nginx/conf.d/example.com.conf`として保存されています。

### Redis

requirepassとbindを`/etc/redis/misskey.conf`で設定しています。

## Q. アップデート後に502でアクセスできない

Dockerでは、起動後にマイグレーションをするため、すぐにアクセスできません。\
\
マイグレーションが終わっているかどうか確認してみてください。

systemdの場合では、pnpm installに失敗している可能性があります。

Misskeyディレクトリで次の内容を実行し、もう一度アップデートを実行してみてください。

```sh
pnpm run clean-all
```

journalctlでログを確認すると、たいていre2が云々という記述が見当たります。

## Q. 同じサーバーにもう1つMisskeyを建てたい

スクリプトは同じサーバーに追加でMisskeyをインストールすることは想定していません。\
\
幾つかの設定が上書きされるか、途中でエラーになってしまうでしょう。
