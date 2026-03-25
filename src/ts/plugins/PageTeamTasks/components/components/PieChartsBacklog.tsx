import React from 'react';

import { PieChart } from 'ts/components/Charts';
import { Section, SectionColumn } from 'ts/components/Layout';
import { getGroupsBy } from 'ts/helpers/charts';

interface BacklogChartsProps {
  content: any[],
}

const [getGroupsByDays, daysOrder] = getGroupsBy('days');
const [getGroupsByYears, yearOrder] = getGroupsBy('years');

function BacklogCharts({
  content,
}: BacklogChartsProps) {
  if (!content?.length) return null;

  const daysInBacklog = getGroupsByDays(content, 'totalDaysInBacklog')?.details;
  const daysInWorked = getGroupsByYears(content, 'totalDays')?.details;

  return (
    <Section>
      <SectionColumn>
        <PieChart
          title="plugin.team_tasks.charts.await.title"
          details={daysInBacklog}
          order={daysOrder}
          limit={3}
          suffix="common.statistic.tasks"
          other="plugin.team_tasks.charts.other"
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="plugin.team_tasks.charts.worked.title"
          details={daysInWorked}
          order={yearOrder}
          limit={3}
          suffix="common.statistic.tasks"
          other="plugin.team_tasks.charts.other"
        />
      </SectionColumn>
    </Section>
  );
}

export default BacklogCharts;
