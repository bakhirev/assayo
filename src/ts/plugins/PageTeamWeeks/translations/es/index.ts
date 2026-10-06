import recommendations from './recommendations';

export default `
§ plugin.team_weeks.sidebar: Por semanas
§ plugin.team_weeks.title: Estadísticas por semanas
§ plugin.team_weeks.numberTasks: Número de tareas
§ plugin.team_weeks.people: Número de empleados
§ plugin.team_weeks.line: Cambio de líneas
§ plugin.team_weeks.lossesDetails: Quién no hizo commit
§ plugin.team_weeks.add: añadido
§ plugin.team_weeks.change: modificado
§ plugin.team_weeks.remove: eliminado
§ plugin.team_weeks.hasCommits: hubo commits
§ plugin.team_weeks.hasNotCommits: no hubo commits
§ plugin.team_weeks.last.title: Estadísticas de la semana seleccionada
§ plugin.team_weeks.last.titleDefault: Última semana
§ plugin.team_weeks.last.tasks.title: Tareas de la semana
§ plugin.team_weeks.last.tasks.description: Números de tarea únicos encontrados en este intervalo de tiempo
§ plugin.team_weeks.last.tasks.scoring: Valor de la semana anterior / Valor medio del mes anterior
§ plugin.team_weeks.last.changes.title: Cambio de líneas
§ plugin.team_weeks.last.changes.description: Líneas añadidas, modificadas y eliminadas
§ plugin.team_weeks.last.changes.scoring: Valor de la semana anterior / Valor medio del mes anterior
§ plugin.team_weeks.last.types.title: Tipos de commit
§ plugin.team_weeks.last.days.title: Días-persona reales
§ plugin.team_weeks.last.best.title: Más activo
§ plugin.team_weeks.last.best.description: Más tareas esta semana
§ plugin.team_weeks.last.quiet.title: Semana tranquila
§ plugin.team_weeks.last.quiet.description: Menos tareas esta semana
§ plugin.team_weeks.last.vsPrev: respecto a la semana anterior
${recommendations}
`;
