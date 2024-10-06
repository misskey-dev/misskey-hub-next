# Share Form

On Misskey Web, the path `/share` leads to a social sharing form.This page is useful for external site owners who want users to share their pages on Misskey.

You can specify options such as the content to share as URL query parameters.

## Query Parameters

:::tip

All parameters are **optional** and not required.

:::

| Name    | Description                                                                                                                                                                                           |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title` | Title.Appended to the beginning of the note and enclosed in square brackets in the form "\[ Title contents \]". |
| `text`  | Body text.                                                                                                                                                                            |
| `url`   | URL.Appended to the end of the note.                                                                                                                                  |

### Reply Information

A note can be replied to using the following parameters:

| Name       | Description                                                                                  |
| ---------- | -------------------------------------------------------------------------------------------- |
| `replyId`  | The ID of the note to reply to.                                              |
| `replyUri` | The URL of the note to reply to(for remote note objects). |

### Renote Information

You can specify one of the following to make the post a Renote (quote) of a specific note.

| Name        | Description                                                                                |
| ----------- | ------------------------------------------------------------------------------------------ |
| `renoteId`  | The ID of the note to Renote.                                              |
| `renoteUri` | The URL of the note to Renote(for remote note objects). |

### Visibility Options

You can specify the visibility of the note with the following options.

| Name             | Description                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| `visibility`     | One of `public`, `home`, `followers`, or `specified`.                                 |
| `localOnly`      | 0 (false) or 1 (true).                          |
| `visibleUserIds` | Target user IDs (comma-separated).                                 |
| `visibleAccts`   | Target user [acct](../resources/glossary/#acct) (comma-separated). |

:::warning

If you specify `visibility` as `specified`, you must also specify either `visibleUserIds` or `visibleAccts`.

:::

### Attachments

You can specify attachments with the following option.

| Name      | Description                                                                          |
| --------- | ------------------------------------------------------------------------------------ |
| `fileIds` | The IDs of the files to attach (comma-separated). |

## Misskey Hub Share Form Relay Service

<a name="hub-share-disclaimer" id="hub-share-disclaimer"></a>

To reduce the hassle of setting up the Misskey share button that's compatible with multiple servers, the new Misskey Hub provides a share form relay service.\
This service is free for anyone to use.

You can evolve your share form links to share links to various Misskey servers by simply changing the domain part of the previous share form links to `misskey-hub.net`!

:::tip

See also the [Share Button Generator](/tools/share-link-generator/).

:::

:::warning

The share form relay service (hereinafter referred to as "this service") is a feature provided by the Misskey Project (hereinafter referred to as "we") free of charge and without warranty for the convenience of webmasters.We are not responsible for any damages incurred as a result of using or being unable to use this service for any reason.

:::

### Basic Parameters

Generally, you can use the parameters introduced above, but \*\*parameters that depend on each server, such as user IDs and file IDs, cannot be used.\*\*If specified, they will be removed on Misskey Hub and will not be passed to the destination servers.

### Unique Features available on Misskey Hub Share Relay Service

#### Featured Server

By entering the domain of a Misskey server in the URL parameter `manualInstance`, you can add a separate link to that server as a "Recommended by the Share Source Website."Use this when you want to guide users to your server.

:::warning

The "Recommended Server Feature" is a feature provided for the convenience of webmasters. Therefore, it does not mean that we recommend the servers listed in the "Recommended by the Share Source Website" section.

We are not responsible for any damages or disadvantages that arise from using or registering on the servers transitioned from the "Recommended by the Share Source Website."

:::
