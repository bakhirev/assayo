import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import { If } from 'ts/components/Layout';
import TempoChart from 'ts/components/Tempo';
import TempoByTable from 'ts/components/TempoByTable';
import TempoLikeList from 'ts/components/TempoLikeList';
import statisticStore from 'ts/store/StatisticsByCommitsStore';
import type Filter from 'ts/components/Layout/Search/interfaces/Filter';

interface TempoViewProps {
  view?: string;
  filters?: Filter;
  response?: IPagination<any>;
}

function TempoView({
  view,
  filters,
  response,
}: TempoViewProps) {
  if (!response) return null;
  const order = statisticStore.statisticsByCommits.author.list || [];
  return (
    <>
      <If value={!view || view === 'list'}>
        <TempoLikeList
          days={response.content as any[]}
          author={filters?.author}
          order={order}
        />
      </If>
      <If value={view === 'table'}>
        <TempoByTable
          days={response.content as any[]}
          author={filters?.author}
        />
      </If>
      <If value={view === 'cards'}>
        <TempoChart
          days={response.content as any[]}
          author={filters?.author}
          order={order}
        />
      </If>
    </>
  );
}

TempoView.defaultProps = {
  response: undefined,
};

export default TempoView;
