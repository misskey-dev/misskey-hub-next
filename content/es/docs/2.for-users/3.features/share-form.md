# Formulario para compartir

En Misskey Web, la ruta `/share` lleva a un formulario para compartir en redes sociales.Esta página es útil para los propietarios de sitios externos que desean que los usuarios compartan sus páginas en Misskey.

Puede especificar opciones como el contenido a compartir como parámetros de consulta de URL.

## Parámetros de consulta

:::tip

Todos los parámetros son **opcionales** y no obligatorios.

:::

| Nombre  | Descripción                                                                                                                                                                                                                                 |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title` | Título.Añadido al principio de la nota... y entre corchetes en la forma "\[ Título del contenido \]". |
| `text`  | Cuerpo del texto.                                                                                                                                                                                                           |
| `url`   | URL.Añadida al final de la nota.                                                                                                                                                                            |

### Información de respuesta

Se puede responder a una nota utilizando los siguientes parámetros:

| Nombre     | Descripción                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------- |
| `replyId`  | El Id de la nota a la que responder.                                           |
| `replyUri` | La Url de la nota a la que responder.(Para objetos remotos) |

### Información para Renotar

Puedes especificar una de las siguientes opciones para que la entrada sea una Renota (cita) de una nota específica.

| Nombre      | Descripción                                                                           |
| ----------- | ------------------------------------------------------------------------------------- |
| `renoteId`  | El Id de la nota a Renotar.                                           |
| `renoteUri` | La Url de la nota a renotar.(Para objetos remotos) |

### Visibilidad

Puedes especificar la visibilidad de la nota con las siguientes opciones.

| Nombre           | Descripción                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `visibility`     | Una de las siguientes opciones: `Público`, `Inicio`, `Seguidores` o `Nota directa` |
| `localOnly`      | 0(falso) o 1(verdadero)                                      |
| `visibleUserIds` | Id de usuario de destino (separados por comas)                                  |
| `visibleAccts`   | Usuario de destino [acct](../resources/glossary/#acct) (separado por comas)     |

:::warning

Si especificas la `visibility` como `nota directa`, debes especificar también `visibleUserIds` o `visibleAccts`.

:::

### Archivos adjuntos

Puedes especificar archivos adjuntos con la siguiente opción.

| Nombre    | Descripción                                                                |
| --------- | -------------------------------------------------------------------------- |
| `fileIds` | Los Id de los archivos a adjuntar (separados por comas) |

## Misskey Hub Share Form Relay Service

<a name="hub-share-disclaimer" id="hub-share-disclaimer"></a>

Para reducir la molestia de configurar el botón de compartir de Misskey que es compatible con múltiples servidores, el nuevo Misskey Hub proporciona un servicio de retransmisión de formulario de compartir.\
Este servicio es gratuito.

¡Puedes evolucionar tus enlaces de formulario de compartir para compartir enlaces a varios servidores de Misskey simplemente cambiando la parte del dominio de los enlaces de formulario de compartir anteriores a `misskey-hub.net`!

:::tip

Mira también [Generador de botones para compartir](/tools/share-link-generator/).

:::

:::warning

El servicio de retransmisión de formularios compartidos (en lo sucesivo, «este servicio») es una función proporcionada por Misskey Project (en lo sucesivo, «nosotros») de forma gratuita y sin garantía para comodidad de los webmasters.No nos hacemos responsables de los daños que se produzcan como consecuencia de utilizar o no poder utilizar este servicio por cualquier motivo.

:::

### Parámetros Básicos

En general, se pueden utilizar los parámetros introducidos anteriormente, pero **no se pueden utilizar los parámetros que dependen de cada servidor, como los ID de usuario y los ID de archivo.**.Si se especifica, se eliminarán en Misskey Hub y no se pasarán a los servidores de destino.

### Características únicas disponibles en el Servicio Misskey Hub Share Relay

#### Servidor Destacado

Introduciendo el dominio de un servidor de Misskey en el parámetro URL `manualInstance`, puede añadir un enlace independiente a ese servidor como "Recomendado por el sitio web de origen compartido" (Recommended by the Share Source Website.)Utilízalo cuando desees guiar a los usuarios a tu servidor.

:::warning

La función "Servidores recomendados" se ofrece para comodidad de los webmasters. Por lo tanto, no significa que recomendemos los servidores enumerados en la sección "Recomendado por el sitio web de origen compartido".

No nos hacemos responsables de los daños o desventajas que se deriven de la utilización o el registro en los servidores transitorios del "Sitio web recomendado por Share Source".

:::
