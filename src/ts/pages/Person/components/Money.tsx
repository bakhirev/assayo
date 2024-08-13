import React from 'react';
import { observer } from 'mobx-react-lite';

import { getShortMoney } from 'ts/helpers/formatter';

import CardWithIcon from 'ts/components/CardWithIcon';
import NothingFound from 'ts/components/NothingFound';
import IsStaff from 'ts/components/NothingFound/components/IsStaff';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import Title from 'ts/components/Title';
import dataGripStore from 'ts/store/DataGrip';

import IPersonCommonProps from '../interfaces/CommonProps';

const Money = observer(({ user }: IPersonCommonProps): React.ReactElement => {
  const statistic = user;
  const scoringTotal = dataGripStore.dataGrip.scoring.total;
  const scoring = dataGripStore.dataGrip.scoring.statisticByName[user.author];
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
        <Title title="page.person.money.title.total"/>
          <div>
            <CardWithIcon
              value={getShortMoney(statistic.moneyAll)}
              icon="./assets/cards/money_total.png"
              title="page.person.money.moneyAll.title"
              description="page.person.money.moneyAll.description"
              scoring={{
                value: scoring.moneyAll,
                total: scoringTotal.moneyAll,
              }}
            />
            <CardWithIcon
              value={getShortMoney(statistic.moneyWorked)}
              icon="./assets/cards/money_work.png"
              title="page.person.money.moneyWorked.title"
              description="page.person.money.moneyWorked.description"
              scoring={{
                value: scoring.moneyWorked,
                total: scoringTotal.moneyWorked,
              }}
            />
            <CardWithIcon
              value={getShortMoney(statistic.moneyLosses)}
              icon="./assets/cards/money_lazy.png"
              title="page.person.money.moneyLosses.title"
              description="page.person.money.moneyLosses.description"
              scoring={{
                value: scoring.moneyLosses,
                total: scoringTotal.moneyLosses,
              }}
            />
            <CardWithIcon
              value={getShortMoney(byTimestamp.weekendPayment)}
              icon="./assets/cards/money_holidays.png"
              title="page.team.total.weekendPayment.title"
              description="page.team.total.weekendPayment.description"
              scoring={{
                value: scoring.weekendPayment,
                total: scoringTotal.weekendPayment,
              }}
            />
          </div>
      </PageColumn>
      <PageColumn>
        <Title title="page.person.money.title.middle"/>
        {taskNumber === 0 ? (
          <NothingFound />
        ) : (
          <div>
            <CardWithIcon
              size="l"
              value={taskNumber
                ? getShortMoney(statistic.moneyWorked / taskNumber, 0)
                : null}
              icon="./assets/cards/money_task.png"
              title="page.person.money.tasks.title"
              description="page.person.money.tasks.description"
            />
            <CardWithIcon
              size="l"
              value={taskNumber
                ? getShortMoney(statistic.moneyWorked / statistic.commits, 0)
                : null}
              icon="./assets/cards/money_work.png"
              title="page.person.money.commits.title"
              description="page.person.money.commits.description"
            />
          </div>
        )}
      </PageColumn>
    </PageWrapper>
  );
});

export default Money;
