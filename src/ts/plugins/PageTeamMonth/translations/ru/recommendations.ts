export default `
§ plugin.team_month.recommendations.firstCommit.description
сделал первый коммит

День недели: {day}

§ plugin.team_month.recommendations.lastCommit.description
сделал последний коммит

День недели: {day}

§ plugin.team_month.recommendations.common.title: {days} дней
§ plugin.team_month.recommendations.allDays.description: от первого до последнего коммита (включая выходные и праздники).
§ plugin.team_month.recommendations.lossesDays.description: без коммитов, даже с учётом выходных, отпуска и государственных праздников.
§ plugin.team_month.recommendations.weekendDays.description
работы на выходных

# Почему это плохо:
- заказчик платит двойную цену за работу в выходной день;
- сотрудники быстрее выгорают;

§ plugin.team_month.recommendations.regularWeekendWord.title: Регулярные переработки
§ plugin.team_month.recommendations.sometimeWeekendWord.title: Бывают переработки
§ plugin.team_month.recommendations.weekendWord.description
Вероятно, стоит сменить менеджера проекта, аналитика и архитектора.

# Почему это плохо:
- заказчик платит двойную цену за работу в выходной день;
- качество продукта, как правило, получается низкое;
- часть сотрудников увольняется;
- из-за спешки появляются новые ошибки;

# Скорее всего:
- неверно оценили сроки в самом начале;
- техническое задание отсутствует;
- слабая аналитика;
- слабая архитектура (архитектора не нанимали, а команда состоит из мидл разработчиков);
- сначала начали писать код, потом проектировать;
- нет нормальных процессов, чтобы понять ошибки;

§ plugin.team_month.recommendations.neverWeekendWord.title: Обычно без переработок
§ plugin.team_month.recommendations.neverWeekendWord.description
Но иногда бывают.

# Почему это плохо:
- заказчик платит двойную цену за работу в выходной день;
- сотрудники быстрее выгорают;
`;
