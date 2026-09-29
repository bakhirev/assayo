import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/StatisticsByCommitsStore';

import type Filter from 'ts/components/Layout/Search/interfaces/Filter';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { Title, NothingFound, Search as LayoutSearch } from 'ts/components/Layout';
import Recommendations from 'ts/components/Recommendations';

import getRecommendations from './helpers/recommendations';
import WeekInfo from './WeekInfo';
import View from './View';
import { getDefaultFilters } from './Filters/helpers';
import Filters from './Filters';

const Week = observer(({
  mode,
}: PageOptions): React.ReactElement | null => {
  const rows = statisticStore.statisticsByCommits.week.totalInfo;
  if (!rows?.length) return mode !== 'print' ? (<NothingFound />) : null;

  const defaultFilters = useMemo(() => getDefaultFilters(rows), []);
  const [selectedFilters, setSelectedFilters] = useState<Filter>(defaultFilters);
  const recommendations = getRecommendations();

  return (
    <>
      <Title title="common.filters" />
      <Filters
        rows={rows}
        filters={selectedFilters}
        onChange={setSelectedFilters}
      />
      <WeekInfo weeks={rows} index={selectedFilters.index} />

      {mode !== 'fullscreen' && (
        <Recommendations
          mode={mode}
          recommendations={recommendations}
        />
      )}
      <Title title="plugin.team_weeks.title"/>
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
