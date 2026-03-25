import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';
import { Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';
import { getGroupsBy } from 'ts/helpers/charts';

function getStatusChart(employment: any) {
  const [work, dismissed, staff] = [
    'plugin.team_author.type.work',
    'plugin.team_author.type.dismissed',
    'plugin.team_author.type.staff',
  ];

  const details = {
    [work]: employment.active.length,
    [dismissed]: employment.dismissed.length,
    [staff]: employment.staff.length,
  };

  const order = [work, dismissed, staff];

  return [order, details];
}

const [getGroupsByDays, daysOrder] = getGroupsBy('days');

const PieCharts = observer((): React.ReactElement | null => {
  const rows = statisticStore.statisticsByCommits.author.totalInfo;
  const employment = statisticStore.statisticsByCommits.author.employment;
  const [statusOrder, statusDetails] = getStatusChart(employment);
  const daysDetails = getGroupsByDays(rows, 'totalDays')?.details;

  return (
    <Section>
      <SectionColumn>
        <PieChart
          title="plugin.team_author.statusChart.title"
          suffix="common.statistic.employees"
          order={statusOrder as string[]}
          limit={1}
          details={statusDetails}
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="plugin.team_author.daysChart.title"
          suffix="common.statistic.employees"
          order={daysOrder}
          limit={1}
          details={daysDetails}
        />
      </SectionColumn>
    </Section>
  );
});

export default PieCharts;
