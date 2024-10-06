---
description: 基本的な情報が流れるチャンネルです。
---

# `main`

这是一个提供基本信息的频道。

## 参数

无

## 事件

### `notification`

<MkSchemaViewer :schema="{
$ref: 'misskey://Notification'
}"/>

收到通知时触发。

### `mention`

<MkSchemaViewer :schema="{
$ref: 'misskey://Note'
}"/>

当有人提到你时触发。

### `reply`

<MkSchemaViewer :schema="{
$ref: 'misskey://Note'
}"/>

收到回复时触发。

### `renote`

<MkSchemaViewer :schema="{
$ref: 'misskey://Note'
}"/>

Renoteされたときに発生します。

### `follow`

<MkSchemaViewer :schema="{
$ref: 'misskey://User'
}"/>

自分が他のユーザーをフォローしたときに発生します。

### `followed`

<MkSchemaViewer :schema="{
$ref: 'misskey://User'
}"/>

他のユーザーが自分をフォローしたときに発生します。

### `unfollow`

<MkSchemaViewer :schema="{
$ref: 'misskey://User'
}"/>

自分が他のユーザーをフォロー解除したときに発生します。

### `messagingMessage`

<MkSchemaViewer :schema="{
$ref: 'misskey://MessagingMessage'
}"/>

メッセージを受け取ったときに発生します。

### `readAllNotifications`

全ての通知が既読になったときに発生します。

### `unreadNotification`

新しい通知があるときに発生します。

### `unreadMention`

新しいメンションがあるときに発生します。

### `readAllUnreadMentions`

全てのメンションが既読になったときに発生します。

### `unreadSpecifiedNote`

新しいダイレクト投稿があるときに発生します。

### `readAllUnreadSpecifiedNotes`

全てのダイレクト投稿が既読になったときに発生します。

### `unreadMessagingMessage`

新しいメッセージがあるときに発生します。

### `readAllMessagingMessages`

全てのメッセージが既読になったときに発生します。

## 操作

なし
