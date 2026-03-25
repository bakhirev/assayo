import React from 'react';
import { observer } from 'mobx-react-lite';

import { SmallCardWithIcon, Section, SectionColumn, CardWithIcon } from 'ts/components/Layout';
import { getDuration, getShortMoney } from 'ts/helpers/formatter';
import { increment } from 'ts/helpers/Math';
import statisticStore from 'ts/store/Statistics';
import applicationConfig from 'ts/store/ApplicationConfig';
import IHashMap from 'ts/interfaces/HashMap';

interface ShortInformationProps {
  department?: any;
}

function getTotalInfoByAuthors(authors: any[]) {
  const totalInfoByName = statisticStore.statisticsByCommits.author.totalInfoByName;
  const countries = {};
  const total = {} as IHashMap<number>;

  authors.forEach((item: any) => {
    const author = totalInfoByName.get(item?.author);
    increment(countries, author.lastCountry);
    if (author?.isStaff) increment(total, 'staff');
    else if (author?.isDismissed) increment(total, 'dismissed');
    else increment(total, 'active');
  });

  const country = Object.entries(countries)
    .sort((a: any, b: any) => (a[1] - b[1]))
    .pop()?.[0] || null;

  return { country, total };
}

const ShortInformation = observer(({
  department,
}: ShortInformationProps): React.ReactElement | null => {
  if (!department) return null;

  const { country, total } = getTotalInfoByAuthors(department.authors);
  const middleSalary = applicationConfig.getMiddleSalaryInMonth();
  const moneyInMonth = total.active * middleSalary;
  const moneyAll = department.months.reduce((acc: any, item: any) => (
    acc + item.programmistInThisGroup * middleSalary
  ), 0);

  return (
    <Section>
      <SectionColumn>
        <SmallCardWithIcon
          value={getDuration(department.totalDays)}
          icon="./assets/cards/work_days2.svg"
          title="plugin.team_departments.details.totalDays"
        />
        <SmallCardWithIcon
          value={getShortMoney(moneyInMonth)}
          icon="./assets/cards/money_month.svg"
          title="plugin.team_departments.details.moneyInMonth"
        />
        <CardWithIcon
          size="l"
          value={`${total.active} / ${total.dismissed}`}
          icon="./assets/cards/dismissal.svg"
          title="plugin.team_departments.details.activeAuthors.title"
          description="plugin.team_departments.details.activeAuthors.description"
        />
      </SectionColumn>
      <SectionColumn>
        <SmallCardWithIcon
          value={getShortMoney(moneyAll)}
          icon="./assets/cards/money_total.svg"
          title="plugin.team_departments.details.moneyAll"
        />
        <SmallCardWithIcon
          value={country}
          icon="./assets/cards/location.svg"
          title="plugin.team_departments.details.mainLocation"
        />
        <CardWithIcon
          value={department.linesInTask}
          icon="./assets/cards/lines.svg"
          title="plugin.team_departments.details.linesInTask.title"
          description="plugin.team_departments.details.linesInTask.description"
        />
        <CardWithIcon
          value={department.tasks}
          icon="./assets/cards/tasks.svg"
          title="plugin.team_departments.details.totalTasks.title"
          description="plugin.team_departments.details.totalTasks.description"
        />
      </SectionColumn>
    </Section>
  );
});

export default ShortInformation;
