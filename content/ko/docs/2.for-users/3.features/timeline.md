# 타임라인

타임라인은 [노트](./note)가 시간순으로 표시되는 기능입니다.

## 홈

내가 팔로우하고 있는 사용자의 게시물이 흐릅니다.HTL로 표기합니다.HTL로 표기합니다.

## 로컬

모든 로컬 사용자의 '홈'으로 지정되지 않은 게시물이 흐릅니다.LTL로 표기합니다.LTL로 표기합니다.

## 소셜

내가 팔로우하고 있는 사용자의 게시물과 모든 로컬 사용자의 '홈'으로 지정되지 않은 게시물이 흐릅니다.STL로 표기합니다.STL로 표기합니다.

## 글로벌

모든 로컬 사용자의 '홈'이 지정되지 않은 게시물과 서버에 도착한 모든 원격 사용자의 '홈'이 지정되지 않은 게시물이 흐릅니다.GTL로 표기합니다.GTL로 표기합니다.

## 비교

<table>
    <thead>
        <tr>
            <th scope="col" rowspan="2">소스</th>
            <th scope="col" rowspan="2">공개 범위</th>
            <th scope="col" colspan="4">타임라인</th>
        </tr>
        <tr>
            <th scope="col">홈</th>
            <th scope="col">로컬</th>
            <th scope="col">소셜</th>
            <th scope="col">글로벌</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row" rowspan="3">로컬 (팔로우)</th>
            <th scope="row">공개</th>
            <td>✔</td>
            <td>✔</td>
            <td>✔</td>
            <td>✔</td>
        </tr>
        <tr>
            <th scope="row">홈</th>
            <td>✔</td>
            <td></td>
            <td>✔</td>
            <td></td>
        </tr>
        <tr>
            <th scope="row">팔로워</th>
            <td>✔</td>
            <td></td>
            <td>✔</td>
            <td></td>
        </tr>
        <tr>
            <th scope="row" rowspan="3">리모트 (팔로우)</th>
            <th scope="row">공개</th>
            <td>✔</td>
            <td></td>
            <td>✔</td>
            <td>✔</td>
        </tr>
        <tr>
            <th scope="row">홈</th>
            <td>✔</td>
            <td></td>
            <td>✔</td>
            <td></td>
        </tr>
        <tr>
            <th scope="row">팔로워</th>
            <td>✔</td>
            <td></td>
            <td>✔</td>
            <td></td>
        </tr>
        <tr>
            <th scope="row" rowspan="3">로컬 (팔로우 안함)</th>
            <th scope="row">공개</th>
            <td></td>
            <td>✔</td>
            <td>✔</td>
            <td>✔</td>
        </tr>
        <tr>
            <th scope="row">홈</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th scope="row">팔로워</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th scope="row">리모트 (팔로우 안함)</th>
            <th scope="row">공개</th>
            <td></td>
            <td></td>
            <td></td>
            <td>✔</td>
        </tr>
    </tbody>
</table>
