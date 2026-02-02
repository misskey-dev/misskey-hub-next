# CDN 设置

在公开 Misskey 服务器时，强烈建议使用 [Cloudflare](https://www.cloudflare.com/) 等 CDN。

使用 CDN 有以下优点：

- 可以缓存静态内容，从而降低服务器负载
- 可以隐藏服务器的真实 IP 地址，从而缓解 DoS 攻击等风险

## 缓存

Misskey Web 是完全静态的，其运行不需要服务器端的处理。因此，可以通过 CDN 缓存整个 Misskey Web。
Misskey API 无法缓存。

请在 CDN 上进行以下设置：

- 缓存除 `/api/*` 以外的所有请求

:::tip

更新 Misskey 时无需清除缓存。

:::
