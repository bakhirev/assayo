import { increment, WeightedAverage } from 'ts/helpers/Math';

export const GROUPS_BY_YEARS = {
  DAY: 'plugin.team_pull_requests.chart.1day',
  THREE_DAY: 'plugin.team_pull_requests.chart.3day',
  WEEK: 'plugin.team_pull_requests.chart.7day',
  TWO_WEEK: 'plugin.team_pull_requests.chart.14day',
  MONTH: 'plugin.team_pull_requests.chart.30day',
  MORE: 'plugin.team_pull_requests.chart.more',
};

export const ORDER_BY_YEARS = Object.values(GROUPS_BY_YEARS);

export function getDetailsByYears(
  rows: any[],
  property: string,
) {
  const weightedAverage = new WeightedAverage();
  const details = rows.reduce((acc: any, row: any) => {
    const value = row[property];
    weightedAverage.update(value);
    if (value <= 1) increment(acc, GROUPS_BY_YEARS.DAY);
    else if (value <= 2) increment(acc, GROUPS_BY_YEARS.THREE_DAY);
    else if (value <= 7) increment(acc, GROUPS_BY_YEARS.WEEK);
    else if (value <= 14) increment(acc, GROUPS_BY_YEARS.TWO_WEEK);
    else if (value <= 30) increment(acc, GROUPS_BY_YEARS.MONTH);
    else increment(acc, GROUPS_BY_YEARS.MORE);
    return acc;
  }, {});
  return { details, weightedAverage: weightedAverage.get() };
}
