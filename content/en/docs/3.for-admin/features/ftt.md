# Fan-out Timeline Technology (FTT)

FTT is one of the major server features available in Misskey.

When enabled, the performance of retrieving various timelines can be greatly improved and the load on the database can be reduced.Instead, memory usage of Redis will increase.It can be disabled if the server's memory capacity is low or if the Misskey backend is unstable.

The settings can be configured in the General section of the Control Panel.

## Fallback to database

- If enabled, fallback processing is performed to make an additional query to the database if the timeline is not cached.
- Disabling it further reduces the server load by not performing fallback processing, but limits the range of timelines that can be retrieved.

## FTT-Compatible Timelines

- Home
- Local
- Social
- User lists
