# 如何使用 GitHub Actions 推送到 Docker Hub

[/.github/workflows/docker.yml](https://github.com/misskey-dev/misskey/blob/develop/.github/workflows/docker.yml) 描述了使用 GitHub Action 推送到 Docker Hub 的工作流程。

在原始儲存庫中，會在發布時，分別以 `latest` 及 `<發布名稱>` 為標籤推送至 Docker Hub。  
\
\
※ 雖然 Docker Hub 上可能會看到 `<分支名稱>` 之類的標籤，但這並非自動推送的對象。

若在 Fork 後的儲存庫執行此工作流程將會失敗。

以下將說明如何在 Fork 後的儲存庫中，設定推送到您自己的 Docker Hub 儲存庫的方法。

## 設定推送到自己的 Docker Hub 儲存庫的方法

1. 在 Docker Hub 建立儲存庫。
2. 將工作流程檔案中的 [images](https://github.com/misskey-dev/misskey/blob/53f3b779bf16abcda4f6e026c51384f3b8fbcc62/.github/workflows/docker.yml#L20) 替換為您建立的儲存庫名稱。
3. 在 GitHub 上建立[加密密鑰](https://docs.github.com/ja/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository)。  
   \
   \
   需要建立的是 `DOCKER_USERNAME` 與 `DOCKER_PASSWORD`，分別對應 Docker Hub 的使用者名稱與密碼。

## 推送的方法

完成上述設定後，將會在發布時自動推送至 Docker Hub。  
\
\
具體而言，當使用 GitHub 的 Release 功能進行發布時，會分別以 `latest` 及 `<發布名稱>` 為標籤推送至 Docker Hub。

此外，也可以從 GitHub 上手動進行推送。  
\
\
若要手動推送，請前往 Actions => Publish Docker image => Run workflow，選擇分支後執行工作流程。  
\
\
不過，此時建立的標籤將會是 `<分支名稱>`。
