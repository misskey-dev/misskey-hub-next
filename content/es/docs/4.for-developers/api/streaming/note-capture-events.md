# Eventos posteriores a la captura

## `reacted`

<MkSchemaViewer :schema="{
 type: 'object',
 properties: {
 	reaction: {
 		type: 'string',
 		description: 'リアクションの種類',
 	},
 	userId: {
 		type: 'string',
 		description: 'リアクションを行ったユーザーのID',
 	},
 }
}"/>

Ocurre cuando se produce una reacción a la nota de destino.

## `pollVoted`

<MkSchemaViewer :schema="{
 type: 'object',
 properties: {
 	choice: {
 		type: 'number',
 		description: '選択肢ID',
 	},
 	userId: {
 		type: 'string',
 		description: '投票を行ったユーザーのID',
 	},
 }
}"/>

Se produce cuando se vota el cuestionario adjunto a la nota en cuestión.

## `deleted`

<MkSchemaViewer :schema="{
 type: 'object',
 properties: {
 	deletedAt: {
 		type: 'string',
 		description: '削除日時',
 	},
 }
}"/>

Esto ocurre cuando se elimina la nota de destino.
