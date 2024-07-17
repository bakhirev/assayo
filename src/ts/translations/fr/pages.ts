export default `
§ page.welcome.step1: Exécutez la commande à la racine de votre projet
§ page.welcome.step3: transférer
§ page.welcome.step4: fichier log.txt sur cette page
§ page.welcome.description: Git créer un fichier log.txt. Il contient les données pour générer le rapport. Exécutez la commande git shortlog -s -n -e si vous n'avez pas besoin du rapport. Créer un fichier [.mailmap|https://git-scm.com/docs/gitmailmap] à la racine du projet est de combiner les statistiques sur les employés.
§ page.welcome.warning1: Le service ne STOCKE ni ne TRANSMET vos données. Tous les calculs sont effectués sur votre ordinateur.
§ page.welcome.warning2: Le service ne COLLECTE pas de STATISTIQUES sur les projets. Vous pouvez regarder [code source|https://github.com/bakhirev/assayo].
§ page.common.words.title: Statistiques par mots
§ page.common.words.description: le mot le plus populaire. Rencontre $1 fois.
§ page.common.commits.title: Nombre de commits par jour
§ page.common.commits.description: ($1) le jour le plus productif par le nombre de commits.
§ page.common.commits.title2: $1 commits faits: $2
§ page.common.filter.allUsers: Pas d'importance
§ page.print.modal.title: On imprime quoi?
§ page.print.modal.page: Page actuelle
§ page.print.modal.type: Section actuelle
§ page.print.modal.all: Toutes les statistiques
§ page.print.modal.cancel: Annulation
§ page.print.tableOfContents: Table des matières
§ page.print.title: Rapport sur dépôt git
§ page.print.sub_title: «$1»
§ page.print.description: Les données du rapport ont été extraites de l'historique des commits.
§ page.team.author.title: Statistiques du personnel
§ page.team.author.description1: Partie des statistiques (vitesse de travail, argent dépensé, etc.) pour les collaborateurs de type “Assistant”, ce n’est pas une rôle permanente dans le projet. Leur travail est insignifiant et peut être ignoré.
§ page.team.author.description2: Le tri par défaut est le tri par nombre de tâches et de groupes (employés actuels, licenciés et aidants).
§ page.team.author.status: Status
§ page.team.author.firstCommit: First commit
§ page.team.author.lastCommit: Last
§ page.team.author.daysAll: Total days
§ page.team.author.types: Type de travaux
§ page.team.author.commits: Commits
§ page.team.author.commitsSmall: commits
§ page.team.author.tasks: tâche
§ page.team.author.tasksSmall: tâche
§ page.team.author.workedLosses: Jours avec et sans commits
§ page.team.author.worked: travail
§ page.team.author.losses: jours sans commits
§ page.team.author.days: jours
§ page.team.author.daysForTask: Jours par tâche
§ page.team.author.scopes: Mise au point
§ page.team.author.moneyAll: L'argent reçu
§ page.team.author.moneyWorked: Travaillas
§ page.team.author.moneyLosses: Trop-perçu
§ page.team.author.type.work: works
§ page.team.author.type.dismissed: dismissed
§ page.team.author.type.staff: staff
§ page.team.hours.title: Répartition du travail pour chaque jour de la semaine
§ page.team.month.title: Calendrier du projet
§ page.team.month.first: (first work day)
§ page.team.month.last: (last work day)
§ page.team.scope.title: Statistiques par module
§ page.team.scope.scope: Mise au point
§ page.team.scope.days: Esclave. jours
§ page.team.scope.authorsDays: Jours-homme
§ page.team.scope.tasks: Tâches
§ page.team.scope.commits: Commits
§ page.team.scope.commitsSmall: commits
§ page.team.scope.types: Type de travaux
§ page.team.scope.authors: Contribution personnelle
§ page.team.scope.cost: Coût
§ page.team.type.title: Statistiques par type de tâche
§ page.team.type.description: *Contribution personnelle* compte tenu du nombre de commits plutôt que de la taille des lignes ou fichiers modifiés. Vous devez donc également consulter la section “Analyse des fichiers” afin d’évaluer l’ampleur des modifications.
§ page.team.type.type: Type de travail
§ page.team.type.tasks: Задач
§ page.team.type.tasksSmall: Tâche
§ page.team.type.days: Jours
§ page.team.type.daysSmall: Jours
§ page.team.type.authorsDays: Jours-homme
§ page.team.type.commits: Commits
§ page.team.type.authors: Contribution personnelle
§ page.team.total.titleA: Volume de travaux
§ page.team.total.titleB: Coût
§ page.team.total.daysWorked.title: jours-homme
§ page.team.total.daysWorked.description: Seuls les jours où les commits ont été effectués sont pris en compte
§ page.team.total.commits.title: commits
§ page.team.total.commits.description: Les branches supprimées ne comptent pas
§ page.team.total.daysLosses.title: jours sans commits
§ page.team.total.daysLosses.description: Tous les jours moins: vacances, week-ends, vacances, jours avec commits
§ page.team.total.employment.title: fonctionne / démissionnas
§ page.team.total.employment.description: Si un employé n'a fait aucun commit dans un mois, il est considéré comme licencié
§ page.team.total.moneyAll.title: générale
§ page.team.total.moneyAll.description: Coûts salariaux totaux
§ page.team.total.moneyWorked.title: réelle
§ page.team.total.moneyWorked.description: Jours effectivement travaillés multipliés par le salaire moyen
§ page.team.total.moneyLosses.title: trop-perçu possible
§ page.team.total.moneyLosses.description: Jours ouvrables payés quand il n'y avait pas de commits
§ page.team.total.weekendPayment.title: travail le week-end
§ page.team.total.weekendPayment.description: Trop-perçu total pour le travail de week-end
§ page.team.total.workSpeed.title: tâches par jour
§ page.team.total.workSpeed.description: Vitesse moyenne de travail de l'équipe avec la composition actuelle des employés
§ page.team.total.moneySpeed.title: par mois
§ page.team.total.moneySpeed.description: Montant prévu de la masse salariale, compte tenu de la composition actuelle du personnel, hors taxes et dépenses connexes
§ page.team.total.description1: *Jours-homme* — c'est le travail d'un employé pendant une journée de travail. Par exemple, pour un jour calendaire, une équipe de trois employés produit une charge de travail de trois jours-homme.
§ page.team.total.description2: *Jours d'absentéisme* seuls les jours ouvrables où les commits auraient pu être faits sont considérés. Les week-ends, les jours fériés et les vacances ne sont pas inclus dans le calcul.
§ page.team.total.description3: Carte *travaille et a démissionné* cela indique la composition effective des collaborateurs qui participent activement au projet. En outre, il y a des “assistants”, qui sont généralement des collaborateurs d’une autre spécialité et qui peuvent parfois faire des commits sur le projet.
§ page.team.total.description4: *Trop-perçu* с seulement les jours ouverts où des commits auraient pu être faits sont comptabilisés. Les jours fériés, les jours de congés payés et les jours chômés ne sont pas pris en compte. C'est pourquoi le trop-payé + le coût réel != général. Le coût total comprend le paiement des week-ends, des jours fériés et des vacances.
§ page.team.total.description5: *Travail le week-end* le calcul se fait selon un coefficient x2 sur le salaire du jour normal. Ce qui est affiché ici est précisément le surcoût (x1), car le fait même de travail supplémentaire n’est pas d’intérêt ici. Nous ne regardons pas la vitesse à laquelle le budget est brûlé. Nous regardons le surcoût lorsque la vitesse de travail augmente.
§ page.team.tree.title: Arborescence du projet avec les filtres sélectionnés
§ page.team.tree.filters.author: Employé
§ page.team.tree.filters.commits: Nombre de commits
§ page.team.tree.filters.help: Minimum commits que l'employé a fait dans le fichier
§ page.team.tree.filters.all: Tous les employés
§ page.team.tree.add: Qui a Ajouté
§ page.team.tree.change: Qui a changé
§ page.team.tree.remove: Qui a supprimé
§ page.team.tree.line: lignes
§ page.team.tree.linesAdded: ajoutâtes
§ page.team.tree.linesChanged: changed
§ page.team.tree.linesRemoved: modifiâtes
§ page.team.day.commits: Commits
§ page.team.day.activity: Activity
§ page.team.week.title: Statistiques par semaine
§ page.team.week.date: Date
§ page.team.week.numberTasks: Nombre de tâches
§ page.team.week.people: Nombre de personnes
§ page.team.week.line: Modification des lignes
§ page.team.week.days: Jours avec et sans commits
§ page.team.week.lossesDetails: Qui n'a pas commis
§ page.team.week.add: добавили
§ page.team.week.change: modifiâtes
§ page.team.week.remove: supprimâtes
§ page.team.week.hasCommits: il y avait des commits
§ page.team.week.hasNotCommits: il n'y avait pas de commits
§ page.team.week.days: jours
§ page.team.week.tasks: tâches
§ page.team.pr.task: tâches
§ page.team.pr.tasks: tâches
§ page.team.pr.firstCommitTime: Premier commit
§ page.team.pr.lastCommitTime: Dernier
§ page.team.pr.workDays: Average time spent working on a task
§ page.team.pr.delayDays: Average time of the PR review
§ page.team.pr.all.workDays: Time spent working on a task
§ page.team.pr.all.delayDays: Time of the PR review
§ page.team.pr.middleTimeRelease: The ratio of development time to review time
§ page.team.pr.chart.1day: day
§ page.team.pr.chart.3day: three days
§ page.team.pr.chart.7day: week
§ page.team.pr.chart.14day: two weeks
§ page.team.pr.chart.30day: month
§ page.team.pr.chart.more: more
§ page.team.pr.commits: Commits
§ page.team.pr.date: Date de diffusion
§ page.team.pr.mergeAuthor: Versai
§ page.team.pr.author: Employé
§ page.team.pr.work: développement
§ page.team.pr.delay: attente
§ page.team.pr.days: jours
§ page.team.pr.oneTaskDays: Temps passé sur une tâche
§ page.team.pr.description1: *Temps de développement* c’est la différence de temps entre le premier et le dernier commit pour un problème donné. Il n’importe pas si il y avait des pauses pendant plusieurs jours entre les commits, ou non. Le fait même d’avoir fait un quelconque commit augmente le temps.
§ page.team.pr.description2: *Délai d'attente* c'est le temps entre le dernier commit et l'injection de code. Il montre le réel simple en attendant quoi que ce soit.
§ page.team.pr.description3: *Pourquoi afficher le temps de développement* sans se diviser en Coding et revue de code? Ensuite, pour montrer à l'entreprise le délai de Livraison réel du code. L'attente des tests, les commentaires sur la revue, les problèmes de DevOps et d'autres imperfections du processus sont déjà posés dans cette période.
§ page.team.pr.statByAuthors: Statistiques du personnel
§ page.team.pr.longDelay: Longue attente pour l'injection
§ page.team.tasks.task: Tâche
§ page.team.tasks.author: Auteur du premier commit
§ page.team.tasks.from: Premier commit
§ page.team.tasks.to: Dernier commit
§ page.team.tasks.daysInWork: Jours de travail
§ page.team.tasks.commits: Nombre de commits
§ page.team.tasks.pr: Date de diffusion
§ page.team.tasks.prAuthor: Versai
§ page.team.tasks.prDelayDays: Jours d'attente
§ page.team.tasks.comments: Commentaires
§ page.team.extension.extension: File extensions
§ page.team.extension.type: File sub types
§ page.team.extension.name: Type
§ page.team.extension.path: Path
§ page.team.extension.current.count: Number
§ page.team.extension.removed.count: Number of removed
§ page.team.extension.files: files
§ page.team.release.title: Release
§ page.team.release.from: Created date
§ page.team.release.to: Delivery date
§ page.team.release.prLength: Tasks
§ page.team.release.delay: Preparation days
§ page.team.release.waiting: Days of waiting for next release
§ page.person.print.photo.title: Photo
§ page.person.print.photo.description: place à la photographie
§ page.person.total.title: Caractéristiques de base
§ page.person.total.daysWorked.title: jours de travail
§ page.person.total.daysWorked.description: Seuls les jours où les commits ont été effectués sont pris en compte
§ page.person.total.tasks.title: tâches
§ page.person.total.tasks.description: Si les commits sont correctement signés
§ page.person.character.title: Personnage
§ page.person.achievement.title: Les progrès
§ page.person.achievement.positive: Positifs
§ page.person.achievement.normal: Neutres
§ page.person.achievement.negative: Négatifs
§ page.person.achievement.description: Plus un collaborateur a accumulé d’achievements négatifs, plus il est probable qu’il y ait une situation inhabituelle. Il se peut que vous deviez changer son mode de travail, ses tâches ou ses rapports. Vous devriez parler avec lui et découvrir quels problèmes entravent son travail.
§ page.person.gets.title: Les gètes prises:
§ page.person.gets.description: «Prendre geth» dans ce cas, cela signifie d'abord laisser le commit à la tâche avec un numéro «beau».
§ page.person.business.days.title: jours de travail
§ page.person.business.days.description: Seuls les jours où les commits ont été effectués sont pris en compte
§ page.person.business.tasks.title: tâches
§ page.person.business.tasks.description: Si les commits sont correctement signés
§ page.person.business.losses.title: jours sans commits
§ page.person.business.losses.description: Tous les jours moins: vacances, week-ends, vacances, jours avec commits
§ page.person.business.commits.title: commits
§ page.person.business.commits.description: Les branches supprimées ne comptent pas
§ page.person.business.time.description: Temps de la première à la Dernière commits (y compris les jours non ouvrables)
§ page.person.business.time.title: Jours sur le projet:
§ page.person.business.time.dismissed: (licencié)
§ page.person.business.time.staff: (pas dans l'équipe)
§ page.person.business.achievements: Les progrès
§ page.person.changes.title: Les progrès
§ page.person.changes.description: 
 Avec certaines formes de formatage, git marque les lignes comme “supprimées” et “ajoutées”, bien qu’en réalité, elles aient été “modifiées”. Par conséquent, si vous effectuez un grand refactoring, git peut montrer une petite quantité de modifications dans les statistiques, et le résultat réel sera marqué comme un bond dans les lignes “supprimées” et “ajoutées”.
§ page.person.changes.description: La liste des commits et le nombre de modifications qu'ils ont apportées au cours de cette journée:
§ page.person.commits.title: Liste des commits:
§ page.person.money.title.total: Pour tous les temps
§ page.person.money.title.middle: Valeur moyenne
§ page.person.money.moneyAll.title: reçut
§ page.person.money.moneyAll.description: Montant estimatif des dépenses d & apos; appui au projet (voir paramètres)
§ page.person.money.moneyWorked.title: travaillas
§ page.person.money.moneyWorked.description: Jours effectivement travaillés multipliés par le nombre moyen de jours travaillés
§ page.person.money.moneyLosses.title: trop-perçu possible
§ page.person.money.moneyLosses.description: Jours sans commits multipliés par la moyenne SN
§ page.person.money.tasks.title: tâche
§ page.person.money.tasks.description: Nombre de tâches fermées au coût de la journée
§ page.person.money.commits.title: commit
§ page.person.money.commits.description: Nombre de commits par jour ouvrable
§ page.person.speed.task: Une tâche en moyenne est
§ page.person.speed.max: Vitesse maximale par jour
§ page.person.speed.days.title: jours
§ page.person.speed.days.description: Cela signifie des jours ouvrables si les commits sont correctement signés
§ page.person.speed.commits.title: commits
§ page.person.speed.commits.description: 10% des valeurs maximales et minimales sont coupées
§ page.person.speed.line.title: lignes de code
§ page.person.speed.line.description: 10% des valeurs maximales et minimales sont coupées
§ page.person.speed.tasks.title: tâches
§ page.person.speed.tasks.description: La tâche peut ne pas être terminée, mais le travail sur elle doit être
§ page.person.speed.maxCommits.title: commits
§ page.person.speed.maxCommits.description: La tâche peut ne pas être terminée, mais le travail sur elle doit être
§ page.person.hours.title: Répartition des commits par jour de la semaine
§ page.person.week.date: Date
§ page.person.week.tasks: Nombre de tâches
§ page.person.week.workDays: Jours avec commits
§ page.person.week.taskInDay: Tâches par jour
§ page.person.week.days: jours
§ page.person.week.workDay: jours de semaine
§ page.person.week.weekends: congés
§ page.sponsor.title: Please, support this project
§ page.sponsor.share.description: Tell about our [project|https://github.com/bakhirev/assayo] on social networks! You can share [article|https://habr.com/ru/articles/763342/], [post|https://www.reddit.com/r/github/comments/1bvtsl3/how_i_parsed_git_statistics/] or make a video review.
§ page.sponsor.share.button: Copy the link
§ page.sponsor.money.description: We will be glad if you support us with any amount! All funds will be used for the further development of the project.
§ page.sponsor.money.qr: One-time payment (only Russia)
§ page.sponsor.money.github: GitHub Sponsor
`;
