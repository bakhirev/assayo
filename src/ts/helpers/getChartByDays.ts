import { increment } from 'ts/helpers/Math';
import { t } from 'ts/helpers/Localization';

const WORK_DAYS = {
  HALF: t('page.team.author.days.half'),
  ONE: t('page.team.author.days.one'),
  HALF_ONE: t('page.team.author.days.15'),
  TWO: t('page.team.author.days.two'),
  MORE: t('page.team.author.days.more'),
};

export default function getChartByDays(
  rows: any[],
  property: string,
) {
  const details = rows.reduce((acc: any, row: any) => {
    const value = row[property];
    if (value < 183) increment(acc, WORK_DAYS.HALF);
    else if (value < 365) increment(acc, WORK_DAYS.ONE);
    else if (value < 547) increment(acc, WORK_DAYS.HALF_ONE);
    else if (value < 730) increment(acc, WORK_DAYS.TWO);
    else increment(acc, WORK_DAYS.MORE);
    return acc;
  }, {});

  const order = Object
    .values(WORK_DAYS) // @ts-ignore
    .filter((key: string) => details[key]) as string[];

  return [order, details];
}
