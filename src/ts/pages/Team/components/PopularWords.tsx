import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import CommonPopularWords from 'ts/pages/Common/components/PopularWords';
import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';

const PopularWords = observer(({
  mode,
}: ICommonPageProps): React.ReactElement => {
  const statistic = dataGripStore.dataGrip.team.statistic.wordStatistics;
  return (
    <CommonPopularWords
      mode={mode}
      statistic={statistic}
    />
  );
});

export default PopularWords;
