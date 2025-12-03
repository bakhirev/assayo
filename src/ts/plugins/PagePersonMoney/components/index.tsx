import React from 'react';
import { observer } from 'mobx-react-lite';

import { CardWithIcon, NothingFound, IsStaff, Title, Section, SectionColumn } from 'ts/components/Layout';
import dataGripStore from 'ts/store/DataGrip';
import { getShortMoney } from 'ts/helpers/formatter';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

const Money = observer(({ user }: PageOptions): React.ReactElement => {
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
    <Section>
      <SectionColumn>
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
      </SectionColumn>
      <SectionColumn>
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
              scoring={{
                value: scoring.moneyForTask,
                total: scoringTotal.moneyForTask,
              }}
            />
            <CardWithIcon
              size="l"
              value={taskNumber
                ? getShortMoney(statistic.moneyWorked / statistic.commits, 0)
                : null}
              icon="./assets/cards/money_work.png"
              title="page.person.money.commits.title"
              description="page.person.money.commits.description"
              scoring={{
                value: scoring.moneyForCommit,
                total: scoringTotal.moneyForCommit,
              }}
            />
          </div>
        )}
      </SectionColumn>
    </Section>
  );
});

export default Money;
