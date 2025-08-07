---
description: 'This document contains frequently asked questions about using Misskey.'
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

## I want to inquire about your service.

"Misskey" is the name of software used to operate social media services, as well as the development project of this software."Misskey" itself is not a social media service.The Misskey Project does not operate or manage any social media services itself. Any inquiries about services using Misskey software should be directed to their respective service.Note that colloquially, "Misskey" is often used to refer to social media services using Misskey software.

## How will the support money use?

It will be used for continuous development of Misskey.

具体的な主な使途はフルタイム開発者(=現在@syuilo)への給与(報酬)です。
フルタイムの開発者がいることによりMisskey Projectは成り立っています。
また、フルタイムではない開発者に対して、業務委託した際の報酬の支払いや、不定期的な給付金の支払いにも充てられます。

他には、割合としては低いですが、関係者の接待交際費用、他OSSへの支援費用、ドメイン維持費用、開発に供する各種ソフトウェア・サービスの利用料金、資料(書籍等)購入費用、備品(動作検証用デバイス等)費用、商標など権利の維持費用、税理士報酬、グッズ(Misskeyカード等)に係る費用(製作費、発送費用等)、アセット(ロゴ、アイコン、イラスト、サウンド等)発注費用、バーチャルオフィス利用料等に充てられることもあります。

広告に関しては現在実施していませんので宣伝広告費用は発生していません。

なお、基本的にいただいたご支援金は税制上「売上」扱いになり、受け取り側で課税対象になるほか、受け取り側で送金に使用されたサービスに対する手数料を支払いますので、いただいたご支援金の全額を活用できるわけではない点にご留意ください。

## Do I need to register with the Ministry of Internal Affairs and Communications if I create a server? (For servers in Japan)

### Short answer

**Yes**, if you are operating for **business purposes**.Otherwise, **no**.

### Long answer

The definition of "operator," according to [documents from the Ministry of Internal Affairs and Communications](https://www.soumu.go.jp/main_content/000477428.pdf), is "a person who seeks to make a profit by providing services and collecting fees as compensation for the provision of those services."Therefore, unless you are operating the server for the purpose of making a profit as a business, registration is not necessary.Thus, even if there is revenue from sources like donations or advertising, as long as it is used solely for operating costs, it does not fall under the category of operators requiring registration (confirmed with the Ministry of Internal Affairs and Communications).<br>
For more details, please refer to the Ministry of Internal Affairs and Communications' [Entry Manual for Telecommunications Businesses](https://www.soumu.go.jp/main_content/000477428.pdf) or contact the ministry directly.

## Since Misskey has a DM function, don't I need to register as a telecommunications business to run a server?

As mentioned in ["Do I need to register with the Ministry of Internal Affairs and Communications if I create a server? (For servers in Japan)"](#Do I need to register with the Ministry of Internal Affairs and Communications if I create a server? (For servers in Japan)), any service operating on a non-profit basis does not require registration, regardless of the services offered.

## Can I release services containing the name "Misskey"?

"Misskey" is a registered trademark (in Japan) by the Misskey Project, but you can publish services with the name "Misskey" (e.g., Misskey Tools) without issues.
Additionally, there are no plans to charge fees for such use.
