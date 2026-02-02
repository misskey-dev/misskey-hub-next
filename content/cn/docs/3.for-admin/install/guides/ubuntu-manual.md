# 关于如何在Ubuntu上安装Misskey的详细说明

## 其他安装Misskey的方法

- [普通安装Misskey的构建指南(手册)](./manual/)
- [其他安装方法一览](/docs/for-admin/install/guides/#安装方法一览)

## shell脚本提示

如果只是复制粘贴，那么可以使用 shell 脚本来完成，**所以我开发了一个几乎可以完成所有操作的 shell 脚本！**\
[**更多关于shell脚本的信息和使用方法请点击此处！**](./bash/)

:::tip

此 Shell 脚本不适用于开发环境的安装。

:::

:::tip

请自行准备域名的购买、Cloudflare 的设置以及服务器的获取。

:::

有任何问题，请在Misskey上[提及 (Mention) @aqz@p1.a9z.dev](https://p1.a9z.dev/@aqz) 来通知我们。

## 关于本文

本文介绍了在systemd下运行Misskey，如[手动搭建Misskey（手册）]（./manual/）中所述。

如果是使用[docker-compose](./docker/)，手动完成这项操作应该会容易一些。

:::danger

一旦你准备好的域名或主机名在 Misskey 服务器上投入使用过，请不要重建数据库！

:::

## 引言

本文将根据[手动搭建Misskey（手册）](./manual/)，逐步解释如何在典型的Ubuntu服务器上安装并公开Misskey。

安装过程中只需要输入Bash命令、编辑一些配置文件以及使用浏览器即可完成。安装过程中将会简要说明需要安装的软件，但您不必过于在意这些细节。

本文重视具体性，因此是针对特定环境编写的。

如果因为操作系统差异、Misskey 本体或依赖软件的版本更新导致部分内容有所不同，还请见谅。

对于您不理解的词语，建议参考[《看似懂了，其实不懂，但感觉懂了的 IT 术语辞典》](https://wa3.i-3-i.info/) ，让自己觉得“原来如此”就行了。

## 系统要求

- 操作系统为**Ubuntu 22.04 LTS**。
- 关于硬件要求，任何较新的CPU均可。架构假定为amd64或arm64。
- 建议至少配备4GB内存。
  - （虽然此前说明过由于引入了Vite，即使内存容量在1.5GB左右也可以进行构建，但近期前端构建对硬件的要求再次变得严苛了。）
- 购买自己的域名并使用Cloudflare。
- 域名可以预先在[Cloudflare Registrar](https://www.cloudflare.com/ja-jp/products/registrar/)等平台准备好。
- 在本文中我们将以example.tld作为域名进行说明，请根据实际情况将其替换为您购买的域名。如果是开发环境，请将其替换为localhost(在配置文件章节中另有说明)

:::danger

请勿更改已经开始使用的服务器域名或主机名！

:::

## nano的使用方法

本次将使用nano作为文本编辑器。按照如下方式启动。

```sh
nano /path/to/file
```

可以使用常规的方向键或Home/End等按键来移动光标。

按Ctrl+X退出，如果询问是否保存更改，输入Y(Yes)并按Enter即可保存。

在底部会显示命令列表，请将^视为Ctrl，将M-视为Alt以供参考。

## 创建用户

由于不建议以root身份运行Misskey，因此需要创建一个专用用户。

```sh
sudo adduser --disabled-password --disabled-login misskey
```

:::tip

如果是开发环境，则无需区分用户

:::

## 基础软件的安装与配置

进行基础软件的安装。

### Node.js

Node.js是一个服务端的JavaScript环境，也是Misskey的基本运行环境。

```sh
sudo rm /usr/share/keyrings/nodesource.gpg;
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/nodesource.gpg;
NODE_MAJOR=22; echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list;
sudo apt update;
sudo apt install -y nodejs;

# Node.js已经安装完成，进行版本检查。
node -v
```

如果显示v22.x.x等字样即表示正常。如果显示的是像v8.x.x这样的低版本，则说明安装未正确完成，请尝试重启服务器后重新安装。

### pnpm

pnpm是Misskey使用的包管理工具，用于引用外部库并管理依赖。

这里介绍了使用Node.js附带的包管理工具“npm”来安装pnpm的方法，但[pnpm官网](https://pnpm.io/installation)上也介绍了多种其他安装方式，建议在浏览后选择最适合您环境的方式进行安装。

```sh
npm i -g pnpm
```

### PostgreSQL

PostgreSQL是一种对象关系型数据库管理系统，是存储Misskey各类数据所必不可少的软件。

#### 安装

执行shell脚本，安装最新版本（v15）。

```sh
sudo apt install -y postgresql-common

sudo sh /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -i -v 15;

# 使用systemctl检查守护进程的状态。
systemctl status postgresql
```

如果显示active则表示正常。

#### 创建用户和数据库

启动psql。

```sh
sudo -u postgres psql
```

创建Misskey使用的用户。\
如果用户名设为misskey，密码设为hoge，则操作如下。\
（Linux的用户和PostgreSQL用户是不同的，请注意分辨不要混淆。）

```sql
CREATE ROLE misskey LOGIN PASSWORD 'hoge';
```

创建数据库。这里将数据库命名为mk1。

```sql
CREATE DATABASE mk1 OWNER misskey;
\q
```

### Redis

Redis 是一款 NoSQL 内存数据库软件，用于管理数据库及联合之间的通信等，是必不可少的。  
按照 redis.io 的文档进行安装。

https\://redis.io/docs/getting-started/installation/install-redis-on-linux/

```sh
sudo apt-get install lsb-release curl gpg
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis
```

启动

```sh
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

使用 systemctl 确认守护进程的状态。

```sh
systemctl status redis-server
```

如果显示active则表示正常。

### FFmpeg

FFmpeg 负责处理视频和音频。请按照以下步骤进行安装。

```sh
sudo apt install ffmpeg
```

### nginx

nginx是一款主要用于反向代理的Web服务器软件。虽然对于Misskey来说不是必须的，但是为了使用缓存等手段提高性能，以及实现从http到https的重定向等功能，建议安装。

:::tip

如果是开发环境，则不需要配置nginx

:::

请参照nginx.org文档进行安装http://nginx.org/en/linux_packages.html#Ubuntu 。

```sh
sudo apt install -y curl ca-certificates gnupg2 lsb-release ubuntu-keyring

curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null

gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
```

查看控制台输出中是否包含573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62 。

```sh
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list

echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" | sudo tee /etc/apt/preferences.d/99nginx

sudo apt update

sudo apt install -y nginx
```

使用 systemctl 确认守护进程的状态。

```sh
systemctl status nginx
```

如果显示active则表示正常。否则，请运行以下命令。

```sh
sudo systemctl start nginx

sudo systemctl enable nginx
```

访问 <http://localhost> ，如果显示 \*Welcome to nginx!\*则表示正常。\
也可以使用 curl 进行确认。

```sh
curl http://localhost
```

### 其他

安装Git（版本控制软件）以及 build-essential (构建Misskey时需要使用)。

```sh
sudo apt update

sudo apt install -y git build-essential
```

## 额外的设置与安装

准备将服务器公开到互联网。

:::tip

如果是开发环境，则不需要配置防火墙、Cloudflare 和 Certbot

:::

### 防火墙

本次使用ufw作为防火墙。

接下来，将防火墙规则设置为白名单模式，在限制连接次数的同时开放22号SSH端口，以及80号HTTP端口和443号HTTPS端口。

```sh
sudo ufw enable

sudo ufw default deny

sudo ufw limit 22

sudo ufw allow 80

sudo ufw allow 443
```

确认ufw的状态。

```sh
sudo ufw status
```

使用 systemctl 守护进程。

```sh
sudo systemctl enable ufw
```

:::tip

ufw 是一款让用户能够更人性化地操作 netfilter (iptables) 的应用程序。在 OCI 环境下，安装脚本会直接操作 netfilter。

:::

### Cloudflare

Cloudflare 是一项非常方便的服务，它能为您的域名同时提供 DNS 服务器、反向代理和 CDN。\
虽然也可以不通过 Cloudflare 公开服务器，但由于其非常方便，建议引入。
[**→ CDN设置**](../resources/cdn/)

[注册Cloudflare](https://dash.cloudflare.com/sign-up) ，并按照指引添加已购买的域名。

在DNS记录页面输入服务器的IP地址。

根据购买域名的平台不同，生效可能最多需要3天左右。

### 配置 Certbot (Let’s Encrypt)

使用 Cloudflare 的方式从 Let’s Encrypt 获取用于 HTTPS/WSS 通信的证书。

安装 certbot 和 Cloudflare 插件

```sh
sudo apt install -y certbot python3-certbot-dns-cloudflare
```

获取 Cloudflare 的 API 密钥。请按照以下步骤操作。

1. 访问 <https://dash.cloudflare.com/profile/api-tokens>
2. 点击Global API Key的“查看”
3. 输入密码并完成 hCaptcha 验证，点击“查看”

创建包含 Cloudflare 信息的配置文件 /etc/cloudflare/cloudflare.ini。

```sh
mkdir /etc/cloudflare
nano /etc/cloudflare/cloudflare.ini
```

将 dns_cloudflare_email（以下示例中的 bar\@fuga.foo）设置为在注册 Cloudflare 时使用的电子邮件地址。

```sh
dns_cloudflare_email = bar@fuga.foo
dns_cloudflare_api_key = xxxxxxxxxxxxxxxxxxxxxxxxxx
```

保存此文件，并将权限设置为 600。

```sh
sudo chmod 600 /etc/cloudflare/cloudflare.ini
```

准备完成，现在运行命令。请将中间两处的 example.tld 替换为您自己的域名。

```sh
sudo certbot certonly --dns-cloudflare --dns-cloudflare-credentials /etc/cloudflare/cloudflare.ini --dns-cloudflare-propagation-seconds 60 --server https://acme-v02.api.letsencrypt.org/directory -d example.tld -d *.example.tld
```

如果显示\*Congratulations!\*，则表示成功。生成的.pem 文件路径以后会用到，请记录下来。

自动更新的配置已在安装时同步完成，因此无需手动进行配置。

## 安装Misskey

至此，前期准备工作已基本完成，接下来开始准备 Misskey。

切换到misskey用户。

```sh
sudo su - misskey
```

使用Git部署相关文件。

```sh
git clone -b master https://github.com/misskey-dev/misskey.git --recurse-submodules

cd misskey

git checkout master
```

安装必要的 npm 软件包。

```sh
NODE_ENV=production pnpm install --frozen-lockfile
```

## 配置 Misskey

### default.yml

创建配置文件.config/default.yml。

```sh
nano .config/default.yml
```

粘贴以下内容并根据需要进行替换。需要更改设置值的地方用 ● 表示，使用此前流程中设置的值的地方用 〇 表示。

该配置文件采用 YAML 格式编写，如果行首空格数量等出现错误，Misskey 将无法运行，请务必特别注意。

可设置的值和编写方法在[.config/example.yml](https://github.com/syuilo/misskey/blob/develop/.config/example.yml) 中有说明。

:::tip

在开发环境下，url 指定为 `url: http://localhost:3000` 。

:::

```yml
# ● Misskey的公开URL
url: https://example.tld/
# 将端口设为3000。
port: 3000

# ● PostgreSQL配置。
db:
  host: localhost
  port: 5432
  db  : mk1 # 〇 PostgreSQL数据库名
  user: misskey # 〇 PostgreSQL用户名
  pass: hoge # ● PostgreSQL密码

# 　 Redis配置。
redis:
  host: localhost
  port: 6379

# 　 ID 类型设置。
id: 'aidx'

# 　 syslog
syslog:
  host: localhost
  port: 514
```

配置完成后保存。

### nginx 配置

进行 nginx 配置。

以 root 权限进行。

```sh
exit
```

创建 /etc/nginx/conf.d/misskey.conf。

```sh
sudo nano /etc/nginx/conf.d/misskey.conf
```

将 [Misskey Hub 的配置示例](/docs/for-admin/install/resources/nginx/) 复制并粘贴到 nano 中，并将以下部分替换为您自己的内容。

- 第 18 行和第 30 行的域名
- 将第 34-35 行的证书路径替换为通过 Certbot 获取的路径（基本上只需替换 example.tld 即可）
- 删除第 56 行 (If it's behind another reverse proxy or CDN, remove the following.) 开始的 4 行

保存更改。

确认配置文件是否正常工作。

```sh
sudo nginx -t
```

如果没问题，重启 nginx 守护进程。

```sh
sudo systemctl restart nginx
```

确认状态。

```sh
sudo systemctl status nginx
```

如果状态是 active 表示一切正常。

## 构建 Misskey

重新登录 misskey 用户。

```sh
sudo su - misskey
```

进行构建。应该没问题…

```sh
cd misskey
NODE_ENV=production pnpm run build
```

:::tip

在开发环境下，不需要 `NODE_ENV=production` 。在后续的命令中也请同样将其删除。

:::

### 如果无法在服务器上构建

可能是由于内存 (RAM) 不足。

构建 Misskey 以及进行数据库迁移（包括初始化）需要 2GB 以上的 RAM。如果RAM不足，可以考虑以下解决方案。

- 为服务器添加交换空间
- 通过 sftp 传输在本地构建好的文件（built 目录）

## 初始化数据库

```sh
pnpm run init
```

## 启动 Misskey

```sh
NODE_ENV=production pnpm run start
```

当显示**Now listening on port 3000 on** [**http://example.tld**](http://example.tld) 时，请访问先前所设置的URL。

应该会显示 Misskey 的欢迎页面。

检查是否可以正常进行创建账号、发布帖子以及上传文件等一系列操作。

### 无法访问时

#### 检查Cloudflare的DNS

请再次确认 Cloudflare 的 DNS 设置是否指向了正确的 IP 地址。

#### 检查路由器设置

如果是自建家用服务器，请确认路由器是否已开启 80 和 443 端口的转发或允许通信。

即使是云服务器，通常也需要在网络设置中开放端口。

## 创建 Misskey 守护进程

:::tip

如果是开发环境，则无需创建守护进程。

:::

先通过 Ctrl+C 终止进程，然后开始创建 Misskey 守护进程的设置。

以 root 权限进行。

```sh
exit
```

创建 /etc/systemd/system/misskey.service 。

```sh
sudo nano /etc/systemd/system/misskey.service
```

粘贴并保存以下内容。

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

配置 systemd 并启动 misskey 守护进程。

```sh
sudo systemctl daemon-reload

sudo systemctl enable misskey

sudo systemctl start misskey
```

使用 systemctl 确认守护进程的状态。由于启动需要一些时间，建议等待 15 秒左右。

```sh
sudo systemctl status misskey
```

如果显示active则表示正常。

**至此，Misskey 的安装已基本完成。**

在 Misskey 服务器上注册并登录您的账号，继续进行设置。

## 继续配置 Misskey

- [**Misskey服务器初始设置及其他设置说明**](https://hide.ac/articles/Y504SIabp)
- [**配置Squid代理以保护Misskey**](https://hide.ac/articles/MC7WsPDqw)
- [**备份 Misskey 数据库【OCI对象存储篇】**](https://hide.ac/articles/E2Ea3cauk)

## 更新 Misskey

[Misskey 的更新方法](./manual/#misskeyのアップデート方法)

在更新期间将无法使用 Misskey。

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

### 方案 1：使用apt upgrade

```sh
sudo apt update -y
sudo apt full-upgrade -y
sudo reboot
```

重启后 Misskey 会自动启动。

### 方案 2：直接启动

```sh
sudo systemctl start misskey
```
