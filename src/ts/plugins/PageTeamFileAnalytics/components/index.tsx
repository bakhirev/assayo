import React from 'react';
import { observer } from 'mobx-react-lite';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

import statisticStore from 'ts/store/Statistics';
import { If, NothingFound, Title } from 'ts/components/Layout';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';

import Extensions from './components/Extensions';
import Types from './components/Types';
import PieChart from './components/PieCharts';

const FileAnalytics = observer(({
  mode,
}: PageOptions): React.ReactElement | null => {
  const types = statisticStore.statisticsByFiles.type.totalInfo;
  const extensions = statisticStore.statisticsByFiles.extension.totalInfo;

  if (!types?.length && !extensions?.length) {
    return <NothingFound />;
  }

  return (
    <>
      <If value={extensions}>
        <Title title="plugin.team_file_analytics.extension.title"/>
        <PieChart
          property="extension"
          rows={extensions}
        />
        <Title title="plugin.team_file_analytics.extension.view"/>
        <FakeDataLoader
          content={extensions}
          mode={mode}
          watch={`${mode}${statisticStore.hash}`}
        >
          <Extensions
            mode={mode}
            rowsForExcel={extensions}
          />
          <Pagination />
          <NothingFound />
        </FakeDataLoader>
      </If>

      <If value={types}>
        <Title title="plugin.team_file_analytics.type.title"/>
        <PieChart
          property="type"
          rows={types}
        />
        <FakeDataLoader
          content={types}
          mode={mode}
          watch={`${mode}${statisticStore.hash}`}
        >
          <Types
            mode={mode}
            rowsForExcel={types}
          />
          <Pagination />
          <NothingFound />
        </FakeDataLoader>
      </If>
    </>
  );
});

export default FileAnalytics;
