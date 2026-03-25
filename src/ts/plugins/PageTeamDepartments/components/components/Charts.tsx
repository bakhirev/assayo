import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';

import { Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';
import { increment } from 'ts/helpers/Math';
import { getGroupsBy } from 'ts/helpers/charts';

import { EMPLOYMENTS } from '../contstants';

const [
  LESS1,
  LESS2,
  LESS3,
  LESS6,
  LESS9,
  LESS12,
  LESS15,
  MORE,
] = EMPLOYMENTS;

function getEmploymentsChart(rows: any[], statisticByAuthorByName: any) {
  const details = rows.reduce((acc: any, row: any) => {
    const authorTotal = row.authors
      .filter((item: any) => {
        const author = statisticByAuthorByName.get(item.author);
        return !author?.isStaff && !author?.isDismissed;
      })
      .length;
    if (!authorTotal) return acc;
    if (authorTotal <= 1) increment(acc, LESS1);
    else if (authorTotal <= 2) increment(acc, LESS2);
    else if (authorTotal <= 3) increment(acc, LESS3);
    else if (authorTotal <= 6) increment(acc, LESS6);
    else if (authorTotal <= 9) increment(acc, LESS9);
    else if (authorTotal <= 12) increment(acc, LESS12);
    else if (authorTotal <= 15) increment(acc, LESS15);
    else increment(acc, MORE);
    return acc;
  }, {});

  const order = EMPLOYMENTS.filter((key: string) => details[key]);

  return [order, details];
}

const [getGroupsByDays, daysOrder] = getGroupsBy('days');

// активные и закрытые
const PieCharts = observer((): React.ReactElement | null => {
  const authorByName = statisticStore.statisticsByCommits.author.totalInfoByName;
  const rows = statisticStore.statisticsByCommits.taskCodes.totalInfo
    .filter((item: any) => item.totalDaysWorked > 10);
  const [employmentsOrder, employmentsDetails] = getEmploymentsChart(rows, authorByName);
  const daysDetails = getGroupsByDays(rows, 'totalDays')?.details;

  const hasEmploymentsChart = Object.keys(employmentsDetails).length;

  return hasEmploymentsChart ? (
    <Section>
      <SectionColumn>
        <PieChart
          title="plugin.team_departments.daysChart.title"
          suffix="plugin.team_departments.daysChart.item"
          order={daysOrder}
          limit={1}
          details={daysDetails}
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="plugin.team_departments.employmentsChart.title"
          suffix="plugin.team_departments.employmentsChart.item"
          order={employmentsOrder}
          limit={1}
          details={employmentsDetails}
        />
      </SectionColumn>
    </Section>
  ) : (
    <Section>
      <PieChart
        title="plugin.team_departments.daysChart.title"
        suffix="plugin.team_departments.daysChart.item"
        order={daysOrder}
        limit={1}
        details={daysDetails}
      />
    </Section>
  );
});

export default PieCharts;
