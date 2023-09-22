import ICommit from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';

export default class DataGripByGet {
  isGet: IHashMap<boolean> = {};

  alreadyAdded: IHashMap<ICommit> = {};

  getsByAuthor: IHashMap<ICommit[]> = {};

  defaultGets: any = [];

  statistic: any = [];

  constructor() {
    this.createDefaultGets();
    this.clear();
  }

  createDefaultGets() {
    const gets = [ '1234', '12345', '123456', '1234567', '12345678' ];
    for (let size = 3; size < 7; size++) {
      for (let content = 1; content < 9; content++) {
        const firstKey = (new Array(size)).fill(content).join('');
        gets.push(firstKey);

        const lastKey = (new Array(size)).fill('0');
        lastKey[0] = content;
        gets.push(lastKey.join(''));
      }
    }
    this.defaultGets = gets;
  }

  clear() {
    this.isGet = Object.fromEntries(this.defaultGets.map((key: string) => [key, true]));
    this.alreadyAdded = {};
    this.getsByAuthor = {};
  }

  addCommit(commit: ICommit) {
    if (!this.isGet[commit.taskNumber]
      || this.alreadyAdded[commit.taskNumber]) return;

    this.alreadyAdded[commit.taskNumber] = commit;
    this.getsByAuthor[commit.author] = this.getsByAuthor[commit.author] || [];
    this.getsByAuthor[commit.author].push(commit);
  }
}