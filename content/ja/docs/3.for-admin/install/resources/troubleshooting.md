# マニュアルインストール時のトラブルシューティング

<small>2018年10月07日 / 2021年12月20日 最終更新 / 文責 aqz/tamaina</small>

MisskeyInstallBattle参加者が増えましたが、それに伴い時期を追うごとに重軽傷者が増加しています。\
この記事ではそのような負傷者を減らすため、過去に事故が起きてしまった個所の傾向と対策をわかりやすく解説します。

**まず最初に、[構築の手引き](../guides/manual/)を熟読してください。**

また、拙著の[Ubuntu向けsystemd版解説](https://hide.ac/articles/iFwm5HDvH)、[Oracle Cloud版詳細解説](https://hide.ac/articles/csERs-7SU)も参考までにお読みいただけると幸いです。

# Ubuntu向けシェルスクリプトのお知らせ
Ubuntu向け解説はコピペばかりでつまらない！時間がかかる！とにかく面倒！

……あれ、コピペだけでできるなら、つまり完全自動化できるのでは？

というわけで、**シェルスクリプトでほぼ全部やってくれるやつを作ってみました！**  
[**詳細と使用方法はこちらから！** https://github.com/joinmisskey/bash-install#readme](https://github.com/joinmisskey/bash-install#readme)

ドメインの購入とCloudflareのセットアップ、サーバーの確保についてはご自身でご準備ください。

シェルスクリプトに不具合があれば[製作者(aqz)](https://p1.a9z.dev/@aqz)にお知らせいただければと思います。

# インストールとビルド
[構築の手引き](../guides/manual/)をよく読みましょう。

## ImageMagick関連
***ImageMagickは不要です！***

## ビルドが失敗する
Misskeyのビルドには、経験則上、最低でも2GBのメモリが必要となっています。\
サーバーをスケールアップする手もありますが、お使いのPCでビルドしてサーバーにデプロイするという手もあります。

## なんだかうまくいかない
- [構築の手引き](../guides/manual/)をよく読みましょう。
- node.jsのバージョンが古いかも？
  * 新しめのバージョンにしましょう。
- インストールやビルドの際にErrorとかWARNとかが出てくることがありますが、問題ない場合もあります。とりあえず`npm start`して動作確認しちゃいましょう。
- node-gypがインストールされていないかも？
  * `apt install build-essential`を試す。
  * Windowsは[この記事](https://qiita.com/AkihiroTakamura/items/25ba516f8ec624e66ee7)も参考にしてみる。
- これでもだめそうだったら、最初から[構築の手引き](../guides/manual/)の手順に従ってやり直してみてください。

## バージョンアップ後に不具合が発生した
- [構築の手引き](../guides/manual/)およびリリースノートをよく読みましょう。
- Misskeyのバージョンアップ時にはしっかり`pnpm install`や`pnpm run migrate`してください。それでも直らない場合、`pnpm run clean-all && pnpm install`を試し、`pnpm run build && pnpm run migrate && pnpm start`してみてください。
- これでもだめそうだったら、最初から[構築の手引き](../guides/manual/)の手順に従ってやり直してみてください。

---

# 設定
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
   2. 開発者（[aqz](https://p1.a9z.dev/@aqz)やしゅいろ）にリプライやダイレクト投稿を送信して聞いてみる
