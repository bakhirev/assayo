import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';

interface TasksProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
}

function Tasks({ response, updateSort, rowsForExcel }: TasksProps) {
  if (!response) return null;

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      mode="details"
    >
      <Column
        isFixed
        isSortable
        template={ColumnTypes.TASK}
        properties="task"
        title="plugin.team_refactor.tasks.task"
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
        title="plugin.team_refactor.tasks.description"
        properties="description"
      />
    </DataView>
  );
}

Tasks.defaultProps = {
  response: undefined,
};

export default Tasks;

