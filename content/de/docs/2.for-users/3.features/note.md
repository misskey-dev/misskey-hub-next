# Notiz

Das Zentrale Konzept hinter Misskey, sind die Notizen. Hierbei werden wie z.B. Texte, Dateien, Umfragen, usw. veröffentlicht.Das Erstellen einer Notiz wird ebenfalls als Notiz benannt.

:::tip

Der Name Notiz leitet sich von dem englischen Wort Note ab, was so viel wie „kurze Aufzeichnung“ bedeutet.

:::

Wenn eine Notiz erstellt wird, wird sie zur [Timeline](./timeline) hinzugefügt und ist für [Follower](./follow) und User auf dem Server sichtbar.

Die Notiz kann mit [Reaktionen](./reaction) versehen werden.Hierbei sind auch das Antworten oder das Zitieren der Notiz möglich.

Notizen können auch als [favorit](./favorite) hinterlegt werden, um sie so später wiederfinden zu können, um z.B. vor deinen Freunden angeben zu können.

## Notizen schreiben oder löschen

Um eine Notiz in Misskey Web zu erstellen, drücke auf die Schaltfläche mit dem Bleistiftsymbol auf dem Bildschirm, um das Erstellungsfenster zu öffnen.Eine Notiz wird erstellt, indem der Inhalt in das Erstellungsfenster eingegeben und die Schaltfläche [Notiz] gedrückt wird.
Die Notiz kann eine beliebige Datei enthalten, z. B. ein Bild oder ein Video, oder eine [Umfrage](./poll) kann an die Notiz angehängt werden.Darüber hinaus können [MFM](./mfm) im Text verwendet werden, [Erwähnungen](./mention), sowie [hashtags](./hashtag) eingefügt werden.
Es können auch andere Einstellungen wie Inhaltswarnungen und Publikationsbereich festgelegt werden (Mehr dazu weiter unten).

:::tip

Misskey Web ermöglicht, Bilddaten aus der Zwischenablage hochzuladen und in die Drive zu speichern. Damit können jederzeit Bilder für eine Notiz hochgeladen werden.

:::

:::tip

Auf Misskey Web kann man über die Tastatur auch posten. Einfach <0>Strg + Enter</0> in der Notizerstellung drücken.

:::

## Erneutes Zitieren

Das Zitieren oder Teilen einer bestehenden Notiz als neue Notiz oder einer auf diese Weise erstellten Notiz wird als „erneutes Zitieren“ bezeichnet.
Dies wird verwendet, wenn Sie eine Lieblingsnotiz eines Nutzers, dem du folgst, mit deinen Followern teilen möchtes, oder wenn du eine Notiz aus der Vergangenheit neue Aufmerksamkeit geben möchtest.
Es kann jederzeit und beliebig viel erneut Zitiert werden, beachte hierbei aber auch das es als unangemessen empfunden werden kann, eine Nachricht zu oft hervorzustellen.

:::warning

Notizen, die nur lokal oder nur in der Heim-Instanz veröffentlicht worden sind. Können nicht rezitiert werden.

:::

Um in Misskey Web ein erneutes Zitat zu enfernen, klicke auf den Beitrag die drei Punkte „...“ neben der Zeitanzeige und wähle „Renote entfernen“.

## Inhaltswarnung oder auch CW

Eine Funktion, mit der der Inhalt einer Notiz für alle ausgeblendet werden kann.Sie kann vor allem verwendet werden, um längere Inhalte auszublenden oder um Spoiler zu verhindern.
Um eine CW auf Misskey Web einzurichten, klicke auf die Schaltfläche „Inhalt ausblenden“ (Augensymbol).Daraufhin wird ein neuer Eingabebereich angezeigt, in der eine Zusammenfassung des Inhalts eingegeben werden kann.

## Sichtbarkeit

Für jede Notiz kann festgelegt werden, in welchem Umfang die Notiz veröffentlicht werden soll.
Um den Veröffentlichungsbereich in Misskey Web einzustellen, klicke auf das Symbol links neben der Schaltfläche „Notizen“ im Eingabebereich.
Es gibt die folgenden Arten von Veröffentlichungsbereichen.

### Öffentlich

Die Notiz ist nicht nur für alle öffentlich, sondern durchläuft auch alle Zeitleisten auf dem Server (Home-Zeitleiste, lokale Zeitleiste, soziale Zeitleiste und globale Zeitleiste).

:::warning

Dieser öffentliche Bereich ist nicht verfügbar, wenn sich das Konto im Status [stumm](./silence) befindet.

:::

### Home

Die Notiz ist für alle öffentlich, wird aber nicht in lokale, soziale oder globale Timelines übertragen, mit Ausnahme für Follower.

### Follower

Macht Notizen nur für eigene Follower zugänglich.Es wird an alle Timelines der Follower weitergeleitet.

### Direktnachrichten

Die Notiz ist nur für den/die angegebenen Benutzer zugänglich.Sie fließt in die Timeline des angegebenen Benutzers.

### Option - „nur lokal“

Wenn diese Option aktiviert ist, wird die Notiz nicht an das Fediverse übertragen und bleibt in der Heiminstanz.

### Vergleich des Veröffentlichungsumfangs

<table>
	<tbody><tr><th></th><th>Öffentlich</th><th>Home</th><th>Follower</th><th>Direktnachrichten</th></tr>
	<tr><th>Follower LTL/STL/GTL</th><td>✔</td><td>✔</td><td>✔</td><td></td></tr>
	<tr><th>Nicht-Follower LTL/STL/GTL</th><td>✔</td><td></td><td></td><td></td></tr>
</tbody></table>

## An die Profilseite pinnen

Das Anheften einer Notiz ermöglicht es, diese jederzeit auf im Account sichtbar zu halten.
Um eine Notiz in Misskey Web anzuheften, öffne das Menü der Notiz und wähle „Anheften“.

:::tip

Es ist auch möglich, mehrere Noten gleichzeitig zu pinnen.

:::

## Benachrichtigung über neue Beiträge

Es können Benachrichtigungen verschickt werden, wenn ein Benutzer eine neue Notiz einstellt.Öffne die Benutzerseite, wähle die Schaltfläche „Details“ neben der Schaltfläche ‚Folgen‘ aus und klicke auf „Über Beiträge benachrichtigen“, um sie zu aktivieren.
