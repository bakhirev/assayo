import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import CommonPopularWords from 'ts/pages/Common/components/PopularWords';

const PopularWords = observer((): React.ReactElement => {
  const { userId } = useParams<any>();
  const statistic = dataGripStore.dataGrip.author.statistic[userId || 0].wordStatistics;
  return (
    <CommonPopularWords statistic={statistic} />
  );
});

export default PopularWords;
