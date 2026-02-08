# 帖子捕捉事件 (Note Capture Events)

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

当目标帖子被加上表情回应时发生。

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

当目标帖子所附带的投票被投票时发生。

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

当目标帖子被删除时发生。
