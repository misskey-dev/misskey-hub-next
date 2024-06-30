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

請複製範例中的 `.config/example.yml`，並且重新命名為 `default.yml`。

```sh
cp .config/example.yml .config/default.yml
```

請根據檔案中的指示編輯 `default.yml`。

## 建構和初始化

使用以下命令建構 Misskey 並初始化資料庫。
這需要一些時間。

```sh
NODE_ENV=production pnpm run build
pnpm run init
```

## 啟動

辛苦了。可以使用以下指令啟動 Misskey。

```sh
NODE_ENV=production pnpm run start
```

GLHF✨

::::g-details{summary="透過 systemd 進行管理"}

建立 systemd 設定檔

`/etc/systemd/system/misskey.service`

在編輯器中打開它，貼上下面的程式碼並儲存：

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

在 CentOS 中使用小於 1024 的 port 號使用 Misskey 的話
必須修改為 `ExecStart=/usr/bin/sudo /usr/bin/npm start`

:::

重新載入 systemd 並啟用 misskey 服務。

```sh
sudo systemctl daemon-reload
sudo systemctl enable misskey
```

啟動 misskey 服務

```sh
sudo systemctl start misskey
```

:::tip

輸入 `systemctl status misskey` 查看服務狀態。

:::

::::

## 如何更新Miskey

:::warning

在進行更新時，請務必確認[變更日誌](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md)，預先了解變更和可能需要的作業（通常不需要）。

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

如果您在建置或啟動過程中遇到錯誤，請嘗試以下命令：

- `pnpm run clean` 或 `pnpm run clean-all`
- `pnpm rebuild`
  :::

:::
