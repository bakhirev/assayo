import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import { getCustomDate } from 'ts/helpers/formatter';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import { getMax } from 'ts/pages/Common/helpers/getMax';

interface MonthsProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

export function Months({ response, updateSort, rowsForExcel, mode }: MonthsProps) {
  if (!response) return null;

  const allAuthorsChart = getOptions({
    max: getMax(response, 'allAuthors'),
    suffix: 'page.team.department.months.allAuthors',
  });

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
        width={150}
      />
      <Column
        template={ColumnTypesEnum.NUMBER}
        properties="tasks"
        title="page.team.department.months.tasks"
        width={100}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="tasksInWeek"
        title="page.team.department.months.tasksInWeek"
        width={100}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="fixed"
        title="page.team.department.months.fixed"
        width={100}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="authors"
        title="page.team.department.months.authors"
        width={150}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="allAuthors"
        width={70}
      />
      <Column
        isSortable
        width={200}
        properties="allAuthors"
        title="page.team.department.months.allAuthors"
        template={(value: number) => (
          <LineChart
            options={allAuthorsChart}
            value={value}
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
