# Anuncios

Los anuncios son una de las funciones disponibles en Misskey.

Utilizando la función de anuncios, puedes publicar anuncios en todo el servidor para los usuarios, así como enviar mensajes desde el servidor a usuarios individuales.

:::warning

Un gran número de anuncios activos puede causar una mala experiencia de usuario, debido a las excesivas solicitudes de confirmación, especialmente para los nuevos usuarios.Deben considerarse las siguientes opciones:

- Crear un anuncio con la opción "Sólo usuarios existentes" activada
- Crear un anuncio con la opción "no notificar" activada
- Archivar las notificaciones cerradas

:::

## 表示形式

お知らせの表示形式を以下の種類から選択することができます。

- **通常** ... お知らせ一覧ページにお知らせが掲載されます。
- **バナー** ... お知らせ一覧ページへの掲載に加えて、クライアントの画面上部にバナーとして表示されます。
- **ダイアログ** ... お知らせ一覧ページへの掲載に加えて、クライアント起動時にモーダル ダイアログとして表示されます。
  - ダイアログ形式のお知らせが同時に2つ以上ある場合、UXに悪影響を及ぼす可能性が非常に高いため、使用は慎重に行うことを推奨します。

## お知らせの作成

### 全体お知らせ

1. 管理者もしくはモデレーター権限を持つアカウントで[コントロールパネル > お知らせ](x-mi-web://admin/announcements)にアクセスします。
2. 「追加」ボタンをクリックすると、新しいお知らせの項目が追加されます。
3. 内容を編集して「保存」をクリックすると、お知らせが公開されます。

### ユーザーへの個別お知らせ

1. お知らせを配信したいユーザーのモデレーションページを開きます。

- 管理者もしくはモデレーター権限を持つアカウントでユーザーのプロフィールページを開き、「フォロー」ボタン横の「…」をクリックし、「モデレーション」をクリック
- 管理者もしくはモデレーター権限を持つアカウントで[コントロールパネル > ユーザー](x-mi-web://admin/users)にアクセスし、アカウントを検索してクリック

2. 上部タブの「お知らせ」をクリックします。
3. 「＋」ボタンをクリックすると、お知らせの新規追加ダイアログが表示されます。
4. 内容を編集して「保存」をクリックすると、ユーザーにお知らせが配信されます。
