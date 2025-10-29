# 플러그인 API 레퍼런스

여기서는 Misskey에서 독자적으로 확장한 AiScript API에 대해 소개합니다.

:::tip

표준으로 제공되는 AiScript API는 [여기](https://aiscript-dev.github.io/guides/get-started.html)에서 확인할 수 있습니다.

:::

## `Mk:api(endpoint params)`

### `USER_ID`

현재 사용자 ID

### `USER_NAME`

현재 사용자 이름

### `USER_USERNAME`

현재 사용자의 핸들(`@`보다 뒤쪽 부분.예: `@ai@example.com` → `ai`)

### `CUSTOM_EMOJIS`

커스텀 이모티콘 목록.다음과 같은 객체가 배열로 저장되어 있습니다.

```ts
type EmojiSimple = {
  aliases: string[];
  name: string;
  category: string | null;
  url: string;
  localOnly?: boolean;
  isSensitive?: boolean;
  roleIdsThatCanBeUsedThisEmojiAsReaction?: string[];
}
```

### `LOCALE`

현재 Misskey Web의 설정 언어.RFC4646 호환 형식(예: `ja-JP`)으로 표현됩니다.

### `SERVER_URL`

현재 서버의 URL.`https://www.example.com`과 같이 오리진으로 표현됩니다.

## 전 분야 공통 함수

### `Mk:dialog(title, text, type)`

대화 상자를 표시합니다.type에는 다음과 같은 값을 설정할 수 있습니다.\
`info` `success` `warn` `error` `question`\
생략하면 `info`가 됩니다.

### `Mk:toast(text)`

토스트를 표시합니다.다이얼로그와 달리 유저가 다이얼로그를 닫는 조작이 필요하지 않기에 어떠한 조작이 완료됐다 등의 단순한 알림에 사용할 수 있습니다.

### `Mk:confirm(title, text, type)`

확인 대화상자를 표시합니다.type에는 다음과 같은 값을 설정할 수 있습니다.\
`info` `success` `warn` `error` `question`\
생략하면 `question`이 됩니다.확인 대화상자를 표시합니다.type에는 다음과 같은 값을 설정할 수 있습니다.\
`info` `success` `warn` `error` `question`\
생략하면 `question`이 됩니다.\
사용자가 "OK"를 선택하면 `true`를, "취소"를 선택하면 `false`를 반환합니다.

```AiScript
let response = Mk:confirm(
  '조작을 계속하시겠습니까?'
  '이 조작은 취소할 수 없습니다. 잘 확인해주십시오.'
  'warning'
)

if (response) {
  // OK한 경우
} else {
  // 취소한 경우
}
```

### `Mk:api(endpoint, params, token?)`

Misskey API에 요청합니다.Misskey API에 요청합니다.첫 번째 인수로 엔드포인트 이름, 두 번째 인수로 매개변수 객체를 전달합니다.

세 번째 인수에 token을 넣을 수도 있습니다.플러그인에서 동작하는 경우, 인수 지정 없이 로그인 중인 사용자의 token이 사용됩니다.

:::tip

permission 목록은 [여기](/docs/for-developers/api/permission/)에서 확인할 수 있습니다.

:::

```AiScript
### {
  name: "플러그인 이름",
  version: "4.2.1",
  author: "작성자",
  description: "설명문",
  permissions: ['write:notes'],
}

@onClick() {
  let res = Mk:api('notes/create', {
    text: 'Hello from plugin!'
  })
}
```

### `Mk:save(key, value)`

추후에 구분할 수 있도록 임의의 키와 값을 정합니다. 여기서 정한 값은 AiScript 컨텍스트가 끝나도 남아있으므로, Mk:load로 다시 불러올 수 있습니다.

### `Mk:load(key)`

Mk:save에서 정해둔 키로 값을 불러올 수 있습니다.

### `Mk:remove(key)`

※v2025.1.0(가칭) 이후에 사용 가능

Mk:save에서 정해둔 키로 값을 삭제할 수 있습니다. 정해둔 키 값을 입력한 경우 아무것도 하지 않습니다.

### `Mk:url()`

지금 열고 있는 페이지의 URL 주소(브라우저의 주소 창에 표시된 URL)을 불러옵니다.

### `Mk:nyaize(text)`

지정된 텍스트를 Nyaize합니다.MFM 문장에는 적용되지 않습니다.

## 플러그인 전용

### `Plugin:register_post_form_action(title, fn)`

글 작성란에 액션을 추가합니다.\
첫 번째 인수에 액션 이름, 두 번째 인수에 액션이 선택되었을 때의 콜백 함수를 적습니다.\
첫 번째 인수에 글 작성란 오브젝트 안에 있는 `text` 또는 `cw`를, 두 번째 인수엔 첫 번째 인수에서 정한 항목의 값을 콜백 함수로 정할 수 있습니다.

```AiScript
Plugin:register_post_form_action('메뉴에 표시될 항목명', @(note, rewrite) {

  // 노트에 변경을 가한다.
  rewrite('text', `{{note.text}{Str:lf}#해시태그`)
})
```

### `Plugin:register_note_action(title, fn)`

노트 메뉴에 항목을 추가합니다.첫 번째 인수로 항목 이름, 두 번째 인수로 항목이 선택되었을 때의 콜백 함수를 전달합니다.\
콜백 함수에는 첫 번째 인수에 대상 노트 객체가 전달됩니다.

```AiScript
Plugin:register_note_action('메뉴에 표시할 항목 이름', @(note) {

  // 노트를 사용하여 무언가 하기
  Mk:api('notes/create', {
    text: '인용'
    renoteId: note.id
  })

})
```

### `Plugin:register_user_action(title, fn)`

사용자 메뉴에 항목을 추가합니다.첫 번째 인수에 항목 이름, 두 번째 인수에 항목이 선택되었을 때의 callback 함수를 전달합니다.사용자 메뉴에 항목을 추가합니다.첫 번째 인수로 항목 이름, 두 번째 인수로 항목이 선택되었을 때의 콜백 함수를 전달합니다.\
콜백 함수에는 첫 번째 인수로 대상 사용자 객체가 전달됩니다.

```AiScript
Plugin:register_user_action('메뉴에 표시할 항목명', @(user) {

  // 사용자 정보를 이용하여 무언가 하기.
  Mk:api('notes/create', {
    text: `{user.name}님, 환영합니다! `
  })

})
```

### `Plugin:register_note_view_interruptor(fn)`

UI에 표시되는 노트 정보를 다시 작성합니다.\
콜백 함수가 첫번 째 인수를 대상으로 노트 오브젝트를 전달합니다.\
콜백 함수의 반환값으로 노트를 다시 작성합니다.\
`null`을 반환하면 해당 노트를 숨깁니다.

:::warning

v2025.8.0 이후에서는 이 함수는 **동기적으로 실행**됩니다.
내부적으로 비동기적인 처리가 실행되는 함수('Mk:api' 등)는 실행되지 않고 에러가 발생합니다.

또 동기적으로 실행된다는 것은 플러그인의 실행 중에는 다른 JavaScript의 처리가 전부 정지된다는 것을 의미합니다.이로 인해 다른 플러그인에 비해 문제가 있는 스크립트(무한 반복 등)가 실행된 경우, 호스트의 Javascript 환경에 큰 영향을 끼칠 수 있습니다.충분히 주의해 주십시오.

:::

```AiScript
Plugin:register_note_view_interruptor(@(note) {
  
  // 노트 내용 바꾸기
  note.text = note.text.replace('apple', 'banana')

  // null을 반환하면 숨기기
  if (note.text.include('낫토')) {
    return null
  }

  return note
})
```

### `Plugin:register_note_post_interruptor(fn)`

노트를 올렸을 때 노트 정보를 다시 작성합니다.\
콜백 함수가 첫 번째 인수를 대상으로 노트 객체를 전달합니다.\
콜백 함수의 반환값으로 노트를 다시 작성합니다.

```AiScript
Plugin:register_note_post_interruptor(@(note) {
  
  // 노트 내용 바꾸기
  note.text = note.text.replace('사과', '바나나')

  return note
})
```

### `Plugin:register_page_view_interruptor(fn)`

페이지 열람 시 페이지 정보를 다시 작성합니다.\
콜백 함수에는 첫 번째 인수로 대상 Page 객체가 전달됩니다.\
콜백 함수의 반환값으로 Page가 다시 작성됩니다.

```AiScript
Plugin:register_note_post_interruptor(@(page) {
  
  // 페이지 내용 재작성(생략)

  return page
})
```

### `Plugin:open_url(url)`

첫 번째 인수로 전달된 URL을 브라우저의 새 탭에서 엽니다.

### `Plugin:config`

플러그인 설정이 저장되는 오브젝트입니다.플러그인 정의의 config에서 설정한 키로 값이 들어갑니다.플러그인 정의의 config에서 설정한 키로 값이 들어갑니다.

## Play 전용 상수

### `THIS_ID`

Play의 ID

### `THIS_URL`

Play의 URL

## UI 제어 함수 (Play, AiScript App 위젯에서 사용 가능)

### `Ui:root`

UI의 루트 요소.

### `Ui:render([ ...components ])`

`Ui:root.update({ children: [ ...components ] })` 의 당의구문.UI의 루트 요소를 다시 작성합니다.

```AiScript
Ui:render([
  Ui:C:text({text: "A"})
  Ui:C:button({text: "B", onClick: @(){}})
])
```

### `Ui:get(id)`

ID를 부여한 컴포넌트를 가져와서 조작할 수 있습니다.

```AiScript
Ui:C:text({text: "A"}, "text1")
Ui:get("text1").update({text: "B"})
```

## 컴포넌트 함수(Play, AiScript App 위젯에서 사용 가능)

아래 요소에서는 초기화 시 `Ui:C:xxx(props id)`와 같이 두 번째 인수에 컴포넌트 id를 지정할 수 있습니다(아래 레퍼런스에서는 모두 생략했습니다).지정한 id는 `Ui:get(id)` 함수로 얻을 수 있으며, `update` 함수로 컴포넌트의 내용을 직접 변경할 수 있습니다(자세한 내용은 `Ui:get(id)` 레퍼런스를 참고하세요).

### 레이아웃

#### `Ui:C:container`

너비, 색상 등 서식 설정이 가능한 외곽 틀(컨테이너)

```AiScript
Ui:C:container({
  children: [
    // 컨테이너 안에 넣고 싶은 컴포넌트 배열
    Ui:C:text({text: "A"})
  ]
  align: 'center' // 정렬 left,center,right
  bgColor: '#000' // 배경색
  fgColor: '#00f' // 글자색
  font: 'serif' // 폰트 serif,sans-serif,monospace
  borderWidth: 1 // 테두리 폭
  borderColor: '#f00' // 테두리 색
  padding: 1 // 여백 폭
  rounded: false // 모서리 둥글게 하기
  hidden: false // 감추기
})
```

#### `Ui:C:folder`

아코디언 요소(사용자가 열고 닫을 수 있는 컨테이너)

```AiScript
Ui:C:folder({
  children: [
    // 컨테이너 안에 넣고 싶은 컴포넌트 배열
    Ui:C:text({text: "A"})
  ]
  title: "타이틀" // 폴더의 개폐 부분에 기재할 제목
  opened: true // 처음부터 열려있는가
})
```

### 텍스트

#### `Ui:C:text`

일반 텍스트

```AiScript
Ui:C:text({
  text: "내용" // 표시할 텍스트
  size: 1 // 글자크기
  bold: false // 굵게(볼드)
  color: '#000' // 글자색
  font: 'monospace' // 폰트 serif,sans-serif,monospace
})
```

#### `Ui:C:mfm`

MFM 텍스트

```AiScript
Ui:C:mfm({
  text: "내용" // 표시할 텍스트
  size: 1 // 글자크기
  bold: false // 굵게(볼드)
  color: '#000' // 글자색
  font: 'monospace' // 폰트 serif,sans-serif,monospace
  onClickEv: @(id) {
    // $[clickable.ev=eventId TEXT] 의 MFM 구문 핸들러
    <: `{id} clicked`
  }
})
```

### Forms

#### `Ui:C:button`

버튼

```AiScript
Ui:C:button({
  text: "버튼" // 버튼에 표시할 텍스트
  onClick: @() {
    // 누를 때의 이벤트
  }
  primary: false // 색을 입힐까?
  rounded: false // 모서리를 둥글게 할까?
  disabled: false // 비활성화할 것인가?
})
```

#### `Ui:C:buttons`

버튼 (가로로 나란히)

```AiScript
Ui:C:buttons({
  buttons: [ // 버튼 정의 배열.  props의 지정 형식은 Ui:C:button과 동일.
    {text: "a", onClick: @(){...}}
    {text: "b", onClick: @(){...}}
  ]
})
```

#### `Ui:C:switch`

```AiScript
Ui:C:switch({
  onChange: @(enabled) { 
    // 변경되었을 때의 이벤트. 첫 번째 인수로 변경 후 상태 (boolean)
  }
  default: false // 기본값
  label: "라벨" // 스위치 옆의 텍스트
  caption: "캡션" // 스위치 아래에 표시되는 보조 텍스트
})
```

#### `Ui:C:textInput`

1줄의 텍스트 입력

```AiScript
Ui:C:textInput({
  onInput: @(text) {
    // 입력되었을 때의 이벤트. 첫 번째 인수로 변경 후의 값
  }
  default: "default" // 기본값
  label: "라벨" // 입력란 위의 텍스트
  caption: "캡션" // 입력란 하단에 표시하는 보조 텍스트
})
```

#### `Ui:C:numberInput`

1줄의 텍스트 입력

```AiScript
Ui:C:numberInput({
  onInput: @(number) {
    // 입력되었을 때의 이벤트. 첫 번째 인수로 변경 후의 값
  }
  default: "default" // 기본값
  label: "라벨" // 입력란 위의 텍스트
  caption: "캡션" // 입력란 하단에 표시하는 보조 텍스트
})
```

#### `Ui:C:textarea`

여러 줄의 텍스트 입력

```AiScript
Ui:C:textarea({
  onInput: @(text) {
    // 입력되었을 때의 이벤트. 첫 번째 인수로 변경 후의 값
  }
  default: "default" // 기본값
  label: "라벨" // 입력란 위의 텍스트
  caption: "캡션" // 입력란 하단에 표시하는 보조 텍스트
})
```

#### `Ui:C:select`

여러 값 중 하나를 선택하는 형식

```AiScript
Ui:C:select({
  items: [ // text에는 표시할 텍스트를, value에는 변경 시 이벤트에서 전달할 값을 입력합니다.
    {text: "A", value: "v1"}
    {text: "B", value: "v2"}
  ]
  onChange: @(value){
    // 변경되었을 때의 이벤트. 첫 번째 인수로 변경 후 value
  }
  default: "v1" // 기본값 value
  label: "라벨" // 입력란 위의 텍스트
  caption: "캡션" // 입력란 하단에 표시하는 보조 텍스트
})
```

### 노트 게시 관련

#### `Ui:C:postForm`

Play에 직접 게시 양식 삽입하기

```AiScript
Ui:C:postForm({
  form: {
    cw: "CW 주석" // CW를 지정할 경우 '요약' 텍스트
    text: "게시글 내용" // 게시글 양식의 기본 문자열

    // 다음은 Misskey v2024.5.0 이상에서 지정할 수 있습니다.
    visibility: "home" // 기본 게시물의 공개 범위 (지정하지 않은 경우 public)
    localOnly: false // 기본적으로 연합 없음 여부 (미지정인 경우 false)
  }
})
```

#### `Ui:C:postFormButton`

투고 양식을 호출할 수 있는 특수 버튼

```AiScript
Ui:C:postFormButton({
  text: "게시!" // 버튼에 표시할 텍스트
  primary: false // 색을 입힐까?
  rounded: false // 모서리를 둥글게 할까?
  form: {
    cw: "CW 주석" // CW를 지정할 경우 ‘요약’ 텍스트
    text: "게시글 내용" // 게시글 양식의 기본 문자열

    // 다음은 Misskey v2024.5.0 이상에서 지정할 수 있습니다.
    visibility: "home" // 기본 게시물의 공개 범위 (지정하지 않은 경우 public)
    localOnly: false // 기본적으로 연합 없음 여부 (미지정인 경우 false)
  }
})
```
