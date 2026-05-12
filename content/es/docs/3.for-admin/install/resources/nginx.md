# Configuración de Nginx

Recomendamos utilizar [nginx](https://nginx.org/) como proxy inverso y operar el servidor Misskey sin exponerlo directamente a Internet.
Esto proporciona las siguientes ventajas:

- Mayor seguridad: Al controlar el acceso a través de un proxy inverso, puede reducir el riesgo de ataques directos al servidor Misskey.
- Configuración flexible: nginx ofrece opciones de configuración flexibles, que permiten configurar no sólo la función de proxy inverso, sino también las políticas de caché[^1] y seguridad.

Si aprovechas estos puntos, podrás operar tu servidor Misskey de forma más segura y eficiente.
También puedes configurar tu infraestructura con una CDN como Cloudflare para obtener aún mayores beneficios.

[^1]: Utilizando las funciones de nginx [proxy_cache_lock](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_lock) y [proxy_cache_use_stale](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_use_stale), puede esperar reducir la carga en el servidor Misskey incluso si hay una gran cantidad de accesos cuando la caché no ha sido creada.

## Ejemplo de configuración

A continuación se muestra un ejemplo de configuración para cuando nginx se instala directamente en una máquina servidor (como un VPS) y se utiliza [Let's Encrypt](https://letsencrypt.org/) como autoridad de certificación.

1. Crea `/etc/nginx/conf.d/misskey.conf` o `/etc/nginx/sites-available/misskey.conf` y copia la configuración de ejemplo que aparece a continuación.\
   (El nombre del archivo no tiene por qué ser Misskey.)
2. Editalo como sigue:
   1. Sustituye example.tld por el dominio que has preparado.`ssl_certificate` y `ssl_certificate_key` deben ser la ruta al certificado obtenido de Let's Encrypt.
   2. Si utilizas una CDN como Cloudflare, elimina 4 líneas de "Si está detrás de otro proxy inverso o CDN, elimina lo siguiente".
3. Si creaste `/etc/nginx/sites-available/misskey.conf`, crea un enlace simbólico como `/etc/nginx/sites-enabled/misskey.conf`.\
   `sudo ln -s /etc/nginx/sites-available/misskey.conf /etc/nginx/sites-enabled/misskey.conf`
4. Ejecuta `sudo nginx -t` para verificar que el archivo de configuración se cargará correctamente.
5. Reinicia nginx con `sudo systemctl restart nginx`.

## Ejemplos

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
