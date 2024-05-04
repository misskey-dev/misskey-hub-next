# Misskey Hub (Next)

![Screenshot of Misskey Hub](./public/img/og/misskey-hub-screenshot-dr.png)

Website for Misskey, built with [Nuxt](https://nuxt.com/).

## お知らせの文言のいじり方

`app.config.ts` から指定できます。

## Docsの書き方

**必ず [`/content/.README.md`](./content/.README.md) をご覧ください**

## NuxtLinkについて

内部リンク・外部リンクに関する処理を強化した[`<GNuxtLink>`](./components/g/NuxtLink.vue)を使用していますので、**リンクを追加する際は`<NuxtLink>`ではなく`<GNuxtLink>`を使用してください。**

また、Nuxtのルーティングストラテジに、ホスティング環境に適した設定を適用するため、動的リンクの作成に使用する`useLocalePath`をラップしたコンポーサブル関数`useGLocalePath`を使うようにしています。

### Misskey Webへのリンクについて

GNuxtLinkおよび各種Docsで、アドレスに `x-mi-web://` から始め、続けてMisskeyの相対パスを入力すると、Misskey Webへのリンクに置き換えられます。

例: `/play` → `x-mi-web://play`

## Translation of Legal Documents / 法的文書の翻訳について

As legal documents need to be translated accurately, they are intentionally made inaccessible from Crowdin, where translations can be done easily. If you are interested in translating legal documents, please submit a pull request after drafting it as an issue and waiting for approval by dev members. Thank you for your understanding.

法的文書の翻訳は正確に行う必要があるため、あえてCrowdinから翻訳できないようにしてあります。法的文書の翻訳に興味がある場合は、まずはissueで草案を作成し、devメンバーの承認を得てからプルリクエストを送信してください。ご理解のほどよろしくお願いいたします。

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

> [!NOTE]
> 
> <img src="./public/img/misc/works-on-my-machine.png" align="right" height="130px"/>
> 
> このプログラムはMisskey Projectの使用するインフラストラクチャで動作するように設計されており、その他の環境で使用することは想定されていません。
> 
> This program is designed to run on the infrastructure used by the Misskey Project and is not intended to be used in other environments.

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## (おまけ) デプロイ時のオートメーションプログラム

`/__misc/gas/` に、Misskey Hubデプロイ時に自動実行しているプログラムを同梱しています。

Google Apps Scriptで動作します。

## License

GNU Affero General Public License v3.0

(c) 2023-2024 syuilo, kakkokari-gtyih and Misskey Project
