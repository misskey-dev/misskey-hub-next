# 主题

通过主题设置，自定义 Misskey 客户端界面风格。

## 主题设置

[设置 > 主题](x-mi-web://settings/theme)

## 编写主题

主题代码为JSON5格式的主题对象，其结构如下所示。

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

- `id` ... 主题的唯一ID。推荐使用UUID。
- `name` ... 主题名称
- `author` ... 主题作者
- `desc` ... 主题描述(可选)
- `base` ... 采用浅色主题或深色主题
  - 设置为`light`表示浅色主题，设置为`dark`表示深色主题。
  - 主题将继承此处设置的基础主题。
- `props` ... 主题样式定义。下面将说明。

### 主题样式定义

在`props`中定义主题的样式。
键名将作为 CSS 变量名，值用于指定其内容。\
请注意，该`props`对象继承自基础主题。
基础主题由此主题的`base`决定：当`base`为`light`时使用[\_light.json5][_light.json5]，为`dark`时使用[\_dark.json5][_dark.json5]。\
也就是说，即使此主题的`props`中没有名为`panel`的键，也会被视为存在来自基础主题的`panel`。

[_light.json5]: https://github.com/misskey-dev/misskey/blob/develop/packages/frontend-shared/themes/_light.json5
[_dark.json5]: https://github.com/misskey-dev/misskey/blob/develop/packages/frontend-shared/themes/_dark.json5

#### 值字段语法

- 十六进制颜色值
  - 例: `#00ff00`
- `rgb(r, g, b)`格式颜色值
  - 例: `rgb(0, 255, 0)`
- `rgba(r, g, b, a)`格式颜色值（含透明度）
  - 例: `rgba(0, 255, 0, 0.5)`
- 引用其他键的值
  - 使用`@{键名}`的形式即可引用其他键的值，其中`{键名}`请替换为要引用的键名。
  - 例: `@panel`
- 引用常量（下文将介绍）
  - 使用`${常量名}`的形式即可引用常量，其中`{常量名}`请替换为要引用的常量名称。
  - 例: `$main`
- 函数（下文将介绍）
  - `:{函数名}<{参数}<{颜色}`

#### 常量

当存在「不希望被作为CSS变量生成，但希望作为其他CSS变量的值重复使用」的值时，使用常量会很方便。
如果键名以`$`开头，该键将不会被作为CSS变量生成。

#### 函数

当需要基于已有颜色生成稍作调整的颜色（例如仅在按钮悬停时提高亮度）时，可以使用函数。

函数的使用形式为`:{函数名}<{参数}<{颜色或对其他键的引用}`。

```js
props: {
	accent: '#86b300',
	accentDarken: ':darken<10<#86b300',
	accentLighten: ':lighten<10<@accent'
}
```

##### 可用函数

- `lighten` ... 对传入颜色的亮度（0 ~ 100）加上指定的参数值（0 ~ 100），并返回计算后的颜色。
- `darken` ... 对传入颜色的亮度（0 ~ 100）减去指定的参数值（0 ~ 100），并返回计算后的颜色。
- `alpha` ... 将传入颜色的透明度设置为指定的参数值（0.0 ~ 1.0），并返回处理后的颜色。
  - 当参数为 0.0 时表示完全透明，为 1.0 时表示完全不透明。
- `hue` ... 将传入颜色的色相（-360 ~ 360）按指定的参数值（-360 ~ 360）进行旋转，并返回处理后的颜色。
- `saturate` ... 对传入颜色的饱和度（0 ~ 100）加上指定的参数值（0 ~ 100），并返回计算后的颜色。

## 主题一键安装（站长集成）

自 v2023.11.0 起，支持从您的网站一键直接安装主题。

如果要为用户提供主题安装功能，需要在您的网站上实现相应的 API。详情请参阅[此处](../../for-developers/publish-on-your-website/)。
