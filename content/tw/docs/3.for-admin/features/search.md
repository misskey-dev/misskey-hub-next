# 搜尋貼文

Misskey 具有貼文的搜尋功能。啟用後，即可使用貼文搜尋功能。

:::tip

搜尋功能預設為關閉。
如要使用，請在角色設定中啟用「可否搜尋貼文」。

:::

## 支援的搜尋引擎

Misskey 提供了多種用於貼文搜尋的演算法。可依伺服器規模或需求進行切換。

- sqlLike ... 使用 PostgreSQL 的標準功能進行搜尋。(預設)
  - 由於使用資料庫內建功能，因此操作簡便。
  - 隨著資料量增加，搜尋可能會變得較慢。

- sqlPgroonga ... 使用全文搜尋引擎 [Pgroonga](https://pgroonga.github.io) 進行搜尋。
  - 需要安裝 Pgroonga。
  - 比 sqlLike 提供更高速的搜尋。

- meilisearch ... 使用全文搜尋引擎 [Meilisearch](https://www.meilisearch.com) 進行搜尋。
  - 需要安裝 Meilisearch。
  - 比 sqlLike 提供更高速的搜尋。
  - 可搜尋公開範圍為「公開」或「首頁」的貼文。如要包含僅限追隨者的貼文，則需要使用 `sqlLike` 或 `sqlPgroonga`。

若要更換搜尋引擎，請修改設定檔中 `fulltextSearch` 的 `provider`，並重新啟動 Misskey 。

## 使用 Pgroonga

### 安裝 Pgroonga

:::warning

建議在操作前先備份資料庫。  
此外，請在操作前先停止 Misskey。

:::

以下是在 Ubuntu 22.04、PostgreSQL 15 環境下安裝 Pgroonga 的範例。

詳細請參考 [官方 PostgreSQL 安裝方法](https://pgroonga.github.io/ja/install/ubuntu.html)。

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

如要使用基於 MeCab 的分詞器，請同時執行以下操作。

```sh
sudo apt install -y -V groonga-tokenizer-mecab
```

#### Docker環境を使用している場合

Docker環境ではPGroonga導入済みのDockerイメージが使用できます。

PGroonga導入済みのPostgreSQLイメージを使用するには、`postgres:15-alpine`の代わりに`groonga/pgroonga:latest-alpine-15-slim`を使用してください。

### 啟用 Pgroonga

接著登入 PostgreSQL。

```sh
sudo -u postgres psql
```

登入後，選擇 Misskey 的資料庫。

```sh
\c "mk1"
```

啟用 PGroonga。

```sh
CREATE EXTENSION pgroonga;
```

建立 PGroonga 專用的索引。

:::warning

建立索引可能需要一些時間。請確保有足夠的操作時間。

:::

```sh
CREATE INDEX idx_note_text_with_pgroonga ON note USING pgroonga (text);
```

完成後，輸入 `exit`，並登出 PostgreSQL。

### 更換搜尋引擎

編輯 Misskey 的設定檔。  
將 `fulltextSearch` 更改為 `sqlPgroonga`。

```sh
fulltextSearch:
  provider: sqlPgroonga
```

啟動 Misskey 的程序，確認貼文搜尋功能可用後，即完成設定。
