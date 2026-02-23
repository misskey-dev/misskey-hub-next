# AiScript Misskey Extended API Reference

This section introduces the AiScript API extended for Misskey.

:::tip

Documentation for the standard AiScript API can be found [here](https://aiscript-dev.github.io/guides/get-started.html).

:::

## Common constants for all use cases

### `USER_ID`

ID of the current user

### `USER_NAME`

Display name of the current user

### `USER_USERNAME`

Current user's handle (the part after `@`.  e.g. `@ai@example.com` → `ai`)

### `CUSTOM_EMOJIS`

The array of custom emojis.An array of objects of the following types:

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

The current Misskey Web display language.RFC4646 compatible format (e.g. `ja-JP`)

### `SERVER_URL`

The URL of the current server.It is represented by an origin, such as `https://www.example.com`.

## Common functions for all use cases

### `Mk:dialog(title, text, type)`

Display a dialog box.The following values ​​can be set for type.\
`info` `success` `warning` `error` `question`\
If omitted, it will be `info`.

### `Mk:toast(text)`

Display a toast.Unlike dialogs, it does not require the user to close the dialog, so it can be used for simple notifications such as when some operation has been completed.

### `Mk:confirm(title, text, type)`

Display a confirmation dialog.The following values ​​can be set for type.\
`info` `success` `warning` `error` `question`\
If omitted, it will be `question`.\
Returns `true` if the user selects "OK" or `false` if the user selects "cancel".

```AiScript
let response = Mk:confirm(
  'Are you sure to continue?'
  'Please be sure to check again as it is not possible to roll back.'
  'warning'
)

if (response) {
  // When user clicks "OK"
} else {
  // When user clicks "Cancel"
}
```

### `Mk:api(endpoint, params, token?)`

Make a request to the Misskey API.Passes the endpoint name as the first argument and the parameter object as the second argument.

You can also include API token as the third argument.When called within a plugin, if `permissions` are specified in the metadata block, the token with the specified permission(s) will be used if the third argument is not specified.

:::tip

Refer to [this document](/docs/for-developers/api/permission/) for a list of permissions.

:::

```AiScript
### {
  name: "Plugin name",
  version: "4.2.1",
  author: "Author name",
  description: "Description",
  permissions: ['write:notes'],
}

@onClick() {
  let res = Mk:api('notes/create', {
    text: 'Hello from plugin!'
  })
}
```

### `Mk:save(key, value)`

Persistently saves an arbitrary key with any given value.The saved value will remain after the AiScript context ends and can be loaded with Mk:load.

### `Mk:load(key)`

Reads the value of the specified name saved by Mk:save.

### `Mk:remove(key)`

NOTE: This feature will be available in Misskey v2025.1.0 (tentative name) or later.

Deletes the value of the specified name saved by Mk:save.If the value of the specified name does not exist, then does nothing.

### `Mk:url()`

Get the URL of the page that is currently open (the URL currently displayed in the browser address bar).

### `Mk:nyaize(text)`

Nyaizes the specified text.The MFM syntax, etc. are not taken into account.

## Functions/Constants only available for plugins

### `Plugin:register_post_form_action(title, fn)`

Adds an action in the post form.Passes the name of the action as the first argument and the callback function when the action is selected as the second argument.The callback function is passed the `text` and `cw` of the submitted form object as its first argument, and the function to rewrite them as its second argument.

```AiScript
Plugin:register_post_form_action('Item name displayed on the menu', @(note, rewrite) {

  // Make some change to the note...
  rewrite('text', `{note.text}{Str:lf}#examplehashtag`)
})
```

### `Plugin:register_note_action(title, fn)`

Adds an action in the note menu.Passes the name of the item as the first argument and the callback function when the action is selected as the second argument.\
The target note object is passed to the callback function as the first argument.

```AiScript
Plugin:register_note_action('Item name displayed on the menu', @(note) {

  // Do something with the note...
  Mk:api('notes/create', {
    text: 'This is quote'
    renoteId: note.id
  })

})
```

### `Plugin:register_user_action(title, fn)`

Adds an action in the user menu.Passes the name of the action as the first argument and the callback function when the action is selected as the second argument.\
The target user object is passed to the callback function as the first argument.

```AiScript
Plugin:register_note_action('Item name displayed on the menu', @(user) {

  // Do something with the user info...
  Mk:api('notes/create', {
    text: `{user.name}, welcome to our server!`
  })

})
```

### `Plugin:register_note_view_interruptor(fn)`

Rewrites the note information displayed on the UI.\
The target note object is passed to the callback function as the first argument.\
The note will be rewritten with the return value of the callback function.\
Return `null` to make it hidden.

:::warning

Starting with v2025.8.0, this function will be executed **synchronously**.
Functions that internally perform asynchronous processing (such as `Mk:api`) cannot be executed and will result in an error.

Additionally, synchronous execution means that all other JavaScript processing stops while the plugin is running.This means that compared to other plugin hooks, if problematic scripts (such as infinite loops) are executed, they could have a significant impact on the host JavaScript environment.Please use this with caution.

:::

```AiScript
Plugin:register_note_view_interruptor(@(note) {
  
  // Make some change to the note...
  note.text = note.text.replace('apple', 'banana')

  // Return null to make it hidden
  if (note.text.incl('natto')) {
    return null
  }

  return note
})
```

### `Plugin:register_note_post_interruptor(fn)`

Rewrite note information when posting notes.\
The target note object is passed to the callback function as the first argument.\
The note will be rewritten with the return value of the callback function.

```AiScript
Plugin:register_note_post_interruptor(@(note) {
  
  // Make some change to the note...
  note.text = note.text.replace('apple', 'banana')

  return note
})
```

### `Plugin:register_page_view_interruptor(fn)`

Rewrites the Page information displayed on the UI.\
The target page object is passed to the callback function as the first argument.\
The page will be rewritten with the return value of the callback function.

```AiScript
Plugin:register_note_post_interruptor(@(page) {
  
  // Make some change to the page...

  return page
})
```

### `Plugin:open_url(url)`

Opens the URL given as the first parameter in a new browser tab.

### `Plugin:config`

An object containing the plugin settings.The values set in the plugin definition's config are saved in the object keys.

## Constants only available for Play

### `THIS_ID`

ID of the Play

### `THIS_URL`

The URL of the Play

## UI API functions (available for Play and AiScript App widgets)

### `Ui:root`

The root component of the UI.

### `Ui:render([ ...components ])`

Syntax sugar for `Ui:root.update({ children: [ ...components ] })`.Rewrites the root of the UI.

```AiScript
Ui:render([
  Ui:C:text({text: "A"})
  Ui:C:button({text: "B", onClick: @(){}})
])
```

### `Ui:get(id)`

Retrieve and manipulate the component associated with the ID.

```AiScript
Ui:C:text({text: "A"}, "text1")
Ui:get("text1").update({text: "B"})
```

## Component functions (available for Play and AiScript App widgets)

In all of the following functions, the component ID can be specified as the second argument during initialization, as in `Ui:C:xxx(props id)` (this statement is omitted in the following reference).The specified ID can be obtained with the `Ui:get(id)` function, and the content of the component can be directly modified with the `update` function (see the `Ui:get(id)` reference for details).

### Layout

#### `Ui:C:container`

Outer frame (container) with formatting for text alignment, color, etc.

```AiScript
Ui:C:container({
  children: [
    // Array of components you want to put inside the container
    Ui:C:text({text: "A"})
  ]
  align: 'center' // Alignment: left, center, right
  bgColor: '#000' // Background color
  fgColor: '#00f' // Text color
  font: 'serif' // Font: serif, sans-serif, monospace
  borderWidth: 1 // Border width
  borderColor: '#f00' // Border color
  borderStyle: 'solid' // Border style
  padding: 1 // Padding width
  rounded: false // Make corners rounded
  borderRadius: 1 // Border radius (Specify the degree of roundness numerically)
  hidden: false // Hide
})
```

#### `Ui:C:folder`

Accordion components (containers that users can open and close)

```AiScript
Ui:C:folder({
  children: [
    // Array of components you want to put inside the container
    Ui:C:text({text: "A"})
  ]
  title: "Title" // Title displayed on the folder's toggle section
  opened: true // Whether it is opened by default
})
```

### Text

#### `Ui:C:text`

Plain text

```AiScript
Ui:C:text({
  text: "Content" // Text to display
  size: 1 // Text size
  bold: false // Bold
  color: '#000' // Color
  font: 'monospace' // Font: serif, sans-serif, monospace
})
```

#### `Ui:C:mfm`

MFM-enabled text

```AiScript
Ui:C:mfm({
  text: "Content" // Text to display
  size: 1 // Text size
  bold: false // Bold
  color: '#000' // Color
  font: 'monospace' // Font: serif, sans-serif, monospace
  onClickEv: @(id) {
    // Handler for the MFM syntax $[clickable.ev=eventId TEXT]
    <: `{id} clicked`
  }
})
```

### Forms

#### `Ui:C:button`

Button

```AiScript
Ui:C:button({
  text: "Button" // Text displayed on the button
  onClick: @() {
    // Event triggered when clicked
  }
  primary: false // Whether to apply the primary color style?
  rounded: false // Whether to make corners rounded?
  disabled: false // Whether to disable it?
})
```

#### `Ui:C:buttons`

Horizontally stacked buttons

```AiScript
Ui:C:buttons({
  buttons: [ // Array of button definitions. The format for specifying props is the same as Ui:C:button
    {text: "a", onClick: @(){...}}
    {text: "b", onClick: @(){...}}
  ]
})
```

#### `Ui:C:switch`

```AiScript
Ui:C:switch({
  onChange: @(enabled) { 
    // Event triggered when changed. The first argument is the new state (boolean)
  }
  default: false // Default value
  label: "Label" // Text next to the switch
  caption: "Caption" // Helper text displayed below the switch
})
```

#### `Ui:C:textInput`

Single line text input

```AiScript
Ui:C:textInput({
  onInput: @(text) {
    // Event triggered when input is provided. The first argument is the new value
  }
  default: "Default" // Default value
  label: "Label" // Text above the input field
  caption: "Caption" // Helper text displayed below the input field
})
```

#### `Ui:C:numberInput`

Single line number input

```AiScript
Ui:C:numberInput({
  onInput: @(number) {
    // Event triggered when input is provided. The first argument is the new value
  }
  default: "Default" // Default value
  label: "Label" // Text above the input field
  caption: "Caption" // Helper text displayed below the input field
})
```

#### `Ui:C:textarea`

Multiline text input

```AiScript
Ui:C:textarea({
  onInput: @(text) {
    // Event triggered when input is provided. The first argument is the new value
  }
  default: "Default" // Default value
  label: "Label" // Text above the input field
  caption: "Caption" // Helper text displayed below the input field
})
```

#### `Ui:C:select`

Select one of several values

```AiScript
Ui:C:select({
  items: [ // Array of choices. Enter the text to display in 'text', and the value to pass in the change event in 'value'
    {text: "A", value: "v1"}
    {text: "B", value: "v2"}
  ]
  onChange: @(value){
    // Event triggered when changed. The first argument is the new value
  }
  default: "v1" // Default value
  label: "Label" // Text above the input field
  caption: "Caption" // Helper text displayed below the input field
})
```

### Post forms

#### `Ui:C:postForm`

Embed the post form directly into Play

```AiScript
Ui:C:postForm({
  form: {
    cw: "CW Annotation" // "Summary" text when specifying a CW (Content Warning)
    text: "Post content" // Default string for the post form

    // The following can be specified in Misskey v2024.5.0 and later
    visibility: "home" // Default post visibility (public if not specified)
    localOnly: false // Whether the post is local-only by default (false if not specified)
  }
})
```

#### `Ui:C:postFormButton`

Special button to launch the post form modal

```AiScript
Ui:C:postFormButton({
  text: "Post!" // Text displayed on the button
  primary: false // Whether to apply the primary color style?
  rounded: false // Whether to make corners rounded?
  form: {
    cw: "CW Annotation" // "Summary" text when specifying a CW (Content Warning)
    text: "Post content" // Default string for the post form

    // The following can be specified in Misskey v2024.5.0 and later
    visibility: "home" // Default post visibility (public if not specified)
    localOnly: false // Whether the post is local-only by default (false if not specified)
  }
})
```
