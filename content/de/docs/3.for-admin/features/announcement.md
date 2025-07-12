# Neuigkeiten

Announcements sind nun eine der in Misskey verfügbaren Serverfunktionen.

Die Ankündigungsfunktion ermöglicht es den Benutzern, serverweite Ankündigungen zu veröffentlichen und Nachrichten vom Server an einzelne Benutzer zu senden.

:::warning

Eine große Anzahl aktiver Benachrichtigungen kann den Bestätigungsprozess verlängern, insbesondere für neue Benutzer, und die Benutzerfreundlichkeit beeinträchtigen.In solchen Fällen können die folgenden Optionen in Betracht gezogen werden:

- Erstelle eine Mitteilung mit der Option „nur für bestehende Benutzer“.
- Erstelle eine Mitteilung mit der Option „Nicht benachrichtigen“.
- Archiv für bisherige Bekanntmachungen.

:::

## Stil anzeigen

Wähle zwischen den folgenden Anzeigeformaten für Benachrichtigungen:

- **Normal** ... "Announcements" werden ebenfalls auf der Seite mit den Bekanntmachungen veröffentlicht.
- **Banner** ... erscheint auf der Seite mit der Bekanntmachungsliste und wird auch als Banner am oberen Rand des Bildschirms zu sehen sein.
- **Dialog** ...  Wird auf der Seite mit der Ankündigungsliste angezeigt und als modaler Dialog beim Starten des Clients.
  - Bei der Verwendung von mehr als zwei Meldungen im Dialog-Format wird um Vorsicht geboten, da dies negative Auswirkungen auf die UX haben kann.

## Erstellung von Bekanntmachunge

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
