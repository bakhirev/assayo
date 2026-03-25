import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';

import type Filter from 'ts/components/Layout/Search/interfaces/Filter';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { Title, NothingFound, Gap, Search as LayoutSearch, If } from 'ts/components/Layout';
import Countries from './components/Countries';
import CountryCharts from './components/Charts';
import fullScreen from 'ts/store/FullScreen';

import Filters from './components/Filters';
import Travel from './components/Travel';
import CustomMap from './components/Map';

import { getCountryByAuthors, getDefaultFilters, getOnFilter } from './helpers';

const Country = observer(({
  mode,
}: PageOptions): React.ReactElement | null => {
  const defaultFilters = useMemo(() => getDefaultFilters(), []);
  const [selectedFilters, setSelectedFilters] = useState<Filter>(defaultFilters);

  const statisticsByAuthor = statisticStore.statisticsByCommits.author;
  const examples = statisticsByAuthor.list.slice(0, 4);
  const [authors, setAuthors] = useState<any>(statisticsByAuthor.totalInfo);

  const dataGripCountries = statisticStore.statisticsByCommits.country.totalInfo;
  const countries = useMemo(() => (
    dataGripCountries.map(getCountryByAuthors(authors)).filter((v: any) => v)
  ), [dataGripCountries, selectedFilters.hash]);

  const travel = useMemo(() => (
    authors
      .filter((dot: any) => dot?.countries?.length)
      .sort((a: any, b: any) => b?.countries?.length - a?.countries?.length)
  ), [authors, selectedFilters.hash]);

  const canShowByCountries = (!fullScreen.isOpen || fullScreen.mode === 'countries');
  const canShowByTravel = (!fullScreen.isOpen || fullScreen.mode === 'travel') && travel.length;

  if (!dataGripCountries?.length) {
    return mode !== 'print' ? (<NothingFound/>) : null;
  }

  return (
    <>
      <If value={!fullScreen.isOpen}>
        <Title title="common.filters"/>
        <LayoutSearch
          content={statisticsByAuthor.totalInfo}
          properties="author"
          elements={['search', 'company', 'author']}
          examples={examples}
          defaultFilters={defaultFilters}
          onChange={(newResults: any[], hash: string, filters: Filter) => {
            setAuthors(newResults);
            setSelectedFilters(filters);
          }}
          onFilter={getOnFilter}
        >
          <Filters/>
        </LayoutSearch>
        <CustomMap authors={authors}/>
        <Gap height="xxl"/>
        <CountryCharts
          authors={authors}
          countries={countries}
        />
      </If>

      <If value={canShowByCountries}>
        <Title title="plugin.team_country.table.title"/>
        <FakeDataLoader
          content={countries}
          mode={mode}
          watch={`${mode}${statisticStore.hash}${selectedFilters.hash}`}
        >
          <Countries
            mode={mode}
            rowsForExcel={countries}
          />
          <Pagination/>
        </FakeDataLoader>
      </If>

      <If value={canShowByTravel}>
        <Title title="plugin.team_country.travel.title"/>
        <FakeDataLoader
          content={travel}
          mode={mode}
          watch={`${mode}${statisticStore.hash}${selectedFilters.hash}`}
        >
          <Travel
            mode={mode}
            rowsForExcel={countries}
          />
          <Pagination/>
        </FakeDataLoader>
      </If>
    </>
  );
});

export default Country;
