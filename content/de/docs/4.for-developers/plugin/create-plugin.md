# Erstellen von Plugins

Die Plugin-Funktionalität des Misskey Webclients ermöglicht es, den Client zu erweitern und verschiedene Funktionen hinzuzufügen.
Hier erklären wir, wie man Plugins erstellt.

## Plug-in Beispiele

Ein Beispiel für ein vollständiges Plugin ist unten abgebildet. Dieses Plugin [`Plugin:register_post_form_action`](/docs/for-developers/plugin/plugin-api-reference/#pluginregister_post_form_actiontitle-fn), um dem Beitragsformular eine "Fugu Punch"-Schaltfläche hinzuzufügen.

Durch die Installation dieses Plugins wird dem Plugin-Menü auf dem Anmeldeformular ein Eintrag „Fugu Punch“ hinzugefügt. Klicke, um „Fugu Punch“ hinzuzufügen !!!! 🐡( ‚-‘ 🐡 )\` wird hinzugefügt.

```ais
/// @ 0.12.4
### {
  name: "フグパンチボタン"
  version: "0.0.1"
  author: "Misskey Project"
}

Plugin:register_post_form_action('フグパンチ', @(note, rewrite) {
  let fugu = "ﾌｸﾞﾊﾟﾝﾁ!!!!🐡( '-' 🐡 )"

  if (note.text.trim() == '') {
    // ノートの中身がない場合はフグパンチに置き換え
    rewrite('text', fugu)
  } else {
    // ノートの中身がある場合は冒頭にフグパンチを追加して改行
    rewrite('text', `{fugu}{Str:lf}{note.text}`)
  }
})
```

## AiScript

Plug-ins sind mit AiScript geschriebene Skripte.

## Metadaten

Plugins müssen benötigte Metadaten im AiScript Metadata-Format angeben.
Bei diesen Metadaten handelt es sich um ein Objekt mit folgenden Attributen: Beispiele für Metadaten sind.

```AiScript
/// @ 0.12.4
### {
  name: "プラグイン名"
  version: "4.2.1"
  author: "作者名"
  description: "説明文"
}
```

Metadaten sind ein Objekt, das die folgenden Eigenschaften enthält

### name

Name des Plugins

### author

Name des Plugin-Erstellers

### version

Version des Plugins. Muss eine Zahl sein.

### description

Beschreibung des Plugins

### Berechtigungen

Die vom Plugin geforderten Berechtigungen. Werden bei Anfragen der Misskey API verwendet.

Informationen zur Anforderung der API gibt es unter [AiScript Misskey Extension API Reference](/docs/for-developers/plugin/plugin-api-reference/).

:::tip

Eine Liste der Berechtigungen gibt es [hier](/docs/for-developers/api/permission/).

:::

### config

Ein Objekt, dass die Einstellungen des Plugins enthält.
Schlüssel representieren Namen von Einstellungen, und Werte sind einer der unten genannten Attribute.

#### type

Der Typ eines Einstellungswertes. Muss aus einem dieser Typen gewählt sein:
string number boolean

#### label

Dem Benutzer angezeigter Einstellungsname

#### description

Beschreibung der Einstellung

#### default

Standardwert der Einstellung

## API

Misskey Web stellt APIs für Plugins zur Verfügung, die zur Erweiterung der Funktionalität des Clients verwendet werden können.
Um herauszufinden, welche APIs verfügbar sind, lese die [AiScript Misskey Erweiterung und API-Plugins](. /plugin-api-reference/).

## Veröffentlichen des Plug-in's

Ab v2023.11.0 können Themes mit einem einzigen Klick direkt von Ihrer Website aus installieren.

Falls Funktionen zur Installation von Themen angeboten werden, muss eine API auf Ihrer Website implementiert werden. Informationen über die Einrichtung einer PWA gibt es [hier](../publish-on-your-website.md).
