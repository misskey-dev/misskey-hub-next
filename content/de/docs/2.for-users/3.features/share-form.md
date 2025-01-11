# Formular teilen

Öffne `/share` auf Misskey Web, um das Einreichungsformular zum Teilen zu öffnen.Dieses Freigabeformular ist nützlich, wenn Benutzer Seiteninhalte mit Misskey von einer externen Webseite aus teilen.

In der URL können mehrere Optionen angegeben werden, einschließlich des gemeinsamen Inhalts als Abfrageparameter.

## Abfrage-Parameter

:::tip

Alle Parameter sind **optional** und nicht obligatorisch.

:::

| Name    | Beschreibung                                                                                       |
| ------- | -------------------------------------------------------------------------------------------------- |
| `title` | Titel[ … ] wird am Anfang des Textes eingefügt |
| `text`  | Text                                                                                               |
| `url`   | URLwird am Ende des Textes eingefügt                                                               |

### Informationen zu Antworten

Eine der folgenden Möglichkeiten kann als Antwort auf eine bestimmte Notiz angegeben werden.

| Name       | Beschreibung                                                                 |
| ---------- | ---------------------------------------------------------------------------- |
| `replyId`  | Notiz-ID, an die die Antwort gesendet wird                                   |
| `replyUri` | URL zum Antworten(Geben Sie das entfernte Notizobjekt an) |

### Renote melden

Renote (Zitat) für eine bestimmte Notiz erstellen, indem eine der folgenden Angaben gemacht werden.

| Name        | Beschreibung                                                                    |
| ----------- | ------------------------------------------------------------------------------- |
| `renoteId`  | Notiz-ID des Renote-Ziels                                                       |
| `renoteUri` | URL des Renote-Ziels(Geben Sie das entfernte Notizobjekt an) |

### Sichtbarkeit

Die folgenden Optionen können verwendet werden, um den Umfang der Veröffentlichung festzulegen.

| Name             | Beschreibung                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------ |
| `visibility`     | `public`, `home`, `followers`, `specified`                                                 |
| `localOnly`      | 0(false) or 1(true)                                  |
| `visibleUserIds` | Ziel-User-ID (durch Komma getrennt)                                     |
| `visibleAccts`   | Zielbenutzer [acct](../resources/glossary/#acct) (durch Komma getrennt) |

:::warning

Wenn für „visibility“ „specified“ angegeben wird, müssen auch „VisibleUserIds“ oder „VisibleAccts“ angegeben werden.

:::

### Anhang

Die folgenden Optionen können verwendet werden, um Anhänge zu spezifizieren.

| Name      | Beschreibung                                                         |
| --------- | -------------------------------------------------------------------- |
| `fileIds` | ID der anzuhängenden Datei (durch Komma getrennt) |

## Über den gemeinsamen Formular-Relay-Service von Misskey Hub

<a name="hub-share-disclaimer" id="hub-share-disclaimer"></a>

Der neue Misskey Hub bietet einen Relay Service für die Freigabe von Formularen, um den Schweregrad der Einrichtung von Misskey Share Buttons zu reduzieren.\
Dieser Dienst ist kostenlos und steht jedem offen.

Einfach den Domain-Teil jedes Servers den bestehenden gemeinsamen Formular-Links in `misskey-hub.net` ändern und es wird sich in einen gemeinsamen Link zu den verschiedenen Misskey-Servern verwandeln!

:::tip

Versuche auch mal den [share button generator](/tools/share-link-generator/)

:::

:::warning

Der Shared Form Relay Service (im Folgenden als „Service“ bezeichnet) ist eine kostenlose und nicht garantierte Funktion, die von Misskey Project (im Folgenden als „wir“ bezeichnet) für die Bequemlichkeit von Website-Administratoren bereitgestellt wird.Wir haften nicht für Verluste oder Schäden, die sich aus der Nutzung dieses Dienstes oder aus der Unfähigkeit, ihn zu nutzen, ergeben.

:::

### Basis-Parameter

Grundsätzlich können die oben vorgestellten Parameter so verwendet werden, wie sie sind. Es können keine Parameter verwendet werden, die **vom jeweiligen Server abhängig sind, wie z. B. Benutzer- und Datei-IDs.** Wenn sie gemeldet wurden, werden sie aus dem Misskey Hub gelöscht.

### Exklusive Funktionen

#### Empfohlene Serverfunktionen

Durch Eingabe der Domäne des Misskey-Servers in den URL-Parameter `manualInstance` kann ein Link zu diesem Server in einem separaten Feld als 'Empfehlung der Website der Freigabequelle' platziert werden.Beispielsweise, um Besucher auf den eigenen Server zu leiten.

:::warning

Die Funktion „Empfohlener Server“ ist eine Funktion, die für die Bequemlichkeit von Website-Administratoren eingerichtet wurde, und bedeutet nicht, dass wir die Server im Feld „Empfehlungen von der Share Source Website“ empfehlen.

WICHTIG: Wir haften nicht für Schäden oder Nachteile, die sich aus der Nutzung oder Registrierung von Servern ergeben, die von „Recommendations from the Share Source Website“ übernommen wurden.

:::
