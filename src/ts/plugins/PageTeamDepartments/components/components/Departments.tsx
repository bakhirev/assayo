import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import { getDate } from 'ts/helpers/formatter';
import { getMaxValues } from 'ts/helpers/charts';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import statisticStore from 'ts/store/Statistics';

import Employments from './Employments';

function getAuthorDetails(row: any, works: string, dismissed: string, staff: string) {
  const getAuthor = statisticStore.statisticsByCommits.author.totalInfoByName;
  const details = { [works]: 0, [dismissed]: 0, [staff]: 0 };
  (row?.authors || []).forEach((author: any) => {
    const item = getAuthor.get(author.author);
    if (item?.isStaff) details[staff] += 1;
    else if (item?.isDismissed) details[dismissed] += 1;
    else details[works] += 1;
  });
  return details;
}

function Departments({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  const [active, notActive] = [
    'plugin.team_departments.active.yes',
    'plugin.team_departments.active.no',
  ];

  const [works, dismissed, staff] = [
    'plugin.team_departments.author.work',
    'plugin.team_departments.author.dismissed',
    'plugin.team_departments.author.staff',
  ];

  const [daysMax, authorsMax, tasksMax] = getMaxValues(response, [
    'totalDays', 'totalAuthors', 'tasks',
  ]);

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
          <FakeDataLoader
            content={row.authors}
            mode="details"
          >
            <Employments mode="details" />
            <Pagination />
          </FakeDataLoader>
        )}
      />
      <Column
        isFixed
        template={ColumnTypes.STRING}
        properties="taskCode"
        title="plugin.team_departments.code"
      />
      <Column
        title="plugin.team_departments.status"
        formatter={(row: any) => (row.isActive ? active : notActive)}
        template={ColumnTypes.TAGS}
        width={140}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="from"
        title="plugin.team_departments.from"
        width={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="to"
        title="plugin.team_departments.to"
        width={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalDaysWorked"
        width={90}
      />
      <Column
        isSortable="totalDays"
        title="plugin.team_departments.totalDays"
        properties="totalDaysWorked"
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
        properties="tasks"
        width={90}
      />
      <Column
        isSortable
        title="plugin.team_departments.totalTasks"
        properties="tasks"
        minWidth={150}
        template={(value: number) => (
          <LineChart
            value={value}
            max={tasksMax}
            suffix="common.statistic.tasks"
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalAuthors"
        width={90}
      />
      <Column
        isSortable="totalAuthors"
        title="plugin.team_departments.totalAuthors"
        minWidth={150}
        template={(row: any) => (
          <LineChart
            value={row.totalAuthors}
            order={[works, dismissed, staff]}
            details={getAuthorDetails(row, works, dismissed, staff)}
            max={authorsMax}
            suffix="common.statistic.employees"
          />
        )}
      />
    </DataView>
  );
}

Departments.defaultProps = {
  response: undefined,
};

export default Departments;
