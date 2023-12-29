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

Let's Encrypt 인증을 할 수 있는 횟수가 적으므로, 서버의 네트워크가 DNS 설정을 확실히 확인한 후에 설치하시길 바랍니다.

:::

Let's Encryptの認証を試行できる回数が少ないので、サーバーのネットワークやDNSの設定を十分確認してからインストールを開始してください。

## Cloudflareの設定

Cloudflareを使う場合、Cloudflareのドメインの設定を完了してからインストールを開始するようにしてください。\
ネームサーバーの適用には最大で3日程度かかる場合があります。

また、nginxとCloudflareを設定する場合、Cloudflareの設定画面にて、

- DNSを設定してください。
- SSL/TLS設定にて、暗号化モードを「フル」に設定してください。

## 操作

### 2. 최신 환경으로 하기

サーバーにSSH接続します。\
（サーバーのデスクトップを開いている方はシェルを開きましょう。）

### 2. 環境を最新にする

すべてのパッケージを最新にし、再起動します。

```
sudo apt update; sudo apt full-upgrade -y; sudo reboot
```

### 3. インストールをはじめる

SSHを接続しなおして、Misskeyのインストールを始めましょう。

example.com은 자신의 도메인으로 바꿔주세요.

```
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/ubuntu.sh -O ubuntu.sh; sudo bash ubuntu.sh
```

업데이트를 위한 스크립트도 있습니다.

### 4. アップデートする

모든 다운로드부터 시작합니다.

