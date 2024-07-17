export default `
§ page.welcome.step1: Выполните команду в корне вашего проекта
§ page.welcome.step3: Перетащите
§ page.welcome.step4: файл log.txt на эту страницу
§ page.welcome.description: Git создаст файл log.txt. Он содержит данные для построения отчёта. Или git shortlog -s -n -e если отчёт вам не нужен. Создайте файл [.mailmap|https://git-scm.com/docs/gitmailmap] в корне проекта, чтобы объединить статистику по сотрудникам.
§ page.welcome.warning1: Сервис *НЕ ХРАНИТ* и *НЕ ПЕРЕДАЁТ* ваши данные. Все расчёты выполняются локально в вашем браузере прямо на вашей машине.
§ page.welcome.warning2: Сервис *НЕ СОБИРАЕТ СТАТИСТИКУ* по проектам. Вы можете отключить интернет, проверить трафик и даже собрать локальный билд из [исходников|https://github.com/bakhirev/assayo].
§ page.common.words.title: Статистика по словам
§ page.common.words.description: самое популярное слово. Встречается $1 раза.
§ page.common.commits.title: Количество коммитов по дням
§ page.common.commits.description: ($1) самый продуктивный день по числу коммитов.
§ page.common.commits.title2: $1 сделано коммитов: $2
§ page.common.filter.allUsers: Не имеет значения
§ page.print.modal.title: Что распечатываем?
§ page.print.modal.page: Текущую страницу
§ page.print.modal.type: Текущий раздел
§ page.print.modal.all: Всю статистику
§ page.print.modal.cancel: Отмена
§ page.print.tableOfContents: Оглавление
§ page.print.title: Отчёт по git-репозиторию
§ page.print.sub_title: «$1»
§ page.print.description: Данные для отчёта были получены из истории коммитов.
§ page.team.author.title: Статистика по сотрудникам
§ page.team.author.description1: *Часть статистики* (скорость работы, затраченные деньги и т.п.) *по сотрудникам с типом «Помощник» не считается*, т.к. это эпизодическая роль в проекте. Предполагаем, что они не влияют на проект, а их правками можно пренебречь на фоне общего объема работы.
§ page.team.author.description2: *Сортировка по умолчанию* — это сортировка по количеству задач и группам (текущие, уволенные, помогающие  сотрудники).
§ page.team.author.status: Статус
§ page.team.author.firstCommit: Первый коммит
§ page.team.author.lastCommit: Последний
§ page.team.author.daysAll: Всего дней
§ page.team.author.types: Тип работ
§ page.team.author.commits: Коммитов
§ page.team.author.commitsSmall: коммитов
§ page.team.author.tasks: Задач
§ page.team.author.tasksSmall: задач
§ page.team.author.workedLosses: Дни с коммитами и без
§ page.team.author.worked: работа
§ page.team.author.losses: дни без коммитов
§ page.team.author.days: дней
§ page.team.author.daysForTask: Дней на задачу
§ page.team.author.scopes: Фич
§ page.team.author.moneyAll: Получил
§ page.team.author.moneyWorked: Отработал
§ page.team.author.moneyLosses: Переплата
§ page.team.author.type.work: работает
§ page.team.author.type.dismissed: уволен
§ page.team.author.type.staff: помощник
§ page.team.hours.title: Распределение коммитов в течении каждого дня недели
§ page.team.month.title: Календарь работы по проекту
§ page.team.month.first: (первый рабочий день)
§ page.team.month.last: (последний рабочий день)
§ page.team.scope.title: Статистика по фичам
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
§ page.team.tree.linesAdded: добавили
§ page.team.tree.linesChanged: изменили
§ page.team.tree.linesRemoved: удалили
§ page.team.day.commits: Коммиты
§ page.team.day.activity: Активность
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
§ page.team.pr.workDays: Среднее время работы над задачей
§ page.team.pr.delayDays: Среднее время ревью PR
§ page.team.pr.all.workDays: Время работы над задачей
§ page.team.pr.all.delayDays: Время ревью PR
§ page.team.pr.middleTimeRelease: Отношение времени разработки к времени ревью
§ page.team.pr.chart.1day: день
§ page.team.pr.chart.3day: три дня
§ page.team.pr.chart.7day: неделя
§ page.team.pr.chart.14day: две недели
§ page.team.pr.chart.30day: месяц
§ page.team.pr.chart.more: более
§ page.team.pr.commits: Коммиты
§ page.team.pr.date: Дата влития
§ page.team.pr.mergeAuthor: Влил
§ page.team.pr.author: Сотрудник
§ page.team.pr.work: разработка
§ page.team.pr.delay: ожидание
§ page.team.pr.days: дней
§ page.team.pr.oneTaskDays: Время потраченное на одну задачу
§ page.team.pr.description1: *Время разработки* это разница времени от первого до последнего коммита по задаче. Не важно были перерывы в несколько дней между коммитами или нет. Сам факт какого-либо коммита увеличивает время.
§ page.team.pr.description2: *Время ожидания* это время между последним коммитом и влитием кода. Оно показывает фактический простой в ожидании чего-либо.
§ page.team.pr.description3: *Зачем отображать время разработки* без разбивки на кодинг и код-ревью? Затем, чтобы показать бизнесу фактическое время поставки кода. Ожидание тестирования, замечания на ревью, проблемы DevOps и прочие несовершенства процесса, как раз уже заложены в этот срок.
§ page.team.pr.statByAuthors: Статистика по сотрудникам
§ page.team.pr.longDelay: Длительное ожидание влития
§ page.team.tasks.task: Задача
§ page.team.tasks.author: Автор первого коммита
§ page.team.tasks.from: Первый коммит
§ page.team.tasks.to: Последний коммит
§ page.team.tasks.daysInWork: Дней в работе
§ page.team.tasks.commits: Количество коммитов
§ page.team.tasks.pr: Дата влития
§ page.team.tasks.prAuthor: Влил
§ page.team.tasks.prDelayDays: Дней ожидания влития
§ page.team.tasks.comments: Комментарии
§ page.team.extension.extension: Расширения файлов
§ page.team.extension.type: Подтип файлов
§ page.team.extension.name: Тип
§ page.team.extension.path: Путь
§ page.team.extension.current.count: Количество
§ page.team.extension.removed.count: Количество удалённых
§ page.team.extension.files: файлов
§ page.team.release.title: Релиз
§ page.team.release.from: Дата создания
§ page.team.release.to: Дата завершения
§ page.team.release.prLength: Задач
§ page.team.release.delay: Дней работы
§ page.team.release.waiting: Дней до следующего релиза
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
§ page.person.gets.title: Медали за номера задач:
§ page.person.gets.description: Медаль выдается, если пользователь первым оставляет коммит к задаче с  «красивым» номером.
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
§ page.person.business.time.staff: (помощник)
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
§ page.sponsor.title: Поддержите проект
§ page.sponsor.share.description: Расскажите о нашем [проекте|https://github.com/bakhirev/assayo] в соцсетях! Можно поделиться [статьей|https://habr.com/ru/articles/763342/], [постом|https://www.reddit.com/r/github/comments/1bvtsl3/how_i_parsed_git_statistics/] или сделать видео-обзор.
§ page.sponsor.share.button: Копировать ссылку
§ page.sponsor.money.description: Мы будем рады, если вы поддержите нас любой суммой! Все средства пойдут на дальнейшее развитие проекта.
§ page.sponsor.money.qr: Разовый платёж (СБП)
§ page.sponsor.money.github: Подписка GitHub Sponsor
`;
