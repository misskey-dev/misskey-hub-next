---
description: MFM เป็นภาษามาร์กอัปที่เป็นกรรมสิทธิ์ซึ่งสามารถใช้ได้ในหลายที่ใน Misskey
---

# MFM

MFM ย่อมาจากภาษามาร์กอัปสำหรับ Misskey และเป็นภาษามาร์กอัปที่เป็นกรรมสิทธิ์ซึ่งสามารถนำไปใช้ในที่ต่างๆ ใน ​​Misskeyบางอย่างเข้ากันได้กับ Markdown และ HTML

:::tip

[มุมทดลอง MFM] (/tools/mfm-playground/) ที่คุณสามารถลองใช้ MFM ได้จริง พร้อมให้บริการแล้ว!

:::

## ตัวอย่างการใช้งาน MFM

- โน้ตข้อความ
- หมายเหตุ CW
- ชื่อผู้ใช้
- ข้อความแนะนำตัวของผู้ใช้

## ไวยากรณ์

### กล่าวถึง

คุณสามารถระบุผู้ใช้โดยใช้ At-Symbol และชื่อผู้ใช้ได้นะ
:::tip

หากต้องการข้อมูลเพิ่มเติมเกี่ยวกับการกล่าวถึง โปรดดู [ที่นี่](./mention.md)

:::

```
@ai
```

<MfmPreview text="@ai"></MfmPreview>

```
@repo@p1.a9z.dev
```

<MfmPreview text="@repo@p1.a9z.dev"></MfmPreview>

### แฮชแท็ก

คุณสามารถระบุแฮชแท็กด้วยเครื่องหมายตัวเลข + แท็ก
:::tip

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับแฮชแท็ก โปรดดู[ที่นี่](./hashtag.md)

:::

```
#misskey
```

<MfmPreview text="#misskey"></MfmPreview>

### URL

สามารถแสดง URL ได้นะ

```
https://example.com
```

<MfmPreview text="https://example.com"></MfmPreview>

### ลิงก์

คุณสามารถเชื่อมโยงช่วงข้อความที่ต้องการกับ URL ได้

```
[example link](https://example.com)
```

:::tip

คุณสามารถซ่อนตัวอย่างลิงก์ได้โดยใส่ `?` ไว้หน้าข้อความลิงก์

```
?[example link](https://example.com)
```

:::

<MfmPreview text="[example link](https://example.com)"></MfmPreview>

### อีโมจิที่กำหนดเอง

คุณสามารถแสดงอิโมจิแบบกำหนดเองได้โดยใส่เครื่องหมายโคลอนล้อมรอบชื่ออิโมจิแบบกำหนดเอง

:::tip

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับอีโมจิที่กำหนดเอง โปรดดู[ที่นี่](./custom-emoji.md)

:::

```
:misskey:
```

<MfmPreview text=":misskey:"></MfmPreview>

### ตัวหนา

คุณสามารถแสดงข้อความตัวหนาเพื่อเน้นได้

```
**ตัวหนา**
```

<MfmPreview text="**太字**"></MfmPreview>

### ขนาดเล็ก

คุณสามารถทำให้เนื้อหาถูกแสดงให้เล็กลงและบางลงได้

```
<small>โลกของ Fediverse กำลังขยายออกไปด้วย Misskey</small>
```

<MfmPreview text="<small>โลกของ Fediverse กำลังขยายออกไปด้วย Misskey</small>"></MfmPreview>

### อ้างอิง

内容が引用であることを示すことができます。

```
> MisskeyでFediverseの世界が広がります
```

<MfmPreview text="> MisskeyでFediverseの世界が広がります"></MfmPreview>

### 中央寄せ

内容を中央寄せで表示させることができます。

```
<center>MisskeyでFediverseの世界が広がります</center>
```

<MfmPreview text="<center>MisskeyでFediverseの世界が広がります</center>"></MfmPreview>

### よみがな（ルビ）

内容によみがなを付けることができます。

```
$[ruby Misskey ミスキー] 
```

<MfmPreview text="$[ruby Misskey ミスキー]"></MfmPreview>

### コード(インライン)

プログラムなどのコードをインラインでシンタックスハイライトします。

```
`<: "Hello, world!"`
```

### コード(ブロック)

複数行のプログラムなどのコードをブロックでシンタックスハイライトします。

プログラミング言語をIDで指定すると、その言語でシンタックスハイライトが適用されます。指定できる言語は次のとおりです：

