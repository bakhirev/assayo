const SMILES = [
  null,
  null, // ОТЧЁТ ПО СТАТИСТИКЕ КОММИТОВ
  '📈', //   Как создать и посмотреть отчёт?
  null, //     Через публичный сервер
  null, //     Используя библиотеку NodeJS
  null, //     Используя библиотеку PHP
  null, //     Используя библиотеку Python
  null, //     Используя библиотеку Ruby
  null, //     Используя библиотеку Go
  null, //     Без установки библиотек
  null, //     Через github actions
  null, //     С помощью приватного сервера
  '‍🎭', //   Как объединить авторов коммитов в отчёте?
  '📤', //   Как выгрузить данные из git в txt файл?
  null, //     Для онлайн просмотра
  null, //     Для офлайн просмотра
  null, //     Если вы используете PowerShell в Windows
  '🗃️', //   Как посмотреть отчёт по группе микросервисов?

  null, // ЕЖЕДНЕВНЫЕ ПРАКТИКИ В ПРОЕКТЕ
  '📝', //   Как подписывать коммиты?
  '👮', //   Как добавить автоматическую проверку подписи коммита?
  null, //     Используя файл commit-msg
  null, //     Используя пакет pre-commit

  null, // ОБ ЭТОМ ПРИЛОЖЕНИИ
  '🎨', //   Как брендировать отчёт?
  '🛠️', //   Как пересобрать файл отчёта из исходного кода?
  '🈯', //   Как добавить или отредактировать перевод?
  '📐', //   Архитектура
  null, //     Структура этого модуля
  null, //     Общая архитектура микросервисов
  '📧', //   Пожелания, предложения, замечания

  null, // 1
  null, // 4
  null, // 8
  null, // 8
  null, // 8
  null, // 9
  null, // 9
  null, // 11
  null, // 12
  null, // 12
  null, // 12
  '👨‍💻', // 12
  '🚀', // 5
  '🏭', // 13
  '📚', // 20
  '🛠️', // 27
  '🗺️', // 30
];

class TableOfContent {
  constructor() {
    this.prefixes = (new Array(6)).fill(1).map((a, i) => (new Array(i)).fill('#').join(''));
    this.smiles = SMILES;
    this.titles = [];
    this.indexOfList = 0;
  }

  addTitle(level, text, markdownText) {
    this.titles.push({ level, text });
    const index = this.titles.length - 1;
    markdownText.push(`<a name="link-${index}"></a>`);
    const prefix = this.prefixes[level] || '';
    const smile = this.smiles[index] || '';
    markdownText.push(`${prefix} ${smile} ${text}`);

    // маркер, где будет Содержание
    if (!this.indexOfList && level === 3) {
      this.indexOfList = markdownText.length;
    }
  }

  getMarkdownWithTable(markdownText) {
    const content = this.titles
      .map(({ level, text }, i) => {
        if (!(level === 2 || level === 3 || level === 4) || i === 0) return;
        const prefix = ['\n\n', '  ', '    '][level - 2];
        const title = text.replace(/(\([^)]*\))|([\[\]`]*)/gim, '');
        return `${prefix}- [${title}](#link-${i})`;
      })
      .filter(v => v);

    return [
      ...markdownText.slice(0, this.indexOfList),
      ...content,
      ...markdownText.slice(this.indexOfList),
    ];
  }
}

module.exports = TableOfContent;
