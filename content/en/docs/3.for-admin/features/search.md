# Note Search

Misskey has an ability to search notes.By enabling this feature, you can perform search on notes.

:::tip

Note search is disabled by default.
To use it, enable “Enable Note Search” in the role settings.

:::

## Supported search engines

Misskey has multiple algorithms available for note search.You can switch between them based on your server's scale and needs.

- sqlLike ... Searches are performed using PostgreSQL's standard features.(Default)
  - It's easy to use because it utilizes built-in database functionality.
  - As the amount of data increases, searches tend to take longer.

- sqlPgroonga ... Searches are performed using the full-text search engine [Pgroonga](https://pgroonga.github.io).
  - You will need to install Pgroonga additionally.
  - It enables faster search queries than sqlLike.

- meilisearch ... Searches are performed using the full-text search engine [Meilisearch](https://www.meilisearch.com).
  - You will need to install Meilisearch additionally.
  - It enables faster search queries than sqlLike.
  - Only notes with a visibility setting of “Public” or “Home” will be included in the search.To include follower-only posts in your search, you must use `sqlLike` or `sqlPgroonga`.

To change the search engine, edit the `provider` setting in the `fulltextSearch` section of the configuration file and restart the Misskey.

## Using Pgroonga

### Installing Pgroonga

:::warning

We recommend taking backup of your database.  
Please make sure to stop Misskey before making any changes.

:::

This is an example of installing Pgroonga on an Ubuntu 22.04, PostgreSQL 15 environment.

For details, please refer to the [official PostgreSQL installation guide](https://pgroonga.github.io/install/ubuntu.html).

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

If you want to use a MeCab-based tokenizer, also run the following:

```sh
sudo apt install -y -V groonga-tokenizer-mecab
```

#### If you are using Docker

In a Docker environment, you can use a Docker image with Pgroonga already installed.

To use a PostgreSQL image with Pgroonga already installed, use `groonga/pgroonga:latest-alpine-15-slim` instead of `postgres:15-alpine`.

### Enable Pgroonga

Next, log in to your PostgreSQL server.

```sh
sudo -u postgres psql
```

After logging in, select the Misskey database.

```sh
\c "mk1"
```

Enable Pgroonga.

```sh
CREATE EXTENSION pgroonga;
```

Create indexes for Pgroonga.

:::warning

Indexing takes time.Please ensure you have sufficient time for the task.

:::

```sh
CREATE INDEX idx_note_text_with_pgroonga ON note USING pgroonga (text);
```

When finished, type `exit` to log out of PostgreSQL.

### Change search engine

Edit the Misskey configuration file.  
Change `fulltextSearch` to `sqlPgroonga`.

```sh
fulltextSearch:
  provider: sqlPgroonga
```

Once you start the Misskey process and can search for notes, the setup is complete.
