import React from 'react';

import ICommit from 'ts/interfaces/Commit';
import ViewProps from 'ts/interfaces/ViewProps';
import { Column, ColumnTypes } from 'ts/components/Table';
import { TaskLink, DataView } from 'ts/components/Layout';
import { getFullTime } from 'ts/helpers/formatter';

import CommitInfo from './CommitInfo';

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
        formatter={(commit: ICommit) => <CommitInfo commit={commit} />}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="common.statistic.Date"
        properties="milliseconds"
        width={180}
        formatter={getFullTime}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_commits.results.author"
        properties="author"
        width={158}
      />
      <Column
        isSortable
        template={(value: string) => <TaskLink task={value} />}
        title="plugin.team_commits.results.task"
        properties="task"
        width={120}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_commits.results.message"
        properties="message"
      />
    </DataView>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
