import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';

import { Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';
import { getGroupsBy } from 'ts/helpers/charts';

function getStatusChart(rows: any[]) {
  const order = rows.map((data: any) => data.company);
  const limit = order.length > 10 ? 2 : 1;
  const details = Object.fromEntries(
    rows.map((row: any) => [row.company, row.totalAuthors]),
  );
  return [order, limit, details];
}

const [getGroupsByDays, daysOrder] = getGroupsBy('days');

const PieCharts = observer((): React.ReactElement | null => {
  const rows = statisticStore.statisticsByCommits.company.totalInfo;
  const [statusOrder, statusLimit, statusDetails] = getStatusChart(rows);
  const daysDetails = getGroupsByDays(rows, 'totalDays')?.details;

  return (
    <Section>
      <SectionColumn>
        <PieChart
          title="plugin.team_companies.charts.employments.title"
          suffix="plugin.team_companies.charts.employments.item"
          order={statusOrder}
          limit={statusLimit}
          details={statusDetails}
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="plugin.team_companies.charts.daysChart.title"
          suffix="plugin.team_companies.charts.daysChart.item"
          order={daysOrder}
          limit={1}
          details={daysDetails}
        />
      </SectionColumn>
    </Section>
  );
});

export default PieCharts;
