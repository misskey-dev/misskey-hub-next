---
description: 'MFM 是一种专用的标记语言，可以在 Misskey 的各个地方使用。'
---

# MFM

MFM，全称为 Markup language For Misskey，是可以在 Misskey 的各个地方使用的专用标记语言。某些语法与 Markdown 和 HTML 兼容。

:::tip

可以用来实际尝试 MFM 的 [MFM 试用角](/tools/mfm-playground/)现已推出！

:::

## 可以使用 MFM 的地方示例

- 帖子正文
- CW 注释
- 用户名
- 用户自我介绍

## 语法

### 提及

可以使用 `@`+用户名 来指示特定用户。
:::tip

关于提及的详情请看[这里](./mention.md)。

:::

```
@ai
```

<MfmPreview text="@ai"></MfmPreview>

```
@repo@p1.a9z.dev
```

<MfmPreview text="@repo@p1.a9z.dev"></MfmPreview>

### 标签

可以使用 `#`+文字 来表示话题标签。
:::tip

关于标签的详情请看[这里](./hashtag.md)。

:::

```
#misskey
```

<MfmPreview text="#misskey"></MfmPreview>

### URL

可以显示 URL。

```
https://example.com
```

<MfmPreview text="https://example.com"></MfmPreview>

### 链接

可以将部分文字和 URL 关联起来。

```
[example link](https://example.com)
```

:::tip

在链接文字前加上`?`可以不显示链接预览。

```
?[example link](https://example.com)
```

:::

<MfmPreview text="[example link](https://example.com)"></MfmPreview>

### 自定义表情符号

用冒号将自定义表情符号名围起来，可以显示自定义表情符号。

:::tip

关于自定义表情符号的详情请看[这里](./custom-emoji.md)。

:::

```
:misskey:
```

<MfmPreview text=":misskey:"></MfmPreview>

### 粗体

可以将文字显示为粗体来表示强调。

```
**粗体**
```

<MfmPreview text="**太字**"></MfmPreview>

### 缩小

可以使内容文字变小、变淡。

```
<small>通过 Misskey 扩展联邦宇宙的世界</small>
```

<MfmPreview text="<small>通过 Misskey 扩展联邦宇宙的世界</small>"></MfmPreview>

### 引用

可以用来表示引用的内容。

```
> 通过 Misskey 扩展联邦宇宙的世界
```

<MfmPreview text="> 通过 Misskey 扩展联邦宇宙的世界"></MfmPreview>

### 居中

可以将内容居中显示。

```
<center>通过 Misskey 扩展联邦宇宙的世界</center>
```

<MfmPreview text="<center>通过 Misskey 扩展联邦宇宙的世界</center>"></MfmPreview>

### 注音标示（Ruby）

可以为文字添加注音。

```
$[ruby Misskey ミスキー] 
```

<MfmPreview text="$[ruby Misskey ミスキー]"></MfmPreview>

### 代码（内嵌）

将文字中的程序代码语法高亮显示。

```
`<: "Hello, world!"`
```

### 代码（块）

语法高亮显示整块程序代码。

通过 ID 指定编程语言会应用该语言的语法高亮。可以指定以下语言：

- [Shiki支持的语言（200+）](https://shiki.style/languages)
- AiScript：通过指定 `aiscript`、`ais`或`is`来使用。

````
```ais
for (let i, 100) {
	<: if ((i % 15) == 0) "FizzBuzz"
		elif ((i % 3) == 0) "Fizz"
		elif ((i % 5) == 0) "Buzz"
		else i
}
```
````

### 翻转

将内容上下或左右翻转。

```
$[flip MisskeyでFediverseの世界が広がります]
$[flip.v MisskeyでFediverseの世界が広がります]
$[flip.h,v MisskeyでFediverseの世界が広がります]
```

<MfmPreview text="$[flip MisskeyでFediverseの世界が広がります]
$[flip.v MisskeyでFediverseの世界が広がります]
$[flip.h,v MisskeyでFediverseの世界が広がります]"></MfmPreview>

### 字体

可以设置内容所使用的字体。

```
$[font.serif MisskeyでFediverseの世界が広がります]
$[font.monospace MisskeyでFediverseの世界が広がります]
$[font.cursive MisskeyでFediverseの世界が広がります]
$[font.fantasy MisskeyでFediverseの世界が広がります]
```

<MfmPreview text="$[font.serif MisskeyでFediverseの世界が広がります]
$[font.monospace MisskeyでFediverseの世界が広がります]
$[font.cursive MisskeyでFediverseの世界が広がります]
$[font.fantasy MisskeyでFediverseの世界が広がります]"></MfmPreview>

### 模糊

可以使内容模糊。将鼠标移到上面就可以清晰看见。

```
$[blur MisskeyでFediverseの世界が広がります]
```

<MfmPreview text="$[blur MisskeyでFediverseの世界が広がります]"></MfmPreview>

### 搜索

可以显示搜索框。

```
misskey search
```

<MfmPreview text="misskey 検索"></MfmPreview>

### 文字色・背景色

可以更改文字色与背景色。

颜色使用 3、4 或 6 位颜色代码表示。

```
$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]
```

<MfmPreview text="$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]"></MfmPreview>

### 边框

可以将内容用边框围起来。还可以指定各种样式。

```
$[border.style=solid,width=4 Default]

$[border.style=hidden No border]

$[border.style=dotted,width=2 Dotted]
$[border.style=dashed,width=2 Dashed]
$[border.style=double,width=4 Double]

$[border.style=groove,width=4 Embossed A]
$[border.style=ridge,width=4 Embossed B]

$[border.style=inset,width=4 Inset A]
$[border.style=outset,width=4 Inset B]

$[border.color=d00 Border color]
$[border.width=5 Border width]

$[border.radius=6,width=2 Border radius]

$[border.radius=5,width=2,color=888 $[position.x=1.5 ＣＳＳ]
$[position.x=1.5 完全に理解した]]

$[border.radius=5,width=2,color=888,noclip $[position.x=1.5 ＣＳＳ]
$[position.x=1.5 完全に理解した]]
```

<MfmPreview text="$[border.style=solid,width=4 Default]\
$[border.style=hidden No border]\
$[border.style=dotted,width=2 Dotted]\
$[border.style=dashed,width=2 Dashed]\
$[border.style=double,width=4 Double]\
$[border.style=groove,width=4 Embossed A]\
$[border.style=ridge,width=4 Embossed B]\
$[border.style=inset,width=4 Inset A]\
$[border.style=outset,width=4 Inset B]\
$[border.color=d00 Border color]\
$[border.width=5 Border width]\
$[border.radius=6,width=2 Border radius]\
$[border.radius=5,width=2,color=888 $[position.x=1.5 ＣＳＳ]
$[position.x=1.5 完全に理解した]]\
$[border.radius=5,width=2,color=888,noclip $[position.x=1.5 ＣＳＳ]
$[position.x=1.5 完全に理解した]]"></MfmPreview>

