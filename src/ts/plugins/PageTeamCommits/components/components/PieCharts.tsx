import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import ICommit from 'ts/interfaces/Commit';
import { Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';
import { increment } from 'ts/helpers/Math';
import statisticStore from 'ts/store/Statistics';

function getChartInformation(rows: ICommit[]) {
  const detailsYear = {};
  const detailsAuthor = {};
  rows.forEach((commit: ICommit) => {
    increment(detailsYear, String(commit.year));
    increment(detailsAuthor, String(commit.author));
  });
  const orderYear = Object.keys(detailsYear).sort().reverse();
  return [orderYear, detailsYear, detailsAuthor];
}

interface PieChartsProps {
  rows?: any[];
}

const PieCharts = observer(({ rows }: PieChartsProps): React.ReactElement | null => {
  if (!rows || !rows?.length) return null;

  const authors = statisticStore.statisticsByCommits.author.list;
  const [orderYear, detailsYear, detailsAuthor] = useMemo(() => getChartInformation(rows), [rows]);

  return (
    <Section>
      <SectionColumn>
        <PieChart
          title="plugin.team_commits.yearChart.title"
          suffix="common.statistic.commits"
          order={orderYear as string[]}
          limit={1}
          details={detailsYear}
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="plugin.team_commits.authorChart.title"
          suffix="common.statistic.commits"
          order={authors}
          limit={3}
          details={detailsAuthor}
        />
      </SectionColumn>
    </Section>
  );
});

export default PieCharts;
