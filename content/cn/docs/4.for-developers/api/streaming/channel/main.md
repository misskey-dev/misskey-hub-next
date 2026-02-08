---
description: "提供着基本信息的频道。"
---

# `main`

提供着基本信息的频道。

## 参数

无

## 事件

### `notification`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Notification'
}"/>

收到通知时发生。

### `mention`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

被提及时发生。

### `reply`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

收到回复时发生。

### `renote`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

被转发时发生。

### `follow`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

自己关注其他用户时发生。

### `followed`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

其他用户关注自己时发生。

### `unfollow`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

自己取消关注其他用户时发生。

### `messagingMessage`

<MkSchemaViewer :schema="{
 $ref: 'misskey://MessagingMessage'
}"/>

收到聊天消息时发生。

### `readAllNotifications`

所有通知标记为已读时发生。

### `unreadNotification`

有新通知时发生。

### `unreadMention`

有新提及时发生。

### `readAllUnreadMentions`

所有提及标记为已读时发生。

### `unreadSpecifiedNote`

有新的指定用户帖子时发生。

### `readAllUnreadSpecifiedNotes`

所有指定用户帖子标记为已读时发生。

### `unreadMessagingMessage`

有新聊天消息时发生。

### `readAllMessagingMessages`

所有聊天消息标记为已读时发生。

## 操作

无
