import React from 'react';

import { PieChart } from 'ts/components/Charts';
import { CardWithIcon, Section, SectionColumn } from 'ts/components/Layout';
import statisticStore from 'ts/store/Statistics';
import applicationConfig from 'ts/store/ApplicationConfig';
import { getShortMoney } from 'ts/helpers/formatter';

interface PieChartsProps {
  content: any[],
}

function getTotalDaysAndDetails(content: any[]) {
  let totalDays = 0;
  const details = {};
  content.forEach((absence: any) => {
    if (absence.duration > 40) return;
    totalDays += absence.duration;
    details[absence.author] = (details[absence.author] || 0) + absence.duration;
  });
  return { totalDays, details };
}

function PieCharts({
  content,
}: PieChartsProps) {
  if (!content?.length) return null;

  const authors = statisticStore.statisticsByCommits.author.list;
  const { totalDays, details } = getTotalDaysAndDetails(content);
  const middleVacationPayInDay = applicationConfig.getMiddleVacationPayInDay();

  return (
    <Section>
      <SectionColumn>
        <CardWithIcon
          value={totalDays}
          icon="./assets/cards/lazy.svg"
          title="plugin.team_vacation.charts.total.title"
          description="plugin.team_vacation.charts.total.description"
        />
        <CardWithIcon
          value={getShortMoney(totalDays * middleVacationPayInDay)}
          icon="./assets/cards/money_holidays.svg"
          title="plugin.team_vacation.charts.money.title"
          description="plugin.team_vacation.charts.money.description"
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="plugin.team_vacation.charts.author"
          details={details}
          limit={1}
          order={authors}
          suffix="common.statistic.days"
        />
      </SectionColumn>
    </Section>
  );
}

export default PieCharts;
