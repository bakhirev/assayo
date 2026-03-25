import React from 'react';

import { PieChart } from 'ts/components/Charts';
import { CardWithIcon, Section, SectionColumn } from 'ts/components/Layout';
import applicationConfig from 'ts/store/ApplicationConfig';
import { getShortMoney } from 'ts/helpers/formatter';
import { StatisticsAbsenceTime } from 'ts/helpers/StatisticsByCommits/components/absence';
import { increment } from 'ts/helpers/Math';

interface PieChartsProps {
  content: any[],
}

function getDayInYear(data: StatisticsAbsenceTime): number {
  return data.month * 30 + data.day;
}

function getTotalDaysAndDetails(content: any[]) {
  let totalDays = 0;
  const details = {};
  content.forEach((absence: any) => {
    if (absence.duration > 40) return;
    totalDays += absence.duration;
    if (absence.from.year === absence.to.year) {
      increment(details, absence.from.year, absence.duration);
    } else {
      increment(details, absence.from.year, 365 - getDayInYear(absence.from));
      increment(details, absence.to.year, getDayInYear(absence.to));
    }
  });
  const order = Object.keys(details).reverse();
  return { totalDays, details, order };
}

function PieCharts({
  content,
}: PieChartsProps) {
  if (!content?.length) return null;

  const { totalDays, details, order } = getTotalDaysAndDetails(content);
  const middleVacationPayInDay = applicationConfig.getMiddleVacationPayInDay();

  return (
    <Section>
      <SectionColumn>
        <CardWithIcon
          value={totalDays}
          icon="./assets/cards/lazy.svg"
          title="plugin.person_vacation.charts.total.title"
          description="plugin.person_vacation.charts.total.description"
        />
        <CardWithIcon
          value={getShortMoney(totalDays * middleVacationPayInDay)}
          icon="./assets/cards/money_holidays.svg"
          title="plugin.person_vacation.charts.money.title"
          description="plugin.person_vacation.charts.money.description"
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="plugin.person_vacation.charts.years"
          details={details}
          limit={1}
          order={order}
          suffix="common.statistic.days"
        />
      </SectionColumn>
    </Section>
  );
}

export default PieCharts;
