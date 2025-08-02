# Referencia de la API ampliada de AiScript Misskey

Esta sección presenta la API AiScript extendida para Misskey.

:::tip

La documentación de la API estándar de AiScript se encuentra  [aquí](https://aiscript-dev.github.io/guides/get-started.html).

:::

## Constantes comunes para todos los casos de uso

### `USER_ID`

ID del usuario actual

### `USER_NAME`

Nombre del usuario actual.

### `USER_USERNAME`

Handle (Nombre de usuario)  del usuario actual (la parte después de la `@`.e.g. `@ai@example.com` → `ai`)

### `CUSTOM_EMOJIS`

La matriz de los emojis personalizados.Una matriz de objetos de los siguientes tipos:

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

El idioma actual de visualización de Misskey Web.Formato RFC4646 compatible  (e.j. `ja-JP`)

### `SERVER_URL`

La URL del servidor actual.Se representa mediante un origen, como `https://www.example.com`.

## Funciones comunes para todos los casos de uso

### `Mk:dialog(title, text, type)`

Mostrar un cuadro de diálogo.Se pueden establecer los siguientes valores para el tipo.\
`info` `success` `warning` `error` `question`\
Si se omite será `info`.

### `Mk:toast(text)`

Muestra un toast.A diferencia de los diálogos, no requiere que el usuario cierre el diálogo, por lo que puede utilizarse para notificaciones sencillas, como cuando se ha completado alguna operación.

**El lanzamiento de esta función está previsto para 2025.5.1 (nombre provisional).**

### `Mk:confirm(title, text, type)`

Muestra un diálogo de confirmación.Se pueden establecer los siguientes valores para el tipo.\
`info` `success` `warning` `error` `question`\
Si se omite será `question`.\
Devuelve `true` si el usuario selecciona "OK" o `false` si el usuario selecciona "cancel".

```AiScript
let response = Mk:confirm(
  '¿Estás seguro de que quieres continuar?'
  'Esta operación no se puede deshacer. Compruébalo cuidadosamente.'
  'warning'
)

if (response) {
  // Cuando el usuario hace clic en "OK"
} else {
  // Cuando el usuario hace clic en "Cancelar"
}
```

### `Mk:api(endpoint, params, token?)`

Realiza una solicitud a la API de Misskey.Realiza una petición a la API de Misskey.Pasa el nombre del endpoint como primer argumento y el objeto parámetro como segundo argumento.

También puedes incluir el token de API como tercer argumento.Cuando se llama dentro de un plugin, si se especifica `permissions` en el bloque de metadatos, se utilizará el token con los permisos especificados si no se especifica el tercer argumento.

:::tip

Consulta [la documentación](/docs/for-developers/api/permission/) para obtener una lista de permisos.

:::

```AiScript
### {
  name: "プラグイン名",
  version: "4.2.1",
  author: "作者名",
  description: "説明文",
  permissions: ['write:notes'],
}

@onClick() {
  let res = Mk:api('notes/create', {
    text: '¡Hola desde un plugin!'
  })
}
```

### `Mk:save(key, value)`

Guarda de forma persistente una clave arbitraria con cualquier valor dado.Guarda de forma persistente una clave arbitraria con cualquier valor dado. El valor guardado permanecerá después de que finalice el contexto AiScript y puede cargarse con Mk:load.

### `Mk:load(key)`

Lee el valor del nombre especificado guardado por Mk:save.

### `Mk:remove(key)`

NOTA: Esta función estará disponible en Misskey v2025.1.0 (nombre provisional) o posterior.

Elimina el valor del nombre especificado y guardado por Mk:save.Si el valor con el nombre especificado no existe, no se hace nada.

### `Mk:url()`

Obtiene la URL de la página abierta actualmente (la URL que aparece en la barra de direcciones del navegador).

### `Mk:nyaize(text)`

Nyatiniza el texto especificadoNo se tiene en cuenta la sintaxis MFM, etc.

## Funciones/Constantes sólo disponibles para plugins

### `Plugin:register_post_form_action(title, fn)`

Añade una acción en el formulario del post.Pasa el nombre de la acción como primer argumento y la función de devolución de llamada cuando se selecciona la acción como segundo argumento.\
A la función callback se le pasa el `text` y `cw` del objeto formulario enviado como primer argumento, y la función para reescribirlos como segundo argumento.

```AiScript
Plugin:register_post_form_action('Nombre del elementos que aparece en el menú', @(note, rewrite) {

  // Hacer algunos cambios a la nota...
  rewrite('text', `{note.text}{Str:lf}#examplehashtag`)
})
```

### `Plugin:register_note_action(title, fn)`

Añade una acción en el menú de notas.El primer argumento es el nombre del elemento y el segundo es la función de devolución de llamada cuando se selecciona el elemento.\
A la función callback se le pasa un objeto nota destino como primer argumento.

```AiScript
Plugin:register_note_action('Nombre del elemento que aparece en el menú', @(note) {

  // Haz algo con la nota...
  Mk:api('notes/create', {
    text: 'Esto es una cita'
    renoteId: note.id
  })

})
```

### `Plugin:register_user_action(title, fn)`

Añade una acción en el menú de usuario.El primer argumento es el nombre del elemento y el segundo es la función de devolución de llamada cuando se selecciona el elemento.\
A la función callback se le pasa un objeto de usuario destino como primer argumento.

```AiScript
Plugin:register_note_action('Nombre del elemento que aparece en el menú', @(user) {

  // Hacer algo con la información del usuario...
  Mk:api('notes/create', {
    text: `{user.name},¡Bienvenido a nuestro servidor/instancia!`
  })

})
```

### `Plugin:register_note_view_interruptor(fn)`

Reescribe la información de la nota mostrada en la interfaz de usuario.\
A la función callback se le pasa un objeto nota destino como primer argumento.\
La nota se reescribirá con el valor de retorno de la función callback.\
Devuelve `null` para ocultarlo.

```AiScript
Plugin:register_note_view_interruptor(@(note) {
  
  // Haz algún cambio en la nota...
  note.text = note.text.replace('manzana', 'plátano')

  // Return null to make it hidden
  if (note.text.incl('natto')) {
    return null
  }

  return note
})
```

### `Plugin:register_note_post_interruptor(fn)`

Reescribir la información de las notas al publicarlas.\
El objeto de nota de destino se pasa a la función de callback como primer argumento.\
La nota se reescribirá con el valor de retorno de la función callback.

```AiScript
Plugin:register_note_post_interruptor(@(note) {
  
  // Haz algún cambio a la nota...
  note.text = note.text.replace('apple', 'banana')

  return note
})
```

### `Plugin:register_page_view_interruptor(fn)`

Reescribe la información de la página mostrada en la interfaz de usuario.\
A la función callback se le pasa un objeto Page de destino como primer argumento.\
La Página se reescribe con el valor de retorno de la función callback.

```AiScript
Plugin:register_note_post_interruptor(@(page) {
  
  // Haz algún cambio en la página...

  return page
})
```

### `Plugin:open_url(url)`

Abre la URL dada como primer parámetro en una nueva pestaña del navegador.

### `Plugin:config`

Un objeto que contiene la configuración del plugin.Los valores establecidos en la configuración de la definición del plugin se guardan en las claves del objeto.

## Constantes sólo disponibles para Play

### `THIS_ID`

ID del Play

### `THIS_URL`

La URL del Play

## Funciones UI API (disponibles para los widgets Play y AiScript App)

### `Ui:root`

El componente raíz de la interfaz de usuario.

### `Ui:render([ ...components ])`

Azúcar sintáctico para `Ui:root.update({ children: [ ...components ] })`Reescribe el root de la interfaz de usuario.

```AiScript
Ui:render([
  Ui:C:text({text: "A"})
  Ui:C:button({text: "B", onClick: @(){}})
])
```

### `Ui:get(id)`

Recupera y manipula el componente asociado al ID.

```AiScript
Ui:C:text({text: "A"}, "text1")
Ui:get("text1").update({text: "B"})
```

## Funciones de los componentes (disponibles en los widgets Play y AiScript App)

En todas las funciones siguientes, el ID del componente puede especificarse como segundo argumento durante la inicialización, como en `Ui:C:xxx(props id)` (esta declaración se omite en la siguiente referencia).El id dado puede recuperarse con la función `Ui:get(id)` y el contenido del componente puede cambiarse directamente con la función `update` (véase la referencia `Ui:get(id)` para más información).

### Layout

#### `Ui:C:container`

Marco exterior (contenedor) con formato para la alineación del texto, color, etc.

```AiScript
Ui:C:container({ 
 children: [ 
 // Matriz (también llamado Array) de componentes que desea colocar dentro del contenedor 
 Ui:C:text({text: "A"}) 
 ] 
 align: 'center' // anchura izquierda,centro,derecha 
 bgColor: '#000' // color de fondo
  fgColor: '#00f' // color del texto 
 font: 'serif' // font serif,sans-serif,monospace 
 borderWidth: 1 // ancho del borde 
 borderColor: '#f00' // color del borde 
 borderStyle: 'solid' // patrón del borde
  padding: 1 // anchura del margen 
 rounded: false // esquinas redondeadas 
 borderRadius: 1 // esquinas redondeadas (especifica el grado numérico de redondez) 
 hidden: false // oculto 
})
```

#### `Ui:C:folder`

Componentes de acordeón (contenedores que los usuarios pueden abrir y cerrar)

```AiScript
Ui:C:folder({ 
 children: [ 
 // array de componentes que quieras poner dentro del contenedor 
 Ui:C:text({text: "A"}) 
 ] 
 title: "title" // título a incluir en la parte de apertura y cierre de la carpeta 
 opened: true // abrir desde el principio 
})
```

### Texto

#### `Ui:C:text`

Texto plano

```AiScript
Ui:C:text({ 
 text: "contenido" // texto a mostrar 
 size: 1 // tamaño del texto 
 bold: false // negrita 
 color: '#000' // color 
 font: 'monospace' // tipo de fuente: serif,sans-serif,monospace 
})
```

#### `Ui:C:mfm`

Habilita el texto MFM

```AiScript
Ui:C:mfm({ 
 text: "content" // texto a mostrar 
 size: 1 // tamaño de carácter 
 bold: false // negrita 
 color: '#000' // color 
 font: 'monospace' // fuente serif,sans-serif,monospace 
 onClickEv : @(id) { 
 // Gestor de sintaxis MFM para $[clickable.ev=eventId TEXT] 
 <: `{id} clicked` 
 } 
})
```

### Formularios

#### `Ui:C:button`

Botón

```AiScript
Ui:C:button({ 
 text: "button" // texto a mostrar en el botón 
 onClick: @() { 
 // evento al pulsar 
 } 
 primary: false // ¿color?
  rounded: false // ¿esquinas redondeadas?
  disabled: false // ¿desactivar?
})
```

#### `Ui:C:buttons`

Botones apilados horizontalmente

```AiScript
Ui:C:buttons({ 
 buttons: [ // array de definiciones de los botones; el formato para especificar props es el mismo que Ui:C:button 
 {text: "a", onClick: @(){...}}
    {text: "b", onClick: @(){...}}
  ] 
})
```

#### `Ui:C:switch`

```AiScript
Ui:C:switch({ 
 onChange: @(enabled) { 
 // Evento cuando se cambia. El primer argumento es el estado tras el cambio (booleano) 
 } 
 default: false // valor por defecto 
 label: "label" // texto junto al interruptor 
 caption: "caption" // texto auxiliar a mostrar bajo el interruptor 
})
```

#### `Ui:C:textInput`

Introducción de texto en una sola línea

```AiScript
Ui:C:textInput({ 
 onInput: @(text) { 
 // Evento cuando se realiza la entrada. El primer argumento es el valor modificado 
 } 
 default: "default" // valor por defecto 
 label: "label" // texto encima del campo de entrada 
 caption: "caption" // texto auxiliar que se mostrará debajo del campo de entrada 
})
```

#### `Ui:C:numberInput`

Introducción de texto en una sola línea

```AiScript
Ui:C:numberInput({ 
 onInput: @(number) { 
 // Evento cuando se introduce. El primer argumento es el valor después del cambio 
 } 
 default: "default" // valor por defecto 
 label: "label" // texto encima del campo de entrada 
 caption: "caption" // texto auxiliar que se mostrará debajo del campo de entrada 
})
```

#### `Ui:C:textarea`

Introducción de texto multilínea

```AiScript
Ui:C:textarea({ 
 onInput: @(text) { 
 // Evento cuando se realiza la entrada. El primer argumento es el valor después del cambio 
 } 
 default: "default" // valor por defecto 
 label: "label" // texto encima del campo de entrada 
 caption: "caption" // texto auxiliar que se mostrará debajo del campo de entrada 
})
```

#### `Ui:C:select`

Forma de elegir uno entre varios valores.

```AiScript
Ui:C:select({ 
 items: [ // array de opciones, donde text es el texto a mostrar y value es el valor a pasar en el evento cuando se cambie 
 {text: "A", value: "v1"} 
 {text: "B", value: "v2"} 
 ] 
 onChange: @(value){ 
 // Evento cuando cambia. Valor después del cambio como primer argumento 
 } 
 default: "v1" // valor por defecto 
 label: "label" // texto encima del campo de entrada 
 caption: "caption" // texto auxiliar mostrado debajo del campo de entrada 
})
```

### Relacionado con la publicación de notas

#### `Ui:C:postForm`

Incrustar el formulario de publicación directamente en Play

```AiScript
Ui:C:postForm({ 
 form: { 
 cw: "CW annotation" // texto de "resumen" si se especifica CW 
 text: "post content" // cadena por defecto para post form

    // Se puede especificar lo siguiente en Misskey v2024.5.0 y posteriores 
 visibility: "home" // rango por defecto post public (public si no se especifica) 
 localOnly: false // sin coalición por defecto o no (false si no se especifica) 
 } 
})
```

#### `Ui:C:postFormButton`

Botón especial para lanzar el modal del formulario de publicación

```AiScript
Ui:C:postFormButton({ 
 text: "¡Publicar!" // texto a mostrar en el botón 
 primary: false // ¿colorearlo?
  rounded: false // ¿esquinas redondeadas?
  form: { 
 cw: "CW annotation" // texto "Resumen" si se especifica CW 
 text: "Post content" // cadena por defecto para post form

    // Se puede especificar lo siguiente en Misskey v2024.5.0 y posteriores 
 visibility: "home" // Ámbito público por defecto de las entradas (público si no se especifica) 
 localOnly: false // Si no hay coalición por defecto (falso si no se especifica) 
 } 
})
```
