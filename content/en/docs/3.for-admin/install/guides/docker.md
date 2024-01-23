---
description: This guide explains how to set up Misskey using Docker
---

# Building Misskey using Docker Compose

This guide explains how to set up Misskey using Docker

:::danger

Do not recreate the database with the domain/hostname of the server once you have started using it!

:::

:::tip{label='前提条件'}

- Make sure Docker and Docker Compose are installed on your system.

:::

## Clone the Repository

```sh
git clone -b master https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
```

## Configuration

下記コマンドで、各種設定ファイルのサンプルをコピーします。

```sh
cp .config/docker_example.yml .config/default.yml
cp .config/docker_example.env .config/docker.env
cp ./docker-compose_example.yml ./docker-compose.yml
```

Please edit `default.yml` and `docker.env` file as per the description.\
Also edit `docker-compose.yml` as needed.(If you want to change the port etc.)\
Please make sure to check in advance for any changes that may be required.(ポートを変更したい場合など)

## Build & Initialize

The next set of commands will build Misskey image and perform database initialization. This will take some time.

```shell
sudo docker compose build
sudo docker compose run --rm web pnpm run init
```

## Startup

お疲れ様でした。You can launch Misskey with the following command.

```sh
sudo docker compose up -d
```

GLHF✨

## Updating Misskey

:::warning

Updates are always available in the [release notes](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md).

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

It may take time depending on the update content and the size of the database.

## How to execute CLI commands?

```sh
sudo docker compose run --rm web node packages/backend/built/tools/foo bar
```
