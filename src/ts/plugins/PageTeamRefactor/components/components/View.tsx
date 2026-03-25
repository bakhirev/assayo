import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import statisticStore from 'ts/store/Statistics';
import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { getMaxValues } from 'ts/helpers/charts';

import Tasks from './Tasks';

function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  const taskByName = statisticStore.statisticsByCommits.tasks.totalInfoByName;
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
        formatter={(row: any) => {
          const content = Array.from(row?.tasks)
            .reverse()
            .map((taskId: any) => taskByName.get(taskId))
            .filter(v => v);
          return (
            <FakeDataLoader content={content}>
              <Tasks />
              <Pagination />
            </FakeDataLoader>
          );
        }}
      />
      <Column
        isFixed
        template={ColumnTypes.STRING}
        properties="pathString"
        title="plugin.team_refactor.view.path"
        width={400}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="lines"
        width={90}
      />
      <Column
        isSortable="lines"
        title="plugin.team_refactor.view.lines"
        properties="lines"
        minWidth={150}
        template={(value: number) => (
          <LineChart
            value={value}
            max={linesMax}
            suffix="plugin.team_refactor.lines"
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
        title="plugin.team_refactor.view.totalDays"
        properties="totalDays"
        minWidth={150}
        template={(value: number) => (
          <LineChart
            value={value}
            max={daysMax}
            suffix="common.statistic.days"
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
        title="plugin.team_refactor.view.totalTasks"
        properties="totalTasks"
        minWidth={150}
        template={(value: number) => (
          <LineChart
            value={value}
            max={tasksMax}
            suffix="common.statistic.tasks"
          />
        )}
      />
    </DataView>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;

