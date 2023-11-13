import localization from 'ts/helpers/Localization';

localization.parse('en', `
§ uiKit.console: Copy
§ uiKit.dataLoader.page: Page
§ uiKit.dataLoader.size: Отображается по
§ uiKit.dataLoader.from: from
§ uiKit.dataLoader.all: Show all
§ uiKit.hoursChart.work: стандартное рабочее время (будни, с 07:00 до 20:00)
§ uiKit.hoursChart.weekend: выходные дни или время до/после рабочего дня
§ uiKit.hoursChart.days: суммарное количество коммитов за все время в конкретный день и час
§ uiKit.page.remove: Remove
§ uiKit.races.go: Поехали
§ uiKit.nothingFound.common.title: Нет или недостаточно данных для отображения
§ uiKit.nothingFound.common.description: Система обработает больше данных, если коммиты будут подписаны в формате [Git commit message convention|https://www.conventionalcommits.org/en/v1.0.0/]. Шаблон:
§ uiKit.nothingFound.common.console: Task_number type(фича): message
§ uiKit.nothingFound.common.example: Example:
§ uiKit.nothingFound.staff.title: Нет данных для этого сотрудника
§ uiKit.nothingFound.staff.description1:
Он вносил правки не каждый рабочий день и получил статус  «Помошник».
Работой сотрудников с таким статусом по данному проекту можно пренебречь, т.к. его влад на общем фоне незначителен.

§ uiKit.nothingFound.staff.description2:
Поэтому система не рассчитывает для него ряд показателей.
Если это ошибка и данного сотрудника нужно рассчитать как обычного, перейдите в раздел «Настройки» и измените его тип.

§ common.filters: Filters
§ common.notifications.save: Изменения сохранены
§ common.notifications.setting: Настройки сохранены
§ sidebar.switch.team: Team
§ sidebar.switch.person: Employee
§ sidebar.buttons.settings: Settings
§ sidebar.buttons.print: Print
§ sidebar.filters.all: all time
§ sidebar.filters.year: year
§ sidebar.filters.halfYear: half year
§ sidebar.filters.month: month
§ sidebar.filters.week: week
§ sidebar.team.total: Common info
§ sidebar.team.scope: Features
§ sidebar.team.author: Employees
§ sidebar.team.type: Task types
§ sidebar.team.pr: Pull requests
§ sidebar.team.day: By day
§ sidebar.team.week: By week
§ sidebar.team.month: By month
§ sidebar.team.tree: Files
§ sidebar.team.hours: Расписание
§ sidebar.team.commits: All commits
§ sidebar.team.changes: All changes
§ sidebar.team.words: Popular words
§ sidebar.team.top: Викторина
§ sidebar.team.settings: Settings
§ sidebar.person.total: Common info
§ sidebar.person.money: Work cost
§ sidebar.person.speed: Speed
§ sidebar.person.day: By day
§ sidebar.person.week: By week
§ sidebar.person.month: By month
§ sidebar.person.hours: Расписание
§ sidebar.person.commits: All commits
§ sidebar.person.changes: All changes
§ sidebar.person.words: Popular words
§ sidebar.person.settings: Settings
§ page.welcome.step1: Run this command in your project folder
§ page.welcome.step2: Move the file log.txt to this page
§ page.welcome.description1: Git создаст файл log.txt. Он содержит данные для построения отчёта. Или git shortlog -s -n -e если отчёт вам не нужен. Создайте файл
§ page.welcome.description2: [.mailmap|https://git-scm.com/docs/gitmailmap] в корне проекта, чтобы обьединить статистику по сотрудникам.
§ page.welcome.description: Git создаст файл log.txt. Он содержит данные для построения отчёта. Или git shortlog -s -n -e если отчёт вам не нужен. Создайте файл [.mailmap|https://git-scm.com/docs/gitmailmap] в корне проекта, чтобы обьединить статистику по сотрудникам.
§ page.welcome.warning1: Сервис *НЕ ХРАНИТ* и *НЕ ПЕРЕДАЁТ* ваши данные. Все расчёты выполняются локально в вашем браузере прямо на вашей машине.
§ page.welcome.warning2: Сервис *НЕ СОБИРАЕТ СТАТИСТИКУ* по проектам. Вы можете отключить интернет, проверить трафик и даже собрать локальный билд из [исходников|https://github.com/bakhirev/assayo].
§ page.common.words.title: Statistic by words
§ page.common.words.description: самое популярное слово. Встречается $1 раза.
§ page.common.commits.title: Commits number by days
§ page.common.commits.description: ($1) самый продуктивный день по числу коммитов.
§ page.common.commits.title2: $1 сделано коммитов: $2
§ page.common.filter.allUsers: Не имеет значения
§ page.settings.document.title: Display settings
§ page.settings.document.name: Page title
§ page.settings.document.language: Language
§ page.settings.links.title: Link prefixes
§ page.settings.links.task: For task number
§ page.settings.links.pr: For Pull Requests
§ page.settings.user.title: Employees settings
§ page.settings.user.notFound: Индивидуальных настроек нет. Данные по всем сотрудникам вычисляются по общим параметрам.
§ page.settings.user.subTitle: Дополнение к трудовому договору №$1
§ page.settings.user.from: Дата начала действия
§ page.settings.mailmap: .mailmap settings
§ page.settings.common.title: Общие данные по зарплате
§ page.settings.common.type.title: Work type
§ page.settings.common.type.full: Full-time
§ page.settings.common.type.part: Проектная работа
§ page.settings.common.salary: Зарплата в месяц
§ page.settings.common.currency: Currency
§ page.settings.common.workDaysInYear: Количество рабочих дней в году
§ page.settings.common.vacationDaysInYear: Количество дней отпуска в год
§ page.settings.common.workDaysInWeek: Рабочие дни
§ page.settings.form.save: Save
§ page.settings.form.cancel: Cancel
§ page.settings.form.remove: Remove
§ page.settings.form.addEmployee: Add employee
§ page.settings.form.addContract: Добавить трудовой договор
§ page.print.title: What are we printing?
§ page.print.page: This page
§ page.print.type: This section
§ page.print.all: All statistics
§ page.print.cancel: Cancel
§ page.team.author.title: Статистика по сотрудникам
§ page.team.author.description1: *Часть статитики* (скорость работы, затраченные деньги и т.п.) *по сотрудникам с типом «Помошник» не считается*, т.к. это эпизодическая роль в проекте. Предпологаем, что они не влияют на проект, а их правками можно пренебречь на фоне общего объема работы.
§ page.team.author.description2: *Сортировка по умолчанию* — это сортировка по количеству задач и группам (текущие, уволенные, помогающие  сотрудники).
§ page.team.author.types: Types
§ page.team.author.commits: Commits
§ page.team.author.commitsSmall: commits
§ page.team.author.tasks: Tasks
§ page.team.author.tasksSmall: tasks
§ page.team.author.workedLosses: Days with and without commits
§ page.team.author.worked: work
§ page.team.author.losses: days without commits
§ page.team.author.days: days
§ page.team.author.daysForTask: Дней на задачу
§ page.team.author.scopes: Features
§ page.team.author.moneyAll: Получил
§ page.team.author.moneyWorked: Отработал
§ page.team.author.moneyLosses: Переплата
§ page.team.hours.title: Распределение коммитов в течении каждого дня недели
§ page.team.month.title: Календарь работы по проекту
§ page.team.scope.title: Statistic by features
§ page.team.scope.scope: Feature
§ page.team.scope.days: Раб. дней
§ page.team.scope.authorsDays: Человеко-дней
§ page.team.scope.tasks: Tasks
§ page.team.scope.commits: Commits
§ page.team.scope.commitsSmall: commits
§ page.team.scope.types: Types
§ page.team.scope.authors: Персональный вклад
§ page.team.scope.cost: Cost
§ page.team.type.title: Статистика по типам задач
§ page.team.type.description: *Персональный вклад* считается по количеству коммитов, а не объему измененных строк или файлов. Поэтому следует так же смотреть раздел «Анализ файлов», чтобы оценить масштаб изменений.
§ page.team.type.type: Task types
§ page.team.type.tasks: Tasks
§ page.team.type.tasksSmall: tasks
§ page.team.type.days: Days
§ page.team.type.daysSmall: days
§ page.team.type.authorsDays: Человеко-дней
§ page.team.type.commits: Commits
§ page.team.type.authors: Персональный вклад
§ page.team.total.titleA: Scope of work
§ page.team.total.titleB: Cost
§ page.team.total.daysWorked.title: человеко-дней
§ page.team.total.daysWorked.description: Учтены только дни, в которые делались коммиты
§ page.team.total.commits.title: commits
§ page.team.total.commits.description: Удалённые ветки не считаются
§ page.team.total.daysLosses.title: days without commits
§ page.team.total.daysLosses.description: Все дни минус: праздники, выходные, отпуск, дни с коммитами
§ page.team.total.employment.title: работает / уволилось
§ page.team.total.employment.description: Если сотрудник в течении месяца не сделал ни одного коммита, он считается уволенным
§ page.team.total.moneyAll.title: общая
§ page.team.total.moneyAll.description: Суммарные затраты на зп
§ page.team.total.moneyWorked.title: фактическая
§ page.team.total.moneyWorked.description: Фактически отработанные дни умноженные на среднюю зп
§ page.team.total.moneyLosses.title: possible overpayment
§ page.team.total.moneyLosses.description: Оплаченные рабочие дни, когда коммитов не было
§ page.team.total.weekendPayment.title: work on weekend
§ page.team.total.weekendPayment.description: Суммарная переплата за работу в выходные дни
§ page.team.total.workSpeed.title: tasks in day
§ page.team.total.workSpeed.description: Средняя скорость работы команды при текущем составе сотрудников
§ page.team.total.moneySpeed.title: в месяц
§ page.team.total.moneySpeed.description: Прогнозируемая сумма выплаты на зп при текущем составе сотрудников без учета налогов и сопутствующих затрат
§ page.team.total.description1: *Человеко-дни* — это работа одного сотрудника в течение одного рабочего дня. Например, за один календарный день, команда из трех сотрудников выдает объем работы в три человеко-дня.
§ page.team.total.description2: *Днями прогулов* считаются только рабочие дни, когда коммиты могли бы быть сделаны. Выходные, государственные праздники и отпуска в расчёте не участвуют.
§ page.team.total.description3: Карточка *работает и уволилось* показывает фактический состав сотрудников, которые постоянно участвуют в работе. Кроме этого, есть «помощники» — это сотрудники, как правило другой специализации, которые могут иногда делать коммиты в проект.
§ page.team.total.description4: *Переплатой* считаются только рабочие дни, когда коммиты могли бы быть сделаны. Выходные, государственные праздники и отпуска в расчёте не участвуют. Именно поэтому переплата + фактическая стоимость != общей. В общей стоимости заложена оплата выходных, государственных праздников и отпусков.
§ page.team.total.description5: *Работой на выходных* считается по коэфициенту х2 от оплаты обычного дня. Выше отображена именно переплата (х1), т.к. сам факт переработки в данном контексте не интересен. Мы не смотрим скорость сжигания бюджета. Мы смотрим переплату при увеличении скорости работы.
§ page.team.tree.title: Дерево проекта с учётом выбранных фильтров
§ page.team.tree.filters.author: Employee
§ page.team.tree.filters.commits: Commits number
§ page.team.tree.filters.help: Минимальное количество коммитов, которое сделал сотрудник в файле
§ page.team.tree.filters.all: All employees
§ page.team.tree.add: Who added it
§ page.team.tree.change: Who changed it
§ page.team.tree.remove: Who removed it
§ page.team.tree.line: lines
§ page.team.tree.lineAdd: added
§ page.team.tree.lineRemove: changed
§ page.team.week.date: Date
§ page.team.week.numberTasks: Количество задач
§ page.team.week.people: Количество человек
§ page.team.week.line: Изменение строк
§ page.team.week.days: Days with and without commits
§ page.team.week.lossesDetails: Кто не коммитил
§ page.team.week.add: added
§ page.team.week.change: changed
§ page.team.week.remove: removed
§ page.team.week.hasCommits: были коммиты
§ page.team.week.hasNotCommits: небыло коммитов
§ page.team.week.days: days
§ page.team.week.tasks: tasks
§ page.team.pr.task: Task
§ page.team.pr.tasks: tasks
§ page.team.pr.firstCommitTime: First commit
§ page.team.pr.lastCommitTime: Last
§ page.team.pr.workDays: Дней разработки
§ page.team.pr.delayDays: Дней ожидания влития
§ page.team.pr.commits: Commits
§ page.team.pr.date: Дата влития
§ page.team.pr.mergeAuthor: Влил
§ page.team.pr.author: Employee
§ page.team.pr.middleTimeRelease: Среднее время поставки (дни)
§ page.team.pr.work: разработка
§ page.team.pr.delay: waiting
§ page.team.pr.days: days
§ page.team.pr.oneTaskDays: Время потраченное на одну задачу
§ page.team.pr.description1: *Время разработки* это разница времени от первого до последнего коммита по задаче. Не важно были перерывы в несколько дней между коммитами или нет. Сам факт какого-либо коммита увеличивает время.
§ page.team.pr.description2: *Время ожидания* это время между последним коммитом и влитием кода. Оно показывает фактический простой в ожидании чего-либо.
§ page.team.pr.description3: *Зачем отображать время разработки* без разбивки на кодинг и код-ревью? Затем, чтобы показать бизнесу фактическое время поставки кода. Ожидание тестирования, замечания на ревью, проблемы DevOps и прочие несовершенства процесса, как раз уже заложены в этот срок.
§ page.team.pr.statByAuthors: Statistics by employee
§ page.team.pr.longDelay: Длительное ожидание влития
§ page.person.print.photo.title: Photo
§ page.person.print.photo.description: место для фотографии
§ page.person.total.title: Основные характеристики
§ page.person.total.daysWorked.title: days of work
§ page.person.total.daysWorked.description: Учтены только дни, в которые делались коммиты
§ page.person.total.tasks.title: tasks
§ page.person.total.tasks.description: Если коммиты правильно подписаны
§ page.person.character.title: Персонаж
§ page.person.achievement.title: Achievements
§ page.person.achievement.positive: Positive
§ page.person.achievement.normal: Neutral
§ page.person.achievement.negative: Negative
§ page.person.achievement.description: Чем больше сотрудник набрал отрицательных достижений, тем больше вероятность, что ситуация нестандартная. Возможно, стоит изменить режим его работы, задачи или отчётность. Следует поговорить с ним и узнать, какие проблемы мешают его работе.
§ page.person.gets.title: Взятые геты:
§ page.person.gets.description: «Взять гет» в данном случае означает первым оставить коммит к&nbsp;задаче с&nbsp;&laquo;красивым&raquo; номером.
§ page.person.business.days.title: дней работы
§ page.person.business.days.description: Учтены только дни, в которые делались коммиты
§ page.person.business.tasks.title: tasks
§ page.person.business.tasks.description: Если коммиты правильно подписаны
§ page.person.business.losses.title: days without commits
§ page.person.business.losses.description: Все дни минус: праздники, выходные, отпуск, дни с коммитами
§ page.person.business.commits.title: commits
§ page.person.business.commits.description: Удалённые ветки не считаются
§ page.person.business.time.description: Время от первого, до последнего коммита (в том числе, нерабочие дни)
§ page.person.business.time.title: Дней на проекте:
§ page.person.business.time.dismissed: (dismissed)
§ page.person.business.time.staff: (not in the team)
§ page.person.business.achievements: Achievements
§ page.person.changes.title: Achievements
§ page.person.changes.description: 
При некоторых видах форматирования git отмечает строки как «удалённые» и «добавленные»,
хотя на самом деле они были «изменёны». Поэтому, если вы провели большой рефакторинг,
git может показать малое количество изменений в статистике, а фактический результат
будет отмечен, как скачок «удаленных» и «добавленных» строк.
§ page.person.changes.description: Список коммитов и количество изменений в них за этот день:
§ page.person.commits.title: Commits list:
§ page.person.money.title.total: For all the time
§ page.person.money.title.middle: Middle cost
§ page.person.money.moneyAll.title: received
§ page.person.money.moneyAll.description: Предполагаемая сумма зп с проекта (см. настройки)
§ page.person.money.moneyWorked.title: отработал
§ page.person.money.moneyWorked.description: Фактически отработанные дни умноженные на среднюю зп
§ page.person.money.moneyLosses.title: possible overpayment
§ page.person.money.moneyLosses.description: Дни без коммитов умноженные на среднюю зп
§ page.person.money.tasks.title: task
§ page.person.money.tasks.description: Количество закрытых задач к стоимости дня
§ page.person.money.commits.title: commit
§ page.person.money.commits.description: Количество коммитов к стоимости рабочего дня
§ page.person.speed.task: One task on average is
§ page.person.speed.max: Максимальная скорость в день
§ page.person.speed.days.title: days
§ page.person.speed.days.description: Имеются ввиду рабочие дни, если коммиты правильно подписаны
§ page.person.speed.commits.title: commits
§ page.person.speed.commits.description: Отрезаны 10% максимальных и минимальных значений
§ page.person.speed.line.title: code lines
§ page.person.speed.line.description: Отрезаны 10% максимальных и минимальных значений
§ page.person.speed.tasks.title: tasks
§ page.person.speed.tasks.description: Задача может быть не доделана, но работа по ней должна быть
§ page.person.speed.maxCommits.title: commits
§ page.person.speed.maxCommits.description: Задача может быть не доделана, но работа по ней должна быть
§ page.person.hours.title: Распределение коммитов в течении каждого дня недели
§ page.person.week.date: Date
§ page.person.week.tasks: Number of tasks
§ page.person.week.workDays: Days with commits
§ page.person.week.taskInDay: Tasks per day
§ page.person.week.days: days
§ page.person.week.workDay: weekdays
§ page.person.week.weekends: weekends

§ recommendations.title
Рекомендации и факты

§ recommendations.scope.parallelism.not.title
Нет паралельных работ

§ recommendations.scope.parallelism.not.description
любую фичу в один момент времени делает один человек.

# Метод расчёта:
- человеко-дни делятся на фактические дни для каждой фичи;
- находим среднее арифметическое;
- если результат меньше 1.3 считаем, что паралельных работ в рамках большинства фичей обычно нет;

# Почему это плохо:
- повышается bus factor;
- сотрудники медленее развиваются;
- трудно качественно проверить работу сотрудника;

# Почему это хорошо:
- появляюся эксперты, которые очень глубоко погружены в предметную область и могут предложить более качественные решения;
- скорее всего не бывает merge конфликтов;
- проект может очень быстро паралельно развиваться в разные стороны;

§ recommendations.scope.parallelism.has.title
Часть работ паралельно

§ recommendations.scope.parallelism.has.description
Иногда фичу делают одновременно несколько человек.

# Метод расчёта:
- человеко-дни делятся на фактические дни для каждой фичи;
- находим среднее арифметическое;
- если результат от 1.3 до 2.0 считаем, что часть работ в рамках разных фичей иногда делалается паралельно;


§ recommendations.scope.parallelism.every.title
Паралельные работы

§ recommendations.scope.parallelism.every.description
любую фичу в один момент времени делают несколько человек

# Метод расчёта:
- человеко-дни делятся на фактические дни для каждой фичи;
- находим среднее арифметическое;
- если результат больше двух считаем, что большая часть работ в рамках разных фичей обычно делалается паралельно;


§ recommendations.scope.money
в такую сумму можно оценить работу по данному проекту.

# Метод расчёта:
- человеко-дни затраченные на разработку умножаются на индивидуальную зарплату разработчиков;

Изменить зарплату каждого разработчика, для более точной суммы, можно в разделе «Настройки»

# Это много или мало?
Для ответа на этот вопрос, нужно ответить на следующие:
- Можно ли за эти деньги было купить готовое решение?
- Можно ли за эти деньги сделать более хороший продукт?

Если ответ на оба вопроса «да», то возможно, разработка с нуля не стоила потраченных на неё денег.
 
§ recommendations.scope.bus.everyHasOne.title
Bus factor = 1

§ recommendations.scope.bus.everyHasOne.description
В большинство фич погружен один человек.
Надо переключать людей.

# Почему это плохо:
- если сотрудники будут увольнятся, будет трудно продолжить их работу;
- невозможно контролировать качество его кода;

# Как делается выборка:
- более 80% коммитов в фичу делает один человек;
- проект имеет более 60% таких фичей;

§ recommendations.scope.bus.oneMaintainer
в фичи погружен один человек.

# Почему это плохо:
- если он уволится, будет трудно продолжить разработку;
- снижается качество code-review;
- трудно запаралелить разработку при необходимости;

# Как делается выборка:
- более 80% коммитов в фичу сделал один человек;

§ recommendations.scope.types.process.title
Плохие процессы

§ recommendations.scope.types.process.description
Большинство фич содержат один тип задач.

§ recommendations.scope.types.one
фичи содержат один тип задач.

§ recommendations.scope.types.common
Возможно, разработчики неправильно подписывают коммиты или менеджер заводит один и тот же тип задач.

# Почему это важно:
- невозможно передать поддержку другой команде;
- невозможно выпустить "коробочную" версию;
- сильная зависимость от конкретных разработчиков;
- большое количество ошибок и низкое качество кода;
- вероятное замедление разработки в будущем;

# В чём ошибка менеджера:
- взгляд на продукт, только с позиции «работающей демки»;

# Что должно быть:
- тесты;
- ошибки (выявленные по результатам тестов);
- рефакторинг (т.к. архитектура может измениться);
- документация;
- правки стиля (как результат опроса фокус-группы);

§ recommendations.scope.plan.title
Постройте долгосрочный план

§ recommendations.scope.plan.description
с учетом архитектуры.

При том опираться этот план должен сразу на самые трудные задачи.

# Почему отсутствие плана плохо:
- сотрудники делают минимально работающую версию, не закладывая точки расширения. После этого пишется не масштабируемый код, который тормозит следующие фичи;

# В чём ошибка менеджера:
- он не показал, как продукт будет развиваться далее и в каких точках будет рост;

# Как должно быть:
- составлятся глобальный план развития продукта;
- составлятся глобальный план развития архитектуры (с разработчиками и DBA);
- на уровне схем сразу проговариваются моменты, которые могут сильно измениться;

§ recommendations.scope.cost.title
Оцените инвестиции в фичу

§ recommendations.scope.cost.description
с количеством потенциальной прибыли.

Фичи которые дорого стоят в разработке, но приносят мало прибыли, возможно, стоит отложить или вообще отменить. Это сделает проект более комерчески успешным.

§ recommendations.author.lotOfLazy
пишет слишком мало кода.

# Может уволить?
- он тимлид, архитектор, аналитик?
- это его основной проект?
- есть какие-то зависимости от него?

# Почему нет смысла исправлять
Суммарные затраты на разработчика уже больше чем прибыль от его работы.
Если мы считаем, что обьективных помех его работе не было, то человек либо не хочет работать вообще, либо работает на двух проектах одновременно.
Увольнение и замена новым сотрудником выглядит оправданным с точки зрения общей статистики.

§ recommendations.author.manyLazy
пишет мало кода. Нужно взять на контроль.

# Как делается выборка:
- на тестовых выборках хороший программист пишет код больше 80% времени;
- в данном случае показатель от 60% до 80%;

# Как контролировать:
- дробить задачи на 1..2 дня;
- каждый день спрашивать статус;
- убедиться, что задачи хорошо расписаны и готовы к началу разработки;
- устроить парное программирование, чтобы проверить фактическую скорость;

§ recommendations.author.oneTypeMans
получает слишком однообразные задачи по типу. Может выгореть.

# Почему это важно:
- если сотрудник выгорит, его скорость работы снизится;
- замедляется профессиональный рост;
- повышается вероятность увольнения;

# Как делается выборка:
- для каждого коммита определятся тип задачи;
- если больше 70% задач одного типа, значит человек делает одно и тоже;


§ recommendations.author.projectType.openSource.title
Открытый проект

§ recommendations.author.projectType.openSource.description
пять дней в неделю тут не работают.

Проект может быть и закрытым, просто такой темп работы обычно у открытых библиотек на GitHub.

# Метод оценки:
- берется статистика по всем активным разработчикам;
- подсчитывается среднее число дней работы и без коммитов;
- у open-source библиотек рабочих дней обычно максимум 15..20%;

# Последствия
Для проектов, где работа не постоянна, нет смысла во многих показателях. Поэтому показатели без коммитов, скорости и т.п. будут скрыты.

Как правило, оценку таких проектов делают перед началом разработки своей закрытой версии. Самые интересные показатели в этом случае вероятная стоимость и суммарное время на разработку.


§ recommendations.author.projectType.easy.title
Слабая загрузка

§ recommendations.author.projectType.easy.description
слишком много дней без коммитов. Нужно понять почему команда не пишет код.

# Метод оценки:
- берется статистика по всем активным разработчикам;
- подсчитывается среднее число дней работы и без коммитов;
- загрузка считается слабой, если процент без коммитов от 5% до 20%;

# Возможные причины:
- фактически нет задач;
- задачи есть, но хорошо ложатся на текущую архитектуру;
- разработчиков отвлекают совещаниями;
- команда не работает;

# Варианты решения:
- обсудить проблему с командой;
- уменьшить гранулярность задач, чтобы за день можно было успеть сделать одну или две задачи;
- ввести ежедневные совещания, чтобы проверять движение задач по статусу;
- устроить сеансы парного программирования, чтобы убедиться, что разработчик может работать быстрее;

§ recommendations.author.manager.title
Обозначьте дедлайны

§ recommendations.author.manager.description
У любой задачи должен быть чёткий дедлайн.
 
Это позволит не затягивать её выполнение на несколько дней или недель.

# Какие показатели стоит проверить:
- количество дней на одну задачу, которое тратит работник;
- количество дней ожидания влития PR (страница статистики по PR);

§ recommendations.author.shorTalk.title
Проводите ежедневные совещания

§ recommendations.author.shorTalk.description
они помогают быть в курсе проекта.
 
Не растягивайте их отвлекаясь на постороние темы.

# На какие вопросы должен ответить сотрудник:
- что было сделано;
- что будет сделано;
- есть ли какие-либо проблемы;

# Следует обрывать монолог, если:
- начинают подробно описывать мелкие детали, которые не важны;
- уводят диалог в сторону, от первоначального плана;

# Почему это важно:
Часто сотрудник, который ничего не делает, старается уйти от ответа. Для этого он рассказывает кучу ненужных подробностей свой работы. Это позволяет усыпить внимание участников и растянуть время ответа. Создается ощущение что он чем-то занят, хотя по факту работы не было.

§ recommendations.author.ipr.title
Составьте план обучения

§ recommendations.author.ipr.description
на каждого сотрудника.

*Индивидуальный план обучения* — это список целей и задач, которые помогают человеку развиваться в определенной области.

# Как составить план:
- составить матрицу компетенций;
- определить по каким компетенциям меньше всего знаний и опыта;
- узнать какие из этих компетенций интересны сотруднику;
- придумать 3..5 целей в рамках каждой такой компетенции на пол-года или год;
- каждый месяц пытаться сделать что-либо для достижения одной цели;
- каждый месяц напоминать об общем плане достижения этих целей;

# Нужен ли план руководителю?
Да, руководитель так же должен составить план на себя. Если нет вышестоящего руководителя, то он должен проверять сам себя.

# Почему это важно:
- сотрудники становятся более лояльны к компании;
- за теже деньги вы получаете более квалифицированные кадры;

§ recommendations.author.oneToOne.title
Проводите 1-1 каждый месяц

§ recommendations.author.oneToOne.description
это поможет выявить проблемы на ранней стадии.

*One-to-one* — это регулярные личные встречи руководителя с подчиненным. На таких встречах обычно обсуждают всё, что важно для сотрудника, что его волнует, и то, чем он может поделиться с руководителем только наедине.

# Почему это важно:
- легко выяснить, кто из сотрудников перегружен, а у кого есть свободное время;
- можно предотвратить выгорание сотрудника;
- можно получить быструю обратную связь о процессах, которые вы можете не замечать;
- формируется доверительное отношение, сотрудники становятся более лояльны к компании;
- повышается мотивация и вовлеченность сотрудников;

§ recommendations.author.club.title
Ходите в бар

§ recommendations.author.club.description
один раз в месяц или два.

Это поможет выстроить неформальную коммуникацию в коллективе и сплотить команду, даже если общение будет сжатым.

# Почему это важно:
- можно получить быструю обратную связь о процессах, которые вы можете не замечать;
- формируется доверительное отношение, сотрудники становятся более лояльны к компании;
- повышается вовлеченность сотрудников;

§ recommendations.hour.onlyWork.title
Выходных тут нет

§ recommendations.hour.onlyWork.description
Вероятно, стоит уволить менеджера проекта.

§ recommendations.hour.weekends.title
Работа на выходных

§ recommendations.hour.weekends.description
Вероятно, стоит проверить менеджера проекта.


§ recommendations.hour.easy.title
Бывают проблемы

§ recommendations.hour.easy.description
Вероятно, бывают завалы и приходится работать на выходных.

§ recommendations.week.lazyDays.down.title
Стало меньше прогулов
§ recommendations.week.lazyDays.down.description
за последние три недели этот показатель упал

§ recommendations.week.lazyDays.up.title
Стало больше прогулов
§ recommendations.week.lazyDays.up.description
нет задач или нужен более жесткий контроль
      
§ recommendations.week.notWork.title
Стабильно не дорабатывает
§ recommendations.week.notWork.description
т.к. каждую неделю пишет код не 100% времени

§ recommendations.week.upWork.title
Стабильно перерабатывает
§ recommendations.week.upWork.description
т.к. каждую неделю пишет код в выходные дни


§ recommendations.week.task.up.title
Растёт производительность
§ recommendations.week.task.up.description
или задачи стали слишком мелкие. Нужно проверить. Если гранулярность та же - закрепить результат.

§ recommendations.week.task.down.title
Падает производительность
§ recommendations.week.task.down.description
или задачи хуже разбивают. Нужно проверить. Если гранулярность та же - взять на контроль.

# Метод оценки:
- количество задач в день, над которыми работают, на протяжении последних трех недель стабильно падает.

# Возможные ошибки:
- задачи могли быть сложнее, чем казались;
- задачи могли иметь большой объём работы (нужно проверить количество изменений, падают они или нет за этот же период)


§ recommendations.type.everyHasOne.title
Не подписывают тип задачи

§ recommendations.type.everyHasOne.description
большинство типов задач делает один человек.

§ recommendations.type.oneMaintainer.title
Узкая специализация

§ recommendations.type.oneMaintainer.description
большинство задач одного типа делают одни и те же люди.
# Типы задач:

§ recommendations.type.common
# Возможно, это не так

Нужно убедиться, что остальные сотрудники верно подписывают коммиты.

Шаги, которые помогут это сделать:
- настроить пре-коммит проверку для commit message;
- объяснить команде, что нужно указывать тип;
- проверить в новых ветках, что сотрудники следуют правилу;

# Если это действительно так

Вы настроили проверки и убедились что один и тот же сотрудник, делает задачи одного и того же типа.

Почему это плохо:
- его увольнение остановит целую пачку процессов;
- уменьшается компетенция остальных членов команды;
- трудно верхнеуровнево понять его правки;

Как это исправить:
- распределять разные типы задач равномерно;
- менять область работы (тесты, документация, ошибки) между сотрудниками через спринт;

§ recommendations.type.fewTypes.title
Это локальный продукт

§ recommendations.type.fewTypes.description
для конкретного заказчика или проблемы.

# Какие признаки есть у «глобального» продукта:
- локализация;
- документация;
- большой обьем тестов;
- визуальная кастомизация;
- рефакторинг узких мест;
- и т.п.

# Почему этот продукт выглядит как «локальный»:
- у каждого «глобального» признака будет перевес по своему типу задач;
- чем больше «глобальных» признаков, тем больше вероятность «глобального» продукта;

В данном случае мы видим небольшое число типов, а следовательно, скорее всего есть недоработки, мешающие легко масштабировать продукт на мировой рынок и продавать его в других странах.

# Возможно, это не так
По типам файлов мы можем предположить тип программы (сайт, серверное приложение, DevOps скрипты и т.д.). Для frontend приложения наша гипотеза будет более верной, чем для DevOps-скриптов, которые могут быть лишь микро-модулем инициализации.

§ recommendations.type.diff.title
Разбейте лидирующий тип на подтипы

§ recommendations.type.diff.description
для детализации ошибок.

Как правило, тип задач с меткой «исправление ошибок» является лидирующим. Это делает статистику слабо-детализированной.

*Если у вас произошла такая ситуация*, вы можете разбить этот тип на подтипы (например, по месту обнаружения).

Рассмотрим несколько вариантов подтипов:
- fix_dev (ошибка выявленная в процессе разработки);
- fix_test (ошибка выявленная в процессе тестирования);
- fix (ошибка выявленная в проде);

§ recommendations.type.buddy.title
Копите мелкие задачи

§ recommendations.type.buddy.description
для новых сотрудников.

# Если задача:
- не важная;
- не большая;
- не требует сильного погружения в контекст;
- больше про рефакторинг, чем про новый код;

# Положите её в backlog с меткой «для новичков».

Когда придёт новый сотрудник, вы сможете моментально достать ему пачку небольших и разнообразных по типу задач, для ознакомления с проектом.

Также, если у вас будет застой в работе, вы сможете доставать по одной такой мелкой задаче из backlog-а.
`);

export default {};
