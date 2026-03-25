import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';
import { increment } from 'ts/helpers/Math';
import statisticStore from 'ts/store/Statistics';

function getChartInformation(rows: any[]) {
  const detailsYear = {};
  const detailsAuthor = {};
  rows.forEach((commit: any) => {
    increment(detailsYear, String(commit.dateMergeYear));
    increment(detailsAuthor, String(commit.author));
  });
  const orderYear = Object.keys(detailsYear).sort().reverse();
  return [orderYear, detailsYear, detailsAuthor];
}

interface PieChartsProps {
  rows?: any[];
}

const PieCharts = observer(({ rows }: PieChartsProps): React.ReactElement | null => {
  if (!rows) return null;

  const authors = statisticStore.statisticsByCommits.author.list;
  const [orderYear, detailsYear, detailsAuthor] = useMemo(() => getChartInformation(rows), [rows]);

  return (
    <Section>
      <SectionColumn>
        <PieChart
          title="plugin.team_pull_requests.yearChart.title"
          suffix="plugin.team_pull_requests.chart.suffix"
          order={orderYear as string[]}
          limit={1}
          details={detailsYear}
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="plugin.team_pull_requests.authorChart.title"
          suffix="plugin.team_pull_requests.chart.suffix"
          order={authors}
          limit={3}
          details={detailsAuthor}
        />
      </SectionColumn>
    </Section>
  );
});

export default PieCharts;
