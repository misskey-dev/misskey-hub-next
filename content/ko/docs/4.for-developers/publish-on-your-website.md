# 플러그인 테마 배포하기

Misskey v2023.11.0 이상에서는 다양한 추가 리소스를 웹 사이트에서 직접 설치할 수 있습니다.특히 플러그인이나 테마 등을 많이 제작하는 분이나 플러그인 배포 사이트를 만들고 싶은 분들에게 유용한 기능입니다.특히 플러그인이나 테마 등을 많이 제작하는 분이나 플러그인 배포 사이트를 만들고 싶은 분들에게 유용한 기능입니다.

## 외부에서 설치할 수 있는 리소스

- [플러그인](./plugin/create-plugin/) ... `plugin`
- [테마](../for-users/features/theme/) ... `theme`

## 구조

설치 시 Misskey Web에서 수신하는 리소스에 예기치 않은 변조가 발생하지 않도록 배포 사이트 측과 Misskey에서 해시값을 계산하고, Misskey에서 대조하는 과정을 거칩니다.

해시값이 일치하지 않으면 리소스를 설치할 수 없도록 되어 있습니다.

## 구현 방법

### 배포 페이지 측

'설치' 버튼에 아래와 같은 URL을 가진 링크를 생성합니다.

```
https://{HOST}/install-extentions?url={API_URL}&hash={HASH}
```

- `{HOST}`: 사용자 서버의 호스트로 대체합니다.호스트는 일반적으로 사용자가 입력할 수 있도록 하는 것이 일반적입니다.호스트는 일반적으로 사용자가 입력할 수 있도록 하는 것이 일반적입니다.
- `{API_URL}`: 리소스 배포용 API(후술)의 URL로 대체합니다.상대 경로 불가상대 경로 불가
- `{HASH}`: 배포할 리소스의 SHA-512 해시로 대체합니다.\*\*리소스 내 줄바꿈 코드는 LF로 통일해 주세요.**구조**

### 리소스 배포용 API 측

위의 `{API_URL}`로 지정한 엔드포인트에서 아래와 같은 JSON 객체를 반환합니다.

