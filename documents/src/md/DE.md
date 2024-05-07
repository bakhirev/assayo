Visualisierung und analyse ihrer Git-datenbank ([demo](https://assayo.online/demo/?dump=./test.txt), [install](https://assayo.online/demo/?ref=github)).

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

### Table of contents

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

### Wie kann ich den bericht sehen?
#### Online
- gehe zu [Webseite](https://assayo.online/)
- den knopf drücken “[Demonstration](https://assayo.online/demo?lang=ru)”
- datei ziehen `log.txt` in das Browserfenster
#### Offline
- laden sie dieses repository herunter
- datei ziehen `log.txt` in den ordner`/build`
- starten `/build/index.html`
- oder ziehen sie einen ordner `/build` zu sich ins repository (der ort, an dem es liegt `log.txt`). Sie können den namen ändern. zum beispiel mit dem namen `/build` auf den namen `/report`

Es ist wichtig, dass die log.txt datei vom befehl für die offlineansicht erstellt wird.

### Wie kann ich die berichtsdatei neu erstellen?
- Laden sie dieses repository herunter
- Erfüllen `npm install`
- Erfüllen `npm run build-local`
- Der neue build wird im ordner sein `/build`

### Wie kann ich den bericht zur microservices-gruppe anzeigen?
- Datei für jeden microservice generieren `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt` usw.)
- Siehe “Wie kann ich den bericht mit internet ansehen?”. Im letzten schritt ziehen sie alle dateien gleichzeitig in das browserfenster.
- Siehe “Wie kann man den bericht ohne internet ansehen?” Im zweiten schritt ziehen sie die microservice-dateien alle (`log-1.txt`, `log-2.txt`, `log-3.txt` usw.) in den berichtsordner (`/build`).

### Wie kann ich die benutzeroberfläche in ihren markenfarben neu streichen?
Sie können ihr skin für die schnittstelle schreiben. Kann geändert werden:
- **Überschrift**. Sie können es im URL-parameter angeben ```title```. Zum beispiel: ```?title=you company```
- **CSS stile**. Um dies zu tun, müssen sie die CSS-datei vorbereiten und ihre adresse im URL-parameter angeben ```theme```. Zum beispiel: ```?theme=//company.com/some.css```. Sie können klassennamen als selektoren verwenden. Die meisten von ihnen ändern sich nicht, wenn eine neue version veröffentlicht wird.
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
### How to add checking for commit message?
####  Use file `commit-msg`
1. Create file `commit-msg` in folder `.git/hooks/`
2. Add this text in file:
```
#!/usr/bin/env bash
if ! grep -iqE "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```
####  Use package [pre-commit](https://www.npmjs.com/package/pre-commit)
1. Add in file `package.json` property `commit-msg`:
```
  ...
  "commit-msg": {
    "regex": "(JIRA-[0-9]{1,5})(\\s)(feat|fix|docs|style|refactor|test|chore)((\\([a-z0-9_-]{1,}\\)){0,})(:\\s)([a-z]{1,})",
    "error-message": "Need commit message like: JIRA-12 fix(profile): some text Read Semantic Commit Messages"
  },
  ...
```
2. Run command `npm install pre-commit`

### Wie kann ich die datenerfassung automatisieren?

#### With backend
- use module [Assayo Crawler](https://github.com/bakhirev/assayo-crawler);

#### Kein bekend
- erstellen sie einen klon ihres repositorys;
- kopieren sie den ordner `build` aus dem aktuellen repository;
- öffnen `build/index.html` im browser und zu lesezeichen hinzufügen;
- fügen sie eine verknüpfung hinzu `build/assets/ci-cd.sh` in den startordner (windows);

Jedes mal, wenn der computer neu gestartet wird, aktualisiert das skript die statistiken für alle daten, die automatisch in den hauptzweig aufgenommen wurden.

### DevOps (CI/CD)

#### Öffentlicher server

Sie können eine datendatei zum erstellen eines berichts auf eine öffentliche URL hochladen. Sie können die Website verwenden, um sie zu visualisieren [assayo](https://assayo.online/). Geben sie im URL-parameter die adresse an, an der die daten liegen ```dump```:
```
https://assayo.online/demo/?dump=//you_site.com/some/log.txt
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

- befehl ausführen ```npm run build-local```
- befehl ausführen ```docker build -t assayo .```
- ergebnis überprüfen ```docker run --name assayo -p 80:80 -d assayo```;
- befehl ausführen ```docker tag assayo bakhirev/assayo:latest```;
- senden sie ein containerimage an Docker Hub ```docker push bakhirev/assayo:latest```;

### ️ About application

#### Architecture
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase) displays a list of available reports. Each report consists of a title, description, and a list of repositories.
2. [Crawler service](https://github.com/bakhirev/assayo-crawler) collects repository logs for the report.
3. [Log visualization UI](https://github.com/bakhirev/assayo) **(you here)** displays report. Needs a log file for work.

#### Veröffentlichungen, ungefähr alle sechs monate. Was weiter:

Schau [haupt dokumentation](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

#### Wie kann ich eine übersetzung hinzufügen oder bearbeiten?

Sie können eine neue übersetzung hinzufügen oder die aktuelle im abschnitt korrigieren ```ts/translations/```.
[Anleitung](https://github.com/firstcontributions/first-contributions)

#### Wünsche, Anregungen, Kommentare
- telegramm [@bakhirev](https://t.me/bakhirev) (vorrangiger kommunikationsweg)
- [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- web site [https://assayo.online/](https://assayo.online/?ref=github&lang=de)

