import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import { Column, ColumnTypes } from 'ts/components/Table';
import { DataView } from 'ts/components/Layout';
import { getDate } from 'ts/helpers/formatter';

import TaskInfo from './TaskInfo';

export function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

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
        formatter={(task: any) => <TaskInfo task={task}/>}
      />
      <Column
        isFixed
        isSortable
        template={ColumnTypes.TASK}
        properties="task"
        title="plugin.team_tasks.task.task"
      />
      <Column
        properties="prIds"
        template={ColumnTypes.PULL_REQUESTS}
      />
      <Column
        properties="types"
        template={ColumnTypes.TAGS}
      />
      <Column
        properties="scope"
        template={ColumnTypes.TAGS}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_tasks.task.description"
        properties="description"
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_tasks.task.author"
        properties="firstAuthor"
        width={170}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalAuthors"
        title="plugin.team_tasks.task.totalAuthors"
        width={120}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalDaysInBacklog"
        title="plugin.team_tasks.task.totalDaysInBacklog"
        width={120}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalDaysWorked"
        title="plugin.team_tasks.task.totalDaysWorked"
        width={120}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="createdBefore"
        title="plugin.team_tasks.task.createdBefore"
        width={150}
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_tasks.task.from"
        properties="firstCommit"
        width={150}
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_tasks.task.to"
        properties="lastCommit"
        width={150}
        formatter={getDate}
      />
    </DataView>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
