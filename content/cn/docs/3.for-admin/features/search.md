# 帖子搜索

Misskey 提供了帖子搜索功能。启用后，您将能够搜索帖子。

:::tip

搜索功能默认处于禁用状态。如需使用，请在角色设置中启用“是否可以搜索帖子”。

:::

## 支持的搜索引擎

Misskey 提供了多种用于搜索帖子的算法。你可以根据服务器规模和需求进行切换。

- sqlLike ... 使用 PostgreSQL 的标准功能进行搜索。（默认）
  - 由于使用的是数据库内置功能，因此配置起来比较简单。
  - 但随着数据量增加，搜索更容易变慢。

- sqlPgroonga ... 使用全文搜索引擎 [PGroonga](https://pgroonga.github.io) 进行搜索。
  - 需要安装 PGroonga。
  - 可实现比 sqlLike 更快的搜索。

- meilisearch ... 使用全文搜索引擎 [Meilisearch](https://www.meilisearch.com) 进行搜索。
  - 需要安装 Meilisearch。
  - 可实现比 sqlLike 更快的搜索。
  - 可搜索可见性为“公开”或“首页”的帖子。如果希望搜索范围也包含“仅关注者可见”的帖子，则需要使用 sqlLike 或 sqlPgroonga。

如需更改搜索引擎，请修改配置文件中 `fulltextSearch` 的 `provider`，然后重启 Misskey。

## 使用 PGroonga

### 安装 PGroonga

:::warning

建议在操作前备份数据库。  
另外，请在停止 Misskey 后再开始操作。

:::

这是在 Ubuntu 22.04、PostgreSQL 15 环境中安装 PGroonga 的示例。

详细内容请参阅 [PGroonga 官方提供的 PostgreSQL 安装方法](https://pgroonga.github.io/ja/install/ubuntu.html)。

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

如果需要使用基于 MeCab 的分词器，还需要执行以下操作。

```sh
sudo apt install -y -V groonga-tokenizer-mecab
```

#### 使用 Docker 环境时

在 Docker 环境中，可以使用已安装 PGroonga 的 Docker 镜像。

若要使用已安装 PGroonga 的 PostgreSQL 镜像，请将 `postgres:18-alpine` 替换为 `groonga/pgroonga:latest-alpine-18-slim`。

### 启用 PGroonga

接下来登录 PostgreSQL。

```sh
sudo -u postgres psql
```

登录后，选择 Misskey 的数据库。

```sh
\c "mk1"
```

启用 PGroonga。

```sh
CREATE EXTENSION pgroonga;
```

为 PGroonga 创建索引。

:::warning

创建索引可能需要较长时间，请预留足够的操作时间。

:::

```sh
CREATE INDEX idx_note_text_with_pgroonga ON note USING pgroonga (text);
```

完成后，输入 `exit`，退出 PostgreSQL。

### 更改搜索引擎

编辑 Misskey 的配置文件。  
将 `fulltextSearch` 更改为 `sqlPgroonga`。

```sh
fulltextSearch:
  provider: sqlPgroonga
```

启动 Misskey，确认帖子搜索功能可用后，即完成配置。
