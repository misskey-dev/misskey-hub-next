---
description: '本指南介绍如何安裝和配置 Misskey。'
---

# 手动搭建 Misskey

本指南介绍如何安裝和配置 Misskey。

:::danger

请绝对不要更改已经开始使用的服务器域名或主机名！

:::

:::tip{label='前提条件'}

#### 必须安装并配置以下软件：

- **[Node.js](https://nodejs.org/en/)** (v22 系列：v22.15.0 及以上；或 v24 系列：v24.10.0 及以上)
- **[pnpm](https://pnpm.io/)** (v10.16.0 及以上)
- **[PostgreSQL](https://www.postgresql.org/)** (v15 及以上)
- **[Redis](https://redis.io/)**
- **[FFmpeg](https://www.ffmpeg.org/)**

如果您使用 Debian/Ubuntu，最好安装 `build-essential` 软件包。

:::

## 创建用户

Misskey 不能以 root 身份执行，因此建议创建一个用户。
Debian：

```sh
adduser --disabled-password --disabled-login misskey
```

## 安装 Misskey

```sh
sudo -iu misskey
git clone --recursive https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
```

## 设置

请复制范例中的 `.config/example.yml`，并重命名为 `default.yml`。

```sh
cp .config/example.yml .config/default.yml
```

请根据文件中的提示编辑 `default.yml`。

## 构建镜像与初始化数据库

使用以下命令进行 Misskey 的构建和数据库初始化。这可能需要一些时间。

```sh
NODE_ENV=production pnpm run build
pnpm run init
```

## 运行

您做到了！您可以使用以下命令启动 Misskey。

```sh
NODE_ENV=production pnpm run start
```

大功告成，祝武运昌盛！
GLHF✨ (译者注：Good Luck, Have Fun)

::::g-details{summary="使用 systemd 进行管理"}

创建 systemd 配置文件

`/etc/systemd/system/misskey.service`

在编辑器中打开它，粘贴以下代码并保存：

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

:::warning

如果需要在 CentOS 中使用低于 1024 的端口号使用 Misskey，
必须修改成 `ExecStart=/usr/bin/sudo /usr/bin/npm start`

:::

重新加载systemd配置文件并启动misskey服务

```sh
sudo systemctl daemon-reload
sudo systemctl enable misskey
```

搭建 Misskey 服务器

```sh
sudo systemctl start misskey
```

:::tip

您可以通过运行命令`systemctl status misskey`来检查服务的运行状态。

:::

::::

## 更新Misskey的方法

:::warning

在更新时，请务必确认Misskey[更新通知](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md)，以提前了解变更内容以及可能需要进行的额外工作（通常情况下并不需要）。

:::

重新拉取 master，并执行安装、构建以及数据库迁移：

```sh
git checkout master
git pull
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
NODE_ENV=production pnpm run build
pnpm run migrate
```

由于更新内容和数据库规模的不同，处理时间可能会有所不同。

更新完成后，請重启 Misskey 服务。

```sh
sudo systemctl restart misskey
```

:::tip

如果您在构建或启动过程中遇到错误，请尝试以下命令：

- `pnpm run clean` 或 `pnpm run clean-all`
- `pnpm rebuild`

:::
