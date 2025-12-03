import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import { Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';
import { increment } from 'ts/helpers/Math';
import getChartByDays from 'ts/helpers/getChartByDays';

import { EMPLOYMENTS } from '../contstants';

function getEmploymentsChart(rows: any[]) {
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
  const order = Object
    .values(EMPLOYMENTS)
    .filter((key: string) => details[key]);
  return [order, details];
}

// активные и закрытые
const PieCharts = observer((): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.taskCodes.statistic
    .filter((item: any) => item.totalDaysWorked > 10);
  const [employmentsOrder, employmentsDetails] = getEmploymentsChart(rows);
  const [daysOrder, daysDetails] = getChartByDays(rows, 'totalDays');

  const hasEmploymentsChart = Object.keys(employmentsDetails).length;

  return hasEmploymentsChart ? (
    <Section>
      <SectionColumn>
        <PieChart
          title="page.team.department.daysChart.title"
          suffix="page.team.department.daysChart.item"
          order={daysOrder}
          limit={1}
          details={daysDetails}
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="page.team.department.employments.title"
          suffix="page.team.department.employments.item"
          order={employmentsOrder}
          limit={1}
          details={employmentsDetails}
        />
      </SectionColumn>
    </Section>
  ) : (
    <Section>
      <PieChart
        title="page.team.department.daysChart.title"
        suffix="page.team.department.daysChart.item"
        order={daysOrder}
        limit={1}
        details={daysDetails}
      />
    </Section>
  );
});

export default PieCharts;
