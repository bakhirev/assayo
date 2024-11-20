import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import getOptions from 'ts/components/LineChart/helpers/getOptions';

import PieChart from 'ts/components/PieChart';
import { STATUS, WORK_DAYS } from '../contstants';
import { increment } from 'ts/helpers/Math';

function getStatusChart(rows: any[]) {
  const details = rows.reduce((acc: any, row: any) => {
    if (row.isStaff) increment(acc, STATUS.STAFF);
    else if (row.isDismissed) increment(acc, STATUS.DISMISSED);
    else increment(acc, STATUS.WORK);
    return acc;
  }, {});
  const order = Object
    .values(STATUS)
    .filter((key: string) => details[key]);
  const options = getOptions({ order, limit: 1 });
  return [options, details];
}

function getDaysChart(rows: any[]) {
  const details = rows.reduce((acc: any, row: any) => {
    if (row.daysAll < 183) increment(acc, WORK_DAYS.HALF);
    else if (row.daysAll < 365) increment(acc, WORK_DAYS.ONE);
    else if (row.daysAll < 547) increment(acc, WORK_DAYS.HALF_ONE);
    else if (row.daysAll < 730) increment(acc, WORK_DAYS.TWO);
    else increment(acc, WORK_DAYS.MORE);
    return acc;
  }, {});
  const order = Object
    .values(WORK_DAYS)
    .filter((key: string) => details[key]);
  const options = getOptions({ order, limit: 1, suffix: 'page.team.author.daysChart.item' });
  return [options, details];
}

const PieCharts = observer((): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.author.statistic;
  const [statusOptions, statusDetails] = getStatusChart(rows);
  const [daysOptions, daysDetails] = getDaysChart(rows);

  return (
    <PageWrapper>
      <PageColumn>
        <PieChart
          title="page.team.author.statusChart.title"
          options={statusOptions}
          details={statusDetails}
        />
      </PageColumn>
      <PageColumn>
        <PieChart
          title="page.team.author.daysChart.title"
          options={daysOptions}
          details={daysDetails}
        />
      </PageColumn>
    </PageWrapper>
  );
});

export default PieCharts;
