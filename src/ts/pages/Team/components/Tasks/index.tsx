import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import { getFakeLoader } from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import Title from 'ts/components/Title';
import PageWrapper from 'ts/components/Page/wrapper';

import BacklogCharts from './BacklogCharts';
import Filters from './Filters';
import View from './View';

interface IFilters {
  user: number;
  company: number;
}

function getContentByFilters(content: any, filters: IFilters) {
  if (filters.user) {
    const author = dataGripStore.dataGrip.author.statistic?.[filters.user]?.author;
    return author
      ? content.filter((task: any) => {
        return task.author === author || task.authors?.[author];
      })
      : content;
  }

  if (filters.company) {
    const employments = dataGripStore.dataGrip.company.statistic?.[filters.company].employments;
    const employmentInCompany = new Map(employments.map((key: string) => [key, true]));
    return employments?.length
      ? content.filter((task: any) => employmentInCompany.has(task.author))
      : content;
  }

  return content;
}

const Tasks = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.tasks.statistic;
  const backlogRows = rows
    .filter((task: any) => task.daysInJira > 90);

  const [filters, setFilters] = useState<any>({ user: 0, company: 0 });
  const content = getContentByFilters(rows, filters);
  const backlogContent = getContentByFilters(backlogRows, filters);
  const hash = [
    mode,
    dataGripStore.hash,
    filters.user,
    filters.company,
    content.length,
    backlogContent.length,
  ].join('.');

  if (!rows?.length) return mode !== 'print' ? (<NothingFound />) : null;

  return (
    <>
      <Title title="common.filters"/>
      <PageWrapper>
        <Filters
          filters={filters}
          onChange={setFilters}
        />
      </PageWrapper>
      <DataLoader
        to="response"
        loader={getFakeLoader(content, mode)}
        watch={hash}
      >
        <View
          mode={mode}
          rowsForExcel={rows}
        />
        <Pagination/>
      </DataLoader>

      <Title title="page.team.tasks.backlogTitle"/>
      <BacklogCharts
        content={backlogContent}
        allTaskNumber={content.length}
        backlogTaskNumber={backlogContent.length}
      />
      <br/>
      <br/>
      <br/>
      <DataLoader
        to="response"
        loader={getFakeLoader(backlogContent, mode)}
        watch={hash}
      >
        <View
          mode={mode}
          rowsForExcel={backlogContent}
        />
        <Pagination/>
      </DataLoader>
    </>
  );
});

export default Tasks;
