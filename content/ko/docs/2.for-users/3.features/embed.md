# 웹사이트 임베딩

Misskey 서버에 있는 노트나 타임라인을 가지고 있는 웹사이트에 임베드할 수 있습니다.
또한, 임베디드 웹사이트의 외형에 맞게 유연하게 커스터마이징할 수 있습니다.

여기서는 임베드할 수 있는 콘텐츠와 임베드 방법에 대해 설명합니다.

:::warning

이 기능은 Misskey v2024.9.0 이상에서 사용할 수 있는 기능입니다.

:::

:::tip

MFM, 커스텀 이모티콘 등도 지원하지만, 임베디드 페이지의 표시 방식에 따라 레이아웃이 깨질 수 있습니다.

:::

## 생성기를 사용하여 임베디드 코드 생성하기

아래에서 소개하는 임베디드 코드와 그 커스터마이징은 모두 Misskey Web에 내장된 임베디드 코드 생성기를 사용하여 쉽게 할 수 있습니다.
기본적으로 그쪽을 이용하는 것을 추천합니다.

! [임베디드 코드 생성기](/img/docs/for-users/features/embed/generator.png)

## 단일 노트 삽입

::MiWebEmbed{src="https://0key.dev/embed/notes/9tht7ungi81f0005"}
::

임베드 원본 서버에서 단일 노트를 임베드할 수 있습니다(원격 서버의 노트를 다른 서버에 임베드할 수 없습니다).코드는 다음과 같습니다:

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

각각 다음과 같이 대체됩니다:

- `<HOST>`: Misskey 서버의 호스트 이름
- `<NOTE_ID>`: 임베드할 노트의 ID
- `<RANDOM>`: 임의의 문자열(embed.js를 사용할 경우 필수.같은 페이지에 여러 개의 임베디드 코드가 있는 경우 피하시기 바랍니다.)

## 사용자 노트 목록 삽입

::MiWebEmbed{src="https://0key.dev/embed/user-timeline/9tht7g9ki81f0002?maxHeight=500"}
::

사용자의 공개 노트(퍼블릭 홈) 목록을 삽입할 수 있습니다.코드는 다음과 같습니다:

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

각각 다음과 같이 대체됩니다:

- `<HOST>`: Misskey 서버의 호스트 이름
- `<USER_ID>`: 임베드할 사용자 ID (`@`로 시작하는 사용자 이름이 아님)
- `<RANDOM>`: 임의의 문자열(embed.js를 사용할 경우 필수.같은 페이지에 여러 개의 임베디드 코드가 있는 경우 피하시기 바랍니다.)

## 클립 노트 목록 삽입

::MiWebEmbed{src="https://0key.dev/embed/clips/9y5mpno6871g00gv?maxHeight=500"}
::

공개 범위가 공개로 되어있는 클립의 노트 목록을 삽입할 수 있습니다.코드는 다음과 같습니다:

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

각각 다음과 같이 대체됩니다:

- `<HOST>`: Misskey 서버의 호스트 이름
- `<CLIP_ID>`: 임베딩할 클립의 ID
- `<RANDOM>`: 임의의 문자열(embed.js를 사용할 경우 필수.같은 페이지에 여러 개의 임베디드 코드가 있는 경우 피하시기 바랍니다.)

## 해시태그 노트 목록 삽입

::MiWebEmbed{src="https://0key.dev/embed/tags/misskey?maxHeight=500"}
::

특정 해시태그가 포함된 노트 목록을 삽입할 수 있습니다.코드는 다음과 같습니다:

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

각각 다음과 같이 대체됩니다:

- `<HOST>`: Misskey 서버의 호스트 이름
- `<TAG>`: 해시태그 이름 (`#`를 포함하지 않음)
- `<RANDOM>`: 임의의 문자열(embed.js를 사용할 경우 필수.같은 페이지에 여러 개의 임베디드 코드가 있는 경우 피하시기 바랍니다.)

## 커스터마이징을 위한 매개변수

URL 매개변수에 특정 값을 지정하여 임베딩의 모양을 사용자 정의할 수 있습니다.

<table>
	<tbody><tr>
		<th>매개변수 이름</th>
		<th>지정 가능한 값</th>
		<th>설명</th>
	</tr>
    <tr>
		<td><code>maxHeight</code></td>
		<td>0 이상의 숫자</td>
		<td>
            임베딩의 최대 높이(px)를 지정합니다.그 이상 세로로 늘어날 경우 내부에서 스크롤을 할 수 있게 됩니다.<br>
            <code>0</code>을 지정하면 임베디드 요소의 높이가 내부 높이에 맞게 자동으로 늘어납니다<b>(비추천)</b>.<br>
            지정하지 않은 경우 <code>700</code>입니다.<br>
            단일 노트 임베딩은 작동하지 않습니다.        
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
		<td>컬러 모드를 밝게 또는 어둡게 강제 설정합니다.<br> 지정하지 않고 기기의 다크 모드와 동기화합니다.</td>
	</tr>
	<tr>
		<td><code>border</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>외부 프레임에 테두리를 붙일 것인지 여부.지정하지 않을시 <code>true</code></td>
	</tr>
	<tr>
		<td><code>rounded</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>사각을 둥글게 만들지 여부.지정하지 않을시 <code>true</code></td>
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
            상단 헤더를 표시할지 여부.지정하지 않을시 <code>true</code><br>
            단일 노트 임베딩은 작동하지 않습니다.    
        </td>
	</tr>
</tbody></table>

:::g-details{summary="maxHeight=0 사용법"}

`maxHeight`를 `0`으로 설정하는 것은 기본적으로 권장하지 않지만, 스크롤 컨테이너를 iframe 내부가 아닌 임베디드 사이트 측에서 준비해야 하는 경우 등 특수한 용도로 유용하게 사용할 수 있습니다.다음은 그 예입니다:

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
