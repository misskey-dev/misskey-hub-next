# Fork 或自定义 Misskey 时的注意事项

Misskey 采用的 GNU Affero General Public License v3.0（AGPL-3.0）要求，对 Misskey 源代码的任何修改都必须公开。

Misskey v2024.2.0 及之后的版本实现了一项功能，旨在帮助您更轻松地符合此许可证的要求。以下将介绍其设置方法。

:::warning

当然，即便是基于在此之前的旧版本进行开发，您仍必须采取相应措施以符合许可证的规范。

:::

## 直接使用 Misskey 的情况

若您未对 Misskey 的代码库进行任何修改，仅使用内置功能，则无需进行任何特别操作。

## 修改了 Misskey 的代码，并将该版本公开于 GitHub 等平台的情况

若您对 Misskey 的代码进行了某些修改，并打算在 GitHub 等平台公开该版本，请确认以下事项：

- 保持仓库为公开状态（不设置访问限制，确保任何人皆可访问）

接下来，让我们开始进行设置。

1. 构建修改过的Misskey版本，并在生产环境中运行。
2. 在使用Admin帐户登录的情况下，打开[控制面板](x-mi-web://admin/settings) 。
3. 在“仓库 URL”栏中，输入您的 Misskey 仓库链接。

## 修改了 Misskey 的代码，但不公开（或无法公开）于 GitHub 等平台的情况

即便在这种情况下，您仍须确保用户能从 Misskey 的界面上直接访问源代码。Misskey v2024.2.0 及之后的版本实现了一项功能，可在构建时自动将源代码打包成归档文件。

:::tip

请注意，**“仅在被要求时才提供源代码”的做法通常被视为不足以履行许可证义务。**

即使不使用 Misskey 内置的源代码提供功能，也请务必通过某种方式，确保用户能从 Misskey Web 界面上直接访问链接，以获取当前运行版本的源代码。

:::

接下来，让我们开始进行设置。

1. 打开 Misskey 的配置文件（默认为`.config/default.yml`）
2. 将 `publishTarballInsteadOfProvideRepositoryUrl` 设置为`true`（直接取消配置文件中该行的注释亦可）。
3. 构建 Misskey（此时将会生成源代码的 tarball 文件）。
4. 打开生成的归档文件，**检查其中是否包含 Token 等机密信息。**
5. 若包含机密信息，请编辑 `scripts/tarball.mjs` 以排除这些信息。

:::warning

源代码的归档文件生成是在构建阶段进行的。若您修改了 `scripts/tarball.mjs`，请务必重新执行构建。

:::
