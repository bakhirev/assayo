import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';

function Tasks({ response, updateSort, rowsForExcel }: ViewProps) {
  if (!response) return null;

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
    >
      <Column
        isFixed
        isSortable
        template={ColumnTypes.TASK}
        properties="task"
        title="plugin.team_scope.tasks.task"
      />
      <Column
        properties="prIds"
        template={ColumnTypes.PULL_REQUESTS}
      />
      <Column
        properties="types"
        template={ColumnTypes.TAGS}
        title="plugin.team_scope.tasks.types"
      />
      <Column
        properties="scope"
        template={ColumnTypes.TAGS}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_scope.tasks.description"
        properties="description"
      />
    </DataView>
  );
}

Tasks.defaultProps = {
  response: undefined,
};

export default Tasks;

