---
description: Este documento contiene las preguntas más frecuentes sobre el uso de Misskey.
---

# Preguntas Frecuentes

Este documento contiene las preguntas más frecuentes sobre el uso de Misskey.<br>
Para las preguntas más frecuentes sobre el proyecto Misskey en sí, consulte [este enlace](../../about-misskey#frequently-asked-questions).

## ¿Hay aplicaciones disponibles para Android/iOS?

El proyecto Misskey no desarrolla aplicaciones nativas para estos sistemas operativos móviles, pero hay varias aplicaciones de terceros disponibles.Para más información, por favor ve a [este enlace](./apps).<br>

Sin embargo, como las aplicaciones de terceros pueden quedarse atrás en el soporte a las últimas características de Misskey, te recomendamos que utilices el cliente oficial basado en la web llamado Misskey Web a menos que tengas preferencias específicas.Además, Misskey Web es compatible con Progressive Web App (PWA), lo que le permite comportarse como una aplicación nativa.Para más información, consulta [aquí](/docs/for-users/stepped-guides/how-to-use-pwa/).

## ¿Puedo usar Misskey con aplicaciones compatibles con Mastodon?

Como Misskey no es compatible con la API de Mastodon, salvo algunas excepciones, el uso de clientes Mastodon para iniciar sesión en Misskey no es posible.<br>
En su lugar, utiliza el cliente web oficial de Misskey.

## ¿Es misskey.io el servidor oficial del proyecto Misskey?

No, misskey.io no es el servidor oficial del proyecto Misskey y no está afiliado con él.misskey.io es el servidor más grande que ejecuta Misskey, ofreciendo una plataforma de propósito general, haciendo fácil el registro sin temática específica alguna.

## ¿Hay alguna relación con MisskeyHQ Inc.?

MisskeyHQ es la empresa que opera misskey.io.Por lo tanto no tiene relación directa con el desarrollo del proyecto Misskey. Sin embargo, syuilo, el jefe de proyecto de Misskey, también participa como directivo en MisskeyHQ Inc, fomentando la cooperación para hacer avanzar Misskey.

## ¿Cuál es el origen del nombre "Misskey"?

El nombre "Misskey" se inspiró en la letra de la canción "Brain Diver" de May'n, que el desarrollador principal syuilo estaba escuchando casualmente cuando pensó en el nombre.

## ¿Cómo puedo seguir a otros usuarios de otros servidores Misskey,Pleroma o Mastodon?

Selecciona "Buscar" desde el menú e introduce el nombre de usuario completo como en el formato especificado abajo.Un nombre de usuario completo incluye un nombre de usuario y el nombre de host del servidor al que pertenece el usuario.Este formato es común entre plataformas ActivityPub como Misskey, Mastodon y Pleroma.<br>

El formato de un nombre de usuario completo es el siguiente:\
`username@hostname.example`Por ejemplo:\
`syuilo@misskey.io`

Aunque este formato no es universal en todo el software distribuido, permite seguir a usuarios de otros servidores o plataformas implementadas con software descentralizado diferente.

## ¿Cómo elimino una Renota?

Para anular una renota, pulsa "..." junto a la marca de tiempo de la renota y seleccione "Quitar renota".<br>
Para más información sobre las Renotas mira  [aquí](../features/note/#renote).

## ¿Cómo puedo deshabilitar la vista previa de las URL?

El lenguaje de marcado para Misskey (MFM) incluye sintaxis para deshabilitar la vista previa de las URL.Para más detalles, consulta la hoja de trucos de MFM,.A la cual puedes acceder introduciendo la siguiente dirección en tu servidor:`https://nombredetuservidor/mfm-cheat-sheet`.

## ¿Cómo puedo añadir, editar o borrar emojis personalizados?

Solo los administradores del servidor pueden añadir,editar o borrar emojis personalizados.Por favor contacta al administrador de tu servidor, si deseas hacer esto.

## Quiero desarrollar un bot.

Cualquiera puede desarrollar un bot para Misskey usando la API de Misskey.Para más información, consulta [aquí](../../for-developers/api/).

## ¿Qué servicio usa la función de traducción?

Usamos [DeepL](https://www.deepl.com/), el servicio de traducción automática.

## Quiero informarme sobre los servicios

'Misskey' es el nombre de un software y un proyecto para crear servicios de microblogging web.Por lo tanto, <b>“Misskey” en sí no es un servicio web.</b><br>
Además, <b>nuestro Proyecto Misskey no opera ni tiene jurisdicción sobre ningún servicio web</b>, por lo que cualquier consulta sobre servicios web que utilicen Misskey deberá dirigirse al contacto del servicio web correspondiente.<br>
Ten en cuenta que algunas personas pueden utilizar el término “Misskey” para referirse a “servicios web construidos utilizando Misskey”.

## ¿Tengo que registrarme en el Ministerio de Asuntos Internos y Comunicaciones de Japón si creo un servidor? (Para servidores en Japón)

### Respuesta corta

**Sí**, si operas por **fines comerciales**.En caso contrario, **no**.

### Respuesta larga

La definición de "operador", según [documentos del Ministerio de Asuntos Internos y Comunicaciones](https://www.soumu.go.jp/main_content/000477428.pdf), es "una persona que pretende obtener un beneficio mediante la prestación de servicios y el cobro de tasas como compensación por la prestación de dichos servicios".Por lo tanto, a menos que explotes el servidor con fines lucrativos como empresa, el registro no es necesario.Así, aunque haya ingresos procedentes de fuentes como donaciones o publicidad, siempre que se utilicen exclusivamente para gastos de funcionamiento, no entran en la categoría de operadores que requieren registro.(confirmado con el Ministerio de Asuntos Internos y Comunicaciones).<br>
Para más detalles, consulte el [Manual de Entrada para Empresas de Telecomunicaciones] del Ministerio de Asuntos Internos y Comunicaciones (https://www.soumu.go.jp/main_content/000477428.pdf) o póngase en contacto directamente con el ministerio.

## ¿Requiere la función DM una notificación de negocio de telecomunicaciones?

["He creado un servidor, ¿tengo que presentar una notificación para una empresa de telecomunicaciones?Como se explica en"](#サーバーを作成しましたが電気通信事業の届出は必要ですか)
Independientemente de la funcionalidad del servicio que explote, si no entra en la categoría de «intento de generar ingresos mediante el cobro de tasas», no se le considera un operador comercial que deba presentar una notificación.

## ¿Puedo liberar servicios que contengan el nombre "Misskey"?

"Misskey" es una marca registrada (en Japón) por el Proyecto Misskey, pero puedes publicar servicios con el nombre "Misskey" (por ejemplo, Misskey Tools) sin problemas.
Además, no hay planes para cobrar honorarios por tal uso.
