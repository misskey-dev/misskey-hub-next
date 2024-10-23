# 插件开发

Misskey Web 客户端的插件功能将允许您扩展客户端并添加各种功能。\
本文档介绍如何创建插件

## プラグインの例

以下に完全なプラグインの例を示します。このプラグインは、[`Plugin:register_post_form_action`](/docs/for-developers/plugin/plugin-api-reference/#pluginregister_post_form_actiontitle-fn)を使用して、投稿フォームに「フグパンチボタン」を追加するものです。

このプラグインをインストールすると、投稿フォーム上のプラグインメニューに「フグパンチ」の項目が追加されます。クリックすると、投稿フォーム上のテキストに `ﾌｸﾞﾊﾟﾝﾁ!!!!🐡( '-' 🐡 )` が追加されます。

```ais
/// @ 0.12.4
### {
  name: "フグパンチボタン"
  version: "0.0.1"
  author: "Misskey Project"
}

Plugin:register_post_form_action('フグパンチ', @(note, rewrite) {
  let fugu = "ﾌｸﾞﾊﾟﾝﾁ!!!!🐡( '-' 🐡 )"

  if (note.text.trim() == '') {
    // ノートの中身がない場合はフグパンチに置き換え
    rewrite('text', fugu)
  } else {
    // ノートの中身がある場合は冒頭にフグパンチを追加して改行
    rewrite('text', `{fugu}{Str:lf}{note.text}`)
  }
})
```

##

插件是指使用 AiScript 编写的脚本。

## 元数据

插件必须使用AiScript的元数据嵌入功能将插件的元数据定义为默认值。示例：

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

###

插件名称

###

插件作者

###

插件版本具体规范详见：https://semver.org/lang/zh-CN/

###

插件说明

###

插件要求的权限。需要在发送Misskey API请求时使用。

APIのリクエスト方法については、[AiScript Misskey拡張API リファレンス](/docs/for-developers/plugin/plugin-api-reference/)をご覧ください。

:::tip

permissionの一覧は[こちら](/docs/for-developers/api/permission/)をご覧ください。

:::

###

插件配置文件。键值Key支持下列属性：

####

设置值类型选择一项：string number boolean

####

设置 向用户显示的名称

####

设置描述

####

默认值

##

Misskey Web 为插件公开了API，您可以通过使用这些 API 来扩展客户端的功能。
您可以在 [AiScript Misskey扩展API](./plugin-api-reference/) 参考。

## 发布插件

在v2023.11.0或更高版本中，只需单击一下即可直接从您的网站安装插件。

如果您提供插件安装功能，则需要在您的网站上实现此 API。详细见 [发布你的网站](../publish-on-your-website.md) 。
