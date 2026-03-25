export default `
§ plugin.team_total.sidebar: Общая информация
§ plugin.team_total.common.title: Кратко о проекте
§ plugin.team_total.workSpeed.title: задач в день
§ plugin.team_total.workSpeed.description: Средняя скорость работы команды при текущем составе сотрудников
§ plugin.team_total.employment.title: работает / уволилось
§ plugin.team_total.employment.description: Если сотрудник в течении месяца не сделал ни одного коммита, он считается уволенным
§ plugin.team_total.common.duration.title: общая продолжительность работ
§ plugin.team_total.common.duration.description: Все время разработки от первого до последнего коммита.
§ plugin.team_total.common.location.title: центральный офис
§ plugin.team_total.common.location.description: Самое популярное местоположение для текущего основного состава сотрудников.
§ plugin.team_total.common.employees.title: человек в отделе
§ plugin.team_total.common.employees.description: На основании прогноза общей численности сотрудников по скорости изменения номеров задач.
§ plugin.team_total.release.title: Информация по релизам
§ plugin.team_total.release.total.title: всего релизов
§ plugin.team_total.release.total.description: Релизом считается ветка со словом "release". Как правило, они встречаются событиях "auto-merge".
§ plugin.team_total.money.title: Оценка стоимости разработки
§ plugin.team_total.moneyAll.title: общая
§ plugin.team_total.moneyAll.description: Суммарные затраты на зарплату, включают отпускные и переплату за работу в выходные дни.
§ plugin.team_total.moneyWorked.title: фактическая
§ plugin.team_total.moneyWorked.description: Фактически отработанные дни умноженные на среднюю заработную плату.
§ plugin.team_total.moneyLosses.title: возможная переплата
§ plugin.team_total.moneyLosses.description: Оплаченные рабочие дни, когда коммитов не было.
§ plugin.team_total.weekendPayment.title: работа на выходных
§ plugin.team_total.weekendPayment.description: Суммарная переплата за работу в выходные дни.
§ plugin.team_total.moneySpeed.title: в месяц
§ plugin.team_total.moneySpeed.description: Прогнозируемая сумма выплат на зарплату при текущем составе сотрудников без учета налогов, амортизации оборудования и сопутствующих затрат.
§ plugin.team_total.forecastingMoneyAll.title: расходы на проект за всё время
§ plugin.team_total.forecastingMoneyAll.description: Возможная сумма выплат на зарплату за всё время всем возможным сотрудникам отдела, которые не фигурируют в логах, но могли быть (на основании нумерации задач в таск-трекере).    
§ plugin.team_total.description1: *Человеко-дни* — это работа одного сотрудника в течение одного рабочего дня. Например, за один календарный день, команда из трех сотрудников выдает объем работы в три человеко-дня.
§ plugin.team_total.description2: *Днями прогулов* считаются только рабочие дни, когда коммиты могли бы быть сделаны. Выходные, государственные праздники и отпуска в расчёте не участвуют.
§ plugin.team_total.description3: Карточка *работает и уволилось* показывает фактический состав сотрудников, которые постоянно участвуют в работе. Кроме этого, есть «помощники» — это сотрудники, как правило другой специализации, которые могут иногда делать коммиты в проект.
§ plugin.team_total.description4: *Переплатой* считаются только рабочие дни, когда коммиты могли бы быть сделаны. Выходные, государственные праздники и отпуска в расчёте не участвуют. Именно поэтому переплата + фактическая стоимость != общей. В общей стоимости заложена оплата выходных, государственных праздников и отпусков.
§ plugin.team_total.description5: *Работой на выходных* считается по коэффициенту х2 от оплаты обычного дня. Выше отображена именно переплата (х1), т.к. сам факт переработки в данном контексте не интересен. Мы не смотрим скорость сжигания бюджета. Мы смотрим переплату при увеличении скорости работы.
`;
