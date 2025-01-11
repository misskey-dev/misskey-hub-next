---
description: MFM ist eine spezielle Markup-Sprache, die in verschiedenen Teilen von Misskey verwendet werden kann.
---

# MFM

MFM steht für "Markup language For Misskey" und ist eine spezielle Auszeichnungssprache, die an verschiedenen Stellen in Misskey verwendet werden kann.Einige Syntaxen sind mit Markdown und HTML kompatibel.

:::tip

Es wurde eine [MFM-Demo] (/tools/mfm-playground/) eingerichtet, in der MFM ausprobiert werden kann!

:::

## Beispiele für Orte, an denen MFM eingesetzt werden kann

- Notizen
- CW (Inhaltswarnung)
- Benutzername
- Darstellung im Profil

## Syntax

### Erwähnung

Mit At-Zeichen und Benutzername kann ein individueller Nutzer angegeben werden.

Weitere Informationen über Erwähnungen, gibt es [hier](./mention.md).

:::

```
@ai
```

<MfmPreview text="@ai"></MfmPreview>

```
@repo@p1.a9z.dev
```

<MfmPreview text="@repo@p1.a9z.dev"></MfmPreview>

### Hashtag (#)

Mit einer Raute und Text kann ein Hashtag angegeben werden.

Weitere Informationen zu Hashtags gibt es [hier](./hashtag.md).

:::

```
#misskey
```

<MfmPreview text="#misskey"></MfmPreview>

### URL

URL können wie folgt angegeben werden:

```
https://example.com
```

<MfmPreview text="https://example.com"></MfmPreview>

### Verlinken

Zeigt spezifische Textabschnitte als URL an.

```
[example link](https://example.com)
```

:::tip

Um die Linkvorschau auszublenden, füge "?" ein:

```
?[example link](https://example.com)
```

:::

<MfmPreview text="[example link](https://example.com)"></MfmPreview>

### Benutzerdefinierte Emojis

Durch das Umschließen von Emoji-Namen durch Doppelpunkte können benutzerdefinierte Emojis angezeigt werden.

:::tip

Weitere Informationen zu Emoji's findest du [hier](./custom-emoji.md).

:::

```
:misskey:
```

<MfmPreview text=":misskey:"></MfmPreview>

### Fett

Zeichen zur Betonung dicker erscheinen lassen.

```
**Beispiel**
```

<MfmPreview text="**太字**"><0>

### Klein

Inhalt klein und dünn erscheinen lassen.

```
<small>Misskey erweitert die Welt des Fediverse</small>
```

<MfmPreview text="<small>Die Welt des Fediversums erweitert sich mit Misskey</small>"></MfmPreview>

### Zitat

Inhalt als Zitat anzeigen.

```
> Misskey erweitert die Welt des Fediverse
```

Misskey erweitert die Welt des Fediverse

### Zentrieren

Inhalt zentriert anzeigen.

```
Misskey erweitert die Welt des Fediverse
```

<MfmPreview text="<center>Misskey erweitert die Welt des Fediverse</center>"></MfmPreview>

### Yomigana (Ruby)

Der Inhalt kann mit einem Yomigana beschriftet werden.

```
$[ruby Misskey ミスキー]
```

</MfmPreview></0>

### Code (Eingebettet)

Syntax-Hervorhebung für (Programm-)Code eingebettet anzeigen.

```
`<: "Hallo Welt!"`
```

### Code (Block)

Syntax-Hervorhebung für mehrzeiligen (Programm-)Code als Block anzeigen.

Über die ID kann eine Programmiersprache festgelegt werden. Hierbei wird ebenfalls der Syntax hervorgehoben.Folgende Sprachen können eingestellt werden:

