import React from 'react';
import { observer } from 'mobx-react-lite';

import { CardWithIcon, Section, SectionColumn } from 'ts/components/Layout';

import statisticStore from 'ts/store/StatisticsByCommitsStore';
import applicationConfig from 'ts/store/ApplicationConfig';
import { getShortMoney } from 'ts/helpers/formatter';

function getForecastingMoneySpentOnPurchaseOfLicences(taskCodes: any[]): number {
  const moneyLicence = applicationConfig.config?.averageMonthlyLicenseCosts;
  const departments = taskCodes.filter((item: any) => item.totalDaysWorked > 10);
  return departments.reduce((acc: any, department: any) => (
    acc + department.months.reduce((acc2: any, item: any) => (
      acc2 + item.allMiddleUsersInDepartment * moneyLicence
    ), 0)
  ), 0);
}

const AdditionalMoney = observer((): React.ReactElement => {
  const employments = statisticStore.statisticsByCommits.author.list.length;
  const moneyDevice = employments * applicationConfig.config?.averageNewWorkplaceCosts;
  const taskCodes = statisticStore.statisticsByCommits.taskCodes.totalInfo;
  const moneyLicence = getForecastingMoneySpentOnPurchaseOfLicences(taskCodes);

  return (
    <Section>
      <SectionColumn>
        <CardWithIcon
          size="l"
          value={getShortMoney(moneyDevice)}
          icon="./assets/cards/device.svg"
          title="plugin.team_total.moneyDevice.title"
          description="plugin.team_total.moneyDevice.description"
        />
      </SectionColumn>
      <SectionColumn>
        <CardWithIcon
          value={getShortMoney(moneyLicence)}
          icon="./assets/cards/money_task.svg"
          title="plugin.team_total.moneyLicence.title"
          description="plugin.team_total.moneyLicence.description"
          size="l"
        />
      </SectionColumn>
    </Section>
  );
});

export default AdditionalMoney;
