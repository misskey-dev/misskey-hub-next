---
description: 'Esta guía te mostrará cómo instalar y configurar Misskey.'
---

# Instalación Manual de Misskey

Esta guía te mostrará cómo instalar y configurar Misskey.

:::danger

¡No vuelvas a crear la base de datos con el dominio/nombre de host del servidor una vez que hayas empezado a utilizarla!

:::

:::tip{label='前提条件'}

#### Necesitarás instalar los siguientes paquetes:

- **[Node.js](https://nodejs.org/es/)** (v22)
- **[pnpm](https://pnpm.io/)** (versión 10 o superiores)
- **[PostgreSQL](https://www.postgresql.org/)** (versión 15 o superiores)
- **[Redis](https://redis.io/)**
- **[FFmpeg](https://www.ffmpeg.org/)**

Si ejecutas Misskey en Debian/Ubuntu, necesitas instalar el paquete `build-essential`.

:::

## Creando los usuarios necesarios

Misskey no debería ejecutarse con permisos de superusuario, root, así que deberías crear un nuevo usuario.En Debian por ejemplo:

```sh
adduser --disabled-password --disabled-login misskey
```

## Instalación de Misskey

```sh
sudo -iu misskey
git clone --recursive https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
```

## Configurando  Misskey

Por favor copia el archivo del archivo de configuración de ejemplo `.config/example.yml` a `default.yml` .

```sh
cp .config/example.yml .config/default.yml
```

Y edita `default.yml` siguiendo las instrucciones dentro del archivo

## Construyendo e iniciando Misskey

El siguiente comando construirá Misskey e inicializará la base de datos.
Esto puede tardar un tiempo.

```sh
NODE_ENV=production pnpm run build
pnpm run init
```

## Ejecutar Misskey

¡Felicidades!Puedes iniciar Misskey con el siguiente comando:

```sh
NODE_ENV=production pnpm run start
```

GLHF✨

::::g-details{summary="Gestión con systemd"}

Crea una configuración de servicio systemd

`/etc/systemd/system/misskey.service`

Abre tu editor y pega el siguiente código:

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

:::warning

Si estás usando CentOS y estás utilizando un número de puerto menor que 1024. Por favor cámbialo a `ExecStart=/usr/bin/sudo /usr/bin/npm start`

:::

Recarga systemd y habilita el servicio de misskey.

```sh
sudo systemctl daemon-reload
sudo systemctl enable misskey
```

Ejecuta el servicio de Misskey

```sh
sudo systemctl start misskey
```

:::tip

Puedes comprobar el estado del servicio con 'systemctl status misskey'.

:::

::::

## Actualizando Misskey

:::warning

Consulta siempre las [notas de la versión](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md) antes de actualizar, para saber de antemano qué cambios se han introducido y si es necesario realizar algún trabajo adicional (en la mayoría de los casos, no lo es)

:::

Haz pull de master, instala, recompila y migra la base de datos:

```sh
git checkout master
git pull
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
NODE_ENV=production pnpm run build
pnpm run migrate
```

Dependiendo del contenido de la actualización y del tamaño de la base de datos, esto puede llevar algún tiempo.

Reinicia el proceso de Misskey en cuanto finalice la actualización.

```sh
sudo systemctl restart misskey
```

:::tip

Si se produce un error durante la compilación o la inicialización, prueba con los siguientes comandos:

- `pnpm run clean` or `pnpm run clean-all`
- `pnpm rebuild`

:::
