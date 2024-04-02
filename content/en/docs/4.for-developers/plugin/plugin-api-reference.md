# Plugin API Reference

## `Mk:dialog(title text type)`

Display a dialog box.The following values ​​can be set for type.\
`info` `success` `warn` `error` `question`\
If omitted, it will be `info`.

## `Mk:confirm(title text type)`

Display a confirmation dialog.The following values ​​can be set for type.\
`info` `success` `warn` `error` `question`\
If omitted, it will be `question`.Display a confirmation dialog.The following values ​​can be set for type.\
`info` `success` `warn` `error` `question`\
If omitted, it will be `question`.\
Returns `true` if the user selects "OK" or `false` if the user selects "cancel".

## `Mk:api(endpoint params)`

Make a request to the Misskey API.Make a request to the Misskey API.Passes the endpoint name as the first argument and the parameter object as the second argument.

## `Mk:save(key value)`

Persistently saves an arbitrary key with any given value.Persistently saves an arbitrary key with any given value.The saved value will remain after the AiScript context ends and can be loaded with Mk:load.

## `Mk:load(key)`

Reads the value of the specified name saved by Mk:save.

## `Plugin:register_post_form_action(title fn)`

Adds an action in the post form.Adds an action in the post form.Passes the name of the action as the first argument and the callback function when the action is selected as the second argument.The post form object is passed to the callback function as the first argument.Display a dialog box.The following values ​​can be set for type.\
`info` `success` `warn` `error` `question`\
If omitted, it will be `info`.

## `Plugin:register_note_action(title fn)`

Adds an action in the note menu.Passes the name of the item as the first argument and the callback function when the action is selected as the second argument.Rewrite note information when posting notes.\
The target note object is passed to the callback function as the first argument.\
The note will be rewritten with the return value of the callback function.

## `Plugin:register_user_action(title fn)`

Adds an action in the user menu.Passes the name of the item as the first argument and the callback function when the action is selected as the second argument.Adds an action in the user menu.Passes the name of the item as the first argument and the callback function when the action is selected as the second argument.\
The target user object is passed to the callback function as the first argument.

## `Plugin:register_note_view_interruptor(fn)`

Rewrites the note information displayed on the UI.Rewrites the note information displayed on the UI.\
The target note object is passed to the callback function as the first argument.\
The note will be rewritten with the return value of the callback function.\
The note will be rewritten with the return value of the callback function.

## `Plugin:register_note_post_interruptor(fn)`

Rewrite note information when posting notes.Adds an action in the note menu.Passes the name of the item as the first argument and the callback function when the action is selected as the second argument.\
The target note object is passed to the callback function as the first argument.\
The note will be rewritten with the return value of the callback function.

## `Plugin:register_page_view_interruptor(fn)`

Page閲覧時にPage情報を書き換えます。\
コールバック関数には、第一引数に対象のPageオブジェクトが渡されます。\
コールバック関数の返り値でPageが書き換えられます。

## `Plugin:open_url(url)`

Opens the URL given as the first parameter in a new browser tab.

## `Plugin:config`

An object containing the plugin settings.The values set in the plugin definition's config are saved in the object keys.The values set in the plugin definition's config are saved in the object keys.
