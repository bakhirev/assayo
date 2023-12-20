import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import getAchievementByAuthor from 'ts/helpers/achievement/byAuthor';
import ACHIEVEMENT_TYPE from 'ts/helpers/achievement/constants/type';
import localization from 'ts/helpers/Localization';

import CardWithIcon from 'ts/components/CardWithIcon';
import Achievements from 'ts/components/Achievement';
import Description from 'ts/components/Description';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import Character from 'ts/components/Character';
import Title from 'ts/components/Title';
import GetList from 'ts/components/GetList';

import dataGripStore from 'ts/store/DataGrip';

interface IAchievementBlockProps {
  title: string;
  achievements: string[];
}

function AchievementBlock({ title, achievements }: IAchievementBlockProps) {
  if (!achievements?.length) return null;
  return (
    <>
      <Description text={`# ${localization.get(title)}`}/>
      <Achievements list={achievements} />
    </>
  );
}

const Total = observer((): React.ReactElement => {
  const { userId } = useParams<any>();
  const statistic = dataGripStore.dataGrip.author.statistic[userId || 0];
  const commitsWithGet = dataGripStore.dataGrip.get.getsByAuthor[statistic.author];
  const taskNumber = statistic.tasks.length;
  const achievements = getAchievementByAuthor(statistic.author);

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
          />
          <CardWithIcon
            value={taskNumber ? taskNumber : null}
            icon="./assets/cards/tasks.png"
            title="page.person.total.tasks.title"
            description="page.person.total.tasks.description"
          />
          <CardWithIcon
            value={statistic.daysLosses}
            icon="./assets/cards/lazy.png"
            title="page.team.total.daysLosses.title"
            description="page.team.total.daysLosses.description"
          />
          <CardWithIcon
            value={statistic.commits}
            icon="./assets/cards/commits.png"
            title="page.team.total.commits.title"
            description="page.team.total.commits.description"
          />
        </div>
        <Title title="page.person.character.title"/>
        {false && <Character user={statistic} />}
      </PageColumn>
      <PageColumn>
        <Title title="page.person.achievement.title"/>
        <AchievementBlock
          title="page.person.achievement.positive"
          achievements={achievements[ACHIEVEMENT_TYPE.GOOD]}
        />
        <AchievementBlock
          title="page.person.achievement.normal"
          achievements={achievements[ACHIEVEMENT_TYPE.NORMAL]}
        />
        <AchievementBlock
          title="page.person.achievement.negative"
          achievements={achievements[ACHIEVEMENT_TYPE.BAD]}
        />
        <Description
          text={localization.get('page.person.achievement.description')}
        />
        <br />
        <br />
        {commitsWithGet?.length ? (
          <>
            <Title title="page.person.gets.title"/>
            <GetList list={commitsWithGet} />
            <Description
              text={localization.get('page.person.gets.description')}
            />
          </>
        ) : null}
      </PageColumn>
    </PageWrapper>
  );
});

export default Total;
