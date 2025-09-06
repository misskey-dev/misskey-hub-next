# Rollen

Rollen sind Attribute, die Benutzern zugewiesen werden können, so dass Abzeichen für jede Rolle angezeigt werden können und die Benutzerberechtigungen in den Richtlinieneinstellungen angepasst werden können.

Die Zuweisung von Benutzerrollen (Zuweisung) kann manuell oder automatisch durch Angabe von Bedingungen erfolgen.

Rollen können mehr als einem Benutzer zugewiesen werden.

## Rollenvorlage

Festlegung von Richtlinien, die standardmäßig für alle Benutzer gelten, kann als Basisrolleneinstellungen erfolgen.

Basisrollen können in der Systemsteuerung unter Rollen → Basisrollen eingestellt werden.

## Art der Zuweisung

Die Zuweisungsmethode kann zwischen Manuell und automatisch gewählt werden.

- **Manuell** ... Manuelle Zuweisung und Aufhebung der Zuweisung von Benutzern.(Manuelle Rollen)
    - Es ist auch möglich, die Dauer der Rolle festzulegen.
- **Automatisch** ... Bedingungen festlegen, und Benutzer, die diese Bedingungen erfüllen, werden automatisch berücksichtigt.(Automatische Rolle)

:::warning

Automatische Rollen haben im Vergleich zu manuellen Rollen die folgenden Einschränkungen

- Eine manuelle Zuweisung/Aufhebung der Zuweisung ist nicht möglich.
- Es ist nicht möglich, die Liste der Benutzer in den angegebenen Rollen abzurufen.

:::

## Berechtigungen

Die grundlegenden Berechtigungen der Rolle können aus den folgenden ausgewählt werden:

- **Allgemeiner Benutzer** ... Hat keine besonderen Befugnisse. Standardrolle
- **Moderator** ... Kann Beiträge, je nach freigabe, löschen und Nutzer melden.
- **Manager** ... Kann alle Servereinstellungen ändern und anpassen.

Detailliertere Berechtigungen sind in den Richtlinieneinstellungen verfügbar.

## Richtlinien

Sie können die Richtlinie der Regel anpassen, um die Einschränkungen der Berechtigungen und Funktionen zu ändern.

Richtlinien können auch so eingestellt werden, dass sie die für die Basisrolle eingestellten Werte erben.

### Priorität

Wenn mehrere Rollen zugewiesen sind und dieselbe Richtlinie mit unterschiedlichen Werten für jede definiert ist, können Sie festlegen, wie viel Priorität sie gegenüber anderen Definitionen haben.
Je höher Sie die Priorität einstellen, desto mehr Vorrang hat sie vor anderen Definitionen.

Die Vorrangstellung ist eine Einstellung pro Richtlinie, nicht pro Rolle.Sie kann auch nicht in der Basisrolle eingestellt werden.

**Wenn die Prioritäten gleich sind, wird standardmäßig der größte oder maßgebliche Wert ausgewählt.**

:::tip

Beispiel: Den Nutzern sind die Rollen A und B zugewiesen, und die Laufwerkskapazitätsrichtlinie für Rolle A ist auf 500 MB und die Laufwerkskapazitätsrichtlinie für Rolle B auf 300 MB festgelegt,

- Wenn die Prioritäten gleich sind oder die Priorität der Laufwerkskapazitätspolitik in Rolle A höher ist, wird der Wert von 500 MB angenommen.
- Wenn die Priorität der Laufwerkskapazitätsrichtlinie für Rolle B höher ist, wird ein Wert von 300 MB angenommen.

Wenn einem Nutzer die Rollen C und D zugewiesen sind und die Verfügbarkeitsrichtlinie für öffentliche Bekanntmachungen für die Rolle C als „Nein“ und die Verfügbarkeitsrichtlinie für öffentliche Bekanntmachungen für die Rolle D als „Ja“ definiert ist,

- Wenn die Prioritäten gleich sind oder die Priorität der Verfügbarkeitsrichtlinie für öffentliche Buchungen in Rolle D höher ist, wird der Wert „Ja“ angenommen.
- Wenn die Priorität der Verfügbarkeitsrichtlinie für die Rolle C höher ist, wird der Wert „Nein“ angenommen.

:::

### Wert der Rollenvorlage verwenden

Wenn diese Einstellung eingeschaltet ist, werden die Richtlinienwerte von der Basisrolle geerbt.

## Rolle erstellen

Neue Rollen können über „Rollen“ im Kontrollpanel erstellt werden.

## Anzeigen, Bearbeiten und Löschen von Rolleninformationen

Dies ist im Control Panel unter „Rollen“ möglich.

## Zuweisen und Aufheben von Rollen an Nutzer

Dies kann im Benutzermenü unter „Moderation → Rollen“ erfolgen.

Ebenfalls ist dies direkt aus dem Benutzermenü möglich.

Bei der Zuweisung können Sie die Dauer festlegen.

:::tip

Es kann eine Weile dauern, bis die Rollenzuweisung/-aufhebung wirksam sind.

:::

:::warning

Bedingte Rollen können nicht manuell zugewiesen werden

:::

## Überprüfen der Benutzerrichtlinien

Dies kann beim Benutzer unter „Moderation → Übersicht → Richtlinien“ erfolgen.
