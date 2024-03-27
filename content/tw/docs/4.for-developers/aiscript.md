# AiScript

AiScriptは、Misskeyの以下の箇所で使用できるスクリプト言語です。

- [プラグイン](./plugin/)
- [ウィジェット](/docs/for-users/features/widgets/)
  - ボタン
  - AiScriptコンソール
  - AiScript App
- Misskey Play
- スクラッチパッド

:::tip

AiScriptの実装はMisskeyとは別リポジトリで、[オープンソースで公開されています](https://github.com/aiscript-dev/aiscript)。

:::

## 使い方

AiScript標準の構文や組み込み関数などが使用できます。

:::tip

ドキュメントは[こちら](https://github.com/aiscript-dev/aiscript/tree/master/docs)\
Misskey本体のバージョンにより、使用できるAiScriptのバージョンが異なる場合があります。バージョンの確認には`<: Core:v`をScratchpadなどで実行してください。

:::

これらに加え、Misskey専用の組み込み定数・関数が３グループに分けて提供されています。

### Misskey AiScript API

接頭辞: `Mk:`\
Misskey内の全てのAiScript環境で使用できる定関数群です。
詳しくは[プラグインAPIリファレンス](./plugin/plugin-api-reference/)の`Mk:`とついた部分を参照して下さい。

### プラグインAPI

接頭辞: `Plugin:`\
[プラグイン](./plugin/)でのみ使用できる定関数群です。
詳しくは[プラグインAPIリファレンス](./plugin/plugin-api-reference/)の`Plugin:`とついた部分を参照して下さい。

### UI API

接頭辞: `Ui:`\
[ウィジェット](/docs/for-users/features/widgets/)（AiScript App）、Misskey Play、Scratchpadで使用できます。
ドキュメントは未整備（TODO）ですが、インターネット上に有志の方が執筆された解説記事があります。

### 標準入出力

AiScript標準で定義されている`readline`関数と`print`関数（および`<:`構文）の内部実装は、Misskey側で独自に提供されています。

#### readline(message)

`message`: `str`\
返り値: `str`\
Misskey内の全てのAiScript環境で使用できます。\
\
\
文字列の入力を求めるポップアップを表示します。

#### print(message)

`message`: `any`\
返り値: `null`\
[ウィジェット](/docs/for-users/features/widgets/)（AiScriptコンソール）、Scratchpadで使用できます。\
\
\
コンソールに文字列を出力します。\
\
\
`<:`構文も同様の働きをします。
