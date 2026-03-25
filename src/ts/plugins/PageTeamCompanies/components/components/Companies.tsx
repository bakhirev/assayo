import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import { getDate } from 'ts/helpers/formatter';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';

import Details from './Details';

function Companies({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  const [works, dismissed, none] = [
    'plugin.team_companies.companies.active.yes',
    'plugin.team_companies.companies.active.no',
    'plugin.team_companies.companies.active.none',
  ];

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
        formatter={(row: any) => (
          <Details
            authors={row.authors}
            taskCodes={row.taskCodes}
          />
        )}
      />
      <Column
        isFixed
        template={ColumnTypes.STRING}
        properties="company"
        title="plugin.team_companies.companies.company"
      />
      <Column
        title="plugin.team_companies.companies.status"
        formatter={(row: any) => {
          if (row.isActive) return works;
          if (row?.taskCodes?.[0]?.totalDays > 30) return dismissed;
          return none;
        }}
        template={ColumnTypes.TAGS}
        width={140}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="from"
        title="plugin.team_companies.companies.from"
        width={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="to"
        title="plugin.team_companies.companies.to"
        width={130}
        formatter={getDate}
      />
      <Column
        isSortable
        template={ColumnTypes.SHORT_NUMBER}
        title="plugin.team_companies.companies.totalDays"
        properties="totalDaysWorked"
        width={140}
      />
      <Column
        isSortable
        template={ColumnTypes.SHORT_NUMBER}
        title="plugin.team_companies.companies.totalTasks"
        properties="totalTasks"
        width={90}
      />
      <Column
        isSortable
        template={ColumnTypes.SHORT_NUMBER}
        title="plugin.team_companies.companies.totalTaskCodes"
        properties="totalTaskCodes"
        width={90}
      />
      <Column
        isSortable
        template={ColumnTypes.SHORT_NUMBER}
        title="plugin.team_companies.companies.totalAuthors"
        properties="totalAuthors"
        width={110}
      />
    </DataView>
  );
}

Companies.defaultProps = {
  response: undefined,
};

export default Companies;
