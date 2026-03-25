import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { Pagination, FakeDataLoader } from 'ts/components/DataLoader';
import { Title } from 'ts/components/Layout';
import statisticStore from 'ts/store/Statistics';
import { getGroupsBy } from 'ts/helpers/charts';

import View from './View';
import { getGroupsByAuthors } from './helpers';

interface AuthorsProps {
  allPR: any[];
  mode?: string;
}

const [ getGroupsByDateRange, ORDER_BY_YEARS ] = getGroupsBy('years');

const Authors = observer(({
  allPR,
  mode,
}: AuthorsProps): React.ReactElement | null => {
  const rows = useMemo(() => (
    getGroupsByAuthors(allPR).map((list: any) => {
      const daysInReview = getGroupsByDateRange(list, 'daysInReview');
      const daysWorkOnTask = getGroupsByDateRange(list, 'daysWorkOnTask');
      const daysTotalValue = daysInReview.weightedAverage + daysWorkOnTask.weightedAverage;
      return {
        author: list[0].author,
        daysInReview: daysInReview.details,
        daysWorkOnTask: daysWorkOnTask.details,
        daysTotalValue,
        daysTotalDetails: {
          'plugin.team_pull_requests.author.work': daysWorkOnTask.weightedAverage,
          'plugin.team_pull_requests.author.review': daysInReview.weightedAverage,
        },
      };
    })
  ), [allPR]);

  return (
    <>
      <Title title="plugin.team_pull_requests.author.title"/>
      <FakeDataLoader
        content={rows}
        watch={`${mode}${statisticStore.hash}`}
      >
        <View
          mode={mode}
          order={ORDER_BY_YEARS}
          rowsForExcel={rows}
        />
        <Pagination/>
      </FakeDataLoader>
    </>
  );
});

export default Authors;
