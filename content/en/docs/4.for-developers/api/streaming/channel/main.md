---
description: "This channel streams basic information."
---

# `main`

This channel streams basic information.

## Parameters

None

## Events

### `notification`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Notification'
}"/>

Triggered when a notification is received.

### `mention`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

Triggered when you are mentioned.

### `reply`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

Triggered when you receive a reply.

### `renote`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

Triggered when you are Renoted.

### `follow`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

Triggered when you follow another user.

### `followed`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

Triggered when another user follows you.

### `unfollow`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

Triggered when you unfollow another user.

### `messagingMessage`

<MkSchemaViewer :schema="{
 $ref: 'misskey://MessagingMessage'
}"/>

Triggered when a chat message is received.

### `readAllNotifications`

Triggered when all notifications are marked as read.

### `unreadNotification`

Triggered when there is a new notification.

### `unreadMention`

Triggered when there is a new mention.

### `readAllUnreadMentions`

Triggered when all mentions are marked as read.

### `unreadSpecifiedNote`

Triggered when there is a new specified note (direct note).

### `readAllUnreadSpecifiedNotes`

Triggered when all specified notes are marked as read.

### `unreadMessagingMessage`

Triggered when there is a new chat message.

### `readAllMessagingMessages`

Triggered when all chat messages are marked as read.

## Operations

None
