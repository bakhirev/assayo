import React from 'react';
import { observer } from 'mobx-react-lite';

import { Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';

function getChartDetails(rows: any[], property: string) {
  const created = {};
  const removed = {};
  const order: string[] = [];
  rows.forEach((item: any) => {
    const key = item[property];
    created[key] = item.files;
    removed[key] = item.removedFiles;
    order.push(key);
  });
  return [order, created, removed];
}

interface PieChartsProps {
  rows?: any[];
  property: string;
}

const PieCharts = observer(({ rows, property }: PieChartsProps): React.ReactElement | null => {
  if (!rows) return null;

  const [order, created, removed] = getChartDetails(rows, property);

  return (
    <Section>
      <SectionColumn>
        <PieChart
          title="plugin.team_file_analytics.createChart.title"
          suffix="plugin.team_file_analytics.createChart.suffix"
          limit={2}
          order={order as string[]}
          details={created}
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="plugin.team_file_analytics.removeChart.title"
          suffix="plugin.team_file_analytics.createChart.suffix"
          limit={2}
          order={order as string[]}
          details={removed}
        />
      </SectionColumn>
    </Section>
  );
});

export default PieCharts;
