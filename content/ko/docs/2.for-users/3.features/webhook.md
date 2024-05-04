# Webhook

:::tip

버전 12.109.0 이후 기능입니다.

:::

:::warning

실험적인 기능이기 때문에 작동이 불안정하거나 향후 사양이 변경될 수 있습니다.

:::

또한, 요청 헤더에는 `X-Misskey-Hook-Secret`이라는 이름으로 등록 시 설정한 시크릿이 포함됩니다.이 시크릿이 올바른지 확인하여 요청이 유효한지 판단할 수 있습니다.Misskey에는 Webhook이 준비되어 있습니다.Webhook을 이용하면 Misskey의 다양한 이벤트를 실시간으로 받아볼 수 있습니다.

설정 > Webhook에서 Webhook을 관리할 수 있습니다.

Webhook이 등록되면 지정한 이벤트가 발생하면 지정한 URL로 HTTP 요청이 전송됩니다.요청의 메서드는 POST이고, 본문은 JSON입니다.요청의 메서드는 POST이고, 본문은 JSON입니다.
또한, 요청 헤더에는 `X-Misskey-Hook-Secret`이라는 이름으로 등록 시 설정한 시크릿이 포함됩니다.이 시크릿이 올바른지 확인하여 요청이 유효한지 판단할 수 있습니다.

요청 페이로드에는 다음과 같은 속성이 들어갑니다.

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

대상 서버가 5xx 오류를 반환하거나 응답하지 않는 경우 시간을 열어 요청을 다시 전송합니다.

Webhook은 관리 화면에서 개별적으로 활성 상태를 설정할 수 있으며, 일시적으로 요청 전송을 중지시킬 수 있습니다.

## 이벤트

각 이벤트마다 설명과 페이로드를 표시합니다.

### follow

자신이 누군가를 팔로우했을 때 발생합니다.

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

누군가가 나를 팔로우했을 때 발생합니다.

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

자신이 누군가를 팔로우 해제했을 때 발생합니다.

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

자신이 메모를 게시할 때 발생합니다.

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

자신의 노트에 답장을 받았을 때 발생합니다.

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

자신의 노트가 Renote 되었을 때 발생합니다.

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

자신에게 멘션이 왔을때 발생합니다.

<MkSchemaViewerItemObject :schema="{
type: 'object',
properties: {
 note: {
 	$ref: 'misskey://Note',
 	description: 'メンションを含むノート',
 },
}
}"/>
