import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import { getDate } from 'ts/helpers/formatter';
import { getMaxValues } from 'ts/helpers/charts';
import { Column, ColumnTypes } from 'ts/components/Table';
import { DataView } from 'ts/components/Layout';
import { LineChart } from 'ts/components/Charts';

interface EmploymentsProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function TaskCodes({
  response,
  updateSort,
  rowsForExcel,
  mode,
}: EmploymentsProps): React.ReactElement | null {
  if (!response) return null;

  const [daysMax, tasksMax] = getMaxValues(response, ['totalDaysWorked', 'totalTasks']);

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      mode={mode}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
    >
      <Column
        isFixed
        width={200}
        template={ColumnTypes.STRING}
        properties="taskCode"
        title="plugin.team_companies.taskCodes.taskCode"
      />
      <Column
        properties="isActive"
        width={140}
        title="plugin.team_companies.taskCodes.status"
        formatter={(value: boolean) => (
          value
            ? 'plugin.team_companies.taskCodes.active.yes'
            : 'plugin.team_companies.taskCodes.active.no'
        )}
        template={ColumnTypes.TAGS}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        properties="firstCommit"
        width={130}
        formatter={getDate}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        properties="lastCommit"
        width={130}
        formatter={getDate}
      />
      <Column
        isSortable
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalAuthors"
        width={120}
        title="plugin.team_companies.taskCodes.totalAuthors"
      />
      <Column
        isSortable
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalDaysWorked"
        width={90}
      />
      <Column
        isSortable
        width={150}
        properties="totalDaysWorked"
        title="plugin.team_companies.taskCodes.totalDays"
        template={(value: number) => (
          <LineChart
            value={value}
            max={daysMax}
            suffix="common.statistic.days"
          />
        )}
      />
      <Column
        isSortable
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalTasks"
        width={90}
      />
      <Column
        isSortable
        properties="totalTasks"
        title="plugin.team_companies.taskCodes.totalTasks"
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

export default TaskCodes;
