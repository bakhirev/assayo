import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import PieChart from 'ts/components/PieChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';

import dataGripStore from 'ts/store/DataGrip';
import { increment } from 'ts/helpers/Math';

interface BacklogChartsProps {
  content: any[],
  allTaskNumber: number,
  backlogTaskNumber: number,
}

function getGroupsByAuthors(list: any[], propertyName: string) {
  return list.reduce((acc: IHashMap<number>, item: any) => {
    increment(acc, item[propertyName]);
    return acc;
  }, {});
}

function BacklogCharts({
  content,
  allTaskNumber,
  backlogTaskNumber,
}: BacklogChartsProps) {
  if (!content?.length) return null;

  const authors = dataGripStore.dataGrip.author.list;

  const authorDetails = getGroupsByAuthors(content, 'author');
  const authorChartOptions = getOptions({
    order: authors,
    limit: 3,
    suffix: 'tasks',
    other: 'page.team.tasks.charts.authors.other',
  });

  const weightedAverageChart = getOptions({ // @ts-ignore
    order: [
      'page.team.tasks.charts.relative.backlog',
      'page.team.tasks.charts.relative.all',
    ],
    suffix: 'page.team.pr.days',
  });

  return (
    <PageWrapper>
      <PageColumn>
        <PieChart
          title="page.team.tasks.charts.authors.title"
          options={authorChartOptions}
          details={authorDetails}
        />
      </PageColumn>
      <PageColumn>
        <PieChart
          title="page.team.tasks.charts.relative.title"
          options={weightedAverageChart}
          details={{
            'page.team.tasks.charts.relative.all': allTaskNumber - backlogTaskNumber,
            'page.team.tasks.charts.relative.backlog': backlogTaskNumber,
          }}
        />
      </PageColumn>
    </PageWrapper>
  );
}

export default BacklogCharts;
