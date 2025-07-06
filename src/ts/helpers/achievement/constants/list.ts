import ACHIEVEMENT_TYPE from './type';

export default {
  // готово
  commitsAfter1500: ACHIEVEMENT_TYPE.NORMAL, // Сова
  commitsBefore1500: ACHIEVEMENT_TYPE.NORMAL, // Ранняя пташка
  workEveryTime: ACHIEVEMENT_TYPE.BAD, // Раб божий
  workNotWork: ACHIEVEMENT_TYPE.BAD, // Стрельба холостыми
  userNotWork: ACHIEVEMENT_TYPE.NORMAL, // Залётный
  userIsDied: ACHIEVEMENT_TYPE.NORMAL, // Мёртвая душа
  lessTasks: ACHIEVEMENT_TYPE.BAD, // Зашел и вышел
  moreTasks: ACHIEVEMENT_TYPE.GOOD, // Батя грит малаца
  everyMessageLong: ACHIEVEMENT_TYPE.NORMAL, // Мастер красноречия
  everyMessageShort: ACHIEVEMENT_TYPE.BAD, // Болтун находка для шпиона
  shortestName: ACHIEVEMENT_TYPE.NORMAL, // Размер не главное // нет картинки
  longestName: ACHIEVEMENT_TYPE.NORMAL, // Азим Азиз Иль Ам Кадир Имран II
  moreCommits: ACHIEVEMENT_TYPE.NORMAL, // Мастер бекапов
  lessCommits: ACHIEVEMENT_TYPE.BAD, // Редко но метко
  oneCommitOneTask: ACHIEVEMENT_TYPE.NORMAL, // Точно в цель
  moreLazyDays: ACHIEVEMENT_TYPE.BAD, // Мысленно я с вами
  lessLazyDays: ACHIEVEMENT_TYPE.GOOD, // Папа Карло
  zeroLazyDays: ACHIEVEMENT_TYPE.GOOD, // Ни единого разрыва
  moreWorkDays: ACHIEVEMENT_TYPE.GOOD, // Ценный работник
  moreScopes: ACHIEVEMENT_TYPE.GOOD, // Стартапер // нет картинки
  lessScopes: ACHIEVEMENT_TYPE.BAD, // Щегол
  moreDaysForTask: ACHIEVEMENT_TYPE.BAD, // Улитка на склоне
  more2DaysForTask: ACHIEVEMENT_TYPE.BAD, // Cо слоу
  moreDaysInProject: ACHIEVEMENT_TYPE.GOOD, // Часть команды, часть корабля
  lessDaysInProject: ACHIEVEMENT_TYPE.NORMAL, // А это кто?
  more90DaysInProject: ACHIEVEMENT_TYPE.GOOD, // Добро пожаловать
  lessDaysForTask: ACHIEVEMENT_TYPE.GOOD, // Скорострел
  adam: ACHIEVEMENT_TYPE.NORMAL, // Адам
  more666DaysInProject: ACHIEVEMENT_TYPE.GOOD, // Чёрт
  more777DaysInProject: ACHIEVEMENT_TYPE.GOOD, // Азино 3 топора
  moreRefactoring: ACHIEVEMENT_TYPE.GOOD, // Выпускающий редактор
  moreStyle: ACHIEVEMENT_TYPE.GOOD, // Полиция моды

  hasCommitEveryTime: ACHIEVEMENT_TYPE.BAD, // Умер на работе
  more365DaysInProject: ACHIEVEMENT_TYPE.GOOD, // Годовасик, отработал год и не уволился
  moreReadMe: ACHIEVEMENT_TYPE.GOOD, // Летописец. Больше остальных внес в .MD
  moreTests: ACHIEVEMENT_TYPE.GOOD, // Тестировщик. Больше остальных внес в тестирование
  moreDevOps: ACHIEVEMENT_TYPE.GOOD, // DevOps. Больше остальных внес в DevOps
  longFilePath: ACHIEVEMENT_TYPE.NORMAL, // Закрома родины. первый создал файл с самым глубоким вложением
  longFileName: ACHIEVEMENT_TYPE.NORMAL, // Размер имеет значение. создал файл с самым длинным именем
  moreTasksInDay: ACHIEVEMENT_TYPE.GOOD, // Спиди-гонщик
  moreLongWaitPR: ACHIEVEMENT_TYPE.BAD, // Давным давно, в далёкой галактике
  morePRMerge: ACHIEVEMENT_TYPE.NORMAL, // Таможня даёт добро,
  firstLastCommit: ACHIEVEMENT_TYPE.NORMAL, // От начала и до конца. первый и последний коммит на проекте
  haveNotEmail: ACHIEVEMENT_TYPE.NORMAL, // Почтальон Печкин. Не заполнил поле e-mail
  hasCommitFrom0to7: ACHIEVEMENT_TYPE.BAD, // Ночной дозор
  longWaitPR: ACHIEVEMENT_TYPE.BAD, // Обещать не значит жениться, ожидание PR больше месяца
  lastCommit: ACHIEVEMENT_TYPE.NORMAL, // Я закончил. последний коммит на проекте
  longTask: ACHIEVEMENT_TYPE.BAD, // Вроде изян. работал над задачей больше трех месяцев
  noCommitOnDay: ACHIEVEMENT_TYPE.NORMAL, // Технический перерыв
  firstCommit: ACHIEVEMENT_TYPE.NORMAL, // Кто первый, того и тапки. первый коммит на проекте

  // Типаж Козерога, по месяцу первого коммита
  horoscope1: ACHIEVEMENT_TYPE.NORMAL, // козерог
  horoscope2: ACHIEVEMENT_TYPE.NORMAL, // водолей
  horoscope3: ACHIEVEMENT_TYPE.NORMAL, // рыба
  horoscope4: ACHIEVEMENT_TYPE.NORMAL, // овен
  horoscope5: ACHIEVEMENT_TYPE.NORMAL, // телец
  horoscope6: ACHIEVEMENT_TYPE.NORMAL, // близнец
  horoscope7: ACHIEVEMENT_TYPE.NORMAL, // рак
  horoscope8: ACHIEVEMENT_TYPE.NORMAL, // лев
  horoscope9: ACHIEVEMENT_TYPE.NORMAL, // дева
  horoscope10: ACHIEVEMENT_TYPE.NORMAL, // весы
  horoscope11: ACHIEVEMENT_TYPE.NORMAL, // скорп
  horoscope12: ACHIEVEMENT_TYPE.NORMAL, // стрелец

  // Паблисити ачивки
  moreChangeTimeZone: ACHIEVEMENT_TYPE.PUBLICITY, // Aaaaaa-viasales
  publicitySitnik: ACHIEVEMENT_TYPE.PUBLICITY, // Ситник

  // нет картинки
  longestMessage: ACHIEVEMENT_TYPE.NORMAL, // А разговоров то было...
  commitsAfter1800: ACHIEVEMENT_TYPE.GOOD, // Делу время
  more3YearsInProject: ACHIEVEMENT_TYPE.GOOD, // Старожил. больше 3х лет на проекте
  moreLintHint: ACHIEVEMENT_TYPE.GOOD, // Грамар-наци. Больше всех внес в .eslintrc .stylelintrc.json
  moreAddedFolders: ACHIEVEMENT_TYPE.NORMAL, // Директор, создал больше всех дирректорий
  workOnWeekends: ACHIEVEMENT_TYPE.BAD, // Работа не walk. хоть раз работал на выходных
  fileRush: ACHIEVEMENT_TYPE.NORMAL, // Зерг Раш. Создал больше всех файлов в проекте

  // нет кода
  lessWorkDays: ACHIEVEMENT_TYPE.BAD, // Дальше без меня
  moreOnHoliday: ACHIEVEMENT_TYPE.BAD, // Нет жизни
  moreCreateCode: ACHIEVEMENT_TYPE.NORMAL, // Созидатель -- переименовать?
  moreRemoveCode: ACHIEVEMENT_TYPE.NORMAL, // Разрушитель
  moreChangeCode: ACHIEVEMENT_TYPE.NORMAL, // Реформатор

  oneExtension: ACHIEVEMENT_TYPE.NORMAL, // Один в поле воин. Только он работает с файлами определенного расширения
  allRelease: ACHIEVEMENT_TYPE.NORMAL, // Фулл хаус. есть релиз, собранный только из его задач
  removeCreateFile: ACHIEVEMENT_TYPE.NORMAL, // Откопал стюардессу. востановил удаленный файл
  renameFile: ACHIEVEMENT_TYPE.NORMAL, // Астана Нур-Султан Астана. переименовывал туда-сюда файл
  // Галя, у нас отмена - откатил назад
  // У меня работает - больше всего коммитов с текстом fix
  // 500я на проде - больше всего коммитов с префиксом hotfix
  // moreFix: ACHIEVEMENT_TYPE.GOOD, // Bug hunter
  // godFather: ACHIEVEMENT_TYPE.NORMAL, // Крёстный отец. Первый создал файлы небольшой группы.
  // Боярин - есть папка на 20 файлов, где правит только этот человек
  // Феодал - есть папка на 50 файлов, где правит только этот человек
};
