import React from 'react';
import { observer } from 'mobx-react-lite';

import ISort from 'ts/interfaces/Sort';
import { IPaginationRequest } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import getFakeLoader from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import Title from 'ts/components/Title';
import Countries from './components/Countries';
import CountryCharts from './components/Charts';
import TimeZoneMap from 'ts/components/TimeZoneMap';
import PageWrapper from 'ts/components/Page/Box';

import Travel from './components/Travel';

const Country = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const authors = dataGripStore.dataGrip.author.statistic;
  const countryRows = dataGripStore.dataGrip.country.statistic;
  const travel = authors.filter((dot: any) => dot?.country?.length)
    .sort((a: any, b: any) => b?.country?.length - a?.country?.length);

  if (!countryRows?.length) {
    return mode !== 'print' ? (<NothingFound/>) : null;
  }

  return (
    <>
      <PageWrapper>
        <Title title="page.team.country.byTimezone"/>
        <TimeZoneMap authors={authors}/>
      </PageWrapper>
      <CountryCharts/>
      <Title title="page.team.country.table.title"/>
      <DataLoader
        to="response"
        loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
          content: countryRows, pagination, sort, mode,
        })}
        watch={`${mode}${dataGripStore.hash}`}
      >
        <Countries
          mode={mode}
          rowsForExcel={countryRows}
        />
        <Pagination/>
      </DataLoader>
      {travel.length ? (
        <>
          <Title title="page.team.country.travel.title"/>
          <DataLoader
            to="response"
            loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
              content: travel, pagination, sort, mode,
            })}
            watch={`${mode}${dataGripStore.hash}`}
          >
            <Travel
              mode={mode}
              rowsForExcel={countryRows}
            />
            <Pagination/>
          </DataLoader>
        </>
      ) : null}
    </>
  );
});

export default Country;
