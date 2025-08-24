# 佈景主題

藉由設定佈景主題，可以更改 Misskey 客戶端的外觀。

## 佈景主題設定

[設定 > 佈景主題](x-mi-web://settings/theme)

## 建立佈景主題

佈景主題程式碼是用 JSON5 寫的物件。
以下是範例。

```js
{
	id: '17587283-dd92-4a2c-a22c-be0637c9e22a',

	name: 'Danboard',
	author: 'syuilo',

	base: 'light',

	props: {
		accent: 'rgb(218, 141, 49)',
		bg: 'rgb(218, 212, 190)',
		fg: 'rgb(115, 108, 92)',
		panel: 'rgb(236, 232, 220)',
		renote: 'rgb(100, 152, 106)',
		link: 'rgb(100, 152, 106)',
		mention: '@accent',
		hashtag: 'rgb(100, 152, 106)',
		header: 'rgba(239, 227, 213, 0.75)',
		navBg: 'rgb(216, 206, 182)',
		inputBorder: 'rgba(0, 0, 0, 0.1)',
	},
}

```

- `id` ... 佈景主題的唯一識別碼。建議使用 UUID。
- `name` ... 佈景主題名稱
- `author` ... 佈景主題作者
- `desc` ... 佈景主題説明（可選）
- `base` ... 採用淺色或深色的佈景主題
    - `light` 設定為淺色佈景主題，`dark` 設定為深色佈景主題。
    - 該佈景主題將繼承此處設定的基本佈景主題。
- `props` ... 定義佈景主題的風格。這裡開始說明。

### 定義佈景主題的風格

在 `props` 下定義佈景主題的風格。
鍵為 CSS 的變數名稱，值指定內容。
請注意，這個 `props` 物件是由基本佈景主題繼承而來的。
如果佈景主題的 `base` 為 `light`，則基本佈景主題為 [\\_light.json5][_light.json5]，若為 `dark` 則為 [\\_dark.json5][_dark.json5]。
換句話說，即使該主題中的 `props` 中沒有名為 `panel` 的鍵，也假定基本佈景主題中存在 `panel`。

- [_light.json5]: https://github.com/misskey-dev/misskey/blob/develop/packages/frontend/src/themes/_light.json5
- [_dark.json5]: https://github.com/misskey-dev/misskey/blob/develop/packages/frontend/src/themes/_dark.json5

#### Value 的格式

- 用十六進位表示的顏色
    - 例: `#00ff00`
- 用 `rgb(r, g, b)` 形式表示的顏色
    - 例: `rgb(0, 255, 0)`
- 用 `rgba(r, g, b, a)` 形式表示的包含透明度的顏色
    - 例: `rgba(0, 255, 0, 0.5)`
- 參照其他的鍵值
    - 如果寫上 `@{keyname}` 的話，會參照其他的鍵值。`{keyname}` 請換成想要參照的鍵的名字。
    - 例: `@panel`
- 參照引述(後述)
    - 如果寫上 `${const}` 的話，會參照其他常數值。`{const}` 請換成想要參照的函數的名字。
    - 例: `$main`
- 函數(後述)
    - `{函數} < {參數} < {顏色}`

#### 常數

當您有「不想作為 CSS 變數輸出，但希望作為其他 CSS 變數值重複使用」的值時，使用常數會很方便。
如果鍵名以 `$` 開頭，該鍵將不會作為 CSS 變數輸出。

#### 函數

想要使用與現有顏色略有不同的顏色的時候，例如「想要只有游標在按鈕上時會讓顏色變亮」時，使用函數非常有用。

以 `:{函數名}<{參數}<{顏色和其他引用的鍵}` 的形式使用。

```js
props: {
	accent: '#86b300',
	accentDarken: ':darken<10<#86b300',
	accentLighten: ':lighten<10<@accent'
}
```

##### 可以使用的函數

- `lighten` ... 回傳傳入的亮度 (0 ~ 100) 加上參數 (0 ~ 100) 的顏色。
- `darken` ... 回傳傳入的亮度 (0 ~ 100) 減去參數 (0 ~ 100) 的顏色。
- `alpha` ... 回傳傳入的顏色並依照參數 (0.0 ~ 1.0) 設定的顏色。
    - 0.0 代表完全透明，1.0 代表完全不透明。
- `hue` ... 回傳傳入的顏色的色相 (-360 ~ 360) 再依照參數 (-360 ～ 360) 進行旋轉的顏色。
- `saturate` ... 回傳傳入的顏色的彩度 (0 ~ 100) 加上參數 (0 ～ 100) 的顏色。

## 轉散發佈景主題

從 v2023.11.0 開始，您可以從您的網站，直接一鍵安裝佈景主題。

如果想提供安裝佈景主題的功能的話，則需要在您的網站上實作 API 。詳情請參考[此處](../../for-developers/publish-on-your-website/)。
