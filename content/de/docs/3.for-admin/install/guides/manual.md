---
description: Diese Anleitung erklärt, wie man Misskey installiert und einrichtet.
---

# Manuelles Setup von Misskey

Diese Anleitung erklärt, wie man Misskey installiert und einrichtet.

:::danger

Ändere niemals die Domain oder den Hostnamen eines Servers, sobald er in Gebrauch genommen wurde!

:::

:::tip{label='前提条件'}

#### Die folgende Software sollte installiert und eingerichtet sein:

- **[Node.js](https://nodejs.org/en/)** (Version 20.4.x oder höher)
- **[PostgreSQL](https://www.postgresql.org/)** (Version 15 oder höher)
- **[PostgreSQL](https://www.postgresql.org/)** (v15以上)
- **[Redis](https://redis.io/)**
- **[FFmpeg](https://www.ffmpeg.org/)**

Wenn Debian/Ubuntu verwendet wird, sollte das `build-essential`-Paket installiert werden.

:::

## Benutzer(in) anlegen

Es wird empfohlen, Misskey nicht als root-Benutzer auszuführen. Stattdessen sollte ein neuer Benutzer erstellt werden. Ein Beispiel für Debian:

```sh
adduser --disabled-password --disabled-login misskey
```

## Misskey Installation und Wartung

```sh
sudo -iu misskey
git clone --recursive https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
```

## Konfiguration

Kopiere die Beispieldatei `.config/example.yml` und benenne sie in `default.yml` um.

```sh
cp .config/example.yml .config/default.yml
```

Bearbeite die `default.yml` gemäß den Anweisungen in der Datei.

## Build und Initialisierung

Mit dem folgenden Befehl wird Misskey gebaut und die Datenbank initialisiert. Dies kann einige Zeit in Anspruch nehmen.

```sh
NODE_ENV=production pnpm run build
pnpm run init
```

## Ausführen

Gut gemacht!Mit dem folgenden Befehl kannst du Misskey starten.

```sh
NODE_ENV=production pnpm run start
```

GLHF✨

::::g-details{summary="systemdを用いた管理"}

Erstellen einer systemd-Dienstdatei

`/etc/systemd/system/misskey.service`

Öffne die Datei mit einem Editor, füge den folgenden Code ein und speichere sie:

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

Falls Misskey auf CentOS mit einem Port unter 1024 verwendet wird, muss die Zeile `ExecStart=/usr/bin/sudo /usr/bin/npm start` geändert werden.

:::

Systemd neu laden und den Misskey-Dienst aktivieren

```sh
sudo systemctl daemon-reload
sudo systemctl enable misskey
```

Erstellen eines Misskey-Servers

```sh
sudo systemctl start misskey
```

:::tip

Gib `systemctl status misskey` ein, um den Status des Dienstes zu überprüfen.

:::

::::

## Wie man Misskey aktualisiert

:::warning

Stelle bei einem Update sicher, dass du die [Release-Notes](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md) liest, um Änderungen und eventuell notwendige zusätzliche Schritte (in den meisten Fällen nicht erforderlich) im Voraus zu verstehen.

:::

Die master-Branch erneut pullen, Installation, Build und Datenbankmigration durchführen:

```sh
git checkout master
git pull
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
NODE_ENV=production pnpm run build
pnpm run migrate
```

Die Dauer des Updates kann je nach Umfang der Änderungen und der Größe der Datenbank variieren.

Nach Abschluss des Updates bitte den Misskey-Prozess neu starten.

```sh
sudo systemctl restart misskey
```

:::tip

Falls während des Builds oder Starts Fehler auftreten, bitte die folgenden Befehle ausprobieren:

- `pnpm run clean` oder `pnpm run clean-all`
- `pnpm rebuild`

:::
