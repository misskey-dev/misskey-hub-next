# Eine Reaktion hinzufügen

Verleih deinen Gedanken über die Beiträge anderer durch Reaktionen einfach Ausdruck.
Um auf einen Beitrag zu reagieren, drücke das "+"-Symbol, das mit dem Beitrag angezeigt wird, und wähle ein Emoji.
Es ist ebenso möglich, mit [Benutzerdefinierten Emojis](./custom-emoji.md) zu reagieren.

## Anpassung der Reaktionsauswahl

Die in der Reaktionsauswahl angezeigten Emojis können angepasst werden.
Dies ist in den Einstellungen im Unterpunkt "Reaktionen" möglich.

## Reaktionen auf Beiträge von anderen Servern

Da Reaktionen eine Misskey-spezifische Funktionalität sind, werden diese von nicht-Misskey Instanzen meist als "Like"-Aktivität interpretiert.Im Allgemeinen sind Likes als „Favoriten“ implementiert.

## Reaktionen von Benutzern anderer Server

Werden von entfernten Servern "Like"-Aktivitäten gesendet, so werden diese von Misskey als "👍"-Reaktion interpretiert.

## Liste einiger individueller Reaktionen

Auf Misskey Web kann eine Liste der vom Nutzer abgegebenen Reaktionen eingesehen werden, indem auf die Profilseite die Registerkarte „Reaktionen“ geöffnet wird.
Diese Liste der Reaktionen kann auch in den Einstellungen öffentlich gemacht werden.

## リアクションの受け入れ

ノートの投稿時に、そのノートにおいて受け入れるリアクションの種類を制限することができます。

- 全て: 全てのリアクションを許可します
- 全て（リモートはいいねのみ）: 自分のサーバーからのリアクションは全て許可しますが、他のサーバーからのリアクションはすべていいね（❤）として受け入れます
- 非センシティブのみ: 全てのリアクションを許可しますが、自分のサーバーからのリアクションでは「センシティブ」としてフラグ付けされたカスタム絵文字を使ってリアクションできなくなります
- 非センシティブのみ（リモートはいいねのみ）: 自分のサーバーからのリアクションでは「センシティブ」としてフラグ付けされたカスタム絵文字を使ってリアクションできなくなり、他のサーバーからのリアクションはすべていいね（❤）として受け入れます
- いいねのみ: いいね（❤）以外でリアクションできません

なお、この際指定したリアクションの受け入れは自分のサーバーにおいて有効になります。例えば、リアクションの受け入れを「いいねのみ」にしたノートを他のサーバーで閲覧すると、そのサーバー上では絵文字リアクションが付与されているかもしれません。
