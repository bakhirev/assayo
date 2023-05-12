import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { getShortMoney } from 'ts/helpers/formatter';
import localization from 'ts/helpers/Localization';

import CardWithIcon from 'ts/components/CardWithIcon';
import NothingFound from 'ts/components/NothingFound';
import IsStaff from 'ts/components/NothingFound/components/IsStaff';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import Title from 'ts/components/Title';

import dataGripStore from 'ts/store/DataGrip';

const Money = observer((): React.ReactElement => {
  const { userId } = useParams<any>();
  const statistic = dataGripStore.dataGrip.author.statistic[userId || 0];
  const byTimestamp = dataGripStore.dataGrip.timestamp.statisticByAuthor[statistic.author];
  const taskNumber = statistic.tasks.length;

  if (statistic.isStaff) {
    return (
      <NothingFound>
        <IsStaff />
      </NothingFound>
    );
  }

  return (
    <PageWrapper>
      <PageColumn>
        <Title title={localization.get('За всё время')}/>
          <div>
            <CardWithIcon
              value={getShortMoney(statistic.moneyAll)}
              icon="./assets/cards/money_total.png"
              title="получил"
              description="Предполагаемая сумма зп с проекта (см. настройки)"
            />
            <CardWithIcon
              value={getShortMoney(statistic.moneyWorked)}
              icon="./assets/cards/money_work.png"
              title="отработал"
              description="Фактически отработанные дни умноженные на среднюю зп"
            />
            <CardWithIcon
              value={getShortMoney(statistic.moneyLosses)}
              icon="./assets/cards/money_lazy.png"
              title="возможная переплата"
              description="Дни без коммитов умноженные на среднюю зп"
            />
            <CardWithIcon
              value={getShortMoney(byTimestamp.weekendPayment)}
              icon="./assets/cards/money_holidays.png"
              title={localization.get('page.team.total.weekendPayment.title')}
              description={localization.get('page.team.total.weekendPayment.description')}
            />
          </div>
      </PageColumn>
      <PageColumn>
        <Title title={localization.get('Средняя стоимость')}/>
        {taskNumber === 0 ? (
          <NothingFound />
        ) : (
          <div>
            <CardWithIcon
              long
              value={taskNumber
                ? getShortMoney(statistic.moneyWorked / taskNumber, 0)
                : null}
              icon="./assets/cards/money_task.png"
              title="задача"
              description="Количество закрытых задач к стоимости дня"
            />
            <CardWithIcon
              long
              value={taskNumber
                ? getShortMoney(statistic.moneyWorked / statistic.commits, 0)
                : null}
              icon="./assets/cards/money_work.png"
              title="коммит"
              description="Количество коммитов к стоимости рабочего дня"
            />
          </div>
        )}
      </PageColumn>
    </PageWrapper>
  );
});

export default Money;
