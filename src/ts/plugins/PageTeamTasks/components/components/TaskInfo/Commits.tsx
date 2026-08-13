import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import { Column, ColumnTypes } from 'ts/components/Table';
import { DataView } from 'ts/components/Layout';
import { getFullTime, getStringWithCapitalLetter } from 'ts/helpers/formatter';

function Commits({ response, updateSort, rowsForExcel, mode }: ViewProps) {
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
        template={ColumnTypes.STRING}
        title="plugin.team_tasks.commits.date"
        properties="milliseconds"
        width={180}
        formatter={getFullTime}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_tasks.commits.author"
        width={200}
        properties="author"
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_tasks.commits.description"
        properties="description"
        formatter={getStringWithCapitalLetter}
      />
    </DataView>
  );
}

Commits.defaultProps = {
  response: undefined,
};

export default Commits;
