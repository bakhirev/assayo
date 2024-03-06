> - [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)
> - [English](https://github.com/bakhirev/assayo)
> - [中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md)
> - [Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md)
> - [Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md)
> - [Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md)
> - [Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md)
> - [日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md)

# [Assayo](https://assayo.jp/?ref=github&lang=ru)

Visualisierung und analyse ihrer Git-datenbank ([demo](https://assayo.jp/demo/?dump=./test.txt&lang=ru)).

##### Mitarbeiter können den neuen arbeitsplatz bewerten
- arbeitsgeschwindigkeit;
- anzahl der überstunden;
- verantwortungsbereiche;
- umfang des neuen funktionsweise und fehlerbestandes;
- arbeitsstil der kollegen;

##### Der vorgesetzte kann die mitarbeiter bewerten
- ermitteln sie die untätigen;
- schätzen sie den codeumfang ab;
- erfahren sie die arbeitsgeschwindigkeit;
- merken sie verhaltensanomalien;
- beobachten sie das arbeitsgeschehen nach wochen;

##### Der Investor kann das produkt bewerten
- produktpreis;
- preis des neuen funktionsumfanges;
- entwicklungszeit;
- vorhersage der zeit für überarbeitungen;
- preiskostenprognose;

### Wie kann ich die anzahl der commits schnell sehen?

In der wurzelverzeichnis ihres projektes muss der befehl ausgeführt werden:
```
git shortlog -s -n -e
```
### Wie kann ich autoren zusammenbringen?
Sie müssen eine datei im stammverzeichnis ihres projekts erstellen `.mailmap`.
Beispiel für den Inhalt einer Datei:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
``` 
Sie können mehr über das format dieser datei lesen[hier](https://git-scm.com/docs/gitmailmap).

### Wie kann ich daten aus git?

#### Für die onlineansicht
In der wurzelverzeichnis ihres projektes ausführen:
```
git --no-pager log --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" > log.txt
```
#### Zum surfen ohne internet

```
git --no-pager log --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" | sed -e 's/\\/\\\\/g' | sed -e 's/`/"/g' | sed -e 's/^/report.push(\`/g' | sed 's/$/\`\);/g' | sed 's/\$/_/g' > log.txt
```
Git erstellt eine datei `log.txt`.
Diese datei enthält die daten zum erstellen des berichts. 

Der unterschied zwischen den formaten liegt im vorhandensein einer wrapper für zeilen. Das format ohne internet wird wie eine js-datei geladen, wenn sie es einfach öffnen. `/build/index.html`

### Wie kann ich den bericht mit dem internet anzeigen? 

- gehe zu [Webseite](https://assayo.jp/)
- den knopf drücken “[Demonstration](https://assayo.jp/demo?lang=ru)”
- datei ziehen `log.txt` in das Browserfenster

### Wie kann ich einen bericht ohne internet anzeigen?
- laden sie dieses repository herunter
- datei ziehen `log.txt` in den ordner`/build`
- starten `/build/index.html`
- oder ziehen sie einen ordner `/build` zu sich ins repository (der ort, an dem es liegt `log.txt`). Sie können den namen ändern. zum beispiel mit dem namen `/build` auf den namen `/report`

Es ist wichtig, dass die log.txt datei vom befehl für die offlineansicht erstellt wird.

### Wie kann ich die berichtsdatei neu erstellen?
- Laden Sie dieses Repository herunter
- Erfüllen `npm install`
- Erfüllen `npm run build`
- Der neue Build wird im Ordner sein `/build`

### Wie kann ich den bericht zur microservices-gruppe anzeigen?
- Datei für jeden microservice generieren `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt` usw.)
- Siehe “Wie kann ich den bericht mit internet ansehen?”. Im letzten schritt ziehen sie alle dateien gleichzeitig in das browserfenster.
- Siehe “Wie kann man den bericht ohne internet ansehen?” Im zweiten schritt ziehen sie die microservice-dateien alle (`log-1.txt`, `log-2.txt`, `log-3.txt` usw.) in den berichtsordner (`/build`).

### Wie kann ich die benutzeroberfläche in ihren markenfarben neu streichen?
Sie können ihr skin für die schnittstelle schreiben. Kann geändert werden:
- **Überschrift**. Sie können es im URL-parameter angeben ```title```. Zum beispiel: ```?title=you company```
- **CSS Stile**. Um dies zu tun, müssen sie die CSS-datei vorbereiten und ihre adresse im URL-parameter angeben ```theme```. Zum beispiel: ```?theme=//company.com/some.css```. Sie können klassennamen als selektoren verwenden. Die meisten von ihnen ändern sich nicht, wenn eine neue version veröffentlicht wird.
- **Sprache**. Sie können es im URL-parameter angeben ```lang```. Zum Beispiel: ```?lang=es```

### Wie signiere ich commits?

Folge der praxis [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Zum beispiel:
```
JIRA-1234 feat(profile): added avatar for user 
```
- aufgabennummer `(JIRA-1234)`
- art der arbeit `(feat, fix, style, refactor, test, doc usw.)`
- arbeitsbereich `(profile - ein abschnitt der website, eine seite oder eine neue funktionalität, mit einem wort)`
- beschreibung der arbeit `(added avatar for user)`

### Wie kann ich die datenerfassung automatisieren?

#### Kein bekend
- erstellen sie einen klon ihres repositorys;
- kopieren sie den ordner `build` aus dem aktuellen repository;
- öffnen `build/index.html` im browser und zu lesezeichen hinzufügen;
- fügen sie eine verknüpfung hinzu `build/assets/ci-cd.sh` in den startordner (windows);

Jedes mal, wenn der computer neu gestartet wird, aktualisiert das skript die statistiken für alle daten, die automatisch in den hauptzweig aufgenommen wurden.

### DevOps (CI/CD)

#### Öffentlicher server

Sie können eine datendatei zum erstellen eines berichts auf eine öffentliche URL hochladen. Sie können die Website verwenden, um sie zu visualisieren [assayo](https://assayo.jp/). Geben sie im URL-parameter die adresse an, an der die daten liegen ```dump```:
```
https://assayo.jp/demo/?dump=//you_site.com/some/log.txt
```

#### Privater server
- herunterladen [docker das bild](https://hub.docker.com/r/bakhirev/assayo);
- führen Sie es im lokalen netzwerk aus;
- um berichte anzuzeigen, verwenden sie die webschnittstelle, um die adresse anzugeben, an der sich die daten befinden, im URL-parameter ```dump```:
```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - die adresse des assayo-containers, er hört auf port 80;
you_url    - URL die adresse ihres containers mit git-logs;
```

Standardmäßig wird das abbild an der folgenden adresse ausgeführt ```http://127.0.0.1:80/```. Wenn es nicht funktioniert, überprüfen sie, ob der port 80 frei ist.
#### Aktualisieren eines Docker-Images

- befehl ausführen ```npm run build```
- befehl ausführen ```docker build -t assayo .```
- ergebnis überprüfen ```docker run --name assayo -p 80:80 -d assayo```;
- befehl ausführen ```docker tag IMAGE_ID bakhirev/assayo:latest```;
- senden sie ein containerimage an Docker Hub

### Veröffentlichungen, ungefähr alle sechs monate. Was weiter:

Schau [hauptdokumentation](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

### Wie kann ich eine übersetzung hinzufügen oder bearbeiten?

Sie können eine neue übersetzung hinzufügen oder die aktuelle im abschnitt korrigieren ```ts/translations/```.
[Anleitung](https://docs.github.com/ru/get-started/exploring-projects-on-github/contributing-to-a-project)

### Wünsche, Anregungen, Kommentare
- telegramm [@bakhirev](https://t.me/bakhirev) (vorrangiger Kommunikationsweg)
- [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- сайт [https://assayo.jp/](https://assayo.jp/)

