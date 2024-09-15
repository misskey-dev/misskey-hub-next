# Embed to Website

You can embed notes and timelines on the Misskey server into your website.
With Misskey, widgets design is highly customizable so you can fit them to your website.

Here, we describe the content that can be embedded and how to embed it.

:::warning

This feature will be available in Misskey v2024.9.0 (tentative name) or later.All specifications are current and not yet finalized.Information on this page is subject to change.

Avoid using this feature in a production environment until the official release.

:::

:::tip

MFM and custom emojis are also supported, but depending on how they are displayed on the embedded page, the layout may not be as expected.

:::

## Generate embed code using built-in generator

All the embed codes and their customizations shown on this page can be easily done using Misskey Web's built-in embed code generator.
If you have no particular reason to get the code manually, we recommend you to use the generator.

![Embed code generator](/img/docs/for-users/features/embed/generator.png)

## Embedding a single note

::MiWebEmbed{src="https://0key.dev/embed/notes/9tht7ungi81f0005"}
::

A single local note can be embedded (notes on a remote server cannot be embedded using another server).Your code should look like this:

```html
<iframe
    src="https://<HOST>/embed/notes/<NOTE_ID>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

The placeholder is replaced by the following:

- `<HOST>`: Hostname of the Misskey server
- `<NOTE_ID>`: ID of the note to embed
- `<RANDOM>`: Random string (Required if provided embed.js is used.If there are multiple embed codes on the same page, make sure they are not duplicated.)

## Embedding a list of user's note

::MiWebEmbed{src="https://0key.dev/embed/user-timeline/9tht7g9ki81f0002?maxHeight=500"}
::

You can embed a list of users' public notes (public or home visibility).Your code should look like this:

```html
<iframe
    src="https://<HOST>/embed/user-timeline/<USER_ID>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

The placeholder is replaced by the following:

- `<HOST>`: Hostname of the Misskey server
- `<USER_ID>`: ID of the user to embed (not the username starting with `@`)
- `<RANDOM>`: Random string (Required if provided embed.js is used.If there are multiple embed codes on the same page, make sure they are not duplicated.)

## Embedding the list of notes in a clip

::MiWebEmbed{src="https://0key.dev/embed/clips/9y5mpno6871g00gv?maxHeight=500"}
::

You can embed a list of notes of clips where visibility is public.Your code should look like this:

```html
<iframe
    src="https://<HOST>/embed/clips/<CLIP_ID>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

The placeholder is replaced by the following:

- `<HOST>`: Hostname of the Misskey server
- `<CLIP_ID>`: ID of the clip to embed
- `<RANDOM>`: Random string (Required if provided embed.js is used.If there are multiple embed codes on the same page, make sure they are not duplicated.)

## Embedding a list of hashtag notes

::MiWebEmbed{src="https://0key.dev/embed/tags/misskey?maxHeight=500"}
::

You can embed a list of notes with a specific hashtag.Your code should look like this:

```html
<iframe
    src="https://<HOST>/embed/tags/<TAG>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

The placeholder is replaced by the following:

- `<HOST>`: Hostname of the Misskey server
- `<TAG>`: Hashtag name (without `#`)
- `<RANDOM>`: Random string (Required if provided embed.js is used.If there are multiple embed codes on the same page, make sure they are not duplicated.)

## Parameters for customization

You can customize the appearance of the embed widget by specifying a specific value for the URL parameter.

<table>
	<tbody><tr>
		<th>Parameters</th>
		<th>Possible values</th>
		<th>Description</th>
	</tr>
    <tr>
		<td><code>maxHeight</code></td>
		<td>Number above 0</td>
		<td>
            Specifies the max height of the widget in pixels.If the content is longer than that vertically, it can be scrolled inside the widget.<br>
            If <code>0</code> is specified, the height of the embedded element will automatically extend to match the internal height <b>(deprecated)</b>.<br>
            If not specified, it will be fall back to <code>700</code>.<br>
            This parameter won't work for single note embedding.        
</td>
	</tr>
	<tr>
		<td><code>colorMode</code></td>
		<td>
            <ul>
                <li><code>light</code></li>
                <li><code>dark</code></li>
            </ul>
        </td>
		<td>Forces the color mode to light or dark.<br>If unspecified, it will sync with the device dark mode setting.</td>
	</tr>
	<tr>
		<td><code>border</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>Specifies whether or not a border is attached to the outer frame.<code>true</code> if not specified.</td>
	</tr>
	<tr>
		<td><code>rounded</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>Specifies whether or not the corners should be rounded.<code>true</code> if not specified.</td>
	</tr>
	<tr>
		<td><code>showHeader</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>
            Specifies whether the top header should be displayed.<code>true</code> if not specified.<br>
            This parameter won't work for single note embedding.    
        </td>
	</tr>
</tbody></table>

:::g-details{summary="maxHeight=0 is used how?"}

Setting `maxHeight` to `0` is not recommended, but can be useful for special purposes, such as when you want to provide a scroll container on the embedding site rather than inside an iframe.Here's an example:

```html
<div class="misskey-embed">
    <div class="custom-header">
        Misskeyやってます！
    </div>
    <div class="iframe-container">
        <iframe
            src="https://<HOST>/embed/user-timeline/<USER_ID>?maxHeight=0&showHeader=false&border=false&rounded=false"
            data-misskey-embed-id="v1_<RANDOM>"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
        ></iframe>
    </div>
</div>

<style>
    .misskey-embed {
        border: 1px solid #ccc;
        border-radius: 5px;
        overflow: hidden;
    }

    .custom-header {
        background-color: #f0f0f0;
        padding: 10px;
    }

    .iframe-container {
        max-height: 500px;
        overflow-y: auto;
    }
</style>
```

:::
