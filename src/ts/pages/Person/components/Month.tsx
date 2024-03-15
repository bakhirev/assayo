import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import YearChart from 'ts/components/YearChart';
import PageWrapper from 'ts/components/Page/wrapper';

import IPersonCommonProps from '../interfaces/CommonProps';

const Month = observer(({ user }: IPersonCommonProps): React.ReactElement => {
  const author = user;
  const statistic = dataGripStore.dataGrip.timestamp.statisticByAuthor[author.author];
  const max = statistic.commitsByTimestampCounter.max;

  return (
    <>
      <br/>
      <PageWrapper template="table">
        <YearChart
          showEvents={false}
          maxCommits={max}
          authors={[author]}
          wordDays={statistic.allCommitsByTimestamp}
        />
      </PageWrapper>
    </>
  );
});

export default Month;
