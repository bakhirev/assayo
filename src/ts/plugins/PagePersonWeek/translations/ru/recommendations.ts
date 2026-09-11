export default `
§ plugin.person_week.recommendations.lazyDays.down.title: Стало меньше прогулов
§ plugin.person_week.recommendations.lazyDays.down.description: за последние три недели этот показатель упал
§ plugin.person_week.recommendations.lazyDays.up.title: Стало больше прогулов
§ plugin.person_week.recommendations.lazyDays.up.description: нет задач или нужен более жесткий контроль
§ plugin.person_week.recommendations.notWork.title: Стабильно не дорабатывает
§ plugin.person_week.recommendations.notWork.description: т.к. каждую неделю пишет код не 100% времени
§ plugin.person_week.recommendations.upWork.title: Стабильно перерабатывает
§ plugin.person_week.recommendations.upWork.description: т.к. каждую неделю пишет код в выходные дни
§ plugin.person_week.recommendations.task.up.title: Растёт производительность
§ plugin.person_week.recommendations.task.up.description
или задачи стали слишком мелкие.
 
Нужно проверить. Если гранулярность та же - закрепить результат.
§ plugin.person_week.recommendations.task.down.title: Падает производительность
§ plugin.person_week.recommendations.task.down.description
или задачи хуже разбивают. Нужно проверить. Если гранулярность та же - взять на контроль.

# Метод оценки:
- количество задач в день, над которыми работают, на протяжении последних трех недель стабильно падает.

# Возможные ошибки:
- задачи могли быть сложнее, чем казались;
- задачи могли иметь большой объём работы (нужно проверить количество изменений, падают они или нет за этот же период)
`;
