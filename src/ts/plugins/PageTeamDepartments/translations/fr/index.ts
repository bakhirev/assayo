export default `
§ plugin.team_departments.sidebar: Départements
§ plugin.team_departments.employmentsChart.title: Tailles actuelles des équipes
§ plugin.team_departments.employmentsChart.item: équipes
§ plugin.team_departments.employmentsChart.less1: un collaborateur
§ plugin.team_departments.employmentsChart.less2: deux collaborateurs
§ plugin.team_departments.employmentsChart.less3: trois collaborateurs
§ plugin.team_departments.employmentsChart.less6: jusqu’à six collaborateurs
§ plugin.team_departments.employmentsChart.less9: jusqu’à neuf collaborateurs
§ plugin.team_departments.employmentsChart.less12: jusqu’à 12 collaborateurs
§ plugin.team_departments.employmentsChart.less15: jusqu’à 15 collaborateurs
§ plugin.team_departments.employmentsChart.more: plus de 15
§ plugin.team_departments.daysChart.title: Durée du projet
§ plugin.team_departments.daysChart.item: projets
§ plugin.team_departments.title: Liste des projets
§ plugin.team_departments.status: Statut
§ plugin.team_departments.active.yes: Développement en cours
§ plugin.team_departments.active.no: Pas de nouvelles tâches
§ plugin.team_departments.author.work: travaille
§ plugin.team_departments.author.dismissed: parti
§ plugin.team_departments.author.staff: assistance
§ plugin.team_departments.code: Code
§ plugin.team_departments.from: Premier commit
§ plugin.team_departments.to: Dernier
§ plugin.team_departments.authors: personnes
§ plugin.team_departments.tasks: tâches
§ plugin.team_departments.totalDays: Durée
§ plugin.team_departments.totalAuthors: Collaborateurs
§ plugin.team_departments.totalTasks: Tâches
§ plugin.team_departments.employments.author: Collaborateur
§ plugin.team_departments.employments.worked: travail
§ plugin.team_departments.employments.losses: jours sans commits
§ plugin.team_departments.employments.totalDays: Jours dans le département
§ plugin.team_departments.employments.totalTasks: Tâches réalisées
§ plugin.team_departments.banner.title: informations détaillées sur le département
§ plugin.team_departments.details.title: Données réelles du département
§ plugin.team_departments.details.totalDays: durée du travail
§ plugin.team_departments.details.moneyInMonth: coût de développement par mois
§ plugin.team_departments.details.moneyAll: coût de développement sur la période
§ plugin.team_departments.details.mainLocation: localisation principale
§ plugin.team_departments.details.activeAuthors.title: travaille / a quitté
§ plugin.team_departments.details.activeAuthors.description: Si un collaborateur n’a effectué aucun commit pendant un mois, il est considéré comme parti. Le statut est affiché pour les collaborateurs indépendamment de ce département : ils peuvent travailler dans n’importe quel département ou avoir quitté l’entreprise complètement.
§ plugin.team_departments.details.linesInTask.title: lignes de code par tâche
§ plugin.team_departments.details.linesInTask.description: Nombre moyen pondéré de lignes de code par tâche. Aide à estimer la granularité des tâches.
§ plugin.team_departments.details.totalTasks.title: tâches étaient en cours
§ plugin.team_departments.details.totalTasks.description: Toute mention d’un identifiant de tâche unique est comptée. La tâche peut ne pas avoir été clôturée dans le système de suivi des tâches.
§ plugin.team_departments.months.title: Nombre possible de collaborateurs dans le département
§ plugin.team_departments.months.description: Le système de suivi des tâches attribue des identifiants de tâche séquentiels. En connaissant l’identifiant maximal au début et à la fin du mois, on obtient le nombre de *nouvelles tâches*. Le nombre de tâches *corrigées* ce mois-ci est visible dans les logs. Qui les a corrigées (*a travaillé*) l’est aussi. Le nombre de tâches corrigées plus tard (*backlog*) est calculé à partir des logs des mois suivants. Nous extrapolons le débit des programmeurs visibles au nombre total de tâches pour estimer combien de *programmeurs au total* devraient être dans le département. À partir du nombre de « programmeurs », nous estimons le nombre d’ingénieurs QA, d’analystes et de managers.
§ plugin.team_departments.months.newTaskInMonth: Nouvelles tâches
§ plugin.team_departments.months.tasksFixedThisGroup: Corrigées
§ plugin.team_departments.months.tasksInBacklog: Backlog
§ plugin.team_departments.months.programmistInThisGroup: Ont travaillé
§ plugin.team_departments.months.allProgrammistInDepartment: Devraient travailler
§ plugin.team_departments.months.allUsersInDepartment: Effectif total
§ plugin.team_departments.forecasting.title: Prévision du coût total
§ plugin.team_departments.forecasting.moneyInMonth.title: coûts du département par mois
§ plugin.team_departments.forecasting.moneyInMonth.description: Multiplier le nombre de tous les collaborateurs potentiels (développement, QA, analytique, management) du dernier mois par le salaire moyen.
§ plugin.team_departments.forecasting.moneyAll.title: coûts du département sur toute la période
§ plugin.team_departments.forecasting.moneyAll.description: Multiplier le nombre de tous les collaborateurs potentiels (développement, QA, analytique, management) pour chaque mois par le salaire moyen.
`;
