import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import { Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';
import getChartByDays from 'ts/helpers/getChartByDays';

function getStatusChart(rows: any[]) {
  const order = rows.map((data: any) => data.company);
  const limit = order.length > 10 ? 2 : 1;
  const details = Object.fromEntries(
    rows.map((row: any) => [row.company, row.employments.length]),
  );
  return [order, limit, details];
}

const PieCharts = observer((): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.company.statistic;
  const [statusOrder, statusLimit, statusDetails] = getStatusChart(rows);
  const [daysOrder, daysDetails] = getChartByDays(rows, 'totalDays');

  return (
    <Section>
      <SectionColumn>
        <PieChart
          title="page.team.company.employments.title"
          suffix="page.team.company.employments.item"
          order={statusOrder}
          limit={statusLimit}
          details={statusDetails}
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="page.team.company.daysChart.title"
          suffix="page.team.company.daysChart.item"
          order={daysOrder}
          limit={1}
          details={daysDetails}
        />
      </SectionColumn>
    </Section>
  );
});

export default PieCharts;
