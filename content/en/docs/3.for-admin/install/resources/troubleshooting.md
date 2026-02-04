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

[構築の手引き](../guides/manual/)をよく読みましょう。

`.config/default.yml`で設定を行います。
[`.config/example.yml`](https://github.com/misskey-dev/misskey/blob/develop/.config/example.yml)をコピーし、コメントに従って記述します。

（YAML形式では、`#`から行末まではコメントとして扱われます。）

## URLとポート番号

URLとポート番号のしくみは、少し分かりにくいと思います。

`.config/example.yml`に「Port and TLS settings」として説明図付きで順に書かれていますので、それに沿って設定をしていきましょう。
本文の解説を日本語訳しながらやっていきます。

### URLの設定

```yml
# Final accessible URL seen by a user.
# 最終的にユーザーがアクセスするURL
url: https://example.tld/
```

**`url`には、サーバーにブラウザでアクセスしたときアドレスバーに表示される**(したい)**URLを書きます。**

### ポートの設定

```yml
#   ┌───────────────────────┐
#───┘ Port and TLS settings └───────────────────────────────────
#### ポートとTLSの設定         ####################################

# Misskey requires a reverse proxy to support HTTPS connections.
# MisskeyでHTTPS接続をサポートするにはリバースプロキシが必須です。
#
#                 +----- https://example.tld/ ------------+
#   +------+      |+-------------+      +----------------+|
#   | User | ---> || Proxy (443) | ---> | Misskey (3000) ||
#   +------+      |+-------------+      +----------------+|
#                 +---------------------------------------+
#
#   You need to set up a reverse proxy. (e.g. nginx)
#   この方法では、リバースプロキシ（例: nginx）をセットアップする必要があります。
#   An encrypted connection with HTTPS is highly recommended
#   because tokens may be transferred in GET requests.
#   GETリクエストでトークンがURLに含まれる可能性があるため、
#   HTTPSによる暗号化を強く推奨します。
```

```yml
# The port that your Misskey server should listen on.
# Misskeyサーバがリッスンするポート
port: 3000
```

この例では、Misskeyはポート3000で通信します。
リバースプロキシでは、ローカル側の宛先にこのポート番号を指定します。

----

# `npm start`やアクセス時によく遭遇するエラー

`npm start`でサーバーを立てられたものの、その後不具合に遭遇してしまう場合もあります。

まず、[構築の手引き](../guides/manual/)をよく読みましょう。

## YAMLのエラーが出る

`default.yml`の構文にミスがある可能性があります。
行頭に余分なスペースはありませんか？

## redisに接続できない

redis-serverは起動していますか？
何らかの接続数の上限に達していませんか？

11.20.2より前のバージョンのMisskeyはredisのパスワードを解くことができません。以下の2点を確認してください。

- redisにパスワードを設定しない。
- `default.yml`の`redis:`の`pass:`の行をコメントアウトする。

## 上部に「開発ビルドです」と書かれた赤いバーが表示される

サーバーを公開する場合は必ずproductionビルドを使いましょう。

製品ビルドにするには、環境変数が`NODE_ENV=production`になるように設定し`npm run build && npm start`します。

## 新規登録できない

APIに接続できないようです。
`default.yml`の冒頭の`url:`が正しく設定されているか確認しましょう。
Node.jsのバージョンや、インストールの設定ももう一度よく確認しましょう。

また、正しく`default.yml`が書かれていますか？

## タイムラインの表示に問題が発生する、リアルタイムでTLが更新されない

タイムラインの読み込みに失敗する場合、mongoDBやPostgreSQLのバージョンが古い可能性があります。
PostgreSQLはなるべくv13にしてください。

redisの接続も確認した方がよいでしょう。 [→ redisに接続できない？ を参照](#redisに接続できない？)

## 永遠に「再接続中」と右下に表示される、リアルタイムでTLが更新されない

プロキシを利用している場合、それがWebSocket通信を阻害している可能性が考えられます。

## オブジェクトストレージ使用時、不具合が出る

オブジェクトストレージの権限の設定が厳しくなっている可能性があります。「ファイル（オブジェクト）が誰でも取得可能」なように権限を設定してみてください。
また、`default.yml`をもう一度確認してみてください。

### S3 example (with CDN, custom domain)

S3 example (with CDN, custom domain)は、AWSのデフォルトのドメインではなく独自ドメインでストレージを公開したい場合の設定です。
endpointと公開ドメインが同じサービスの場合はS3 exampleのように`baseUrl`は明記しなくてよく、さらにregionの概念がないサービスの場合はregionの行は必要ありません。

### S3互換サービスでの設定

Misskeyではオブジェクトストレージの接続に[aws-sdk](https://www.npmjs.com/package/aws-sdk)を利用しています。
Amazon S3に互換性のあるオブジェクトストレージであれば利用できる可能性があります。

各サービス/ソフトウェアのドキュメントをよく読み、設定してみてください。

### ローディングが終わらない

Cloudflare を使用している場合は、Rocket LoaderやAuto Minifyが有効になっていないか確認してください。有効になっている場合は無効にすることで解決する場合があります。

---

# まったく解決しなかった場合

以下の順序を試してみてください。

1. Misskeyのドキュメントをよく読む。
2. Googleで検索してみる。
3. [MisskeyリポジトリのIssues](https://github.com/misskey-dev/misskey/issues)を検索してみる（同じエラーに遭遇している場合や、Misskeyのバグの可能性もあります）。
4. 検索してどうしても見つからなかったら、専門家に質問してみてください。
   1. [MisskeyのDiscordサーバー](https://discord.gg/P4yYqYBjEp)などで聞いてみる
   2. 開発者（[aqz](https://p1.a9z.dev/@aqz)やしゅいろ）にリプライや指名投稿を送信して聞いてみる
