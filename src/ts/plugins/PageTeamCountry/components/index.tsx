import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { Title, NothingFound } from 'ts/components/Layout';
import Countries from './components/Countries';
import CountryCharts from './components/Charts';
import fullScreen from 'ts/store/FullScreen';

import IFilters from './interfaces/Filters';
import Filters from './components/Filters';
import Travel from './components/Travel';
import CustomMap from './components/Map';

import { getCountryByAuthors, getDefaultFilters, getFilterForAuthors } from './helpers';

const Country = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const [filters, setFilters] = useState<IFilters>(getDefaultFilters());

  const dataGripAuthors = dataGripStore.dataGrip.author.statistic;
  const authors = useMemo(() => (
    dataGripAuthors.filter(getFilterForAuthors(filters))
  ), [dataGripAuthors, filters.hash]);

  const dataGripCountries = dataGripStore.dataGrip.country.statistic;
  const countries = useMemo(() => (
    dataGripCountries.map(getCountryByAuthors(authors)).filter((v: any) => v)
  ), [dataGripCountries, filters.hash]);

  const travel = useMemo(() => (
    authors
      .filter((dot: any) => dot?.country?.length)
      .sort((a: any, b: any) => b?.country?.length - a?.country?.length)
  ), [authors, filters.hash]);

  const canShowByCountries = (!fullScreen.isOpen || fullScreen.mode === 'countries');
  const canShowByTravel = (!fullScreen.isOpen || fullScreen.mode === 'travel') && travel.length;

  if (!dataGripCountries?.length) {
    return mode !== 'print' ? (<NothingFound/>) : null;
  }

  return (
    <>
      {!fullScreen.isOpen && (
        <>
          <Filters
            filters={filters}
            onChange={setFilters}
          />
          <CustomMap authors={authors} />
          <CountryCharts
            authors={authors}
            countries={countries}
          />
        </>
      )}

      {canShowByCountries ? (
        <>
          <Title title="page.team.country.table.title"/>
          <FakeDataLoader
            content={countries}
            mode={mode}
            watch={`${mode}${dataGripStore.hash}${filters.hash}`}
          >
            <Countries
              mode={mode}
              rowsForExcel={countries}
            />
            <Pagination/>
          </FakeDataLoader>
        </>
      ) : null}

      {canShowByTravel ? (
        <>
          <Title title="page.team.country.travel.title"/>
          <FakeDataLoader
            content={travel}
            mode={mode}
            watch={`${mode}${dataGripStore.hash}${filters.hash}`}
          >
            <Travel
              mode={mode}
              rowsForExcel={countries}
            />
            <Pagination/>
          </FakeDataLoader>
        </>
      ) : null}
    </>
  );
});

export default Country;
