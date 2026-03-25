import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';

import Person from '../Person';
import Team from '../Team';

const PrintAll = observer((): React.ReactElement | null => {
  const statistic = statisticStore.statisticsByCommits.author.totalInfo;
  const users = Object.entries(statistic)
    .filter(([, user]: [string, any]) => !user.isStaff)
    .map(([id, user]: [string, any]) => (
      <Person
        key={id}
        user={user}
      />
    ));

  return (
    <>
      <Team />
      {users}
    </>
  );
});

export default PrintAll;
