# 手動安裝過程中的故障排除

<small>2018年10月07日 / 2021年12月20日 最終更新 / 撰文 aqz/tamaina</small>

雖然參加「MisskeyInstallBattle（Misskey 安裝大作戰）」的人變多了，但隨之而來的是，隨著時間推移，受輕重傷的人也越來越多。\
為了減少這類傷患，本文將淺顯易懂地解說過去發生事故的地點傾向以及對策。

**首先，請務必熟讀[搭建手冊](../guides/manual/)。**

另外，若能參考鄙人拙作 [Ubuntu 版 systemd 解說](https://hide.ac/articles/iFwm5HDvH)以及 [Oracle Cloud 版詳細解說](https://hide.ac/articles/csERs-7SU)，我也會感到很榮幸。

# 關於 Ubuntu 專用 Shell Script 的通知

「針對 Ubuntu 的解說都是複製貼上，太無聊了！太花時間了！總之就是麻煩！」

……咦，如果靠複製貼上就能搞定，那不就代表可以完全自動化嗎？

所以，**我製作了一個可以用 Shell Script 幫你幾乎搞定所有事情的東西！**\
[**詳細內容與使用方法請看這裡！** https://github.com/joinmisskey/bash-install#readme](https://github.com/joinmisskey/bash-install#readme)

關於網域的購買、Cloudflare 的設定以及伺服器的準備，請自行處理。

如果 Shell Script 有任何 Bug，請通知[製作者 (aqz)](https://p1.a9z.dev/@aqz)。

# 安裝與建置

請仔細閱讀[搭建手冊](../guides/manual/)。

## ImageMagick 相關

_**不需要 ImageMagick！**_

## 建置失敗

根據經驗法則，Misskey 的建置至少需要 2GB 的記憶體。\
您可以選擇升級伺服器規格，或者也可以在自己的電腦上建置好後再部署到伺服器上。

## 總覺得不太順利

- 請仔細閱讀[搭建手冊](../guides/manual/)。
- Node.js 的版本可能太舊？
  - 換個新一點的版本吧。
- 安裝或建置時雖然會出現 Error 或 WARN，但有時候其實沒問題。總之先 `npm start` 確認能不能跑再說。
- 可能沒安裝 node-gyp？
  - 試試 `apt install build-essential`。
  - Windows 用戶也可以參考[這篇文章](https://qiita.com/AkihiroTakamura/items/25ba516f8ec624e66ee7)。
- 如果這樣還是不行，請試著從頭開始，按照[搭建手冊](../guides/manual/)的步驟重做一次。

## 版本更新後發生問題

- 請仔細閱讀[搭建手冊](../guides/manual/)以及發布說明。
- 更新 Misskey 版本時，請確實執行 `pnpm install` 和 `pnpm run migrate`。如果還是沒修好，請試試 `pnpm run clean-all && pnpm install`，接著再試試 `pnpm run build && pnpm run migrate && pnpm start`。
- 如果這樣還是不行，請試著從頭開始，按照[搭建手冊](../guides/manual/)的步驟重做一次。

---

# 設定

請仔細閱讀[搭建手冊](../guides/manual/)。

設定是在 `.config/default.yml` 中進行。請複製 `.config/example.yml` 並依照註解進行撰寫。

（在 YAML 格式中，從 `#` 到行尾都會被視為註解。）

## URL 與連接埠號碼

我想 URL 和連接埠號碼的運作機制可能有點難懂。

在 `.config/example.yml` 中的「Port and TLS settings」部分有附上圖解說明，請依照該說明進行設定。
這邊我會一邊翻譯內文解說一邊進行。

### URL 的設定

```yml
# Final accessible URL seen by a user.
# 最終使用者訪問的 URL
url: https://example.tld/
```

**在 `url` 處，填寫用瀏覽器訪問伺服器時，網址列上顯示**（或你想讓它顯示）**的 URL。**

### 連接埠的設定

```yml
#   ┌───────────────────────┐
#───┘ Port and TLS settings └───────────────────────────────────
#### 連接埠與 TLS 設定         ####################################

# Misskey requires a reverse proxy to support HTTPS connections.
# Misskey 必須透過反向代理伺服器來支援 HTTPS 連線。
#
#                 +----- https://example.tld/ ------------+
#   +------+      |+-------------+      +----------------+|
#   | User | ---> || Proxy (443) | ---> | Misskey (3000) ||
#   +------+      |+-------------+      +----------------+|
#                 +---------------------------------------+
#
#   You need to set up a reverse proxy. (e.g. nginx)
#   此方法需要設定反向代理（例如：nginx）。
#   An encrypted connection with HTTPS is highly recommended
#   because tokens may be transferred in GET requests.
#   由於 Token 可能會包含在 GET 請求的 URL 中傳輸，
#   強烈建議使用 HTTPS 加密連線。
```

```yml
# The port that your Misskey server should listen on.
# Misskey 伺服器監聽的連接埠
port: 3000
```

在這個範例中，Misskey 使用連接埠 3000 進行通訊。
在反向代理的設定中，本地端的轉發目標請指定這個連接埠號碼。

----

# `npm start`或存取時常見的錯誤

雖然用 `npm start` 成功架起伺服器了，但之後可能會遇到問題。

首先，請仔細閱讀[搭建手冊](../guides/manual/)。

## 出現 YAML 錯誤

可能是 `default.yml` 的語法有誤。
行首是否有多餘的空白？

## 無法連接 redis

redis-server 有啟動嗎？
是否達到某種連線數上限？

11.20.2 版本之前的 Misskey 無法解析 redis 的密碼。請確認以下兩點：

- 不要為 redis 設定密碼。
- 將 `default.yml` 中 `redis:` 下方的 `pass:` 那一行註解掉。

## 頂部顯示寫著「這是開發建置」的紅色橫條

如果要公開伺服器，請務必使用 production 建置。

要使用產品 (Product) 建置，請將環境變數設定為 `NODE_ENV=production` 並執行 `npm run build && npm start`。

## 無法註冊新帳號

似乎無法連接 API。
請確認 `default.yml` 開頭的 `url:` 是否設定正確。
也請再次仔細確認 Node.js 的版本和安裝設定。

另外，`default.yml` 的內容寫對了嗎？

## 時間軸顯示出現問題，TL 無法即時更新

如果讀取時間軸失敗，可能是 mongoDB 或 PostgreSQL 的版本太舊。
PostgreSQL 請盡量使用 v13 以上版本。

最好也確認一下 redis 的連線。 [→ 請參閱「無法連接 redis？」。 ](#無法連接-redis）

## 右下角永遠顯示「重新連線中」，TL 無法即時更新

如果您有使用代理伺服器，可能是它阻擋了 WebSocket 通訊。

## 使用物件儲存時出現問題

可能是物件儲存的權限設定太嚴格了。請試著將權限設定為「任何人皆可取得檔案（物件）」。
另外，請再次確認 `default.yml`。

### S3 example (with CDN, custom domain)

`S3 example (with CDN, custom domain)` 是當您不想使用 AWS 的預設網域，而是想用獨立網域公開儲存空間時的設定。
如果 Endpoint 和公開網域是同一個服務，不需要像 S3 example 那樣特別寫明 `baseUrl`；此外，如果該服務沒有 Region 的概念，也不需要寫 `region` 那一行。

### S3 相容服務的設定

Misskey 使用 [aws-sdk](https://www.npmjs.com/package/aws-sdk) 來連接物件儲存。
只要是與 Amazon S3 相容的物件儲存服務，都有可能可以使用。

請詳讀各服務/軟體的文件並嘗試設定。

### 讀取 (Loading) 跑不完

如果您使用 Cloudflare，請確認 Rocket Loader 或 Auto Minify 是否已啟用。如果已啟用，將其關閉或許能解決問題。

---

# 如果完全無法解決

請嘗試以下順序：

1. 詳讀 Misskey 的官方文件。
2. 試著用 Google 搜尋。
3. 搜尋 [Misskey 儲存庫的 Issues](https://github.com/misskey-dev/misskey/issues)（可能有人遇到相同的錯誤，或是 Misskey 本身的 Bug）。
4. 如果搜尋後實在找不到解法，請向專家提問。
   1. 試著在 [Misskey 的 Discord 伺服器](https://discord.gg/P4yYqYBjEp)等地方詢問。
   2. 發送回覆或指名貼文詢問開發者 ([aqz](https://p1.a9z.dev/@aqz) 或 syuilo)。
