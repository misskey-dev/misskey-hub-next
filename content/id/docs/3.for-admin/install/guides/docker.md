---
description: 'Panduan ini akan menjelaskan tentang bagaimana cara memasang dan menyetel instansi Misskey dengan menggunakan Docker Compose.'
---

# Buat instansi Misskey dengan Docker Compose

Panduan ini akan menjelaskan tentang bagaimana cara memasang dan menyetel instansi Misskey dengan menggunakan Docker Compose.

:::danger

Jangan pernah mengubah nama domain (hostname) instansi peladen ketika kamu sudah mulai menggunakannya!

:::

:::tip{label='前提条件'}

- `docker` dan `dockercompose` terpasang

:::

## Mengunduh repositori Misskey

```sh
git clone -b master https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
```

## Mengatur penyetelan Misskey

Salin berkas konfigurasi dengan menjalankan perintah berikut:

```sh
cp .config/docker_example.yml .config/default.yml
cp .config/docker_example.env .config/docker.env
cp ./docker-compose_example.yml ./docker-compose.yml
```

Sunting `default.yml` dan `docker.env` sesuai dengan instruksi yang terdapat di dalam berkas.\
Pastikan kembali penyetelan telah benar dan sunting `docker-compose.yml` bila perlu.(Misal: Apabila kamu ingin mengganti port peladen dengan nomor port yang berbeda).

## Bangun dan inisialisasi

Perintah berikut akan membangun Misskey dan menginisialisasi basis data. Proses ini akan memakan waktu sesaat.

```shell
sudo docker compose build
sudo docker compose run --rm web pnpm run init
```

## Jalankan

Selamat!Kamu sudah dapat memulai peladen Misskey dengan menjalankan perintah berikut.

```sh
sudo docker compose up -d
```

GLHF✨

## Panduan memutakhirkan peladen Misskey ke versi terbaru

:::warning

Ketika memutakhirkan, pastikan untuk mengecek [catatan rilisan](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md) agar dapat mengetahui lebih awal akan perubahan ataupun tambahan pekerjaan yang nantinya dibutuhkan (biasanya tidak perlu).

:::

```sh
git stash
git checkout master
git pull
git submodule update --init
git stash pop
sudo docker compose build
sudo docker compose stop && sudo docker compose up -d
```

Perintah tersebut di atas akan memakan waktu sesaat bergantung dengan konten dari pemutakhiran dan ukuran basis data.

## Bagaimana cara mengeksekusi perintah CLI di dalam docker?

```sh
sudo docker compose run --rm web node packages/backend/built/tools/foo bar
```
