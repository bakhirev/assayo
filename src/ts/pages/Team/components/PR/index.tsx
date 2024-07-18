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
import PageBreak from 'ts/pages/Common/components/PageBreak';
import fullScreen from 'ts/store/FullScreen';

import Total from './Total';
import Authors from './Authors';
import All from './All';

const PR = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const allPR = dataGripStore.dataGrip.pr.statistic;
  const rows = allPR.filter((item: any) => item.delayDays > 3);
  if (rows?.length < 2) return mode !== 'print' ? (<NothingFound />) : null;

  const PRbyName = dataGripStore.dataGrip.pr.statisticByName;
  const authorsStat = Object.values(PRbyName);

  return (
    <>
      {!fullScreen.isOpen && (
        <>
          <Title title="page.team.pr.oneTaskDays"/>
          <Total/>
        </>
      )}

      {!fullScreen.isOpen || fullScreen.mode === 'author' ? (
        <>
          <Title title="page.team.pr.statByAuthors"/>
          <DataLoader
            to="response"
            loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
              content: authorsStat, pagination, sort, mode,
            })}
          >
            <Authors
              mode={mode}
              rowsForExcel={authorsStat}
            />
            <Pagination/>
          </DataLoader>
        </>
      ) : null}

      <PageBreak/>

      {!fullScreen.isOpen || fullScreen.mode === 'all' ? (
        <>
          <Title title="page.team.pr.longDelay"/>
          <DataLoader
            to="response"
            loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
              content: rows,
              pagination: mode === 'print'
                ? { size: 20 }
                : pagination,
              sort,
            })}
          >
            <All
              mode={mode}
              rowsForExcel={rows}
            />
            {mode !== 'print' && <Pagination/>}
          </DataLoader>
        </>
      ) : null}
    </>
  );
});

export default PR;
