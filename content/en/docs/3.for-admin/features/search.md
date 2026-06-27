# ノート検索

Misskey has an ability to search notes.By enabling this feature, you can search notes.

:::tip

検索機能はデフォルトで無効となっています。
利用する場合は、ロールの「ノート検索の利用」を有効にしてください。

:::

## サポートしている検索エンジン

Misskeyはノート検索に使用するアルゴリズムを複数ご用意しています。サーバーの規模やニーズに応じて切り替えることができます。

- sqlLike ... PostgreSQLの標準機能を用いて検索を行います。(デフォルト)
  - データベース組み込みの機能を使用するためお手軽です。
  - データの量が増えてくると検索に時間がかかりやすくなります。

- sqlPgroonga ... Searches are performed using the full-text search engine [PGroonga](https://pgroonga.github.io).
  - You will need to install PGroonga additionally.
  - It enables faster search queries than sqlLike.

- meilisearch ... 全文検索エンジンの[Meilisearch](https://www.meilisearch.com)を用いて検索を行います。
  - Meilisearchのインストールが必要です。
  - sqlLikeより高速な検索が可能です。
  - 検索対象のノートは、公開範囲が「パブリック」または「ホーム」です。フォロワー限定投稿も含めたい場合は`sqlLike`または`sqlPgroonga`を使用する必要があります。

検索エンジンを変更する場合は、設定ファイルの `fulltextSearch` の `provider` を書き換えて、Misskeyのプロセスを再起動してください。

## Using PGroonga

### Installing PGroonga

:::warning

作業前にデータベースのバックアップをおすすめします。  
また、Misskeyを停止してから作業を開始してください。

:::

This is an example of installing PGroonga on an Ubuntu 22.04, PostgreSQL 18 environment.

詳細は[公式PostgreSQL用のインストール方法](https://pgroonga.github.io/ja/install/ubuntu.html)をご確認ください。

```sh
sudo apt install -y -V ca-certificates lsb-release wget
wget https://packages.groonga.org/ubuntu/groonga-apt-source-latest-$(lsb_release --codename --short).deb
sudo apt install -y -V ./groonga-apt-source-latest-$(lsb_release --codename --short).deb
sudo wget -O /usr/share/keyrings/pgdg.asc https://www.postgresql.org/media/keys/ACCC4CF8.asc
(echo "Types: deb"; \
   echo "URIs: http://apt.postgresql.org/pub/repos/apt"; \
   echo "Suites: $(lsb_release --codename --short)-pgdg"; \
   echo "Components: main"; \
   echo "Signed-By: /usr/share/keyrings/pgdg.asc") | \
    sudo tee /etc/apt/sources.list.d/pgdg.sources
sudo apt update
sudo apt install -y -V postgresql-18-pgdg-pgroonga
```

MeCabベースのトークナイザーを使いたい場合は、以下も実行します。

```sh
sudo apt install -y -V groonga-tokenizer-mecab
```

#### Docker環境を使用している場合

In a Docker environment, you can use a Docker image with PGroonga already installed.

To use a PostgreSQL image with PGroonga already installed, use `groonga/pgroonga:latest-alpine-18-slim` instead of `postgres:18-alpine`.

### Enable PGroonga

次にPostgreSQLにログインします。

```sh
sudo -u postgres psql
```

ログインをしたら、Misskeyのデータベースを選択します。

```sh
\c "mk1"
```

Enable PGroonga.

```sh
CREATE EXTENSION pgroonga;
```

Create indexes for PGroonga.

:::warning

インデックス作成には時間がかかります。十分な作業時間を確保してください。

:::

```sh
CREATE INDEX idx_note_text_with_pgroonga ON note USING pgroonga (text);
```

完了したら、`exit` と入力し、Postgresqlからログアウトします。

### 検索エンジンの変更

Misskeyの設定ファイルを編集します。  
`fulltextSearch` を `sqlPgroonga` に変更してください。

```sh
fulltextSearch:
  provider: sqlPgroonga
```

Misskeyのプロセスを起動し、ノートの検索ができれば完了です。
