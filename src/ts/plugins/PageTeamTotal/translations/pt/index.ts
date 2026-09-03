export default `
§ plugin.team_total.sidebar: Informação geral
§ plugin.team_total.common.title: Sobre o projeto
§ plugin.team_total.workSpeed.title: tarefas por dia
§ plugin.team_total.workSpeed.description: Produtividade média da equipe com a composição atual de funcionários
§ plugin.team_total.employment.title: trabalha / saiu
§ plugin.team_total.employment.description: Se um funcionário não fez nenhum commit num mês, considera-se que saiu
§ plugin.team_total.common.duration.title: duração total do trabalho
§ plugin.team_total.common.duration.description: Tempo total de desenvolvimento do primeiro ao último commit.
§ plugin.team_total.common.location.title: sede
§ plugin.team_total.common.location.description: Localização mais habitual para a composição principal atual de funcionários.
§ plugin.team_total.common.employees.title: pessoas no departamento
§ plugin.team_total.common.employees.description: Com base na previsão do tamanho total de funcionários pela taxa de alteração dos IDs de tarefa.
§ plugin.team_total.release.title: Informações de lançamentos
§ plugin.team_total.release.total.title: lançamentos totais
§ plugin.team_total.release.total.description: Um lançamento é um branch com a palavra "release". Em regra, aparecem em eventos "auto-merge".
§ plugin.team_total.money.title: Estimativa do custo de desenvolvimento
§ plugin.team_total.moneyAll.title: total
§ plugin.team_total.moneyAll.description: Custos salariais totais, incluindo pagamento de férias e sobrepagamento por trabalho ao fim de semana.
§ plugin.team_total.moneyWorked.title: real
§ plugin.team_total.moneyWorked.description: Dias efetivamente trabalhados multiplicados pelo salário médio.
§ plugin.team_total.moneyLosses.title: possível sobrepagamento
§ plugin.team_total.moneyLosses.description: Dias úteis pagos em que não houve commits.
§ plugin.team_total.weekendPayment.title: trabalho ao fim de semana
§ plugin.team_total.weekendPayment.description: Sobrepagamento total por trabalho ao fim de semana.
§ plugin.team_total.moneySpeed.title: por mês
§ plugin.team_total.moneySpeed.description: Montante salarial previsto com a composição atual de funcionários, excluindo impostos, depreciação de equipamento e custos associados.
§ plugin.team_total.forecastingMoneyAll.title: custos do projeto ao longo do tempo
§ plugin.team_total.forecastingMoneyAll.description: Montante salarial possível ao longo do tempo para todos os funcionários potenciais do departamento que não constam nos logs mas poderiam ter existido (com base na numeração de IDs de tarefa no gestor de tarefas).    
§ plugin.team_total.description1: *Dias-pessoa* são o trabalho de um funcionário durante um dia útil. Por exemplo, num dia de calendário, uma equipe de três funcionários entrega um volume de trabalho de três dias-pessoa.
§ plugin.team_total.description2: Os *dias de ausência* incluem apenas os dias úteis em que commits poderiam ter sido feitos. Fins de semana, feriados oficiais e férias não entram no cálculo.
§ plugin.team_total.description3: O cartão *trabalha / saiu* mostra os funcionários reais que participam de forma consistente no trabalho. Além disso, há “assistentes” — em regra pessoas de outra especialização que podem ocasionalmente fazer commits no projeto.
§ plugin.team_total.description4: O *sobrepagamento* inclui apenas os dias úteis em que commits poderiam ter sido feitos. Fins de semana, feriados oficiais e férias não entram no cálculo. Por isso, sobrepagamento + custo real != total. O custo total inclui pagamentos de fins de semana, feriados oficiais e férias.
§ plugin.team_total.description5: O *trabalho ao fim de semana* é calculado com um coeficiente x2 relativamente ao pagamento de um dia normal. Acima é mostrado apenas o sobrepagamento (x1), porque o facto das horas extra em si não é relevante neste contexto. Não observamos a velocidade de consumo do orçamento. Observamos o sobrepagamento quando a velocidade de trabalho aumenta.
`;
