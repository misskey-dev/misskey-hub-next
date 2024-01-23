---
description: このガイドではMisskeyのインストール・セットアップ方法について解説します。
---

# Panduan Pemasangan dan Penyetelan Misskey

Panduan ini akan menjelaskan bagaimana cara memasang dan menyetel peladen Misskey.

:::danger

Jangan pernah mengubah nama domain (hostname) peladen ketika kamu sudah mulai menggunakannya!

:::

:::tip{label='前提条件'}

#### Mohon pasang dan setel aplikasi berikut:

- **[Node.js](https://nodejs.org/en/)** (versi 20.4.x atau di atasnya)
- **[PostgreSQL](https://www.postgresql.org/)** (versi 15 atau di atasnya)
- **[Redis](https://redis.io/)**
- **[FFmpeg](https://www.ffmpeg.org/)**

Jika kamu menggunakan Debian/Ubuntu, kamu harus memasang paket `build-essential`.

#### `corepack` harus dinyalakan

```sh
sudo corepack enable
```

:::

## Buat pengguna

Menjalankan Misskey sebagai root bukanlah ide yang bagus. Oleh karena itu, kita akan membuat pengguna baru untuk menangani masalah tersebut. Sebagai contoh dalam distribusi Debian:

```sh
adduser --disabled-password --disabled-login misskey
```

## Pasang Misskey

```sh
sudo -iu misskey
git clone --recursive https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
```

## Atur

Salin berkas `.config/example.yml` dan ubah namanya ke `default.yml`.

```sh
cp .config/example.yml .config/default.yml
```

Sunting `default.yml`.

## Bangun dan inisialisasi

Perintah berikut akan membangun Misskey dan menginisialisasi basis data. Proses ini akan memakan waktu sesaat.

```sh
NODE_ENV=production pnpm run build
pnpm run init
```

## Jalankan

Selamat!Kamu sudah dapat memulai peladen Misskey dengan perintah berikut.

```sh
NODE_ENV=production pnpm run start
```

GLHF✨

::::g-details{summary="Menjalankan dengan systemd"}

Buat berkas layanan systemd di sini

`/etc/systemd/system/misskey.service`

Sunting, tempelkan konfigurasi berikut dan simpan:

```ini
[Unit]
Description=Misskey daemon

[Service]
Type=simple
User=misskey
ExecStart=/usr/bin/npm start
WorkingDirectory=/home/misskey/misskey
Environment="NODE_ENV=production"
TimeoutSec=60
StandardOutput=journal
StandardError=journal
SyslogIdentifier=misskey
Restart=always

[Install]
WantedBy=multi-user.target
```

:::warning

Apabila kamu ingin menggunakan Misskey dengan port di bawah 1024 pada sistem operasi CentOS, kamu perlu mengubah `ExecStart=/usr/bin/sudo /usr/bin/npm start`.

:::

Nyalakan ulang systemd dan nyalakan layanan misskey.

```sh
sudo systemctl daemon-reload
sudo systemctl enable misskey
```

Jalankan layanan misskey.

```sh
sudo systemctl start misskey
```

:::tip

Kamu dapat mengecek apakah layanannya berjalan dengan memasukkan perintah `systemctl status misskey`.

:::

::::

## Panduan memutakhirkan peladen Misskey ke versi terbaru

:::warning

Ketika memutakhirkan, pastikan mengecek [catatan rilisan](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md) untuk mengetahui lebih awal akan perubahan ataupun tambahan pekerjaan yang nantinya dibutuhkan (biasanya tidak perlu).

:::

Lakukan `pull` pada branch `master`, pasang, bangun dan migrasi basis data:

```sh
git checkout master
git pull
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
NODE_ENV=production pnpm run build
pnpm run migrate
```

Perintah tersebut akan memakan waktu sesaat bergantung dengan konten dari pemutakhiran dan ukuran basis data.

Setelah pemutakhiran selesai, mulai ulang proses Misskey.

```sh
sudo systemctl restart misskey
```

:::tip

Apabila kamu menemukan masalah pada saat memutakhirkan, coba jalankan perintah berikut:

- `pnpm run clean` atau `pnpm run clean-all`
- `pnpm rebuild`
  :::

:::
