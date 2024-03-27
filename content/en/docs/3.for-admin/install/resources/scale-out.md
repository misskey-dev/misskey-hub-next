# Scaling Misskey

As the number of your users increase, it becomes necessary to improve the specs of the server or increase the number of servers to handle the load.This article introduces tips on how to scale your Misskey server.

## PostgreSQL Replication

PostgreSQL replication allows you to distribute the database load across multiple servers, Please refer to the PostgreSQL documentation for details on replication.(excerpt)

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

With this configuration, when Misskey issues a read query to the database, it will randomly select database replicas from the configured `dbSlaves` and send the query to one of them, thus distributing the load of the database.

## Role-based Redis partitioning

Misskey uses Redis for a variety of purposes, including

- Job Queue Management
- Rate Limit Management
- Cache
- Storing notifications and other information
- Pub/Sub for global events

Misskey can be configured to use a different Redis server for each of these uses, allowing the load to be distributed across multiple servers.(excerpt)

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

Currently, in addition to the main Redis configuration you can also configure Redis for "Pub/Sub for Global Events" and "Job Queue Management" as described above.

## Disable remote charts

If you do not need charts such as activity for individual remote users or charts for individual remote servers, disabling their generation will improve performance.
