# AiScript

AiScript是Misskey所使用的脚本语言。

- [插件](./plugin/create-plugin/)
- [小工具](/docs/for-users/features/widgets/)
  - 按钮
  - AiScript 控制台
  - AiScript App
- [Misskey Play](./plugin/create-play/)
- AiScript 控制台（Scratchpad）

:::tip

AiScript 的实现位于与 Misskey 不同的仓库中，并以[开源方式公开](https://github.com/aiscript-dev/aiscript)。

:::

## 用法

可以使用 AiScript 标准的语法与内置函数。

:::tip

文件请参考[此处](https://aiscript-dev.github.io/)  
根据 Misskey 本体的版本不同，可使用的 AiScript 版本可能会有所差异。若要确认版本，请在 Scratchpad 等处执行 `<: Core:v`。

:::

除此之外，还提供了分为 3 个组的 Misskey 专用内置常量与函数。

### Misskey AiScript API

前缀： `Mk:`  
这是可在 Misskey 内所有 AiScript 环境中使用的常量与函数群。
详情请参阅 [AiScript Misskey 扩展 API 参考文档](./plugin/plugin-api-reference/)中带有 Mk: 的部分。

### 插件 API

前缀： `Plugin:`  
这是仅限在[插件](./plugin/)中使用的常量与函数群。
详情请参阅 [AiScript Misskey 扩展 API 参考文档](./plugin/plugin-api-reference/)中带有 Plugin: 的部分。

### 用户界面（UI）API

前缀: `Ui:`  
可以在[小工具](/docs/for-users/features/widgets/)（AiScript App）、Misskey Play、Scratchpad 内使用。
详情请参阅 [AiScript Misskey 扩展 API 参考文档](./plugin/plugin-api-reference/)中带有 Ui: 的部分。

### 标准 I/O

AiScript 标准定义的 `readline` 函数与 `print` 函数（以及 `<:` 语法糖）的内部实现，是由 Misskey 端独自提供的。

#### readline(message)

`message`: `str`  
返回值: `str`  
可在 Misskey 内所有 AiScript 环境中使用。  
\
显示要求输入字符串的弹出窗口。

#### print(message)

`message`: `any`  
返回值: `null`  
[小工具](/docs/for-users/features/widgets/)（AiScript控制台），可与Scratchpad一起使用。  
\
将字符串输出至控制台。  
\
`<:` 语法糖也具有相同的作用。
