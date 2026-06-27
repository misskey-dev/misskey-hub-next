# Webhook

:::tip

This feature is available in version 12.109.0 and later.

:::

:::warning

This feature is experimental. It may be unstable and its specifications may be subject to change.

:::

Misskey provides webhooks.Using webhooks, you can receive events from Misskey in realtime.

You can manage your webhooks in [Settings > Service integration](x-mi-web://settings/connect)

Once a webhook is registered, Misskey will send an HTTP request to the specified URL when the specified event occurs.These requests are POST requests with a JSON body. The header field `X-Misskey-Hook-Secret` will contain the secret specified on creation.For security, you should verify the content of this field matches the secret provided during creation.

The request payload contains the following properties: \[TBA\]

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

If the destination server returns a `500` error or does not respond, Misskey will try again later.

Webhooks can be temporarily enabled or disabled from their settings page.

## Events

The following are the available events and their payloads.

### follow

Occurs when you follow someone.

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

Occurs when someone follows you.

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

Occurs when you unfollow someone.

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

Occurs when you post a note.

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

Occurs when someone replies to your note.

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

Occurs when your note is renoted.

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

Occurs when you are mentioned.

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
note: {
 $ref: 'misskey://Note',
 description: 'メンションを含むノート',
},
}
}"/>
