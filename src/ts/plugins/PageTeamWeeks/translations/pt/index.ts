import recommendations from './recommendations';

export default `
§ plugin.team_weeks.sidebar: Por semanas
§ plugin.team_weeks.title: Estatísticas por semanas
§ plugin.team_weeks.numberTasks: Número de tarefas
§ plugin.team_weeks.people: Número de funcionários
§ plugin.team_weeks.line: Alteração de linhas
§ plugin.team_weeks.lossesDetails: Quem não fez commit
§ plugin.team_weeks.add: adicionado
§ plugin.team_weeks.change: alterado
§ plugin.team_weeks.remove: removido
§ plugin.team_weeks.hasCommits: houve commits
§ plugin.team_weeks.hasNotCommits: não houve commits
§ plugin.team_weeks.last.title: Estatísticas da semana selecionada
§ plugin.team_weeks.last.titleDefault: Última semana
§ plugin.team_weeks.last.tasks.title: Tarefas da semana
§ plugin.team_weeks.last.tasks.description: Números de tarefa únicos encontrados neste intervalo de tempo
§ plugin.team_weeks.last.tasks.scoring: Valor da semana anterior / Valor médio do mês anterior
§ plugin.team_weeks.last.changes.title: Alteração de linhas
§ plugin.team_weeks.last.changes.description: Linhas adicionadas, alteradas e removidas
§ plugin.team_weeks.last.changes.scoring: Valor da semana anterior / Valor médio do mês anterior
§ plugin.team_weeks.last.types.title: Tipos de commit
§ plugin.team_weeks.last.days.title: Dias-pessoa reais
§ plugin.team_weeks.last.best.title: Mais ativo
§ plugin.team_weeks.last.best.description: Mais tarefas nesta semana
§ plugin.team_weeks.last.quiet.title: Semana calma
§ plugin.team_weeks.last.quiet.description: Menos tarefas nesta semana
§ plugin.team_weeks.last.vsPrev: em relação à semana anterior
${recommendations}
`;
