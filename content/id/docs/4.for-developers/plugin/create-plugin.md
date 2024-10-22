# Pembuatan Plugin

Fitur plugin dalam klien Misskey Web memperbolehkan kamu untuk memperluas fungsionalitas klien dan menambah fitur lain.
Dokumen ini akan menjelaskan bagaimana cara membuat plugin Misskey.

## プラグインの例

以下に完全なプラグインの例を示します。このプラグインは、[`Plugin:register_post_form_action`](/docs/for-developers/plugin/plugin-api-reference/#pluginregister_post_form_actiontitle-fn)を使用して、投稿フォームに「フグパンチボタン」を追加するものです。

このプラグインをインストールすると、投稿フォーム上のプラグインメニューに「フグパンチ」の項目が追加されます。クリックすると、投稿フォーム上のテキストに `ﾌｸﾞﾊﾟﾝﾁ!!!!🐡( '-' 🐡 )` が追加されます。

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
    // ノートの中身がない場合はフグパンチに置き換え
    rewrite('text', fugu)
  } else {
    // ノートの中身がある場合は冒頭にフグパンチを追加して改行
    rewrite('text', `{fugu}{Str:lf}{note.text}`)
  }
})
```

## AiScript

Plugin merupakan script yang dituliskan menggunakan bahasa pemrograman AiScript.

## Metadata

Plugin harus mendefinisikan metadata plugin dengan menggunakan bawaan fitur sematan metadata AiScript.Contoh Metadata dapat dilihat pada kode di bawah ini.

```AiScript
/// @ 0.12.4
### {
  name: "プラグイン名"
  version: "4.2.1"
  author: "Penulis"
  description: "Deskripsi"
}
```

Metadata merupakan objek yang berisi properti di bawah ini.

### name

Nama Plugin

### author

Pembuat Plugin

### version

Versi Plugin.Mohon tentukan nilai numerik.

### description

Deskripsi Plugin

### permissions

Izin yang dibutuhkan oleh plugin.Digunakan ketika membuat permintaan ke Misskey API.

APIのリクエスト方法については、[AiScript Misskey拡張API リファレンス](/docs/for-developers/plugin/plugin-api-reference/)をご覧ください。

:::tip

permissionの一覧は[こちら](/docs/for-developers/api/permission/)をご覧ください。

:::

### config

Objek merepresentasikan informasi konfigurasi plugin.
`key` merupakan nama konfigurasi dan `value` berisi properti di bawah ini.

#### type

String yang merepresentasikan tipe dari nilai konfigurasi.Pilih salah satu dari berikut.
string number boolean

#### label

Nama dari konfigurasi yang ditampilkan ke pengguna

#### description

Deskripsi konfigurasi

#### default

Nilai bawaan dari konfigurasi

## API

Misskey Web menyediakan API untuk plugin yang mana dapat digunakan dan dimanfaatkan untuk memperluas fungsionalitas dari klien.
Untuk melihat API yang tersedia, mohon merujuk pada [Referensi API Plugin](./plugin-api-reference/)

## プラグインを配布する

v2023.11.0以降では、あなたのウェブサイトからワンクリックでプラグインを直接インストールできるようになっています。

プラグインのインストール機能を提供する場合は、あなたのサイト上にAPIを実装する必要があります。詳しくは[こちら](../publish-on-your-website.md)をご覧ください。
