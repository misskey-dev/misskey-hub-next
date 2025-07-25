# Creando un Plugin

La funcionalidad de plugin del cliente web Misskey le permite extender el cliente y añadir varias características.
Este documento explica cómo crear plugins.

## Creando un Plugin

Este es un ejemplo completo de plugin.Este plugin añade un «Botón Fugu Punch» al formulario de la entrada utilizando [`Plugin:register_post_form_action`](/docs/for-developers/plugin/plugin-api-reference/#pluginregister_post_form_actiontitle-fn).

Al instalar este plugin, encontrará un elemento adicional llamado "Fugu Punch" en la sección de plugins del formulario de la entrada.Y si hace clic en el botón, `ﾌｸﾞﾊﾟﾝﾁ!!!!🐡( '-' 🐡 )` se añadirá en el cuerpo del texto.

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

Los plugins son scripts escritos con AiScript.

## Metadatos

Los plugins deben definir los metadatos del plugin como predeterminados utilizando la función de incrustación de metadatos de AiScript.Algunos ejemplos de metadatos son:

```AiScript
/// @ 0.12.4
### {
  name: "プラグイン名"
  version: "4.2.1"
  author: "作者名"
  description: "説明文"
}
```

Los metadatos son un objeto que contiene las siguientes propiedades:

### name

Nombre del plugin

### author

Autor del plugin

### version

Versión del plugin.Debe ser un número.

### description

Descripción del plugin.

### permissions

Permisos requeridos por el plugin.Se utiliza para realizar peticiones a la MisskeyAPI.

Para obtener información sobre cómo solicitar la API, consulta [AiScript Misskey Extension API Reference](/docs/for-developers/plugin/plugin-api-reference/).

:::tip

Consulta [la documentación](/docs/for-developers/api/permission/) para obtener una lista de permisos.

:::

### config

Un objeto que representa la configuración del plugin. Las claves son los nombres de los ajustes y los valores son cualquiera de las siguientes propiedades. Consulte la [Referencia de la API del complemento](./plugin-api-reference/) para obtener información sobre las API disponibles.

#### type

A string representing the setting's value type.Can be either a string, number, or boolean.Can be either a string, number, or boolean.

#### label

Nombre de la configuración que se muestra a los usuarios

#### description

Descripción del entorno

#### default

Valor por defecto del ajuste

## API

Misskey Web expone APIs para Plugins, que pueden ser utilizados para extender la funcionalidad del cliente.
Por favor, consulte [AiScript Misskey Extension API Reference](./plugin-api-reference/) para ver qué APIs están disponibles.

## Distribuyendo plugins

A partir de la versión 2023.11.0, puedes instalar el plugin directamente desde tu sitio web con un solo clic.

Si deseas proporcionar la funcionalidad de instalación de plugins, tendrás que implementar una API en tu sitio.Para más información, consulta [aquí](../publish-on-your-website.md).
