---
description: Diese Anleitung erklärt, wie man Misskey mit Docker einrichtet.
---

# Misskey-Setup mit Docker Compose

Diese Anleitung erklärt, wie man Misskey mit Docker Compose einrichtet.

:::danger

Ändere nicht die Datenbank für einen Domain- oder Hostnamen eines Servers, den du bereits verwendest!

:::

:::tip{label='前提条件'}

- Docker und Docker Compose müssen installiert sein.

:::

## Abrufen der Repo

```sh
git clone -b master https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
```

## Konfiguration

Mit dem folgenden Befehl werden Beispielkonfigurationsdateien kopiert.

```sh
cp .config/docker_example.yml .config/default.yml
cp .config/docker_example.env .config/docker.env
cp ./compose_example.yml ./compose.yml
```

Bearbeite `default.yml` und `docker.env` gemäß den Anweisungen in den Dateien.\
Bearbeite `compose.yml` nach Bedarf.(Zum Beispiel, wenn du den Port ändern möchtest)

## Build und Initialisierung

Mit dem folgenden Befehl wird Misskey gebaut und die Datenbank initialisiert. Dies kann einige Zeit in Anspruch nehmen.

```shell
sudo docker compose build
sudo docker compose run --rm web pnpm run init
```

## Ausführen

Gut gemacht!Mit dem folgenden Befehl kannst du Misskey starten.

```sh
sudo docker compose up -d
```

GLHF✨

## Wie man Misskey aktualisiert

:::warning

Stelle bei einem Update sicher, dass du die [Release-Notes](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md) liest, um Änderungen und eventuell notwendige zusätzliche Schritte (in den meisten Fällen nicht erforderlich) im Voraus zu verstehen.

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

Die Dauer des Updates kann je nach Umfang der Änderungen und der Größe der Datenbank variieren.

## So führst du CLI-Befehle aus:

```sh
sudo docker compose run --rm web node packages/backend/built/tools/foo bar
```
