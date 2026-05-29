# Misskey Extensions to ActivityPub

This page documents the extensions to ActivityPub that Misskey uses. This page lists some context items defined in JSON-LD contexts and explains their semantics.

This document uses [compact IRIs](https://www.w3.org/TR/json-ld/#dfn-compact-iri).
The prefix `ap` is used to refer to `https://www.w3.org/ns/activitystreams#`.
The prefix `misskey` is used to refer to `https://misskey-hub.net/ns#`.

## `_misskey_content`

- compact IRI: `misskey:_misskey_content`
- canonical IRI: `https://misskey-hub.net/ns#_misskey_content`

:::warning

This value is deprecated and might be removed in the future.
See also <https://github.com/misskey-dev/misskey/pull/8787>.

:::

This value is identical to having a `source` property like this:

```js
source: {
	content: _misskey_content,
	mediaType: "text/x.misskeymarkdown"
}
```

Where `_misskey_content` represents the value of the field described in this section.

## `_misskey_summary`

- compact IRI: `misskey:_misskey_summary`
- canonical IRI: `https://misskey-hub.net/ns#_misskey_summary`

Used on actors to display their summary as MFM. The content is same as `summary`, but in MFM form.

## `_misskey_quote`

- compact IRI: `misskey:_misskey_quote`
- canonical IRI: `https://misskey-hub.net/ns#_misskey_quote`

:::tip

Ways to potentially provide this information using the core ActivityPub vocabulary are currently underway, see <https://github.com/misskey-dev/misskey/issues/8722>.

:::

Indicates that this note is quoting another note. It contains the `id` of the note being quoted.

This seems to be identical to `https://fedibird.com/ns#quoteUri`.
Misskey also uses `as:quoteUrl` for this but this was not adopted to the ActivityPub specification.
This is for compatibility with some other ActivityPub programs that operate using this.

## `_misskey_reaction`

- compact IRI: `misskey:_misskey_reaction`
- canonical IRI: `https://misskey-hub.net/ns#_misskey_reaction`

Misskey federates its reactions as `Like` activities.
What kind of reaction was used is conveyed using this field.
Misskey also sets `ap:content` of the `Like` activity to the same value.

The content will be a string that either contains a single Unicode Emoji or a string that starts and ends with a colon. In the latter case the reaction uses a custom emoji, and the `tag` property will be set to contain the data of the respective emoji.

## `_misskey_votes`

- compact IRI: `misskey:_misskey_votes`
- canonical IRI: `https://misskey-hub.net/ns#_misskey_votes`

This value is used for `Question` activities to indicate the number of votes an option currently has.
This value is identical to having a `replies` property like this:

```js
replies: {
	type: 'Collection',
	totalItems: _misskey_votes
}
```

Where `_misskey_votes` represents the value of the field described in this section.

## `_misskey_talk`

- compact IRI: `misskey:_misskey_talk`
- canonical IRI: `https://misskey-hub.net/ns#_misskey_talk`

This value is used for `Note` type objects to indicate that they are a Misskey chat message.
Misskey handles these kinds of messages specially, e.g. it will apply different audience scoping rules and show them via a different API than usual `Note` objects.

This field can only take the value of `true` (or be absent).

## `isCat`

- compact IRI: `misskey:isCat`
- canonical IRI: `https://misskey-hub.net/ns#isCat`

Used on actors to indicate that they in some way identify as a cat, expressed as a boolean value.
If this property is set to `true`, displaying the actor or their notes will have some special effects attached in some clients.

## `_misskey_followedMessage`
- compact IRI: `misskey:_misskey_followedMessage`
- canonical IRI: `https://misskey-hub.net/ns#_misskey_followedMessage`

This value is used for `Actor` type objects to show message on followed.

This property must be either `null` or a string if existent.
The value is customized message. In other word, it can be set arbitrary by an account.

Misskey shows the value on notification to new followee when:
- The property is set,
- value is a string,
- the followee's Misskey is 2024.9.0-alpha.11 or later,
- and one who has set this property gets followed by the followee

## `_misskey_requireSigninToViewContents`
(introduced in: https://github.com/misskey-dev/misskey/pull/14799)

- compact IRI: `misskey:_misskey_requireSigninToViewContents`
- canonical IRI: `https://misskey-hub.net/ns#_misskey_requireSigninToViewContents`

This property is used for `Actor` type object to forbid show one's content when viewer is not signed-in.
This value must be either `true` or `false` if existent.

An implementation should refuse to show their content to align to Misskey's implementation if the value is `true` and the viewer is not signed-in.

This property is not guaranteed to work on older Misskey or non-Misskey implementation.

## `_misskey_makeNotesFollowersOnlyBefore`
(introduced in: https://github.com/misskey-dev/misskey/pull/14814)

- compact IRI: `misskey:_misskey_makeNotesFollowersOnlyBefore`
- canonical IRI: `https://misskey-hub.net/ns#_misskey_makeNotesFollowersOnlyBefore`

This property is used for `Actor` type object to forbid show one's *past* content when viewer is not a follower of author.
This value must be a integer if existent.

Misskey computes that the threshold of the Unix epoch millisecond in the either way:
- If the value is positive, then the value is interpreted as an absolute Unix epoch millisecond.
- If the value is negative, then the value is relative millisecond compared to posted date. For example, `-86400000` implies targeting a note that has posted before yesterday because a day contains 86400 seconds.

If posted date is considered as older than the threshold, then it is considered as a past content. 
If the viewer is not a follower of the author, then past content shall not be shown.

This property is not guaranteed to work on older Misskey or non-Misskey implementation.

## `_misskey_makeNotesHiddenBefore`
(introduced in: https://github.com/misskey-dev/misskey/pull/14814)

- compact IRI: `misskey:_misskey_makeNotesHiddenBefore`
- canonical IRI: `https://misskey-hub.net/ns#_misskey_makeNotesHiddenBefore`

This property is used for `Actor` type object. This property has same semantics and value range as `_misskey_makeNotesFollowersOnlyBefore` but affected viewer: the value affects everyone but author themselves.

This property is not guaranteed to work on older Misskey or non-Misskey implementation.

## `_misskey_license`

- compact IRI: `misskey:_misskey_license`
- canonical IRI: `https://misskey-hub.net/ns#_misskey_license`

This property is used to express licenses about each `Emoji` objects.
This property may not exist due to following reasons:

- The source server do not follow this extension, or
- The source server uses old Misskey version

This property has the following known properties:

- `freeText`: The value is either string or null. This field MUST present. Implies Sender did not set explicit license if the value is null.
  This SHOULD NOT be empty string because it is nonsense; Proper way to declare that the Emoji object has not set explicit license is setting null on this property.
  Describes how usage is permitted from its author in non-machine-friendly free-form text.
  The language, format, wording, or containing information in the value is not specified; Receivers SHOULD NOT assume it's written in some specific manner.

Source servers SHOULD NOT set properties in other way that differs in above description except in the case of keeping backwards compatibility.

Source servers SHOULD NOT set unknown properties except in the case of keeping backwards compatibility, because more property may be added in the future.

Recipient servers SHOULD ignore unknown properties.

## `_misskey_reactionAcceptance`

- compact IRI: `misskey:_misskey_reactionAcceptance`
- canonical IRI: `https://misskey-hub.net/ns#_misskey_reactionAcceptance`

This property is used on `Note` objects to express which Emojis can be used as an "Reaction".
This property may not exist due to following reasons:

- The Source server do not follow this extension,
- The Source server used old Misskey version, or
- The Source server do not have "acceptance" controls on users' note.

If this propert is absent, then the Source server MUST treat it as if the value is `null`.
This property can be either `null` or string.
Valid values are following:
- `null`: any Emoji can be used as a reaction.
- `"nonSensitiveOnly"`: Only non-"sensitive" emoji can be used as a reaction.
- `"likeOnly"`: Only emoji-less `Like` can be performed as a reaction (non-normative: `\u2764` is used to express likes in vanilla-Misskey.)

(Note: if the Source server declared original reaction acceptance setting is either `"likeOnlyForRemote"` or `"nonSensitiveOnlyForLocalLikeOnlyForRemote"`, then it MUST be rendered as `"likeOnly"` because there's no reason to distinguish them.)

Source server SHOULD NOT set unknown value except in the case of keeping backwards compatibility, because more value may be added in the future.

When Recipient server received this property, Recipient server MUST persistent this value to determine which Emoji can be used. If the value is `"nonSensitiveOnly"`, then Recipient server MUST NOT allow "sensitive" emojis to be used as a reaction. It depends on the Recipient server that which emoji is flagged as "sensitive".
When Source server received a `Like` activity to a certain Note with an emoji, the Source server MUST perform certain validation to if it's acceptable according to the acceptance setting on that Note. If validation was failed, the `Like` activity is treated as if the emoji isn't set.
(non-normative Note: the `Like` activility without emoji is always acceptable.)

This property is not guaranteed to work on older Misskey or non-Misskey implementation.
