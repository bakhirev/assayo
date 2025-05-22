import React from 'react';
import { observer } from 'mobx-react-lite';

import ICommit from 'ts/interfaces/Commit';
import { IPagination } from 'ts/interfaces/Pagination';
import { getDate } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import DataLoader from 'ts/components/DataLoader';
import { getFakeLoader } from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import Title from 'ts/components/Title';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import { getMax } from 'ts/pages/Common/helpers/getMax';

import Tasks from './Files/Tasks';

interface CompaniesProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function View({ response, updateSort, rowsForExcel, mode }: CompaniesProps) {
  if (!response) return null;

  const linesChart = getOptions({ max: getMax(response, 'lines'), suffix: 'page.team.refactor.lines' });
  const taskChart = getOptions({ max: getMax(response, 'totalTasks'), suffix: 'page.team.refactor.tasks' });
  const daysChart = getOptions({ max: getMax(response, 'totalDays'), suffix: 'page.team.author.days' });

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
    >
      <Column
        isFixed
        template={ColumnTypesEnum.DETAILS}
        width={40}
        properties="tasks"
        formatter={(row: any) => {
          const content = Array.from(row?.tasks)
            .reverse()
            .map((taskId: any) => dataGripStore.dataGrip.tasks.statisticByName.get(taskId))
            .filter(v => v);
          return (
            <Tasks // @ts-ignore
              response={{ content }}
              mode="details"
            />
          );
        }}
      />
      <Column
        isFixed
        template={ColumnTypesEnum.STRING}
        properties="pathString"
        title="page.team.refactor.path"
        width={400}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        properties="firstCommit"
        title="page.team.refactor.firstCommit"
        width={130}
        formatter={(commit: ICommit) => getDate(commit.timestamp)}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="lines"
        width={90}
      />
      <Column
        isSortable="lines"
        title="page.team.refactor.totalLines"
        properties="lines"
        minWidth={150}
        template={(value: number) => (
          <LineChart
            options={linesChart}
            value={value}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="totalDays"
        width={90}
      />
      <Column
        isSortable="totalDays"
        title="page.team.refactor.totalDays"
        properties="totalDays"
        minWidth={150}
        template={(value: number) => (
          <LineChart
            options={daysChart}
            value={value}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="totalTasks"
        width={90}
      />
      <Column
        isSortable="totalTasks"
        title="page.team.refactor.totalTasks"
        properties="totalTasks"
        minWidth={150}
        template={(value: number) => (
          <LineChart
            options={taskChart}
            value={value}
          />
        )}
      />
    </DataView>
  );
}

View.defaultProps = {
  response: undefined,
};

const Refactor = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const content = dataGripStore.fileGrip.refactor.files;

  if (!content?.length) {
    return <NothingFound />;
  }

  return (
    <>
      <Title title="page.team.refactor.title"/>
      <DataLoader
        to="response"
        loader={getFakeLoader(content, mode)}
      >
        <View mode={mode} />
      </DataLoader>
    </>
  );
});

export default Refactor;

