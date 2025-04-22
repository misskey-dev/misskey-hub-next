---
description: MFM es un lenguaje de marcado específico que puede utilizarse en varias partes de Misskey.
---

# MFM

MFM, acrónimo de Markup Language For Misskey (Lenguaje de Marcado para Misskey), es un lenguaje de marcado propietario que puede ser usado en varios lugares de Misskey.Alguna de su sintaxis es compatible con Markdown y HTML.

:::tip

¡Visita [MFM Playground](/tools/mfm-playground/) para probar MFM tu mismo!

:::

## Ejemplos de lugares donde MFM puede ser utilizado

- En un texto de una nota
- Para la anotación de contenido sensible, CW
- Nombres de usuarios
- Biografía de usuarios

## Sintaxis

### Menciones

`@` + nombre de usuario puede ser usado para mostrar un usuario específico.
:::tip

Para más información sobre las menciones mira, [aquí](./mention.md).

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

`#` + palabra puede ser usado para mostrar un hashtag.
:::tip

Para más información sobre hashtags, mira [aquí](./hashtag.md).

:::

```
#misskey
```

<MfmPreview text="#misskey"></MfmPreview>

### URL

Las URLs pueden ser mostradas.

```
https://example.com
```

<MfmPreview text="https://example.com"></MfmPreview>

### Links

Partes específicas de un texto se pueden mostrar como una URL.

```
[example link](https://example.com)
```

:::tip

Puedes ocultar la vista previa del enlace anteponiendo al texto del enlace el prefijo `? `.

```
?[example link](https://example.com)
```

:::

<MfmPreview text="[example link](https://example.com)"></MfmPreview>

### Emoji personalizado

Se pueden mostrar emoji personalizados rodeando el nombre del emoji con dos puntos.

:::tip

Para obtener más información sobre los emoji personalizados, mira [aquí](./custom-emoji.md).

:::

```
:misskey:
```

<MfmPreview text=":misskey:"></MfmPreview>

### Negrita

Texto en negrita para enfatizar.

```
**太字**
```

<MfmPreview text="**太字**"></MfmPreview>

### Encoger

Muestra el contenido más pequeño y más fino.

```
<small>Misskey amplía el mundo del Fediverso</small>
```

<MfmPreview text="<small>MisskeyでFediverseの世界が広がります</small>"></MfmPreview>

### Citas

Muestra el contenido como una cita.

```
> Misskey amplía el mundo del Fediverso
```

<MfmPreview text="> MisskeyでFediverseの世界が広がります"></MfmPreview>

### Centrar

Muestra el texto centrado.

```
<center>Misskey amplía el mundo del Fediverso</center>
```

<MfmPreview text="<center>Misskey amplía el mundo del Fediverso</center></MfmPreview>

### Furigana/Yomigana (Ruby)

Yomigana puede ser adjuntado al texto.

```
$[ruby Misskey ミスキー] 
```

<MfmPreview text="$[ruby Misskey ミスキー]"></MfmPreview>

### Código fuente (insertado)

Muestra el código fuente de un programa resaltando su sintaxis.

```
`<: "¡Hola, Mundo!"`
```

### Código fuente (bloque)

Código de resaltado de sintaxis, como programas de varias líneas con bloques.

Especificando el lenguaje de programación por Id, puede aplicar el resaltado de sintaxis en ese lenguaje.Los lenguajes disponibles son:

- [Lenguajes soportados por Shiki (200+)](https://shiki.style/languages)
- AiScript: Específica uno de los siguientes `aiscript`, `ais`, o `is` para usarlo.

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

### Voltear

Voltea el contenido hacia arriba / abajo o hacia la izquierda / derecha.

```
$[flip Misskey amplía el mundo del Fediverso]
$[flip.v Misskey amplía el mundo del Fediverso]
$[flip.h,v Misskey amplía el mundo del Fediverso]
```

<MfmPreview text="$[flip MisskeyでFediverseの世界が広がります]
$[flip.v MisskeyでFediverseの世界が広がります]
$[flip.h,v MisskeyでFediverseの世界が広がります]"></MfmPreview>

### Fuente

Establece la fuente en que se mostrará el contenido.

```
$[font.serif Misskey amplía el mundo del Fediverso]]
$[font.monospace Misskey amplía el mundo del Fediverso]]
$[font.cursive Misskey amplía el mundo del Fediverso]]
$[font.fantasy Misskey amplía el mundo del Fediverso]]
```

<MfmPreview text="$[font.serif MisskeyでFediverseの世界が広がります]
$[font.monospace MisskeyでFediverseの世界が広がります]
$[font.cursive MisskeyでFediverseの世界が広がります]
$[font.fantasy MisskeyでFediverseの世界が広がります]"></MfmPreview>

### Difuminar

El contenido puede ser difuminado.Al pasar el ratón por encima del contenido, éste se mostrará claramente.

```
$[blur Misskey amplía el mundo del Fediverso]
```

<MfmPreview text="$[blur MisskeyでFediverseの世界が広がります]"></MfmPreview>

### Búsqueda

Un cuadro de búsqueda puede ser mostrado.

```
misskey 検索
```

<MfmPreview text="misskey 検索"></MfmPreview>

### 文字色・背景色

文字色と背景色を変更することができます。

3,4,6桁のカラーコードで色を表現します。

```
$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]
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

### 角度変更

指定した角度で回転させます。

```
$[rotate.deg=30 misskey]
```

<MfmPreview text="$[rotate.deg=30 misskey]"></MfmPreview>

### 位置変更

位置をずらすことができます。

```
😏$[position.x=0.8,y=0.5 🍮]😀
```

<MfmPreview text="😏$[position.x=0.8,y=0.5 🍮]😀"></MfmPreview>

### 拡大

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

### アニメーション(びよんびよん)

```
$[jelly 🍮] $[jelly.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jelly 🍮] $[jelly.speed=5s 🍮]]"></MfmPreview>

### アニメーション(じゃーん)

```
$[tada 🍮] $[tada.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[tada 🍮] $[tada.speed=5s 🍮]]"></MfmPreview>

### アニメーション(ジャンプ)

```
$[jump 🍮] $[jump.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jump 🍮] $[jump.speed=5s 🍮]]"></MfmPreview>

### アニメーション(バウンド)

```
$[bounce 🍮] $[bounce.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[bounce 🍮] $[bounce.speed=5s 🍮]]"></MfmPreview>

### アニメーション(回転)

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

### アニメーション(ぶるぶる)

```
$[shake 🍮] $[shake.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[shake 🍮] $[shake.speed=5s 🍮]]"></MfmPreview>

### アニメーション(ブレ)

```
$[twitch 🍮] $[twitch.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[twitch 🍮] $[twitch.speed=5s 🍮]]"></MfmPreview>

### レインボー

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

内側の構文を全て無効にします。

```
<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>
```

<MfmPreview text="<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>"></MfmPreview>

## 開発者向け情報

MFMのパーサーや描画の実装はライブラリとして公開されており、簡単にクライアントにMFMを組み込むことが可能です。

- [misskey-dev/mfm.js](https://github.com/misskey-dev/mfm.js) - JavaScriptパーサー実装
- [mfm-renderer](https://www.npmjs.com/package/mfm-renderer) - Vue.js用コンポーネント
- [mfm.kt](https://github.com/samunohito/mfm.kt) - Kotlinパーサー実装
- [mfm_parser](https://pub.dev/packages/mfm_parser) - Dartパーサー実装
- [mfm](https://pub.dev/packages/mfm) - Flutter用描画ウィジェット
