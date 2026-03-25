import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';
import CommonChanges from 'ts/pages/Common/components/Changes';

const Changes = observer((): React.ReactElement => {
  const statistic = statisticStore.statisticsByCommits.timestamp.totalInfo;
  return (
    <CommonChanges statistic={statistic} />
  );
});

export default Changes;
