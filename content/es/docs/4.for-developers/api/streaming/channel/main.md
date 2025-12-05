---
description: "Es el canal en el que se reproduce la información básica."
---

# `main`

Es el canal en el que se reproduce la información básica.

## Parámetros

Ninguno

## Eventos

### `notification`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Notification'
}"/>

Se produce cuando se recibe la notificación.

### `mention`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

Ocurre cuando te mencionan.

### `reply`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

Esto ocurre cuando se recibe una respuesta.

### `renote`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

Se produce cuando se vuelve a compartir (Repost) un post.

### `follow`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

Ocurre cuando sigues a otro usuario.

### `followed`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

Se produce cuando otro usuario te sigue.

### `unfollow`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

Ocurre cuando dejas de seguir a otro usuario.

### `messagingMessage`

<MkSchemaViewer :schema="{
 $ref: 'misskey://MessagingMessage'
}"/>

Se produce cuando se recibe un mensaje.

### `readAllNotifications`

Se produce cuando se han leído todas las notificaciones.

### `unreadNotification`

Se produce cuando hay una nueva notificación.

### `unreadMention`

Se produce cuando se recibe una nueva mención.

### `readAllUnreadMentions`

Se produce cuando todas las menciones se marcan como leídas.

### `unreadSpecifiedNote`

Se produce cuando se recibe una nueva contribución directa.

### `readAllUnreadSpecifiedNotes`

Esto ocurre cuando se han leído todos los mensajes directos.

### `unreadMessagingMessage`

Se produce cuando hay un nuevo mensaje.

### `readAllMessagingMessages`

Se produce cuando se han leído todos los mensajes.

## Acciones

Ninguna
