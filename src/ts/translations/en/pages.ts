export default `
§ page.welcome.step1: Execute the command in your project's root directory
§ page.welcome.step3: Drag and drop
§ page.welcome.step4: the log.txt file onto this page
§ page.welcome.description1: Git will create the log.txt file. It contains data for generating a report. Alternatively, use git shortlog -s -n -e if you don't need a report. Create the file
§ page.welcome.description2: [.mailmap|https://git-scm.com/docs/gitmailmap] in the project's root to consolidate statistics by employees.
§ page.welcome.description: Git will create the log.txt file. It contains data for generating a report. Alternatively, use git shortlog -s -n -e if you don't need a report. Create the [.mailmap|https://git-scm.com/docs/gitmailmap] file in the project's root to consolidate statistics by employees.
§ page.welcome.warning1: The service *DOES NOT STORE* or *TRANSMIT* your data. All calculations are performed locally in your browser on your machine.
§ page.welcome.warning2: The service *DOES NOT COLLECT* project statistics. You can disconnect from the internet, monitor traffic, and even build a local version from [source code|https://github.com/bakhirev/assayo].
§ page.common.words.title: Word Statistics
§ page.common.words.description: the most common word. Appears $1 times.
§ page.common.commits.title: Number of Commits per Day
§ page.common.commits.description: ($1) the most productive day in terms of commit count.
§ page.common.commits.title2: $1 commits made: $2
§ page.common.filter.allUsers: Doesn't matter
§ page.print.modal.title: What to Print?
§ page.print.modal.page: Current Page
§ page.print.modal.type: Current Section
§ page.print.modal.all: All Statistics
§ page.print.modal.cancel: Cancel
§ page.print.tableOfContents: Table of Contents
§ page.print.title: Report for Git Repository «$1»
§ page.print.description: Data for the report was obtained from the commit history.
§ page.team.author.title: Employee Statistics
§ page.team.author.description1: *Some statistics* (work speed, expenses, etc.) *for employees with the "Assistant" type are not counted*, as it is an episodic role in the project. We assume they do not affect the project, and their edits can be neglected in the overall workload.
§ page.team.author.description2: *The default sorting* is by the number of tasks and groups (current, fired, assisting employees).
§ page.team.author.types: Work Type
§ page.team.author.commits: Commits
§ page.team.author.commitsSmall: commits
§ page.team.author.tasks: Tasks
§ page.team.author.tasksSmall: tasks
§ page.team.author.workedLosses: Days with and without commits
§ page.team.author.worked: worked
§ page.team.author.losses: days without commits
§ page.team.author.days: days
§ page.team.author.daysForTask: Days per Task
§ page.team.author.scopes: Features
§ page.team.author.moneyAll: Received
§ page.team.author.moneyWorked: Worked
§ page.team.author.moneyLosses: Overpayment
§ page.team.hours.title: Distribution of Commits Throughout Each Day of the Week
§ page.team.month.title: Project Work Calendar
§ page.team.scope.title: Feature Statistics
§ page.team.scope.scope: Фича
§ page.team.scope.days: Раб. дней
§ page.team.scope.authorsDays: Человеко-дней
§ page.team.scope.tasks: Задач
§ page.team.scope.commits: Коммитов
§ page.team.scope.commitsSmall: коммитов
§ page.team.scope.types: Тип работ
§ page.team.scope.authors: Персональный вклад
§ page.team.scope.cost: Стоимость
§ page.team.type.title: Статистика по типам задач
§ page.team.type.description: *Персональный вклад* считается по количеству коммитов, а не объему измененных строк или файлов. Поэтому следует так же смотреть раздел «Анализ файлов», чтобы оценить масштаб изменений.
§ page.team.type.type: Тип работы
§ page.team.type.tasks: Задач
§ page.team.type.tasksSmall: задач
§ page.team.type.days: Дней
§ page.team.type.daysSmall: дней
§ page.team.type.authorsDays: Человеко-дней
§ page.team.type.commits: Коммитов
§ page.team.type.authors: Персональный вклад
§ page.team.total.titleA: Объём работ
§ page.team.total.titleB: Стоимость
§ page.team.total.daysWorked.title: человеко-дней
§ page.team.total.daysWorked.description: Учтены только дни, в которые делались коммиты
§ page.team.total.commits.title: коммитов
§ page.team.total.commits.description: Удалённые ветки не считаются
§ page.team.total.daysLosses.title: дней без коммитов
§ page.team.total.daysLosses.description: Все дни минус: праздники, выходные, отпуск, дни с коммитами
§ page.team.total.employment.title: работает / уволилось
§ page.team.total.employment.description: Если сотрудник в течении месяца не сделал ни одного коммита, он считается уволенным
§ page.team.total.moneyAll.title: общая
§ page.team.total.moneyAll.description: Суммарные затраты на зп
§ page.team.total.moneyWorked.title: фактическая
§ page.team.total.moneyWorked.description: Фактически отработанные дни умноженные на среднюю зп
§ page.team.total.moneyLosses.title: возможная переплата
§ page.team.total.moneyLosses.description: Оплаченные рабочие дни, когда коммитов не было
§ page.team.total.weekendPayment.title: работа на выходных
§ page.team.total.weekendPayment.description: Суммарная переплата за работу в выходные дни
§ page.team.total.workSpeed.title: задач в день
§ page.team.total.workSpeed.description: Средняя скорость работы команды при текущем составе сотрудников
§ page.team.total.moneySpeed.title: в месяц
§ page.team.total.moneySpeed.description: Прогнозируемая сумма выплаты на зп при текущем составе сотрудников без учета налогов и сопутствующих затрат
§ page.team.total.description1: *Человеко-дни* — это работа одного сотрудника в течение одного рабочего дня. Например, за один календарный день, команда из трех сотрудников выдает объем работы в три человеко-дня.
§ page.team.total.description2: *Днями прогулов* считаются только рабочие дни, когда коммиты могли бы быть сделаны. Выходные, государственные праздники и отпуска в расчёте не участвуют.
§ page.team.total.description3: Карточка *работает и уволилось* показывает фактический состав сотрудников, которые постоянно участвуют в работе. Кроме этого, есть «помощники» — это сотрудники, как правило другой специализации, которые могут иногда делать коммиты в проект.
§ page.team.total.description4: *Переплатой* считаются только рабочие дни, когда коммиты могли бы быть сделаны. Выходные, государственные праздники и отпуска в расчёте не участвуют. Именно поэтому переплата + фактическая стоимость != общей. В общей стоимости заложена оплата выходных, государственных праздников и отпусков.
§ page.team.total.description5: *Работой на выходных* считается по коэффициенту х2 от оплаты обычного дня. Выше отображена именно переплата (х1), т.к. сам факт переработки в данном контексте не интересен. Мы не смотрим скорость сжигания бюджета. Мы смотрим переплату при увеличении скорости работы.
§ page.team.tree.title: Дерево проекта с учётом выбранных фильтров
§ page.team.tree.filters.author: Сотрудник
§ page.team.tree.filters.commits: Количество коммитов
§ page.team.tree.filters.help: Минимальное количество коммитов, которое сделал сотрудник в файле
§ page.team.tree.filters.all: Все сотрудники
§ page.team.tree.add: Кто добавлял
§ page.team.tree.change: Кто менял
§ page.team.tree.remove: Кто удалял
§ page.team.tree.line: строк
§ page.team.tree.lineAdd: добавили
§ page.team.tree.lineRemove: изменили
§ page.team.week.title: Статистика по неделям
§ page.team.week.date: Дата
§ page.team.week.numberTasks: Количество задач
§ page.team.week.people: Количество человек
§ page.team.week.line: Изменение строк
§ page.team.week.days: Дни с коммитами и без
§ page.team.week.lossesDetails: Кто не коммитил
§ page.team.week.add: добавили
§ page.team.week.change: изменили
§ page.team.week.remove: удалили
§ page.team.week.hasCommits: были коммиты
§ page.team.week.hasNotCommits: небыло коммитов
§ page.team.week.days: дней
§ page.team.week.tasks: задач
§ page.team.pr.task: Задача
§ page.team.pr.tasks: задач
§ page.team.pr.firstCommitTime: Первый коммит
§ page.team.pr.lastCommitTime: Последний
§ page.team.pr.workDays: Дней разработки
§ page.team.pr.delayDays: Дней ожидания влития
§ page.team.pr.commits: Коммиты
§ page.team.pr.date: Дата влития
§ page.team.pr.mergeAuthor: Влил
§ page.team.pr.author: Сотрудник
§ page.team.pr.middleTimeRelease: Среднее время поставки (дни)
§ page.team.pr.work: разработка
§ page.team.pr.delay: ожидание
§ page.team.pr.days: дней
§ page.team.pr.oneTaskDays: Время потраченное на одну задачу
§ page.team.pr.description1: *Время разработки* это разница времени от первого до последнего коммита по задаче. Не важно были перерывы в несколько дней между коммитами или нет. Сам факт какого-либо коммита увеличивает время.
§ page.team.pr.description2: *Время ожидания* это время между последним коммитом и влитием кода. Оно показывает фактический простой в ожидании чего-либо.
§ page.team.pr.description3: *Зачем отображать время разработки* без разбивки на кодинг и код-ревью? Затем, чтобы показать бизнесу фактическое время поставки кода. Ожидание тестирования, замечания на ревью, проблемы DevOps и прочие несовершенства процесса, как раз уже заложены в этот срок.
§ page.team.pr.statByAuthors: Статистика по сотрудникам
§ page.team.pr.longDelay: Длительное ожидание влития
§ page.person.print.photo.title: Фотография
§ page.person.print.photo.description: место для фотографии
§ page.person.total.title: Основные характеристики
§ page.person.total.daysWorked.title: дней работы
§ page.person.total.daysWorked.description: Учтены только дни, в которые делались коммиты
§ page.person.total.tasks.title: задач
§ page.person.total.tasks.description: Если коммиты правильно подписаны
§ page.person.character.title: Персонаж
§ page.person.achievement.title: Достижения
§ page.person.achievement.positive: Позитивные
§ page.person.achievement.normal: Нейтральные
§ page.person.achievement.negative: Негативные
§ page.person.achievement.description: Чем больше сотрудник набрал отрицательных достижений, тем больше вероятность, что ситуация нестандартная. Возможно, стоит изменить режим его работы, задачи или отчётность. Следует поговорить с ним и узнать, какие проблемы мешают его работе.
§ page.person.gets.title: Взятые геты:
§ page.person.gets.description: «Взять гет» в данном случае означает первым оставить коммит к задаче с  «красивым» номером.
§ page.person.business.days.title: дней работы
§ page.person.business.days.description: Учтены только дни, в которые делались коммиты
§ page.person.business.tasks.title: задач
§ page.person.business.tasks.description: Если коммиты правильно подписаны
§ page.person.business.losses.title: дней без коммитов
§ page.person.business.losses.description: Все дни минус: праздники, выходные, отпуск, дни с коммитами
§ page.person.business.commits.title: коммитов
§ page.person.business.commits.description: Удалённые ветки не считаются
§ page.person.business.time.description: Время от первого, до последнего коммита (в том числе, нерабочие дни)
§ page.person.business.time.title: Дней на проекте:
§ page.person.business.time.dismissed: (уволен)
§ page.person.business.time.staff: (не в команде)
§ page.person.business.achievements: Достижения
§ page.person.changes.title: Достижения
§ page.person.changes.description: 
При некоторых видах форматирования git отмечает строки как «удалённые» и «добавленные»,
хотя на самом деле они были «изменены». Поэтому, если вы провели большой рефакторинг,
git может показать малое количество изменений в статистике, а фактический результат
будет отмечен, как скачок «удаленных» и «добавленных» строк.
§ page.person.changes.description: Список коммитов и количество изменений в них за этот день:
§ page.person.commits.title: Список коммитов:
§ page.person.money.title.total: За всё время
§ page.person.money.title.middle: Средняя стоимость
§ page.person.money.moneyAll.title: получил
§ page.person.money.moneyAll.description: Предполагаемая сумма зп с проекта (см. настройки)
§ page.person.money.moneyWorked.title: отработал
§ page.person.money.moneyWorked.description: Фактически отработанные дни умноженные на среднюю зп
§ page.person.money.moneyLosses.title: возможная переплата
§ page.person.money.moneyLosses.description: Дни без коммитов умноженные на среднюю зп
§ page.person.money.tasks.title: задача
§ page.person.money.tasks.description: Количество закрытых задач к стоимости дня
§ page.person.money.commits.title: коммит
§ page.person.money.commits.description: Количество коммитов к стоимости рабочего дня
§ page.person.speed.task: Одна задача в среднем это
§ page.person.speed.max: Максимальная скорость в день
§ page.person.speed.days.title: дней
§ page.person.speed.days.description: Имеются ввиду рабочие дни, если коммиты правильно подписаны
§ page.person.speed.commits.title: коммитов
§ page.person.speed.commits.description: Отрезаны 10% максимальных и минимальных значений
§ page.person.speed.line.title: строк кода
§ page.person.speed.line.description: Отрезаны 10% максимальных и минимальных значений
§ page.person.speed.tasks.title: задач
§ page.person.speed.tasks.description: Задача может быть не доделана, но работа по ней должна быть
§ page.person.speed.maxCommits.title: коммитов
§ page.person.speed.maxCommits.description: Задача может быть не доделана, но работа по ней должна быть
§ page.person.hours.title: Распределение коммитов в течении каждого дня недели
§ page.person.week.date: Дата
§ page.person.week.tasks: Количество задач
§ page.person.week.workDays: Дни с коммитами
§ page.person.week.taskInDay: Задач в день
§ page.person.week.days: дней
§ page.person.week.workDay: будни
§ page.person.week.weekends: выходные
`;