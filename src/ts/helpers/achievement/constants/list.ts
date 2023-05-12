import ACHIEVEMENT_TYPE from './type';

export default {
  commitsAfter1500: ['Сова', '70% коммитов после 15:00', ACHIEVEMENT_TYPE.NORMAL],
  commitsBefore1500: ['Раняя пташка', '70% коммитов до обеда', ACHIEVEMENT_TYPE.NORMAL],
  commitsAfter1800: ['Делу время', 'нет ни одного коммита после 18:00', ACHIEVEMENT_TYPE.GOOD],
  userNotWork: ['Залётный', 'меньше 5 коммитов за всё время проекта', ACHIEVEMENT_TYPE.NORMAL],
  userIsDied: ['Мёртвая душа', 'от 6 до 60 коммитов за все время проекта', ACHIEVEMENT_TYPE.NORMAL],
  workEveryTime: ['Раб божий', 'есть коммит на каждый час суток', ACHIEVEMENT_TYPE.BAD],
  workNotWork: ['Стрельба холостыми', 'коммиты есть, а закрытых задач нет', ACHIEVEMENT_TYPE.BAD], // нет картинки
  moreTasks: ['Батя грит малаца', 'больше всего закрытых задач', ACHIEVEMENT_TYPE.GOOD], // нет картинки
  lessTasks: ['Зашел и вышел', 'меньше всего закрытых задач', ACHIEVEMENT_TYPE.BAD],
  everyMessageLong: ['Мастер красноречия', 'стабильно самые длинные подписи коммитов', ACHIEVEMENT_TYPE.NORMAL],
  everyMessageShort: ['Болтун находка для шпиона', 'стабильно, самые короткие подписи коммитов', ACHIEVEMENT_TYPE.BAD],
  longestMessage: ['А разговоров то было...', 'самая длинная подпись коммита за все время', ACHIEVEMENT_TYPE.NORMAL],
  shortestName: ['Размер не главное', 'самое короткое имя', ACHIEVEMENT_TYPE.NORMAL], // нет картинки
  longestName: ['Азим Азиз Иль Ам Кадир Имран II', 'самое длинное имя', ACHIEVEMENT_TYPE.NORMAL],
  moreCommits: ['Мастер бекапов', 'больше всего коммитов', ACHIEVEMENT_TYPE.NORMAL],
  lessCommits: ['Редко но метко', 'меньше всего коммитов', ACHIEVEMENT_TYPE.BAD],
  oneCommitOneTask: ['Точно в цель', 'в среднем один коммит на задачу', ACHIEVEMENT_TYPE.NORMAL],
  moreLazyDays: ['Мысленно я с вами', 'больше всего дней без коммитов', ACHIEVEMENT_TYPE.BAD],
  lessLazyDays: ['Папа Карло', 'меньше всего дней без коммитов', ACHIEVEMENT_TYPE.GOOD],
  zeroLazyDays: ['Ни единого разрыва', 'ни одного дня без коммитов', ACHIEVEMENT_TYPE.GOOD],
  moreWorkDays: ['Ценный работник', 'больше всего рабочих дней', ACHIEVEMENT_TYPE.GOOD],
  lessWorkDays: ['Дальше без меня', 'меньше всего рабочих дней', ACHIEVEMENT_TYPE.BAD],
  moreScopes: ['Стартапер', 'сделал больше всего фичей', ACHIEVEMENT_TYPE.GOOD], // нет картинки
  lessScopes: ['Щегол', 'сделал меньше всего фичей', ACHIEVEMENT_TYPE.BAD],
  moreDaysForTask: ['Улитка на склоне', 'работа по задачам идёт медленнее чем у остальных', ACHIEVEMENT_TYPE.BAD],
  more2DaysForTask: ['Cо слоу', 'больше двух дней на задачу', ACHIEVEMENT_TYPE.BAD],
  moreDaysInProject: ['Старожил', 'больше всего дней на проекте', ACHIEVEMENT_TYPE.GOOD],
  lessDaysInProject: ['А это кто?', 'меньше всего дней на проекте', ACHIEVEMENT_TYPE.NORMAL],
  more90DaysInProject: ['Добро пожаловать', 'не уволили на испытательном', ACHIEVEMENT_TYPE.GOOD],
  lessDaysForTask: ['Скорострел', 'работа по задачам идёт быстрее чем у остальных', ACHIEVEMENT_TYPE.GOOD],
};
