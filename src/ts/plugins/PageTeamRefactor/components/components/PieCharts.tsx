import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';
import { increment } from 'ts/helpers/Math';
import statisticStore from 'ts/store/Statistics';

function getChartInformation(rows: any[]) {
  const detailsYear = {};
  const detailsAuthor = {};
  rows.forEach((file: any) => {
    increment(detailsYear, String(file.createYear));
    increment(detailsAuthor, String(file.createAuthor));
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

  // TODO: второй график показывает сколько задач за последние три месяца в этих файлах, чтобы понять тыкают их или нет
  return (
    <Section>
      <SectionColumn>
        <PieChart
          title="plugin.team_refactor.charts.yearChart.title"
          suffix="common.statistic.commits"
          order={orderYear as string[]}
          limit={1}
          details={detailsYear}
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="plugin.team_refactor.charts.authorChart.title"
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
