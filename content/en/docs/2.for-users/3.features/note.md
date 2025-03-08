# Notes

Notes are the main content of Misskey. They can consist of images, texts, polls, and more.On other platforms, notes are known as posts.

:::tip

The name "note" comes from the ActivityPub object type `Note`, which in this context "Represents a short written work typically less than a single paragraph in length."

:::

Once a note is created, it will be added to your [timeline](./timeline) and visible to your [followers](./follow) and other users on your instance.

You can [react](./reaction),reply, or quote notes.

You can find a note later by adding it to your [Favorites](./favorite)

## Composing a Note

To compose a note, click the Note button (denoted by the pencil icon) to open the compose form.Enter your content, then click the Note button (denoted by the paper airplane icon) to submit the note. Notes can contain text, images, videos, and [polls](./poll).You can format your note using [Markup language For Misskey (MFM)](./mfm), [mention](./mention) other users, or include [hashtags](./hashtag). You can also add content warnings (CW) and change the visibility of the note (more on this below).

:::tip

On Misskey Web, you can paste images directly from your clipboard to the text box using the usual copy-and-paste shortcuts.

:::

:::tip

You can also press <kbd class="key">Ctrl + Enter</kbd> within the text box to publish your note.

:::

## Renote

The act of quoting an existing note, sharing an existing note, or the note created as a result of these acts are all called Renote (or "renoting" as verb).
Most of the time, this is used when you want to share a note you like to your own followers, or when you want a share a note that you posted in the past once more.
While it is possible to renote the same note multiple times, please be aware that doing so may be seen as annoying by others.

:::warning

If you've set your note's visibility to Followers-only or Direct, then renoting it will not be possible.

:::

To remove a renote in Misskey Web, press "..." next to the renote time display next to the time display of the renote and select "Unrenote".

## CW

An abbreviation of "Content Warning", resulting in the content of a note being hidden unless explicitly requested to be shown by a viewing user.It is mainly used to hide the content of long notes or to prevent posting spoilers publicly.
To enable Cw for a note, press the "Hide content" button (eye icon) in the post form.By doing so a new text input area will appear, where you can write a summary of the content hidden by the CW.

## Visibility

For each note, you can set the range within which the note will be made public.
To set visibility in Misskey Web, click the icon to the left of the "Note" button on the compose form.
There are the following types of visibility:

### Public

Your note will be visible to all users and will show up on all timelines (home, local, social, global).

:::warning

If your account is [silenced](./silence), you cannot set your note visibility to public.

:::

### Home

Your note will be visible to all users, but will not show up on the local, social or global timeline for non-followers.

### Followers

Your note will only be visible to those that are following you.The note will show up on all timelines of your followers.

### Direct

Your note will only be visible to individually specified users.The note will show up on all timelines of the specified users.

### Local Only

If you enable this option, your note won't be federated to remote instances.

### Visibility comparison

<table>
	<tbody><tr><th></th><th>Public</th><th>Home</th><th>Followers</th><th>Direct</th></tr>
	<tr><th>LTL/STL/GTL of Followers</th><td>✔</td><td>✔</td><td>✔</td><td></td></tr>
	<tr><th>LTL/STL/GTL of Others</th><td>✔</td><td></td><td></td><td></td></tr>
</tbody></table>

## Pin to profile

By pinning a note to your profile it will be constantly displayed on your profile page.
To pin a note, open the note menu and press "Pin to profile".

:::tip

You can pin multiple notes on your profile.

:::

## Notification on User's New Note

Notification can be sent out when a user posts a new note.Go to the user page of the user you wish to receive notifications for, select the Details button next to the Follow button, and then click "Notify me of posts" to activate it.
