> La [documentation principale](https://github.com/bakhirev/assayo/blob/main/documents/RU.md) est en russe. C'est une traduction. Il peut contenir des erreurs. Si vous êtes un locuteur natif, vous pouvez aider à améliorer cette traduction. Merci!

Visualisation et analyse des données de votre dépôt Git ([demo](https://assayo.online/demo/?dump=./test.txt), [install](https://assayo.online/demo/?ref=github)).

##### Un employé peut évaluer un nouveau lieu de travail
- le rythme du travail;
- le nombre de heures supplémentaires;
- les zones de responsabilité;
- la taille des fonctionnalités et bogues;
- le style de travail des collègues;

##### Un chef peut évaluer les employés
- détecter les fainéants;
- estimer la taille du code;
- connaître la vitesse de travail;
- remarquer les anomalies du comportement;
- remarquer les anomalies du comportement;

##### L’investisseur peut évaluer le produit
- le coût du produit;
- le coût des fonctionnalités;
- la durée de développement;
- la projection de la durée des mises à niveau;
- la projection du coût;

### Table of contents

### De combien de commits avez-vous besoin?

Dans le répertoire racine de votre projet, exécutez les commandes suivantes:
```
git shortlog -s -n -e
```
### Comment pouvez-vous combiner les auteurs ?
Dans le répertoire racine de votre projet, créez le fichier suivant: `.mailmap`.
L’exemple de la ligne de fichier est le suivant:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
``` 
Vous pouvez en savoir plus sur le format de ce fichier en lisant la documentation officielle. [ici](https://git-scm.com/docs/gitmailmap).

### Comment télécharger des données depuis git ?

#### Pour une visualisation en ligne
Dans le répertoire racine de votre projet, exécutez:
```
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" > log.txt
```
#### Pour la navigation hors ligne

```
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" | sed -e 's/\\/\\\\/g' | sed -e 's/`/"/g' | sed -e 's/^/report.push(\`/g' | sed 's/$/\`\);/g' | sed 's/\$/_/g' > log.txt
```
Git va créer le fichier `log.txt`.
Son contenu est destiné à la création de rapports.  

La différence entre le format en ligne et le format hors ligne réside dans l’enveloppe des lignes. Le format hors ligne sera chargé comme un fichier js si vous avez simplement ouvert `/build/index.html`

### Comment voir le rapport en ligne?
#### Online
- Aller à [сайт](https://assayo.online/)
- Appuyer sur le bouton “[Démo](https://assayo.online/demo)”
- Faites glisser le fichier `log.txt` dans la fenêtre du navigateur
#### Offline
- Télécharger ce dépôt
- Glisser le fichier `log.txt` dans le dossier `/build`
- Démarrer `/build/index.html`
- Ou coller le dossier `/build` Sur votre dépôt (là où se trouve `log.txt`). Vous pouvez changer le nom. Par exemple avec `/build` sur `/report`. Dans cette cas, il est important que le fichier log.txt ait été généré par le commande pour la visualisation hors ligne.

### Comment recompiler la build du rapport?
- Télécharger ce dépôt
- Exécuter `npm install`
- Exécuter `npm run build-local`
- La dernière build sera dans le dossier `/build`

### Comment voir le compte rendu pour un groupe de microservices?
- générer un fichier pour chaque microservice `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt` etc.)
- Voir “Comment voir le rapport en ligne?”. Au dernier pas, glisser tous les fichiers dans la fenêtre du navigateur.
- Voir “Comment regarder le rapport hors-ligne?”. Au deuxième pas, coller tous les fichier de microservices (`log-1.txt`, `log-2.txt`, `log-3.txt` etc.) dans le dossier du rapport (`/build`).

### Comment apposer une marque sur l’interface?
Vous pouvez écrire votre propre thème pour l’interface. Vous pouvez changer :
- **En-tête**. Vous pouvez le spécifier dans le paramètre de l’URL ```title```. Par exemple: ```?title=You Company```
- **Thème visuel**.Pour cela, vous devez préparer un fichier CSS avec de nouveaux styles et indiquer son adresse dans le paramètre de l’URL ```theme```. Par exemple: ```?theme=//company.com/some.css```. Vous pouvez utiliser les noms de classes comme sélecteurs. La plupart d’entre elles ne changent pas lors de la sortie de nouvelles versions.
- **Langue**. Vous pouvez l’indiquer dans le paramètre d’URL ```lang```. Par exemple: ```?lang=es```

### Comment signer les commits ?

Suivez la pratique [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Par exemple:
```
JIRA-1234 feat(profile): Added avatar for user 
```
- numéro de tâche dans task Tracker `(JIRA-1234)`
- type de travail `(feat, fix, style, refactor, test, doc etc.)`
- ficha `(profile - la section du site, la page ou la nouvelle fonctionnalité, en un mot)`
- quel problème ont-ils résolu `(Added avatar for user)`
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

### Comment automatiser la collecte de données?

#### With backend
- use module [Assayo Crawler](https://github.com/bakhirev/assayo-crawler);

#### Sans back-end
- clonez le dépôt que vous voulez ;
- copiez le dossier `build`;
- Ouvrez `build/index.html` dans le navigateur et ajoutez-le aux favoris;
- ajoutez un raccourci sur `build/assets/ci-cd.sh` dans le dossier de démarrage automatique (Windows); Chaque fois que votre ordinateur se recharge, le script mettra à jour les statistiques sur toutes les données qui se sont automatiquement insérées dans la branche principale.

### DevOps (CI/CD)

#### Serveur public

Vous pouvez mettre à disposition le fichier avec les données pour construire le rapport sur l’URL publique. Et pour sa visualisation, utiliser l’interface web du site. [assayo](https://assayo.online/). Tout simplement, indiquez l’adresse où se trouvent les données dans le paramètre de l’URL ```dump```:
```
https://assayo.online/demo/?dump=//you_site.com/some/log.txt
```

#### Serveur privé
- télécharger [docker образ](https://hub.docker.com/r/bakhirev/assayo);
- Soulevez-le sur le réseau local;
- Pour consulter les rapports, utilisez l’interface web en lui indiquant l’adresse où les données se trouvent, sous forme de paramètre dans l’URL ```dump```:
```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - URL Conteneur assayo, écoute le port 80;
you_url    - URL адресс Adresse de votre conteneur de logs git;
```

Par défaut, l'image s'exécute à ```http://127.0.0.1:80/```. Si cela ne fonctionne pas, vérifiez si le port 80 est disponible.
#### Mise à jour de l’image-Docker

- supprimer la métrique, les alertes, les vieilles builds;
- constuire la build ```npm run build-local```
- assembler l'image ```docker build -t assayo .```
- vérifier visuellement l'image ```docker run --name assayo -p 80:80 -d assayo```;
- mettre la balise ```docker tag assayo bakhirev/assayo:latest```;
- Envoyer le code au référentiel d'images dans Docker Hub ```docker push bakhirev/assayo:latest```;

### ️ About application

#### Architecture
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase) displays a list of available reports. Each report consists of a title, description, and a list of repositories.
2. [Crawler service](https://github.com/bakhirev/assayo-crawler) collects repository logs for the report.
3. [Log visualization UI](https://github.com/bakhirev/assayo) **(you here)** displays report. Needs a log file for work.

#### Les versions sont publiées environ tous les six mois. Quoi de neuf:

- plus de conseils et de succès;
- résultats de l’année / du mois, impression des rapports;
- localisation et internationalisation;
- analyse des fichiers;
- différents rôles pour la statistique (cacher la finance);
- développement du backend, intégrations avec d’autres systèmes;

#### Comment ajouter ou modifier une traduction?

Vous pouvez ajouter une nouvelle traduction ou corriger la traduction existante dans le section ```ts/translations/```.
[Instruction](https://github.com/firstcontributions/first-contributions)

#### Souhaits, suggestions, commentaires
- telegramm [@bakhirev](https://t.me/bakhirev) (voie de communication prioritaire)
- [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- site [https://assayo.online/](https://assayo.online/?ref=github&lang=fr)

