import React from 'react';
import { observer } from 'mobx-react-lite';

import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import Title from 'ts/components/Title';
import localization from 'ts/helpers/Localization';
import CardWithIcon from 'ts/components/CardWithIcon';
import Description from 'ts/components/Description';

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
    <PageWrapper>
      <PageColumn>
        <Title title={localization.get('page.team.total.titleA')}/>
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
          text="*Человеко-дни* — это работа одного сотрудника в течение одного рабочего дня. Например, за один календарный день, команда из трех сотрудников выдает объем работы в три человеко-дня."
        />
        <Description
          text="*Днями прогулов* считаются только рабочие дни, когда коммиты могли бы быть сделаны. Выходные, государственные праздники и отпуска в расчёте не участвуют."
        />
        <Description
          text="Карточка *работает и уволилось* показывает фактический состав сотрудников, которые постоянно участвуют в работе. Кроме этого, есть «помощники» — это сотрудники, как правило другой специализации, которые могут иногда делать коммиты в проект."
        />
      </PageColumn>
      <PageColumn>
        <Title title={localization.get('page.team.total.titleB')}/>
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
          text="*Переплатой* считаются только рабочие дни, когда коммиты могли бы быть сделаны. Выходные, государственные праздники и отпуска в расчёте не участвуют. Именно поэтому переплата + фактическая стоимость != общей. В общей стоимости заложена оплата выходных, государственных праздников и отпусков."
        />
        <Description
          text="*Работой на выходных* считается по коэфициенту х2 от оплаты обычного дня. Выше отображена именно переплата (х1), т.к. сам факт переработки в данном контексте не интересен. Мы не смотрим скорость сжигания бюджета. Мы смотрим переплату при увеличении скорости работы."
        />
      </PageColumn>
    </PageWrapper>
  );
});

export default Total;
