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
import Anonymous from './Anonymous';
import All from './All';

function getGroupsByTasks(list: any[]) {
  const withTask: any[] = [];
  const withoutTask: any[] = [];
  list.forEach((pr: any) => {
    if (pr.task) withTask.push(pr);
    else withoutTask.push(pr);
  });
  return [withTask, withoutTask.reverse()];
}

const PR = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const allPR = dataGripStore.dataGrip.pr.statistic;
  const [withTask, withoutTask] = getGroupsByTasks(allPR);
  const longReview = withTask.filter((item: any) => item.daysReview > 4);

  const canShowByReview = (!fullScreen.isOpen || fullScreen.mode === 'all') && longReview.length > 1;
  const canShowByAnonymous = (!fullScreen.isOpen || fullScreen.mode === 'anonymous') && withoutTask.length;

  if (!canShowByReview && !canShowByAnonymous) {
    return mode !== 'print' ? (<NothingFound />) : null;
  }

  const PRbyName = dataGripStore.dataGrip.pr.statisticByName;
  const authorsStat = Object.values(PRbyName);

  return (
    <>
      {!fullScreen.isOpen && canShowByReview && (
        <>
          <Title title="page.team.pr.oneTaskDays"/>
          <Total/>
        </>
      )}

      {canShowByReview ? (
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
          <PageBreak/>
          <Title title="page.team.pr.longDelay"/>
          <DataLoader
            to="response"
            loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
              content: longReview,
              pagination: mode === 'print'
                ? { size: 20 }
                : pagination,
              sort,
            })}
          >
            <All
              mode={mode}
              rowsForExcel={longReview}
            />
            {mode !== 'print' && <Pagination/>}
          </DataLoader>
        </>
      ) : null}

      <PageBreak/>

      {canShowByAnonymous ? (
        <>
          <Title title="page.team.pr.anonymous"/>
          <DataLoader
            to="response"
            loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
              content: withoutTask,
              pagination: mode === 'print'
                ? { size: 20 }
                : pagination,
              sort,
            })}
          >
            <Anonymous
              mode={mode}
              rowsForExcel={withoutTask}
            />
            {mode !== 'print' && <Pagination/>}
          </DataLoader>
        </>
      ) : null}
    </>
  );
});

export default PR;
