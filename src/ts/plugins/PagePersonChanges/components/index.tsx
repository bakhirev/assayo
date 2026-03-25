import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';
import CommonChanges from 'ts/pages/Common/components/Changes';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

const Changes = observer(({ user }: PageOptions): React.ReactElement => {
  const byTimestamp = statisticStore.statisticsByCommits.timestamp.totalInfoByName[user.author];
  return (
    <CommonChanges statistic={byTimestamp} />
  );
});

export default Changes;
