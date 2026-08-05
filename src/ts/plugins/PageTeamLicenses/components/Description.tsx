import React from 'react';

import { Column, ColumnTypes } from 'ts/components/Table';
import { DataView } from 'ts/components/Layout';
import ViewProps from 'ts/interfaces/ViewProps';

export function Description({ response, updateSort, rowsForExcel, mode }: ViewProps) {
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
        title="plugin.team_licenses.results.title"
        properties="title"
      />
    </DataView>
  );
}

Description.defaultProps = {
  response: undefined,
};

export default Description;
