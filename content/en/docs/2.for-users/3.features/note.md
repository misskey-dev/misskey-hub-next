# Notes

Notes are the main content of Misskey. They can consist of images, texts, polls, and more.On other platforms, notes are known as posts.

:::tip

The name "note" comes from the ActivityPub object type `Note`, which in this context "Represents a short written work typically less than a single paragraph in length."

:::

Once a note is created, it will be added to your [timeline](./timeline) and visible to your [followers](./follow) and other users on your instance.

You can [react](./reaction) to, reply to, or quote notes.

You can easily view a note again later by adding it to your [Favorites](./favorite).

## Composing a Note

To compose a note, click the Note button (denoted by the pencil icon) to open the compose form.Enter your content, then click the Note button (denoted by the paper airplane icon) to submit the note. Notes can contain text, images, videos, and [polls](./poll).You can format your note using [Markup language for Misskey (MFM)](./mfm), [mention](./mention) other users, or include [hashtags](./hashtag). You can also add content warnings (CW) and change the visibility of the note (more on this below).

:::tip

On Misskey Web, you can paste images directly from your clipboard to the text box using the usual copy-and-paste shortcuts.

:::

:::tip

You can also press <kbd class="key">Ctrl + Enter</kbd> within the text box to publish your note.

:::

## Renote

Quoting an existing note, or sharing it as a new note, as well as the note created by these actions, is called a Renote.
This is typically used when you want to share a note you like with your own followers, or when you want to share one of your past notes again.
While it is possible to renote the same note multiple times, using it too frequently may be considered annoying, so please use it with care.

:::warning

Notes with visibility set to Followers-only or Direct cannot be renoted.

:::

To remove a renote in Misskey Web, open the "..." menu next to the renote's timestamp and select "Unrenote".

## CW

An abbreviation of "Content Warning", which allows the content of a note to be hidden until the viewer chooses to reveal it.It is mainly used to hide long content or to prevent spoilers from being shown unintentionally.
To enable CW for a note, select the "Hide content" button (eye icon) in the post form.A new input field will appear, where you can enter a summary of the hidden content.

## Visibility

You can set the visibility of each note individually.
To set visibility in Misskey Web, select the icon to the left of the "Note" button on the compose form.
There are the following types of visibility:

### Public

Your note will be visible to everyone and will appear on all timelines available on the instance (home, local, social, global).

:::warning

If your account is [silenced](./silence), this visibility option cannot be used.

:::

### Home

Your note will be visible to everyone, but will only appear on the Home timeline of your followers. It will not appear on the local, social, or global timelines of non-followers.

### Followers

Your note will only be visible to your followers, and will appear on all timelines available to them.

### Direct

Your note will only be visible to the specified users, and will appear on all timelines available to them.

:::tip

In Japanese, this option was called “ダイレクト” until v2025.7.0.

:::

### Local Only

When this option is enabled, your note will not be federated to remote instances.

### Visibility comparison

<table>
	<tbody><tr><th></th><th>Public</th><th>Home</th><th>Followers</th><th>Direct</th></tr>
	<tr><th>LTL/STL/GTL of Followers</th><td>✔</td><td>✔</td><td>✔</td><td></td></tr>
	<tr><th>LTL/STL/GTL of Others</th><td>✔</td><td></td><td></td><td></td></tr>
</tbody></table>

## Pin to profile

By pinning a note to your profile, it will always be displayed on your profile page.
To pin a note, open the note menu and press "Pin to profile".

:::tip

You can have multiple notes pinned to your profile.

:::

## New Post Notifications

You can receive notifications when a user posts a new note.Go to the user's page, select the Details button next to the Follow button,
and then click "Notify about new notes" to enable it.
