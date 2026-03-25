import { increment, WeightedAverage } from 'ts/helpers/Math';

export const GROUPS_BY_DAYS = {
  HALF: 'page.team.author.days.half',
  ONE: 'page.team.author.days.one',
  HALF_ONE: 'page.team.author.days.15',
  TWO: 'page.team.author.days.two',
  MORE: 'page.team.author.days.more',
};

export const ORDER_BY_DAYS = Object.values(GROUPS_BY_DAYS);

// TODO:
// 1. дублирование кода для групп ключей (см. соседний такой же файл) EMPLOYMENTS.LESS15
// 2. лишняя проверка объекта на каждом шаге.
// генерация функции?
export function getDetailsByDays(
  rows: any[],
  property: string,
) {
  const weightedAverage = new WeightedAverage();
  const details = rows.reduce((acc: any, row: any) => {
    const value = row[property];
    weightedAverage.update(value);
    if (value < 183) increment(acc, GROUPS_BY_DAYS.HALF);
    else if (value < 365) increment(acc, GROUPS_BY_DAYS.ONE);
    else if (value < 547) increment(acc, GROUPS_BY_DAYS.HALF_ONE);
    else if (value < 730) increment(acc, GROUPS_BY_DAYS.TWO);
    else increment(acc, GROUPS_BY_DAYS.MORE);
    return acc;
  }, {});
  return { details, weightedAverage: weightedAverage.get() };
}
