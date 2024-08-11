import IHashMap from 'ts/interfaces/HashMap';

export default class FakeName {
  refOldNewName: IHashMap<string> = {};

  dictionary: string[] = [];

  index: number = 0;

  newNamePrefix: string = '';

  constructor(newNamePrefix: string, dictionary: string[]) {
    this.dictionary = dictionary;
    this.newNamePrefix = newNamePrefix;
  }

  get(name: string) {
    if (!this.refOldNewName[name]) {
      this.refOldNewName[name] = this.dictionary[this.index] || `${this.newNamePrefix}${this.index}`;
      this.index += 1;
    }
    return this.refOldNewName[name];
  }
}
