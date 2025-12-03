import React from 'react';
import { observer } from 'mobx-react-lite';

import ISort from 'ts/interfaces/Sort';
import { IPaginationRequest } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import { DataLoader, Pagination, FakeDataLoader, sendFakeRequest } from 'ts/components/DataLoader';
import { Title, NothingFound } from 'ts/components/Layout';
import PageBreak from 'ts/pages/Common/components/PageBreak';
import fullScreen from 'ts/store/FullScreen';

import Total from './components/Total';
import Authors from './components/Authors';
import Anonymous from './components/Anonymous';
import All from './components/All';

function getGroupsByTasks(list: any[]) {
  const withTask: any[] = [];
  const withoutTask: any[] = [];
  list.forEach((pr: any) => {
    if (pr.task) withTask.push(pr);
    else withoutTask.push(pr);
  });
  return [withTask, withoutTask.reverse()];
}

const PullRequests = observer(({
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
          <FakeDataLoader
            content={authorsStat}
            mode={mode}
          >
            <Authors
              mode={mode}
              rowsForExcel={authorsStat}
            />
            <Pagination/>
          </FakeDataLoader>
          <PageBreak/>
          <Title title="page.team.pr.longDelay"/>
          <DataLoader
            loader={(pagination?: IPaginationRequest, sort?: ISort[]) => sendFakeRequest({
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
            loader={(pagination?: IPaginationRequest, sort?: ISort[]) => sendFakeRequest({
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

export default PullRequests;
