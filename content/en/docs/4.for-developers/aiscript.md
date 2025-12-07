# AiScript

AiScript is a scripting language for Misskey that can be used in following features:

- [Plugins](./plugin/create-plugin/)
- [Widgets](/docs/for-users/features/widgets/)
  - Button
  - AiScript console
  - AiScript App
- [Misskey Play](./plugin/create-play/)
- Scratchpad

:::tip

The implementation of AiScript is in a separate repository from Misskey and is [open source and available here](https://github.com/aiscript-dev/aiscript).

:::

## Usage

You can use AiScript standard syntax and built-in functions.

:::tip

The document is [here](https://aiscript-dev.github.io/)  
The available AiScript version may differ depending on the version of the Misskey.To check the version, run `<: Core:v` in Scratchpad.

:::

In addition to these, Misskey-specific additional constants and functions are provided in three groups.

### Misskey AiScript API

Prefix: `Mk:`  
These are a set of constant functions available in all AiScript environments within Misskey.  
For details, please refer to the sections marked `Mk:` in the [AiScript Misskey Extension API Reference](./plugin/plugin-api-reference/).

### Plugin API

Prefix: `Plugin:`  
These are constant functions available only within [plugins](./plugin/).  
For details, refer to the sections marked `Plugin:` in the [AiScript Misskey Extension API Reference](./plugin/plugin-api-reference/).

### UI API

Prefix: `Ui:`  
Available in [Widgets](/docs/for-users/features/widgets/) (AiScript App), [Misskey Play](./plugin/create-play/), and Scratchpad.  
For details, refer to the sections marked `Ui:` in the [AiScript Misskey Extension API Reference](./plugin/plugin-api-reference/).

### Standard Input/Output

The internal implementation of the `readline` function and `print` function (and the `<:` sugar syntax) defined in the AiScript standard is provided independently by the Misskey side.

#### readline(message)

`message`: `str`  
Return value: `str`  
Can be used in all AiScript environments within Misskey.  
Display a pop-up prompting for string input.

#### print(message)

`message`: `any`  
Return value: `null`  
Available in [Widgets](/docs/for-users/features/widgets/) (AiScript Console) and Scratchpad.  
Outputs a string to the console.  
The `<:` syntax performs the same function.
