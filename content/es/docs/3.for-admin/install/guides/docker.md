---
description: 'Esta guía explica cómo configurar Misskey utilizando Docker.'
---

# Construyendo Misskey con Docker Compose

Esta guía explica cómo configurar Misskey utilizando Docker

:::danger

¡No vuelvas a crear la base de datos con el dominio/nombre de host del servidor una vez que hayas empezado a utilizarla!

:::

:::tip{label='前提条件'}

- Asegúrese de que Docker y Docker Compose están instalados en su sistema.

:::

## Clonar el repositorio

```sh
git clone -b master https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
```

## Configuración

Los siguientes comandos copiarán los distintos archivos de configuración de ejemplos a su ubicación de configuración real.

```sh
cp .config/docker_example.yml .config/default.yml
cp .config/docker_example.env .config/docker.env
cp ./compose_example.yml ./compose.yml
```

Por favor edita `default.yml` y `docker.env` así como su descripción.\
También edita `compose.yml` si es necesario( Por si quieres cambiar el puerto etc.).\
Asegúrate de comprobar con antelación cualquier cambio que pueda ser necesario.(Si deseas cambiar el puerto etc.)

## Construir y inicializar

El siguiente conjunto de comandos construirá la imagen de Misskey y realizará la inicialización de la base de datos. Esto llevará algún tiempo.

```shell
sudo docker compose build
sudo docker compose run --rm web pnpm run init
```

## Iniciar

¡Felicidades!Puedes ejecutar Misskey con el siguiente comando.

```sh
sudo docker compose up -d
```

GLHF✨

## Actualizando Misskey

:::warning

Las actualizaciones están siempre disponibles en [ las notas de lanzamiento] (https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md).

:::

```sh
git stash
git checkout master
git pull
git submodule update --init
git stash pop
sudo docker compose build
sudo docker compose stop && sudo docker compose up -d
```

Puede tardar dependiendo del contenido de la actualización y del tamaño de la base de datos.

## Cómo ejecutar comandos Cli

```sh
sudo docker compose run --rm web node packages/backend/built/tools/foo bar
```
