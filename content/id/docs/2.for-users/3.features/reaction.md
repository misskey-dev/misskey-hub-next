# Reaksi

Fitur ini memungkinkan kamu untuk mengutarakan reaksimu kepada catatan orang lain dengan mudah melalui penambahan emoji.
Untuk mereaksi di Misskey Web, klik ikon + pada catatan untuk menampilkan jendela pengambil emoji dan pilih emoji.
Kamu juga dapat mereaksi menggunakan [emoji kustom](./custom-emoji.md).

## Mengubahsuaikan Pengambil Reaksi

Dalam Misskey Web kamu dapat memilih emoji mana yang seharusnya muncul di dalam pengambil dan mengubah urutan kemunculan mereka.
Kamu dapat mengatur ini di bagian "Reaksi" dalam menu pengaturan.

## Reaksi ke Postingan Luar Peladen

Karena reaksi merupakan fitur asli dari Misskey, sering kali aktivitas reaksi yang dikirimkan ke instansi peladen lain akan dikirimkan sebagai "Suka" kecuali instansi peladen luar mendukung fitur reaksi tersebut.Biasanya, "Suka" dari ActivityPub diimplementasikan sebagai favorit.

## Reaksi dari Instansi Peladen Luar

Karena Misskey tidak memiliki suka, "Suka" dari instansi remote akan ditampilkan sebagai reaksi '👍'.

## Lihat Semua Reaksimu

Dalam Misskey Web, kamu dapat melihat daftar dari semua reaksi yang telah kamu buat dengan membuka tab "Reaksi" di halaman profilmu.
Kamu juga dapat memilih untuk membuat daftar ini menjadi publik di pengaturan.

## リアクションの受け入れ

ノートの投稿時に、そのノートにおいて受け入れるリアクションの種類を制限することができます。

- 全て: 全てのリアクションを許可します
- 全て（リモートはいいねのみ）: 自分のサーバーからのリアクションは全て許可しますが、他のサーバーからのリアクションはすべていいね（❤）として受け入れます
- 非センシティブのみ: 全てのリアクションを許可しますが、自分のサーバーからのリアクションでは「センシティブ」としてフラグ付けされたカスタム絵文字を使ってリアクションできなくなります
- 非センシティブのみ（リモートはいいねのみ）: 自分のサーバーからのリアクションでは「センシティブ」としてフラグ付けされたカスタム絵文字を使ってリアクションできなくなり、他のサーバーからのリアクションはすべていいね（❤）として受け入れます
- いいねのみ: いいね（❤）以外でリアクションできません

なお、この際指定したリアクションの受け入れは自分のサーバーにおいて有効になります。例えば、リアクションの受け入れを「いいねのみ」にしたノートを他のサーバーで閲覧すると、そのサーバー上では絵文字リアクションが付与されているかもしれません。
