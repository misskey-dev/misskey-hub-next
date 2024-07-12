# Lini masa

タイムラインは、[ノート](/docs/for-users/features/note/)が時系列で表示される機能です。
タイムラインには以下で示す種類があり、種類によって表示されるノートも異なります。
なお、タイムラインの種類によってはサーバーにより無効になっている場合があります。

## Beranda

自分のフォローしているユーザーの投稿が流れます。HTLと略されます。

## Lokal

全てのローカルユーザーの「ホーム」指定されていない投稿が流れます。LTLと略されます。

## Sosial

自分のフォローしているユーザーの投稿と、全てのローカルユーザーの「ホーム」指定されていない投稿が流れます。STLと略されます。

## Global

全てのローカルユーザーの「ホーム」指定されていない投稿と、サーバーに届いた全てのリモートユーザーの「ホーム」指定されていない投稿が流れます。GTLと略されます。

## Perbandingan

<table>
    <thead>
        <tr>
            <th scope="col" rowspan="2">ソース</th>
            <th scope="col" rowspan="2">Visibilitas</th>
            <th scope="col" colspan="4">Lini masa</th>
        </tr>
        <tr>
            <th scope="col">Beranda</th>
            <th scope="col">Lokal</th>
            <th scope="col">Sosial</th>
            <th scope="col">Global</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row" rowspan="3">ローカル（フォロー）</th>
            <th scope="row">Publik</th>
            <td>✔</td>
            <td>✔</td>
            <td>✔</td>
            <td>✔</td>
        </tr>
        <tr>
            <th scope="row">Beranda</th>
            <td>✔</td>
            <td></td>
            <td>✔</td>
            <td></td>
        </tr>
        <tr>
            <th scope="row">Pengikut</th>
            <td>✔</td>
            <td></td>
            <td>✔</td>
            <td></td>
        </tr>
        <tr>
            <th scope="row" rowspan="3">リモート（フォロー）</th>
            <th scope="row">Publik</th>
            <td>✔</td>
            <td></td>
            <td>✔</td>
            <td>✔</td>
        </tr>
        <tr>
            <th scope="row">Beranda</th>
            <td>✔</td>
            <td></td>
            <td>✔</td>
            <td></td>
        </tr>
        <tr>
            <th scope="row">Pengikut</th>
            <td>✔</td>
            <td></td>
            <td>✔</td>
            <td></td>
        </tr>
        <tr>
            <th scope="row" rowspan="3">ローカル（未フォロー）</th>
            <th scope="row">Publik</th>
            <td></td>
            <td>✔</td>
            <td>✔</td>
            <td>✔</td>
        </tr>
        <tr>
            <th scope="row">Beranda</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th scope="row">Pengikut</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th scope="row">リモート（未フォロー）</th>
            <th scope="row">Publik</th>
            <td></td>
            <td></td>
            <td></td>
            <td>✔</td>
        </tr>
    </tbody>
</table>
