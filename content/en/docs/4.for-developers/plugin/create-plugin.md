# Creating Plugins

The plugin feature of the Misskey Web Client allows you to extend the client and add various features to it.

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

## AiScript

Plugins are scripts written using AiScript.

## Metadata

Plugins must use AiScript's metadata feature to define the plugin's metadata as the default.Example of some metadata are:Example of some metadata are:

```AiScript
/// @ 0.12.4
### {
  name: "Plugin Name"
  version: "4.2.1"
  author: "Plugin Author"
  description: "Plugin Description"
}
```

Metadata is an object that contains the following properties:

### name

Plugin name

### author

Plugin author

### version

Plugin version.A number must be specified.A number must be specified.

### description

Plugin description

### permissions

Permissions required by the plugin.Permissions required by the plugin.Used when making requests to the Misskey API.

Please refer to [AiScript Misskey Extension API Reference](/docs/for-developers/plugin/plugin-api-reference/) for how to make a request to the API.

:::tip

Refer to [this document](/docs/for-developers/api/permission/) for a list of permissions.

:::

### config

An object representing the plugin's settings. Keys are setting names and values are any of the below properties. Please refer to the [Plugin API Reference](./plugin-api-reference/) for information on what APIs are available.

#### type

A string representing the setting's value type.Can be either a string, number, or boolean.Can be either a string, number, or boolean.

#### label

Setting name displayed to users

#### description

Description of the setting

#### default

Default value of the setting

## API

Misskey Web exposes APIs for Plugins, which can be used to extend client functionality.

## Distributing Plugins

Starting with v2023.11.0, you can install plugins directly from your website with one click.

If you want to provide plugin installation functionality, you will need to implement an API on your site.For more information, please see [here](../publish-on-your-website.md).
