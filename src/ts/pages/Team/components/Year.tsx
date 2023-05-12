import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import RecommendationsWrapper from 'ts/components/Recommendations/wrapper';
import YearChart from 'ts/components/YearChart';
import Title from 'ts/components/Title';
import PageWrapper from 'ts/components/Page/wrapper';

const Year = observer((): React.ReactElement => {
  const authors = dataGripStore.dataGrip.author.statistic;
  const statistic = dataGripStore.dataGrip.timestamp.statistic;
  const max = statistic.commitsByTimestampCounter.max;
  const recommendations = dataGripStore.dataGrip.recommendations.team?.byTimestamp;

  return (
    <>
      <RecommendationsWrapper recommendations={recommendations} />
      <Title title="Фильтры"/>
      <PageWrapper template="table">
        <YearChart
          maxCommits={max}
          authors={authors}
          wordDays={statistic.allCommitsByTimestamp}
        />
      </PageWrapper>
    </>
  );
});

export default Year;
