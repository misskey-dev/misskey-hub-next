# Note Capture Events

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

Triggered when a reaction is added to the target note.

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

Triggered when a vote is cast in a poll attached to the target note.

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

Triggered when the target note is deleted.
