import React from 'react';
import { observer } from 'mobx-react-lite';

import getAchievementByAuthor from 'ts/helpers/achievement/byAuthor';
import ACHIEVEMENT_TYPE from 'ts/helpers/achievement/constants/type';
import localization from 'ts/helpers/Localization';

import Achievements from 'ts/components/Achievement';
import Description from 'ts/components/Description';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import Title from 'ts/components/Title';
import GetList from 'ts/components/GetList';

import dataGripStore from 'ts/store/DataGrip';
import IPersonCommonProps from '../../interfaces/CommonProps';

interface IAchievementBlockProps {
  title: string;
  achievements: string[];
}

function AchievementBlock({ title, achievements }: IAchievementBlockProps) {
  if (!achievements?.length) return null;
  return (
    <>
      <Description text={`# ${title}`}/>
      <Achievements list={achievements} />
    </>
  );
}

const Total = observer(({
  user,
}: IPersonCommonProps): React.ReactElement => {
  const statistic = user;
  const commitsWithGet = dataGripStore.dataGrip.get.getsByAuthor[statistic.author];
  const achievements = getAchievementByAuthor(statistic.author);

  return (
    <PageWrapper>
      <PageColumn>
        <Title title="page.person.achievement.title"/>
        <AchievementBlock
          title="page.person.achievement.positive"
          achievements={achievements[ACHIEVEMENT_TYPE.GOOD]}
        />
      </PageColumn>
      <PageColumn>
        <Title title={localization.get('_')}/>
        <AchievementBlock
          title="page.person.achievement.normal"
          achievements={achievements[ACHIEVEMENT_TYPE.NORMAL]}
        />
        <AchievementBlock
          title="page.person.achievement.negative"
          achievements={achievements[ACHIEVEMENT_TYPE.BAD]}
        />
        <br />
        <br />
        {commitsWithGet?.length ? (
          <>
            <Title title="page.person.gets.title"/>
            <GetList
              mode="print"
              list={commitsWithGet}
            />
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
