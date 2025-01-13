# Webhook

:::tip

Funktionalität ab Version 12.109.0.

:::

:::warning

Da es sich um eine experimentelle Funktion handelt, kann sie instabil sein oder die Spezifikationen können sich in Zukunft ändern.

:::

Für Misskey wird ein Webhook bereitgestellt.Mit Webhook können verschiedene Ereignisse auf Misskey in Echtzeit empfangen werden.

Webhook unter [Einstellungen > Webhook](x-mi-web://settings/webhook) verwalten

Sobald ein Webhook registriert ist, wird eine HTTP-Anfrage an die angegebene URL gesendet, wenn das angegebene Ereignis eintritt.Die Methode der Anfrage ist POST und der Körper ist JSON.
Außerdem enthält der Header der Anfrage das bei der Registrierung festgelegtes Geheimnis mit dem Namen „X-Misskey-Hook-Secret“.Durch die Überprüfung dieses Geheimnisses kann festgestellt werden, ob die Anfrage sicher ist.

Die Nutzlast der Anfrage enthält die folgenden Eigenschaften:

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

Wenn der Zielserver einen 5xx-Fehler zurückgibt oder nicht antwortet, wird die Anfrage nach einer gewissen Zeit erneut gesendet.

Webhooks können über den Verwaltungsbildschirm individuell in den aktiven Status geändert werden und kann das Senden von Anfragen vorübergehend einstellen.

## Event

Beschreibung und Nutzlast für jedes Ereignis.

### Follow

Tritt auf, wenn du jemanden folgst.

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

Tritt auf, wenn dir jemand folgt.

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

Tritt auf, wenn du jemanden entfolgst.

<MkSchemaViewerItemObject :schema="{
 type: 'object',
 properties: {
 	user: {
 		$ref: 'misskey://User',
 		description: 'フォロー解除したユーザー',
 	},
 }
}"/>

### Notiz

Dies geschieht, wenn eine Notiz veröffentlicht wird.

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

Tritt auf, wenn eine Anwort veröffentlicht wird

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

Tritt auf, wenn jemand deine Notiz zitiert

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

Tritt auf, wenn dich jemand erwähnt

<MkSchemaViewerItemObject :schema="{
 type: 'object',
 properties: {
 	note: {
 		$ref: 'misskey://Note',
 		description: 'メンションを含むノート',
 	},
 }
}"/>
