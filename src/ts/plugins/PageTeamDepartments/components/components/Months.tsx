import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import { getCustomDate } from 'ts/helpers/formatter';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import { getMaxValues } from 'ts/helpers/getMax';

interface MonthsProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

export function Months({ response, updateSort, rowsForExcel, mode }: MonthsProps) {
  if (!response) return null;

  const [allAuthorsMax] = getMaxValues(response, ['allAuthors']);

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
        title="page.team.department.months.date"
        template={(row: any, b: any, index: number) => {
          const next = response.content[index + 1];
          const value = getCustomDate(row.date, {  month: 'long', year: 'numeric' });
          return next?.year !== row.year
            ? (<b>{value}</b>)
            : value;
        }}
      />
      <Column
        template={ColumnTypes.NUMBER}
        properties="tasks"
        title="page.team.department.months.tasks"
        width={100}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="tasksInWeek"
        title="page.team.department.months.tasksInWeek"
        width={100}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="fixed"
        title="page.team.department.months.fixed"
        width={100}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="authors"
        title="page.team.department.months.authors"
        width={150}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="allAuthors"
        width={70}
      />
      <Column
        isSortable
        minWidth={200}
        properties="allAuthors"
        title="page.team.department.months.allAuthors"
        template={(value: number) => (
          <LineChart
            value={value}
            max={allAuthorsMax}
            suffix="page.team.department.months.allAuthors"
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
