import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import Recommendations from 'ts/components/Recommendations';
import { Title, Description, NothingFound, Gap } from 'ts/components/Layout';

import PieCharts from './components/PieCharts';
import View from './components/View';

const Author = observer(({
  mode,
}: PageOptions): React.ReactElement | null => {
  const rows = statisticStore.statisticsByCommits.author.totalInfo;

  if (!rows?.length) {
    return mode !== 'print' ? (<NothingFound />) : null;
  }
  const recommendations = statisticStore.statisticsByCommits.recommendations.team?.byAuthor;

  return (
    <>
      {mode !== 'fullscreen' && (
        <Recommendations
          mode={mode}
          recommendations={recommendations}
        />
      )}

      <Gap height="xl"/>
      <PieCharts/>

      <Title title="plugin.team_author.title"/>
      <FakeDataLoader
        content={rows}
        mode={mode}
        watch={`${mode}${statisticStore.hash}`}
      >
        <View
          mode={mode}
          rowsForExcel={rows}
        />
        <Pagination/>
      </FakeDataLoader>

      <Description translationId="plugin.team_author.description1" />
    </>
  );
});

export default Author;
