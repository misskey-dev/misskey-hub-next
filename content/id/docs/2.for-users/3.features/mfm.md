---
description: 'MFM, yang merupakan singkatan dari Misskey Flavoured Markdown, adalah bahasa markup yang dapat digunakan pada berbagai tempat di dalam Misskey.'
---

# MFM

MFMは、Markup language For Misskeyの略で、Misskeyの様々な場所で使用できる専用のマークアップ言語です。一部の構文はMarkdownやHTMLと互換性があります。

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

`@` + nama pengguna dapat digunakan untuk menampilkan pengguna spesifik.
:::tip

Untuk informasi lebih lanjut mengenai sebutan, lihat di [sini](./mention.md).

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

`#` + penanda dapat digunakan untuk menampilkan tagar.
:::tip

Untuk informasi lebih lanjut mengenai tagar, lihat di [sini](./hashtag.md).

:::

```
#misskey
```

<MfmPreview text="#misskey"></MfmPreview>

### URL

URL dapat ditampilkan.

```
https://example.com
```

<MfmPreview text="https://example.com"></MfmPreview>

### Tautan

Bagian tertentu dari teks dapat ditampilkan sebagai URL.

```
[contoh tautan](https://example.com)
```

:::tip

Kamu dapat menyembunyikan pratinjau tautan dengan cara memprefiks teks tautan dengan `?`.

```
?[contoh tautan](https://example.com)
```

:::

<MfmPreview text="[example link](https://example.com)"></MfmPreview>

### Emoji kustom

Emoji kustom dapat ditampilkan dengan mengurung nama emoji kustom menggunakan tanda titik dua.

:::tip

Untuk informasi lebih lanjut mengenai emoji, lihat di [sini](./custom-emoji.md).

:::

```
:misskey:
```

<MfmPreview text=":misskey:"></MfmPreview>

### Huruf Tebal

Sorot tulisan dengan membuatnya tebal.

```
**Huruf Tebal**
```

<MfmPreview text="**太字**"></MfmPreview>

### Huruf Kecil

Menampilkan konten menjadi kecil dan tipis.

```
<small>Misskey membentangkan dunia Fediverse</small>
```

<MfmPreview text="<small>MisskeyでFediverseの世界が広がります</small>"></MfmPreview>

### Kutip

Menampilkan konten sebagai kutipan.

```
> Misskey membentangkan dunia Fediverse
```

<MfmPreview text="> MisskeyでFediverseの世界が広がります"></MfmPreview>

### Tengah

Menampilkan konten menjadi di tengah.

```
<center>Misskey membentangkan dunia Fediverse</center>
```

<MfmPreview text="<center>MisskeyでFediverseの世界が広がります</center>"></MfmPreview>

### Yomigana (karakter Ruby)

Yomigana dapat dilampirkan pada teks.

```
$[ruby Misskey ミスキー] 
```

<MfmPreview text="$[ruby Misskey ミスキー]"></MfmPreview>

### 日時

UNIX時間を指定して日時を表示できます。

```
$[unixtime 1701356400]
```

<MfmPreview text="$[unixtime 1701356400]"></MfmPreview>

### Kode (Dalam baris)

Menampilkan sorotan sintaks untuk kode program secara dalam baris.

```
`<: "Halo, dunia!"`
```

### Kode (Blok)

Menampilkan sorotan sintaks dari kode program dalam sebuah blok.

プログラミング言語をIDで指定すると、その言語でシンタックスハイライトが適用されます。指定できる言語は次のとおりです：

- [Shikiが対応している言語（200以上）](https://shiki.style/languages)
- AiScript: `aiscript`, `ais`, `is` のいずれかを指定すると使用できます。

```
~ (#i, 100) {
	<: ? ((i % 15) = 0) "FizzBuzz"
		.? ((i % 3) = 0) "Fizz"
		.? ((i % 5) = 0) "Buzz"
		. i
}
```

### Putar Balik

Balikkan konten secara horizontal atau vertikal.

```
$[flip Misskey membentangkan dunia Fediverse]
$[flip.v Misskey membentangkan dunia Fediverse]
$[flip.h,v Misskey membentangkan dunia Fediverse]
```

<MfmPreview text="$[flip MisskeyでFediverseの世界が広がります]
$[flip.v MisskeyでFediverseの世界が広がります]
$[flip.h,v MisskeyでFediverseの世界が広がります]"></MfmPreview>

### Font

Setel font yang ditampilkan untuk konten.

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

Konten dapat diburamkan.Ketika mouse diarahkan ke konten dan berada di atasnya, konten tersebut akan ditampilkan dengan jelas.

```
$[blur Misskey membentangkan dunia Fediverse]
```

<MfmPreview text="$[blur MisskeyでFediverseの世界が広がります]"></MfmPreview>

### Kotak Pencarian

Sebuah kotak pencarian dapat ditampilkan.

```
misskey search
```

<MfmPreview text="misskey 検索"></MfmPreview>

### Warna Latar/Karakter

Warna dari latar depan dan latar belakang dapat diubah.

Warna diekspresikan dengan menggunakan kode warna 3, 4, atau 6 digit.

```
$[fg.color=f00 Huruf Merah]
$[bg.color=ff0 Latar Kuning]
```

<MfmPreview text="$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]"></MfmPreview>

### Tepian/Bingkai

Konten dapat dikelilingi oleh tepian/bingkai.Gaya dari tepian/bingkai juga dapat ditampilkan bermacam-macam.

```
$[border.style=solid,width=4 Bawaan]

$[border.style=hidden Tanpa tepian]

$[border.style=dotted,width=2 Titik-titik]
$[border.style=dashed,width=2 Garis putus]
$[border.style=double,width=4 Ganda]

$[border.style=groove,width=4 Timbul A]
$[border.style=ridge,width=4 Timbul B]

$[border.style=inset,width=4 Set dalam A]
$[border.style=outset,width=4 Set dalam B]

$[border.color=d00 Warna tepian]
$[border.width=5 Lebar tepian]

$[border.radius=6,width=2 Radius tepian]

$[border.radius=5,width=2,color=888 $[position.x=1.5 ＣＳＳ]
$[position.x=1.5 Cukup paham]]

$[border.radius=5,width=2,color=888,noclip $[position.x=1.5 ＣＳＳ]
$[position.x=1.5 Cukup paham]]
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

Putar konten sesuai sudut yang ditentukan.

```
$[rotate.deg=30 misskey]
```

<MfmPreview text="$[rotate.deg=30 misskey]"></MfmPreview>

### Posisi

Konten tidak dapat digeser.

```
😏$[position.x=0.8,y=0.5 🍮]😀
```

<MfmPreview text="😏$[position.x=0.8,y=0.5 🍮]😀"></MfmPreview>

### Skala

Menampilkan teks yang dibesarkan.

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

Menonaktifkan pemformatan pada konten.

```
<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>
```

<MfmPreview text="<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>"></MfmPreview>

## Informasi untuk Pengembang

Implementasi penguraian dan perenderan MFM telah dipublikasikan sebagai _library_, yang mana memudahkan kamu untuk menggabungkan MFM ke dalam klien.

- [misskey-dev/mfm.js](https://github.com/misskey-dev/mfm.js) - Implementasi JavaScript dari MFM Parser
- [mfm-renderer](https://www.npmjs.com/package/mfm-renderer) - komponen Vue.js
- [mfm.kt](https://github.com/samunohito/mfm.kt) - Implementasi parser Kotlin
- [mfm_parser](https://pub.dev/packages/mfm_parser) - Implementasi parser Dart
- [mfm](https://pub.dev/packages/mfm) - Gawit perenderan Flutter
