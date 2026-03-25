import { HashMap } from 'ts/interfaces/HashMap';
import { ONE_DAY } from './formatter';

interface ValueAndCount {
  value: number;
  count: number;
}

// получить средневзвешенное значение
export class WeightedAverage {
  valueAndCount: HashMap<ValueAndCount> = new Map();

  constructor(value?: number) {
    if (value || value === 0) this.update(value);
  }

  update(value: number, count?: number) {
    const statistic = this.valueAndCount.get(value);
    if (statistic) {
      statistic.count += 1;
    } else {
      this.valueAndCount.set(value, { value, count: count || 1 });
    }
  }

  clear() {
    this.valueAndCount = new Map();
  }

  get(removeExtremeValuesFunc?: Function) {
    let count = 0;
    let value = 0;

    let list = Array.from(this.valueAndCount.values());
    if (!list.length) return 0;

    if (removeExtremeValuesFunc && list.length >= 20) {
      list = removeExtremeValuesFunc(list);
    }

    list.forEach((item: any) => {
      value += item.value * item.count;
      count += item.count;
    });

    return value && count
      ? (value / count)
      : 0;
  }

  #removeExtremeValues(list: any[]) {
    list.sort((a, b) => b.count - a.count);
    const lastIndex = list.length - 1;
    const to = (lastIndex * 0.9) >> 0;
    return list.slice(0, to);
  }
}

// удалить экстримальные значения
export function getRemoveExtremeValuesFunc(percent: number, direction: 'asc' | 'desc') {
  return (list: ValueAndCount[]) => {
    const directionValue = direction === 'desc' ? 1 : -1;
    list.sort((a, b) => {
      const order = b.count - a.count;
      if (order) return order;
      return (b.value - a.value) * directionValue;
    });

    const lastIndex = list.length - 1;
    const k = (100 - percent) / 100;
    const to = (lastIndex * k) >> 0;
    return list.slice(0, to);
  };
}

// группа средневзвешенных значений для диапазона дат (Аналог гистограммы)
export class Distribution {
  from: number = 0;

  step: number = ONE_DAY;

  weightedAverage: WeightedAverage[] = [];

  constructor(from: number, to: number, partsNumber: number) {
    this.from = from;
    this.weightedAverage = (new Array(partsNumber)).fill(1).map(() => new WeightedAverage());
    this.step = (to - from) / partsNumber;
  }

  public getWeightedAverage(todayInMilliseconds: number): WeightedAverage {
    const index = ((todayInMilliseconds - this.from) / this.step) >> 0;
    return this.weightedAverage[index];
  }

  public getWeightedAverages(): number[] {
    return this.weightedAverage.map((weightedAverage) => weightedAverage.get());
  }
}

export function increment(object: Object, path: string, value?: number) {
  if (path) object[path] = (object[path] || 0) + (value ?? 1);
}

export function createIncrement(key?: string, firstValue?: any) {
  return key ? { [key]: firstValue || 1 } : {};
}

export function getDaysFromTo(dateCreate: number, dateMerge: number, k?: number) {
  const delta = dateMerge - dateCreate;
  if (delta < ONE_DAY) return 0.5;
  const value = delta / ONE_DAY;
  const ceil = value >> 0;
  const frac = (value - ceil) > 0.5 ? 1 : 0.5;
  const roundValue = ceil + frac;
  return k && roundValue > k // поправка на эмперический коэфициент
    ? (roundValue - k)
    : roundValue;
}
