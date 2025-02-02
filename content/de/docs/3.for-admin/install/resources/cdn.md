# CDN-Einstellungen

Bei der Veröffentlichung eines Misskey-Servers wird dringend empfohlen, ein CDN wie [Cloudflare](https://www.cloudflare.com/) zu verwenden.

Durch die Verwendung eines CDN ergeben sich die folgenden Vorteile:

- Durch das Cachen von statischen Inhalten kann die Serverlast reduziert werden
- Durch die Verschleierung der Server-IP-Adresse wird das Risiko von DoS-Angriffen verringert

## Zwischenspeicher

Misskey Web ist komplett statisch und benötigt keinen Server zum Betrieb.Daher kann der gesamte Misskey-Webinhalt von einem CDN gecacht werden.
Die Misskey-API kann jedoch nicht gecacht werden.

Bitte führe die folgenden Einstellungen für das CDN durch:

- Alle Anfragen außer `/api/*` cachen.

:::tip

Es ist nicht notwendig, den Cache zu leeren, wenn Misskey aktualisiert wird..

:::
