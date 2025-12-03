import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import achievementByAuthor from 'ts/helpers/achievement/byCompetition';
import ACHIEVEMENT_TYPE from 'ts/helpers/achievement/constants/type';

import Achievements from 'ts/components/Achievement';
import { Description, Title, Section, SectionColumn } from 'ts/components/Layout';
import GetList from 'ts/components/GetList';

import dataGripStore from 'ts/store/DataGrip';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

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

const Total = observer(({ user }: PageOptions): React.ReactElement => {
  const { t } = useTranslation();
  const statistic = user;
  const commitsWithGet = dataGripStore.dataGrip.get.getsByAuthor[statistic.author];
  const achievements = achievementByAuthor.authors[statistic.author];

  return (
    <Section>
      <SectionColumn>
        <Title title="page.person.achievement.title"/>
        <AchievementBlock
          title="page.person.achievement.positive"
          achievements={achievements[ACHIEVEMENT_TYPE.GOOD - 1]}
        />
      </SectionColumn>
      <SectionColumn>
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
            <Description translationId="page.person.gets.description" />
          </>
        ) : null}
      </SectionColumn>
    </Section>
  );
});

export default Total;
