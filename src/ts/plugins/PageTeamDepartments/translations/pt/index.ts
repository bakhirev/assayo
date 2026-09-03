export default `
§ plugin.team_departments.sidebar: Departamentos
§ plugin.team_departments.employmentsChart.title: Tamanhos atuais das equipes
§ plugin.team_departments.employmentsChart.item: equipes
§ plugin.team_departments.employmentsChart.less1: um colaborador
§ plugin.team_departments.employmentsChart.less2: dois colaboradores
§ plugin.team_departments.employmentsChart.less3: três colaboradores
§ plugin.team_departments.employmentsChart.less6: até seis colaboradores
§ plugin.team_departments.employmentsChart.less9: até nove colaboradores
§ plugin.team_departments.employmentsChart.less12: até 12 colaboradores
§ plugin.team_departments.employmentsChart.less15: até 15 colaboradores
§ plugin.team_departments.employmentsChart.more: mais de 15
§ plugin.team_departments.daysChart.title: Duração do projeto
§ plugin.team_departments.daysChart.item: projetos
§ plugin.team_departments.title: Lista de projetos
§ plugin.team_departments.status: Status
§ plugin.team_departments.active.yes: Desenvolvimento em andamento
§ plugin.team_departments.active.no: Sem novas tarefas
§ plugin.team_departments.author.work: trabalha
§ plugin.team_departments.author.dismissed: saiu
§ plugin.team_departments.author.staff: apoio
§ plugin.team_departments.code: Código
§ plugin.team_departments.from: Primeiro commit
§ plugin.team_departments.to: Último
§ plugin.team_departments.authors: pessoas
§ plugin.team_departments.tasks: tarefas
§ plugin.team_departments.totalDays: Duração
§ plugin.team_departments.totalAuthors: Colaboradores
§ plugin.team_departments.totalTasks: Tarefas
§ plugin.team_departments.employments.author: Colaborador
§ plugin.team_departments.employments.worked: trabalho
§ plugin.team_departments.employments.losses: dias sem commits
§ plugin.team_departments.employments.totalDays: Dias no departamento
§ plugin.team_departments.employments.totalTasks: Tarefas concluídas
§ plugin.team_departments.banner.title: informações detalhadas do departamento
§ plugin.team_departments.details.title: Dados reais do departamento
§ plugin.team_departments.details.totalDays: duração do trabalho
§ plugin.team_departments.details.moneyInMonth: custo de desenvolvimento por mês
§ plugin.team_departments.details.moneyAll: custo de desenvolvimento ao longo do tempo
§ plugin.team_departments.details.mainLocation: localização principal
§ plugin.team_departments.details.activeAuthors.title: trabalha / saiu
§ plugin.team_departments.details.activeAuthors.description: Se um colaborador não fizer nenhum commit em um mês, considera-se que saiu. O status é mostrado para os colaboradores independentemente deste departamento: eles podem trabalhar em qualquer departamento ou ter saído da empresa por completo.
§ plugin.team_departments.details.linesInTask.title: linhas de código por tarefa
§ plugin.team_departments.details.linesInTask.description: Número médio ponderado de linhas de código por tarefa. Ajuda a estimar a granularidade das tarefas.
§ plugin.team_departments.details.totalTasks.title: tarefas estiveram em andamento
§ plugin.team_departments.details.totalTasks.description: Qualquer menção a um ID de tarefa único é contada. A tarefa pode não ter sido fechada no sistema de acompanhamento de tarefas.
§ plugin.team_departments.months.title: Possível número de colaboradores no departamento
§ plugin.team_departments.months.description: O rastreador de tarefas emite IDs de tarefa sequenciais. Conhecendo o ID máximo no início e no fim do mês, obtemos o número de *novas tarefas*. O número de tarefas *corrigidas* neste mês aparece nos logs. Quem as corrigiu (*trabalhou*) também aparece. O número de tarefas corrigidas mais tarde (*backlog*) é calculado a partir dos logs dos meses seguintes. Extrapolamos a produtividade dos programadores visíveis para o total de tarefas a fim de estimar quantos *programadores no total* deveriam estar no departamento. Com base no número de «programadores», estimamos o de engenheiros de QA, analistas e gestores.
§ plugin.team_departments.months.newTaskInMonth: Novas tarefas
§ plugin.team_departments.months.tasksFixedThisGroup: Corrigidas
§ plugin.team_departments.months.tasksInBacklog: Backlog
§ plugin.team_departments.months.programmistInThisGroup: Trabalharam
§ plugin.team_departments.months.allProgrammistInDepartment: Deveriam trabalhar
§ plugin.team_departments.months.allUsersInDepartment: Pessoal total
§ plugin.team_departments.forecasting.title: Previsão do custo total
§ plugin.team_departments.forecasting.moneyInMonth.title: custos do departamento por mês
§ plugin.team_departments.forecasting.moneyInMonth.description: Multiplica-se o número de todos os colaboradores potenciais (desenvolvimento, QA, analítica, gestão) do último mês pelo salário médio.
§ plugin.team_departments.forecasting.moneyAll.title: custos do departamento ao longo do tempo
§ plugin.team_departments.forecasting.moneyAll.description: Multiplica-se o número de todos os colaboradores potenciais (desenvolvimento, QA, analítica, gestão) de cada mês pelo salário médio.
`;
