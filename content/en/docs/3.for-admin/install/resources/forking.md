# Notes on Forking and Customizing Misskey

The GNU Affero General Public License v3.0 (AGPL-3.0), adopted by Misskey, mandates the disclosure of any modifications made to the Misskey source code.

Starting from Misskey v2024.2.0, a feature has been implemented to facilitate compliance with this license.Here, we introduce how to configure this feature.

:::warning

Of course, even if you base your work on versions before this, you still need to take measures to comply with the license.

:::

## Using Misskey Without Modifications

If you intend to use only the built-in features of Misskey without making any changes to the codebase, there's no specific action required.

## Making Changes to Misskey's Code and Publishing the Modified Version on Platforms like GitHub

If you modify the Misskey code and intend to publish the modified version on platforms like GitHub, please ensure the following:

- Keep your repository public (without access restrictions, allowing anyone to access it)

Let's proceed with the setup.

1. Build the modified version of Misskey and deploy it in your production environment.
2. While logged in as an Admin account, open the [admin settings](x-mi-web://admin/settings) page.
3. Enter the URL of your Misskey repository in the "Repository URL" field.

## Making Changes to Misskey's Code but Not Publishing the Modified Version (or Unable to)

Even in this case, you need to provide direct access to the source code from the Misskey interface.Starting from Misskey v2024.2.0, a feature has been implemented to automatically package the source code into a tarball during the build process.

:::tip

Note that **disclosing the source code only when requested is deemed insufficient for license compliance.**

Even if you don't utilize Misskey's built-in source code disclosing feature, ensure that there is some way to directly access the source code of the running version of Misskey from the Misskey Web interface.

:::

Let's proceed with the setup.

1. Open the Misskey configuration file (default is `.config/default.yml`).
2. Set `publishTarballInsteadOfProvideRepositoryUrl` to `true` (you can simply uncomment the specified part in the config file).
3. Build Misskey (this will generate a tarball of the source code).
4. Open the generated tarball and ensure that **no confidential information such as tokens is included in the distributed source code.**
5. If any confidential information is included, edit `scripts/tarball.mjs` to exclude such information.

:::warning

The generation of the source code tarball occurs during the build process.Be sure to rebuild whenever changes are made to `scripts/tarball.mjs`.

:::
