# Fan-out Timeline Technology (FTT)

FTT ist eine der auf Misskey verfügbaren Serverfunktionen.

Wenn diese Funktion aktiviert ist, kann die Leistung beim Abrufen verschiedener Zeitleisten erheblich verbessert und die Belastung der Datenbank verringert werden,die Speichernutzung in Redis wird jedoch zunehmen.FTT kann deaktiviert werden, wenn der Server eine geringe Speicherkapazität hat oder instabil ist.

Die Einstellungen können über Systemsteuerung → Allgemein vorgenommen werden.

## Auf die Datenbank zurückfallen

- Wenn diese Option aktiviert ist, wird ein Fallback-Prozess durchgeführt, der zusätzlich die DB abfragt, wenn die Zeitleiste nicht zwischengespeichert ist.
- Die Deaktivierung reduziert die Serverlast weiter, da der Fallback-Prozess nicht durchgeführt wird, schränkt aber den Umfang der abrufbaren Zeitleisten ein.

## Zeiträume, in denen FTT angewendet werden kann.

- Startseite
- Lokale Timeline
- Soziale Timeline
- Benutzerdefinierte Timeline