```json
{
    "type": "theme",
    "data": "{\n\tid: '4dca6e53-9c1b-41bb-a1ac-c62c3b710536',\n\tbase: 'light',\n\tname: 'Misskey Design',\n\tprops: {\n\t\tX2: ':darken<2<@panel',\n\t\tX3: 'rgba(0, 0, 0, 0.05)',\n\t\tX4: 'rgba(0, 0, 0, 0.1)',\n\t\tX5: 'rgba(0, 0, 0, 0.05)',\n\t\tX6: 'rgba(0, 0, 0, 0.25)',\n\t\tX7: 'rgba(0, 0, 0, 0.05)',\n\t\tX8: ':lighten<5<@accent',\n\t\tX9: ':darken<5<@accent',\n\t\tbg: '#f9f9f9',\n\t\tfg: '#5f5f5f',\n\t\tX10: ':alpha<0.4<@accent',\n\t\tX11: 'rgba(0, 0, 0, 0.1)',\n\t\tX12: 'rgba(0, 0, 0, 0.1)',\n\t\tX13: 'rgba(0, 0, 0, 0.15)',\n\t\tX14: ':alpha<0.5<@navBg',\n\t\tX15: ':alpha<0<@panel',\n\t\tX16: ':alpha<0.7<@panel',\n\t\tX17: ':alpha<0.8<@bg',\n\t\tcwBg: '#b1b9c1',\n\t\tcwFg: '#fff',\n\t\tlink: '#44a4c1',\n\t\twarn: '#ecb637',\n\t\tbadge: '#31b1ce',\n\t\terror: '#ec4137',\n\t\tfocus: ':alpha<0.3<@accent',\n\t\tnavBg: '@panel',\n\t\tnavFg: '@fg',\n\t\tpanel: ':lighten<3<@bg',\n\t\tpopup: ':lighten<3<@panel',\n\t\taccent: '#FF6B63',\n\t\theader: ':alpha<0.7<@panel',\n\t\tinfoBg: '#e5f5ff',\n\t\tinfoFg: '#72818a',\n\t\trenote: '#229e82',\n\t\tshadow: 'rgba(0, 0, 0, 0.1)',\n\t\tdivider: 'rgba(0, 0, 0, 0.1)',\n\t\thashtag: '#ff9156',\n\t\tmention: '@accent',\n\t\tmodalBg: 'rgba(0, 0, 0, 0.3)',\n\t\tsuccess: '#86b300',\n\t\tbuttonBg: 'rgba(0, 0, 0, 0.05)',\n\t\tswitchBg: 'rgba(0, 0, 0, 0.15)',\n\t\tacrylicBg: ':alpha<0.5<@bg',\n\t\tcwHoverBg: '#bbc4ce',\n\t\tindicator: '@accent',\n\t\tmentionMe: '@mention',\n\t\tmessageBg: '@bg',\n\t\tnavActive: '@accent',\n\t\taccentedBg: ':alpha<0.15<@accent',\n\t\tcodeNumber: '#0fbbbb',\n\t\tcodeString: '#b98710',\n\t\tfgOnAccent: '#fff',\n\t\tinfoWarnBg: '#fff0db',\n\t\tinfoWarnFg: '#8f6e31',\n\t\tnavHoverFg: ':darken<17<@fg',\n\t\tswitchOnBg: '@accent',\n\t\tswitchOnFg: '@fgOnAccent',\n\t\tcodeBoolean: '#62b70c',\n\t\tdateLabelFg: '@fg',\n\t\tdeckDivider: ':darken<3<@bg',\n\t\tinputBorder: 'rgba(0, 0, 0, 0.1)',\n\t\tpanelBorder: '\" solid 1px var(--divider)',\n\t\tswitchOffBg: 'rgba(0, 0, 0, 0.1)',\n\t\tswitchOffFg: '@panel',\n\t\taccentDarken: ':darken<10<@accent',\n\t\tacrylicPanel: ':alpha<0.5<@panel',\n\t\tnavIndicator: '@indicator',\n\t\twindowHeader: ':alpha<0.85<@panel',\n\t\taccentLighten: ':lighten<10<@accent',\n\t\tbuttonHoverBg: 'rgba(0, 0, 0, 0.1)',\n\t\tdriveFolderBg: ':alpha<0.3<@accent',\n\t\tfgHighlighted: ':darken<3<@fg',\n\t\tfgTransparent: ':alpha<0.5<@fg',\n\t\tpanelHeaderBg: ':lighten<3<@panel',\n\t\tpanelHeaderFg: '@fg',\n\t\tbuttonGradateA: '#FC4774',\n\t\tbuttonGradateB: '#F9E001',\n\t\thtmlThemeColor: '@bg',\n\t\tpanelHighlight: ':darken<3<@panel',\n\t\tlistItemHoverBg: 'rgba(0, 0, 0, 0.03)',\n\t\tscrollbarHandle: 'rgba(0, 0, 0, 0.2)',\n\t\tinputBorderHover: 'rgba(0, 0, 0, 0.2)',\n\t\twallpaperOverlay: 'rgba(255, 255, 255, 0.5)',\n\t\tfgTransparentWeak: ':alpha<0.75<@fg',\n\t\tpanelHeaderDivider: 'rgba(0, 0, 0, 0)',\n\t\tscrollbarHandleHover: 'rgba(0, 0, 0, 0.4)',\n\t},\n\tauthor: '@kakkokari_gtyih@misskey.io',\n}"
}
```

- `type`: 위의 '외부에서 설치 가능한 리소스'의 코드를 참고하여 입력합니다.
- `data`: 리소스의 소스 코드를 **문자열**로 입력하세요.
  - 이때 줄 바꿈 코드는 **LF**로 해주세요.
