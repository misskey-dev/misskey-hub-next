---
description: This document contains frequently asked questions about using Misskey.
---

# Frequently Asked Questions

This document contains frequently asked questions about using Misskey.<br>
For frequently asked questions about the Misskey project itself, please refer to [this link](../../about-misskey#frequently-asked-questions).

## Are there Android/iOS apps available?

The Misskey project does not develop native apps for such mobile operating systems, but there are several third-party apps available.For more information, please refer to [this link](./apps).<br>

However, since third-party apps may lag behind in supporting the latest Misskey features, we recommend using the official web-based client called Misskey Web unless you have specific preferences.Additionally, Misskey Web supports Progressive Web App (PWA), allowing it to behave like a native app.For more details, see [here](/docs/for-users/stepped-guides/how-to-use-pwa/).

## Can I use Misskey with Mastodon-compatible apps?

As Misskey is not compatible with the Mastodon API, barring some exceptions, using Mastodon clients to log into Misskey is not possible.<br>
Please use the official Misskey Web client instead.

## Is misskey.io the official server of the Misskey project?

No, misskey.io is not the official server of the Misskey Project and is not affiliated with it.misskey.io is the largest server running Misskey, offering a general-purpose platform for easy registration without specific themes.

## Is the any relationship with MisskeyHQ Inc.?

MisskeyHQ is a company to operate misskey.io.Therefore, it does not have a direct relationship with the Misskey development project.
However, syuilo, the project leader of Misskey, also participates as an officer in MisskeyHQ Inc., fostering cooperation to advance Misskey.

## What is the origin of the name "Misskey"?

The name "Misskey" was inspired by the lyrics of May'n's song "Brain Diver," which the main developer syuilo happened to be listening to when considering the name.

## How can I follow users from other Misskey, Pleroma, or Mastodon servers?

Select "Search" from the menu and enter the user's fully-qualified username in the format specified below.A fully-qualified username includes a username and the hostname of the server to which the user belongs.This format is common between ActivityPub platforms such as Misskey, Mastodon, and Pleroma.<br>

The format of a fully-qualified username is as follows:\
`username@hostname.example`Here's a live example:\
`syuilo@misskey.io`

While this format is not universal across all distributed software, it allows you to follow users from other servers or platforms implemented with different decentralized software.

## How do I delete a Renote?

To take back a renote, press the "..." next to the renote timestamp and select "Take back Renote".<br>
For more details about Renote, see [here](../features/note/#renote).

## How can I disable URL previews in a note?

Misskey's Markup language For Misskey (MFM) includes syntax to disable URL previews.For more details, refer to the MFM cheat sheet, which you can access by entering the following address on your server:`https://yourservername/mfm-cheat-sheet`.

## How can I add, edit, or delete custom emojis?

Only server administrators can add, edit, or delete custom emojis.Please contact your server administrator if you wish to do so.

## I want to develop a bot.

Anyone can develop a Misskey bot using the Misskey API.For more information, see [here](../../for-developers/api/).

## Which service does the note translation function use?

We use [DeepL Translation](https://www.deepl.com/), the machine translation service.

## Do I need to register with the Ministry of Internal Affairs and Communications if I create a server? (For servers in Japan)

### Short answer

**Yes**, if you are operating for **business purposes**.Otherwise, **no**.

### Long answer

The definition of "operator," according to [documents from the Ministry of Internal Affairs and Communications](https://www.soumu.go.jp/main_content/000477428.pdf), is "a person who seeks to make a profit by providing services and collecting fees as compensation for the provision of those services."Therefore, unless you are operating the server for the purpose of making a profit as a business, registration is not necessary.Thus, even if there is revenue from sources like donations or advertising, as long as it is used solely for operating costs, it does not fall under the category of operators requiring registration (confirmed with the Ministry of Internal Affairs and Communications).<br>
For more details, please refer to the Ministry of Internal Affairs and Communications' [Entry Manual for Telecommunications Businesses](https://www.soumu.go.jp/main_content/000477428.pdf) or contact the ministry directly.

## DM機能があるため、電気通信事業の届出が必要になるのではありませんか？

[「サーバーを作成しましたが、電気通信事業の届出は必要ですか？」](#サーバーを作成しましたが電気通信事業の届出は必要ですか)で説明している通りです。
運営するサービスがどのような機能を持っていようと、「料⾦を徴収することにより収益を得ようとする」ことに該当しなければ、届出が必要な事業者とはみなされません。

## Can I release services containing the name "Misskey"?

"Misskey" is a registered trademark (in Japan) by the Misskey Project, but you can publish services with the name "Misskey" (e.g., Misskey Tools) without issues.
Additionally, there are no plans to charge fees for such use.
