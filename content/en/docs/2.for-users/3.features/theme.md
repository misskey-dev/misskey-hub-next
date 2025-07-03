# Themes

Themes can be used to change the look and feel of the Misskey client.

## Theme settings

[Settings > Themes](x-mi-web://settings/theme)

## Creating a theme

Themes are described as JSON5 objects, written in the format shown below:

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

- `id` ... A unique theme ID.UUID recommended.
- `name` ... The name of the theme
- `author` ... The author of the theme
- `desc` ... The description of the theme (optional)
- `base` ... Whether the theme is a light or dark theme
    - If you set it to light the theme will be listed as a light mode theme, if you set it to dark it will be listed as a dark mode theme.
    - The theme will be inheriting the default values of the theme specified here.
- `props` ... The style definitions of the theme.These will be explained below.

### Definitions Used in Theme Styles

The styles used in a theme are defined in the `props` property.

- [_light.json5]: https://github.com/misskey-dev/misskey/blob/develop/packages/frontend/src/themes/_light.json5
- [_dark.json5]: https://github.com/misskey-dev/misskey/blob/develop/packages/frontend/src/themes/_dark.json5

#### Syntax for Values

- Hexadecimal colours
    - e.g. `#00ff00`
- RGB colors with `rgb(r, g, b)` syntax
    - e.g. `rgb(0,255,0)`
- RGBA colors with `rgb(r, g, b, a)` syntax
    - e.g. `rgba(0, 255, 0, 0.5)`
- References to values of other keys
    - If you write `@{key-name}` the value of the given key will be used.Replace `{key-name}` with the name of the key to reference.
    - e.g. `@panel`
- Constants (see below)
    - If you write `${constant-name}` the value of the given constant will be used.Replace `{constant-name}` with the name of the constant to reference.
    - e.g. `$main`
- Functions (see below)
    - `:{function-name}<{argument}<{color}`

#### Constants

In cases where you have a value that you don't want to output as a CSS variable, but want to use it as the value of another CSS variable, you can use a constant.
If you prefix the name of a key with a `$`, it will be not be used as a CSS variable, but a referenced value.

#### Functions

Functions are useful when you would like to use a slight variation of an existing color, for example, to brighten a button when hovering over it.

Functions take the form: `:{function-name}<{argument}<{color}`

```js
props: {
	accent: '#86b300',
	accentDarken: ':darken<10<#86b300',
	accentLighten: ':lighten<10<@accent'
}
```

##### List of Functions

- `lighten` ... Returns the color obtained by increasing the lightness of the specified color by the given amount (0-100). The lightness of the color can range from 0-100. Providing 100 will always return white.
- `darken` ... Returns the color obtained by decreasing the lightness of the specified color by the given amount (0-100). Providing 100 will always return black.
- `alpha` ... Return the color with the transparency (alpha) value set to the given argument (0.0-1.0).
    - 0.0 is completely transparent, while 1.0 is completely opaque.
- `hue` ... Return the color obtained by spinning the hue by the given amount (-360 to 360).
- `saturate` ... Returns the color obtained by increasing the saturation by the given amount (0-100). The saturation of the color can range from 0-100.

## Distributing Themes

Since v2023.11.0, you can install themes directly from a website with one click.

If you want to provide theme installation functionality, you will need to implement an API on your site.See also the documentation on [distributing plugins and themes](../../for-developers/publish-on-your-website/).
