# Solución de problemas durante la instalación manual

<small>07 de octubre de 2018 / 20 de diciembre de 2021 Actualización final / Responsabilidad textual aqz/tamaina</small>

MisskeyInstallBattleHa aumentado el número de participantes, pero también el número de heridos graves y leves.\
Para reducir el número de lesiones de este tipo, este artículo ofrece una explicación clara de las tendencias y contramedidas en las zonas donde se han producido accidentes en el pasado.

\*\*En primer lugar, lee la [guía de construcción] (../guides/manual/) \*\*

También, por favor, lee  [Explicación de la versión de systemd para Ubuntu](https://hide.ac/articles/iFwm5HDvH) y [Explicación detallada de la versión de Oracle Cloud](https://hide.ac/articles/csERs-7SU) como referencia. Estaría encantado de que los leyeras también.

# Anuncios de scripts de shell para Ubuntu

Explicar Ubuntu es aburrido porque todo es copiar y pegar.¡Lleva mucho tiempo!De todos modos, ¡es una molestia!

……Oye, si puedes hacerlo simplemente copiando y pegando, significa que puedes automatizarlo por completo, ¿no?

¡Así que hice un \*\* shell script que hace casi todo por mí!\*\*\
[**¡Para más información e instrucciones de uso, haz clic aquí!** https://github.com/joinmisskey/bash-install#readme](https://github.com/joinmisskey/bash-install#readme)

Eres responsable de comprar el dominio y configurar Cloudflare y asegurar el servidor.

Si tienes algún problema con el script de comandos, comunícalo al [autor (aqz)](https://p1.a9z.dev/@aqz).

# Instalación y compilación

Lee las [instrucciones de construcción](. /guías/manual/)  léelo atentamente.

## Relacionado con ImageMagick

_**¡ImageMagick no es necesario!**_

## La compilación ha fallado

Misskey requiere, como regla general, al menos 2 GB de memoria.\
Podrías escalar el servidor, o podrías compilarlo en tu PC y desplegarlo en el servidor.

## Algo va mal

- Lee las [instrucciones de construcción](. /guías/manual/)  léelo atentamente.
- ¿Es posible que la versión de node.js no esté actualizada?
  - Actualiza a la versión más reciente
- Puede aparecer un error o WARN(Aviso) durante la instalación y la compilación, pero puede que no sea un problema.Vamos a usar `npm start` y comprobar que funciona.
- ¿Quizás node-gyp no está instalado?
  - Prueba lo siguiente `apt install build-essential`
  - En Windows también puede referirse a [este artículo](https://qiita.com/AkihiroTakamura/items/25ba516f8ec624e66ee7).
- Si esto no parece funcionar, empieza desde el principio y sigue las instrucciones de las [instrucciones de construcción](../guides/manual/) desde el principio.

## Los defectos se produjeron después de la actualización.

- Lee las [instrucciones de construcción](. /guides/manual/) y las notas de la versión.
- Asegúrate de que `pnpm install` y `pnpm run migrate` al actualizar Misskey.Si eso no lo arregla, prueba `pnpm run clean-all && pnpm install`, luego prueba `pnpm run build && pnpm run migrate && pnpm start`.
- Si esto no parece funcionar, empieza desde el principio y sigue las instrucciones de las [instrucciones de construcción](. /guías/manual/) desde el principio.

---

# Configuración

Lee las [instrucciones de construcción](. /guías/manual/)  léelo atentamente.

Configura los ajustes en `.config/default.yml`.
Copia [`.config/example.yml`](https://github.com/misskey-dev/misskey/blob/develop/.config/example.yml) y sigue los comentarios.

(En formato YAML, desde `#` hasta el final de la línea se trata como un comentario.）

## URL y número de puerto

La mecánica de las URL y los números de puerto puede resultar un poco confusa.

El archivo `.config/example.yml` contiene `Port and TLS settings` en orden con diagramas explicativos, así que vamos a configurar los ajustes en consecuencia.
Haremos esto mientras traducimos las explicaciones del texto al japonés.

### Configuración de la URL

```yml
# Final accessible URL seen by a user.
# 사용자가 최종적으로 접속하는 URL
# URL final accesible vista por un usuario.
url: https://example.tld/
```

**En el campo `url`, escribe la URL **(deseada)** que se mostrará en la barra de direcciones cuando se acceda al servidor con un navegador.**

### Configuración de puertos

```yml
#   ┌───────────────────────┐
#───┘ Port and TLS settings └───────────────────────────────────
#### ポートとTLSの設定         ####################################
#### Configuración de puertos y TLS ####################################

# Misskey requiere un proxy inverso para soportar conexiones HTTPS 
# Misskey requires a reverse proxy to support HTTPS connections.
# MisskeyでHTTPS接続をサポートするにはリバースプロキシが必須です。
#
#                 +----- https://example.tld/ ------------+
#   +------+      |+-------------+      +----------------+|
#   | User | ---> || Proxy (443) | ---> | Misskey (3000) ||
#   +------+      |+-------------+      +----------------+|
#                 +---------------------------------------+
#
#   Necesitas configurar un proxy inverso. (por ejemplo, nginx)
#   You need to set up a reverse proxy. (e.g. nginx)
#   この方法では、リバースプロキシ（例: nginx）をセットアップする必要があります。
#
#   Se recomienda encarecidamente una conexión cifrada con HTTPS
#   ya que los tokens pueden transferirse en solicitudes GET.
#   An encrypted connection with HTTPS is highly recommended
#   because tokens may be transferred in GET requests.
#   GETリクエストでトークンがURLに含まれる可能性があるため、
#   HTTPSによる暗号化を強く推奨します。
```

```yml
# El puerto en el que tu servidor Misskey debería estar escuchando
# The port that your Misskey server should listen on.
# Misskeyサーバがリッスンするポート
port: 3000
```

En este ejemplo, Misskey se comunica en el puerto 3000.
El proxy inverso especifica este número de puerto para el destino en el lado local.

----

# Errores comunes encontrados durante el `npm start` y el acceso.

Es posible configurar un servidor con `npm start` pero luego encontrar problemas.

\*\*En primer lugar, lee la [guía de construcción] (../guides/manual/)

## Errores YAML.

Puede haber un error de sintaxis en `default.yml`.
¿Hay espacios de más al principio de la línea?

## No se puede conectar a redis

¿Está funcionando el servidor redis?
¿Se ha alcanzado algún límite de conexión?

Las versiones de Misskey anteriores a la 11.20.2 no pueden resolver las contraseñas de redis.Comprueba los dos puntos siguientes.

- No hay contraseña para redis.
- Comenta la línea `pass:` en `redis:` en `default.yml`.

## Aparece una barra roja en la parte superior que dice "Esta es una compilación de desarrollo".

Utiliza siempre la versión de producción cuando vayas a publicar  un servidor.

Para realizar una compilación de producción, configura la variable de entorno como `NODE_ENV=production` y `npm run build && npm start`.

## No es posible un nuevo registro.

Parece que no puedes conectarte a la API.
Comprueba que la `url:` al principio del `default.yml` está configurada correctamente.
Comprueba también la versión de Node.js y la configuración de la instalación.

Además, ¿está escrito correctamente el archivo `default.yml`?

## Problemas con la visualización de la línea de tiempo, la TL no se actualiza en tiempo real

Si la línea de tiempo no se carga, la versión de mongoDB o PostgreSQL puede estar desactualizada.
PostgreSQL debe ser v13 si es posible.

También deberías comprobar la conexión a redis. [→ ¿No se puede conectar a redis？ Ver](#¿No puede conectarse a redis?)

## Siempre "reconectando" aparece en la esquina inferior derecha, TL (Línea del Tiempo) no se actualiza en tiempo real.

Si está utilizando un proxy, es posible que esté bloqueando la comunicación WebSocket.

## Fallo al utilizar almacenamiento de objetos.

Los permisos de almacenamiento de objetos pueden configurarse de forma estricta.Intenta configurar los permisos para que "los archivos (objetos) puedan ser recuperados por cualquiera".
Además, comprueba de nuevo el `default.yml`.

### Ejemplo de S3 (con CDN, dominio personalizado)

S3 ejemplo (con CDN, dominio personalizado) es para cuando quieres publicar almacenamiento en tu propio dominio en lugar del dominio por defecto de AWS.
Si el endpoint y el dominio publicado son el mismo servicio, no es necesario especificar la `baseUrl`, como en el ejemplo de S3, y además, la línea de región no es necesaria si el servicio no tiene concepto de región.

### Configuración en servicios compatibles con S3

Misskey utiliza [aws-sdk](https://www.npmjs.com/package/aws-sdk) para las conexiones de almacenamiento de objetos.
Se puede utilizar cualquier almacenamiento de objetos compatible con Amazon S3.

Lee atentamente la documentación de cada servicio/software e intenta configurarlo.

### La carga nunca termina.

Si utilizas Cloudflare, comprueba que Rocket Loader y Auto Minify no están activados.Si está activada, desactivarla puede resolver el problema.

---

# Si no se resuelve en absoluto

Intenta los siguientes pasos:

1. Lea atentamente la documentación de Misskey.
2. Busca en Google.
3. Busca [Problemas en el repositorio de Misskey](https://github.com/misskey-dev/misskey/issues) (es posible que hayas encontrado el mismo error o que se trate de un fallo de Misskey).
4. Si buscas y no encuentras lo que buscas, pregunta a un experto.
  1. Pregunta en [servidor Discord de Misskey](https://discord.gg/P4yYqYBjEp), por ejemplo.
  2. Envía una respuesta o un mensaje directo al desarrollador ([aqz](https://p1.a9z.dev/@aqz) o Syuilo) y pregunta
