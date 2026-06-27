# 插件开发

Misskey Web 客户端的插件功能将允许您扩展客户端并添加各种功能。\
本文档介绍如何创建插件

## 插件示例

以下展示一个完整的插件示例。这个插件使用了 [`Plugin:register_post_form_action`](/docs/for-developers/plugin/plugin-api-reference/#pluginregister_post_form_actiontitle-fn)，在发帖表单中添加了一个“河豚拳按钮”。

安装此插件后，发帖表单上的插件菜单中将增加“河豚拳”这一项。点击后，会在发帖表单的文本中添加 `河豚拳!!!!🐡( '-' 🐡 )`。

```ais
/// @ 0.12.4
### {
  name: "河豚拳按钮"
  version: "0.0.1"
  author: "Misskey Project"
}

Plugin:register_post_form_action('河豚拳', @(note, rewrite) {
  let fugu = "河豚拳!!!!🐡( '-' 🐡 )"

  if (note.text.trim() == '') {
    // 如果帖子内容为空，则替换为河豚拳
    rewrite('text', fugu)
  } else {
    // 如果帖子内有内容，则在开头加上河豚拳并换行
    rewrite('text', `{fugu}{Str:lf}{note.text}`)
  }
})
```

## AiScript

插件是指使用 AiScript 编写的脚本。

## 元数据

插件必须使用 AiScript 的元数据嵌入功能来默认定义插件的元数据。示例：

```AiScript
/// @ 0.12.4
### {
  name: "插件名"
  version: "4.2.1"
  author: "作者"
  description: "描述"
}
```

元数据属性（metadata property）：

### name

插件名称

### author

插件作者

### version

插件版本。请指定数字（字符串格式）。

### description

插件说明

### permissions

插件要求的权限。在向 Misskey API 发起请求时使用。

关于 API 的请求方法，请参考[《AiScript Misskey 扩展 API 参考》](/docs/for-developers/plugin/plugin-api-reference/)。

:::tip

关于 permission 的完整列表，请查看[此处](/docs/for-developers/api/permission/)。

:::

### config

表示插件配置信息的对象。
以配置名作为键 (Key)，其值包含以下属性：

#### type

表示配置值类型的字符串。请从以下选项中选择：`string`、`number`、`boolean`

#### label

向用户显示的配置名称

#### description

配置的说明

#### default

配置的默认值

## API

Misskey Web 向插件开放了 API，通过利用这些 API 可以扩展客户端的功能。
关于具体包含哪些 API，请参考[《AiScript Misskey 扩展 API 参考》](./plugin-api-reference/)。

## 分发插件

在 v2023.11.0 及后续版本中，用户可以直接从你的网站一键安装插件。

如果您提供插件安装功能，则需要在您的网站上实现此 API。详情请查看[此处](../publish-on-your-website.md)。
