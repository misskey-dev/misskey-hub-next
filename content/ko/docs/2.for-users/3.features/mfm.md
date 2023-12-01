---
description: MFM은 미스키에서 사용할 수 있는 전용 마크업 언어입니다.
---

# MFM

MFM은 Markup langauge For Misskey의 약자로 Misskey의 여러 곳에서 사용할 수 있는 전용 마크업 언어입니다.

:::tip
일부 구문은 Markdown이나 HTML과 호환성이 있습니다.
:::

## MFM을 사용할 수 있는 곳 (예시)

- 노트 본문
- CW 주석
- 유저 이름
- 유저 자기소개

## 구문

### メンション

골뱅이표(@) + 유저명으로 특정 유저를 표현할 수 있습니다.

```
@ai
```

<MfmPreview text="@ai"></MfmPreview>

```
@repo@p1.a9z.dev
```

<MfmPreview text="@repo@p1.a9z.dev"></MfmPreview>

### ハッシュタグ

넘버 사인 + 태그로 해시태그를 표현할 수 있습니다.

```
#misskey
```

<MfmPreview text="#misskey"></MfmPreview>

### URL

URL을 표현할 수 있습니다.

```
https://example.com
```

<MfmPreview text="https://example.com"></MfmPreview>

### 링크

문장 중 특정한 범위를 URL로 표시할 수 있습니다.

```
[example link](https://example.com)
```

:::tip
リンクテキストの前に`?`をつけると、リンクプレビューを非表示にすることができます。

```
?[example link](https://example.com)
```

:::

<MfmPreview text="[example link](https://example.com)"></MfmPreview>

### カスタム絵文字

:::tip
커스텀 이모지에 대한 자세한 내용은 [여기](./custom-emoji.md)를 참조하세요.

```
:misskey:
```

<MfmPreview text=":misskey:"></MfmPreview>

### 굵은 문자

문자를 굵게 표시하여 강조할 수 있습니다.

```
**굵은 문자**
```

<MfmPreview text="**太字**"></MfmPreview>

### 눈에 띄지 않게 하기

내용을 흐리게 표시할 수 있습니다.커서를 위에 올려서 제대로 보이게 할 수도 있습니다.

```
<small>Misskey로 연합 우주의 세계가 펼쳐집니다.</small>
```

<MfmPreview text="<small>Misskey로 연합 우주의 세계가 펼쳐집니다.</small>"></MfmPreview>

### 인용

내용을 인용하여 표시 할 수 있습니다.

```
> Misskey로 연합 우주의 세계가 펼쳐집니다.
```

<MfmPreview text="> Misskey로 연합 우주의 세계가 펼쳐집니다."></MfmPreview>

### 가운데 정렬

내용을 가운데 정렬로 보이게 합니다.

```
<center>Misskey로 연합 우주의 세계가 펼쳐집니다.</center>
```

<MfmPreview text="<center>Misskey로 연합 우주의 세계가 펼쳐집니다.</center>"></MfmPreview>

### 코드 (인라인)

プログラムなどのコードをインラインでシンタックスハイライトします。

```
`<: "Hello, world!"`
```

### 코드 (블록)

여러 행의 프로그래밍 코드 등을 코드 블록으로 구문 강조를 할 수 있습니다.

```
~ (#i, 100) {
	<: ? ((i % 15) = 0) "FizzBuzz"
		.? ((i % 3) = 0) "Fizz"
		.? ((i % 5) = 0) "Buzz"
		. i
}
```

### 반전

내용을 상하 또는 좌우로 반전 시킵니다.

```
$[flip Misskey로 연합 우주의 세계가 펼쳐집니다.]
$[flip.v Misskey로 연합 우주의 세계가 펼쳐집니다.]
$[flip.h,v Misskey로 연합 우주의 세계가 펼쳐집니다.]
```

<MfmPreview text="$[flip MisskeyでFediverseの世界が広がります]
$[flip.v MisskeyでFediverseの世界が広がります]
$[flip.h,v MisskeyでFediverseの世界が広がります]"></MfmPreview>

### 폰트

내용에 폰트를 지정할 수 있습니다.

```
$[font.serif Misskey로 연합 우주의 세계가 펼쳐집니다.]
$[font.monospace Misskey로 연합 우주의 세계가 펼쳐집니다.]
$[font.cursive Misskey로 연합 우주의 세계가 펼쳐집니다.]
$[font.fantasy Misskey로 연합 우주의 세계가 펼쳐집니다.]
```

