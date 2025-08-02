# Shell Script de instalación de Misskey v.3.0.0

Este script fue creado para facilitar la instalación de Misskey.

Respondiendo a un par de preguntas, ¡podrás instalar fácilmente Misskey en un servidor Ubuntu!

También hay un script de actualización.

La v12 del script (antigua) está disponible [aquí](https://github.com/joinmisskey/bash-install/blob/a096e874f93d493aa68975a31be9ce12d644e767/README.md)

## Requisitos

1. Dominio
2. Servidor con Ubuntu Server instalado
3. Una cuenta de Cloudflare (recomendado)

:::danger

¡No vuelvas a crear la base de datos con el dominio/nombre de host del servidor una vez que hayas empezado a utilizarla!

:::

Dado que los intentos de verificación de Let's Encrypt son limitados, compruebe doblemente veces la configuración de red y Dns de su servidor antes de iniciar la instalación.

## Configuración de Cloudflare

Si utiliza Cloudflare, asegúrese de completar la configuración de su dominio Cloudflare antes de iniciar la instalación.\
El servidor de nombres puede tardar hasta tres días en aplicarse.

Además, al configurar nginx y Cloudflare, en la pantalla de configuración de Cloudflare,

- Configura el DNS.
- En la configuración SSL/TLS, establece el modo de cifrado en "Completo".

## Acciones

### 1. SSH

Conéctate al servidor por SSH.\
(Si tienes abierto el escritorio del servidor, abra un intérprete de comandos.）

### 2. Actualizar el entorno

Actualiza todos los paquetes y reinicia.

```sh
sudo apt update; sudo apt full-upgrade -y; sudo reboot
```

### 3. Iniciar la instalación

Vuelve a conectarte por SSH y empieza a instalar Misskey.

No obstante, se recomienda encarecidamente leer [Tips](#tips) antes de la instalación.

```sh
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/ubuntu.sh -O ubuntu.sh; sudo bash ubuntu.sh
```

sustituye ejemplo.com por tu propio dominio.

### 4. Actualizar

También hay disponibles comandos para la actualización.

Los scripts de actualización no actualizan el entorno.Consulta CHANGELOG (en japonés) y [GitHub release list (Inglés)](https://github.com/joinmisskey/bash-install/releases) y realiza las operaciones de migración en consecuencia.

Primero, descarga.

```sh
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/update.ubuntu.sh -O update.sh
```

Ejecuta el script cuando desees actualizarlo.

```sh
sudo bash update.sh
```

- en un entorno systemd, la opción `-r` puede utilizarse para actualizar y reiniciar el sistema.
- en un entorno docker, el argumento puede ser el nombre del repositorio actualizado:nombre de la etiqueta.

## Entornos de producción comprobados

### Oracle Cloud Infrastructure

El script funciona en las dos formas proporcionadas por el servicio Always Free de Oracle Cloud Infrastructure.

- VM.Standard.E2.1.Micro (AMD)
- VM.Standard.A1.Flex (ARM) [1OCPU RAM6GB or greater]

utiliza iptables.

## Reportes de bugs (Issues) y PRs son bienvenidos

Si no funciona en los entornos mencionados, puede tratarse de un error.Te agradeceríamos que informaras de ello a través de la función Issue de GitHub, indicando las condiciones especificadas para la instalación.

Es difícil prestar asistencia en entornos distintos de los indicados anteriormente, pero si nos facilitas detalles de tu situación, es posible que podamos resolver el problema.

También se aceptan sugerencias sobre funciones.

# Consejos

Cómo elegir opciones y especificaciones.

## ¿Systemd o Docker?

A partir de v1, se puede seleccionar el método de instalación entre systemd y Docker.

Cuando decimos Docker, solo ejecutamos **Misskey en Docker** y Redis, Postgres, etc. directamente en el host.\
Para más información sobre cómo hacer que todo funcione con [docker-compose, recomendamos este artículo creado por mamemononga.](https://gist.github.com/mamemomonga/5549bb69cad8e5618e5527593d4890e0)

Si está configurado para utilizar imágenes Docker Hub, esto es **más recomendable** ya que elimina la necesidad de construir Misskey.\
Sin embargo, la migración es necesaria, por lo que no hay tiempo de parada (downtime) cuando Misskey no se puede utilizar para las actualizaciones.\
Además, el entorno de compilación de Misskey no está preparado (no hay git pull), lo que hace que sea una molestia configurarlo cuando se quiere ejecutar un fork.

El método de compilación local de Docker está obsoleto por razones de rendimiento.

systemd es recomendable si quieres usar un fork del systemd, aunque no necesitas poner la imagen en Docker Hub.

El orden recomendado es el siguiente.

1. Docker Hub
2. systemd
3. Docker Build

## Si utilizas Nginx

Recomendamos el uso de nginx como proxy inverso para actuar como intermediario entre Internet y Misskey, excepto en los siguientes casos

- Un solo usuario (el llamado servidor unipersonal) O muy pocos usuarios
- Prepárate para cubrir la funcionalidad de proxy inverso/cache de nginx por otros medios, como balanceadores de carga (para usuarios avanzados).

Al utilizar nginx como proxy inverso, se pueden almacenar en caché contenidos estáticos como archivos de imagen y reducir los recursos del servidor.
Además, nginx está equipado con una función para controlar los accesos masivos en ausencia de caché, por lo que cabe esperar que reduzca el aumento de la carga en Misskey.

En la página [nginx configuration](. /resources/nginx/).

## ¡Añadir más Swap!

Si el swap está configurado, la memoria total debe ser de al menos 3 Gb para permitir que el script se ejecute.

## Si el script falla en mitad del proceso y quieres volver a ejecutarlo

En el improbable caso de que el script falle a la mitad y quieras ejecutarlo de nuevo, ten en cuenta lo siguiente.

- Si Redis o Postgres ya han sido instalados, 'instalar localmente' debe ser No.\
  Para la configuración de host y puerto, pulse Intro tal cual.
  Introduzca el nombre de usuario y la contraseña especificados en la ejecución anterior.

## Acerca de los archivos .env

El script de instalación crea dos archivos.env.\
Se utiliza para actualizar.

### /root/.misskey.env

esto es necesario para recordar el usuario que ejecuta misskey.

### /home/(misskeyユーザー)/.misskey.env

generado para systemd.\
Se utiliza principalmente para recordar directorios.

### /home/(misskeyユーザー)/.misskey-docker.env

Generado para Docker.\
Almacena el número del contenedor y de la imagen que se está ejecutando.\
Los números de contenedor se actualizan durante las actualizaciones.Las imágenes antiguas se borran.

## Gestionar por su cuenta

Se trata de notas que pueden resultar útiles a la hora de modificar la configuración tras la instalación.

Sustituye "example.com" por tu dominio.

### Directorio Misskey

La fuente de Misskey se clona en el directorio `/home/user/ `.\
(Los valores por defecto tanto para el usuario como para directorio son misskey.）

Puedes navegar al directorio Misskey de la siguiente manera.

```sh
sudo -iu {{usuario}}
cd {{directorio}}
```

Para volver al usuario original, realice exit.

```sh
exit
```

### systemd

el nombre del proceso systemd es example.com.\
Por ejemplo, para reiniciar, haz lo siguiente.

```sh
sudo systemctl restart example.com
```

puedes comprobar los registros con journalctl.

```sh
journalctl -t example.com
```

El archivo de configuración se almacena como `/etc/systemd/system/example.com.service`.

### Docker

Docker se está ejecutando sin root con el usuario Misskey.

al entrar en el usuario Misskey con sudo, el `XDG_RUNTIME_DIR` y `DOCKER_HOST` deben ser cambiados.

```sh
sudo -iu ユーザー
export XDG_RUNTIME_DIR=/run/user/$UID
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock

# プロセス一覧を表示
docker ps

# ビルド (リポジトリ: local/misskey:latest)
docker build -t local/misskey:latest ./misskey

# docker run
docker run -d -p 3000:3000 --add-host=docker_host:10.0.0.1 -v /home/misskey/misskey/files:/misskey/files -v "/home/misskey/misskey/.config/default.yml":/misskey/.config/default.yml:ro --restart unless-stopped -t "local/misskey:latest"
```

Para las frases de una línea, haz lo siguiente.

```sh
sudo -u ユーザー XDG_RUNTIME_DIR=/run/user/$(id -u ユーザー) DOCKER_HOST=unix:///run/user/$(id -u ユーザー)/docker.sock docker ps
```

### nginx

la configuración de nginx se almacena como `/etc/nginx/conf.d/example.com.conf`.

### Redis

requirepass y bind se configuran en `/etc/redis/misskey.conf`.

## P. Error 502 Inaccesible después de la actualización

Con Docker, la migración se realiza después de la puesta en marcha y no es inmediatamente accesible.\
Compruebe que la migración se ha completado.

en el caso de systemd, la instalación pnpm puede haber fallado.

Ejecuta lo siguiente en el directorio Misskey e intenta la actualización de nuevo.

```sh
pnpm run clean-all
```

Si compruebas los registros con journalctl, normalmente encontrarás una declaración diciendo "re2".

## P. Quiero construir otro Misskey en el mismo servidor

El script no contempla instalaciones adicionales de Misskey en el mismo servidor.\
Algunos ajustes se sobrescribirán o habrá errores por el camino.
