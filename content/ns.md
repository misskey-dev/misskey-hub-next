# Misskey Extensions to ActivityPub

This page documents the extensions to ActivityPub that Misskey uses. This page lists some context items defined in JSON-LD contexts and explains their semantics.

This document uses [compact IRIs](https://www.w3.org/TR/json-ld/#dfn-compact-iri).
The prefix `ap` is used to refer to `https://www.w3.org/ns/activitystreams#`.
The prefix `misskey` is used to refer to `https://misskey-hub-net/ns#`.

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

Misskey computes that the threshold of the Unix epoch second in the either way:
- If the value is positive, then the value is absolute.
- If the value is negative, then the value is relative millisecond from the Epoch correspoinding to posted date.

If posted date is considered as older than the threshold, then it is considered as a past content. 
If the viewer is not a follower of the author, then past content shall not be shown.

This property is not guaranteed to work on older Misskey or non-Misskey implementation.

## `_misskey_makeNotesHiddenBefore`
(introduced in: https://github.com/misskey-dev/misskey/pull/14814)

- compact IRI: `misskey:_misskey_makeNotesHiddenBefore`
- canonical IRI: `https://misskey-hub.net/ns#_misskey_makeNotesHiddenBefore`

This property is used for `Actor` type object. This property has same semantics and value range as `_misskey_makeNotesFollowersOnlyBefore` but affected viewer: the value affects everyone but author themselves.

This property is not guaranteed to work on older Misskey or non-Misskey implementation.
