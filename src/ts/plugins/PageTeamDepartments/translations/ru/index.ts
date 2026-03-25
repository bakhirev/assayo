export default `
§ plugin.team_departments.sidebar: Отделы
§ plugin.team_departments.employmentsChart.title: Размер текущих команд
§ plugin.team_departments.employmentsChart.item: команд
§ plugin.team_departments.employmentsChart.less1: один сотрудник
§ plugin.team_departments.employmentsChart.less2: два сотрудника
§ plugin.team_departments.employmentsChart.less3: три сотрудника
§ plugin.team_departments.employmentsChart.less6: до шести сотрудников
§ plugin.team_departments.employmentsChart.less9: до девяти сотрудников
§ plugin.team_departments.employmentsChart.less12: до 12 сотрудников
§ plugin.team_departments.employmentsChart.less15: до 15 сотрудников
§ plugin.team_departments.employmentsChart.more: больше 15
§ plugin.team_departments.daysChart.title: Продолжительность проектов
§ plugin.team_departments.daysChart.item: проекта
§ plugin.team_departments.title: Список проектов
§ plugin.team_departments.status: Статус
§ plugin.team_departments.active.yes: Идёт разработка
§ plugin.team_departments.active.no: Новых задач нет
§ plugin.team_departments.author.work: работает
§ plugin.team_departments.author.dismissed: уволен
§ plugin.team_departments.author.staff: помощник
§ plugin.team_departments.code: Код
§ plugin.team_departments.from: Первый коммит
§ plugin.team_departments.to: Последний
§ plugin.team_departments.authors: человек
§ plugin.team_departments.tasks: задач
§ plugin.team_departments.totalDays: Продолжительность
§ plugin.team_departments.totalAuthors: Сотрудников
§ plugin.team_departments.totalTasks: Задач
§ plugin.team_departments.employments.author: Сотрудник
§ plugin.team_departments.employments.worked: работа
§ plugin.team_departments.employments.losses: дни без коммитов
§ plugin.team_departments.employments.totalDays: Дней в отделе
§ plugin.team_departments.employments.totalTasks: Сделал задач
§ plugin.team_departments.banner.title: расширенная информация по отделу
§ plugin.team_departments.details.title: Фактические данные по отделу
§ plugin.team_departments.details.totalDays: продолжительность работ
§ plugin.team_departments.details.moneyInMonth: стоимость разработки в месяц
§ plugin.team_departments.details.moneyAll: стоимость разработки за всё время
§ plugin.team_departments.details.mainLocation: основная локация
§ plugin.team_departments.details.activeAuthors.title: работает / уволилось
§ plugin.team_departments.details.activeAuthors.description: Если сотрудник в течении месяца не сделал ни одного коммита, он считается уволенным. Статус показан относительно сотрудников, без привязки к этому отделу. Работает в каком-либо отделе вообще или уволен из компании полностью.
§ plugin.team_departments.details.linesInTask.title: строк кода на задачу
§ plugin.team_departments.details.linesInTask.description: Средневзвешенное количество строк кода на одну задачу. Помогает оценить гранулярность задач.
§ plugin.team_departments.details.totalTasks.title: задач было в работе
§ plugin.team_departments.details.totalTasks.description: Считается любое упоминание уникального номера задачи. Задача могла быть не закрыта в таск-трекере.
§ plugin.team_departments.months.title: Возможное количество сотрудников в отделе
§ plugin.team_departments.months.description: Таск-трекер выдает серийные номера задач. Зная максимальный номер задачи в начале и конце месяца, мы можем узнать количество *новых задач*. Количество задач *исправленных* в этом месяце видим в логах. Кто их правил (*работало*) так же видим. Количество задач исправленных позже (*беклог*) так же считаем по логам следующих месяцев. Экстраполируем скорость программитов, которых мы видим, на общее количество задач, чтобы прикинуть сколько *всего программистов* должно быть в отделе. По количеству "программистов" прикидываем количество тестировщиков, аналитиков и менеджеров.
§ plugin.team_departments.months.newTaskInMonth: Новых задач
§ plugin.team_departments.months.tasksFixedThisGroup: Исправленно
§ plugin.team_departments.months.tasksInBacklog: Беклог
§ plugin.team_departments.months.programmistInThisGroup: Работало
§ plugin.team_departments.months.allProgrammistInDepartment: Должно работать
§ plugin.team_departments.months.allUsersInDepartment: Всего сотрудников
§ plugin.team_departments.forecasting.title: Прогноз полной стоимости
§ plugin.team_departments.forecasting.moneyInMonth.title: расходы на отдел в месяц
§ plugin.team_departments.forecasting.moneyInMonth.description: Количество всех возможных сотрудников (разработка, тестирование, аналитика, менеджмент) за последний месяц умножаем на среднюю заработную плату.
§ plugin.team_departments.forecasting.moneyAll.title: расходы на отдел за всё время
§ plugin.team_departments.forecasting.moneyAll.description: Количество всех возможных сотрудников (разработка, тестирование, аналитика, менеджмент) за каждый месяц умножаем на среднюю заработную плату.
`;
