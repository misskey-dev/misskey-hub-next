# 設定 CDN

在正式對外公佈 Misskey 伺服器之前，強烈建議使用如 [Cloudflare](https://www.cloudflare.com/) 之類的 CDN 服務。

使用 CDN 有以下好處：

- 静的なコンテンツをキャッシュしてもらうことができ、サーバーの負荷が低減する
- 避免伺服器的 IP 位址直接暴露，可以減輕 DoS 攻擊

## キャッシュ

Misskey Web 是完全靜態的，不需要伺服器來運作。因此整個 Misskey Web 可以快取在 CDN 上。
但 Misskey API 無法被快取。

請在CDN上進行以下設定。

- `/api/*`以外のリクエストをすべてキャッシュする

:::tip
更新 Misskey 時無需清除快取。
:::
