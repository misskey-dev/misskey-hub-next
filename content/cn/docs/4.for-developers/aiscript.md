#

AiScript是Misskey所使用的脚本语言。

- [插件](./plugin/create-plugin/)
- [小工具](/docs/for-users/features/widgets/)
  - 按钮
  - AiScript 控制台
  - AiScript App
-
- AiScript 控制台

:::tip

AiScript的实现是一个独立于Misskey的存储库，并且[以开源形式发布](https://github.com/aiscript-dev/aiscript)。

:::

## 用法

可以使用标准AiScript语法和内置函数。

:::tip

文件可在此处查阅：https://github.com/aiscript-dev/aiscript/tree/master/docs\
可用的AiScript版本可能会因Misskey体版本而异。要检查版本，请在Scratchpad上运行`<: Core:v`。

:::

除此之外，还提供了三组专用于Misskey的内置常量和函数。

###

前缀： `Mk:`\
它是一组恒函数，可以在Misskey中的所有AiScript环境中使用。
有关更多信息，请参见[AiScript Misskey扩展API参考](./请参照plugin/plugin-api-reference/)中标有`Mk:`的部分。

### 插件 API

前缀： `Plugin:`\
[Plugin](./plugin/)一起使用的固定函数组。
有关更多信息，请参见[AiScript Misskey扩展API参考](./plugin/plugin-api-reference/)中带有`Plugin:`的部分。

###

接頭辞: `Ui:`\
[ウィジェット](/docs/for-users/features/widgets/)（AiScript App）、Misskey Play、Scratchpadで使用できます。
ドキュメントは未整備（TODO）ですが、インターネット上に有志の方が執筆された解説記事があります。

### 标准 O/I

在AiScript标准中定义的“readline”和“print”函数（以及“<:”语法）的内部实现是由Misskey提供的。

#### readline(message)

`message`: `str`\
返回值: `str`\
它可以在Misskey中的所有AiScript环境中使用。\
\
显示弹出窗口，提示您输入字符串。

#### print(message)

`message`: `any`\
返回值: `null`\
[ウィジェット](/docs/for-users/features/widgets/)（AiScript控制台），可与Scratchpad一起使用。\
\
将字符串打印到控制台。\
\
`<:`也做同样的工作。
