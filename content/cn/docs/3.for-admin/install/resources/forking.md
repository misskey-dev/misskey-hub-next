# 关于分支和定制 Misskey 的说明

Misskey 采用的 GNU Affero General Public License v3.0（AGPL-3.0）要求，对 Misskey 源代码的任何修改都必须公开。

Misskey v2024.2.0及更高版本实现了简化此许可证合规性的功能。在这里，我们将向您展示如何设置它。

:::warning

当然，即使您基于早期版本，您也必须采取措施来符合许可证。

:::

## 如果你继续使用Misskey

如果您只使用内置功能而不对Misskey的代码库进行任何更改，那么您不需要做任何特别的事情。

## 如果您对Misskey代码进行了一些更改，然后在GitHub上发布更改后的版本。

如果您想对Misskey的代码进行任何更改，并在GitHub或其他地方发布更改后的版本，请确保以下几点：

- 发布存储库（不限制访问）

好吧，让我们快速设置一下。

1. 构建修改过的Misskey版本，并在生产环境中运行。
2. 在使用Admin帐户登录的情况下，打开[管理画面](x-mi-web://admin/settings) 控制面板。
3. 在“存储库URL”字段中，输入Misskey存储库的URL。

## 如果你对Misskey代码做了一些更改，但你不能在GitHub上发布修改后的版本

即使在这种情况下，您仍然需要确保源代码可以直接从Misskey的接口访问。Misskey v2024.2.0和更高版本实现了在构建时自动将源代码打包到归档文件中的功能。

:::tip

请注意，仅在被要求时披露源代码的做法被认为不足以履行许可证。\*\*

如果您不使用Misskey内置的源代码提供功能，请确保您可以通过Misskey Web的接口直接访问当前运行的Misskey版本的源代码链接。

:::

好吧，让我们快速设置一下。

1. 打开Misskey的配置文件（默认为`.config/default.yml`）
2. 将 `publishTarballInsteadOfProvideRepositoryUrl` 设置为`true`（只需删除配置文件中指定的注释部分即可）。
3. 构建Misskey（这将生成源代码tarball）。
4. 打开生成的归档文件，并检查令牌等敏感信息是否包含在分发的源代码中。\*\*
5. 如果其中包含敏感信息，请确保编辑`scripts/tarball.mjs`以排除这些信息

:::warning

源代码的归档文件生成是在构建时完成的。如果您对`scripts/tarball.mjs`进行了更改，请确保再次构建

:::
