import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import fullScreen from 'ts/store/FullScreen';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import { getFakeLoader } from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import Title from 'ts/components/Title';

import Companies from './components/Companies';
import CompanyCharts from './components/Charts';

const Company = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const content = dataGripStore.dataGrip.company.statistic;

  if (!content?.length) {
    return mode !== 'print' ? (<NothingFound />) : null;
  }

  return (
    <>
      {!fullScreen.isOpen && (
        <CompanyCharts />
      )}
      <Title title="page.team.company.title"/>
      <DataLoader
        to="response"
        loader={getFakeLoader(content, mode)}
        watch={`${mode}${dataGripStore.hash}`}
      >
        <Companies
          mode={mode}
          rowsForExcel={content}
        />
        <Pagination />
      </DataLoader>
    </>
  );
});

export default Company;
