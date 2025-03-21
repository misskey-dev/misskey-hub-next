# Reactions

The reaction feature allows you to easily show your reactions to other people's notes using emoji.To react, click the + icon on the note and select an emoji from the picker. You can also react with [custom emojis](./custom-emoji.md).

## Customizing the Emoji Picker

You can select which emojis are displayed in the emoji picker. These options are found under Settings > Emoji picker.

## Reactions to Remote Posts

Reactions are a feature original to Misskey. Platforms that do not support Misskey reactions will receive the reaction as a "like" activity.This might be called a "favourite" on some platforms.

## Reactions from Remote Instances

If a generic "like" activity is received from a remote server, Misskey will interpret it as a "❤" reaction.

## Viewing Your Reactions

On Misskey Web, you can view your past reactions by going to your profile and selecting the Reactions tab.You can change the privacy of your reactions by going to Settings > Privacy.

## リアクションの受け入れ

ノートの投稿時に、そのノートにおいて受け入れるリアクションの種類を制限することができます。

- 全て: 全てのリアクションを許可します
- 全て（リモートはいいねのみ）: 自分のサーバーからのリアクションは全て許可しますが、他のサーバーからのリアクションはすべていいね（❤）として受け入れます
- 非センシティブのみ: 全てのリアクションを許可しますが、自分のサーバーからのリアクションでは「センシティブ」としてフラグ付けされたカスタム絵文字を使ってリアクションできなくなります
- 非センシティブのみ（リモートはいいねのみ）: 自分のサーバーからのリアクションでは「センシティブ」としてフラグ付けされたカスタム絵文字を使ってリアクションできなくなり、他のサーバーからのリアクションはすべていいね（❤）として受け入れます
- いいねのみ: いいね（❤）以外でリアクションできません

なお、この際指定したリアクションの受け入れは自分のサーバーにおいて有効になります。例えば、リアクションの受け入れを「いいねのみ」にしたノートを他のサーバーで閲覧すると、そのサーバー上では絵文字リアクションが付与されているかもしれません。
