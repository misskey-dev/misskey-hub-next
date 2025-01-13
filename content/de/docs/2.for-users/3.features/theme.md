# Farbschema

Durch die Verwendung von Farbthemen kann das Aussehen des Misskey-Clients verändert werden.

## Designeinstellungen

[Einstellungen > Darstellung](x-mi-web://settings/theme)

## Erstellung eines Themas

Themencodes werden im Format eines JSON5-Objekts gespeichert.
Themen werden wie das folgende Objekt dargestellt:

```js
{
	id: '17587283-dd92-4a2c-a22c-be0637c9e22a',

	name: 'Danboard',
	author: 'syuilo',

	base: 'light',

	props: {
		accent: 'rgb(218, 141, 49)',
		bg: 'rgb(218, 212, 190)',
		fg: 'rgb(115, 108, 92)',
		panel: 'rgb(236, 232, 220)',
		renote: 'rgb(100, 152, 106)',
		link: 'rgb(100, 152, 106)',
		mention: '@accent',
		hashtag: 'rgb(100, 152, 106)',
		header: 'rgba(239, 227, 213, 0.75)',
		navBg: 'rgb(216, 206, 182)',
		inputBorder: 'rgba(0, 0, 0, 0.1)',
	},
}

```

- `id` ... Die einzigartige Identifikation des Themas.Verwendung von UUIDs ist empfohlen.
- `name` ... Themen-Name
- `author` ... Ersteller des Themas
- `desc` ... Beschreibung des Themas (optional)
- `base` ... Ob dies ein Thema für den Hell- oder Dunkelmodus ist
  - Wird light angegeben, so wird es als Thema des Hellmodus angezeigt, wird dark angegeben, so wird es als Thema des Dunkelmodus angezeigt.
  - Das Thema erbt die Eigenschaften der hier eingestellten Vorlage.
- `props` ... Definitionen der Themenoptionen.Diese werden im folgenden erläutert.

### Definition von Themenoptionen

Unter `props` wird der Stil des Themas definiert.
Der Schlüssel ist der Name der CSS-Variable und der Wert gibt den Inhalt an.
Beachte, dass dieses „props“-Objekt vom Basisthema erbt.
Das Basisthema ist [\_light.json5][_light.json5], wenn die `Basis` dieses Themas `light` ist und [\_dark.json5][_dark.json5], wenn es `dark` ist.
Das bedeutet, dass, auch wenn es in diesem Thema keinen Schlüssel `props` mit `panel` gibt, angenommen wird, dass es ein `panel` des Basisthemas gibt.

- [_light.json5]: https://github.com/misskey-dev/misskey/blob/develop/packages/frontend/src/themes/_light.json5
- [_dark.json5]: https://github.com/misskey-dev/misskey/blob/develop/packages/frontend/src/themes/_dark.json5

#### Syntax für Wertangaben

- Hexadezimalfarben
  - Beispiel: „#00ff00“
- \`RGB-Farben mit rgb(r, g, b)-Syntax
  - z.B.: rgb(0, 255, 0)\`
- \`RGBA-Farben mit rgb(r, g, b, a)-Syntax
  - z.B.: rgba(0, 255, 0, 0.5)\`
- Werte anderer Schlüssel referenzieren
  - Durch das angeben von @{Schlüsselname} wird dies durch eine Referenz auf den Wert des gegebenen Schlüssels ersetzt.Ersetze {Schlüsselname} mit dem Namen des Schlüssels, der referenziert werden soll.
  - Beispiel: `@panel`
- Konstantenreferenz (später erläutert)
  - Durch das angeben von ${Konstantenname} wird dies durch eine Referenz auf den Wert der angegebenen Konstante ersetzt.Ersetze {Konstantenname} durch den Namen der Konstanten, die referenziert werden soll.
  - Beispiel: `$main`
- Funktionen (später erläutert)
  - `:{Funktionsname}{Parameter}{Farbe}`

#### Konstante

In Fällen, in denen ein Wert nicht als CSS-Variable angesehen werden soll, sondern als Wert für eine andere CSS-Variable verwendet werden soll, eignet sich die Verwendung einer Konstante.
Wird ein Wert mit einem <code>$</code>-Präfix versehen, so wird er nicht als CSS-Variable, sondern als Referenz angesehen.

#### Funktionen

Funktionen sind nützlich, wenn du eine Farbe verwenden möchtest, die leicht von einer bestehenden Farbe abweicht, z. B. „Ich möchte die Farbe nur aufhellen, wenn ich den Mauszeiger über eine Schaltfläche bewege“.

Sie kann in der Form `:{Funktionsname}<{Argumente}<{Verweis auf Farbe oder anderen Schlüssel}` verwendet werden.

```js
props: {
	accent: '#86b300',
	accentDarken: ':darken<10<#86b300',
	accentLighten: ':lighten<10<@accent'
}
```

##### Vorhandene Funktionen

- `lighten` ... Gibt die Farbe der übergebenen Farbe zurück, wobei das Argument (0 ~ 100) zur Leuchtdichte (0 ~ 100) der übergebenen Farbe addiert wird.
- `darken` ... Gibt die von dem Argument (0 ~ 100) subtrahierte Farbe für die übergebene Farbhelligkeit (0 ~ 100) zurück
- `alpha` ... Gibt eine Farbe zurück, bei der die Transparenz der übergebenen Farbe auf das Argument (0.0 ~ 1.0) eingestellt ist
  - Vollständig transparent bei 0,0, vollständig undurchsichtig bei 1,0
- `hue` ... Gibt die um den Wert des Arguments (-360 ~ 360) gedrehte Farbe für den übergebenen Farbton (-360 ~ 360) zurück
- `saturate` ... Gibt die Farbe des Arguments (0 ~ 100) addiert mit der Sättigung (0 ~ 100) der übergebenen Farbe zurück

## Erstellung eines Themas

Ab v2023.11.0 können Sie Themes mit einem einzigen Klick direkt von Ihrer Website aus installieren.

Falls Funktionen zur Installation von Themen angeboten werden, muss eine API auf Ihrer Website implementiert werden.Für weitere Informationen [hier klicken](../../for-developers/publish-on-your-website/)
