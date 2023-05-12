import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import CommonChanges from 'ts/pages/Common/components/Changes';

const Changes = observer((): React.ReactElement => {
  const statistic = dataGripStore.dataGrip.timestamp.statistic;
  return (
    <CommonChanges statistic={statistic} />
  );
});

export default Changes;
