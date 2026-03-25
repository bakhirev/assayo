import React from 'react';
import { observer } from 'mobx-react-lite';

import { Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';
import statisticStore from 'ts/store/Statistics';

interface PieChartsProps {
  scope: any;
}

const PieCharts = observer(({ scope }: PieChartsProps): React.ReactElement | null => {
  const authors = statisticStore.statisticsByCommits.author.list;
  const types = statisticStore.statisticsByCommits.type.list;
  const companies = statisticStore.statisticsByCommits.company.totalInfo
    .map((item: any) => item.company);

  return (
    <Section>
      <SectionColumn>
        <PieChart
          title="plugin.team_commits.chart.commits.title"
          suffix="common.statistic.commits"
          order={authors}
          limit={2}
          details={scope.commitsByAuthor}
        />
        <PieChart
          title="plugin.team_commits.chart.companies.title"
          suffix="common.statistic.commits"
          limit={1}
          order={companies}
          details={scope.companies}
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="plugin.team_commits.chart.tasks.title"
          suffix="common.statistic.tasks"
          order={authors}
          limit={2}
          details={scope.tasksByAuthor}
        />
        <PieChart
          title="plugin.team_commits.chart.types.title"
          suffix="common.statistic.commits"
          order={types}
          limit={3}
          details={scope.types}
        />
      </SectionColumn>
    </Section>
  );
});

export default PieCharts;