- [Von Shiki unterstützte Sprachen (200+)](https://shiki.style/languages)
- AiScript: `aiscript`, `ais`, `is`

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

### Spiegeln

Inhalt horizontal oder vertikal gespiegelt anzeigen.

```
$[flip Misskey und Fediverse]
$[flip.v Misskey und Fediverse]
$[flip.h,v Misskey und Fediverse]
```

<MfmPreview text="$[flip MisskeyでFediverseの世界が広がります]
$[flip.v MisskeyでFediverseの世界が広がります]
$[flip.h,v MisskeyでFediverseの世界が広がります]"></MfmPreview>

### Schriftart

Setzt die Schriftart des Inhaltes fest.

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

Der Inhalt erscheint unscharfDer Maus-Zeiger ist deutlich zu sehen, wenn man ihn oben auflegt.

```
$[blur Misskey erweitert die Welt des Fediverse]
```

<MfmPreview text="$[blur MisskeyでFediverseの世界が広がります]"></MfmPreview>

### Suchen

Das Suchfeld kann angezeigt werden.

```
misskey search
```

<MfmPreview text="misskey 検索"></MfmPreview>

### Text- und Hintergrundfarben

Text- und Hintergrundfarben können geändert werden.

Die Farben werden durch 3-, 4- und 6-stellige Farbcodes dargestellt.

```
$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]
```

<MfmPreview text="$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]"></MfmPreview>

### Rahmen

Der Inhalt kann eingerahmt werden.Verschiedene Stile können angegeben werden.

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

### Drehen

Dreht den Inhalt um einen angegebenen Winkel.

```
$[rotate.deg=30 misskey]
```

<MfmPreview text="$[rotate.deg=30 misskey]"></MfmPreview>

### Lage ändern

Die Position kann verschoben werden.

```
😏$[position.x=0.8,y=0.5 🍮]😀
```

<MfmPreview text="😏$[position.x=0.8,y=0.5 🍮]😀"></MfmPreview>

### Skalierung

Skaliert den Text.

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

### Animation (Dehnen)

```
$[jelly 🍮] $[jelly.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jelly 🍮] $[jelly.speed=5s 🍮]]"></MfmPreview>

### Animation (Tada)

```
$[tada 🍮] $[tada.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[tada 🍮] $[tada.speed=5s 🍮]]"></MfmPreview>

### Animation (Sprung)

```
$[jelly 🍮] $[jump.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jump 🍮] $[jump.speed=5s 🍮]]"></MfmPreview>

### Animation (Federn)

```
$[bounce 🍮] $[bounce.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[bounce 🍮] $[bounce.speed=5s 🍮]]"></MfmPreview>

### Animation (Rotieren)

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

### Animation (Zittern)

```
$[shake 🍮] $[shake.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[shake 🍮] $[shake.speed=5s 🍮]]"></MfmPreview>

### Animation (Zucken)

```
$[twitch 🍮] $[twitch.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[twitch 🍮] $[twitch.speed=5s 🍮]]"></MfmPreview>

### Regenbogen

```
$[rainbow 🍮] $[rainbow.speed=5s 🍮]
$[rainbow 色なし文字]
$[rainbow $[fg.color=f0f 色付き文字]]
```

<MfmPreview text="$[rainbow 🍮] $[rainbow.speed=5s 🍮]
$[rainbow 色なし文字]
$[rainbow $[fg.color=f0f 色付き文字]]"></MfmPreview>

### Funkeln

```
$[sparkle 🍮]
```

<MfmPreview text="$[x2 $[sparkle 🍮]]"></MfmPreview>

### Klartext

Deaktiviert jegliche MFM-Syntax, die sich innerhalb dieses MFM-Effekts befindet.

```
<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>
```

<MfmPreview text="<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>"></MfmPreview>

## Entwicklerinformationen

MFM-Parser und Rendering-Implementierungen werden als Bibliotheken veröffentlicht, so dass MFM leicht in Clients eingebettet werden kann.

- [misskey-dev/mfm.js](https://github.com/misskey-dev/mfm.js) - JavaScript-Parser
- [mfm-renderer](https://www.npmjs.com/package/mfm-renderer) - Vue.js-Komponente
- [mfm.kt](https://github.com/samunohito/mfm.kt) - Kotlin-Parser
- [mfm_parser](https://pub.dev/packages/mfm_parser) - Dart-Parser
- [mfm](https://pub.dev/packages/mfm) - Flutter-Parser
