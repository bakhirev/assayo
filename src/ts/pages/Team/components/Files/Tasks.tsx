import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import UiKitTags from 'ts/components/UiKit/components/Tags';
import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { PRLink, TaskLink } from 'ts/components/ExternalLink';

interface TasksProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function Tasks({ response, updateSort, rowsForExcel, mode }: TasksProps) {
  if (!response) return null;

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      mode="details"
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
    >
      <Column
        isFixed
        isSortable
        template={(value: string) => (
          <TaskLink task={value} />
        )}
        title="page.team.tasks.task"
        properties="task"
        width={120}
      />
      <Column
        properties="types"
        width={100}
        template={(value: any) => (
          <UiKitTags value={Object.keys(value)} />
        )}
      />
      <Column
        properties="scope"
        width={100}
        template={(value: any) => (
          <UiKitTags value={Object.keys(value)} />
        )}
      />
      <Column
        isSortable
        minWidth={80}
        template={(row: any) => {
          const links = row.prIds.map((id: string) => (
            <PRLink
              key={id}
              prId={id}
            />
          ));
          return (<>{links}</>);
        }}
      />
    </DataView>
  );
}

Tasks.defaultProps = {
  response: undefined,
};

export default Tasks;
