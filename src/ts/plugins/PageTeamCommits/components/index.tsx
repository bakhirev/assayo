import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Title, Search as LayoutSearch, If, NothingFound } from 'ts/components/Layout';
import statisticStore from 'ts/store/Statistics';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';

import ICommit, { ISystemCommit } from 'ts/interfaces/Commit';
import View from './components/View';
import PieCharts from './components/PieCharts';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

const Page = observer(({ mode }: PageOptions): React.ReactElement => {
  const commits = useMemo(() => (
    statisticStore.commits
      .filter((commit: ISystemCommit) => !commit.commitType)
      .reverse()
  ), [statisticStore.hash]);

  const [results, setResults] = useState<ICommit[]>(commits);
  const [hash, setHash] = useState<string>('');
  const showPieCharts = results?.length > 8;

  return (
    <>
      <If value={mode !== 'print'}>
        <Title title="common.filters"/>
        <LayoutSearch
          content={commits}
          mode="sort-by-searchIndex"
          properties="message"
          examples={['hack', 'password', 'prod', 'token', 'key', 'env']}
          onChange={(newResults: ICommit[], query: string) => {
            setResults(newResults);
            setHash(query);
          }}
        />
      </If>

      <If value={showPieCharts}>
        <Title title="plugin.team_commits.chart.title"/>
        <PieCharts rows={results}/>
      </If>

      <If value={results}>
        <Title title="plugin.team_commits.results.title"/>
      </If>

      <FakeDataLoader
        content={results}
        watch={hash}
      >
        <View rowsForExcel={results}/>
        <NothingFound />
        <Pagination/>
      </FakeDataLoader>
    </>
  );
});

export default Page;
