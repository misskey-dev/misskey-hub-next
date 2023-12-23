# Scaling Misskey

As the number of your users increase, it becomes necessary to improve the specs of the server or increase the number of servers to handle the load.This article introduces tips on how to scale your Misskey server.

## PostgreSQL Replication

PostgreSQL replication allows you to distribute the database load across multiple servers, Please refer to the PostgreSQL documentation for details on replication. Misskey supports PostgreSQL replication which can be configured in the config file as follows(excerpt)

```yml
# Set to true if replication is used
dbReplications: true

# Configure all slaves to replicate the DB to
dbSlaves:
  -
    host: foo
    port: 5432
    db: misskey
    user: xxxxx
    pass: xxxxx
  -
    host: bar
    port: 5432
    db: misskey
    user: xxxxx
    pass: xxxxx
```

このように設定すると、Misskeyがデータベースに対してreadクエリを発行するとき設定した`dbSlaves`の中からランダムにreadレプリカ選択してクエリを送信するようになり、データベースの負荷が分散されます。

## 役割に応じたRedisの分割

Misskeyは以下のように様々な用途でRedisを使用します。

- ジョブキューの管理
- レートリミットの管理
- キャッシュ
- 通知などの情報の保存
- グローバルなイベントのPub/Sub

Misskeyでは、これらの用途ごとに異なるRedisサーバーを使用するように設定することができ、負荷を複数のサーバーマシンに分散させることができます。
configファイルで以下のように設定します。(一部抜粋)

```yml
redisForPubsub:
  host: foo
  port: 6379
  #family: 0  # 0=Both, 4=IPv4, 6=IPv6
  #pass: example-pass
  #prefix: example-prefix
  #db: 1

redisForJobQueue:
  host: bar
  port: 6379
  #family: 0  # 0=Both, 4=IPv4, 6=IPv6
  #pass: example-pass
  #prefix: example-prefix
  #db: 1
```

現在設定可能なのはメインのRedisに加えて上記のように「グローバルなイベントのPub/Sub」と「ジョブキューの管理」用のRedisです。

## リモートのチャートの無効化

個々のリモートユーザーのアクティビティなどのチャートや個々のリモートサーバーのチャートが必要無い場合、それらの生成を無効にするとパフォーマンスが向上します。
コントロールパネルから、「リモートユーザーのチャートを生成」および「リモートサーバーのチャートを生成」をオフにすることで無効にできます。
