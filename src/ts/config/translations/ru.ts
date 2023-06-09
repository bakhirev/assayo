import localization from 'ts/helpers/Localization';

localization.parse('ru', `
§ sidebar.team.total: Общая информация
§ sidebar.team.scope: Оценка проекта
§ sidebar.team.author: Оценка сотрудников
§ sidebar.team.type: Типы задач
§ sidebar.team.sprint: По неделям
§ sidebar.team.month: По месяцу
§ sidebar.team.tree: Анализ файлов
§ sidebar.team.heatmap: График работы
§ sidebar.team.hours: Расписание
§ sidebar.team.timestamp: Все коммиты
§ sidebar.team.changes: Все изменения
§ sidebar.team.words: Популярные слова
§ sidebar.person.total: Общая информация
§ sidebar.person.money: Стоимость работы
§ sidebar.person.speed: Скорость
§ sidebar.person.week: По неделям
§ sidebar.person.month: По месяцам
§ sidebar.person.frequency: График работы
§ sidebar.person.hours: Расписание
§ sidebar.person.commits: Все коммиты
§ sidebar.person.changes: Все изменения
§ sidebar.person.words: Популярные слова
§ page.team.author.types: Тип работ
§ page.team.author.commits: Коммитов
§ page.team.author.commitsSmall: коммитов
§ page.team.author.tasks: Задач
§ page.team.author.workedLosses: Дни с коммитами и без
§ page.team.author.worked: работа
§ page.team.author.losses: дни без коммитов
§ page.team.author.days: дней
§ page.team.author.daysForTask: Дней на задачу
§ page.team.author.scopes: Фич
§ page.team.author.moneyAll: Получил
§ page.team.author.moneyWorked: Отработал
§ page.team.author.moneyLosses: Переплата
§ page.team.scope.scope: Фича
§ page.team.scope.days: Раб. дней
§ page.team.scope.authorsDays: Человеко-дней
§ page.team.scope.tasks: Задач
§ page.team.scope.commits: Коммитов
§ page.team.scope.commitsSmall: коммитов
§ page.team.scope.types: Тип работ
§ page.team.scope.authors: Персональный вклад
§ page.team.scope.cost: Стоимость
§ page.team.type.type: Тип работы
§ page.team.type.tasks: Задач
§ page.team.type.days: Дней
§ page.team.type.authorsDays: Человеко-дней
§ page.team.type.commits: Коммитов
§ page.team.type.commitsSmall: коммитов
§ page.team.type.authors: Персональный вклад
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
§ page.team.total.titleA: Объём работ
§ page.team.total.titleB: Стоимость
§ page.team.tree.filters1: Пользователь
§ page.team.tree.filters2: и более 
§ page.team.tree.filters3: коммитов в файле или папке
§ page.team.tree.percent: Процент перезаписи
§ page.team.tree.add: Кто добавлял
§ page.team.tree.change: Кто менял
§ page.team.tree.remove: Кто удалял
§ page.team.tree.line: строк
§ page.team.tree.lineAdd: добавили
§ page.team.tree.lineRemove: изменили
§ page.team.week.commits: коммитов
§ page.team.week.tasks: задач
§ page.team.week.add: добавили
§ page.team.week.change: изменили
§ page.team.week.remove: удалили
§ page.team.week.worked: работа
§ page.team.week.losses: дни без коммитов
§ page.team.week.days: дней
§ page.team.week.date: Дата
§ page.team.week.numberTasks: Количество задач
§ page.team.week.people: Количество человек
§ page.team.week.files: Изменения файлов
§ page.team.week.days: Дни с коммитами и без
§ page.team.week.lossesDetails: Кто не коммитил
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
хотя на самом деле они были «изменёны». Поэтому, если вы провели большой рефакторинг,
git может показать малое количество изменений в статистике, а фактический результат
будет отмечен, как скачок «удаленных» и «добавленных» строк.
§ page.person.changes.description: Список коммитов и количество изменений в них за этот день:
§ page.person.commits.title: Список коммитов:
§ page.person.money.moneyAll.title: получил
§ page.person.money.moneyAll.description: Предполагаемая сумма зп с проекта (см. настройки)
§ page.person.money.moneyWorked.title: отработал
§ page.person.money.moneyWorked.description: Фактически отработанные дни умноженные на среднюю зп
§ page.person.money.moneyLosses.title: не делал коммиты
§ page.person.money.moneyLosses.description: Дни когда мог работать, но не работал умноженные на среднюю зп
§ page.person.money.tasks.title: задача
§ page.person.money.tasks.description: Количество закрытых задач к стоимости дня
§ page.person.money.commits.title: коммит
§ page.person.money.commits.description: Количество коммитов к стоимости рабочего дня
§ page.person.money.total: За всё время
§ page.person.money.middle: Средняя стоимость
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
§ page.person.speed.task: Одна задача в среднем это
§ page.person.speed.max: Максимальная скорость в день
§ page.person.week.date: Дата
§ page.person.week.tasks: Количество задач
§ page.person.week.workDays: Рабочие дни
§ page.person.week.taskInDay: Задач в день
§ page.person.week.commits: коммитов
§ page.person.week.days: дней
§ page.person.week.workDay: будни
§ page.person.week.weekends: выходные

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
Узкая специализация
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
`);

export default {};
