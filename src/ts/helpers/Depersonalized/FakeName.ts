import { HashMap } from 'ts/interfaces/HashMap';

export default class FakeName {
  cache: HashMap<string> = new Map();

  dictionary: string[] = [];

  index: number = 0;

  prefix: string = '';

  constructor(prefix: string, dictionary: string[]) {
    this.dictionary = dictionary;
    this.prefix = prefix;
  }

  get(key: string) {
    let value = this.cache.get(key);
    if (value) return value;

    value = this.dictionary[this.index] || `${this.prefix}${this.index}`;
    this.cache.set(key, value);
    this.index += 1;
    return value;
  }
}
