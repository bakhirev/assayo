export default `
§ plugin.team_weeks.recommendations.lazyDays.down.title: Menos ausencias
§ plugin.team_weeks.recommendations.lazyDays.down.description: este indicador ha bajado en las últimas tres semanas
§ plugin.team_weeks.recommendations.lazyDays.up.title: Más ausencias
§ plugin.team_weeks.recommendations.lazyDays.up.description: no hay tareas o se necesita un control más estricto
§ plugin.team_weeks.recommendations.notWork.title: No completa de forma estable la jornada
§ plugin.team_weeks.recommendations.notWork.description: porque cada semana escribe código menos del 100 % del tiempo
§ plugin.team_weeks.recommendations.upWork.title: Trabaja de más de forma estable
§ plugin.team_weeks.recommendations.upWork.description: porque cada semana escribe código los fines de semana
§ plugin.team_weeks.recommendations.task.up.title: La productividad crece
§ plugin.team_weeks.recommendations.task.up.description
o las tareas se han vuelto demasiado pequeñas.
 
Hay que comprobarlo. Si la granularidad es la misma, consolidar el resultado.
§ plugin.team_weeks.recommendations.task.lazyMaintainer.description: líder estable por la ausencia de commits.
§ plugin.team_weeks.recommendations.task.down.title: La productividad cae
§ plugin.team_weeks.recommendations.task.down.description
o las tareas se dividen peor. Hay que comprobarlo. Si la granularidad es la misma, someterlo a control.

# Método de evaluación:
- el número de tareas al día en las que se trabaja ha ido cayendo de forma estable durante las últimas tres semanas.

# Posibles errores:
- las tareas podían ser más difíciles de lo que parecían;
- las tareas podían tener un gran volumen de trabajo (hay que comprobar si el número de cambios cae o no en el mismo período)
`;
