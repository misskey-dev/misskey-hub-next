# Misskey 服务器的横向扩展

随着服务器用户的增加，有必要通过升级服务器硬件规格或增加服务器数量来应对负载。本文将介绍关于 Misskey 服务器横向扩展的技巧。

## PostgreSQL 的复制 (Replication)

通过配置 PostgreSQL 的复制功能，可以将数据库的负载分散到多台服务器上。关于复制的详细信息，请参考 PostgreSQL 的官方文档。
Misskey 支持 PostgreSQL 的复制功能，请在配置文件中进行如下设置（部分摘录）：

```yml
# 启用复制时设为 true
dbReplications: true

# 在此处设置只读副本 (Read Replica) 列表（可设置任意数量）
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

进行上述设置后，当 Misskey 向数据库发出读取 (Read) 查询时，会从设置的 dbSlaves 中随机选择一个只读副本发送查询，从而分散数据库的负载。

## 根据角色分割 Redis

Misskey 在以下各种用途中使用 Redis：

- 作业队列 (Job queue) 管理
- 速率限制 (Rate limit) 管理
- 缓存
- 保存通知等信息
- 全局事件的发布/订阅 (Pub/Sub)

在 Misskey 中，可以为上述不同用途配置使用不同的 Redis 服务器，从而将负载分散到多台服务器上。
请在配置文件中进行如下设置（部分摘录）：

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

目前除了主 Redis 之外，可如上所示单独配置“全局事件的 Pub/Sub”和“作业队列管理”专用的 Redis。

## 禁用远程图表

如果不需要个别远程用户的活跃度图表或个别远程服务器的图表，禁用它们的生成可以提升性能。
可以通过控制面板，将“生成远程用户的图表”及“生成远程服务器的图表”选项设置为关闭来禁用。
