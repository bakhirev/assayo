import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { Title, NothingFound, Section } from 'ts/components/Layout';

import BacklogCharts from './components/BacklogCharts';
import Filters from './components/Filters';
import View from './components/View';

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
      <Section>
        <Filters
          filters={filters}
          onChange={setFilters}
        />
      </Section>
      <FakeDataLoader
        content={content}
        mode={mode}
        watch={hash}
      >
        <View
          mode={mode}
          rowsForExcel={rows}
        />
        <Pagination/>
      </FakeDataLoader>

      <Title title="page.team.tasks.backlogTitle"/>
      <BacklogCharts
        content={backlogContent}
        allTaskNumber={content.length}
        backlogTaskNumber={backlogContent.length}
      />
      <br/>
      <br/>
      <br/>
      <FakeDataLoader
        content={backlogContent}
        mode={mode}
        watch={hash}
      >
        <View
          mode={mode}
          rowsForExcel={backlogContent}
        />
        <Pagination/>
      </FakeDataLoader>
    </>
  );
});

export default Tasks;
