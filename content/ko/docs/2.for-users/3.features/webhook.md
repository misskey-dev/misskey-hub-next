# Webhook

:::tip

バージョン 12.109.0 以降の機能です。

:::

:::warning

実験的な機能であるため、動作が不安定だったり今後仕様が変更される可能性があります。

:::

MisskeyにはWebhookが用意されています。Webhookを利用すると、Misskey上の様々なイベントをリアルタイムに受け取ることが可能です。

대상 서버가 5xx 오류를 반환하거나 응답하지 않는 경우 시간을 열어 요청을 다시 전송합니다.

Webhookが登録されると、指定したイベントが発生した際に、指定したURLにHTTPリクエストが送信されます。リクエストのメソッドはPOSTで、ボディはJSONです。
さらに、リクエストヘッダーには`X-Misskey-Hook-Secret`という名前で、登録時に設定したシークレットが含まれます。このシークレットが正しいか検証することで、リクエストが正規のものか判定することができます。

リクエストペイロードは以下のプロパティが入ります。

각 이벤트마다 설명과 페이로드를 표시합니다.

送信先サーバーが5xxエラーを返すか、応答しなかった場合は時間を開けてリクエストが再送されます。

자신이 누군가를 팔로우했을 때 발생합니다.

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
