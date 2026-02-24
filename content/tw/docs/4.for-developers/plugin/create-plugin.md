# 建立插件

透過 Misskey Web 客戶端的插件功能，您可以擴展客戶端並新增各種功能。
本文件將說明如何建立插件。

## 插件範例

以下提供一個完整的插件範例。此插件使用 [`Plugin:register_post_form_action`](/docs/for-developers/plugin/plugin-api-reference/#pluginregister_post_form_actiontitle-fn) 在發布表單中新增一個「河豚拳按鈕」。

安裝此插件後，發布表單上的插件選單會新增一個「河豚拳」選項。點擊後，發布表單的文字區塊中就會加入 `河豚拳!!!!🐡( '-' 🐡 )`。

```ais
/// @ 0.12.4
### {
  name: "河豚拳按鈕"
  version: "0.0.1"
  author: "Misskey Project"
}

Plugin:register_post_form_action('河豚拳', @(note, rewrite) {
  let fugu = "河豚拳!!!!🐡( '-' 🐡 )"

  if (note.text.trim() == '') {
    // 如果貼文內容為空，則替換為河豚拳
    rewrite('text', fugu)
  } else {
    // 如果貼文有內容，則在開頭加入河豚拳並換行
    rewrite('text', `{fugu}{Str:lf}{note.text}`)
  }
})
```

## AiScript

插件是使用 AiScript 撰寫的腳本。

## 中繼資料 (Metadata)

插件必須使用 AiScript 的中繼資料嵌入功能，預設定義插件的中繼資料。中繼資料的範例如下：

```AiScript
/// @ 0.12.4
### {
  name: "插件名稱"
  version: "4.2.1"
  author: "作者名稱"
  description: "說明文字"
}
```

中繼資料是包含以下屬性的物件：

### name

插件名稱

### author

插件作者

### version

插件版本。請指定數值。

### description

插件的說明

### permissions

插件所需的權限。在向 Misskey API 發送請求時使用。

關於 API 的請求方法，請參閱 [AiScript Misskey 擴展 API 參考文件](/docs/for-developers/plugin/plugin-api-reference/)。

:::tip

permission 的列表請參閱[此處](/docs/for-developers/api/permission/)。

:::

### config

表示插件配置資料的對象。
在鍵中包含設置名稱，在值中包含以下屬性。

#### type

表示設置值類型的字串。從以下選擇。
string number boolean

#### label

設置顯示給用戶的名稱

#### description

設定的說明

#### default

設定的預設値

## API

Misskey Web 會對外提供插件（外掛）可使用的 API，透過這些 API，便能擴充客戶端的各項功能。若想了解可使用的 API，請參考 [AiScript Misskey 擴充 API](./plugin-api-reference/) 參考文件。

## 分發插件

在 v2023.11.0 及更高版本中，使用者已經可以從您的網站直接一鍵安裝插件。

如果您想提供插件安裝功能，您必須在您的網站上實作相應的 API。詳情請參閱[此處](../publish-on-your-website.md)。
