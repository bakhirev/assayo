import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import PieChart from 'ts/components/PieChart';
import { increment } from 'ts/helpers/Math';

import { WORK_DAYS } from '../../Author/contstants';
import { EMPLOYMENTS } from '../contstants';

function getEmploymentsChart(rows: any[]) {
  const order = Object.values(EMPLOYMENTS);
  const options = getOptions({ order, limit: 1, suffix: 'page.team.department.employments.item' });
  const details = rows.reduce((acc: any, row: any) => {
    if (!row.isActive) return acc;
    if (row.totalWorked <= 1) increment(acc, EMPLOYMENTS.LESS1);
    else if (row.totalWorked <= 2) increment(acc, EMPLOYMENTS.LESS2);
    else if (row.totalWorked <= 3) increment(acc, EMPLOYMENTS.LESS3);
    else if (row.totalWorked <= 6) increment(acc, EMPLOYMENTS.LESS6);
    else if (row.totalWorked <= 9) increment(acc, EMPLOYMENTS.LESS9);
    else if (row.totalWorked <= 12) increment(acc, EMPLOYMENTS.LESS12);
    else if (row.totalWorked <= 15) increment(acc, EMPLOYMENTS.LESS15);
    else increment(acc, EMPLOYMENTS.MORE);
    return acc;
  }, {});
  return [options, details];
}

function getDaysChart(rows: any[]) {
  const order = Object.values(WORK_DAYS);
  const options = getOptions({ order, limit: 1, suffix: 'page.team.department.daysChart.item' });
  const details = rows.reduce((acc: any, row: any) => {
    if (row.totalDays < 183) increment(acc, WORK_DAYS.HALF);
    else if (row.totalDays < 365) increment(acc, WORK_DAYS.ONE);
    else if (row.totalDays < 547) increment(acc, WORK_DAYS.HALF_ONE);
    else if (row.totalDays < 730) increment(acc, WORK_DAYS.TWO);
    else increment(acc, WORK_DAYS.MORE);
    return acc;
  }, {});
  return [options, details];
}

// активные и закрытые
const PieCharts = observer((): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.taskCodes.statistic
    .filter((item: any) => item.totalDaysWorked > 10);
  const [employmentsOptions, employmentsDetails] = getEmploymentsChart(rows);
  const [daysOptions, daysDetails] = getDaysChart(rows);

  const hasEmploymentsChart = Object.keys(employmentsDetails).length;

  return hasEmploymentsChart ? (
    <PageWrapper>
      <PageColumn>
        <PieChart
          title="page.team.department.daysChart.title"
          options={daysOptions}
          details={daysDetails}
        />
      </PageColumn>
      <PageColumn>
        <PieChart
          title="page.team.department.employments.title"
          options={employmentsOptions}
          details={employmentsDetails}
        />
      </PageColumn>
    </PageWrapper>
  ) : (
    <PageWrapper>
      <PieChart
        title="page.team.department.daysChart.title"
        options={daysOptions}
        details={daysDetails}
      />
    </PageWrapper>
  );
});

export default PieCharts;
