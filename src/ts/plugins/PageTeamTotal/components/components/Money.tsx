import React from 'react';
import { observer } from 'mobx-react-lite';

import { CardWithIcon, Section, SectionColumn } from 'ts/components/Layout';

import statisticStore from 'ts/store/Statistics';
import applicationConfig from 'ts/store/ApplicationConfig';
import { getShortMoney } from 'ts/helpers/formatter';

function getForecastingMoneyAll(taskCodes: any[]): number {
  const middleSalary = applicationConfig.getMiddleSalaryInMonth();
  const departments = taskCodes.filter((item: any) => item.totalDaysWorked > 10);
  return departments.reduce((acc: any, department: any) => (
    acc + department.months.reduce((acc2: any, item: any) => (
      acc2 + item.allMiddleUsersInDepartment * middleSalary
    ), 0)
  ), 0);
}

const Money = observer((): React.ReactElement => {
  const statistic = statisticStore.statisticsByCommits.team.totalInfo;
  const employment = statisticStore.statisticsByCommits.author.employment;
  const moneySpeed = employment.active.length * applicationConfig.getMiddleSalaryInMonth();
  const taskCodes = statisticStore.statisticsByCommits.taskCodes.totalInfo;
  const forecastingMoneyAll = getForecastingMoneyAll(taskCodes);

  return (
    <Section>
      <SectionColumn>
        <CardWithIcon
          value={getShortMoney(statistic.totalMoney)}
          icon="./assets/cards/money_total.svg"
          title="plugin.team_total.moneyAll.title"
          description="plugin.team_total.moneyAll.description"
        />
        <CardWithIcon
          value={getShortMoney(statistic.totalMoneyWorked)}
          icon="./assets/cards/money_work.svg"
          title="plugin.team_total.moneyWorked.title"
          description="plugin.team_total.moneyWorked.description"
        />
        <CardWithIcon
          size="l"
          value={getShortMoney(moneySpeed)}
          icon="./assets/cards/money_month.svg"
          title="plugin.team_total.moneySpeed.title"
          description="plugin.team_total.moneySpeed.description"
        />
      </SectionColumn>
      <SectionColumn>
        <CardWithIcon
          value={getShortMoney(statistic.totalMoneyLosses)}
          icon="./assets/cards/money_lazy.svg"
          title="plugin.team_total.moneyLosses.title"
          description="plugin.team_total.moneyLosses.description"
        />
        <CardWithIcon
          value={getShortMoney(statistic.totalMoneyInWeekend)}
          icon="./assets/cards/money_holidays.svg"
          title="plugin.team_total.weekendPayment.title"
          description="plugin.team_total.weekendPayment.description"
        />
        <CardWithIcon
          value={getShortMoney(Math.max(forecastingMoneyAll, statistic.totalMoney))}
          icon="./assets/cards/money_total.svg"
          title="plugin.team_total.forecastingMoneyAll.title"
          description="plugin.team_total.forecastingMoneyAll.description"
          size="l"
        />
      </SectionColumn>
    </Section>
  );
});

export default Money;
