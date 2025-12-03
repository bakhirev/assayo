import React from 'react';
import { observer } from 'mobx-react-lite';

import ICommit from 'ts/interfaces/Commit';
import { IPagination } from 'ts/interfaces/Pagination';
import { getDate } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import { FakeDataLoader } from 'ts/components/DataLoader';
import { Title, NothingFound, DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import { getMaxValues } from 'ts/helpers/getMax';

import Tasks from '../../PageTeamFiles/Files/Tasks';

interface CompaniesProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function View({ response, updateSort, rowsForExcel, mode }: CompaniesProps) {
  if (!response) return null;

  const [linesMax, tasksMax, daysMax] = getMaxValues(response, ['lines', 'totalTasks', 'totalDays']);

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
        template={ColumnTypes.DETAILS}
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
        template={ColumnTypes.STRING}
        properties="pathString"
        title="page.team.refactor.path"
        width={400}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="firstCommit"
        title="page.team.refactor.firstCommit"
        width={130}
        formatter={(commit: ICommit) => getDate(commit.timestamp)}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
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
            value={value}
            max={linesMax}
            suffix="page.team.refactor.lines"
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
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
            value={value}
            max={daysMax}
            suffix="page.team.author.days"
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
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
            value={value}
            max={tasksMax}
            suffix="page.team.refactor.tasks"
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
      <FakeDataLoader
        content={content}
        mode={mode}
      >
        <View mode={mode} />
      </FakeDataLoader>
    </>
  );
});

export default Refactor;

