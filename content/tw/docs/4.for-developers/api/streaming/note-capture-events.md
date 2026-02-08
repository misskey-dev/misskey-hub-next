# 貼文捕捉事件

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

當對象貼文被加上表情反應時發生。

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

當對象貼文所附加的投票被投票時發生。

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

當對象貼文被刪除時發生。
