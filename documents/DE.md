
> [English](https://github.com/bakhirev/assayo) | [Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md) | [Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md) | [Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md) | __[Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md)__ | [中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md) | [日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md) | [한국어](https://github.com/bakhirev/assayo/blob/main/documents/KO.md) | [العربية](https://github.com/bakhirev/assayo/blob/main/documents/AR.md) | [हिन्दी](https://github.com/bakhirev/assayo/blob/main/documents/HI.md) | [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

# [Assayo](https://bakhirev.github.io/?ref=github&lang=de)
Erstellt einen HTML-Bericht mit Analyse der Commit-Statistiken:
- Arbeitstempo und Anzahl der Überstunden;
- Verantwortungsbereiche, Anzahl der Features und Bugs;
- Arbeitsstil der Kollegen;
- Fluktuationsrate der Mitarbeiter und Teamzusammensetzung;
- Standort der Entwickler;
- Release-Zeitplan und Urlaubskalender;
- Kosten von Features und des gesamten Projekts;
- Stellen für Refactoring, gelöschte Dateien usw.

**Links:** [demo](https://bakhirev.github.io/demo/?ref=github&dump=./test.txt), [online version](https://bakhirev.github.io/demo/?ref=github), [docker](https://hub.docker.com/r/bakhirev/assayo), [reddit](https://www.reddit.com/r/ITManagers/comments/1e5k291/the_visualization_and_analysis_of_git_commit/), [habr](https://habr.com/ru/articles/852782/)

**Video:** [english](https://www.youtube.com/watch?v=uMbhrrd25t4), [español](https://www.youtube.com/watch?v=skmctb_2rZ0), [русский](https://www.youtube.com/watch?v=jwCp_-bhrCQ)

<a href="https://bakhirev.github.io/demo/?ref=github&dump=./test.txt" target="_blank"><img src="https://bakhirev.github.io/assets/images/index.gif" width="100%" /></a>

<a name="link-0"></a>
### Inhaltsverzeichnis
- [COMMIT-STATISTIKBERICHT](#link-1)
  - [Wie erstellt und betrachtet man den Bericht?](#link-2)
    - [Öffentlichen Server verwenden](#link-3)
    - [NodeJS-Bibliothek verwenden](#link-4)
    - [PHP-Bibliothek verwenden](#link-5)
    - [Python-Bibliothek verwenden](#link-6)
    - [Ruby-Bibliothek verwenden](#link-7)
    - [Go-Bibliothek verwenden](#link-8)
    - [Quellcode verwenden](#link-9)
    - [GitHub Actions verwenden](#link-10)
    - [Privaten Server verwenden](#link-11)
  - [Wie führt man Autoren zusammen?](#link-12)
  - [Wie exportiert man Daten aus Git in eine TXT-Datei?](#link-13)
    - [Für die Online-Ansicht](#link-14)
    - [Für die Offline-Ansicht](#link-15)
    - [Wenn Sie PowerShell unter Windows verwenden](#link-16)
  - [Wie zeigt man einen Bericht über eine Gruppe von Microservices an?](#link-17)


- [BEST PRACTICES IM PROJEKT](#link-18)
  - [Wie signiert man Commits?](#link-19)
  - [Wie fügt man eine Prüfung für Commit-Nachrichten hinzu?](#link-20)
    - [Datei commit-msg verwenden](#link-21)
    - [Paket pre-commit verwenden](#link-22)


- [ÜBER DIESE APP](#link-23)
  - [Wie brandet man die Benutzeroberfläche?](#link-24)
  - [Wie baut man den HTML-Bericht aus dem Quellcode neu?](#link-25)
  - [Wie fügt man eine Übersetzung hinzu oder bearbeitet sie?](#link-26)
  - [Architektur](#link-27)
    - [Allgemeine Architektur von Microservices](#link-29)
  - [Feedback, Kommentare](#link-30)

<a name="link-1"></a>
##  COMMIT-STATISTIKBERICHT

<a name="link-2"></a>
### 📈 Wie erstellt und betrachtet man den Bericht?

<a name="link-3"></a>
#### Öffentlichen Server verwenden
- Gehen Sie zur [Website](https://bakhirev.github.io/)
- Folgen Sie den Anweisungen

<a name="link-4"></a>
#### NodeJS-Bibliothek verwenden
- Führen Sie `npx assayo` aus
- Öffnen Sie `./assayo/index.html`

<a name="link-5"></a>
#### PHP-Bibliothek verwenden
- Führen Sie `composer require bakhirev/assayo` aus
- Führen Sie `vendor/bin/assayo` aus
- Öffnen Sie `./assayo/index.html`

<a name="link-6"></a>
#### Python-Bibliothek verwenden
- Führen Sie `pipx install assayo` aus
- Führen Sie `assayo` aus
- Öffnen Sie `./assayo/index.html`

<a name="link-7"></a>
#### Ruby-Bibliothek verwenden
- Führen Sie `gem install assayo` aus
- Führen Sie `assayo` aus
- Öffnen Sie `./assayo/index.html`

<a name="link-8"></a>
#### Go-Bibliothek verwenden
- Führen Sie `go get github.com/bakhirev/assayo` aus
- Führen Sie `go install github.com/bakhirev/assayo` aus
- Führen Sie `assayo` aus
- Öffnen Sie `./assayo/index.html`

<a name="link-9"></a>
#### Quellcode verwenden
- Dieses Repository herunterladen
- Legen Sie die Datei `log.txt` im Ordner `/build` ab
- Öffnen Sie `/build/index.html`
- Oder legen Sie den Ordner `/build` in Ihr Repository (wo sich `log.txt` befindet). Sie können den Namen ändern. Zum Beispiel von `/build` zu `/report`.

In diesem Fall ist es wichtig, dass die Datei `log.txt` durch den Befehl für die Offline-Ansicht erzeugt wird.

<a name="link-10"></a>
####  GitHub Actions verwenden
Fügen Sie das [script](https://github.com/bakhirev/assayo/blob/main/documents/ActionExample.yml) im Ordner `.github/workflows/` hinzu oder verwenden Sie diese [action](https://github.com/marketplace/actions/assayo) aus dem Marketplace. Ein fertiger, aktueller Bericht wird in den Artefakten gespeichert.

<a name="link-11"></a>
#### Privaten Server verwenden
- Laden Sie das [Docker-Image](https://hub.docker.com/r/bakhirev/assayo) herunter;
- Führen Sie es in Ihrem lokalen Netzwerk aus;
- Verwenden Sie die Weboberfläche, um die Berichte anzuzeigen, und setzen Sie die Daten-URL im URL-Parameter `dump`:

```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - URL des Assayo-Containers, er hört auf Port 80;
you_url    - URL Ihres Containers mit Git-Logs;
```
Standardmäßig wird das Image unter `http://127.0.0.1:80/` ausgeführt. Falls es nicht funktioniert, prüfen Sie, ob Port `80` frei ist.

<a name="link-12"></a>
### ‍🎭 Wie führt man Autoren zusammen?
Im Stammverzeichnis Ihres Projekts müssen Sie eine Datei `.mailmap` erstellen.

Beispiel für den Inhalt der Datei:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
```
Mehr über das Format dieser Datei erfahren Sie [hier](https://git-scm.com/docs/gitmailmap).

<a name="link-13"></a>
### 📤 Wie exportiert man Daten aus Git in eine TXT-Datei?

<a name="link-14"></a>
####  Für die Online-Ansicht
Führen Sie im Stammverzeichnis Ihres Projekts aus:

<a name="link-15"></a>
####  Für die Offline-Ansicht
Git erstellt eine Datei `log.txt`. Diese Datei enthält Daten zur Anzeige eines Berichts. Der Unterschied zwischen dem Online- und dem Offline-Format besteht in der vorhandenen String-Hülle. Das Offline-Format wird wie eine `js`-Datei geladen, wenn Sie `/build/index.html` einfach öffnen.

<a name="link-16"></a>
#### Wenn Sie PowerShell unter Windows verwenden
Standardmäßig kann die Ausgabe-Codierung nicht mit UTF-8 übereinstimmen, und die resultierende Log-Datei ist möglicherweise unlesbar. Bevor Sie das Log speichern, können Sie die Codierung mit dem Befehl ändern.
```
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```
Oder öffnen Sie eine gespeicherte Datei und ändern Sie die Codierung manuell auf UTF-8.

<a name="link-17"></a>
### 🗃️ Wie zeigt man einen Bericht über eine Gruppe von Microservices an?
- Erstellen Sie für jeden Microservice eine Datei `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt` usw.). Dies können Sie manuell tun oder das Modul [Assayo Crawler](https://github.com/bakhirev/assayo-crawler) zur automatischen Log-Sammlung verwenden;
- Siehe „Wie zeigt man einen Online-Bericht an?“. Ziehen Sie im letzten Schritt alle Dateien gleichzeitig in das Browserfenster.
- Siehe „Wie zeigt man einen Offline-Bericht an?“. Ziehen Sie im zweiten Schritt alle Microservice-Dateien (`log-1.txt`, `log-2.txt`, `log-3.txt` usw.) in den Berichtsordner (`/build`).

<a name="link-18"></a>
## BEST PRACTICES IM PROJEKT

<a name="link-19"></a>
### 📝 Wie signiert man Commits?
Folgen Sie den [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Beispiel:
```
JIRA-1234 feat(profile): Added avatar for user
```
- Aufgabennummer im Task-Tracker `(JIRA-1234)`
- Art der Arbeit `(feat, fix, style, refactor, test, doc usw.)`
- Feature `(profile – neue Seite auf der Website oder neue Funktion, ein oder zwei kurze Wörter oder eine Abkürzung verwenden)`
- Welche Probleme gelöst wurden `(Added avatar for user)`

<a name="link-20"></a>
### 👮 Wie fügt man eine Prüfung für Commit-Nachrichten hinzu?

<a name="link-21"></a>
####  Datei commit-msg verwenden
1. Datei `commit-msg` im Ordner `.git/hooks/` erstellen
2. Fügen Sie diesen Text in die Datei ein:
```
#!/usr/bin/env bash
if ! grep -iqE "(JIRA-[0-9]{1,5})(s)(feat|fix|docs|style|refactor|test|chore)((([a-z0-9_-]{1,})){0,})(:s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```

<a name="link-22"></a>
#### Paket [pre-commit](https://www.npmjs.com/package/pre-commit) verwenden
1. Fügen Sie in der Datei `package.json` die Eigenschaft `commit-msg` hinzu:
```
...
"commit-msg": {
  "regex": "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})",
    "error-message": "Need commit message like: JIRA-12 fix(profile): some text Read Semantic Commit Messages"
},
...
```
2. Führen Sie den Befehl `npm install pre-commit` aus

<a name="link-23"></a>
##  ÜBER DIESE APP

<a name="link-24"></a>
### 🎨 Wie brandet man die Benutzeroberfläche?
Sie können Ihr eigenes Interface-Theme erstellen. Optionen:
- **Titel**. Sie können den Standard-Dokumenttitel im URL-Parameter `title` festlegen. Beispiel: `?title=You Company`
- **Visuelles Theme**. Dazu müssen Sie eine CSS-Datei mit neuen Styles vorbereiten und deren URL im Parameter `theme` angeben. Beispiel: `?theme=//company.com/some.css`. Die meisten Klassennamen ändern sich in neuen Versionen nicht.
- **Sprache**. Sie können die Sprache im URL-Parameter `lang` festlegen. Beispiel: `?lang=es`

**Beispiel:** [Demo](https://bakhirev.github.io/demo/themes/)

<a name="link-25"></a>
### 🛠️ Wie baut man den HTML-Bericht aus dem Quellcode neu?
- Dieses Repository `git clone https://github.com/bakhirev/assayo.git` herunterladen
- Führen Sie `npm install` aus
- Führen Sie `npm run build:local` aus
- Der neue HTML-Build befindet sich im Ordner `/build`

<a name="link-26"></a>
### 🈯 Wie fügt man eine Übersetzung hinzu oder bearbeitet sie?
Sie können im Ordner `ts/translations/` eine neue Übersetzung hinzufügen oder eine bestehende korrigieren.
[Anleitung](https://github.com/firstcontributions/first-contributions)

<a name="link-27"></a>
### 📐 Architektur

<a name="link-29"></a>
#### Allgemeine Architektur von Microservices
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase) zeigt eine Liste verfügbarer Berichte an. Jeder Bericht besteht aus einem Titel, einer Beschreibung und einer Liste von Repositories.
2. [Crawler service](https://github.com/bakhirev/assayo-crawler) sammelt Repository-Logs für den Bericht.
3. [Log visualization UI](https://github.com/bakhirev/assayo) **(Sie sind hier)** zeigt den Bericht an. Benötigt eine Log-Datei zur Funktion.

<a name="link-30"></a>
### 📧 Feedback, Kommentare
- 📱 [https://t.me/bakhirev](https://t.me/bakhirev) (Bevorzugte Kommunikationsmethode)
- 📧 [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- 🌐 [https://bakhirev.github.io/](https://bakhirev.github.io/?ref=github&lang=de)

