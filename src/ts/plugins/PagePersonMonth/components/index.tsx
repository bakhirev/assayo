import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import YearChart from 'ts/components/YearChart2';
import { SectionWithBg } from 'ts/components/Layout';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

const Month = observer(({ user }: PageOptions): React.ReactElement => {
  const author = user;
  const statistic = dataGripStore.dataGrip.timestamp.statisticByAuthor[author.author];
  const max = statistic.commitsByTimestampCounter.max;

  return (
    <SectionWithBg>
      <YearChart
        showEvents={false}
        maxCommits={max}
        authors={[author]}
        wordDays={statistic.allCommitsByTimestamp}
      />
    </SectionWithBg>
  );
});

export default Month;
