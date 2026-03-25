export default `
§ plugin.team_total.sidebar: Informação geral
§ plugin.team_total.common.title: Informação geral
§ plugin.team_total.common.duration.title: duração total do trabalho
§ plugin.team_total.common.duration.description: Todo tempo de desenvolvimento do primeiro ao último commit
§ plugin.team_total.common.location.title: escritório central
§ plugin.team_total.common.employees.title: pessoas no departamento
§ plugin.team_total.release.title: Informações de lançamentos
§ plugin.team_total.release.total.title: total de lançamentos
§ plugin.team_total.release.total.description: Informações de lançamentos
§ plugin.team_total.money.title: Custo de desenvolvimento
§ plugin.team_total.titleA: Volume de trabalho
§ plugin.team_total.titleB: Custo
§ plugin.team_total.daysWorked.title: dias-homem
§ plugin.team_total.daysWorked.description: Consideram-se apenas os dias em que foram feitos commits
§ plugin.team_total.commits.title: commits
§ plugin.team_total.commits.description: Branches removidas não são contabilizadas
§ plugin.team_total.daysLosses.title: dias sem commits
§ plugin.team_total.daysLosses.description: Todos os dias menos: feriados, fins de semana, férias, dias com commits
§ plugin.team_total.employment.title: ativos / desligados
§ plugin.team_total.employment.description: Se um colaborador não fizer nenhum commit ao longo de um mês, considera-se que foi desligado
§ plugin.team_total.moneyAll.title: custos de desenvolvimento
§ plugin.team_total.moneyAll.description: Custos salariais totais, incluindo férias remuneradas e sobrepagamento por trabalho aos fins de semana.
§ plugin.team_total.moneyWorked.title: real
§ plugin.team_total.moneyWorked.description: Dias efetivamente trabalhados multiplicados pela média salarial
§ plugin.team_total.moneyLosses.title: possível sobrepagamento
§ plugin.team_total.moneyLosses.description: Dias úteis pagos quando não houve commits
§ plugin.team_total.weekendPayment.title: trabalho no fim de semana
§ plugin.team_total.weekendPayment.description: Sobrepagamento total por trabalho aos fins de semana
§ plugin.team_total.workSpeed.title: tarefas por dia
§ plugin.team_total.workSpeed.description: Velocidade média de trabalho da equipe com a composição atual de colaboradores
§ plugin.team_total.moneySpeed.title: por mês
§ plugin.team_total.moneySpeed.description: Valor previsto de folha salarial com a composição atual de colaboradores, sem considerar impostos e custos relacionados
§ plugin.team_total.description1: *Dias-homem* é o trabalho de um colaborador durante um dia útil. Por exemplo, em um dia do calendário, uma equipe de três colaboradores entrega um volume de trabalho de três dias-homem.
§ plugin.team_total.description2: Por *dias de ausência* consideram-se apenas os dias úteis em que commits poderiam ter sido feitos. Fins de semana, feriados nacionais e férias não participam do cálculo.
§ plugin.team_total.description3: O cartão *ativos e desligados* mostra a composição real de colaboradores que participam continuamente do trabalho. Além disso, há “ajudantes” — colaboradores, em geral de outra especialidade, que podem ocasionalmente fazer commits no projeto.
§ plugin.team_total.description4: Por *sobrepagamento* consideram-se apenas os dias úteis em que commits poderiam ter sido feitos. Fins de semana, feriados nacionais e férias não participam do cálculo. Por isso, sobrepagamento + custo real != total. O total inclui pagamento de fins de semana, feriados nacionais e férias.
§ plugin.team_total.description5: Por *trabalho no fim de semana* considera-se um coeficiente x2 em relação ao pagamento de um dia normal. Acima é exibido apenas o sobrepagamento (x1), pois o fato da hora extra neste contexto não é relevante. Não analisamos a taxa de queima do orçamento. Analisamos o sobrepagamento ao aumentar a velocidade de trabalho.
`;
