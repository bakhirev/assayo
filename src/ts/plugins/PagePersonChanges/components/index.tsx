import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import CommonChanges from 'ts/pages/Common/components/Changes';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

const Changes = observer(({ user }: PageOptions): React.ReactElement => {
  const byTimestamp = dataGripStore.dataGrip.timestamp.statisticByAuthor[user.author];
  return (
    <CommonChanges statistic={byTimestamp} />
  );
});

export default Changes;
