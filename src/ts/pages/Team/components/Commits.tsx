import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import CommonCommits from 'ts/pages/Common/components/Commits';

const Commits = observer((): React.ReactElement => {
  const statistic = dataGripStore.dataGrip.timestamp.statistic;
  return (
    <CommonCommits statistic={statistic} />
  );
});

export default Commits;
