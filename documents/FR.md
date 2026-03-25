
> [English](https://github.com/bakhirev/assayo) | [Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md) | __[Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md)__ | [Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md) | [Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md) | [中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md) | [日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md) | [한국어](https://github.com/bakhirev/assayo/blob/main/documents/KO.md) | [العربية](https://github.com/bakhirev/assayo/blob/main/documents/AR.md) | [हिन्दी](https://github.com/bakhirev/assayo/blob/main/documents/HI.md) | [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

# [Assayo](https://bakhirev.github.io/?ref=github&lang=fr)
Créez un rapport HTML pour analyser les statistiques des commits:
- le rythme de travail et le nombre d'heures supplémentaires;
- les domaines de responsabilité, le nombre de fonctionnalités et d'erreurs;
- le style de travail des collègues;
- le taux de rotation des employés et la composition de l'équipe;
- la localisation des développeurs;
- l'emploi du temps des lancés et des vacances;
- le coût des fonctionnalités et du projet dans son ensemble;
- les endroits à refactoriser, les fichiers supprimés, etc.

**Liens:** [demo](https://bakhirev.github.io/demo/?ref=github&dump=./test.txt), [online version](https://bakhirev.github.io/demo/?ref=github), [docker](https://hub.docker.com/r/bakhirev/assayo), [reddit](https://www.reddit.com/r/ITManagers/comments/1e5k291/the_visualization_and_analysis_of_git_commit/), [habr](https://habr.com/ru/articles/852782/)

**Vidéo:** [english](https://www.youtube.com/watch?v=uMbhrrd25t4), [español](https://www.youtube.com/watch?v=skmctb_2rZ0), [русский](https://www.youtube.com/watch?v=jwCp_-bhrCQ)

<a href="https://bakhirev.github.io/demo/?ref=github&dump=./test.txt" target="_blank"><img src="https://bakhirev.github.io/assets/images/index.gif" width="100%" /></a>

<a name="link-0"></a>
### Table des matières
- [RAPPORT D'ANALYSE DES COMMITS](#link-1)
  - [Comment créer et visualiser le rapport?](#link-2)
    - [En utilisant un serveur public](#link-3)
    - [Utiliser la bibliothèque NodeJS](#link-4)
    - [Utiliser la bibliothèque PHP](#link-5)
    - [Utiliser la bibliothèque Python](#link-6)
    - [Utiliser la bibliothèque Ruby](#link-7)
    - [Utiliser la bibliothèque Go](#link-8)
    - [Utiliser le code source](#link-9)
    - [Utiliser les actions GitHub](#link-10)
    - [Utiliser un serveur privé](#link-11)
  - [Comment concaténer les auteurs?](#link-12)
  - [Comment exporter les données de git dans un fichier txt?](#link-13)
    - [Pour la visualisation en ligne](#link-14)
    - [Pour la visualisation hors ligne](#link-15)
    - [Si vous utilisez PowerShell sur Windows](#link-16)
  - [Comment visualiser un rapport sur un groupe de microservices?](#link-17)


- [LES MEILLEURES PRACTIQUES DANS LE PROJET](#link-18)
  - [Comment signer les commits?](#link-19)
  - [Comment ajouter une vérification pour le message de commit?](#link-20)
    - [Utiliser le fichier commit-msg](#link-21)
    - [Utiliser le package pre-commit](#link-22)


- [AU SUJET DE CETTE APPLICATION](#link-23)
  - [Comment personnaliser l'interface?](#link-24)
  - [Comment reconstruire le rapport HTML à partir du code source?](#link-25)
  - [Comment ajouter ou éditer une traduction?](#link-26)
  - [Architecture](#link-27)
    - [Architecture générale des microservices](#link-29)
  - [Retours, commentaires](#link-30)

<a name="link-1"></a>
##  RAPPORT D'ANALYSE DES COMMITS

<a name="link-2"></a>
### 📈 Comment créer et visualiser le rapport?

<a name="link-3"></a>
#### En utilisant un serveur public
- accédez au [site web](https://bakhirev.github.io/)
- suivez les instructions

<a name="link-4"></a>
#### Utiliser la bibliothèque NodeJS
- exécutez `npx assayo`
- ouvrez `./assayo/index.html`

<a name="link-5"></a>
#### Utiliser la bibliothèque PHP
- exécutez `composer require bakhirev/assayo`
- exécutez `vendor/bin/assayo`
- ouvrez `./assayo/index.html`

<a name="link-6"></a>
#### Utiliser la bibliothèque Python
- exécutez `pipx install assayo`
- exécutez `assayo`
- ouvrez `./assayo/index.html`

<a name="link-7"></a>
#### Utiliser la bibliothèque Ruby
- exécutez `gem install assayo`
- exécutez `assayo`
- ouvrez `./assayo/index.html`

<a name="link-8"></a>
#### Utiliser la bibliothèque Go
- exécutez `go get github.com/bakhirev/assayo`
- exécutez `go install github.com/bakhirev/assayo`
- exécutez `assayo`
- ouvrez `./assayo/index.html`

<a name="link-9"></a>
#### Utiliser le code source
- télécharger ce répertoire
- placer le fichier `log.txt` dans `/build`
- ouvrez `/build/index.html`
- ou placer le dossier `/build` dans votre répertoire (où se trouve `log.txt`). Vous pouvez changer le nom. Par exemple, de `/build` à `/report`.

Dans ce cas, il est important que le fichier `log.txt` soit généré par la commande pour la visualisation en ligne.

<a name="link-10"></a>
####  Utiliser les actions GitHub
Ajouter [script](https://github.com/bakhirev/assayo/blob/main/documents/ActionExample.yml) dans le dossier `.github/workflows/` ou utiliser cette [action](https://github.com/marketplace/actions/assayo) du marketplace. Un rapport prêt et mis à jour sera enregistré dans les artefacts.

<a name="link-11"></a>
#### Utiliser un serveur privé
- télécharger l'image [docker](https://hub.docker.com/r/bakhirev/assayo);
- exécuter dans votre réseau local;
- utiliser l'interface web pour visualiser les rapports, définir l'URL des données dans le paramètre URL `dump`:

```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - URL du conteneur assayo, écoute sur le port 80;
you_url    - URL de votre conteneur avec les journaux git;
```
Par défaut, l'image s'exécutera sur `http://127.0.0.1:80/`. Si cela ne fonctionne pas, vérifiez si le port 80 est libre.

<a name="link-12"></a>
### ‍🎭 Comment concaténer les auteurs?
Dans le répertoire racine de votre projet, vous devez créer un fichier `.mailmap`.

Exemple du contenu du fichier:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
```
Lisez plus sur le format de ce fichier [ici](https://git-scm.com/docs/gitmailmap).

<a name="link-13"></a>
### 📤 Comment exporter les données de git dans un fichier txt?

<a name="link-14"></a>
####  Pour la visualisation en ligne
Dans le répertoire racine de votre projet exécutez:

<a name="link-15"></a>
####  Pour la visualisation hors ligne
Git créera un fichier `log.txt`. Ce fichier contient les données pour afficher un rapport. La différence entre le format en ligne et hors ligne est la présence d'un enveloppement pour les chaînes. Le format hors ligne sera chargé comme un fichier `js` si vous avez ouvert uniquement `/build/index.html`

<a name="link-16"></a>
#### Si vous utilisez PowerShell sur Windows
Par défaut, le codage de sortie peut ne pas correspondre à UTF-8 et le fichier de journal résultant sera illisible. Avant de sauvegarder le journal, vous pouvez changer le codage avec la commande.
```
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```
Ou ouvrez un fichier sauvegardé et changez manuellement le codage en UTF-8.

<a name="link-17"></a>
### 🗃️ Comment visualiser un rapport sur un groupe de microservices?
- Générer pour chaque fichier de microservice `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt`, etc.). Vous pouvez le faire manuellement ou utiliser le module [Assayo Crawler](https://github.com/bakhirev/assayo-crawler) pour la collecte automatique des journaux;
- Voir « Comment visualiser un rapport en ligne? ». À l'étape finale, faites glisser tous les fichiers à la fois dans la fenêtre du navigateur.
- Voir « Comment visualiser un rapport hors ligne? ». À l'étape deux, faites glisser tous les fichiers de microservice (`log-1.txt`, `log-2.txt`, `log-3.txt`, etc.) dans le dossier du rapport (`/build`).

<a name="link-18"></a>
## LES MEILLEURES PRACTIQUES DANS LE PROJET

<a name="link-19"></a>
### 📝 Comment signer les commits?
Suivez le [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Exemple:
```
JIRA-1234 feat(profile): Added avatar for user
```
- numéro de tâche dans le suivi de tâches `(JIRA-1234)`
- type de travail `(feat, fix, style, refactor, test, doc, etc.)`
- fonctionnalité `(profile - nouvelle page sur le site ou nouvelle fonction, utilisez un (deux) mot(s) court(s) ou une abréviation)`
- quel problème a été résolu `(Added avatar for user)`

<a name="link-20"></a>
### 👮 Comment ajouter une vérification pour le message de commit?

<a name="link-21"></a>
####  Utiliser le fichier commit-msg
1. Créer le fichier `commit-msg` dans le dossier `.git/hooks/`
2. Ajouter ce texte dans le fichier:
```
#!/usr/bin/env bash
if ! grep -iqE "(JIRA-[0-9]{1,5})(s)(feat|fix|docs|style|refactor|test|chore)((([a-z0-9_-]{1,})){0,})(:s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```

<a name="link-22"></a>
#### Utiliser le package [pre-commit](https://www.npmjs.com/package/pre-commit)
1. Ajouter dans le fichier `package.json` la propriété `commit-msg`:
```
...
"commit-msg": {
  "regex": "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})",
    "error-message": "Need commit message like: JIRA-12 fix(profile): some text Read Semantic Commit Messages"
},
...
```
2. Exécuter la commande `npm install pre-commit`

<a name="link-23"></a>
##  AU SUJET DE CETTE APPLICATION

<a name="link-24"></a>
### 🎨 Comment personnaliser l'interface?
Vous pouvez créer votre propre thème d'interface. Options:
- **Titre**. Vous pouvez définir le titre du document par défaut dans le paramètre URL `title`. Exemple: `?title=You Company`
- **Thème visuel**. Pour ce faire, vous devez préparer un fichier CSS avec de nouveaux styles et spécifier son URL dans le paramètre `theme`. Exemple: `?theme=//company.com/some.css`. Vous pouvez utiliser les noms de classe comme sélecteurs. La plupart d'entre eux ne changent pas dans les nouvelles versions.
- **Langue**. Vous pouvez définir la langue dans le paramètre URL `lang`. Exemple: `?lang=es`

**Exemple**: [démo](https://bakhirev.github.io/demo/themes/)

<a name="link-25"></a>
### 🛠️ Comment reconstruire le rapport HTML à partir du code source?
- télécharger ce dépôt `git clone https://github.com/bakhirev/assayo.git`
- exécutez `npm install`
- exécutez `npm run build:local`
- la nouvelle construction HTML se trouvera dans le dossier `/build`

<a name="link-26"></a>
### 🈯 Comment ajouter ou éditer une traduction?
Vous pouvez ajouter une nouvelle traduction ou corriger une existante dans le dossier `ts/translations/`.
[Instruction](https://github.com/firstcontributions/first-contributions)

<a name="link-27"></a>
### 📐 Architecture

<a name="link-29"></a>
#### Architecture générale des microservices
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase) affiche une liste de rapports disponibles. Chaque rapport comprend un titre, une description et une liste de dépôts.
2. [Crawler service](https://github.com/bakhirev/assayo-crawler) collecte les journaux du dépôt pour le rapport.
3. [Log visualization UI](https://github.com/bakhirev/assayo) **(vous êtes ici)** affiche le rapport. Il a besoin d'un fichier journal pour fonctionner.

<a name="link-30"></a>
### 📧 Retours, commentaires
- 📱 [https://t.me/bakhirev](https://t.me/bakhirev) (méthode de communication prioritaire)
- 📧 [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- 🌐 [https://bakhirev.github.io/](https://bakhirev.github.io/?ref=github&lang=fr)

