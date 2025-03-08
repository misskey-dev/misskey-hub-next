# Benutzerdefinierte Emojis verwalten

:::warning

Derzeit wird dieses Dokument aktualisiert.Bitte beachte, dass veraltete Informationen enthalten sein können.

:::

Individuelle-Emojis können von Administratoren, Moderatoren und Benutzern mit der Rollenrichtlinie zur Verwaltung von Custom-Emojis über das Untermenü auf der Seite für Custom-Emojis in den Einstellungen verwaltet werden.Standardmäßig wird eine Liste der derzeit lokal installierten Emojis angezeigt.Anfangs ist diese Liste leer, aber es gibt verschiedene Möglichkeiten, Custom-Emojis hinzuzufügen.

## Emojis von anderen Instanzen kopieren

Emojis können einfach von anderen Instanzen kopiert werden.

Wechsle zunächst zum Tab „Remote” in den Custom-Emoji-Einstellungen.Emojis können nach Namen oder Host durchsucht werden.

Wenn du das gewünschte Emoji gefunden hast, klicke darauf, um das Menü zu öffnen und das Emoji zu importieren.

Da Emojis urheberrechtlich geschützt sein können, stelle sicher, dass du die Berechtigungen überprüfst, um festzustellen, ob sie verwendet werden dürfen.

## Import einzelner Emojis

Wenn du eine Bilddatei hast, die du als Individuelles-Emoji verwenden möchtest, kannst du diese als Emoji importieren.

:::danger

Wenn du ein Emoji aus deinem Drive importierst, bleibt die Datei im Drive gespeichert.Da Misskey keine Kopie dieser Datei erstellt, wird das Emoji nicht mehr angezeigt, wenn du die Datei löschst.

:::

Sobald das Emoji zum Server hinzugefügt wurde, kann es wie gewohnt bearbeitet oder gelöscht werden.

## Mehrere Dateien auf einmal importieren

Emojis können gesammelt als ZIP-Datei in einem speziellen Format importiert werden.
Diese Funktion ist über die Schaltfläche im oberen rechten Eck des Individuellen-Emoji-Menüs zugänglich.

:::warning

Die Massen-Importfunktion kann vorhandene Emojis überschreiben oder Serverprobleme verursachen.
Importiere daher möglichst nur die von dir exportierten Emojis und prüfe, ob die Quelle vertrauenswürdig ist, wenn du einen Massenimport von externen Quellen durchführst.

:::

### Format der paketierten Emojis

Im obersten Verzeichnis befindet sich eine Datei namens `meta.json`, die Informationen über die paketierten Emojis enthält.

Die Typdefinition dieser Datei ist wie folgt, wobei `Meta` die Struktur der gesamten Datei darstellt.

```typescript
class Meta {
	metaVersion: number;
	host: string;
	/**
	 * ECMAScript の `Date.prototype.toString` によって返される日時の表現。
	 */
	exportedAt: string;
	emojis: Emoji[];
}

class Emoji {
	downloaded: boolean;
	fileName: string;
	emoji: {
		id: string;
		updatedAt: string;
		name: string;
		host: null;
		category: string;
		originalUrl: string;
		publicUrl: string;
		uri: null;
		type: string;
		aliases: string[];
	};
}
```

Die Felder von `Meta` werden derzeit beim Import von Emojis nicht verwendet oder überprüft, aber das Feld `emojis` wird verwendet.

Für jedes `Emoji`:

- `downloaded`: Immer auf true setzen.Wenn dieses Feld fehlt oder nicht auf true gesetzt ist, wird das Emoji nicht importiert.
- `fileName`: Der Name der Bilddatei im paketierten Archiv.
- `emoji`: Daten, die mit dem in der Datenbank gespeicherten Emoji verknüpft sind.Die folgenden Felder werden derzeit verwendet:
  - `name`: Der Name des Emojis, den der Benutzer eingibt, z.B.: `blobfox` (wenn der Benutzer `:blobfox:` eingibt, wird dieses Emoji angezeigt).\
    Falls ein Emoji mit demselben Namen bereits existiert, wird es **überschrieben**.
  - `category`: Die Kategorie des Emojis.
  - `aliases`: Eine Liste von Zeichenfolgen, die als alternative Namen hinzugefügt werden.In der Administrator-Oberfläche wird dies als „Tags” bezeichnet.

## Bearbeiten und Löschen von Emojis

Die Eigenschaften eines Emojis können durch Klicken in der Liste der lokalen Emojis bearbeitet werden.
Wenn du auf ein Custom-Emoji klickst, öffnet sich ein Dialog, um dessen Eigenschaften zu bearbeiten. In diesem Dialog kannst du das Emoji auch löschen.

:::danger

Wenn ein Custom-Emoji gelöscht wird, bleibt der Emoji-Name als Text in den alten Notizen enthalten. Das Emoji wird dann nicht korrekt angezeigt.

:::

Bitte beachte, dass Remote-Emojis nicht bearbeitet oder gelöscht werden können.

Jedes Emoji kann mit einem Namen, einer Kategorie und mehreren Tags versehen werden.
Die Kategorie wird zur Strukturierung des Emoji-Pickers verwendet.
Tags dienen als alternative Namen, um Emojis im Emoji-Picker zu suchen.

Nach Abschluss der Bearbeitung klicke auf das Häkchen in der oberen rechten Ecke des Dialogs, um die Änderungen zu speichern.

### Mehrere bearbeiten

Emojis können durch Aktivieren der Checkbox unter dem Suchfeld in einem Zug bearbeitet werden.
Wenn dies aktiviert ist, öffnet sich durch Klicken auf ein Emoji kein Bearbeitungsdialog, sondern das Emoji wird ausgewählt.

Die Bearbeitungsoptionen werden als Schaltflächen unter der Checkbox angezeigt.
Um zur normalen Funktionalität zurückzukehren, deaktiviere die Checkbox erneut.
