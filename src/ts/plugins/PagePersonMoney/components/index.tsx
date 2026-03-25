import React from 'react';
import { observer } from 'mobx-react-lite';

import { CardWithIcon, NothingFound, Title, Section, SectionColumn } from 'ts/components/Layout';
import statisticStore from 'ts/store/Statistics';
import { getShortMoney } from 'ts/helpers/formatter';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

const Money = observer(({ user }: PageOptions): React.ReactElement => {
  const scoringTotal = statisticStore.statisticsByCommits.scoring.total;
  const scoring = statisticStore.statisticsByCommits.scoring.totalInfoByName[user.author];
  const taskNumber = user.totalTasks;

  if (user.isStaff) return <NothingFound mode="staff" />;

  return (
    <Section>
      <SectionColumn>
        <Title title="plugin.person_money.title.total"/>
        <CardWithIcon
          value={getShortMoney(user.totalMoney)}
          icon="./assets/cards/money_total.svg"
          title="plugin.person_money.moneyAll.title"
          description="plugin.person_money.moneyAll.description"
          scoring={{
            value: scoring.totalMoney,
            total: scoringTotal.totalMoney,
          }}
        />
        <CardWithIcon
          value={getShortMoney(user.totalMoneyWorked)}
          icon="./assets/cards/money_work.svg"
          title="plugin.person_money.moneyWorked.title"
          description="plugin.person_money.moneyWorked.description"
          scoring={{
            value: scoring.totalMoneyWorked,
            total: scoringTotal.totalMoneyWorked,
          }}
        />
        <CardWithIcon
          value={getShortMoney(user.totalMoneyLosses)}
          icon="./assets/cards/money_lazy.svg"
          title="plugin.person_money.moneyLosses.title"
          description="plugin.person_money.moneyLosses.description"
          scoring={{
            value: scoring.totalMoneyLosses,
            total: scoringTotal.totalMoneyLosses,
          }}
        />
        <CardWithIcon
          value={getShortMoney(user.totalMoneyInWeekend)}
          icon="./assets/cards/money_holidays.svg"
          title="plugin.person_money.weekendPayment.title"
          description="plugin.person_money.weekendPayment.description"
          scoring={{
            value: scoring.totalMoneyInWeekend,
            total: scoringTotal.totalMoneyInWeekend,
          }}
        />
      </SectionColumn>
      <SectionColumn>
        <Title title="plugin.person_money.title.middle"/>
        {!taskNumber ? (
          <NothingFound />
        ) : (
          <>
            <CardWithIcon
              size="l"
              value={getShortMoney(user.totalMoneyWorked / taskNumber, 0)}
              icon="./assets/cards/money_task.svg"
              title="plugin.person_money.tasks.title"
              description="plugin.person_money.tasks.description"
              scoring={{
                value: scoring.moneyForTask,
                total: scoringTotal.moneyForTask,
              }}
            />
            <CardWithIcon
              size="l"
              value={getShortMoney(user.totalMoneyWorked / user.commits, 0)}
              icon="./assets/cards/money_work.svg"
              title="plugin.person_money.commits.title"
              description="plugin.person_money.commits.description"
              scoring={{
                value: scoring.moneyForCommit,
                total: scoringTotal.moneyForCommit,
              }}
            />
          </>
        )}
      </SectionColumn>
    </Section>
  );
});

export default Money;
