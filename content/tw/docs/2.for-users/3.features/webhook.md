# Webhook

:::tip

從 v12.109.0 新增的功能。

:::

:::warning

由於這是一項試驗性功能，因此可能不穩定，或者將來規格可能會發生變化。

:::

Misskey 提供了 Webhook。使用 Webhook，您可以即時接收 Misskey 上的各種事件。

您可以在「設定」>「Webhook」中管理您的 Webhook。

Webhook 註冊後，當指定事件發生時，將向指定 URL 傳送 HTTP 請求。請求方法為 POST，內文為 JSON。
此外，請求標頭將包含您在註冊期間設定的金鑰，名為「X-Misskey-Hook-Secret」。透過驗證此金鑰，可以確定請求是否合法。

請求負載包含以下屬性。

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
hookId: {
type: 'string',
description: 'Webhook ID',
},
userId: {
type: 'string',
description: 'Webhook作成者のユーザーID',
},
eventId: {
type: 'string',
description: 'イベントのID',
},
createdAt: {
type: 'integer',
description: 'イベントが発生した日時(UNIX time、ミリ秒)',
},
type: {
type: 'string',
description: 'イベントの種類',
},
body: {
type: 'object',
description: 'イベントのペイロード',
},
}
}"/>

如果目標伺服器傳回 5xx 錯誤或無回應，則請求將在一段時間後重新傳輸。

您可以從管理畫面單獨設定 Webhook 的活動狀態，並且可以暫時停止傳送請求。

## 事件

提供每個事件的描述和負載。

### follow

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
 user: {
 	$ref: 'misskey://User',
 	description: 'フォローを行ったユーザー',
 },
}
}"/>

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
user: {
$ref: 'misskey://User',
description: 'フォローしたユーザー',
},
}
}"/>

### followed

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
 user: {
 	$ref: 'misskey://User',
 	description: 'フォロー解除したユーザー',
 },
}
}"/>

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
user: {
$ref: 'misskey://User',
description: 'フォローを行ったユーザー',
},
}
}"/>

### unfollow

當您取消追隨某人時會發生。 當您發布貼文時發生。

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
user: {
 $ref: 'misskey://User',
 description: 'フォロー解除したユーザー',
},
}
}"/>

### note

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
 note: {
 	$ref: 'misskey://Note',
 	description: '返信',
 },
}
}"/>

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
note: {
$ref: 'misskey://Note',
description: '作成されたノート',
},
}
}"/>

### reply

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
 note: {
 	$ref: 'misskey://Note',
 	description: 'Renote',
 },
}
}"/>

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
note: {
$ref: 'misskey://Note',
description: '返信',
},
}
}"/>

### renote

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
 note: {
 	$ref: 'misskey://Note',
 	description: 'メンションを含むノート',
 },
}
}"/>

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
note: {
 $ref: 'misskey://Note',
 description: 'Renote',
},
}
}"/>

### mention

當有人提到你時發生。

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
note: {
 $ref: 'misskey://Note',
 description: 'メンションを含むノート',
},
}
}"/>
