# 发布 插件 和 主题

在Misskey v2023.11.0及更高版本中，您可以直接从您的网站安装各种插件特别是对于那些正在制作大量插件和主题的人，或者那些想创建插件分发网站的人来说，这是一个非常有用的功能。

## 支持外部安装的资源

- [插件](./plugin/create-plugin/) ...
- [主题](../for-users/features/theme/) ...

## 运作方式

为了防止Misskey Web接收到的资源在安装过程中发生意外篡改，分发站点和Misskey都计算哈希值，并在Misskey中进行匹配。

如果散列值无法匹配，则无法安装资源。

## 实现方式

### 分发页面侧

在“安装”按钮上创建包含以下URL的链接：

```
https://{HOST}/install-extensions?url={API_URL}&hash={HASH}
```

- `{HOST}`: 替换为用户服务器的主机。主机通常允许用户输入。
- `{API_URL}`: 替换为资源分发API的URL（如下所述）。不允许相对路径
- `{HASH}`: 将其替换为要分发的资源的SHA-512哈希。\*\* 资源中的换行符应统一为LF。

### 用于资源分发的API端

请从上面 `{API_URL}` 中指定的端点返回以下JSON对象。

```json
{
    "type": "theme",
    "data": "{\n\tid: '4dca6e53-9c1b-41bb-a1ac-c62c3b710536',\n\tbase: 'light',\n\tname: 'Misskey Design',\n\tprops: {\n\t\tX2: ':darken<2<@panel',\n\t\tX3: 'rgba(0, 0, 0, 0.05)',\n\t\tX4: 'rgba(0, 0, 0, 0.1)',\n\t\tX5: 'rgba(0, 0, 0, 0.05)',\n\t\tX6: 'rgba(0, 0, 0, 0.25)',\n\t\tX7: 'rgba(0, 0, 0, 0.05)',\n\t\tX8: ':lighten<5<@accent',\n\t\tX9: ':darken<5<@accent',\n\t\tbg: '#f9f9f9',\n\t\tfg: '#5f5f5f',\n\t\tX10: ':alpha<0.4<@accent',\n\t\tX11: 'rgba(0, 0, 0, 0.1)',\n\t\tX12: 'rgba(0, 0, 0, 0.1)',\n\t\tX13: 'rgba(0, 0, 0, 0.15)',\n\t\tX14: ':alpha<0.5<@navBg',\n\t\tX15: ':alpha<0<@panel',\n\t\tX16: ':alpha<0.7<@panel',\n\t\tX17: ':alpha<0.8<@bg',\n\t\tcwBg: '#b1b9c1',\n\t\tcwFg: '#fff',\n\t\tlink: '#44a4c1',\n\t\twarn: '#ecb637',\n\t\tbadge: '#31b1ce',\n\t\terror: '#ec4137',\n\t\tfocus: ':alpha<0.3<@accent',\n\t\tnavBg: '@panel',\n\t\tnavFg: '@fg',\n\t\tpanel: ':lighten<3<@bg',\n\t\tpopup: ':lighten<3<@panel',\n\t\taccent: '#FF6B63',\n\t\theader: ':alpha<0.7<@panel',\n\t\tinfoBg: '#e5f5ff',\n\t\tinfoFg: '#72818a',\n\t\trenote: '#229e82',\n\t\tshadow: 'rgba(0, 0, 0, 0.1)',\n\t\tdivider: 'rgba(0, 0, 0, 0.1)',\n\t\thashtag: '#ff9156',\n\t\tmention: '@accent',\n\t\tmodalBg: 'rgba(0, 0, 0, 0.3)',\n\t\tsuccess: '#86b300',\n\t\tbuttonBg: 'rgba(0, 0, 0, 0.05)',\n\t\tswitchBg: 'rgba(0, 0, 0, 0.15)',\n\t\tacrylicBg: ':alpha<0.5<@bg',\n\t\tcwHoverBg: '#bbc4ce',\n\t\tindicator: '@accent',\n\t\tmentionMe: '@mention',\n\t\tmessageBg: '@bg',\n\t\tnavActive: '@accent',\n\t\taccentedBg: ':alpha<0.15<@accent',\n\t\tcodeNumber: '#0fbbbb',\n\t\tcodeString: '#b98710',\n\t\tfgOnAccent: '#fff',\n\t\tinfoWarnBg: '#fff0db',\n\t\tinfoWarnFg: '#8f6e31',\n\t\tnavHoverFg: ':darken<17<@fg',\n\t\tswitchOnBg: '@accent',\n\t\tswitchOnFg: '@fgOnAccent',\n\t\tcodeBoolean: '#62b70c',\n\t\tdateLabelFg: '@fg',\n\t\tdeckDivider: ':darken<3<@bg',\n\t\tinputBorder: 'rgba(0, 0, 0, 0.1)',\n\t\tpanelBorder: '\" solid 1px var(--divider)',\n\t\tswitchOffBg: 'rgba(0, 0, 0, 0.1)',\n\t\tswitchOffFg: '@panel',\n\t\taccentDarken: ':darken<10<@accent',\n\t\tacrylicPanel: ':alpha<0.5<@panel',\n\t\tnavIndicator: '@indicator',\n\t\twindowHeader: ':alpha<0.85<@panel',\n\t\taccentLighten: ':lighten<10<@accent',\n\t\tbuttonHoverBg: 'rgba(0, 0, 0, 0.1)',\n\t\tdriveFolderBg: ':alpha<0.3<@accent',\n\t\tfgHighlighted: ':darken<3<@fg',\n\t\tfgTransparent: ':alpha<0.5<@fg',\n\t\tpanelHeaderBg: ':lighten<3<@panel',\n\t\tpanelHeaderFg: '@fg',\n\t\tbuttonGradateA: '#FC4774',\n\t\tbuttonGradateB: '#F9E001',\n\t\thtmlThemeColor: '@bg',\n\t\tpanelHighlight: ':darken<3<@panel',\n\t\tlistItemHoverBg: 'rgba(0, 0, 0, 0.03)',\n\t\tscrollbarHandle: 'rgba(0, 0, 0, 0.2)',\n\t\tinputBorderHover: 'rgba(0, 0, 0, 0.2)',\n\t\twallpaperOverlay: 'rgba(255, 255, 255, 0.5)',\n\t\tfgTransparentWeak: ':alpha<0.75<@fg',\n\t\tpanelHeaderDivider: 'rgba(0, 0, 0, 0)',\n\t\tscrollbarHandleHover: 'rgba(0, 0, 0, 0.4)',\n\t},\n\tauthor: '@someone@misskey.example',\n}"
}
```

- `type`: 请参阅上面的“支持外部安装的资源”中的代码并输入。
- `data`: 以 \*\* 字符串形式输入资源源代码 \*\*
  - 在这种情况下，换行符应该是 **LF**。
