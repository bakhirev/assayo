import React from 'react';
import { observer } from 'mobx-react-lite';

import { IPaginationRequest } from 'ts/interfaces/Pagination';
import ISort from 'ts/interfaces/Sort';
import dataGripStore from 'ts/store/DataGrip';
import fullScreen from 'ts/store/FullScreen';

import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import getFakeLoader from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import Title from 'ts/components/Title';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';

import Departments from './components/Departments';
import DepartmentCharts from './components/Charts';

const Department = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const content = dataGripStore.dataGrip.taskCodes.statistic
    .filter((item: any) => item.totalDaysWorked > 10);

  if (!content?.length) {
    return <NothingFound />;
  }

  return (
    <>
      {!fullScreen.isOpen && (
        <DepartmentCharts/>
      )}
      <Title title="page.team.department.title"/>
      <DataLoader
        to="response"
        loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
          content, pagination, sort, mode,
        })}
      >
        <Departments />
        <Pagination />
      </DataLoader>
    </>
  );
});

export default Department;

