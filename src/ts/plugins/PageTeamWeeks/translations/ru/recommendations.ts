export default `
§ plugin.team_weeks.recommendations.lazyDays.down.title: Стало меньше прогулов
§ plugin.team_weeks.recommendations.lazyDays.down.description: за последние три недели этот показатель упал
§ plugin.team_weeks.recommendations.lazyDays.up.title: Стало больше прогулов
§ plugin.team_weeks.recommendations.lazyDays.up.description: нет задач или нужен более жесткий контроль
§ plugin.team_weeks.recommendations.notWork.title: Стабильно не дорабатывает
§ plugin.team_weeks.recommendations.notWork.description: т.к. каждую неделю пишет код не 100% времени
§ plugin.team_weeks.recommendations.upWork.title: Стабильно перерабатывает
§ plugin.team_weeks.recommendations.upWork.description: т.к. каждую неделю пишет код в выходные дни
§ plugin.team_weeks.recommendations.task.up.title: Растёт производительность
§ plugin.team_weeks.recommendations.task.up.description
или задачи стали слишком мелкие.
 
Нужно проверить. Если гранулярность та же - закрепить результат.
§ plugin.team_weeks.recommendations.task.lazyMaintainer.description: стабильный лидер по прогулам. Уволить?
§ plugin.team_weeks.recommendations.task.down.title: Падает производительность
§ plugin.team_weeks.recommendations.task.down.description
или задачи хуже разбивают. Нужно проверить. Если гранулярность та же - взять на контроль.

# Метод оценки:
- количество задач в день, над которыми работают, на протяжении последних трех недель стабильно падает.

# Возможные ошибки:
- задачи могли быть сложнее, чем казались;
- задачи могли иметь большой объём работы (нужно проверить количество изменений, падают они или нет за этот же период)
`;
