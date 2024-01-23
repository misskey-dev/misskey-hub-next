# 橫向擴展 Misskey 伺服器

隨著伺服器使用者數量的增加，有必要加強伺服器機器的規格或增加伺服器的數量來處理負載。本文介紹了有關擴展 Misskey 伺服器的技巧。

## PostgreSQL 的複寫機制

有關複寫的詳細資訊，請參閱PostgreSQL的文件。
Misskey 支持 PostgreSQL的複寫機制，在 config 文件中進行以下配置。（摘錄一部分）

```yml
# 如果使用複寫則設為 true
dbReplications: true

# 此處設定唯讀副本清單（您可以設定任意數量）
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

透過此設置，當 Misskey 向資料庫發出讀取查詢時，它將從 `dbSlaves` 列表中隨機選擇一個唯讀副本並發送查詢，從而分散資料庫負載。

## 根據角色的不同進行 Redis 的分割

Misskey 將 Redis 用於多種目的，包括：

- 工作佇列管理
- 速率限制管理
- 快取
- 儲存通知等訊息
- 全域事件的Pub/Sub

在 Misskey 中，您可以為不同的用途配置不同的 Redis 伺服器，從而將負擔分散到多台伺服器上。（摘錄一部分）

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

除了主 Redis 之外，如上所述還可以為「全域事件 Pub/Sub」和「工作佇列管理」設定 Redis。

## 禁用遠端圖表

如果不需要個別遠端使用者的活動圖表或個別遠端伺服器的圖表，禁用這些生成功能將提高性能。
您可以從控制臺中關閉「生成遠端使用者圖表」和「生成遠端伺服器圖表」來禁用它們。