- [Shikiが対応している言語（200以上）](https://shiki.style/languages)
- AiScript: `aiscript`, `ais`, `is` のいずれかを指定すると使用できます。

````
```ais
for (let i, 100) {
	<: if ((i % 15) == 0) "FizzBuzz"
		elif ((i % 3) == 0) "Fizz"
		elif ((i % 5) == 0) "Buzz"
		else i
}
```
````

### 反転

内容を上下または左右に反転させます。

```
$[flip MisskeyでFediverseの世界が広がります]
$[flip.v MisskeyでFediverseの世界が広がります]
$[flip.h,v MisskeyでFediverseの世界が広がります]
```

<MfmPreview text="$[flip MisskeyでFediverseの世界が広がります]
$[flip.v MisskeyでFediverseの世界が広がります]
$[flip.h,v MisskeyでFediverseの世界が広がります]"></MfmPreview>

### フォント

内容のフォントを指定することができます。

```
$[font.serif MisskeyでFediverseの世界が広がります]
$[font.monospace MisskeyでFediverseの世界が広がります]
$[font.cursive MisskeyでFediverseの世界が広がります]
$[font.fantasy MisskeyでFediverseの世界が広がります]
```

<MfmPreview text="$[font.serif MisskeyでFediverseの世界が広がります]
$[font.monospace MisskeyでFediverseの世界が広がります]
$[font.cursive MisskeyでFediverseの世界が広がります]
$[font.fantasy MisskeyでFediverseの世界が広がります]"></MfmPreview>

### ぼかし

内容をぼかすことができます。ポインターを上に乗せるとはっきり見えるようになります。

```
$[blur MisskeyでFediverseの世界が広がります]
```

<MfmPreview text="$[blur MisskeyでFediverseの世界が広がります]"></MfmPreview>

### 検索

検索ボックスを表示できます。

```
misskey 検索
```

<MfmPreview text="misskey 検索"></MfmPreview>

### 文字色・背景色

文字色と背景色を変更することができます。

3,4,6桁のカラーコードで色を表現します。

```
$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]
```

<MfmPreview text="$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]"></MfmPreview>

### 枠線

内容を枠線で囲むことができます。様々なスタイルを指定することができます。

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
$[position.x=1.5 完全に理解した]]

$[border.radius=5,width=2,color=888,noclip $[position.x=1.5 ＣＳＳ]
$[position.x=1.5 完全に理解した]]
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

### 角度変更

指定した角度で回転させます。

```
$[rotate.deg=30 misskey]
```

<MfmPreview text="$[rotate.deg=30 misskey]"></MfmPreview>

### การเปลี่ยนตำแหน่ง

คุณสามารถย้ายตำแหน่งได้

```
😏$[position.x=0.8,y=0.5 🍮]😀
```

<MfmPreview text="😏$[position.x=0.8,y=0.5 🍮]😀"></MfmPreview>

### การขยาย

แสดงข้อความโดยการขยายขนาดออก

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

### แอนิเมชั่น (เยลลี่)

```
$[jelly 🍮] $[jelly.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jelly 🍮] $[jelly.speed=5s 🍮]]"></MfmPreview>

### แอนิเมชั่น (ธาดา)

```
$[tada 🍮] $[tada.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[tada 🍮] $[tada.speed=5s 🍮]]"></MfmPreview>

### อนิเมชั่น (กระโดด)

```
$[jump 🍮] $[jump.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jump 🍮] $[jump.speed=5s 🍮]]"></MfmPreview>

### อนิเมชั่น (เด้ง)

```
$[bounce 🍮] $[bounce.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[bounce 🍮] $[bounce.speed=5s 🍮]]"></MfmPreview>

### แอนิเมชั่น (สปิน)

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

### อนิเมชั่น (เขย่า)

```
$[shake 🍮] $[shake.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[shake 🍮] $[shake.speed=5s 🍮]]"></MfmPreview>

### แอนิเมชั่น (หยิก)

```
$[twitch 🍮] $[twitch.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[twitch 🍮] $[twitch.speed=5s 🍮]]"></MfmPreview>

### รุ้ง

```
$[rainbow 🍮] $[rainbow.speed=5s 🍮]
$[rainbow 色なし文字]
$[rainbow $[fg.color=f0f 色付き文字]]
```

<MfmPreview text="$[rainbow 🍮] $[rainbow.speed=5s 🍮]
$[rainbow 色なし文字]
$[rainbow $[fg.color=f0f 色付き文字]]"></MfmPreview>

### แวววาว

```
$[sparkle 🍮]
```

<MfmPreview text="$[x2 $[sparkle 🍮]]"></MfmPreview>

### ข้อความธรรมดา

ปิดการใช้งานการจัดรูปแบบเนื้อหา

```
<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>
```

<MfmPreview text="<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>"></MfmPreview>

## ข้อมูลสำหรับนักพัฒนาข้อมูลสำหรับนักพัฒนา

การวิเคราะห์และการเรนเดอร์ MFM ได้รับการเผยแพร่เป็นไลบรารี ทำให้สามารถรวม MFM เข้ากับไคลเอนต์ได้ง่าย

- [misskey-dev/mfm.js](https://github.com/misskey-dev/mfm.js) - การนำตัววิเคราะห์ JavaScript ไปใช้งาน
- [mfm-renderer](https://www.npmjs.com/package/mfm-renderer) - Vue.js component
- [mfm.kt](https://github.com/samunohito/mfm.kt) - การนำตัววิเคราะห์ Kotlin ไปใช้
- [mfm_parser](https://pub.dev/packages/mfm_parser) - การใช้งาน Dart parser
- [mfm](https://pub.dev/packages/mfm) - วิดเจ็ตการเรนเดอร์ Flutter
