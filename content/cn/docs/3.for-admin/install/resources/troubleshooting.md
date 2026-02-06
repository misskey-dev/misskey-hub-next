# 手动安装时的故障排除

<small>2018年10月07日 / 2021年12月20日 最终更新 / 撰文 aqz/tamaina</small>

虽然参加“MisskeyInstallBattle（Misskey 安装大作战）”的人变多了，但随之而来的是，随着时间推移，受轻重伤的人也越来越多了。\
为了减少这类伤员，本文将通俗易懂地解说过去发生事故的地点倾向以及对策。

**首先，请务必熟读[搭建指南](../guides/manual/)。**

另外，若能参考鄙人拙作 [Ubuntu 版 systemd 解说](https://hide.ac/articles/iFwm5HDvH)以及 [Oracle Cloud 版详细解说](https://hide.ac/articles/csERs-7SU)，我也将不胜荣幸。

# 关于 Ubuntu 专用 Shell 脚本的通知

“针对 Ubuntu 的解说全都是复制粘贴，太无聊了！太花时间了！总之就是麻烦！”

……咦，如果靠复制粘贴就能搞定，那不就代表可以完全自动化吗？

所以，**我制作了一个可以用 Shell 脚本帮你几乎搞定所有事情的东西！**\
[**详细内容与使用方法请看这里！** https://github.com/joinmisskey/bash-install#readme](https://github.com/joinmisskey/bash-install#readme)

关于域名的购买、Cloudflare 的设置以及服务器的准备，请自行处理。

如果 Shell 脚本有任何 Bug，请通知[制作者 (aqz)](https://p1.a9z.dev/@aqz)。

# 安装与构建

请仔细阅读[搭建指南](../guides/manual/)。

## ImageMagick 相关

_**不需要 ImageMagick！**_

## 构建失败

根据经验，Misskey 的构建至少需要 2GB 的内存。\
您可以选择升级服务器规格，或者也可以在自己的电脑上构建好后再部署到服务器上。

## 总觉得不太顺利

- 请仔细阅读[搭建指南](../guides/manual/)。
- Node.js 的版本可能太旧？
  - 换个新一点的版本吧。
- 安装或构建时虽然会出现 Error 或 WARN，但有时候其实没问题。总之先 `npm start` 确认能不能跑再说。
- 可能没安装 node-gyp？
  - 试试 `apt install build-essential`。
  - Windows 用户也可以参考[这篇文章](https://qiita.com/AkihiroTakamura/items/25ba516f8ec624e66ee7)。
- 如果这样还是不行，请试着从头开始，按照[搭建指南](../guides/manual/)的步骤重做一次。

## 版本更新后发生故障

- 请仔细阅读[搭建指南](../guides/manual/)以及发行说明。
- 更新 Misskey 版本时，请确实执行 `pnpm install` 和 `pnpm run migrate`。如果还是没修好，请试试 `pnpm run clean-all && pnpm install`，接着再试试 `pnpm run build && pnpm run migrate && pnpm start`。
- 如果这样还是不行，请试着从头开始，按照[搭建指南](../guides/manual/)的步骤重做一次。

---

# 设置

请仔细阅读[搭建指南](../guides/manual/)。

设置是在 `.config/default.yml` 中进行。请复制 [`.config/example.yml`](https://github.com/misskey-dev/misskey/blob/develop/.config/example.yml) 并依照注释进行撰写。

（在 YAML 格式中，从 `#` 到行尾都会被视为注释。）

## URL 与端口号

我想 URL 和端口号的运作机制可能有点难懂。

在 `.config/example.yml` 中的“Port and TLS settings”部分有附上图解说明，请依照该说明进行设置。
这里我会一边翻译正文解说一边进行。

### URL 的设置

```yml
# Final accessible URL seen by a user.
# 最终用户访问的 URL
url: https://example.tld/
```

**在 `url` 处，填写用浏览器访问服务器时，地址栏上显示**（或你想让它显示）**的 URL。**

### 端口的设置

```yml
#   ┌───────────────────────┐
#───┘ Port and TLS settings └───────────────────────────────────
#### 端口与 TLS 设置         ####################################

# Misskey requires a reverse proxy to support HTTPS connections.
# Misskey 必须通过反向代理服务器来支持 HTTPS 连接。
#
#                 +----- https://example.tld/ ------------+
#   +------+      |+-------------+      +----------------+|
#   | User | ---> || Proxy (443) | ---> | Misskey (3000) ||
#   +------+      |+-------------+      +----------------+|
#                 +---------------------------------------+
#
#   You need to set up a reverse proxy. (e.g. nginx)
#   此方法需要设置反向代理（例如：nginx）。
#   An encrypted connection with HTTPS is highly recommended
#   because tokens may be transferred in GET requests.
#   由于 Token 可能会包含在 GET 请求的 URL 中传输，
#   强烈建议使用 HTTPS 加密连接。
```

```yml
# The port that your Misskey server should listen on.
# Misskey 服务器监听的端口
port: 3000
```

在这个示例中，Misskey 使用端口 3000 进行通信。
在反向代理的设置中，本地端的转发目标请指定这个端口号。

----

# `npm start`或访问时常见的错误

虽然用 `npm start` 成功架起服务器了，但之后可能会遇到故障。

首先，请仔细阅读[搭建指南](../guides/manual/)。

## 出现 YAML 错误

可能是 `default.yml` 的语法有误。
行首是否有多余的空格？

## 无法连接 redis

redis-server 启动了吗？
是否达到某种连接数上限？

11.20.2 版本之前的 Misskey 无法解析 redis 的密码。请确认以下两点：

- 不要为 redis 设置密码。
- 将 `default.yml` 中 `redis:` 下方的 `pass:` 那一行注释掉。

## 顶部显示写着“这是开发构建”的红色横条

如果要公开服务器，请务必使用 production 构建。

要使用产品 (Product) 构建，请将环境变量设置为 `NODE_ENV=production` 并执行 `npm run build && npm start`。

## 无法注册新账号

似乎无法连接 API。
请确认 `default.yml` 开头的 `url:` 是否设置正确。也请再次仔细确认 Node.js 的版本和安装设置。

另外，`default.yml` 的内容写对了吗？

## 时间轴显示出现问题，TL 无法实时更新

如果加载时间轴失败，可能是 mongoDB 或 PostgreSQL 的版本太旧。
PostgreSQL 请尽量使用 v13 以上版本。

最好也确认一下 redis 的连接。 [→ 请参阅“无法连接 redis？”。 ](#无法连接-redis)

## 右下角永远显示“重新连接中”，TL 无法实时更新

如果您有使用代理服务器 (Proxy)，可能是它阻挡了 WebSocket 通信。

## 使用对象存储 (Object Storage) 时出现故障

可能是对象存储的权限设置太严格了。请试着将权限设置为“任何人皆可获取文件（对象）”。
另外，请再次确认 `default.yml`。

### S3 example (with CDN, custom domain)

`S3 example (with CDN, custom domain)` 是当您不想使用 AWS 的默认域名，而是想用独立域名公开存储空间时的设置。
如果 Endpoint 和公开域名是同一个服务，不需要像 S3 example 那样特别写明 `baseUrl`；此外，如果该服务没有 Region 的概念，也不需要写 `region` 那一行。

### S3 兼容服务的设置

Misskey 使用 [aws-sdk](https://www.npmjs.com/package/aws-sdk) 来连接对象存储。只要是与 Amazon S3 兼容的对象存储服务，都有可能可以使用。

请详读各服务/软件的文档并尝试设置。

### 加载 (Loading) 跑不完

如果您使用 Cloudflare，请确认 Rocket Loader 或 Auto Minify 是否已启用。如果已启用，将其关闭或许能解决问题。

---

# 如果完全无法解决

请尝试以下顺序：

1. 详读 Misskey 的官方文档。
2. 试着用 Google 搜索。
3. 搜索 [Misskey 仓库的 Issues](https://github.com/misskey-dev/misskey/issues)（可能有人遇到相同的错误，或是 Misskey 本身的 Bug）。
4. 如果搜索后实在找不到解法，请向专家提问。
   1. 试着在 [Misskey 的 Discord 服务器](https://discord.gg/P4yYqYBjEp)等地方询问。
   2. 发送回复或指名帖子询问开发者 ([aqz](https://p1.a9z.dev/@aqz) 或 syuilo)。
