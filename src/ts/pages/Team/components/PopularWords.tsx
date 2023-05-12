import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import CommonPopularWords from 'ts/pages/Common/components/PopularWords';

const PopularWords = observer((): React.ReactElement => {
  const statistic = dataGripStore.dataGrip.team.statistic.wordStatistics;
  return (
    <CommonPopularWords statistic={statistic} />
  );
});

export default PopularWords;
