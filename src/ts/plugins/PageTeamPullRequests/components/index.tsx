import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { Pagination, FakeDataLoader } from 'ts/components/DataLoader';
import { Title, NothingFound, If, Search as LayoutSearch } from 'ts/components/Layout';
import PageBreak from 'ts/pages/Common/components/PageBreak';

import Total from './components/Total';
import Authors from './components/Authors';
import Anonymous from './components/Anonymous';
import All from './components/All';
import PieCharts from './components/PieCharts';

function getGroupsByTasks(list: any[]) {
  const withTask: any[] = [];
  const withoutTask: any[] = [];
  list.forEach((pr: any) => {
    if (pr.task) withTask.push(pr);
    else withoutTask.push(pr);
  });
  return [withTask, withoutTask];
}

const PullRequests = observer(({
  mode,
}: PageOptions): React.ReactElement | null => {
  const allPR = statisticStore.statisticsByCommits.pr.totalInfo;
  const [withTask, withoutTask] = getGroupsByTasks(allPR);
  const [searchWithTask, setSearchWithTask] = useState<any[]>(withTask);
  const [searchWithoutTask, setSearchWithoutTask] = useState<any[]>(withoutTask);
  const [hash, setHash] = useState<string>('');

  if (allPR.length < 5) {
    return mode !== 'print' ? (<NothingFound />) : null;
  }

  return (
    <>
      <If value={withTask}>
        <Title title="plugin.team_pull_requests.total.title"/>
        <Total prWithTask={withTask}/>
        <Authors
          mode={mode}
          allPR={allPR}
        />
      </If>

      <PageBreak/>

      <If value={mode !== 'print'}>
        <Title title="common.filters"/>
        <LayoutSearch
          content={allPR}
          properties="message"
          examples={['hack', 'password', 'prod', 'token', 'key', 'env']}
          onChange={(newResults: any[], query: string) => {
            const [newWithTask, newWithoutTask] = getGroupsByTasks(newResults);
            setSearchWithTask(newWithTask);
            setSearchWithoutTask(newWithoutTask);
            setHash(query);
          }}
          onFilter={(filters: any) => (item: any): boolean => {
            if (filters.author && item.author !== filters.author) return false;
            if (filters.company && item.company !== filters.company) return false;
            if (filters.taskCode && item.taskCode !== filters.taskCode) return false;
            if (filters.scope && !item.scope.includes(filters.scope)) return false;
            if (filters.type && !item.types.includes(filters.type)) return false;
            return true;
          }}
        />
      </If>

      <If value={withTask}>
        <Title title="plugin.team_pull_requests.all.title"/>
        <If value={searchWithTask}>
          <PieCharts rows={searchWithTask}/>
        </If>
        <FakeDataLoader
          content={searchWithTask}
          watch={`${hash}${mode}${statisticStore.hash}`}
        >
          <All
            mode={mode}
            rowsForExcel={searchWithTask}
          />
          <NothingFound />
          <Pagination/>
        </FakeDataLoader>
      </If>

      <PageBreak/>

      <If value={withoutTask}>
        <Title title="plugin.team_pull_requests.anonymous.title"/>
        <If value={searchWithoutTask}>
          <PieCharts rows={searchWithoutTask}/>
        </If>
        <FakeDataLoader
          content={searchWithoutTask}
          watch={`${hash}${mode}${statisticStore.hash}`}
        >
          <Anonymous
            mode={mode}
            rowsForExcel={searchWithoutTask}
          />
          <NothingFound />
          <Pagination/>
        </FakeDataLoader>
      </If>
    </>
  );
});

export default PullRequests;
