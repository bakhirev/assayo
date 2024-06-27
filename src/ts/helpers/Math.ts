import IHashMap from 'ts/interfaces/HashMap';

interface IValueAndCount {
  value: number;
  count: number;
}

// получить средневзвешенное значение
export class WeightedAverage {
  valueAndCount: IHashMap<IValueAndCount> = {};

  update(value: number) {
    if (this.valueAndCount[value]) {
      this.valueAndCount[value].count += 1;
    } else {
      this.valueAndCount[value] = { value, count: 1 };
    }
  }

  clear() {
    this.valueAndCount = {};
  }

  get() {
    let count = 0;
    let value = 0;

    Object
      .values(this.valueAndCount)
      .forEach((item: any) => {
        value += item.value * item.count;
        count += item.count;
      });

    return value / count;
  }
}

export function increment(object: Object, path: string) {
  object[path] = (object[path] || 0) + 1;
}
