import ACHIEVEMENT_TYPE from './type';

export default {
  // готово
  commitsAfter1500: ['Сова', '70% коммитов после 15:00', ACHIEVEMENT_TYPE.NORMAL],
  commitsBefore1500: ['Раняя пташка', '70% коммитов до обеда', ACHIEVEMENT_TYPE.NORMAL],
  commitsAfter1800: ['Делу время', 'нет ни одного коммита после 18:00', ACHIEVEMENT_TYPE.GOOD],
  workEveryTime: ['Раб божий', 'есть коммит на каждый час суток', ACHIEVEMENT_TYPE.BAD],
  workNotWork: ['Стрельба холостыми', 'коммиты есть, а закрытых задач нет', ACHIEVEMENT_TYPE.BAD],
  userNotWork: ['Залётный', 'это не его основной проект', ACHIEVEMENT_TYPE.NORMAL],
  userIsDied: ['Мёртвая душа', 'работал, но уволился', ACHIEVEMENT_TYPE.NORMAL],
  lessTasks: ['Зашел и вышел', 'меньше всего закрытых задач', ACHIEVEMENT_TYPE.BAD],
  moreTasks: ['Батя грит малаца', 'больше всего закрытых задач', ACHIEVEMENT_TYPE.GOOD],
  everyMessageLong: ['Мастер красноречия', 'стабильно самые длинные подписи коммитов', ACHIEVEMENT_TYPE.NORMAL],
  everyMessageShort: ['Болтун находка для шпиона', 'стабильно, самые короткие подписи коммитов', ACHIEVEMENT_TYPE.BAD],
  shortestName: ['Размер не главное', 'самое короткое имя', ACHIEVEMENT_TYPE.NORMAL], // нет картинки
  longestName: ['Азим Азиз Иль Ам Кадир Имран II', 'самое длинное имя', ACHIEVEMENT_TYPE.NORMAL],
  moreCommits: ['Мастер бекапов', 'больше всего коммитов', ACHIEVEMENT_TYPE.NORMAL],
  lessCommits: ['Редко но метко', 'меньше всего коммитов', ACHIEVEMENT_TYPE.BAD],
  oneCommitOneTask: ['Точно в цель', 'в среднем один коммит на задачу', ACHIEVEMENT_TYPE.NORMAL],
  moreLazyDays: ['Мысленно я с вами', 'больше всего дней без коммитов', ACHIEVEMENT_TYPE.BAD],
  lessLazyDays: ['Папа Карло', 'меньше всего дней без коммитов', ACHIEVEMENT_TYPE.GOOD],
  zeroLazyDays: ['Ни единого разрыва', 'ни одного дня без коммитов', ACHIEVEMENT_TYPE.GOOD],
  moreWorkDays: ['Ценный работник', 'больше всего рабочих дней', ACHIEVEMENT_TYPE.GOOD],
  moreScopes: ['Стартапер', 'сделал больше всего фичей', ACHIEVEMENT_TYPE.GOOD], // нет картинки
  lessScopes: ['Щегол', 'сделал меньше всего фичей', ACHIEVEMENT_TYPE.BAD],
  moreDaysForTask: ['Улитка на склоне', 'работа по задачам идёт медленнее чем у остальных', ACHIEVEMENT_TYPE.BAD],
  more2DaysForTask: ['Cо слоу', 'больше двух дней на задачу', ACHIEVEMENT_TYPE.BAD],
  moreDaysInProject: ['Старожил', 'больше всего дней на проекте', ACHIEVEMENT_TYPE.GOOD],
  lessDaysInProject: ['А это кто?', 'меньше всего дней на проекте', ACHIEVEMENT_TYPE.NORMAL],
  more90DaysInProject: ['Добро пожаловать', 'не уволили на испытательном', ACHIEVEMENT_TYPE.GOOD],
  lessDaysForTask: ['Скорострел', 'одна задача занимает меньше дня', ACHIEVEMENT_TYPE.GOOD],

  moreRefactoring: ['Выпускающий редактор', 'сделал больше всех меток «рефакторинг»', ACHIEVEMENT_TYPE.GOOD],
  // нет картинки
  longestMessage: ['А разговоров то было...', 'самая длинная подпись коммита за все время', ACHIEVEMENT_TYPE.NORMAL],
  adam: ['Адам', 'первый стабильны сотрудник на проекте', ACHIEVEMENT_TYPE.NORMAL],
  more666DaysInProject: ['Чёрт', 'отработал 666 дней на проекте', ACHIEVEMENT_TYPE.GOOD],
  more777DaysInProject: ['Азино 3 топора', 'отработал 777 дней на проекте', ACHIEVEMENT_TYPE.GOOD],
  moreTasksInDay: ['Спиди-гонщик', 'рекорд по количеству закрытых задач в день', ACHIEVEMENT_TYPE.GOOD],

  // нет кода
  // moreFix: ['Bug hunter', 'больше всего закрытых багов', ACHIEVEMENT_TYPE.GOOD],
  lessWorkDays: ['Дальше без меня', 'меньше всего рабочих дней', ACHIEVEMENT_TYPE.BAD],
  moreCreateCode: ['Созидатель', 'склонен больше остальных добавлять код', ACHIEVEMENT_TYPE.NORMAL],
  moreRemoveCode: ['Разрушитель', 'склонен больше остальных удалять код', ACHIEVEMENT_TYPE.NORMAL],
  moreChangeCode: ['Реформатор', 'склонен больше остальных изменять код', ACHIEVEMENT_TYPE.NORMAL], // есть картинка
  moreStyle: ['Полиция моды', 'склонен больше остальных изменять CSS', ACHIEVEMENT_TYPE.GOOD],
};
