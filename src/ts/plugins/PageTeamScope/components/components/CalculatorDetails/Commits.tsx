import React from 'react';

import ICommit from 'ts/interfaces/Commit';
import ViewProps from 'ts/interfaces/ViewProps';
import { Column, ColumnTypes } from 'ts/components/Table';
import { DataView } from 'ts/components/Layout';
import { getDate } from 'ts/helpers/formatter';

export function Commits({ response, updateSort, rowsForExcel, mode }: ViewProps<ICommit>) {
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
        isSortable
        template={ColumnTypes.STRING}
        title="common.statistic.Date"
        properties="milliseconds"
        width={150}
        formatter={getDate}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_scope.commits.author"
        properties="author"
        width={158}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_scope.commits.message"
        properties="message"
      />
    </DataView>
  );
}

Commits.defaultProps = {
  response: undefined,
};

export default Commits;
