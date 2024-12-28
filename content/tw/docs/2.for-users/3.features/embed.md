# 在網站上嵌入

您可以將 Misskey 伺服器上的貼文或時間軸嵌入到您的網站中。
此外，還可以根據嵌入網站的外觀進行靈活的自定義。

這裡將說明可以嵌入的內容以及嵌入的方法。

:::warning

此功能在 Misskey v2024.9.0 及更高版本中可用。

:::

:::tip

雖然此功能支持 MFM 和自定義表情符號，但根據嵌入頁面的顯示方式，可能會導致佈局崩潰。

:::

## 使用生成器來產生嵌入代碼。

以下介紹的嵌入代碼及客製化，可以通過 Misskey Web 內建的嵌入代碼生成器輕鬆完成。基本上，建議使用該生成器來操作。

![嵌入代碼生成器](/img/docs/for-users/features/embed/generator.png)

## 嵌入單一貼文

::MiWebEmbed{src="https://0key.dev/embed/notes/9tht7ungi81f0005"}
::

您可以將來自嵌入來源伺服器的單一貼文（無法使用其他伺服器來嵌入遠端伺服器的貼文）。代碼如下所示：

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

需要更換以下列出的關鍵字：

- `<HOST>`: Misskey 伺服器的主機名稱
- `<NOTE_ID>`: 要嵌入的貼文的 ID
- `<RANDOM>`: 隨機字串（若使用 embed.js，則必須填入。如果同一頁面上有多個嵌入代碼，請確保它們不會重複。）

## 嵌入使用者貼文清單

::MiWebEmbed{src="https://0key.dev/embed/user-timeline/9tht7g9ki81f0002?maxHeight=500"}
::

可嵌入使用者的公開貼文（公開、首頁） 清單。代碼應如下所示：

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

需要更換以下列出的關鍵字：

- `<HOST>`: Misskey 伺服器的主機名稱
- `<USER_ID>`: 要嵌入的使用者 ID (不是以 `@` 開頭的使用者名稱)
- `<RANDOM>`: 隨機字串（若使用 embed.js，則必須填入。如果同一頁面上有多個嵌入代碼，請確保它們不會重複。）

## 嵌入摘錄的貼文清單

::MiWebEmbed{src="https://0key.dev/embed/clips/9y5mpno6871g00gv?maxHeight=500"}
::

可嵌入設置為公開的摘錄貼文清單。代碼應如下所示：

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

需要更換以下列出的關鍵字：

- `<HOST>`: Misskey 伺服器的主機名稱
- `<CLIP_ID>`: 要嵌入的摘錄 ID
- `<RANDOM>`: 隨機字串（若使用 embed.js，則必須填入。如果同一頁面上有多個嵌入代碼，請確保它們不會重複。）

## 嵌入含有指定主題標籤的貼文清單

::MiWebEmbed{src="https://0key.dev/embed/tags/misskey?maxHeight=500"}
::

可以嵌入具有特定主題標籤的貼文清單。代碼應如下所示：

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

需要更換以下列出的關鍵字：

- `<HOST>`: Misskey 伺服器的主機名稱
- `<TAG>`: 主題標籤名稱（不要包含`#`符號）
- `<RANDOM>`: 隨機字串（若使用 embed.js，則必須填入。如果同一頁面上有多個嵌入代碼，請確保它們不會重複。）

## 客製化用參數

嵌入的外觀可透過指定 URL 參數的特定值來自訂。

<table>
	<tbody><tr>
		<th>參數名稱</th>
		<th>可指定的值</th>
		<th>說明</th>
	</tr>
    <tr>
		<td><code>maxHeight</code></td>
		<td>大於或等於 0 的數值</td>
		<td>
            指定嵌入的最大高度 (px)。如果嵌入內容超過指定高度，則在內部顯示捲軸。<br>
             如果指定為 <code>0</code>，內嵌元素的高度會自動延伸，以符合內部高度<b>（不建議使用）</b>。<br>
            若未設定則使用預設值 <code>700</code> 。<br>
            在嵌入單一貼文的情況無作用。        
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
		<td>強制色彩模式為淺色或深色。<br>未設定則與裝置的黑暗模式同步。</td>
	</tr>
	<tr>
		<td><code>border</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>外框是否應該鑲框。未設定則為 <code>true</code></td>
	</tr>
	<tr>
		<td><code>rounded</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>是否要設定圓角。未設定則為 <code>true</code></td>
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
            是否顯示頂部標題。未設定則為 <code>true</code><br>
            在嵌入單一貼文的情況無作用。    
        </td>
	</tr>
</tbody></table>

:::g-details{summary="maxHeight=0 的使用方式

基本上不建議將 `maxHeight` 設為 `0`，但在某些特殊情況下，例如希望滾動容器由嵌入網站而非 iframe 內提供，這可能會有所幫助。範例如下：

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
