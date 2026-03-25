import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import { getCustomDate } from 'ts/helpers/formatter';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import { getMaxValues } from 'ts/helpers/charts';

export function Months({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  const [allAuthorsMax] = getMaxValues(response, ['allUsersInDepartment']);

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
        title="common.statistic.Date"
        width={150}
        template={(row: any, b: any, index: number) => {
          const next = response.content[index + 1];
          const value = getCustomDate(`${row.year}-${row.month + 1}-01`, {  month: 'long', year: 'numeric' });
          return next?.year !== row.year
            ? (<b>{value}</b>)
            : value;
        }}
      />
      <Column
        template={ColumnTypes.NUMBER}
        properties="newTaskInMonth"
        title="plugin.team_departments.months.newTaskInMonth"
        width={100}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="tasksFixedThisGroup"
        title="plugin.team_departments.months.tasksFixedThisGroup"
        width={100}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="tasksInBacklog"
        title="plugin.team_departments.months.tasksInBacklog"
        width={100}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="programmistInThisGroup"
        title="plugin.team_departments.months.programmistInThisGroup"
        width={150}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="allProgrammistInDepartment"
        title="plugin.team_departments.months.allProgrammistInDepartment"
        width={150}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="allMiddleUsersInDepartment"
        width={70}
      />
      <Column
        isSortable
        minWidth={200}
        properties="allMiddleUsersInDepartment"
        title="plugin.team_departments.months.allUsersInDepartment"
        template={(value: number) => (
          <LineChart
            value={value}
            max={allAuthorsMax}
            suffix="plugin.team_departments.months.allAuthors"
          />
        )}
      />
    </DataView>
  );
}

Months.defaultProps = {
  response: undefined,
};

export default Months;
