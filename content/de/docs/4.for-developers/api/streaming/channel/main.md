---
description: Dies ist ein Kanal, in dem grundlegende Informationen durchlaufen.
---

# `main`

Dies ist ein Kanal, in dem grundlegende Informationen durchlaufen.

## Parameter

Keine

## Event

### `notification`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Notification'
}"/>

Es tritt auf, wenn eine Benachrichtigung empfangen wird.

### `mention`

<0/>

Tritt auf, wenn dich jemand erwähnt

### `reply`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

Es tritt auf, wenn eine Antwort empfangen wird.

### `renote`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

Es tritt auf, wenn ein Beitrag neu geteilt (Rezitiert) wird.

### `follow`

<0/>

Es tritt auf, wenn du einem anderen Benutzer folgst.

### `followed`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

Es tritt auf, wenn ein anderer Benutzer dir folgt.

### `unfollow`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

Tritt auf, wenn du jemanden entfolgst.

### `messagingMessage`

<MkSchemaViewer :schema="{
 $ref: 'misskey://MessagingMessage'
}"/>

Es tritt auf, wenn du eine Nachricht empfängst.

### `readAllNotifications`

Es tritt auf, wenn alle Benachrichtigungen als gelesen markiert sind.

### `unreadNotification`

Es tritt auf, wenn eine neue Benachrichtigung empfangen wird.

### `unreadMention`

Es tritt auf, wenn eine neue Erwähnung empfangen wird.

### `readAllUnreadMentions`

Es tritt auf, wenn alle Erwähnungen als gelesen markiert sind.

### `unreadSpecifiedNote`

Es tritt auf, wenn ein neuer Direktbeitrag empfangen wird.

### `readAllUnreadSpecifiedNotes`

Es tritt auf, wenn alle Direktbeiträge als gelesen markiert sind.

### `unreadMessagingMessage`

Es tritt auf, wenn eine neue Nachricht empfangen wird.

### `readAllMessagingMessages`

Es tritt auf, wenn alle Nachrichten als gelesen markiert sind.

## Aktionen

Keine
