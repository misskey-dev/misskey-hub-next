---
description: 기본적인 정보가 흐르는 채널입니다.
---

# `main`

기본적인 정보가 흐르는 채널입니다.

## 파라미터

없음

## 이벤트

### `notification`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Notification'
}"/>

알림을 받았을 때 발생합니다.

### `mention`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

멘션을 받았을 때 발생합니다.

### `reply`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

답장을 받았을 때 발생합니다.

### `renote`

<MkSchemaViewer :schema="{
 $ref: 'misskey://Note'
}"/>

Renote 될 때 발생합니다.

### `follow`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

다른 사용자가 나를 팔로우했을 때 발생합니다.

### `followed`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

자신이 다른 사용자를 팔로우했을 때 발생합니다.

### `unfollow`

<MkSchemaViewer :schema="{
 $ref: 'misskey://User'
}"/>

자신이 다른 사용자를 팔로우 해제했을 때 발생합니다.

### `messagingMessage`

<MkSchemaViewer :schema="{
 $ref: 'misskey://MessagingMessage'
}"/>

메시지를 받았을 때 발생합니다.

### `readAllNotifications`

모든 알림을 이미 읽었을 때 발생합니다.

### `unreadNotification`

새로운 알림이 있을 때 발생합니다.

### `unreadMention`

새로운 멘션이 있을 때 발생합니다.

### `readAllUnreadMentions`

모든 멘션이 이미 읽혔을 때 발생합니다.

### `unreadSpecifiedNote`

새로운 다이렉트 포스팅이 있을 때 발생합니다.

### `readAllUnreadSpecifiedNotes`

모든 다이렉트 포스팅을 이미 읽었을 때 발생합니다.

### `unreadMessagingMessage`

새로운 메시지가 있을 때 발생합니다.

### `readAllMessagingMessages`

모든 메시지가 이미 읽은 상태일 때 발생합니다.

## 조작

없음