### 旋转

旋转指定的角度。

```
$[rotate.deg=30 misskey]
```

<MfmPreview text="$[rotate.deg=30 misskey]"></MfmPreview>

### 位置偏移

可以移动位置。

```
😏$[position.x=0.8,y=0.5 🍮]😀
```

<MfmPreview text="😏$[position.x=0.8,y=0.5 🍮]😀"></MfmPreview>

### 拉伸

通过拉伸显示文本。

```
$[scale.x=4,y=2 🍮]
```

<MfmPreview text="$[scale.x=4,y=2 🍮]"></MfmPreview>

```
$[x2 x2]
$[x3 x3]
$[x4 x4]
```

<MfmPreview text="$[x2 x2]
$[x3 x3]
$[x4 x4]"></MfmPreview>

### 动画（果冻）

```
$[jelly 🍮] $[jelly.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jelly 🍮] $[jelly.speed=5s 🍮]]"></MfmPreview>

### 动画（锵锵）

```
$[tada 🍮] $[tada.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[tada 🍮] $[tada.speed=5s 🍮]]"></MfmPreview>

### 动画（跳动）

```
$[jump 🍮] $[jump.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jump 🍮] $[jump.speed=5s 🍮]]"></MfmPreview>

### 动画（回弹）

```
$[bounce 🍮] $[bounce.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[bounce 🍮] $[bounce.speed=5s 🍮]]"></MfmPreview>

### 动画（旋转）

```
$[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]
$[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]
$[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]

$[spin.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]
$[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]
$[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]
$[spin.speed=5s 🍮]]"></MfmPreview>

### 动画（微抖）

```
$[shake 🍮] $[shake.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[shake 🍮] $[shake.speed=5s 🍮]]"></MfmPreview>

### 动画（强抖）

```
$[twitch 🍮] $[twitch.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[twitch 🍮] $[twitch.speed=5s 🍮]]"></MfmPreview>

### 彩虹

```
$[rainbow 🍮] $[rainbow.speed=5s 🍮]
$[rainbow 色なし文字]
$[rainbow $[fg.color=f0f 色付き文字]]
```

<MfmPreview text="$[rainbow 🍮] $[rainbow.speed=5s 🍮]
$[rainbow 色なし文字]
$[rainbow $[fg.color=f0f 色付き文字]]"></MfmPreview>

### 闪闪发光

```
$[sparkle 🍮]
```

<MfmPreview text="$[x2 $[sparkle 🍮]]"></MfmPreview>

### 纯文本

禁用内部全部语法。

```
<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>
```

<MfmPreview text="<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>"></MfmPreview>

## 面向开发者的信息

MFM 的解析器和渲染的实现以库的形式发布，可以轻松地将 MFM 集成到客户端。

- [misskey-dev/mfm.js](https://github.com/misskey-dev/mfm.js) - JavaScript 的解析器实现
- [mfm-renderer](https://www.npmjs.com/package/mfm-renderer) - 用于 Vue.js 的组件
- [mfm.kt](https://github.com/samunohito/mfm.kt) - Kotlin 解析器实现
- [mfm_parser](https://pub.dev/packages/mfm_parser) - Dart 解析器实现
- [mfm](https://pub.dev/packages/mfm) - 用于 Flutter 的渲染组件
