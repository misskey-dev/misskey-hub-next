# AiScript Misskey Extended API Reference

This section introduces the AiScript API extended for Misskey.

:::tip

Documentation for the standard AiScript API can be found [here](https://github.com/aiscript-dev/aiscript/blob/master/docs/get-started.md).

:::

## Common constants for all use cases

### `USER_ID`

ID of the current user

### `USER_NAME`

Display name of the current user

### `USER_USERNAME`

Current user's handle (the part after `@`.  e.g. `@ai@example.com` → `ai`)

### `CUSTOM_EMOJIS`

The array of custom emojis.An array of objects of the following types:

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

The current Misskey Web display language.RFC4646 compatible format (e.g. `ja-JP`)

### `SERVER_URL`

The URL of the current server.It is represented by an origin, such as `https://www.example.com`.

## Common functions for all use cases

### `Mk:dialog(title, text, type)`

Display a dialog box.The following values ​​can be set for type.\
`info` `success` `warning` `error` `question`\
If omitted, it will be `info`.

### `Mk:confirm(title, text, type)`

Display a confirmation dialog.The following values ​​can be set for type.\
`info` `success` `warning` `error` `question`\
If omitted, it will be `question`.\
Returns `true` if the user selects "OK" or `false` if the user selects "cancel".

```AiScript
let response = Mk:confirm(
  'Are you sure to continue?'
  'Please be sure to check again as it is not possible to roll back.'
  'warning'
)

if (response) {
  // When user clicks "OK"
} else {
  // When user clicks "Cancel"
}
```

### `Mk:api(endpoint, params, token?)`

Make a request to the Misskey API.Make a request to the Misskey API.Passes the endpoint name as the first argument and the parameter object as the second argument.

You can also include API token as the third argument.When called within a plugin, if `permissions` are specified in the metadata block, the token with the specified permission(s) will be used if the third argument is not specified.

:::tip

Refer to [this document](/docs/for-developers/api/permission/) for a list of permissions.

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

Persistently saves an arbitrary key with any given value.Persistently saves an arbitrary key with any given value.The saved value will remain after the AiScript context ends and can be loaded with Mk:load.

### `Mk:load(key)`

Reads the value of the specified name saved by Mk:save.

## Functions/Constants only available for plugins

### `Plugin:register_post_form_action(title, fn)`

Adds an action in the post form.Passes the name of the action as the first argument and the callback function when the action is selected as the second argument.The callback function is passed the `text` and `cw` of the submitted form object as its first argument, and the function to rewrite them as its second argument.

```AiScript
Plugin:register_post_form_action('Item name displayed on the menu', @(note, rewrite) {

  // Make some change to the note...
  rewrite('text', `{note.text}{Str:lf}#examplehashtag`)
})
```

### `Plugin:register_note_action(title, fn)`

Adds an action in the note menu.Passes the name of the item as the first argument and the callback function when the action is selected as the second argument.\
The target note object is passed to the callback function as the first argument.

```AiScript
Plugin:register_note_action('Item name displayed on the menu', @(note) {

  // Do something with the note...
  Mk:api('notes/create', {
    text: 'This is quote'
    renoteId: note.id
  })

})
```

### `Plugin:register_user_action(title, fn)`

Adds an action in the user menu.Passes the name of the item as the first argument and the callback function when the action is selected as the second argument.\
The target user object is passed to the callback function as the first argument.

```AiScript
Plugin:register_note_action('Item name displayed on the menu', @(user) {

  // Do something with the user info...
  Mk:api('notes/create', {
    text: `{user.name}, welcome to our server!`
  })

})
```

### `Plugin:register_note_view_interruptor(fn)`

Rewrites the note information displayed on the UI.\
The target note object is passed to the callback function as the first argument.\
The note will be rewritten with the return value of the callback function.\
Return `null` to make it hidden.

```AiScript
Plugin:register_note_view_interruptor(@(note) {
  
  // Make some change to the note...
  note.text = note.text.replace('apple', 'banana')

  // Return null to make it hidden
  if (note.text.incl('natto')) {
    return null
  }

  return note
})
```

### `Plugin:register_note_post_interruptor(fn)`

Rewrite note information when posting notes.\
The target note object is passed to the callback function as the first argument.\
The note will be rewritten with the return value of the callback function.

```AiScript
Plugin:register_note_post_interruptor(@(note) {
  
  // Make some change to the note...
  note.text = note.text.replace('apple', 'banana')

  return note
})
```

### `Plugin:register_page_view_interruptor(fn)`

Rewrites the Page information displayed on the UI.\
The target page object is passed to the callback function as the first argument.\
The page will be rewritten with the return value of the callback function.

```AiScript
Plugin:register_note_post_interruptor(@(page) {
  
  // Make some change to the page...

  return page
})
```

### `Plugin:open_url(url)`

Opens the URL given as the first parameter in a new browser tab.

### `Plugin:config`

An object containing the plugin settings.The values set in the plugin definition's config are saved in the object keys.The values set in the plugin definition's config are saved in the object keys.

## Constants only available for Play

### `THIS_ID`

ID of the Play

### `THIS_URL`

The URL of the Play

## UI API functions (available for Play and AiScript App widgets)

### `Ui:root`

The root component of the UI.

### `Ui:render([ ...components ])`

Syntax sugar for `Ui:root.update({ children: [ ...components ] })`.Rewrites the root of the UI.

```AiScript
Ui:render([
  Ui:C:text({text: "A"})
  Ui:C:button({text: "B", onClick: @(){}})
])
```

### `Ui:get(id)`

Retrieve and manipulate the component associated with the ID.

```AiScript
Ui:C:text({text: "A"}, "text1")
Ui:get("text1").update({text: "B"})
```

## Component functions (available for Play and AiScript App widgets)

In all of the following functions, the component ID can be specified as the second argument during initialization, as in `Ui:C:xxx(props id)` (this statement is omitted in the following reference).The specified ID can be obtained with the `Ui:get(id)` function, and the content of the component can be directly modified with the `update` function (see the `Ui:get(id)` reference for details).

### Layout

#### `Ui:C:container`

Outer frame (container) with formatting for text alignment, color, etc.

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

Accordion components (containers that users can open and close)

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

### Text

#### `Ui:C:text`

Plain text

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

MFM-enabled text

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

### Forms

#### `Ui:C:button`

Button

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

Horizontally stacked buttons

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

Single line text input

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

Single line number input

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

Multiline text input

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

Select one of several values

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

### Post forms

#### `Ui:C:postForm`

Embed the post form directly into Play

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

Special button to launch the post form modal

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
