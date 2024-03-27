# Creating Plugins

The plugin feature of the Misskey Web Client allows you to extend the client and add various features to it.

## AiScript

Plugins are scripts written using AiScript.

## Metadata

Plugins must use AiScript's metadata feature to define the plugin's metadata as the default.Example of some metadata are:Example of some metadata are:Example of some metadata are:

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

Plugin version.A number must be specified.A number must be specified.A number must be specified.

### description

Plugin description

### permissions

Permissions required by the plugin.Permissions required by the plugin.Permissions required by the plugin.Used when making requests to the Misskey API.

### config

An object representing the plugin's settings. Keys are setting names and values are any of the below properties.

#### type

A string representing the setting's value type.Can be either a string, number, or boolean.Can be either a string, number, or boolean.Can be either a string, number, or boolean.

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

Please refer to the [Plugin API Reference](./plugin-api-reference/) for information on what APIs are available.If you want to provide plugin installation functionality, you will need to implement an API on your site.For more information, please see [here](./publish-on-your-website.md).For more information, please see [here](./publish-on-your-website.md).
