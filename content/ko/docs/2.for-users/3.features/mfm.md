---
description: MFM은 미스키에서 사용할 수 있는 전용 마크업 언어입니다.
---

# MFM

MFM은 Markup langauge For Misskey의 약자로, Misskey의 여러 곳에서 사용할 수 있는 전용 마크업 언어입니다.일부 구문은 Markdown 및 HTML과 호환됩니다.

:::tip

MFM 문법을 실제로 사용해 볼 수 있는 [MFM 체험 코너](/tools/mfm-playground/)가 생겼습니다

:::

## 구문

- 노트 본문
- CW 주석
- 사용자 이름
- 사용자 소개

## 구문

### 멘션

@ + 사용자 이름으로 특정 사용자를 나타낼 수 있습니다.

멘션에 대한 자세한 내용은 [여기](./mention.md)에서 확인할 수 있습니다.

:::

```
@ai
```

<MfmPreview text="@ai"></MfmPreview>

```
@repo@p1.a9z.dev
```

<MfmPreview text="@repo@p1.a9z.dev"></MfmPreview>

### 해시태그

숫자 기호 + 태그를 통해 해시태그를 표시할 수 있습니다.

해시태그에 대한 자세한 내용은 [여기](./hashtag.md)에서 확인할 수 있습니다.

:::

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

링크 텍스트 앞에 \`? '를 붙이면 링크 미리보기를 숨길 수 있습니다.

```
?[example link](https://example.com)
```

:::

<MfmPreview text="[example link](https://example.com)"></MfmPreview>

### 커스텀 이모지

콜론(:)으로 사용자 지정 이모티콘 이름을 묶으면 사용자 지정 이모티콘을 표시할 수 있습니다.

:::tip

커스텀 이모티콘에 대한 자세한 내용은 [여기](./custom-emoji.md)에서 확인할 수 있습니다.

:::

```
:misskey:
```

<MfmPreview text=":misskey:"></MfmPreview>

### 구문

문자를 굵게 표시하여 강조할 수 있습니다.

```
**굵은 문자**
```

<MfmPreview text="**太字**"></MfmPreview>

### 눈에 띄지 않게 하기

내용을 작게, 연하게 할 수 있습니다.

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

### 요미가나 (루비)

내용에 요미가나를 첨부할 수 있습니다.

```
$[ruby Misskey 미스키] 
```

<MfmPreview text="$[ruby Misskey ミスキー]"></MfmPreview>

### 코드 (인라인)

프로그래밍 코드 등에 대해 인라인 구문 강조를 할 수 있습니다.

```
`<: "Hello, world!"`
```

### 코드 (블록)

여러 행의 프로그래밍 코드 등을 코드 블록으로 구문 강조를 할 수 있습니다.

프로그래밍 언어를 ID로 지정하면 해당 언어로 구문 하이라이트를 적용합니다.지정할 수 있는 언어는 다음과 같습니다:

- [Shiki가 지원하는 언어(200개 이상)](https://shiki.style/languages)
- AiScript: `aiscript`, `ais`, `is` 중 하나를 지정하여 사용할 수 있습니다.

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

### 흐림 효과

내용을 흐리게 표시할 수 있습니다.커서를 위에 올려서 제대로 보이게 할 수도 있습니다.

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

### 테두리

내용에 테두리를 씌울 수 있습니다.스타일을 다양하게 지정하는 것도 가능합니다.

```
$[border.style=solid,width=4 Default]

$[border.style=hidden No border]

$[border.style=dotted,width=2 Dotted]
$[border.style=dashed,width=2 Dashed]
$[border.style=double,width=4 Double]

$[border.style=groove,width=4 Embossed A]
$[border.style=ridge,width=4 Embossed B]

$[border.style=inset,width=4 Inset A]
$[border.style=outset,width=4 Inset B]

$[border.color=d00 Border color]
$[border.width=5 Border width]

$[border.radius=6,width=2 Border radius]

$[border.radius=5,width=2,color=888 $[position.x=1.5 ＣＳＳ]
$[position.x=1.5 완전히 이해했어!]]

$[border.radius=5,width=2,color=888,noclip $[position.x=1.5 ＣＳＳ]
$[position.x=1.5 완전히 이해했어!]]
```

<MfmPreview text="$[border.style=solid,width=4 Default]\
$[border.style=hidden No border]\
$[border.style=dotted,width=2 Dotted]\
$[border.style=dashed,width=2 Dashed]\
$[border.style=double,width=4 Double]\
$[border.style=groove,width=4 Embossed A]\
$[border.style=ridge,width=4 Embossed B]\
$[border.style=inset,width=4 Inset A]\
$[border.style=outset,width=4 Inset B]\
$[border.color=d00 Border color]\
$[border.width=5 Border width]\
$[border.radius=6,width=2 Border radius]\
$[border.radius=5,width=2,color=888 $[position.x=1.5 ＣＳＳ]
$[position.x=1.5 完全に理解した]]\
$[border.radius=5,width=2,color=888,noclip $[position.x=1.5 ＣＳＳ]
$[position.x=1.5 完全に理解した]]"></MfmPreview>

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

굵은 문자

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

### 반짝반짝

```
$[sparkle 🍮]
```

<MfmPreview text="$[x2 $[sparkle 🍮]]"></MfmPreview>

### 평문

안에 있는 MFM 구문을 모두 무시하고 평문으로 표시합니다.

```
<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>
```

<MfmPreview text="<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>"></MfmPreview>

## 개발자용 정보

MFM 기능은 라이브러리를 통해 공개하고 있으니, 간단하게 클라이언트에 MFM 기능을 추가하실 수 있습니다.

- [misskey-dev/mfm.js](https://github.com/misskey-dev/mfm.js) - JavaScript 기반 MFM 기능 구현
- [mfm-renderer](https://www.npmjs.com/package/mfm-renderer) - Vue.js용 컴포넌트
- [mfm.kt](https://github.com/samunohito/mfm.kt) - Kotlin에의 파서 구현
- [mfm_parser](https://pub.dev/packages/mfm_parser) - Dart에의 파서 구현
- [mfm](https://pub.dev/packages/mfm) - Flutter용 드로잉 위젯
