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

## Reaction Acceptance

When posting a note, you can limit the types of reactions that will be accepted for that note.

- All: All reactions are allowed
- All (remote only likes): Allow all reactions from your server, but only accept reactions from other servers as likes (❤)
- Non-sensitive only: All reactions are allowed, but you will not be able to react with reactions from your own server that are flagged as "sensitive"
- Non-sensitive only (remote is like only): You will not be able to react using custom emojis flagged as “sensitive” from your own server, and all reactions from other servers are accepted as likes (❤)
- Likes only: You can only react with a like (❤)

なお、この際指定したリアクションの受け入れは自分のサーバーにおいて有効になります。例えば、リアクションの受け入れを「いいねのみ」にしたノートを他のサーバーで閲覧すると、そのサーバー上では絵文字リアクションが付与されているかもしれません。
