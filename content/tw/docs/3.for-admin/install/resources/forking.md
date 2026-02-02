# Fork 或客製化 Misskey 時的注意事項

Misskey 所採用的 GNU Affero General Public License v3.0 (AGPL-3.0) 規定，若您修改了 Misskey 的原始碼，則有義務公開該變更內容。

Misskey v2024.2.0 及之後的版本實作了一項功能，能讓您更輕鬆地符合此授權條款的要求。以下將介紹其設定方法。

:::warning

當然，即便是基於該版本之前的舊版本進行開發，您仍必須採取相應措施以符合授權條款的規範。

:::

## 直接使用 Misskey 的情況

若您未對 Misskey 的程式碼庫進行任何修改，僅使用內建功能，則無需進行任何特別操作。

## 修改了 Misskey 的程式碼，並將該版本公開於 GitHub 等平台的情況

若您對 Misskey 的程式碼進行了某些修改，並打算在 GitHub 等平台公開該版本，請確認以下事項：

- 保持儲存庫為公開狀態（不設定存取限制，確保任何人皆可存取）

接著，讓我們開始進行設定。

1. 建置修改後的 Misskey 版本，並在正式環境中運作。
2. 以管理員帳號登入的狀態下，開啟 [控制台](x-mi-web://admin/settings)。
3. 在「儲存庫 URL」欄位中，輸入您的 Misskey 儲存庫網址。

## 修改了 Misskey 的程式碼，但不公開（或無法公開）於 GitHub 等平台的情況

即便在這種情況下，您仍須確保使用者能從 Misskey 的介面上直接存取原始碼。Misskey v2024.2.0 及之後的版本實作了一項功能，可在建置時自動將原始碼打包成壓縮檔。

:::tip

請注意，**僅在被要求時才提供原始碼」的做法通常被視為不足以履行授權義務。**

即使不使用 Misskey 內建的原始碼提供功能，也請務必透過某種方式，確保使用者能從 Misskey Web 介面上直接存取連結，以取得當前運作版本的原始碼。

:::

接著，讓我們開始進行設定。

1. 開啟 Misskey 的設定檔（預設為 `.config/default.yml`）。
2. 將 `publishTarballInsteadOfProvideRepositoryUrl` 設定為 `true`（直接取消設定檔中該行註解亦可）。
3. 建置 Misskey（此時將會生成原始碼的 tarball 檔案）。
4. 開啟生成的壓縮檔，**檢查其中是否包含 Token 等機密資訊。**
5. 若包含機密資訊，請編輯 `scripts/tarball.mjs` 以排除這些資訊。

:::warning

原始碼的壓縮檔生成是在建置階段進行的。若您修改了 `scripts/tarball.mjs`，請務必重新執行建置。

:::
