import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';

import ICommit from 'ts/interfaces/Commit';
import statisticStore from 'ts/store/Statistics';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { If, Title, NothingFound, Search as LayoutSearch, Gap } from 'ts/components/Layout';

import PieChartsBacklog from './components/PieChartsBacklog';
import PieChartsNormal from './components/PieChartsNormal';
import PieChartsAll from './components/PieChartsAll';
import View from './components/View';

const Tasks = observer(({
  mode,
}: PageOptions): React.ReactElement | null => {
  const rows = statisticStore.statisticsByCommits.tasks.totalInfo;
  const [results, setResults] = useState<ICommit[]>(rows);
  const [queryHash, setQueryHash] = useState<string>('');
  const backlogRows = useMemo(() => (
    results.filter((task: any) => task.totalDaysInBacklog > 90)
  ), [queryHash]);
  const normalRows = useMemo(() => (
    results.filter((task: any) => task.totalDaysInBacklog <= 90)
  ), [queryHash]);

  const hash = `${mode}${queryHash}${statisticStore.hash}`;

  if (!rows?.length) return mode !== 'print' ? (<NothingFound />) : null;

  return (
    <>
      <If value={mode !== 'print'}>
        <Title title="common.filters"/>
        <LayoutSearch
          content={rows}
          mode="sort-by-searchIndex"
          properties={['description', 'task', 'firstAuthor']}
          onChange={(newResults: ICommit[], query: string) => {
            setResults(newResults);
            setQueryHash(query);
          }}
          onFilter={(filters: any) => (item: any): boolean => {
            if (filters.author && !item.authors.has(filters.author)) return false;
            if (filters.company && item.company !== filters.company) return false;
            if (filters.taskCode && item.taskCode !== filters.taskCode) return false;
            if (filters.scope && !item.scope.includes(filters.scope)) return false;
            if (filters.type && !item.types.includes(filters.type)) return false;
            return true;
          }}
        />
      </If>

      <If value={results?.length > 8}>
        <PieChartsAll content={results} />
        <Gap height="xl" />
      </If>

      <If value={results?.length > 8}>
        <Title title="plugin.team_tasks.charts.normal"/>
        <PieChartsNormal content={normalRows} />
        <Gap height="xl" />
      </If>

      <Title title="plugin.team_tasks.task.title"/>
      <FakeDataLoader
        content={results}
        mode={mode}
        watch={hash}
      >
        <View
          mode={mode}
          rowsForExcel={results}
        />
        <NothingFound />
        <Pagination />
      </FakeDataLoader>

      <If value={backlogRows?.length > 8}>
        <Title title="plugin.team_tasks.charts.backlog"/>
        <PieChartsBacklog content={backlogRows} />
      </If>
    </>
  );
});

export default Tasks;
