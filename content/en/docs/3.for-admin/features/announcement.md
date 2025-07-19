# Announcements

Announcements are one of the features available in Misskey.

Using the announcement feature, you can post server-wide announcements to users, as well as send messages from the server to individual users.

:::warning

A large number of active announcements can cause a poor user experience, due to excessive confirmation prompts, especially for new users.The following options should be considered:

- Create an announcement with the "Existing Users Only" option enabled
- Create an announcement with the "do not notify" option enabled
- Archive closed announcements.

:::

## Display format

You can select from the following types of display formats.

- **Normal** ... Announcements will be posted on the Announcements page.
- **Banner** ... In addition to appearing on the announcements page a banner will appear at the top of the user's screen.
- **Dialog** ... In addition to being posted on the announcements page it will also appear as a modal dialog when the user opens the site.
  - It is recommended that you proceed with caution when there are two or more dialog-type announcements at the same time, as they are very likely to adversely affect the UX.

## Creating Announcements

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
