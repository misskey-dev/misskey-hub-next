# Creating Plugins

The plugin feature of the Misskey Web Client allows you to extend the client and add various features to it.

## Example

This is a complete example of plugin.This plugin adds a "Fugu Punch Button" to the post form by utilizing [`Plugin:register_post_form_action`](/docs/for-developers/plugin/plugin-api-reference/#pluginregister_post_form_actiontitle-fn).

By installing this plugin, you will find additional item named "Fugu Punch" in plugin section of the post form.And if you click the button, `ﾌｸﾞﾊﾟﾝﾁ!!!!🐡( '-' 🐡 )` will be appended in the body text.

```ais
/// @ 0.12.4
### {
  name: "Fugu Punch Button"
  version: "0.0.1"
  author: "Misskey Project"
}

Plugin:register_post_form_action('Fugu Punch', @(note, rewrite) {
  let fugu = "ﾌｸﾞﾊﾟﾝﾁ!!!!🐡( '-' 🐡 )"

  if (note.text.trim() == '') {
    // Replace with Fugu Punch when no body text is present
    rewrite('text', fugu)
  } else {
    // If body has some content, append Fugu Punch and line break
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
