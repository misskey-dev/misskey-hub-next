---
description: Misskey Hubが新しくなります！新しいMisskey Hubの機能やこだわり、今後のアップデートをご紹介。
date: 2023-12-03
---

# インサイド Misskey Hub Next

:::tip
この記事は、[Misskey Alt Advent Calendar 2023](https://adventar.org/calendars/8658) 3日目の記事です。
:::

![](/img/og/misskey-hub-screenshot-d.png)

こんにちは！Misskey 開発メンバーのかっこかりと申します。[Misskey.ioで某公立高校の部活動広報アカウント](https://misskey.io/@natureofmad_)の運営に参加したりもしています。

先日[しゅいろママからも発表](/blog/2023-12-01-2023recap/#misskey-hub-next)がありましたように、このたび、Misskeyプロジェクト公式サイト「Misskey Hub」の全面リニューアルを行うことになりました！今回、私が開発主担として、いまご覧いただいているこのサイトを制作しております。そこで、今日はこの新Misskey Hubの**機能・頑張った点・今後のアップデート**についてご紹介していきます！

## リニューアルのきっかけ

実はこのプロジェクト、私の持ち込み企画のような形でスタートしています。現行のMisskey Hubは、ドキュメントの多さからナビゲーションが肥大化してしまったり、翻訳に開発ツール（Git）を使う必要があったりと、様々な課題がありました。また、デザインについても改善できそうな場所が見られました。

そこで、自分でMisskey Hub作ってしまおう！ということにしたのです。（？？）

## リニューアル後の構成

現行のMisskey HubはVuePressをベースに作成されています。これは、ドキュメントを用意さえすればサイトの部分はある程度よしなにやってくれるというものです。

しかし、もともとのMisskey Hubの計画上、ドキュメント以外のページもかなり必要になるということで、ドキュメント生成二特化したフレームワークではなく、より拡張性が高く、汎用的な[Nuxt](https://nuxt.com/)をフレームワークとして採用しました。

:::warning
VuePressは現在アクティブにメンテナンスされていませんが、後継として[VitePress](https://vitepress.dev/)があります。
:::

:::g-details{summary="詳しい技術スタックはこちら"}

### フレームワーク

- [Nuxt](https://nuxt.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Bootstrap](https://getbootstrap.com/) （※フォーム・ボタンのみ使用）

#### Nuxt Modules

- [Nuxt Content](https://content.nuxt.com/)
- [Nuxt i18n](https://i18n.nuxtjs.org/)
- [Nuxt Color Mode](https://color-mode.nuxtjs.org/)

### 各種サービス

- [Vercel](https://vercel.com/)
- [Crowdin](https://crowdin.com/project/misskey-hub)

:::

## Nuxtとは？

[Nuxt](https://nuxt.com)は、Vue.jsを使ったWebアプリケーションフレームワークです。[静的サイト](/blog/2021-12-01-inside-misskey-hub/#静的サイト-is-何)の作成に使うための[SSG (Static Site Generator) モード](/blog/2021-12-01-inside-misskey-hub/#ssg-is-何)の他に、Nuxt自体がサーバー本体となって動作するSSR (Server Side Rendering) モード、さらにSSGモードとSSRモードのいいとこ取りをしたISR (Incremental Static Rendering) モードがあり、それらを**サイトのディレクトリごとに切り替えて**使うことができます。

・・・まとめて言うと、NuxtとはWeb制作に使える**とても万能なツール**だということで大丈夫です。

そして、今回のMisskey Hub Nextでは、ドキュメントページとブログページに**ISRモード**を、それ以外のページに**SSGモード**を適用しています。

:::tip
プロジェクト名に`Next`と入っているのでReactフレームワークの[Next.js](https://nextjs.org/)のほうを思い浮かべたかもしれませんが、**罠です。** Nuxtで作ってあります。
:::

## ISRとは？

[SSG](/blog/2021-12-01-inside-misskey-hub/#ssg-is-何)では、サイトの生成時にまとめてすべてのページを書き出してしまう必要があります。しかし、Misskey Hubには大量のドキュメントとブログページがあり、さらに翻訳版ページもあります。それらをすべて前もって生成すると、**とんでもなく時間がかかってしまいます。**

![ビルド時間: 27分49秒](https://media.misskeyusercontent.com/io/b7b8180f-302e-4e4d-a1a4-ad60d3985051.png)

そこで登場するのがISRです。ISR (Incremental Static Rendering) とは、サイトの書き出しのタイミングではページの生成は行わず、**最初にそのページに訪問されたときにページの生成を行います。** これを、特にページ数の多い[ドキュメントページ](/docs/)と[ブログページ](/blog/)に適用したことで、実に**13倍**も高速な生成が可能となりました。

![ビルド時間: 1分32秒](https://media.misskeyusercontent.com/io/298919ff-fb33-4fa7-8a5c-cc3c89f65c58.webp)

## デザイン

デザインに関しては、現行Misskey Hubのデザインをベースに、主に以下の項目を重視してリニューアルを行いました。

- ページを見つける導線の改善
- スマホでの操作感の改善
- ドキュメント更新にかかる手間の改善

### ページを見つける導線の改善

現行のMisskey Hubでは、ドキュメントページの一覧などがなく、パッと見てどこに何があるのかがわかりにくい状態でした。

![](/img/blog/2023-12-03-inside-misskey-hub-next/1.png)

そこで、Misskey Hub Nextでは、ドキュメントページをディレクトリ構造から抜本的に見直しました。利用者別にページ階層を分けたほか、各セクションに見出しページを設けられるようにしました。

[ドキュメントのトップページ](/docs/)もかなり整理されたかと思います。

![](/img/blog/2023-12-03-inside-misskey-hub-next/2.png)

また、同様にドキュメントページのデザインも変更しました。左側には各ページが階層で表示され、右側には現在のページのもくじが表示されます。

![](/img/blog/2023-12-03-inside-misskey-hub-next/3.png)

### スマホでの操作感の改善

現行のMisskey Hubでは、モバイルナビゲーションが肥大化し、見にくくなってしまっていたほか、一部では文字が見えにくい部分もあります。
また、スクロールの際にアニメーションがもたついて背景がカクカクする・・・といった問題も起きていました。

そこで、Misskey Hub Nextではスマホ表示でのデザインを改善し、一部ではスマホ専用のUIを設けて対応しました。上で紹介したドキュメントページの各種UIも、スマホの小さい画面でもアクセスできるように配置してあります。

### ドキュメント更新にかかる手間の改善

現行のMisskey Hubでは、ドキュメントは翻訳版も含めてすべてGithub上で管理されており、Githubを使ったことのない人にとって、ドキュメントの更新のハードルは高いものでした。

そこで、Misskey Hub Nextでは、翻訳の管理を外部サービス（Crowdin）で行えるように設計。技術的な知識不要で、翻訳に参加できるようになりました。

依然として新しいドキュメントの追加にはGithubが必要になってしまいますが、コレも今後どうにかしたいなぁ・・・と検討中です。Githubを使える方は、ドキュメントの拡充に引き続きご協力お願いします🙏

:::tip{label='お知らせ'}

現在、翻訳にご協力いただける方を募集中です！ We are looking for translators for this site!

[![](/img/blog/2023-12-03-inside-misskey-hub-next/5.png)](https://crowdin.com/project/misskey-hub)

[翻訳サイト](https://crowdin.com/project/misskey-hub)をご覧頂いた上で、リストに既にある言語へ翻訳する場合は、そのままログインして作業を開始できます。

リストにない言語でも、[ご連絡](https://misskey.io/@kakkokari_gtyih)いただければ言語を追加します。

Misskeyをより多くの人に広めるために、ぜひご協力お願いします🙏

:::

:::g-details{summary="【マニアック】フォントのはなし"}
Misskey Hub Nextでは、フォントの改善も行いました。

現行のMisskey Hubで使われているフォント（Kosugi Maru）は、英字が歪で、英単語や英文になると読みにくくなっていました。また、日本語の漢字部分が中国語とバッティングして不自然に見えてしまうという問題もありました。

そこで、Misskey Hub Nextでは、英字に欧文フォントを採用し、各種言語にはそれぞれの国ごとにフォントを切り替えるようにしました。

### フォント一覧

#### 欧文フォント

- [Capriola](https://fonts.google.com/specimen/Capriola) （キャッチコピーやタイトルに使用）
- [Nunito](https://fonts.google.com/specimen/Nunito) （本文に使用）

#### 日本語

- [源柔ゴシックX](http://jikasei.me/font/genjyuu/)

#### 韓国語

- [Pretendard](https://cactus.tistory.com/306)

#### 中国語

- [Noto Sans Traditional Chinese](https://fonts.google.com/specimen/Noto+Sans+TC)
- [Noto Sans Simplified Chinese](https://fonts.google.com/specimen/Noto+Sans+SC)

:::

## 機能紹介

ここからは、Misskey Hub Nextに搭載された機能をご紹介します！

### Misskeyサーバー一覧

Misskeyの[サーバー一覧](/servers/)を、[Misskeyをはじめよう(joinmisskey)](https://join.misskey.page/)のシステムを使用して大幅に改良しました！

![](/img/blog/2023-12-03-inside-misskey-hub-next/6.png)

これにより、基本的には**サーバーを追加するのに特別な作業や申請は必要なくなり、新しく見つかったサーバーは自動的に追加されるようになりました！**

:::tip
なので近日中にjoinmisskeyはMisskey Hubに統合されるかも…？
:::

### 【新機能】ツール集

Misskey関連のさまざまな便利ツールを提供するページ「[ツール集](/tools/)」を新たに開発しました！

![](/img/blog/2023-12-03-inside-misskey-hub-next/7.png)

現在

- MFMお試しコーナー
- aid/aidx変換ツール

をご利用いただけますが、今後も随時拡充していく予定です💪

:::tip
[MFMお試しコーナー](/tools/mfm-playground/)の再現精度は割と高いのでMFMアートづくりにもおすすめです
:::

### 藍


:::fukidashi{chara="doya_ai" charaName="藍"}
Misskey Hub Nextでは、わたし・藍も色々なところにいます！  
ほら、こんなところにも！

![](https://media.misskeyusercontent.com/io/7f980e50-bbd8-4527-b9f7-f6f97564956a.png)

ほかにも色々なところに隠れているので、ぜひ探してみてくださいね♪
:::

さらに、<ruby>古<rt>いにしえ</rt></ruby>のミスキストや、現行Misskey Hubのヘビーユーザーしか知らないであろう、知る人ぞ知る機能・**藍モード**も移植しました！

え？何が起きるのかって？  
まあまあ、ものは試しです。やってみてください↓

:AiModeB

[制作：しなむ 様](https://misskey.io/@shinamu476)

## 今後実装する予定の機能

※以下はすべて「予定」です。

### APIエンドポイント ドキュメント

こちらは、現在[株式会社MisskeyHQ (村上さん)](https://misskey.io/notes/9l0i92bvr1)と連携しながら、ドキュメントの拡充に取り組んでいます。もう少しお待ち下さい🙏

:::tip
ドキュメントの拡充にご協力いただける方は、[こちら](https://misskey.io/notes/9l0i92bvr1)をご覧のうえ、ぜひご参加ください！
:::

### シェアボタン中継機能

MisskeyへWebページをシェアする機能を、Misskey Hubを中継して行えるようにする予定です（[Misskey Share](https://misskeyshare.link/) や [DonShare](https://donshare.net/)にあたる機能を実装します）！

これにより、サーバーごとの投稿処理などの複雑な実装なしで、ウェブサイトにMisskeyへのシェアボタンを埋め込めるようになります🎉

### プラグイン・テーマストア

Misskey v2023.11.0から、外部サイトを介してプラグイン・テーマをインストールすることが可能になりました。これを利用して、Misskey Hub上でプラグインやテーマを公開できる仕組みを構築予定です！

## まとめ

このように、Misskey Hubは様々な部分で改善・追加を行い、パワーアップします！現在鋭意開発中で、**近いうちに現行のMisskey Hubを置き換えてリニューアルを行う予定です。** それまでの間、Misskey Hub Next は現在のURL（`misskey-hub-next.vercel.app`）でご覧いただけます。ぜひ色々なページをご覧いただき、ご意見やご感想をお寄せください。

それでは、新しいMisskey Hubの登場を楽しみにお待ちください♪