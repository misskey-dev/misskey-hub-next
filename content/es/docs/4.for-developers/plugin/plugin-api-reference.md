# Referencia de la API ampliada de AiScript Misskey

Esta sección presenta la API AiScript extendida para Misskey.

:::tip

La documentación de la API estándar de AiScript se encuentra  [aquí](https://aiscript-dev.github.io/guides/get-started.html).

:::

## Constantes comunes para todos los casos de uso

### `USER_ID`

ID del usuario actual

### `USER_NAME`

Nombre del usuario actual.

### `USER_USERNAME`

Handle (Nombre de usuario)  del usuario actual (la parte después de la `@`.e.g. `@ai@example.com` → `ai`)

### `CUSTOM_EMOJIS`

La matriz de los emojis personalizados.Una matriz de objetos de los siguientes tipos:

```ts
type EmojiSimple = {
  aliases: string[];
  name: string;
  category: string | null;
  url: string;
  localOnly?: boolean;
  isSensitive?: boolean;
  roleIdsThatCanBeUsedThisEmojiAsReaction?: string[];
}
```

### `LOCALE`

El idioma actual de visualización de Misskey Web.Formato RFC4646 compatible  (e.j. `ja-JP`)

### `SERVER_URL`

La URL del servidor actual.Se representa mediante un origen, como `https://www.example.com`.

## Funciones comunes para todos los casos de uso

### `Mk:dialog(title, text, type)`

Mostrar un cuadro de diálogo.Se pueden establecer los siguientes valores para el tipo.\
`info` `success` `warning` `error` `question`\
Si se omite será `info`.

### `Mk:toast(text)`

Muestra un toast.A diferencia de los diálogos, no requiere que el usuario cierre el diálogo, por lo que puede utilizarse para notificaciones sencillas, como cuando se ha completado alguna operación.

**El lanzamiento de esta función está previsto para 2025.5.1 (nombre provisional).**

### `Mk:confirm(title, text, type)`

Muestra un diálogo de confirmación.Se pueden establecer los siguientes valores para el tipo.\
`info` `success` `warning` `error` `question`\
Si se omite será `question`.\
Devuelve `true` si el usuario selecciona "OK" o `false` si el usuario selecciona "cancel".

```AiScript
let response = Mk:confirm(
  '¿Estás seguro de que quieres continuar?'
  'Esta operación no se puede deshacer. Compruébalo cuidadosamente.'
  'warning'
)

if (response) {
  // Cuando el usuario hace clic en "OK"
} else {
  // Cuando el usuario hace clic en "Cancelar"
}
```

### `Mk:api(endpoint, params, token?)`

Realiza una solicitud a la API de Misskey.Realiza una petición a la API de Misskey.Pasa el nombre del endpoint como primer argumento y el objeto parámetro como segundo argumento.

También puedes incluir el token de API como tercer argumento.Cuando se llama dentro de un plugin, si se especifica `permissions` en el bloque de metadatos, se utilizará el token con los permisos especificados si no se especifica el tercer argumento.

:::tip

Consulta [la documentación](/docs/for-developers/api/permission/) para obtener una lista de permisos.

:::

```AiScript
### {
  name: "プラグイン名",
  version: "4.2.1",
  author: "作者名",
  description: "説明文",
  permissions: ['write:notes'],
}

@onClick() {
  let res = Mk:api('notes/create', {
    text: 'Hello from plugin!'
  })
}
```

### `Mk:save(key, value)`

Guarda de forma persistente una clave arbitraria con cualquier valor dado.Guarda de forma persistente una clave arbitraria con cualquier valor dado. El valor guardado permanecerá después de que finalice el contexto AiScript y puede cargarse con Mk:load.

### `Mk:load(key)`

Lee el valor del nombre especificado guardado por Mk:save.

### `Mk:remove(key)`

※v2025.1.0（仮称）以降で使用可能

Mk:saveで永続化した指定の名前の値を削除します。指定の名前の値が存在しない場合は何もしません。

### `Mk:url()`

現在開いているページのURL（現在ブラウザのアドレスバーに表示されているURL）を取得します。

### `Mk:nyaize(text)`

指定されたテキストをNyaizeします。MFMの構文などは考慮されません。

## プラグイン専用

### `Plugin:register_post_form_action(title, fn)`

投稿フォームにアクションを追加します。第一引数にアクション名、第二引数にアクションが選択された際のコールバック関数を渡します。\
コールバック関数には、第一引数に投稿フォームオブジェクトのうち`text`と`cw`が、第二引数にそれらを書き換えるための関数が渡されます。

```AiScript
Plugin:register_post_form_action('メニューに表示される項目名', @(note, rewrite) {

  // ノートに何らかの変更を加える
  rewrite('text', `{note.text}{Str:lf}#ハッシュタグ`)
})
```

### `Plugin:register_note_action(title, fn)`

ノートメニューに項目を追加します。第一引数に項目名、第二引数に項目が選択された際のコールバック関数を渡します。\
コールバック関数には、第一引数に対象のノートオブジェクトが渡されます。

```AiScript
Plugin:register_note_action('メニューに表示される項目名', @(note) {

  // ノートを使って何かする
  Mk:api('notes/create', {
    text: '引用'
    renoteId: note.id
  })

})
```

### `Plugin:register_user_action(title, fn)`

ユーザーメニューに項目を追加します。第一引数に項目名、第二引数に項目が選択された際のコールバック関数を渡します。\
コールバック関数には、第一引数に対象のユーザーオブジェクトが渡されます。

```AiScript
Plugin:register_user_action('メニューに表示される項目名', @(user) {

  // ユーザー情報を使って何かする
  Mk:api('notes/create', {
    text: `{user.name}さん、ようこそ！`
  })

})
```

### `Plugin:register_note_view_interruptor(fn)`

UIに表示されるノート情報を書き換えます。\
コールバック関数には、第一引数に対象のノートオブジェクトが渡されます。\
コールバック関数の返り値でノートが書き換えられます。\
`null` を返すとそのノートを非表示にします。

```AiScript
Plugin:register_note_view_interruptor(@(note) {
  
  // ノートの中身を書き換える
  note.text = note.text.replace('リンゴ', 'バナナ')

  // nullを返すと非表示
  if (note.text.incl('納豆')) {
    return null
  }

  return note
})
```

### `Plugin:register_note_post_interruptor(fn)`

ノート投稿時にノート情報を書き換えます。\
コールバック関数には、第一引数に対象のノートオブジェクトが渡されます。\
コールバック関数の返り値でノートが書き換えられます。

```AiScript
Plugin:register_note_post_interruptor(@(note) {
  
  // ノートの中身を書き換える
  note.text = note.text.replace('リンゴ', 'バナナ')

  return note
})
```

### `Plugin:register_page_view_interruptor(fn)`

Page閲覧時にPage情報を書き換えます。\
コールバック関数には、第一引数に対象のPageオブジェクトが渡されます。\
コールバック関数の返り値でPageが書き換えられます。

```AiScript
Plugin:register_page_view_interruptor(@(page) {
  
  // ページの中身を書き換える（省略）

  return page
})
```

### `Plugin:open_url(url)`

第一引数に渡されたURLをブラウザの新しいタブで開きます。

### `Plugin:config`

プラグインの設定が格納されるオブジェクト。プラグイン定義のconfigで設定したキーで値が入ります。

## Play専用 定数

### `THIS_ID`

PlayのID

### `THIS_URL`

PlayのURL

## UI制御関数（Play・AiScript Appウィジェットで使用可能）

### `Ui:root`

UIのルート要素。

### `Ui:render([ ...components ])`

`Ui:root.update({ children: [ ...components ] })` の糖衣構文。UIのルート要素を書き換えます。

```AiScript
Ui:render([
  Ui:C:text({text: "A"})
  Ui:C:button({text: "B", onClick: @(){}})
])
```

### `Ui:get(id)`

IDを付与したコンポーネントを取得し、操作を行えます。

```AiScript
Ui:C:text({text: "A"}, "text1")
Ui:get("text1").update({text: "B"})
```

## コンポーネント関数（Play・AiScript Appウィジェットで使用可能）

以下の要素では、初期化の際に `Ui:C:xxx(props id)` のように第2引数にコンポーネントのidを指定することができます（以下のリファレンスではすべて省略しています）。指定したidは `Ui:get(id)` 関数で取得でき、`update` 関数でコンポーネントの中身を直接変更することができます（詳しくは `Ui:get(id)` のリファレンスをご覧ください）。

### レイアウト

#### `Ui:C:container`

幅寄せ、色などの書式設定ができる外枠（コンテナ）

```AiScript
Ui:C:container({
  children: [
    // コンテナの中に入れたいコンポーネントの配列
    Ui:C:text({text: "A"})
  ]
  align: 'center' // 幅寄せ left,center,right
  bgColor: '#000' // 背景色
  fgColor: '#00f' // 文字色
  font: 'serif' // フォント serif,sans-serif,monospace
  borderWidth: 1 // 枠幅
  borderColor: '#f00' // 枠の色
  borderStyle: 'solid' // 枠の柄
  padding: 1 // 余白幅
  rounded: false // 角を丸く
  borderRadius: 1 // 角を丸く（丸みの度合いを数値指定）
  hidden: false // 隠す
})
```

#### `Ui:C:folder`

アコーディオン要素（ユーザーが開けたり閉めたりできるコンテナ）

```AiScript
Ui:C:folder({
  children: [
    // コンテナの中に入れたいコンポーネントの配列
    Ui:C:text({text: "A"})
  ]
  title: "タイトル" // フォルダの開閉部分に記載するタイトル
  opened: true // はじめから開いているか
})
```

### テキスト

#### `Ui:C:text`

プレーンテキスト

```AiScript
Ui:C:text({
  text: "内容" // 表示するテキスト
  size: 1 // 文字サイズ
  bold: false // ボールド
  color: '#000' // 色
  font: 'monospace' // フォント serif,sans-serif,monospace
})
```

#### `Ui:C:mfm`

MFMテキスト

```AiScript
Ui:C:mfm({
  text: "内容" // 表示するテキスト
  size: 1 // 文字サイズ
  bold: false // ボールド
  color: '#000' // 色
  font: 'monospace' // フォント serif,sans-serif,monospace
  onClickEv: @(id) {
    // $[clickable.ev=eventId TEXT] のMFM構文のハンドラ
    <: `{id} clicked`
  }
})
```

### フォーム

#### `Ui:C:button`

ボタン

```AiScript
Ui:C:button({
  text: "ボタン" // ボタンに表示するテキスト
  onClick: @() {
    // 押したときのイベント
  }
  primary: false // 色を付けるか？
  rounded: false // 角を丸くするか？
  disabled: false // 無効化するか？
})
```

#### `Ui:C:buttons`

ボタン（横並び）

```AiScript
Ui:C:buttons({
  buttons: [ // ボタン定義の配列。propsの指定形式は Ui:C:button と同じ
    {text: "a", onClick: @(){...}}
    {text: "b", onClick: @(){...}}
  ]
})
```

#### `Ui:C:switch`

```AiScript
Ui:C:switch({
  onChange: @(enabled) { 
    // 変更された時のイベント。第1引数に変更後の状態（boolean）
  }
  default: false // デフォルト値
  label: "ラベル" // スイッチ横のテキスト
  caption: "キャプション" // スイッチ下に表示する補助テキスト
})
```

#### `Ui:C:textInput`

１行のテキスト入力

```AiScript
Ui:C:textInput({
  onInput: @(text) {
    // 入力された時のイベント。第1引数に変更後の値
  }
  default: "デフォルト" // デフォルト値
  label: "ラベル" // 入力欄上のテキスト
  caption: "キャプション" // 入力欄下に表示する補助テキスト
})
```

#### `Ui:C:numberInput`

１行のテキスト入力

```AiScript
Ui:C:numberInput({
  onInput: @(number) {
    // 入力された時のイベント。第1引数に変更後の値
  }
  default: "デフォルト" // デフォルト値
  label: "ラベル" // 入力欄上のテキスト
  caption: "キャプション" // 入力欄下に表示する補助テキスト
})
```

#### `Ui:C:textarea`

複数行のテキスト入力

```AiScript
Ui:C:textarea({
  onInput: @(text) {
    // 入力された時のイベント。第1引数に変更後の値
  }
  default: "デフォルト" // デフォルト値
  label: "ラベル" // 入力欄上のテキスト
  caption: "キャプション" // 入力欄下に表示する補助テキスト
})
```

#### `Ui:C:select`

複数の値から一つ選ぶ形式

```AiScript
Ui:C:select({
  items: [ // 選択肢の配列。textには表示するテキストを、valueには変更時のイベントで渡す値を入力
    {text: "A", value: "v1"}
    {text: "B", value: "v2"}
  ]
  onChange: @(value){
    // 変更された時のイベント。第1引数に変更後のvalue
  }
  default: "v1" // デフォルトのvalue
  label: "ラベル" // 入力欄上のテキスト
  caption: "キャプション" // 入力欄下に表示する補助テキスト
})
```

### ノート投稿関連

#### `Ui:C:postForm`

投稿フォームをPlayに直接埋め込む

```AiScript
Ui:C:postForm({
  form: {
    cw: "CW注釈" // CWを指定する場合の「要約」テキスト
    text: "投稿内容" // 投稿フォームのデフォルト文字列

    // 以下はMisskey v2024.5.0以降で指定可能となります
    visibility: "home" // デフォルトの投稿の公開範囲（未指定の場合はpublic）
    localOnly: false // デフォルトで連合無しかどうか（未指定の場合はfalse）
  }
})
```

#### `Ui:C:postFormButton`

投稿フォームを呼び出せる特殊ボタン

```AiScript
Ui:C:postFormButton({
  text: "投稿！" // ボタンに表示するテキスト
  primary: false // 色を付けるか？
  rounded: false // 角を丸くするか？
  form: {
    cw: "CW注釈" // CWを指定する場合の「要約」テキスト
    text: "投稿内容" // 投稿フォームのデフォルト文字列

    // 以下はMisskey v2024.5.0以降で指定可能となります
    visibility: "home" // デフォルトの投稿の公開範囲（未指定の場合はpublic）
    localOnly: false // デフォルトで連合無しかどうか（未指定の場合はfalse）
  }
})
```
