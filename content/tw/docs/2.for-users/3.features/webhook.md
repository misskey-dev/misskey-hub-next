# Webhook

:::tip

バージョン 12.109.0 以降の機能です。

:::

:::warning

実験的な機能であるため、動作が不安定だったり今後仕様が変更される可能性があります。

:::

MisskeyにはWebhookが用意されています。Webhookを利用すると、Misskey上の様々なイベントをリアルタイムに受け取ることが可能です。

如果目標伺服器傳回 5xx 錯誤或無回應，則請求將在一段時間後重新傳輸。

Webhookが登録されると、指定したイベントが発生した際に、指定したURLにHTTPリクエストが送信されます。リクエストのメソッドはPOSTで、ボディはJSONです。
さらに、リクエストヘッダーには`X-Misskey-Hook-Secret`という名前で、登録時に設定したシークレットが含まれます。このシークレットが正しいか検証することで、リクエストが正規のものか判定することができます。

リクエストペイロードは以下のプロパティが入ります。

提供每個事件的描述和負載。

送信先サーバーが5xxエラーを返すか、応答しなかった場合は時間を開けてリクエストが再送されます。

當您追隨某人時會發生。

## イベント

イベントごとに説明とペイロードを示します。

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

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
 note: {
 	$ref: 'misskey://Note',
 	description: '作成されたノート',
 },
}
}"/>

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

自分にメンションされた際に発生します。

<MkSchemaViewerItemObject :schema="{
 type: 'object',
 properties: {
 	note: {
 		$ref: 'misskey://Note',
 		description: 'メンションを含むノート',
 	},
 }
}"/>
