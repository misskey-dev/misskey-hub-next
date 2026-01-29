# Misskey 安装 shell 脚本 v3.0.0

我们制作了一个用于轻松安装 Misskey 的 Shell 脚本！

只需回答几个问题，即可在 Ubuntu 服务器上轻松安装 Misskey ！

此外，还提供了更新脚本。

[v12 版本请参见此处](https://github.com/joinmisskey/bash-install/blob/a096e874f93d493aa68975a31be9ce12d644e767/README.md)

## 准备事项

1. 域名
2. 已安装 Ubuntu 的服务器
3. Cloudflare 账号（推荐）

:::danger

请注意，一旦你准备好的域名或主机名在 Misskey 服务器上投入使用过，请不要重建数据库！

:::

由于 Let's Encrypt 可尝试验证的次数有限，请在开始安装前，务必充分确认服务器的网络和 DNS 设置。

## Cloudflare 的设置

如果使用 Cloudflare，请务必在完成 Cloudflare 的域名设置后再开始安装。  
\
名称服务器（Name Server）的生效最多可能需要约 3 天。

另外，如果要同时配置 nginx 和 Cloudflare，请在 Cloudflare 的设置页面中：

- 设置 DNS
- 在 SSL/TLS 设置中，将加密模式设置为「完全（Full）」。

## 操作

### 1. SSH

通过 SSH 连接到服务器。  
\
（如果你正在打开服务器的桌面环境，请打开终端（Shell）。）

### 2. 将环境更新到最新

将所有软件包更新到最新版本，然后重启。

```sh
sudo apt update; sudo apt full-upgrade -y; sudo reboot
```

### 3. 开始安装

重启后请重新通过 SSH 连接，然后开始安装 Misskey。

不过，强烈建议在安装前先阅读[小贴士](#小贴士)一节。

```sh
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/ubuntu.sh -O ubuntu.sh; sudo bash ubuntu.sh
```

请将其中的 example.com 替换为你自己的域名。

### 4. 更新

也提供了用于更新的脚本。

更新脚本不会更新系统环境。\
请参考 CHANGELOG（日语）以及[GitHub 的 Releases 页面（英语）](https://github.com/joinmisskey/bash-install/releases)，并视情况执行数据库迁移（migration）操作。

首先，下载更新脚本。

```sh
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/update.ubuntu.sh -O update.sh
```

需要更新时运行该脚本。

```sh
sudo bash update.sh
```

- 在 systemd 环境下，可以使用 -r 选项进行系统更新并重启。
- 在 docker 环境下，可以在参数中指定“更新后的仓库名:标签名”。

## 已验证可部署的环境

### Oracle Cloud Infrastructure

该脚本在 Oracle Cloud Infrastructure 的 Always Free 服务所提供的两种实例规格上均可正常运行。

- VM.Standard.E2.1.Micro (AMD)
- VM.Standard.A1.Flex (ARM) [1OCPU RAM6GB or greater]

请确保使用iptables进行配置。

## Issues & PRs Welcome

如果在上述环境中无法正常运行，可能存在 bug。请在提交 Issue 时注明安装时所使用的条件，并通过 GitHub Issues 进行反馈，我们将不胜感激。

对于上述环境以外的环境，支持可能较为困难，但如果您能详细说明具体情况，仍有可能协助解决。

同时也欢迎提出功能方面的建议。

# 小贴士

关于选项的选择方式与相关说明。

## Systemd or Docker?

从 v1 起，可以在安装方式中选择 systemd 或 Docker。

这里所说的 Docker，是指只用 Docker 运行 Misskey，而 Redis、Postgres 等服务仍在宿主机上直接运行。  
\
[如果你想用 docker-compose 一次启动全部组件，推荐阅读 mamemononga 撰写的这篇文章。](https://gist.github.com/mamemomonga/5549bb69cad8e5618e5527593d4890e0)

如果选择使用 Docker Hub 镜像，则无需自行构建 Misskey，因此**最为推荐**。  
\
不过仍然需要执行迁移（migration），所以更新时并不意味着可以做到零停机。  
\
另外，由于不会准备 Misskey 的构建环境（也不会通过 git pull 更新源码），将来如果想运行 fork，配置会比较麻烦。

在本地构建 Docker 镜像的方式，由于性能不佳，故不推荐。

systemd 适合不需要将镜像发布到 Docker Hub、但想运行 fork 的情况。

推荐顺序如下：

1. Docker Hub
2. systemd
3. 本地构建 Docker 镜像

## 是否使用 nginx

除非符合以下情况，否则我们推荐使用 nginx 作为连接互联网与 Misskey 的反向代理。

- 服务器只有您自己使用（所谓的“单人服务器”），或用户数量非常少
- 您准备通过其他方式来承担 nginx 提供的反向代理与缓存功能，例如使用负载均衡器（仅适合高级用户）

将 nginx 作为反向代理后，可以缓存图片等静态内容，从而减少服务器资源的浪费。
此外，nginx 还具备在缓存尚未建立（缓存未命中）时更好地控制突发大量访问的功能，因此可以抑制 Misskey 负载的激增。

配置示例请参阅 [nginx 的配置页面](../resources/nginx/)。

## Add more swaps!

脚本要求系统的总内存（RAM + Swap）合计至少为 3GB，否则将无法运行。

## 如果脚本在中途失败并需要重新执行

如果在执行过程中失败并需要再次运行脚本，请注意以下事项：

- 如果 Redis 和 Postgres 已经安装完成，请将 “install locally” 设为 No。  
  \
  在 host 与 port 的提示中，直接按 Enter 保持原有值。
  用户名和密码请输入上一次运行脚本时设置的内容。

## 关于 .env 文件

安装脚本会创建两个 .env 文件，第二个文件会因使用 systemd 或 Docker 而不同。  
\
这些文件将在更新时使用。

### /root/.misskey.env

用于记录运行 Misskey 的用户，是必需的。

### /home/(misskey 用户)/.misskey.env

在使用 systemd 的情况下生成。  
\
主要用于记录目录路径。

### /home/(misskey 用户)/.misskey-docker.env

在使用 Docker 的情况下生成。  
\
用于保存当前运行的容器和镜像的 ID。  
\
更新时容器 ID 会被更新，旧的镜像会被删除。

## 自行管理

这是一份备忘录，可能会在安装完成后需要调整配置时派上用场。

阅读时请将 "example.com" 替换为你自己的域名。

### Misskey 目录

Misskey 的源码会被 clone 到 `/home/用户/目录` 下。  
\
（用户与目录的默认值均为 misskey。）

你可以按如下方式进入 Misskey 目录：

```sh
sudo -iu 用户
cd 目录
```

要回到原来的用户，请执行：

```sh
exit
```

### systemd

systemd 的服务（unit）名称是 example.com。  
\
例如，要重启服务，可以这样做：

```sh
sudo systemctl restart example.com
```

可以通过 journalctl 查看日志：

```sh
journalctl -t example.com
```

配置文件会保存为 `/etc/systemd/system/example.com.service`。

### Docker

Docker 以 Misskey 用户身份进行 rootless 运行。

使用 sudo 切换到 Misskey 用户时，需要设置 `XDG_RUNTIME_DIR` 和 `DOCKER_HOST`。

```sh
sudo -iu 用户
export XDG_RUNTIME_DIR=/run/user/$UID
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock

# 显示容器列表
docker ps

# 构建镜像 (仓库: local/misskey:latest)
docker build -t local/misskey:latest ./misskey

# docker run
docker run -d -p 3000:3000 --add-host=docker_host:10.0.0.1 -v /home/misskey/misskey/files:/misskey/files -v "/home/misskey/misskey/.config/default.yml":/misskey/.config/default.yml:ro --restart unless-stopped -t "local/misskey:latest"

# 查看日志
docker logs --tail 50 -f コンテナID
```

如需一行命令，可如下执行：

```sh
sudo -u 用户 XDG_RUNTIME_DIR=/run/user/$(id -u 用户) DOCKER_HOST=unix:///run/user/$(id -u 用户)/docker.sock docker ps
```

### nginx

nginx 的配置文件保存在 `/etc/nginx/conf.d/example.com.conf`。

### Redis

requirepass 和 bind 已在 `/etc/redis/misskey.conf` 中设置。

## Q. 更新后出现 502，无法访问

在 Docker 环境下，由于会在启动后执行迁移（migration），因此无法立刻访问。  
\
请先确认迁移是否已经完成。

在 systemd 环境下，可能是 `pnpm install` 失败了。

请在 Misskey 目录中执行以下命令，然后再尝试运行一次更新。

```sh
pnpm run clean-all
```

如果用 journalctl 查看日志，通常会看到提到 `re2` 的相关信息。

## Q. 想在同一台服务器上再搭建一个 Misskey

该脚本未设计用于在同一台服务器上额外安装另一个 Misskey。  
\
部分设置可能会被覆盖，或在执行过程中报错。
