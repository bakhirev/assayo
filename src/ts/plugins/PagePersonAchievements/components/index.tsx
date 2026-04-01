import React from 'react';
import { observer } from 'mobx-react-lite';

import achievementByAuthor from 'ts/helpers/achievement/byCompetition';
import ACHIEVEMENT_TYPE from 'ts/helpers/achievement/constants/type';

import { Description, Gap, If, Title } from 'ts/components/Layout';
import BeautifulTaskNumbers from 'ts/components/BeautifulTaskNumbers';

import statisticStore from 'ts/store/Statistics';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import Achievements from 'ts/components/Achievement';

const Page = observer(({ user }: PageOptions): React.ReactElement => {
  const statistic = user;
  const commitsWithBeautifulTaskNumbers = statisticStore.statisticsByCommits.beautifulTaskNumbers.totalInfoByName.get(user.author);
  const achievements = achievementByAuthor.authors[statistic.author];
  const [
    positive,
    normal,
    negative,
    publicity,
  ] = [
    achievements[ACHIEVEMENT_TYPE.GOOD - 1],
    achievements[ACHIEVEMENT_TYPE.NORMAL - 1],
    achievements[ACHIEVEMENT_TYPE.BAD - 1],
    achievements[ACHIEVEMENT_TYPE.PUBLICITY - 1],
  ];

  return (
    <>
      <If value={positive}>
        <Title title="page.person.achievement.positive"/>
        <Achievements list={positive} />
      </If>
      <If value={normal}>
        <Title title="page.person.achievement.normal"/>
        <Achievements list={normal} />
      </If>
      <If value={negative}>
        <Title title="page.person.achievement.negative"/>
        <Achievements list={negative} />
        <Description translationId="page.person.achievement.description" />
        <Gap height="xl" />
      </If>
      <If value={publicity}>
        <Title title="page.person.achievement.publicity"/>
        <Achievements list={publicity} />
      </If>

      <If value={commitsWithBeautifulTaskNumbers}>
        <Title title="page.person.gets.title"/>
        <BeautifulTaskNumbers list={commitsWithBeautifulTaskNumbers} />
        <Description translationId="page.person.gets.description" />
      </If>
    </>
  );
});

export default Page;
