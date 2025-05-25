---
description: This guide will tell you how to install and setting Misskey.
---

# Manual Misskey Installation

This guide will tell you how to install and setting Misskey.

:::danger

Do not recreate the database with the domain/hostname of the server after you have started using it!

:::

:::tip{label='前提条件'}

#### You need to install the follow packages:

- **[Node.js](https://nodejs.org/en/)** (above v22)
- **[PostgreSQL](https://www.postgresql.org/)** (above 15)
- **[PostgreSQL](https://www.postgresql.org/)** (v15以上)
- **[Redis](https://redis.io/)**
- **[FFmpeg](https://www.ffmpeg.org/)**

If you run Misskey on Debian/Ubuntu, you need to install `build-essential` package.

:::

## Create Linux User

Misskey should not run under root permission, so you should create a new user.
Debian for example:

```sh
adduser --disabled-password --disabled-login misskey
```

## Install Misskey

```sh
sudo -iu misskey
git clone --recursive https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
```

## Settings

Please copy setting sample file `.config/example.yml` to `default.yml`.

```sh
cp .config/example.yml .config/default.yml
```

And edit `default.yml` according to the help text in the file.

## Build and Initialize

The next command will build Misskey and initialize the database.
This will take some time.

```sh
NODE_ENV=production pnpm run build
pnpm run init
```

## Launch

お疲れ様でした。You did it.Please start Misskey with the following command.

```sh
NODE_ENV=production pnpm run start
```

GLHF✨

::::g-details{summary="Manage with systemd"}

Create systemd services config.

`/etc/systemd/system/misskey.service`

Open your editor and paste the following code:

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

If you are using CentOS and using port number less than 1024. Please change to `ExecStart=/usr/bin/sudo /usr/bin/npm start`.

:::

Reload systemd and enable misskey service.

```sh
sudo systemctl daemon-reload
sudo systemctl enable misskey
```

Launch Misskey service

```sh
sudo systemctl start misskey
```

:::tip

You can check the service status by `systemctl status misskey`.

:::

::::

## Updating Misskey

:::warning

Please check [release note](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md) before you update. To understand the changes and something need to do (usually don't to anything).

:::

Pull the master, install, build and migrating the database.

```sh
git checkout master
git pull
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
NODE_ENV=production pnpm run build
pnpm run migrate
```

It may take time depending on the update content and the database size.

After updating, Please restart the Misskey process.

```sh
sudo systemctl restart misskey
```

:::tip

If there are errors on build or start, please try the following command:

- `pnpm run clean` or `pnpm run clean-all`
- `pnpm rebuild`

:::
