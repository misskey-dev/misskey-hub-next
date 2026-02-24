# 分发插件与主题

在 Misskey v2023.11.0 及后续版本中，用户可以直接从你的网站安装各种附加资源。这对于制作了大量插件或主题的开发者，或者想要搭建插件分发网站的人来说，是一个非常方便的功能。

## 支持从外部安装的资源

- [插件](./plugin/create-plugin/) ... `plugin`
- [主题](../for-users/features/theme/) ... `theme`

## 运行机制

为了防止在安装时 Misskey Web 接收到的资源遭到意外篡改，分发网站端和 Misskey 双方都会计算哈希值，并在 Misskey 端进行比对验证。

如果哈希值无法匹配，系统将阻止该资源的安装。

## 实现方法

### 分发页面端

请在“安装”按钮上，创建一个包含如下 URL 格式的链接：

```
https://{HOST}/install-extensions?url={API_URL}&hash={HASH}
```

- `{HOST}`: 替换为用户服务器的主机名。通常会设计成允许用户自行输入主机名的输入框。
- `{API_URL}`: 替换为资源分发 API（详见后文）的 URL。不可使用相对路径。
- `{HASH}`: 替换为所分发资源的 SHA-512 哈希值。\*\* 请确保资源内的换行符统一为 LF。\*\*

### 用于资源分发的API端

请从上面 `{API_URL}` 中指定的端点，返回如下所示的 JSON 对象：

```json
{
    "type": "theme",
    "data": "{\n\tid: '4dca6e53-9c1b-41bb-a1ac-c62c3b710536',\n\tbase: 'light',\n\tname: 'Misskey Design',\n\tprops: {\n\t\tX2: ':darken<2<@panel',\n\t\tX3: 'rgba(0, 0, 0, 0.05)',\n\t\tX4: 'rgba(0, 0, 0, 0.1)',\n\t\tX5: 'rgba(0, 0, 0, 0.05)',\n\t\tX6: 'rgba(0, 0, 0, 0.25)',\n\t\tX7: 'rgba(0, 0, 0, 0.05)',\n\t\tX8: ':lighten<5<@accent',\n\t\tX9: ':darken<5<@accent',\n\t\tbg: '#f9f9f9',\n\t\tfg: '#5f5f5f',\n\t\tX10: ':alpha<0.4<@accent',\n\t\tX11: 'rgba(0, 0, 0, 0.1)',\n\t\tX12: 'rgba(0, 0, 0, 0.1)',\n\t\tX13: 'rgba(0, 0, 0, 0.15)',\n\t\tX14: ':alpha<0.5<@navBg',\n\t\tX15: ':alpha<0<@panel',\n\t\tX16: ':alpha<0.7<@panel',\n\t\tX17: ':alpha<0.8<@bg',\n\t\tcwBg: '#b1b9c1',\n\t\tcwFg: '#fff',\n\t\tlink: '#44a4c1',\n\t\twarn: '#ecb637',\n\t\tbadge: '#31b1ce',\n\t\terror: '#ec4137',\n\t\tfocus: ':alpha<0.3<@accent',\n\t\tnavBg: '@panel',\n\t\tnavFg: '@fg',\n\t\tpanel: ':lighten<3<@bg',\n\t\tpopup: ':lighten<3<@panel',\n\t\taccent: '#FF6B63',\n\t\theader: ':alpha<0.7<@panel',\n\t\tinfoBg: '#e5f5ff',\n\t\tinfoFg: '#72818a',\n\t\trenote: '#229e82',\n\t\tshadow: 'rgba(0, 0, 0, 0.1)',\n\t\tdivider: 'rgba(0, 0, 0, 0.1)',\n\t\thashtag: '#ff9156',\n\t\tmention: '@accent',\n\t\tmodalBg: 'rgba(0, 0, 0, 0.3)',\n\t\tsuccess: '#86b300',\n\t\tbuttonBg: 'rgba(0, 0, 0, 0.05)',\n\t\tswitchBg: 'rgba(0, 0, 0, 0.15)',\n\t\tacrylicBg: ':alpha<0.5<@bg',\n\t\tcwHoverBg: '#bbc4ce',\n\t\tindicator: '@accent',\n\t\tmentionMe: '@mention',\n\t\tmessageBg: '@bg',\n\t\tnavActive: '@accent',\n\t\taccentedBg: ':alpha<0.15<@accent',\n\t\tcodeNumber: '#0fbbbb',\n\t\tcodeString: '#b98710',\n\t\tfgOnAccent: '#fff',\n\t\tinfoWarnBg: '#fff0db',\n\t\tinfoWarnFg: '#8f6e31',\n\t\tnavHoverFg: ':darken<17<@fg',\n\t\tswitchOnBg: '@accent',\n\t\tswitchOnFg: '@fgOnAccent',\n\t\tcodeBoolean: '#62b70c',\n\t\tdateLabelFg: '@fg',\n\t\tdeckDivider: ':darken<3<@bg',\n\t\tinputBorder: 'rgba(0, 0, 0, 0.1)',\n\t\tpanelBorder: '\" solid 1px var(--divider)',\n\t\tswitchOffBg: 'rgba(0, 0, 0, 0.1)',\n\t\tswitchOffFg: '@panel',\n\t\taccentDarken: ':darken<10<@accent',\n\t\tacrylicPanel: ':alpha<0.5<@panel',\n\t\tnavIndicator: '@indicator',\n\t\twindowHeader: ':alpha<0.85<@panel',\n\t\taccentLighten: ':lighten<10<@accent',\n\t\tbuttonHoverBg: 'rgba(0, 0, 0, 0.1)',\n\t\tdriveFolderBg: ':alpha<0.3<@accent',\n\t\tfgHighlighted: ':darken<3<@fg',\n\t\tfgTransparent: ':alpha<0.5<@fg',\n\t\tpanelHeaderBg: ':lighten<3<@panel',\n\t\tpanelHeaderFg: '@fg',\n\t\tbuttonGradateA: '#FC4774',\n\t\tbuttonGradateB: '#F9E001',\n\t\thtmlThemeColor: '@bg',\n\t\tpanelHighlight: ':darken<3<@panel',\n\t\tlistItemHoverBg: 'rgba(0, 0, 0, 0.03)',\n\t\tscrollbarHandle: 'rgba(0, 0, 0, 0.2)',\n\t\tinputBorderHover: 'rgba(0, 0, 0, 0.2)',\n\t\twallpaperOverlay: 'rgba(255, 255, 255, 0.5)',\n\t\tfgTransparentWeak: ':alpha<0.75<@fg',\n\t\tpanelHeaderDivider: 'rgba(0, 0, 0, 0)',\n\t\tscrollbarHandleHover: 'rgba(0, 0, 0, 0.4)',\n\t},\n\tauthor: '@someone@misskey.example',\n}"
}
```

- `type`: 请参考上述“支持从外部安装的资源”中的代码进行填写。
- `data`: 以**字符串形式**输入资源的源代码。
  - 此时，请务必将换行符设为 **LF**。