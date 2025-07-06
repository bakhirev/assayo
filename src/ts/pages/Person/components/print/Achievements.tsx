import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import achievementByAuthor from 'ts/helpers/achievement/byCompetition';
import ACHIEVEMENT_TYPE from 'ts/helpers/achievement/constants/type';

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
  const { t } = useTranslation();
  const statistic = user;
  const commitsWithGet = dataGripStore.dataGrip.get.getsByAuthor[statistic.author];
  const achievements = achievementByAuthor.authors[statistic.author];

  return (
    <PageWrapper>
      <PageColumn>
        <Title title="page.person.achievement.title"/>
        <AchievementBlock
          title="page.person.achievement.positive"
          achievements={achievements[ACHIEVEMENT_TYPE.GOOD - 1]}
        />
      </PageColumn>
      <PageColumn>
        <Title title={t('_')}/>
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
              text={t('page.person.gets.description')}
            />
          </>
        ) : null}
      </PageColumn>
    </PageWrapper>
  );
});

export default Total;
