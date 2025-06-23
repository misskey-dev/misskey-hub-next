# Cómo hacer push a Docker Hub usando GitHub Actions

Un ejemplo de cómo hacer push a Docker Hub usando Github Actions se puede encontrar en el repositorio original en el archivo [/.github/workflows/docker.yml](https://github.com/misskey-dev/misskey/blob/develop/.github/workflows/docker.yml)

El repositorio original se envía a Docker Hub con las etiquetas `latest` y `<release name>` respectivamente cuando se publica.\
Puede haber etiquetas como `<branch name` en el Docker Hub, pero no están sujetas a push automático.

La ejecución de este flujo de trabajo en una bifurcación fallará.

En la siguiente información, describimos cómo hacer que el Fork haga push a su propio repositorio Docker Hub.

## Cómo configurar un flujo de trabajo para enviar a su propio repositorio Docker Hub

1. Crear un repositorio en Docker Hub.
2. Sustituye las [menciones de imagen en el archivo de workflow](https://github.com/misskey-dev/misskey/blob/53f3b779bf16abcda4f6e026c51384f3b8fbcc62/.github/workflows/docker.yml#L20) por el nombre del repositorio que has creado.
3. Crea dos [secretos cifrados](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-encrypted-secrets-for-a-repository) en GitHub.\
   Es necesario crear `DOCKER_USERNAME` y `DOCKER_PASSWORD`, que son el usuario y la contraseña de Docker Hub respectivamente.

## Cómo hacer push

La configuración por defecto en el flujo de trabajo se empujará automáticamente a Docker Hub en una nueva versión.\
\
En concreto, cuando una versión se hace uso de la función de liberación de GitHub se empuja a Docker Hub con las etiquetas `latest` y `<nombre de la versión>`.\
En concreto, la versión se envía a Docker Hub con las etiquetas `latest` y `<release name>` respectivamente en el momento de la publicación a través de la función de publicación de GitHub.

También puedes hacer push manualmente desde GitHub.\
Para ello, seleccione la rama desde Acciones => Publicar imagen Docker => Ejecutar flujo de trabajo.\
Sin embargo, la etiqueta creada en este caso será `<nombre de rama>`.
