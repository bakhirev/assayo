import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/StatisticsByCommitsStore';

import Recommendations from 'ts/components/Recommendations';
import { HoursChart } from 'ts/components/Charts';
import { If, Title, SectionWithBg } from 'ts/components/Layout';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

import getRecommendations from './helpers/recommendations';

const Hours = observer(({ mode, user }: PageOptions): React.ReactElement => {
  const statistic = user
    ? statisticStore.statisticsByCommits.author.totalInfoByName.get(user.author)
    : statisticStore.statisticsByCommits.team.totalInfo;

  let max = 0;
  statistic.commitsByDayAndHour.forEach((day: number[]) => {
    max = Math.max(...day, max);
  });

  const recommendations = getRecommendations();

  return (
    <>
      <If value={recommendations && !user}>
        <Recommendations
          mode={mode}
          recommendations={recommendations}
        />
      </If>
      <Title title="plugin.team_hours.title"/>
      <SectionWithBg>
        <HoursChart
          max={max}
          commitsByDayAndHour={statistic.commitsByDayAndHour}
        />
      </SectionWithBg>
    </>
  );
});

export default Hours;
