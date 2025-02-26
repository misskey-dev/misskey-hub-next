# Form Bagikan

Ketika kamu membuka `/share` di Misskey Web, kamu membuka form submisi bagikan.Form bagikan ini berguna jika kamu ingin pengguna membagikan konten dari halamanmu dengan Misskey dari halaman web eksternal.

Kamu dapat menentukan berbagai opsi di dalam URL, termasuk konten yang dibagikan sebagai parameter kueri.

## Parameter Kueri

:::tip

Semua parameter merupakan **opsional** dan tidak wajib.

:::

| Nama    | Deskripsi                                                                                                                                    |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `title` | Judul,[ … ] akan dimasukkan sebelum badan teks utama dalam tanda kurung. |
| `text`  | badan teks utama                                                                                                                             |
| `url`   | URL.dimasukkan setelah badan teks utama.                                                                     |

### Informasi Balasan

Kamu dapat membuat catatan menjadi balasan ke catatan yang diberikan dengan menentukan salah satu dari berikut.

| Nama       | Deskripsi                                                                          |
| ---------- | ---------------------------------------------------------------------------------- |
| `replyId`  | ID dari catatan yang kamu balas                                                    |
| `replyUri` | URL untuk membalaske (tentukan objek catatan dari peladen luar) |

### Informasi Renote

Kamu dapat membuat catatan menjadi renote ke catatan yang diberikan dengan menentukan salah satu dari berikut.

| Nama        | Deskripsi                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------- |
| `renoteId`  | ID dari catatan yang ingin direnote                                                               |
| `renoteUri` | URL dari catatan yang ingin direnote(tentukan objek catatan dari peladen luar) |

### Lingkup Publikasi

Opsi berikut memungkinkan kamu untuk memilih lingkup publikasi.

| Nama             | Deskripsi                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| `visibility`     | salah satu dari `public`, `home`, `followers`, `specified`                                      |
| `localOnly`      | 0(false) atau 1(true)                                     |
| `visibleUserIds` | ID pengguna target (dipisahkan dengan koma)                                  |
| `visibleAccts`   | [acct](../resources/glossary/#acct) pengguna target (dipisahkan dengan koma) |

:::warning

Jika `visibility` diatur ke `specified`, sebaiknya `visibleUserIds` atau `visibleAccts` harus diatur juga.

:::

### Lampiran Berkas

Kamu dapat menentukan lampiran berkas dengan opsi di bawah berikut.

| Nama      | Deskripsi                                                                         |
| --------- | --------------------------------------------------------------------------------- |
| `fileIds` | ID dari berkas yang ingin dilampirkan (dipisahkan dengan koma) |

## Misskey Hubの共有フォーム中継サービスについて

<a name="hub-share-disclaimer" id="hub-share-disclaimer"></a>

新Misskey Hubでは、Misskeyのシェアボタンの設置にかかる煩雑な手間を減らすために、共有フォームの中継サービスを提供しています。\
こちらのサービスは、無料でどなたでもお使いいただけます。

今までの共有フォームのリンクの各サーバーのドメイン部分を `misskey-hub.net` に変更するだけで、様々なMisskeyサーバーへの共有リンクへと進化させることができます！

:::tip

[共有ボタンジェネレーター](/tools/share-link-generator/) も併せてお使いください。

:::

:::warning

共有フォーム中継サービス（以下、「本サービス」という）はWebサイト管理者の便宜のためにMisskey Project（以下、「当方」という）が無償・無保証で提供する機能です。本サービスを利用したこと、または何らかの原因によりこれをご利用できなかったことにより生じたいかなる損害について、当方は一切の責任を負いません。

:::

### 基本のパラメータ

基本的に上記で紹介されているパラメーターをそのままお使いいただけますが、ユーザーIDやファイルIDなど、 **各サーバーに依存するパラメーターは使用できません。** それらが指定されていた場合、Misskey Hub上で削除されます。

### 独自機能

#### おすすめサーバー機能

URLパラメータ `manualInstance` にMisskeyサーバーのドメインを入力することで、「シェア元Webサイトからのおすすめ」として、別枠でそのサーバーへのリンクを設置することができます。ご自身のサーバーに誘導する際などにお使いいただけます。

:::warning

「おすすめサーバー機能」はWebサイト管理者の便宜のために設置してある機能であり、当方が「シェア元Webサイトからのおすすめ」欄にあるサーバーをおすすめしているものではございません。

「シェア元Webサイトからのおすすめ」から遷移したサーバーを利用・登録したことに起因するいかなる損害・不利益について、当方では責任を負いかねます。

:::
