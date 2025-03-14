# 通報

Misskeyでは、サーバー内外のユーザーからサーバー内のコンテンツに関する通報を受け取ることができます。

通報は[コントロールパネル > 通報](x-mi-web://admin/abuses)に届きます。**こまめに確認するようにしましょう。**

## 通報への対処

通報には、

- 通報対象のユーザー
- 通報内容
- 通報者

の情報が含まれています。

:::tip

リモートのサーバーから通報が転送されてくる場合があります。この場合、通報者はそのサーバーのシステムアカウント（`@instance.actor`）となっている可能性があります。

:::

必要に応じて、通報に関する状況をメモするために、管理者およびモデレーター権限を持つアカウントしか確認できないモデレーションノートを残すことができます。

通報への対処が完了したら、完了としてマークしましょう。

- 内容が正当であり、何かしらのアクションを行った場合などには「解決（是認）」
- 内容が不正で、特に対処を行わなかった場合などには「解決（否認）」

という具合に、対処の結果に応じて解決のステータスを区別して対応を終了させることができます。

## リモートへ転送

リモートのユーザーに関する通報の場合は、その通報を当該サーバーに転送することができます。通報を転送する際は、通報者が匿名のシステムアカウント（`@instance.actor`）という形で転送されます。

## 通報の通知

通報があったことは、Webhookまたはメール通知にて受け取ることができます。[コントロールパネル > 通報](x-mi-web://admin/abuses)を開き、「通知設定」から設定してください。
