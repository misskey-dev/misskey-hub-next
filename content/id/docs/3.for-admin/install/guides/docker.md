---
description: Panduan ini akan menjelaskan tentang bagaimana cara memasang dan menyetel instansi Misskey dengan menggunakan Docker Compose.
---

# Buat instansi Misskey dengan Docker Compose

Panduan ini akan menjelaskan tentang bagaimana cara memasang dan menyetel instansi Misskey dengan menggunakan Docker Compose.

:::danger

Jangan pernah mengubah nama domain (hostname) instansi peladen ketika kamu sudah mulai menggunakannya!

:::

:::tip{label='前提条件'}

- `docker` dan `dockercompose` terpasang

:::

## リポジトリの取得

```sh
git clone -b master https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
```

## 設定

下記コマンドで、各種設定ファイルのサンプルをコピーします。

```sh
cp .config/docker_example.yml .config/default.yml
cp .config/docker_example.env .config/docker.env
cp ./docker-compose_example.yml ./docker-compose.yml
```

`default.yml`と`docker.env`をファイル内の説明に従って編集してください。\
また、必要に応じて、`docker-compose.yml`を編集します。(ポートを変更したい場合など)

## ビルドと初期化

次のコマンドでMisskeyのビルドとデータベースの初期化を行います。
これにはしばらく時間がかかります。

```shell
sudo docker compose build
sudo docker compose run --rm web pnpm run init
```

## 起動

お疲れ様でした。以下のコマンドでMisskeyを起動できます。

```sh
sudo docker compose up -d
```

GLHF✨

## Misskeyのアップデート方法

:::warning

アップデートの際は必ず[リリースノート](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md)を確認し、変更点や追加で必要になる作業の有無(ほとんどの場合ありません)を予め把握するようにしてください。

:::

```sh
git stash
git checkout master
git pull
git submodule update --init
git stash pop
sudo docker compose build
sudo docker compose stop && sudo docker compose up -d
```

アップデート内容、およびデータベースの規模によっては時間がかかることがあります。

## cliコマンドを実行する方法

```sh
sudo docker compose run --rm web node packages/backend/built/tools/foo bar
```
