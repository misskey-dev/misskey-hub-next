---
description: 리노트의 시간 표시 옆에 있는 "..."
---

# 자주 묻는 질문

Misskey를 이용할 때 자주 묻는 질문에 대한 내용을 담고 있습니다.<br>
Misskey 프로젝트 자체에 대한 자주 묻는 질문은 [여기](../../about-misskey#자주 묻는 질문)을 참고하세요.

## Android/iOS용 앱이 있나요?

미스키 프로젝트에서는 이러한 모바일 OS를 위한 네이티브 앱을 개발하지 않고 있지만, 서드파티에서 만든 앱이 몇 가지 존재합니다.자세한 내용은 [여기](./apps)에서 확인하실 수 있습니다.<br>

다만, 서드파티 앱은 Misskey의 최신 기능에 대한 대응이 늦어질 수밖에 없으므로, 특별한 이유가 없다면 Misskey 공식 웹 클라이언트인 Misskey Web을 사용하는 것을 추천합니다.또한, 이 경우에도 사용료를 징수할 계획은 없습니다.자세한 내용은 [여기](/docs/for-users/stepped-guides/how-to-use-pwa/)에서 확인할 수 있습니다.

## Mastodon용 앱으로 로그인할 수 있나요?

Misskey는 Mastodon의 API와 호환되지 않기 때문에, 일부를 제외한 타사 Mastodon용 앱이나 웹 클라이언트 등에서는 Misskey를 사용할 수 없습니다.<br>
Misskey 공식 웹 클라이언트인 Misskey Web을 이용하세요.

## misskey.io는 Misskey 프로젝트의 공식 서버인가요?

misskey.io는 Misskey 공식 서버가 아니며, Misskey 프로젝트에도 포함되지 않습니다.misskey.io는 특정 테마 없이 범용적이며, 쉽게 등록할 수 있는 Misskey에서 가장 큰 규모의 서버입니다.

## 주식회사 미스키HQ와의 관계는?

주식회사 MisskeyHQ는 misskey.io의 운영을 목적으로 하는 회사입니다.따라서 Misskey 개발 프로젝트와 직접적인 관계는 없습니다.다만 미스키 프로젝트 리더인 슈이로(suuilo)도 임원으로 참여하고 있으며, 함께 미스키를 발전시켜 나가는 관계입니다.

## '미스키'라는 이름의 유래는 무엇인가요?

메인 개발자인 슈이로(syuilo)가 이름을 고민하던 중 우연히 듣게 된 메이앤(May'n)의 곡 'Brain Diver'의 가사에서 따왔습니다.

## 다른 Misskey, Pleroma 서버, Mastodon 서버 등의 사용자를 팔로우하려면 어떻게 해야 하나요?

메뉴에서 검색을 선택하고 사용자 계정을 아래 형식으로 입력합니다.사용자 계정은 사용자 이름과 사용자가 속한 서버 또는 서버의 호스트 이름을 포함합니다.미스키뿐만 아니라 Mastodon, Pleroma 등 많은 분산형 소프트웨어에서 다음과 같은 사용자 계정 형태가 일반적입니다.<br>

사용자 계정 형식: `@사용자 이름 @Misskey, Pleroma 서버 또는 Mastodon 서버의 호스트 이름`<br>
사용자 계정 예시: `@syuilo@misskey.io`<br>

사용자 계정의 형식은 모든 분산형 소프트웨어에서 공통적으로 사용되는 것은 아니지만, 이 형식을 통해 다양한 분산형 소프트웨어가 구현된 다른 서버나 서버의 사용자를 추적할 수 있습니다.

## 리노트를 삭제하려면 어떻게 해야 하나요?

리노트의 시간 표시 옆에 있는 "..." 를 누르고 '리노트 해제'를 선택합니다.를 누르고 '리노트 해제'를 선택합니다.<br>
Renote에 대한 자세한 내용은 [여기](../features/note/#renote)에서 확인하실 수 있습니다.

## 노트 내 URL의 미리보기를 표시하고 싶지 않습니다.

MFM(Markup language For Misskey)이라는 Misskey의 자체 마크업 언어에는 URL의 미리보기를 비활성화하는 구문이 있습니다.자세한 내용은 MFM 치트시트를 참고하세요.MFM 치트시트는 여러분이 속한 서버에서 다음 주소를 입력하면 볼 수 있습니다.`https://서버 호스트 이름/mfm-cheat-sheet`

## 사용자 지정 이모티콘을 추가, 편집, 삭제하고 싶습니다.

사용자 지정 이모티콘을 추가, 편집, 삭제할 수 있는 권한은 해당 서버의 관리자만 가질 수 있습니다.이를 원할 경우, 서버 관리자에게 직접 문의하시기 바랍니다.

## Bot을 개발하고 싶어요

Misskey API를 이용한 Bot 개발이 가능합니다.자세한 내용은 [여기](../../for-developers/api/)에서 확인할 수 있습니다.

## 노트의 번역 기능은 어떤 서비스를 사용하나요?

기계번역 서비스인 [DeepL 번역](https://www.deepl.com/)을 이용하고 있습니다.

## 서버를 만들었는데, 전기통신사업 신고를 해야 하나요?

### 짧은 답변

**비즈니스 목적**으로 운영한다면 **예**입니다.그렇지 않으면 **아니요**.

### 긴 답변

'사업자'의 정의는 [총무성 문서](https://www.soumu.go.jp/main_content/000477428.pdf)에 따르면 '서비스를 제공하고 그 대가로 요금을 징수하여 수익을 얻으려는 자'로 되어 있습니다.따라서 사업적으로 수익을 창출할 목적으로 서버를 운영하지 않는 한 신고가 필요하지 않습니다.따라서 기부금이나 광고 등으로 수익이 발생하더라도 서버 운영비 등을 충당하기 위한 수익이라면 신고대상 사업자에 해당하지 않습니다.(총무성에 확인)<br>
자세한 내용은 총무성의 [전기통신사업 진출 매뉴얼](https://www.soumu.go.jp/main_content/000477428.pdf) 등의 자료를 참고하시거나 총무성에 문의하시기 바랍니다.

## 이름에 'Misskey'가 포함된 서비스를 공개해도 되나요?

'Misskey'는 Misskey 프로젝트의 등록상표(일본)이지만, 이름에 'Misskey'가 포함된(예: Misskey Tools 등) 서비스를 공개해도 문제가 되지 않습니다.
또한, 이 경우에도 사용료를 징수할 계획은 없습니다.
