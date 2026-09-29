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
§ plugin.team_weeks.last.title: Статистика по выбранной неделе
§ plugin.team_weeks.last.titleDefault: Последняя неделя
§ plugin.team_weeks.last.tasks.title: Задач за неделю
§ plugin.team_weeks.last.tasks.description: Уникальные номера задач обнаруженные в данном диапазоне времени
§ plugin.team_weeks.last.tasks.scoring: Значение за прошлую неделю / Среднее значение за прошлый месяц
§ plugin.team_weeks.last.changes.title: Изменение строк
§ plugin.team_weeks.last.changes.description: Добавленные, изменённые и удалённые строки
§ plugin.team_weeks.last.changes.scoring: Значение за прошлую неделю / Среднее значение за прошлый месяц
§ plugin.team_weeks.last.types.title: Типы коммитов
§ plugin.team_weeks.last.days.title: Фактические человеко-дни
§ plugin.team_weeks.last.best.title: Самый активный
§ plugin.team_weeks.last.best.description: Больше всего задач за неделю
§ plugin.team_weeks.last.quiet.title: Тихая неделя
§ plugin.team_weeks.last.quiet.description: Меньше всего задач за неделю
§ plugin.team_weeks.last.vsPrev: к предыдущей неделе
${recommendations}
`;
