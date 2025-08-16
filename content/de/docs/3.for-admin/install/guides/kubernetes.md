# Kubernetes und TrueNAS zur Einrichtung von Misskey

Diese Anleitung erklärt, wie man Misskey mit Kubernetes und HelmChart einrichtet.

:::danger

Erstellen die Datenbank nicht unter einer Serverdomäne/einem Hostnamen neu, der bereits genutzt wird!

:::

## TrueCharts und TrueNAS Scale

Misskeys HelmCharts sind auf TrueCharts für die Verwendung mit TrueNAS Scale verfügbar, können jedoch auch als HelmCharts installiert werden.

Auf der Website von [TrueCharts](https://truecharts.org/charts/description_list) findest du Dokumentationen zu allen verfügbaren Charts und Installationsmethoden.

Falls du Fragen hast, kannst du auch auf dem [TrueCharts Discord](https://discord.gg/Ax9ZgzKx9t) Server nachfragen.

Misskey befindet sich derzeit im _incubator_ Zweig.

:::tip{label='前提条件'}

- TrueNAS Scale oder
- Kubernetes-Cluster und Helm

:::

## TrueNAS Scale

Folge den Anweisungen im [TrueCharts Guide](https://truecharts.org/manual/guides/Adding-TrueCharts/).

Füge den _incubator_ Zweig hinzu und installiere Misskey.

Ändere unbedingt den URL-Bereich in den Einstellungen.

TrueCharts verwendet standardmäßig Traefik, um Dienste über HTTPS extern verfügbar zu machen. Du kannst jedoch auch andere Software verwenden, indem du die Einstellungen manuell änderst.

## Manuelle Einrichtung mit Helm

Wenn du TrueNAS Scale nicht verwendest, kannst du Misskey mit Helm installieren.

Ändere unbedingt die `url:` im Abschnitt `misskey:` der Datei `values.yaml`.

Ändere andere Abschnitte nach Bedarf.

Dieses Chart unterstützt derzeit kein TLS innerhalb des Misskey-Containers. Um den Zugriff auf den Server zu sichern, wird die Verwendung eines Reverse Proxies empfohlen.

```
helm repo add TrueCharts https://charts.truecharts.org
helm repo update
helm install misskey TrueCharts/misskey
```

## Misskey aktualisieren

Um Misskey zu aktualisieren, kann entweder die integrierte Upgrade-Funktion von TrueNAS Scale verwendet werden, oder, falls Kubernetes manuell betrieben wird, sollten [helm repo update](https://helm.sh/docs/helm/helm_repo_update/) oder [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) verwendet werden.

Es wird dringend empfohlen, vor dem Upgrade eine Datensicherung durchzuführen, da mögliche Probleme auftreten können.
