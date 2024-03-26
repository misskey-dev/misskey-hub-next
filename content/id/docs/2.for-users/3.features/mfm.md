---
description: MFM, yang merupakan singkatan dari Misskey Flavoured Markdown, adalah bahasa markup yang dapat digunakan pada berbagai tempat di dalam Misskey.
---

# MFM

MFM, yang merupakan singkatan dari Misskey Flavoured Markdown, adalah bahasa markup yang dapat digunakan pada berbagai tempat di dalam Misskey.

:::tip

Beberapa dari sintaks MFM memiliki kompatibilitas dengan Markdown.

:::

## Contoh dimana MFM diperbolehkan dalam Misskey

- Konten dalam catatan
- Spoiler konten peringatan
- Nama Pengguna
- Profil Bio Pengguna

## Sintaks

### Sebutan

アットマーク + ユーザー名で、特定のユーザーを示すことができます。
:::tip

メンションについての詳細は[こちら](./mention.md)を参照してください。

:::

```
@ai
```

<MfmPreview text="@ai"></MfmPreview>

```
@repo@p1.a9z.dev
```

<MfmPreview text="@repo@p1.a9z.dev"></MfmPreview>

### Tagar

ナンバーサイン + タグで、ハッシュタグを示すことができます。
:::tip

ハッシュタグについての詳細は[こちら](./hashtag.md)を参照してください。

:::

```
#misskey
```

<MfmPreview text="#misskey"></MfmPreview>

### URL

URLを示すことができます。

```
https://example.com
```

<MfmPreview text="https://example.com"></MfmPreview>

### Tautan

文章の特定の範囲を、URLに紐づけることができます。

```
[contoh tautan](https://example.com)
```

:::tip

リンクテキストの前に`?`をつけると、リンクプレビューを非表示にすることができます。

```
?[contoh tautan](https://example.com)
```

:::

<MfmPreview text="[example link](https://example.com)"></MfmPreview>

### Emoji kustom

コロンでカスタム絵文字名を囲むと、カスタム絵文字を表示させることができます。

:::tip

カスタム絵文字についての詳細は[こちら](./custom-emoji.md)を参照してください。

:::

```
:misskey:
```

<MfmPreview text=":misskey:"></MfmPreview>

### Huruf Tebal

文字を太く表示して強調することができます。

```
**Huruf Tebal**
```

<MfmPreview text="**太字**"></MfmPreview>

### Huruf Kecil

内容を小さく・薄く表示させることができます。

```
<small>Misskey membentangkan dunia Fediverse</small>
```

<MfmPreview text="<small>MisskeyでFediverseの世界が広がります</small>"></MfmPreview>

### Kutip

内容が引用であることを示すことができます。

```
> Misskey membentangkan dunia Fediverse
```

<MfmPreview text="> MisskeyでFediverseの世界が広がります"></MfmPreview>

### Tengah

内容を中央寄せで表示させることができます。

```
<center>Misskey membentangkan dunia Fediverse</center>
```

<MfmPreview text="<center>MisskeyでFediverseの世界が広がります</center>"></MfmPreview>

### よみがな（ルビ）

内容によみがなを付けることができます。

```
$[ruby Misskey ミスキー] 
```

<MfmPreview text="$[ruby Misskey ミスキー]"></MfmPreview>

### Kode (Dalam baris)

プログラムなどのコードをインラインでシンタックスハイライトします。

```
`<: "Hello, world!"`
```

### Kode (Blok)

複数行のプログラムなどのコードをブロックでシンタックスハイライトします。

```
~ (#i, 100) {
	<: ? ((i % 15) = 0) "FizzBuzz"
		.? ((i % 3) = 0) "Fizz"
		.? ((i % 5) = 0) "Buzz"
		. i
}
```

### Putar Balik

内容を上下または左右に反転させます。

```
$[flip Misskey membentangkan dunia Fediverse]
$[flip.v Misskey membentangkan dunia Fediverse]
$[flip.h,v Misskey membentangkan dunia Fediverse]
```

<MfmPreview text="$[flip MisskeyでFediverseの世界が広がります]
$[flip.v MisskeyでFediverseの世界が広がります]
$[flip.h,v MisskeyでFediverseの世界が広がります]"></MfmPreview>

### Font

内容のフォントを指定することができます。

