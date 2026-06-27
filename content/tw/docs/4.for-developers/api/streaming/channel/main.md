---
description: "流動著基本資訊的頻道。"
---

# `main`

流動著基本資訊的頻道。

## 參數

無

## 事件

### `notification`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Notification'
}"/>

收到通知時發生。

### `mention`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

被提及時發生。

### `reply`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

被回覆時發生。

### `renote`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

被轉發時發生。

### `follow`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

自己追隨其他使用者時發生。

### `followed`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

其他使用者追隨自己時發生。

### `unfollow`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

自己解除追隨其他使用者時發生。

### `messagingMessage`

<MkSchemaViewer :schema="{
 $ref: 'misskey://MessagingMessage'
}"/>

收到聊天訊息時發生。

### `readAllNotifications`

所有通知標記為已讀時發生。

### `unreadNotification`

有新通知時發生。

### `unreadMention`

有新提及時發生。

### `readAllUnreadMentions`

所有提及標記為已讀時發生。

### `unreadSpecifiedNote`

有新的指定使用者貼文時發生。

### `readAllUnreadSpecifiedNotes`

所有指定使用者貼文標記為已讀時發生。

### `unreadMessagingMessage`

有新聊天訊息時發生。

### `readAllMessagingMessages`

所有聊天訊息標記為已讀時發生。

## 操作

無
