import React from 'react';
import { observer } from 'mobx-react-lite';

import { SmallCardWithIcon, CardWithIcon, Section, SectionColumn } from 'ts/components/Layout';
import { getDuration, getShortMoney } from 'ts/helpers/formatter';
import { increment } from 'ts/helpers/Math';
import statisticStore from 'ts/store/Statistics';
import applicationConfig from 'ts/store/ApplicationConfig';

interface ShortInformationProps {
  company?: any;
}

const ShortInformation = observer(({
  company,
}: ShortInformationProps): React.ReactElement | null => {
  const totalInfoByName = statisticStore.statisticsByCommits.author.totalInfoByName;
  if (!company) return null;

  const countries = {};
  const activeAuthors = company.authors
    .filter((item: any) => {
      const author = totalInfoByName.get(item?.author);
      increment(countries, author.lastCountry);
      return !author?.isDismissed && !author?.isStaff;
    })
    .length;

  const middleSalary = applicationConfig.getMiddleSalaryInMonth();
  const moneyInMonth = activeAuthors * middleSalary;
  const moneyAll = company.authors
    .filter((item: any) => !totalInfoByName[item?.author]?.isStaff)
    .reduce((acc: any, item: any) => (
      acc + (item.totalDaysInProject / 30) * middleSalary
    ), 0);

  const country = Object.entries(countries)
    .sort((a: any, b: any) => (a[1] - b[1]))
    .pop()?.[0] || null;

  return (
    <Section>
      <SectionColumn>
        <SmallCardWithIcon
          value={getDuration(company.totalDays)}
          icon="./assets/cards/work_days2.svg"
          title="plugin.team_companies.details.totalDays.title"
          description="plugin.team_companies.details.totalDays.description"
        />
        <SmallCardWithIcon
          value={getShortMoney(moneyInMonth)}
          icon="./assets/cards/money_month.svg"
          title="plugin.team_companies.details.moneyInMonth.title"
          description="plugin.team_companies.details.moneyInMonth.description"
        />
        <CardWithIcon
          size="l"
          value={`${activeAuthors} / ${company.totalAuthors - activeAuthors}`}
          icon="./assets/cards/dismissal.svg"
          title="plugin.team_companies.details.activeAuthors.title"
          description="plugin.team_companies.details.activeAuthors.description"
        />
      </SectionColumn>
      <SectionColumn>
        <SmallCardWithIcon
          value={getShortMoney(moneyAll)}
          icon="./assets/cards/money_total.svg"
          title="plugin.team_companies.details.moneyAll.title"
          description="plugin.team_companies.details.moneyAll.description"
        />
        <SmallCardWithIcon
          value={country}
          icon="./assets/cards/location.svg"
          title="plugin.team_companies.details.mainLocation.title"
          description="plugin.team_companies.details.mainLocation.description"
        />
        <CardWithIcon
          value={company.linesInTask}
          icon="./assets/cards/lines.svg"
          title="plugin.team_companies.details.linesInTask.title"
          description="plugin.team_companies.details.linesInTask.description"
        />
        <CardWithIcon
          value={company.totalTasks}
          icon="./assets/cards/tasks.svg"
          title="plugin.team_companies.details.totalTasks.title"
          description="plugin.team_companies.details.totalTasks.description"
        />
      </SectionColumn>
    </Section>
  );
});

export default ShortInformation;
