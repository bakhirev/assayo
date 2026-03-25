import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { EmailType } from 'ts/interfaces/Commit';
import { Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';
import { Email } from 'ts/helpers/StatisticsByCommits/components/email';
import { increment } from 'ts/helpers/Math';
import statisticStore from 'ts/store/Statistics';

const REF_TYPE_TITLE = {
  [EmailType.UNKNOWN]: '',
  [EmailType.ACCOUNT]: 'TECH ACCOUNT',
  [EmailType.GITHUB]: 'GITHUB',
  [EmailType.MAIL]: 'PERSONAL',
  [EmailType.COMPANY]: 'CORPORATE',
  [EmailType.NETWORK]: 'NETWORK',
};

function getTitleByType(value: number): string {
  return REF_TYPE_TITLE[String(value)] || '';
}

function getChartInformationByType(rows: Email[]) {
  const details = {};
  rows.forEach((email: Email) => {
    increment(details, getTitleByType(email.type));
  });

  const order = Object.entries(details)
    .sort((a: any, b: any) => b[1] - a[1])
    .map(([key]) => key);

  return [order, details];
}

function getChartInformationByAuthors(authors: any[]) {
  const details = {};
  authors.forEach((author: any) => {
    increment(details, author.emails.length);
  });

  const order = Object.keys(details).sort();

  return [order, details];
}

interface PieChartsProps {
  rows?: Email[];
}

const PieCharts = observer(({ rows }: PieChartsProps): React.ReactElement | null => {
  if (!rows) return null;

  const authors = statisticStore.statisticsByCommits.author.totalInfo;
  const [orderType, detailsType] = useMemo(() => getChartInformationByType(rows), [rows]);
  const [orderAuthors, detailsAuthors] = useMemo(() => getChartInformationByAuthors(authors), [authors]);

  return (
    <Section>
      <SectionColumn>
        <PieChart
          title="plugin.team_server.email.typeChart.title"
          suffix="plugin.team_server.email.typeChart.suffix"
          order={orderType as string[]}
          limit={1}
          details={detailsType}
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="plugin.team_server.email.authorChart.title"
          suffix="plugin.team_server.email.authorChart.suffix"
          order={orderAuthors as string[]}
          limit={1}
          details={detailsAuthors}
        />
      </SectionColumn>
    </Section>
  );
});

export default PieCharts;
