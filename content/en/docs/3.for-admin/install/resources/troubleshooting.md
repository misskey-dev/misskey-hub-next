# Troubleshooting Manual Installation

<small>October 7, 2018 / Last updated December 20, 2021 / Written by aqz/tamaina</small>

The number of participants in the "MisskeyInstallBattle" has increased, but consequently, the number of serious and minor injuries has risen over time.\
In this article, to reduce such casualties, I will explain the trends and countermeasures for accidents that have occurred in the past in an easy-to-understand manner.

**First of all, please read the [Setup Guide](../guides/manual/) thoroughly.**

Also, I would appreciate it if you could read my other articles for reference: [the systemd version guide for Ubuntu](https://hide.ac/articles/iFwm5HDvH) and [the detailed explanation for the Oracle Cloud version](https://hide.ac/articles/csERs-7SU).

# Notice regarding the Shell Script for Ubuntu

"The guide for Ubuntu is just copy-pasting and it's boring!It takes time!It's just a hassle!"

……Wait, if it can be done just by copy-pasting, doesn't that mean it can be fully automated?

So, **I made a shell script that does almost everything for you!**\
[**Check here for details and usage!** https://github.com/joinmisskey/bash-install#readme](https://github.com/joinmisskey/bash-install#readme)

Please prepare the domain purchase, Cloudflare setup, and server acquisition yourself.

If there are any bugs in the shell script, please let the [creator (aqz)](https://p1.a9z.dev/@aqz) know.

# Installation and Build

Let's read the [Setup Guide](../guides/manual/) carefully.

## ImageMagick related

_**ImageMagick is not required!**_

## Build fails

Empirically, Misskey requires at least 2GB of memory to build.\
You can scale up the server, or there is also the option of building on your own PC and deploying it to the server.

## Something isn't working right

- Let's read the [Setup Guide](../guides/manual/) carefully.
- Node.js version might be old?
  - Try using a newer version.
- Errors or WARNs might appear during installation or build, but sometimes it's not a problem.Just try `npm start` to check if it works.
- Maybe node-gyp isn't installed?
  - Try `apt install build-essential`.
  - For Windows, try referring to [this article](https://qiita.com/AkihiroTakamura/items/25ba516f8ec624e66ee7) as well.
- If it still doesn't work, try starting over from the beginning following the steps in the [Setup Guide](../guides/manual/).

## Issues occurred after an update

- Let's read the [Setup Guide](../guides/manual/) and Release Notes carefully.
- When updating Misskey, please make sure to run `pnpm install` and `pnpm run migrate` properly.If that doesn't fix it, try `pnpm run clean-all` && `pnpm install`, then try `pnpm run build && pnpm run migrate && pnpm start`.
- If it still doesn't work, try starting over from the beginning following the steps in the [Setup Guide](../guides/manual/).

---

# Configuration

Let's read the [Setup Guide](../guides/manual/) carefully.

Settings are done in `.config/default.yml`. Copy [`.config/example.yml`](https://github.com/misskey-dev/misskey/blob/develop/.config/example.yml) and write according to the comments.

(In YAML format, everything from `#` to the end of the line is treated as a comment.)

## URL and Port Number

I think the mechanism for URLs and port numbers can be a bit confusing.

It is written in order with diagrams in .config/example.yml under "Port and TLS settings", so let's configure it following that. I will explain the content.

### URL Setting

```yml
# Final accessible URL seen by a user.
url: https://example.tld/
```

**In `url`, write the URL that is **(or you want to be)** displayed in the address bar when accessing the server via a browser.**

### Port Setting

```yml
#   ┌───────────────────────┐
#───┘ Port and TLS settings └───────────────────────────────────

# Misskey requires a reverse proxy to support HTTPS connections.
#
#                 +----- https://example.tld/ ------------+
#   +------+      |+-------------+      +----------------+|
#   | User | ---> || Proxy (443) | ---> | Misskey (3000) ||
#   +------+      |+-------------+      +----------------+|
#                 +---------------------------------------+
#
#   You need to set up a reverse proxy. (e.g. nginx)
#   An encrypted connection with HTTPS is highly recommended
#   because tokens may be transferred in GET requests.
```

```yml
# The port that your Misskey server should listen on.
port: 3000
```

In this example, Misskey communicates on port 3000.
In the reverse proxy settings, specify this port number as the local destination.

----

# Common errors encountered during `npm start` or access

Even if you managed to start the server with npm start, you might encounter issues afterward.

First, let's read the [Setup Guide](../guides/manual/) carefully.

## YAML Error occurs

There might be a syntax error in default.yml.
Are there any extra spaces at the beginning of a line?

## Cannot connect to redis

Is redis-server running?
Have you reached some connection limit?

Misskey versions prior to 11.20.2 cannot resolve redis passwords.Please check the following two points:

- Do not set a password for redis.
- Comment out the `pass:` line under `redis:` in `default.yml`.

## A red bar saying "This is a development build" appears at the top

When making the server public, always use the production build.

To make it a product build, set the environment variable to `NODE_ENV=production` and `run npm run build && npm start`.

## Cannot Sign Up

It seems like it cannot connect to the API.
Check if the `url:` at the beginning of `default.yml` is set correctly. Check the Node.js version and installation settings again carefully.

Also, is `default.yml` written correctly?

## Problems with Timeline display, TL does not update in real-time

If loading the timeline fails, the MongoDB or PostgreSQL version might be old.
Please use PostgreSQL v13 or higher if possible.

You should also check the redis connection. [→ See "Cannot connect to redis?" ](#cannot-connect-to-redis)

## "Reconnecting" is displayed forever in the bottom right, TL does not update in real-time

If you are using a proxy, it is possible that it is blocking WebSocket communication.

## Issues occur when using Object Storage

The permission settings for the object storage might be too strict.Try setting the permissions so that "files (objects) are retrievable by anyone".
Also, check `default.yml` again.

### S3 example (with CDN, custom domain)

`S3 example (with CDN, custom domain)` is a setting for when you want to publish storage using your own domain instead of the default AWS domain.
If the endpoint and the public domain are the same service, `baseUrl` does not need to be specified (like in the standard S3 example), and if the service does not have the concept of regions, the `region` line is not necessary.

### Settings for S3 compatible services

Misskey uses [aws-sdk](https://www.npmjs.com/package/aws-sdk) to connect to object storage. If the object storage is compatible with Amazon S3, it might work.

Read the documentation for each service/software carefully and try configuring it.

### Loading never finishes

If you are using Cloudflare, check if Rocket Loader or Auto Minify is enabled.If they are enabled, disabling them might solve the problem.

---

# If nothing solves the problem

Try the following order:

1. Read the Misskey documentation carefully.
2. Try searching on Google.
3. Try searching [Issues in the Misskey repository](https://github.com/misskey-dev/misskey/issues) (you might find others encountering the same error, or it could be a Misskey bug).
4. If you really can't find it after searching, try asking an expert.
   1. Try asking on the [Misskey Discord server](https://discord.gg/P4yYqYBjEp), etc.
   2. Try asking the developers ([aqz](https://p1.a9z.dev/@aqz) or syuilo) by sending a reply or a mention post.
