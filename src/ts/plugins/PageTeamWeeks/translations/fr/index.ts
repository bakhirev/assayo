import recommendations from './recommendations';

export default `
§ plugin.team_weeks.sidebar: Par semaines
§ plugin.team_weeks.title: Statistiques par semaines
§ plugin.team_weeks.numberTasks: Nombre de tâches
§ plugin.team_weeks.people: Nombre de salariés
§ plugin.team_weeks.line: Modification des lignes
§ plugin.team_weeks.lossesDetails: Qui n'a pas fait de commit
§ plugin.team_weeks.add: ajouté
§ plugin.team_weeks.change: modifié
§ plugin.team_weeks.remove: supprimé
§ plugin.team_weeks.hasCommits: il y a eu des commits
§ plugin.team_weeks.hasNotCommits: il n'y a pas eu de commits
§ plugin.team_weeks.last.title: Statistiques de la semaine sélectionnée
§ plugin.team_weeks.last.titleDefault: Semaine dernière
§ plugin.team_weeks.last.tasks.title: Tâches de la semaine
§ plugin.team_weeks.last.tasks.description: Numéros de tâche uniques trouvés dans cet intervalle de temps
§ plugin.team_weeks.last.tasks.scoring: Valeur de la semaine précédente / Valeur moyenne du mois précédent
§ plugin.team_weeks.last.changes.title: Modification des lignes
§ plugin.team_weeks.last.changes.description: Lignes ajoutées, modifiées et supprimées
§ plugin.team_weeks.last.changes.scoring: Valeur de la semaine précédente / Valeur moyenne du mois précédent
§ plugin.team_weeks.last.types.title: Types de commit
§ plugin.team_weeks.last.days.title: Jours-personne réels
§ plugin.team_weeks.last.best.title: Le plus actif
§ plugin.team_weeks.last.best.description: Le plus de tâches cette semaine
§ plugin.team_weeks.last.quiet.title: Semaine calme
§ plugin.team_weeks.last.quiet.description: Le moins de tâches cette semaine
§ plugin.team_weeks.last.vsPrev: par rapport à la semaine précédente
${recommendations}
`;
