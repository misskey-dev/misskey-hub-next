# AiScript Misskey 扩展 API 参考

本文档介绍了 Misskey 独家定制的 AiScript 扩展 API。

:::tip

标准内置的 AiScript API 可以在[此处](https://aiscript-dev.github.io/guides/get-started.html) 查看。

:::

## 全局常量

### `USER_ID`

当前用户的 ID

### `USER_NAME`

当前用户的名称

### `USER_USERNAME`

当前用户的用户名（`@`之后的部分。例如： `@ai@example.com` → `ai`）

### `CUSTOM_EMOJIS`

自定义表情符号列表。以数组形式存储了如下所示的对象：

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

当前 Misskey Web 设置的语言。以兼容 RFC4646 的格式（如 `zh-CN`）表示。

### `SERVER_URL`

当前服务器的 URL。以源（Origin）的形式表示，如 `https://www.example.com`。

## 全局函数

### `Mk:dialog(title, text, type)`

显示对话框。type 可以设置以下值：\
`info` `success` `warning` `error` `question`\
如果省略，则默认为 `info` 。

### `Mk:toast(text)`

显示轻提示（Toast）。与对话框不同，它不需要用户执行关闭操作，因此可用于某项操作完成等简单的通知。

### `Mk:confirm(title, text, type)`

显示含确认的对话框。type 可以设置以下值：\
`info` `success` `warning` `error` `question`\
如果省略，则默认为 `question` 。\
当用户选择“确定”时返回 true，选择“取消”时返回 false。

```AiScript
let response = Mk:confirm(
  '确定要继续操作吗？'
  '此操作无法撤销。请仔细确认。'
  'warning'
)

if (response) {
  // 点击确定的情况
} else {
  // 点击取消的情况
}
```

### `Mk:api(endpoint, params, token?)`

向 Misskey API 发起请求。第一参数传入端点名称，第二参数传入参数对象。

第三参数也可以传入 token。当作为插件运行且在元数据块中指定了 `permissions` 时，如果不指定第三参数，则会使用被授予该 permission 的 token。

:::tip

关于 permission 的完整列表，请查看[此处](/docs/for-developers/api/permission/)。

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

为任意值指定任意名称并进行持久化保存。持久化的值在 AiScript 上下文结束后依然保留，可以通过 Mk:load 读取。

### `Mk:load(key)`

读取通过 Mk:save 持久化保存的指定名称的值。

### `Mk:remove(key)`

※将在 v2025.1.0（暂定名）及后续版本中可用

删除通过 Mk:save 持久化保存的指定名称的值。如果指定名称的值不存在，则不执行任何操作。

### `Mk:url()`

获取当前打开页面的 URL（当前浏览器地址栏中显示的 URL）。

### `Mk:nyaize(text)`

将指定的文本猫语化（Nyaize）。不会考虑 MFM 语法等格式。

## 插件专用

### `Plugin:register_post_form_action(title, fn)`

在发帖表单中添加操作。第一参数传入操作名称，第二参数传入选择该操作时的回调函数。\
回调函数接收两个参数：第一参数是发帖表单对象（包含 text 和 cw），第二参数是用于重写它们的函数。

```AiScript
Plugin:register_post_form_action('菜单中显示的选项名称', @(note, rewrite) {

  // 对帖子进行某种修改
  rewrite('text', `{note.text}{Str:lf}#标签`)
})
```

### `Plugin:register_note_action(title, fn)`

在帖子菜单中添加选项。第一参数传入选项名称，第二参数传入选择该选项时的回调函数。\
回调函数的第一参数将接收目标帖子对象。

```AiScript
Plugin:register_note_action('菜单中显示的选项名称', @(note) {

  // 使用该帖子做点什么
  Mk:api('notes/create', {
    text: '引用'
    renoteId: note.id
  })

})
```

### `Plugin:register_user_action(title, fn)`

在用户菜单中添加选项。第一参数传入选项名称，第二参数传入选择该选项时的回调函数。\
回调函数的第一参数将接收目标用户对象。

```AiScript
Plugin:register_user_action('菜单中显示的选项名称', @(user) {

  // 使用用户信息做点什么
  Mk:api('notes/create', {
    text: `欢迎你，{user.name}！`
  })

})
```

### `Plugin:register_note_view_interruptor(fn)`

重写 UI 中显示的帖子信息。\
回调函数的第一参数将接收目标帖子对象。\
帖子内容将被重写为回调函数的返回值。\
如果返回 `null`，则隐藏该帖子。

:::warning

在 v2025.8.0 及后续版本中，此函数将**同步执行**。
内部执行异步处理的函数（如 `Mk:api` 等）将无法执行并会引发错误。

此外，同步执行意味着在插件执行期间，所有其他 JavaScript 的处理都会停止。因此，与其他插件钩子 (Hook) 相比，如果执行了有问题的脚本（例如无限循环），可能会对宿主 JavaScript 环境造成严重影响。请务必谨慎。

:::

```AiScript
Plugin:register_note_view_interruptor(@(note) {
  
  // 改写帖子的内容
  note.text = note.text.replace('苹果', '香蕉')

  // 如果返回null，则隐藏
  if (note.text.incl('纳豆')) {
    return null
  }

  return note
})
```

### `Plugin:register_note_post_interruptor(fn)`

在发送帖子时重写帖子信息。\
回调函数的第一参数将接收目标帖子对象。\
帖子内容将被重写为回调函数的返回值。

```AiScript
Plugin:register_note_post_interruptor(@(note) {
  
  // 重写帖子的内容
  note.text = note.text.replace('苹果', '香蕉')

  return note
})
```

### `Plugin:register_page_view_interruptor(fn)`

在浏览页面（Page）时更改页面（Page）信息。\
回调函数的第一参数将接收目标 Page 对象。\
Page 内容将被重写为回调函数的返回值。

```AiScript
Plugin:register_note_post_interruptor(@(page) {
  
  // 重写页面的内容（省略）

  return page
})
```

### `Plugin:open_url(url)`

在浏览器的新标签页中打开第一参数传入的 URL。

### `Plugin:config`

存储插件配置的对象。对应的值会以插件定义的 config 中设置的键名来存放。

## Play 专用常量

### `THIS_ID`

Play 的 ID

### `THIS_URL`

Play 的 URL

## UI 控制函数（可在 Play 和 AiScript App 小部件中使用）

### `Ui:root`

UI 的 根元素。

### `Ui:render([ ...components ])`

`Ui:root.update({ children: [ ...components ] })` 的语法糖。用于重写 UI 的根元素。

```AiScript
```

### `Ui:get(id)`

获取分配了 ID 的组件，并对其进行操作。

```AiScript
Ui:C:text({text: "A"}, "text1")
Ui:get("text1").update({text: "B"})
```

## 组件函数（可在 Play 和 AiScript App 小部件中使用）

在下列元素中，初始化时可以像 `Ui:C:xxx(props, id)` 这样，在第二参数中指定组件的 id（在下面的参考示例中均已省略）。指定的 id 可以通过 `Ui:get(id)` 函数获取，并且可以使用 `update` 函数直接修改组件的内容（详情请参阅 `Ui:get(id)` 的参考说明）。

### 布局

#### `Ui:C:container`

可设置对齐方式、颜色等格式的外框（容器）。

```AiScript
Ui:C:container({
  children: [
    // 希望放入容器中的组件数组
    Ui:C:text({text: "A"})
  ]
  align: 'center' // 对齐方式 left, center, right
  bgColor: '#000' // 背景色
  fgColor: '#00f' // 文字颜色
  font: 'serif' // 字体 serif,sans-serif,monospace
  borderWidth: 1 // 边框宽度
  borderColor: '#f00' // 边框颜色
  padding: 1 // 内边距大小
  rounded: false // 是否圆角
  borderRadius: 1 // 圆角程度（用数值指定）
  hidden: false // 是否隐藏
})
// 译者注：和javascript DOM css语法大致相同
```

#### `Ui:C:folder`

手风琴（Accordion）元素（用户可以展开和折叠的容器）

```AiScript
Ui:C:folder({
  children: [
    // 希望放入容器中的组件数组
    Ui:C:text({text: "A"})
  ]
  title: "标题" // 显示在文件夹折叠处的标题
  opened: true // 默认是否展开
})
```

### 文本

#### `Ui:C:text`

纯文本

```AiScript
Ui:C:text({
  text: "内容" // 要显示的文本
  size: 1 // 字体大小
  bold: false // 粗体
  color: '#000' // 颜色
  font: 'monospace' // 字体 serif, sans-serif, monospace
})
```

#### `Ui:C:mfm`

MFM 文本。

```AiScript
Ui:C:mfm({
  text: "内容" // 要显示的文本
  size: 1 // 字体大小
  bold: false // 粗体
  color: '#000' // 颜色
  font: 'monospace' // 字体 serif, sans-serif, monospace
  onClickEv: @(id) {
    // $[clickable.ev=eventId TEXT] 的 MFM 语法处理程序
    <: `{id} clicked`
  }
})
```

### 表单

#### `Ui:C:button`

按钮

```AiScript
Ui:C:button({
  text: "按钮" // 按钮上显示的文本
  onClick: @() {
    // 点击时的事件
  }
  primary: false // 是否使用强调色（主色）？
  rounded: false // 是否圆角？
  disabled: false // 是否禁用？
})
```

#### `Ui:C:buttons`

按钮（横向排列）。

```AiScript
Ui:C:buttons({
  buttons: [ // 按钮定义数组。props 的指定格式与 Ui:C:button 相同
    {text: "a", onClick: @(){...}}
    {text: "b", onClick: @(){...}}
  ]
})
```

#### `Ui:C:switch`

```AiScript
Ui:C:switch({
  onChange: @(enabled) { 
    // 变更时的事件。第一参数为变更后的状态（布尔值 boolean）
  }
  default: false // 默认值
  label: "标签" // 开关旁边的文本
  caption: "说明" // 开关下方显示的辅助文本
})
```

#### `Ui:C:textInput`

单行文本输入

```AiScript
Ui:C:textInput({
  onInput: @(text) {
    // 输入时的事件。第一参数为变更后的值
  }
  default: "默认值"
  label: "标签" // 输入框上方的文本
  caption: "说明" // 输入框下方显示的辅助文本
})
```

#### `Ui:C:numberInput`

单行数字输入

```AiScript
Ui:C:numberInput({
  onInput: @(number) {
    // 输入时的事件。第一参数为变更后的值
  }
  default: "默认值"
  label: "标签" // 输入框上方的文本
  caption: "说明" // 输入框下方显示的辅助文本
})
```

#### `Ui:C:textarea`

多行文本输入

```AiScript
Ui:C:textarea({
  onInput: @(text) {
    // 输入时的事件。第一参数为变更后的值
  }
  default: "默认值"
  label: "标签" // 输入框上方的文本
  caption: "说明" // 输入框下方显示的辅助文本
})
```

#### `Ui:C:select`

下拉选择（从多个值中选择一个）

```AiScript
Ui:C:select({
  items: [ // 选项数组。text 中填入显示的文本，value 中填入变更事件传递的值
    {text: "A", value: "v1"}
    {text: "B", value: "v2"}
  ]
  onChange: @(value){
    // 变更时的事件。第一参数为变更后的 value
  }
  default: "v1" // 默认的 value
  label: "标签" // 输入框上方的文本
  caption: "说明" // 输入框下方显示的辅助文本
})
```

### 发帖相关

#### `Ui:C:postForm`

将发帖表单直接嵌入到 Play 中

```AiScript
Ui:C:postForm({
  form: {
    cw: "CW 注释" // 指定 CW（内容警告）时的“摘要”文本
    text: "发帖内容" // 发帖表单的默认字符串

    // 以下参数在 Misskey v2024.5.0 及后续版本中可用
    visibility: "home" // 默认的帖子可见范围（未指定时为 public）
    localOnly: false // 默认是否仅限本站（不进行跨站联邦传输）（未指定时为 false）
  }
})
```

#### `Ui:C:postFormButton`

可唤出发帖表单的特殊按钮

```AiScript
Ui:C:postFormButton({
  text: "发帖！" // 按钮上显示的文本
  primary: false // 是否使用强调色（主色）？
  rounded: false // 是否圆角？
  form: {
    cw: "CW 注释" // 指定 CW（内容警告）时的“摘要”文本
    text: "发帖内容" // 发帖表单的默认字符串

    // 以下参数在 Misskey v2024.5.0 及后续版本中可用
    visibility: "home" // 默认的帖子可见范围（未指定时为 public）
    localOnly: false // 默认是否仅限本站（不进行跨站联邦传输）（未指定时为 false）
  }
})
```
