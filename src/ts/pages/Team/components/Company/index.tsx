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
import Companies from './components/Companies';
import CompanyCharts from './components/Charts';

const Company = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const companyRows = dataGripStore.dataGrip.company.statistic;

  if (!companyRows?.length) {
    return mode !== 'print' ? (<NothingFound />) : null;
  }

  return (
    <>
      <CompanyCharts />
      <Title title="page.team.company.title"/>
      <DataLoader
        to="response"
        loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
          content: companyRows, pagination, sort, mode,
        })}
        watch={`${mode}${dataGripStore.hash}`}
      >
        <Companies
          mode={mode}
          rowsForExcel={companyRows}
        />
        <Pagination />
      </DataLoader>
    </>
  );
});

export default Company;
