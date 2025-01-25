# AiScript Misskey 扩展 API 参考

在这里将介绍有关 Misskey 独自扩展的 AiScript API。

:::tip

标准的AiScript API可以在 [这里](https://github.com/aiscript-dev/aiscript/blob/master/docs/get-started.md) 找到

:::

## 全局常量

### `USER_ID`

当前用户的 ID

### `USER_NAME`

当前用户的姓名

### `USER_USERNAME`

当前用户的用户名（`@`之后的部分。例如： `@ai@example.com` → `ai`）

### `CUSTOM_EMOJIS`

自定义表情符号的数组。数组内容为如下对象

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

Misskey Web 当前设置的显示语言以 RFC4646 兼容的格式（如`zh-CN`）表示

### `SERVER_URL`

当前服务器的 URL。例如：`https://www.example.com`

## 全局函数

### `Mk:dialog(title, text, type)`

显示一个普通对话框。type 可以设置为以下类型。\
`info` `success` `warning` `error` `question`\
默认为 `info` 。

### `Mk:confirm(title, text, type)`

显示含确认的对话框。type可以为以下类型：\
`info` `success` `warning` `error` `question`\
默认为 `question` 。\
如果用户选择“OK”，则返回true`;如果用户选择“Cancel”，则返回false`。

```AiScript
let response = Mk:confirm(
  '是否要继续操作？'
  '此操作不可反悔，你确定？！'
  'warning'
)

if (response) {
  // 按下OK
} else {
  // 按下取消
}
```

### `Mk:api(endpoint, params, token?)`

通过Misskey API发送请求。在第一个参数中传入终端名称，在第二个参数中传入参数对象。

也可以在第三个参数中添加 token。使用插件时，当元数据块内指定了 `permissions` 时，如果未指定第三个参数，则使用此 `permissions` 所带的 token。

:::tip

permission 一览请看[这里](/docs/for-developers/api/permission/)

:::

```AiScript
### {
  name: "插件名",
  version: "4.2.1",
  author: "作者名",
  description: "说明信息",
  permissions: ['write:notes'],
}

@onClick() {
  let res = Mk:api('notes/create', {
    text: 'Hello from plugin!'
  })
}
```

### `Mk:save(key, value)`

使用任何名称保留任何值。被保存的值在 AiScript 上下文结束后仍会保留，且可以通过 Mk:load 读取。

### `Mk:load(key)`

读取使用 Mk:save 保存的指定名称的值。

### `Mk:remove(key)`

※v2025.1.0（仮称）以降で使用可能

Mk:saveで永続化した指定の名前の値を削除します。指定の名前の値が存在しない場合は何もしません。

### `Mk:url()`

現在開いているページのURL（現在ブラウザのアドレスバーに表示されているURL）を取得します。

### `Mk:nyaize(text)`

指定されたテキストをNyaizeします。MFMの構文などは考慮されません。

## 插件专用

### `Plugin:register_post_form_action(title, fn)`

将操作添加到发布表单。第一个参数是操作名称，第二个参数是选择操作时的回调函数。\
回调函数在第一个参数中传递帖子表单对象中的`text`和`cw`，在第二个参数中传递用于重写它们的函数。

```AiScript
Plugin:register_post_form_action('菜单中显示的项目名称', @(note, rewrite) {

  // 对笔记进行一些更改。
  rewrite('text', `{note.text}{Str:lf}#标签`)
})
```

### `Plugin:register_note_action(title, fn)`

将项目添加到帖子菜单。第一引数に項目名、第二引数に項目が選択された際のコールバック関数を渡します。\
回调函数将目标注释对象传递给第一个参数。

```AiScript
Plugin:register_note_action('菜单中显示的项目名称', @(note) {

  Mk:api('notes/create', {
    text: '引用'
    renoteId: note.id
  })

})
```

### `Plugin:register_user_action(title, fn)`

将项目添加到用户菜单。在第一个参数中传递字段名称，在第二个参数中传递字段被选中时的回调函数。\
回调函数将目标用户对象传递给第一个参数。

```AiScript
Plugin:register_user_action('菜单中显示的项目名称', @(user) {

  // 利用用户信息做点什么
  Mk:api('notes/create', {
    text: `{user.name}さん、ようこそ！`
  })

})
```

### `Plugin:register_note_view_interruptor(fn)`

重写 UI 中显示的注释信息。\
回调函数将目标注释对象传递给第一个参数。\
注释将被回调函数的返回值覆写。\
如果返回null\`，则隐藏该注释。

```AiScript
Plugin:register_note_view_interruptor(@(note) {
  
  // 改写笔记本的内容
  note.text = note.text.replace('林檎', '香蕉')

  // 如果返回null，则隐藏
  if (note.text.incl('納豆')) {
    return null
  }

  return note
})
```

### `Plugin:register_note_post_interruptor(fn)`

在提交笔记时覆写笔记信息。\
回调函数将目标注释对象传递给第一个参数。\
注释将被回调函数的返回值覆写。

```AiScript
Plugin:register_note_post_interruptor(@(note) {
  
  // 改写笔记本的内容
  note.text = note.text.replace('林檎', '香蕉')

  return note
})
```

### `Plugin:register_page_view_interruptor(fn)`

在浏览页面（Page）时更改页面（Page）信息。\
回调函数将目标Page对象作为第一个参数传递。\
回调函数的返回值将覆写页面。

```AiScript
Plugin:register_note_post_interruptor(@(page) {
  
  // 更改页面的内容（省略）

  return page
})
```

### `Plugin:open_url(url)`

在浏览器的新选项卡中打开传递给第一个参数的URL。

### `Plugin:config`

存储插件设置的对象。该值是通过插件定义的配置中设置的键值来传入的。

## Play 专用常量

### `THIS_ID`

Play 的 ID

### `THIS_URL`

Play 的 URL

## UI 控制函数（可在 Play 和 AiScript App小部件中使用）

### `Ui:root`

UI 的 根节点

### `Ui:render([ ...components ])`

`Ui:root.update({ children: [ ...components ] })` 覆写UI的根元素的语法糖。

```AiScript
```

### `Ui:get(id)`

您可以获取带有ID的组件并对其进行操作

```AiScript
Ui:C:text({text: "A"}, "text1")
Ui:get("text1").update({text: "B"})
```

## 组件函数（可在 Play 和 AiScript App小部件中使用）

对于下面的元素，可以在初始化时指定组件的id作为第二个参数，如“Ui：C：xxx（props id）”（在下面的参考中省略了所有内容）。指定的id可以通过'Ui：get（id）'函数取得，可以通过'update'函数直接变更组件的内容（详细内容请参照'Ui：get（id）'的参考）。

### 应用布局

#### `Ui:C:container`

可格式化的边框（容器），如宽度、颜色等

```AiScript
Ui:C:container({
  children: [
    // 您希望放入容器中的组件数组
    Ui:C:text({text: "A"})
  ]
  align: 'center' // 布局 left,center,right
  bgColor: '#000' // 背景色
  fgColor: '#00f' // 文字色
  font: 'serif' // 字体 serif,sans-serif,monospace
  borderWidth: 1 // 边框宽度
  borderColor: '#f00' // 边框颜色
  padding: 1 // 外边距
  rounded: false // 圆角
  hidden: false // 是否隐藏
})
// 和javascript DOM css语法大致相同
```

#### `Ui:C:folder`

手风琴（Accordion）元素（用户可以打开和关闭的容器）

```AiScript
Ui:C:folder({
  children: [
    // 要包含在容器中的组件数组
    Ui:C:text({text: "A"})
  ]
  title: "タイトル" // 文件夹打开和关闭部分的标题
  opened: true // 默认是否打开
})
```

### 文本

#### `Ui:C:text`

纯文本

```AiScript
Ui:C:text({
  text: "内容" 
  size: 1 // 文字大小
  bold: false // 是否加粗
  color: '#000' // 色
  font: 'monospace' // 字体风格 serif,sans-serif,monospace
})
```

#### `Ui:C:mfm`

富文本 （MFM）

```AiScript
Ui:C:mfm({
  text: "内容" // 表示するテキスト
  size: 1 // 文字大小
  bold: false //是否加粗
  color: '#000' // 色
  font: 'monospace' //  字体风格 serif,sans-serif,monospace
  onClickEv: @(id) {
    // $[clickable.ev=eventId TEXT] 的MFM语法处理程序
    <: `{id} clicked`
  }
})
```

### 表单

#### `Ui:C:button`

按钮

```AiScript
Ui:C:button({
  text: "ボタン" // 按钮上显示的文本
  onClick: @() {
    //点击事件
  }
  primary: false // 要颜色吗？
  rounded: false // 要圆角吗？
  disabled: false // 要禁用吗？
})
```

#### `Ui:C:buttons`

按钮（横向）

```AiScript
```

#### `Ui:C:switch`

```AiScript
```

#### `Ui:C:textInput`

单行文本输入

```AiScript
Ui:C:textInput({
  onInput: @(text) {
    // 进入时的事件。更改为第一个参数后的值
  }
  default: "デフォルト"  // 缺省值
  label: "ラベル" // 输入栏中的文本
  caption: "キャプション" / 显示在输入栏下方的辅助文本
})
```

#### `Ui:C:numberInput`

单行数字输入

```AiScript
Ui:C:numberInput({
  onInput: @(number) {
    // 进入时的事件。更改为第一个参数后的值
  }
  default: "デフォルト"  // 缺省值
  label: "ラベル" // 输入栏中的文本
  caption: "キャプション" / 显示在输入栏下方的辅助文本
})
```

#### `Ui:C:textarea`

多行文本输入

```AiScript
Ui:C:textarea({
  onInput: @(text) {
    // 进入时的事件。更改为第一个参数后的值
  }
  default: "デフォルト"  // 缺省值
  label: "ラベル" // 输入栏中的文本
  caption: "キャプション" / 显示在输入栏下方的辅助文本
})
```

#### `Ui:C:select`

从多个值中选择一个格式

```AiScript
Ui:C:select({
  items: [ // 选择列表。text是要显示的文本，value是在更改事件中传递的值
    {text: "A", value: "v1"}
    {text: "B", value: "v2"}
  ]
  onChange: @(value){
    // 更改时的事件。将更改为第一个参数后的value
  }
  default: "v1" // 缺省值
  label: "ラベル" // 输入栏中的文本
  caption: "キャプション" // 显示在输入栏下方的辅助文本
})
```

### 发布帖子

#### `Ui:C:postForm`

直接在 Play 中嵌入帖子表单

```AiScript
Ui:C:postForm({
  form: {
    cw: "CW 帖子" // 指定CW时的“摘要”文本
    text: "投稿内容" // 帖子表单默认字符串

    // 以下内容可以在Misskey v2024.5.0或更高版本中指定：
    visibility: "home" // 默认帖子的发布范围（如果未指定，则为public）
    localOnly: false // 默认情况下是否无联邦（如果未指定，则为false）
  }
})
```

#### `Ui:C:postFormButton`

用于调用帖子表单的特殊按钮

```AiScript
Ui:C:postFormButton({
  text: "投稿！" // 按钮上显示的文本
  primary: false // 你想给它颜色吗？
  rounded: false // 你想要圆角吗？
  form: {
    cw: "CW 帖子" // 指定CW时的“摘要”文本
    text: "投稿内容" // 帖子表单默认字符串

    // 以下内容可以在Misskey v2024.5.0或更高版本中指定：
    visibility: "home" // 默认帖子的发布范围（如果未指定，则为public）
    localOnly: false // 默认情况下是否无联邦（如果未指定，则为false）
  }
})
```
