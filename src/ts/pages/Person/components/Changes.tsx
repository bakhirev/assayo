import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import CommonChanges from 'ts/pages/Common/components/Changes';

import IPersonCommonProps from '../interfaces/CommonProps';

const Changes = observer(({ user }: IPersonCommonProps): React.ReactElement => {
  const byTimestamp = dataGripStore.dataGrip.timestamp.statisticByAuthor[user.author];
  return (
    <CommonChanges statistic={byTimestamp} />
  );
});

export default Changes;
