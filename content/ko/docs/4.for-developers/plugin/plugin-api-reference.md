# 플러그인 API 레퍼런스

## `Mk:dialog(title text type)`

대화 상자를 표시합니다.type에는 다음과 같은 값을 설정할 수 있습니다.\
`info` `success` `warn` `error` `question`\
생략하면 `info`가 됩니다.

## `Mk:confirm(title text type)`

확인 대화상자를 표시합니다.type에는 다음과 같은 값을 설정할 수 있습니다.\
`info` `success` `warn` `error` `question`\
생략하면 `question`이 됩니다.확인 대화상자를 표시합니다.type에는 다음과 같은 값을 설정할 수 있습니다.\
`info` `success` `warn` `error` `question`\
생략하면 `question`이 됩니다.\
사용자가 "OK"를 선택하면 `true`를, "취소"를 선택하면 `false`를 반환합니다.

## `Mk:api(endpoint params)`

Misskey API에 요청합니다.Misskey API에 요청합니다.첫 번째 인수로 엔드포인트 이름, 두 번째 인수로 매개변수 객체를 전달합니다.

## `Mk:save(key value)`

임의의 값에 임의의 이름을 붙여서 영속화합니다.임의의 값에 임의의 이름을 붙여서 영속화합니다.영속화된 값은 AiScript 컨텍스트가 종료된 후에도 남아서 Mk:load에서 읽을 수 있습니다.

## `Mk:load(key)`

Mk:save에서 영속화한 지정된 이름의 값을 읽습니다.

## `Plugin:register_post_form_action(title fn)`

게시 양식에 액션을 추가합니다.게시 양식에 액션을 추가합니다.첫 번째 인수로 액션 이름, 두 번째 인수로 액션이 선택되었을 때의 콜백 함수를 전달합니다.\
콜백 함수에는 첫 번째 인수로 게시 양식 객체가 전달됩니다.대화 상자를 표시합니다.type에는 다음과 같은 값을 설정할 수 있습니다.\
`info` `success` `warn` `error` `question`\
생략하면 `info`가 됩니다.

## `Plugin:register_note_action(title fn)`

노트 메뉴에 항목을 추가합니다.첫 번째 인수로 항목 이름, 두 번째 인수로 항목이 선택되었을 때의 콜백 함수를 전달합니다.노트 메뉴에 항목을 추가합니다.첫 번째 인수로 항목 이름, 두 번째 인수로 항목이 선택되었을 때의 콜백 함수를 전달합니다.\
콜백 함수에는 첫 번째 인수로 대상 노트 객체가 전달됩니다.

## `Plugin:register_user_action(title fn)`

사용자 메뉴에 항목을 추가합니다.첫 번째 인수로 항목 이름, 두 번째 인수로 항목이 선택되었을 때의 콜백 함수를 전달합니다.사용자 메뉴에 항목을 추가합니다.첫 번째 인수로 항목 이름, 두 번째 인수로 항목이 선택되었을 때의 콜백 함수를 전달합니다.\
콜백 함수에는 첫 번째 인수로 대상 사용자 객체가 전달됩니다.

## `Plugin:register_note_view_interruptor(fn)`

UI에 표시되는 노트 정보를 다시 작성합니다.노트 게시시 노트 정보를 다시 작성합니다.\
콜백 함수에는 첫 번째 인수로 대상 노트 객체가 전달됩니다.\
콜백 함수의 반환값으로 노트를 다시 작성합니다.\
콜백 함수의 반환값으로 노트를 다시 작성합니다.

## `Plugin:register_note_post_interruptor(fn)`

노트 게시시 노트 정보를 다시 작성합니다.UI에 표시되는 노트 정보를 다시 작성합니다.\
콜백 함수에는 첫 번째 인수로 대상 노트 객체가 전달됩니다.\
콜백 함수의 반환값으로 노트를 다시 작성합니다.\
콜백 함수의 반환값으로 노트를 다시 작성합니다.

## `Plugin:open_url(url)`

첫 번째 인수로 전달된 URL을 브라우저의 새 탭에서 엽니다.

## `Plugin:config`

플러그인 설정이 저장되는 오브젝트입니다.플러그인 정의의 config에서 설정한 키로 값이 들어갑니다.플러그인 정의의 config에서 설정한 키로 값이 들어갑니다.
