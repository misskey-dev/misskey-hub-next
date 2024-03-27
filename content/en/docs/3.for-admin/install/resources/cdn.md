# CDN Configuration

We strongly recommend using a CDN such as [Cloudflare](https://www.cloudflare.com/) when publishing your Misskey server.

Using a CDN provides the following benefits

- Reduce server load by having static content cached
- Less exposure of the server's IP address which can mitigate DoS attacks, etc.

## Cache

The Misskey Client is completely static and does not require a server to operate.The Misskey Client is completely static and does not require a server to operate.The Misskey Client is completely static and does not require a server to operate.Thus, the entire Misskey Client can be cached by the CDN with the exception of the Misskey API which cannot be cached.

Please configure your CDN in the following way:

- Cache all requests except `/api/*`

:::tip

Misskeyをアップデートした際にキャッシュのクリアは不要です。

:::
