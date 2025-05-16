# Fan-out Timeline Technology (FTT)

FTT es una de las funciones de servidor disponibles en Misskey.

Cuando se activa, el rendimiento de la recuperación de varias líneas de tiempo puede mejorar significativamente y la carga de la base de datos puede reducirse.Sin embargo, el uso de memoria en Redis aumentará.Puede desactivarse si la capacidad de memoria del servidor es baja o si el funcionamiento es inestable.

[コントロールパネル > パフォーマンス](x-mi-web://admin/performance) から設定を行えます。

## データベースへのフォールバック

- 有効にすると、タイムラインがキャッシュされていない場合にDBへ追加で問い合わせを行うフォールバック処理を行います。
- 無効にすると、フォールバック処理を行わないことでさらにサーバーの負荷を軽減することができますが、タイムラインが取得できる範囲に制限が生じます。

## FTTが適用可能なタイムライン

- ホームライムライン
- ローカルタイムライン
- ソーシャルタイムライン
- ユーザーリストタイムライン
