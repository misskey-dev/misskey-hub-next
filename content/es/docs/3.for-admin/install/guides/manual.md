---
description: 'Esta guía te mostrará cómo instalar y configurar Misskey.'
---

# Instalación Manual de Misskey

Esta guía te mostrará cómo instalar y configurar Misskey.

:::danger

¡No vuelvas a crear la base de datos con el dominio/nombre de host del servidor una vez que hayas empezado a utilizarla!

:::

:::tip{label='前提条件'}

#### Necesitarás instalar los siguientes paquetes:

- **[Node.js](https://nodejs.org/es/)** (v22)
- **[pnpm](https://pnpm.io/)** (versión 10 o superiores)
- **[PostgreSQL](https://www.postgresql.org/)** (versión 15 o superiores)
- **[Redis](https://redis.io/)**
- **[FFmpeg](https://www.ffmpeg.org/)**

Si ejecutas Misskey en Debian/Ubuntu, necesitas instalar el paquete `build-essential`.

:::

## Creando los usuarios necesarios

Misskey no debería ejecutarse con permisos de superusuario, root, así que deberías crear un nuevo usuario.En Debian por ejemplo:

```sh
adduser --disabled-password --disabled-login misskey
```

## Misskeyのインストール

```sh
sudo -iu misskey
git clone --recursive https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
```

## 設定

設定サンプルの`.config/example.yml`をコピーし、`default.yml`にリネームします。

```sh
cp .config/example.yml .config/default.yml
```

`default.yml` をファイル内の指示に従って編集します。

## ビルドと初期化

次のコマンドでMisskeyのビルドとデータベースの初期化を行います。
これにはしばらく時間がかかります。

```sh
NODE_ENV=production pnpm run build
pnpm run init
```

## 起動

お疲れ様でした。以下のコマンドでMisskeyを起動できます。

```sh
NODE_ENV=production pnpm run start
```

GLHF✨

::::g-details{summary="systemdを用いた管理"}

systemdサービスのファイルを作成

`/etc/systemd/system/misskey.service`

エディタで開き、以下のコードを貼り付けて保存:

```ini
[Unit]
Description=Misskey daemon

[Service]
Type=simple
User=misskey
ExecStart=/usr/bin/npm start
WorkingDirectory=/home/misskey/misskey
Environment="NODE_ENV=production"
TimeoutSec=60
StandardOutput=journal
StandardError=journal
SyslogIdentifier=misskey
Restart=always

[Install]
WantedBy=multi-user.target
```

:::warning

CentOSで1024以下のポートを使用してMisskeyを使用する場合は`ExecStart=/usr/bin/sudo /usr/bin/npm start`に変更する必要があります。

:::

systemdを再読み込みしmisskeyサービスを有効化

```sh
sudo systemctl daemon-reload
sudo systemctl enable misskey
```

misskeyサービスの起動

```sh
sudo systemctl start misskey
```

:::tip

`systemctl status misskey`と入力すると、サービスの状態を調べることができます。

:::

::::

## Misskeyのアップデート方法

:::warning

アップデートの際は必ず[リリースノート](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md)を確認し、変更点や追加で必要になる作業の有無(ほとんどの場合ありません)を予め把握するようにしてください。

:::

masterをpullし直し、インストール、ビルド、データベースのマイグレーションを行います:

```sh
git checkout master
git pull
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
NODE_ENV=production pnpm run build
pnpm run migrate
```

アップデート内容、およびデータベースの規模によっては時間がかかることがあります。

アップデートが終わり次第、Misskeyプロセスを再起動してください。

```sh
sudo systemctl restart misskey
```

:::tip

ビルドや起動時にエラーが発生した場合は、以下のコマンドをお試しください:

- `pnpm run clean`または`pnpm run clean-all`
- `pnpm rebuild`

:::
