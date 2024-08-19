import React from 'react';
import { observer } from 'mobx-react-lite';

import { getShortNumber } from 'ts/helpers/formatter';

import CardWithIcon from 'ts/components/CardWithIcon';
import CardWithBanner from 'ts/components/CardWithIcon/components/Banner';
import NothingFound from 'ts/components/NothingFound';
import IsStaff from 'ts/components/NothingFound/components/IsStaff';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import Title from 'ts/components/Title';
import dataGripStore from 'ts/store/DataGrip';

import IPersonCommonProps from '../interfaces/CommonProps';

const Speed = observer(({ user }: IPersonCommonProps): React.ReactElement => {
  const statistic = user;
  const byTimestamp = dataGripStore.dataGrip.timestamp.statisticByAuthor[statistic.author];
  const scoring = dataGripStore.dataGrip.scoring.statisticByName[user.author];
  const scoringTotal = dataGripStore.dataGrip.scoring.total;
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
        <Title title="page.person.speed.task"/>
        {taskNumber === 0 ? (
          <NothingFound />
        ) : (
          <div>
            <CardWithIcon
              value={statistic.daysForTask && taskNumber
                ? getShortNumber(statistic.daysForTask)
                : null}
              icon="./assets/cards/month.png"
              title="page.person.speed.days.title"
              description="page.person.speed.days.description"
              scoring={{
                value: scoring.daysForTask,
                total: scoringTotal.daysForTask,
              }}
            />
            <CardWithIcon
              value={taskNumber
                ? (statistic.commits / taskNumber).toFixed(1)
                : null}
              icon="./assets/cards/commits.png"
              title="page.person.speed.commits.title"
              description="page.person.speed.commits.description"
              scoring={{
                value: scoring.commitsForTask,
                total: scoringTotal.commitsForTask,
              }}
            />
            <CardWithIcon
              value={taskNumber ? statistic.changesForTask : null}
              icon="./assets/cards/lines.png"
              title="page.person.speed.line.title"
              description="page.person.speed.line.description"
              scoring={{
                value: scoring.linesForTask,
                total: scoringTotal.linesForTask,
              }}
            />
            <CardWithBanner />
          </div>
        )}
      </PageColumn>
      <PageColumn>
        <Title title="page.person.speed.max"/>
        <div>
          <CardWithIcon
            size="l"
            value={byTimestamp.tasksByTimestampCounter.max}
            icon="./assets/cards/tasks.png"
            title="page.person.speed.tasks.title"
            description="page.person.speed.tasks.description"
            scoring={{
              value: scoring.speedMaxTasks,
              total: scoringTotal.speedMaxTasks,
            }}
          />
          <CardWithIcon
            size="l"
            value={byTimestamp.commitsByTimestampCounter.max}
            icon="./assets/cards/commits.png"
            title="page.person.speed.maxCommits.title"
            description="page.person.speed.maxCommits.description"
            scoring={{
              value: scoring.speedMaxCommits,
              total: scoringTotal.speedMaxCommits,
            }}
          />
        </div>
      </PageColumn>
    </PageWrapper>
  );
});

export default Speed;
