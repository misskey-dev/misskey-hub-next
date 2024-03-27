# Nginx 설정

1. `/etc/nginx/conf.d/misskey.conf` 또는 `/etc/nginx/sites-available/misskey.conf`를 생성하고 아래 설정 예시를 복사합니다....
   (파일명은 misskey가 아니어도 상관없습니다.)）
2. 다음과 같이 편집합니다.
   1. example.tld를 자신이 준비한 도메인으로 대체합니다.example.tld를 자신이 준비한 도메인으로 대체합니다.example.tld를 자신이 준비한 도메인으로 대체합니다.\
      `ssl_certificate`와 `ssl_certificate_key`는 Let's Encrypt에서 발급받은 인증서의 경로가 되도록 합니다.
   2. Cloudflare 등의 CDN을 사용하는 경우 'If it's behind another reverse proxy or CDN, remove the following.’
3. (파일명은 misskey가 아니어도 상관없습니다.)）(파일명은 misskey가 아니어도 상관없습니다.)）`/etc/nginx/sites-available/misskey.conf`를 만들었다면 `/etc/nginx/sites-enabled/misskey.conf`로 심볼릭 링크를 생성합니다.\
   `sudo ln -s /etc/nginx/sites-available/misskey.conf /etc/nginx/sites-enabled/misskey.conf`
4. `sudo nginx -t`로 설정 파일이 정상적으로 로드되는지 확인합니다.
5. `sudo systemctl restart nginx`로 nginx를 리로드 합니다.

## 설정 예시

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
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
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
