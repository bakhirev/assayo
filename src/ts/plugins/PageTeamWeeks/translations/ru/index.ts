import recommendations from './recommendations';

export default `
§ plugin.team_weeks.sidebar: По неделям
§ plugin.team_weeks.title: Статистика по неделям
§ plugin.team_weeks.numberTasks: Количество задач
§ plugin.team_weeks.people: Количество сотрудников
§ plugin.team_weeks.line: Изменение строк
§ plugin.team_weeks.lossesDetails: Кто не коммитил
§ plugin.team_weeks.add: добавили
§ plugin.team_weeks.change: изменили
§ plugin.team_weeks.remove: удалили
§ plugin.team_weeks.hasCommits: были коммиты
§ plugin.team_weeks.hasNotCommits: небыло коммитов
§ plugin.team_weeks.last.title: Последняя неделя
§ plugin.team_weeks.last.tasks.title: Задачи за неделю
§ plugin.team_weeks.last.tasks.description: Закрытые задачи в сравнении с прошлой неделей
§ plugin.team_weeks.last.line.title: Изменение строк
§ plugin.team_weeks.last.line.description: Добавленные, изменённые и удалённые строки
§ plugin.team_weeks.last.types.title: Типы commit
§ plugin.team_weeks.last.days.title: Рабочие дни
§ plugin.team_weeks.last.best.title: Самый активный
§ plugin.team_weeks.last.best.description: Больше всего задач за неделю
§ plugin.team_weeks.last.quiet.title: Тихая неделя
§ plugin.team_weeks.last.quiet.description: Больше всего дней без commit
§ plugin.team_weeks.last.sprint.title: Выше среднего
§ plugin.team_weeks.last.sprint.description: Больше задач, чем за последние недели
§ plugin.team_weeks.last.overwork.title: Переработка
§ plugin.team_weeks.last.overwork.description: commits больше чем в пять дней
§ plugin.team_weeks.last.vsPrev: к предыдущей неделе
${recommendations}
`;
