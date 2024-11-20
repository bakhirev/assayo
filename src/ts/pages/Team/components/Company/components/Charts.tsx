import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import getOptions from 'ts/components/LineChart/helpers/getOptions';

import PieChart from 'ts/components/PieChart';
import { WORK_DAYS } from '../../Author/contstants';
import { increment } from 'ts/helpers/Math';

function getStatusChart(rows: any[]) {
  const order = rows.map((data: any) => data.company);
  const limit = order.length > 10 ? 2 : 1;
  const options = getOptions({ order, limit, suffix: 'page.team.company.employments.item' });
  const details = Object.fromEntries(
    rows.map((row: any) => [row.company, row.employments.length]),
  );
  return [options, details];
}

function getDaysChart(rows: any[]) {
  const details = rows.reduce((acc: any, row: any) => {
    if (row.totalDays < 183) increment(acc, WORK_DAYS.HALF);
    else if (row.totalDays < 365) increment(acc, WORK_DAYS.ONE);
    else if (row.totalDays < 547) increment(acc, WORK_DAYS.HALF_ONE);
    else if (row.totalDays < 730) increment(acc, WORK_DAYS.TWO);
    else increment(acc, WORK_DAYS.MORE);
    return acc;
  }, {});
  const order = Object
    .values(WORK_DAYS)
    .filter((key: string) => details[key]);
  const options = getOptions({ order, limit: 1, suffix: 'page.team.company.daysChart.item' });
  return [options, details];
}

const PieCharts = observer((): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.company.statistic;
  const [statusOptions, statusDetails] = getStatusChart(rows);
  const [daysOptions, daysDetails] = getDaysChart(rows);

  return (
    <PageWrapper>
      <PageColumn>
        <PieChart
          title="page.team.company.employments.title"
          options={statusOptions}
          details={statusDetails}
        />
      </PageColumn>
      <PageColumn>
        <PieChart
          title="page.team.company.daysChart.title"
          options={daysOptions}
          details={daysDetails}
        />
      </PageColumn>
    </PageWrapper>
  );
});

export default PieCharts;