アップデートスクリプトは、環境のアップデートは行いません。CHANGELOG（日本語）および[GitHubのリリース一覧（英語）](https://github.com/joinmisskey/bash-install/releases)を参考に、適宜マイグレーション操作を行なってください。

업데이트를 하고 싶을 땐, 아래의 스크립트를 실행해주세요.

```
sudo bash update.sh
```

アップデートしたいときにスクリプトを実行してください。

```
sudo bash update.sh
```

- systemd環境では、`-r`オプションでシステムのアップデートと再起動を行うことができます。
- docker環境では、引数に更新後のリポジトリ名:タグ名を指定することができます。

## 動作を確認した環境

### Oracle Cloud Infrastructure

iptables를 쓸 수 있게 설정하세요.

- VM.Standard.E2.1.Micro (AMD)
- VM.Standard.A1.Flex (ARM) [1OCPU RAM6GB or greater]

iptablesを使うようにしてください。

## Issues & PRs Welcome

上記の環境で動作しない場合、バグの可能性があります。インストールの際に指定された条件を記載の上、GitHubのIssue機能にてご報告いただければ幸いです。

上記以外の環境についてのサポートは難しいですが、状況を詳しくお教えいただければ解決できる可能性があります。

선택지를 고르는 방법이나 사양에 대해서 등.

# Systemd or Docker?

v1부터 설치 메소드에 systemd와 Docker 등을 고를 수 있게 되었습니다.

## Systemd or Docker?

v1から、インストールメソッドにsystemdとDockerとを選べるようにしました。

Dockerと言っても、**MisskeyだけをDockerで実行**し、RedisやPostgresなどはホストで直接実行します。\
[docker-composeですべての機能を動かす方法については、mamemonongaさんが作成したこちらの記事がおすすめです。](https://gist.github.com/mamemomonga/5549bb69cad8e5618e5527593d4890e0)

Docker Hubイメージを使う設定であれば、Misskeyのビルドが不要になるため、**一番お勧めです**。\
ただし、マイグレーションは必要なので、アップデート時にMisskeyを使えない時間がゼロになるわけではありません。\
また、Misskeyのビルド環境を準備しない(git pullしない)ので、フォークを動かしたくなった時に設定が面倒になります。

추천하는 순위는 아래와 같습니다.

systemdは、Docker Hubにイメージを上げるまでもないものの、フォークを使いたい場合にお勧めです。

お勧めする順番は次の通りです。

1. Docker Hub
2. systemd
3. Dockerビルド

## nginxを使うかどうか

サーバー1台でMisskeyを構築する場合は、nginxの使用をお勧めします。

스왑을 설정하고 있는 경우, 메모리가 합쳐서 3GB 이상이지 않으면 스크립트가 움직이지 않게 되어져 있습니다.

## 한 번 실패한 뒤에 다시 스크립트를 실행하는 경우

혹시라도 한 번 실패한 상태로 다시 한 번 스크립트를 실행한 경우, 다음 내용에 주의하시길 바랍니다.

## 途中で失敗してまたスクリプトを実行する場合

万が一途中で失敗してもう一度スクリプトを動作させる場合、次のことに注意してください。

- RedisやPostgresのインストールが終わっている場合、「install locally」はNoにしてください。\
  host・port設定はそのままEnterを押します。
  ユーザー名やパスワードは、前回実行した際に指定したものを入力します。

## /root/.misskey.env

インストールスクリプトは、2つの.envファイルを作成します。\
アップデートの際に使用します。

### /home/(misskey 유저)/.misskey.env

misskeyを実行するユーザーを覚えておくために必要です。

### /home/(misskey 유저)/.misskey-docker.env

Docker인 경우에 만들어집니다.\
\
실행되고 있는 컨테이너와 이미지 번호를 저장하고 있습니다.

### 자신이 직접 관리하기

Dockerの場合に生成されます。\
実行されているコンテナとイメージの番号を保存しています。\
コンテナの番号はアップデートの際に更新されます。古いイメージは削除されます。

## 自分で管理する

インストール後、構成を変更する際に役立つかもしれないメモです。

"example.com"を自分のドメインに置き換えて読んでください。

### Misskeyディレクトリ

Misskeyのソースは`/home/ユーザー/ディレクトリ`としてcloneされます。\
（ユーザー、ディレクトリの初期値はともにmisskeyです。）

앞에서 사용 중이던 유저에 돌아가기 위해선 exit를 실행합니다.

```
exit
```

もとのユーザーに戻るにはexitを実行します。

```
exit
```

### systemd

systemdのプロセス名はexample.comです。\
たとえば再起動するには次のようにします。

```
journalctl -t example.com
```

설정 파일은 `/etc/systemd/system/example.com.service`에 저장되어져 있습니다.

```
journalctl -t example.com
```

Docker는 Misskey 유저에서 rootless로 실행되어져 있습니다.

### Docker

DockerはMisskeyユーザーでrootless実行されています。

한 줄로 하고 싶을 땐 아래와 같이 하시면 됩니다.

```
sudo -u 유저명 XDG_RUNTIME_DIR=/run/user/$(id -u 유저명) DOCKER_HOST=unix:///run/user/$(id -u 유저명)/docker.sock docker ps
```

ワンライナーなら次のようにします。

```
sudo -u ユーザー XDG_RUNTIME_DIR=/run/user/$(id -u ユーザー) DOCKER_HOST=unix:///run/user/$(id -u ユーザー)/docker.sock docker ps
```

### Redis

requirepass와 bind를 `/etc/redis/misskey.conf`로 설정하고 있습니다.

### Redis

requirepassとbindを`/etc/redis/misskey.conf`で設定しています。

## Q. アップデート後に502でアクセスできない

Dockerでは、起動後にマイグレーションをするため、すぐにアクセスできません。\
マイグレーションが終わっているかどうか確認してみてください。

systemdの場合では、pnpm installに失敗している可能性があります。

journalctl으로 로그를 확인해보면, 대부분 re2... 로 시작하는 내용이 보입니다.

```
pnpm run clean-all
```

journalctlでログを確認すると、たいていre2が云々という記述が見当たります。

## Q. 同じサーバーにもう1つMisskeyを建てたい

スクリプトは同じサーバーに追加でMisskeyをインストールすることは想定していません。\
幾つかの設定が上書きされるか、途中でエラーになってしまうでしょう。
