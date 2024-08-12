import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import achievementByAuthor from 'ts/helpers/achievement/byCompetition';
import ACHIEVEMENT_TYPE from 'ts/helpers/achievement/constants/type';

import CardWithIcon from 'ts/components/CardWithIcon';
import CardWithBanner from 'ts/components/CardWithIcon/components/Banner';
import Achievements from 'ts/components/Achievement';
import Description from 'ts/components/Description';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import Character from 'ts/components/Character';
import Title from 'ts/components/Title';
import GetList from 'ts/components/GetList';

import dataGripStore from 'ts/store/DataGrip';
import IPersonCommonProps from '../interfaces/CommonProps';

interface IAchievementBlockProps {
  title: string;
  achievements: string[];
}

function AchievementBlock({ title, achievements }: IAchievementBlockProps) {
  const { t } = useTranslation();
  if (!achievements?.length) return null;
  return (
    <>
      <Description text={`# ${t(title)}`}/>
      <Achievements list={achievements} />
    </>
  );
}

const Total = observer(({ user }: IPersonCommonProps): React.ReactElement => {
  const { t } = useTranslation();
  const statistic = user;
  const scoringTotal = dataGripStore.dataGrip.scoring.total;
  const scoring = dataGripStore.dataGrip.scoring.statisticByName[user.author];
  const commitsWithGet = dataGripStore.dataGrip.get.getsByAuthor[user.author];
  const taskNumber = statistic.tasks.length;
  const achievements = achievementByAuthor.authors[statistic.author];

  return (
    <PageWrapper>
      <PageColumn>
        <Title title="page.person.total.title"/>
        <div>
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
          <CardWithBanner long />
        </div>
        {false && <Title title="page.person.character.title"/>}
        {false && <Character user={statistic} />}
      </PageColumn>
      <PageColumn>
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
        <Description
          text={t('page.person.achievement.description')}
        />
        <br />
        <br />
        {commitsWithGet?.length ? (
          <>
            <Title title="page.person.gets.title"/>
            <GetList list={commitsWithGet} />
            <Description
              text={t('page.person.gets.description')}
            />
          </>
        ) : null}
      </PageColumn>
    </PageWrapper>
  );
});

export default Total;
