import IHashMap from 'ts/interfaces/HashMap';

export default class FakeName {
  refOldNewName: IHashMap<string> = {};

  dictionary: string[] = [];

  index: number = 0;

  constructor(dictionary: string[]) {
    this.dictionary = dictionary;
  }

  get(name: string) {
    if (!this.refOldNewName[name]) {
      this.refOldNewName[name] = this.dictionary[this.index] || `${Math.random()}`;
      this.index += 1;
    }
    return this.refOldNewName[name];
  }
}
