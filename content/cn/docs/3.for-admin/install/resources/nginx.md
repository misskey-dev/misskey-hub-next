# Nginx 的设置

建议将 [nginx](https://nginx.org/) 用作反向代理，不要直接将 Misskey 服务器公开到互联网上。
这样做有以下优点：

- 安全性增强：通过反向代理控制访问，降低 Misskey 服务器直接遭到攻击的风险。
- 灵活的设置：nginx 提供灵活的配置选项，不仅可以作为反向代理，还可以设置缓存 [^1] 和安全策略。

利用这些优势，可以更安全、高效地运行 Misskey 服务器。
此外，配合 Cloudflare 等 CDN 一起设置，可以获得更好的效果。

[^1]: 通过利用 nginx 的 [proxy_cache_lock](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_lock) 和 [proxy_cache_use_stale](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_use_stale)功能，即使在未建立缓存的状态下遭遇大量访问，也能预期达到抑制 Misskey 服务器负载增加的效果。

## 设置方法示例

以下是在服务器主机（如 VPS）上直接安装 nginx，并采用 [Let's Encrypt](https://letsencrypt.org/) 作为证书颁发机构 (CA) 的设置示例。

1. 请创建 `/etc/nginx/conf.d/misskey.conf` 或 `/etc/nginx/sites-available/misskey.conf`，并复制下方的设置示例。\
   （文件名不一定要是 misskey。）
2. 请进行如下编辑：
   1. 将 example.tld 替换为你准备的域名。\
      `ssl_certificate` 和 `ssl_certificate_key` 请设置为从 Let's Encrypt 获取的证书路径。
   2. 如果使用 Cloudflare 等 CDN，请删除从 “If it's behind another reverse proxy or CDN, remove the following.” 开始的 4 行内容。
3. 如果创建的是 `/etc/nginx/sites-available/misskey.conf`，请创建如下指向 `/etc/nginx/sites-enabled/misskey.conf` 的符号链接。\
   `sudo ln -s /etc/nginx/sites-available/misskey.conf /etc/nginx/sites-enabled/misskey.conf`
4. 使用 `sudo nginx -t` 确认配置文件是否能正常读取。
5. 使用 `sudo systemctl restart nginx` 重启 nginx。

## 设置示例

```nginx
# For WebSocket
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

proxy_cache_path /tmp/nginx_cache levels=1:2 keys_zone=cache1:16m max_size=1g inactive=720m use_temp_path=off;

server {
    listen 80;
    listen [::]:80;
    server_name example.tld;

    # For SSL domain validation
    root /var/www/html;
    location /.well-known/acme-challenge/ { allow all; }
    location /.well-known/pki-validation/ { allow all; }
    location / { return 301 https://$server_name$request_uri; }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name example.tld;

    ssl_session_timeout 1d;
    ssl_session_cache shared:ssl_session_cache:10m;
    ssl_session_tickets off;

    # To use Let's Encrypt certificate
    ssl_certificate     /etc/letsencrypt/live/example.tld/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.tld/privkey.pem;

    # To use Debian/Ubuntu's self-signed certificate (For testing or before issuing a certificate)
    #ssl_certificate     /etc/ssl/certs/ssl-cert-snakeoil.pem;
    #ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;

    # SSL protocol settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Change to your upload limit
    client_max_body_size 80m;

    # Proxy to Node
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_redirect off;

        # If it's behind another reverse proxy or CDN, remove the following.
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;

        # For WebSocket
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        # Cache settings
        proxy_cache cache1;
        proxy_cache_lock on;
        proxy_cache_use_stale updating;
        proxy_force_ranges on;
        add_header X-Cache $upstream_cache_status;
    }
}
```
