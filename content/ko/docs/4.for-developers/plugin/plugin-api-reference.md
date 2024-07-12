# 플러그인 API 레퍼런스

여기서는 Misskey에서 독자적으로 확장한 AiScript API에 대해 소개합니다.

:::tip

표준으로 제공되는 AiScript API는 [여기](https://github.com/aiscript-dev/aiscript/blob/master/docs/get-started.md)에서 확인할 수 있습니다.

:::

## `Mk:api(endpoint params)`

### `USER_ID`

현재 사용자 ID

### `USER_NAME`

현재 사용자 이름

### `USER_USERNAME`

현재 사용자의 핸들(`@`보다 뒤쪽 부분.예: `@ai@example.com` → `ai`)

### `CUSTOM_EMOJIS`

커스텀 이모티콘 목록.다음과 같은 객체가 배열로 저장되어 있습니다.

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

현재 Misskey Web의 설정 언어.RFC4646 호환 형식(예: `ja-JP`)으로 표현됩니다.

### `SERVER_URL`

현재 서버의 URL.`https://www.example.com`과 같이 오리진으로 표현됩니다.

## 전 분야 공통 함수

### `Mk:dialog(title, text, type)`

대화 상자를 표시합니다.type에는 다음과 같은 값을 설정할 수 있습니다.\
`info` `success` `warn` `error` `question`\
생략하면 `info`가 됩니다.

### `Mk:confirm(title, text, type)`

확인 대화상자를 표시합니다.type에는 다음과 같은 값을 설정할 수 있습니다.\
`info` `success` `warn` `error` `question`\
생략하면 `question`이 됩니다.확인 대화상자를 표시합니다.type에는 다음과 같은 값을 설정할 수 있습니다.\
`info` `success` `warn` `error` `question`\
생략하면 `question`이 됩니다.\
사용자가 "OK"를 선택하면 `true`를, "취소"를 선택하면 `false`를 반환합니다.

```AiScript
let response = Mk:confirm(
  '操作を続行しますか？'
  'この操作は取り消せません。よく確認してください。'
  'warning'
)

if (response) {
  // OKした場合
} else {
  // キャンセルした場合
}
```

### `Mk:api(endpoint, params, token?)`

Misskey API에 요청합니다.Misskey API에 요청합니다.첫 번째 인수로 엔드포인트 이름, 두 번째 인수로 매개변수 객체를 전달합니다.

세 번째 인수에 token을 넣을 수도 있습니다.플러그인에서 동작하는 경우, 인수 지정 없이 로그인 중인 사용자의 token이 사용됩니다.

### `Mk:save(key, value)`

임의의 값에 임의의 이름을 붙여서 영속화합니다.임의의 값에 임의의 이름을 붙여서 영속화합니다.영속화된 값은 AiScript 컨텍스트가 종료된 후에도 남아서 Mk:load에서 읽을 수 있습니다.

### `Mk:load(key)`

Mk:save에서 영속화한 지정된 이름의 값을 읽습니다.

## 플러그인 전용

### `Plugin:register_post_form_action(title, fn)`

게시 양식에 액션을 추가합니다.게시 양식에 액션을 추가합니다.첫 번째 인수로 액션 이름, 두 번째 인수로 액션이 선택되었을 때의 콜백 함수를 전달합니다.\
콜백 함수에는 첫 번째 인수로 게시 양식 객체가 전달됩니다.대화 상자를 표시합니다.type에는 다음과 같은 값을 설정할 수 있습니다.\
`info` `success` `warn` `error` `question`\
생략하면 `info`가 됩니다.

```AiScript
Plugin:register_post_form_action('메뉴에 표시될 항목명', @(note, rewrite) {

  // 노트에 변경을 가한다.
  rewrite('text', `{{note.text}{Str:lf}#해시태그`)
})
```

### `Plugin:register_note_action(title, fn)`

노트 메뉴에 항목을 추가합니다.첫 번째 인수로 항목 이름, 두 번째 인수로 항목이 선택되었을 때의 콜백 함수를 전달합니다.노트 메뉴에 항목을 추가합니다.첫 번째 인수로 항목 이름, 두 번째 인수로 항목이 선택되었을 때의 콜백 함수를 전달합니다.\
콜백 함수에는 첫 번째 인수로 대상 노트 객체가 전달됩니다.

```AiScript
Plugin:register_note_action('메뉴에 표시할 항목 이름', @(note) {

  // 노트를 사용하여 무언가 하기
  Mk:api('notes/create', {
    text: '인용'
    renoteId: note.id
  })

})
```

### `Plugin:register_user_action(title, fn)`

사용자 메뉴에 항목을 추가합니다.첫 번째 인수로 항목 이름, 두 번째 인수로 항목이 선택되었을 때의 콜백 함수를 전달합니다.사용자 메뉴에 항목을 추가합니다.첫 번째 인수로 항목 이름, 두 번째 인수로 항목이 선택되었을 때의 콜백 함수를 전달합니다.\
콜백 함수에는 첫 번째 인수로 대상 사용자 객체가 전달됩니다.

```AiScript
Plugin:register_user_action('메뉴에 표시할 항목명', @(user) {

  // 사용자 정보를 이용하여 무언가 하기.
  Mk:api('notes/create', {
    text: `{user.name}님, 환영합니다! `
  })

})
```

### `Plugin:register_note_view_interruptor(fn)`

UI에 표시되는 노트 정보를 다시 작성합니다.노트 게시시 노트 정보를 다시 작성합니다.\
콜백 함수에는 첫 번째 인수로 대상 노트 객체가 전달됩니다.\
콜백 함수의 반환값으로 노트를 다시 작성합니다.\
콜백 함수의 반환값으로 노트를 다시 작성합니다.\
null\`을 반환하면 해당 노트를 숨깁니다.

```AiScript
Plugin:register_note_view_interruptor(@(note) {
  
  // 노트 내용 바꾸기
  note.text = note.text.replace('apple', 'banana')

  // null을 반환하면 숨기기
  if (note.text.include('낫토')) {
    return null
  }

  return note
})
```

### `Plugin:register_note_post_interruptor(fn)`

노트 게시시 노트 정보를 다시 작성합니다.UI에 표시되는 노트 정보를 다시 작성합니다.\
콜백 함수에는 첫 번째 인수로 대상 노트 객체가 전달됩니다.\
콜백 함수의 반환값으로 노트를 다시 작성합니다.\
콜백 함수의 반환값으로 노트를 다시 작성합니다.

```AiScript
Plugin:register_note_post_interruptor(@(note) {
  
  // 노트 내용 바꾸기
  note.text = note.text.replace('사과', '바나나')

  return note
})
```

### `Plugin:register_page_view_interruptor(fn)`

페이지 열람 시 페이지 정보를 다시 작성합니다.\
콜백 함수에는 첫 번째 인수로 대상 Page 객체가 전달됩니다.\
콜백 함수의 반환값으로 Page가 다시 작성됩니다.

```AiScript
Plugin:register_note_post_interruptor(@(page) {
  
  // 페이지 내용 재작성(생략)

  return page
})
```

### `Plugin:open_url(url)`

첫 번째 인수로 전달된 URL을 브라우저의 새 탭에서 엽니다.

### `Plugin:config`

플러그인 설정이 저장되는 오브젝트입니다.플러그인 정의의 config에서 설정한 키로 값이 들어갑니다.플러그인 정의의 config에서 설정한 키로 값이 들어갑니다.

## Play 전용 상수

### `THIS_ID`

Play의 ID

### `THIS_URL`

Play의 URL

## UI 제어 함수 (Play, AiScript App 위젯에서 사용 가능)

### `Ui:root`

UI의 루트 요소.

### `Ui:render([ ...components ])`

`Ui:root.update({ children: [ ...components ] })` 의 당의구문.UI의 루트 요소를 다시 작성합니다.

```AiScript
Ui:render([
  Ui:C:text({text: "A"})
  Ui:C:button({text: "B", onClick: @(){}})
])
```

### `Ui:get(id)`

ID를 부여한 컴포넌트를 가져와서 조작할 수 있습니다.

```AiScript
Ui:C:text({text: "A"}, "text1")
Ui:get("text1").update({text: "B"})
```

## 컴포넌트 함수(Play, AiScript App 위젯에서 사용 가능)

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
  padding: 1 // 余白幅
  rounded: false // 角を丸く
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
