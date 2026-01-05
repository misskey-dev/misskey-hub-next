# Webhook

:::tip

此功能为 v12.109.0 及以上版本功能。

:::

:::warning

这是一项实验性功能，因此运作可能不够稳定，且未来规范可能会发生变更。

:::

Misskey 提供了 Webhook 功能。利用 Webhook，您可以实时接收 Misskey 上发生的各种事件。

您可以在 [设置 > 连接服务](x-mi-web://settings/connect) 中对 Webhook 进行管理。

注册 Webhook 后，当指定事件发生时，系统会向您指定的 URL 发送 HTTP 请求。请求方法为 POST，请求体为 JSON 格式。
此外，请求头中包含名为`X-Misskey-Hook-Secret`的字段，其中含有您在注册时设置的密钥。通过验证该密钥是否正确，您可以判断该请求是否为合法的请求。

请求负载包含以下属性：（尚未公布）

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

如果目标服务器返回 5xx 错误或未响应，系统将在一段时间后尝试重新发送请求。

您可以在管理页面单独设置 Webhook 的激活状态，以便暂时停止发送请求。

## 事件

以下是各事件的说明及负载（尚未公布）。

### follow

当自己关注某人时触发。

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

当自己被某人关注时触发。

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

当自己取消关注某人时触发。

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

当自己发布帖子时触发。

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

当自己的帖子收到回复时触发。

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

当自己的帖子被转发时触发。

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

当自己被提及时触发。

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
 note: {
 	$ref: 'misskey://Note',
 	description: 'メンションを含むノート',
 },
}
}"/>
