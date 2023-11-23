---
description: 本指南介紹如何安裝和設定 Misskey。
---

# 手動建置 Misskey

本指南介紹如何安裝和設定 Misskey。

:::danger
一旦開始使用伺服器，切勿更改伺服器的網域名稱/主機名稱！
:::

:::tip{label='前提条件'}

#### 必須安裝並設定以下軟體

- **[Node.js](https://nodejs.org/en/)** (20.4.x以上)
- **[PostgreSQL](https://www.postgresql.org/)** (15以上)
- **[Redis](https://redis.io/)**
- **[FFmpeg](https://www.ffmpeg.org/)**

如果您使用 Debian/Ubuntu，最好安裝 `build-essential` 軟體包。

#### 必須啟用 corepack

```sh
sudo corepack enable
```

:::

## 建立使用者

Misskey 不應以 root 使用者身分執行，因此應建立使用者。
Debian 範例：

```sh
adduser --disabled-password --disabled-login misskey
```

## 安裝 Misskey

```sh
sudo -iu misskey
git clone --recursive https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
```

## 設定

複製設定範例 `.config/example.yml`，並將其重新命名為 `default.yml`。

```sh
cp .config/example.yml .config/default.yml
```

根據檔案中的說明編輯 `default.yml`。

## 建構和初始化

以下命令將建構 Misskey 並初始化資料庫。
這需要一些時間。

```sh
NODE_ENV=production pnpm run build
pnpm run init
```

## 啟動

您做到了！可以使用以下指令啟動 Misskey。

```sh
NODE_ENV=production pnpm run start
```

GLHF✨

::::g-details{summary="systemdを用いた管理"}

建立 systemd 服務檔案

`/etc/systemd/system/misskey.service`

在編輯器中打開它，貼上下面的代碼並儲存：

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
如果你想在 CentOS 上讓  Misskey 使用的連接埠低於 1024，需要將其更改為 `ExecStart=/usr/bin/sudo /usr/bin/npm start`。
:::

重新載入 systemd 並啟用 misskey 服務。

```sh
sudo systemctl daemon-reload
sudo systemctl enable misskey
```

啟動misskey服務

```sh
sudo systemctl start misskey
```

:::tip
鍵入 `systemctl status misskey` 查看服務狀態。
:::

## 如何更新Miskey

:::warning
更新前請務必查看[版本說明](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md)，以便提前了解所做的更改以及是否需要額外工作（大多數情況下不需要）。
:::

拉回 master，安裝、建置和遷移資料庫：

```sh
git checkout master
git pull
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
NODE_ENV=production pnpm run build
pnpm run migrate
```

根據更新內容和資料庫大小，可能需要一些時間。

更新完成後，請重新啟動 Misskey 服務。

```sh
sudo systemctl restart misskey
```

:::tip
ビルドや起動時にエラーが発生した場合は、以下のコマンドをお試しください:

- `pnpm run clean` 或 `pnpm run clean-all`
- `pnpm rebuild`
  :::
