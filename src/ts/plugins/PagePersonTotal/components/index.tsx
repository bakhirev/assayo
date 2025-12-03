import React from 'react';
import { observer } from 'mobx-react-lite';

import achievementByAuthor from 'ts/helpers/achievement/byCompetition';
import ACHIEVEMENT_TYPE from 'ts/helpers/achievement/constants/type';
import { getDate } from 'ts/helpers/formatter';

import { CardWithIcon, CardWithBanner, Description, Title, Section, SectionColumn } from 'ts/components/Layout';
import GetList from 'ts/components/GetList';

import dataGripStore from 'ts/store/DataGrip';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import AchievementBlock from './AchievementBlock';

const Total = observer(({ user }: PageOptions): React.ReactElement => {
  const statistic = user;
  const commitsWithGet = dataGripStore.dataGrip.get.getsByAuthor[user.author];
  const scoring = dataGripStore.dataGrip.scoring.statisticByName[user.author];
  const scoringTotal = dataGripStore.dataGrip.scoring.total;
  const taskNumber = statistic.tasks.length;
  const achievements = achievementByAuthor.authors[statistic.author];

  return (
    <Section>
      <SectionColumn>
        <Title title="page.person.total.title"/>
        <div>
          {false && (
            <>
              <CardWithIcon
                size="s"
                value={getDate(statistic.firstCommit.timestamp)}
                title="page.team.tasks.from"
              />
              <CardWithIcon
                size="s"
                value={getDate(statistic.lastCommit.timestamp)}
                title="page.team.tasks.to"
              />
            </>
          )}
          <CardWithIcon
            value={statistic.daysWorked}
            icon="./assets/cards/work_days.png"
            title="page.person.total.daysWorked.title"
            description="page.person.total.daysWorked.description"
            scoring={{
              value: scoring.daysWorked,
              total: scoringTotal.daysWorked,
            }}
          />
          <CardWithIcon
            value={taskNumber ? taskNumber : null}
            icon="./assets/cards/tasks.png"
            title="page.person.total.tasks.title"
            description="page.person.total.tasks.description"
            scoring={{
              value: scoring.tasks,
              total: scoringTotal.tasks,
            }}
          />
          <CardWithIcon
            value={statistic.daysLosses}
            icon="./assets/cards/lazy.png"
            title="page.team.total.daysLosses.title"
            description="page.team.total.daysLosses.description"
            scoring={{
              value: scoring.daysLosses,
              total: scoringTotal.daysLosses,
            }}
          />
          <CardWithIcon
            value={statistic.commits}
            icon="./assets/cards/commits.png"
            title="page.team.total.commits.title"
            description="page.team.total.commits.description"
            scoring={{
              value: scoring.commits,
              total: scoringTotal.commits,
            }}
          />
          <CardWithBanner size="l" />
        </div>
      </SectionColumn>
      <SectionColumn>
        <Title title="page.person.achievement.title"/>
        <AchievementBlock
          title="page.person.achievement.positive"
          achievements={achievements[ACHIEVEMENT_TYPE.GOOD - 1]}
        />
        <AchievementBlock
          title="page.person.achievement.normal"
          achievements={achievements[ACHIEVEMENT_TYPE.NORMAL - 1]}
        />
        <AchievementBlock
          title="page.person.achievement.negative"
          achievements={achievements[ACHIEVEMENT_TYPE.BAD - 1]}
        />
        <AchievementBlock
          title="page.person.achievement.publicity"
          achievements={achievements[ACHIEVEMENT_TYPE.PUBLICITY - 1]}
        />
        <Description translationId="page.person.achievement.description" />
        <br />
        <br />
        {commitsWithGet?.length ? (
          <>
            <Title title="page.person.gets.title"/>
            <GetList list={commitsWithGet} />
            <Description translationId="page.person.gets.description" />
          </>
        ) : null}
      </SectionColumn>
    </Section>
  );
});

export default Total;
