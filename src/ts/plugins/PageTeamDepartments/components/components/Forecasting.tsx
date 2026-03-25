import React from 'react';
import { observer } from 'mobx-react-lite';

import { CardWithIcon, Section, SectionColumn } from 'ts/components/Layout';
import { getShortMoney } from 'ts/helpers/formatter';
import applicationConfig from 'ts/store/ApplicationConfig';

interface ForecastingProps {
  department?: any;
}

const Forecasting = observer(({
  department,
}: ForecastingProps): React.ReactElement | null => {
  if (!department || !department?.months?.length) return null;

  const middleSalary = applicationConfig.getMiddleSalaryInMonth();
  const moneyInMonth = department.months[0].allMiddleUsersInDepartment * middleSalary;
  const moneyAll = department.months.reduce((acc: any, item: any) => (
    acc + item.allMiddleUsersInDepartment * middleSalary
  ), 0);

  return (
    <Section>
      <SectionColumn>
        <CardWithIcon
          value={getShortMoney(moneyInMonth)}
          icon="./assets/cards/money_month.svg"
          title="plugin.team_departments.forecasting.moneyInMonth.title"
          description="plugin.team_departments.forecasting.moneyInMonth.description"
          size="l"
        />
      </SectionColumn>
      <SectionColumn>
        <CardWithIcon
          value={getShortMoney(moneyAll)}
          icon="./assets/cards/money_total.svg"
          title="plugin.team_departments.forecasting.moneyAll.title"
          description="plugin.team_departments.forecasting.moneyAll.description"
          size="l"
        />
      </SectionColumn>
    </Section>
  );
});

export default Forecasting;
