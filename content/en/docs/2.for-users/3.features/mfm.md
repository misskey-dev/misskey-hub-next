---
description: 'MFM is a proprietary markup language that can be used in various locations in Misskey.'
---

# MFM

MFM, short for Markup language For Misskey, is a proprietary markup language that can be used in various locations in Misskey.Some of its syntax is compatible with Markdown and HTML.

:::tip

Visit [MFM Playground](/tools/mfm-playground/) to try MFM for yourself!

:::

## Examples of places where MFM can be used

- The text of a note
- Content warning annotation
- Names of users
- User bios

## Syntax

### Mentions

`@` + username can be used to display a specific user.
:::tip

For more information about mentions, see [here](./mention.md).

:::

```
@ai
```

<MfmPreview text="@ai"></MfmPreview>

```
@repo@p1.a9z.dev
```

<MfmPreview text="@repo@p1.a9z.dev"></MfmPreview>

### Hashtags

`#` + tag can be used to display a hashtag.
:::tip

For more information about hashtags, see [here](./hashtag.md).

:::

```
#misskey
```

<MfmPreview text="#misskey"></MfmPreview>

### URL

URLs can be displayed.

```
https://example.com
```

<MfmPreview text="https://example.com"></MfmPreview>

### Links

Specific parts of text can be displayed as a URL.

```
[example link](https://example.com)
```

:::tip

You can hide the link preview by prefixing the link text with `? `.

```
?[example link](https://example.com)
```

:::

<MfmPreview text="[example link](https://example.com)"></MfmPreview>

### Custom Emoji

Custom emoji can be displayed by surrounding the emoji name with colons.

:::tip

For more information about custom emoji, see [here](./custom-emoji.md).

:::

```
:misskey:
```

<MfmPreview text=":misskey:"></MfmPreview>

### Bold

Bolds text for emphasis.

```
**太字**
```

<MfmPreview text="**太字**"></MfmPreview>

### Shrink

Displays content smaller and thinner.

```
<small>MisskeyでFediverseの世界が広がります</small>
```

<MfmPreview text="<small>MisskeyでFediverseの世界が広がります</small>"></MfmPreview>

### Quote

Displays content as a quote.

```
> MisskeyでFediverseの世界が広がります
```

<MfmPreview text="> MisskeyでFediverseの世界が広がります"></MfmPreview>

### Center align

Displays content centered.

```
<center>MisskeyでFediverseの世界が広がります</center>
```

<MfmPreview text="<center>MisskeyでFediverseの世界が広がります</center>"></MfmPreview>

### Yomigana (Ruby characters)

Yomigana can be attached to text.

```
$[ruby Misskey ミスキー] 
```

<MfmPreview text="$[ruby Misskey ミスキー]"></MfmPreview>

### Code (Inline)

Displays syntax highlighting for code from programs inline.

```
`<: "Hello, world!"`
```

### Code (Block)

Displays multi-line syntax highlighting for code from programs in a block.

By specifying the programming language by ID, you can apply syntax highlighting in that language.Available languages are:

- [Languages supported by Shiki (200+)](https://shiki.style/languages)
- AiScript: Specify one of `aiscript`, `ais`, or `is` to use.

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

### Flip

Flips content horizontally or vertically.

```
$[flip MisskeyでFediverseの世界が広がります]
$[flip.v MisskeyでFediverseの世界が広がります]
$[flip.h,v MisskeyでFediverseの世界が広がります]
```

<MfmPreview text="$[flip MisskeyでFediverseの世界が広がります]
$[flip.v MisskeyでFediverseの世界が広がります]
$[flip.h,v MisskeyでFediverseの世界が広がります]"></MfmPreview>

### Font

Sets the font to display content in.

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

### Blur

Content can be blurred.When hovering the mouse over the content, it will be displayed clearly.

```
$[blur MisskeyでFediverseの世界が広がります]
```

<MfmPreview text="$[blur MisskeyでFediverseの世界が広がります]"></MfmPreview>

### Search

A search box can be displayed.

```
misskey 検索
```

<MfmPreview text="misskey 検索"></MfmPreview>

### Foreground and Background Color

The color of the foreground and background can be changed.

Colors are expressed using 3, 4, or 6 digit color codes.

```
$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]
```

<MfmPreview text="$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]"></MfmPreview>

### Border

Content can be surrounded borders.The borders can have various styles.

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

### Rotate

Rotate by a specified angle.

```
$[rotate.deg=30 misskey]
```

<MfmPreview text="$[rotate.deg=30 misskey]"></MfmPreview>

### Shift Position

The position can be shifted.

```
😏$[position.x=0.8,y=0.5 🍮]😀
```

<MfmPreview text="😏$[position.x=0.8,y=0.5 🍮]😀"></MfmPreview>

### Expand

Displays enlarged text.

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

### Animation (Jelly)

```
$[jelly 🍮] $[jelly.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jelly 🍮] $[jelly.speed=5s 🍮]]"></MfmPreview>

### Animation (Tada)

```
$[tada 🍮] $[tada.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[tada 🍮] $[tada.speed=5s 🍮]]"></MfmPreview>

### Animation (Jump)

```
$[jump 🍮] $[jump.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jump 🍮] $[jump.speed=5s 🍮]]"></MfmPreview>

### Animation (Bounce)

```
$[bounce 🍮] $[bounce.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[bounce 🍮] $[bounce.speed=5s 🍮]]"></MfmPreview>

### Animation (Spin)

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

### Animation (Shake)

```
$[shake 🍮] $[shake.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[shake 🍮] $[shake.speed=5s 🍮]]"></MfmPreview>

### Animation (Twitch)

```
$[twitch 🍮] $[twitch.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[twitch 🍮] $[twitch.speed=5s 🍮]]"></MfmPreview>

### Rainbow

```
$[rainbow 🍮] $[rainbow.speed=5s 🍮]
$[rainbow 色なし文字]
$[rainbow $[fg.color=f0f 色付き文字]]
```

<MfmPreview text="$[rainbow 🍮] $[rainbow.speed=5s 🍮]
$[rainbow 色なし文字]
$[rainbow $[fg.color=f0f 色付き文字]]"></MfmPreview>

### Sparkle

```
$[sparkle 🍮]
```

<MfmPreview text="$[x2 $[sparkle 🍮]]"></MfmPreview>

### Plain Text

Disable formatting of content.

```
<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>
```

<MfmPreview text="<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>"></MfmPreview>

## Information for developers

MFM parsing and rendering implementations are published as libraries, making it easy to incorporate MFM into clients.

- [misskey-dev/mfm.js](https://github.com/misskey-dev/mfm.js) - JavaScript parser implementation
- [mfm-renderer](https://www.npmjs.com/package/mfm-renderer) - Vue.js component
- [mfm.kt](https://github.com/samunohito/mfm.kt) - Kotlin parser implementation
- [mfm_parser](https://pub.dev/packages/mfm_parser) - Dart parser implementation
- [mfm](https://pub.dev/packages/mfm) - Flutter rendering widget
