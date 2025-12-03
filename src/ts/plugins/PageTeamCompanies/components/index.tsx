import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import fullScreen from 'ts/store/FullScreen';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { Title, NothingFound } from 'ts/components/Layout';

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
      <FakeDataLoader
        content={content}
        mode={mode}
        watch={`${mode}${dataGripStore.hash}`}
      >
        <Companies
          mode={mode}
          rowsForExcel={content}
        />
        <Pagination />
      </FakeDataLoader>
    </>
  );
});

export default Company;
