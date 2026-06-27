# 如何使用 GitHub Actions推送到 Docker Hub

在 [/.github/workflows/docker.yml](https://github.com/misskey-dev/misskey/blob/develop/.github/workflows/docker.yml) 中，描述了通过 GitHub Action 推送到 Docker Hub 的工作流 。

在原始仓库中，发布时会分别以 `latest` 和 `<release name>` 为标签推送到 Docker Hub。  
\
\
※ 虽然 Docker Hub 上可能会有 `<分支名称>` 这样的标签，但这些不是自动推送的对象。

若在 Fork 后的仓库中执行此工作流将会失败。

以下将说明如何在 Fork 后的仓库中，设置为推送到您自己的 Docker Hub 仓库的方法。

## 设置推送到自己的 Docker Hub 仓库的方法

1. 在 Docker Hub 上创建仓库。
2. 将工作流文件中的 [images](https://github.com/misskey-dev/misskey/blob/53f3b779bf16abcda4f6e026c51384f3b8fbcc62/.github/workflows/docker.yml#L20) 替换为您创建的仓库名称。
3. 在 GitHub 上创建 [加密密钥](https://docs.github.com/ja/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository)。  
   \
   \
   需要创建的是 `DOCKER_USERNAME` 和 `DOCKER_PASSWORD`，分别对应 Docker Hub 的用户名和密码。

## 推送方法

通过上述设置，发布 (Release) 时将自动推送到 Docker Hub。  
\
\
具体来说，当使用 GitHub 的发布功能进行发布时，会分别以 `latest` 和 `<发布名称>` 为标签推送到 Docker Hub。

此外，也可以从 GitHub 上手动进行推送。  
\
\
若要执行此操作，请前往 Actions => Publish Docker image => Run workflow ，选择分支后运行工作流。  
\
\
但是，这种情况下创建的标签将是 `<分支名称>`。
