# 노트

노트는 Misskey에 게시되는 글, 파일, 설문 등을 포함한 콘텐츠로, Misskey의 핵심 개념입니다.또한 그 노트를 작성하는 행위 자체를 노트라고 합니다.

:::tip

노트의 명칭은 영어로 '짧은 기록'을 뜻하는 Note에서 따온 것입니다.

:::

노트가 생성되면 [타임라인](./timeline)에 추가되어 자신의 [팔로워](./follow)와 서버의 사용자들이 볼 수 있게 됩니다.

노트에는 [리액션](./reaction)을 할 수 있습니다.또한 답장이나 인용도 가능합니다.

메모를 [즐겨찾기](./favorite)에 등록하면 나중에 쉽게 찾아볼 수 있습니다.

## 노트 작성하기

Misskey Web에서 메모를 작성하려면 화면 상단에 있는 연필 모양의 버튼을 눌러 작성 양식을 엽니다.작성 양식에 내용을 입력하고 '노트' 버튼을 누르면 노트가 작성됩니다.
노트에는 이미지, 동영상 등 임의의 파일이나 [설문](./poll)을 첨부할 수 있습니다.또한 본문에는 [MFM](./mfm)을 사용할 수 있으며, [멘션](./mention)이나 [해시태그](./hashtag)를 포함할 수도 있습니다.
그 외에도 CW, 공개 범위 등의 설정도 가능합니다(자세한 내용은 아래 참조).

:::tip

Misskey Web에서는 컴퓨터 클립보드에 이미지 데이터가 있는 상태에서 양식 내 텍스트 상자에 붙여넣기하면 해당 이미지를 첨부할 수 있습니다.

:::

:::tip

Misskey Web에서는 텍스트 박스 안에서 <kbd class="key">Ctrl + Enter</kbd>를 눌러서 글을 올릴 수도 있습니다.

:::

## 리노트

이미 있는 노트를 인용하거나 그 노트를 새로운 노트로 공유하는 행위, 그리고 그로 인해 생성된 노트를 리노트(Renote)라고 합니다.
자신이 팔로우하는 사용자의 마음에 드는 노트를 자신의 팔로워에게 공유하고 싶을 때, 또는 과거의 자신의 노트를 다시 공유하고 싶을 때 사용합니다.
같은 노트에 대해 무제한으로 리노트를 할 수 있지만, 너무 연속적으로 사용하면 성가신 경우도 있으니 주의해야 합니다.

:::warning

공개 범위가 팔로워나 다이렉트 노트는 리노트할 수 없습니다.

:::

Misskey Web에서 리노트를 삭제하려면 리노트 시간 표시 옆에 있는 "..." 를 누르고 '리노트 해제'를 선택합니다.

## CW

Contents Warning의 줄임말로, 노트의 내용을 열람자의 조작 없이 표시하지 않도록 할 수 있는 기능입니다.주로 장황한 내용을 숨기거나 스포일러 방지 등에 사용할 수 있습니다.
Misskey Web에서 CW를 설정하려면 양식의 '내용 숨기기' 버튼(눈 모양 아이콘)을 누릅니다.그러면 새로운 입력란이 나타나며, 여기에 내용 요약을 작성합니다.

## 공개 범위

노트마다 해당 노트가 공개되는 범위를 설정할 수 있습니다.
Misskey Web에서 공개 범위를 설정하려면 폼의 '노트' 버튼 왼쪽에 있는 아이콘을 누릅니다.
공개 범위에는 다음과 같은 종류가 있습니다.

### 전체 공개

노트는 모든 사람에게 공개되며, 서버의 모든 타임라인(홈 타임라인, 로컬 타임라인, 소셜 타임라인, 글로벌 타임라인)에 노트가 표시됩니다.

:::warning

계정이 [침묵](./silence) 상태일 때는 이 공개 범위를 사용할 수 없습니다.

:::

### 홈

노트는 모든 사람에게 공개되지만, 팔로워를 제외한 로컬 타임라인, 소셜 타임라인, 글로벌 타임라인에는 노트가 흐르지 않습니다.

### 팔로워

자신의 팔로워에게만 노트를 공개합니다.팔로워의 모든 타임라인에 흐르게 됩니다.

### 다이렉트

지정한 사용자에게만 노트를 공개합니다.지정한 사용자의 모든 타임라인으로 흐릅니다.

### "로컬 전용" 옵션

이 옵션을 활성화하면 원격으로 노트를 연합하지 않습니다.

### 공개 범위 비교

<table>
	<tbody><tr><th></th><th>전체 공개</th><th>홈</th><th>팔로워</th><th>다이렉트</th></tr>
	<tr><th>팔로워의 LTL/STL/GTL</th><td>✔</td><td>✔</td><td>✔</td><td></td></tr>
	<tr><th>팔로워가 아닌 경우의 LTL/STL/GTL</th><td>✔</td><td></td><td></td><td></td></tr>
</tbody></table>

## 프로필에 고정

메모를 핀으로 고정하면 사용자 페이지에 해당 메모를 항상 표시할 수 있습니다.
Misskey Web에서 고정하려면 노트의 메뉴를 열고 '고정'을 선택하면 됩니다.

:::tip

여러 개의 노트를 동시에 핀으로 고정할 수도 있습니다.

:::

## 지켜보기

사용자가 새로운 노트를 게시할 때 알림을 보낼 수 있습니다.사용자 페이지를 열고 팔로우 버튼 옆의 상세 버튼을 선택한 후 '게시물 알림'을 클릭하여 활성화합니다.
