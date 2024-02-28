import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import Title from 'ts/components/Title';
import CardWithIcon from 'ts/components/CardWithIcon';
import Description from 'ts/components/Description';

import dataGripStore from 'ts/store/DataGrip';
import userSettings from 'ts/store/UserSettings';
import { getShortMoney } from 'ts/helpers/formatter';

const Total = observer((): React.ReactElement => {
  const { t } = useTranslation();
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
    <PageWrapper>
      <PageColumn>
        <Title title="page.team.total.titleA"/>
        <div>
          <CardWithIcon
            value={statistic.daysWorked}
            icon="./assets/cards/work_days.png"
            title="page.team.total.daysWorked.title"
            description="page.team.total.daysWorked.description"
          />
          <CardWithIcon
            value={statistic.commits}
            icon="./assets/cards/commits.png"
            title="page.team.total.commits.title"
            description="page.team.total.commits.description"
          />
          <CardWithIcon
            value={statistic.daysLosses}
            icon="./assets/cards/lazy.png"
            title="page.team.total.daysLosses.title"
            description="page.team.total.daysLosses.description"
          />
          <CardWithIcon
            value={`${employment.active.length} / ${employment.dismissed.length}`}
            icon="./assets/cards/dismissal.png"
            title="page.team.total.employment.title"
            description="page.team.total.employment.description"
          />
          <CardWithIcon
            long
            value={workSpeed}
            icon="./assets/cards/tasks_month.png"
            title="page.team.total.workSpeed.title"
            description="page.team.total.workSpeed.description"
          />
        </div>
        <Description
          text={t('page.team.total.description1')}
        />
        <Description
          text={t('page.team.total.description2')}
        />
        <Description
          text={t('page.team.total.description3')}
        />
      </PageColumn>
      <PageColumn>
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
            long
            value={getShortMoney(moneySpeed)}
            icon="./assets/cards/money_month.png"
            title="page.team.total.moneySpeed.title"
            description="page.team.total.moneySpeed.description"
          />
        </div>
        <Description
          text={t('page.team.total.description4')}
        />
        <Description
          text={t('page.team.total.description5')}
        />
      </PageColumn>
    </PageWrapper>
  );
});

export default Total;
