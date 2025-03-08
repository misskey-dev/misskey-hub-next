# AiScript

AiScript는 Misskey의 다음 부분에서 사용할 수 있는 스크립트 언어입니다.

- [플러그인](./plugin/create-plugin/)
- [위젯](/docs/for-users/features/widgets/)
  - 버튼
  - AiScript 콘솔
  - AiScript App
- [Misskey Play](./plugin/create-play/)
- 스크래치 패드

:::tip

AiScript의 구현은 Misskey와는 별도의 리포지토리로 [오픈소스로 공개되어 있습니다](https://github.com/aiscript-dev/aiscript).

:::

## 사용법

AiScript 표준 구문과 내장 함수 등을 사용할 수 있습니다.

:::tip

문서는 [여기](https://aiscript-dev.github.io/)에서 확인할 수 있습니다.\
Misskey 본체 버전에 따라 사용할 수 있는 AiScript 버전이 다를 수 있습니다.버전 확인은 `<: Core:v`를 Scratchpad 등에서 실행해 보세요.버전 확인은 `<: Core:v`를 Scratchpad 등에서 실행해 보세요.

:::

이 외에도 Misskey 전용 내장 상수 및 함수가 그룹으로 나뉘어 제공되고 있습니다.

### Misskey AiScript API

접두사: `Mk:`\
Misskey 내의 모든 AiScript 환경에서 사용할 수 있는 상수 함수군입니다.

### Plugin API

접두사: `Plugin:`\
[플러그인](./plugin/)에서만 사용할 수 있는 상수 함수군입니다.

### UI API

접두사: `Ui:`\
[위젯](/docs/for-users/features/widgets/)(AiScript App), Misskey Play, Scratchpad에서 사용할 수 있습니다.

### 표준입출력

AiScript 표준에서 정의된 `readline` 함수와 `print` 함수(및 `<:` 구문)의 내부 구현은 Misskey 측에서 독자적으로 제공하고 있습니다.

#### readline(message)

`message`: `str`\
반환값: `str`\
Misskey 내 모든 AiScript 환경에서 사용할 수 있습니다.\
문자열 입력을 요청하는 팝업을 표시합니다.\
문자열 입력을 요청하는 팝업을 표시합니다.

#### print(message)

`message`: `any`\
반환값: `null`\
[위젯](/docs/for-users/features/widgets/) (AiScript 콘솔), Scratchpad에서 사용할 수 있습니다.\
콘솔에 문자열을 출력합니다.\
`<:`구문도 비슷한 역할을 합니다.\
콘솔에 문자열을 출력합니다.\
`<:`구문도 비슷한 역할을 합니다.
