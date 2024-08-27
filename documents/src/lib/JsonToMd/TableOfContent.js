const SMILES = [
  '👨‍💻', // 1
  '‍👨‍💼', // 2
  '👑', // 3
  null, // 4
  '🚀', // 5
  '🚀', // 5
  '‍🎭', // 6
  '📤', // 7
  null, // 8
  null, // 9
  null, // 9
  '📈', // 10
  null, // 11
  null, // 12
  '🏭', // 13
  '🗃️', // 14
  '🎨', // 15
  '📝', // 16
  '👮', // 17
  null, // 18
  null, // 19
  '📚', // 20
  null, // 21
  null, // 22
  '🛠️', // 23
  null, // 24
  null, // 25
  null, // 26
  '🛠️', // 27
  '📐', // 28
  '🈯', // 29
  '🗺️', // 30
  '📧', // 31
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
        if (!(level === 3 || level === 4) || i === 3) return;
        const prefix = level === 4 ? '  ' : '';
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
