# Fan-out Timeline Technology (FTT)

FTTはMisskeyで利用可能なサーバー機能のひとつです。

有効にすると、各種タイムラインを取得する際のパフォーマンスが大幅に向上し、データベースへの負荷を軽減することが可能です。ただし、Redisのメモリ使用量は増加します。サーバーのメモリ容量が少ない場合、または動作が不安定な場合は無効にすることができます。

[コントロールパネル > パフォーマンス](x-mi-web://admin/performance) から設定を行えます。

## データベースへのフォールバック

- 有効にすると、タイムラインがキャッシュされていない場合にDBへ追加で問い合わせを行うフォールバック処理を行います。
- 無効にすると、フォールバック処理を行わないことでさらにサーバーの負荷を軽減することができますが、タイムラインが取得できる範囲に制限が生じます。

## FTTが適用可能なタイムライン

- ホームライムライン
- ローカルタイムライン
- ソーシャルタイムライン
- ユーザーリストタイムライン
