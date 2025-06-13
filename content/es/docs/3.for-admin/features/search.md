# Búsqueda de Notas

Misskey tiene una función de búsqueda de notas.La activación permite buscar notas.

:::tip

La función de búsqueda está desactivada por defecto.
Si desea utilizarla, active la opción "Utilizar búsqueda de notas" en el rol.

:::

## Motores de búsqueda compatibles

Misskey ofrece varios algoritmos para la búsqueda de notas.Puedes cambiar de uno a otro en función del tamaño de tu servidor y de tus necesidades.

- sqlLike ... Búsqueda utilizando las funciones estándar de PostgreSQL.(Predeterminado)
  - Es fácil de usar, ya que utiliza funciones de base de datos incorporadas.
  - A medida que aumenta el volumen de datos, es probable que las búsquedas lleven más tiempo.

- sqlPgroonga ... Para realizar la búsqueda se utiliza el motor de búsqueda de texto completo [Pgroonga](https://pgroonga.github.io).
  - Es necesario instalar Pgroonga.
  - Búsquedas más rápidas que sqlLike.

- meilisearch ... Búsqueda mediante el motor de búsqueda de texto completo [Meilisearch](https://www.meilisearch.com).
  - Meilisearch debe estar instalado.
  - Búsquedas más rápidas que sqlLike.
  - Las notas que se buscan en las líneas de tiempo Inicio y Local.Si quieres incluir publicaciones sólo de seguidores, debes usar `sqlLike` o `sqlPgroonga`.

Para cambiar el motor de búsqueda, reescriba el `provider` en `fulltextSearch` en el archivo de configuración y reinicie el proceso de Misskey.

## Uso de Pgroonga

### Instalación de Pgroonga

:::warning

Se recomienda hacer una copia de seguridad de la base de datos antes de realizar cualquier trabajo.\
Además, detenga a Misskey antes de empezar a trabajar.

:::

Este es un ejemplo de instalación de Pgroonga en un entorno Ubuntu 22.04, PostgreSQL 15.

Para más información, consulte [Cómo instalar para PostgreSQL oficial](https://pgroonga.github.io/ja/install/ubuntu.html).

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

Si desea utilizar un tokenizador basado en MeCab, haga también lo siguiente

```sh
sudo apt install -y -V groonga-tokenizer-mecab
```

### Habilitación de Pgroonga

A continuación, inicie sesión en PostgreSQL.

```sh
sudo -u postgres psql
```

Una vez conectado, seleccione la base de datos Misskey.

```sh
\c "mk1"
```

Habilitar PGroonga.

```sh
CREATE EXTENSION pgroonga;
```

Crear un índice para PGroonga.

:::warning

La indexación lleva tiempo.Asegúrate de disponer de tiempo suficiente

:::

```sh
CREATE INDEX idx_note_text_with_pgroonga ON note USING pgroonga (text);
```

Cuando termine, escriba `exit` para salir de Postgresql.

### Cambio de motores de búsqueda

Edite el archivo de configuración de Misskey.\
Cambiar `fulltextSearch` por `sqlPgroonga`.

```sh
fulltextSearch:
  provider: sqlPgroonga
```

Inicie el proceso Misskey y si puede encontrar la nota, ya está.
