# AiScript Misskey-Erweiterung API Referenz

In diesem Abschnitt wird die erweiterte AiScript-API in Misskey vorgestellt.

:::tip

Die Standard-AiScript-API finden gibt es [hier] (https://aiscript-dev.github.io/guides/get-started.html).

:::

## Gemeinsame Konstanten für alle Felder

### `USER_ID`

ID des aktuellen Benutzers

### `USER_NAME`

Name des aktuellen Benutzers.

### `USER_USERNAME`

Das Handle des aktuellen Benutzers (der Teil nach dem `@`.(z. B. `@ai@example.com` → `ai`)

### `CUSTOM_EMOJIS`

Liste der benutzerdefinierten EmojiDie folgenden Objekte werden in Arrays gespeichert

```ts
type EmojiSimple = {
  aliases: string[];
  name: string;
  category: string | null;
  url: string;
  localOnly?: boolean;
  isSensitive?: boolean;
  roleIdsThatCanBeUsedThisEmojiAsReaction?: string[];
}
```

### `LOCALE`

Aktuelle Misskey Web Einrichtungssprache.Darstellung in einem RFC4646-kompatiblen Format (z.B. `ja-JP`)

### `SERVER_URL`

Aktuelle Server-URLRepräsentiert durch z. B. `https://www.example.com`.

## Gemeinsame Funktionen in allen Bereichen

### `Mk:dialog(title, text, type)`

Zeigt ein Dialogfenster an.Die folgenden Werte können für ype eingestellt werden.\
`info` `success` `warning` `error` `question`\
Standard ist `info`¸ wenn kein anderes Attribut erstellt wurde.

### `Mk:toast(text)`

トーストを表示します。ダイアログと違い、ユーザーがダイアログを閉じる操作が必要ないため、何らかの操作が完了したなどの単純なお知らせに使用できます。

**この関数は2025.5.1（仮称）でリリース予定のものです。**

### `Mk:confirm(title, text, type)`

Zeigt ein Dialogfenster an.Für type können die folgenden Werte eingestellt werden.\
`info` `success` `warning` `error` `question`\
Standard ist `question`¸ wenn kein anderes Attribut erstellt wurde.\
Gibt `true` zurück, wenn der Benutzer „OK“ wählt oder `false`, wenn der Benutzer „Cancel“ wählt.

```AiScript
let response = Mk:confirm(
  'Bist du sicher？'
  'Dieser Vorgang kann nicht rückgängig gemacht werden.'
  'warning'
)

if (response) {
  // OK, bestätigen
} else {
  // Abbruch
}
```

### `Mk:api(endpoint, params, token?)`

Sendet eine Misskey API-Anfrage.Der erste Parameter gibt den API-Endpunkt an, der zweite die Anfrageparameter als Objekt.

Als drittes Argument kann auch ein token angegeben werden.Bei der Arbeit mit Plugins wird, wenn im Metadatenblock „Berechtigungen“ angegeben sind, das Token mit der Berechtigung verwendet, wenn das dritte Argument nicht angegeben ist.

:::tip

Eine Liste der Berechtigungen gibt es [hier](/docs/for-developers/api/permission/).

:::

```AiScript
### {
  name: "プラグイン名",
  version: "4.2.1",
  author: "作者名",
  description: "説明文",
  permissions: ['write:notes'],
}

@onClick() {
  let res = Mk:api('notes/create', {
    text: 'Hello from plugin!'
  })
}
```

### `Mk:save(key, value)`

Speichert einen beliebigen Wert dauerhaft unter einem beliebigen Namen.Der gespeicherte Wert bleibt auch nach Verlassen des AiScript-Kontexts erhalten und kann mit Mk:load ausgelesen werden.

### `Mk:load(key)`

Läd den Wert des gegebenen Schlüssels, der zuvor mit Mk:save gespeichert wurde

### `Mk:remove(key)`

\*Verfügbar ab v2025.1.0 (vorläufig).

Läd den Wert des gegebenen Schlüssels, der zuvor mit Mk:save gespeichert wurdeWenn der Wert mit dem angegebenen Namen nicht existiert, wird nichts unternommen.

### `Mk:url()`

Ermittelt die URL der aktuell geöffneten Seite (die URL, die in der Adressleiste des Browsers angezeigt wird).

### `Mk:nyaize(text)`

Verkleinert den angegebenen Text.MFM-Syntax etc. werden nicht berücksichtigt.

## Plug-in Beispiele

### `Plugin:register_post_form_action(title, fn)`

Fügt dem Beitragsfenster eine Aktion hinzu.Das erste Argument ist der Name der Aktion und das zweite Argument ist die Callback-Funktion, wenn die Aktion ausgewählt wird.\
Die Callback-Funktion erhält als erstes Argument den `Text` und `cw` der übermittelten Formularobjekte und als zweites Argument die Funktion, die sie umschreiben soll.

```AiScript
Plugin:register_post_form_action('メニューに表示される項目名', @(note, rewrite) {

  // ノートに何らかの変更を加える
  rewrite('text', `{note.text}{Str:lf}#ハッシュタグ`)
})
```

### `Plugin:register_note_action(title, fn)`

Fügt dem Notiz-Menü ein Listenelement hinzu.Das erste Argument ist der Name des Elements und das zweite Argument ist die Callback-Funktion, wenn das Element ausgewählt ist.\
Der Callback-Funktion wird als erstes Argument ein Ziel-notizen-Objekt übergeben.

```AiScript
Plugin:register_note_action('メニューに表示される項目名', @(note) {

  // ノートを使って何かする
  Mk:api('notes/create', {
    text: '引用'
    renoteId: note.id
  })

```

### `Plugin:register_user_action(title, fn)`

Fügt dem Benutzer-Menü ein Listenelement hinzu.Das erste Argument ist der Name des Elements und das zweite Argument ist die Callback-Funktion, wenn das Element ausgewählt ist.\
Der Callback-Funktion wird ein Zielbenutzerobjekt als erstes Argument übergeben.

```AiScript
Plugin:register_note_action('メニューに表示される項目名', @(note) {

  // ノートを使って何かする
  Mk:api('notes/create', {
    text: '引用'
    renoteId: note.id
  })

```

### `Plugin:register_note_view_interruptor(fn)`

Schreibt die in der Benutzeroberfläche angezeigten Notizinformationen um.\
Der Callback-Funktion wird als erstes Argument ein Ziel-notizen-Objekt übergeben.\
Die Notiz wird in den Rückgabewert der Callback-Funktion umgeschrieben.\
Die Rückgabe von `null` blendet die Notiz aus.

```AiScript
Plugin:register_note_view_interruptor(@(note) {
  
  // ノートの中身を書き換える
  note.text = note.text.replace('リンゴ', 'バナナ')

  // nullを返すと非表示
  if (note.text.incl('納豆')) {
    return null
  }

  return note
})
```

### `Plugin:register_note_post_interruptor(fn)`

Die Informationen zur Notiz werden beim Einreichen der Notiz neu geschrieben.\
Der Callback-Funktion wird als erstes Argument ein Ziel-notizen-Objekt übergeben.\
Die Notiz wird in den Rückgabewert der Callback-Funktion umgeschrieben.

```AiScript
Plugin:register_note_post_interruptor(@(note) {
  
  // ノートの中身を書き換える
  note.text = note.text.replace('リンゴ', 'バナナ')

  return note
})
```

### `Plugin:register_page_view_interruptor(fn)`

Die Seiteninformationen werden neu geschrieben, wenn die Seite angezeigt wird.\
Der Callback-Funktion wird ein Ziel-Seitenobjekt als erstes Argument übergeben.\
Die Seite wird mit dem Rückgabewert der Callback-Funktion neu geschrieben.

```AiScript
Plugin:register_note_post_interruptor(@(page) {
  
  // ページの中身を書き換える（省略）

  return page
})
```

### `Plugin:open_url(url)`

Die als erstes Argument übergebene URL wird in einer neuen Registerkarte des Browsers geöffnet.

### `Plugin:config`

Ein Objekt, dass die Plugin-Einstellungen enthält.Die in den Plugin-Einstellung eingetragenen Werte sind hier unter den Einstellungsnamen gespeichert.

## Play Attribute

### `THIS_ID`

Play erstellen

### `THIS_URL`

Play URL

## UI-Steuerungsfunktionen (verfügbar für Play- und AiScript-App-Widgets)

### `Ui:root`

Stammelement der Benutzeroberfläche.

### `Ui:render([ ...components ])`

Syntaktischer Zucker für `Ui:root.update({ children: [ ...components ] })`.Das UI-Root-Element wird überschrieben.

```AiScript
Ui:render([
  Ui:C:text({text: "A"})
  Ui:C:button({text: "B", onClick: @(){}})
])
```

### `Ui:get(id)`

ID-zugewiesene Komponenten abrufen und Aktionen durchführen.

```AiScript
Ui:C:text({text: "A"}, "text1")
Ui:get("text1").update({text: "B"})
```

## Komponentenfunktionen (verwendbar mit Play und AiScript App-Widgets)

In den folgenden Elementen kann beim Initialisieren die ID der Komponente als zweites Argument wie `Ui:C:xxx(props id)` angegeben werden (in den folgenden Referenzen wird dies überall weggelassen).Die angegebene ID kann mit der Funktion `Ui:get(id)` abgerufen und mit der `update`-Funktion direkt geändert werden (weitere Informationen findest du in der Referenz zu `Ui:get(id)`).

### Listenmodus

#### `Ui:C:container`

Ein Rahmen (Container), der Formatierungen wie Einrücken und Farbgebung ermöglicht.

```AiScript
Ui:C:container({
  children: [
    // コンテナの中に入れたいコンポーネントの配列
    Ui:C:text({text: "A"})
  ]
  align: 'center' // 幅寄せ left,center,right
  bgColor: '#000' // 背景色
  fgColor: '#00f' // 文字色
  font: 'serif' // フォント serif,sans-serif,monospace
  borderWidth: 1 // 枠幅
  borderColor: '#f00' // 枠の色
  borderStyle: 'solid' // 枠の柄
  padding: 1 // 余白幅
  rounded: false // 角を丸く
  borderRadius: 1 // 角を丸く（丸みの度合いを数値指定）
  hidden: false // 隠す
})
```

#### `Ui:C:folder`

Ein Akkordeon-Element (ein Container, den Benutzer öffnen und schließen können)

```AiScript
Ui:C:folder({
  children: [
    // コンテナの中に入れたいコンポーネントの配列
    Ui:C:text({text: "A"})
  ]
  title: "タイトル" // フォルダの開閉部分に記載するタイトル
  opened: true // はじめから開いているか
})
```

### Text

#### `Ui:C:text`

Unformatierter Text

```AiScript
Ui:C:text({
  text: "Inhalt" // Anzuzeigender Text
  size: 1 // Schriftgröße
  bold: false // Fettgedruckt
  color: '#000' // Farbe
  font: 'monospace' // Schriftart serif, sans-serif, monospace
})
```

#### `Ui:C:mfm`

MFM-Text

```AiScript
Ui:C:mfm({
  text: "Inhalt" // Anzuzeigender Text
  size: 1 // Schriftgröße
  bold: false // Fettgedruckt
  color: '#000' // Farbe
  font: 'monospace' // Schriftart serif, sans-serif, monospace
  onClickEv: @(id) {
    // MFM-Syntax-Handler für $[clickable.ev=eventId TEXT]
    <: `{id} angeklickt`
  }
})

```

### Formulare

#### `Ui:C:button`

Schaltflächen

```AiScript
Ui:C:button({
  text: "Button" // Anzuzeigender Text auf dem Button
  onClick: @() {
    // Event beim Drücken des Buttons
  }
  primary: false // Soll eine Farbe hinzugefügt werden?
  rounded: false // Sollen die Ecken abgerundet sein?
  disabled: false // Soll der Button deaktiviert sein?
})

```

#### `Ui:C:buttons`

Schaltflächen (nebeneinander)

```AiScript
Ui:C:buttons({
  buttons: [ // Array von Button-Definitionen. Die Angabe der Props erfolgt wie bei Ui:C:button
    {text: "a", onClick: @(){...}}
    {text: "b", onClick: @(){...}}
  ]
})

```

#### `Ui:C:switch`

```AiScript
Ui:C:switch({
  onChange: @(enabled) { 
    // Event, wenn der Zustand geändert wird. Das erste Argument ist der neue Zustand (Boolean)
  }
  default: false // Standardwert
  label: "Label" // Text neben dem Schalter
  caption: "Caption" // Hilfetext, der unter dem Schalter angezeigt wird
})

```

#### `Ui:C:textInput`

Einzeilige Texteingabe

```AiScript
Ui:C:textInput({
  onInput: @(text) {
    // Event, wenn Text eingegeben wird. Das erste Argument ist der neue Wert
  }
  default: "Standard" // Standardwert
  label: "Label" // Text über dem Eingabefeld
  caption: "Caption" // Hilfetext, der unter dem Eingabefeld angezeigt wird
})

```

#### `Ui:C:numberInput`

Einzeilige Texteingabe

```AiScript
Ui:C:numberInput({
  onInput: @(number) {
    // Event, wenn eine Zahl eingegeben wird. Das erste Argument ist der neue Wert
  }
  default: "Standard" // Standardwert
  label: "Label" // Text über dem Eingabefeld
  caption: "Caption" // Hilfetext, der unter dem Eingabefeld angezeigt wird
})

```

#### `Ui:C:textarea`

Mehrzeiliges Texteingabefeld

```AiScript
Ui:C:textarea({
  onInput: @(text) {
    // Event, wenn Text eingegeben wird. Das erste Argument ist der neue Wert
  }
  default: "Standard" // Standardwert
  label: "Label" // Text über dem Eingabefeld
  caption: "Caption" // Hilfetext, der unter dem Eingabefeld angezeigt wird
})

```

#### `Ui:C:select`

Ein Format, bei dem aus mehreren Werten einer ausgewählt wird.

```AiScript
Ui:C:select({
  items: [ // Array von Auswahlmöglichkeiten. Für text den anzuzeigenden Text und für value den Wert, der beim Ereignis übergeben wird
    {text: "A", value: "v1"}
    {text: "B", value: "v2"}
  ]
  onChange: @(value){
    // Event bei Änderung. Das erste Argument ist der neue value
  }
  default: "v1" // Standardwert für value
  label: "Label" // Text über dem Eingabefeld
  caption: "Caption" // Hilfetext unter dem Eingabefeld
})

```

### Verwandt mit dem Veröffentlichen von Notizen

#### `Ui:C:postForm`

Ein Einreichungsformular direkt in Play einbetten.

```AiScript
Ui:C:postForm({
  form: {
    cw: "CW-Anmerkung" // Text für die "Zusammenfassung", wenn CW angegeben wird
    text: "Inhalt des Beitrags" // Standardtext des Eingabeformulars

    // Folgendes kann ab Misskey v2024.5.0 angegeben werden
    visibility: "home" // Standard-Sichtbarkeit des Beitrags (wenn nicht angegeben, öffentlich)
    localOnly: false // Standardmäßig keine Föderation (wenn nicht angegeben, false)
  }
})
```

#### `Ui:C:postFormButton`

Ein spezieller Button, der ein Einreichungsformular aufruft.

```AiScript
Ui:C:postFormButton({
  text: "Post!" // Anzuzeigender Text auf dem Button
  primary: false // Soll eine Farbe hinzugefügt werden?
  rounded: false // Sollen die Ecken abgerundet sein?
  form: {
    cw: "CW-Anmerkung" // Text für die "Zusammenfassung", wenn CW angegeben wird
    text: "Inhalt des Beitrags" // Standardtext des Eingabeformulars

    // Folgendes kann ab Misskey v2024.5.0 angegeben werden
    visibility: "home" // Standard-Sichtbarkeit des Beitrags (wenn nicht angegeben, öffentlich)
    localOnly: false // Standardmäßig keine Föderation (wenn nicht angegeben, false)
  }
})
```
