# 플러그인 만들기

Misskey 웹 클라이언트의 플러그인 기능을 사용하면 클라이언트를 확장하고 다양한 기능을 추가할 수 있습니다.

## 플러그인 예시

다음은 완전한 플러그인의 예시입니다.이 플러그인은 [`Plugin:register_post_form_action`](/docs/for-developers/plugin/plugin-api-reference/#pluginregister_post_form_actiontitle-fn)를 사용하여, 게시 폼에 "복어 펀치 버튼"(フグパンチボタン)을 추가하는 내용입니다.

이 플러그인을 설치하면, 게시 폼에 있는 플러그인 메뉴에 "복어 펀지" 항목이 추가됩니다.클릭 후, 게시 폼에 있는 텍스트에 `ﾌｸﾞﾊﾟﾝﾁ!!!!🐡( '-' 🐡 )`(복어펀치!!!!)가 추가됩니다.

```ais
/// @ 0.12.4
### {
  name: "フグパンチボタン"
  version: "0.0.1"
  author: "Misskey Project"
}

Plugin:register_post_form_action('フグパンチ', @(note, rewrite) {
  let fugu = "ﾌｸﾞﾊﾟﾝﾁ!!!!🐡( '-' 🐡 )"

  if (note.text.trim() == '') {
    // 노트에 아무것도 적지 않은 경우 フグパンチ 를 대신 올리기
    rewrite('text', fugu)
  } else {
    // 내용이 있는 노트의 경우 제일 앞에 フグパンチ 를 추가 후 다음 줄로
    rewrite('text', `{fugu}{Str:lf}{note.text}`)
  }
})
```

## AiScript

플러그인은 AiScript로 작성되는 스크립트입니다.

## 메타데이터

플러그인은 AiScript의 메타데이터 임베딩 기능을 사용하여 기본적으로 플러그인의 메타데이터를 정의해야 합니다.메타데이터의 예는 다음과 같습니다.메타데이터의 예는 다음과 같습니다.

```AiScript
/// @ 0.12.4
### {
  name: "플러그인 이름"
  version: "4.2.1"
  author: "저자명"
  description: "설명"
}
```

메타데이터는 다음과 같은 속성을 포함하는 객체입니다.

### name

플러그인 이름

### author

플러그인 제작자

### version

플러그인 버전.숫자를 지정해 주세요.숫자를 지정해 주세요.

### description

플러그인 설명

### permissions

플러그인이 요구하는 권한.플러그인이 요구하는 권한.MisskeyAPI에 요청할 때 사용됩니다.

API 요청 방법은 [AiScript Misskey 확장 API 레퍼런스](/docs/for-developers/plugin/plugin-api-reference/)에서 확인할 수 있습니다.

:::tip

permission 목록은 [여기](/docs/for-developers/api/permission/)에서 확인할 수 있습니다.

:::

### config

플러그인의 설정 정보를 나타내는 객체. 키에 설정명, 값에 다음 속성을 포함합니다. 어떤 API가 있는지 [플러그인 API 레퍼런스](./plugin-api-reference/)를 참고하시기 바랍니다.

#### type

설정값의 종류를 나타내는 문자열.아래에서 선택하세요.string number boolean

#### label

사용자에게 표시할 설정 이름

#### description

설정 설명

#### default

설정 기본값

## API

Misskey Web은 플러그인에 대해 API를 공개하고 있으며, 이를 이용하여 클라이언트의 기능을 확장할 수 있습니다.

## 플러그인 배포하기

v2023.11.0 이상에서는 웹 사이트에서 한 번의 클릭으로 플러그인을 직접 설치할 수 있습니다.

플러그인 설치 기능을 제공하는 경우, 사이트에 API를 구현해야 합니다.자세한 내용은 [여기](./publish-on-your-website.md)에서 확인할 수 있습니다.자세한 내용은 [여기](../publish-on-your-website.md)에서 확인할 수 있습니다.
