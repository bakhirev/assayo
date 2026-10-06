export default `
§ plugin.team_weeks.recommendations.lazyDays.down.title: Moins d'absences
§ plugin.team_weeks.recommendations.lazyDays.down.description: cet indicateur a baissé au cours des trois dernières semaines
§ plugin.team_weeks.recommendations.lazyDays.up.title: Plus d'absences
§ plugin.team_weeks.recommendations.lazyDays.up.description: il n'y a pas de tâches, ou un contrôle plus strict est nécessaire
§ plugin.team_weeks.recommendations.notWork.title: Ne fournit pas de façon stable le temps complet
§ plugin.team_weeks.recommendations.notWork.description: car chaque semaine le code est écrit pendant moins de 100 % du temps
§ plugin.team_weeks.recommendations.upWork.title: Fait des heures supplémentaires de façon stable
§ plugin.team_weeks.recommendations.upWork.description: car chaque semaine du code est écrit le week-end
§ plugin.team_weeks.recommendations.task.up.title: La productivité augmente
§ plugin.team_weeks.recommendations.task.up.description
ou les tâches sont devenues trop petites.
 
Il faut vérifier. Si la granularité est la même, consolider le résultat.
§ plugin.team_weeks.recommendations.task.lazyMaintainer.description: un leader stable par l'absence de commits.
§ plugin.team_weeks.recommendations.task.down.title: La productivité baisse
§ plugin.team_weeks.recommendations.task.down.description
ou les tâches sont moins bien découpées. Il faut vérifier. Si la granularité est la même, le placer sous contrôle.

# Méthode d'évaluation :
- le nombre de tâches par jour sur lesquelles on travaille baisse de façon stable au cours des trois dernières semaines.

# Erreurs possibles :
- les tâches ont pu être plus difficiles qu'il n'y paraissait ;
- les tâches ont pu avoir un volume de travail important (il faut vérifier si le nombre de modifications baisse sur la même période)
`;
