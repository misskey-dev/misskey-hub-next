# AiScript

AiScript is a scripting language for Misskey that can be used in following features:

- [Plugins](./plugin/create-plugin/)
- [Widgets](/docs/for-users/features/widgets/)
  - Button
  - AiScript console
  - AiScript App
- [Misskey Play](./plugin/create-play/)
- Scratchpad

:::tip

The implementation of AiScript is in a separate repository from Misskey and is [open source and available here](https://github.com/aiscript-dev/aiscript).

:::

## Usage

AiScript標準の構文や組み込み関数などが使用できます。

:::tip

ドキュメントは[こちら](https://github.com/aiscript-dev/aiscript/tree/master/docs)\
Misskey本体のバージョンにより、使用できるAiScriptのバージョンが異なる場合があります。バージョンの確認には`<: Core:v`をScratchpadなどで実行してください。

:::

これらに加え、Misskey専用の組み込み定数・関数が３グループに分けて提供されています。

### Misskey AiScript API

接頭辞: `Mk:`\
Misskey内の全てのAiScript環境で使用できる定関数群です。
詳しくは[AiScript Misskey拡張API リファレンス](./plugin/plugin-api-reference/)の`Mk:`とついた部分を参照して下さい。

### プラグインAPI

接頭辞: `Plugin:`\
[プラグイン](./plugin/)でのみ使用できる定関数群です。
詳しくは[AiScript Misskey拡張API リファレンス](./plugin/plugin-api-reference/)の`Plugin:`とついた部分を参照して下さい。

### UI API

接頭辞: `Ui:`\
[ウィジェット](/docs/for-users/features/widgets/)（AiScript App）、[Misskey Play](./plugin/create-play/)、Scratchpadで使用できます。
詳しくは[AiScript Misskey拡張API リファレンス](./plugin/plugin-api-reference/)の`Ui:`とついた部分を参照して下さい。

### 標準入出力

AiScript標準で定義されている`readline`関数と`print`関数（および`<:`構文）の内部実装は、Misskey側で独自に提供されています。

#### readline(message)

`message`: `str`\
返り値: `str`\
Misskey内の全てのAiScript環境で使用できます。\
文字列の入力を求めるポップアップを表示します。

#### print(message)

`message`: `any`\
返り値: `null`\
[ウィジェット](/docs/for-users/features/widgets/)（AiScriptコンソール）、Scratchpadで使用できます。\
コンソールに文字列を出力します。\
`<:`構文も同様の働きをします。
