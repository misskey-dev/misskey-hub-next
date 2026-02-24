# AiScript Misskey 擴充 API 參考文件

這裡介紹 Misskey 獨自擴充的 AiScript API。

:::tip

關於標準內建的 AiScript API 請參閱[此處](https://aiscript-dev.github.io/guides/get-started.html)。

:::

## 全領域共通常數

### `USER_ID`

目前使用者的 ID

### `USER_NAME`

目前使用者的名稱

### `USER_USERNAME`

目前使用者的帳號名稱（`@` 後面的部分。例如：`@ai@example.com` → `ai`）

### `CUSTOM_EMOJIS`

自訂表情符號列表。包含以下物件格式的陣列：

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

目前 Misskey Web 設定的語言。以 RFC4646 相容格式表示（例如：`zh-TW`、`ja-JP` 等）

### `SERVER_URL`

目前伺服器的 URL。以 Origin 的形式表示，例如：`https://www.example.com`

## 全領域共通函數

### `Mk:dialog(title, text, type)`

顯示對話框。type 可設定以下值：\
`info` `success` `warning` `error` `question`\
若省略則預設為 `info`。

### `Mk:toast(text)`

顯示 Toast（浮動提示）。與對話框不同，不需要使用者手動關閉，可用於通知「某項操作已完成」等簡單訊息。

### `Mk:confirm(title, text, type)`

顯示確認對話框。type 可設定以下值：\
`info` `success` `warning` `error` `question`\
若省略則預設為 `question`。\
當使用者選擇「OK」時會回傳 `true`，選擇「取消」時會回傳 `false`。

```AiScript
let response = Mk:confirm(
  '確定要繼續操作嗎？'
  '此操作無法撤銷。請仔細確認。'
  'warning'
)

if (response) {
  // 點擊 OK 時
} else {
  // 點擊取消時
}
```

### `Mk:api(endpoint, params, token?)`

向 Misskey API 發送請求。第一參數為端點名稱，第二參數傳遞參數物件。

第三參數可以選擇性放入 token。在作為插件執行時，若在中繼資料區塊中有指定 `permissions`，只要不指定第三參數，就會自動使用具備該權限的 token。

:::tip

permission 的列表請參閱[此處](/docs/for-developers/api/permission/)。

:::

```AiScript
### {
  name: "插件名稱",
  version: "4.2.1",
  author: "作者名稱",
  description: "說明文字",
  permissions: ['write:notes'],
}

@onClick() {
  let res = Mk:api('notes/create', {
    text: 'Hello from plugin!'
  })
}
```

### `Mk:save(key, value)`

將任意值賦予任意名稱並永久保存。保存的值即使在 AiScript 上下文結束後依然存在，並可透過 Mk:load 讀取。

### `Mk:load(key)`

讀取透過 Mk:save 保存的指定名稱的值。

### `Mk:remove(key)`

※v2025.1.0（暫定）及後續版本可用

刪除透過 Mk:save 保存的指定名稱的值。若指定名稱的值不存在則不執行任何操作。

### `Mk:url()`

取得目前開啟頁面的 URL（目前瀏覽器網址列顯示的 URL）。

### `Mk:nyaize(text)`

將指定的文字 Nyaize（貓語化）。此處理不考慮 MFM 等語法。

## 插件專用

### `Plugin:register_post_form_action(title, fn)`

在發布表單新增動作。第一參數為動作名稱，第二參數為選擇動作時觸發的回呼函數。\
回呼函數的第一參數會接收到發布表單物件（包含 `text` 與 `cw`），第二參數則會接收用於覆寫這些內容的函數。

```AiScript
Plugin:register_post_form_action('選單中顯示的項目名稱', @(note, rewrite) {

  // 對貼文進行某些修改
  rewrite('text', `{note.text}{Str:lf}#主題標籤`)
})
```

### `Plugin:register_note_action(title, fn)`

在貼文選單新增項目。第一參數為項目名稱，第二參數為選擇項目時的回呼函數。\
回呼函數的第一參數會接收目標的貼文物件。

```AiScript
Plugin:register_note_action('選單中顯示的項目名稱', @(note) {

  // 使用該貼文執行某些操作
  Mk:api('notes/create', {
    text: '引用'
    renoteId: note.id
  })

})
```

### `Plugin:register_user_action(title, fn)`

在使用者選單新增項目。第一參數為項目名稱，第二參數為選擇項目時的回呼函數。\
回呼函數的第一參數會接收目標的使用者物件。

```AiScript
Plugin:register_user_action('選單中顯示的項目名稱', @(user) {

  // 使用使用者資訊執行某些操作
  Mk:api('notes/create', {
    text: `歡迎，{user.name}！`
  })

})
```

### `Plugin:register_note_view_interruptor(fn)`

覆寫顯示在 UI 上的貼文資訊。\
回呼函數的第一參數會接收目標的貼文物件。\
透過回呼函數的傳回值來覆寫貼文。\
若回傳 `null` 則會隱藏該貼文。

:::warning

在 v2025.8.0 及後續版本中，此函數為**同步執行**。無法執行內部包含非同步處理的函數（如 `Mk:api` 等），否則會發生錯誤。

此外，同步執行意味著在插件執行期間，其他所有 JavaScript 的處理都會停止。因此，與其他插件鉤子 (Hook) 相比，若執行了有問題的腳本（例如無限迴圈），可能會對主機端的 Javascript 環境造成嚴重影響。請務必小心使用。

:::

```AiScript
Plugin:register_note_view_interruptor(@(note) {
  
  // 修改貼文內容
  note.text = note.text.replace('蘋果', '香蕉')

  // 回傳 null 則隱藏貼文
  if (note.text.incl('納豆')) {
    return null
  }

  return note
})
```

### `Plugin:register_note_post_interruptor(fn)`

發布筆記時覆寫貼文資訊。\
回呼函數的第一參數會接收目標的貼文物件。\
透過回呼函數的傳回值來覆寫貼文。

```AiScript
Plugin:register_note_post_interruptor(@(note) {
  
  // 修改貼文內容
  note.text = note.text.replace('蘋果', '香蕉')

  return note
})
```

### `Plugin:register_page_view_interruptor(fn)`

瀏覽 Page 時覆寫 Page 資訊。\
回呼函數的第一參數會接收目標的 Page 物件。\
透過回呼函數的傳回值來覆寫 Page。

```AiScript
Plugin:register_page_view_interruptor(@(page) {
  
  // 修改頁面內容（省略）

  return page
})
```

### `Plugin:open_url(url)`

在瀏覽器的新分頁開啟第一參數傳遞的 URL。

### `Plugin:config`

儲存插件設定的物件。會將插件定義 config 中設定的 Key 作為鍵值來儲存。

## Play 專用常數

### `THIS_ID`

Play 的 ID

### `THIS_URL`

Play 的 URL

## UI 控制函數（可用於 Play・AiScript App 小工具）

### `Ui:root`

UI 的根元素。

### `Ui:render([ ...components ])`

`Ui:root.update({ children: [ ...components ] })` 的語法糖。用於覆寫 UI 的根元素。

```AiScript
Ui:render([
  Ui:C:text({text: "A"})
  Ui:C:button({text: "B", onClick: @(){}})
])
```

### `Ui:get(id)`

取得賦予了 ID 的元件，並進行操作。

```AiScript
Ui:C:text({text: "A"}, "text1")
Ui:get("text1").update({text: "B"})
```

## 元件函數（可用於 Play・AiScript App 小工具）

在以下的元素中，初始化時可以在第二參數指定元件的 id，如 `Ui:C:xxx(props, id)`（在下方參考列表中皆省略）。指定的 id 可透過 `Ui:get(id)` 函數取得，並能使用 `update` 函數直接變更元件內容（詳情請參閱 `Ui:get(id)` 參考文件）。

### 版面配置

#### `Ui:C:container`

可設定靠齊位置、顏色等格式的外框（容器）

```AiScript
Ui:C:container({
  children: [
    // 想要放入容器中的元件陣列
    Ui:C:text({text: "A"})
  ]
  align: 'center' // 對齊方式 left, center, right
  bgColor: '#000' // 背景顏色
  fgColor: '#00f' // 文字顏色
  font: 'serif' // 字體 serif, sans-serif, monospace
  borderWidth: 1 // 邊框寬度
  borderColor: '#f00' // 邊框顏色
  borderStyle: 'solid' // 邊框樣式
  padding: 1 // 內邊距寬度
  rounded: false // 是否為圓角
  borderRadius: 1 // 圓角（指定圓角的數值）
  hidden: false // 是否隱藏
})
```

#### `Ui:C:folder`

手風琴元素（使用者可展開或收起內容的容器）

```AiScript
Ui:C:folder({
  children: [
    // 想要放入容器中的元件陣列
    Ui:C:text({text: "A"})
  ]
  title: "標題" // 顯示於資料夾展開/折疊處的標題
  opened: true // 預設是否展開
})
```

### 文字

#### `Ui:C:text`

純文字

```AiScript
Ui:C:text({
  text: "內容" // 要顯示的文字
  size: 1 // 文字大小
  bold: false // 是否粗體
  color: '#000' // 顏色
  font: 'monospace' // 字體 serif, sans-serif, monospace
})
```

#### `Ui:C:mfm`

MFM 文字

```AiScript
Ui:C:mfm({
  text: "內容" // 要顯示的文字
  size: 1 // 文字大小
  bold: false // 是否粗體
  color: '#000' // 顏色
  font: 'monospace' // 字體 serif, sans-serif, monospace
  onClickEv: @(id) {
    // $[clickable.ev=eventId TEXT] MFM 語法的處理常式 (Handler)
    <: `{id} clicked`
  }
})
```

### 表單

#### `Ui:C:button`

按鈕

```AiScript
Ui:C:button({
  text: "按鈕" // 顯示於按鈕上的文字
  onClick: @() {
    // 點擊時的事件
  }
  primary: false // 是否套用主色調？
  rounded: false // 是否為圓角？
  disabled: false // 是否停用？
})
```

#### `Ui:C:buttons`

按鈕（橫向排列）

```AiScript
Ui:C:buttons({
  buttons: [ // 按鈕定義陣列。props 的指定格式與 Ui:C:button 相同
    {text: "a", onClick: @(){...}}
    {text: "b", onClick: @(){...}}
  ]
})
```

#### `Ui:C:switch`

```AiScript
Ui:C:switch({
  onChange: @(enabled) { 
    // 變更時的事件。第一個參數為變更後的狀態（布林值 boolean）
  }
  default: false // 預設值
  label: "標籤" // 開關旁的文字
  caption: "說明" // 顯示於開關下方的輔助文字
})
```

#### `Ui:C:textInput`

單行文字輸入

```AiScript
Ui:C:textInput({
  onInput: @(text) {
    // 輸入時的事件。第一個參數為變更後的值
  }
  default: "預設值" // 預設值
  label: "標籤" // 輸入欄位上方的文字
  caption: "說明" // 顯示於輸入欄位下方的輔助文字
})
```

#### `Ui:C:numberInput`

單行數字輸入

```AiScript
Ui:C:numberInput({
  onInput: @(number) {
    // 輸入時的事件。第一個參數為變更後的值
  }
  default: "預設值" // 預設值
  label: "標籤" // 輸入欄位上方的文字
  caption: "說明" // 顯示於輸入欄位下方的輔助文字
})
```

#### `Ui:C:textarea`

多行文字輸入

```AiScript
Ui:C:textarea({
  onInput: @(text) {
    // 輸入時的事件。第一個參數為變更後的值
  }
  default: "預設值" // 預設值
  label: "標籤" // 輸入欄位上方的文字
  caption: "說明" // 顯示於輸入欄位下方的輔助文字
})
```

#### `Ui:C:select`

從多個選項中選取一個的下拉式選單

```AiScript
Ui:C:select({
  items: [ // 選項陣列。text 填入要顯示的文字，value 填入變更事件中要傳遞的值
    {text: "A", value: "v1"}
    {text: "B", value: "v2"}
  ]
  onChange: @(value){
    // 變更時的事件。第一個參數為變更後的 value
  }
  default: "v1" // 預設的 value
  label: "標籤" // 輸入欄位上方的文字
  caption: "說明" // 顯示於輸入欄位下方的輔助文字
})
```

### 貼文發布相關

#### `Ui:C:postForm`

將發布表單直接嵌入 Play

```AiScript
Ui:C:postForm({
  form: {
    cw: "CW 註釋" // 指定 CW（內容警告）時的「摘要」文字
    text: "貼文內容" // 發文表單的預設字串

    // 以下參數在 Misskey v2024.5.0 及後續版本中可用
    visibility: "home" // 預設的貼文公開範圍（未指定時為 public）
    localOnly: false // 預設是否僅限本站（不跨站聯邦傳送）（未指定時為 false）
  }
})
```

#### `Ui:C:postFormButton`

可呼叫發布表單的特殊按鈕

```AiScript
Ui:C:postFormButton({
  text: "發佈！" // 顯示於按鈕上的文字
  primary: false // 是否套用主色調？
  rounded: false // 是否為圓角？
  form: {
    cw: "CW 註釋" // 指定 CW（內容警告）時的「摘要」文字
    text: "貼文內容" // 發文表單的預設字串

    // 以下參數在 Misskey v2024.5.0 及後續版本中可用
    visibility: "home" // 預設的貼文公開範圍（未指定時為 public）
    localOnly: false // 預設是否僅限本站（不跨站聯邦傳送）（未指定時為 false）
  }
})
```
