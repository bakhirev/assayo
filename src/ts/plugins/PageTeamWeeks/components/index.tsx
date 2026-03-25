import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { Title, NothingFound, Gap } from 'ts/components/Layout';
import Recommendations from 'ts/components/Recommendations';

import View from './View';

const Week = observer(({
  mode,
}: PageOptions): React.ReactElement | null => {
  const rows = statisticStore.statisticsByCommits.week.totalInfo;
  if (!rows?.length) return mode !== 'print' ? (<NothingFound />) : null;
  const recommendations = statisticStore.statisticsByCommits.recommendations.team?.byWeek;

  return (
    <>
      {mode !== 'fullscreen' && (
        <Recommendations
          mode={mode}
          recommendations={recommendations}
        />
      )}
      {mode === 'print' ? (
        <Title title="plugin.team_weeks.title"/>
      ) : (
        <Gap height={48}/>
      )}
      <FakeDataLoader
        content={rows}
        mode={mode}
        watch={`${mode}${statisticStore.hash}`}
      >
        <View
          mode={mode}
          rowsForExcel={rows}
        />
        {mode !== 'print' && <Pagination />}
      </FakeDataLoader>
    </>
  );
});

export default Week;
