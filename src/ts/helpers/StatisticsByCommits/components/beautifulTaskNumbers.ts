import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';

const BEAUTIFUL_NUMBERS = new Set([ '1234', '12345', '123456', '1234567', '12345678' ]);

function createDefaultBeautifulNumbers() {
  for (let size = 3; size < 7; size++) {
    for (let content = 1; content < 9; content++) {
      const firstKey = (new Array(size)).fill(content).join('');
      BEAUTIFUL_NUMBERS.add(firstKey);

      const lastKey = (new Array(size)).fill('0');
      lastKey[0] = content;
      BEAUTIFUL_NUMBERS.add(lastKey.join(''));
    }
  }
}

createDefaultBeautifulNumbers();

export default class StatisticsByBeautifulTaskNumbers {
  alreadyAdded: Set<number> = new Set();

  totalInfoByName: HashMap<ICommit[]> = new Map();

  clear() {
    this.alreadyAdded.clear();
    this.totalInfoByName.clear();
  }

  addCommit(commit: ICommit) {
    if (!BEAUTIFUL_NUMBERS.has(`${commit.taskNumber}`)
      || this.alreadyAdded.has(commit.taskNumber)) return;

    this.alreadyAdded.add(commit.taskNumber);
    const statistic = this.totalInfoByName.get(commit.author) || [];
    statistic.push(commit);
    this.totalInfoByName.set(commit.author, statistic);
  }
}
