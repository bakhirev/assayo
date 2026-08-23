import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/StatisticsByCommitsStore';
import { DataLoader } from 'ts/components/DataLoader';
import sendFakeRequest from 'ts/components/DataLoader/helpers/formatter';
import type Filter from 'ts/components/Layout/Search/interfaces/Filter';
import { Title, NothingFound, SectionWithBg, Search as LayoutSearch, If } from 'ts/components/Layout';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

import View from './components/View';
import Filters from './components/Filters';
import ChangeView from './components/ChangeView';
import ShortInformation from './components/ShortInformation';
import { getDefaultFilters, getOnFilter } from './helpers';

const Tempo = observer(({ user, mode }: PageOptions): React.ReactElement => {
  console.log(user);
  const rows = statisticStore.statisticsByCommits.timestamp.totalInfo.allCommitsByTimestamp || [];
  const defaultFilters = useMemo(() => getDefaultFilters(rows, user?.author), []);
  const [selectedFilters, setSelectedFilters] = useState<Filter>(defaultFilters);
  const [content, setContent] = useState<any>(rows.slice(rows?.length - 6, rows.length));
  const [view, setView] = useState<string>('list');

  if (!rows?.length) return (<NothingFound />);

  return (
    <>
      <Title title="common.filters" />
      <LayoutSearch
        elements={user?.author ? [] : ['author']}
        content={rows}
        defaultFilters={defaultFilters}
        onChange={(newResults: any[], hash: string, filters: Filter) => {
          setContent(newResults);
          setSelectedFilters(filters);
        }}
        onFilter={getOnFilter}
      >
        <Filters />
      </LayoutSearch>

      <Title title="plugin.team_day.tempo.title" />
      <ShortInformation days={content} />
      <If value={mode !== 'print'}>
        <ChangeView
          content={content}
          filters={selectedFilters}
          value={view}
          onChange={setView}
        />
      </If>

      <SectionWithBg>
        <DataLoader
          loader={() => sendFakeRequest({ content })}
          watch={JSON.stringify(selectedFilters)}
        >
          <View
            view={view}
            filters={selectedFilters}
          />
        </DataLoader>
      </SectionWithBg>
    </>
  );
});

export default Tempo;
