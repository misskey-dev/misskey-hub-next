# Misskey install shell script v3.0.0

現在可以透過 shell script 簡單安裝 Misskey！

您可以只回答幾個問題，然後在 Ubuntu Server 上面簡單的安裝 Misskey！

此外，也提供更新用的腳本。

[v12 版在此處](https://github.com/joinmisskey/bash-install/blob/a096e874f93d493aa68975a31be9ce12d644e767/README.md)

## 需要事前準備的東西

1. 域名
2. 安裝好 Ubuntu 的 Server
3. Cloudflare 帳號 （推薦）

:::danger

一旦開始使用，請勿使用伺服器的網域名稱/主機名稱重新建立資料庫！

:::

由於 Let's Enctypt 的認證嘗試次數是有限的，因此請在開始安裝之前先仔細檢查伺服器的網路或 DNS 是否設定正確。

## 設定 Cloudflare

使用 Cloudflare 時，請先完成 Cloudflare 的網域設定後再開始安裝。  
\
名稱伺服器（Name Server）的套用最長可能需要約 3 天時間。

另外，若同時設定 nginx 與 Cloudflare，請在 Cloudflare 的設定畫面中進行以下設定：

- 設定 DNS。
- 在 SSL/TLS 設定中，將加密模式設為「Full」。

## 操作步驟

### 1. SSH

透過 SSH 連線至伺服器。  
\
（如果您是直接開啟伺服器的桌面環境，請改為開啟終端機（Shell）。）

### 2. 將環境更新至最新

將所有套件更新到最新，然後重新開機。

```sh
sudo apt update; sudo apt full-upgrade -y; sudo reboot
```

### 3. 開始安裝

重新以 SSH 連線，開始安裝 Misskey。

不過，在安裝之前，強烈建議先閱讀 [Tips](#tips)。

```sh
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/ubuntu.sh -O ubuntu.sh; sudo bash ubuntu.sh
```

請將其中的 example.com 換成自己的域名。

### 4. 進行更新

這邊也有用於更新用的 script.

用於更新的 script 本身不會更新系統環境。請參考 CHANGELOG（日文）以及 [GitHub 的發行版本列表（英文）](https://github.com/joinmisskey/bash-install/releases)，
並視情況自行進行必要的遷移（migration）操作。

首先，下載用於更新的 script：

```sh
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/update.ubuntu.sh -O update.sh
```

需要進行更新時，請執行此 script：

```sh
sudo bash update.sh
```

- 在 systemd 環境中，可以使用 `-r` 選項同時進行系統更新並重新啟動。
- 在 Docker 環境中，則可以於參數中指定「更新後的儲存庫名稱:標籤名稱」。

## 已確認可以正常運作的環境

### Oracle Cloud Infrastructure

此腳本可在 Oracle Cloud Infrastructure 的 Always Free 服務所提供的兩種機型上正常運作。

- VM.Standard.E2.1.Micro (AMD)
- VM.Standard.A1.Flex (ARM) [1OCPU RAM6GB or greater]

請使用 iptables.

## 歡迎提交 Issues 與 PR

如果在上述環境中無法正常運作，可能是程式的錯誤。請在回報時一併附上安裝時所指定的條件，並透過 GitHub 的 Issue 功能向我們回報，將不勝感激。

對於上述以外的環境，提供支援可能較為困難，但若您能詳細說明實際情況，仍有機會協助解決問題。

我們也非常歡迎功能方面的建議。

# Tips

關於選項的選擇方式與相關規格說明。

## Systemd or Docker?

從 v1 起，可以選擇使用 systemd 或 Docker 作為安裝方式。

即使選擇 Docker，也只是以 Docker 執行 Misskey 本身，Redis、Postgres 等服務仍會在主機上直接執行。  
\
[若想使用 docker-compose 來啟動全部功能，推薦參考由 mamemononga 撰寫的這篇文章。](https://gist.github.com/mamemomonga/5549bb69cad8e5618e5527593d4890e0)

如果採用 Docker Hub 映像檔的設定方式，就不需要自行建置 Misskey，因此是**最推薦的方式**。  
\
不過，仍然需要進行資料庫遷移，所以更新時不可能做到完全零停機。  
\
另外，由於不會準備 Misskey 的建置環境（也不會進行 git pull），日後若想執行 fork 版本，設定會比較麻煩。

在本機自行建置 Docker 映像的方式，基於效能考量不推薦。

systemd 雖然不需要將映像上傳至 Docker Hub，但在想要使用 fork 的情況下會是較好的選擇。

推薦順序如下：

1. Docker Hub
2. systemd
3. Docker Build

## 是否使用 nginx

除非符合以下情況，否則我們建議採用 nginx 作為介於網際網路與 Misskey 之間的反向代理。

- 僅有你一位使用者（所謂的單人伺服器），或使用者人數極少
- 已透過其他方式提供 nginx 的反向代理與快取功能，例如使用負載平衡器（僅適合進階使用者）

將 nginx 作為反向代理使用，可以快取圖片檔案等靜態內容，從而減少伺服器資源的浪費。
此外，nginx 具備在快取尚未建立時妥善控制大量存取的功能，因此有助於抑制 Misskey 的負載增加。

設定範例請參考 [nginx 的設定頁面](../resources/nginx/)。

## Add more swaps!

若已設定 Swap，記憶體總量（RAM + Swap）必須達到 3GB 以上，否則腳本將無法執行。

## 若途中失敗並需要再次執行腳本

萬一在執行途中失敗，需要再次執行腳本時，請注意以下事項：

- 如果 Redis 與 PostgreSQL 已經安裝完成，請將「install locally」設為 No。  
  \
  在 host 與 port 的設定畫面中，請直接按 Enter 保持原有設定。
  使用者名稱與密碼請輸入上一次執行腳本時所設定的內容。

## 關於 .env 檔案

安裝腳本會建立兩個相關的 .env 檔案（其中一個會依 systemd 或 Docker 而不同）。  
\
在更新時會使用到。

### /root/.misskey.env

此檔案用於記錄執行 Misskey 的使用者。

### /home/(misskey user)/.misskey.env

在使用 systemd 的情況下會建立此檔案。  
\
主要用於記錄目錄路徑。

### /home/(misskey user)/.misskey-docker.env

在使用 Docker 的情況下會建立此檔案。  
\
用於保存目前正在執行的容器與映像的 ID。  
\
更新時會更新容器 ID，並刪除舊的映像。

## 自行管理

這是一份在安裝完成後，於變更設定時可能會派上用場的備忘說明。

閱讀時，請將文中的 "example.com" 替換為你自己的網域名稱。

### Misskey 目錄

Misskey 的原始碼會被 clone 到 `/home/{{user}}/{{directory}}` 底下。  
\
（{{user}}、{{directory}} 的預設值都是 misskey。）

如果要移動到 Misskey 目錄，請透過以下指令移動。

```sh
sudo -iu {{user}}
cd {{directory}}
```

要返回本來的 user 請輸入 exit.

```sh
exit
```

### systemd

systemd 的 process name 是 example.com.  
\
例如，若要重新啟動服務，可以使用以下指令：

```sh
sudo systemctl restart example.com
```

可以透過 journalctl 來檢查紀錄檔。

```sh
journalctl -t example.com
```

設定檔被放在 `/etc/systemd/system/example.com.service`

### Docker

Docker 以 Misskey 使用者身分以 rootless 模式執行。

當使用 sudo 切換到 Misskey 使用者時，需要設定 `XDG_RUNTIME_DIR` 與 `DOCKER_HOST`。

```sh
sudo -iu 使用者
export XDG_RUNTIME_DIR=/run/user/$UID
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock

# 顯示容器列表
docker ps

# 建置映像 (儲存庫：local/misskey:latest)
docker build -t local/misskey:latest ./misskey

# 執行 docker run
docker run -d -p 3000:3000 --add-host=docker_host:10.0.0.1 -v /home/misskey/misskey/files:/misskey/files -v "/home/misskey/misskey/.config/default.yml":/misskey/.config/default.yml:ro --restart unless-stopped -t "local/misskey:latest"

# 顯示日誌
docker logs --tail 50 -f 容器ID
```

若要使用單行指令，可如下執行：

```sh
sudo -u 使用者 XDG_RUNTIME_DIR=/run/user/$(id -u 使用者) DOCKER_HOST=unix:///run/user/$(id -u 使用者)/docker.sock docker ps
```

### nginx

nginx 的設定被放在 `/etc/nginx/conf.d/example.com.conf`

### Redis

requirepass 與 bind 已在 /etc/redis/misskey.conf 中設定。

## Q. 更新後出現 502 無法存取

在 Docker 環境中，由於啟動後需要執行資料庫遷移，因此無法立即存取。  
\
請確認資料庫遷移是否已完成。

在 systemd 環境中，可能是 `pnpm install` 失敗。

請在 Misskey 目錄中執行以下指令，然後再嘗試重新執行更新。

```sh
pnpm run clean-all
```

使用 `journalctl` 檢查日誌時，通常可以看到與 `re2` 相關的記錄。

## Q. 想要在同個伺服器裡面再建一個 Misskey

此腳本並未設計用於在同一台伺服器上額外安裝另一個 Misskey。  
\
部分設定很可能會被覆寫，或在安裝過程中發生錯誤。
