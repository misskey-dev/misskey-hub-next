# Misskey install shell script v3.0.0

Shell-Skript, um Misskey einfach zu installieren!

Misskey ganz einfach auf dem Ubuntu-Server installieren, indem du ein paar Fragen beantwortest!

Ein "Update-Script" steht ebenfalls zur Verfügung.

[Mit Version12 durchstarten!](https://github.com/joinmisskey/bash-install/blob/a096e874f93d493aa68975a31be9ce12d644e767/README.md)

## Vorbereitung

1. Domain
2. Ubuntu Server
3. Ein Cloudflare-Konto (empfohlen)

:::danger

Erstellen die Datenbank nicht unter einer Serverdomäne/einem Hostnamen neu, der bereits genutzt wird!

:::

Die Anzahl der Authentifizierungsversuche von Let’s Encrypt sind begrenzt. Überprüfe bitte sorgfältig die Netzwerk- und DNS-Einstellungen deines Servers, wir mit der Instalation fortfahren...

## Cloudflare-Einstellungen

Um Cloudflare zu verwenden, stelle sicher, dass die Cloudflare-Domäne eingerichtet ist, bevor es weitergeht!\
Der Nameserver(DNS) kann bis zu 3 Tage brauchen, bis die Änderung in Kraft tritt.

Gehe zum Einrichten von **nginx** und **Cloudflare** zu den **Cloudflare-Einstellungen**.

- DNS konfigurieren
- SSL/TLS-Einstellungen den Verschlüsselungsmodus auf „Vollständig“

## Aktionen

### 1. SSH

Melde dich über SSH in deinem Server an.\
(Sollte es sich um einen Server-Desktop handeln, öffne eine Shell.).

### 2. Einrichten einer Umgebung

Aktualisiere alle Pakete und starte neu.

```sh
sudo apt update; sudo apt full-upgrade -y; sudo reboot
```

### 3. Mit der Installation beginnen

Stelle eine Verbindung via SSH her und beginne Misskey zu installieren

Wir empfehlen, vor der Installation die [Tipps](#tips) zu lesen.

```sh
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/ubuntu.sh -O ubuntu.sh; sudo bash ubuntu.sh
```

Ersetze example.com durch deine eigene Domain

### 4. Update

Wir haben ein Update-Skript implementiert.

Das Update-Skript aktualisiert **nicht** deine Linux-Umgebung.Beachte die CHANGELOG (Japanisch) und das [GitHub-Release (Englisch)](https://github.com/joinmisskey/bash-install/releases) und führe die entsprechenden Migrationsvorgänge durch.

Lade die Repository herunter

```sh
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/update.ubuntu.sh -O update.sh
```

Führe das Script dann aus, wenn du ein Update installieren möchtest.

```sh
sudo bash update.sh
```

- In der systemd-Umgebung kann das System mit der Option „-r“ aktualisiert und neu gestartet werden.
- In einer Docker-Umgebung kannst du den aktualisierten Repository-Namen:Tag-Namen als Variabel angeben.

## Das Script läuft auf folgenden verifizierten Umgebungen

### Oracle Cloud Infrastructure

Dieses Skript funktioniert für beide Formen, die im Always Free-Dienst von Oracle Cloud Infrastructure angeboten werden.

- VM.Standard.E2.1.Micro (AMD)
- VM.Standard.A1.Flex (ARM) [1OCPU RAM6GB oder besser]

Stelle sicher, das iptables verwendet wird.

## Fehlermeldungen und PR's sind hier Willkommen

Wenn es in der oben genannten Umgebung nicht funktioniert, liegt möglicherweise ein Fehler vor.Wir wären dankbar, wenn das Problem mithilfe der Issue-Funktion von GitHub gemeldet wird und dabei die bei der Installation angegebenen Bedingungen angeben werden können.

Dezeit ist es schwierig, Support für andere als die oben aufgeführten Umgebungen bereitzustellen. Wenn wir jedoch weitere Informationen zur Situation haben, können wir das Problem möglicherweise lösen.

Funktionsvorschläge nehmen wir ebenfalls gerne an.

# Tipps

So wählst du die richtigen Optionen & Spezifikationen aus.

## Systemd oder Docker?

Seit Version1 kann zwischen Docker und Systemd gewählt werden.

Obwohl es Docker heißt, wird nur **Misskey auf Docker ausgeführt**. Redis, Postgres usw. werden direkt auf dem Host ausgeführt.\
[Für Informationen, wie man mit Docker-Compose alles zum Laufen bekommt, empfehle ich diesen Artikel von [mamemononga](https://gist.github.com/mamemomonga/5549bb69cad8e5618e5527593d4890e0).

Solltest du das Docker Hub-Image verwenden, ist dies die am meisten empfohlene Option, da dadurch die Erstellung von Misskey entfällt.\
Da jedoch eine Migration erforderlich ist, kann es während der Aktualisierung dennoch vorkommen, dass Misskey nicht verwendet werden kann.\
Da außerdem die Misskey-Build-Umgebung nicht vorbereitet ist (Git Pull wird nicht ausgeführt), wird die Einrichtung mühsam, falls du einen Fork verwenden möchtest.

Aufgrund von Leistungsproblemen wird das lokale Erstellen von Docker nicht empfohlen.

systemd wird empfohlen, wenn du einen Fork verwenden willst, das Image aber nicht im Docker Hub veröffentlichen möchtest.

Die empfohlene Reihenfolge wie folgt:

1. Docker Hub
2. systemd
3. Docker-Build

## Verwenden von nginx

Außer in den folgenden Fällen empfehlen wir, nginx als Reverse-Proxy zu verwenden, um als Vermittler zwischen dem Internet und Misskey zu fungieren.

- Es sind wenige Personen auf der Instanz angemeldet oder besteht aus nur einem (1-User-Server)
- Sie sind bereit, die Reverse-Proxy- und Cache-Funktionen von nginx auch mit anderen Mitteln zu schützen, beispielsweise mit einem Load Balancer (für fortgeschrittene Benutzer)

Durch die Verwendung von nginx als Reverse-Proxy können statische Inhalte wie Bilddateien zwischengespeichert werden und die Systemlast reduzieren.
Darüber hinaus verfügt nginx über eine Funktion, die große Zugriffsmengen effektiv steuern kann, wenn kein Cache vorhanden ist. Dies trägt zur Reduzierung der Belastung von Misskey bei.

Konfigurationsbeispiele findest du auf der Seite [nginx-Einstellungen](../resources/nginx/).

## Hol' mehr Swaps!

Swap muss so konfiguriert werden, das **mindestens 3GB oder mehr** zur Verfügung stehen, sonst kann das Skript nicht ausgeführt werden.

## Wenn das Skript fehlschlägt

Sollte das Skript zwischendurch abrechen, versuche folgendes:

- Sollte Redis oder Postgres bereits installiert sein, wähle „Nein“ bei „lokal installieren“.\
  Lasse die Host und Porteinstellung und drücke die "Enter"-Taste. Versuche dich mit den letzen Zugangsdaten anzumelden, die du bei der Installation angegeben hattest.

## .env-Datei

Das Installationsskript erstellt zwei .env-Dateien:\
Wird beim Aktualisieren verwendet.

### /root/.misskey.env

Dies ist erforderlich, um sich den User zu merken, der misskey ausführt.

### /home/(misskeyユーザー)/.misskey.env

Wird generiert, wenn systemd verwendet wird.\
Hauptsächlich zum Speichern von Verzeichnissen.

### /home/(misskeyユーザー)/.misskey-docker.env

Wird erstellt, wenn die Docker Version verwendet wird.\
Es speichert den Container und die Imagenummer, die ausgeführt wird.\
Die Containernummer wird beim Update aktualisiert.Der alte Build wird hierbei gelöscht.

## Übernehme die Kontrolle

Diese Hinweise können hilfreich sein, wenn nach der Installation Konfigurationsänderungen vorgenommen werden.

Ersetze example.com durch deine eigene Domain

### Misskey-Verzeichnis

Die Quelle von Misskey wird als „/home/user/directory“ geklont.\
(Der Standardwert für **Benutzer** und **Verzeichnis** ist „misskey“.)

Um zum Misskey-Verzeichnis zu gelangen, gebe folgendes in die Kommandozeile ein:

```sh
sudo -iu User
cd Datei
```

Um zum Ursprünglichen Benutzer zu wechseln, gebe "exit" ein.

```sh
exit
```

### systemd

Der Systemd-Prozessname ist example.com.\
Beispiel für einen Neustart:

```sh
sudo systemctl restart example.com
```

Mit "jounalctrl" kannst du herrausfinden, ob der Neustart funktioniert hat.

```sh
journalctl -t example.com
```

Die Konfigurationsdatei wird als „/etc/systemd/system/example.com.service“ gespeichert.

### Docker

Docker wird ohne Rootberechtigung als Misskey-Benutzer ausgeführt.

Bei Misskey-Benutzer, die mit sudo laufen sollen, muss  „XDG_RUNTIME_DIR“ und „DOCKER_HOST“ geändert werden.

```sh
sudo -iu user
export XDG_RUNTIME_DIR=/run/user/$UID
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock

# Prozessliste anzeigen
docker ps

# Erstellen (Repository: lokal/misskey:latest)
docker build -t local/misskey:latest ./misskey

# Docker-Ausführung
docker run -d -p 3000:3000 --add-host=docker_host:10.0.0.1 -v /home/misskey/misskey/files:/misskey/files -v "/home/misskey/misskey/.config/default. yml“:/misskey/.config/default.yml:ro --restart unless-stopped -t „local/misskey:latest“

# Protokolle anzeigen
Docker log --tail 50 -f Container-ID
```

Als Einzeiler, sähe das so aus:

```sh
sudo -u user XDG_RUNTIME_DIR=/run/user/$(id -u user) DOCKER_HOST=unix:///run/user/$(id -u user)/docker.sock docker ps
```

### nginx

Die Nginx-Konfiguration wird als „/etc/nginx/conf.d/example.com.conf“ gespeichert.

### Redis

**requirepass** und **bind** werden in `/etc/redis/misskey.conf` festgelegt.

## Q. Zugriff nach Update mit 502-Fehler nicht möglich

In Docker erfolgt die Migration nach dem Start, der Zugriff geht nich sofort.\
Überprüfe, ob die Migration abgeschlossen ist.

Im Fall von systemd ist die pnpm-Installation möglicherweise fehlgeschlagen.

Gehe in das Misskey-Verzeichnis und versuche folgendes:

```sh
pnpm run clean-all
```

Beim ausführen von jounalctl sollte "re2" irgendwo stehen.

## Q. Ich möchte auf demselbsen Server eine weitere Misskey-Instanz erstellen

Das Skript geht nicht davon aus, dass zusätzliche Misskeys auf demselben Server installiert werden.\
Einige Einstellungen werden überschrieben oder es treten unterwegs Fehlermeldungen auf.
