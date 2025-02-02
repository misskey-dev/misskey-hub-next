# AiScript

AiScript ist eine Skriptsprache, die in den folgenden Bereichen von Misskey verwendet werden kann.

- [Plugins](./plugin/create-plugin/)
- [Widgets](/docs/for-users/features/widgets/)
  - Schaltflächen
  - AiScript-Konsole
  - AiScript-Anwendung
- [Misskey Play](./plugin/create-play/)
- Scratchpad

:::tip

Die Implementierung von AiScript ist in einem separaten Repository von Misskey und [als Open Source verfügbar](https://github.com/aiscript-dev/aiscript).

:::

## So geht's

Die Standard-Syntax und eingebauten Funktionen von AiScript können verwendet werden.

:::tip

Die Dokumentation findest du [hier](https://aiscript-dev.github.io/).
Die verwendbare AiScript-Version kann je nach Misskey-Hauptversion variieren.Um die Version zu überprüfen, führe bitte `<: Core:v` im Scratchpad oder einem ähnlichen Bereich aus.

:::

Zusätzlich werden die speziellen eingebauten Konstanten und Funktionen von Misskey in drei Gruppen unterteilt.

### Misskey AiScript API

Präfix: `Mk:`\
Eine Gruppe von Konstanten und Funktionen, die in allen AiScript-Umgebungen in Misskey verwendet werden können. Weitere Informationen findest du im [AiScript Misskey Erweiterungs-API-Referenz](./plugin/plugin-api-reference/) im Abschnitt `Mk:`.

### Plugin-API

Präfix: `Plugin:`\
Eine Gruppe von Konstanten und Funktionen, die nur in [Plugins](./plugin/) verwendet werden können. Weitere Informationen findest du im [AiScript Misskey Erweiterungs-API-Referenz](./plugin/plugin-api-reference/) im Abschnitt `Plugin:`.

### UI API

Präfix: `Ui:`\
Kann in [Widgets](/docs/for-users/features/widgets/) (AiScript App), [Misskey Play](./plugin/create-play/) und Scratchpad verwendet werden. Weitere Informationen findest du im [AiScript Misskey Erweiterungs-API-Referenz](./plugin/plugin-api-reference/) im Abschnitt `Ui:`.

### Standard-Ein- & Ausgabe

Die interne Implementierung der in AiScript definierten `readline`- und `print`-Funktionen (sowie der `<:`-Syntax) wird von Misskey selbst bereitgestellt.

#### readline(message)

`message`: `str`\
Rückgabewert: `str`\
Kann in allen AiScript-Umgebungen innerhalb von Misskey verwendet werden.\
Ein Popup-Fenster wird angezeigt, das die Eingabe einer Zeichenfolge anfordert.

#### print(message)

`message`: `any`\
Rückgabewert: `null`\
Kann in [Widgets](/docs/for-users/features/widgets/) (AiScript-Konsole) und Scratchpad verwendet werden.\
Gibt eine Zeichenfolge in die Konsole aus.\
Die `<:`-Syntax funktioniert auf die gleiche Weise.
