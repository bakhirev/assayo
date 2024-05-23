import IHashMap from 'ts/interfaces/HashMap';

export function getValuesInPercent(list: IHashMap<number>, maxValue: number) {
  const percent = 100 / maxValue;
  const valuesInPercent = {};
  for (let name in list) {
    if (list[name]) {
      valuesInPercent[name] = Math.round((list[name] ?? 100) * percent);
    }
  }
  return valuesInPercent;
}
