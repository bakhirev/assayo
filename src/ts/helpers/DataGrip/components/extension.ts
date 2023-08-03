import IHashMap from 'ts/interfaces/HashMap';

import MinMaxCounter from './counter';

const IGNORE_LIST = [
  '.eslintrc',
  '.gitignore',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
];

export default class DataGripByExtension {
  statistic: any = [];

  statisticByName: IHashMap<any> = {};

  clear() {
    this.statistic = [];
    this.statisticByName = {};
  }

  updateTotalInfo(fileList: any[], byAuthor: any) {
    const byExtension = {};

    fileList.forEach((file: any) => {
      if (!file.extension
        || IGNORE_LIST.includes(file.name)) return;
      if (!byExtension[file.extension]) {
        byExtension[file.extension] = {
          extension: file.extension, authors: {}, more: {}, total: { added: 0, changes: 0, removed: 0, total: 0 },
        };
      }

      for (let author in file.authors) {
        if (!author
          || byAuthor.statisticByName[author]?.isStaff) return;
        byExtension[file.extension].authors[author] = byExtension[file.extension].authors[author]
          || { added: 0, changes: 0, removed: 0 };

        const statistic = file.authors[author];
        const total = byExtension[file.extension].authors[author];
        total.added += statistic.added;
        total.changes += statistic.changes;
        total.removed += statistic.removed;

        byExtension[file.extension].total.added += statistic.added;
        byExtension[file.extension].total.changes += statistic.changes;
        byExtension[file.extension].total.removed += statistic.removed;
        byExtension[file.extension].total.total += statistic.added + statistic.changes + statistic.removed;
      }
    });

    this.#addMorePercent(byExtension);

    this.statistic = Object.entries(byExtension)
      .sort((a: any, b: any) => b[1].total.total - a[1].total.total)
      .map((item: any) => item[1]);
    this.statisticByName = byExtension;
  }

  #addMorePercent(byExtension: any) {
    for (let extension in byExtension) {
      const moreAdded = new MinMaxCounter();
      const moreChanges = new MinMaxCounter();
      const moreRemoved = new MinMaxCounter();

      for (let author in byExtension[extension].authors) {
        const statistic = byExtension[extension].authors[author];
        const total = statistic.added + statistic.changes + statistic.removed;

        statistic.addedPercent = (statistic.added * 100) / total;
        statistic.changesPercent = (statistic.changes * 100) / total;
        statistic.removedPercent = (statistic.removed * 100) / total;

        moreAdded.update(statistic.addedPercent, author);
        moreChanges.update(statistic.changesPercent, author);
        moreRemoved.update(statistic.removedPercent, author);
      }

      byExtension[extension].more = {
        added: { percent: moreAdded.max, author: moreAdded.maxData },
        changes: { percent: moreChanges.max, author: moreChanges.maxData },
        removed: { percent: moreRemoved.max, author: moreRemoved.maxData },
      };
    }
  }
}