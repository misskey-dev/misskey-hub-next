---
description: MFM 是一種專有的標記語言，可以在 Misskey 的各個地方使用。
---

# MFM

MFM 代表 Markup language For Misskey，是一種專有的標記語言，可以在 Misskey 的各個地方使用。

:::tip
某些語法與 Markdown 和 HTML 相容。
:::

## 可使用 MFM 的地方

- ノート本文
- CW注釈
- 使用者名稱
- 使用者的自我介紹

## 語法

### メンション

「@ + 使用者名稱」可用來表示特定使用者。
:::tip
有關提及的更多信息，請參閱[此處](./mention.md)。
:::

```
@ai
```

<MfmPreview text="@ai"></MfmPreview>

```
@repo@p1.a9z.dev
```

<MfmPreview text="@repo@p1.a9z.dev"></MfmPreview>

### ハッシュタグ

ナンバーサイン + タグで、ハッシュタグを示すことができます。
:::tip
ハッシュタグについての詳細は[こちら](./hashtag.md)を参照してください。
:::

```
#misskey
```

<MfmPreview text="#misskey"></MfmPreview>

### 網址

可以標出網址。

```
https://example.com
```

<MfmPreview text="https://example.com"></MfmPreview>

### 連結

可將特定範圍的文字與網址綁定。

```
[example link](https://example.com)
```

:::tip
リンクテキストの前に`?`をつけると、リンクプレビューを非表示にすることができます。

```
?[example link](https://example.com)
```

:::

<MfmPreview text="[example link](https://example.com)"></MfmPreview>

### 自訂表情符號

您可以透過用冒號包圍自訂表情符號名稱來顯示自訂表情符號。
:::tip
有關自訂表情符號的更多信息，請參閱[此處](./custom-emoji.md)。
:::

```
:misskey:
```

<MfmPreview text=":misskey:"></MfmPreview>

### 粗體

可以將文字顯示为粗體来強調。

```
**太字**
```

<MfmPreview text="**太字**"></MfmPreview>

### 目立たなくする

可以使內容文字變小、變淡。

```
<small>Misskey 擴展了聯邦宇宙的世界</small>
```

<MfmPreview text="<small>MisskeyでFediverseの世界が広がります</small>"></MfmPreview>

### 引用

可以用來表示引用的内容。

```
> Misskey 擴展了聯邦宇宙的世界
```

<MfmPreview text="> MisskeyでFediverseの世界が広がります"></MfmPreview>

### 中央寄せ

内容を中央寄せで表示させることができます。

```
<center>Misskey 擴展了聯邦宇宙的世界</center>
```

<MfmPreview text="<center>MisskeyでFediverseの世界が広がります</center>"></MfmPreview>

### 程式碼(内嵌)

在行內用高亮度顯示，例如程式碼語法。

```
`<: "Hello, world!"`
```

### コード(ブロック)

在區塊中用高亮度顯示，例如複數行的程式碼語法。

```
~ (#i, 100) {
	<: ? ((i % 15) = 0) "FizzBuzz"
		.? ((i % 3) = 0) "Fizz"
		.? ((i % 5) = 0) "Buzz"
		. i
}
```

### 翻轉

將內容上下或左右翻轉。

```
$[flip Misskey 擴展了聯邦宇宙的世界]
$[flip.v Misskey 擴展了聯邦宇宙的世界]
$[flip.h,v Misskey 擴展了聯邦宇宙的世界]
```

<MfmPreview text="$[flip MisskeyでFediverseの世界が広がります]
$[flip.v MisskeyでFediverseの世界が広がります]
$[flip.h,v MisskeyでFediverseの世界が広がります]"></MfmPreview>

### 字型

内容のフォントを指定することができます。

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

### ぼかし

内容をぼかすことができます。ポインターを上に乗せるとはっきり見えるようになります。

```
$[blur MisskeyでFediverseの世界が広がります]
```

<MfmPreview text="$[blur MisskeyでFediverseの世界が広がります]"></MfmPreview>

### 搜尋

可以顯示搜尋框。

```
misskey 検索
```

<MfmPreview text="misskey 検索"></MfmPreview>

### 文字和背景顏色

可以變更文字顏色和背景顏色。

顏色使用 3、4 或 6 位顏色代碼表示。

```
$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]
```

<MfmPreview text="$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]"></MfmPreview>

### 角度變化

以指定的角度旋轉。

```
$[rotate.deg=30 misskey]
```

<MfmPreview text="$[rotate.deg=30 misskey]"></MfmPreview>

### 變更位置

可以移動位置。

```
😏$[position.x=0.8,y=0.5 🍮]😀
```

<MfmPreview text="😏$[position.x=0.8,y=0.5 🍮]😀"></MfmPreview>

### 擴展

透過拉伸顯示文字。

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

### 動畫(搖晃)

```
$[jelly 🍮] $[jelly.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jelly 🍮] $[jelly.speed=5s 🍮]]"></MfmPreview>

### 動畫（鏘～）

```
$[tada 🍮] $[tada.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[tada 🍮] $[tada.speed=5s 🍮]]"></MfmPreview>

### 動畫(跳動)

```
$[jump 🍮] $[jump.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jump 🍮] $[jump.speed=5s 🍮]]"></MfmPreview>

### 動畫(反彈)

```
$[bounce 🍮] $[bounce.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[bounce 🍮] $[bounce.speed=5s 🍮]]"></MfmPreview>

### 動畫(旋轉)

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

### 動畫(果凍)

```
$[shake 🍮] $[shake.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[shake 🍮] $[shake.speed=5s 🍮]]"></MfmPreview>

### 動畫(顫抖)

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

### キラキラ

```
$[sparkle 🍮]
```

<MfmPreview text="$[x2 $[sparkle 🍮]]"></MfmPreview>

### プレーン

將內部語法全部禁用。

```
<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>
```

<MfmPreview text="<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>"></MfmPreview>

## 為開發人員提供的信息

MFM 的解析器實作會作為函式庫發布，可以輕鬆地將 MFM 合併到客戶端。

- [misskey-dev/mfm.js](https://github.com/misskey-dev/mfm.js) - JavaScript 解析器實作
