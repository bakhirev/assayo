import React from 'react';
import { observer } from 'mobx-react-lite';

import { getShortNumber } from 'ts/helpers/formatter';

import { CardWithIcon, CardWithBanner, NothingFound, Title, Section, SectionColumn } from 'ts/components/Layout';
import statisticStore from 'ts/store/Statistics';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

const Speed = observer(({ user }: PageOptions): React.ReactElement => {
  const byTimestamp = statisticStore.statisticsByCommits.timestamp.totalInfoByName[user.author];
  const scoring = statisticStore.statisticsByCommits.scoring.totalInfoByName[user.author];
  const scoringTotal = statisticStore.statisticsByCommits.scoring.total;
  const taskNumber = user.totalTasks;

  if (user.isStaff) return <NothingFound mode="staff" />;
  if (!taskNumber) return <NothingFound />;

  return (
    <Section>
      <SectionColumn>
        <Title title="plugin.person_speed.task"/>
        <CardWithIcon
          value={getShortNumber(1 / user.totalTaskInDay)}
          icon="./assets/cards/month.svg"
          title="plugin.person_speed.days.title"
          description="plugin.person_speed.days.description"
          scoring={{
            value: scoring.totalTaskInDay,
            total: scoringTotal.totalTaskInDay,
          }}
        />
        <CardWithIcon
          value={getShortNumber(user.totalTaskInCommits)}
          icon="./assets/cards/commits.svg"
          title="plugin.person_speed.commits.title"
          description="plugin.person_speed.commits.description"
          scoring={{
            value: scoring.totalTaskInCommits,
            total: scoringTotal.totalTaskInCommits,
          }}
        />
        <CardWithIcon
          value={getShortNumber(user.totalTaskInChanges)}
          icon="./assets/cards/lines.svg"
          title="plugin.person_speed.line.title"
          description="plugin.person_speed.line.description"
          scoring={{
            value: scoring.totalTaskInChanges,
            total: scoringTotal.totalTaskInChanges,
          }}
        />
        <CardWithIcon
          value={getShortNumber(user.totalTaskInFiles)}
          icon="./assets/cards/files.svg"
          title="plugin.person_speed.files.title"
          description="plugin.person_speed.files.description"
          scoring={{
            value: scoring.totalTaskInFiles,
            total: scoringTotal.totalTaskInFiles,
          }}
        />
        <CardWithBanner />
      </SectionColumn>
      <SectionColumn>
        <Title title="plugin.person_speed.max"/>
        <CardWithIcon
          size="l"
          value={byTimestamp.tasksByTimestampCounter.max}
          icon="./assets/cards/tasks.svg"
          title="plugin.person_speed.tasks.title"
          description="plugin.person_speed.tasks.description"
          scoring={{
            value: scoring.speedMaxTasks,
            total: scoringTotal.speedMaxTasks,
          }}
        />
        <CardWithIcon
          size="l"
          value={byTimestamp.commitsByTimestampCounter.max}
          icon="./assets/cards/commits.svg"
          title="plugin.person_speed.maxCommits.title"
          description="plugin.person_speed.maxCommits.description"
          scoring={{
            value: scoring.speedMaxCommits,
            total: scoringTotal.speedMaxCommits,
          }}
        />
      </SectionColumn>
    </Section>
  );
});

export default Speed;
