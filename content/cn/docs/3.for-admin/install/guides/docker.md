---
description: '本教程说明了使用Docker安装Misskey的方法。'
---

# 使用 Docker Compose 构建 Misskey

这份指南将介绍如何使用 Docker Compose 设置 Misskey。

:::danger

一旦完成设置请勿更改使用的服务器域名和主机名，不要重新创建数据库！

:::

:::tip{label='前提条件'}

- 已安装了 Docker 和 Docker Compose。

:::

## 拉取docker库

```sh
git clone -b master https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
```

## 设置

使用以下命令，拉取各种配置文件的示例文件。

```sh
cp .config/docker_example.yml .config/default.yml
cp .config/docker_example.env .config/docker.env
cp ./compose_example.yml ./compose.yml
```

请按照文件中的说明根据自身情况编辑 default.yml 和 docker.env 文件内容。\
同时再次根据需要编辑 docker-compose.yml 。(比如你要更换端口)

## 构建镜像与初始化数据库

使用以下命令进行 Misskey 的构建和数据库初始化。这可能需要一些时间。

```shell
sudo docker compose build
sudo docker compose run --rm web pnpm run init
```

## 运行Misskey

辛苦了。您可以使用以下命令启动 Misskey。

```sh
sudo docker compose up -d
```

大功告成，祝武运昌盛！
GLHF✨

## 更新Misskey的方法

:::warning

在更新时，请务必确认Misskey[更新通知](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md)，以提前了解变更内容以及可能需要进行的额外工作（通常情况下并不需要）。

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

由于更新内容和数据库规模的不同，处理时间可能会有所不同。

## 如何执行cli命令

```sh
sudo docker compose run --rm web node packages/backend/built/tools/foo bar
```
