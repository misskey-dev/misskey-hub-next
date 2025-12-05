#

:::tip

Esta función está disponible a partir de la versión 12.109.0 y superiores.

:::

:::warning

Esta función es experimental. Puede ser inestable y sus especificaciones pueden estar sujetas a cambios.

:::

Misskey proporciona webhooks.Usando webhooks, puedes recibir eventos de Misskey en tiempo real.

Puedes gestionar tus webhooks en [Ajustes > Webhook](x-mi-web://settings/webhook)

Una vez registrado un webhook, Misskey enviará una petición Http a la Url especificada cuando ocurra el evento especificado.Estas peticiones son peticiones Post con un cuerpo Json. El campo de cabecera `X-Misskey-Hook-Secret` contendrá el secreto especificado en la creación.Por seguridad, debes verificar que el contenido de este campo coincide con el secreto proporcionado durante la creación.

La carga útil de la solicitud contiene las siguientes propiedades: [TBA].

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

Si el servidor de destino devuelve un error 5xx o no responde, la solicitud se vuelve a enviar tras un tiempo de espera.

Los webhooks pueden activarse o desactivarse temporalmente desde su página de configuración.

## Eventos

A continuación se indican los eventos disponibles y su carga útil.

### seguir

Ocurre cuando sigues a alguien.

<MkSchemaViewerItemObject :schema="{
 type: 'object',
 properties: {
 	user: {
 		$ref: 'misskey://User',
 		description: 'フォローしたユーザー',
 	},
 }
}"/>

### seguido

Se produce cuando te sigue otra persona.

<MkSchemaViewerItemObject :schema="{
 type: 'object',
 properties: {
 	user: {
 		$ref: 'misskey://User',
 		description: 'フォローを行ったユーザー',
 	},
 }
}"/>

### dejar de seguir

Ocurre cuando dejas de seguir a alguien.

<MkSchemaViewerItemObject :schema="{
 type: 'object',
 properties: {
 	user: {
 		$ref: 'misskey://User',
 		description: 'フォロー解除したユーザー',
 	},
 }
}"/>

### nota

Ocurre cuando envías una nota.

<MkSchemaViewerItemObject :schema="{
 type: 'object',
 properties: {
 	note: {
 		$ref: 'misskey://Note',
 		description: '作成されたノート',
 	},
 }
}"/>

### responder

Esto ocurre cuando se responde a una nota propia.

<MkSchemaViewerItemObject :schema="{
 type: 'object',
 properties: {
 	note: {
 		$ref: 'misskey://Note',
 		description: '返信',
 	},
 }
}"/>

### renota

Esto ocurre cuando su nota es renotada.

<MkSchemaViewerItemObject :schema="{
 type: 'object',
 properties: {
 	note: {
 		$ref: 'misskey://Note',
 		description: 'Renote',
 	},
 }
}"/>

### mención

Ocurre cuando te mencionan.

<MkSchemaViewerItemObject :schema="{
 type: 'object',
 properties: {
 	note: {
 		$ref: 'misskey://Note',
 		description: 'メンションを含むノート',
 	},
 }
}"/>
