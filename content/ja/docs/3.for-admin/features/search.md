# ノート検索

Misskeyにはノートの検索機能があります。有効化することで、ノートの検索ができるようになります。

:::tip

検索機能はデフォルトで無効となっています。
利用する場合は、ロールの「ノート検索の利用」を有効にしてください。

:::

## サポートしている検索エンジン

Misskeyはノート検索に使用するアルゴリズムを複数ご用意しています。サーバーの規模やニーズに応じて切り替えることができます。

- sqlLike ... PostgreSQLの標準機能を用いて検索を行います。(デフォルト)
  - データベース組み込みの機能を使用するためお手軽です。
  - データの量が増えてくると検索に時間がかかりやすくなります。

- sqlPgroonga ... 全文検索エンジンの[Pgroonga](https://pgroonga.github.io)を用いて検索を行います。
  - Pgroongaのインストールが必要です。
  - sqlLikeより高速な検索が可能です。

- meilisearch ... 全文検索エンジンの[Meilisearch](https://www.meilisearch.com)を用いて検索を行います。
  - Meilisearchのインストールが必要です。
  - sqlLikeより高速な検索が可能です。
  - 検索対象のノートは、公開範囲が「パブリック」または「ホーム」です。

検索エンジンを変更する場合は、設定ファイルの `fulltextSearch` の `provider` を書き換えて、Misskeyのプロセスを再起動してください。

## Pgroongaを使う

### Pgroongaのインストール

:::warning

作業前にデータベースのバックアップをおすすめします。  
また、Misskeyを停止してから作業を開始してください。

:::

Ubuntu 22.04、PostgreSQL 15の環境にPgroongaをインストールする例です。

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
sudo apt install -y -V postgresql-15-pgdg-pgroonga
```

MeCabベースのトークナイザーを使いたい場合は、以下も実行します。

```sh
sudo apt install -y -V groonga-tokenizer-mecab
```

### Pgroongaの有効化

次にPostgreSQLにログインします。

```sh
sudo -u postgres psql
```

ログインをしたら、Misskeyのデータベースを選択します。

```sh
\c "mk1"
```

PGroongaを有効化します。

```sh
CREATE EXTENSION pgroonga;
```

PGroonga用のインデックスを作成します。

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
