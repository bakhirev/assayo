import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import CommonCommits from 'ts/pages/Common/components/Commits';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

const Commits = observer(({ user }: PageOptions): React.ReactElement => {
  const byTimestamp = dataGripStore.dataGrip.timestamp.statisticByAuthor[user.author];
  return (
    <CommonCommits statistic={byTimestamp} />
  );
});

export default Commits;
