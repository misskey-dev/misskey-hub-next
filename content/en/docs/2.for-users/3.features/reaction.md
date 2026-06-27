# Reactions

The reaction feature allows you to easily express your reactions to other people's notes using emoji.To react, click the + icon on a note and select an emoji from the picker. You can also use [custom emojis](./custom-emoji.md) for reactions.

## Customizing the Reaction Picker

In Misskey Web, you can customize the emojis displayed in the reaction picker to suit your preferences. These settings can be found under Settings > Emoji palette.

## Reactions to Remote Posts

Reactions are a feature original to Misskey. When a reaction is sent to a remote server that does not run Misskey, it is, in most cases, delivered as a "Like" activity.Generally, Likes on such platforms are implemented as "favourites."

## Reactions from Remote Instances

When a "Like" activity is received from a remote instance, Misskey interprets it as a "❤" reaction.

## Viewing Your Reactions

On Misskey Web, you can view a list of your reactions by opening the Reactions tab on your profile page.You can change the privacy of your reactions by going to Settings > Privacy.

## Reaction Acceptance

When posting a note, you can limit the types of reactions that will be accepted for that note.

- All: Allow all reactions
- All (Only likes for remote instances): Allow all reactions from your server, but accept reactions from other servers only as likes (❤)
- Non-sensitive only: Allow all reactions, but prevent reactions using custom emojis flagged as sensitive from your server
- Non-sensitive only (Only likes from remote): Prevent reactions using custom emojis flagged as sensitive from your server, and accept reactions from other servers only as likes (❤)
- Likes only: Only likes (❤) are allowed

Note that the reaction acceptance settings you specify apply only to your own server.For example, if you view a note set to “Like Only” on another server, that server may still show emoji reactions.
