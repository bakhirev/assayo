import React from 'react';
import { observer } from 'mobx-react-lite';

import { Title, Description, CardWithIcon, Section, SectionColumn } from 'ts/components/Layout';

import dataGripStore from 'ts/store/DataGrip';
import userSettings from 'ts/store/UserSettings';
import { getShortMoney } from 'ts/helpers/formatter';

const Total = observer((): React.ReactElement => {
  const statistic = dataGripStore.dataGrip.team.statistic;
  const employment = dataGripStore.dataGrip.author.employment;
  const timestamp = dataGripStore.dataGrip.timestamp.statistic;
  const workSpeed = employment.active.reduce((speed: number, name: string) => {
    return speed + dataGripStore.dataGrip.author.statisticByName[name].taskInDay;
  }, 0).toFixed(1);
  const moneySpeed = employment.active.reduce((speed: number, name: string) => {
    return speed + userSettings.getCurrentSalaryInMonth(name);
  }, 0);

  return (
    <Section>
      <SectionColumn>
        <Title title="page.team.total.titleA"/>
        <div>
          <CardWithIcon
            value={workSpeed}
            icon="./assets/cards/tasks_month.png"
            title="page.team.total.workSpeed.title"
            description="page.team.total.workSpeed.description"
          />
          <CardWithIcon
            value={`${employment.active.length} / ${employment.dismissed.length}`}
            icon="./assets/cards/dismissal.png"
            title="page.team.total.employment.title"
            description="page.team.total.employment.description"
          />
          <CardWithIcon
            value={statistic.daysWorked}
            icon="./assets/cards/work_days.png"
            title="page.team.total.daysWorked.title"
            description="page.team.total.daysWorked.description"
          />
          <CardWithIcon
            value={statistic.daysLosses}
            icon="./assets/cards/lazy.png"
            title="page.team.total.daysLosses.title"
            description="page.team.total.daysLosses.description"
          />
          <CardWithIcon
            size="l"
            value={statistic.commits}
            icon="./assets/cards/commits.png"
            title="page.team.total.commits.title"
            description="page.team.total.commits.description"
          />
        </div>
        <Description translationId="page.team.total.description1" />
        <Description translationId="page.team.total.description2" />
        <Description translationId="page.team.total.description3" />
      </SectionColumn>
      <SectionColumn>
        <Title title="page.team.total.titleB"/>
        <div>
          <CardWithIcon
            value={getShortMoney(statistic.moneyAll)}
            icon="./assets/cards/money_total.png"
            title="page.team.total.moneyAll.title"
            description="page.team.total.moneyAll.description"
          />
          <CardWithIcon
            value={getShortMoney(statistic.moneyWorked)}
            icon="./assets/cards/money_work.png"
            title="page.team.total.moneyWorked.title"
            description="page.team.total.moneyWorked.description"
          />
          <CardWithIcon
            value={getShortMoney(statistic.moneyLosses)}
            icon="./assets/cards/money_lazy.png"
            title="page.team.total.moneyLosses.title"
            description="page.team.total.moneyLosses.description"
          />
          <CardWithIcon
            value={getShortMoney(timestamp.weekendPayment)}
            icon="./assets/cards/money_holidays.png"
            title="page.team.total.weekendPayment.title"
            description="page.team.total.weekendPayment.description"
          />
          <CardWithIcon
            size="l"
            value={getShortMoney(moneySpeed)}
            icon="./assets/cards/money_month.png"
            title="page.team.total.moneySpeed.title"
            description="page.team.total.moneySpeed.description"
          />
        </div>
        <Description translationId="page.team.total.description4" />
        <Description translationId="page.team.total.description5" />
      </SectionColumn>
    </Section>
  );
});

export default Total;
