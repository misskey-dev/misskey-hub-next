# Misskey 서버의 스케일아웃

PostgreSQL의 복제를 통해 데이터베이스의 부하를 여러 서버 머신에 분산시킬 수 있습니다.서버 이용자가 늘어남에 따라 서버 머신의 사양을 강화하거나 대수를 늘려 부하를 감당해야 하는 상황이 발생합니다.이 글에서는 Misskey 서버의 스케일아웃에 대한 팁을 소개합니다.

## PostgreSQL 리플리케이션

Misskey에서는 PostgreSQL의 복제를 지원하며, config 파일에서 다음과 같이 설정합니다.(일부 발췌)(일부 발췌)

```yml
# 복제를 사용하는 경우 true로 설정합니다.
dbReplications: true

# 여기에서 리드 복제본 목록을 설정합니다(개수 제한 없음).
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

이렇게 설정하면 Misskey가 데이터베이스에 대해 read 쿼리를 발행할 때 설정한 `dbSlaves` 중에서 무작위로 read replica를 선택하여 쿼리를 전송하게 되므로 데이터베이스의 부하를 분산시킬 수 있습니다.

## 역할에 따른 Redis 분할

Misskey는 다음과 같이 다양한 용도로 Redis를 사용합니다.

- 작업 대기열 관리
- 속도 제한 관리
- 캐시
- 알림 등의 정보 저장
- 글로벌 이벤트의 Pub/Sub

Misskey에서는 이러한 용도별로 다른 Redis 서버를 사용하도록 설정할 수 있으며, 여러 서버 머신에 부하를 분산시킬 수 있습니다.(일부 발췌)

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

현재 설정 가능한 Redis는 메인 Redis 외에 위와 같이 '글로벌 이벤트의 Pub/Sub'와 '작업 대기열 관리'를 위한 Redis가 있습니다.

## 원격 차트 비활성화

개별 원격 사용자 활동과 같은 차트나 개별 원격 서버의 차트가 필요하지 않은 경우, 해당 차트의 생성을 비활성화하면 성능이 향상됩니다.
