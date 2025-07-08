> [English](https://github.com/bakhirev/assayo) | [Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md) | [中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md) | __[Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md)__ | [Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md) | [Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md) | [日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md) | [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

# [Assayo](https://bakhirev.github.io/?ref=github&lang=fr)
Crée un rapport HTML avec analyse des statistiques de validation:
- le rythme de travail et le nombre d'heures supplémentaires;
- les zones de responsabilité, le nombre de fonctionnalités et de bogues;
- le style de travail de vos collègues;
- le taux de rotation du personnel et la composition de l'équipe;
- l'emplacement des développeurs;
- le calendrier des publications et des vacances;
- le coût des fonctionnalités et du projet dans son ensemble;
- les endroits pour le refactoring, les fichiers supprimés, etc.


**Links:** [demo](https://bakhirev.github.io/demo/?ref=github&dump=./test.txt), [online version](https://bakhirev.github.io/demo/?ref=github), [docker](https://hub.docker.com/r/bakhirev/assayo), [reddit](https://www.reddit.com/r/ITManagers/comments/1e5k291/the_visualization_and_analysis_of_git_commit/), [habr](https://habr.com/ru/articles/852782/).

**Video:** [english](https://www.youtube.com/watch?v=uMbhrrd25t4), [español](https://www.youtube.com/watch?v=skmctb_2rZ0), [русский](https://www.youtube.com/watch?v=jwCp_-bhrCQ).

<a href="https://bakhirev.github.io/demo/?ref=github&dump=./test.txt" target="_blank"><img src="https://bakhirev.github.io/assets/images/index.gif" width="100%" /></a>

<a name="link-0"></a>
###  Table of contents


- [COMMIT STATISTICS REPORT](#link-1)
  - [Comment voir le rapport en ligne?](#link-2)
    - [Using website](#link-3)
    - [Use the library NodeJS](#link-4)
    - [Use the library PHP](#link-5)
    - [Use the library Python](#link-6)
    - [Use the library Ruby](#link-7)
    - [Use the library Go](#link-8)
    - [Use source code](#link-9)
    - [Use github actions](#link-10)
    - [Serveur privé](#link-11)
  - [Comment pouvez-vous combiner les auteurs ?](#link-12)
  - [Comment télécharger des données depuis git ?](#link-13)
    - [Pour une visualisation en ligne](#link-14)
    - [Pour la navigation hors ligne](#link-15)
    - [If you use PowerShell in Windows](#link-16)
  - [Comment voir le compte rendu pour un groupe de microservices?](#link-17)


- [THE BEST PRACTICES IN THE PROJECT](#link-18)
  - [Comment signer les commits ?](#link-19)
  - [How to add checking for commit message?](#link-20)
    - [ Use file commit-msg](#link-21)
    - [ Use package pre-commit](#link-22)


- [ABOUT THIS APP](#link-23)
  - [Comment apposer une marque sur l’interface?](#link-24)
  - [Comment recompiler la build du rapport?](#link-25)
  - [Comment ajouter ou modifier une traduction?](#link-26)
  - [️Architecture](#link-27)
    - [The structure of this module](#link-28)
    - [General architecture of microservices](#link-29)
  - [Souhaits, suggestions, commentaires](#link-30)
<a name="link-1"></a>
##  COMMIT STATISTICS REPORT
<a name="link-2"></a>
### 📈 Comment voir le rapport en ligne?
<a name="link-3"></a>
####  Using website
- Aller à [сайт](https://bakhirev.github.io/demo/)
- follow the instructions

<a name="link-4"></a>
####  Use the library NodeJS
- run `npx assayo`
- open `./assayo/index.html`

<a name="link-5"></a>
####  Use the library PHP
- run `composer require bakhirev/assayo`
- run `vendor/bin/assayo`
- open `./assayo/index.html`

<a name="link-6"></a>
####  Use the library Python
- run `pipx install assayo`
- run `assayo`
- open `./assayo/index.html`

<a name="link-7"></a>
####  Use the library Ruby
- run `gem install assayo`
- run `assayo`
- open `./assayo/index.html`

<a name="link-8"></a>
####  Use the library Go
- run `go get github.com/bakhirev/assayo`
- run `go install github.com/bakhirev/assayo`
- run `assayo`
- open `./assayo/index.html`

<a name="link-9"></a>
####  Use source code
- Télécharger ce dépôt
- Glisser le fichier `log.txt` dans le dossier `/build`
- Démarrer `/build/index.html`
- Ou coller le dossier `/build` Sur votre dépôt (là où se trouve `log.txt`). Vous pouvez changer le nom. Par exemple avec `/build` sur `/report`. Dans cette cas, il est important que le fichier log.txt ait été généré par le commande pour la visualisation hors ligne.

<a name="link-10"></a>
####  Use github actions
Add [script](https://github.com/bakhirev/assayo/blob/main/documents/ActionExample.yml) in folder `.github/workflows/` or use this [action](https://github.com/marketplace/actions/assayo) from the marketplace. A ready, fresh report will be saved in the artifacts.
<a name="link-11"></a>
####  Serveur privé
- télécharger [docker образ](https://hub.docker.com/r/bakhirev/assayo);
- Soulevez-le sur le réseau local;
- Pour consulter les rapports, utilisez l’interface web en lui indiquant l’adresse où les données se trouvent, sous forme de paramètre dans l’URL ```dump```:

```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - URL Conteneur assayo, écoute le port 80;
you_url    - URL адресс Adresse de votre conteneur de logs git;
```
Par défaut, l'image s'exécute à ```http://127.0.0.1:80/```. Si cela ne fonctionne pas, vérifiez si le port 80 est disponible.
<a name="link-12"></a>
### ‍🎭 Comment pouvez-vous combiner les auteurs ?
Dans le répertoire racine de votre projet, créez le fichier suivant: `.mailmap`.
L’exemple de la ligne de fichier est le suivant:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
```
Vous pouvez en savoir plus sur le format de ce fichier en lisant la documentation officielle. [ici](https://git-scm.com/docs/gitmailmap).
<a name="link-13"></a>
### 📤 Comment télécharger des données depuis git ?
<a name="link-14"></a>
####  Pour une visualisation en ligne
Dans le répertoire racine de votre projet, exécutez:
```
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" > log.txt
```
<a name="link-15"></a>
####  Pour la navigation hors ligne
```
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" | sed -e 's/\\/\\\\/g' | sed -e 's/`/"/g' | sed -e 's/\$/S/g' | sed -e '1s/^/R(f\`/' | sed -e '$s/$/\`\);/' > log.txt
```
Git va créer le fichier `log.txt`. Son contenu est destiné à la création de rapports. La différence entre le format en ligne et le format hors ligne réside dans l’enveloppe des lignes. Le format hors ligne sera chargé comme un fichier js si vous avez simplement ouvert `/build/index.html`
<a name="link-16"></a>
####  If you use PowerShell in Windows
By default, the output encoding may not match UTF-8 and the resulting log file will be unreadable. Before saving the log, you can change the encoding with the command.
```
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```
Or open a saved file and manually change the encoding to UTF-8.
<a name="link-17"></a>
### 🗃️ Comment voir le compte rendu pour un groupe de microservices?
- générer un fichier pour chaque microservice `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt` etc.)
- Voir “Comment voir le rapport en ligne?”. Au dernier pas, glisser tous les fichiers dans la fenêtre du navigateur.
- Voir “Comment regarder le rapport hors-ligne?”. Au deuxième pas, coller tous les fichier de microservices (`log-1.txt`, `log-2.txt`, `log-3.txt` etc.) dans le dossier du rapport (`/build`).

<a name="link-18"></a>
##  THE BEST PRACTICES IN THE PROJECT
<a name="link-19"></a>
### 📝 Comment signer les commits ?
Suivez la pratique [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Par exemple:
```
JIRA-1234 feat(profile): Added avatar for user 
```
- numéro de tâche dans task Tracker `(JIRA-1234)`
- type de travail `(feat, fix, style, refactor, test, doc etc.)`
- ficha `(profile - la section du site, la page ou la nouvelle fonctionnalité, en un mot)`
- quel problème ont-ils résolu `(Added avatar for user)`

<a name="link-20"></a>
### 👮 How to add checking for commit message?
<a name="link-21"></a>
####   Use file `commit-msg`
1. Create file `commit-msg` in folder `.git/hooks/`
2. Add this text in file:
```
#!/usr/bin/env bash
if ! grep -iqE "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```
<a name="link-22"></a>
####   Use package [pre-commit](https://www.npmjs.com/package/pre-commit)
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
<a name="link-23"></a>
##  ABOUT THIS APP
<a name="link-24"></a>
### 🎨 Comment apposer une marque sur l’interface?
Vous pouvez écrire votre propre thème pour l’interface. Vous pouvez changer :
- **En-tête**. Vous pouvez le spécifier dans le paramètre de l’URL ```title```. Par exemple: ```?title=You Company```
- **Thème visuel**.Pour cela, vous devez préparer un fichier CSS avec de nouveaux styles et indiquer son adresse dans le paramètre de l’URL ```theme```. Par exemple: ```?theme=//company.com/some.css```. Vous pouvez utiliser les noms de classes comme sélecteurs. La plupart d’entre elles ne changent pas lors de la sortie de nouvelles versions.
- **Langue**. Vous pouvez l’indiquer dans le paramètre d’URL ```lang```. Par exemple: ```?lang=es```


**Example:** [demo](https://bakhirev.github.io/demo/themes/)
<a name="link-25"></a>
### 🛠️ Comment recompiler la build du rapport?
- Télécharger ce dépôt
- Exécuter `npm install`
- Exécuter `npm run build:local`
- La dernière build sera dans le dossier `/build`

<a name="link-26"></a>
### 🈯 Comment ajouter ou modifier une traduction?
Vous pouvez ajouter une nouvelle traduction ou corriger la traduction existante dans le section ```ts/translations/```.
[Instruction](https://github.com/firstcontributions/first-contributions)
<a name="link-27"></a>
### 📐 ️Architecture
<a name="link-28"></a>
####  The structure of this module
```
src
 |- pages
    |- Person // all personal dashboards
    |- Team   // all dashboards about team
 |
 |- helpers
    |- Parser          // parse text from git log to JS objects
    |- DataGrip        // data grouping and counting values
    |- achievement     // the logic that gives out personal achievements
    |- Recommendations // the logic that gives out common recommendations
 |
 |- translations // translations into other languages
```
<a name="link-29"></a>
####  General architecture of microservices
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase) displays a list of available reports. Each report consists of a title, description, and a list of repositories.
2. [Crawler service](https://github.com/bakhirev/assayo-crawler) collects repository logs for the report.
3. [Log visualization UI](https://github.com/bakhirev/assayo) **(you here)** displays report. Needs a log file for work.
<a name="link-30"></a>
### 📧 Souhaits, suggestions, commentaires
- telegramm [@bakhirev](https://t.me/bakhirev) (voie de communication prioritaire)
- [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- site [https://bakhirev.github.io/](https://bakhirev.github.io/?ref=github&lang=fr)


