import React from 'react';
import { observer } from 'mobx-react-lite';

import { Description, Gap, If, Title } from 'ts/components/Layout';
import BeautifulTaskNumbers from 'ts/components/BeautifulTaskNumbers';
import statisticStore from 'ts/store/StatisticsByCommitsStore';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import Achievements from 'ts/components/Achievement';

import SmallCards from './components/SmallCards';
import ACHIEVEMENT_TYPE from './helpers/constants/type';
import getAchievements from "./helpers";

const Page = observer(({ user }: PageOptions): React.ReactElement => {
  const commitsWithBeautifulTaskNumbers = statisticStore.statisticsByCommits.beautifulTaskNumbers.totalInfoByName.get(user.author);
  const achievements = getAchievements()[user.author];
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
      <If value={false}>
        <SmallCards
          user={user}
          positive={positive}
          normal={normal}
          negative={negative}
          publicity={publicity}
        />
      </If>
      <If value={positive}>
        <Title title="plugin.person_achievements.page.positive"/>
        <Achievements list={positive} />
      </If>
      <If value={normal}>
        <Title title="plugin.person_achievements.page.normal"/>
        <Achievements list={normal} />
      </If>
      <If value={negative}>
        <Title title="plugin.person_achievements.page.negative"/>
        <Description translationId="plugin.person_achievements.page.description" />
        <Achievements list={negative} />
        <Gap height="xl" />
      </If>
      <If value={publicity}>
        <Title title="plugin.person_achievements.page.publicity"/>
        <Achievements list={publicity} />
      </If>
      <If value={commitsWithBeautifulTaskNumbers}>
        <Title title="plugin.person_achievements.gets.title"/>
        <Description translationId="plugin.person_achievements.gets.description" />
        <BeautifulTaskNumbers list={commitsWithBeautifulTaskNumbers} />
      </If>
    </>
  );
});

export default Page;
