# Einbetten von Inhalten

Du kannst Notizen und Zeitleisten vom Misskey-Server in deine Website einbinden, sowie flexibel an das Design deiner Website anpassen.

In diesem Abschnitt wird erläutert welche Inhalte eingebettet werden kann und wie das funktioniert.

:::warning

Diese Funktion ist ab Misskey v2024.9.0 verfügbar.

:::

:::tip

Es unterstützt auch MFM und benutzerdefinierte Emojis, aber das Layout kann je nach Darstellung, die Einbettungsseite im Design verändern.

:::

## Codes Generieren

Alle im Folgenden beschriebenen Einbettungscodes und ihre Anpassung können leicht mit dem integrierten Einbettungscode-Generator von Misskey Web erstellt werden.
Wir empfehlen grundsätzlich, diesen zu verwenden.

![Generator für eingebetteten Code](/img/docs/for-users/features/embed/generator.png)

## Einbetten einer einzelnen Notiz

::MiWebEmbed{src="https://0key.dev/embed/notes/9tht7ungi81f0005"}
::

Eine einzelne Notiz kann auf dem Heimserver eingebettet werden (Notizen auf einem förderierten Server können nicht über einen anderen Server eingebettet werden).Dein Code sollte jetzt so aussehen:

```html
<iframe
    src="https://<HOST>/embed/notes/<NOTE_ID>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

Jede dieser Angaben wird durch folgende ersetzt:

- `<HOST>`: Hostname des Misskey Servers
- `<NOTE_ID>`: ID der Notiz
- `<RANDOM>`: Zufällige Zeichenfolge (erforderlich, wenn embed.js verwendet wird.Bitte stelle sicher, dass sich die Einbettungscodes auf derselben Seite nicht überschneiden, wenn es mehrere gibt

## Einfügen einer Liste an User-Notizen

::MiWebEmbed{src="https://0key.dev/embed/user-timeline/9tht7g9ki81f0002?maxHeight=500"}
::

Eine Liste der öffentlichen Notizen der Benutzer (öffentliches Zuhause) kann eingebettet werden.Dein Code sollte jetzt so aussehen:

```html
<iframe
    src="https://<HOST>/embed/user-timeline/<USER_ID>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

Jede dieser Angaben wird durch folgende ersetzt:

- `<HOST>`: Hostname des Misskey Servers
- `<USER_ID>`: ID des einzubettenden Benutzers (nicht der mit „@“ beginnende Benutzername)
- `<RANDOM>`: Zufällige Zeichenfolge (erforderlich, wenn embed.js verwendet wird.Bitte stelle sicher, dass sich die Einbettungscodes auf derselben Seite nicht überschneiden, wenn es mehrere gibt)

## Liste der Notizen in einen Clip einbetten

::MiWebEmbed{src="https://0key.dev/embed/clips/9y5mpno6871g00gv?maxHeight=500"}
::

Du kannst eine Liste von Notizen für Clips einbinden, deren Veröffentlichungsbereich öffentlich istDein Code sollte jetzt so aussehen:

```html
<iframe
    src="https://<HOST>/embed/clips/<CLIP_ID>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

Jede dieser Angaben wird durch folgende ersetzt:

- `<HOST>`: Hostname des Misskey Servers
- `<CLIP_ID>`: ID des Clips, der eingebettet werden soll
- `<RANDOM>`: Zufällige Zeichenfolge (erforderlich, wenn embed.js verwendet wird.Bitte stelle sicher, dass sich die Einbettungscodes auf derselben Seite nicht überschneiden, wenn es mehrere gibt)

## Einbettung von Hashtags in die Notizliste

::MiWebEmbed{src="https://0key.dev/embed/tags/misskey?maxHeight=500"}
::

Du kannst eine Liste von Notizen mit einem bestimmten Hashtag einbindenDein Code sollte jetzt so aussehen:

```html
<iframe
    src="https://<HOST>/embed/tags/<TAG>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

Jede dieser Angaben wird durch folgende ersetzt:

- `<HOST>`: Hostname des Misskey Servers
- `<TAG>`: Hashtag-Name (ohne `#`)
- `<RANDOM>`: Zufällige Zeichenfolge (erforderlich, wenn embed.js verwendet wird.Bitte stelle sicher, dass sich die Einbettungscodes auf derselben Seite nicht überschneiden, wenn es mehrere gibt)

## Parameter für die individuelle Anpassung

Das Aussehen der Einbettung kann durch die Angabe bestimmter Werte für den URL-Parameter angepasst werden.

<table>
	<tbody><tr>
		<th>Name des Parameters</th>
		<th>Werte, die festgelegt werden können</th>
		<th>Beschreibung</th>
	</tr>
    <tr>
		<td><code>maxHeight</code></td>
		<td>Wert ≥ 0</td>
		<td>
            Gibt die maximale Höhe (px) der Einbettung an.Falls sie länger wird, kannst du innerhalb des Bereichs scrollen.<br>
Wenn <code>0</code> angegeben wird, wird die Höhe des eingebetteten Elements automatisch erweitert, um der internen Höhe zu entsprechen <b> (nicht empfohlen) </b>.<br>
Wenn nicht anders angegeben, beträgt der Wert <code>700</code>.<br>
Funktioniert nicht bei der Einbettung einer einzelnen Notiz.        
</td>
	</tr>
	<tr>
		<td><code>colorMode</code></td>
		<td>
            <ul>
                <li><code>light</code></li>
                <li><code>dark</code></li>
            </ul>
        </td>
		<td>Den Farbmodus auf Hell oder Dunkel erzwingen.<br>Synchronisiert sich mit dem Dunkelmodus des Geräts, wenn nicht anders angegeben.</td>
	</tr>
	<tr>
		<td><code>border</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>Fragt, ob ein Rahmen um den äußeren Rand hinzugefügt wird.Standardmäßig auf <code>true</code></td>
	</tr>
	<tr>
		<td><code>rounded</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>Fragt, ob die Ecken abgerundet werden sollen.Standardmäßig auf <code>true</code></td>
	</tr>
	<tr>
		<td><code>showHeader</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>
            Fragt, ob der obere Header angezeigt wird.Standardmäßig <code>true</code>. <br>Funktioniert nicht bei der Einbettung einer einzelnen Notiz.    
        </td>
	</tr>
</tbody></table>

:::g-details{summary="maxHeight=0 の使い道"}

Es wird grundsätzlich nicht empfohlen, `maxHeight` auf `0` zu setzen. Für spezielle Anwendungen, wie z.B. wenn der Scroll-Container nicht im iframe, sondern auf der eingebetteten Website bereitgestellt werden soll, kann dies jedoch nützlich sein.Nachfolgend sind Beispiele aufgeführt:

```html
<div class="misskey-embed">
    <div class="custom-header">
        Misskeyやってます！
    </div>
    <div class="iframe-container">
        <iframe
            src="https://<HOST>/embed/user-timeline/<USER_ID>?maxHeight=0&showHeader=false&border=false&rounded=false"
            data-misskey-embed-id="v1_<RANDOM>"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
        ></iframe>
    </div>
</div>

<style>
    .misskey-embed {
        border: 1px solid #ccc;
        border-radius: 5px;
        overflow: hidden;
    }

    .custom-header {
        background-color: #f0f0f0;
        padding: 10px;
    }

    .iframe-container {
        max-height: 500px;
        overflow-y: auto;
    }
</style>
```

:::
