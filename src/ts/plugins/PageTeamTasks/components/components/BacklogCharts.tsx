import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import { PieChart } from 'ts/components/Charts';
import { Section, SectionColumn } from 'ts/components/Layout';
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

  return (
    <Section>
      <SectionColumn>
        <PieChart
          title="page.team.tasks.charts.authors.title"
          details={authorDetails}
          order={authors}
          limit={3}
          suffix="tasks"
          other="page.team.tasks.charts.authors.other"
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="page.team.tasks.charts.relative.title"
          details={{
            'page.team.tasks.charts.relative.all': allTaskNumber - backlogTaskNumber,
            'page.team.tasks.charts.relative.backlog': backlogTaskNumber,
          }}
          order={[
            'page.team.tasks.charts.relative.backlog',
            'page.team.tasks.charts.relative.all',
          ]}
          suffix="page.team.pr.days"
        />
      </SectionColumn>
    </Section>
  );
}

export default BacklogCharts;
