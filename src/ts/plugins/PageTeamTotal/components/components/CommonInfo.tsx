import React from 'react';
import { observer } from 'mobx-react-lite';

import { SmallCardWithIcon, CardWithIcon, Section, SectionColumn } from 'ts/components/Layout';

import statisticStore from 'ts/store/Statistics';
import { getDuration, getShortNumber } from 'ts/helpers/formatter';
import { increment } from 'ts/helpers/Math';
import { getDaysBetween } from 'ts/helpers/StatisticsByCommits/helpers';

function getCountry() {
  const authors = statisticStore.statisticsByCommits.author.totalInfo;
  const countries = {};

  authors.forEach((author: any) => {
    if (author.isStaff || author.isDismissed) return;
    increment(countries, author.lastCountry);
  });

  return Object.entries(countries)
    .sort((a: any, b: any) => (a[1] - b[1]))
    .pop()?.[0] || null;
}

interface CommonInfoProps {
  employeesInCompany: number;
}

const CommonInfo = observer(({
  employeesInCompany,
}: CommonInfoProps): React.ReactElement => {
  const team = statisticStore.statisticsByCommits.team.totalInfo;
  const employment = statisticStore.statisticsByCommits.author.employment;
  const firstLastCommit = statisticStore.statisticsByCommits.firstLastCommit;
  const totalDays = getDaysBetween(firstLastCommit.min, firstLastCommit.max);

  const country = getCountry();

  return (
    <Section>
      <SectionColumn>
        <CardWithIcon
          value={getShortNumber(team.totalTaskInDay)}
          icon="./assets/cards/tasks_month.svg"
          title="plugin.team_total.workSpeed.title"
          description="plugin.team_total.workSpeed.description"
        />
        <CardWithIcon
          value={`${employment.active.length} / ${employment.dismissed.length}`}
          icon="./assets/cards/dismissal.svg"
          title="plugin.team_total.employment.title"
          description="plugin.team_total.employment.description"
        />
      </SectionColumn>
      <SectionColumn>
        <SmallCardWithIcon
          value={getDuration(totalDays)}
          icon="./assets/cards/work_days2.svg"
          title="plugin.team_total.common.duration.title"
          description="plugin.team_total.common.duration.description"
        />
        <SmallCardWithIcon
          value={country}
          icon="./assets/cards/location.svg"
          title="plugin.team_total.common.location.title"
        />
        <SmallCardWithIcon
          value={employeesInCompany}
          icon="./assets/cards/employees.svg"
          title="plugin.team_total.common.employees.title"
        />
      </SectionColumn>
    </Section>
  );
});

export default CommonInfo;
