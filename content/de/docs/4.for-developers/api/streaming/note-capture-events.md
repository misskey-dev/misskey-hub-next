# Post-Capture-Event

## `reacted`

<0/>

Es tritt auf, wenn auf die betreffende Notiz reagiert wird.

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

Es tritt auf, wenn bei der betreffenden Notiz angehängten Umfrage eine Stimme abgegeben wird.

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

Es tritt auf, wenn bei der betreffenden Notiz angehängten Umfrage eine Stimme gelöscht wird.
