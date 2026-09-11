import React from 'react';
import { observer } from 'mobx-react-lite';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import statisticStore from 'ts/store/StatisticsByCommitsStore';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { NothingFound } from 'ts/components/Layout';
import Recommendations from 'ts/components/Recommendations';

import View from './View';
import getRecommendations from './helpers/recommendations';

const Week = observer(({
  user,
  mode,
}: PageOptions): React.ReactElement => {
  const rows = statisticStore.statisticsByCommits.week.totalInfo.filter((item: any) => item.authors[user.author]);
  if (!rows?.length) return (<NothingFound />);

  const recommendations = getRecommendations()[user.author];

  return (
    <>
      <Recommendations
        mode={mode}
        recommendations={recommendations}
      />
      <FakeDataLoader content={rows}>
        <View
          name={user.author}
          mode={mode}
        />
        {mode !== 'print' && <Pagination/>}
      </FakeDataLoader>
    </>
  );
});

export default Week;
