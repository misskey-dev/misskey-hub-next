# Nginx configuration

We recommend using [nginx](https://nginx.org/) as a reverse proxy and operating the Misskey server without exposing it directly to the Internet.
This provides the following benefits:

- Enhanced security: By controlling access through a reverse proxy, you can reduce the risk of direct attacks on the Misskey server.
- Flexible configuration: nginx offers flexible configuration options, allowing you to configure not only the reverse proxy function but also caching[^1] and security policies.

By taking advantage of these points, you can operate your Misskey server more safely and efficiently.
You can also set up your infrastructure with a CDN such as Cloudflare for even greater benefits.

[^1]: By utilizing the nginx functions [proxy_cache_lock](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_lock) and [proxy_cache_use_stale](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_use_stale), you can expect to reduce the load on the Misskey server even if there is a large amount of access when the cache has not been created.

## Example of how to set it up

The following is a configuration example for when nginx is installed directly on a server machine (such as a VPS) and [Let's Encrypt](https://letsencrypt.org/) is used as the certificate authority.

1. Create `/etc/nginx/conf.d/misskey.conf` or `/etc/nginx/sites-available/misskey.conf` and copy the following example to the file.\
   （The file name does not have to be "misskey".)\
   （The file name does not have to be "misskey".)
2. Edit as follows:
   1. Replace example.tld with the domain you have prepared.Replace example.tld with the domain you have prepared.\
      `ssl_certificate` and `ssl_certificate_key` should be the path to the certificate obtained from Let's Encrypt.
   2. If using a CDN such as Cloudflare, remove 4 lines from "If it's behind another reverse proxy or CDN, remove the following."
3. If you create `/etc/nginx/sites-available/misskey.conf`, create symlink as `/etc/nginx/sites-enabled/misskey.conf`.\
   `sudo ln -s /etc/nginx/sites-available/misskey.conf /etc/nginx/sites-enabled/misskey.conf`
4. Run `sudo nginx -t` to verify that the configuration file will be loaded successfully.
5. Run `sudo systemctl restart nginx` to restart nginx.

## Nginx config example

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