<MfmPreview text="$[font.serif MisskeyでFediverseの世界が広がります]
$[font.monospace MisskeyでFediverseの世界が広がります]
$[font.cursive MisskeyでFediverseの世界が広がります]
$[font.fantasy MisskeyでFediverseの世界が広がります]"></MfmPreview>

### ぼかし

내용을 작게, 연하게 할 수 있습니다.ポインターを上に乗せるとはっきり見えるようになります。

```
$[blur Misskey로 연합 우주의 세계가 펼쳐집니다.]
```

<MfmPreview text="$[blur MisskeyでFediverseの世界が広がります]"></MfmPreview>

### 검색

검색창을 표시할 수 있습니다.

```
misskey 검색
```

<MfmPreview text="misskey 検索"></MfmPreview>

### 문자색, 배경색

문자색과 배경색을 바꿀 수 있습니다.

3, 4, 6번째 행의 컬러 코드를 색으로 표현합니다.

```
$[fg.color=f00 빨간 글자]
$[bg.color=ff0 노란색 배경]
```

<MfmPreview text="$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]"></MfmPreview>

### 각도 변경

지정한 각도로 회전시킵니다.

```
$[rotate.deg=30 misskey]
```

<MfmPreview text="$[rotate.deg=30 misskey]"></MfmPreview>

### 위치 변경

위치를 바꿀 수 있습니다.

```
😏$[position.x=0.8,y=0.5 🍮]😀
```

<MfmPreview text="😏$[position.x=0.8,y=0.5 🍮]😀"></MfmPreview>

### 확대

문자 크기를 조절할 수 있습니다.

```
$[scale.x=4,y=2 🍮]
```

<MfmPreview text="$[scale.x=4,y=2 🍮]"></MfmPreview>

```
$[x2 x2]
$[x3 x3]
$[x4 x4]
```

<MfmPreview text="$[x2 x2]
$[x3 x3]
$[x4 x4]"></MfmPreview>

### 애니메이션 (짠!)

```
$[jelly 🍮] $[jelly.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jelly 🍮] $[jelly.speed=5s 🍮]]"></MfmPreview>

### 애니메이션 (경련)

```
$[tada 🍮] $[tada.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[tada 🍮] $[tada.speed=5s 🍮]]"></MfmPreview>

### 애니메이션 (점프)

```
$[jump 🍮] $[jump.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jump 🍮] $[jump.speed=5s 🍮]]"></MfmPreview>

### 애니메이션 (바운스)

```
$[bounce 🍮] $[bounce.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[bounce 🍮] $[bounce.speed=5s 🍮]]"></MfmPreview>

### 애니메이션 (회전)

```
$[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]
$[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]
$[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]

$[spin.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]
$[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]
$[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]
$[spin.speed=5s 🍮]]"></MfmPreview>

### 애니메이션 (젤리)

```
$[shake 🍮] $[shake.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[shake 🍮] $[shake.speed=5s 🍮]]"></MfmPreview>

### 애니메이션 (부들부들)

```
$[twitch 🍮] $[twitch.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[twitch 🍮] $[twitch.speed=5s 🍮]]"></MfmPreview>

### 무지개 효과

```
$[rainbow 🍮] $[rainbow.speed=5s 🍮]
$[rainbow 색깔 없는 문자]
$[rainbow $[fg.color=f0f 색깔 있는 문자]]
```

<MfmPreview text="$[rainbow 🍮] $[rainbow.speed=5s 🍮]
$[rainbow 色なし文字]
$[rainbow $[fg.color=f0f 色付き文字]]"></MfmPreview>

### キラキラ

```
$[sparkle 🍮]
```

<MfmPreview text="$[x2 $[sparkle 🍮]]"></MfmPreview>

### プレーン

内側の構文を全て無効にします。

```
<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>
```

<MfmPreview text="<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>"></MfmPreview>

## 개발자용 정보

MFM 기능은 라이브러리를 통해 공개하고 있으니, 간단하게 클라이언트에 MFM 기능을 추가하실 수 있습니다.

- [misskey-dev/mfm.js](https://github.com/misskey-dev/mfm.js) - JavaScript 기반 MFM 기능 구현
