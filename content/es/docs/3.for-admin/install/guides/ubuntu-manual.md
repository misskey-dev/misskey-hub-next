# Instrucciones detalladas para instalar Misskey en Ubuntu

## Otras instrucciones de instalación de Misskey

- [Guía de construcción manual de  Misskey  (manual)](. /manual/)
- [Otros métodos de instalación](/docs/for-admin/install/guides/#インストール方法一覧)

## Avisos de secuencias de comandos.

Si todo lo que haces es copiar y pegar, ¿por qué no usas un shell script? ¡Así que hicimos uno que hace casi todo en un \*\* script de shell!\*\*\
[**Aquí encontrarás más información sobre los shell scripts y cómo utilizarlos.**](./bash/)

:::tip

No está prevista la instalación en entornos de desarrollo mediante shell scripts.

:::

:::tip

Eres responsable de comprar el dominio y configurar Cloudflare y asegurar el servidor.

:::

Le agradeceríamos que nos informara de cualquier problema mediante [Mención a @aqz@p1.a9z.dev](https://p1.a9z.dev/@aqz).

## Sobre este artículo.

En este artículo, encontrarás una guía para construir Misskey (manual)](./manual/), como se describe en [La guia de construcción de Misskey]

[docker-compose](. /docker/) debería ser un poco más fácil de realizar manualmente.

:::danger

¡No vuelvas a crear la base de datos con el dominio/nombre de host del servidor una vez que hayas empezado a utilizarla!

:::

## Introducción

Este artículo explica paso a paso cómo instalar Misskey en un servidor Ubuntu general y hacerlo accesible al público, basándose en la [Guía de instalación de Misskey (manual)](./manual/).

La configuración se completa simplemente introduciendo comandos Bash, editando algunos archivos de configuración y operando el navegador.Se ofrece una breve explicación del software que debe instalarse, pero no tiene mayor importancia.

En este artículo se hace hincapié en la especificidad y las descripciones propias de entornos concretos.

Ten en cuenta que puede haber diferencias entre sistemas operativos, y que algunas partes pueden haber cambiado debido a actualizaciones del propio Misskey o del software del que depende.

Si los términos no están claros, recomendamos consultar el [diccionario informático](https://wa3.i-3-i.info/) para comprenderlos mejor.

## Entorno y condiciones

- El sistema operativo debe ser **Ubuntu 22.04 LTS**.
- En cuanto a los requisitos de hardware, las CPU pueden funcionar mínimamente si son recientes.Se supone que la arquitectura es amd64 y arm64.
- Se recomiendan unos 4 GB de memoria.
  - (Anteriormente, se explicó que con la introducción de Vite, era posible construir con tan sólo 1,5 GB, pero recientemente los requisitos han vuelto a ser más estrictos para las construcción de Frontend)
- Compra tu propio dominio y utiliza Cloudflare.
- El dominio debe estar preparado de antemano, por ejemplo, en [Cloudflare Registrar](https://www.cloudflare.com/es-es/products/registrar/).
- Usaremos como ejemplo el dominio example.tld, así que sustitúyelo por el dominio que has comprado y lee la documentación acorde a este cambio.Para entornos de desarrollo, lee localhost (se explica por separado en la sección sobre archivos de configuración).

:::danger

No cambies nunca el nombre de dominio de un servidor una vez que hayas empezado a utilizarlo.

:::

## Cómo utilizar nano

Vamos a usar nano como editor de texto.Ejecútalo de la siguiente forma:

```sh
nano /ruta/al/archivo
```

El cursor puede desplazarse con los botones de flecha  y con Inicio/Fin.

Para salir, pulsa Ctrl+X. Cuando se te pregunte si deseas guardar los cambios, escribe Y (Sí) e Intro  para guardar.

En la parte inferior aparece una lista de comandos, así que lea ^ como Ctrl y M- como Alt y utilízalo como referencia.

## Creando los usuarios necesarios

Misskey no debe ejecutarse como root, así que crea un usuario dedicado.

```sh
sudo adduser --disabled-password --disabled-login misskey
```

:::tip

En los entornos de desarrollo, no es necesario separar a los usuarios

:::

## Instalación y configuración básica del software

Instalación de dependencias.

### Node.js

Node.js es un entorno JavaScript del lado del servidor y el entorno de ejecución (runtime) para Misskey.

```sh
sudo rm /usr/share/keyrings/nodesource.gpg;
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/nodesource.gpg;
NODE_MAJOR=22; echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list;
sudo apt update;
sudo apt install -y nodejs;

# Node.js ya está instalado, comprueba la versión.
node -v

# Habilita corepack
sudo corepack enable
```

Si muestra v22.x.x, etc., está bien.Si aparece una versión inferior, como v8.x.x, la instalación no se ha realizado correctamente y debes reiniciar el servidor e intentar instalarlo de nuevo.

### pnpm

pnpm es la herramienta de gestión de paquetes utilizada por Misskey para referenciar librerías externas y gestionar sus dependencias.

Esta sección presenta cómo instalar pnpm usando npm, la herramienta de gestión de paquetes que viene con Node.js, pero el [sitio web de pnpm](https://pnpm.io/installation) presenta varios otros métodos de instalación. Te recomendamos que leas la información e instales pnpm de la forma que mejor se adapte a tu entorno.

```sh
npm i -g pnpm
```

### PostgreSQL

PostgreSQL es un sistema de gestión de bases de datos relacionales por objetos y un software esencial para almacenar los distintos datos de Misskey.

#### Instalación

Ejecuta el script de shell e instala la última versión (v15).

```sh
sudo apt install -y postgresql-common

sudo sh /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -i -v 15;

# systemctlでデーモンの状態を確認。
systemctl status postgresql
```

OK si está activo.

#### Creación de usuarios y bases de datos

Inicia psql.

```sh
sudo -u postgres psql
```

Crear usuarios para su uso con Misskey.Si el nombre de usuario es misskey y la contraseña es hoge, se aplica lo siguiente.\
(Los usuarios de Linux y los usuarios de PostgreSQL son diferentes, así que tenga cuidado de no confundirlos.）

```sql
CREATE ROLE misskey LOGIN PASSWORD 'hoge';
```

Creación de la base de datos.El nombre de la base de datos es mk1.

```sql
CREATE DATABASE mk1 OWNER misskey;
\q
```

### Redis

Redis es un software de base de datos NoSQL en memoria, necesario, entre otras cosas, para gestionar la comunicación con bases de datos y la federación.\
Instálalo según la documentación de redis.io.

https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-linux/

```sh
sudo apt-get install lsb-release curl gpg
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis
```

Activar Redis

```sh
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

Compruebe el estado del demonio(daemon) con systemctl.

```sh
systemctl status redis-server
```

OK si está activo.

### FFmpeg

FFmpeg se encarga del procesamiento relacionado con el vídeo y el audio.Instálalo con el siguiente comando

```sh
sudo apt install ffmpeg
```

### nginx

Nginx es un software de servidor web utilizado principalmente para el proxy inverso.No es esencial para Misskey, pero debería instalarse para mejorar el rendimiento al almacenar en caché, etc., o para transferir de http a https, etc.

:::tip

Para entornos de desarrollo, no es necesario configurar nginx

:::

Instale según la documentación de nginx.org http://nginx.org/en/linux_packages.html#Ubuntu.

```sh
sudo apt install -y curl ca-certificates gnupg2 lsb-release ubuntu-keyring

curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null

gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
```

Comprueba si la salida contiene 573BFD6B3D8FBC641079A6ABF5BD827BD9BF62.

```sh
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list

echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" | sudo tee /etc/apt/preferences.d/99nginx

sudo apt update

sudo apt install -y nginx
```

comprueba el estado del demonio(daemon) con systemctl.

```sh
systemctl status nginx
```

OK si está activo.En caso contrario, ejecuta el siguiente comando.

```sh
sudo systemctl start nginx

sudo systemctl enable nginx
```

Ve a http\://localhost y si ves \*¡Bienvenido a nginx!\*, está bien.También puedes comprobarlo con \
curl.

```sh
curl http://localhost
```

### Más

Instala Git (software de control de versiones) y build-essential (necesario para compilar Misskey).

```sh
sudo apt update

sudo apt install -y git build-essential
```

## Configuración e instalación adicionales

Prepara el servidor para su publicación en Internet.

:::tip

No se requiere configuración de cortafuegos, Cloudflare o Certbot para entornos de desarrollo.

:::

### Cortafuegos (Firewall)

En este caso, utiliza ufw como cortafuegos.

En el siguiente paso, se establecieron los permisos de conexión en formato de lista blanca, se abrió el puerto SSH 22 con un límite en el número de conexiones y se abrieron los puertos HTTP 80 y HTTPS 443.

```sh
sudo ufw enable

sudo ufw default deny

sudo ufw limit 22

sudo ufw allow 80

sudo ufw allow 443
```

Comprueba el estado de ufw.

```sh
sudo ufw status
```

Persistencia del estado con systemctl (para que arranque al inicio)

```sh
sudo systemctl enable ufw
```

:::tip

UFW es una aplicación que hace que netfilter (iptables) sea más fácil de usar.Los scripts de instalación operan directamente sobre netfilter en el entorno OCI.

:::

### Cloudflare

Cloudflare es un servicio muy práctico que proporciona un servidor DNS, proxy inverso y CDN para su dominio, todo a la vez.\
Es posible publicar tu servidor sin pasar por Cloudflare, pero es muy conveniente y recomendable instalarlo.
[**→ Configuración CDN**](../resources/cdn/)

[Regístrate en Cloudflare](https://dash.cloudflare.com/sign-up) y sigue las instrucciones para registrar el dominio que ha adquirido.

Puede introducir la dirección IP del servidor en la pantalla de registro DNS.

Dependiendo de dónde se haya comprado el dominio, la solicitud puede tardar hasta tres días.

### Configuración de Certbot (Let's Encrypt)

Obtén los certificados utilizados para la comunicación HTTPS y WSS de Let's Encrypt utilizando el método basado en Cloudflare.

Instalar los plugins certbot y Cloudflare

```sh
sudo apt install -y certbot python3-certbot-dns-cloudflare
```

Obtén una clave API de Cloudflare.Para obtener la información deben seguirse los siguientes pasos.

1. Accede a https\://dash.cloudflare.com/profile/api-tokens
2. Selecciona View para la Clave API global.
3. Introduzca la contraseña para eliminar hCaptcha, selecciona  View (Ver)

Crea un archivo de configuración /etc/cloudflare/cloudflare.ini con la información de Cloudflare.

```sh
mkdir /etc/cloudflare
nano /etc/cloudflare/cloudflare.ini
```

Establezca en dns_cloudflare_email (下の例ではbar@fuga.foo) la dirección de correo electrónico registrada en Cloudflare.

```sh
dns_cloudflare_email = bar@fuga.foo
dns_cloudflare_api_key = xxxxxxxxxxxxxxxxxxxxxxxxxx
```

Guárdalo y establece los permisos en 600.

```sh
sudo chmod 600 /etc/cloudflare/cloudflare.ini
```

Ejecuta el comando cuando esté listo.**Reemplace el example.tld en dos lugares a lo largo del tutorial con su propio dominio**.

```sh
sudo certbot certonly --dns-cloudflare --dns-cloudflare-credentials /etc/cloudflare/cloudflare.ini --dns-cloudflare-propagation-seconds 60 --server https://acme-v02.api.letsencrypt.org/directory -d example.tld -d *.example.tld
```

\*Bien, si ves\*... ¡Felicidades!Se debe registrar la ruta del archivo .pem generado, ya que se utilizará en el futuro.

Las actualizaciones automáticas se configuran al mismo tiempo que la instalación, por lo que no son necesarias.

## Instalación de Misskey

Ahora que la configuración previa está casi terminado, vamos a preparar la instalación de Misskey.

Cambia al usuario de Misskey

```sh
sudo su - misskey
```

Obtén los archivos de Misskey  con Git

```sh
git clone -b master https://github.com/misskey-dev/misskey.git --recurse-submodules

cd misskey

git checkout master
```

Instala los paquetes npm necesarios.

```sh
NODE_ENV=production pnpm install --frozen-lockfile
```

## Prepara Misskey.

### default.yml

Crea un archivo de configuración .config/default.yml.

```sh
nano .config/default.yml
```

Pega el siguiente contenido y sustitúyelo según proceda.Las zonas en las que es necesario modificar los valores de consigna se marcan con ●, mientras que las zonas en las que se utilizan los valores de consigna del flujo anterior se marcan con 0.

Este archivo de configuración está escrito en formato YAML, y se debe tener especial cuidado porque Misskey no funcionará si el número de espacios al principio de una línea, etc., es incorrecto.

Los valores que se pueden establecer y cómo describirlos se describen en [.config/example.yml](https://github.com/syuilo/misskey/blob/develop/.config/example.yml).

:::tip

En el entorno de desarrollo, la url se especifica como `url: http://localhost:3000`.

:::

```yml
# ● Misskeyを公開するURL  URL de publicación de Misskey.
url: https://example.tld/
# ポートを3000とする。 El puerto está fijado en 3000.
port: 3000

# ● PostgreSQLの設定。 Configuración de PostgreSQL.
db:
  host: localhost
  port: 5432
  db  : mk1 # 〇 PostgreSQLのデータベース名 Nombre de la base de datos de PostgreSQL
  user: misskey # 〇 PostgreSQLのユーザー名 Nombre del usuario de PostgreSQL
  pass: hoge # ● PostgreSQLのパスワード Contraseña del usuario de PostgreSQL

# 　 Redisの設定。Configuración de Redis
redis:
  host: localhost
  port: 6379

# 　 IDタイプの設定。  Configuración del ID
id: 'aidx'

# 　 syslog
syslog:
  host: localhost
  port: 514
```

Guarda el archivo.

### Configuración de Nginx

Configurar nginx.

Realizado con root.

```sh
exit
```

Crea `/etc/nginx/conf.d/misskey.conf`.

```sh
sudo nano /etc/nginx/conf.d/misskey.conf
```

Copia y pega la configuración de ejemplo de [Misskey Hub](/docs/for-admin/install/resources/nginx/) en nano y reescribe las siguientes partes con tu configuración.

- Nombre de dominio en las líneas 18 y 30
- La ruta al certificado en las líneas 34-35 está tomada de Certbot (básicamente sustituye example.tld).
- Línea 56 (Si se encuentra tras otro proxy inverso o CDN, elimine lo siguiente) Suprime las cuatro líneas

Guarda los cambios.

Comprueba que el archivo de configuración funciona correctamente.

```sh
sudo nginx -t
```

Si está bien, reinicia el demonio nginx.

```sh
sudo systemctl restart nginx
```

Verifica el estado.

```sh
sudo systemctl status nginx
```

OK si es ACTIVE.

## Compilando Misskey

Vuelve a iniciar sesión como usuario misskey.

```sh
sudo su - misskey
```

Compila Misskeysí podemos...

```sh
cd misskey
NODE_ENV=production pnpm run build
```

:::tip

Para entornos de desarrollo, `NODE_ENV=production` no es necesario.Elimínalo del mismo modo en los comandos siguientes.

:::

### Si no puedes construir en el servidor

Posible falta de RAM.

Las compilaciones de Misskey y las migraciones de bases de datos (incluida la inicialización) requieren al menos 2 GB de RAM.\
Si la RAM es insuficiente, se pueden adoptar las siguientes soluciones

- Añadir swap al servidor
- Transferir localmente construido (directorio construido) a través de sftp.

## Inicialización de la base de datos

```sh
pnpm run init
```

## Prepara Misskey.

```sh
NODE_ENV=production pnpm run start
```

**Now listening on port 3000 on** [**http://example.tld**](http://example.tld) Accede a la URL que has configurado.

Debería aparecer la página de bienvenida de Misskey.

Comprueba que puedes realizar correctamente una serie de operaciones, como crear una cuenta, crear notas y cargar archivos.

### En caso de inaccesibilidad

#### Comprueba el DNS de CloudFlare

Comprueba de nuevo que la configuración DNS de Cloudflare está establecida en la dirección IP correcta.

#### Comprueba la configuración del router.

Para servidores domésticos, comprueba que el router está configurado para permitir la comunicación en los puertos 80 y 443 entre el servidor y el mundo exterior.

Incluso en la nube, a menudo es necesario abrir puertos en la configuración de la red.

## Crear un demonio para Misskey.

:::tip

Para entornos de desarrollo, no es necesario crear un demonio.

:::

Una vez que mates el proceso con Ctrl+C, configura Misskey para que se inicie como demonio.

Hazlo como root

```sh
exit
```

Crea /etc/systemd/system/misskey.service.

```sh
sudo nano /etc/systemd/system/misskey.service
```

Pega y guarda el siguiente contenido.

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

Configura systemd e inicia el demonio misskey.

```sh
sudo systemctl daemon-reload

sudo systemctl enable misskey

sudo systemctl start misskey
```

comprueba el estado del demonio(daemon) con systemctl.Tarda un poco en arrancar, así que es mejor esperar 15 segundos.

```sh
sudo systemctl status misskey
```

OK si está activo.

**La instalación de Misskey está casi terminada.**

Regístrate e inicia sesión con tu cuenta en el servidor de Misskey y continúa con la configuración.

## Prepara Misskey.

- [**Descripción de la primera y otras configuraciones del servidor que deben configurarse en el servidor Misskey**](https://hide.ac/articles/Y504SIabp).
- [**Crear un proxy Squid para proteger Misskey**](https://hide.ac/articles/MC7WsPDqw)
- [Copia de seguridad de la base de datos Misskey [versión de almacenamiento de objetos OCI]\*\*](https://hide.ac/articles/E2Ea3cauk)

## Actualizando Misskey

[Cómo actualizar Misskey](./manual/#misskeyのアップデート方法)

Misskey no puede actualizarse mientras se está ejecutando.

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

### Caso 1: Al realizar una actualización apt

```sh
sudo apt update -y
sudo apt full-upgrade -y
sudo reboot
```

Después de reiniciar, Misskey se iniciará automáticamente.

### Caso 2: Empezar como está

```sh
sudo systemctl start misskey
```
