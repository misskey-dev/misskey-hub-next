# 在 Ubuntu 安裝 Misskey 的詳細說明

## 其他 Misskey 安裝方法

- [基本版 Misskey 架設指南（manual）](./manual/)
- [其他安裝方法一覽](/docs/for-admin/install/guides/#安裝方法列表)

## Shell 腳本通知

既然大多都只是複製貼上，不如直接用 Shell 腳本吧。基於這個想法，**我做了一個幾乎能自動完成所有步驟的腳本！**\
[**Shell 腳本的詳細內容與使用方式請看這裡！**](./bash/)

:::tip

本文不以在開發環境中使用 Shell 腳本安裝為前提。

:::

:::tip

關於網域的購買、Cloudflare 的設定，以及伺服器的準備，請自行事先完成。

:::

若遇到任何問題，歡迎透過[提及 @aqz@p1.a9z.dev](https://p1.a9z.dev/@aqz) 與我聯絡。

## 關於本文

本文依照[「Misskey 架設指南（manual）」](./manual/)中的說明，採用 systemd 來執行 Misskey。

若使用 [docker-compose](./docker/)，即使手動操作，流程應該也能稍微簡單一些。

:::danger

一旦開始使用，請勿使用伺服器的域名以及主機名稱重新建立資料庫！

:::

## 前言

本文將以 [Misskey 架設手冊 (manual)](./manual/) 為基礎，鉅細靡遺地解說如何在一般的 Ubuntu 伺服器上安裝並公開 Misskey。

整個設定過程僅需輸入 Bash 指令、編輯少數設定檔，以及操作瀏覽器即可完成。文中雖會簡要說明所安裝的軟體，但您不必過於在意這些細節。

由於本文重視具體性，因此內容是針對特定環境所撰寫的。

若因作業系統差異、Misskey 本體或依賴軟體的版本更新而導致部分內容有所出入，還請見諒。

關於不懂的單詞，建議去查[『「好像懂了」又「好像沒懂」，但「感覺懂了」的 IT 術語辭典』](https://wa3.i-3-i.info/)，讓自己覺得「原來如此」就行了。

## 環境與條件

- 作業系統 (OS)：採用 **Ubuntu 22.04 LTS**。
- 硬體需求：CPU 若為近期推出的型號，即使是最低規格也能運作。架構設定為 amd64 及 arm64。
- 記憶體 (RAM)：建議至少 4GB。
  - （雖然先前曾說明導入 Vite 後僅需約 1.5GB 即可進行建置，但近期前端建置的資源需求又再次提高。）
- 網域：請購買獨立網域，並搭配 Cloudflare 使用。
- 請預先在 [Cloudflare Registrar](https://www.cloudflare.com/ja-jp/products/registrar/) 等服務商處準備好網域。
- 本文將以 example.tld 作為範例網域進行解說，閱讀時請自行替換為您購買的網域。若是開發環境，請替換為 localhost（這部分將在設定檔章節另行說明）。

:::danger

一旦開始使用伺服器，切勿更改伺服器的網域名稱/主機名稱！

:::

## 如何使用 nano

本次教學將使用 nano 作為文字編輯器。請透過以下指令啟動：

```sh
nano /path/to/file
```

您可以使用一般的方向鍵、Home 或 End 鍵來移動游標。

按下 Ctrl+X 即可離開；若系統詢問是否儲存變更，請輸入 Y (Yes) 並按下 Enter 鍵即可儲存。

畫面下方會顯示指令列表，其中 ^ 代表 Ctrl 鍵，M- 代表 Alt 鍵，請參考使用。

## 建立使用者

為了安全起見，不建議使用 root 權限執行 Misskey，因此我們需要建立一個專用使用者。

```sh
sudo adduser --disabled-password --disabled-login misskey
```

:::tip

若是開發環境，則無需建立獨立使用者。

:::

## 基礎軟體的安裝與設定

接著將進行基礎軟體的安裝。

### Node.js

Node.jsは、サーバーサイドJavaScript環境であり、Misskeyの基本的な実行環境である。

```sh
sudo rm /usr/share/keyrings/nodesource.gpg;
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/nodesource.gpg;
NODE_MAJOR=22; echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list;
sudo apt update;
sudo apt install -y nodejs;

# Node.js 安裝完成後，確認版本。
node -v
```

若顯示 v22.x.x 之類的內容即代表 OK。如果顯示像 v8.x.x 這種較舊的版本，表示安裝未成功，請嘗試重啟伺服器並重新安裝。

### pnpm

pnpm 是 Misskey 使用的套件管理工具，用來參照外部函式庫 (libraries) 以及管理其相依性。

這裡雖然介紹使用 Node.js 附帶的套件管理工具「npm」來安裝 pnpm 的方法，但 [pnpm 官網](https://pnpm.io/installation)上也介紹了其他各種安裝方式，建議您先瀏覽一遍，再選擇最適合您環境的方式進行安裝。

```sh
npm i -g pnpm
```

### PostgreSQL

PostgreSQL 是一個物件關聯式資料庫管理系統 (ORDBMS)，這是儲存 Misskey 各種資料所不可或缺的軟體。

#### 安裝

請執行 Shell Script，安裝最新版本 (v15)。

```sh
sudo apt install -y postgresql-common

sudo sh /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -i -v 15;

# 使用 systemctl 確認守護行程 (Daemon) 的狀態。
systemctl status postgresql
```

若顯示 active 即代表 OK。

#### 建立使用者與資料庫

啟動 psql。

```sh
sudo -u postgres psql
```

建立 Misskey 專用的使用者。\
若使用者名稱設為 misskey，密碼設為 hoge，指令如下：\
（請注意：Linux 的使用者與 PostgreSQL 的使用者是完全不同的概念，請勿混淆。）

```sql
CREATE ROLE misskey LOGIN PASSWORD 'hoge';
```

建立資料庫。此處將資料庫名稱設為 mk1。

```sql
CREATE DATABASE mk1 OWNER misskey;
\q
```

### Redis

Redis 是一款 NoSQL 的記憶體內 (in-memory) 資料庫軟體，對於管理資料庫快取以及與聯邦 (Federation) 之間的通訊來說，是不可或缺的元件。  
請依照 redis.io 的官方文件進行安裝。

https\://redis.io/docs/getting-started/installation/install-redis-on-linux/

```sh
sudo apt-get install lsb-release curl gpg
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis
```

啟動服務

```sh
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

使用 systemctl 確認守護行程 (Daemon) 的狀態。

```sh
systemctl status redis-server
```

若顯示 active 即代表 OK。

### FFmpeg

FFmpeg 負責處理影片與音訊相關的作業。請透過以下指令預先安裝。

```sh
sudo apt install ffmpeg
```

### nginx

nginx 是一款主要用於反向代理 (Reverse Proxy) 的網頁伺服器軟體。雖然並非執行 Misskey 的必要條件，但為了利用快取 (Cache) 提升效能，或實現 HTTP 轉送至 HTTPS 等功能，建議您進行安裝。

:::tip

若是開發環境，則無需設定 nginx。

:::

請依照 nginx.org 的文件 http\://nginx.org/en/linux_packages.html#Ubuntu 進行安裝。

```sh
sudo apt install -y curl ca-certificates gnupg2 lsb-release ubuntu-keyring

curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null

gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
```

此時請確認輸出結果中是否包含 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62。

```sh
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list

echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" | sudo tee /etc/apt/preferences.d/99nginx

sudo apt update

sudo apt install -y nginx
```

使用 systemctl 確認守護行程 (Daemon) 的狀態。

```sh
systemctl status nginx
```

若顯示 active 即代表 OK。否則，請執行下列指令：

```sh
sudo systemctl start nginx

sudo systemctl enable nginx
```

請連線至 <http://localhost> ，若出現 \*Welcome to nginx!\* 字樣即代表 OK。\
也可以使用 curl 進行確認：

```sh
curl http://localhost
```

### 其他

安裝 Git（版本控制軟體）以及 build-essential（建置 Misskey 時所需）。

```sh
sudo apt update

sudo apt install -y git build-essential
```

## 額外設定與安裝

準備將伺服器公開至網際網路。

:::tip

若是開發環境，則無需設定防火牆、Cloudflare 及 Certbot。

:::

### 防火牆

本次將使用 ufw 作為防火牆。

接下來的設定將採白名單形式控管連線：開放 22 號 SSH 連接埠並設下連線次數限制，同時開放 80 號 HTTP 及 443 號 HTTPS 連接埠。

```sh
sudo ufw enable

sudo ufw default deny

sudo ufw limit 22

sudo ufw allow 80

sudo ufw allow 443
```

確認 ufw 的狀態。

```sh
sudo ufw status
```

使用 systemctl 設為開機自動啟動（永續化）。

```sh
sudo systemctl enable ufw
```

:::tip

ufw 是一個讓人類更容易操作 netfilter (iptables) 的應用程式。若是使用安裝腳本（Installation Script），在 OCI (Oracle Cloud) 環境下通常會直接操作 netfilter。

:::

### Cloudflare

Cloudflare 是一個非常方便的服務，能針對您的網域一次提供 DNS 伺服器、反向代理以及 CDN 功能。\
雖然也可以不透過 Cloudflare 直接公開伺服器，但鑑於其便利性，強烈建議導入。
[**→ CDN 的設定**](../resources/cdn/)

請 [註冊 Cloudflare](https://dash.cloudflare.com/sign-up) ，並依照指引登錄您購買的網域。

建議先在 DNS 設定畫面中輸入伺服器的 IP 位址。

根據您購買網域的服務商不同，設定生效可能需要約 3 天的時間。

### 設定 Certbot (Let’s Encrypt)

我們將透過搭配 Cloudflare 的方式，從 Let’s Encrypt 取得用於 HTTPS 及 WSS 通訊的憑證。

安裝 certbot 與 Cloudflare 外掛套件：

```sh
sudo apt install -y certbot python3-certbot-dns-cloudflare
```

接著取得 Cloudflare 的 API Key。請依照以下步驟操作：

1. 前往 <https://dash.cloudflare.com/profile/api-tokens>
2. 點選 Global API Key 的 View 按鈕
3. 輸入密碼並完成 hCaptcha 驗證後，再次點選 View

建立記載 Cloudflare 資訊的設定檔 /etc/cloudflare/cloudflare.ini。

```sh
mkdir /etc/cloudflare
nano /etc/cloudflare/cloudflare.ini
```

請將 dns_cloudflare_email（如下方範例中的 bar\@fuga.foo）設定為您在 Cloudflare 註冊的電子郵件地址。

```sh
dns_cloudflare_email = bar@fuga.foo
dns_cloudflare_api_key = xxxxxxxxxxxxxxxxxxxxxxxxxx
```

儲存檔案，並將權限設定為 600。

```sh
sudo chmod 600 /etc/cloudflare/cloudflare.ini
```

準備就緒後，請執行以下指令。**指令中出現過兩次的 example.tld 請替換為您自己的網域**。

```sh
sudo certbot certonly --dns-cloudflare --dns-cloudflare-credentials /etc/cloudflare/cloudflare.ini --dns-cloudflare-propagation-seconds 60 --server https://acme-v02.api.letsencrypt.org/directory -d example.tld -d *.example.tld
```

若出現 \*Congratulations!\* 字樣即代表成功。生成的 .pem 檔案路徑之後會用到，請務必記錄下來。

自動更新的設定已在安裝時一併完成，因此無需額外設定。

## 安裝 Misskey

至此事前準備已大致完成，接下來將進行 Misskey 的準備工作。

切換為 misskey 使用者。

```sh
sudo su - misskey
```

透過 Git 取得檔案。

```sh
git clone -b master https://github.com/misskey-dev/misskey.git --recurse-submodules

cd misskey

git checkout master
```

安裝必要的 npm 套件。

```sh
NODE_ENV=production pnpm install --frozen-lockfile
```

## 設定 Misskey

### default.yml

建立設定檔 .config/default.yml。

```sh
nano .config/default.yml
```

請貼上以下內容，並適當地進行替換。需要修改設定值的地方以 ● 標示，沿用先前步驟所設定之數值的地方以 〇 標示。

此設定檔採用 YAML 格式，若行首的空格數量等格式錯誤將導致 Misskey 無法運作，請特別留意。

可設定的數值與撰寫方式記載於 [.config/example.yml](https://github.com/syuilo/misskey/blob/develop/.config/example.yml) 中。

:::tip

若是開發環境，url 請指定為 `url: http://localhost:3000`。

:::

```yml
# ● Misskey 公開網址 (URL)
url: https://example.tld/
# 連接埠設為 3000。
port: 3000

# ● PostgreSQL 設定。
db:
  host: localhost
  port: 5432
  db  : mk1 # 〇 PostgreSQL 資料庫名稱
  user: misskey # 〇 PostgreSQL 使用者名稱
  pass: hoge # ● PostgreSQL 密碼

# 　 Redis 設定。
redis:
  host: localhost
  port: 6379

# 　 ID 類型設定。
id: 'aidx'

# 　 syslog
syslog:
  host: localhost
  port: 514
```

設定完成後請存檔。

### nginx 設定

接著進行 nginx 的設定。

需使用 root 權限執行（請先退出 misskey 使用者）。

```sh
exit
```

建立 /etc/nginx/conf.d/misskey.conf。

```sh
sudo nano /etc/nginx/conf.d/misskey.conf
```

將 [Misskey Hub 上的設定範例](/docs/for-admin/install/resources/nginx/)複製貼上至 nano，並將下列部分修改為您自己的資訊：

- 將第 18 行與第 30 行的網域修改為您的網域。
- 將第 34-35 行的憑證路徑修改為 Certbot 取得的路徑（原則上只需替換 example.tld 即可）。
- 刪除第 56 行 (If it's behind another reverse proxy or CDN, remove the following.)  開始的 4 行內容。（因為我們使用了 Cloudflare）

儲存變更。

確認設定檔是否能正常運作。

```sh
sudo nginx -t
```

若顯示 OK，則重啟 nginx 守護行程 (Daemon)。

```sh
sudo systemctl restart nginx
```

確認狀態。

```sh
sudo systemctl status nginx
```

若顯示 active 即代表 OK。

## 建置 Misskey

重新登入為 misskey 使用者。

```sh
sudo su - misskey
```

開始建置。Yes we can…

```sh
cd misskey
NODE_ENV=production pnpm run build
```

:::tip

若是開發環境，則不需要 `NODE_ENV=production`。在之後的指令中也請同樣將其刪除。

:::

### 若無法在伺服器上建置

可能是記憶體 (RAM) 不足。

Misskey 的建置與資料庫遷移（包含初始化），需要 2GB 以上的記憶體。\
若記憶體不足，可考慮以下解決方案：

- 為伺服器增加 Swap（置換空間）。
- 將在本地端建置好的檔案（built 目錄）透過 sftp 傳輸過去。

## 初始化資料庫

```sh
pnpm run init
```

## 啟動 Misskey

```sh
NODE_ENV=production pnpm run start
```

當畫面上顯示 **Now listening on port 3000 on** [**http://example.tld**](http://example.tld) 時，請透過瀏覽器連線至您設定的網址。

此時應該會顯示 Misskey 的歡迎頁面。

請確認建立帳號、發布貼文、上傳檔案等一連串操作是否能正常執行。

### 若無法連線

#### 確認 Cloudflare 的 DNS

請再次確認 Cloudflare 的 DNS 設定是否指向正確的 IP 位址。

#### 確認路由器的設定

若是架設在家用伺服器，請確認路由器是否已設定為允許伺服器與外部進行 80 Port 及 443 Port 的通訊。

即使是雲端主機，通常也需要在網路設定中開放連接埠。

## 建立 Misskey 守護行程

:::tip

若是開發環境，則無需建立守護行程。

:::

請先按下 Ctrl+C 中止目前的程序 (Process)，接著進行讓 Misskey 以守護行程方式啟動的設定。

需使用 root 權限執行。

```sh
exit
```

建立 /etc/systemd/system/misskey.service。

```sh
sudo nano /etc/systemd/system/misskey.service
```

貼上以下內容並儲存。

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

設定 systemd 並啟動 misskey 守護行程。

```sh
sudo systemctl daemon-reload

sudo systemctl enable misskey

sudo systemctl start misskey
```

使用 systemctl 確認守護行程的狀態。由於啟動需要一點時間，建議等待約 15 秒後再執行。

```sh
sudo systemctl status misskey
```

若顯示 active 即代表 OK。

**至此 Misskey 的安裝已大致完成。**

請在 Misskey 伺服器上註冊並登入您的帳號，繼續進行後續設定。

## 繼續設定 Misskey

- [**在 Misskey 伺服器上最初應進行的伺服器設定及其他相關設定說明**](https://hide.ac/articles/Y504SIabp)
- [**設定 Squid 代理伺服器以保護 Misskey**](https://hide.ac/articles/MC7WsPDqw)
- [**備份 Misskey 資料庫【OCI 物件儲存篇】**](https://hide.ac/articles/E2Ea3cauk)

## Misskey 的更新

[Misskey 的更新方法](./manual/#misskeyのアップデート方法)

更新作業期間將無法使用 Misskey。

```sh
sudo systemctl stop misskey

su - misskey

git pull;
NODE_ENV=production pnpm install --frozen-lockfile
pnpm run clean;
NODE_ENV=production pnpm run build;
pnpm run migrate;

exit
```

### Case 1：執行系統更新 (apt upgrade)

```sh
sudo apt update -y
sudo apt full-upgrade -y
sudo reboot
```

重新啟動後，Misskey 將會自動啟動。

### Case 2：直接啟動

```sh
sudo systemctl start misskey
```
