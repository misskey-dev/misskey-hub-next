# Über Self-XSS-Angriffe

![](/img/docs/for-users/resources/self-xss/console_warn.png)

Haben Sie diese Seite erreicht, nachdem Sie Misskey unter Anleitung durch jemand anderen verwendet haben und auf einen Bildschirm wie den oben gezeigten gestoßen sind? <u>**Wahrscheinlich wurdest du von einem böswilligen Angreifer getäuscht.**</u>

Es werden keine Informationen an den Angreifer gesendet, solange du die angegebenen Inhalte (wahrscheinlich ein Programm) nicht eingibst.**Bitte unterbeche und stelle die Arbeit sofort ein!**

Dieser Bildschirm ist ein Werkzeug namens "Konsole", das von Entwicklern zum Überprüfen von Code und Beheben von Fehlern verwendet wird.
Im normalen Gebrauch ist dieser Bildschirm nicht erforderlich.\*\*

## Noch ein paar Informationen

Bei einem Self-XSS-Angriff täuscht der Angreifer den Benutzer dazu, bösartigen Programmcode in die Entwicklertools des Browsers einzufügen.In diesem Fall wirst du mit folgenden Aussagen gelockt:

- Es können versteckte Funktionen und Belohnungen freigeschaltet werden.
- Man möchte, dass du diesen Code zur vermeindlichen Sicherheitstestung ausführst.
- Du kannst eine Website hacken und unrechtmäßig Punkte erhalten.

Wenn du durch solche Aussagen getäuscht wirst und den Code ausführst, führst du die vom Angreifer beabsichtigten Aktionen aus.

Im Gegensatz zu den typischen "Cyberangriffen", die man sich vorstellt, erlangt ein Self-XSS-Angriff über reguläre, vom Benutzer genutzte Anwendungen Zugriff auf sensible Daten.
Daher ist es wichtig, dass nicht nur das System selbst Schutzmaßnahmen ergreift, sondern auch wir als Gemeinschaft stets wachsam sind.
