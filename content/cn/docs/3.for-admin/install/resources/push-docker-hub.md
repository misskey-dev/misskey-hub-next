# 如何使用 GitHub Actions推送到 Docker Hub

[/.github/workflows/docker.yml](https://github.com/misskey-dev/misskey/blob/develop/.github/workflows/docker.yml) に\
GitHub ActionによりDocker Hubへpushするワークフローが記述されています。

GitHub Action 描述了一个将推送到 Docker Hub 的工作流</br>
在原始存储库中，当发布时 `latest`，< release name > 标签将被推送到 Docker Hub</br>* Docker Hub 可能有一个类似 < 分支名称> 的标签，但它不是自动推送的。

在 Fork 目标上运行此工作流将失败。

下面，我们将描述如何让 Fork 目标推送到您的 Docker Hub 存储库中。

## 如何配置为推送到您的 Docker Hub 存储库。

1. 在 Docker Hub 中创建一个仓库
2. 将工作流文件中的 [images](https://github.com/misskey-dev/misskey/blob/53f3b779bf16abcda4f6e026c51384f3b8fbcc62/.github/workflows/docker.yml#L20) 替换为您创建的存储库
3. 在 GitHub 上创建加密的 secret\
   \
   您需要创建 `DOCKER_USERNAME` 和 `DOCKER_PASSWORD`，分别是 Docker Hub 用户和密码。

## push的方法

通过上述设置，它将在发布时自动推送到 Docker Hub\
\
具体来说，当您使用 GitHub 发布功能发布时 ，`latest`、`< 版本名称>` 将被推送到 Docker Hub

您也可以在 GitHub 上手动推送\
\
要执行此操作，请从 Actions => Publish Docker image => Run workflow 中选择分支来运行工作流。\
\
但是，在这种情况下创建的标签将是`<branch name>`
