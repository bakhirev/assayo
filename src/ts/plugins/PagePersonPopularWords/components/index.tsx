import React from 'react';
import { observer } from 'mobx-react-lite';

import CommonPopularWords from 'ts/pages/Common/components/PopularWords';
import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';

interface IPopularWordsProps extends ICommonPageProps {
  user: any;
}

const PopularWords = observer(({
  user,
  mode,
}: IPopularWordsProps): React.ReactElement => {
  const statistic = user.wordStatistics;
  return (
    <CommonPopularWords
      mode={mode}
      statistic={statistic}
    />
  );
});

export default PopularWords;
