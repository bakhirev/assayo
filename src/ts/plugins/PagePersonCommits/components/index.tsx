import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';
import CommonCommits from 'ts/pages/Common/components/Commits';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

const Commits = observer(({ user }: PageOptions): React.ReactElement => {
  const byTimestamp = statisticStore.statisticsByCommits.timestamp.totalInfoByName[user.author];
  const firstLastCommit = statisticStore.statisticsByCommits.firstLastCommit;
  return (
    <CommonCommits
      statistic={byTimestamp}
      from={firstLastCommit.min}
      to={firstLastCommit.max}
    />
  );
});

export default Commits;