```
$[font.serif Misskey membentangkan dunia Fediverse]
$[font.monospace Misskey membentangkan dunia Fediverse]
$[font.cursive Misskey membentangkan dunia Fediverse]
$[font.fantasy Misskey membentangkan dunia Fediverse]
```

<MfmPreview text="$[font.serif MisskeyでFediverseの世界が広がります]
$[font.monospace MisskeyでFediverseの世界が広がります]
$[font.cursive MisskeyでFediverseの世界が広がります]
$[font.fantasy MisskeyでFediverseの世界が広がります]"></MfmPreview>

### Buram/Kabur

内容をぼかすことができます。ポインターを上に乗せるとはっきり見えるようになります。

```
$[blur Misskey membentangkan dunia Fediverse]
```

<MfmPreview text="$[blur MisskeyでFediverseの世界が広がります]"></MfmPreview>

### Kontak Pencarian

検索ボックスを表示できます。

```
misskey cari
```

<MfmPreview text="misskey 検索"></MfmPreview>

### Warna Latar/Karakter

文字色と背景色を変更することができます。

3,4,6桁のカラーコードで色を表現します。

```
$[fg.color=f00 Huruf Merah]
$[bg.color=ff0 Latar Kuning]
```

<MfmPreview text="$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]"></MfmPreview>

### 枠線

内容を枠線で囲むことができます。様々なスタイルを指定することができます。

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

### Rotasi

指定した角度で回転させます。

```
$[rotate.deg=30 misskey]
```

<MfmPreview text="$[rotate.deg=30 misskey]"></MfmPreview>

### Posisi

位置をずらすことができます。

```
😏$[position.x=0.8,y=0.5 🍮]😀
```

<MfmPreview text="😏$[position.x=0.8,y=0.5 🍮]😀"></MfmPreview>

### Skala

文字を引き延ばして表示します。

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

### Animasi (Jelly)

```
$[jelly 🍮] $[jelly.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jelly 🍮] $[jelly.speed=5s 🍮]]"></MfmPreview>

### Animasi (Tada)

```
$[tada 🍮] $[tada.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[tada 🍮] $[tada.speed=5s 🍮]]"></MfmPreview>

### Animasi (Lompat)

```
$[jump 🍮] $[jump.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jump 🍮] $[jump.speed=5s 🍮]]"></MfmPreview>

### Animasi (Memantul)

```
$[bounce 🍮] $[bounce.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[bounce 🍮] $[bounce.speed=5s 🍮]]"></MfmPreview>

### Animasi (Putar)

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

### Animasi (Goyang)

```
$[shake 🍮] $[shake.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[shake 🍮] $[shake.speed=5s 🍮]]"></MfmPreview>

### Animasi (Cubit)

```
$[twitch 🍮] $[twitch.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[twitch 🍮] $[twitch.speed=5s 🍮]]"></MfmPreview>

### Pelangi

```
$[rainbow 🍮] $[rainbow.speed=5s 🍮]
$[rainbow Huruf Tanpa Warna]
$[rainbow $[fg.color=f0f Huruf Dengan Warna]]
```

<MfmPreview text="$[rainbow 🍮] $[rainbow.speed=5s 🍮]
$[rainbow 色なし文字]
$[rainbow $[fg.color=f0f 色付き文字]]"></MfmPreview>

### Kelap-kelip

```
$[sparkle 🍮]
```

<MfmPreview text="$[x2 $[sparkle 🍮]]"></MfmPreview>

### Polos

内側の構文を全て無効にします。

```
<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>
```

<MfmPreview text="<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>"></MfmPreview>

## Informasi untuk Pengembang

MFMのパーサーや描画の実装はライブラリとして公開されており、簡単にクライアントにMFMを組み込むことが可能です。

- [misskey-dev/mfm.js](https://github.com/misskey-dev/mfm.js) - JavaScriptパーサー実装
- [mfm-renderer](https://www.npmjs.com/package/mfm-renderer) - Vue.js用コンポーネント
- [mfm.kt](https://github.com/samunohito/mfm.kt) - Kotlinパーサー実装
- [mfm_parser](https://pub.dev/packages/mfm_parser) - Dartパーサー実装
- [mfm](https://pub.dev/packages/mfm) - Flutter用描画ウィジェット
