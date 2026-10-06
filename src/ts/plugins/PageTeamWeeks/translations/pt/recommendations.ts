export default `
§ plugin.team_weeks.recommendations.lazyDays.down.title: Menos faltas
§ plugin.team_weeks.recommendations.lazyDays.down.description: este indicador caiu nas últimas três semanas
§ plugin.team_weeks.recommendations.lazyDays.up.title: Mais faltas
§ plugin.team_weeks.recommendations.lazyDays.up.description: não há tarefas ou é necessário um controle mais rigoroso
§ plugin.team_weeks.recommendations.notWork.title: Não cumpre de forma estável o tempo integral
§ plugin.team_weeks.recommendations.notWork.description: porque todas as semanas escreve código em menos de 100% do tempo
§ plugin.team_weeks.recommendations.upWork.title: Faz horas extra de forma estável
§ plugin.team_weeks.recommendations.upWork.description: porque todas as semanas escreve código aos fins de semana
§ plugin.team_weeks.recommendations.task.up.title: A produtividade está crescendo
§ plugin.team_weeks.recommendations.task.up.description
ou as tarefas ficaram pequenas demais.
 
É necessário verificar. Se a granularidade for a mesma, consolidar o resultado.
§ plugin.team_weeks.recommendations.task.lazyMaintainer.description: líder estável pela ausência de commits.
§ plugin.team_weeks.recommendations.task.down.title: A produtividade está caindo
§ plugin.team_weeks.recommendations.task.down.description
ou as tarefas são divididas de forma pior. É necessário verificar. Se a granularidade for a mesma, colocar sob controle.

# Método de avaliação:
- o número de tarefas por dia em que se trabalha tem caído de forma estável ao longo das últimas três semanas.

# Possíveis erros:
- as tarefas podem ter sido mais difíceis do que pareciam;
- as tarefas podem ter tido um grande volume de trabalho (é necessário verificar se o número de alterações cai no mesmo período)
`;
