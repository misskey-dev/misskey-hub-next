# 게시물 캡처 이벤트

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

대상 노트에 리액션이 발생했을 때 발생합니다.

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

대상 노트에 첨부된 설문지에 투표를 한 경우 발생합니다.

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

대상 노트가 삭제된 경우 발생합니다.
