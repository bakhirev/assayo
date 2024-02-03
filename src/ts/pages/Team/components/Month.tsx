import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import Recommendations from 'ts/components/Recommendations';
import YearChart from 'ts/components/YearChart';
import Title from 'ts/components/Title';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import PageWrapper from 'ts/components/Page/wrapper';

const Month = observer(({
  mode,
}: ICommonPageProps): React.ReactElement => {
  const authors = dataGripStore.dataGrip.author.statistic;
  const statistic = dataGripStore.dataGrip.timestamp.statistic;
  const max = statistic.commitsByTimestampCounter.max;
  const recommendations = dataGripStore.dataGrip.recommendations.team?.byTimestamp;

  return (
    <>
      <Recommendations
        mode={mode}
        recommendations={recommendations}
      />
      <Title title="page.team.month.title"/>
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

export default Month;
