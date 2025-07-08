import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import achievementByAuthor from 'ts/helpers/achievement/byCompetition';
import ACHIEVEMENT_TYPE from 'ts/helpers/achievement/constants/type';
import { getDate } from 'ts/helpers/formatter';

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
import style from '../styles/index.module.scss';

interface IAchievementBlockProps {
  title: string;
  achievements: string[];
}

function AchievementBlock({ title, achievements }: IAchievementBlockProps) {
  const { t } = useTranslation();
  if (!achievements?.length) return null;
  return (
    <>
      <h3 className={style.total_achievements_title}>
        {t(title)}
      </h3>
      <Achievements list={achievements} />
    </>
  );
}

const Total = observer(({ user }: IPersonCommonProps): React.ReactElement => {
  const { t } = useTranslation();
  const statistic = user;
  const commitsWithGet = dataGripStore.dataGrip.get.getsByAuthor[user.author];
  const scoring = dataGripStore.dataGrip.scoring.statisticByName[user.author];
  const scoringTotal = dataGripStore.dataGrip.scoring.total;
  const taskNumber = statistic.tasks.length;
  const achievements = achievementByAuthor.authors[statistic.author];

  return (
    <PageWrapper>
      <PageColumn>
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
        <AchievementBlock
          title="page.person.achievement.publicity"
          achievements={achievements[ACHIEVEMENT_TYPE.PUBLICITY - 1]}
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
