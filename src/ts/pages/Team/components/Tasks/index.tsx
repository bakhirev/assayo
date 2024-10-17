import React, { useState } from 'react';
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
import PageWrapper from 'ts/components/Page/wrapper';

import Filters from './Filters';
import View from './View';

const Tasks = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.tasks.statistic;
  const [filters, setFilters] = useState<any>({ user: 0, company: 0 });

  if (!rows?.length) return mode !== 'print' ? (<NothingFound />) : null;

  return (
    <>
      <Title title="common.filters" />
      <PageWrapper>
        <Filters
          filters={filters}
          onChange={setFilters}
        />
      </PageWrapper>
      <DataLoader
        to="response"
        loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
          content: rows, pagination, sort, mode,
        })}
        watch={`${mode}${dataGripStore.hash}`}
      >
        <View
          mode={mode}
          rowsForExcel={rows}
        />
        <Pagination />
      </DataLoader>
    </>
  );
});

export default Tasks;
