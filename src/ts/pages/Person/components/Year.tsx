import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import YearChart from 'ts/components/YearChart';
import PageWrapper from 'ts/components/Page/wrapper';

const Year = observer((): React.ReactElement => {
  const { userId } = useParams<any>();
  const author = dataGripStore.dataGrip.author.statistic[userId || 0];
  const statistic = dataGripStore.dataGrip.timestamp.statisticByAuthor[author.author];
  const max = statistic.commitsByTimestampCounter.max;

  return (
    <PageWrapper template="table">
      <YearChart
        maxCommits={max}
        authors={[author]}
        wordDays={statistic.allCommitsByTimestamp}
      />
    </PageWrapper>
  );
});

export default Year;
