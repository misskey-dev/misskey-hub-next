---
description: Dieser Abschnitt enthält häufig gestellte Fragen zur Verwendung von Misskey.
---

# FAQ - Häufig gestellte Fragen

Dieser Abschnitt enthält häufig gestellte Fragen zur Verwendung von Misskey.<br>
Häufig gestellte Fragen zum Misskey-Projekt selbst findest du [hier](../../about-misskey#faq-häufig-gestellte-fragen)

## Gibt es eine Android/iOS-App?

Das Misskey-Projekt entwickelt keine nativen Anwendungen für solche mobilen Betriebssysteme, aber es sind mehrere Anwendungen von Drittanbietern verfügbar.Weitere Details dazu findest du [hier](./apps).<br>

Allerdings hinken Anwendungen von Drittanbietern bei der Unterstützung der neuesten Misskey-Funktionen zwangsläufig hinterher. Wenn es also keine besondere Vorliebe gibt, empfehlen wir, Misskey Web, den offiziellen Web-Client von Misskey, zu verwenden.Beachte, dass Misskey Web PWA-kompatibel ist, d. h. es kann auch wie eine native App ausgeführt werden.Informationen über die Einrichtung einer PWA gibt es [hier](/docs/for-users/stepped-guides/how-to-use-pwa/).

## Kann ich mich mit der Mastodon-App anmelden?

Misskey ist nicht mit der API von Mastodon kompatibel, sodass Anwendungen von Drittanbietern und Web-Clients für Mastodon bis auf wenige Ausnahmen Misskey nicht verwenden werden kann.<br>
Verwende Misskey Web, den offiziellen Misskey Web-Client.

## Ist misskey.io ein offizieller Server des Misskey-Projekts?

Nein. misskey.io ist kein offizieller Misskey-Server und ist nicht Teil des Misskey-Projekts.misskey.io ist derzeit der größte Server von Misskey, ohne spezifisches Thema, Generell und einfach zu registrieren

## Wie ist die Beziehung zu MisskeyHQ Ltd?

MisskeyHQ Inc. ist das Unternehmen, das für den Betrieb von misskey.io verantwortlich ist.Es besteht also keine direkte Beziehung zu dem Misskey-Entwicklungsprojekt.
Syuilo, der Leiter des Misskey-Projekts, ist auch Mitglied des Verwaltungsrats, und die Beziehung ist eine Zusammenarbeit bei der Entwicklung von Misskey.

## Woher stammt/kommt der Name 'Misskey'?

Der Name stammt aus dem Text des May'n-Songs „Brain Diver“, den syuilo, der Hauptentwickler, zufällig hörte, als ihm der Name einfiel.

## Wie kann ich Benutzern von anderen Misskey- und Pleroma-Servern, Mastodon-Servern usw. folgen?

Suche und gebe das Benutzerkonto in folgendem Format ein.Das Benutzerkonto enthält den Benutzernamen und den Hostnamen des Servers oder der Server, zu denen der Benutzer gehört.In vielen verteilten Programmen, nicht nur in Misskey, sondern auch in Mastodon und Pleroma, sind die folgenden Benutzerkontenformate üblich:<br>

Externe-Benutzerkonten: `@ユーザー名@Hostnamen von Misskey- und Pleroma-Servern und Mastodon-Servern.`<br>
Heimserver-Benutzerkonten: `@syuilo@misskey.io`<br>

Das Format der Benutzerkonten ist nicht für jede verteilte Software gleich, aber dieses Format ermöglicht es Benutzern, Benutzern auf anderen Servern oder Servern, auf denen verschiedene verteilte Software implementiert ist, zu folgen.

## Wie kann ich einen Renote entfernen?

Klicken neben der Renote-Zeitanzeige auf „…“ und wählen Sie „Renote abbrechen“ aus.<br>
Weitere Informationen zu [Renote](../features/note/#renote).

## Ich möchte keine Vorschau der URL in der Notiz

Misskeys eigene Auszeichnungssprache namens MFM (Markup language For Misskey) hat eine Syntax, die die URL-Vorschau deaktiviert.Weitere Einzelheiten finden Sie im MFM-Leitfaden.Den MFM-Leitfaden finden Sie, indem Sie die folgende Adresse auf Ihrem Server eingeben:`https://あなたのサーバーのホスト名/mfm-cheat-sheet`

## Ich möchte benutzerdefinierte Emojis hinzufügen, bearbeiten oder löschen.

Nur der Administrator des Servers, zu dem du gehörst, kann benutzerdefinierte Emojis hinzufügen, bearbeiten oder löschen.Wende dich hierbei an den Server-Betreiber.

## Ich möchte einen Bot entwickeln.

Es kann ein Bot mit der Misskey-API entwickelt werden.Für weitere Informationen [hier klicken](../../for-developers/api/).

## Welcher Dienst wird für die Übersetzungsfunktion der Notizen verwendet?

Für die Übersetzung verwenden wir [DeepL](https://www.deepl.com/).

## サービスについての問い合わせがしたい

「Misskey」はWebサービスを作成するためのソフトウェア、またそのプロジェクトの名称です。したがって、<b>「Misskey」自体はWebサービスではありません。</b><br>
また、<b>当Misskey ProjectはいかなるWebサービスも運営・管轄していません</b>ので、Misskeyを使ったWebサービスについてのお問い合わせは当該Webサービスのお問い合わせ窓口にお願いします。<br>
人によっては、「Misskeyを使って作られたWebサービス」のことを指して「Misskey」と表記している場合がありますので注意が必要です。

## Ich habe einen Server eingerichtet, muss ich meinem Internetanbieter (ISP) informieren?

### Kurze Antwort:

**Ja**, wenn es aus einem **gewerblicher Zweck** ist.Ansonsten **nein**.

### Etwas Ausführlicher:

// Zusatz vom Übersetzer: "Es gelten die Normen und Gesetze in deinem Land. Frage zur Sicherheit deinen Internetanbieter und überprüfe deinen Vertrag. Sollte ich mehr erfahren, ändere ich diesen Absatz entsprechend. Das Lokale hosten Daheim ist hingegen kein Problem [via Intranet/LAN]." ~ [TIZEN](https://mk.absturztau.be/@Tizen)Folgende Übersetzung gilt vorweg für das Land "Japan":Die Definition des Begriffs „Betreiber“ lautet laut [MIC-Dokument](https://www.soumu.go.jp/main_content/000477428.pdf): „eine Person, die beabsichtigt, Einnahmen aus der Erbringung einer Dienstleistung zu erzielen, indem sie eine Gebühr als Gegenleistung für die Dienstleistung erhebt“.Daher ist keine Anmeldung erforderlich, es sei denn, der Server wird zur Erzielung von Einnahmen als Unternehmen betrieben.Selbst wenn es also Einnahmen aus Spenden oder Werbung gibt, fallen diese nicht unter die Kategorie der meldepflichtigen Unternehmen, wenn sie nur zur Deckung der Betriebskosten des Servers dienen.(Bestätigt durch das Ministerium für innere Angelegenheiten und Kommunikation) <br>
Weitere Informationen finden Sie in Dokumenten wie dem [Telecommunications Business Entry Manual] des Ministeriums für innere Angelegenheiten und Kommunikation (https://www.soumu.go.jp/main_content/000477428.pdf) oder wenden Sie sich an das Ministerium für innere Angelegenheiten und Kommunikation.

## DM機能があるため、電気通信事業の届出が必要になるのではありませんか？

[「サーバーを作成しましたが、電気通信事業の届出は必要ですか？」](#サーバーを作成しましたが電気通信事業の届出は必要ですか)で説明している通りです。
運営するサービスがどのような機能を持っていようと、「料⾦を徴収することにより収益を得ようとする」ことに該当しなければ、届出が必要な事業者とはみなされません。

## Kann ich Dienste mit „Misskey“ im Namen veröffentlichen?

"Misskey“ ist ein eingetragenes Warenzeichen des Misskey-Projekts (Japan), aber es gibt keine Probleme mit der Veröffentlichung von Diensten, die ‚Misskey‘ im Namen enthalten (z. B. Misskey Tools).
Es ist nicht geplant, in solchen Fällen Lizenzgebühren zu erheben.
