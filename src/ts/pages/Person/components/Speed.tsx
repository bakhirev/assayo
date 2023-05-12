import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { getShortNumber } from 'ts/helpers/formatter';
import localization from 'ts/helpers/Localization';

import CardWithIcon from 'ts/components/CardWithIcon';
import NothingFound from 'ts/components/NothingFound';
import IsStaff from 'ts/components/NothingFound/components/IsStaff';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import Title from 'ts/components/Title';

import dataGripStore from 'ts/store/DataGrip';

const Speed = observer((): React.ReactElement => {
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
        <Title title={localization.get('Одна задача в среднем это')}/>
        {taskNumber === 0 ? (
          <NothingFound />
        ) : (
          <div>
            <CardWithIcon
              value={statistic.daysForTask && taskNumber
                ? getShortNumber(statistic.daysForTask)
                : null}
              icon="./assets/cards/month.png"
              title="дней"
              description="Имеются ввиду рабочие дни,<br>если коммиты правильно подписаны"
            />
            <CardWithIcon
              value={taskNumber
                ? (statistic.commits / taskNumber).toFixed(1)
                : null}
              icon="./assets/cards/commits.png"
              title="коммитов"
              description="Отрезаны 10% максимальных и минимальных значений"
            />
            <CardWithIcon
              value={taskNumber ? statistic.changesForTask : null}
              icon="./assets/cards/lines.png"
              title="строк кода"
              description="Отрезаны 10% максимальных и минимальных значений"
            />
          </div>
        )}
      </PageColumn>
      <PageColumn>
        <Title title={localization.get('Максимальная скорость в день')}/>
        <div>
          <CardWithIcon
            long
            value={byTimestamp.tasksByTimestampCounter.max}
            icon="./assets/cards/tasks.png"
            title="задач"
            description="Задача может быть не доделана, но работа по ней должна быть"
          />
          <CardWithIcon
            long
            value={byTimestamp.commitsByTimestampCounter.max}
            icon="./assets/cards/commits.png"
            title="коммитов"
            description="Задача может быть не доделана, но работа по ней должна быть"
          />
        </div>
      </PageColumn>
    </PageWrapper>
  );
});

export default Speed;
