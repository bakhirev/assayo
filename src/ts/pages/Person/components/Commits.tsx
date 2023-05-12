import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import CommonCommits from 'ts/pages/Common/components/Commits';

const Commits = observer((): React.ReactElement => {
  const { userId } = useParams<any>();
  const statistic = dataGripStore.dataGrip.author.statistic[userId || 0];
  const byTimestamp = dataGripStore.dataGrip.timestamp.statisticByAuthor[statistic.author];
  return (
    <CommonCommits statistic={byTimestamp} />
  );
});

export default Commits;
